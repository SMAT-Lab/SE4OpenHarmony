/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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

import DateTimeUtil from '../../model/DateTimeUtil';
import Logger from '../../model/Logger';
import { Record } from './Record';

const TAG = '[Recorder.AudioItem]';
const TRANSLATE: number = -145;

@Component
export struct AudioItem {
  @Link record: Record;
  @State translateLeft: number = 0;
  @State translateRight: number = TRANSLATE;

  getTimeString() {
    let date = new Date(this.record.fileAsset.dateAdded * 1000);
    let dateTimeUtil = new DateTimeUtil();
    return `${date.getFullYear()}/${dateTimeUtil.fill(date.getMonth() + 1)}/${dateTimeUtil.fill(date.getDate())}`;
  }

  build() {
    Row() {
      Row() {
        Column() {
          Text(this.record.title)
            .fontSize(22)
            .fontColor(Color.Black)
          Text(this.getTimeString())
            .fontSize(20)
            .fontColor(Color.Gray)
            .margin({ top: 10 })
        }
        .size({ width: '80%', height: '100%' })
        .alignItems(HorizontalAlign.Start)
        .justifyContent(FlexAlign.Center)

        Row() {
          Text(this.record.duration)
            .fontSize(20)
            .fontColor(Color.Gray)
        }
        .width('20%')
        .justifyContent(FlexAlign.End)
      }
      .width('100%')
      .padding({ top: 10, bottom: 10, left: 10, right: 10 })
      .margin({ top: 15, right: 15 })
      .backgroundColor('#FFFFFF')
      .borderRadius(20)
    }
    .width('100%')
    .height('15%')
    .constraintSize({ minHeight: 100 })
    .translate({ x: this.translateLeft, y: 0 })
  }
}