interface Setting_Params {
    deviceLists?: Array<deviceManager.DeviceInfo>;
    continuationMode?: string;
    remoteDeviceModel?: RemoteDeviceModel;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Settings_" + ++__generate__Id;
}
/*
 * Copyright 2023 Unionman Technology Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import router from '@ohos.router';
import preferences from '@ohos.data.preferences';
import deviceManager from '@ohos.distributedHardware.deviceManager';
import { RemoteDeviceModel } from '../model/RemoteDeviceModel';
import Logger from '../model/Logger';
const TAG: string = 'Setting';
const PREFERENCES_NAME = 'setting';
let preferenceSetting: preferences.Preferences = null;
class Setting extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__deviceLists = new ObservedPropertyObject([], this, "deviceLists");
        this.__continuationMode = AppStorage.SetAndLink('continuationMode', 'continuation', this, "continuationMode");
        this.remoteDeviceModel = new RemoteDeviceModel();
        this.updateWithValueParams(params);
        this.declareWatch("continuationMode", this.continuationModeChange);
    }
    updateWithValueParams(params: Setting_Params) {
        if (params.deviceLists !== undefined) {
            this.deviceLists = params.deviceLists;
        }
        if (params.remoteDeviceModel !== undefined) {
            this.remoteDeviceModel = params.remoteDeviceModel;
        }
    }
    aboutToBeDeleted() {
        this.__deviceLists.aboutToBeDeleted();
        this.__continuationMode.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __deviceLists: ObservedPropertyObject<Array<deviceManager.DeviceInfo>>;
    get deviceLists() {
        return this.__deviceLists.get();
    }
    set deviceLists(newValue: Array<deviceManager.DeviceInfo>) {
        this.__deviceLists.set(newValue);
    }
    private __continuationMode: ObservedPropertyAbstract<string>;
    get continuationMode() {
        return this.__continuationMode.get();
    }
    set continuationMode(newValue: string) {
        this.__continuationMode.set(newValue);
    }
    private remoteDeviceModel: RemoteDeviceModel;
    async aboutToAppear() {
        preferenceSetting = await preferences.getPreferences(globalThis.context, PREFERENCES_NAME);
        this.remoteDeviceModel.registerDeviceListCallback(() => {
            Logger.info(TAG, 'registerDeviceListCallback, callback entered');
            this.deviceLists = this.remoteDeviceModel.deviceLists;
            Logger.info(TAG, `deviceLists.length${this.deviceLists.length}`);
        });
    }
    async continuationModeChange() {
        await preferenceSetting.put('continuationMode', this.continuationMode);
        await preferenceSetting.flush();
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.padding(10);
        Column.backgroundColor('#7F000000');
        Row.create();
        Row.width('100%');
        Row.height('8%');
        Row.constraintSize({ minHeight: 50 });
        Row.padding({ left: 10, right: 10 });
        Image.create($r("app.media.ic_back"));
        Image.id("settings_back");
        Image.width('8%');
        Image.height('50%');
        Image.margin({ right: 4 });
        Image.objectFit(ImageFit.Contain);
        Image.onClick(() => {
            router.back();
        });
        Text.create('设置');
        Text.fontColor(Color.White);
        Text.fontFamily('HarmonyHeiTi');
        Text.fontSize(20);
        Text.maxLines(1);
        Text.pop();
        Row.pop();
        Row.create({ space: 10 });
        Row.width('100%');
        Row.height(100);
        Row.padding(10);
        Row.borderRadius(20);
        Row.backgroundColor('#464646');
        Row.alignItems(VerticalAlign.Center);
        Text.create('流转模式');
        Text.fontColor(Color.White);
        Text.fontFamily('HarmonyHeiTi');
        Text.fontSize(20);
        Text.pop();
        Blank.create();
        Blank.pop();
        Radio.create({ value: 'continuation', group: 'continuationMode' });
        Radio.id("continuation");
        Radio.checked(this.continuationMode == 'continuation' ? true : false);
        Radio.height(25);
        Radio.width(25);
        Radio.onChange((isChecked: boolean) => {
            if (isChecked) {
                this.continuationMode = 'continuation';
            }
        });
        Text.create('跨端迁移');
        Text.fontColor(Color.White);
        Text.fontFamily('HarmonyHeiTi');
        Text.fontSize(20);
        Text.pop();
        Radio.create({ value: 'synchronization', group: 'continuationMode' });
        Radio.id("synchronization");
        Radio.checked(this.continuationMode == 'synchronization' ? true : false);
        Radio.height(25);
        Radio.width(25);
        Radio.onChange((isChecked: boolean) => {
            if (isChecked) {
                this.continuationMode = 'synchronization';
            }
        });
        Text.create('多端协同');
        Text.fontColor(Color.White);
        Text.fontFamily('HarmonyHeiTi');
        Text.fontSize(20);
        Text.pop();
        Row.pop();
        Row.create();
        Row.width('100%');
        Row.padding(10);
        Text.create('认证设备管理');
        Text.fontSize(16);
        Text.fontColor(Color.White);
        Text.pop();
        Row.pop();
        Scroll.create();
        Column.create();
        Column.constraintSize({ minHeight: '100%' });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.deviceLists), (item: deviceManager.DeviceInfo) => {
            Row.create();
            Row.width('100%');
            Row.height(80);
            Row.padding(10);
            Row.borderRadius(20);
            Row.backgroundColor('#464646');
            Row.alignItems(VerticalAlign.Center);
            Text.create(item.deviceName);
            Text.height('100%');
            Text.fontSize(20);
            Text.fontColor(Color.White);
            Text.fontFamily('HarmonyHeiTi');
            Text.pop();
            Blank.create();
            Blank.pop();
            Button.createWithLabel('解除认证');
            Button.onClick(() => {
                this.remoteDeviceModel.unAuthenticateDevice(item);
            });
            Button.pop();
            Row.pop();
        });
        ForEach.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
}
loadDocument(new Setting("1", undefined, {}));
