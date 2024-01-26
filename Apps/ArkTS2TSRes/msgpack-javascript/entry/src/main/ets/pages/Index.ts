interface Index_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
import router from '@ohos.router';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Button.createWithLabel('简单编码解码');
        Button.onClick(() => {
            router.push({ url: 'pages/EncodeDecodePage' });
        });
        Button.pop();
        Button.createWithLabel('构造器编码解码');
        Button.margin({ top: 10 });
        Button.onClick(() => {
            router.push({ url: 'pages/EncodeDecodeConstructorPage' });
        });
        Button.pop();
        Button.createWithLabel('复杂Multi编码解码');
        Button.margin({ top: 10 });
        Button.onClick(() => {
            router.push({ url: 'pages/MultiDecodePage' });
        });
        Button.pop();
        Button.createWithLabel('特殊字符扩展编解码');
        Button.margin({ top: 10 });
        Button.onClick(() => {
            router.push({ url: 'pages/ExamPage' });
        });
        Button.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
