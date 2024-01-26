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
import { encode, decode, ExtensionCodec, DecodeError } from "@msgpack/msgpack";
namespace CodecBigint {
    export function encodes_and_decodes_0n(): Object {
        let startTime1 = new Date().getTime();
        const extensionCodec = new ExtensionCodec<undefined>();
        extensionCodec.register({
            type: 0,
            encode: (input: Object) => {
                if (typeof input === "bigint") {
                    if (input <= Number.MAX_SAFE_INTEGER && input >= Number.MIN_SAFE_INTEGER) {
                        return encode<undefined>(Number.parseInt(input.toString(), 10));
                    }
                    else {
                        return encode<undefined>(input.toString());
                    }
                }
                else {
                    return null;
                }
            },
            decode: (data: Uint8Array) => {
                const val: Object = decode<undefined>(data);
                if (!(typeof val === "string" || typeof val === "number")) {
                    throw new DecodeError(`unexpected BigInt source: ${val} (${typeof val})`);
                }
                return BigInt(val);
            },
        });
        const value = BigInt(0);
        const encoded = encode<undefined>(value, { extensionCodec });
        const decoded = decode<undefined>(encoded, { extensionCodec });
        let endTime1 = new Date().getTime();
        let averageTime1 = ((endTime1 - startTime1) * 1000) / 4;
        console.log('msgpack-javascript:encodes_and_decodes_0n averageTime =' + averageTime1);
        return decoded;
    }
    export function encodes_and_decodes_MAX_SAFE_INTEGER_1(): Object {
        const extensionCodec = new ExtensionCodec<undefined>();
        extensionCodec.register({
            type: 0,
            encode: (input: Object) => {
                if (typeof input === "bigint") {
                    if (input <= Number.MAX_SAFE_INTEGER && input >= Number.MIN_SAFE_INTEGER) {
                        return encode<undefined>(Number.parseInt(input.toString(), 10));
                    }
                    else {
                        return encode<undefined>(input.toString());
                    }
                }
                else {
                    return null;
                }
            },
            decode: (data: Uint8Array) => {
                const val = decode<undefined>(data);
                if (!(typeof val === "string" || typeof val === "number")) {
                    throw new DecodeError(`unexpected BigInt source: ${val} (${typeof val})`);
                }
                return BigInt(val);
            },
        });
        const value = BigInt(Number.MAX_SAFE_INTEGER) + BigInt(1);
        let startTime1 = new Date().getTime();
        const encoded = encode<undefined>(value, {
            extensionCodec
        });
        const decoded = decode<undefined>(encoded, {
            extensionCodec
        });
        let endTime1 = new Date().getTime();
        let averageTime1 = ((endTime1 - startTime1) * 1000) / 2;
        console.log('msgpack-javascript:encodes_and_decodes_MAX_SAFE_INTEGER_1 averageTime =' + averageTime1);
        return decoded;
    }
    export function encodes_and_decodes_MIN_SAFE_INTEGER_minus1(): Object {
        const extensionCodec = new ExtensionCodec<undefined>();
        extensionCodec.register({
            type: 0,
            encode: (input: Object) => {
                if (typeof input === "bigint") {
                    if (input <= Number.MAX_SAFE_INTEGER && input >= Number.MIN_SAFE_INTEGER) {
                        return encode<undefined>(Number.parseInt(input.toString(), 10));
                    }
                    else {
                        return encode<undefined>(input.toString());
                    }
                }
                else {
                    return null;
                }
            },
            decode: (data: Uint8Array) => {
                const val = decode<undefined>(data);
                if (!(typeof val === "string" || typeof val === "number")) {
                    throw new DecodeError(`unexpected BigInt source: ${val} (${typeof val})`);
                }
                return BigInt(val);
            },
        });
        const value = BigInt(Number.MIN_SAFE_INTEGER) - BigInt(1);
        let startTime1 = new Date().getTime();
        const encoded = encode<undefined>(value, {
            extensionCodec
        });
        const decoded = decode<undefined>(encoded, {
            extensionCodec
        });
        let endTime1 = new Date().getTime();
        let averageTime1 = ((endTime1 - startTime1) * 1000) / 2;
        console.log('msgpack-javascript:encodes_and_decodes_MIN_SAFE_INTEGER_minus1 averageTime =' + averageTime1);
        return decoded;
    }
}
export default CodecBigint;
