/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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

import { StunServer, StunClient } from '@ohos/stun';
import prompt from '@system.prompt';

class Address {
  host: string = ''
  port: string = ''
}

class Defaults {
  primary: Address | ESObject
  secondary: Address | ESObject
}

@Entry
@Component
struct Index {
  @State serverMessage: string = "Tip: Click 'node-stun-server' to display the server log";
  @State clientMessage: string = "Tip: Click 'node-stun-client' to display the client log";
  stunServer: StunServer | ESObject = null;
  stunClient: StunClient | ESObject = null;
  clientAddress: string = ''
  serverInfo: Address = {
    host: '127.0.0.1',
    port: '3478'
  }
  newDefaults: Defaults = {
    primary: {
      host: '127.0.0.1',
      port: '3478'
    },
    secondary: {
      host: '127.0.0.2',
      port: '3479'
    }
  };

  private createServer() {
    let self = this;
    if (self.stunServer) {
      return;
    }
    self.serverMessage = "";
    prompt.showToast({ message: "node-stun-server", duration: 3000 });
    self.stunServer = new StunServer();
    self.stunServer.setServerMessageListener({ onMessageChanged(serverMessage: string) {
      self.serverMessage += serverMessage + "\n";
    } });
    self.stunServer.createServer(this.newDefaults);
  }

  private createClient() {
    let self = this;
     self.clientMessage = "";
     prompt.showToast({ message: "node-stun-client", duration: 3000 });
    if (this.clientAddress == '') {
      prompt.showToast({ message: "Please input client ip address", duration: 3000 });
      return
    }
     if (!self.stunClient) {
      self.stunClient = new StunClient();
      self.stunClient.setClientMessageListener({
        onMessageChanged(clientMessage: string) {
          self.clientMessage += clientMessage + "\n";
        }
      });
     }
     self.stunClient.createClient(this.clientAddress, this.serverInfo);
  }

  build() {
    Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center /*, justifyContent: FlexAlign.Center*/
    }) {
      Flex({ direction: FlexDirection.Column }) {
        Row() {
          TextInput({ placeholder: 'primary host', text: this.newDefaults.primary.host })
            .height(40)
            .placeholderFont({ size: 20, weight: 2 })
            .fontSize(20)
            .layoutWeight(1)
            .focusable(false)
            .onChange((value: string) => {
              this.newDefaults.primary.host = value;
            })
          TextInput({ placeholder: 'primary port', text: this.newDefaults.primary.port })
            .height(40)
            .placeholderFont({ size: 20, weight: 2 })
            .fontSize(20)
            .layoutWeight(1)
            .focusable(false)
            .onChange((value: string) => {
              this.newDefaults.primary.port = value;
            })
        }

        Line().backgroundColor(Color.Blue).height(1).width('100%')

        Row() {
          TextInput({ placeholder: 'secondary host', text: this.newDefaults.secondary.host })
            .height(40)
            .placeholderFont({ size: 20, weight: 2 })
            .fontSize(20)
            .layoutWeight(1)
            .focusable(false)
            .onChange((value: string) => {
              this.newDefaults.secondary.host = value;
            })
          TextInput({ placeholder: 'secondary port', text: this.newDefaults.secondary.port })
            .height(40)
            .placeholderFont({ size: 20, weight: 2 })
            .fontSize(20)
            .layoutWeight(1)
            .focusable(false)
            .onChange((value: string) => {
              this.newDefaults.secondary.port = value;
            })
        }

        Button('node-stun-server', { type: ButtonType.Normal })
          .size({ width: '100%', height: 100 })
          .fontSize(38)
          .fontColor('#FFFFFF')
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            this.createServer();
          })

        Scroll() {
          Text(this.serverMessage)
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
        }
        .scrollable(ScrollDirection.Vertical)
        .scrollBar(BarState.On)
        .scrollBarColor(Color.Gray)
        .scrollBarWidth(30)

      }.height('50%')

      Flex({ direction: FlexDirection.Column }) {

        Row() {
          TextInput({ placeholder: 'server host', text: this.serverInfo.host })
            .height(40)
            .placeholderFont({ size: 20, weight: 2 })
            .fontSize(20)
            .layoutWeight(1)
            .focusable(false)
            .onChange((value: string) => {
              this.serverInfo.host = value;
            })
          TextInput({ placeholder: 'server port', text: this.serverInfo.port })
            .height(40)
            .placeholderFont({ size: 20, weight: 2 })
            .fontSize(20)
            .layoutWeight(1)
            .focusable(false)
            .onChange((value: string) => {
              this.serverInfo.port = value;
            })
        }

        Line().backgroundColor(Color.Blue).height(1).width('100%')

        TextInput({ placeholder: 'Please input client ip address' })
          .height(50)
          .placeholderFont({ size: 20, weight: 2 })
          .fontSize(20)
          .onChange((value: string) => {
            this.clientAddress = value;
          })

        Button('node-stun-client', { type: ButtonType.Normal })
          .size({ width: '100%', height: 100 })
          .fontSize(40)
          .fontColor('#FFFFFF')
          .fontWeight(FontWeight.Bold)
          .height(100)
          .onClick(() => {
            this.createClient();
          })

          Scroll() {
            Text(this.clientMessage)
              .fontSize(20)
              .fontWeight(FontWeight.Bold)
          }
          .scrollable(ScrollDirection.Vertical)
          .scrollBar(BarState.On)
          .scrollBarColor(Color.Gray)
          .scrollBarWidth(30)
          .height('70%')
      }.height('50%')
    }
    .width('100%')
    .height('100%')
  }

  public aboutToAppear() {
  }
}