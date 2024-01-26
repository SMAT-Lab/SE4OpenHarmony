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

import { Cache } from '../Cache';
import DiskUsage from './DiskUsage';
import fs from '@ohos.file.fs';
import { UnlimitedDiskUsage } from './UnlimitedDiskUsage';
import emitter from '@ohos.events.emitter';
import { VideoCacheConstant } from '../constant/VideoCacheConstant';

export default class FileCache implements Cache {
  private TEMP_POSTFIX: string = ".download";
  private diskUsage: DiskUsage | null = null;
  // public file: fs.File;
  private dataFile: fs.RandomAccessFile | null = null;
  public tempFilePath: string = ''
  public trueFilePath: string = ''
  public parentPath: string = ''
  public fileLength: number = 0
  private isRenamedEnd: boolean = true;

  constructor(filePath: string, diskUsage: DiskUsage = new UnlimitedDiskUsage()) {
    try {
      if (!filePath || filePath.length < 1) {
        throw new Error('filePath is null');
      }
      if (!diskUsage) {
        throw new Error('diskUsage is null');
      }
      let self = this;
      self.trueFilePath = filePath;
      self.diskUsage = diskUsage;
      let last = filePath.lastIndexOf('/')
      let lastPoint = filePath.lastIndexOf('.')
      let directory: string = filePath.substring(0, last);
      self.parentPath = directory;
      let fileName = filePath.substring(last + 1, filePath.length)
      if (!fs.accessSync(directory)) {
        fs.mkdirSync(directory)
      }
      let completed: boolean = fs.accessSync(filePath)
      self.tempFilePath = completed ? filePath : directory + '/' + fileName + self.TEMP_POSTFIX

      if (!completed) {
        self.dataFile = fs.createRandomAccessFileSync(self.tempFilePath, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
        fs.closeSync(self.dataFile.fd);
      }
      self.dataFile = fs.createRandomAccessFileSync(self.tempFilePath, fs.OpenMode.READ_WRITE | fs.OpenMode.APPEND);
    } catch (e) {
      throw new Error("Error using file " + this.tempFilePath + " as disc cache" + e.message);
    }
  }

  isCompleted(): boolean {
    let result = !this.isTempFile(this.tempFilePath);
    return result;
  }

  complete() {
    let self = this;
    try {
      if (this.isCompleted()) {
        return;
      }
      self.isRenamedEnd = false;
      fs.fsyncSync(self.dataFile.fd);
      fs.closeSync(self.dataFile.fd);
      fs.renameSync(this.tempFilePath, this.trueFilePath);
      this.tempFilePath = this.trueFilePath;
      try {
        this.dataFile = fs.createRandomAccessFileSync(this.trueFilePath, fs.OpenMode.READ_ONLY | fs.OpenMode.CREATE);

      } catch (e) {
        throw new Error("Error opening " + this.trueFilePath + " as disc cache,reason is : " + e.message);
      }
    } catch (err) {
      throw new Error("Error renaming file " + this.tempFilePath + " to " + this.trueFilePath + " for completion! reason is : " + err.message);
    }
    self.isRenamedEnd = true;
    let event: emitter.InnerEvent = {
      eventId: VideoCacheConstant.RENAME_FINISH_ID,
      priority: emitter.EventPriority.IMMEDIATE
    }
    emitter.emit(event)
  }

  /**
   * Returns file to be used for caching. It may as original file passed in constructor as some temp file for not completed cache.
   *
   * @return file for caching.
   */
  public getFile(): fs.RandomAccessFile {
    return this.dataFile ? this.dataFile : fs.createRandomAccessFileSync(this.trueFilePath, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
  }

  private isTempFile(filePath: string): boolean {
    return filePath.endsWith(this.TEMP_POSTFIX);
  }

  async close(): Promise<void> {
    let self = this;
    try {
      if (!self.isRenamedEnd) {
        await new Promise<void>((resolve, reject) => {
          let event: emitter.InnerEvent = {
            eventId: VideoCacheConstant.RENAME_FINISH_ID
          }
          emitter.on(event, (data: emitter.EventData) => {
            resolve()
          })
        })
      }
      emitter.off(VideoCacheConstant.RENAME_FINISH_ID)
      fs.fsyncSync(this.dataFile.fd)
      fs.closeSync(this.dataFile.fd)
      return Promise.resolve();
    } catch (e) {
      throw new Error("Error closing file " + this.tempFilePath + ',reason is : ' + e.message);
    }
  }

  append(fileData: ArrayBuffer, length: number) {
    try {
      if (this.isCompleted()) {
        throw new Error("Error append cache: cache file " + this.tempFilePath + " is completed!");
      }
      if (!fileData) {
        return
      }

      this.dataFile?.write(fileData).then(() => {
        fs.fsync(this.dataFile?.fd)
      })

    } catch (e) {
      let format = `Error writing ${length} bytes to ${this.tempFilePath}from buffer with size ${fileData.byteLength},reason is : ${e.message}`;
      throw new Error(format);
    }
  }

  read(buffer: ArrayBuffer, offset: number, length: number): number {
    try {
      if (!this.isRenamedEnd) {
        return -1;
      }
      if (offset < 0 || length < 0) {
        return -1;
      }
      if (this.fileLength > 0 && offset >= this.fileLength) {
        this.diskUsage?.touch(this.tempFilePath);
        return -1;
      }
      if (offset >= this.available()) {
        return -1;
      }

      if (!this.dataFile) {
        return -1;
      }
      let tempLength: number = 0;
      if (offset + length >= this.fileLength && this.fileLength > 0) {
        tempLength = this.fileLength - offset;
      } else if (offset + length >= this.available() && this.available() > 0) {
        tempLength = this.available() - offset;
      } else {
        tempLength = length;
      }
      let readLength = fs.readSync(this.dataFile!.fd, buffer, {
        offset: offset,
        length: tempLength
      })
      return readLength;
    }
    catch (e) {
      let format = `Error reading ${length} bytes with offset ${offset} from file[${this.available()} bytes] to buffer[${buffer.byteLength} bytes], readon is : ${e.message}`;
      throw new Error(format);
    }
  }

  available(): number {
    try {
      let size = fs.statSync(this.tempFilePath).size;
      return size;
    } catch (e) {
      throw new Error("Error reading length of file " + this.tempFilePath + ",reason is :    " + e.message);
    }
  }

  setFileLength(length: number) {
    if (length > 0) {
      this.fileLength = length;
    }
  }

  totalLength(): number {
    return this.fileLength ? this.fileLength : 0;
  }
}