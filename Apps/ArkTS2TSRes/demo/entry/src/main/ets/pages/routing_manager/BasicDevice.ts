interface BasicDevice_Params {
    returnMsg?: string;
    onReturnMsg?: string;
    selectDeviceFlagList?;
    selectedDeviceFlagKey?: string;
    selectedDeviceFlag?: number;
    audioRoutingManager?;
    audioDeviceDescriptors?;
    InputDeviceDescriptors?;
    OutputDeviceDescriptors?;
    selectInputDeviceList?;
    selectOutputDeviceList?;
    selectedInputIndex?: number;
    selectedOutputIndex?: number;
    tag?: number;
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
import router from '@ohos.router';
import audio from '@ohos.multimedia.audio';
class BasicDevice extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__returnMsg = new ObservedPropertySimple('Hello World', this, "returnMsg");
        this.__onReturnMsg = new ObservedPropertySimple('', this, "onReturnMsg");
        this.selectDeviceFlagList = [];
        this.__selectedDeviceFlagKey = new ObservedPropertySimple("请选择设备类型", this, "selectedDeviceFlagKey");
        this.__selectedDeviceFlag = new ObservedPropertySimple(0, this, "selectedDeviceFlag");
        this.audioRoutingManager = null;
        this.audioDeviceDescriptors = [];
        this.InputDeviceDescriptors = [];
        this.OutputDeviceDescriptors = [];
        this.selectInputDeviceList = [];
        this.selectOutputDeviceList = [];
        this.__selectedInputIndex = new ObservedPropertySimple(0, this, "selectedInputIndex");
        this.__selectedOutputIndex = new ObservedPropertySimple(0, this, "selectedOutputIndex");
        this.__tag = new ObservedPropertySimple(-1, this, "tag");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: BasicDevice_Params) {
        if (params.returnMsg !== undefined) {
            this.returnMsg = params.returnMsg;
        }
        if (params.onReturnMsg !== undefined) {
            this.onReturnMsg = params.onReturnMsg;
        }
        if (params.selectDeviceFlagList !== undefined) {
            this.selectDeviceFlagList = params.selectDeviceFlagList;
        }
        if (params.selectedDeviceFlagKey !== undefined) {
            this.selectedDeviceFlagKey = params.selectedDeviceFlagKey;
        }
        if (params.selectedDeviceFlag !== undefined) {
            this.selectedDeviceFlag = params.selectedDeviceFlag;
        }
        if (params.audioRoutingManager !== undefined) {
            this.audioRoutingManager = params.audioRoutingManager;
        }
        if (params.audioDeviceDescriptors !== undefined) {
            this.audioDeviceDescriptors = params.audioDeviceDescriptors;
        }
        if (params.InputDeviceDescriptors !== undefined) {
            this.InputDeviceDescriptors = params.InputDeviceDescriptors;
        }
        if (params.OutputDeviceDescriptors !== undefined) {
            this.OutputDeviceDescriptors = params.OutputDeviceDescriptors;
        }
        if (params.selectInputDeviceList !== undefined) {
            this.selectInputDeviceList = params.selectInputDeviceList;
        }
        if (params.selectOutputDeviceList !== undefined) {
            this.selectOutputDeviceList = params.selectOutputDeviceList;
        }
        if (params.selectedInputIndex !== undefined) {
            this.selectedInputIndex = params.selectedInputIndex;
        }
        if (params.selectedOutputIndex !== undefined) {
            this.selectedOutputIndex = params.selectedOutputIndex;
        }
        if (params.tag !== undefined) {
            this.tag = params.tag;
        }
    }
    aboutToBeDeleted() {
        this.__returnMsg.aboutToBeDeleted();
        this.__onReturnMsg.aboutToBeDeleted();
        this.__selectedDeviceFlagKey.aboutToBeDeleted();
        this.__selectedDeviceFlag.aboutToBeDeleted();
        this.__selectedInputIndex.aboutToBeDeleted();
        this.__selectedOutputIndex.aboutToBeDeleted();
        this.__tag.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __returnMsg: ObservedPropertySimple<string>;
    get returnMsg() {
        return this.__returnMsg.get();
    }
    set returnMsg(newValue: string) {
        this.__returnMsg.set(newValue);
    }
    private __onReturnMsg: ObservedPropertySimple<string>;
    get onReturnMsg() {
        return this.__onReturnMsg.get();
    }
    set onReturnMsg(newValue: string) {
        this.__onReturnMsg.set(newValue);
    }
    private selectDeviceFlagList;
    private __selectedDeviceFlagKey: ObservedPropertySimple<string>;
    get selectedDeviceFlagKey() {
        return this.__selectedDeviceFlagKey.get();
    }
    set selectedDeviceFlagKey(newValue: string) {
        this.__selectedDeviceFlagKey.set(newValue);
    }
    private __selectedDeviceFlag: ObservedPropertySimple<number>;
    get selectedDeviceFlag() {
        return this.__selectedDeviceFlag.get();
    }
    set selectedDeviceFlag(newValue: number) {
        this.__selectedDeviceFlag.set(newValue);
    }
    private audioRoutingManager;
    private audioDeviceDescriptors;
    private InputDeviceDescriptors;
    private OutputDeviceDescriptors;
    private selectInputDeviceList;
    private selectOutputDeviceList;
    private __selectedInputIndex: ObservedPropertySimple<number>;
    get selectedInputIndex() {
        return this.__selectedInputIndex.get();
    }
    set selectedInputIndex(newValue: number) {
        this.__selectedInputIndex.set(newValue);
    }
    private __selectedOutputIndex: ObservedPropertySimple<number>;
    get selectedOutputIndex() {
        return this.__selectedOutputIndex.get();
    }
    set selectedOutputIndex(newValue: number) {
        this.__selectedOutputIndex.set(newValue);
    }
    private __tag: ObservedPropertySimple<number>;
    get tag() {
        return this.__tag.get();
    }
    set tag(newValue: number) {
        this.__tag.set(newValue);
    }
    aboutToAppear() {
        let audioManager = audio.getAudioManager();
        this.audioRoutingManager = audioManager.getRoutingManager();
        for (let key in audio.DeviceFlag) {
            this.selectDeviceFlagList.push({ value: key });
        }
    }
    getDeviceList(deviceDescriptors) {
        let deviceList = [];
        for (let i = 0; i < deviceDescriptors.length; i++) {
            let deviceTypeName = this.getDeviceTypeNameByValue(deviceDescriptors[i].deviceType);
            deviceList.push({ value: deviceTypeName });
        }
        return deviceList;
    }
    getDeviceTypeNameByValue(value) {
        for (let key in audio.DeviceType) {
            if (audio.DeviceType[key] == value) {
                return key;
            }
        }
    }
    getDevicesCallback() {
        if (this.selectedDeviceFlagKey == "请选择设备类型") {
            this.returnMsg = `请选择设备类型`;
            return;
        }
        let _this = this;
        this.audioRoutingManager.getDevices(this.selectedDeviceFlag, (err, value) => {
            if (err) {
                _this.returnMsg = `getDevices callback Failed err:${JSON.stringify(err)}`;
                return;
            }
            _this.audioDeviceDescriptors = value;
            _this.returnMsg = `getDevices callback Success 返回值:${JSON.stringify(value)}`;
        });
    }
    getDevicesPromise() {
        if (this.selectedDeviceFlagKey == "请选择设备类型") {
            this.returnMsg = `请选择设备类型`;
            return;
        }
        let _this = this;
        this.audioRoutingManager.getDevices(this.selectedDeviceFlag)
            .then(value => {
            _this.audioDeviceDescriptors = value;
            _this.returnMsg = `getDevices promise Success 返回值:${JSON.stringify(value)}`;
        }).catch(err => {
            _this.returnMsg = `getDevices promise Failed err:${JSON.stringify(err)}`;
        });
    }
    onDeviceChange() {
        let _this = this;
        _this.onReturnMsg = `监听已监听\n deviceFlag:${this.selectedDeviceFlag}`;
        this.audioRoutingManager.on('deviceChange', this.selectedDeviceFlag, (deviceChanged) => {
            _this.onReturnMsg = "on 收到回调了：" + JSON.stringify(deviceChanged);
        });
    }
    offDeviceChange() {
        this.audioRoutingManager.off('deviceChange', (deviceChanged) => {
            let _this = this;
            _this.onReturnMsg = "off 已触发";
            _this.onReturnMsg = "off 收到回调了：" + JSON.stringify(deviceChanged);
        });
    }
    selectInputDeviceCallback() {
        let _this = this;
        if (this.InputDeviceDescriptors.length == 0) {
            _this.returnMsg = `没有输入设备类`;
            return;
        }
        let inputAudioDeviceDescriptor = this.InputDeviceDescriptors.filter((value, index) => {
            return index == _this.selectedInputIndex;
        });
        if (inputAudioDeviceDescriptor.length == 0) {
            _this.returnMsg = `尚未选择输入设备`;
            return;
        }
        this.audioRoutingManager.selectInputDevice(inputAudioDeviceDescriptor, (err) => {
            if (err) {
                _this.returnMsg = `selectInputDevice callback Failed err:${JSON.stringify(err)}`;
            }
            else {
                _this.returnMsg = `selectInputDevice callback Success`;
            }
        });
    }
    selectInputDevicePromise() {
        let _this = this;
        if (this.InputDeviceDescriptors.length == 0) {
            _this.returnMsg = `没有输入设备类`;
            return;
        }
        let inputAudioDeviceDescriptor = this.InputDeviceDescriptors.filter((value, index) => {
            return index == _this.selectedInputIndex;
        });
        if (inputAudioDeviceDescriptor.length == 0) {
            _this.returnMsg = `尚未选择输入设备`;
            return;
        }
        this.audioRoutingManager.selectInputDevice(inputAudioDeviceDescriptor)
            .then(() => {
            _this.returnMsg = `selectInputDevice promise Success`;
        }).catch(err => {
            _this.returnMsg = `selectInputDevice promise Failed err:${JSON.stringify(err)}`;
        });
    }
    selectOutputDeviceCallback() {
        let _this = this;
        if (this.OutputDeviceDescriptors.length == 0) {
            _this.returnMsg = `没有输出设备类`;
            return;
        }
        let outputAudioDeviceDescriptor = this.OutputDeviceDescriptors.filter((value, index) => {
            return index == _this.selectedOutputIndex;
        });
        if (outputAudioDeviceDescriptor.length == 0) {
            _this.returnMsg = `尚未选择输出设备`;
            return;
        }
        this.audioRoutingManager.selectOutputDevice(outputAudioDeviceDescriptor, (err) => {
            if (err) {
                _this.returnMsg = `selectOutputDevice callback Failed err:${JSON.stringify(err)}`;
            }
            else {
                _this.returnMsg = `selectOutputDevice callback Success`;
            }
        });
    }
    selectOutputDevicePromise() {
        let _this = this;
        if (this.OutputDeviceDescriptors.length == 0) {
            _this.returnMsg = `没有输出设备类`;
            return;
        }
        let outputAudioDeviceDescriptor = this.OutputDeviceDescriptors.filter((value, index) => {
            return index == _this.selectedOutputIndex;
        });
        if (outputAudioDeviceDescriptor.length == 0) {
            _this.returnMsg = `尚未选择输出设备`;
            return;
        }
        this.audioRoutingManager.selectOutputDevice(outputAudioDeviceDescriptor)
            .then(() => {
            _this.returnMsg = `selectOutputDevice promise Success`;
        }).catch(err => {
            _this.returnMsg = `selectOutputDevice promise Failed err:${JSON.stringify(err)}`;
        });
    }
    render() {
        Column.create();
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
        Scroll.create();
        Scroll.margin({ top: 130 });
        Scroll.width('100%');
        Column.create();
        Column.width('100%');
        Row.create();
        Row.margin({ top: 10 });
        Select.create(this.selectDeviceFlagList);
        Select.value(this.selectedDeviceFlagKey);
        Select.onSelect((index, value) => {
            this.selectedDeviceFlag = audio.DeviceFlag[value];
            this.selectedDeviceFlagKey = value;
        });
        Select.pop();
        Row.pop();
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
        If.create();
        if (this.tag == 2) {
            If.branchId(0);
            Row.create();
            Row.margin({ top: 10 });
            Row.width('100%');
            Text.create("输入设备");
            Text.fontSize(20);
            Text.margin({ left: 10 });
            Text.pop();
            Select.create(this.selectInputDeviceList);
            Select.value(this.selectInputDeviceList[this.selectedInputIndex].value);
            Select.onSelect((index, value) => {
                this.selectedInputIndex = index;
            });
            Select.pop();
            Row.pop();
            Row.create();
            Row.margin({ top: 10 });
            Row.width('100%');
            Button.createWithChild();
            Button.width('100%');
            Button.height(60);
            Button.onClick(() => this.selectInputDeviceCallback());
            Text.create("selectInputDevice callback");
            Text.fontSize(20);
            Text.fontColor(Color.White);
            Text.pop();
            Button.pop();
            Row.pop();
            Row.create();
            Row.margin({ top: 10 });
            Row.width('100%');
            Button.createWithChild();
            Button.width('100%');
            Button.height(60);
            Button.onClick(() => this.selectInputDevicePromise());
            Text.create("selectInputDevice promise");
            Text.fontSize(20);
            Text.fontColor(Color.White);
            Text.pop();
            Button.pop();
            Row.pop();
        }
        If.pop();
        If.create();
        if (this.tag == 1) {
            If.branchId(0);
            Row.create();
            Row.margin({ top: 10 });
            Row.width('100%');
            Text.create("输出设备");
            Text.fontSize(20);
            Text.margin({ left: 10 });
            Text.pop();
            Select.create(this.selectOutputDeviceList);
            Select.value(this.selectOutputDeviceList[this.selectedOutputIndex].value);
            Select.onSelect((index, value) => {
                this.selectedOutputIndex = index;
            });
            Select.pop();
            Row.pop();
            Row.create();
            Row.margin({ top: 10 });
            Row.width('100%');
            Button.createWithChild();
            Button.width('100%');
            Button.height(60);
            Button.onClick(() => this.selectOutputDeviceCallback());
            Text.create("selectOutputDevice callback");
            Text.fontSize(20);
            Text.fontColor(Color.White);
            Text.pop();
            Button.pop();
            Row.pop();
            Row.create();
            Row.margin({ top: 10 });
            Row.width('100%');
            Button.createWithChild();
            Button.width('100%');
            Button.height(60);
            Button.onClick(() => this.selectOutputDevicePromise());
            Text.create("selectOutputDevice promise");
            Text.fontSize(20);
            Text.fontColor(Color.White);
            Text.pop();
            Button.pop();
            Row.pop();
        }
        If.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
}
loadDocument(new BasicDevice("1", undefined, {}));
