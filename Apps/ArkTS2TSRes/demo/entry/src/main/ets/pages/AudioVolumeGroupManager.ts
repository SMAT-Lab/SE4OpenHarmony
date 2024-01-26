interface AudioVolumeGroupManager_Params {
    audioManager?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "AudioVolumeGroupManager_" + ++__generate__Id;
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
class AudioVolumeGroupManager extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.audioManager = null;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AudioVolumeGroupManager_Params) {
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
        Text.create("管理音频组音量");
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
        Row.create();
        Row.margin({ bottom: 40, top: 40 });
        Button.createWithChild();
        Button.height(80);
        Button.width(80);
        Button.margin({ right: 40 });
        Button.onClick(() => {
            router.push({ url: 'pages/volume_group_manager/Volume' });
        });
        Text.create("音量");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Button.createWithChild();
        Button.height(80);
        Button.width(80);
        Button.margin({ right: 40 });
        Button.onClick(() => {
            router.push({ url: 'pages/volume_group_manager/Ringer' });
        });
        Text.create("铃声");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.height(80);
        Button.width(80);
        Button.onClick(() => {
            router.push({ url: 'pages/volume_group_manager/Microphone' });
        });
        Text.create("麦克风");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new AudioVolumeGroupManager("1", undefined, {}));
