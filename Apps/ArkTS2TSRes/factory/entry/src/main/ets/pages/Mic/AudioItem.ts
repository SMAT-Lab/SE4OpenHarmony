interface AudioItem_Params {
    record?: Record;
    translateLeft?: number;
    translateRight?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "AudioItem_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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
 */
import DateTimeUtil from '../../model/DateTimeUtil';
import Logger from '../../model/Logger';
import { Record } from './Record';
const TAG = '[Recorder.AudioItem]';
const TRANSLATE: number = -145;
export class AudioItem extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__record = new SynchedPropertyObjectTwoWay(params.record, this, "record");
        this.__translateLeft = new ObservedPropertySimple(0, this, "translateLeft");
        this.__translateRight = new ObservedPropertySimple(TRANSLATE, this, "translateRight");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AudioItem_Params) {
        if (params.translateLeft !== undefined) {
            this.translateLeft = params.translateLeft;
        }
        if (params.translateRight !== undefined) {
            this.translateRight = params.translateRight;
        }
    }
    aboutToBeDeleted() {
        this.__record.aboutToBeDeleted();
        this.__translateLeft.aboutToBeDeleted();
        this.__translateRight.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __record: SynchedPropertySimpleOneWay<Record>;
    get record() {
        return this.__record.get();
    }
    set record(newValue: Record) {
        this.__record.set(newValue);
    }
    private __translateLeft: ObservedPropertySimple<number>;
    get translateLeft() {
        return this.__translateLeft.get();
    }
    set translateLeft(newValue: number) {
        this.__translateLeft.set(newValue);
    }
    private __translateRight: ObservedPropertySimple<number>;
    get translateRight() {
        return this.__translateRight.get();
    }
    set translateRight(newValue: number) {
        this.__translateRight.set(newValue);
    }
    getTimeString() {
        let date = new Date(this.record.fileAsset.dateAdded * 1000);
        let dateTimeUtil = new DateTimeUtil();
        return `${date.getFullYear()}/${dateTimeUtil.fill(date.getMonth() + 1)}/${dateTimeUtil.fill(date.getDate())}`;
    }
    render() {
        Row.create();
        Row.width('100%');
        Row.height('15%');
        Row.constraintSize({ minHeight: 100 });
        Row.translate({ x: this.translateLeft, y: 0 });
        Row.create();
        Row.width('100%');
        Row.padding({ top: 10, bottom: 10, left: 10, right: 10 });
        Row.margin({ top: 15, right: 15 });
        Row.backgroundColor('#FFFFFF');
        Row.borderRadius(20);
        Column.create();
        Column.size({ width: '80%', height: '100%' });
        Column.alignItems(HorizontalAlign.Start);
        Column.justifyContent(FlexAlign.Center);
        Text.create(this.record.title);
        Text.fontSize(22);
        Text.fontColor(Color.Black);
        Text.pop();
        Text.create(this.getTimeString());
        Text.fontSize(20);
        Text.fontColor(Color.Gray);
        Text.margin({ top: 10 });
        Text.pop();
        Column.pop();
        Row.create();
        Row.width('20%');
        Row.justifyContent(FlexAlign.End);
        Text.create(this.record.duration);
        Text.fontSize(20);
        Text.fontColor(Color.Gray);
        Text.pop();
        Row.pop();
        Row.pop();
        Row.pop();
    }
}
