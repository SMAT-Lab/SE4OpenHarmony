interface Microphone_Params {
    returnMsg?: string;
    mute?: boolean;
    audioVolumeGroupManager?;
    onMute?: boolean;
    isOnClickedState?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Microphone_" + ++__generate__Id;
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
class Microphone extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__returnMsg = new ObservedPropertySimple('Hello World', this, "returnMsg");
        this.__mute = new ObservedPropertySimple(false, this, "mute");
        this.audioVolumeGroupManager = null;
        this.__onMute = new ObservedPropertySimple(false, this, "onMute");
        this.__isOnClickedState = new ObservedPropertySimple("unclicked", this, "isOnClickedState");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Microphone_Params) {
        if (params.returnMsg !== undefined) {
            this.returnMsg = params.returnMsg;
        }
        if (params.mute !== undefined) {
            this.mute = params.mute;
        }
        if (params.audioVolumeGroupManager !== undefined) {
            this.audioVolumeGroupManager = params.audioVolumeGroupManager;
        }
        if (params.onMute !== undefined) {
            this.onMute = params.onMute;
        }
        if (params.isOnClickedState !== undefined) {
            this.isOnClickedState = params.isOnClickedState;
        }
    }
    aboutToBeDeleted() {
        this.__returnMsg.aboutToBeDeleted();
        this.__mute.aboutToBeDeleted();
        this.__onMute.aboutToBeDeleted();
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
    private __mute: ObservedPropertySimple<boolean>;
    get mute() {
        return this.__mute.get();
    }
    set mute(newValue: boolean) {
        this.__mute.set(newValue);
    }
    private audioVolumeGroupManager;
    private __onMute: ObservedPropertySimple<boolean>;
    get onMute() {
        return this.__onMute.get();
    }
    set onMute(newValue: boolean) {
        this.__onMute.set(newValue);
    }
    private __isOnClickedState: ObservedPropertySimple<string>;
    get isOnClickedState() {
        return this.__isOnClickedState.get();
    }
    set isOnClickedState(newValue: string) {
        this.__isOnClickedState.set(newValue);
    }
    aboutToAppear() {
        let audioManager = audio.getAudioManager();
        let audioVolumeManager = audioManager.getVolumeManager();
        let groupid = audio.DEFAULT_VOLUME_GROUP_ID;
        let _this = this;
        audioVolumeManager.getVolumeGroupManager(groupid, (err, value) => {
            if (err) {
                _this.returnMsg = "getVolumeGroupManager failed. err:" + JSON.stringify(err);
                return;
            }
            _this.returnMsg += "getVolumeGroupManager success";
            _this.audioVolumeGroupManager = value;
        });
    }
    render() {
        Row.create();
        Row.height('100%');
        Row.width('100%');
        Row.create();
        Row.position({ x: 0, y: 0 });
        Row.width('100%');
        Column.create();
        Column.width('98%');
        Column.height(70);
        Column.backgroundColor(Color.Orange);
        Column.position({ x: '1%' });
        Text.create("【麦克风】返回数据：");
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
        Column.height('90%');
        Column.margin({ top: 80 });
        Column.justifyContent(FlexAlign.Center);
        Column.alignItems(HorizontalAlign.Center);
        Column.width('100%');
        Row.create();
        Text.create("是否静音");
        Text.fontSize(24);
        Text.pop();
        Radio.create({ value: 'mute1', group: "muteGroup" });
        Radio.onChange((isChecked) => {
            if (isChecked) {
                this.mute = true;
            }
            else {
                this.mute = false;
            }
        });
        Radio.checked(this.mute == true);
        Text.create("静音");
        Text.fontSize(18);
        Text.pop();
        Radio.create({ value: 'mute2', group: "muteGroup" });
        Radio.onChange((isChecked) => {
            if (isChecked) {
                this.mute = false;
            }
            else {
                this.mute = true;
            }
        });
        Radio.checked(this.mute == false);
        Text.create("取消静音");
        Text.fontSize(18);
        Text.pop();
        Row.pop();
        Row.create();
        Text.create("静音数据：" + this.mute);
        Text.fontSize(24);
        Text.pop();
        Row.pop();
        Button.createWithLabel("on('micStateChange')");
        Button.fontSize(18);
        Button.height(60);
        Button.width('80%');
        Button.margin({ top: 10 });
        Button.onClick(() => {
            this.isOnClickedState = "clicked";
            let _this = this;
            this.audioVolumeGroupManager.on('micStateChange', (micStateChange) => {
                _this.onMute = micStateChange.mute;
                _this.isOnClickedState = "clicked_callback";
            });
        });
        Button.pop();
        Column.create();
        If.create();
        if (this.isOnClickedState == "clicked") {
            If.branchId(0);
            Text.create("监听已触发");
            Text.fontSize(18);
            Text.pop();
        }
        else if (this.isOnClickedState == "unclicked") {
            If.branchId(1);
            Text.create("监听尚未触发");
            Text.fontSize(18);
            Text.pop();
        }
        else if (this.isOnClickedState == "clicked_callback") {
            If.branchId(2);
            Text.create("收到的回调数据" + this.onMute);
            Text.fontSize(18);
            Text.pop();
        }
        If.pop();
        Column.pop();
        Button.createWithLabel("setMicrophoneMute-callback");
        Button.fontSize(18);
        Button.height(60);
        Button.width('80%');
        Button.margin({ top: 10 });
        Button.onClick(() => {
            let _this = this;
            this.audioVolumeGroupManager.setMicrophoneMute(this.mute, (err) => {
                if (err) {
                    _this.returnMsg = "setMicrophoneMute-callback err:" + JSON.stringify(err);
                    return;
                }
                _this.returnMsg = "setMicrophoneMute-callback SUCCESS";
            });
        });
        Button.pop();
        Button.createWithLabel("setMicrophoneMute-promise");
        Button.fontSize(18);
        Button.height(60);
        Button.width('80%');
        Button.margin({ top: 10 });
        Button.onClick(() => {
            let _this = this;
            this.audioVolumeGroupManager.setMicrophoneMute(this.mute)
                .then(() => {
                _this.returnMsg = "setMicrophoneMute-promise SUCCESS";
            }).catch(err => {
                _this.returnMsg = "setMicrophoneMute-promise err:" + JSON.stringify(err);
            });
        });
        Button.pop();
        Button.createWithLabel("setMicMute-promise");
        Button.fontSize(18);
        Button.height(60);
        Button.width('80%');
        Button.margin({ top: 10 });
        Button.onClick(() => {
            let _this = this;
            this.audioVolumeGroupManager.setMicMute(this.mute)
                .then(() => {
                _this.returnMsg = "setMicMute-promise SUCCESS";
            }).catch(err => {
                _this.returnMsg = "setMicMute-promise err:" + JSON.stringify(err);
            });
        });
        Button.pop();
        Button.createWithLabel("isMicrophoneMute-callback");
        Button.fontSize(18);
        Button.height(60);
        Button.width('80%');
        Button.margin({ top: 10 });
        Button.onClick(() => {
            let _this = this;
            this.audioVolumeGroupManager.isMicrophoneMute((err, value) => {
                if (err) {
                    _this.returnMsg = "setMicrophoneMute-callback err:" + JSON.stringify(err);
                    return;
                }
                _this.returnMsg = "isMicrophoneMute-callback SUCCESS,返回值：" + value;
            });
        });
        Button.pop();
        Button.createWithLabel("isMicrophoneMute-promise");
        Button.fontSize(18);
        Button.height(60);
        Button.width('80%');
        Button.margin({ top: 10 });
        Button.onClick(() => {
            let _this = this;
            this.audioVolumeGroupManager.isMicrophoneMute()
                .then((value) => {
                _this.returnMsg = "isMicrophoneMute-promise SUCCESS,返回值：" + value;
            }).catch(err => {
                _this.returnMsg = "isMicrophoneMute-promise err:" + JSON.stringify(err);
            });
        });
        Button.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Microphone("1", undefined, {}));
