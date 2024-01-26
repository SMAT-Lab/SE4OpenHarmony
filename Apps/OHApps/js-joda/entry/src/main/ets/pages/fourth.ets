/**
 * BSD License
 *
 * Copyright (c) 2023 Huawei Device Co., Ltd. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * * Neither the name Facebook nor the names of its contributors may be used to
 * endorse or promote products derived from this software without specific
 * prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS' AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import {
  ZonedDateTime,
  ZoneId
} from '@js-joda/core'
// import '@js-joda/timezone'
import router from '@ohos.router';

@Entry
@Component
struct Fourth {
  @State message: string = ''

  build() {
    Row() {
      Scroll() {
        Column() {
          Button('带时区日期时间测试', { type: ButtonType.Capsule, stateEffect: true })
            .backgroundColor(0x317aff)
            .width(240)
            .onClick(() => {
              this.message = testZonedDateTime();
            })
          Text(this.message)
            .fontSize(20)
            .margin(10)
            .fontColor(Color.Blue)

          Button('下一页', { type: ButtonType.Capsule, stateEffect: true })
            .backgroundColor(0x317aff)
            .width(240)
            .onClick(() => {
              router.push({ url: 'pages/fifth' })
            })
        }
      }
      .width('100%')
    }
    .height('100%')
  }
}

// 带时区日期时间测试
function testZonedDateTime() {
  // 获取默认时区的日期时间 协调世界时
  console.info(ZonedDateTime.now().toString());
  // 转换固定偏移量日期时间
  console.info(ZonedDateTime.now().withFixedOffsetZone().toString());
  // 指定城市的日期时间
  console.info(ZonedDateTime.now(ZoneId.systemDefault()).toString());

  console.info(ZonedDateTime.now(ZoneId.systemDefault()).toString());

  return "获取带时区日期时间： " + ZonedDateTime.now().toString() + '\n' +
  "获取国内上海日期时间： " + ZonedDateTime.now(ZoneId.systemDefault()).toString() + '\n';
}