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

import NoTlsUtil from '../utils/FtpApiUtil'
import { AccessOptions, FileInfo, FileType, FTPResponse, UnixPermissions } from '@ohos/basic-ftp'
import fs from '@ohos.file.fs'
import buffer from '@ohos.buffer'
import socket from '@ohos.net.socket';
import promptAction from '@ohos.promptAction'
import { ToolType } from '@ohos.multimodalInput.touchEvent'
import GlobalObj from '../GlobalObj'

/**
 * tips:一旦调用setWorkingDirectory 设置了当前工作目录 远程地址remotePath只需要写文件名，否则会报错，仅限于操作本文件夹内的文件
 * 设置工作目录之前，remotePath = 'Users\\Administrator\\Desktop\\commonsNet\\ftp\\serverReceived.txt'
 * 设置工作目录之后 remotePath = 'serverReceived.txt'
 */
const TAG = 'zdy'

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
      Text('请输入文件夹名称').fontSize(20).margin({ top: 10, bottom: 10 }).width('90%')
      TextInput({ placeholder: '', text: this.textValue }).height(60).width('90%')
        .onChange((value: string) => {
          this.textValue = value;
        })
      Text('Tips:输入的文件夹如果不存在则会自动在远程服务器创建，并且是在当前工作目录里面创建，调用该方法之后工作目录会自动切换到该目录')
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
struct SamplePage {
  @State message: string = 'Hello World'
  @State secure: boolean = false;
  @State user: string = 'xxx';
  @State password: string = 'xxx';
  @State host: string = 'xxx';
  @State port: number = 21;
  @State secureOptions: socket.TLSConnectOptions | null = null;
  @State remoteRoot: string | null = null;
  @State currentFileList: FileInfo[] = [];
  @State localUploadFilePath: string | null = null;
  @State localUploadFileDir: string | null = null;
  @State localDownloadFilePath: string | null = null;
  @State localDownloadFileDir: string | null = null;
  @State selectFilePath: string | null = null;
  @State selectDirPath: string | null = null;
  @State isShowLog: boolean = false;
  @State isLogin: boolean = false;
  @State textValue: string = ''
  @State inputValue: string = 'click me'
  @State operationType: string = ''
  private ftpUtil: NoTlsUtil | null = null;
  private option: socket.TLSConnectOptions = {
    ALPNProtocols: ["spdy/1", "http/1.1"],
    address: {
      address: '',
      port: 50000,
      family: 1
    },
    secureOptions: {
      key: '',
      cert: '',
      ca: [''],
      password: '',
      protocols: [socket.Protocol.TLSv12, socket.Protocol.TLSv13],
      useRemoteCipherPrefer: true,
      signatureAlgorithms: "rsa_pss_rsae_sha256:ECDSA+SHA256",
      cipherSuite: "AES256-SHA256"
    }
  }
  dialogController: CustomDialogController | null = new CustomDialogController({
    builder: CustomDialogDiy({
      cancel: () => {
        this.showToast(`关闭了对话框，取消在服务器创建新的文件夹`, 'CustomDialogDiy-cancel')
      },
      confirm: () => {
        if (this.operationType === 'dir') {
          this.showToast(`在服务器创建新的文件夹`, 'CustomDialogDiy-cancel')
          this.ensureRemotePath()
        } else if (this.operationType === 'rename') {
          this.showToast(`在服务器创建新的文件夹`, 'CustomDialogDiy-cancel')
          this.renameFile()
        } else if (this.operationType === 'uploadSingleFile') {
          this.uploadSingleFile()
        } else if (this.operationType === 'uploadDir') {
          this.uploadDir()
        } else {
          this.showToast(`未知操作类型`, 'CustomDialogDiy-unknow')
        }

      },
      textValue: $textValue,
      inputValue: $inputValue
    }),
    autoCancel: true,
    customStyle: false
  })

  @Builder
  SubMenu() {
    Menu() {
      MenuItem({ content: '获取当前工作目录', labelInfo: 'getCurrentDirectory' })
        .onChange((selected) => {
          if (selected) {
            this.getCurrentDirectory()
          }
        })

      MenuItem({ content: '返回上一级', labelInfo: 'back' })
        .onChange((selected) => {
          if (selected) {
            this.backToParent()
          }
        })

      MenuItem({ content: '获取文件大小', labelInfo: 'getFileSize' })
        .onChange((selected) => {
          if (selected) {
            this.getFileSize()
          }
        })


      MenuItem({ content: '获取文件最后修改时间', labelInfo: 'getLastModifyTime' })
        .onChange((selected) => {
          if (selected) {
            this.getLastModifyTime()
          }
        })

      MenuItem({ content: '获取服务器支持的能力', labelInfo: 'getServerFeatures' })
        .onChange((selected) => {
          if (selected) {
            this.getServerFeatures()
          }
        })

      MenuItem({ content: '删除单个文件', labelInfo: 'deleteSingleFile' })
        .onChange((selected) => {
          if (selected) {
            this.deleteSingleFile()
          }
        })
      MenuItem({ content: '确保服务器文件地址是否存在(若不存在会自动生成)', labelInfo: 'ensureRemotePath' })
        .onChange((selected) => {
          if (selected) {
            this.operationType = 'dir'
            if (this.dialogController) {
              this.dialogController.open()
            }
          } else {
            this.operationType = ''
          }
        })
      MenuItem({ content: '删除空目录', labelInfo: 'deleteEmptyDirectory' })
        .onChange((selected) => {
          if (selected) {
            this.deleteEmptyDirectory()
          }
        })
      MenuItem({ content: '删除文件夹', labelInfo: 'deleteAll' })
        .onChange((selected) => {
          if (selected) {
            this.deleteAll()
          }
        })
      MenuItem({ content: '清空当前工作目录', labelInfo: 'deleteAllButSelf' })
        .onChange((selected) => {
          if (selected) {
            this.deleteAllButSelf()
          }
        })
      MenuItem({ content: '重命名文件', labelInfo: 'renameFile' })
        .onChange((selected) => {
          if (selected) {
            this.operationType = 'rename'
            if (this.dialogController) {
              this.dialogController.open()
            }
          } else {
            this.operationType = ''
          }
        })
    }
  }

  aboutToAppear() {
    if (!this.ftpUtil) {
      this.ftpUtil = new NoTlsUtil(GlobalObj?.getInstance()?.getContext() ? GlobalObj?.getInstance()?.getContext() : getContext(this))
      this.ftpUtil.setTag();
    }
  }

  aboutToDisappear() {
    this.dialogController = null;
    if (this.ftpUtil) {
      this.ftpUtil.close();
    }
  }

  showToast(text: string, name = '测试') {
    const ctx = this
    if (ctx.ftpUtil) {
      ctx.isLogin = ctx.ftpUtil.getLogin();
    }
    let index = ctx.message.lastIndexOf("\r\n")
    let newStr = ctx.message.substring(index, ctx.message.length)
    if (newStr.indexOf('当前上传长度') != -1) {
      let front = ctx.message.substring(0, index)
      ctx.message = front + "\r\n" + text;
    } else if (newStr.indexOf('当前下载长度') != -1) {
      let index = ctx.message.lastIndexOf("\r\n")
      let front = ctx.message.substring(0, index)
      ctx.message = front + "\r\n" + text
    }
    else {
      ctx.message = ctx.message + "\r\n" + text
    }
    console.log(`${TAG}---${name}--->${text}`)
    promptAction.showToast({
      message: text,
      duration: 2000,
      bottom: 50
    })
  }

  build() {
    if (!this.isLogin) {
      Row() {
        Column() {
          Flex({ justifyContent: FlexAlign.Start, direction: FlexDirection.Row, alignItems: ItemAlign.Center }) {
            Text('服务器地址：')
              .fontSize(20)
              .height(50)
              .width(200)
              .margin({ left: 10 })
              .textAlign(TextAlign.Center)
              .fontWeight(FontWeight.Bold)

            TextInput({ placeholder: '请输入服务器地址', text: this.host })
              .width('100%')
              .height(50)
              .margin({ left: 15 })
              .borderWidth(2)
              .borderColor(Color.Gray)
              .type(InputType.Normal)
              .onChange((data) => {
                this.host = data
              })
          }

          Flex({ justifyContent: FlexAlign.Start, direction: FlexDirection.Row, alignItems: ItemAlign.Center }) {
            Text('端口号：')
              .fontSize(20)
              .height(50)
              .width(200)
              .margin({ left: 10 })
              .textAlign(TextAlign.Center)
              .fontWeight(FontWeight.Bold)

            TextInput({ placeholder: '请输入端口号址', text: '21' })
              .width('100%')
              .height(50)
              .margin({ left: 15 })
              .borderWidth(2)
              .borderColor(Color.Gray)
              .type(InputType.Normal)
              .onChange((data) => {
                this.port = Number.parseInt(data)
              })
          }

          Flex({ justifyContent: FlexAlign.Start, direction: FlexDirection.Row, alignItems: ItemAlign.Center }) {
            Text('账号：')
              .fontSize(20)
              .height(50)
              .width(80)
              .margin({ left: 10 })
              .textAlign(TextAlign.Center)
              .fontWeight(FontWeight.Bold)

            TextInput({ placeholder: '请输入账号', text: this.user })
              .width('100%')
              .height(50)
              .margin({ left: 15 })
              .borderWidth(2)
              .borderColor(Color.Gray)
              .type(InputType.Normal)
              .onChange((data) => {
                this.user = data
              })
          }
          .margin({ top: 20 })

          Flex({ justifyContent: FlexAlign.Start, direction: FlexDirection.Row, alignItems: ItemAlign.Center }) {
            Text('密码：')
              .fontSize(20)
              .height(50)
              .width(80)
              .margin({ left: 10 })
              .textAlign(TextAlign.Center)
              .fontWeight(FontWeight.Bold)

            TextInput({ placeholder: '请输入密码', text: this.password })
              .width('100%')
              .height(50)
              .borderWidth(2)
              .margin({ left: 15 })
              .borderColor(Color.Gray)
              .type(InputType.Normal)
              .onChange((data) => {
                this.password = data
              })
          }
          .margin({ top: 20 })


          Flex({ justifyContent: FlexAlign.Start, direction: FlexDirection.Row, alignItems: ItemAlign.Center }) {
            Text('是否开启SSL/TLS')
              .fontSize(20)
              .height(50)
              .margin({ left: 15 })
              .textAlign(TextAlign.Center)
              .fontWeight(FontWeight.Bold)


            Checkbox({ name: '是否开启SSL/TLS', group: 'ssl' })
              .height(40)
              .select(false)
              .margin({ left: 10 })
              .selectedColor(Color.Blue)
              .onChange((value) => {
                this.secure = value
              })
          }
          .margin({ top: 20 })

          Button('登录')
            .margin(20)
            .width('80%')
            .height(50)
            .backgroundColor(Color.Blue)
            .fontColor(Color.White)
            .onClick(() => {
              this.loginServer()
            })
        }
        .justifyContent(FlexAlign.Center)
        .height('100%')
        .width('100%')
      }
      .width('100%')
      .height('100%')
    } else {
      Row() {
        Column() {
          Flex({ justifyContent: FlexAlign.Start, direction: FlexDirection.Row, alignItems: ItemAlign.Start }) {
            MenuItem({
              startIcon: $r('app.media.icon'),
              content: '更多操作',
              endIcon: $r('app.media.more'),
              builder: this.SubMenu
            })
              .bindMenu(this.SubMenu)

            Text(`当前文件夹：${this.remoteRoot}`)
              .layoutWeight(1)
              .fontSize(12)
              .textAlign(TextAlign.Start)
              .height(50)
          }
          .padding(20)


          Flex({ justifyContent: FlexAlign.Start, direction: FlexDirection.Row, alignItems: ItemAlign.Start }) {
            List({ space: 10, initialIndex: 0 }) {
              ForEach(this.currentFileList, (item: FileInfo, index: number) => {
                ListItem() {
                  if (item.type == FileType.Directory) {
                    Flex({
                      justifyContent: FlexAlign.Start,
                      direction: FlexDirection.Row,
                      alignItems: ItemAlign.Center
                    }) {
                      Toggle({ type: ToggleType.Checkbox, isOn: true })
                        .size({ width: 30, height: 30 })
                        .selectedColor('#007DFF')
                        .visibility(this.selectDirPath && this.selectDirPath.length > 0 && this.selectDirPath == item.name ? Visibility.Visible : Visibility.None)

                      Image($r('app.media.fileDir'))
                        .height(40)
                        .width(40)
                        .margin({ left: 10 })


                      Text(item.name)
                        .fontSize(20)
                        .height(50)
                        .margin({ left: 10 })
                        .fontWeight(FontWeight.Bold)
                    }
                    .margin({ top: 10 })
                  } else if (item.type == FileType.File) {
                    Flex({
                      justifyContent: FlexAlign.Start,
                      direction: FlexDirection.Row,
                      alignItems: ItemAlign.Center
                    }) {
                      Toggle({ type: ToggleType.Checkbox, isOn: true })
                        .size({ width: 30, height: 30 })
                        .selectedColor('#007DFF')
                        .visibility(this.selectFilePath && this.selectFilePath === item.name ? Visibility.Visible : Visibility.None)

                      Image($r('app.media.file'))
                        .height(40)
                        .width(40)
                        .margin({ left: 10 })


                      Text(item.name)
                        .fontSize(20)
                        .height(50)
                        .margin({ left: 10 })
                        .fontWeight(FontWeight.Bold)
                    }
                    .margin({ top: 10 })
                  } else {
                    Flex({
                      justifyContent: FlexAlign.Start,
                      direction: FlexDirection.Row,
                      alignItems: ItemAlign.Center
                    }) {
                      Toggle({ type: ToggleType.Checkbox, isOn: true })
                        .size({ width: 30, height: 30 })
                        .selectedColor('#007DFF')
                        .visibility(this.selectDirPath && this.selectDirPath.length > 0 && this.selectDirPath == item.name ? Visibility.Visible : Visibility.None)


                      Image($r('app.media.unknow'))
                        .height(40)
                        .width(40)
                        .margin({ left: 10 })


                      Text(item.name)
                        .fontSize(20)
                        .height(50)
                        .margin({ left: 10 })
                        .fontWeight(FontWeight.Bold)
                    }
                    .margin({ top: 10 })
                  }

                }
                .parallelGesture(TapGesture().onAction((event) => {
                  if (this.currentFileList && this.currentFileList.length > 0 && item) {
                    let name = item.name
                    this.showToast(`点击了：${name}`, `ListItem---${item}`)
                    if (item.type != FileType.Directory) {
                      if (this.selectFilePath == undefined) {
                        this.selectFilePath = name
                        this.showToast(`选择了 selectFilePath ${this.selectFilePath}`, 'selectFilePath')
                      } else {
                        this.selectFilePath = null;
                        this.showToast(`取消了选择 `, 'selectFilePath')
                      }
                    } else {
                      this.enterChildDir(item.name)
                    }
                  }

                }), GestureMask.Normal)
                .gesture(LongPressGesture().onAction((event) => {
                  if (this.selectDirPath && this.selectDirPath.length > 0) {
                    this.selectDirPath = null
                  } else {
                    this.selectDirPath = item.name
                  }
                }), GestureMask.Normal)

              }, (item: FileInfo, index: number) => item.name)
            }
            .width('100%')
            .listDirection(Axis.Vertical)
            .divider({ strokeWidth: 2, color: 0x888888 })
            .edgeEffect(EdgeEffect.None)
            .chainAnimation(false)
          }
          .border({
            width: 5,
            color: Color.Green,
            style: BorderStyle.Solid
          })
          .visibility(this.isShowLog ? Visibility.None : Visibility.Visible)
          .layoutWeight(1)
          .margin({ left: 20, right: 20 })

          Flex({ justifyContent: FlexAlign.Start, direction: FlexDirection.Row, alignItems: ItemAlign.Center }) {
            Scroll() {
              Text(this.message)
                .width('100%')
                .fontSize(20)
                .textAlign(TextAlign.Start)
                .padding(10)
            }
            .width('100%')
          }
          .border({
            width: 5,
            color: Color.Green,
            style: BorderStyle.Solid
          })
          .visibility(this.isShowLog ? Visibility.Visible : Visibility.None)
          .layoutWeight(1)
          .margin(20)

          Flex({ justifyContent: FlexAlign.Start, direction: FlexDirection.Row, alignItems: ItemAlign.Center }) {
            Button(this.isShowLog ? '查看列表' : '查看日志')
              .fontSize(14)
              .height(30)
              .margin({ left: 10 })
              .fontWeight(FontWeight.Bold)
              .onClick(() => {
                this.isShowLog = !this.isShowLog;
              })

            Button('退出登陆')
              .fontSize(14)
              .height(30)
              .margin({ left: 10 })
              .fontWeight(FontWeight.Bold)
              .onClick(async () => {
                this.isLogin = false;
                if (this.ftpUtil) {
                  await this.ftpUtil.close();
                }
                if (GlobalObj?.getInstance()?.getContext()) {
                  GlobalObj?.getInstance()?.getContext()?.terminateSelf()
                }
              })
          }
          .margin({ top: 10 })


          Flex({ justifyContent: FlexAlign.Start, direction: FlexDirection.Row, alignItems: ItemAlign.Center }) {
            Button('生成本地文件')
              .fontSize(14)
              .height(30)
              .margin({ left: 10 })
              .fontWeight(FontWeight.Bold)
              .onClick(() => {
                this.createSingleFile()
              })
            Button('上传单个本地文件')
              .fontSize(14)
              .height(30)
              .margin({ left: 10 })
              .fontWeight(FontWeight.Bold)
              .onClick(() => {
                this.operationType = 'uploadSingleFile'
                if (this.dialogController) {
                  this.dialogController.open()
                }
              })

          }
          .border({
            width: 5,
            color: Color.Green,
            style: BorderStyle.Solid
          })
          .padding({ top: 5, bottom: 5 })
          .margin({ top: 10 })

          Flex({ justifyContent: FlexAlign.Start, direction: FlexDirection.Row, alignItems: ItemAlign.Center }) {
            Button('生成本地文件')
              .fontSize(14)
              .height(30)
              .margin({ left: 10 })
              .fontWeight(FontWeight.Bold)
              .onClick(() => {
                this.createSingleFile()
              })
            Button('追加上传')
              .fontSize(14)
              .height(30)
              .margin({ left: 10 })
              .fontWeight(FontWeight.Bold)
              .onClick(() => {
                this.appendFile()
              })

          }
          .border({
            width: 5,
            color: Color.Green,
            style: BorderStyle.Solid
          })
          .padding({ top: 5, bottom: 5 })
          .margin({ top: 10 })


          Flex({ justifyContent: FlexAlign.Start, direction: FlexDirection.Row, alignItems: ItemAlign.Center }) {

            Button('生成本地文件夹')
              .fontSize(14)
              .height(30)
              .margin({ left: 10 })
              .fontWeight(FontWeight.Bold)
              .onClick(() => {
                this.createFileDir()
              })
            Button('上传本地文件夹')
              .fontSize(14)
              .height(30)
              .margin({ left: 10 })
              .fontWeight(FontWeight.Bold)
              .onClick(() => {
                this.operationType = 'uploadDir'
                if (this.dialogController) {
                  this.dialogController.open()
                }
              })
          }
          .border({
            width: 5,
            color: Color.Green,
            style: BorderStyle.Solid
          })
          .padding({ top: 5, bottom: 5 })
          .margin({ top: 10 })

          Flex({ justifyContent: FlexAlign.Start, direction: FlexDirection.Row, alignItems: ItemAlign.Center }) {
            Button('下载单个文件')
              .fontSize(14)
              .height(30)
              .margin({ left: 10 })
              .fontWeight(FontWeight.Bold)
              .onClick(() => {
                this.downloadSingleFile()
              })

            Button('下载文件夹')
              .fontSize(14)
              .height(30)
              .margin({ left: 10 })
              .fontWeight(FontWeight.Bold)
              .onClick(() => {
                this.downloadDir()
              })
          }
          .margin({ top: 10, bottom: 20 })
        }
        .margin(15)
        .border({
          width: 2,
          color: Color.Red,
          radius: 10,
          style: BorderStyle.Solid
        })
        .width('100%')
        .height('100%')
      }
      .width('100%')
      .height('100%')
    }
  }

  async loginServer() {
    const ctx = this
    ctx.message = '初始化参数，准备登录'
    let loginInfo: AccessOptions | null = null
    if (ctx.secure) {
      let context = GlobalObj?.getInstance()?.getContext() ? GlobalObj?.getInstance()?.getContext() : getContext(this)
      if (!context) {
        return;
      }
      let keyData = await context?.resourceManager?.getRawFileContent('client_rsa_private.pem.unsecure')
      if (!keyData) {
        return;
      }
      let key = '';
      for (let i = 0; i < keyData.length; i++) {
        let todo = keyData[i]
        let item = String.fromCharCode(todo);
        key += item;
      }
      ctx.option.secureOptions.key = key;

      let certData = await context.resourceManager.getRawFileContent('client.pem')
      let cert = '';
      for (let i = 0; i < certData.length; i++) {
        let todo = certData[i]
        let item = String.fromCharCode(todo);
        cert += item;
      }
      ctx.option.secureOptions.cert = cert;


      let caData = await context.resourceManager.getRawFileContent('ca.pem')
      let ca = '';
      for (let i = 0; i < caData.length; i++) {
        let todo = caData[i]
        let item = String.fromCharCode(todo);
        ca += item;
      }
      if (ctx.option.secureOptions.ca instanceof Array) {
        ctx.option.secureOptions.ca[0] = ca;
      } else {
        ctx.option.secureOptions.ca = ca;
      }


      ctx.option.address = {
        address: ctx.host,
        port: ctx.port,
        family: 1
      }
      loginInfo = {
        host: ctx.host,
        user: ctx.user,
        port: ctx.port,
        password: ctx.password,
        secure: 'implicit',
        secureOptions: ctx.option
      }
    } else {
      loginInfo = {
        host: ctx.host,
        user: ctx.user,
        port: ctx.port,
        password: ctx.password,
        secure: false,
        secureOptions: undefined
      }
    }
    if (ctx.ftpUtil) {
      ctx.ftpUtil.doLogin(loginInfo, {
        onLoginStart(info: string) {
          ctx.showToast(info, 'onLoginStart')
        },
        onLoginSuccess(result: string) {
          ctx.showToast(result, 'onLoginSuccess')
          ctx.refreshScreen()
        },
        onLoginErr(err: Error) {
          ctx.showToast(err.message, 'onLoginErr')
        }
      })
    }
  }

  getCurrentDirectory() {
    const ctx = this
    if (ctx.ftpUtil) {
      if (!ctx.ftpUtil.getLogin()) {
        ctx.showToast('客户端未登录，请先登录', 'isLogin')
        return
      }
      ctx.ftpUtil.getCurrentDirectory({
        currentDirectoryErr(err: Error) {
          ctx.showToast(`获取当前工作目录失败：${err.message}`, 'currentDirectoryErr')
        },
        currentDirectoryStart(info: string) {
          ctx.showToast(`获取当前工作目录开始：${info}`, 'currentDirectoryStart')
        },
        currentDirectorySuccess(msg: string) {
          ctx.showToast(`获取当前工作目录成功：${msg}`, 'currentDirectorySuccess')
          ctx.remoteRoot = msg
        }
      })
    }
  }

  refreshScreen() {
    const ctx = this
    if (ctx.ftpUtil) {
      if (!ctx.ftpUtil?.getLogin()) {
        ctx.showToast('客户端未登录，请先登录', 'isLogin')
        return
      }
      ctx.ftpUtil?.getCurrentDirectory({
        currentDirectoryErr(err: Error) {
          ctx.showToast(`获取当前工作目录失败：${err.message}`, 'currentDirectoryErr')
        },
        currentDirectoryStart(info: string) {
          ctx.showToast(`获取当前工作目录开始：${info}`, 'currentDirectoryStart')
        },
        currentDirectorySuccess(msg: string) {
          ctx.showToast(`获取当前工作目录成功：${msg}`, 'currentDirectorySuccess')
          ctx.remoteRoot = msg
          let listName = '';
          if (ctx.remoteRoot == '' || ctx.remoteRoot == '\\' || ctx.remoteRoot == '/') {
            listName = ''
          } else {
            listName = msg
          }
          ctx.ftpUtil?.getList(listName, {
            getListErr(err: Error) {
              ctx.showToast(`获取文件列表失败：${err.message}`, 'getListErr')
              ctx.currentFileList = []
            },
            getListStart(info: string) {
              ctx.showToast(`获取文件列表开始：${info}`, 'getListStart')
            },
            getListSuccess(result: FileInfo[]) {
              ctx.showToast(`获取当文件列表成功：${JSON.stringify(result)}`, 'getListSuccess')
              if (!result) {
                ctx.currentFileList = []
              } else {
                ctx.currentFileList = result;
              }

            }
          })

        }
      })
    }
  }

  createSingleFile() {
    const ctx = this
    try {
      ctx.showToast('开始生成单个本地文件', 'createSingleFile')
      let context: Context | null = GlobalObj?.getInstance()?.getContext() ? GlobalObj?.getInstance()?.getContext() : getContext(ctx)
      ctx.localUploadFilePath = context?.cacheDir + '/' + (new Date().getTime()) + '.txt'
      let file = fs.openSync(ctx.localUploadFilePath, fs.OpenMode.CREATE | fs.OpenMode.READ_WRITE)
      let str = ''
      for (let i = 0; i < 1024; i++) {
        str += "客户端发送到服务端的信息，请查收\r\n"
      }
      fs.writeSync(file.fd, str)
      fs.fsyncSync(file.fd)
      fs.closeSync(file)
      ctx.showToast('生成本地单个文件成功', 'createSingleFile')
    } catch (err) {
      ctx.localUploadFilePath = null
      ctx.showToast('生成本地单个文件失败:' + JSON.stringify(err), 'createSingleFile')
    }
  }

  createFileDir() {
    const ctx = this
    try {
      ctx.showToast('开始生成本地文件夹', 'createFileDir')
      let context: Context | null = GlobalObj?.getInstance()?.getContext() ? GlobalObj?.getInstance()?.getContext() : getContext(ctx)
      ctx.localUploadFileDir = context?.cacheDir + '/' + (new Date().getTime())
      let localPath1 = ctx.localUploadFileDir + '/' + 'test1.txt'
      let localPath2 = ctx.localUploadFileDir + '/' + 'test2.txt'
      let localPath3 = ctx.localUploadFileDir + '/' + 'test3.txt'

      fs.mkdirSync(ctx.localUploadFileDir)
      let file = fs.openSync(localPath1, fs.OpenMode.CREATE | fs.OpenMode.READ_WRITE)
      let str = ''
      for (let i = 0; i < 1024; i++) {
        str += "客户端发送到服务端的信息，请查收\r\n"
      }
      fs.writeSync(file.fd, str)
      fs.fsyncSync(file.fd)
      fs.closeSync(file)

      let file1 = fs.openSync(localPath2, fs.OpenMode.CREATE | fs.OpenMode.READ_WRITE)
      let str1 = '789456123abcd'
      fs.writeSync(file1.fd, str1)
      fs.fsyncSync(file1.fd)
      fs.closeSync(file1)


      let file3 = fs.openSync(localPath3, fs.OpenMode.CREATE | fs.OpenMode.READ_WRITE)
      let str3 = '111111111111111111111111111111111111111111111111111111'
      fs.writeSync(file3.fd, str3)
      fs.fsyncSync(file3.fd)
      fs.closeSync(file3)


      ctx.showToast('生成本地文件夹成功', 'createFileDir')
    } catch (err) {
      ctx.localUploadFileDir = null;
      ctx.showToast('生成本地文件夹失败:' + JSON.stringify(err), 'createFileDir')
    }
  }

  appendFile() {
    const ctx = this
    if (ctx.ftpUtil) {
      if (!this.ftpUtil?.getLogin()) {
        ctx.operationType = ''
        ctx.showToast('客户端未登录，请先登录', 'uploadSingleFile')
        return
      }
      if (!ctx.localUploadFilePath || ctx.localUploadFilePath.length < 1) {
        ctx.operationType = ''
        ctx.showToast('未生成本地单个文件，请先点击 生成本地文件  按钮', 'appendFile')
        return
      }
      if (!ctx.remoteRoot || ctx.remoteRoot.length < 1) {
        ctx.operationType = ''
        ctx.showToast('未获取当前工作目录，请先获取当前工作目录', 'appendFile')
        return
      }
      if (!ctx.selectFilePath || ctx.selectFilePath.length < 1) {
        ctx.operationType = ''
        ctx.showToast('未选择需要附加上传的文件，请先选择需要附加上传的文件', 'appendFile')
        return
      }
      ctx.ftpUtil?.getFileSize(ctx.selectFilePath, {
        getSizeErr(err: Error) {
          ctx.showToast(`附加上传之前先获取原文件大小失败，${err.message}`, 'appendFile')
        },
        getSizeStart(info: string) {
          ctx.showToast(`附加上传之前先获取原文件大小开始，${info}`, 'appendFile')
        },
        getSizeSuccess(result: number) {
          ctx.showToast(`附加上传之前先获取原文件${ctx.selectFilePath}大小:${result}`, 'appendFile')
          ctx.ftpUtil?.appendFile(ctx.localUploadFilePath, ctx.selectFilePath, {
            appendErr(err: Error) {
              ctx.showToast(`附加上传单个文件失败： ${JSON.stringify(err)}`, 'appendFile')
            },
            appendStart(info: string) {
              ctx.showToast(info, 'uploadSingleFile')
            },
            appendSuccess(msg: FTPResponse) {
              ctx.showToast(`附加上传成功，返回的信息是:` + JSON.stringify(msg), 'appendFile')
              ctx.ftpUtil?.getFileSize(ctx.selectFilePath, {
                getSizeErr(err: Error) {
                  ctx.showToast(`附加上传之后获取原文件大小失败，${err.message}`, 'appendFile')
                },
                getSizeStart(info: string) {
                  ctx.showToast(`附加上传之后获取原文件大小开始，${info}`, 'appendFile')
                },
                getSizeSuccess(result: number) {
                  ctx.showToast(`附加上传之后获取原文件${ctx.selectFilePath}大小:${result}`, 'appendFile')
                  ctx.refreshScreen()
                }
              })

            },
            appendProgress(currentSize: number, totalSize: number) {
              ctx.showToast(`附加当前上传长度:${currentSize}，上次文件总长度：${totalSize}`, 'appendFile')
            }
          })
        }
      })

    }

  }

  uploadSingleFile() {
    const ctx = this
    if (ctx.ftpUtil) {
      if (!this.ftpUtil?.getLogin()) {
        ctx.operationType = ''
        ctx.showToast('客户端未登录，请先登录', 'uploadSingleFile')
        return
      }
      if (!ctx.localUploadFilePath || ctx.localUploadFilePath.length < 1) {
        ctx.operationType = ''
        ctx.showToast('未生成本地单个文件，请先点击 生成本地文件  按钮', 'uploadSingleFile')
        return
      }
      if (!ctx.remoteRoot || ctx.remoteRoot.length < 1) {
        ctx.operationType = ''
        ctx.showToast('未获取当前工作目录，请先获取当前工作目录', 'uploadSingleFile')
        return
      }
      if (!ctx.inputValue || ctx.inputValue.length < 1) {
        ctx.operationType = ''
        ctx.showToast('未输入文件名，请先输入文件名', 'uploadSingleFile')
        return
      }
      ctx.ftpUtil?.uploadSingleFile(ctx.localUploadFilePath, ctx.inputValue, {
        uploadErr(err: Error) {
          ctx.showToast(`上传单个文件失败： ${JSON.stringify(err)}`, 'uploadSingleFile')
        },
        uploadStart(info: string) {
          ctx.showToast(info, 'uploadSingleFile')
        },
        uploadSuccess(msg: FTPResponse) {
          ctx.showToast(`上传成功，返回的信息是:` + JSON.stringify(msg), 'uploadSingleFile')
          ctx.refreshScreen()
        },
        uploadProgress(currentSize: number, totalSize: number) {
          ctx.showToast(`当前上传长度:${currentSize}，上次文件总长度：${totalSize}`, 'uploadSingleFile')
        }
      })
    }

  }

  uploadDir() {
    const ctx = this
    if (ctx.ftpUtil) {
      if (!this.ftpUtil?.getLogin()) {
        ctx.operationType = ''
        ctx.showToast('客户端未登录，请先登录', 'uploadDir')
        return
      }
      if (!ctx.localUploadFileDir || ctx.localUploadFileDir.length < 1) {
        ctx.operationType = ''
        ctx.showToast('未生成本地文件夹，请先点击 生成本地文件夹 按钮', 'uploadDir')
        return
      }
      if (!ctx.remoteRoot || ctx.remoteRoot.length < 1) {
        ctx.operationType = ''
        ctx.showToast('未获取当前工作目录，请先获取当前工作目录', 'uploadDir')
        return
      }
      if (!ctx.inputValue || ctx.inputValue.length < 1) {
        ctx.operationType = ''
        ctx.showToast('未输入文件名，请先输入文件名', 'uploadDir')
        return
      }
      ctx.ftpUtil?.uploadDir(ctx.localUploadFileDir, ctx.inputValue, {
        uploadDirErr(err: Error) {
          ctx.showToast(err.message, 'uploadDir')
        },
        uploadDirStart(info: string) {
          ctx.showToast(info, 'uploadDir')
        },
        uploadDirSuccess(msg: string) {
          ctx.showToast(`上传文件夹成功，返回的信息是:${'\r\n'}` + JSON.stringify(msg), 'uploadDir')
          ctx.refreshScreen()
        },
        uploadDirProgress(currentSize: number, totalSize: number) {
          ctx.showToast(`currentSize：${currentSize}，totalSize：${totalSize}`, 'uploadDir')
        }
      })
    }
  }

  downloadSingleFile() {
    const ctx = this
    let context = GlobalObj?.getInstance()?.getContext() ? GlobalObj?.getInstance()?.getContext() : getContext(ctx)

    if (this.ftpUtil) {
      if (!this.ftpUtil?.getLogin()) {
        ctx.showToast('客户端未登录，请先登录', 'downloadSingleFile')
        return
      }
      if (!ctx.remoteRoot || ctx.remoteRoot.length < 1) {
        ctx.showToast('未获取当前工作目录，请先获取当前工作目录', 'downloadSingleFile')
        return
      }
      if (!ctx.selectFilePath || ctx.selectFilePath.length < 1) {
        ctx.showToast('未选择文件，请先选择文件', 'getFileSize')
        return
      }
      let localPath = context?.cacheDir + '/' + ctx.selectFilePath
      this.ftpUtil?.downloadSingleFile(localPath, ctx.selectFilePath, {
        downloadErr(err: Error) {
          ctx.showToast(`下载单个文件失败，${err.message}`, 'downloadSingleFile')
        },
        downloadStart(info: string) {
          ctx.showToast(`下载单个文件开始，${info}`, 'downloadSingleFile')
        },
        downloadSuccess(msg: FTPResponse) {
          ctx.showToast(`下载成功，返回的信息是:` + JSON.stringify(msg), 'downloadSingleFile')
        },
        downloadProgress(currentSize: number, totalSize: number) {
          ctx.showToast(`currentSize：${currentSize}，totalSize：${totalSize}`, 'uploadDir')
        }
      })
    }
  }

  downloadDir() {
    const ctx = this
    let context = GlobalObj?.getInstance()?.getContext() ? GlobalObj?.getInstance()?.getContext() : getContext(ctx)

    if (this.ftpUtil) {
      if (!this.ftpUtil?.getLogin()) {
        ctx.showToast('客户端未登录，请先登录', 'downloadDir')
        return
      }
      if (!ctx.remoteRoot || ctx.remoteRoot.length < 1) {
        ctx.showToast('未获取当前工作目录，请先获取当前工作目录', 'downloadDir')
        return
      }
      if (!ctx.selectDirPath || ctx.selectDirPath.length < 1) {
        ctx.showToast('请先长按选中某个文件夹再进行本操作', 'deleteEmptyDirectory')
        return
      }
      let localDir = context?.cacheDir + ctx.selectDirPath

      this.ftpUtil?.downloadDir(localDir, ctx.selectDirPath, {
        downloadDirErr(err: Error) {
          ctx.showToast(`下载文件夹失败，${err.message}`, 'downloadDir')
        },
        downloadDirStart(info: string) {
          ctx.showToast(`下载文件夹开始，${info}`, 'downloadDir')
        },
        downloadDirSuccess(msg: string) {
          ctx.showToast(`下载文件夹成功，返回的信息是:${'\r\n'}` + JSON.stringify(msg), 'downloadDir')
        },
        downloadDirProgress(currentSize: number, totalSize: number) {
          ctx.showToast(`当前下载长度：currentSize：${currentSize}，totalSize：${totalSize}`, 'downloadDir')
        }
      })
    }
  }

  getFileSize() {
    const ctx = this
    if (this.ftpUtil) {
      if (!this.ftpUtil?.getLogin()) {
        ctx.showToast('客户端未登录，请先登录', 'getFileSize')
        return
      }
      if (!ctx.remoteRoot || ctx.remoteRoot.length < 1) {
        ctx.showToast('未获取当前工作目录，请先获取当前工作目录', 'getFileSize')
        return
      }
      if (!ctx.selectFilePath || ctx.selectFilePath.length < 1) {
        ctx.showToast('未选择文件，请先选择文件', 'getFileSize')
        return
      }
      this.ftpUtil?.getFileSize(ctx.selectFilePath, {
        getSizeErr(err: Error) {
          ctx.showToast(`获取文件大小失败，${err.message}`, 'getFileSize')
        },
        getSizeStart(info: string) {
          ctx.showToast(`获取文件大小开始，${info}`, 'getFileSize')
        },
        getSizeSuccess(result: number) {
          ctx.showToast(`获取的文件${ctx.selectFilePath}大小:${result}`, 'getFileSize')
        }
      })
    }
  }

  getServerFeatures() {
    const ctx = this
    if (this.ftpUtil) {
      if (!this.ftpUtil?.getLogin()) {
        ctx.showToast('客户端未登录，请先登录', 'getServerFeatures')
        return
      }
      this.ftpUtil.getServerFeatures({
        featuresErr(err: Error) {
          ctx.showToast(`获取服务端能力失败，${err.message}`, 'getFileSize')
        },
        featuresStart(info: string) {
          ctx.showToast(`获取服务端能力开始，${info}`, 'getFileSize')
        },
        featuresSuccess(msg: Map<string, string>) {
          ctx.showToast(`服务器能力获取成功，返回的信息是:${'\r\n'}${JSON.stringify(msg)}`, 'getFileSize')
        }
      })
    }
  }

  getLastModifyTime() {
    const ctx = this
    if (ctx.ftpUtil) {
      if (!ctx.ftpUtil?.getLogin()) {
        ctx.showToast('客户端未登录，请先登录', 'getLastModifyTime')
        return
      }
      if (!ctx.remoteRoot || ctx.remoteRoot.length < 1) {
        ctx.showToast('未获取当前工作目录，请先获取当前工作目录', 'getLastModifyTime')
        return
      }
      if (!ctx.selectFilePath || ctx.selectFilePath.length < 1) {
        ctx.showToast('未选择文件，请先选择文件', 'getLastModifyTime')
        return
      }
      ctx.ftpUtil?.getLastModify(ctx.selectFilePath, {
        lastModifyErr(err: Error) {
          ctx.showToast(`切换到工作目录的父目录失败，${err.message}`, 'getLastModifyTime')
        },
        lastModifyStart(info: string) {
          ctx.showToast(`切换到工作目录的父目录开始，${info}`, 'getLastModifyTime')
        },
        lastModifySuccess(msg: Date) {
          ctx.showToast(`切换到工作目录的父目录成功，返回的信息是:${'\r\n'}` + msg.toLocaleString(), 'getLastModifyTime')
        }
      })
    }
  }

  deleteSingleFile() {
    const ctx = this
    if (ctx.ftpUtil) {
      if (!ctx.ftpUtil?.getLogin()) {
        ctx.showToast('客户端未登录，请先登录', 'deleteSingleFile')
        return
      }
      if (!ctx.remoteRoot || ctx.remoteRoot.length < 1) {
        ctx.showToast('未获取当前工作目录，请先获取当前工作目录', 'deleteSingleFile')
        return
      }
      if (!ctx.selectFilePath || ctx.selectFilePath.length < 1) {
        ctx.showToast('未选择文件，请先选择文件', 'deleteSingleFile')
        return
      }
      ctx.ftpUtil?.deleteFile(ctx.selectFilePath, {
        deleteFileErr(err: Error) {
          ctx.showToast(`删除文件失败，${err.message}`, 'deleteSingleFile')
        },
        deleteFileStart(info: string) {
          ctx.showToast(`删除文件开始，${info}`, 'deleteSingleFile')
        },
        deleteFileSuccess(msg: FTPResponse) {
          ctx.showToast(`删除文件成功，返回的信息是:${'\r\n'}` + JSON.stringify(msg), 'deleteSingleFile')
          ctx.refreshScreen()
        }
      })
    }
  }

  backToParent() {
    const ctx = this
    if (ctx.ftpUtil) {
      if (!ctx.ftpUtil?.getLogin()) {
        ctx.showToast('客户端未登录，请先登录', 'backToParent')
        return
      }
      if (!ctx.remoteRoot || ctx.remoteRoot.length < 1) {
        ctx.showToast('未获取当前工作目录，请先获取当前工作目录', 'backToParent')
        return
      }
      ctx.ftpUtil?.cdToParentDirectory({
        cdToParentDirectoryErr(err: Error) {
          ctx.showToast(`切换到工作目录的父目录失败，${err.message}`, 'backToParent')
        },
        cdToParentDirectoryStart(info: string) {
          ctx.showToast(`切换到工作目录的父目录开始，${info}`, 'backToParent')
        },
        cdToParentDirectorySuccess(res: FTPResponse) {
          ctx.showToast(`切换到工作目录的父目录成功，返回的信息是:${'\r\n'}` + JSON.stringify(res), 'backToParent')
          ctx.refreshScreen()
        }
      })
    }
  }

  ensureRemotePath() {
    const ctx = this
    if (this.ftpUtil) {
      if (!this.ftpUtil?.getLogin()) {
        ctx.operationType = ''
        ctx.showToast('客户端未登录，请先登录', 'ensureRemotePath')
        return
      }
      if (!ctx.remoteRoot || ctx.remoteRoot.length < 1) {
        ctx.operationType = ''
        ctx.showToast('未获取当前工作目录，请先获取当前工作目录', 'ensureRemotePath')
        return
      }
      if (!ctx.inputValue || ctx.inputValue.length < 1) {
        ctx.operationType = ''
        ctx.showToast('未输入文件夹名，请先输入输入文件夹名', 'ensureRemotePath')
        return
      }
      this.ftpUtil?.ensureRemotePath(ctx.inputValue, {
        ensureRemotePathErr(err: Error) {
          ctx.operationType = ''
          ctx.showToast(`确保远程服务器存在给定的目录失败，${err.message}`, 'ensureRemotePath')
        },
        ensureRemotePathStart(info: string) {
          ctx.operationType = ''
          ctx.showToast(`确保远程服务器存在给定的目录开始，${info}`, 'ensureRemotePath')
        },
        ensureRemotePathSuccess(result: string) {
          ctx.operationType = ''
          ctx.showToast(`确保远程服务器存在给定的目录成功:${result}}`, 'ensureRemotePath')
          ctx.refreshScreen()
        }
      })
    }
  }

  deleteEmptyDirectory() {
    const ctx = this
    if (this.ftpUtil) {
      if (!this.ftpUtil?.getLogin()) {
        ctx.showToast('客户端未登录，请先登录', 'deleteEmptyDirectory')
        return
      }
      if (!ctx.remoteRoot || ctx.remoteRoot.length < 1) {
        ctx.showToast('未获取当前工作目录，请先获取当前工作目录', 'deleteEmptyDirectory')
        return
      }
      if (!ctx.selectDirPath || ctx.selectDirPath.length < 1) {
        ctx.showToast('请先长按选中某个文件夹再进行本操作', 'deleteEmptyDirectory')
        return
      }

      this.ftpUtil?.deleteEmptyDirectory(ctx.selectDirPath, {
        deleteEmptyDirectoryErr(err: Error) {
          ctx.showToast(`删除空目录失败，${err.message}`, 'deleteEmptyDirectory')
        },
        deleteEmptyDirectoryStart(info: string) {
          ctx.showToast(`删除空目录开始，${info}`, 'deleteEmptyDirectory')
        },
        deleteEmptyDirectorySuccess(result: FTPResponse) {
          ctx.showToast(`删除空目录成功:${JSON.stringify(result)}}`, 'deleteEmptyDirectory')
          ctx.refreshScreen()
        }
      })
    }
  }

  deleteAll() {
    const ctx = this
    if (this.ftpUtil) {
      if (!this.ftpUtil?.getLogin()) {
        ctx.showToast('客户端未登录，请先登录', 'deleteEmptyDirectory')
        return
      }
      if (!ctx.remoteRoot || ctx.remoteRoot.length < 1) {
        ctx.showToast('未获取当前工作目录，请先获取当前工作目录', 'deleteEmptyDirectory')
        return
      }
      if (!ctx.selectDirPath || ctx.selectDirPath.length < 1) {
        ctx.showToast('请先长按选中某个文件夹再进行本操作', 'deleteEmptyDirectory')
        return
      }

      this.ftpUtil?.deleteAll(ctx.selectDirPath, {
        deleteAllErr(err: Error) {
          ctx.showToast(`删除目录及其所有内容失败，${err.message}`, 'deleteEmptyDirectory')
        },
        deleteAllStart(info: string) {
          ctx.showToast(`删除目录及其所有内容开始，${info}`, 'deleteEmptyDirectory')
        },
        deleteAllSuccess(result: string) {
          ctx.showToast(`删除目录及其所有内容成功:${result}}`, 'deleteEmptyDirectory')
          ctx.refreshScreen()
        }
      })
    }
  }

  deleteAllButSelf() {
    const ctx = this
    if (this.ftpUtil) {
      if (!this.ftpUtil?.getLogin()) {
        ctx.showToast('客户端未登录，请先登录', 'deleteEmptyDirectory')
        return
      }
      if (!ctx.remoteRoot || ctx.remoteRoot.length < 1) {
        ctx.showToast('未获取当前工作目录，请先获取当前工作目录', 'deleteEmptyDirectory')
        return
      }
      this.ftpUtil?.deleteAllButSelf({
        deleteAllButSelfErr(err: Error) {
          ctx.showToast(`清空当前工作目录失败，${err.message}`, 'deleteEmptyDirectory')
        },
        deleteAllButSelfStart(info: string) {
          ctx.showToast(`清空当前工作目录开始，${info}`, 'deleteEmptyDirectory')
        },
        deleteAllButSelfSuccess(result: string) {
          ctx.showToast(`清空当前工作目录成功:${result}}`, 'deleteEmptyDirectory')
          ctx.refreshScreen()
        }
      })
    }
  }

  renameFile() {
    const ctx = this
    if (this.ftpUtil) {
      if (!this.ftpUtil?.getLogin()) {
        ctx.operationType = ''
        ctx.showToast('客户端未登录，请先登录', 'renameFile')
        return
      }
      if (!ctx.remoteRoot || ctx.remoteRoot.length < 1) {
        ctx.operationType = ''
        ctx.showToast('未获取当前工作目录，请先获取当前工作目录', 'renameFile')
        return
      }
      if (!ctx.inputValue || ctx.inputValue.length < 1) {
        ctx.operationType = ''
        ctx.showToast('未输入文件名，请先输入输入文件名', 'renameFile')
        return
      }
      if (!ctx.selectFilePath || ctx.selectFilePath.length < 1) {
        ctx.showToast('未选择文件，请先选择文件', 'deleteSingleFile')
        return
      }

      this.ftpUtil?.renameFile(ctx.inputValue, ctx.selectFilePath, {
        renameFileErr(err: Error) {
          ctx.operationType = ''
          ctx.showToast(`重命名文件失败，${err.message}`, 'deleteEmptyDirectory')
        },
        renameFileStart(info: string) {
          ctx.operationType = ''
          ctx.showToast(`重命名文件开始，${info}`, 'deleteEmptyDirectory')
        },
        renameFileSuccess(result: FTPResponse) {
          ctx.operationType = ''
          ctx.showToast(`重命名文件成功:${result}}`, 'deleteEmptyDirectory')
          ctx.refreshScreen()
        }
      })
    }
  }

  enterChildDir(remoteChildPath: string) {
    const ctx = this
    if (this.ftpUtil) {
      if (!this.ftpUtil?.getLogin()) {
        ctx.showToast('客户端未登录，请先登录', 'enterChildDir')
        return
      }
      if (!ctx.remoteRoot || ctx.remoteRoot.length < 1) {
        ctx.showToast('未获取当前工作目录，请先获取当前工作目录', 'enterChildDir')
        return
      }
      if (!remoteChildPath || remoteChildPath.length < 1) {
        ctx.showToast('文件夹名不合法,不可以为空', 'enterChildDir')
        return
      }

      this.ftpUtil?.setWorkingDirectory(remoteChildPath, {
        setWorkingDirectoryErr(err: Error) {
          ctx.showToast(`进入子文件夹失败，${err.message}`, 'ensureRemotePath')
        },
        setWorkingDirectoryStart(info: string) {
          ctx.showToast(`进入子文件夹开始，${info}`, 'ensureRemotePath')
        },
        setWorkingDirectorySuccess(result: FTPResponse) {
          ctx.showToast(`进入子文件夹成功:${result}}`, 'ensureRemotePath')
          ctx.refreshScreen()
        }
      })
    }
  }
}