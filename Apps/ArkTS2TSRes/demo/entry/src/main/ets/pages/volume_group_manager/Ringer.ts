interface Ringer_Params {
    returnMsg?: string;
    message1?: string;
    audioVolumeGroupManager?;
    ringerModeSelectList?;
    selectedRingerMode?: number;
    selectedRingerModeKey?: string;
    changedRingerMode?: number;
    isOnClickedState?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Ringer_" + ++__generate__Id;
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
import audio from '@ohos.multimedia.audio';
class Ringer extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__returnMsg = new ObservedPropertySimple('Hello World', this, "returnMsg");
        this.__message1 = new ObservedPropertySimple('Hello World1', this, "message1");
        this.audioVolumeGroupManager = null;
        this.ringerModeSelectList = [];
        this.__selectedRingerMode = new ObservedPropertySimple(-1, this, "selectedRingerMode");
        this.__selectedRingerModeKey = new ObservedPropertySimple('请选择', this, "selectedRingerModeKey");
        this.__changedRingerMode = new ObservedPropertySimple(-1, this, "changedRingerMode");
        this.__isOnClickedState = new ObservedPropertySimple("unclicked", this, "isOnClickedState");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Ringer_Params) {
        if (params.returnMsg !== undefined) {
            this.returnMsg = params.returnMsg;
        }
        if (params.message1 !== undefined) {
            this.message1 = params.message1;
        }
        if (params.audioVolumeGroupManager !== undefined) {
            this.audioVolumeGroupManager = params.audioVolumeGroupManager;
        }
        if (params.ringerModeSelectList !== undefined) {
            this.ringerModeSelectList = params.ringerModeSelectList;
        }
        if (params.selectedRingerMode !== undefined) {
            this.selectedRingerMode = params.selectedRingerMode;
        }
        if (params.selectedRingerModeKey !== undefined) {
            this.selectedRingerModeKey = params.selectedRingerModeKey;
        }
        if (params.changedRingerMode !== undefined) {
            this.changedRingerMode = params.changedRingerMode;
        }
        if (params.isOnClickedState !== undefined) {
            this.isOnClickedState = params.isOnClickedState;
        }
    }
    aboutToBeDeleted() {
        this.__returnMsg.aboutToBeDeleted();
        this.__message1.aboutToBeDeleted();
        this.__selectedRingerMode.aboutToBeDeleted();
        this.__selectedRingerModeKey.aboutToBeDeleted();
        this.__changedRingerMode.aboutToBeDeleted();
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
    private __message1: ObservedPropertySimple<string>;
    get message1() {
        return this.__message1.get();
    }
    set message1(newValue: string) {
        this.__message1.set(newValue);
    }
    private audioVolumeGroupManager;
    private ringerModeSelectList;
    private __selectedRingerMode: ObservedPropertySimple<number>;
    get selectedRingerMode() {
        return this.__selectedRingerMode.get();
    }
    set selectedRingerMode(newValue: number) {
        this.__selectedRingerMode.set(newValue);
    }
    private __selectedRingerModeKey: ObservedPropertySimple<string>;
    get selectedRingerModeKey() {
        return this.__selectedRingerModeKey.get();
    }
    set selectedRingerModeKey(newValue: string) {
        this.__selectedRingerModeKey.set(newValue);
    }
    private __changedRingerMode: ObservedPropertySimple<number>;
    get changedRingerMode() {
        return this.__changedRingerMode.get();
    }
    set changedRingerMode(newValue: number) {
        this.__changedRingerMode.set(newValue);
    }
    private __isOnClickedState: ObservedPropertySimple<string>;
    get isOnClickedState() {
        return this.__isOnClickedState.get();
    }
    set isOnClickedState(newValue: string) {
        this.__isOnClickedState.set(newValue);
    }
    onPageShow() {
    }
    aboutToAppear() {
        let _this = this;
        for (let key in audio.AudioRingMode) {
            this.ringerModeSelectList.push({ value: key });
        }
        let audioManager = audio.getAudioManager();
        let audioVolumeManager = audioManager.getVolumeManager();
        let groupid = audio.DEFAULT_VOLUME_GROUP_ID;
        audioVolumeManager.getVolumeGroupManager(groupid, (err, value) => {
            if (err) {
                _this.returnMsg = "getVolumeGroupManager failed. err:" + JSON.stringify(err);
                return;
            }
            _this.returnMsg = "getVolumeGroupManager success \n";
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
        Text.create("【铃声】返回数据：");
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
        Column.width('100%');
        Column.margin({ top: 70 });
        Row.create();
        Row.align(Alignment.Start);
        Select.create(this.ringerModeSelectList);
        Select.value(this.selectedRingerModeKey);
        Select.onSelect((index, value) => {
            console.log('value=' + value);
            this.selectedRingerMode = audio.AudioRingMode[value];
            this.selectedRingerModeKey = value;
        });
        Select.font({ size: 22, weight: 800 });
        Select.pop();
        Row.pop();
        Row.create();
        Row.align(Alignment.Start);
        Text.create("铃声模式数据：" + this.selectedRingerMode);
        Text.fontSize(20);
        Text.margin({ left: 10 });
        Text.pop();
        Row.pop();
        Row.create();
        Row.width('100%');
        Row.margin({ top: 20 });
        Button.createWithLabel("on('ringerModeChange')");
        Button.width('100%');
        Button.fontSize(20);
        Button.height(80);
        Button.onClick(() => {
            this.isOnClickedState = "clicked";
            let _this = this;
            this.audioVolumeGroupManager.on('ringerModeChange', (ringerMode) => {
                _this.changedRingerMode = ringerMode;
                _this.isOnClickedState = "clicked_callback";
            });
        });
        Button.pop();
        Row.pop();
        Row.create();
        Row.align(Alignment.Start);
        Row.width('100%');
        If.create();
        if (this.isOnClickedState == "unclicked") {
            If.branchId(0);
            Text.create("监听尚未触发");
            Text.fontSize(20);
            Text.margin({ left: 10, top: 5 });
            Text.pop();
        }
        else if (this.isOnClickedState == "clicked") {
            If.branchId(1);
            Text.create("监听已触发：尚未收到回调");
            Text.fontSize(20);
            Text.margin({ left: 10, top: 5 });
            Text.pop();
        }
        else if (this.isOnClickedState == "clicked_callback") {
            If.branchId(2);
            Text.create("监听铃声变更数据：" + this.changedRingerMode);
            Text.fontSize(20);
            Text.margin({ left: 10, top: 5 });
            Text.pop();
        }
        If.pop();
        Row.pop();
        Column.create();
        Column.width('100%');
        Column.justifyContent(FlexAlign.Center);
        Column.margin({ top: 20 });
        Button.createWithLabel("setRingerMode callback");
        Button.width('80%');
        Button.margin({ right: 10 });
        Button.height(80);
        Button.margin({ top: 10 });
        Button.fontSize(20);
        Button.onClick(() => {
            let _this = this;
            this.audioVolumeGroupManager.setRingerMode(this.selectedRingerMode, (err) => {
                if (err) {
                    _this.returnMsg = "setRingerMode callback:" + JSON.stringify(err);
                    return;
                }
                _this.returnMsg = "setRingerMode callback:SUCCESS";
            });
        });
        Button.pop();
        Button.createWithLabel("setRingerMode promise");
        Button.width('80%');
        Button.margin({ right: 10 });
        Button.height(80);
        Button.margin({ top: 10 });
        Button.fontSize(20);
        Button.onClick(() => {
            let _this = this;
            this.audioVolumeGroupManager.setRingerMode(this.selectedRingerMode).then(() => {
                _this.returnMsg = "setRingerMode promise:SUCCESS";
            }).catch(err => {
                _this.returnMsg = "setRingerMode promise:" + JSON.stringify(err);
            });
        });
        Button.pop();
        Column.pop();
        Column.create();
        Column.width('100%');
        Column.justifyContent(FlexAlign.Center);
        Button.createWithLabel("getRingerMode callback");
        Button.width('80%');
        Button.margin({ right: 10 });
        Button.height(80);
        Button.margin({ top: 10 });
        Button.fontSize(20);
        Button.onClick(() => {
            let _this = this;
            this.audioVolumeGroupManager.getRingerMode((err, value) => {
                if (err) {
                    _this.returnMsg = "getRingerMode callback:" + JSON.stringify(err);
                    return;
                }
                _this.returnMsg = "getRingerMode callback:SUCCESS,返回值[AudioRingMode]:" + value;
            });
        });
        Button.pop();
        Button.createWithLabel("getRingerMode promise");
        Button.width('80%');
        Button.margin({ right: 10 });
        Button.height(80);
        Button.margin({ top: 10 });
        Button.fontSize(20);
        Button.onClick(() => {
            let _this = this;
            this.audioVolumeGroupManager.getRingerMode()
                .then(value => {
                _this.returnMsg = "getRingerMode promise:SUCCESS,返回值[AudioRingMode]:" + value;
            }).catch(err => {
                _this.returnMsg = "getRingerMode promise:" + JSON.stringify(err);
            });
        });
        Button.pop();
        Column.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Ringer("1", undefined, {}));
