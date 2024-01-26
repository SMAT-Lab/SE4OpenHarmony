/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import fileio from '@ohos.fileio';
export default class FileUtil {
    /**
   * Saves the contents of a <code>byte[]</code> to the specified {@link File}.
   */
    public static saveBytes(filePath: string, bytes: ArrayBuffer) {
        let writeFd = fileio.openSync(filePath, 0o2 | 0o100);
        let stream = fileio.fdopenStreamSync(writeFd, "r+");
        try {
            let writelength = stream.writeSync(bytes, {
                offset: 0,
                length: bytes.byteLength,
                encoding: 'utf-8'
            });
        }
        finally {
            stream.close();
            fileio.close(writeFd);
        }
    }
    public static readBytes(filePath: string): Int8Array {
        let readFd = fileio.openSync(filePath, 0o0);
        let stream = fileio.fdopenStreamSync(readFd, "r");
        let buf = new ArrayBuffer(1024 * 10 * 100);
        try {
            let length = stream.readSync(buf);
            if (length != 0) {
                console.info("FileUtil readBytes not read all");
            }
            return new Int8Array(buf);
        }
        finally {
            stream.close();
            fileio.close(readFd);
        }
    }
}
