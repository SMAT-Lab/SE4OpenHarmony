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

import promptAction from '@ohos.promptAction'
import router from '@ohos.router'
import socket from '@ohos.net.socket'
import Pop3Command, { Pop3LoginBean } from '@ohos/node-pop3'
import GlobalObj from '../GlobalObj'

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
struct Index {
  @State message: string = 'Hello World'
  @State account: string = 'xxx'
  @State password: string = 'xxx'
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
    GlobalObj?.getInstance()?.getClient()?.QUIT();
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

          TextInput({ placeholder: '请输入账号', text: this.account })
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

          TextInput({ placeholder: '请输入密码/授权码', text: this.password })
            .layoutWeight(1)
            .fontSize(20)
            .height(50)
            .borderWidth(2)
            .textAlign(TextAlign.Center)
            .borderColor(Color.Gray)
            .type(InputType.Normal)
            .margin({ right: 15 })
            .onChange((data) => {
              this.password = data
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

        Flex({ justifyContent: FlexAlign.Center, direction: FlexDirection.Row, alignItems: ItemAlign.Center }) {
          Button('命令说明及注意事项')
            .margin(20)
            .layoutWeight(1)
            .height(50)
            .backgroundColor(Color.Blue)
            .fontColor(Color.White)
            .onClick(() => {
              router.pushUrl({
                url: 'pages/TipsPage'
              })
            })
          Button('测试自己调用登陆并通过command获取邮件')
            .margin(20)
            .layoutWeight(1)
            .height(50)
            .visibility(Visibility.None)// 暂时先不显示
            .backgroundColor(Color.Blue)
            .fontColor(Color.White)
            .onClick(() => {
              this.diyLogin()
            })
          Button('测试通过library登录以及使用已有的指令')
            .margin(20)
            .layoutWeight(1)
            .height(50)
            .backgroundColor(Color.Blue)
            .fontColor(Color.White)
            .onClick(() => {
              this.autoLogin()
            })
        }
      }
    }
    .width('100%')

  }

  async diyLogin() {
    const ctx = this;
    try {
      let hostParam = ctx.mailType.substring(ctx.mailType.indexOf('@') + 1, ctx.mailType.indexOf('.'))
      if (!GlobalObj?.getInstance()?.getClient()) {
        let client: Pop3Command | null = null;
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
            return;
          }
          let ca0Data = await context?.resourceManager?.getRawFileContent('QQMailMiddle.pem')
          if (!ca0Data) {
            return;
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


          client = new Pop3Command({
            host: `pop.${hostParam}.com`,
            port: 465,
            user: ctx.account + ctx.mailType,
            password: ctx.password,
            timeout: 30000,
            servername: `pop.${hostParam}.com`,
            tls: true,
            tlsOptions: option
          });
        } else {
          client = new Pop3Command({
            host: `pop.${hostParam}.com`,
            port: 465,
            user: ctx.account + ctx.mailType,
            password: ctx.password,
            timeout: 30000,
            servername: `pop.${hostParam}.com`,
            tls: false,
            tlsOptions: undefined
          });
        }
        GlobalObj?.getInstance()?.setClient(client)
      }

      if (GlobalObj?.getInstance()?.getClient()) {
        // 因为没有登录状态判断的接口 所以登陆之前先退出一下 防止已经登录导致出错了
        try {
          const quitInfo = await GlobalObj?.getInstance()?.getClient()?.command('QUIT');
        } catch (err) {

        }
        // These must be in order
        await GlobalObj?.getInstance()?.getClient()?.connect();
        await GlobalObj?.getInstance()?.getClient()?.command('USER', ctx.account + ctx.mailType);
        await GlobalObj?.getInstance()?.getClient()?.command('PASS', ctx.password);
        this.showToast('账号登录成功', 'login-pop3')
        router.pushUrl({
          url: 'pages/CommandPage',
          params: {
            sendCount: ctx.account + ctx.mailType
          }
        })
      }
    } catch (err) {
      this.showToast(`账号登录出错：${err.message}`, 'login-pop3')
    }
  }

  async autoLogin() {
    const ctx = this;
    GlobalObj?.getInstance()?.setClient(null)
    let jumpOption: Pop3LoginBean | null = null;
    try {
      let hostParam = ctx.mailType.substring(ctx.mailType.indexOf('@') + 1, ctx.mailType.indexOf('.'))
      if (this.secure) {
        let option: socket.TLSConnectOptions = {
          ALPNProtocols: ["spdy/1", "http/1.1"],
          address: {
            address: `pop.${hostParam}.com`,
            port: 995,
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
          return;
        }
        let ca0Data = await context?.resourceManager?.getRawFileContent('QQMailMiddle.pem')
        if (!ca0Data) {
          return;
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

        jumpOption = {
          host: `pop.${hostParam}.com`,
          port: 995,
          user: ctx.account + ctx.mailType,
          password: ctx.password,
          timeout: 30000,
          servername: `pop.${hostParam}.com`,
          tls: true,
          tlsOptions: option
        }
      } else {
        jumpOption = {
          host: `pop.${hostParam}.com`,
          port: 110,
          user: ctx.account + ctx.mailType,
          password: ctx.password,
          timeout: 30000,
          servername: `pop.${hostParam}.com`,
          tls: false,
          tlsOptions: undefined
        }
      }
      router.pushUrl({
        url: 'pages/AutoLoginCommandPage',
        params: {
          loginOption: jumpOption
        }
      })
    } catch (err) {
      this.showToast(`配置登录参数失败：${err.message}`, 'login-pop3')
    }
  }
}