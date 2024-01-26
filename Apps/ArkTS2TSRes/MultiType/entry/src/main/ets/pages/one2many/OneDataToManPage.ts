interface OneDataToManPage_Params {
    items?: Array<itemsType>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "OneDataToManPage_" + ++__generate__Id;
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
import { MultiTypeAdapter } from '@ohos/multitype';
class OneDataToManPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__items = new ObservedPropertyObject([], this, "items");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: OneDataToManPage_Params) {
        if (params.items !== undefined) {
            this.items = params.items;
        }
    }
    aboutToBeDeleted() {
        this.__items.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __items: ObservedPropertyObject<Array<itemsType>>;
    get items() {
        return this.__items.get();
    }
    set items(newValue: Array<itemsType>) {
        this.__items.set(newValue);
    }
    aboutToAppear() {
        let num: number = 0;
        while (num < 30) {
            if (num % 2 == 0) {
                this.items.push({ itemType: 1, id: num });
            }
            else {
                this.items.push({ itemType: 2, id: num });
            }
            num++;
        }
    }
    render() {
        Column.create();
        Column.height('94%');
        Column.width('100%');
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
        Column.pop();
    }
    MyListItem(arr: itemsType[], index: number, parent = null) {
        Column.create();
        Column.width('100%');
        Column.alignItems((arr[index].itemType == 1) ? HorizontalAlign.Start : HorizontalAlign.End);
        Text.create('title: ' + arr[index].id);
        Text.fontSize(16);
        Text.padding({ left: 15, right: 15, top: 15 });
        Text.pop();
        Column.pop();
    }
}
class itemsType {
    itemType: number = 0;
    id: number = 0;
}
loadDocument(new OneDataToManPage("1", undefined, {}));
