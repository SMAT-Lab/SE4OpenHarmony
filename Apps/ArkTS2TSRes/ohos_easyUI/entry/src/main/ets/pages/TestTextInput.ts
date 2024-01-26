interface TestTextInput_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TestTextInput_" + ++__generate__Id;
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
import { TextInput_icon } from "easyui";
import { TextInput_label } from "easyui";
import { TextInput_search } from "easyui";
import { TextInput_disabled } from "easyui";
class TestTextInput extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TestTextInput_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Column.create();
        Text.create("(1)带图标");
        Text.fontSize(20);
        Text.margin({ top: 20 });
        Text.pop();
        Text.create("(2)带标签");
        Text.fontSize(20);
        Text.margin({ top: 20 });
        Text.pop();
        Text.create("(3)搜索框");
        Text.fontSize(20);
        Text.margin({ top: 20 });
        Text.pop();
        Text.create("(4)禁用");
        Text.fontSize(20);
        Text.margin({ top: 20 });
        Text.pop();
        Column.pop();
    }
}
loadDocument(new TestTextInput("1", undefined, {}));
