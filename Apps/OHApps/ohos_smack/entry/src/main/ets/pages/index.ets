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

import router from '@ohos.router';
import { Smack } from '@ohos/smack'

@Entry
@Component
struct Index {
  onPageShow() {
    this.init()
  }

  //todo 初始化
  private init() {
    let isLogin:boolean = Smack.onLogin();
    setTimeout(() => {
      if (isLogin) {
        router.replace({
          url: 'pages/main'
        })
      } else {
        router.replace({
          url: 'pages/user/login'
        })
      }
    }, 1000)
  }

  build() {
    Row() {
      Column() {
        Text("欢迎使用")
          .fontSize(30)
        Text("聊天室")
          .fontSize(50)
          .fontWeight(600)
          .margin({ top: 20 })
      }
      .width('100%')
    }
    .height('100%')
  }
}