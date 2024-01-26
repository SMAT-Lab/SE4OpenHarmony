interface Payload_Params {
    items?: Array<string>;
    downTime?: number;
    upTime?: number;
}
interface TestPayloadPage_Params {
    items?: Array<string>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TestPayloadPage_" + ++__generate__Id;
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
import { TitleBar } from '../common/TitleBar';
class TestPayloadPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__items = new ObservedPropertyObject([], this, "items");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TestPayloadPage_Params) {
        if (params.items !== undefined) {
            this.items = params.items;
        }
    }
    aboutToBeDeleted() {
        this.__items.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __items: ObservedPropertyObject<Array<string>>;
    get items() {
        return this.__items.get();
    }
    set items(newValue: Array<string>) {
        this.__items.set(newValue);
    }
    aboutToAppear() {
        let num = 0;
        while (num < 30) {
            this.items.push('1000' + num);
            num++;
        }
    }
    render() {
        Column.create();
        let earlierCreatedChild_2: TitleBar = (this && this.findChildById) ? this.findChildById("2") as TitleBar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new TitleBar("2", this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        let earlierCreatedChild_3: Payload = (this && this.findChildById) ? this.findChildById("3") as Payload : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new Payload("3", this, { items: this.__items }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({});
            View.create(earlierCreatedChild_3);
        }
        Column.pop();
    }
}
class Payload extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__items = new SynchedPropertyObjectTwoWay(params.items, this, "items");
        this.downTime = 0;
        this.upTime = 0;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Payload_Params) {
        if (params.downTime !== undefined) {
            this.downTime = params.downTime;
        }
        if (params.upTime !== undefined) {
            this.upTime = params.upTime;
        }
    }
    aboutToBeDeleted() {
        this.__items.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __items: SynchedPropertySimpleOneWay<Array<string>>;
    get items() {
        return this.__items.get();
    }
    set items(newValue: Array<string>) {
        this.__items.set(newValue);
    }
    private downTime: number;
    private upTime: number;
    render() {
        List.create();
        List.divider({ strokeWidth: 1, color: '#BBBBBB' });
        List.height('94%');
        List.backgroundColor('#CCCCCC');
        ForEach.create("4", this, ObservedObject.GetRawObject(this.items), (item: number, index: number) => {
            ListItem.create();
            ListItem.margin(15);
            ListItem.onClick(event => {
                this.items[index] = 'Just update the first text: la la la (payload)';
                this.items.concat([]);
            });
            ListItem.onTouch((event: TouchEvent) => {
                if (event.type === TouchType.Down) {
                    this.downTime = new Date().getTime();
                }
                if (event.type === TouchType.Up) {
                    this.upTime = new Date().getTime();
                    if (this.upTime - this.downTime > 1500) {
                        this.items[index] = 'full full full';
                        this.items.concat([]);
                    }
                }
            });
            Column.create({ space: 10 });
            Column.alignItems(HorizontalAlign.Start);
            Column.height('100');
            Text.create(item + '');
            Text.fontSize(16);
            Text.fontColor(Color.Gray);
            Text.pop();
            Text.create('0002');
            Text.fontSize(16);
            Text.fontColor(Color.Gray);
            Text.pop();
            Text.create('0003');
            Text.fontSize(16);
            Text.fontColor(Color.Gray);
            Text.pop();
            Text.create('currentTimeMillis: ' + new Date().getTime());
            Text.fontSize(16);
            Text.fontColor(Color.Gray);
            Text.pop();
            Column.pop();
            ListItem.pop();
        }, (item: string) => item.toString());
        ForEach.pop();
        List.pop();
    }
}
loadDocument(new TestPayloadPage("1", undefined, {}));
