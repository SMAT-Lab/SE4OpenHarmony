interface TestRadio_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TestRadio_" + ++__generate__Id;
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
import { Radio_default } from 'easyui';
import { Radio_disabled } from 'easyui';
import { Radio_color } from 'easyui';
import { Radio_icon } from 'easyui';
import { Radio_cell } from 'easyui';
class TestRadio extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TestRadio_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Scroll.create();
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBarColor(Color.Gray);
        Scroll.scrollBarWidth(5);
        Scroll.scrollBar(BarState.Auto);
        Scroll.height("100%");
        Scroll.align(Alignment.Top);
        Column.create();
        Column.create({ space: 5 });
        Text.create("Radio基础用法");
        Text.fontSize(25);
        Text.width("100%");
        Text.height(30);
        Text.margin({ left: 10, top: 10 });
        Text.align(Alignment.Start);
        Text.pop();
        Column.create();
        Column.width("100%");
        Column.margin({ left: 10 });
        Column.pop();
        Column.pop();
        Column.create({ space: 5 });
        Text.create("Radio禁用状态");
        Text.fontSize(25);
        Text.width("100%");
        Text.height(30);
        Text.margin({ left: 10, top: 10 });
        Text.align(Alignment.Start);
        Text.pop();
        Column.create();
        Column.width("100%");
        Column.margin({ left: 10 });
        Column.pop();
        Column.pop();
        Column.create({ space: 5 });
        Text.create("Radio自定义颜色");
        Text.fontSize(25);
        Text.width("100%");
        Text.height(30);
        Text.margin({ left: 10, top: 10 });
        Text.align(Alignment.Start);
        Text.pop();
        Column.create();
        Column.width("100%");
        Column.margin({ left: 10 });
        Column.pop();
        Column.pop();
        Column.create({ space: 5 });
        Text.create("Radio自定义图标");
        Text.fontSize(25);
        Text.width("100%");
        Text.height(30);
        Text.margin({ left: 10, top: 10 });
        Text.align(Alignment.Start);
        Text.pop();
        Column.create();
        Column.width("100%");
        Column.margin({ left: 10 });
        Column.pop();
        Column.pop();
        Column.create({ space: 5 });
        Text.create("Radio+cell");
        Text.fontSize(25);
        Text.width("100%");
        Text.height(30);
        Text.margin({ left: 10, top: 10 });
        Text.align(Alignment.Start);
        Text.pop();
        Column.create();
        Column.width("100%");
        Column.margin({ left: 10 });
        Column.pop();
        Column.pop();
        Column.pop();
        Scroll.pop();
    }
}
loadDocument(new TestRadio("1", undefined, {}));
