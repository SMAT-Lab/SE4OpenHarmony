interface sensorSample_Params {
    myIntensity?: string;
    isDistance?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "sensor_" + ++__generate__Id;
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
import sensor from '@ohos.sensor';
import { TitleBar } from '../../common/TitleBar';
import Logger from '../../model/Logger';
const TAG = 'sensorSample';
export class sensorSample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__myIntensity = new ObservedPropertySimple('0', this, "myIntensity");
        this.__isDistance = new ObservedPropertySimple(1, this, "isDistance");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: sensorSample_Params) {
        if (params.myIntensity !== undefined) {
            this.myIntensity = params.myIntensity;
        }
        if (params.isDistance !== undefined) {
            this.isDistance = params.isDistance;
        }
    }
    aboutToBeDeleted() {
        this.__myIntensity.aboutToBeDeleted();
        this.__isDistance.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __myIntensity: ObservedPropertySimple<string>;
    get myIntensity() {
        return this.__myIntensity.get();
    }
    set myIntensity(newValue: string) {
        this.__myIntensity.set(newValue);
    }
    private __isDistance: ObservedPropertySimple<number>;
    get isDistance() {
        return this.__isDistance.get();
    }
    set isDistance(newValue: number) {
        this.__isDistance.set(newValue);
    }
    aboutToAppear() {
        // 环境光强度
        try {
            sensor.on(sensor.SensorId.AMBIENT_LIGHT, (data) => {
                this.myIntensity = data.intensity.toFixed(2);
                Logger.info(TAG, 'The ambient light intensity: ' + data.intensity);
            }, { interval: 3000000000 });
        }
        catch (err) {
            Logger.error(TAG, 'On fail, errCode: ' + err.code + ' ,msg: ' + err.message);
        }
        // 接近光程度
        try {
            sensor.on(sensor.SensorId.PROXIMITY, (data) => {
                this.isDistance = data.distance;
                console.info('Distance: ' + data.distance);
            }, { interval: 3000000000 });
        }
        catch (err) {
            console.error('On fail, errCode: ' + err.code + ' ,msg: ' + err.message);
        }
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        let earlierCreatedChild_2: TitleBar = (this && this.findChildById) ? this.findChildById("2") as TitleBar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new TitleBar("2", this, { title: '光感测试' }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                title: '光感测试'
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        Column.create({ space: 10 });
        Column.layoutWeight(1);
        Column.width('100%');
        Column.padding(20);
        Text.create("说明: 该测试项对设备感光进行测试，将设备放置于明暗环境下，光感数值有明确变化为测试成功。\n注意: 光线传感器位于摄像头右边");
        Text.pop();
        Column.create();
        Column.layoutWeight(1);
        Column.width('100%');
        Column.backgroundColor('#fff3f0f0');
        Column.justifyContent(FlexAlign.Center);
        Row.create();
        Text.create("设备周围光线强度：");
        Text.pop();
        Text.create(this.myIntensity);
        Text.fontSize(50);
        Text.pop();
        Text.create("  lx");
        Text.pop();
        Row.pop();
        Row.create();
        Text.create("物体与设备显示器");
        Text.pop();
        Text.create(this.isDistance == 0 ? "接近" : "远离");
        Text.fontSize(50);
        Text.pop();
        Row.pop();
        Column.pop();
        Column.pop();
        Column.pop();
    }
}
loadDocument(new sensorSample("1", undefined, {}));
