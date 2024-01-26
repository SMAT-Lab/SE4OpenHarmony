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

import { BasicDataSource } from '../common/BasicDataSource';
// import { ServiceMessage, ClientMessage, UserCall } from './MessageInfo';
import prompt from '@ohos.promptAction';
import { client_socket } from '@ohos/socketio';
import router from '@ohos.router';

@Entry
@Component
struct Index {
  @State uri: string = "";
  @State username: string = "";
  @State message: string = "";
  @State connect_finish: boolean = false;
  @State login_finish: boolean = false;
  private chatDetailData = new ChatDetailData();
  private client: client_socket = new client_socket();
  private scroller: Scroller = new Scroller();

  on_open(): void {
    console.log("SOCKET_IO_INDEX on_open");
    this.connect_finish = true;
    prompt.showToast({ message: "连接服务器成功" });
  }

  on_fail(): void {
    console.log("SOCKET_IO_INDEX on_fail");
    prompt.showToast({ message: "连接服务器失败" });
  }

  on_reconnecting(): void {
    console.log("SOCKET_IO_INDEX on_reconnecting");
  }

  on_reconnect(): void {
    console.log("SOCKET_IO_INDEX on_reconnect");
  }

  on_close(reason: string): void {
    this.connect_finish = false;
    console.log("SOCKET_IO_INDEX on_close: " + reason);
  }

  on_socket_open(nsp: string): void {
    console.log("SOCKET_IO_INDEX on_socket_open: " + nsp);
  }

  on_socket_close(nsp: string): void {
    console.log("SOCKET_IO_INDEX on_socket_close: " + nsp);
  }

  on_login_listener(event_json: string): void {
    let loginCall: ESObject = JSON.parse(event_json);
    let notice = "Welcome to Socket.IO Chat,there " + (loginCall.numUsers != 1 ? " are " : "\'s ") + loginCall.numUsers + (loginCall.numUsers != 1 ? " participants" : " participant");
    let serviceMessage: ESObject = { message: notice, id: 0 };
    this.pushData(serviceMessage);
  }

  on_new_message_listener(event_json: string): void {
    console.log("SOCKET_IO_INDEX on_new_message_listener: " + event_json);
    let messageCall: ESObject = JSON.parse(event_json);
    let serviceMessage: ESObject = { username: messageCall.username, message: messageCall.message, id: 1 };
    this.pushData(serviceMessage);
  }

  on_user_joined_listener(event_json: string): void {
    console.log("SOCKET_IO_INDEX on_user_joined_listener: " + event_json);
    let userJoinCall: ESObject = JSON.parse(event_json);
    let notice = userJoinCall.username + " joined" + ",there" + (userJoinCall.numUsers != 1 ? " are " : "\'s ") + userJoinCall.numUsers + (userJoinCall.numUsers != 1 ? " participants" : " participant");
    let serviceMessage: ESObject = { message: notice, id: 0 };
    this.pushData(serviceMessage);
  }

  on_user_left_listener(event_json: string): void {
    console.log("SOCKET_IO_INDEX on_user_left_listener: " + event_json);
    let userLeftCall: ESObject = JSON.parse(event_json);
    let notice = userLeftCall.username + " left" + ",there" + (userLeftCall.numUsers != 1 ? "are " : "\'s ") + userLeftCall.numUsers + (userLeftCall.numUsers != 1 ? " participants" : " participant");
    let serviceMessage: ESObject = { message: notice, id: 0 };
    this.pushData(serviceMessage);
  }

  on_emit_callback(emit_callback_json: string): void {
    console.log("SOCKET_IO_INDEX on_emit_callback： " + emit_callback_json);
  }

  pushData(any: ESObject) {
    this.chatDetailData.pushData(any);
    // setTimeout(() => {
    //   this.chatDetailData.pushData(any);
    // }, 10);
  }

  //配置client
  initClient(uri: string) {
    console.log("SOCKET_IO_INDEX initClient");
    this.client.set_open_listener(()=> {
      this.on_open();
    });
    this.client.set_fail_listener(()=>{
      this.on_fail();
    });
    this.client.set_reconnecting_listener(()=>{
      this.on_reconnecting();
    });
    this.client.set_reconnect_listener(()=>{
      this.on_reconnect();
    });
    this.client.set_close_listener((reason: string)=>{
      this.on_close(reason);
    });
    this.client.set_socket_open_listener((nsp: string)=>{
      this.on_socket_open(nsp);
    });
    this.client.set_socket_close_listener((nsp: string)=>{
      this.on_socket_close(nsp);
    });
    this.client.connect(uri);
  }

  //配置socket
  initSocket() {
    console.log("SOCKET_IO_INDEX initSocket");
    this.client.on("new message", (event_json: string)=>{
      this.on_new_message_listener(event_json);
    });
    this.client.on("user joined", (event_json: string)=>{
      this.on_user_joined_listener(event_json);
    });
    this.client.on("user left", (event_json: string)=>{
      this.on_user_left_listener(event_json);
    });
    this.client.on("login", (event_json: string)=>{
      this.on_login_listener(event_json);
    });
  }

  //登录
  login(username: string) {
    console.log("SOCKET_IO_INDEX login");
    if (!this.connect_finish) {
      prompt.showToast({ message: "暂未连接服务器" });
      return;
    }
    this.client.emit("add user", username);
    this.login_finish = !this.login_finish;
  }

  //发送消息
  sendMessage(message: string) {
    console.log("SOCKET_IO_INDEX sendMessage");
    if (!this.connect_finish) {
      console.log("SOCKET_IO_INDEX 暂未连接服务器");
      return;
    }
    this.client.emit("new message", message, this.on_emit_callback);
  }

  //退出连接
  close() {
    console.log("SOCKET_IO_INDEX close");
    if (!this.connect_finish) {
      console.log("SOCKET_IO_INDEX 暂未连接服务器");
      return;
    }
    console.log("SOCKET_IO_INDEX close start 1");
    this.client.socket_close();
    console.log("SOCKET_IO_INDEX close start 2");
    this.client.close();
    console.log("SOCKET_IO_INDEX close stop");
  }

  build() {
    Row() {
      Column() {
        if (this.login_finish) {
          List({ scroller: this.scroller }) {
            LazyForEach(this.chatDetailData, (message: ESObject) => {
              ListItem() {
                ChatItemView({ message: message })
              }
            })
          }
          .listDirection(Axis.Vertical)
          .divider({ strokeWidth: 2, color: "#f3f3f3" })
          .height('80%')
          .width('100%')

          Row() {
            TextInput({ placeholder: "请输入消息,退出聊天室请输入exit", text: this.message })
              .width('80%')
              .onChange((message) => {
                this.message = message
              })
            Button('Send')
              .onClick(() => {
                if (this.message == "exit") {
                  this.close()
                  this.login_finish = false
                } else if (this.message == "") {
                  prompt.showToast({ message: "请输入消息" });
                } else {
                  this.sendMessage(this.message)
                  let clientMessage: ESObject = { username: this.username, message: this.message, id: 2 }
                  this.pushData(clientMessage)
                  this.message = ""
                }
              })
              .width('20%')
          }
          .height('10%')
          .width('100%')
        } else {
          TextInput({ placeholder: "请输入socket.io服务端地址", text: this.uri })
            .onChange((uri) => {
              this.uri = uri
            })
          Button('Connect')
            .margin(20)
            .onClick(() => {
              this.initClient(this.uri)
              this.initSocket()
            })
          TextInput({ placeholder: "请输入用户名" })
            .onChange((username) => {
              this.username = username
            })
          Button('Login')
            .margin(20)
            .onClick(() => {
              this.login(this.username)
            })

        }
      }
      .width('100%')
    }
    .height('100%')
  }
}

@Component
struct ChatItemView {
  private message: ESObject

  build() {
    Column() {
      if (this.message.id == 0) {
        Row() {
          Text(this.message.message)
        }
        .width("100%")
        .justifyContent(FlexAlign.Center)
        .margin({ top: 15 })
      }
      else if (this.message.id == 1) {
        // 聊天页面对方的消息
        Row() {
          Text(this.message.username + ":" + this.message.message)
        }
        .width("100%")
        .alignItems(VerticalAlign.Top)
        .margin({ top: 15 })
        .padding({ right: 50 })
      } else {
        // 聊天页面本人消息
        Row() {
          Text(this.message.username + ":" + this.message.message)
        }
        .alignItems(VerticalAlign.Top)
        .width("100%")
        .direction(Direction.Rtl)
        .padding({ left: 50 })
        .margin({ top: 15 })
      }
    }
  }
}


class ChatDetailData extends BasicDataSource {
  private msgList: Array<ESObject> = [];

  public totalCount(): number {
    return this.msgList.length;
  }

  public getData(index: number): number {
    return this.msgList[index];
  }

  public addData(index: number, data: ESObject): void {
    this.msgList.splice(index, 0, data);
    this.notifyDataAdd(index);
  }

  public pushData(data: ESObject): void {
    this.msgList.push(data);
    this.notifyDataAdd(this.msgList.length - 1);
  }
}