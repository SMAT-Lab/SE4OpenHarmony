interface AudioVolumeManager_Params {
    returnMsg?: string;
    audioVolumeManager?;
    isOnClickedState?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "AudioVolumeManager_" + ++__generate__Id;
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
class AudioVolumeManager extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__returnMsg = new ObservedPropertySimple('Hello World', this, "returnMsg");
        this.audioVolumeManager = null;
        this.__isOnClickedState = new ObservedPropertySimple("unclicked", this, "isOnClickedState");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AudioVolumeManager_Params) {
        if (params.returnMsg !== undefined) {
            this.returnMsg = params.returnMsg;
        }
        if (params.audioVolumeManager !== undefined) {
            this.audioVolumeManager = params.audioVolumeManager;
        }
        if (params.isOnClickedState !== undefined) {
            this.isOnClickedState = params.isOnClickedState;
        }
    }
    aboutToBeDeleted() {
        this.__returnMsg.aboutToBeDeleted();
        this.__isOnClickedState.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __returnMsg: ObservedPropertySimple<string>;
    get returnMsg() {
        return this.__returnMsg.get();
    }
    set returnMsg(newValue: string) {
        this.__returnMsg.set(newValue);
    }
    private audioVolumeManager;
    private __isOnClickedState: ObservedPropertySimple<string>;
    get isOnClickedState() {
        return this.__isOnClickedState.get();
    }
    set isOnClickedState(newValue: string) {
        this.__isOnClickedState.set(newValue);
    }
    aboutToAppear() {
        let audioManager = audio.getAudioManager();
        this.audioVolumeManager = audioManager.getVolumeManager();
    }
    render() {
        Column.create();
        Column.height('100%');
        Column.width('100%');
        Row.create();
        Row.position({ x: 0, y: 0 });
        Row.width('100%');
        Column.create();
        Column.width('98%');
        Column.height(120);
        Column.backgroundColor(Color.Orange);
        Column.position({ x: '1%' });
        Text.create("【音量管理者】返回数据：");
        Text.fontWeight(FontWeight.Bolder);
        Text.position({ x: 10, y: 5 });
        Text.fontSize(18);
        Text.pop();
        Text.create(this.returnMsg);
        Text.position({ x: 10, y: 30 });
        Text.fontSize(14);
        Text.pop();
        Column.pop();
        Row.pop();
        Column.create();
        Column.margin({ top: 130 });
        Column.width('100%');
        Column.justifyContent(FlexAlign.Center);
        Button.createWithLabel("getVolumeGroupInfos callback");
        Button.width('90%');
        Button.fontSize(18);
        Button.height(60);
        Button.onClick(() => {
            let _this = this;
            this.audioVolumeManager.getVolumeGroupInfos(audio.LOCAL_NETWORK_ID, (err, value) => {
                if (err) {
                    _this.returnMsg = "getVolumeGroupInfos callback err:" + JSON.stringify(err);
                    return;
                }
                _this.returnMsg = "getVolumeGroupInfos callback SUCCESS:" + JSON.stringify(value);
            });
        });
        Button.margin({ bottom: 10 });
        Button.pop();
        Button.createWithLabel("getVolumeGroupInfos promise");
        Button.width('90%');
        Button.fontSize(18);
        Button.height(60);
        Button.onClick(() => {
            let _this = this;
            this.audioVolumeManager.getVolumeGroupInfos(audio.LOCAL_NETWORK_ID)
                .then(value => {
                _this.returnMsg = "getVolumeGroupInfos promise SUCCESS:" + JSON.stringify(value);
            }).catch(err => {
                _this.returnMsg = "getVolumeGroupInfos promise err:" + JSON.stringify(err);
            });
        });
        Button.margin({ bottom: 10 });
        Button.pop();
        Button.createWithLabel("getVolumeGroupManager callback");
        Button.width('90%');
        Button.fontSize(18);
        Button.height(60);
        Button.onClick(() => {
            let _this = this;
            this.audioVolumeManager.getVolumeGroupManager(audio.DEFAULT_VOLUME_GROUP_ID, (err, value) => {
                if (err) {
                    _this.returnMsg = "getVolumeGroupManager callback err:" + JSON.stringify(err);
                    return;
                }
                _this.returnMsg = "getVolumeGroupManager callback SUCCESS:" + JSON.stringify(value);
            });
        });
        Button.margin({ bottom: 10 });
        Button.pop();
        Button.createWithLabel("getVolumeGroupManager callback");
        Button.width('90%');
        Button.fontSize(18);
        Button.height(60);
        Button.onClick(() => {
            let _this = this;
            this.audioVolumeManager.getVolumeGroupManager(audio.DEFAULT_VOLUME_GROUP_ID)
                .then(value => {
                _this.returnMsg = "getVolumeGroupManager promise SUCCESS:" + JSON.stringify(value);
            }).catch(err => {
                _this.returnMsg = "getVolumeGroupManager promise err:" + JSON.stringify(err);
            });
        });
        Button.margin({ bottom: 10 });
        Button.pop();
        Column.pop();
        Column.pop();
    }
}
loadDocument(new AudioVolumeManager("1", undefined, {}));
