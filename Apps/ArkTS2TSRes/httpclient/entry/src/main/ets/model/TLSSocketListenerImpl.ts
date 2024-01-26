let __generate__Id: number = 0;
function generateId(): string {
    return "TLSSocketListenerImpl_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { TLSSocketListener, Utils } from '@ohos/httpclient';
import hilog from '@ohos.hilog';
import buffer from '@ohos.buffer';
import promptAction from '@ohos.promptAction';
import { BindResult, CertVerifyResult, ConnectResult, ErrorMsg, MsgResult, OnMsgData } from './CertVerfiyDataStrcure';
import { BusinessError } from '@ohos.base';
export class TLSSocketListenerImpl extends TLSSocketListener {
    public onBindData: BindResult = { code: -1, value: "no bind" };
    public onConnectData: ConnectResult = { code: -1, value: "not connected" };
    public onMessageData: MsgResult = { code: -1, value: "" };
    public onMsgObj: OnMsgData = { message: [], remoteInfo: { address: "", family: "", port: 0, size: 0 } };
    public content: string = "";
    public onVerifyData: CertVerifyResult = { code: -1, verificationResult: "Certificate verification failed" };
    public onVerifyDataResult: CertVerifyResult[] = [];
    public errorMsg: ErrorMsg = { code: 0, errorMsg: "" };
    private TAG: string = "TLSSocketListenerImpl";
    onBind(err: BusinessError, data: string): void {
        if (!!!err) {
            this.onBindData = { code: 0, value: "bind success, Connecting to server 。。。。" }; //
        }
        else {
            this.onBindData = { code: err.code, value: err.message };
            hilog.error(0x0000, this.TAG, '%{public}s', ' onBind() error info  : ' + JSON.stringify(err));
        }
    }
    onMessage(err: BusinessError, data: OnMsgData): void {
        if (!!!err) {
            let bufferContent = buffer.from(data.message);
            let unitString: ArrayBuffer = JSON.parse(JSON.stringify(bufferContent)).data;
            let resultData: string = Utils.Utf8ArrayToStr(unitString);
            this.onMessageData = { code: 0, value: resultData };
            this.onMsgObj = data;
        }
        else {
            hilog.error(0x0000, this.TAG, '%{public}s', '  onMessage() info :  ' + err);
            this.onMessageData = { code: err.code, value: err.message };
        }
    }
    onConnect(err: BusinessError, data: string) {
        if (!!!err) {
            if (data !== undefined && data !== null) {
                this.onConnectData = { code: 0, value: data };
            }
            else {
                this.onConnectData = { code: 0, value: "Successfully connected" };
            }
            hilog.info(0x0000, this.TAG, '%{public}s', 'onConnect data info : ' + JSON.stringify(this.onConnectData));
        }
        else {
            this.onConnectData = { code: err.code, value: err.message };
            hilog.info(0x0000, this.TAG, '%{public}s', 'onConnect error info : ' + JSON.stringify(err));
            promptAction.showToast({
                message: "Unexpected disconnection，error msg is :+\n\n" + JSON.stringify(err),
                duration: 3000
            });
        }
    }
    onSend(err: BusinessError, data: string) {
        if (!!!err) {
            this.content += '\ntlsSoket:onSend:data:发送成功';
            promptAction.showToast({
                message: "消息发送成功",
                duration: 1000
            });
        }
        else {
            this.content += '\ntlsSoket:onSend:err:' + JSON.stringify(err);
        }
    }
    onClose(err: BusinessError, data: string) {
        if (!!!err) {
            this.content += '\ntlsSoket:onClose:data:' + data;
        }
        else {
            this.content += '\ntlsSoket:onClose:err:' + JSON.stringify(err);
        }
    }
    onError(err: BusinessError, data: string) {
        if (!!!err) {
            this.content = "";
            this.content += '\ntlsSoket:onError:data:' + data;
        }
        else {
            this.content = "";
            this.content += '\ntlsSoket:onError:err:' + JSON.stringify(err);
            this.errorMsg = { code: err.code, errorMsg: err.message };
            promptAction.showToast({
                message: "Unexpected disconnection，error msg is :+\n\n" + JSON.stringify(err),
                duration: 3000
            });
            if (err['errorNumber'] = -1 || JSON.stringify(err).includes('951')) {
                this.content = "";
                this.content += '\ntlsSoket:onError:err:连接不上服务器，请确认服务器是否可用，确认客户端是否联网';
                this.errorMsg = { code: -1, errorMsg: "连接不上服务器，请确认服务器是否可用，确认客户端是否联网" };
            }
        }
    }
    onVerify(verifyName: string, error: string, data: string) {
        let onVerifyData: CertVerifyResult = { code: -1, verificationResult: "Certificate verification failed" };
        if (!!!error) {
            onVerifyData = { code: 0, name: verifyName, verificationData: data, verificationResult: "校验通过" };
        }
        else {
            onVerifyData = { code: -1, verificationResult: error };
        }
        this.onVerifyDataResult.push(onVerifyData);
    }
    setExtraOptions(err: BusinessError, data: string) {
        if (!!!err) {
            this.content += '\ntlsSoket:setExtraOptions:data:设置成功';
        }
        else {
            this.content += '\ntlsSoket:setExtraOptions:err:' + JSON.stringify(err);
        }
    }
    offConnect(err: BusinessError, data: string) {
        if (!!!err) {
            this.content += '\ntlsSoket:offConnect:data:' + data;
        }
        else {
            this.content += '\ntlsSoket:offConnect:err:' + JSON.stringify(err);
        }
    }
    offClose(err: BusinessError, data: string) {
        if (!!!err) {
            this.content += '\ntlsSoket:offClose:data:' + data;
        }
        else {
            this.content += '\ntlsSoket:offClose:err:' + JSON.stringify(err);
        }
    }
    offMessage(err: BusinessError, data: string) {
        if (!!!err) {
            this.content += '\ntlsSoket:offMessage:data:' + data;
        }
        else {
            this.content += '\ntlsSoket:offMessage:err:' + JSON.stringify(err);
        }
    }
    offError(err: BusinessError, data: string) {
        if (!!!err) {
            this.content += '\ntlsSoket:offError:data:' + data;
        }
        else {
            this.content += '\ntlsSoket:offError:err:' + JSON.stringify(err);
        }
    }
}
