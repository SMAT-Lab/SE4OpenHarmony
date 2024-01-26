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
import fs from '@ohos.file.fs';
import Logger from '../util/Logger';
const TAG: string = '[Crypto_Framework]';
const FILE_SLEEP_TIME: number = 100;
const TEXT_MAX_READ_LEN: number = 8192;
// filePicker和文件管理，在OH 4.0.8.2镜像版本，读取uri后，无法直接read、write文件内容，需要sleep几十ms，这里sleep100毫秒
function sleep(time: number): Promise<number> {
    return new Promise((resolve) => setTimeout(resolve, time));
}
class TextFileManager {
    public static readString: string = '';
    public static readResult: number = 0;
    public static readName: string = '';
    public static writeResult: number = 0;
    async readTextFile(textFileUri: string): Promise<void> {
        await sleep(FILE_SLEEP_TIME);
        try {
            // 读取
            let file = fs.openSync(textFileUri, fs.OpenMode.READ_ONLY);
            Logger.info(TAG, 'success, read only file ' + file.fd);
            // 从文件读取一段内容，限制最大长度为8192
            let buf = new ArrayBuffer(TEXT_MAX_READ_LEN);
            try {
                let readLen: number = fs.readSync(file.fd, buf, { offset: 0 });
                TextFileManager.readString = String.fromCharCode.apply(null, new Uint8Array(buf.slice(0, readLen)));
                TextFileManager.readResult = readLen;
                TextFileManager.readName = file.name;
            }
            catch (error1) {
                Logger.error(TAG, `file read failed, ${error1.code}, ${error1.message}`);
            }
            fs.closeSync(file);
        }
        catch (error) {
            Logger.error(TAG, `file open failed, ${error.code}, ${error.message}`);
            return;
        }
    }
    async writeTextFile(textFileUri: string, textString: string): Promise<void> {
        await sleep(FILE_SLEEP_TIME);
        try {
            // 读写
            let file = fs.openSync(textFileUri, fs.OpenMode.READ_WRITE);
            Logger.info(TAG, 'success, read write file' + file.fd);
            try {
                // 写入
                let writeLen = fs.writeSync(file.fd, textString);
                Logger.info(TAG, 'success, The length of str is: ' + writeLen);
                TextFileManager.writeResult = writeLen;
            }
            catch (error1) {
                Logger.error(TAG, `file write failed, ${error1.code}, ${error1.message}`);
            }
            fs.closeSync(file);
        }
        catch (error) {
            Logger.error(TAG, `file open failed, ${error.code}, ${error.message}`);
            return;
        }
    }
    getString(): string {
        return TextFileManager.readString;
    }
    getName(): string {
        return TextFileManager.readName;
    }
}
export default new TextFileManager();
