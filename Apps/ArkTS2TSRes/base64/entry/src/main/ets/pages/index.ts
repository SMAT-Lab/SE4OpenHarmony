interface Index_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "index_" + ++__generate__Id;
}
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
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Text.create('input encode/decode');
        Text.fontSize('20fp');
        Text.width(200);
        Text.height(60);
        Text.textAlign(TextAlign.Center);
        Text.fontColor('#ffffff');
        Text.backgroundColor('#ff017fef');
        Text.margin({ top: 20 });
        Text.onClick(() => {
            router.pushUrl({ url: 'pages/EncodeTest' });
        });
        Text.pop();
        Text.create('encode/decode');
        Text.fontSize('20fp');
        Text.width(200);
        Text.height(60);
        Text.textAlign(TextAlign.Center);
        Text.fontColor('#ffffff');
        Text.backgroundColor('#ff017fef');
        Text.margin({ top: 20 });
        Text.onClick(() => {
            router.pushUrl({ url: 'pages/EncodeByteTest' });
        });
        Text.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
