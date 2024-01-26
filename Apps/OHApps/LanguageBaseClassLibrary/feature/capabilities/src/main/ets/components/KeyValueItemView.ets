/*
* Copyright (c) 2023 Hunan OpenValley Digital Industry Development Co., Ltd.
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

import { KeyValuePair } from '../model/KeyValuePair';
import { DeleteView } from './DeleteView';

@Component
export struct KeyValueItemView {
  @ObjectLink keyValuePair: KeyValuePair;
  @State deleteEnabled: boolean = true;
  private deleteAction: (event?: ClickEvent) => void = () => {
  };
  private index: number = 0;

  build() {
    Row() {
      Column() {
        Text(`Key: ${this.keyValuePair.key}`)
          .fontColor($r('app.color.text_color_primary'))
          .fontSize(16)
        Text(`Value: ${this.keyValuePair.value}`)
          .fontColor($r('app.color.text_color_second'))
          .fontSize(14)
      }
      .height('100%')
      .layoutWeight(1)
      .padding({ left: 16, right: 16, top: 12, bottom: 12 })
      .borderRadius(16)
      .backgroundColor($r('app.color.bg_white'))
      .alignItems(HorizontalAlign.Start)

      DeleteView({ enable: this.deleteEnabled })
        .id(`delete${this.index}`)
        .margin({ left: 12 })
        .enabled(this.deleteEnabled)
        .onClick(this.deleteAction)
    }
    .width('100%')
    .height(64)
    .alignItems(VerticalAlign.Center)
  }
}