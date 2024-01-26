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
import fs from '@ohos.file.fs';
import Logger from '../common/Logger';
import { bufferToString } from '../common/Common';
const TAG = 'MediaFileUri';
const RECENT_MAX = 10; // 最近打开最大文件数
const BUFFER_SIZE = 4096; // 文件读写缓冲区大小
const COMMON_FD = -1; // 文件fd默认值
const MODE_READ_ONLY = 0;
const MODE_WRITE_ONLY = 1;
const MODE_READ_WRITE = 2;
export default class MediaFileUri {
    content: string = '';
    private commonFd: number = COMMON_FD;
    private fileSizeList: Array<number> = [];
    private fileNameList: Array<string> = [];
    private fileUriList: Array<string> = [];
    constructor() {
    }
    getMode(openFlag: number): number {
        let mode: number = 0;
        switch (openFlag) {
            case MODE_READ_ONLY:
                mode = fs.OpenMode.READ_ONLY; // r
                break;
            case MODE_WRITE_ONLY:
                mode = fs.OpenMode.WRITE_ONLY; // w
                break;
            case MODE_READ_WRITE:
                mode = fs.OpenMode.READ_WRITE; // rw
                break;
        }
        return mode;
    }
    myWriteSync(fd: number, content: string, isClose: boolean): void {
        try {
            let result = fs.writeSync(fd, content);
            Logger.info(TAG, 'myWriteSync: write result = ' + result);
        }
        catch (err) {
            Logger.error(TAG, 'myWriteSync： write failed with error:' + err);
        }
        if (isClose) {
            this.closeSync(fd);
            this.commonFd = COMMON_FD;
        }
        else {
            this.commonFd = fd;
        }
    }
    // sync-close
    closeSync(fd: number): void {
        try {
            fs.closeSync(fd);
            Logger.info(TAG, 'closeSync file finish.');
        }
        catch (err) {
            Logger.error(TAG, 'closeSync file error = ' + err);
        }
    }
    readFileContent(uri: string, isRead: boolean = true, isClose: boolean = true): string {
        let content = '';
        Logger.info(TAG, 'open path = ' + uri);
        let file: fs.File;
        if (isClose || this.commonFd === COMMON_FD) {
            try {
                file = fs.openSync(uri, fs.OpenMode.READ_ONLY);
                Logger.info(TAG, 'openReadSync: get fd success. fd = ' + file.fd);
                this.commonFd = file.fd;
            }
            catch (err) {
                Logger.error(TAG, 'openReadSync: open file failed. error = ' + err);
                return content;
            }
            if (file === undefined) {
                Logger.error(TAG, 'openReadSync: open file failed. file = undefined.');
                return content;
            }
        }
        if (isRead) {
            try {
                let buffer = new ArrayBuffer(BUFFER_SIZE);
                let readOut = fs.readSync(this.commonFd, buffer, {
                    offset: 0
                });
                content = bufferToString(buffer);
            }
            catch (err) {
                Logger.error(TAG, 'myReadSync: read error: ' + err);
                return content;
            }
            if (isClose) {
                this.closeSync(this.commonFd);
                this.commonFd = COMMON_FD;
            }
            else {
                this.commonFd = this.commonFd;
            }
        }
        return content;
    }
    myGetFileSize(uri: string, mode: number): number {
        let file = fs.openSync(uri, mode); // fs.OpenMode.READ_ONLY
        Logger.info(TAG, 'file fd: ' + file.fd);
        let stat = fs.statSync(file.fd);
        Logger.info(TAG, 'get file info succeed, the size of file is ' + stat.size);
        return stat.size;
    }
    writeFileContent(uri: string, content: string): void {
        Logger.info(TAG, 'writeFileContent begin');
        let file = fs.openSync(uri, fs.OpenMode.READ_WRITE);
        Logger.info(TAG, 'writeFileContent file fd: ' + file.fd);
        let writeLen = fs.writeSync(file.fd, content);
        Logger.info(TAG, 'writeFileContent write data to file succeed and size is:' + writeLen);
        fs.closeSync(file);
    }
    async getAllFiles(context): Promise<void> {
        Logger.info(TAG, 'getAllFiles begin');
        AppStorage.SetOrCreate('fileNameList', this.fileNameList);
        AppStorage.SetOrCreate('fileSizeList', this.fileSizeList);
        AppStorage.SetOrCreate('fileUriList', this.fileUriList);
    }
}
