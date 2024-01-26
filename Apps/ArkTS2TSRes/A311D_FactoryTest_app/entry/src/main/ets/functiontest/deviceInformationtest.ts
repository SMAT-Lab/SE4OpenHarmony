interface deviceInformationtest_Params {
    infValue?: string[];
    message?: string;
    infName?: string[];
    myDeviceInfos?: deviceInfos;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "deviceInformationtest_" + ++__generate__Id;
}
/*
 * Copyright 2023 Unionman Technology Co., Ltd.
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
import { deviceInfos } from './model/deviceInfos';
import statvfs from '@ohos.file.statvfs';
export class btn {
    btnName: string = '';
    isPass: boolean = false;
}
export class deviceInformationtest extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__infValue = new ObservedPropertyObject([], this, "infValue");
        this.message = '设备信息';
        this.infName = ['系统版本：', '系统软件API版本：', '硬件版本号：', '设备类型：', '产品版本：', 'cpu频率：', 'cpu型号：', '内存容量：', '存储容量：', '剩余存储容量：'];
        this.myDeviceInfos = new deviceInfos();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: deviceInformationtest_Params) {
        if (params.infValue !== undefined) {
            this.infValue = params.infValue;
        }
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.infName !== undefined) {
            this.infName = params.infName;
        }
        if (params.myDeviceInfos !== undefined) {
            this.myDeviceInfos = params.myDeviceInfos;
        }
    }
    aboutToBeDeleted() {
        this.__infValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __infValue: ObservedPropertyObject<string[]>;
    get infValue() {
        return this.__infValue.get();
    }
    set infValue(newValue: string[]) {
        this.__infValue.set(newValue);
    }
    private message: string;
    private infName: string[];
    private myDeviceInfos: deviceInfos;
    async aboutToAppear() {
        await this.myDeviceInfos.init();
        this.infValue.push(this.myDeviceInfos.osFullName);
        this.infValue.push(this.myDeviceInfos.sdkApiVersion);
        this.infValue.push(this.myDeviceInfos.hardwareModel);
        this.infValue.push(this.myDeviceInfos.displayVersion);
        this.infValue.push(this.myDeviceInfos.deviceType);
        this.infValue.push(this.myDeviceInfos.cpuFrequency);
        this.infValue.push(this.myDeviceInfos.cpuModule);
        this.infValue.push(this.myDeviceInfos.memCapacity);
        this.infValue.push(this.myDeviceInfos.stoCapacity);
        this.infValue.push(this.myDeviceInfos.freeCapacity);
    }
    render() {
        Scroll.create();
        Column.create();
        Column.width('100%');
        Column.constraintSize({ minHeight: '100%' });
        Text.create(this.message);
        Text.fontSize(30);
        Text.margin({ bottom: 20 });
        Text.pop();
        ForEach.create("2", this, ObservedObject.GetRawObject(this.infName), (item, index) => {
            Text.create(this.infName[index] + this.infValue[index]);
            Text.fontSize(20);
            Text.width('100%');
            Text.textAlign(TextAlign.Center);
            Text.pop();
        });
        ForEach.pop();
        Column.pop();
        Scroll.pop();
    }
}
