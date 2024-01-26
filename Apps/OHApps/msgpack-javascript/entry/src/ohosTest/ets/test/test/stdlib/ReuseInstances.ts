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

import { Encoder, Decoder } from "@msgpack/msgpack";
import { reuseobject } from "./StdlibData"

namespace ReuseInstances {
  const createStream = async function* (...args: any) {
    for (const item of args) {
      yield item;
    }
  };

  export function runsMultipleTimes1(): Object {
    let encoder = new Encoder<undefined>();
    let decoder = new Decoder<undefined>();
    let encoded: Uint8Array = encoder.encode(reuseobject);
    return decoder.decode(encoded);
  }

  export async function runsMultipleTimes2(): Promise<Object> {
    let encoder = new Encoder<undefined>();
    let decoder = new Decoder<undefined>();
    let encoded: Uint8Array = encoder.encode(reuseobject);
    return await decoder.decodeAsync(createStream(encoded));
  }

  export async function runsMultipleTimes3Or4(result: Array<Object>, index: number): Promise<void> {
    let encoder = new Encoder<undefined>();
    let decoder = new Decoder<undefined>();
    let encoded: Uint8Array;
    if (index === 4) {
      encoded = encoder.encode([reuseobject]);
    } else if (index === 3) {
      encoded = encoder.encode(reuseobject);
    }
    for await (const item of decoder.decodeStream(createStream(encoded))) {
      result.push(item);
    }
  }

}

export default ReuseInstances;