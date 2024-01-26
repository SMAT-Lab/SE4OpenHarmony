/*
Copyright (c) 2022 Huawei Device Co., Ltd.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import fileio from '@ohos.fileio';
import SequentialReader from './SequentialReader';

class StreamReader extends SequentialReader {
  private readonly _stream;
  private _pos: number;
  private fileSize:number =0;

  public getPosition(): number
  {
    return this._pos;
  }

  constructor(filePath: string) {
    super();
    let stream = fileio.createStreamSync(filePath, 'r+');
    fileio.stat(filePath).then(stat=>{
      this.fileSize = stat.size
    })
    if (stream == null)
    throw new Error('StreamReader constructor Error');

    this._stream = stream;
    this._pos = 0;
  }

  public getByte(): number
  {
    let byte = new ArrayBuffer(1);
    this._stream.readSync(byte, { length: 1, position: this._pos });
    this._pos++;
    let arr = new Int8Array(byte);
    return this.numberToByte(arr[0]);
  }
  public numberToByte(b: number): number{
    return Int8Array.from([(b | (0x01 << 8))])[0];
  }
  public getBytes(count: number, buffer?: ArrayBuffer, off?: number): Int8Array
  {
    let arrayBuffer: ArrayBuffer = new ArrayBuffer(count);
    let totalBytesRead = 0;
    if (off == undefined) off = 0;
    while (totalBytesRead != count) {
      // let bytesRead = this._stream.readSync(arrayBuffer,{offset:off + totalBytesRead, length:count - totalBytesRead});
      let bytesRead = this._stream.readSync(arrayBuffer,{offset:totalBytesRead, length:count});
      if (bytesRead == -1)
        throw new Error("End of data reached.");
      totalBytesRead += bytesRead;
    }
    this._pos += totalBytesRead;
    return new Int8Array(arrayBuffer)
  }

  public skip(n: number): void
  {
    if (n < 0)
    throw new Error("n must be zero or greater.");

    let skippedCount = this.skipInternal(n);

    if (skippedCount != n)
    throw new Error("Unable to skip.");
  }

  public trySkip(n: number): boolean
  {
    if (n < 0)
    throw new Error("n must be zero or greater.");

    return this.skipInternal(n) == n;
  }

  private skipInternal(n: number): number
  {
    // It seems that for some streams, such as BufferedInputStream, that skip can return
    // some smaller number than was requested. So loop until we either skip enough, or
    // InputStream.skip returns zero.
    //
    // See http://stackoverflow.com/questions/14057720/robust-skipping-of-data-in-a-java-io-inputstream-and-its-subtypes
    //
    let skippedTotal = 0;
    while (skippedTotal != n) {
      let skipped = this._stream.readSync(new ArrayBuffer(n), { offset: 0, length: n, position: this._pos });
      skippedTotal += skipped;
      if (skipped == 0)
      break;
    }
    this._pos += skippedTotal;
    return skippedTotal;
  }

  public available(): number {
    try {
      let sLength = this._stream.readSync(new ArrayBuffer(1024000));
      return sLength
    } catch (e) {
      return 0;
    }
  }
}

export default StreamReader
