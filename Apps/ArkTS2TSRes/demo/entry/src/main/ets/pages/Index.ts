interface Index_Params {
    message?: string;
    message1?: string;
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
 * http://www.apache.org/licenses/LICENSE-2.0
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
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.__message1 = new ObservedPropertySimple('Hello World1', this, "message1");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.message1 !== undefined) {
            this.message1 = params.message1;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__message1.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __message1: ObservedPropertySimple<string>;
    get message1() {
        return this.__message1.get();
    }
    set message1(newValue: string) {
        this.__message1.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Row.width('100%');
        Column.create();
        Column.width('90%');
        Column.margin('5%');
        Button.createWithChild();
        Button.width('100%');
        Button.margin({ bottom: 40 });
        Button.height(60);
        Button.onClick(() => {
            router.pushUrl({ url: 'pages/AudioManager' });
        });
        Text.create("音频管理");
        Text.fontSize(30);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('100%');
        Button.margin({ bottom: 40 });
        Button.height(60);
        Button.onClick(() => {
            router.pushUrl({ url: 'pages/AudioCapturer' });
        });
        Text.create("音频录制");
        Text.fontSize(30);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('100%');
        Button.margin({ bottom: 40 });
        Button.height(60);
        Button.onClick(() => {
            router.pushUrl({ url: 'pages/AudioRenderer' });
        });
        Text.create("音频渲染");
        Text.fontSize(30);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('100%');
        Button.margin({ bottom: 40 });
        Button.height(60);
        Button.onClick(() => {
            router.pushUrl({ url: 'pages/DistributedAudio' });
        });
        Text.create("分布式音频");
        Text.fontSize(30);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('100%');
        Button.margin({ bottom: 40 });
        Button.height(60);
        Button.onClick(() => {
            router.pushUrl({ url: 'pages/TonePlayer' });
        });
        Text.create("DTMF播放器");
        Text.fontSize(30);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('100%');
        Button.margin({ bottom: 40 });
        Button.height(60);
        Button.onClick(() => {
            router.pushUrl({ url: 'pages/AudioFocus' });
        });
        Text.create("音频焦点");
        Text.fontSize(30);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('100%');
        Button.margin({ bottom: 10 });
        Button.height(60);
        Button.onClick(() => {
            router.pushUrl({ url: 'pages/AudioEnhance' });
        });
        Text.create("音频框架增强");
        Text.fontSize(30);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
