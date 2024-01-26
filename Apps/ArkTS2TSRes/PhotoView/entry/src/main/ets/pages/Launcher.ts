interface Launcher_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Launcher_" + ++__generate__Id;
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
class Launcher extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Launcher_Params) {
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
        Text.create('PhotoView Sample');
        Text.width('100%');
        Text.fontColor(0xffffff);
        Text.fontSize(20);
        Text.margin({ left: 10, top: 4 });
        Text.pop();
        Row.pop();
        Text.create('Simple Sample');
        Text.width('100%');
        Text.height(80);
        Text.fontColor(0xffffff);
        Text.fontSize(30);
        Text.textAlign(TextAlign.Center);
        Text.margin({ top: 10 });
        Text.onClick((event: ClickEvent) => {
            let path = 'pages/SimpleSample';
            console.log("jump:" + path);
            router.pushUrl({
                url: path,
            });
        });
        Text.pop();
        Text.create('ViewPager Sample');
        Text.width('100%');
        Text.height(80);
        Text.fontColor(0xffffff);
        Text.fontSize(30);
        Text.textAlign(TextAlign.Center);
        Text.onClick((event: ClickEvent) => {
            let path = 'pages/ViewPager';
            console.log("jump:" + path);
            router.pushUrl({
                url: path,
            });
        });
        Text.pop();
        Text.create('Rotation Sample');
        Text.width('100%');
        Text.height(80);
        Text.fontColor(0xffffff);
        Text.fontSize(30);
        Text.textAlign(TextAlign.Center);
        Text.onClick((event: ClickEvent) => {
            let path = 'pages/RotationSample';
            console.log("jump:" + path);
            router.pushUrl({
                url: path,
            });
        });
        Text.pop();
        Text.create('Picasso Sample');
        Text.width('100%');
        Text.height(80);
        Text.fontColor(0xffffff);
        Text.fontSize(30);
        Text.textAlign(TextAlign.Center);
        Text.onClick((event: ClickEvent) => {
            let path = 'pages/PicassoSample';
            console.log("jump:" + path);
            router.pushUrl({
                url: path,
            });
        });
        Text.pop();
        Text.create('Coil Sample');
        Text.width('100%');
        Text.height(80);
        Text.fontColor(0xffffff);
        Text.fontSize(30);
        Text.textAlign(TextAlign.Center);
        Text.onClick((event: ClickEvent) => {
            let path = 'pages/CoilSample';
            console.log("jump:" + path);
            router.pushUrl({
                url: path,
            });
        });
        Text.pop();
        Text.create('Activity Transition Sample');
        Text.width('100%');
        Text.height(80);
        Text.fontColor(0xffffff);
        Text.fontSize(30);
        Text.textAlign(TextAlign.Center);
        Text.onClick((event: ClickEvent) => {
            let path = 'pages/ActivityTransition';
            console.log("jump:" + path);
            router.pushUrl({
                url: path,
            });
        });
        Text.pop();
        Text.create('Immersive Sample');
        Text.width('100%');
        Text.height(80);
        Text.fontColor(0xffffff);
        Text.fontSize(30);
        Text.textAlign(TextAlign.Center);
        Text.onClick((event: ClickEvent) => {
            let path = 'pages/Immersive';
            console.log("jump:" + path);
            router.pushUrl({
                url: path,
            });
        });
        Text.pop();
        Flex.pop();
    }
}
loadDocument(new Launcher("1", undefined, {}));
