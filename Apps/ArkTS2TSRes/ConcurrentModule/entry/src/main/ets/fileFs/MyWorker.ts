let __generate__Id: number = 0;
function generateId(): string {
    return "MyWorker_" + ++__generate__Id;
}
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
import fs from '@ohos.file.fs';
import { Logger, sleep } from '../common/Common';
const CONTENT = 'hello world';
const TAG: string = '[ConcurrentModule].[MyWorker]';
const FILE_NUM: number = 200; // 预制200 1m以下的小文件
const FILE_NUMBER: number = 9; // 文件1-9命名时加上0
const LIST_FILE_TWO: number = 2; // 显示拷贝成功后的第二个文件名
const SLEEP_TIME: number = 100; // 睡眠时间
let workerInstance: worker.ThreadWorker | null = null;
let fileFlag: boolean = false;
export default class MyFile {
    public baseDir: string = '';
    public filesCount: number = 0;
    private flag: boolean = false;
    public realFileNames: Array<string> = [];
    constructor() {
        this.baseDir = AppStorage.get('sanBoxFileDir') as string;
    }
    readyFileToFileFs(): void {
        let fileFsDir = this.baseDir + '/fileFs';
        try {
            if (!fs.accessSync(fileFsDir)) {
                fs.mkdirSync(fileFsDir);
            }
            Logger.info(TAG, 'readyFileToFileFs successful');
        }
        catch (e) {
            Logger.error(TAG, `readyFileToFileFs has failed for: {message: ${(e as Error).message}, ${e}}`);
        }
    }
    // worker file
    readyFilesToWorker(): void {
        let content = CONTENT + CONTENT + new Date() + '\n';
        let workerDir = this.baseDir + '/workerDir';
        try {
            if (!fs.accessSync(workerDir)) {
                fs.mkdirSync(workerDir);
            }
            Logger.info(TAG, 'readyFilesToWorker dpath = ' + workerDir);
            for (let i = 0; i < FILE_NUM; i++) {
                let myFile = '';
                if (i < FILE_NUMBER) {
                    myFile = workerDir + `/TestFile0${i + 1}.txt`;
                }
                else {
                    myFile = workerDir + `/TestFile${i + 1}.txt`;
                }
                Logger.info(TAG, 'readyFilesToWorker myFile = ' + myFile);
                let file = fs.openSync(myFile, fs.OpenMode.CREATE | fs.OpenMode.READ_WRITE);
                fs.writeSync(file.fd, content);
                fs.closeSync(file);
            }
            Logger.info(TAG, 'readyFilesToWorker successful');
        }
        catch (e) {
            Logger.error(TAG, `readyFilesToWorker has failed for: {message: ${(e as Error).message}, ${e}}`);
        }
    }
    async workToCopyFiles(files: Array<string>, filePath: string): Promise<void> {
        try {
            Logger.info(TAG, 'WorkCreator start to create worker');
            let destPath = filePath;
            Logger.info(TAG, 'Workerets destPath ' + destPath);
            if (!fs.accessSync(destPath)) {
                fs.mkdirSync(destPath);
            }
            if (fs.accessSync(destPath)) {
                fs.listFile(destPath).then((filenames) => {
                    Logger.info(TAG, 'listFile succeed');
                    for (let i = 0; i < filenames.length; i++) {
                        Logger.info(TAG, 'Workerets fileName: ' + filenames[i]);
                    }
                }).catch((err: Error) => {
                    Logger.info(TAG, 'list file failed with error message: ' + err.message + ', error: ' + err);
                });
            }
            if (files !== null) {
                this.realFileNames.length = 0;
                for (let i = 0; i < files.length; i++) {
                    if (files[i] === 'deletedTag') {
                        continue;
                    }
                    this.realFileNames.push(files[i]);
                }
            }
            let count = this.realFileNames.length;
            for (let j = 0; j < count; j++) {
                Logger.info(TAG, 'workToCopyFiles this.realFileNames = ' + this.realFileNames[j]);
            }
            workerInstance = new worker.ThreadWorker('entry/ets/workers/WorkerCopy.ts');
            if (this.realFileNames !== null) {
                let srcPath = this.baseDir + '/workerDir';
                workerInstance.postMessage({
                    srcDir: srcPath,
                    destDir: destPath,
                    fileNames: this.realFileNames
                });
            }
            workerInstance.onexit = (code): void => {
                Logger.info(TAG, `workerInstance::onexit has been exit ${code}`);
            };
            workerInstance.onerror = (err): void => {
                Logger.info(TAG, `workerInstance::onerror has errors: ${JSON.stringify(err)}`);
            };
            workerInstance.onmessageerror = (event): void => {
                Logger.info(TAG, `workerInstance::onmessageerror has errors: ${JSON.stringify(event)}`);
            };
            workerInstance.onmessage = (message): void => {
                Logger.info(TAG, `workerInstance::onmessage receive data: ${JSON.stringify(message.data)}`);
                if (message.data.hasOwnProperty('count')) {
                    Logger.info(TAG, `workerInstance::onmessage receive data length = ${message.data.count}`);
                    this.filesCount = message.data.count;
                    fileFlag = message.data.strFlag;
                    this.flag = true;
                    let fileName1: string = '';
                    let fileName2: string = '';
                    for (let i = 0; i < message.data.listFileNames.length; i++) {
                        Logger.info(TAG, `Worker workerInstance::onmessage receive listFileNames: ${message.data.listFileNames[i]}`);
                    }
                    if (message.data.listFileNames[0] !== undefined && message.data.listFileNames[1] !== undefined && message.data.listFileNames[LIST_FILE_TWO] === undefined) {
                        fileName1 = message.data.listFileNames[0] + '、';
                        fileName2 = message.data.listFileNames[1];
                    }
                    else if (message.data.listFileNames[0] !== undefined && message.data.listFileNames[1] === undefined) {
                        fileName1 = message.data.listFileNames[0];
                        fileName2 = '';
                    }
                    else {
                        fileName1 = message.data.listFileNames[0] + '、';
                        let copyFileLog: string = AppStorage.get('copyFileLog5') as string;
                        fileName2 = message.data.listFileNames[1] + copyFileLog;
                    }
                    AppStorage.setOrCreate('fileListName1', fileName1);
                    AppStorage.setOrCreate('fileListName2', fileName2);
                    let copyFileLog3: string = AppStorage.get('copyFileLog3') as string;
                    let copyFileLog4: string = AppStorage.get('copyFileLog4') as string;
                    let copyFileLog = '2、' + fileName1 + fileName2 + copyFileLog3 + 'copy' + copyFileLog4;
                    if (fileName1 !== 'undefined、') {
                        AppStorage.setOrCreate('copyFileShowLog', copyFileLog);
                    }
                    else {
                        AppStorage.setOrCreate('copyFileShowLog', $r('app.string.workerLogChooseFile'));
                    }
                    Logger.info(TAG, `Worker workerInstance::onmessage receive count: ${JSON.stringify(this.filesCount)}`);
                }
                if (this.filesCount !== 0) {
                    AppStorage.setOrCreate('fileNumber', JSON.stringify(this.filesCount));
                }
                else {
                    AppStorage.setOrCreate('fileNumber', '0');
                    AppStorage.setOrCreate('fileListName1', '');
                    AppStorage.setOrCreate('fileListName2', '');
                }
                Logger.info(TAG, 'workerInstance::onmessage Finish to process data from WorkerCopy.ts');
                if (workerInstance !== null) {
                    workerInstance.terminate();
                }
            };
            while (!fileFlag) {
                await sleep(SLEEP_TIME);
            }
        }
        catch (e) {
            Logger.error(TAG, `Worker WorkCreator error package: message: ${(e as Error).message}, ${e}`);
        }
    }
    deleteCopyFile(filePath: string): void {
        Logger.info(TAG, 'deleteCopyFile destCopyFilePath = ' + filePath);
        try {
            if (fs.accessSync(filePath)) {
                let isDirectory = fs.statSync(filePath).isDirectory();
                if (isDirectory) {
                    fs.rmdirSync(filePath);
                    fs.mkdirSync(filePath);
                }
            }
        }
        catch (e) {
            Logger.error(TAG, `delete workerCopyFile error package: message: ${(e as Error).message}, ${e}`);
        }
    }
}
