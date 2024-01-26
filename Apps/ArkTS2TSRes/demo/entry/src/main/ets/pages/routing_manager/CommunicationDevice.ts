interface CommunicationDevice_Params {
    returnMsg?: string;
    onReturnMsg?: string;
    audioRoutingManager?;
    CommunicationDeviceTypeList?;
    selectedCommunicationDeviceKey?: string;
    selectedCommunicationDeviceVal?: number;
    active?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CommunicationDevice_" + ++__generate__Id;
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
import prompt from '@ohos.prompt';
class CommunicationDevice extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__returnMsg = new ObservedPropertySimple('Hello World', this, "returnMsg");
        this.__onReturnMsg = new ObservedPropertySimple('Hello World', this, "onReturnMsg");
        this.audioRoutingManager = null;
        this.CommunicationDeviceTypeList = [];
        this.__selectedCommunicationDeviceKey = new ObservedPropertySimple("请选择", this, "selectedCommunicationDeviceKey");
        this.__selectedCommunicationDeviceVal = new ObservedPropertySimple(0, this, "selectedCommunicationDeviceVal");
        this.__active = new ObservedPropertySimple(false, this, "active");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CommunicationDevice_Params) {
        if (params.returnMsg !== undefined) {
            this.returnMsg = params.returnMsg;
        }
        if (params.onReturnMsg !== undefined) {
            this.onReturnMsg = params.onReturnMsg;
        }
        if (params.audioRoutingManager !== undefined) {
            this.audioRoutingManager = params.audioRoutingManager;
        }
        if (params.CommunicationDeviceTypeList !== undefined) {
            this.CommunicationDeviceTypeList = params.CommunicationDeviceTypeList;
        }
        if (params.selectedCommunicationDeviceKey !== undefined) {
            this.selectedCommunicationDeviceKey = params.selectedCommunicationDeviceKey;
        }
        if (params.selectedCommunicationDeviceVal !== undefined) {
            this.selectedCommunicationDeviceVal = params.selectedCommunicationDeviceVal;
        }
        if (params.active !== undefined) {
            this.active = params.active;
        }
    }
    aboutToBeDeleted() {
        this.__returnMsg.aboutToBeDeleted();
        this.__onReturnMsg.aboutToBeDeleted();
        this.__selectedCommunicationDeviceKey.aboutToBeDeleted();
        this.__selectedCommunicationDeviceVal.aboutToBeDeleted();
        this.__active.aboutToBeDeleted();
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
    private audioRoutingManager;
    private CommunicationDeviceTypeList;
    private __selectedCommunicationDeviceKey: ObservedPropertySimple<string>;
    get selectedCommunicationDeviceKey() {
        return this.__selectedCommunicationDeviceKey.get();
    }
    set selectedCommunicationDeviceKey(newValue: string) {
        this.__selectedCommunicationDeviceKey.set(newValue);
    }
    private __selectedCommunicationDeviceVal: ObservedPropertySimple<number>;
    get selectedCommunicationDeviceVal() {
        return this.__selectedCommunicationDeviceVal.get();
    }
    set selectedCommunicationDeviceVal(newValue: number) {
        this.__selectedCommunicationDeviceVal.set(newValue);
    }
    private __active: ObservedPropertySimple<boolean>;
    get active() {
        return this.__active.get();
    }
    set active(newValue: boolean) {
        this.__active.set(newValue);
    }
    aboutToAppear() {
        let audioManager = audio.getAudioManager();
        this.audioRoutingManager = audioManager.getRoutingManager();
        for (let key in audio.CommunicationDeviceType) {
            this.CommunicationDeviceTypeList.push({ value: key });
        }
    }
    setCommunicationDeviceCallback() {
        if (this.selectedCommunicationDeviceKey == "请选择") {
            prompt.showToast({
                message: '请选择通讯设备',
                duration: 2000,
            });
            return;
        }
        let _this = this;
        this.audioRoutingManager.setCommunicationDevice(this.selectedCommunicationDeviceVal, this.active, (err) => {
            if (err) {
                _this.returnMsg = `setCommunicationDevice callback Failed error ${JSON.stringify(err)}`;
                return;
            }
            _this.returnMsg = `setCommunicationDevice callback Success`;
        });
    }
    setCommunicationDevicePromise() {
        if (this.selectedCommunicationDeviceKey == "请选择") {
            prompt.showToast({
                message: '请选择通讯设备',
                duration: 2000,
            });
            return;
        }
        let _this = this;
        this.audioRoutingManager.setCommunicationDevice(this.selectedCommunicationDeviceVal, this.active)
            .then(() => {
            _this.returnMsg = `setCommunicationDevice promise Success`;
        }).catch(err => {
            _this.returnMsg = `setCommunicationDevice promise Failed error ${JSON.stringify(err)}`;
        });
    }
    isCommunicationDeviceActiveCallback() {
        let _this = this;
        this.audioRoutingManager.isCommunicationDeviceActive(this.selectedCommunicationDeviceVal, (err, value) => {
            if (err) {
                _this.returnMsg = `isCommunicationDeviceActive callback Failed error ${JSON.stringify(err)}`;
                return;
            }
            _this.returnMsg = `isCommunicationDeviceActive callback SUccess,返回值: ${value}`;
        });
    }
    isCommunicationDeviceActivePromise() {
        let _this = this;
        this.audioRoutingManager.isCommunicationDeviceActive(this.selectedCommunicationDeviceVal)
            .then(value => {
            _this.returnMsg = `isCommunicationDeviceActive promise SUccess,返回值: ${value}`;
        }).catch(err => {
            _this.returnMsg = `isCommunicationDeviceActive promise Failed error ${JSON.stringify(err)}`;
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
        Text.create("【路由管理-通讯设备】返回数据：");
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
        Text.create("通讯设备：");
        Text.fontSize(24);
        Text.pop();
        Select.create(this.CommunicationDeviceTypeList);
        Select.value(this.selectedCommunicationDeviceKey);
        Select.onSelect((index, value) => {
            this.selectedCommunicationDeviceVal = audio.CommunicationDeviceType[value];
            this.selectedCommunicationDeviceKey = value;
        });
        Select.height(80);
        Select.pop();
        Row.pop();
        Row.create();
        Text.create("是否激活");
        Text.fontSize(24);
        Text.pop();
        Radio.create({ value: 'active1', group: "activeGroup" });
        Radio.onChange((isChecked) => {
            if (isChecked) {
                this.active = true;
            }
            else {
                this.active = false;
            }
        });
        Radio.checked(this.active == true);
        Text.create("激活");
        Text.fontSize(18);
        Text.pop();
        Radio.create({ value: 'active2', group: "activeGroup" });
        Radio.onChange((isChecked) => {
            if (isChecked) {
                this.active = false;
            }
            else {
                this.active = true;
            }
        });
        Radio.checked(this.active == false);
        Text.create("取消激活");
        Text.fontSize(18);
        Text.pop();
        Row.pop();
        Row.create();
        Text.create("激活数据：" + this.active);
        Text.fontSize(24);
        Text.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Button.createWithChild();
        Button.width('90%');
        Button.height(80);
        Button.onClick(() => this.setCommunicationDeviceCallback());
        Text.create("setCommunicationDevice callback");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Button.createWithChild();
        Button.width('90%');
        Button.height(80);
        Button.onClick(() => this.setCommunicationDevicePromise());
        Text.create("setCommunicationDevice promise");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Button.createWithChild();
        Button.width('90%');
        Button.height(80);
        Button.onClick(() => this.isCommunicationDeviceActiveCallback());
        Text.create("isCommunicationDeviceActive callback");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Button.createWithChild();
        Button.width('90%');
        Button.height(80);
        Button.onClick(() => this.isCommunicationDeviceActivePromise());
        Text.create("isCommunicationDeviceActive promise");
        Text.fontSize(22);
        Text.fontColor(Color.White);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Row.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
}
loadDocument(new CommunicationDevice("1", undefined, {}));
