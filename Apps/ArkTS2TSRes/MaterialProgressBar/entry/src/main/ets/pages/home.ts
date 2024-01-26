interface Home_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "home_" + ++__generate__Id;
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
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Text.create('Home Page');
        Text.fontSize(30);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Button.createWithLabel('Materialish Page');
        Button.margin({ top: 5, bottom: 5 });
        Button.onClick((event: ClickEvent) => {
            router.pushUrl({ url: 'pages/indexPage' });
        });
        Button.pop();
        Button.createWithLabel('DeterminateCircularProgressBar Page');
        Button.margin({ top: 5, bottom: 5 });
        Button.onClick((event: ClickEvent) => {
            router.pushUrl({ url: 'pages/DeterminateCircularSample' });
        });
        Button.pop();
        Button.createWithLabel('MaterialProgressBar Page');
        Button.margin({ top: 5, bottom: 5 });
        Button.onClick((event: ClickEvent) => {
            router.pushUrl({ url: 'pages/MaterialProgressBarSample' });
        });
        Button.pop();
        Button.createWithLabel('SmoothProgressBar Page');
        Button.margin({ top: 5, bottom: 5 });
        Button.onClick((event: ClickEvent) => {
            router.pushUrl({ url: 'pages/SmoothProgressBarSample' });
        });
        Button.pop();
        Flex.pop();
    }
}
loadDocument(new Home("1", undefined, {}));
