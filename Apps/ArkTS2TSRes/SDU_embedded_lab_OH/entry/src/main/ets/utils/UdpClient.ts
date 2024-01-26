let __generate__Id: number = 0;
function generateId(): string {
    return "UdpClient_" + ++__generate__Id;
}
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
import socket from '@ohos.net.socket';
import prompt from '@system.prompt';
const TAG = '[UdpDemo.UdpClient]';
export default class UdpClient {
    private localIp: string = '';
    private oppositeIp: string = '';
    private udp: any = null;
    constructor(localIp: string, oppositeIp: string) {
        this.localIp = localIp;
        this.oppositeIp = oppositeIp;
        this.udp = socket.constructUDPSocketInstance();
    }
    bindUdp(localPort: number) {
        let promise = this.udp.bind({
            address: this.localIp, port: localPort, family: 1
        });
        promise.then(() => {
            prompt.showToast({
                message: `${TAG} udp bind success`
            });
        }).catch(err => {
            prompt.showToast({
                message: `${TAG} udp bind failed:${JSON.stringify(err)}`
            });
        });
    }
    sendMsg(msg: string, targetPort: number) {
        let promise = this.udp.send({
            data: msg,
            address: {
                address: this.oppositeIp,
                port: targetPort,
                family: 1
            }
        });
        promise.then(() => {
            prompt.showToast({
                message: `${TAG} udp send success:${msg}`
            });
        }).catch(err => {
            prompt.showToast({
                message: `${TAG} udp send fail:${JSON.stringify(err)}`
            });
        });
    }
    onMessage(callback) {
        this.udp.on('message', (value) => {
            let dataView = new DataView(value.message);
            if (dataView.byteLength !== value.remoteInfo.size) {
                prompt.showToast({
                    message: `${TAG} udp error occurred: Inconsistent length`
                });
                return;
            }
            callback(dataView);
        });
    }
    closeUdp() {
        let promise = this.udp.close();
        promise.then(() => {
            prompt.showToast({
                message: `${TAG} udp close success`
            });
        }).catch(err => {
            prompt.showToast({
                message: `${TAG} udp close fail:${JSON.stringify(err)}`
            });
        });
    }
}
