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
import { Message, MessageAttachment, MessageHeaders } from '@ohos/emailjs'
import fs from '@ohos.file.fs';
import GlobalObj from '../GlobalObj'

const BASE_COUNT = 1

@Entry
@Component
struct SendMailPage {
  @State message: string = 'Hello World'
  @State from: string = ''
  @State accountName: string = 'OH邮件客户端'
  @State to: string = 'xxx@qq.com'
  @State cc: string = 'xxx@163.com'
  @State bcc: string = 'xxx@139.com'
  @State subject: string = '这是OH测试主题'
  @State content: string = '这是测试的鸿蒙邮件正文，邮件的收件人，抄送，密件抄送的格式为：someone <someone@your-email.com>, another <another@your-email.com>，多个账号以英文逗号,连接。'
  @State attachment: Array<MessageAttachment> = []
  @State mailType: string = '@qq.com'
  @State textValue: string = ''
  @State inputValue: string = 'click me'

  aboutToDisappear() {
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

  aboutToAppear() {
    let params = router.getParams()
    let temp = params as Record<string, Object>
    if (temp && temp['sendCount'] && typeof temp['sendCount'] === 'string') {
      this.from = temp['sendCount'];
    }
  }

  build() {
    Row() {
      Column() {
        Scroll() {
          Flex({
            alignItems: ItemAlign.Center,
            justifyContent: FlexAlign.Center,
            alignContent: FlexAlign.Center,
            direction: FlexDirection.Column
          }) {
            Text('添加信息，发送邮件')
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
              Text(`发件人(${this.from})昵称：`)
                .fontSize(20)
                .height(50)
                .textAlign(TextAlign.Center)
                .margin({ right: 5 })

              TextInput({ placeholder: '请输入发件人昵称', text: this.accountName })
                .layoutWeight(1)
                .fontSize(20)
                .height(50)
                .borderWidth(2)
                .textAlign(TextAlign.Start)
                .borderColor(Color.Gray)
                .type(InputType.Normal)
                .onChange((data) => {
                  this.accountName = data
                })
            }
            .height(100)
            .margin({ top: 10, right: 10 })

            Flex({
              alignItems: ItemAlign.Start,
              justifyContent: FlexAlign.Start,
              alignContent: FlexAlign.Start,
              direction: FlexDirection.Row
            }) {
              Text('收件人：')
                .fontSize(20)
                .height(50)
                .textAlign(TextAlign.Center)
                .margin({ right: 5 })

              TextInput({
                placeholder: '格式为：xx <xx@yxx.com>, xx <xx@yxx.com>，多个账号以英文逗号,连接。',
                text: this.to
              })
                .layoutWeight(1)
                .fontSize(20)
                .height(50)
                .borderWidth(2)
                .textAlign(TextAlign.Start)
                .borderColor(Color.Gray)
                .type(InputType.Normal)
                .onChange((data) => {
                  this.to = data
                })

            }.margin({ right: 10 })

            Flex({
              alignItems: ItemAlign.Start,
              justifyContent: FlexAlign.Start,
              alignContent: FlexAlign.Start,
              direction: FlexDirection.Row
            }) {
              Text('抄送：')
                .fontSize(20)
                .height(50)
                .textAlign(TextAlign.Center)
                .margin({ right: 5 })

              TextInput({
                placeholder: '格式为：xx <xx@yxx.com>, xx <xx@yxx.com>，多个账号以英文逗号,连接。',
                text: this.cc
              })
                .layoutWeight(1)
                .fontSize(20)
                .height(50)
                .borderWidth(2)
                .textAlign(TextAlign.Start)
                .borderColor(Color.Gray)
                .type(InputType.Normal)
                .onChange((data) => {
                  this.cc = data
                })
            }.margin({ top: 10, right: 10 })

            Flex({
              alignItems: ItemAlign.Start,
              justifyContent: FlexAlign.Start,
              alignContent: FlexAlign.Start,
              direction: FlexDirection.Row
            }) {
              Text('密件抄送抄送：')
                .fontSize(20)
                .height(50)
                .textAlign(TextAlign.Center)
                .margin({ right: 5 })

              TextInput({
                placeholder: '格式为：xx <xx@yxx.com>, xx <xx@yxx.com>，多个账号以英文逗号,连接。',
                text: this.bcc
              })
                .layoutWeight(1)
                .fontSize(20)
                .height(50)
                .borderWidth(2)
                .textAlign(TextAlign.Center)
                .borderColor(Color.Gray)
                .type(InputType.Normal)
                .onChange((data) => {
                  this.bcc = data
                })

            }.margin({ top: 10, right: 10 })


            Flex({
              alignItems: ItemAlign.Start,
              justifyContent: FlexAlign.Start,
              alignContent: FlexAlign.Start,
              direction: FlexDirection.Row
            }) {
              Text('主题：')
                .fontSize(20)
                .height(50)
                .textAlign(TextAlign.Center)
                .margin({ right: 5 })

              TextInput({ placeholder: '请输入邮件主题', text: this.subject })
                .layoutWeight(1)
                .fontSize(20)
                .height(50)
                .borderWidth(2)
                .textAlign(TextAlign.Start)
                .borderColor(Color.Gray)
                .type(InputType.Normal)
                .onChange((data) => {
                  this.subject = data
                })
            }
            .margin({ top: 10, right: 10 })

            Flex({
              alignItems: ItemAlign.Start,
              justifyContent: FlexAlign.Start,
              alignContent: FlexAlign.Start,
              direction: FlexDirection.Column
            }) {
              Text('正文：')
                .fontSize(20)
                .height(50)
                .textAlign(TextAlign.Center)
                .margin({ right: 5 })

              TextInput({
                placeholder: '请输入邮件正文',
                text: this.content
              })
                .layoutWeight(1)
                .fontSize(20)
                .height(100)
                .margin({ left: 5, right: 5 })
                .borderWidth(2)
                .textAlign(TextAlign.Start)
                .borderColor(Color.Gray)
                .type(InputType.Normal)
                .onChange((data) => {
                  this.content = data
                })
            }
            .height(160)
            .margin({ top: 10, right: 10 })

            Flex({
              alignItems: ItemAlign.Center,
              justifyContent: FlexAlign.Start,
              alignContent: FlexAlign.Start,
              direction: FlexDirection.Row
            }) {
              Button('添加附件')
                .fontSize(20)
                .height(50)
                .backgroundColor(Color.Blue)
                .margin({ right: 5 })
                .onClick((event) => {
                  this.createAttachment()
                })

              List({ space: 10, initialIndex: 0 }) {
                ForEach(this.attachment, (item: MessageAttachment, index: number) => {
                  ListItem() {
                    Flex({
                      alignItems: ItemAlign.Center,
                      justifyContent: FlexAlign.Center,
                      alignContent: FlexAlign.Center,
                      direction: FlexDirection.Row
                    }) {
                      if (item.type && item.type == 'txt') {
                        Image($r('app.media.txt'))
                          .width(40)
                          .height(40)
                          .margin({ left: 5, right: 5 })
                      } else if (item.type && this.isImage(item.type)) {
                        Image($r('app.media.image'))
                          .width(40)
                          .height(40)
                          .margin({ left: 5, right: 5 })
                      } else if (item.type && this.isDOC(item.type)) {
                        Image($r('app.media.word'))
                          .width(40)
                          .height(40)
                          .margin({ left: 5, right: 5 })
                      } else if (item.type && this.isExcel(item.type)) {
                        Image($r('app.media.excel'))
                          .width(40)
                          .height(40)
                          .margin({ left: 5, right: 5 })
                      } else {
                        Image($r('app.media.app_icon'))
                          .width(40)
                          .height(40)
                          .margin({ left: 5, right: 5 })
                      }

                      Flex({
                        alignItems: ItemAlign.Start,
                        justifyContent: FlexAlign.Center,
                        alignContent: FlexAlign.Start,
                        direction: FlexDirection.Column
                      }) {
                        Text(item.name)
                          .fontSize(14)
                          .textOverflow({ overflow: TextOverflow.Ellipsis })
                          .maxLines(1)
                          .width(100)
                          .padding({ left: 5, right: 5, top: 5 })
                          .maxLines(1)
                          .textAlign(TextAlign.Center)

                        Text(item.size + "字节")
                          .fontSize(14)
                          .width(100)
                          .textOverflow({ overflow: TextOverflow.Ellipsis })
                          .maxLines(1)
                          .padding({ left: 5, right: 5, top: 5, bottom: 5 })
                          .maxLines(1)
                          .textAlign(TextAlign.Center)
                      }
                    }
                  }
                  .borderWidth(2)
                  .borderColor(Color.Gray)
                }, (item: MessageAttachment, index: number) => item.name)
              }
              .edgeEffect(EdgeEffect.None)
              .chainAnimation(false)
              .layoutWeight(1)
              .height(100)
              .listDirection(Axis.Horizontal)
            }
            .margin({ top: 10 })


            Button('发送邮件')
              .margin(20)
              .width('80%')
              .height(50)
              .backgroundColor(Color.Blue)
              .fontColor(Color.White)
              .onClick(() => {
                this.sendMail()
              })
              .margin({ top: 10 })
          }
        }.width('100%')
        .height('100%')
      }
      .width('100%')
    }
    .height('100%')
  }

  async sendMail() {
    try {
      this.mailType = this.to.substring(this.to.lastIndexOf('@' + 1), this.to.lastIndexOf('.'))
      if (GlobalObj?.getInstance()?.getClient()) {
        if (GlobalObj?.getInstance()?.getClient()?.isLogin()) {
          GlobalObj?.getInstance()?.getClient()?.setQuitAfterSendDone(true) // 设置发送完毕之后客户端是否退出 源库逻辑默认退出
          let msg: Message | MessageHeaders = {
            text: this.content,
            from: `${this.accountName} <${this.from}>`,
            to: this.to,
            cc: this.cc,
            bcc: this.bcc,
            subject: this.subject,
            attachment: this.attachment
          }
          let startTime1 = new Date().getTime();
          const message = await GlobalObj?.getInstance()?.getClient()?.sendAsync(msg)
          let endTime1 = new Date().getTime();
          let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
          console.log("sendAsync averageTime : " + averageTime1 + "us")
          this.showToast('邮件发送成功', 'sendmail-smtp')
          if (GlobalObj?.getInstance()?.getClient()?.isQuitAfterSendDone()) {
            GlobalObj?.getInstance()?.getClient()?.close(true);
            GlobalObj?.getInstance()?.setClient(null);
          }
        } else {
          this.showToast('账号未登录，请需重新登录', 'sendmail-smtp')
        }

      } else {
        this.showToast('账号未登录，请需重新登录', 'sendmail-smtp')
      }

    } catch (err) {
      this.showToast(`邮件发送出错：${err.message}`, 'sendmail-smtp')
    }
  }

  createAttachment() {
    const ctx = this
    try {
      if (ctx.attachment && ctx.attachment.length == 0) {
        ctx.showToast('开始生成单个本地文件', 'createSingleFile')
        let context = GlobalObj?.getInstance()?.getContext() ? GlobalObj?.getInstance()?.getContext() : getContext()
        let randomNum = Math.round(Math.random() * 1024 + 1);
        let filePath = context?.cacheDir + '/' + 'attachment-' + randomNum + '.txt'
        let file = fs.openSync(filePath, fs.OpenMode.CREATE | fs.OpenMode.READ_WRITE)
        let str = "客户端发送到服务端的信息，请查收\r\n"
        fs.writeSync(file.fd, str)
        fs.fsyncSync(file.fd)
        fs.closeSync(file)
        let attach: MessageAttachment = {
          name: 'attachment-' + randomNum + '.txt',
          path: filePath,
          type: '.txt',
          size: str.length
        }
        this.attachment.push(attach)
        ctx.showToast('生成本地单个文件成功' + filePath, 'createSingleFile')
      } else if (ctx.attachment && ctx.attachment.length == 1) {
        ctx.showToast('开始生成单个本地文件', 'createSingleFile')
        let context: Context | null = GlobalObj?.getInstance()?.getContext() ? GlobalObj?.getInstance()?.getContext() : getContext()
        let filePath = context?.cacheDir + '/icon.png'
        context?.resourceManager?.getRawFileContent('icon.png')?.then((imageData) => {
          if (imageData) {
            let file = fs.openSync(filePath, fs.OpenMode.CREATE | fs.OpenMode.READ_WRITE)
            fs.writeSync(file.fd, imageData.buffer)
            fs.fsyncSync(file.fd)
            fs.closeSync(file)
            let attach: MessageAttachment = {
              name: 'icon.png',
              path: filePath,
              type: 'jpg',
              size: imageData.buffer.byteLength
            }
            this.attachment.push(attach)
          } else {
            ctx.showToast(`生成本地单个文件${'icon.png'}失败` + filePath, 'createSingleFile')
          }
        })?.catch((err: Error) => {
          ctx.showToast(`生成本地单个文件${'icon.png'}失败,原因是：${err.message}` + filePath, 'createSingleFile')
        })
        ctx.showToast('生成本地单个文件成功' + filePath, 'createSingleFile')
      } else if (ctx.attachment && ctx.attachment.length == 2) {
        ctx.showToast('开始生成单个本地文件', 'createSingleFile')
        let context: Context | null = GlobalObj?.getInstance()?.getContext() ? GlobalObj?.getInstance()?.getContext() : getContext()
        let filePath = context?.cacheDir + '/test.docx'
        context?.resourceManager?.getRawFileContent('test.docx')?.then((wordData) => {
          if (wordData) {
            let file = fs.openSync(filePath, fs.OpenMode.CREATE | fs.OpenMode.READ_WRITE)
            fs.writeSync(file.fd, wordData.buffer)
            fs.fsyncSync(file.fd)
            fs.closeSync(file)
            let attach: MessageAttachment = {
              name: 'test.docx',
              path: filePath,
              type: 'docx',
              size: wordData.buffer.byteLength
            }
            this.attachment.push(attach)
          } else {
            ctx.showToast(`生成本地单个文件${'test.docx'}失败` + filePath, 'createSingleFile')
          }
        })?.catch((err: Error) => {
          ctx.showToast(`生成本地单个文件${'test.docx'}失败,原因是：${err.message}` + filePath, 'createSingleFile')
        })
        ctx.showToast('生成本地单个文件成功' + filePath, 'createSingleFile')
      } else if (ctx.attachment && ctx.attachment.length == 3) {
        ctx.showToast('开始生成单个本地文件', 'createSingleFile')
        let context: Context | null = GlobalObj?.getInstance()?.getContext() ? GlobalObj?.getInstance()?.getContext() : getContext()
        if (!context) {
          return
        }
        let filePath = context.cacheDir + '/test.xlsx'
        context.resourceManager.getRawFileContent('test.xlsx').then((excelData) => {
          if (excelData) {
            let file = fs.openSync(filePath, fs.OpenMode.CREATE | fs.OpenMode.READ_WRITE)
            fs.writeSync(file.fd, excelData.buffer)
            fs.fsyncSync(file.fd)
            fs.closeSync(file)
            let attach: MessageAttachment = {
              name: 'test.xlsx',
              path: filePath,
              type: 'xlsx',
              size: excelData.buffer.byteLength
            }
            this.attachment.push(attach)
          } else {
            ctx.showToast(`生成本地单个文件${'test.xlsx'}失败` + filePath, 'createSingleFile')
          }
        }).catch((err: Error) => {
          ctx.showToast(`生成本地单个文件${'test.xlsx'}失败,原因是：${err.message}` + filePath, 'createSingleFile')
        })
        ctx.showToast('生成本地单个文件成功' + filePath, 'createSingleFile')
      } else {
        ctx.showToast('暂时只支持测试文本，图片，文档，表格，其他类型的文件等待测试开放', 'createSingleFile')

      }

    } catch (err) {
      ctx.showToast('生成本地单个文件失败:' + JSON.stringify(err), 'createSingleFile')
    }
  }

  isImage(type: string): boolean {
    if (!type || type.length < 1) {
      return false;
    }
    let imageTypeArr = ['webp', 'bmp', 'pcx', 'tif', 'jpeg', 'tga', 'exif',
      'fpx', 'svg', 'psd', 'cdr', 'pcd', 'dxf', 'ufo', 'eps', 'jpg',
      'ai', 'png', 'hdri', 'raw', 'wmf', 'flic', 'emf', 'ico']
    if (imageTypeArr.indexOf(type.toLowerCase()) != -1) {
      return true;
    } else {
      return false;
    }
  }

  isDOC(type: string): boolean {
    if (!type || type.length < 1) {
      return false;
    }
    let docTypeArr = ['doc', 'docx']
    if (docTypeArr.indexOf(type.toLowerCase()) != -1) {
      return true;
    } else {
      return false;
    }
  }

  isExcel(type: string): boolean {
    if (!type || type.length < 1) {
      return false;
    }
    let excelTypeArr = ['xlsx', 'xls', 'csv']
    if (excelTypeArr.indexOf(type.toLowerCase()) != -1) {
      return true;
    } else {
      return false;
    }
  }

  onBackPress() {
    GlobalObj?.getInstance()?.getContext()?.terminateSelf()
  }
}