/**
 *  MIT License
 *
 *  Copyright (c) 2023 Huawei Device Co., Ltd.
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 */

import { chunk, compact, uniq, union } from "lodash";

@Entry
@Component
struct Index {
  private sampleArray = [1, 'a', 4, 7, 9, 's', 'r',2, 5, 'o', 's', 'p', 34, 'k'];
  @State resultArray: number[] = [];

  build() {
    Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center }) {
      Text("显示运行结果:" + JSON.stringify(this.resultArray))
      Button('将数组拆分成多个长度的区块，组成一个新数组')
         .onClick(() => {
          this.resultArray = chunk(this.sampleArray, 5)
          console.log('chunk:' + JSON.stringify(this.resultArray))
        }).margin(10)

      //false, null,0, "", undefined, 和 NaN 都是被认为是“假值”
      Button('将数组过滤掉假值組成新数组')
        .onClick(() => {
          this.resultArray = compact([0, undefined, 1, false, 2, '', 3, true, null])
          console.log('compact:' + JSON.stringify(this.resultArray))
        }).margin(10)

      Button('展示去重后的数组')
        .onClick(() => {
          this.resultArray = uniq([12,2,3,2,1,2,2,1,1,3,4])
          console.log('[12,2,3,2,1,2,2,1,1,3,4] uniq:' + JSON.stringify(this.resultArray));
        }).margin(10)

      Button('展示合并多个数组后新生成的数组')
        .onClick(() => {
          this.resultArray = union([12,2,6,1],[3,2,1,3,4,6,2],[2,1])
          console.log('[12,2,6,1],[3,2,1,3,4,6,2],[2,1] union:' + JSON.stringify(this.resultArray))
        }).margin(10)
    }
    .width('100%')
    .height('100%')
  }
}
