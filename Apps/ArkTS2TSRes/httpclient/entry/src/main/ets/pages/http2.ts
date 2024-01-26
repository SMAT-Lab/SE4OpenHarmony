interface http2_Params {
    status?: string;
    content?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "http2_" + ++__generate__Id;
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
import { HttpClient, Request, Response, TimeUnit } from '@ohos/httpclient';
import Log from '../model/log';
import hilog from '@ohos.hilog';
import http from '@ohos.net.http';
import { BusinessError } from '@ohos/httpclient/src/main/ets/http';
class http2 extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__status = new ObservedPropertySimple('000', this, "status");
        this.__content = new ObservedPropertySimple('init', this, "content");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: http2_Params) {
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
    requestHttp2() {
        let client: HttpClient = new HttpClient.Builder()
            .setConnectTimeout(1000, TimeUnit.SECONDS)
            .setReadTimeout(1000, TimeUnit.SECONDS)
            .setWriteTimeout(1000, TimeUnit.SECONDS)
            .build();
        let request: Request = new Request.Builder()
            .get("https://postman-echo.com/get?param1=value1&param2=value2")
            .setProtocol(http.HttpProtocol.HTTP2)
            .build();
        client.newCall(request).execute().then((result: Response) => {
            if (result) {
                this.status = result.responseCode.toString();
            }
            if (result.result) {
                this.content = result.result;
            }
            else {
                this.content = JSON.stringify(result);
            }
        }).catch((error: BusinessError<string>) => {
            this.status = error.code.toString();
            if (error.message != undefined) {
                this.content = error.message;
            }
            hilog.info(0x0001, "onError -> Error", JSON.stringify(error));
        });
    }
    render() {
        Column.create();
        Column.justifyContent(FlexAlign.Start);
        Column.width('100%');
        Column.height('100%');
        Button.createWithLabel('http2 request');
        Button.width('50%');
        Button.height(60);
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(20);
        Button.onClick(() => {
            this.requestHttp2();
        });
        Button.pop();
        Text.create('状态码：' + this.status);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create('响应数据：' + this.content);
        Text.fontSize(20);
        Text.pop();
        Column.pop();
    }
}
loadDocument(new http2("1", undefined, {}));
