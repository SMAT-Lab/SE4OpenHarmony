let __generate__Id: number = 0;
function generateId(): string {
    return "EncodeAndDecode.test_" + ++__generate__Id;
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
import { Base64 } from '@ohos/base64';
import { describe, expect, it } from '@ohos/hypium';
import { GlobalContext } from '../testability/GlobalContext';
import fileio from '@ohos.file.fs';
import { Context } from '@ohos.abilityAccessCtrl';
let test: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
export default function base64Test() {
    describe('base64Test', () => {
        it("test_encode", 0, () => {
            let encode = Base64.encode(new Uint8Array(test));
            expect("AQIDBAUGBwgJ").assertEqual(Base64.bytesToString(encode));
        });
        it("test_encodeBytesToBytes", 0, () => {
            let input = '123456';
            let encodeBytesToBytes = Base64.encodeBytesToBytes(Base64.stringToBytes(input));
            expect("MTIzNDU2").assertEqual(Base64.bytesToString(encodeBytesToBytes));
        });
        it("test_encodeToString", 0, () => {
            let input = '123456';
            let encodeString = Base64.encodeToString(Base64.stringToBytes(input));
            expect("MTIzNDU2").assertEqual(encodeString);
        });
        it("test_encodeBytes", 0, () => {
            let input = '123456';
            let encodeBytes = Base64.encodeBytes(Base64.stringToBytes(input));
            expect("MTIzNDU2").assertEqual(encodeBytes);
        });
        it("test_decode", 0, () => {
            let input = 'AABDCDHFAGA23';
            let encodeString = Base64.encodeToString(Base64.stringToBytes(input));
            let decodeString = Base64.bytesToString(Base64.decode(encodeString));
            expect("AABDCDHFAGA23").assertEqual(decodeString);
        });
        it("test_bytesToString", 0, () => {
            let encode = Base64.encode(new Uint8Array(test));
            let encodeString = Base64.bytesToString(encode);
            expect("AQIDBAUGBwgJ").assertEqual(encodeString);
        });
        it("test_stringToBytes", 0, () => {
            let encodeString = Base64.encodeToString(new Uint8Array(test));
            let encode = Base64.stringToBytes(encodeString);
            expect(Base64.encode(new Uint8Array(test)).toString()).assertEqual(encode.toString());
        });
        it("test_encodeToFile", 0, async () => {
            let context: Context = GlobalContext.getContext().getObject("context") as Context;
            let filePath: string = context.filesDir;
            Base64.encodeToFile(filePath + '/test.txt', new Uint8Array(test));
            let decodeBytes = Base64.decodeFromFile(filePath + '/test.txt');
            let encodeString = Base64.encodeToString(decodeBytes);
            expect(test.toString()).assertEqual(Base64.decode(encodeString).toString());
        });
        it("test_encodeFromFile", 0, async () => {
            let context: Context = GlobalContext.getContext().getObject("context") as Context;
            let filePath: string = context.filesDir;
            Base64.encodeToFile(filePath + '/test.txt', new Uint8Array(test));
            let encodeString = Base64.encodeFromFile(filePath + '/test.txt');
            let byte: string = "78,106,85,115,79,68,69,115,78,122,77,115,78,106,103,115,78,106,89,115,78,106,85,115,79,68,85,115,78,122,69,115,78,106,89,115,77,84,69,53,76,68,69,119,77,121,119,51,78,65,61,61";
            expect(byte).assertEqual(Base64.stringToBytes(encodeString).toString());
        });
        it("test_decodeToFile", 0, async () => {
            let context: Context = GlobalContext.getContext().getObject("context") as Context;
            let filePath: string = context.filesDir;
            let encodeString = Base64.encodeToString(new Uint8Array(test));
            Base64.decodeToFile(filePath + '/123.txt', encodeString);
            let bytes: string = readBytes(filePath + '/123.txt');
            expect(Base64.decode(encodeString).toString()).assertEqual(bytes.toString());
        });
        it("test_decodeFromFile", 0, async () => {
            let context: Context = GlobalContext.getContext().getObject("context") as Context;
            let filePath: string = context.filesDir;
            Base64.encodeToFile(filePath + '/test.txt', new Uint8Array(test));
            let decodeBytes = Base64.decodeFromFile(filePath + '/test.txt');
            expect(test.toString()).assertEqual(decodeBytes.toString());
        });
    });
}
function readBytes(filePath: string): string {
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
