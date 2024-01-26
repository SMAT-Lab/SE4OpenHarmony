/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import webSocket from '@ohos.net.webSocket'
import Logger from '../model/Logger'
import TopBar from '../common/TopBar'
import ChatData from '../model/ChatData'
import ChatsPage from '../common/ChatsPage'
import SendMessage from '../common/SendMessage'
import BindServiceIP from '../common/BindServiceIp'
import { WebSocketSource } from '../model/DataSource'

const TAG: string = '[Chats]'
let socket: webSocket.WebSocket = webSocket.createWebSocket()

@CustomDialog
struct BindCustomDialog {
  @State ipAddress: string = ''
  private controller?: CustomDialogController
  onBind: (ipAddress: string) => void = (ipAddress: string) => {
  }

  build() {
    Column() {
      BindServiceIP({ ipAddress: $ipAddress, onBind: () => {
        this.onBind(this.ipAddress)
      } })
    }
    .width('100%')
    .margin({ bottom: 20 })
  }
}

@Entry
@Component
struct Chats {
  @State numberOfPeople: number = 1
  @State message: string = ''
  @State chats: WebSocketSource = new WebSocketSource([])
  @State isConnect: boolean = false
  @State ipAddress: string = ''
  controller: CustomDialogController = new CustomDialogController({
    builder: BindCustomDialog({ onBind: (ipAddress: string): void => this.onBind(ipAddress) }),
    autoCancel: false
  })

  aboutToAppear() {
    this.controller.open()
  }

  onBind(ipAddress: string) {
    this.ipAddress = ipAddress
    this.controller.close()
  }

  onConnect() {
    let promise = socket.connect(this.ipAddress)
    Logger.info(TAG, `ipAddress:${JSON.stringify(this.ipAddress)}`)
    promise.then(() => {
      Logger.info(TAG, `connect success`)
    }).catch((err: Error) => {
      Logger.info(TAG, `connect fail, error:${JSON.stringify(err)}`)
    })
    socket.on('open', () => {
      // 当收到on('open')事件时，可以通过send()方法与服务器进行通信
      promptAction.showToast({ message: '连接成功,可以聊天了！', duration: 1500 })
    })
    socket.on('message', (err: Error, value: Object) => {
      Logger.info(TAG, `on message, value = ${value}`)
      let receiveMessage = new ChatData(JSON.stringify(value), true)
      this.chats.pushData(receiveMessage)
    })
  }

  disConnect() {
    socket.off('open', (err, value) => {
      let val: Record<string, Object> = value as Record<string, Object>;
      Logger.info(TAG, `on open, status:${val['status']}, message:${val['message']}`);
    })
    socket.off('message')
    promptAction.showToast({ message: '连接已断开！', duration: 1500 })
    socket.close()
  }

  sendMessage() {
    let sendMessage = new ChatData(this.message, false)
    this.chats.pushData(sendMessage)
    let sendResult = socket.send(this.message)
    sendResult.then(() => {
      Logger.info(TAG, `[send]send success:${this.message}`)
    }).catch((err: Error) => {
      Logger.info(TAG, `[send]send fail, err:${JSON.stringify(err)}`)
    })
    this.message = ''
  }

  build() {
    Column() {
      Text($r('app.string.EntryAbility_label'))
        .height(50)
        .fontSize(25)
        .width('100%')
        .padding({ left: 10 })
        .fontColor(Color.White)
        .textAlign(TextAlign.Start)
        .backgroundColor('#0D9FFB')
        .fontWeight(FontWeight.Bold)
      TopBar({ isConnect: $isConnect, connect: () => {
        this.isConnect = !this.isConnect
        if (this.isConnect) {
          this.onConnect()
        } else {
          this.disConnect()
        }
      } })
      ChatsPage({ chats: $chats })
      SendMessage({ message: $message, sendMessage: () => {
        this.sendMessage()
      } })
    }
    .width('100%')
    .height('100%')
  }
}