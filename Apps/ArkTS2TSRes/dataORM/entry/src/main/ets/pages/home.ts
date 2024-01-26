interface Home_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "home_" + ++__generate__Id;
}
/*
  * Copyright (c) 2022 Huawei Device Co., Ltd.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
    *
  * http://www.apache.org/licenses/LICENSE-2.0
    *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */
import router from '@ohos.router';
class Home extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Home_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create({ direction: FlexDirection.Column,
            alignItems: ItemAlign.Center,
            justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Button.createWithLabel('dataORM');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.onClick(() => {
            router.pushUrl({ url: 'pages/Index' });
        });
        Button.pop();
        Button.createWithLabel('upgrade');
        Button.fontSize(20);
        Button.margin({ top: 20 });
        Button.fontWeight(FontWeight.Bold);
        Button.onClick(() => {
            router.pushUrl({ url: 'pages/upgrade' });
        });
        Button.pop();
        Button.createWithLabel('annotation');
        Button.fontSize(20);
        Button.margin({ top: 20 });
        Button.fontWeight(FontWeight.Bold);
        Button.onClick(() => {
            router.pushUrl({ url: "pages/annotation" });
        });
        Button.pop();
        Button.createWithLabel('SavePage');
        Button.fontSize(20);
        Button.margin({ top: 20 });
        Button.fontWeight(FontWeight.Bold);
        Button.onClick(() => {
            router.pushUrl({ url: "pages/SavePage" });
        });
        Button.pop();
        Button.createWithLabel('复合主键');
        Button.fontSize(20);
        Button.margin({ top: 20 });
        Button.fontWeight(FontWeight.Bold);
        Button.onClick(() => {
            router.pushUrl({ url: "pages/CompositePrimaryKey" });
        });
        Button.pop();
        Button.createWithLabel('数据嵌套');
        Button.fontSize(20);
        Button.margin({ top: 20 });
        Button.fontWeight(FontWeight.Bold);
        Button.onClick(() => {
            router.pushUrl({ url: "pages/EmbedPage" });
        });
        Button.pop();
        Button.createWithLabel('Convert');
        Button.fontSize(20);
        Button.margin({ top: 20 });
        Button.fontWeight(FontWeight.Bold);
        Button.onClick(() => {
            router.pushUrl({ url: "pages/ConvertPage" });
        });
        Button.pop();
        Button.createWithLabel('批量插入更新');
        Button.fontSize(20);
        Button.margin({ top: 20 });
        Button.fontWeight(FontWeight.Bold);
        Button.onClick(() => {
            router.pushUrl({ url: "pages/InsertPage" });
        });
        Button.pop();
        Flex.pop();
    }
}
loadDocument(new Home("1", undefined, {}));
