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
import http from '@ohos.net.http';
import { FileModel } from './model/FileModel';
import { logger } from '../utils/Logger';
import { urlUtils } from '../utils/UrlUtils';

const TAG: string = 'RequestFiles';
const FILE_LENGTH: number = 2;

class Request {
  async requestFiles() {
    let httpRequest = http.createHttp();
    let files: Array<FileModel> = [];
    let context: common.UIAbilityContext = getContext(this) as common.UIAbilityContext;
    let url = await urlUtils.getUrl(context);
    let header: Record<string, string> = {
      'Content-Type': 'text/plain'
    }
    try {
      let requestOption: http.HttpRequestOptions = {
        method: http.RequestMethod.GET,
        header: header
      }
      let response = await httpRequest.request(url + '/?tpl=list&folders-filter=&recursive', requestOption);
      logger.info(TAG, `data = ${JSON.stringify(response)}`);
      let result: string = response.result.toString();
      logger.info(TAG, `Result = ${result}`);

      let tempFiles = result.split('\r\n');
      for (let i = 0; i < tempFiles.length; i++) {
        let splitFiles = tempFiles[i].split('//')[1].split('/');
        logger.info(TAG, `splitFiles = ${JSON.stringify(splitFiles)}`);
        if (splitFiles.length === FILE_LENGTH) { // 代表是根目录下的文件
          let name = splitFiles.pop();
          if (name) {
            files.push(new FileModel(name, false, [tempFiles[i]]));
          }
        } else { // 文件夹
          let folderName = splitFiles[1];
          if (files.length === 0) {
            files.push(new FileModel(folderName, true, []));
          } else {
            let index = 0;
            while (index < files.length) {
              if (files[index].name === folderName) {
                files[index].files.push(tempFiles[i]);
                break;
              }
              index++;
            }
            if (index === files.length) {
              files.push(new FileModel(folderName, true, []));
            }
          }
        }
      }
      files = files.sort((a: FileModel, b: FileModel) => {
        if (a.isFolder && b.isFolder) {
          return a.name.localeCompare(b.name);
        } else if (a.isFolder && b.isFolder === false) {
          return -1;
        } else {
          return 1;
        }
      })
      logger.info(TAG, `files = ${JSON.stringify(files)}`);
      return files;
    } catch (err) {
      logger.info(TAG, `error: ${JSON.stringify(err)}`);
      httpRequest.destroy();
      return [];
    }
  }
}

export const requestFiles = new Request();