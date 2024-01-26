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
const TEMPERATURE_MIN: number = 36;
const TEMPERATURE_MAX: number = 37.2;

@Component
export struct TempView {
  @State tempMorning: number = ZERO;
  @State tempNoon: number = ZERO;
  @State tempNight: number = ZERO;

  build() {
    Column({ space: 12 }) {
      Text($r('app.string.judge_temp'))
        .fontSize(20)
        .fontColor(Color.White)
        .backgroundColor(Color.Gray)
        .textAlign(TextAlign.Start)
        .margin({ top: 2 })
      InputItem({
        textValue: $r('app.string.temp_morning'),
        placeHolder: $r('app.string.morning_placeholder'),
        value: $tempMorning
      })
      InputItem({
        textValue: $r('app.string.temp_noon'),
        placeHolder: $r('app.string.noon_placeholder'),
        value: $tempNoon
      })
      InputItem({
        textValue: $r('app.string.temp_night'),
        placeHolder: $r('app.string.night_placeholder'),
        value: $tempNight
      })
      Button() {
        Text($r('app.string.temp_analyse'))
          .fontColor(Color.White)
          .fontSize(16)
      }
      .key('temperatureAnalysis')
      .type(ButtonType.Capsule)
      .width('100%')
      .height(45)
      .backgroundColor(0x317aff)
      .onClick(() => {
        this.tempRange();
      })
    }
    .alignItems(HorizontalAlign.Center)
    .justifyContent(FlexAlign.Start)
    .width('100%')
  }

  alertDialog(title: ResourceStr, message: ResourceStr, value: ResourceStr) {
    AlertDialog.show(
      {
        title: title,
        message: message,
        confirm: {
          value: value,
          action: () => {
          }
        },
      }
    );
  }

  tempRange() {
    if (this.tempMorning <= ZERO || this.tempNoon <= ZERO || this.tempNight <= ZERO) {
      promptAction.showToast({ message: $r("app.string.scope_temp_tips") });
      return;
    }
    let arr = [this.tempMorning, this.tempNoon, this.tempNight].sort();
    let max = new ScopeNumber(arr[2]);
    let min = new ScopeNumber(arr[0]);
    let tempLower = new ScopeNumber(TEMPERATURE_MIN);
    let tempUpper = new ScopeNumber(TEMPERATURE_MAX);
    let standardRange = new util.ScopeHelper(tempLower, tempUpper);
    if (standardRange.contains(min) && standardRange.contains(max)) {
      this.alertDialog($r('app.string.temperature'), getString($r('app.string.temp_min')) + min + getString($r('app.string.temp_max'))
      + max + getString($r('app.string.temp_normal_range')), $r('app.string.determine'));
    } else {
      this.alertDialog($r('app.string.temperature'), $r('app.string.temp_message_abnormal'), $r('app.string.determine'));
    }
  }
}