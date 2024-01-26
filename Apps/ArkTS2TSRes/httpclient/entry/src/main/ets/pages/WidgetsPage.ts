interface WidgetsPage_Params {
    status?: string;
    content?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "WidgetsPage_" + ++__generate__Id;
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
import { HttpClient, Request, Logger, TimeUnit, Response, HttpDataType } from '@ohos/httpclient';
import { BusinessError } from '@ohos.base';
class WidgetsPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__status = new ObservedPropertySimple('', this, "status");
        this.__content = new ObservedPropertySimple('', this, "content");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: WidgetsPage_Params) {
        if (params.status !== undefined) {
            this.status = params.status;
        }
        if (params.content !== undefined) {
            this.content = params.content;
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
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Button.createWithLabel('请求配置responseData');
        Button.fontSize(24);
        Button.fontWeight(FontWeight.Bold);
        Button.onClick(() => {
            this.getRequest();
        });
        Button.pop();
        Column.pop();
        Row.pop();
    }
    getRequest() {
        let client: HttpClient = new HttpClient.Builder()
            .setConnectTimeout(1000, TimeUnit.SECONDS)
            .setReadTimeout(1000, TimeUnit.SECONDS)
            .setWriteTimeout(1000, TimeUnit.SECONDS)
            .build();
        // 配置请求参数
        let request = new Request.Builder()
            .get('http://hshapp.ncn.com.cn/wisdom3/config/config.do')
            .addHeader('Content-Type', 'application/json')
            .setHttpDataType(HttpDataType.STRING)
            .build();
        Logger.info('WidgetsPage,onComplete -> start : ' + 'it start');
        // 发起请求
        client.newCall(request).enqueue((result: Response) => {
            if (result) {
                this.status = result.responseCode.toString();
            }
            if (result.result) {
                this.content = result.result;
            }
            else {
                this.content = JSON.stringify(result);
            }
            Logger.info('WidgetsPage,onComplete -> Status : ' + this.status);
            Logger.info('WidgetsPage,onComplete -> getRequest  httpDataType: ' + result.getRequest().httpDataType);
            Logger.info('WidgetsPage,onComplete -> getBody : ' + result.getBody());
        }, (error: BusinessError) => {
            this.status = error.code.toString();
            Logger.info('WidgetsPage,onError -> Error : ' + error.message);
        });
    }
}
loadDocument(new WidgetsPage("1", undefined, {}));
