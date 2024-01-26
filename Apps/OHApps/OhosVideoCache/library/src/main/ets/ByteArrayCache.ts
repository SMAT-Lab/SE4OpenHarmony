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

export default class ByteArrayCache implements Cache {
  private data: ArrayBuffer;
  private completed: boolean;

  constructor(data?: ArrayBuffer) {
    this.data = Preconditions.checkNotNull(data ? data : new ArrayBuffer(0));
  }


  isCompleted(): boolean {
    return this.completed;
  }

  complete() {
    this.completed = true;
  }

  close(): Promise<void> {
    return Promise.resolve();
  }

  setFileLength(length: number) {

  }

  append(newData: ArrayBuffer, length: number) {
    Preconditions.checkNotNull(this.data);
    Preconditions.checkArgument(length >= 0 && length <= newData.byteLength);

    let temp = new Uint8Array(this.data.byteLength + length)
    temp.set(new Uint8Array(this.data), 0)
    temp.set(new Uint8Array(newData), this.data.byteLength)
    this.data = temp.buffer;
  }

  read(buffer: ArrayBuffer, offset: number, length: number): number {
    if (offset >= this.data.byteLength) {
      return -1;
    }
    if (offset > Number.MAX_VALUE) {
      throw new Error("Too long offset for memory cache " + offset);
    }
    if (this.data.byteLength <= 0) {
      return -1;
    }
    let len = length
    let avail = this.data.byteLength - offset;
    if (len > avail) {
      len = avail;
    }
    if (len <= 0) {
      return 0;
    }
    buffer = this.data.slice(offset, offset + len)
    return len;
  }

  available(): number {
    return this.data.byteLength;
  }

  totalLength(): number {
    return 0;
  }
}