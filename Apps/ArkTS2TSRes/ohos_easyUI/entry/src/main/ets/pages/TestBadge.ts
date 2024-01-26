interface TestBadge_Params {
    badgeList?: {
        title: string;
        info: string;
    }[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TestBadge_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Institute of Software, Chinese Academy of Sciences.
 * Licensed under the Apache License,Version 2.0 (the "License");
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
import { BadgeGroup } from 'easyui';
class TestBadge extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.badgeList = [{ title: "标题名称", info: "" }, { title: "标题名称", info: "8" }, { title: "标题名称", info: "99" }, { title: "标题名称", info: "99+" }];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TestBadge_Params) {
        if (params.badgeList !== undefined) {
            this.badgeList = params.badgeList;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private badgeList: {
        title: string;
        info: string;
    }[];
    render() {
        Column.create();
        Column.width("100%");
        Column.height("100%");
        Column.backgroundColor("#ffe5e5e5");
        Text.create("基础用法");
        Text.fontColor("#ff6d6d6d");
        Text.alignSelf(ItemAlign.Start);
        Text.margin(20);
        Text.pop();
        Column.create();
        Column.width("90%");
        Column.backgroundColor("#ffffffff");
        Row.create();
        Row.height(400);
        Row.pop();
        Column.pop();
        Column.pop();
    }
}
loadDocument(new TestBadge("1", undefined, {}));
