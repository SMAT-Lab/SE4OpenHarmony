interface AudioManagerAudioRouterManager_Params {
    returnMsg?: string;
    selectDeviceFlagList?;
    selectedDeviceFlag?: number;
    audioRoutingManager?;
    selectedDeviceFlagKey?: string;
    audioManagerObj?: audio.AudioManager;
    onReturnMsg?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "BasicDevice_" + ++__generate__Id;
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
class AudioManagerAudioRouterManager extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__returnMsg = new ObservedPropertySimple('Hello World', this, "returnMsg");
        this.selectDeviceFlagList = [];
        this.__selectedDeviceFlag = new ObservedPropertySimple(0, this, "selectedDeviceFlag");
        this.audioRoutingManager = null;
        this.__selectedDeviceFlagKey = new ObservedPropertySimple("请选择设备类型", this, "selectedDeviceFlagKey");
        this.__audioManagerObj = new ObservedPropertyObject(null, this, "audioManagerObj");
        this.__onReturnMsg = new ObservedPropertySimple('', this, "onReturnMsg");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AudioManagerAudioRouterManager_Params) {
        if (params.returnMsg !== undefined) {
            this.returnMsg = params.returnMsg;
        }
        if (params.selectDeviceFlagList !== undefined) {
            this.selectDeviceFlagList = params.selectDeviceFlagList;
        }
        if (params.selectedDeviceFlag !== undefined) {
            this.selectedDeviceFlag = params.selectedDeviceFlag;
        }
        if (params.audioRoutingManager !== undefined) {
            this.audioRoutingManager = params.audioRoutingManager;
        }
        if (params.selectedDeviceFlagKey !== undefined) {
            this.selectedDeviceFlagKey = params.selectedDeviceFlagKey;
        }
        if (params.audioManagerObj !== undefined) {
            this.audioManagerObj = params.audioManagerObj;
        }
        if (params.onReturnMsg !== undefined) {
            this.onReturnMsg = params.onReturnMsg;
        }
    }
    aboutToBeDeleted() {
        this.__returnMsg.aboutToBeDeleted();
        this.__selectedDeviceFlag.aboutToBeDeleted();
        this.__selectedDeviceFlagKey.aboutToBeDeleted();
        this.__audioManagerObj.aboutToBeDeleted();
        this.__onReturnMsg.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __returnMsg: ObservedPropertySimple<string>;
    get returnMsg() {
        return this.__returnMsg.get();
    }
    set returnMsg(newValue: string) {
        this.__returnMsg.set(newValue);
    }
    private selectDeviceFlagList;
    private __selectedDeviceFlag: ObservedPropertySimple<number>;
    get selectedDeviceFlag() {
        return this.__selectedDeviceFlag.get();
    }
    set selectedDeviceFlag(newValue: number) {
        this.__selectedDeviceFlag.set(newValue);
    }
    private audioRoutingManager;
    private __selectedDeviceFlagKey: ObservedPropertySimple<string>;
    get selectedDeviceFlagKey() {
        return this.__selectedDeviceFlagKey.get();
    }
    set selectedDeviceFlagKey(newValue: string) {
        this.__selectedDeviceFlagKey.set(newValue);
    }
    private __audioManagerObj: ObservedPropertyObject<audio.AudioManager>;
    get audioManagerObj() {
        return this.__audioManagerObj.get();
    }
    set audioManagerObj(newValue: audio.AudioManager) {
        this.__audioManagerObj.set(newValue);
    }
    private __onReturnMsg: ObservedPropertySimple<string>;
    get onReturnMsg() {
        return this.__onReturnMsg.get();
    }
    set onReturnMsg(newValue: string) {
        this.__onReturnMsg.set(newValue);
    }
    aboutToAppear() {
        this.audioManagerObj = audio.getAudioManager();
        for (let key in audio.DeviceFlag) {
            this.selectDeviceFlagList.push({ value: key });
        }
    }
    getDevicesCallback() {
        if (this.selectedDeviceFlagKey == "请选择设备类型") {
            this.returnMsg = `请选择设备类型`;
            return;
        }
        this.audioManagerObj.getDevices(this.selectedDeviceFlag, (err, value) => {
            if (err) {
                this.returnMsg = `getDevices callback Failed err:${JSON.stringify(err)}`;
                return;
            }
            this.returnMsg = `getDevices callback Success 返回值:${JSON.stringify(value)}`;
        });
    }
    getDevicesPromise() {
        if (this.selectedDeviceFlagKey == "请选择设备类型") {
            this.returnMsg = `请选择设备类型`;
            return;
        }
        this.audioManagerObj.getDevices(this.selectedDeviceFlag)
            .then(value => {
            this.returnMsg = `getDevices promise Success 返回值:${JSON.stringify(value)}`;
        }).catch(err => {
            this.returnMsg = `getDevices promise Failed err:${JSON.stringify(err)}`;
        });
    }
    onDeviceChange() {
        let _this = this;
        _this.onReturnMsg = `监听已监听\n deviceFlag:${this.selectedDeviceFlag}`;
        this.audioManagerObj.on('deviceChange', (deviceChanged) => {
            _this.onReturnMsg = "on 收到回调了：" + JSON.stringify(deviceChanged);
        });
    }
    offDeviceChange() {
        this.onReturnMsg = "off 已触发";
        this.audioManagerObj.off('deviceChange');
    }
    render() {
        Column.create();
        Column.height('100%');
        Row.create();
        Row.position({ x: 0, y: 0 });
        Row.width('100%');
        Row.zIndex(999);
        Column.create();
        Column.width('98%');
        Column.height(120);
        Column.backgroundColor(Color.Orange);
        Column.position({ x: '1%' });
        Text.create("【路由管理】返回数据：");
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
        Select.create(this.selectDeviceFlagList);
        Select.value(this.selectedDeviceFlagKey);
        Select.onSelect((index, value) => {
            this.selectedDeviceFlag = audio.DeviceFlag[value];
            this.selectedDeviceFlagKey = value;
        });
        Select.pop();
        Column.pop();
        Row.create();
        Row.margin({ top: 10 });
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceBetween);
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.onClick(() => this.getDevicesCallback());
        Text.create("getDevices callback");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('49%');
        Button.height(60);
        Button.onClick(() => this.getDevicesPromise());
        Text.create("getDevices promise");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceBetween);
        Button.createWithChild();
        Button.width('69%');
        Button.height(40);
        Button.onClick(() => this.onDeviceChange());
        Text.create("on('deviceChange')");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.width('29%');
        Button.height(40);
        Button.onClick(() => this.offDeviceChange());
        Text.create("off");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Text.create("尚未监听" + this.onReturnMsg);
        Text.fontSize(20);
        Text.lineHeight(34);
        Text.pop();
        Row.pop();
        Column.pop();
    }
}
loadDocument(new AudioManagerAudioRouterManager("1", undefined, {}));
