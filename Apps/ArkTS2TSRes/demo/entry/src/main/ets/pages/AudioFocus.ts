interface AudioFocus_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "AudioFocus_" + ++__generate__Id;
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
class AudioFocus extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AudioFocus_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Row.create();
        Row.height('100%');
        Row.width('100%');
        Row.create();
        Row.position({ x: 0, y: 0 });
        Row.width('100%');
        Row.height(60);
        Row.backgroundColor(Color.Orange);
        Text.create("音频焦点");
        Text.fontColor(Color.White);
        Text.fontSize(28);
        Text.textAlign(TextAlign.Center);
        Text.width('100%');
        Text.pop();
        Row.pop();
        Column.create();
        Column.width('90%');
        Column.margin('5%');
        Button.createWithChild();
        Button.width('100%');
        Button.margin({ bottom: 40 });
        Button.height(100);
        Button.onClick(() => {
            router.push({ url: 'pages/focus/RendererInterruptRenderer' });
        });
        Text.create("Renderer-Renderer");
        Text.fontSize(30);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('100%');
        Button.margin({ bottom: 40 });
        Button.height(100);
        Button.onClick(() => {
            router.push({ url: 'pages/focus/AvplayerInterruptAvplayer' });
        });
        Text.create("avplayer-avplayer");
        Text.fontSize(30);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('100%');
        Button.margin({ bottom: 40 });
        Button.height(100);
        Button.onClick(() => {
            router.push({ url: 'pages/focus/CapturerInterruptCapturer' });
        });
        Text.create("Capturer-Capturer");
        Text.fontSize(30);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('100%');
        Button.margin({ bottom: 40 });
        Button.height(100);
        Button.onClick(() => {
            router.push({ url: 'pages/focus/CapturerInterruptRenderer' });
        });
        Text.create("Capturer-Renderer");
        Text.fontSize(30);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new AudioFocus("1", undefined, {}));
