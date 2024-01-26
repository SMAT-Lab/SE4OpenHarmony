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
import worker from '@ohos.worker';
import { ThreadWorkerGlobalScope } from '@ohos.worker';
import Logger from '../common/Logger';
import fs from '@ohos.file.fs';

const workerPort: ThreadWorkerGlobalScope = worker.workerPort;
const TAG: string = '[ConcurrentModule].[WorkerCopy]';

workerPort.onmessage = (message): void => {
  let srcPath: string = '';
  let destPath: string = '';
  let fileNames: object[] = message.data.fileNames;
  for (let i = 0; i < fileNames.length; i++) {
    srcPath = message.data.srcDir + '/' + fileNames[i];
    Logger.info(TAG, ' srcPath ' + srcPath);
    destPath = message.data.destDir + '/' + fileNames[i];
    Logger.info(TAG, ' destPath ' + destPath);
    try {
      fs.copyFileSync(srcPath, destPath);
      let countTest = fs.listFileSync(message.data.destDir).length;
      Logger.info(TAG, `Worker workerInstance::onmessage receive countTest: ${countTest}`);
    } catch (e) {
      Logger.error(TAG, 'WorkerCopy::copyFile has failed for: ' + JSON.stringify(e));
    }
  }
  let listFileNames: string[] = [];
  listFileNames.length = 0;
  try {
    let count = fs.listFileSync(message.data.destDir).length;
    let listFiles = fs.listFileSync(message.data.destDir);
    Logger.info(TAG, 'listFile succeed');
    for (let i = 0; i < listFiles.length; i++) {
      listFileNames[i] = listFiles[i];
      Logger.info(TAG, `Worker workerInstance::onmessage receive listFileNames: ${listFileNames[i]}`);
    }
    workerPort.postMessage({
      count: count,
      strFlag: true,
      listFileNames: listFileNames
    });
    Logger.info(TAG, 'WorkerCopy::onmessage thread post message successfully');
  } catch (e) {
    Logger.error(TAG, 'WorkerCopy::onmessage has failed for: ' + JSON.stringify(e));
  }
};

workerPort.onmessageerror = async (message): Promise<void> => {
  Logger.error(TAG, 'WorkerCopy::onmessageerror : ' + JSON.stringify(message));
};

workerPort.onerror = (e): void => {
  Logger.error(TAG, 'WorkerCopy::onerror : ' + JSON.stringify(e));
};