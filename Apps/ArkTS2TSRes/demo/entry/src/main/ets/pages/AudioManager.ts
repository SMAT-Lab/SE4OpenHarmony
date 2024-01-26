interface AudioManager_Params {
    audioManager?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "AudioManager_" + ++__generate__Id;
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
import audio from '@ohos.multimedia.audio';
class AudioManager extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.audioManager = null;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AudioManager_Params) {
        if (params.audioManager !== undefined) {
            this.audioManager = params.audioManager;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private audioManager;
    aboutToAppear() {
        this.audioManager = audio.getAudioManager();
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
        Text.create("音频管理");
        Text.fontColor(Color.White);
        Text.fontSize(28);
        Text.textAlign(TextAlign.Center);
        Text.width('100%');
        Text.pop();
        Row.pop();
        Column.create();
        Column.width('100%');
        Column.position({ x: 0, y: 70 });
        Column.height('100%');
        Button.createWithChild();
        Button.width('90%');
        Button.height(90);
        Button.margin({ bottom: 10, top: 10 });
        Button.onClick(() => {
            router.push({ url: 'pages/AudioVolumeManager' });
        });
        Text.create("音量管理     AudioVolumeManager");
        Text.fontSize(24);
        Text.fontColor(Color.White);
        Text.align(Alignment.Center);
        Text.lineHeight(40);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('90%');
        Button.height(90);
        Button.margin({ bottom: 10, top: 10 });
        Button.onClick(() => {
            router.push({ url: 'pages/AudioVolumeGroupManager' });
        });
        Text.create("音量组管理 AudioVolumeGroupManager");
        Text.fontSize(24);
        Text.fontColor(Color.White);
        Text.align(Alignment.Center);
        Text.lineHeight(40);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('90%');
        Button.height(90);
        Button.margin({ bottom: 10, top: 10 });
        Button.onClick(() => {
            router.push({ url: 'pages/AudioStreamManager' });
        });
        Text.create("音频流管理 AudioStreamManager");
        Text.fontSize(24);
        Text.fontColor(Color.White);
        Text.align(Alignment.Center);
        Text.lineHeight(40);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('90%');
        Button.height(90);
        Button.margin({ bottom: 10, top: 10 });
        Button.onClick(() => {
            router.push({ url: 'pages/AudioRoutingManager' });
        });
        Text.create("音频路由管理 AudioRoutingManager");
        Text.fontSize(24);
        Text.fontColor(Color.White);
        Text.align(Alignment.Center);
        Text.lineHeight(40);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('90%');
        Button.height(90);
        Button.margin({ bottom: 10, top: 10 });
        Button.onClick(() => {
            router.push({ url: 'pages/audio_manager/BasicDevice' });
        });
        Text.create("音频路由管理 AudioManager");
        Text.fontSize(24);
        Text.fontColor(Color.White);
        Text.align(Alignment.Center);
        Text.lineHeight(40);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('90%');
        Button.height(90);
        Button.margin({ bottom: 10, top: 10 });
        Button.onClick(() => {
            router.push({ url: 'pages/audio_manager/Settings' });
        });
        Text.create("设置-音频场景/参数 AudioManager");
        Text.fontSize(24);
        Text.fontColor(Color.White);
        Text.align(Alignment.Center);
        Text.lineHeight(40);
        Text.pop();
        Button.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new AudioManager("1", undefined, {}));
