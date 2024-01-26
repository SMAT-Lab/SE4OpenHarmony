interface yarwardInformation_Params {
    infValue?: string[];
    message?: string;
    infName?: string[];
    myDeviceInfos?: deviceInfos;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "information_" + ++__generate__Id;
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
import { deviceInfos } from '../../model/deviceInfos';
import statvfs from '@ohos.file.statvfs';
import { GRAPHIC_TRANSFORMATION, TestButton } from '../testData';
import { TitleBar } from '../../common/TitleBar';
export class btn {
    btnName: string = '';
    isPass: boolean = false;
}
export class yarwardInformation extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__infValue = new ObservedPropertyObject([], this, "infValue");
        this.message = '设备信息';
        this.infName = ['系统版本：', '系统软件API版本：', '设备类型：', 'cpu频率：',
            'cpu型号：', '内存容量：', '存储容量：', '剩余存储容量：', '已使用存储容量：', '设备厂家名称：', '外部产品系列：', '产品系列：'];
        this.myDeviceInfos = new deviceInfos();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: yarwardInformation_Params) {
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
        this.infValue.push(this.myDeviceInfos.deviceType);
        this.infValue.push(this.myDeviceInfos.cpuFrequency);
        this.infValue.push("rk3566 rgo_am64v8a");
        this.infValue.push(this.myDeviceInfos.memCapacity);
        this.infValue.push(this.myDeviceInfos.stoCapacity);
        this.infValue.push(this.myDeviceInfos.freeCapacity);
        this.infValue.push(this.myDeviceInfos.usedCapacity);
        this.infValue.push(this.myDeviceInfos.manufacture);
        this.infValue.push(this.myDeviceInfos.marketName);
        this.infValue.push(this.myDeviceInfos.productSeries);
    }
    render() {
        Column.create();
        let earlierCreatedChild_2: TitleBar = (this && this.findChildById) ? this.findChildById("2") as TitleBar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new TitleBar("2", this, { title: '设备信息' }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                title: '设备信息'
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        Scroll.create();
        Column.create();
        Column.width('100%');
        Column.constraintSize({ minHeight: '100%' });
        ForEach.create("3", this, ObservedObject.GetRawObject(this.infName), (item, index) => {
            Row.create();
            Row.borderWidth({ bottom: 2 });
            Row.padding({ left: 30, right: 30 });
            Row.width('100%');
            Text.create(item);
            Text.fontSize(20);
            Text.height(50);
            Text.textAlign(TextAlign.Start);
            Text.width('50%');
            Text.pop();
            Text.create(this.infValue[index]);
            Text.fontSize(20);
            Text.height(50);
            Text.textAlign(TextAlign.Start);
            Text.width('50%');
            Text.pop();
            Row.pop();
        });
        ForEach.pop();
        Column.create();
        Column.margin({ bottom: 90 });
        Column.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
}
loadDocument(new yarwardInformation("1", undefined, {}));
