/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import HashMap from '@ohos.util.HashMap';
import HttpProxyCacheServerClients from './HttpProxyCacheServerClients';
import socket from '@ohos.net.socket';
import Config from './Config';
import Pinger from './Pinger';
import Preconditions from './Preconditions';

import IgnoreHostProxySelector from './IgnoreHostProxySelector';
import ProxyCacheUtils from './ProxyCacheUtils';
import fs from '@ohos.file.fs';
import { CacheListener } from './CacheListener';
import { ProxyCacheException } from './ProxyCacheException';
import GetRequest from './GetRequest';
import HttpProxyCacheServerBuilder from './HttpProxyCacheServerBuilder';
import MessageCallBackBean from './bean/MessageCallBackBean';

import buffer from '@ohos.buffer';
import { Context } from '@ohos.abilityAccessCtrl';
import emitter from '@ohos.events.emitter';
import { VideoCacheConstant } from './constant/VideoCacheConstant';

const BASE_COUNT = 1

export default class HttpProxyCacheServer {
  private static libraryVersion: string = '1.0.0'
  private PROXY_HOST: string = "127.0.0.1";
  private clientsMap: HashMap<String, HttpProxyCacheServerClients> = new HashMap<string, HttpProxyCacheServerClients>();
  private port: number = 0;
  private config: Config | null = null;
  private pinger: Pinger | null = null;
  private serverSocket: socket.TCPSocketServer | null = socket.constructTCPSocketServerInstance();
  private isServerReady: boolean = false;

  public static setLibraryVersion(version: string) {
    if (version && version.length >= 1) {
      HttpProxyCacheServer.libraryVersion = version;
    } else {
      HttpProxyCacheServer.libraryVersion = '1.0.0';
    }
  }

  public static getLibraryVersion() {
    if (!HttpProxyCacheServer.libraryVersion || HttpProxyCacheServer.libraryVersion.length < 1) {
      HttpProxyCacheServer.libraryVersion = '1.0.0';
    }
    return HttpProxyCacheServer.libraryVersion
  }

  constructor(param: Context | Config) {
    if (!param) {
      throw new Error('params can not be null')
    }
    let self = this;
    if (param instanceof Config) {
      self.config = Preconditions.checkNotNull((param as Config));
    } else {
      self.config = new HttpProxyCacheServerBuilder((param as Context)).buildConfig()
    }
    try {
      self.port = Math.round((Math.random() * (65535 - 1024)) + 1024);
      IgnoreHostProxySelector.install(self.PROXY_HOST, this.port);
      this.waitForRequest();

    } catch (err) {
      throw new Error("Error starting local proxy server " + err.message);
    }

  }

  async waitForRequest(): Promise<void> {
    let self = this;
    try {
      let requestArg: socket.NetAddress = {
        address: self.PROXY_HOST,
        port: self.port,
        family: 1
      }
      await this.serverSocket?.listen(requestArg);
      this.serverSocket?.on("connect", async (clientSocket: socket.TCPSocketConnection) => {
        clientSocket?.on("message", (data: MessageCallBackBean) => {
          if (data && data.message) {
            let info = buffer.from(data.message).toString();
            self.processSocket(info, clientSocket)
          }
        })
        clientSocket?.on("error", (err: Error) => {
          self.closeSocket(clientSocket, false)
        })
        clientSocket?.on("close", () => {
          self.closeSocket(clientSocket, true)
        })
      })
      self.pinger = new Pinger(self.PROXY_HOST, self.port)
      self.isServerReady = true;
      let event: emitter.InnerEvent = {
        eventId: VideoCacheConstant.SERVER_READY_ID,
        priority: emitter.EventPriority.IMMEDIATE
      }
      emitter.emit(event)
      return Promise.resolve()
    } catch (err) {
      return Promise.reject(err)
    }
  }

  async processSocket(requestInfo: string, severConnect: socket.TCPSocketConnection) {
    let self = this;
    try {
      let request = GetRequest.read(buffer.from(requestInfo).buffer);
      let url = ProxyCacheUtils.decode(request.uri);
      if (self.pinger && self.pinger.isPingRequest(url)) {
        await self.pinger?.responseToPing(severConnect);
      } else {
        let clients = self.getClients(url);
        await clients.processRequest(request, severConnect);
      }
    } catch (err) {
      self.onError(new ProxyCacheException("Error processing request,reason is : " + err.message));
    } finally {
      if (severConnect) {
        self.releaseSocket(severConnect, false);
      }
    }
  }


  /**
   * Returns url that wrap original url and should be used for client (MediaPlayer, ExoPlayer, etc).
   * <p>
   * If parameter {@code allowCachedFileUri} is {@code true} and file for this url is fully cached
   * (it means method {@link #isCached(String)} returns {@code true}) then file:// uri to cached file will be returned.
   *
   * @param url                a url to file that should be cached.
   * @param allowCachedFileUri {@code true} if allow to return file:// uri if url is fully cached
   * @return a wrapped by proxy url if file is not fully cached or url pointed to cache file otherwise (if {@code allowCachedFileUri} is {@code true}).
   */
  public async getProxyUrl(url: string, allowCachedFileUri: boolean = true): Promise<string> {
    let self = this;
    if (allowCachedFileUri && self.isCached(url)) {
      let cacheFile = self.getCacheFile(url);
      self.touchFileSafely(cacheFile);
      return cacheFile;
    }
    // 以下代码是为了确保服务器准备好了 不加这里的逻辑 很可能服务器没初始化，导致下面的isAlive直接返回false，逻辑就不走代理了
    await new Promise<void>((resolve, reject) => {
      if (self.isServerReady) {
        resolve()
      } else {
        let event: emitter.InnerEvent = {
          eventId: VideoCacheConstant.SERVER_READY_ID
        }
        emitter.on(event, (data: emitter.EventData) => {
          resolve()
        })
      }
    })
    let result = await this.isAlive()
    return new Promise((resolve, reject) => {
      resolve(result ? this.appendToProxyUrl(url) : url)
    });
  }

  /**
   * 返回端口号 用于编写单元测试
   * @returns 端口号
   */
  public getProxyPort(): number {
    return this.port;
  }

  /**
   * 返回代理服务器配置信息 用于编写单元测试
   * @returns 代理服务器配置信息
   */
  public getConfig(): Config | null {
    return this.config;
  }

  /**
   * Checks is cache contains fully cached file for particular url.
   *
   * @param url an url cache file will be checked for.
   * @return {@code true} if cache contains fully cached file for passed in parameters url.
   */
  public isCached(url: string): boolean {
    Preconditions.checkNotNull(url, "Url can't be null!");
    return fs.accessSync(this.getCacheFile(url))
  }

  private appendToProxyUrl(url: string): string {
    return `http://${this.PROXY_HOST}:${this.port}/${ProxyCacheUtils.encode(url)}`;
  }

  private getCacheFile(url: string): string {
    if (this.config && this.config.fileNameGenerator) {
      let cacheDir = this.config.cacheRoot;
      let fileName = this.config.fileNameGenerator.generate(url);
      return `${cacheDir}/${fileName}`;
    }
    return ``;
  }

  private async isAlive(): Promise<boolean> {
    if (this.pinger) {
      let result = await this.pinger.ping(3, 70); // 70+140+280=max~500ms
      return new Promise((resolve, reject) => {
        resolve(result)
      });
    } else {
      return new Promise((resolve, reject) => {
        resolve(false)
      });
    }

  }

  private touchFileSafely(cacheFile: string): void {
    try {
      if (this.config && this.config.diskUsage) {
        this.config.diskUsage.touch(cacheFile);
      }
    } catch (err) {
      console.error("Error touching file " + cacheFile + "  ,reason is " + err.message);
    }
  }

  public registerCacheListener(cacheListener: CacheListener, url: string): void {
    Preconditions.checkAllNotNull(cacheListener, url);
    if (!url || url.length < 1) {
      throw new Error('url is null')
    }
    try {
      this.getClients(url).registerCacheListener(cacheListener);
    } catch (err) {
      console.warn("Error registering cache listener,reason is : " + err.message);
    }
  }

  public unregisterCacheListener(cacheListener: CacheListener, url: string): void {
    if (url && url.length > 0) {
      Preconditions.checkAllNotNull(cacheListener, url);
      try {
        this.getClients(url).unregisterCacheListener(cacheListener);
      } catch (err) {
        console.warn("Error registering cache listener,reason is : " + err.message);
      }
    } else {
      Preconditions.checkNotNull(cacheListener);
      this.clientsMap.forEach((clients: HttpProxyCacheServerClients, key: string, map: HashMap<string, HttpProxyCacheServerClients>) => {
        clients.unregisterCacheListener(cacheListener);
      })
    }
  }

  public shutdown(): void {
    console.info("Shutdown proxy server");
    let event: emitter.InnerEvent = {
      eventId: VideoCacheConstant.SHUT_DOWN_TASKPOOL,
      priority: emitter.EventPriority.IMMEDIATE
    }
    emitter.emit(event);
    this.shutdownClients();
    if (this.config && this.config.sourceInfoStorage) {
      this.config.sourceInfoStorage.release();
    }
    this.serverSocket?.off('connect')
    emitter.off(VideoCacheConstant.PING_EVENT_ID)
    emitter.off(VideoCacheConstant.SEND_TOTAL_SIZE_ID)
    emitter.off(VideoCacheConstant.SEND_ACCEPT_ID)
    emitter.off(VideoCacheConstant.COUNT_TOTAL_SIZE_ID)
    emitter.off(VideoCacheConstant.COUNT_TOTAL_SIZE_START_ID)
    emitter.off(VideoCacheConstant.COUNT_TOTAL_SIZE_END_ID)
    emitter.off(VideoCacheConstant.GET_ACCEPT_ID)
    emitter.off(VideoCacheConstant.HTTP_URL_SOURCE_READY_ID)
    emitter.off(VideoCacheConstant.SERVER_READY_ID)
    emitter.off(VideoCacheConstant.RENAME_FINISH_ID)
    emitter.off(VideoCacheConstant.SHUT_DOWN_TASKPOOL)
    this.serverSocket = null;
  }

  private onError(e: Error | ProxyCacheException): void {
    console.error("HttpProxyCacheServer error,reason is " + e.message);
  }

  private shutdownClients(): void {
    this.clientsMap?.forEach(async (clients: HttpProxyCacheServerClients, key: string, map: HashMap<string, HttpProxyCacheServerClients>) => {
      await clients?.shutdown();
    })
    this.clientsMap.clear();
  }

  private getClients(url: string | null): HttpProxyCacheServerClients {
    if (!this.config) {
      throw new Error('config is null')
    }
    if (!this.clientsMap) {
      throw new Error('clientsMap is null')
    }
    if (!url || url.length < 1) {
      throw new Error('url is null')
    }
    let clients = this.clientsMap.get(url);
    if (clients == null || clients == undefined) {
      clients = new HttpProxyCacheServerClients(url, this.config);
      this.clientsMap.set(url, clients);
    }
    return clients;
  }


  private getClientsCount(): number {
    let count = 0;
    this.clientsMap.forEach((clients: HttpProxyCacheServerClients, key, map) => {
      count += clients.getClientsCount();
    })
    return count;
  }

  private releaseSocket(severConnect: socket.TCPSocketConnection, isCloseByClient: boolean): void {
    // 鸿蒙不区分socket的input和output 直接关闭
    this.closeSocket(severConnect, isCloseByClient);
  }

  private closeSocket(severConnect: socket.TCPSocketConnection, isCloseByClient: boolean): void {
    // 客户端主动断开连接的情况下 不做处理 否则可能将正在执行的其他连接断开
    try {
      // 暂不处理 该方法关闭可能会关掉当前传输数据的severConnect而不是已经不再使用的severConnect 改为在HttpProxyCache里面关闭。
      if (!isCloseByClient && false) {
        severConnect?.off('message');
        severConnect?.off('error');
        severConnect?.off('close');
        severConnect?.close();
        severConnect = null;
      }
    } catch (err) {
      this.onError(err)
    }

  }
}