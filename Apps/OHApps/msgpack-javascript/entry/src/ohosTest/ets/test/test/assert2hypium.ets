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

import { expect } from '@ohos/hypium'


namespace assert {
  export let strictEqual: Function = (src: Object, dst: Object, info?: string) => {
    expect(src).assertEqual(dst)
    if (info) {
      console.log(info)
    }
  }

  export let deepStrictEqual: Function = (src: Object, dst: Object, info?: string) => {
    expect(src).assertDeepEquals(dst)
    if (info) {
      console.log(info)
    }
  }

  export let notDeepStrictEqual: Function = (src: Object, dst: Object, info?: string) => {
    expect(src).not().assertDeepEquals(dst)
    if (info) {
      console.log(info)
    }
  }

  export let context: Function = (str: string, callback: Function) => {
    callback();
  }

  export let throws: Function = (srcCallback: Function, dstInfo: Object) => {
    try {
      srcCallback();
      // 如果不报错就是用例失败
      expect(false).assertTrue()
    } catch (err) {
      // 报错
      expect(true).assertTrue()
      console.log("err.msg=" + err.message)
      console.log("dstInfo=" + dstInfo)
    }
  }
}

export default assert;