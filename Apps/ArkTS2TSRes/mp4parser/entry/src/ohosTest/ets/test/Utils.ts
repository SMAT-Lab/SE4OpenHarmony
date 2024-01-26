let __generate__Id: number = 0;
function generateId(): string {
    return "Utils_" + ++__generate__Id;
}
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
import fs from '@ohos.file.fs';
export class XtsReadFilesUtil {
    static writeFile(path: string, content: ArrayBuffer | string) {
        let file = fs.openSync(path, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
        let writeLen = fs.writeSync(file.fd, content);
        let arrayBuffer = new ArrayBuffer(1024);
        class Option {
            public offset: number = 0;
            public length: number = 0;
        }
        let option = new Option();
        option.length = arrayBuffer.byteLength;
        fs.readSync(file.fd, arrayBuffer, option);
        fs.closeSync(file);
    }
    catch(e) {
        console.log("option file error msg " + JSON.stringify(e));
    }
    static typedArrayToBuffer(array: Uint8Array): ArrayBuffer {
        return array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset);
    }
}
