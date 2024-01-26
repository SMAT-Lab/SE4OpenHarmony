/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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

import common from '@ohos.app.ability.common';
import fs from '@ohos.file.fs';
import { logger } from '../utils/Logger';

const TAG: string = 'FileUtil';
const ALBUMS: string[] = ['Pictures', 'Videos', 'Others'];

class FileUtil {
  constructor() {
  }

  async initDownloadDir(): Promise<void> {
    let context: common.UIAbilityContext = getContext(this) as common.UIAbilityContext;
    logger.info(TAG, `initDownloadDir cacheDir=${context.cacheDir}`);
    try {
      fs.mkdirSync(`${context.cacheDir}/${ALBUMS[0]}`);
      fs.mkdirSync(`${context.cacheDir}/${ALBUMS[1]}`);
      fs.mkdirSync(`${context.cacheDir}/${ALBUMS[2]}`);
    } catch (err) {
      logger.info(TAG, `initDownloadDir err =${JSON.stringify(err)}`);
    }
  }

  async listFolders(): Promise<Array<string>> {
    await this.initDownloadDir();
    return ALBUMS;
  }

  async clearFolder(folderName: string): Promise<void> {
    let context: common.UIAbilityContext = getContext(this) as common.UIAbilityContext;
    try {
      let files: string[] = fs.listFileSync(`${context.cacheDir}/${folderName}`);
      logger.info(TAG, `listFiles listFileSync =${JSON.stringify(files)}`);
      for (let i = 0; i < files.length; i++) {
        fs.unlinkSync(`${context.cacheDir}/${folderName}/${files[i]}`);
      }
    } catch (err) {
      logger.info(TAG, `listFiles err =${JSON.stringify(err)}`);
    }
  }

  async listFiles(folderName: string): Promise<Array<string>> {
    let context: common.UIAbilityContext = getContext(this) as common.UIAbilityContext;
    let files: string[] = [];
    try {
      files = fs.listFileSync(`${context.cacheDir}/${folderName}`);
      logger.info(TAG, `listFiles listFileSync =${JSON.stringify(files)}`);
    } catch (err) {
      logger.info(TAG, `listFiles err =${JSON.stringify(err)}`);
    }
    return files;
  }
}

export const fileUtils = new FileUtil();