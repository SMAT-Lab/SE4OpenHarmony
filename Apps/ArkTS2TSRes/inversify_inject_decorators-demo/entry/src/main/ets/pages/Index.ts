interface Index_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
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
        Button.createWithLabel("@lazyInject");
        Button.fontSize(30);
        Button.height(60);
        Button.width('100%');
        Button.fontColor(Color.White);
        Button.fontWeight(FontWeight.Bold);
        Button.onClick((event: ClickEvent) => {
            router.pushUrl({ url: "pages/LazyInjectPage" });
        });
        Button.pop();
        Button.createWithLabel("@lazyInjectNamed");
        Button.fontSize(30);
        Button.height(60);
        Button.width('100%');
        Button.margin(20);
        Button.fontColor(Color.White);
        Button.fontWeight(FontWeight.Bold);
        Button.onClick((event: ClickEvent) => {
            router.pushUrl({ url: "pages/LazyInjectNamedPage" });
        });
        Button.pop();
        Button.createWithLabel("@lazyInjectTagged");
        Button.fontSize(30);
        Button.height(60);
        Button.margin(20);
        Button.width('100%');
        Button.fontColor(Color.White);
        Button.fontWeight(FontWeight.Bold);
        Button.onClick((event: ClickEvent) => {
            router.pushUrl({ url: "pages/LazyInjectTaggedPage" });
        });
        Button.pop();
        Button.createWithLabel("@lazyMultiInject");
        Button.fontSize(30);
        Button.height(60);
        Button.margin(20);
        Button.width('100%');
        Button.fontColor(Color.White);
        Button.fontWeight(FontWeight.Bold);
        Button.onClick((event: ClickEvent) => {
            router.pushUrl({ url: "pages/LazyMultiInjectPage" });
        });
        Button.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
