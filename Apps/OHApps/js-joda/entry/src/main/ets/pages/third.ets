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

import { DateTimeFormatter, LocalDateTime, ZoneId, Clock ,ZoneRegion, ZonedDateTime} from '@js-joda/core'
import router from '@ohos.router';

@Entry
@Component
struct Third {
  @State message: string = ''

  build() {
    Row() {
      Scroll() {
        Column() {
          Button('本地日期时间测试', { type: ButtonType.Capsule, stateEffect: true })
            .backgroundColor(0x317aff)
            .width(240)
            .onClick(() => {
              this.message = testLocalDateTime();
            })
          Text(this.message)
            .fontSize(20)
            .margin(10)
            .fontColor(Color.Blue)

          Button('下一页', { type: ButtonType.Capsule, stateEffect: true })
            .backgroundColor(0x317aff)
            .width(240)
            .onClick(() => {
              router.push({ url: 'pages/fourth' })
            })
        }
      }
      .width('100%')
    }
    .height('100%')
  }
}

// 本地日期时间测试
function testLocalDateTime(): string {
  // 获取日期时间（默认时区 UTC协调世界时）
  console.info(LocalDateTime.now().toString());
  // 获取指定城市的日期时间
  // 构建一个日期时间：2016-02-29T12:55:42.000000009
  console.info(LocalDateTime.of(2016, 2, 29, 12, 55, 42, 9).toString());
  // 获取日期时间类中的信息
  let mDateTime = LocalDateTime.parse("2016-02-29T12:55:42.000000009");

  // ISO 8601规范日期时间值
  console.info(mDateTime.toString());
  // 格式化日期 按照M/d/yyyy格式显示日期
  // 格式化时间 按照HH:mm来显示时间
  console.info(mDateTime.format(DateTimeFormatter.ofPattern('HH:mm')).toString());
  // 获取当年年份：2016
  console.info(mDateTime.year().toString());
  // 获取月份
  console.info(mDateTime.month().toString());
  // 获取月份的值
  console.info(mDateTime.monthValue().toString());
  // 获取当月日期
  console.info(mDateTime.dayOfMonth().toString());
  // 获取小时数
  console.info(mDateTime.hour().toString());
  // 获取分钟数
  console.info(mDateTime.minute().toString());
  // 获取秒数
  console.info(mDateTime.second().toString());
  // 获取纳秒数
  console.info(mDateTime.nano().toString());
  // 获取周几
  console.info(mDateTime.dayOfWeek().toString());
  // 获取周几的数字值
  console.info(mDateTime.dayOfWeek().value().toString());
  // 获取在一年中的日期
  console.info(mDateTime.dayOfYear().toString());
  // 判断是否为闰年
  console.info(mDateTime.toLocalDate().isLeapYear() + '');
  // 转换成日期展示
  console.info(mDateTime.toLocalDate().toString());
  // 转换成时间展示
  console.info(mDateTime.toLocalTime().toString());
  // 获取当月的天数
  console.info(mDateTime.toLocalDate().lengthOfMonth().toString());
  // 获取当前的总天数
  console.info(mDateTime.toLocalDate().lengthOfYear().toString());
  return "获取日期时间： " + LocalDateTime.now().toString() + '\n' +
  "获取国内城市日期时间： " + LocalDateTime.now(ZoneId.systemDefault()).toString() + '\n' +
  "根据给定数据构建日期时间： " + LocalDateTime.of(2016, 2, 29, 12, 55, 42, 9).toString() + '\n' +
  "获取给定日期年份： " + mDateTime.year().toString() + '\n' +
  "获取给定日期月份： " + mDateTime.month().toString() + '\n' +
  "获取给定日期月份的值： " + mDateTime.monthValue().toString() + '\n' +
  "获取给定日期在当月中第几天： " + mDateTime.dayOfMonth().toString() + '\n' +
  "获取小时数： " + mDateTime.hour().toString() + '\n' +
  "获取分钟数： " + mDateTime.minute().toString() + '\n' +
  "获取秒数： " + mDateTime.second().toString() + '\n' +
  "获取纳秒数： " + mDateTime.nano().toString() + '\n' +
  "获取周几： " + mDateTime.dayOfWeek().toString() + '\n' +
  "获取在一年中的日期： " + mDateTime.dayOfYear().toString() + '\n' +
  "获取给定月份总天数： " + mDateTime.toLocalDate().lengthOfMonth().toString() + '\n' +
  "获取给定年份总天数： " + mDateTime.toLocalDate().lengthOfYear().toString();
}