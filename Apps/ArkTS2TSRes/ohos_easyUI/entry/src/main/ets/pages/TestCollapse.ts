interface TestCollapse_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TestCollapse_" + ++__generate__Id;
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
import { Collapse, Collapse_group, Collapse_panel } from "easyui";
class TestCollapse extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TestCollapse_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Column.create();
        Column.create();
        Column.margin({ bottom: 20 });
        Text.create("折叠组件");
        Text.pop();
        Flex.create();
        Flex.pop();
        Column.pop();
        Column.create();
        Column.margin({ bottom: 20 });
        Text.create("折叠分组");
        Text.pop();
        Flex.create();
        Flex.pop();
        Column.pop();
        Column.create();
        Text.create("面板折叠组");
        Text.pop();
        Flex.create();
        Flex.pop();
        Column.pop();
        Column.pop();
    }
}
loadDocument(new TestCollapse("1", undefined, {}));
