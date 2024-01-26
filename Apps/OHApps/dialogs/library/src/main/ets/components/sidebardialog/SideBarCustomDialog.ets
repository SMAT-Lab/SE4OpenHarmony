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

import { SideBarModel } from '../model/SideBarModel'
const TAG = "SideBarCustomDialog"
@CustomDialog
export struct SideBarCustomDialog {
  @BuilderParam customComponent: () => void
  @State isShow: boolean = true
  @State model: SideBarModel = new SideBarModel();
  controller: CustomDialogController
  aboutToAppear() {
    this.isShow = this.model.initShow
    console.log(TAG, "isShow: " + this.isShow)
  }
  build(){
    SideBarContainer(SideBarContainerType.Embed) {
      Stack() {
          if (this.customComponent != undefined) {
            this.customComponent();
          }
      }
      Stack(){}
      .onClick(() => {
        console.info('onClick isShow: ' + this.isShow)
        this.isShow = false
      })
    }
    .sideBarPosition(this.model.sideBarPosition ? this.model.sideBarPosition : SideBarPosition.Start)
    .showControlButton(false)
    .showSideBar(this.isShow)
    .minSideBarWidth(this.model.minSideBarWidth ? this.model.minSideBarWidth : '30%')
    .maxSideBarWidth(this.model.maxSideBarWidth ? this.model.maxSideBarWidth : '100%')
    .onChange((value: boolean) => {
      this.isShow = value;
      if (!this.isShow) {
        this.controller.close();
      }
      console.info('status:' + value)
    })
  }
}
