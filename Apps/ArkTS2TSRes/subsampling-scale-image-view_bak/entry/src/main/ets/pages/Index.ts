interface Index_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
        Flex.create({ direction: FlexDirection.Column });
        Flex.backgroundColor(0x000000);
        Row.create({ space: 5 });
        Row.width('100%');
        Row.height(44);
        Row.backgroundColor(0x3d3d3d);
        Image.create($r('app.media.icon'));
        Image.width(30);
        Image.height(30);
        Image.margin({ top: 6, left: 10 });
        Text.create('Subsampling Scale Image View');
        Text.width('100%');
        Text.fontColor(0xffffff);
        Text.fontSize(20);
        Text.margin({ top: 4 });
        Text.pop();
        Row.pop();
        Text.create('Basic features');
        Text.width('100%');
        Text.height(70);
        Text.fontColor(0xffffff);
        Text.fontSize(30);
        Text.textAlign(TextAlign.Center);
        Text.margin({ top: 10 });
        Text.onClick((event?: ClickEvent) => {
            let path = 'pages/BasicFeatures';
            console.log("jump:" + path);
            router.pushUrl({
                url: path,
            });
        });
        Text.pop();
        Text.create('Image display');
        Text.width('100%');
        Text.height(70);
        Text.fontColor(0xffffff);
        Text.fontSize(30);
        Text.textAlign(TextAlign.Center);
        Text.onClick((event?: ClickEvent) => {
            let path = 'pages/ImageDisplay';
            console.log("jump:" + path);
            router.pushUrl({
                url: path,
            });
        });
        Text.pop();
        Text.create('Event handling');
        Text.width('100%');
        Text.height(70);
        Text.fontColor(0xffffff);
        Text.fontSize(30);
        Text.textAlign(TextAlign.Center);
        Text.onClick((event?: ClickEvent) => {
            let path = 'pages/EventHandling';
            console.log("jump:" + path);
            router.pushUrl({
                url: path,
            });
        });
        Text.pop();
        Text.create('Advanced event handling');
        Text.width('100%');
        Text.height(70);
        Text.fontColor(0xffffff);
        Text.fontSize(30);
        Text.textAlign(TextAlign.Center);
        Text.onClick((event?: ClickEvent) => {
            let path = 'pages/AdvancedEventHandling';
            console.log("jump:" + path);
            router.pushUrl({
                url: path,
            });
        });
        Text.pop();
        Text.create('View pager galleries');
        Text.width('100%');
        Text.height(70);
        Text.fontColor(0xffffff);
        Text.fontSize(30);
        Text.textAlign(TextAlign.Center);
        Text.onClick((event?: ClickEvent) => {
            let path = 'pages/ViewPager';
            console.log("jump:" + path);
            router.pushUrl({
                url: path,
            });
        });
        Text.pop();
        Text.create('Configuration');
        Text.width('100%');
        Text.height(70);
        Text.fontColor(0xffffff);
        Text.fontSize(30);
        Text.textAlign(TextAlign.Center);
        Text.onClick((event?: ClickEvent) => {
            let path = 'pages/Configuration';
            console.log("jump:" + path);
            router.pushUrl({
                url: path,
            });
        });
        Text.pop();
        Text.create('OtherApi');
        Text.width('100%');
        Text.height(60);
        Text.fontColor(0xffffff);
        Text.fontSize(30);
        Text.textAlign(TextAlign.Center);
        Text.onClick((event?: ClickEvent) => {
            let path = 'pages/OtherApi';
            console.log("jump:" + path);
            router.push({
                url: path,
            });
        });
        Text.pop();
        Flex.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
