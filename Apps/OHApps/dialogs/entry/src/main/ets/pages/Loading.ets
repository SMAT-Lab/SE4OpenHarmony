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

import { LoadingDialogModel, LoadingDialog, LoadingStyleDialog } from '@ohos/dialogs'

@Entry
@Component
struct indexPage {
  @State data: LoadingDialogModel = new LoadingDialogModel();
  dialogController1: CustomDialogController = new CustomDialogController({
    builder: LoadingDialog({
      loadingTitle: '正在加载中...'
    }),
    cancel: this.existApp,
    autoCancel: true,
    customStyle: true,
    offset: { dx: 0, dy: 0 },
    alignment: DialogAlignment.Center,
  });
  @State showLoadingDialog: boolean = false;
  @State isOpenLoadingDialog: boolean = false;
  @State isCloseLoadingDialog: boolean = false;
  @State messageText: string = "";

  @Styles
  pressedStyles() {
    .backgroundColor('#11000000')
  }

  onAccept() {

  }

  existApp() {

  }

  build() {
    Column() {
      Button('打开loading').onClick(() => {
        this.dialogController1.open()
      })

      Button('菊花loading').onClick(() => {
        let time: number = 0;
        this.showLoadingDialog = true;
        this.isOpenLoadingDialog = !this.isOpenLoadingDialog;
        let timeId = setInterval(() => {
          if (time === 1) {
            this.messageText = "加载中的长度变长了哟"
          } else if (time == 2) {
            this.messageText = "变短了"
          }
          else if (time == 3) {
            this.messageText = ""
          } else if (time == 4) {
            this.isCloseLoadingDialog = !this.isCloseLoadingDialog;
            clearInterval(timeId);
          }
          time++;
        }, 1000)
      }).margin({ top: 20 })

      LoadingStyleDialog({
        showLoadingDialog: $isOpenLoadingDialog,
        closeLoadingDialog: $isCloseLoadingDialog,
        dialogBackGroundColor: "#212121",
        dialogToastMessage: this.messageText
      }).visibility(this.showLoadingDialog ? Visibility.Visible : Visibility.None);
    }
    .margin({ top: 30, right: 20, bottom: 20, left: 20 })

  }

  aboutToAppear() {
    this.data.init()
  }

  aboutToDisappear() {
    // 关闭定时器
    this.data.closeTimer()
  }
}