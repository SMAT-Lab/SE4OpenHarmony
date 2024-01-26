interface FlyRefreshStylePage_Params {
    model?: SmartRefreshForFlyRefresh.Model;
    mDataSet?: Array<ItemData>;
    index?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "FlyRefreshStylePage_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import { SmartRefreshForFlyRefresh } from "@ohos/smartrefreshlayout";
import { FlyRefreshHeader } from "@ohos/smartrefreshlayout";
class FlyRefreshStylePage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new SmartRefreshForFlyRefresh.Model().setBackgroundColor('white').setNoInit(true), this, "model");
        this.__mDataSet = new ObservedPropertyObject([], this, "mDataSet");
        this.index = 10;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: FlyRefreshStylePage_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.mDataSet !== undefined) {
            this.mDataSet = params.mDataSet;
        }
        if (params.index !== undefined) {
            this.index = params.index;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__mDataSet.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: ObservedPropertyObject<SmartRefreshForFlyRefresh.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: SmartRefreshForFlyRefresh.Model) {
        this.__model.set(newValue);
    }
    private __mDataSet: ObservedPropertyObject<Array<ItemData>>;
    get mDataSet() {
        return this.__mDataSet.get();
    }
    set mDataSet(newValue: Array<ItemData>) {
        this.__mDataSet.set(newValue);
    }
    private index: number;
    aboutToAppear() {
        this.mDataSet.push(new ItemData(1, 0xFF76A9FC, $r('app.media.ic_public_file'), "Meeting Minutes", new Date()));
        this.mDataSet.push(new ItemData(2, Color.Gray, $r('app.media.ic_public_folder'), "Meeting Minutes", new Date()));
        this.mDataSet.push(new ItemData(3, Color.Gray, $r('app.media.ic_public_folder'), "Meeting Minutes", new Date()));
        this.model.setRefreshCallback(() => {
            setTimeout(() => {
                this.index = this.index + 1;
                this.mDataSet.unshift(new ItemData(this.index, 0xFFFFC970, $r('app.media.ic_public_devices_phone'), "Meeting Minutes", new Date()));
            }, 3000);
        });
    }
    header(parent = null) {
    }
    content(parent = null) {
        Column.create();
        Column.margin({ top: 45 });
        Column.width("100%");
        ForEach.create("2", this, ObservedObject.GetRawObject(this.mDataSet), (item: ItemData) => {
            Row.create();
            Row.backgroundColor("white");
            Row.create();
            Row.backgroundColor(item.color);
            Row.borderRadius(40);
            Row.width(80);
            Row.height(80);
            Row.margin(15);
            Row.justifyContent(FlexAlign.Center);
            Image.create(item.icon);
            Image.width(45);
            Image.height(45);
            Row.pop();
            Column.create({ space: 10 });
            Column.alignItems(HorizontalAlign.Start);
            Column.layoutWeight(1);
            Text.create(item.title);
            Text.fontSize(24);
            Text.pop();
            Text.create(item.time.toDateString());
            Text.fontSize(22);
            Text.pop();
            Column.pop();
            Row.pop();
        }, (item: ItemData) => item.i.toString());
        ForEach.pop();
        Column.pop();
    }
    render() {
        Column.create();
        Column.pop();
    }
}
export class ItemData {
    i: number;
    color: number;
    icon: Resource;
    title: string;
    time: Date;
    constructor(i: number, color: number, icon: Resource, title: string, time: Date) {
        this.i = i;
        this.color = color;
        this.icon = icon;
        this.time = time;
        this.title = title;
    }
}
loadDocument(new FlyRefreshStylePage("1", undefined, {}));
