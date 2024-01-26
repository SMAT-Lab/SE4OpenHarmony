let __generate__Id: number = 0;
function generateId(): string {
    return "snappjs.test_" + ++__generate__Id;
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
import snappyJS from 'snappyjs';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import Buffer from '@ohos.buffer';
import fs from '@ohos.file.fs';
import { GlobalContext } from './GlobalContext';
export default function snappyJSTest() {
    // fromCharCode, but understands right > 0xffff values
    describe('snappyJSTest', () => {
        let textrandomInputString = '// The MIT License (MIT)\r\n//\r\n// Copyright (c) 2016 Zhipeng Jia\r\n//\r\n// Permission is hereby granted, free of charge, to any person obtaining a copy\r\n// of this software and associated documentation files (the "Software"), to deal\r\n// in the Software without restriction, including without limitation the rights\r\n// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r\n// copies of the Software, and to permit persons to whom the Software is\r\n// furnished to do so, subject to …/ 6)\r\n}\r\n\r\nSnappyCompressor.prototype.compressToBuffer = function (outBuffer) {\r\n  var array = this.array\r\n  var length = array.length\r\n  var pos = 0\r\n  var outPos = 0\r\n\r\n  var fragmentSize\r\n\r\n  outPos = putVarint(length, outBuffer, outPos)\r\n  while (pos < length) {\r\n    fragmentSize = Math.min(length - pos, BLOCK_SIZE)\r\n    outPos = compressFragment(array, pos, fragmentSize, outBuffer, outPos)\r\n    pos += fragmentSize\r\n  }\r\n\r\n  return outPos\r\n}\r\n\r\nexports.SnappyCompressor = SnappyCompressor\r\n';
        let compresseduin = new Uint8Array([204, 15, 128, 47, 0, 47, 0, 32, 0, 84, 0, 104, 0, 101, 0, 32, 0, 77, 0, 73, 0, 84, 0, 32, 0, 76, 0, 105, 0, 99, 0, 101, 0, 110, 0, 115, 5, 24, 0, 40, 13, 26, 20, 41, 0, 13, 0, 10, 0, 1, 52, 17, 8, 184, 32, 0, 67, 0, 111, 0, 112, 0, 121, 0, 114, 0, 105, 0, 103, 0, 104, 0, 116, 0, 32, 0, 40, 0, 99, 0, 41, 0, 32, 0, 50, 0, 48, 0, 49, 0, 54, 0, 32, 0, 90, 0, 104, 0, 105, 0, 112, 5, 84, 32, 103, 0, 32, 0, 74, 0, 105, 0, 97, 21, 70, 25, 78, 80, 80, 0, 101, 0, 114, 0, 109, 0, 105, 0, 115, 0, 115, 0, 105, 0, 111, 0, 110, 0, 32, 5, 14, 0, 32, 5, 164, 112, 114, 0, 101, 0, 98, 0, 121, 0, 32, 0, 103, 0, 114, 0, 97, 0, 110, 0, 116, 0, 101, 0, 100, 0, 44, 0, 32, 0, 102, 5, 30, 1, 200, 64, 111, 0, 102, 0, 32, 0, 99, 0, 104, 0, 97, 0, 114, 0, 103, 0, 101, 5, 32, 16, 116, 0, 111, 0, 32, 5, 52, 1, 64, 4, 112, 0, 1, 106, 0, 115, 13, 98, 40, 111, 0, 98, 0, 116, 0, 97, 0, 105, 0, 110, 5, 4, 1, 164, 0, 97, 5, 68, 9, 222, 25, 162, 9, 92, 0, 116, 5, 208, 8, 115, 0, 32, 5, 66, 16, 102, 0, 116, 0, 119, 5, 108, 1, 126, 1, 150, 0, 100, 5, 106, 1, 196, 8, 111, 0, 99, 5, 236, 9, 168, 8, 32, 0, 100, 5, 18, 8, 117, 0, 109, 37, 12, 16, 116, 0, 97, 0, 116, 21, 232, 24, 102, 0, 105, 0, 108, 0, 101, 5, 88, 0, 40, 5, 100, 1, 80, 8, 34, 0, 83, 5, 118, 25, 100, 8, 34, 0, 41, 29, 210, 24, 100, 0, 101, 0, 97, 0, 108, 29, 164, 1, 198, 0, 32, 21, 64, 62, 62, 0, 16, 32, 0, 119, 0, 105, 5, 30, 8, 111, 0, 117, 37, 176, 0, 114, 5, 116, 0, 116, 37, 196, 0, 99, 21, 144, 33, 84, 1, 74, 24, 99, 0, 108, 0, 117, 0, 100, 5, 12, 33, 24, 62, 62, 0, 8, 108, 0, 105, 37, 178, 54, 204, 0, 0, 116, 37, 176, 0, 32, 5, 84, 73, 24, 0, 115, 29, 162, 41, 140, 0, 117, 69, 96, 1, 104, 0, 99, 45, 104, 1, 12, 8, 109, 0, 111, 5, 110, 8, 102, 0, 121, 13, 16, 33, 170, 0, 103, 45, 198, 16, 112, 0, 117, 0, 98, 5, 116, 8, 115, 0, 104, 5, 32, 1, 154, 0, 115, 13, 190, 0, 98, 5, 210, 0, 101, 5, 24, 0, 115, 21, 42, 89, 204, 1, 96, 41, 160, 16, 47, 0, 111, 0, 114, 37, 192, 8, 101, 0, 108, 50, 62, 1, 9, 140, 0, 105, 37, 20, 4, 32, 0, 57, 240, 33, 140, 62, 76, 1, 25, 80, 33, 112, 65, 96, 73, 88, 65, 194, 8, 116, 0, 32, 13, 14, 73, 102, 65, 46, 9, 248, 24, 119, 0, 104, 0, 111, 0, 109, 5, 52, 105, 122, 62, 88, 0, 0, 32, 69, 244, 89, 118, 20, 102, 0, 117, 0, 114, 0, 65, 156, 1, 246, 65, 242, 17, 112, 65, 80, 73, 134, 1, 140, 9, 244, 8, 106, 0, 101, 37, 200, 0, 32, 13, 112, 4, 38, 32, 97, 230, 0, 54, 109, 192, 0, 125, 5, 88, 1, 92, 24, 83, 0, 110, 0, 97, 0, 112, 101, 192, 97, 200, 8, 109, 0, 112, 77, 12, 1, 178, 8, 114, 0, 46, 5, 16, 0, 111, 5, 70, 8, 116, 0, 121, 5, 206, 4, 46, 0, 33, 32, 46, 42, 0, 44, 84, 0, 111, 0, 66, 0, 117, 0, 102, 0, 102, 0, 33, 170, 8, 32, 0, 61, 101, 142, 8, 117, 0, 110, 5, 134, 113, 198, 4, 40, 0, 73, 112, 46, 44, 0, 129, 38, 0, 123, 5, 140, 16, 32, 0, 32, 0, 118, 101, 68, 97, 164, 4, 114, 0, 97, 222, 0, 121, 13, 76, 0, 116, 109, 110, 0, 46, 5, 32, 9, 26, 1, 192, 46, 52, 0, 97, 56, 8, 110, 0, 103, 5, 44, 9, 130, 97, 252, 9, 44, 0, 46, 50, 30, 0, 62, 58, 0, 8, 112, 0, 111, 37, 156, 1, 182, 0, 48, 66, 30, 0, 9, 180, 0, 80, 66, 36, 0, 62, 70, 0, 0, 102, 5, 108, 0, 103, 117, 216, 24, 83, 0, 105, 0, 122, 0, 101, 5, 40, 17, 44, 70, 76, 0, 65, 206, 8, 116, 0, 86, 5, 172, 97, 108, 8, 116, 0, 40, 50, 172, 0, 33, 212, 9, 54, 0, 66, 61, 98, 25, 22, 9, 152, 169, 152, 33, 14, 65, 90, 137, 68, 161, 134, 17, 218, 8, 60, 0, 32, 50, 86, 0, 8, 41, 0, 32, 61, 118, 1, 56, 94, 190, 0, 41, 74, 4, 77, 0, 129, 166, 8, 104, 0, 46, 69, 216, 0, 110, 58, 164, 0, 8, 32, 0, 45, 69, 234, 8, 111, 0, 115, 5, 154, 72, 66, 0, 76, 0, 79, 0, 67, 0, 75, 0, 95, 0, 83, 0, 73, 0, 90, 0, 69, 29, 162, 1, 110, 9, 210, 9, 188, 9, 98, 62, 84, 2, 0, 70, 58, 78, 1, 0, 40, 37, 34, 41, 206, 1, 254, 9, 218, 1, 10, 94, 186, 0, 1, 28, 9, 104, 0, 66, 146, 58, 1, 1, 152, 9, 86, 8, 32, 0, 43, 69, 12, 94, 90, 0, 49, 206, 121, 72, 1, 60, 161, 68, 0, 116, 109, 166, 0, 32, 13, 122, 9, 226, 1, 48, 25, 44, 8, 101, 0, 120, 5, 104, 24, 114, 0, 116, 0, 115, 0, 46, 130, 132, 3, 41, 32, 0, 83, 122, 170, 3, 12, 13, 0, 10, 0]);
        let bufferToArrayBuffer: (buffer: Uint8Array) => ArrayBuffer = (buffer: Uint8Array) => {
            let arrayBuffer = new ArrayBuffer(buffer.byteLength);
            let view = new Uint8Array(arrayBuffer);
            let i: number = 0;
            for (i = 0; i < buffer.byteLength; i++) {
                view[i] = buffer[i];
            }
            return arrayBuffer;
        };
        let stringToUint8Array: (source: string) => Uint8Array = (source: string) => {
            let arrayBuffer = new ArrayBuffer(source.length * 2);
            let view = new Uint16Array(arrayBuffer);
            let i: number = 0;
            for (i = 0; i < source.length; i++) {
                view[i] = source.charCodeAt(i);
            }
            return new Uint8Array(arrayBuffer);
        };
        let stringToArrayBuffer: (source: string) => ArrayBuffer = (source: string) => {
            let arrayBuffer = new ArrayBuffer(source.length * 2);
            let view = new Uint16Array(arrayBuffer);
            let i: number = 0;
            for (i = 0; i < source.length; i++) {
                view[i] = source.charCodeAt(i);
            }
            return arrayBuffer;
        };
        let arrayBufferToString: (arrayBuffer: ArrayBuffer) => string = (arrayBuffer: ArrayBuffer) => {
            let view = new Uint16Array(arrayBuffer);
            let result: string = '';
            let i: number = 0;
            for (i = 0; i < view.length; i++) {
                result += String.fromCharCode(view[i]);
            }
            return result;
        };
        let randomString: (length: number) => string = (length: number) => {
            let result = '';
            let i: number = 0;
            let code: number = 0;
            for (i = 0; i < length; i++) {
                code = Math.floor(Math.random() * 256);
                result += String.fromCharCode(code);
            }
            return result;
        };
        beforeAll(() => {
        });
        beforeEach(() => {
        });
        afterEach(() => {
            // Presets a clear action, which is performed after each unit test case ends.
            // The number of execution times is the same as the number of test cases defined by **it**.
            // This API supports only one parameter: clear action function.
        });
        afterAll(() => {
            // Presets a clear action, which is performed after all test cases of the test suite end.
            // This API supports only one parameter: clear action function.
        });
        it('compress', 0, async () => {
            let context: Context = GlobalContext.getContext().getObject("context") as Context;
            let data = context.filesDir + '/hellow.txt';
            let fd = fs.openSync(data, 0o102);
            fs.writeSync(fd.fd, 'hello world');
            let stat = fs.statSync(data);
            const long_sample = new ArrayBuffer(stat.size);
            let file = fs.openSync(data, fs.OpenMode.READ_WRITE);
            let num = fs.readSync(file.fd, long_sample);
            fs.closeSync(fd);
            fs.closeSync(file);
            expect(snappyJS.compress(long_sample))
                .assertDeepEquals(Buffer.from([11, 40, 104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100]).buffer);
        });
        it('uncompress', 2, () => {
            let context: Context = GlobalContext.getContext().getObject("context") as Context;
            let data = context.filesDir + '/hellow1.txt';
            let fd = fs.openSync(data, 0o102);
            fs.writeSync(fd.fd, 'hello world 😂 🎧 🚀');
            let stat = fs.statSync(data);
            const long_sample = new ArrayBuffer(stat.size);
            let file = fs.openSync(data, fs.OpenMode.READ_WRITE);
            let num = fs.readSync(file.fd, long_sample);
            fs.closeSync(fd);
            fs.closeSync(file);
            expect(snappyJS.uncompress(snappyJS.compress(long_sample))).assertDeepEquals(Buffer.from(long_sample).buffer);
        });
        it('compressUint8Array', 3, () => {
            let compressed: Uint8Array = snappyJS.compress(stringToUint8Array(textrandomInputString));
            let uncompressed: Uint8Array = snappyJS.uncompress(compressed);
            let compressedstr: string = arrayBufferToString(bufferToArrayBuffer(uncompressed));
            expect(compressed.toString()).assertEqual(compresseduin.toString());
            expect(compressedstr).assertEqual(textrandomInputString);
        });
        it('compressArrayBuffer', 4, () => {
            let compressed: ArrayBuffer = snappyJS.compress(stringToArrayBuffer(textrandomInputString));
            let uncompressed: ArrayBuffer = snappyJS.uncompress(compressed);
            let compressedstr: string = arrayBufferToString(uncompressed);
            expect(new Uint8Array(compressed).toString()).assertEqual(compresseduin.toString());
            expect(compressedstr).assertEqual(textrandomInputString);
        });
        it('compress100000Uint8Array', 5, () => {
            let randomInputUint8Array: Uint8Array = stringToUint8Array(randomString(100000));
            let compressed: Uint8Array = snappyJS.compress(randomInputUint8Array);
            let uncompressed: ArrayBuffer = snappyJS.uncompress(compressed);
            expect(randomInputUint8Array.toString()).assertEqual(uncompressed.toString());
        });
        it('compress100000ArrayBuffer', 5, () => {
            let randomInputArrayBuffer: ArrayBuffer = stringToArrayBuffer(randomString(100000));
            let compressed: Uint8Array = snappyJS.compress(randomInputArrayBuffer);
            let uncompressed: ArrayBuffer = snappyJS.uncompress(compressed);
            expect(randomInputArrayBuffer.toString()).assertEqual(uncompressed.toString());
        });
        it('compress100Uint8Array', 8, () => {
            let randomInputString: string = randomString(100);
            let compressed: Uint8Array = snappyJS.compress(stringToUint8Array(randomInputString));
            let uncompressed: Uint8Array = snappyJS.uncompress(compressed);
            let uncompressedString: string = arrayBufferToString(bufferToArrayBuffer(uncompressed));
            expect(uncompressedString == randomInputString).assertTrue();
        });
        it('compress100ArrayBuffer', 7, () => {
            let randomInputString: string = randomString(100);
            let compressed: Uint8Array = snappyJS.compress(stringToArrayBuffer(randomInputString));
            let uncompressed: ArrayBuffer = snappyJS.uncompress(compressed);
            let uncompressedString: string = arrayBufferToString(uncompressed);
            expect(uncompressedString == randomInputString).assertTrue();
        });
        it('uncompressmaxLength', 10, () => {
            let randomInputString: string = randomString(100000);
            let compressed: Uint8Array = snappyJS.compress(stringToArrayBuffer(randomInputString));
            expect(snappyJS.uncompress(compressed, 99999))
                .assertThrowError('The uncompressed length of 200000 is too big, expect at most 99999');
        });
    });
}
