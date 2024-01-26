/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
import { AUTH_METHODS, SMTPClient } from '@ohos/emailjs'
import promptAction from '@ohos.promptAction'
import router from '@ohos.router'
import socket from '@ohos.net.socket'
import GlobalObj from '../GlobalObj'

const BASE_COUNT = 1

@CustomDialog
struct CustomDialogDiy {
  @Link textValue: string
  @Link inputValue: string
  controller: CustomDialogController
  cancel: Function = () => {
  };
  confirm: Function = () => {
  };

  build() {
    Column() {
      Text('请输入邮箱类型').fontSize(20).margin({ top: 10, bottom: 10 }).width('90%')
      TextInput({ placeholder: '', text: this.textValue }).height(60).width('90%')
        .onChange((value: string) => {
          this.textValue = value;
        })
      Text('Tips:请输入正确格式的邮箱类型，例如@qq.com或者@163.com')
        .margin({ top: 10, bottom: 10 })
        .width('90%')
        .fontSize(8)
        .fontColor(Color.Red)
      Flex({ justifyContent: FlexAlign.SpaceAround }) {
        Button('取消')
          .onClick(() => {
            this.controller.close()
            this.cancel()
          })
        Button('确定')
          .onClick(() => {
            this.inputValue = this.textValue
            this.controller.close()
            this.confirm()
          })

      }

    }
  }
}

@Entry
@Component
struct LoginPage {
  @State message: string = 'Hello World'
  @State account: string = 'xxx'
  @State pwd: string = 'xxx'
  @State mailType: string = '@qq.com'
  @State textValue: string = ''
  @State inputValue: string = 'click me'
  @State secure: boolean = false
  dialogController: CustomDialogController | null = new CustomDialogController({
    builder: CustomDialogDiy({
      cancel: () => {
        this.showToast(`关闭了对话框，取消选输入其他类型邮箱`, 'mailType-cancel')
      },
      confirm: () => {
        if (!this.inputValue || this.inputValue.length < 1) {
          this.showToast(`邮箱类型不可为空`, 'mailType-confirm')
          return
        }
        if (this.inputValue.indexOf('@') == -1 && this.inputValue.indexOf('@') != this.inputValue.lastIndexOf('@')) {
          this.showToast(`邮箱类型必须含有一个@，且只能含有一个@`, 'mailType-confirm')
          return
        }
        if (this.inputValue.indexOf('.') == -1 && this.inputValue.indexOf('.') != this.inputValue.lastIndexOf('.')) {
          this.showToast(`邮箱类型必须含有一个.，且只能含有一个.`, 'mailType-confirm')
          return
        }
        if (this.inputValue.indexOf('@') != -1 && this.inputValue.indexOf('.') != -1 && this.inputValue.indexOf('@') > this.inputValue.indexOf('.')) {
          this.showToast(`邮箱类型中@需要在.之前，例如@qq.com,@163.com这些`, 'mailType-confirm')
          return
        }
        if (this.inputValue.indexOf('@') - this.inputValue.indexOf('.') == 1) {
          this.showToast(`邮箱类型中除了@和.，必须含有其他字符`, 'mailType-confirm')
          return
        }
        if (this.inputValue.indexOf('@') != 0) {
          this.showToast(`邮箱类型中@必须在第一位`, 'mailType-confirm')
          return
        }
        this.mailType = this.inputValue
        this.showToast(`输入其他类型邮箱：${this.mailType}`, 'mailType-confirm')
      },
      textValue: $textValue,
      inputValue: $inputValue
    }),
    autoCancel: true,
    customStyle: false
  })

  aboutToDisappear() {
    this.dialogController = null;
    GlobalObj?.getInstance()?.getClient()?.close(true);
  }

  showToast(text: string, name = '测试') {
    console.log(`zdy---${name}--->${text}`)
    promptAction.showToast({
      message: text,
      duration: 2000,
      bottom: 50
    })
  }

  @Builder
  MailMenu() {
    Menu() {
      MenuItem({ content: 'qq', labelInfo: 'qq' })
        .onChange((selected) => {
          if (selected) {
            this.mailType = '@qq.com'
          }
        })

      MenuItem({ content: '163', labelInfo: '163' })
        .onChange((selected) => {
          if (selected) {
            this.mailType = '@163.com'
          }
        })

      MenuItem({ content: '139', labelInfo: '139' })
        .onChange((selected) => {
          if (selected) {
            this.mailType = '@139.com'
          }
        })

      MenuItem({ content: 'sina', labelInfo: 'sina' })
        .onChange((selected) => {
          if (selected) {
            this.mailType = '@sina.com'
          }
        })
      MenuItem({ content: '其他', labelInfo: 'other' })
        .onChange((selected) => {
          if (selected) {
            if (this.dialogController) {
              this.dialogController.open()
            }
          }
        })
    }
  }

  build() {
    Row() {
      Flex({
        alignItems: ItemAlign.Center,
        justifyContent: FlexAlign.Center,
        alignContent: FlexAlign.Center,
        direction: FlexDirection.Column
      }) {
        Text('点击账号后面的邮箱可以切换邮箱类型')
          .fontSize(20)
          .height(50)
          .textAlign(TextAlign.Center)
          .margin({ bottom: 20 })
          .fontWeight(FontWeight.Bold)
          .width('100%')

        Flex({
          alignItems: ItemAlign.Start,
          justifyContent: FlexAlign.Start,
          alignContent: FlexAlign.Start,
          direction: FlexDirection.Row
        }) {
          Text('账号：')
            .fontSize(20)
            .height(50)
            .textAlign(TextAlign.Center)
            .margin({ right: 5 })

          TextInput({ placeholder: '请输入账号', text: 'xxx' })
            .layoutWeight(1)
            .fontSize(20)
            .height(50)
            .borderWidth(2)
            .textAlign(TextAlign.Center)
            .borderColor(Color.Gray)
            .type(InputType.Normal)
            .margin({ left: 15 })
            .onChange((data) => {
              this.account = data
            })

          Text(this.mailType)
            .fontSize(14)
            .height(50)
            .fontColor(Color.Blue)
            .textAlign(TextAlign.Center)
            .margin({ left: 5, right: 15 })
            .bindMenu(this.MailMenu)
        }.margin({ left: 15, top: 20 })

        Flex({
          alignItems: ItemAlign.Start,
          justifyContent: FlexAlign.Start,
          alignContent: FlexAlign.Start,
          direction: FlexDirection.Row
        }) {
          Text('密码/授权码：')
            .fontSize(20)
            .height(50)
            .textAlign(TextAlign.Center)
            .margin({ right: 5 })

          TextInput({ placeholder: '请输入密码/授权码', text: 'xxx' })
            .layoutWeight(1)
            .fontSize(20)
            .height(50)
            .borderWidth(2)
            .textAlign(TextAlign.Center)
            .borderColor(Color.Gray)
            .type(InputType.Normal)
            .margin({ right: 15 })
            .onChange((data) => {
              this.pwd = data
            })
        }
        .margin({ left: 15, top: 20 })

        Flex({ justifyContent: FlexAlign.Start, direction: FlexDirection.Row, alignItems: ItemAlign.Center }) {
          Text('是否开启SSL/TLS(当前仅需支持SMTP,无需支持SMTPS,此按钮暂不可用)')
            .fontSize(20)
            .height(50)
            .margin({})
            .textAlign(TextAlign.Center)
            .fontWeight(FontWeight.Bold)


          Checkbox({ name: '是否开启SSL/TLS', group: 'ssl' })
            .height(40)
            .select(false)
            .onClick((event) => {
              this.showToast('当前仅需支持SMTP,无需支持SMTPS')
            })
            .enabled(false)
            .margin({ left: 10 })
            .selectedColor(Color.Blue)
            .onChange((value) => {
              this.secure = value
            })
        }
        .margin({ left: 15, top: 20 })

        Button('跳普通附件')
          .margin(20)
          .width('80%')
          .height(50)
          .backgroundColor(Color.Blue)
          .fontColor(Color.White)
          .onClick(() => {
            this.login()
          })
        Button('跳转大附件')
          .margin(20)
          .width('80%')
          .height(50)
          .backgroundColor(Color.Blue)
          .fontColor(Color.White)
          .onClick(() => {
            this.loginBigAttachment()
          })
      }
    }
    .width('100%')

  }

  async login() {
    const ctx = this;
    try {
      let hostParam = this.mailType.substring(this.mailType.indexOf('@') + 1, this.mailType.indexOf('.'))
      if (!GlobalObj?.getInstance()?.getClient()) {
        let client: SMTPClient | null = new SMTPClient({});
        if (this.secure) {
          let option: socket.TLSConnectOptions = {
            ALPNProtocols: ["spdy/1", "http/1.1"],
            address: {
              address: `smtp.${hostParam}.com`,
              port: 465,
              family: 1
            },
            secureOptions: {
              key: '',
              cert: '',
              ca: [''],
              useRemoteCipherPrefer: true,
            }
          }
          let context: Context | null = GlobalObj?.getInstance()?.getContext() ? GlobalObj?.getInstance()?.getContext() : getContext(this)
          if (!context) {
            return
          }

          let ca0Data = await context?.resourceManager?.getRawFileContent('QQMailMiddle.pem')
          if (!ca0Data) {
            return
          }
          let ca0: string = '';
          for (let i = 0; i < ca0Data.length; i++) {
            let todo = ca0Data[i]
            let item = String.fromCharCode(todo);
            ca0 += item;
          }
          if (option.secureOptions.ca instanceof Array) {
            option.secureOptions.ca[0] = ca0;
          } else {
            option.secureOptions.ca = ca0;
          }

          let ca1Data = await context.resourceManager.getRawFileContent('QQMailRoot.pem')
          let ca1 = '';
          for (let i = 0; i < ca1Data.length; i++) {
            let todo = ca1Data[i]
            let item = String.fromCharCode(todo);
            ca1 += item;
          }
          if (option.secureOptions.ca instanceof Array) {
            option.secureOptions.ca[1] = ca1;
          } else {
            option.secureOptions.ca = ca1;
          }
          let startTime1 = new Date().getTime();
          client = new SMTPClient({
            user: this.account + this.mailType,
            password: this.pwd,
            host: `smtp.${hostParam}.com`,
            port: 465,
            timeout: 30000,
            authentication: [AUTH_METHODS.LOGIN],
            ssl: option,
            tls: undefined
          });
          let endTime1 = new Date().getTime();
          let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
          console.log("new SMTPClient averageTime : " + averageTime1 + "us")
        } else {
          let startTime1 = new Date().getTime();
          client = new SMTPClient({
            user: this.account + this.mailType,
            password: this.pwd,
            host: `smtp.${hostParam}.com`,
            port: 25,
            timeout: 30000,
            authentication: [AUTH_METHODS.LOGIN],
            ssl: false,
            tls: undefined
          });
          let endTime1 = new Date().getTime();
          let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
          console.log("new SMTPClient averageTime : " + averageTime1 + "us")
        }
        GlobalObj?.getInstance()?.setClient(client)
      }
      if (GlobalObj?.getInstance()?.getClient()) {
        if (GlobalObj?.getInstance()?.getClient()?.isLogin() === false) {
          GlobalObj?.getInstance()?.getClient()?.login((err, result) => {
            if (!err && result == true) {
              this.showToast('账号登录成功', 'login-smtp')
              router.pushUrl({
                url: 'pages/SendMailPage',
                params: {
                  sendCount: ctx.account + ctx.mailType
                }
              })
            } else {
              this.showToast('账号登录失败', 'login-smtp')
            }
          })
        } else {
          this.showToast('账号已登录，无需重新登录', 'login-smtp')
        }

      }
    } catch (err) {
      this.showToast(`账号登录出错：${err.message}`, 'login-smtp')
    }
  }

  async loginBigAttachment() {
    const ctx = this;
    try {
      let hostParam = this.mailType.substring(this.mailType.indexOf('@') + 1, this.mailType.indexOf('.'))
      if (!GlobalObj?.getInstance()?.getClient()) {
        let client: SMTPClient | null = null;
        if (this.secure) {
          let option: socket.TLSConnectOptions = {
            ALPNProtocols: ["spdy/1", "http/1.1"],
            address: {
              address: `smtp.${hostParam}.com`,
              port: 465,
              family: 1
            },
            secureOptions: {
              key: '',
              cert: '',
              ca: [''],
              useRemoteCipherPrefer: true,
            }
          }
          let context: Context | null = GlobalObj?.getInstance()?.getContext() ? GlobalObj?.getInstance()?.getContext() : getContext(this)
          if (!context) {
            return
          }
          let ca0Data = await context?.resourceManager.getRawFileContent('QQMailMiddle.pem')
          if (!ca0Data) {
            return
          }
          let ca0 = '';
          for (let i = 0; i < ca0Data.length; i++) {
            let todo = ca0Data[i]
            let item = String.fromCharCode(todo);
            ca0 += item;
          }
          if (option.secureOptions.ca instanceof Array) {
            option.secureOptions.ca[0] = ca0;
          } else {
            option.secureOptions.ca = ca0;
          }

          let ca1Data = await context.resourceManager.getRawFileContent('QQMailRoot.pem')
          let ca1 = '';
          for (let i = 0; i < ca1Data.length; i++) {
            let todo = ca1Data[i]
            let item = String.fromCharCode(todo);
            ca1 += item;
          }
          if (option.secureOptions.ca instanceof Array) {
            option.secureOptions.ca[1] = ca1;
          } else {
            option.secureOptions.ca = ca1;
          }
          let startTime1 = new Date().getTime();
          client = new SMTPClient({
            user: this.account + this.mailType,
            password: this.pwd,
            host: `smtp.${hostParam}.com`,
            port: 465,
            timeout: 30000,
            authentication: [AUTH_METHODS.LOGIN],
            ssl: option,
            tls: undefined
          });
          let endTime1 = new Date().getTime();
          let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
          console.log("new SMTPClient averageTime : " + averageTime1 + "us")
        } else {
          let startTime1 = new Date().getTime();
          client = new SMTPClient({
            user: this.account + this.mailType,
            password: this.pwd,
            host: `smtp.${hostParam}.com`,
            port: 25,
            timeout: 30000,
            authentication: [AUTH_METHODS.LOGIN],
            ssl: false,
            tls: undefined
          });
          let endTime1 = new Date().getTime();
          let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
          console.log("new SMTPClient averageTime : " + averageTime1 + "us")
        }
        GlobalObj?.getInstance()?.setClient(client)
      }
      if (GlobalObj?.getInstance()?.getClient()) {
        if (GlobalObj?.getInstance()?.getClient()?.isLogin() === false) {
          GlobalObj?.getInstance()?.getClient()?.login((err, result) => {
            if (!err && result == true) {
              this.showToast('账号登录成功', 'login-smtp')
              router.pushUrl({
                url: 'pages/SendBigAttachmentPage',
                params: {
                  sendCount: ctx.account + ctx.mailType
                }
              })
            } else {
              this.showToast('账号登录失败', 'login-smtp')
            }
          })
        } else {
          this.showToast('账号已登录，无需重新登录', 'login-smtp')
        }

      }
    } catch (err) {
      this.showToast(`账号登录出错：${err.message}`, 'login-smtp')
    }
  }
}