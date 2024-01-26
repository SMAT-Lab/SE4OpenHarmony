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
import Pop3Command, { Pop3LoginBean } from '@ohos/node-pop3'
import MsgBean from '../MsgBean'
import GlobalObj from '../GlobalObj'

const BASE_COUNT = 1

@Entry
@Component
struct AutoLoginCommandPage {
  @State message: string = 'Hello World'
  @State listData: Array<string> = []
  @State mailType: string = '@qq.com'
  @State client: Pop3Command | null = null
  @State selectMsgNum: number = -1
  @State isListShow: boolean = false
  @State msgList: Array<MsgBean> = []
  @State topLine: string = ''
  controller: TextInputController = new TextInputController()

  async aboutToDisappear() {
    if (this.client) {
      await this.client.QUIT()
    }
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
    let tempParam = params as Record<string, Object>
    if (tempParam && tempParam['loginOption'] && typeof tempParam['loginOption'] === 'object') {
      let option = tempParam['loginOption'] as Pop3LoginBean;
      this.client = new Pop3Command({
        user: option?.user,
        password: option?.password,
        host: option?.host,
        port: option?.port,
        tls: option?.tls,
        timeout: option?.timeout,
        tlsOptions: option?.tlsOptions,
        servername: option?.servername
      });
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
            direction: FlexDirection.Row
          }) {
            Flex({
              alignItems: ItemAlign.Start,
              justifyContent: FlexAlign.Start,
              alignContent: FlexAlign.Start,
              direction: FlexDirection.Column
            }) {
              Button('STAT命令')
                .margin(20)
                .height(50)
                .backgroundColor(Color.Blue)
                .fontColor(Color.White)
                .onClick(() => {
                  this.sendSTAT()
                })
                .margin({ top: 10 })
              // Button('LAST命令(pop3暂无该指令，原库运行结果同样报错)')
              //   .margin(20)
              //   .height(50)
              //   .backgroundColor(Color.Blue)
              //   .fontColor(Color.White)
              //   .onClick(() => {
              //     this.sendLAST()
              //   })
              //   .margin({ top: 10 })

              Button('NOOP命令')
                .margin(20)
                .height(50)
                .backgroundColor(Color.Blue)
                .fontColor(Color.White)
                .onClick(() => {
                  this.sendNOOP()
                })
                .margin({ top: 10 })

              Button('QUIT命令')
                .margin(20)
                .height(50)
                .backgroundColor(Color.Blue)
                .fontColor(Color.White)
                .onClick(() => {
                  this.sendQUIT()
                })
                .margin({ top: 10 })

              Button('LIST命令')
                .margin(20)
                .height(50)
                .backgroundColor(Color.Blue)
                .fontColor(Color.White)
                .onClick(() => {
                  this.sendLIST()
                })
                .margin({ top: 10 })

              TextInput({ text: this.topLine, placeholder: '输入TOP行数', controller: this.controller })
                .placeholderColor(Color.Grey)
                .placeholderFont({ size: 14, weight: 400 })
                .type(InputType.Number)
                .caretColor(Color.Blue)
                .width(600)
                .height(40)
                .margin(20)
                .fontSize(14)
                .fontColor(Color.Black)
                .onChange((value: string) => {
                  this.topLine = value
                })

              Button('TOP命令')
                .margin(20)
                .height(50)
                .enabled(this.msgList.length > 0)
                .visibility(this.msgList.length > 0 ? Visibility.Visible : Visibility.None)
                .backgroundColor(Color.Blue)
                .fontColor(Color.White)
                .onClick(() => {
                  this.sendTOP()
                })
                .margin({ top: 10 })
              Button('UIDL命令')
                .margin(20)
                .height(50)
                .enabled(this.msgList.length > 0)
                .visibility(this.msgList.length > 0 ? Visibility.Visible : Visibility.None)
                .backgroundColor(Color.Blue)
                .fontColor(Color.White)
                .onClick(() => {
                  this.sendUIDL()
                })
                .margin({ top: 10 })


              Button('DELE命令')
                .margin(20)
                .height(50)
                .enabled(this.msgList.length > 0)
                .visibility(this.msgList.length > 0 ? Visibility.Visible : Visibility.None)
                .backgroundColor(Color.Blue)
                .fontColor(Color.White)
                .onClick(() => {
                  this.sendDELE()
                })
                .margin({ top: 10 })

              Button('RSET命令')
                .margin(20)
                .height(50)
                .enabled(this.msgList.length > 0)
                .visibility(this.msgList.length > 0 ? Visibility.Visible : Visibility.None)
                .backgroundColor(Color.Blue)
                .fontColor(Color.White)
                .onClick(() => {
                  this.sendRSET()
                })
                .margin({ top: 10 })

              Button('RETR命令')
                .margin(20)
                .height(50)
                .enabled(this.msgList.length > 0)
                .visibility(this.msgList.length > 0 ? Visibility.Visible : Visibility.None)
                .backgroundColor(Color.Blue)
                .fontColor(Color.White)
                .onClick(() => {
                  this.sendRETR()
                })
                .margin({ top: 10 })


            }.layoutWeight(1).height('100%')


            List({ space: 10, initialIndex: 0 }) {
              ForEach(this.listData, (item: string, index: number) => {
                ListItem() {
                  Flex() {
                    Toggle({ type: ToggleType.Checkbox, isOn: true })
                      .size({ width: 30, height: 30 })
                      .selectedColor('#007DFF')
                      .visibility(this.selectMsgNum > -1 && this.msgList.length > 0 && index < this.msgList.length && this.selectMsgNum === this.msgList[index].getIndex() ? Visibility.Visible : Visibility.None)
                    Text(item)
                      .fontSize(14)
                      .padding(5)
                      .textAlign(TextAlign.Center)
                  }
                }
                .borderWidth(2)
                .borderColor(Color.Gray)
                .onClick(() => {
                  if (this.msgList.length === 0) {
                    this.showToast('仅LIST命令获取的数据可选择', 'list-item-click')
                    return
                  }
                  if (index < this.msgList.length) {
                    if (this.selectMsgNum === this.msgList[index].getIndex()) {
                      this.selectMsgNum = -1
                    } else {
                      this.selectMsgNum = this.msgList[index].getIndex()
                    }
                  }
                })
              }, (item: string, index: number) => item)
            }
            .multiSelectable(true)
            .edgeEffect(EdgeEffect.None)
            .chainAnimation(false)
            .layoutWeight(2)
            .height('100%')
            .listDirection(Axis.Vertical)

          }
        }.width('100%')
        .height('100%')
      }
      .width('100%')
    }
    .height('100%')
  }

  async sendSTAT() {
    const ctx = this
    ctx.isListShow = false
    ctx.msgList = []
    ctx.topLine = ''
    ctx.listData = []
    ctx.selectMsgNum = -1;
    try {
      if (ctx.client) {
        let startTime1 = new Date().getTime();
        let result = await ctx.client.STAT()
        let endTime1 = new Date().getTime();
        let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
        console.log("STAT averageTime : " + averageTime1 + "us")
        this.showToast('获取到STAT命令的结果', 'sendSTAT')
        if (result && result.toString() && result.toString().length > 0) {
          let arr = result.toString().split(' ')
          if (arr && arr.length >= 1) {
            let totalMailSize = Number.parseInt(arr[0]);
            if (totalMailSize > 0) {
              ctx.isListShow = true;
              ctx.listData.push(`获取到STAT命令的结果：${'\r\n'}${result}`)
              return
            }
          }
        }
        ctx.listData.push(`获取到STAT命令的结果：${'\r\n'}获取到的结果为空`)
      } else {
        ctx.listData.push(`账号未登录，请需重新登录`)
        this.showToast('账号未登录，请需重新登录', 'sendSTAT')
      }

    } catch (err) {
      ctx.listData.push(`获取STAT命令结果失败：${'\r\n'}${err.message}`)
      this.showToast(`获取STAT命令结果失败：${err.message}`, 'sendSTAT')
    }
  }

  async sendLIST() {
    const ctx = this
    ctx.msgList = [];
    ctx.topLine = ''
    ctx.listData = []
    ctx.selectMsgNum = -1;
    try {
      if (ctx.client) {
        let startTime1 = new Date().getTime();
        let result = await ctx.client.LIST()
        let endTime1 = new Date().getTime();
        let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
        console.log("LIST averageTime : " + averageTime1 + "us")
        this.showToast(`获取到LIST命令的结果：${result}`, 'sendLIST')
        if (result && result.toString() && result.toString().length > 0) {
          let arr = result.toString().split(',')
          if (arr && arr.length >= 2) {
            ctx.isListShow = true;
            for (let i = 0; i < arr.length; i += 2) {
              let index = Number.parseInt(arr[i]);
              let size = Number.parseInt(arr[i+1]);
              ctx.listData.push(`列表条目，序号：${index}，大小：${size}`)
              let bean = new MsgBean()
              bean.setIndex(index);
              bean.setSize(size);
              ctx.msgList.push(bean);
            }
            return
          }
        }
        ctx.listData.push(`获取到LIST命令的结果解析失败，${result}`)
      } else {
        ctx.listData.push(`账号未登录，请需重新登录`)
        this.showToast('账号未登录，请需重新登录', 'sendLIST')
      }

    } catch (err) {
      ctx.listData.push(`获取LIST命令结果失败：${'\r\n'}${err.message}`)
      this.showToast(`获取LIST命令结果失败：${err.message}`, 'sendLIST')
    }
  }

  async sendNOOP() {
    const ctx = this
    ctx.topLine = ''
    ctx.msgList = []
    ctx.listData = []
    ctx.selectMsgNum = -1;
    try {
      if (ctx.client) {
        let startTime1 = new Date().getTime();
        await ctx.client.NOOP()
        let endTime1 = new Date().getTime();
        let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
        console.log("NOOP averageTime : " + averageTime1 + "us")
        this.showToast('获取到NOOP命令的结果', 'sendNOOP')
        ctx.listData.push(`获取到NOOP命令的结果：成功`)
      } else {
        ctx.listData.push(`账号未登录，请需重新登录`)
        this.showToast('账号未登录，请需重新登录', 'sendNOOP')
      }

    } catch (err) {
      ctx.listData.push(`获取NOOP命令结果失败：${'\r\n'}${err.message}`)
      this.showToast(`获取NOOP命令结果失败：${err.message}`, 'sendNOOP')
    }
  }

  async sendTOP() {
    const ctx = this;
    ctx.listData = []
    try {
      if (ctx.selectMsgNum === -1) {
        ctx.showToast(`请先选择一个列表项目`, 'sendTOP')
        return
      }
      if (!ctx.topLine || ctx.topLine.length < 1 || Number.parseInt(ctx.topLine) < 1) {
        ctx.showToast(`请先输入Top行数`, 'sendTOP')
        return
      }
      if (ctx.client) {
        let startTime1 = new Date().getTime();
        let result = await ctx.client.TOP(ctx.selectMsgNum + '', Number.parseInt(ctx.topLine))
        let endTime1 = new Date().getTime();
        let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
        console.log("TOP averageTime : " + averageTime1 + "us")

        ctx.showToast('获取到TOP命令的结果', 'sendTOP')
        ctx.listData.push(`获取到TOP命令的结果：${'\r\n'}${result}`)
      } else {
        ctx.listData.push(`账号未登录，请需重新登录`)
        ctx.showToast('账号未登录，请需重新登录', 'sendTOP')
      }

    } catch (err) {
      ctx.listData.push(`获取TOP命令结果失败：${'\r\n'}${err.message}`)
      ctx.showToast(`获取TOP命令结果失败：${err.message}`, 'sendTOP')
    }
    ctx.selectMsgNum = -1;
  }

  async sendUIDL() {
    const ctx = this
    ctx.topLine = ''
    ctx.listData = []
    try {
      if (ctx.selectMsgNum === -1) {
        ctx.showToast(`请先选择一个列表项目`, 'sendUIDL')
        return
      }
      if (ctx.client) {
        let startTime1 = new Date().getTime();
        let result = await ctx.client.UIDL(ctx.selectMsgNum + '')
        let endTime1 = new Date().getTime();
        let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
        console.log("UIDL averageTime : " + averageTime1 + "us")

        ctx.showToast('获取到UIDL命令的结果', 'sendUIDL')
        ctx.listData.push(`获取到UIDL命令的结果：${'\r\n'}${result}`)
      } else {
        ctx.listData.push(`账号未登录，请需重新登录`)
        ctx.showToast('账号未登录，请需重新登录', 'sendUIDL')
      }

    } catch (err) {
      ctx.listData.push(`获取UIDL命令结果失败：${'\r\n'}${err.message}`)
      ctx.showToast(`获取UIDL命令结果失败：${err.message}`, 'sendUIDL')
    }
    ctx.selectMsgNum = -1;
  }

  async sendLAST() {
    const ctx = this
    ctx.topLine = ''
    ctx.msgList = []
    ctx.listData = []
    ctx.selectMsgNum = -1;
    try {
      if (ctx.client) {
        let startTime1 = new Date().getTime();
        let result = await ctx.client.LAST()
        let endTime1 = new Date().getTime();
        let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
        console.log("LAST averageTime : " + averageTime1 + "us")

        ctx.showToast('获取到LAST命令的结果', 'sendLAST')
        ctx.listData.push(`获取到LAST命令的结果：${'\r\n'}${result}`)
      } else {
        ctx.listData.push(`账号未登录，请需重新登录`)
        ctx.showToast('账号未登录，请需重新登录', 'sendLAST')
      }

    } catch (err) {
      ctx.listData.push(`获取LAST命令结果失败：${'\r\n'}${err.message}`)
      ctx.showToast(`获取LAST命令结果失败：${err.message}`, 'sendLAST')
    }
  }

  async sendDELE() {
    const ctx = this;
    ctx.topLine = ''
    ctx.listData = []
    try {
      if (ctx.selectMsgNum === -1) {
        ctx.showToast(`请先选择一个列表项目`, 'sendDELE')
        return
      }
      if (ctx.client) {
        let startTime1 = new Date().getTime();
        let result = await ctx.client.DELE(ctx.selectMsgNum + '')
        let endTime1 = new Date().getTime();
        let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
        console.log("DELE averageTime : " + averageTime1 + "us")
        ctx.showToast('获取到DELE命令的结果', 'sendDELE')
        ctx.listData.push(`获取到DELE命令的结果：${'\r\n'}${result}`)
      } else {
        ctx.listData.push(`账号未登录，请需重新登录`)
        ctx.showToast('账号未登录，请需重新登录', 'sendDELE')
      }

    } catch (err) {
      ctx.listData.push(`获取DELE命令结果失败：${'\r\n'}${err.message}`)
      ctx.showToast(`获取DELE命令结果失败：${err.message}`, 'sendDELE')
    }
    ctx.selectMsgNum = -1;
  }

  async sendRSET() {
    const ctx = this;
    ctx.topLine = ''
    ctx.listData = []
    try {
      if (ctx.selectMsgNum === -1) {
        ctx.showToast(`请先选择一个列表项目`, 'sendRSET')
        return
      }
      if (ctx.client) {
        //       let delResult = ctx.client.DELE(ctx.selectMsgNum + '')
        //       ctx.showToast('获取到RSETE命令的结果', 'sendRSET')
        //       ctx.listData.push(`发送DELE命令删除的结果：${'\r\n'}${delResult}`)
        let startTime1 = new Date().getTime();
        let result = await ctx.client.RSET() // 用于撤销DELE命令 所以不需要等DELE命令返回
        let endTime1 = new Date().getTime();
        let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
        console.log("RSET averageTime : " + averageTime1 + "us")
        ctx.showToast('获取到RSETE命令的结果', 'sendRSET')
        ctx.listData.push(`发送RSET命令取消删除操作的结果：${'\r\n'}${result}`)
      } else {
        ctx.listData.push(`账号未登录，请需重新登录`)
        ctx.showToast('账号未登录，请需重新登录', 'sendRSET')
      }

    } catch (err) {
      ctx.listData.push(`获取RSET命令结果失败：${'\r\n'}${err.message}`)
      ctx.showToast(`获取RSET命令结果失败：${err.message}`, 'sendRSET')
    }
    ctx.selectMsgNum = -1;
  }

  async sendRETR() {
    const ctx = this;
    ctx.topLine = ''
    ctx.listData = []
    try {
      if (ctx.selectMsgNum === -1) {
        ctx.showToast(`请先选择一个列表项目`, 'sendRETR')
        return
      }
      if (ctx.client) {
        let startTime1 = new Date().getTime();
        let result = await ctx.client.RETR(ctx.selectMsgNum + '')
        let endTime1 = new Date().getTime();
        let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
        console.log("RETR averageTime : " + averageTime1 + "us")
        ctx.showToast('获取到RETR命令的结果', 'sendRETR')
        ctx.listData.push(`获取到RETR命令的结果，结果长度为：${'\r\n'}${result.toString().length}${'\r\n'}}`)
        if (result.toString().length > 1000) {
          ctx.listData.push(`由于RETR命令的结果太长text无法完全显示，取最后1000字节显示：${'\r\n'}${result.toString()
            .substring(result.toString().length - 1000, result.toString().length)}`)
        } else {
          ctx.listData.push(`ETR命令的结果显示：${'\r\n'}${result.toString()}`)
        }

      } else {
        ctx.listData.push(`账号未登录，请需重新登录`)
        ctx.showToast('账号未登录，请需重新登录', 'sendRETR')
      }

    } catch (err) {
      ctx.listData.push(`获取RETR命令结果失败：${'\r\n'}${err.message}`)
      ctx.showToast(`获取RETR命令结果失败：${err.message}`, 'sendRETR')
    }
    ctx.selectMsgNum = -1;
  }

  async sendQUIT() {
    const ctx = this;
    ctx.topLine = ''
    ctx.msgList = []
    ctx.listData = []
    ctx.selectMsgNum = -1;
    try {

      if (ctx.client) {
        let startTime1 = new Date().getTime();
        const quitInfo = await ctx.client.QUIT();
        let endTime1 = new Date().getTime();
        let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
        console.log("QUIT averageTime : " + averageTime1 + "us")

        ctx.showToast('获取到QUIT命令的结果', 'sendQUIT')
        ctx.listData.push(`获取到QUIT命令的结果：${'\r\n'}${quitInfo}`)
        GlobalObj?.getInstance()?.getContext()?.terminateSelf()
      } else {
        ctx.listData.push(`账号未登录，请需重新登录`)
        ctx.showToast('账号未登录，请需重新登录', 'sendQUIT')
      }

    } catch (err) {
      ctx.listData.push(`获取RETR命令结果失败：${'\r\n'}${err.message}`)
      ctx.showToast(`获取RETR命令结果失败：${err.message}`, 'sendRETR')
    }
  }
}