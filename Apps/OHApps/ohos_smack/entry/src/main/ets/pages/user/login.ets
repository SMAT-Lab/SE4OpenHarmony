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
import prompt from '@ohos.prompt';
import { Constant } from '../../entity/Constant'
import { Smack } from '@ohos/smack'
import { GlobalContext } from '../../entity/GlobalContext';

@Entry
@Component
struct Login {
  private userName: string = ''
  private passWord: string = ''
  @State ip: string = ''
  @State doMain: string = ''
  @State serviceName: string = ''
  @State resource: string = ''
  @State port: string = ''
  @State uName: string = ''
  @State uPassword: string = ''
  @State compression: boolean = false
  @State authed: boolean = false

  build() {
    Column() {
      Toolbar({ title: '登录' })
      Column() {
        Column() {
          TextInput({ placeholder: '请输入用户名', text: this.userName })
            .margin({ bottom: 20 })
            .height(px2vp(100))
            .fontSize(px2fp(20))
            .placeholderFont({size: px2vp(36)})
            .type(InputType.Normal)
            .onChange(v => {
              this.userName = v
            })
          TextInput({ placeholder: '请输入密码', text: this.passWord })
            .type(InputType.Password)
            .height(px2vp(100))
            .fontSize(px2fp(20))
            .placeholderFont({size: px2vp(36)})
            .onChange(v => {
              this.passWord = v
            })

          Button('登 录')
            .width('100%')
            .height(px2vp(50))
            .fontSize(px2fp(20))
            .margin({ top: 10 })
            .onClick(v => {
//              let isConnect = globalThis.Smack.isConnected()
//              if (isConnect) {
                this.onLogin()
//              } else {
//                prompt.showToast({
//                  message: "请先连接服务"
//                })
//              }
            })
          Button('连接服务')
            .width('100%')
            .height(px2vp(50))
            .fontSize(px2fp(20))
            .margin({ top: 10 })
            .onClick(v => {
              if (this.check()) {
                this.connectService()
              }
            })

          Button('注 册')
            .margin({ top: 10 })
            .width('100%')
            .height(px2vp(50))
            .fontSize(px2fp(20))
            .padding({ left: 30, right: 30 })
            .backgroundColor('#000000')
            .onClick(v => {
              this.onRegister()
            })
        }

        Text("ip:  " + this.ip).width("100%").margin({ top: 5 })
        Text("doMain:  " + this.doMain).width("100%").margin({ top: 5 })
        Text("serviceName:  " + this.serviceName).width("100%").margin({ top: 5 })
        Text("resource:  " + this.resource).width("100%").margin({ top: 5 })
        Text("port:  " + this.port).width("100%").margin({ top: 5 })
        Text("userName:  " + this.uName).width("100%").margin({ top: 5 })
        Text("passWord:  " + this.uPassword).width("100%").margin({ top: 5 })
        Text("compression:  " + this.compression).width("100%").margin({ top: 5 })
        Text("authed:  " + this.authed).width("100%").margin({ top: 5 })
      }
      .margin({ top: 20 })
      .padding({ left: 50, right: 50 })
      .height('100%')
      .width('100%')
    }
  }

  public connectService() {
    Smack.setServer(Constant.HOST_IP)
    Smack.setServer(Constant.SERVICE_NAME)
    Smack.setResource(Constant.HOST_RES.replace("/", ""))
    Smack.setPort(Constant.HOST_PORT);
    Smack.setUsernameAndPassword(this.userName, this.passWord);
    Smack.connect();
    this.uName = Smack.username()
    this.uPassword = Smack.password()
    this.resource = Smack.resource()
    this.ip = Smack.server()
    this.port = String(Smack.port());
    this.compression = Smack.compression()
    this.authed = Smack.authed()
  }

  // todo 登录
  private onLogin() {
    let result: number
    if (this.check()) {
      prompt.showToast({
        message: '登陆中..'
      })
      setTimeout(()=>{
        this.connectService()
        try {
          let LoginName = this.uName + '@' + Constant.HOST_IP
          GlobalContext.getContext().setValue('userName',this.uName + '@' + Constant.HOST_IP + Constant.HOST_RES)
          result = Smack.Login(LoginName, this.uPassword);
        } catch (e) {
          console.log("onLogin err  " + e.message)
        }
        if (result == 1) {
          router.replace({
            url: 'pages/main'
          })
        } else {
          prompt.showToast({
            message: "登录失败"
          })
        }
      },100)
    }

  }

  public check(): boolean {
    if (this.userName == '') {
      prompt.showToast({
        message: "请输入用户名"
      })
      return false
    }
    if (this.passWord == '') {
      prompt.showToast({
        message: "请输入登陆密码"
      })
      return false
    }
    return true
  }

  private onRegister() {
    router.push({
      url: 'pages/user/register'
    })
  }
}