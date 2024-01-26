interface deviceInformationtest_Params {
    infValue?: string[];
    message?: string;
    infName?: string[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
import deviceInfo from '@ohos.deviceInfo';
import statvfs from '@ohos.file.statvfs';
import systemparameter from '@ohos.systemParameterEnhance';
export class btn {
    btnName: string = '';
    isPass: boolean = false;
}
export class deviceInformationtest extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__infValue = new ObservedPropertyObject([], this, "infValue");
        this.message = '设备信息';
        this.infName = ['系统版本：', '系统软件API版本：', '设备类型：', 'cpu频率：',
            'cpu型号：', '内存容量：', '存储容量：', '剩余存储容量：', '已使用存储容量：', '设备厂家名称：', '外部产品系列：', '产品系列：'];
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
    bytesToMB(bytes) { return bytes / (1024 * 1024); }
    async aboutToAppear() {
        let filesDir = globalThis.settingsAbilityContext.filesDir;
        // 存储容量
        let stoCapacityBite = await statvfs.getTotalSize(filesDir);
        let freeCapacityBite = await statvfs.getFreeSize(filesDir);
        this.infValue.push(deviceInfo.osFullName);
        this.infValue.push(await systemparameter.get('const.ohos.apiversion'));
        this.infValue.push(deviceInfo.deviceType);
        this.infValue.push("rk3566 rgo_am64v8a");
        this.infValue.push("rk3566 rgo_am64v8a");
        this.infValue.push("rk3566 rgo_am64v8a");
        this.infValue.push(this.bytesToMB(stoCapacityBite).toFixed(0) + 'M');
        this.infValue.push(this.bytesToMB(freeCapacityBite).toFixed(0) + 'M');
        this.infValue.push(this.bytesToMB(stoCapacityBite - freeCapacityBite).toFixed(0) + 'M');
        this.infValue.push(deviceInfo.manufacture);
        this.infValue.push(deviceInfo.marketName);
        this.infValue.push(deviceInfo.productSeries);
    }
    render() {
        Column.create();
        Scroll.create();
        Column.create();
        Column.width('100%');
        Column.constraintSize({ minHeight: '100%' });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.infName), (item, index) => {
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
loadDocument(new deviceInformationtest("1", undefined, {}));
