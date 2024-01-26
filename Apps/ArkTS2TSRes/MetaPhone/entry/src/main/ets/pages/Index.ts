interface Index_Params {
    message?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/**
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
import { metaphone } from 'metaphone';
import hilog from '@ohos.hilog';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create({ space: 10 });
        Column.width('100%');
        Text.create(this.message);
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Button.createWithLabel('获取发音代码:undefined');
        Button.width('80%');
        Button.height('100px');
        Button.onClick(() => {
            let result = metaphone(undefined);
            hilog.info(0x0000, 'metaPhone', '%{public}s', "result: " + result);
        });
        Button.pop();
        Button.createWithLabel('获取发音代码:null');
        Button.width('80%');
        Button.height('100px');
        Button.onClick(() => {
            let result = metaphone(null);
            hilog.info(0x0000, 'metaPhone', '%{public}s', "result: " + result);
        });
        Button.pop();
        Button.createWithLabel("获取发音代码：''");
        Button.width('80%');
        Button.height('100px');
        Button.onClick(() => {
            let result = metaphone('');
            hilog.info(0x0000, 'metaPhone', '%{public}s', "result: " + result);
        });
        Button.pop();
        Button.createWithLabel('获取发音代码：0 1 2');
        Button.width('80%');
        Button.height('100px');
        Button.onClick(() => {
            let result = metaphone('0 1 2');
            hilog.info(0x0000, 'metaPhone', '%{public}s', "result: " + result);
        });
        Button.pop();
        Button.createWithLabel('获取发音代码： f o ');
        Button.width('80%');
        Button.height('100px');
        Button.onClick(() => {
            let result = metaphone(' f o ');
            hilog.info(0x0000, 'metaPhone', '%{public}s', "result: " + result);
        });
        Button.pop();
        Button.createWithLabel('获取发音代码:0f1o2');
        Button.width('80%');
        Button.height('100px');
        Button.onClick(() => {
            let result = metaphone('0f1o2');
            hilog.info(0x0000, 'metaPhone', '%{public}s', "result: " + result);
        });
        Button.pop();
        Button.createWithLabel('获取发音代码:Agrippa');
        Button.width('80%');
        Button.height('100px');
        Button.onClick(() => {
            let result = metaphone('Agrippa');
            hilog.info(0x0000, 'metaPhone', '%{public}s', "result: " + result);
        });
        Button.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
