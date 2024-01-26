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

import { Index } from '../Index';
import { Logger } from '../lib/Logger';
import util from '@ohos.util';

export interface OnClientMessageListener {
  onMessageChanged(clientMessage: string): void;
}

export class StunClient {
  private onClientMessageListener: OnClientMessageListener | undefined = undefined;

  public setClientMessageListener(onClientMessageListener: OnClientMessageListener): void {
    this.onClientMessageListener = onClientMessageListener;
  }

  constructor() {
    let self = this;
    // Set log event handler
    Logger.getInstance().emitterOn({ eventId: Logger.clientEventId }, (log: ESObject) => {
      let clientMessage = util.printf('%s', log.data.message);
      console.log(clientMessage);
      if (self.onClientMessageListener) {
        self.onClientMessageListener.onMessageChanged(clientMessage);
      }
    });
  }

  createClient(address: string, serverInfo?: ESObject) {
    let serverHost: ESObject;
    let serverPort: number;
    if (serverInfo) {
      serverHost = serverInfo.host
      serverPort = Number(serverInfo.port)
    } else {
      serverHost = "127.0.0.1";
      serverPort = 3478;
    }
    let index: Index = new Index();
    let client = index.createClient(address);
    client.setServerAddress(serverHost, serverPort);
    client.start({}, (result: ESObject) => {
      let mapped = client.getMappedAddr();
      let CompleteInfo = [
        "Complete(" + result + "): ",
        (client.isNatted() ? "Natted" : "Open"),
        " NB=" + client.getNB(),
        " EF=" + client.getEF(),
        " (" + client.getNatType() + ")",
        " mapped=" + mapped.address + ":" + mapped.port,
        " rtt=" + client.getRtt()
      ].join('')
      Logger.getInstance().info(Logger.clientEventId, CompleteInfo);
      client.close(() => {
        Logger.getInstance().info(Logger.clientEventId, "All sockets closed.");
      });
    });
  }
}