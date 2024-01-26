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
import isWebp from 'is-webp';
import prompt from '@ohos.promptAction';
import { GlobalContext } from './globalThis';
let gloContext: Context = GlobalContext.getContext().getObject("context") as Context;
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
    loadWebp() {
        gloContext.resourceManager.getMedia($r("app.media.fixture_webp")
            .id).then((value: Uint8Array) => {
            let bool: boolean = isWebp(value);
            console.info("loadWebp isWebp:" + bool);
            prompt.showToast({
                message: '是否是webp格式：' + bool
            });
        }).catch((error: string) => {
            console.log("loadWebp getMedia promise " + error);
        });
    }
    loadPng() {
        gloContext.resourceManager.getMedia($r("app.media.fixture_png")
            .id).then((value: Uint8Array) => {
            let bool: boolean = isWebp(value);
            console.info("loadPng isWebp:" + bool);
            prompt.showToast({
                message: '是否是webp格式：' + bool
            });
        }).catch((error: string) => {
            console.log("loadPng getMedia promise " + error);
        });
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Button.createWithChild();
        Button.type(ButtonType.Capsule);
        Button.margin({
            top: 20
        });
        Button.backgroundColor('#0D9FFB');
        Button.onClick(() => {
            this.loadPng();
        });
        Text.create('load png');
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.padding({ left: 16, right: 16 });
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.type(ButtonType.Capsule);
        Button.margin({
            top: 20
        });
        Button.backgroundColor('#0D9FFB');
        Button.onClick(() => {
            this.loadWebp();
        });
        Text.create('loadWebp');
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.padding({ left: 16, right: 16 });
        Text.pop();
        Button.pop();
        Flex.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
