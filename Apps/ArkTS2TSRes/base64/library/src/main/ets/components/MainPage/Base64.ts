let __generate__Id: number = 0;
function generateId(): string {
    return "Base64_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import fileio from '@ohos.file.fs';
import util from '@ohos.util';
export class Base64 {
    public static decode(input: Uint8Array | string): Uint8Array {
        let base64 = new util.Base64Helper();
        return base64.decodeSync(input);
    }
    public static encode(input: Uint8Array): Uint8Array {
        let base64 = new util.Base64Helper();
        return base64.encodeSync(input);
    }
    public static encodeToString(input: Uint8Array): string {
        let base64 = new util.Base64Helper();
        return base64.encodeToStringSync(input);
    }
    /**
     * Similar to  encodeBytes(bytes: Uint8Array)} but returns
     * a byte array instead of instantiating a String. This is more efficient
     * if you're working with I/O streams and have large data sets to encode.
     *
     * @param source The data to convert
     * @return The Base64-encoded data as a  Uint8Array
     *
     */
    public static encodeBytesToBytes(source: Uint8Array): Uint8Array {
        return Base64.stringToBytes(Base64.encodeBytes(source));
    }
    public static encodeToFile(filePath: string, data: Uint8Array): void {
        Base64.saveBytes(filePath, Base64.encode(data).toString());
    }
    public static decodeToFile(filePath: string, data: Uint8Array | string): void {
        Base64.saveBytes(filePath, Base64.decode(data).toString());
    }
    public static encodeFromFile(filePath: string): string {
        return Base64.encodeToString(Base64.stringToBytes(Base64.readBytes(filePath)));
    }
    public static decodeFromFile(filePath: string): Uint8Array {
        let result: string[] = Base64.readBytes(filePath).split(',');
        let resultArray: number[] = new Array();
        for (let index = 0; index < result.length; index++) {
            resultArray.push(Number.parseInt(result[index]));
        }
        return Base64.decode(new Uint8Array(resultArray));
    }
    public static encodeBytes(bytes: Uint8Array): string {
        return Base64.encodeToString(bytes);
    }
    public static bytesToString(bytes: Uint8Array): string {
        let str = "";
        for (let i = 0; i < bytes.length; i++) {
            str += String.fromCharCode(bytes[i]);
        }
        return str;
    }
    public static stringToBytes(str: string): Uint8Array {
        let bytes: number[] = new Array();
        for (let i = 0; i < str.length; i++) {
            bytes.push(str.charCodeAt(i));
        }
        return new Uint8Array(bytes);
    }
    /**
  * Saves the contents of a <code>byte[]</code> to the specified {@link File}.
  */
    private static saveBytes(filePath: string, bytes: ArrayBuffer | string) {
        let writeFd = fileio.openSync(filePath, fileio.OpenMode.READ_WRITE | fileio.OpenMode.CREATE);
        let stream = fileio.fdopenStreamSync(writeFd.fd, "r+");
        let length = 0;
        if (bytes instanceof ArrayBuffer) {
            length = bytes.byteLength;
        }
        else {
            length = bytes.length;
        }
        try {
            stream.writeSync(bytes, {
                offset: 0,
                length: length,
                encoding: 'utf-8'
            });
        }
        finally {
            stream.close();
        }
    }
    private static readBytes(filePath: string): string {
        let readFd = fileio.openSync(filePath, fileio.OpenMode.READ_ONLY);
        let stream = fileio.fdopenStreamSync(readFd.fd, "r");
        try {
            let state = fileio.statSync(filePath);
            let buf = new ArrayBuffer(state.size);
            stream.readSync(buf);
            return String.fromCharCode(...new Uint8Array(buf));
        }
        finally {
            stream.close();
        }
    }
}
