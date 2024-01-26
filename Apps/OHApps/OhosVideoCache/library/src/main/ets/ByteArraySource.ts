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

import Source from './Source';

export class ByteArraySource implements Source {
  private data: ArrayBuffer = undefined;
  private offset: number = 0;

  // private ByteArrayInputStream arrayInputStream;

  close(): void {
  }

  read(buffer: ArrayBuffer): number {
    if (this.offset >= this.data.byteLength) {
      return -1;
    }
    if (this.offset > Number.MAX_VALUE) {
      throw new Error("Too long offset for memory cache " + this.offset);
    }
    if (this.data.byteLength <= 0) {
      return -1;
    }
    let len = buffer.byteLength
    let avail = this.data.byteLength - this.offset;
    if (len > avail) {
      len = avail;
    }
    if (len <= 0) {
      return 0;
    }
    for (let i = 0; i < len; i++) {
      buffer[i] = this.data[this.offset+i]
    }
    return len;
  }

  length(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      resolve(this.data.byteLength)
    })
  }

  open(offset: number): Promise<void> {
    this.offset = offset;
    return new Promise<void>((resolve, reject) => {
      resolve()
    })
  }

  setDataListener() {

  }
}