interface TestCell_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TestCell_" + ++__generate__Id;
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
import { Cell, Cell_group } from 'easyui';
import router from '@ohos.router';
class TestCell extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TestCell_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Scroll.create();
        Scroll.backgroundColor("#ffe5e5e5");
        Column.create();
        Column.width("100%");
        Text.create("基础用法");
        Text.alignSelf(ItemAlign.Start);
        Text.margin(20);
        Text.pop();
        Text.create("单元格大小");
        Text.alignSelf(ItemAlign.Start);
        Text.margin(20);
        Text.pop();
        Text.create("展示图标");
        Text.alignSelf(ItemAlign.Start);
        Text.margin(20);
        Text.pop();
        Text.create("只设置value");
        Text.alignSelf(ItemAlign.Start);
        Text.margin(20);
        Text.pop();
        Text.create("展示箭头");
        Text.alignSelf(ItemAlign.Start);
        Text.margin(20);
        Text.pop();
        Text.create("页面跳转");
        Text.alignSelf(ItemAlign.Start);
        Text.margin(20);
        Text.pop();
        Text.create("分组标题");
        Text.alignSelf(ItemAlign.Start);
        Text.margin(20);
        Text.pop();
        Text.create("高级用法");
        Text.alignSelf(ItemAlign.Start);
        Text.margin(20);
        Text.pop();
        Column.pop();
        Scroll.pop();
    }
}
loadDocument(new TestCell("1", undefined, {}));
