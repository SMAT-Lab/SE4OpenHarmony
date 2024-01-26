interface authenticator_custom_Params {
    status?: string;
    content?: string;
    count?: number;
    clientCustomCredentials?: HttpClient;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "authenticator_custom_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
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
import { Credentials, HttpClient, NetAuthenticator, Request, Response } from '@ohos/httpclient';
import prompt from '@system.prompt';
import Log from '../model/log';
import hilog from '@ohos.hilog';
import { BusinessError } from '@ohos/httpclient/src/main/ets/http';
const credentials: string = Credentials.basic("jesse", "password1");
class authenticator_custom extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__status = new ObservedPropertySimple('', this, "status");
        this.__content = new ObservedPropertySimple('', this, "content");
        this.count = 0;
        this.clientCustomCredentials = new HttpClient.Builder().setConnectTimeout(10000)
            .authenticator(this.getCredentials())
            .build();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: authenticator_custom_Params) {
        if (params.status !== undefined) {
            this.status = params.status;
        }
        if (params.content !== undefined) {
            this.content = params.content;
        }
        if (params.count !== undefined) {
            this.count = params.count;
        }
        if (params.clientCustomCredentials !== undefined) {
            this.clientCustomCredentials = params.clientCustomCredentials;
        }
    }
    aboutToBeDeleted() {
        this.__status.aboutToBeDeleted();
        this.__content.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __status: ObservedPropertySimple<string>;
    get status() {
        return this.__status.get();
    }
    set status(newValue: string) {
        this.__status.set(newValue);
    }
    private __content: ObservedPropertySimple<string>;
    get content() {
        return this.__content.get();
    }
    set content(newValue: string) {
        this.__content.set(newValue);
    }
    private count: number;
    private clientCustomCredentials: HttpClient;
    getCredentials(): NetAuthenticator {
        let auth: NetAuthenticator = new NetAuthenticator('jesse', 'password1');
        auth.setCredentials(Credentials.basic(auth.userName, auth.password));
        return auth;
    }
    authenticatorCustomCredentials() {
        prompt.showToast({ message: 'http:自定义加密' });
        this.clientServerCustomCredentials();
    }
    clientServerCustomCredentials() {
        let that = this;
        let request: Request = new Request.Builder()
            .get("https://publicobject.com/secrets/hellosecret.txt")
            .addHeader("Content-Type", "application/json")
            .build();
        this.clientCustomCredentials.newCall(request)
            .execute()
            .then((result: Response) => {
            if (result) {
                that.status += '请求状态：' + result.responseCode.toString() + '\n';
                that.status += '请求Header：\n' + result.header + '\n';
            }
            that.content += '请求结果：\n';
            if (result.result) {
                that.content = result.result;
            }
            else {
                that.content = JSON.stringify(result);
            }
        })
            .catch((error: BusinessError) => {
            if (error.code == 28) {
                this.clientServerCustomCredentials();
                return;
            }
            that.status = '请求状态：' + error.code.toString();
            if (error.message != undefined) {
                that.content = error.message;
            }
            hilog.info(0x0001, "onError -> Error", JSON.stringify(error));
        });
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.margin({
            top: 5,
            bottom: 100
        });
        Column.height('100%');
        Flex.create({
            direction: FlexDirection.Column
        });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Navigator.create({
            target: "",
            type: NavigationType.Back
        });
        Text.create('BACK');
        Text.fontSize(12);
        Text.border({
            width: 1
        });
        Text.padding(10);
        Text.fontColor(0x000000);
        Text.borderColor(0x317aff);
        Text.pop();
        Navigator.pop();
        Flex.pop();
        Flex.create({
            direction: FlexDirection.Column
        });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Button.createWithLabel('自定义加密身份认证');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            this.status = '自定义加密:' + credentials + '\n';
            this.status += '访问中..\n';
            this.content = '';
            this.authenticatorCustomCredentials();
        });
        Button.pop();
        Flex.pop();
        Text.create(this.status);
        Text.width('100%');
        Text.fontSize(18);
        Text.fontColor(Color.Black);
        Text.pop();
        Text.create(this.content);
        Text.width('100%');
        Text.layoutWeight(1);
        Text.fontSize(10);
        Text.fontColor(Color.Black);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Column.pop();
    }
}
loadDocument(new authenticator_custom("1", undefined, {}));
