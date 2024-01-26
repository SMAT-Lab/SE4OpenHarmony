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

@Component
export default struct OperationView {
  private operationKey: string | Resource = '';
  private showArrow: boolean = true;
  private handleClick: () => void = (): void => {};

  build() {
    Row() {
      Text(this.operationKey)
        .fontSize(16)
        .fontColor(Color.Black)
        .height('100%')
        .textAlign(TextAlign.Center)
      Blank()
      if (this.showArrow) {
        Image($r('app.media.ic_public_small_right'))
          .height(24)
          .width(12)
      }
    }
    .width('100%')
    .height(56)
    .padding(12)
    .border({ radius: 16 })
    .backgroundColor(Color.White)
    .onClick(this.handleClick)
  }
}