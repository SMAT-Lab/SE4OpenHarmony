interface Index_Params {
    data?: Item[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
import router from '@ohos.router';
interface Item {
    name: string;
    path: string;
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.data = [
            { name: "SimpleRule", path: "pages/SimpleRule" },
            { name: "MultipleRules", path: "pages/MultipleRules" },
            { name: "CascadingRules", path: "pages/CascadingRules" },
            { name: "PrioritizedRules", path: "pages/PrioritizedRules" },
            { name: "RecurssionWithRules", path: "pages/RecurssionWithRules" },
            { name: "MoreRulesAndFacts", path: "pages/MoreRulesAndFacts" }
        ];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.data !== undefined) {
            this.data = params.data;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    public data: Item[];
    BuildEntryItem(item: Item, parent = null) {
        Text.create(item.name);
        Text.width("90%");
        Text.height(50);
        Text.backgroundColor(0xCCCCCC);
        Text.borderRadius(15);
        Text.fontSize(16);
        Text.textAlign(TextAlign.Center);
        Text.margin({ top: 10 });
        Text.onClick(() => {
            router.pushUrl({ url: item.path });
        });
        Text.pop();
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        ForEach.create("2", this, ObservedObject.GetRawObject(this.data), (v: Item) => {
            this.BuildEntryItem(v, this);
        });
        ForEach.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
