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
import { Exam } from "../msgpacksuit/exam";
import { MsgTimestamp } from "../msg/msg-timestamp";
import ohBuffer from '@ohos.buffer';
import { encode, decode, ExtensionCodec, EXT_TIMESTAMP, encodeTimeSpecToTimestamp } from "@msgpack/msgpack";
namespace MsgpackTestSuite2 {
    export function msgpackTestSuiteTest2(it: Function, expect: Function): void {
        const extensionCodec = new ExtensionCodec<undefined>();
        extensionCodec.register({
            type: EXT_TIMESTAMP,
            encode: (input) => {
                if (input instanceof MsgTimestamp) {
                    return encodeTimeSpecToTimestamp({
                        sec: input.getTime(),
                        nsec: input.getNano(),
                    });
                }
                else {
                    return null;
                }
            },
            decode: (data: Uint8Array) => {
                return MsgTimestamp.parse(ohBuffer.from(data));
            },
        });
        const TEST_TYPES = {
            array: 1,
            bignum: 0,
            binary: 1,
            bool: 1,
            map: 1,
            nil: 1,
            number: 1,
            string: 1,
            timestamp: 1,
        };
        Exam.getExams(TEST_TYPES).forEach((exam) => {
            const types = exam.getTypes(TEST_TYPES);
            const first = types[0]!;
            const title = `${first}: ${exam.stringify(first)}`;
            let result = `${exam.stringify(first)}`;
            it(`encodes_${title}`, 0, () => {
                types.forEach((type) => {
                    const value = exam.getValue(type);
                    let startTime1 = new Date().getTime();
                    const u8 = encode<undefined>(value, {
                        extensionCodec
                    });
                    let endTime1 = new Date().getTime();
                    let averageTime1 = ((endTime1 - startTime1) * 1000) / 1;
                    console.log(`msgpack-javascript:encodes_${title} averageTime = ${averageTime1}`);
                    if (exam.matchMsgpack(u8)) {
                        expect(exam.stringify(type) + "").assertContain(result);
                    }
                    else {
                    }
                });
            });
            it(`decodes_${title}`, 0, () => {
                const msgpacks = exam.getMsgpacks();
                msgpacks.forEach((encoded, idx) => {
                    let startTime1 = new Date().getTime();
                    const value = decode<undefined>(encoded.buffer, {
                        extensionCodec
                    });
                    let endTime1 = new Date().getTime();
                    let averageTime1 = ((endTime1 - startTime1) * 1000) / 1;
                    console.log(`msgpack-javascript:encodes_${title} averageTime = ${averageTime1}`);
                    let bufferStr = exam.stringify(idx);
                    if (exam.matchValue(value)) {
                        // 源库判断当前idx的数据内容是否存在，此处我们替换为
                        // assert(true, exam.stringify(idx));
                        let bufStrs = bufferStr.split('-');
                        let hexs = [];
                        let buf = [];
                        for (let i = 0; i < bufStrs.length; i++) {
                            let uin8Str = '0x' + bufStrs[i];
                            hexs.push(uin8Str);
                            let radix10 = Number.parseInt(uin8Str);
                            buf.push(radix10);
                        }
                        for (let i = 0; i < buf.length; i++) {
                            expect(buf[i]).assertEqual(encoded[i]);
                        }
                    }
                });
            });
        });
    }
}
export default MsgpackTestSuite2;
