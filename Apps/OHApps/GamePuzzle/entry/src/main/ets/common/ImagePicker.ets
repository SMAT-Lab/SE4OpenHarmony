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
import photoAccessHelper from '@ohos.file.photoAccessHelper';

@CustomDialog
export default struct ImagePicker{
  private imageDatas: Array<photoAccessHelper.PhotoAsset> = [];
  @State selected: number = 0;
  public controller: CustomDialogController;
  @Link index: number;

  aboutToAppear() {
    this.selected = this.index;
  }

  build() {
    Column() {
      List({ space: 5 }) {
        ForEach(this.imageDatas, (item: photoAccessHelper.PhotoAsset, index) => {
          ListItem() {
            Stack({ alignContent: Alignment.TopEnd }) {
              Image(item.uri)
                .width(180)
                .height(150)
                .margin({ left: 2, right: 2, top: 5, bottom: 5 })
              Radio({ value: 'Radio3', group: 'radioGroup' })
                .id(`radio${this.selected + 1}_${index + 1}`)
                .checked(index === this.selected ? true : false)
                .onChange(() => {
                  this.selected = index;
                })
            }
          }
        })
      }
      .width('95%')
      .height(160)
      .listDirection(Axis.Horizontal)

      Row() {
        Button($r('app.string.cancel'))
          .id('cancel')
          .margin({ right: '25%' })
          .onClick(() => {
            this.controller.close();
          })
        Button($r('app.string.conform'))
          .id('confirm')
          .onClick(() => {
            this.index = this.selected;
          })
      }
      .margin({ bottom: 10 })
    }
    .width('100%')
  }
}