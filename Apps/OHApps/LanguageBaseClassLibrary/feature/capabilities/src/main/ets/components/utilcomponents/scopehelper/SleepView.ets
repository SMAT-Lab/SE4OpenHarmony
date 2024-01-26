/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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

import promptAction from '@ohos.promptAction';
import util from '@ohos.util';
import { getString } from '@ohos/common';
import { InputItem } from './InputItem';
import { ScopeNumber } from '../../../model/ScopeNumber';

const ZERO: number = 0;
const SLEEP_TIME_SHORT: number = 7;
const SLEEP_TIME_LONG: number = 10;

@Component
export struct SleepView {
  @State shortTime: number = ZERO;
  @State longTime: number = ZERO;

  build() {
    Column({ space: 12 }) {
      Text($r('app.string.judge_sleep'))
        .fontSize(20)
        .fontColor(Color.White)
        .backgroundColor(Color.Gray)
        .textAlign(TextAlign.Start)
        .margin({ top: 2 })

      InputItem({
        textValue: $r('app.string.short_sleep'),
        placeHolder: $r('app.string.enter_sleep_time'),
        value: $shortTime
      })
      InputItem({
        textValue: $r('app.string.long_sleep'),
        placeHolder: $r('app.string.enter_sleep_time'),
        value: $longTime
      })

      Text($r('app.string.sleep_time'))
        .fontSize(18)
        .fontColor(Color.Red)

      Button() {
        Text($r('app.string.sleep_analyse'))
          .fontColor(Color.White)
          .fontSize(16)
          .textAlign(TextAlign.Center)
      }
      .key('sleepAnalysis')
      .type(ButtonType.Capsule)
      .width('100%')
      .height(45)
      .margin({ top: 10, bottom: 10 })
      .backgroundColor(0x317aff)
      .onClick(() => {
        this.sleepRange();
      })
    }
    .alignItems(HorizontalAlign.Center)
    .justifyContent(FlexAlign.Start)
    .width('100%')
  }

  sleepRange() {
    if (this.shortTime <= ZERO || this.longTime <= ZERO) {
      promptAction.showToast({ message: $r("app.string.scope_sleep_tips") });
      return;
    }
    if (this.longTime <= this.shortTime) {
      promptAction.showToast({ message: $r("app.string.scope_sleep_tips_less") });
      return;
    }
    let timeLower = new ScopeNumber(SLEEP_TIME_SHORT);
    let timeUpper = new ScopeNumber(SLEEP_TIME_LONG);
    let timeRange = new util.ScopeHelper(timeLower, timeUpper);
    let yTimeLower = new ScopeNumber(this.shortTime);
    let yTimeUpper = new ScopeNumber(this.longTime);
    let yTimeRange = new util.ScopeHelper(yTimeLower, yTimeUpper);
    let message = getString($r("app.string.scope_expand"));
    try {
      message += `${timeRange.expand(yTimeRange)}`;
    } catch {
      message += getString($r('app.string.empty'));
    }
    message += getString($r("app.string.scope_intersect"));
    try {
      message += `${timeRange.intersect(yTimeRange)}`;
    } catch {
      message += getString($r('app.string.empty'));
    }
    AlertDialog.show(
      {
        title: $r('app.string.sleep_analyse'),
        message: message,
        confirm: {
          value: $r('app.string.determine'),
          action: () => {
          }
        },
      }
    );
  }
}