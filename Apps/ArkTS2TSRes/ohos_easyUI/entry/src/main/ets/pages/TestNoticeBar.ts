interface TestNoticeBar_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TestNoticeBar_" + ++__generate__Id;
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
import { NoticeBar_default } from "easyui";
import { NoticeBar_bar } from "easyui";
import { NoticeBar_disabled } from "easyui";
import { NoticeBar_nextLine } from "easyui";
class TestNoticeBar extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TestNoticeBar_Params) {
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
        Text.create("NoticeBar基础用法");
        Text.fontSize(15);
        Text.width("100%");
        Text.height(30);
        Text.margin({ left: 10 });
        Text.align(Alignment.Start);
        Text.pop();
        Column.create();
        Column.width("100%");
        Column.pop();
        Column.pop();
        Column.create({ space: 5 });
        Text.create("NoticeBar通告栏模式");
        Text.fontSize(15);
        Text.width("100%");
        Text.height(30);
        Text.margin({ left: 10 });
        Text.align(Alignment.Start);
        Text.pop();
        Column.create();
        Column.width("100%");
        Column.pop();
        Column.create();
        Column.width("100%");
        Column.pop();
        Column.pop();
        Column.create({ space: 5 });
        Text.create("NoticeBar禁用滚动");
        Text.fontSize(15);
        Text.width("100%");
        Text.height(30);
        Text.margin({ left: 10 });
        Text.align(Alignment.Start);
        Text.pop();
        Column.create();
        Column.width("100%");
        Column.pop();
        Column.pop();
        Column.create({ space: 5 });
        Text.create("NoticeBar文本换行");
        Text.fontSize(15);
        Text.width("100%");
        Text.height(30);
        Text.margin({ left: 10 });
        Text.align(Alignment.Start);
        Text.pop();
        Column.create();
        Column.width("100%");
        Column.pop();
        Column.pop();
        Column.pop();
        Scroll.pop();
    }
}
loadDocument(new TestNoticeBar("1", undefined, {}));
