interface MsgDetailPage_Params {
    message?: string;
    clickIndex?: number;
    util?: MsgDetailUtil;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MsgDetailPage_" + ++__generate__Id;
}
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
import promptAction from '@ohos.promptAction';
import Imap, { inspect } from '@ohos/node-imap';
import router from '@ohos.router';
import MsgDetailUtil from '../MsgDetailUtil';
import DetailCallback from '../bean/DetailCallback';
import { ImapMessageAttributes } from '../bean/ImapMessage';
import GlobalObj from '../GlobalObj';
class MsgDetailPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.__clickIndex = new ObservedPropertySimple(-1, this, "clickIndex");
        this.util = new MsgDetailUtil();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MsgDetailPage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.clickIndex !== undefined) {
            this.clickIndex = params.clickIndex;
        }
        if (params.util !== undefined) {
            this.util = params.util;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__clickIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __clickIndex: ObservedPropertySimple<number>;
    get clickIndex() {
        return this.__clickIndex.get();
    }
    set clickIndex(newValue: number) {
        this.__clickIndex.set(newValue);
    }
    private util: MsgDetailUtil;
    showToast(text: string, name = '测试') {
        console.log(`zdy---${name}--->${text}`);
        promptAction.showToast({
            message: text,
            duration: 2000,
            bottom: 50
        });
    }
    aboutToAppear() {
        const ctx = this;
        if (!GlobalObj?.getInstance()?.getClient()) {
            this.showToast('账号未登录，请登录后再试', 'MsgDetail-imap');
            router.back();
            return;
        }
        let tempParam = router.getParams() as Record<string, number>;
        if (tempParam && tempParam['clickIndex']) {
            ctx.clickIndex = tempParam['clickIndex'];
        }
        else {
            this.showToast('未获取到邮箱文件夹参数', 'MsgDetail-imap');
            router.back();
            return;
        }
        let prefix: string = '';
        let buffer: string = '';
        let callback: DetailCallback = {
            messageStartCallback: (seqno: number) => {
                console.log('Message #%d', seqno);
                prefix = '(#' + seqno + ') ';
            },
            bodyStartCallback: () => {
            },
            bodyDataCallback: (data: string) => {
                buffer += data;
            },
            bodyEndCallback: () => {
                try {
                    ctx.showToast(`获取整个邮件体成功：${'\r\n'}${buffer}`, 'MsgDetail-imap');
                    if (buffer.length > 65535) {
                        ctx.message = `获取整个邮件体成功,文本长度超过65535，text，取65535长度用于显示：${'\r\n'}${buffer.substring(0, 65535)}`;
                    }
                    else {
                        ctx.message = `获取整个邮件体成功：${'\r\n'}${buffer}`;
                    }
                }
                catch (err) {
                    throw err as Error;
                }
            },
            attributesCallback: (attrs: ImapMessageAttributes) => {
                // console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
            },
            messageEndCallback: () => {
                console.log(prefix + 'Finished');
            },
            fetchErrorCallback: (err: Error) => {
                console.log('Fetch error: ' + err);
            },
            fetchEndCallback: () => {
                console.log('Done fetching all messages!');
                GlobalObj?.getInstance()?.getClient()?.end();
            }
        };
        this.util?.getDetail(ctx.clickIndex, callback);
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Scroll.create();
        Text.create(this.message);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.textAlign(TextAlign.Start);
        Text.padding(20);
        Text.width('100%');
        Text.height(2256);
        Text.pop();
        Scroll.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new MsgDetailPage("1", undefined, {}));
