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

import { Cache } from './Cache';
import Preconditions from './Preconditions';
import ProxyCacheUtils from './ProxyCacheUtils';
import Source from './Source';
import InterruptedProxyCacheException from './InterruptedProxyCacheException';
import { DataBackListener } from './interfaces/DataBackListener';
import emitter from '@ohos.events.emitter';
import { VideoCacheConstant } from './constant/VideoCacheConstant';


export default class ProxyCache {
  private MAX_READ_SOURCE_ATTEMPTS: number = 1;
  protected source: Source | null = null;
  protected cache: Cache | null = null;
  public readSourceErrorsCount: number = 0;
  protected stopped: boolean = false;
  private readingInProgress: boolean = false;
  private percentsAvailable: number = -1;
  private timeoutId: number = (0 - Number.MAX_VALUE);

  constructor(source: Source, cache: Cache) {
    this.source = Preconditions.checkNotNull(source);
    this.cache = Preconditions.checkNotNull(cache);
    this.stopped = false;
  }

  public async read(buffer: ArrayBuffer, offset: number, length: number): Promise<number> {
    ProxyCacheUtils.assertBuffer(buffer, offset, length);
    if (!this.cache) {
      throw new Error('cache is null,can not read any thing')
    }
    let self = this;
    while (!self.cache.isCompleted() && self.cache.available() < (offset + length) && !self.stopped) {
      this.readSourceAsync();
      await self.waitForSourceData();
      self.checkReadSourceErrorsCount();
    }
    return new Promise<number>((resolve, reject) => {
      let read = self.cache?.read(buffer, offset, length);
      if (self.cache?.isCompleted() && self.percentsAvailable != 100) {
        self.percentsAvailable = 100;
        self.onCachePercentsAvailableChanged(100);
      }
      if (self.stopped) {
        return resolve(-1);
      } else {
        return resolve(read);
      }
    })
  }

  private checkReadSourceErrorsCount(): void {
    let errorsCount = this.readSourceErrorsCount;
    if (errorsCount >= this.MAX_READ_SOURCE_ATTEMPTS) {
      this.readSourceErrorsCount = 0;
      throw new Error("Error reading source " + errorsCount + " times");
    }
  }

  public async shutdown(): Promise<void> {
    console.debug("Shutdown proxy for " + this.source);
    try {
      this.stopped = true;
      if (this.timeoutId != (0 - Number.MAX_VALUE)) {
        clearTimeout((this.timeoutId));
      }
      this.closeSource();
    } catch (err) {
      this.onError(err);
    }
    try {
      await this.cache?.close();
      this.cache = null;
    } catch (err) {
      this.onError(err);
    }
    return Promise.resolve();
  }


  private readSourceAsync(): void {
    if (!this.stopped && (this.cache && !this.cache?.isCompleted()) && !this.readingInProgress) {
      this.readSource()
    }
  }


  private async waitForSourceData(): Promise<void> {
    let self = this;
    return new Promise<void>((resolve, reject) => {
      self.timeoutId = setTimeout(() => {
        if (self.timeoutId != (0 - Number.MAX_VALUE)) {
          clearInterval(self.timeoutId)
          self.timeoutId = (0 - Number.MAX_VALUE)
          return resolve()
        }
      }, 1000)
    })
  }

  private notifyNewCacheDataAvailable(cacheAvailable: number, sourceAvailable: number): void {
    this.onCacheAvailable(cacheAvailable, sourceAvailable);
  }

  protected onCacheAvailable(cacheAvailable: number, sourceLength: number): void {
    let zeroLengthSource = sourceLength == 0;
    let percents = zeroLengthSource ? 100 : cacheAvailable / sourceLength * 100;
    let percentsChanged = percents != this.percentsAvailable;
    let sourceLengthKnown = sourceLength >= 0;
    if (sourceLengthKnown && percentsChanged) {
      this.onCachePercentsAvailableChanged(percents);
    }
    this.percentsAvailable = percents;
  }

  protected onCachePercentsAvailableChanged(percentsAvailable: number): void {
  }

  private async readSource(): Promise<void> {
    let self = this;
    if (!self.cache || !self.source) {
      return Promise.reject(new Error('cache or source is null'))
    }
    let sourceAvailable = -1;
    let offset = 0;
    try {
      offset = self.cache.available();

      class MyDataBackListener implements DataBackListener {
        async onDataEnd() {
          try {
            await self.tryComplete();
            self.onSourceRead();
          } finally {
            self.closeSource();
            self.notifyNewCacheDataAvailable(offset, sourceAvailable)
          }
        }

        async onDataStart() {
          sourceAvailable = await self?.source?.length();
          self.setFileLength(sourceAvailable);
        }

        onDataReceive(data: ArrayBuffer) {
          if (self.isStopped()) {
            return;
          }
          self.cache?.append(data, data.byteLength);
          offset += data.byteLength;
          self.notifyNewCacheDataAvailable(offset, sourceAvailable);
        }

        async onDataProgress() {
        }
      }

      self.source.setDataListener(new MyDataBackListener())
      self.readingInProgress = true;
      await self.source.open(offset);
      self.readingInProgress = false;
      return Promise.resolve();
    } catch (err) {
      self.readingInProgress = false;
      self.readSourceErrorsCount++;
      self.onError(err);
    }
  }

  private onSourceRead(): void {
    // guaranteed notify listeners after source read and cache completed
    this.percentsAvailable = 100;
    this.onCachePercentsAvailableChanged(this.percentsAvailable);
  }

  private async tryComplete(): Promise<void> {
    if (!this.cache || !this.source) {
      return Promise.reject(new Error('cache or source is null'));
    }
    this.readingInProgress = false;
    if (!this.isStopped() && this.cache?.available() == await this.source?.length()) {
      this.cache?.complete();
    }
    return Promise.resolve();
  }

  private isStopped(): boolean {
    return this.stopped;
  }

  private closeSource(): void {
    try {
      this.source?.close();
    } catch (err) {
      this.onError(new Error("Error closing source " + this.source + ',  reason is ' + err.message));
    }
  }

  protected setFileLength(length: number) {
    this.cache?.setFileLength(length);
  }

  protected onError(e: Error): void {
    let interruption = e instanceof InterruptedProxyCacheException;
    this.readingInProgress = false;
    if (interruption) {
      console.debug("ProxyCache is interrupted");
    } else {
      console.error("ProxyCache error : " + e.message);
    }
  }

  totalLength(): number {
    return this.cache?.totalLength() ? this.cache?.totalLength() : 0;
  }
}