/*
 * Copyright (c) 2023 Shenzhen Kaihong Digital Industry Development Co., Ltd.
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

import Logger from '../common/Logger';
import fs from '@ohos.file.fs';

const TAG: string = '[Sample_FileBackDemo]';

// 1k = 1024B
const ONE_KILOBYTE: number = 1024;
const FILE_NUM_MAX: number = 10;
const FILE_NUM_MIN: number = 1;

export default class CreatFile {
  baseDir: string = AppStorage.get('sanBoxFileDir') + '/TextDir';

  constructor() {
  }

  async createTestFiles(): Promise<void> {
    try {
      let num = Math.floor(Math.random() * FILE_NUM_MAX) + FILE_NUM_MIN;
      if (!fs.accessSync(this.baseDir)) {
        fs.mkdirSync(this.baseDir);
      }
      let dpath = this.baseDir;
      Logger.info(TAG, 'sanBoxFileDir = ' + dpath);
      Logger.info(TAG, 'num is  = ' + num);
      for (let i = 0; i < num; i++) {
        let myFile = dpath + `/TestFile_${i}.txt`;
        Logger.info(TAG, 'readyFile myFile = ' + myFile);
        let file = fs.openSync(myFile, fs.OpenMode.CREATE | fs.OpenMode.READ_WRITE);
        fs.writeSync(file.fd, new ArrayBuffer(ONE_KILOBYTE * Math.random()));
        fs.closeSync(file);
      }
    } catch (e) {
      Logger.error(TAG, 'Failed to prepare media files, error:' + e.message + e.code);
    }
  }
}