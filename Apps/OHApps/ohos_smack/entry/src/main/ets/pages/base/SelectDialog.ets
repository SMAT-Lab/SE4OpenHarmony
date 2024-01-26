/**
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 *
 * This software is distributed under a license. The full license
 * agreement can be found in the file LICENSE in this distribution.
 * This software may not be copied, modified, sold or distributed
 * other than expressed in the named license agreement.
 *
 * This software is distributed without any warranty.
 */

import { SelectOptionsEntity } from '../../entity/SelectOptionsEntity'

@CustomDialog
export struct SelectDialog {
  controller: CustomDialogController  ={} as CustomDialogController
  @Link vue: string
  options: Array<SelectOptionsEntity> = []

  build() {
    Column() {
      List({  }) {
        ForEach(this.options, (item :SelectOptionsEntity) => {
          ListItem() {
            Text(item.label)
              .width('100%')
              .height(50)
              .fontSize(16)
              .textAlign(TextAlign.Center)
              .borderRadius(10)
              .backgroundColor(0xFFFFFF)
          }.editable(true).onClick(v => {
            this.vue = item.label
            this.controller.close()
          })
        }, (item :SelectOptionsEntity) => item.label)
      }.height(50 * this.options.length) .width('100%')
      .listDirection(Axis.Vertical) // 排列方向
    }
    .height(50 * this.options.length)
    .backgroundColor('#ffffff')
    .borderRadius(10)
    .width('60%')
  }
}
