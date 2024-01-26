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

import ArrayList from '@ohos.util.ArrayList';
import socket from '@ohos.net.socket';
import { CacheListener } from './CacheListener';
import Config from './Config';
import HttpProxyCache from './HttpProxyCache';
import Preconditions from './Preconditions';
import GetRequest from './GetRequest';
import HttpUrlSource from './HttpUrlSource';
import FileCache from './file/FileCache';

class UiListenerHandler implements CacheListener {
  private url: string;
  private listeners = new ArrayList<CacheListener>();

  constructor(url: string, listeners: ArrayList<CacheListener>) {
    this.url = url;
    this.listeners = listeners;
  }

  onCacheAvailable(cacheFilePath: string, url: string, percentsAvailable: number) {
    if (!this.listeners || this.listeners.length < 1) {
      return;
    }
    for (let i = 0; i < this.listeners.length; i++) {
      let listener = this.listeners[i] as CacheListener;
      listener?.onCacheAvailable(cacheFilePath, url, percentsAvailable);
    }
  }
}

export default class HttpProxyCacheServerClients {
  private url: string;
  private proxyCache: HttpProxyCache | null = null;
  private uiCacheListener: CacheListener | null = null;
  private config: Config | null = null;
  private listeners = new ArrayList<CacheListener>();

  constructor(url: string, config: Config) {
    this.url = Preconditions.checkNotNull(url);
    this.config = Preconditions.checkNotNull(config);
    this.uiCacheListener = new UiListenerHandler(url, this.listeners);
  }

  async processRequest(request: GetRequest, severConnect: socket.TCPSocketConnection): Promise<void> {
    try {
      this.startProcessRequest();
      if (!this.proxyCache) {
        throw new Error('proxyCache is null')
      }
      await this.proxyCache.processRequest(request, severConnect);
    } catch (err) {
      return Promise.reject(err)
    } finally {
      await this.finishProcessRequest();
    }
    return Promise.resolve()
  }

  private startProcessRequest(): void {
    this.proxyCache = this.proxyCache == null ? this.newHttpProxyCache() : this.proxyCache;
  }

  private newHttpProxyCache(): HttpProxyCache {
    if (!this.config) {
      throw new Error('proxyCache is null')
    }
    let source = new HttpUrlSource([this.url, this.config.sourceInfoStorage, this.config.headerInjector]);
    let cache = new FileCache(this.config.generateCacheFile(this.url), this.config.diskUsage);
    let httpProxyCache = new HttpProxyCache(source, cache);
    httpProxyCache.registerCacheListener(this.uiCacheListener);
    return httpProxyCache;
  }

  private async finishProcessRequest(): Promise<void> {
    if (this.proxyCache) {
      await this.proxyCache.shutdown();
    }
    this.proxyCache = null;
    return Promise.resolve();
  }

  public registerCacheListener(cacheListener: CacheListener): void {
    this.listeners.add(cacheListener);
  }

  public unregisterCacheListener(cacheListener: CacheListener): void {
    this.listeners.remove(cacheListener);
  }

  public async shutdown(): Promise<void> {
    this.listeners.clear();
    if (this.proxyCache != null) {
      this.proxyCache?.registerCacheListener(null);
      await this.proxyCache?.shutdown();
    }
    this.proxyCache = null;
    return Promise.resolve();
  }

  getClientsCount(): number {
    return 0;
  }
}

