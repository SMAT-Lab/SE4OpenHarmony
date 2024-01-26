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
import Imap, { inspect } from '@ohos/node-imap'
import router from '@ohos.router'
import GlobalObj from '../GlobalObj'
import MailBoxes from '../bean/MailBoxes'
import Box from '../bean/Box'

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
      Text('Tips:请输入正确格式的输入的文件夹名称')
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
struct FolderPage {
  @State message: string = 'Hello World'
  @State startIndex: number = 1 //当前页
  @State endIndex: number = 3 //当前页
  @State listData: Array<string> = [] //邮件列表数据集合
  @State selectFolder: string | null = '' //选择的文件夹
  @State selectType: string = '' //选择的文件夹
  @State textValue: string = ''
  @State inputValue: string = ''
  pageSize: number = 3 //请求时的每页多少条信息，用于分页请求
  dialogController: CustomDialogController | null = new CustomDialogController({
    builder: CustomDialogDiy({
      cancel: () => {
        this.showToast(`关闭了对话框，取消输入文件夹名称`, 'CustomDialogDiy-cancel')
      },
      confirm: () => {
        if (!this.inputValue || this.inputValue.length < 1) {
          this.showToast(`创建新的文件夹名称为空，请重新输入`, 'CustomDialogDiy-confirm')
          return;
        }
        if (this.selectType === 'Create') {
          this.showToast(`创建新的文件夹名称为：${this.inputValue}`, 'CustomDialogDiy-confirm')
          this.createFolder()
        } else if (this.selectType === 'Rename') {
          this.showToast(`重命名的文件夹名称为：${this.inputValue}`, 'CustomDialogDiy-confirm')
          this.renameFolder()
        }

      },
      textValue: $textValue,
      inputValue: $inputValue
    }),
    autoCancel: true,
    customStyle: false
  })

  showToast(text: string, name = '测试') {
    console.log(`zdy---${name}--->${text}`)
    promptAction.showToast({
      message: text,
      duration: 2000,
      bottom: 50
    })
  }

  aboutToAppear() {
    this.refreshFolderList()
  }

  aboutToDisappear() {
    this.dialogController = null;
  }

  refreshFolderList() {
    const ctx = this;
    if (GlobalObj?.getInstance()?.getClient()) {
      GlobalObj?.getInstance()?.getClient()?.getBoxes((err: Error, data?: MailBoxes) => {
        if (err) throw err;
        if (!data || typeof data != 'object') {
          throw new Error('get box status fail')
        }
        ctx.listData = [];
        let keyArr = Object.getOwnPropertyNames(data)
        for (let i = 0; i < keyArr.length; i++) {
          console.log(`zdy---getBoxes key--->${keyArr[i]}`);
          ctx.listData.push(keyArr[i])
        }

      })
    } else {
      this.showToast('账号未登录，请登录后再试', 'MsgList-imap')
      router.back()
    }
  }

  build() {
    Column() {
      Flex({ justifyContent: FlexAlign.Start, direction: FlexDirection.Row, alignItems: ItemAlign.Center }) {
        Button('删除文件夹')
          .margin(10)
          .width('80%')
          .height(50)
          .backgroundColor(Color.Blue)
          .fontColor(Color.White)
          .onClick(() => {
            this.deleteFolder()
          })

        Button('创建文件夹')
          .margin(10)
          .width('80%')
          .height(50)
          .backgroundColor(Color.Blue)
          .fontColor(Color.White)
          .onClick(() => {
            this.selectType = 'Create'
            if (this.dialogController) {
              this.dialogController.open()
            }
            this.createFolder()
          })
        Button('重命名文件夹')
          .margin(10)
          .width('80%')
          .height(50)
          .backgroundColor(Color.Blue)
          .fontColor(Color.White)
          .onClick(() => {
            if (!this.selectFolder || this.selectFolder.length < 1) {
              this.showToast('请先选择一个需要重命名的文件夹', 'renameFolder-imap')
              return;
            }
            this.selectType = 'Rename'
            if (this.dialogController) {
              this.dialogController.open()
            }
            this.renameFolder()
          })
      }
      .margin({ left: 15, top: 20 })

      Flex({ justifyContent: FlexAlign.Start, direction: FlexDirection.Row, alignItems: ItemAlign.Center }) {
        Button('订阅邮箱')
          .margin(10)
          .width('80%')
          .height(50)
          .backgroundColor(Color.Blue)
          .fontColor(Color.White)
          .onClick(() => {
            if (!this.selectFolder || this.selectFolder.length < 1) {
              this.showToast('请先选择一个需要重命名的文件夹', 'renameFolder-imap')
              return;
            }
            this.subBox()
          })

        Button('取消订阅邮箱')
          .margin(10)
          .width('80%')
          .height(50)
          .backgroundColor(Color.Blue)
          .fontColor(Color.White)
          .onClick(() => {
            if (!this.selectFolder || this.selectFolder.length < 1) {
              this.showToast('请先选择一个需要重命名的文件夹', 'renameFolder-imap')
              return;
            }
            this.unSubBox()
          })
        Button('获取所有订阅邮箱件')
          .margin(10)
          .width('80%')
          .height(50)
          .backgroundColor(Color.Blue)
          .fontColor(Color.White)
          .onClick(() => {
            this.getSubList()
          })
      }
      .margin({ left: 15, top: 20 })

      List({ space: 10, initialIndex: 0 }) {
        ForEach(this.listData, (item: string, index: number) => {
          ListItem() {
            Flex({ alignItems: ItemAlign.Start, justifyContent: FlexAlign.Start, direction: FlexDirection.Row }) {
              Toggle({ type: ToggleType.Checkbox, isOn: true })
                .size({ width: 30, height: 30 })
                .selectedColor('#007DFF')
                .visibility(this.selectFolder && this.selectFolder === item ? Visibility.Visible : Visibility.None)

              Image($r('app.media.fileDir'))
                .height(40)
                .width(40)
                .margin({ left: 10 })

              Text(item)
                .fontSize(20)
                .height(50)
                .margin({ left: 10 })
                .fontWeight(FontWeight.Bold)
            }
          }.onClick(() => {

          })
          .parallelGesture(TapGesture().onAction((event) => {
            this.showToast(`准备进入文件夹：${item}`, 'folder-click-imap')
            router.pushUrl({
              url: 'pages/MsgListPage',
              params: {
                folderName: item,
                folderList: this.listData
              }
            })
          }), GestureMask.Normal)
          .gesture(LongPressGesture().onAction((event) => {
            if (this.selectFolder) {
              this.selectFolder = null
            } else {
              this.selectFolder = item
            }
          }), GestureMask.Normal)

        }, (item: string, index: number) => item)
      }
      .width('100%')
      .listDirection(Axis.Vertical)
      .divider({ strokeWidth: 2, color: 0x888888 })
      .edgeEffect(EdgeEffect.None)
      .chainAnimation(false)
    }
    .height('100%')
  }

  deleteFolder() {
    const ctx = this;
    try {
      if (!ctx.selectFolder || ctx.selectFolder.length < 1) {
        ctx.showToast('请先选择一个需要删除的文件夹', 'renameFolder-imap')
        return
      }
      ctx.showToast('开始删除文件夹', 'deleteFolder-imap')
      if (GlobalObj?.getInstance()?.getClient()) {
        GlobalObj?.getInstance()?.getClient()?.delBox(ctx.selectFolder, (err:Error) => {
          if (err) {
            ctx.showToast('删除文件夹失败', 'deleteFolder-imap')
          } else {
            ctx.selectFolder = null;
            ctx.showToast('删除文件夹成功', 'deleteFolder-imap')
            ctx.refreshFolderList()
          }
        });
      } else {
        this.showToast('账号未登录，请登录后再试', 'MsgList-imap')
        router.back()
      }

    } catch (err) {
      ctx.showToast(`账号登录出错：${err.message}`, 'login-smtp')
    }
  }

  createFolder() {
    const ctx = this;
    try {
      if (!ctx.inputValue || ctx.inputValue.length < 1) {
        ctx.showToast('请先输入新的文件夹的名字', 'renameFolder-imap')
        return
      }
      ctx.showToast('开始创建文件夹', 'createFolder-imap')
      if (GlobalObj?.getInstance()?.getClient()) {
        GlobalObj?.getInstance()?.getClient()?.addBox(ctx.inputValue, (err:Error) => {
          if (err) {
            ctx.showToast(`创建文件夹失败,原因：${err.message}`, 'createFolder-imap')
          } else {
            ctx.inputValue = '';
            ctx.textValue = '';
            ctx.showToast('创建文件夹成功', 'createFolder-imap')
            ctx.refreshFolderList()
          }
        });
      } else {
        this.showToast('账号未登录，请登录后再试', 'createFolder-imap')
        router.back()
      }

    } catch (err) {
      ctx.showToast(`账号登录出错：${err.message}`, 'createFolder-smtp')
    }
  }

  renameFolder() {
    const ctx = this;
    try {
      if (!ctx.selectFolder || ctx.selectFolder.length < 1) {
        ctx.showToast('请先选择一个需要重命名的文件夹', 'renameFolder-imap')
        return
      }
      if (!ctx.inputValue || ctx.inputValue.length < 1) {
        ctx.showToast('请先输入新的文件夹的名字', 'renameFolder-imap')
        return
      }
      ctx.showToast('开始重命名文件夹', 'renameFolder-imap')
      if (GlobalObj?.getInstance()?.getClient()) {
        GlobalObj?.getInstance()?.getClient()?.renameBox(ctx.selectFolder, ctx.inputValue, (err:Error, result:Box) => {
          if (err) {
            ctx.showToast(`重命名文件夹失败,原因：${err.message}`, 'renameFolder-imap')
          } else {
            ctx.selectFolder = null;
            ctx.inputValue = '';
            ctx.textValue = '';
            ctx.showToast('重命名文件夹成功', 'renameFolder-imap')
            ctx.refreshFolderList()
          }
        });
      } else {
        this.showToast('账号未登录，请登录后再试', 'renameFolder-imap')
        router.back()
      }

    } catch (err) {
      ctx.showToast(`账号登录出错：${err.message}`, 'renameFolder-smtp')
    }
  }

  subBox() {
    const ctx = this;
    try {
      if (!ctx.selectFolder || ctx.selectFolder.length < 1) {
        ctx.showToast('请先选择邮箱', 'subBox-imap')
        return
      }
      ctx.showToast('订阅一个文件夹', 'subBox-imap')
      if (GlobalObj?.getInstance()?.getClient()) {
        GlobalObj?.getInstance()?.getClient()?.subscribeBox(this.selectFolder, (err:Error) => {
          if (err) {
            ctx.showToast(`订阅邮箱失败,原因：${err.message}`, 'subBox-imap')
          } else {
            ctx.inputValue = '';
            ctx.textValue = '';
            ctx.showToast('订阅邮箱成功', 'subBox-imap')
            // ctx.refreshFolderList()
          }
        });
      } else {
        this.showToast('账号未登录，请登录后再试', 'subBox-imap')
        router.back()
      }

    } catch (err) {
      ctx.showToast(`订阅邮箱出错：${err.message}`, 'subBox-smtp')
    }
  }

  unSubBox() {
    const ctx = this;
    try {
      if (!ctx.selectFolder || ctx.selectFolder.length < 1) {
        ctx.showToast('请先选择邮箱', 'unSubBox-imap')
        return
      }
      ctx.showToast('取消订阅邮箱', 'unSubBox-imap')
      if (GlobalObj?.getInstance()?.getClient()) {
        GlobalObj?.getInstance()?.getClient()?.unsubscribeBox(this.selectFolder, (err:Error) => {
          if (err) {
            ctx.showToast(`取消订阅邮箱失败,原因：${err.message}`, 'unSubBox-imap')
          } else {
            ctx.inputValue = '';
            ctx.textValue = '';
            ctx.showToast('取消订阅邮箱成功', 'unSubBox-imap')
            // ctx.refreshFolderList()
          }
        });
      } else {
        this.showToast('账号未登录，请登录后再试', 'unSubBox-imap')
        router.back()
      }

    } catch (err) {
      ctx.showToast(`取消订阅邮箱出错：${err.message}`, 'unSubBox-smtp')
    }
  }

  getSubList() {
    const ctx = this;
    try {
      ctx.showToast('开始回用户$HOME目录下所有的文件，但LSUB命令只显示那些使用SUBSCRIBE命令设置为活动邮箱的文件。两个参数：邮箱路径和邮箱名。', 'closeBox-imap')
      if (GlobalObj?.getInstance()?.getClient()) {
        GlobalObj?.getInstance()?.getClient()?.getSubscribedBoxes((err:Error, result:MailBoxes) => {
          if (err) {
            ctx.showToast(`获取所有活动邮箱的文件失败,原因：${err.message}`, 'expungeMail-imap')
          } else {
            ctx.showToast('获取所有活动邮箱的文件成功', 'expungeMail-imap')
            ctx.listData = [];
            let keyArr = Object.getOwnPropertyNames(result)
            for (let i = 0; i < keyArr.length; i++) {
              console.log(`zdy---getBoxes key--->${keyArr[i]}`);
              ctx.listData.push(keyArr[i])
            }
          }
        });
      } else {
        this.showToast('账号未登录，请登录后再试', 'expungeMail-imap')
        router.back()
      }

    } catch (err) {
      ctx.showToast(`获取所有活动邮箱的文件出错：${err.message}`, 'expungeMail-smtp')
    }
  }
}