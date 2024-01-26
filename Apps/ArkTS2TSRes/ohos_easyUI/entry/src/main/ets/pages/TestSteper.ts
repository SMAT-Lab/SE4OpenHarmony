interface TestStepper_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TestSteper_" + ++__generate__Id;
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
import { steper } from 'easyui';
class TestStepper extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TestStepper_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Column.create();
        Column.padding(10);
        Column.width("100%");
        Column.height("100%");
        Text.create("基础用法");
        Text.alignSelf(ItemAlign.Start);
        Text.margin({ bottom: 20, top: 20 });
        Text.pop();
        Text.create("禁用状态");
        Text.alignSelf(ItemAlign.Start);
        Text.margin({ bottom: 20, top: 20 });
        Text.pop();
        Text.create("异步变更");
        Text.alignSelf(ItemAlign.Start);
        Text.margin({ bottom: 20, top: 20 });
        Text.pop();
        Text.create("高级用法");
        Text.alignSelf(ItemAlign.Start);
        Text.margin({ bottom: 20, top: 20 });
        Text.pop();
        Column.pop();
    }
}
loadDocument(new TestStepper("1", undefined, {}));
