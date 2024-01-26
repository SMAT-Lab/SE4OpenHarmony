interface ItemList_Params {
    items?: Array<number>;
    aFieldValue?: string;
}
interface Communicate_Params {
    items?: Array<number>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CommunicateWithBinderPage_" + ++__generate__Id;
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
import prompt from '@system.prompt';
import { TitleBar } from '../common/TitleBar';
class Communicate extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.items = [];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Communicate_Params) {
        if (params.items !== undefined) {
            this.items = params.items;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private items: Array<number>;
    aboutToAppear() {
        let num: number = 0;
        while (num < 20) {
            this.items.push(num);
            num++;
        }
    }
    render() {
        Column.create();
        let earlierCreatedChild_2: ItemList = (this && this.findChildById) ? this.findChildById("2") as ItemList : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new ItemList("2", this, { items: this.items, aFieldValue: 'aFieldValue of SimplePage' }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                items: this.items, aFieldValue: 'aFieldValue of SimplePage'
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        Column.pop();
    }
}
class ItemList extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.items = [];
        this.aFieldValue = '';
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ItemList_Params) {
        if (params.items !== undefined) {
            this.items = params.items;
        }
        if (params.aFieldValue !== undefined) {
            this.aFieldValue = params.aFieldValue;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private items: Array<number>;
    private aFieldValue: string;
    render() {
        Column.create();
        let earlierCreatedChild_3: TitleBar = (this && this.findChildById) ? this.findChildById("3") as TitleBar : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new TitleBar("3", this, {}));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({});
            if (!earlierCreatedChild_3.needsUpdate()) {
                earlierCreatedChild_3.markStatic();
            }
            View.create(earlierCreatedChild_3);
        }
        List.create({ space: 5, initialIndex: 0 });
        List.height('94%');
        List.width('100%');
        ForEach.create("4", this, ObservedObject.GetRawObject(this.items), (item: number) => {
            ListItem.create();
            ListItem.onClick(event => {
                prompt.showToast({
                    message: "item's value: " + item + ", aValueFromOutside:" + this.aFieldValue,
                    bottom: '10%'
                });
            });
            Column.create();
            Column.width('100%');
            Column.alignItems(HorizontalAlign.Center);
            Column.create();
            Column.width('100%');
            Column.alignItems(HorizontalAlign.Center);
            Text.create(item + '');
            Text.fontSize(14);
            Text.padding(16);
            Text.border({ width: 2 });
            Text.pop();
            Column.pop();
            Column.pop();
            ListItem.pop();
        }, (item: string) => item + '');
        ForEach.pop();
        List.pop();
        Column.pop();
    }
}
loadDocument(new Communicate("1", undefined, {}));
