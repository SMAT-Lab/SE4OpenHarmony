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

import EmptyHeadersInjector from './headers/EmptyHeadersInjector';
import HeaderInjector from './headers/HeaderInjector';
import Preconditions from './Preconditions';
import ProxyCacheUtils from './ProxyCacheUtils';
import Source from './Source';
import SourceInfo from './SourceInfo';
import SourceInfoStorage from './sourcestorage/SourceInfoStorage';
import SourceInfoStorageFactory from './sourcestorage/SourceInfoStorageFactory';
import http from '@ohos.net.http';
import { ProxyCacheException } from './ProxyCacheException';
import { DataBackListener } from './interfaces/DataBackListener';
import ProgressValue from './bean/ProgressValue';
import Queue from '@ohos.util.Queue';
import HashMap from '@ohos.util.HashMap';
import emitter from '@ohos.events.emitter';
import { VideoCacheConstant } from './constant/VideoCacheConstant';

export default class HttpUrlSource implements Source {
  private MAX_REDIRECTS: number = 5;
  private sourceInfoStorage: SourceInfoStorage | null = null;
  private headerInjector: HeaderInjector | null = null;
  private sourceInfo: SourceInfo | null = null;
  private connection: http.HttpRequest | null = null;
  private callBack: DataBackListener | null = null;
  private isInitFinish: boolean = false;
  private isHeaderDealFinish: boolean = false;
  private isDataFinish: boolean = false;
  private cacheData: Queue<ArrayBuffer> = new Queue();
  private interId: number = (0 - Number.MAX_VALUE);

  // private inputStream: InputStream;

  constructor(args: string | Array<string | Object>) {
    if (!args || args.length < 1) {
      throw new Error('params can not be null')
    }
    let self = this;
    try {
      self.isInitFinish = false;
      if (args.length === 1) {
        if (typeof args[0] === 'string') {
          let sourceInfoStorage = SourceInfoStorageFactory.newEmptySourceInfoStorage()
          self.sourceInfoStorage = Preconditions.checkNotNull<SourceInfoStorage | null>(sourceInfoStorage);
          self.headerInjector = Preconditions.checkNotNull<HeaderInjector | null>(new EmptyHeadersInjector());
          sourceInfoStorage.get(args[0]).then((sourceInfo: SourceInfo | null) => {
            if (sourceInfo) {
              self.sourceInfo = sourceInfo;
            } else {
              self.sourceInfo = new SourceInfo(args[0] as string, Number.MIN_VALUE, ProxyCacheUtils.getSupposablyMime(args[0] as string));
            }
            self.isInitFinish = true;
            self.notifyInitFinish()
          }).catch((err: Error) => {
            self.sourceInfo = new SourceInfo(args[0] as string, Number.MIN_VALUE, ProxyCacheUtils.getSupposablyMime(args[0] as string))
            self.isInitFinish = true;
            self.notifyInitFinish()
          });
        } else if (typeof args[0] === 'object' && args[0] instanceof HttpUrlSource) {
          self.sourceInfo = args[0].sourceInfo;
          this.sourceInfoStorage = args[0].sourceInfoStorage;
          self.headerInjector = args[0].headerInjector;
          self.isInitFinish = true;
          self.notifyInitFinish()
        }
      } else if (args.length === 2) {
        if (typeof args[0] === 'string' && args[1]) {
          self.sourceInfoStorage = Preconditions.checkNotNull<SourceInfoStorage | null>(args[1] as SourceInfoStorage);
          self.headerInjector = Preconditions.checkNotNull<HeaderInjector | null>(new EmptyHeadersInjector());
          let sourceInfo = (args[1] as SourceInfoStorage).get(args[0]);
          sourceInfo.then((sourceInfo: SourceInfo | null) => {
            if (sourceInfo) {
              self.sourceInfo = sourceInfo;
            } else {
              self.sourceInfo = new SourceInfo(args[0] as string, Number.MIN_VALUE, ProxyCacheUtils.getSupposablyMime(args[0] as string));
            }
            self.isInitFinish = true;
            self.notifyInitFinish()
          }).catch((err: Error) => {
            self.sourceInfo = new SourceInfo(args[0] as string, Number.MIN_VALUE, ProxyCacheUtils.getSupposablyMime(args[0] as string))
            self.isInitFinish = true;
            self.notifyInitFinish()
          });
        }
      } else if (args.length === 3) {
        self.sourceInfoStorage = Preconditions.checkNotNull<SourceInfoStorage | null>(args[1] as SourceInfoStorage);
        self.headerInjector = Preconditions.checkNotNull<HeaderInjector | null>(args[2] as HeaderInjector);
        let sourceInfo = (args[1] as SourceInfoStorage).get(args[0] as string);
        sourceInfo.then((sourceInfo: SourceInfo | null) => {
          if (sourceInfo) {
            self.sourceInfo = sourceInfo;
          } else {
            self.sourceInfo = new SourceInfo(args[0] as string, Number.MIN_VALUE, ProxyCacheUtils.getSupposablyMime(args[0] as string));
          }
          self.isInitFinish = true;
          self.notifyInitFinish()
        }).catch((err: Error) => {
          self.sourceInfo = new SourceInfo(args[0] as string, Number.MIN_VALUE, ProxyCacheUtils.getSupposablyMime(args[0] as string))
          self.isInitFinish = true;
          self.notifyInitFinish()
        });
      }
    } catch (err) {
      self.isInitFinish = true;
      self.notifyInitFinish()
    }

    self.interId = setInterval(() => {
      if (!self.callBack) {
        return;
      }
      if (!self.isHeaderDealFinish) {
        return
      }
      if (self?.sourceInfo?.url?.indexOf('ping') != -1) {
        return;
      }
      if (self?.cacheData?.length > 0) {
        self?.callBack?.onDataReceive(self?.cacheData?.pop())
      } else {
        if (self.isDataFinish) {
          self.isHeaderDealFinish = false;
          self.callBack?.onDataEnd()
        }
      }
    }, 20)
  }

  notifyInitFinish() {
    let event: emitter.InnerEvent = {
      eventId: VideoCacheConstant.HTTP_URL_SOURCE_READY_ID,
      priority: emitter.EventPriority.IMMEDIATE
    }
    emitter.emit(event)
  }

  close(): void {
    try {
      this.cacheData = new Queue();
      if (this.interId != 0 - Number.MAX_VALUE) {
        clearInterval(this.interId)
      }
      emitter.off(VideoCacheConstant.HTTP_URL_SOURCE_READY_ID)
      this.isHeaderDealFinish = false;
      this.connection?.off('headersReceive');
      this.connection?.off('dataReceive');
      this.connection?.off('dataReceiveProgress');
      this.connection?.off('dataEnd');
      this.connection?.destroy();
    } catch (err) {
      let message = "Wait... but why? WTF!? " +
        "Really shouldn't happen any more after fixing https://github.com/danikula/AndroidVideoCache/issues/43. " +
        "If you read it on your device log, please, notify me danikula@gmail.com or create issue here " +
        "https://github.com/danikula/AndroidVideoCache/issues.";
      throw new ProxyCacheException(message + '   ' + err.message);
    }
  }

  setDataListener(listener: DataBackListener) {
    this.callBack = listener;
  }


  async length(): Promise<number> {
    let self = this;
    await self.checkInit()
    if (!this.sourceInfo) {
      return new Promise((resolve, reject) => {
        resolve(0)
      });
    }
    if (this.sourceInfo?.length == Number.MIN_VALUE) {
      await this.fetchContentInfo();
    }
    return new Promise((resolve, reject) => {
      resolve(this.sourceInfo?.length)
    });
  }


  private readSourceAvailableBytes(receiveHeader: object, offset: number): number {
    if (!receiveHeader) {
      return -1
    }
    let contentLength = this.getContentLength(receiveHeader);
    return contentLength + offset;
  }

  private getContentLength(receiveHeader: object): number {
    let temp = receiveHeader as Record<string, Object>
    let contentLengthValue = temp["Content-Length"] as string ? temp["Content-Length"] as string : temp["content-length"] as string;
    return contentLengthValue == null ? -1 : Number.parseInt(contentLengthValue);
  }

  async open(offset: number): Promise<void> {
    const self = this
    self.isHeaderDealFinish = false;
    self.isDataFinish = false;
    await self.checkInit()
    try {
      return new Promise<void>(async (resolve, reject) => {
        if (!self.sourceInfo || !self.sourceInfoStorage) {
          return reject(new Error('sourceInfo or sourceInfoStorage is null'))
        }
        let mime: string = '';
        let receiveHeader: object | null = null;
        self.connection = self.openConnection();
        if (!self.connection) {
          return new Promise<void>((resolve, reject) => {
            return reject(new Error('openConnection fail'))
          })
        }
        self.connection?.on('headersReceive', async (headers: Object) => {
          if (self?.sourceInfo?.url?.indexOf('ping') != -1) {
            self?.callBack?.onDataStart();
          } else {
            if (headers) {
              receiveHeader = headers as Record<string, Object>;
              mime = receiveHeader['content-type'] as string ? receiveHeader['content-type'] as string : receiveHeader['Content-Type'] as string;
              let length = self.readSourceAvailableBytes(headers, offset);
              self.sourceInfo = new SourceInfo(self.sourceInfo!.url, length, mime);
              await self.sourceInfoStorage?.put(self.sourceInfo!.url, self.sourceInfo);
              self?.callBack?.onDataStart();
            }
            self.isHeaderDealFinish = true;
          }
        })
        self.connection?.on('dataReceive', (data: ArrayBuffer) => {
          if (self?.sourceInfo?.url?.indexOf('ping') != -1) {
            self?.callBack?.onDataReceive(data);
          } else {
            self?.cacheData?.add(data);
          }
        })
        self.connection?.on('dataReceiveProgress', (progress: ProgressValue) => {
          self.callBack?.onDataProgress(progress)
        })
        self.connection!!.on('dataEnd', () => {
          if (self?.sourceInfo?.url?.indexOf('ping') != -1) {
            self?.callBack?.onDataEnd();
          } else {
            self.isDataFinish = true;
          }
        })
        let option: http.HttpRequestOptions = self.initRequestParam(offset, -1)
        self.cacheData = new Queue();
        await self.connection?.requestInStream(self.sourceInfo!!.url, option)
        return resolve()
      })


    } catch (err) {
      self.isHeaderDealFinish = false;
      self.connection?.destroy()
      return new Promise<void>((resolve, reject) => {
        return reject(new ProxyCacheException("Error opening connection for " + self.sourceInfo!!.url + " with offset " + offset + err.message))
      })
    }

  }

  private async fetchContentInfo(): Promise<void> {
    let self = this;
    await self.checkInit()
    let urlConnection: http.HttpRequest | null = null;
    try {
      await new Promise<void>(async (resolve, reject) => {
        urlConnection = self.openConnection();
        if (!urlConnection) {
          return reject(new Error('openConnection fail'))
        }
        if (!self.sourceInfo) {
          return reject(new Error('sourceInfo is null'))
        }
        console.debug("Read content info from " + this.sourceInfo!!.url);
        urlConnection?.once('headersReceive', async (headers: Object) => {
          if (headers) {
            let length = self.getContentLength(headers);
            let temp = headers as Record<string, Object>
            let mime = temp['content-type'] as string ? temp['content-type'] as string : temp['Content-Type'] as string;
            self.sourceInfo = new SourceInfo(self.sourceInfo!!.url, length, mime);
            await self.sourceInfoStorage?.put(self.sourceInfo!!.url, self.sourceInfo);
            console.debug("Source info fetched: " + self.sourceInfo);
          }
          return resolve()
        })
        let option = self.initRequestParam(0, 10000)
        urlConnection.requestInStream(self.sourceInfo!!.url, option)
      })
      urlConnection?.destroy();
      return Promise.resolve();
    } catch (err) {
      console.error("Error fetching info from " + self.sourceInfo!!.url + err.message);
      return Promise.reject(err);
    }
  }

  private openConnection(): http.HttpRequest {
    try {
      this.connection?.off('headersReceive')
      this.connection?.off('dataReceive')
      this.connection?.off('dataReceiveProgress')
      this.connection?.off('dataEnd')
      this.connection?.destroy();
      this.connection = null;
    } catch (err) {
      this.connection = null;
    }
    return http.createHttp();
  }

  private initRequestParam(offset: number, timeout: number): http.HttpRequestOptions {
    const self = this;
    let option: http.HttpRequestOptions = {
      method: http.RequestMethod.GET,
      header: {
        "Content-Type": 'application/json',
        "Connection": 'Keep-Alive'
      },
      connectTimeout: 10000,
      readTimeout: 0,
      usingProtocol: http.HttpProtocol.HTTP1_1
    }
    if (!self.sourceInfo) {
      return option;
    }
    option = self.injectCustomHeaders(option, self.sourceInfo!!.url);
    if (!option || !option.header) {
      return option;
    }
    if (offset > 0) {
      let temp = option!!.header as Record<string, Object>
      temp["Range"] = "bytes=" + offset + "-";
      option!!.header = temp;
    }
    if (timeout > 0) {
      option!!.connectTimeout = timeout;
      option!!.readTimeout = timeout;
    }
    return option;
  }

  private injectCustomHeaders(option: http.HttpRequestOptions, url: string): http.HttpRequestOptions {
    if (!this.headerInjector) {
      return option;
    }
    let extraHeaders = this.headerInjector!!.addHeaders(url);
    if (!extraHeaders || extraHeaders.length < 1) {
      return option;
    }
    extraHeaders?.forEach((value?: string, key?: string, map?: HashMap<string, string>) => {
      if (key && key.length > 0 && value && value.length > 0) {
        if (option && option.header) {
          let header = option.header as Record<string, Object>;
          header[key] = value;
          option.header = header;
        }
      }
    })
    return option
  }


  public async getMime(): Promise<string> {
    let self = this;
    await self.checkInit()
    if (!self.sourceInfo || !self.sourceInfo.mime || self.sourceInfo.mime.length < 1) {
      await self.fetchContentInfo();
    }
    return new Promise((resolve, reject) => {
      if (self.sourceInfo && self.sourceInfo.mime) {
        return resolve(self.sourceInfo.mime)
      } else {
        return reject(new Error('can not get sourceInfo.mime'))
      }
    });
  }

  private checkInit(): Promise<void> {
    let self = this;
    if (!self?.isInitFinish) {
      return new Promise<void>((resolve, reject) => {
        let event: emitter.InnerEvent = {
          eventId: VideoCacheConstant.HTTP_URL_SOURCE_READY_ID
        }
        emitter.on(event, (data: emitter.EventData) => {
          return resolve()
        })
      })
    } else {
      return Promise.resolve();
    }
  }

  public getUrl(): string {
    return this.sourceInfo ? this.sourceInfo.url : '';
  }

  public toString(): string {
    return "HttpUrlSource{sourceInfo='" + this.sourceInfo.toString() + "}";
  }
}