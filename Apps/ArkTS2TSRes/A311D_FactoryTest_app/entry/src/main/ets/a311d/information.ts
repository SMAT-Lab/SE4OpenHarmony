interface information_Params {
    in?: number;
    infValue?: string[];
    message?: string;
    infName?: string[];
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
import systemparameter from '@ohos.systemParameterEnhance';
import wifiManager from '@ohos.wifiManager';
export class btn {
    btnName: string = '';
    isPass: boolean = false;
}
export class information extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__in = new ObservedPropertySimple(1, this, "in");
        this.__infValue = new ObservedPropertyObject([], this, "infValue");
        this.message = '九联开发板厂测程序';
        this.infName = ['厂测版本：', '硬件版本：', 'mac地址：', '系统版本：'];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: information_Params) {
        if (params.in !== undefined) {
            this.in = params.in;
        }
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
        this.__in.aboutToBeDeleted();
        this.__infValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __in: ObservedPropertySimple<number>;
    get in() {
        return this.__in.get();
    }
    set in(newValue: number) {
        this.__in.set(newValue);
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
    getSystemParam(param: string, index: number) {
        try {
            systemparameter.get(param).then((value) => {
                this.infValue[index] = value;
                console.log("get test.parameter.key success: " + this.infValue[index]);
            }).catch((err) => {
                console.log("get test.parameter.key error: " + err.code);
            });
        }
        catch (e) {
            console.log("get unexpected error: " + e);
        }
    }
    getMacAddress() {
        try {
            let ret = wifiManager.getDeviceMacAddress().toString();
            this.infValue[2] = ret.toString();
            console.info("deviceMacAddress:" + JSON.stringify(ret));
        }
        catch (error) {
            console.error("failed:" + JSON.stringify(error));
        }
    }
    setFactoryVersion(version: string) {
        this.infValue[0] = version;
    }
    aboutToAppear() {
        this.getMacAddress();
        this.setFactoryVersion('20230828');
        this.getSystemParam('ohos.boot.hardware', 1);
        this.getSystemParam('const.ohos.fullname', 3);
    }
    render() {
        Column.create();
        Column.width('100%');
        Text.create(this.message);
        Text.fontSize(30);
        Text.margin({ bottom: 20 });
        Text.pop();
        Grid.create();
        Grid.columnsTemplate("1fr 1fr");
        Grid.columnsGap(10);
        Grid.rowsGap(10);
        Grid.width('100%');
        Grid.height('20%');
        ForEach.create("2", this, ObservedObject.GetRawObject(this.infName), (item, index) => {
            GridItem.create();
            Text.create(this.infName[index] + this.infValue[index]);
            Text.fontSize(20);
            Text.width('100%');
            Text.pop();
            GridItem.pop();
        });
        ForEach.pop();
        Grid.pop();
        Column.pop();
    }
}
