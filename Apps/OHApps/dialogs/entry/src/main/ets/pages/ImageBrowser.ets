/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ImageBrowserDialog } from '@ohos/dialogs';

@Entry
@Component
struct Index {
  @State imageList: Resource[] = [$r('app.media.card'), $r('app.media.sanmartino'), $r('app.media.swissroad')];
  @State index: number = 0
  private dialogController: CustomDialogController = new CustomDialogController({
    builder: ImageBrowserDialog({
      imageList: this.imageList,
      index: this.index
    }),
    autoCancel: true,
    alignment: DialogAlignment.Default,
    customStyle: true
  })

  build() {
    Grid() {
      ForEach(this.imageList, (image: Resource, index: number) => {
        GridItem() {
          Image(image)
            .width(150)
            .height(150)
            .onClick(() => {
              this.index = index
              this.dialogController.open()
            })
        }
        .width(150)
        .height(150)
      })
    }
    .rowsTemplate('1fr 1fr')
    .columnsTemplate('1fr 1fr')
    .width('100%')
    .height(350)
  }
}