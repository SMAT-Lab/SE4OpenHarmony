interface TestSwitch_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TestSwitch_" + ++__generate__Id;
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
import { Switch, Switch_textLeft, Switch_textRight, Switch_inline, Switch_disable_on, Switch_disable_off } from "easyui";
class TestSwitch extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TestSwitch_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Column.create();
        Text.create("普通开关组件");
        Text.margin({ top: 20, bottom: 10 });
        Text.pop();
        Text.create("文字左/右对齐开关组件");
        Text.margin({ top: 20, bottom: 10 });
        Text.pop();
        Text.create("内联开关组件");
        Text.margin({ top: 20, bottom: 10 });
        Text.pop();
        Text.create("禁用开关组件");
        Text.margin({ top: 20, bottom: 10 });
        Text.pop();
        Column.pop();
    }
}
loadDocument(new TestSwitch("1", undefined, {}));
