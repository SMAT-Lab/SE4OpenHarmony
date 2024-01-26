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
import { MsgTimestamp } from "../../../ohosTest/ets/test/test/msg/msg-timestamp";
import { EXT_TIMESTAMP, encodeTimeSpecToTimestamp, decodeMulti } from "@msgpack/msgpack";
import ohBuffer from '@ohos.buffer';
namespace Util {
    export let register = {
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
    };
    export function decodeMultiSetResult(encoded: Uint8Array, result: Array<Object>): void {
        for (let item of decodeMulti(encoded)) {
            result.push(item);
        }
    }
}
export default Util;
