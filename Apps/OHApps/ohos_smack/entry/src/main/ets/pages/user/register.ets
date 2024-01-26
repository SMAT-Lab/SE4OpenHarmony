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
import { Toolbar } from '../base/toolbar'
import { Constant } from '../../entity/Constant'
import prompt from '@ohos.prompt';
import { Smack } from '@ohos/smack'

@Entry
@Component
struct Register {
  private userName: string = ''
  private passWord: string = ''
  private email: string = ''

  build() {
    Column() {
      Toolbar({ title: '注册', isBack: true })
      Column() {
        Column() {
          TextInput({ placeholder: '请输入用户名' })
            .margin({ bottom: 20 })
            .height(px2vp(100))
            .fontSize(px2fp(30))
            .type(InputType.Normal)
            .onChange(v => {
              this.userName = v
            })
          TextInput({ placeholder: '请输入密码' })
            .margin({ bottom: 20 })
            .height(px2vp(100))
            .fontSize(px2fp(30))
            .type(InputType.Normal)
            .onChange(v => {
              this.passWord = v
            })

          Button('注 册')
            .width('100%')
            .margin({ top: 25 })
            .height(px2vp(80))
            .fontSize(px2fp(30))
            .onClick(v => {
              this.onRegister()
            })
        }
      }
      .margin({ top: 100 })
      .padding({ left: 50, right: 50 })
      .height('100%')
      .width('100%')
    }

  }

  // 注册
  private onRegister() {
    if (this.userName == '' || this.passWord == '') {
      prompt.showToast({
        message: '请输入完整信息'
      })
    } else {
      let result: number = Smack.registers(Constant.HOST_IP, this.userName, this.passWord)
      if(result == 0){
        router.back();
      }else{
        prompt.showToast({
          message: '注册失败'
        })
      }
    }
  }
}