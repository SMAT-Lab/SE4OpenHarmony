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

import { logger } from '@ohos/uploaddownload';

const TAG: string = 'SelectFolderDialog';

@CustomDialog
export struct SelectFolderDialog {
  @Consume downloadFolder: Array<string>;
  @State selectedFolder: string = '';
  private controller: CustomDialogController = new CustomDialogController({ builder: null });
  private selectFolder: (folder: string) => void = (folder: string) => {};

  build() {
    Column() {
      Text($r('app.string.download_to'))
        .fontSize(20)
        .width('100%')
        .fontWeight(500)
        .fontColor($r('app.color.text_normal'))
        .opacity(0.9)
        .fontFamily($r('sys.string.ohos_id_text_font_family_medium'))
        .margin({ bottom: 12 })
      ForEach(this.downloadFolder, (item: string, index?: number) => {
        if (index && index !== 0) {
          Divider()
        }
        Row() {
          Text(item)
            .id('menu' + index)
            .fontSize(16)
          Blank()
          Radio({ group: 'folder', value: item })
            .size({ width: 20, height: 20 })
            .checked(item === this.selectedFolder)
            .radioStyle({ checkedBackgroundColor: $r('app.color.button_blue') })
            .onChange((isCheck: boolean) => {
              if (isCheck) {
                this.selectedFolder = item;
                logger.info(TAG, `this.selectedFolder = ${this.selectedFolder}`);
              }
            })
        }
        .width('100%')
        .height(56)
        .onClick(() => {
          this.selectedFolder = item;
          logger.info(TAG, `this.selectedFolder = ${this.selectedFolder}`);
        })
      })
      Row() {
        Button() {
          Text($r('app.string.cancel'))
            .fontColor($r('app.color.btn_text_blue'))
            .fontSize(16)
        }
        .height(40)
        .layoutWeight(1)
        .backgroundColor(Color.White)
        .margin(5)
        .onClick(() => {
          this.controller.close()
        })

        Divider()
          .vertical(true)
          .width(1)

        Button() {
          Text($r('app.string.ok'))
            .fontColor($r('app.color.btn_text_blue'))
            .fontSize(16)
        }
        .height(40)
        .layoutWeight(1)
        .backgroundColor(Color.White)
        .margin(5)
        .onClick(() => {
          this.controller.close();
          this.selectFolder(this.selectedFolder);
        })
      }
      .width('100%')
      .height(40)
    }
    .width('100%')
    .alignItems(HorizontalAlign.Start)
    .border({ color: Color.Gray, radius: 20 })
    .padding({ left: 24, right: 24, top: 24, bottom: 24 })
  }
}