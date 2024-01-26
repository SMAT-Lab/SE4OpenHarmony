interface TestAlert_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TestAlert_" + ++__generate__Id;
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
import { Alert_emotion, Alert_emotion_icon_block } from "easyui";
import { Alert_emotion_icon } from "easyui";
import { Alert_emotion_icon_inverse } from "easyui";
import { Alert_close } from "easyui";
class TestAlert extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TestAlert_Params) {
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
        Column.create({ space: 10 });
        Text.create("(1)感情色彩");
        Text.fontSize(20);
        Text.height("50");
        Text.pop();
        Column.create();
        Column.width("100%");
        Column.pop();
        Column.create();
        Column.width("100%");
        Column.pop();
        Column.create();
        Column.width("100%");
        Column.pop();
        Column.create();
        Column.width("100%");
        Column.pop();
        Column.create();
        Column.width("100%");
        Column.pop();
        Column.create();
        Column.width("100%");
        Column.pop();
        Text.create("(2)感情色彩+图标");
        Text.fontSize(20);
        Text.height("50");
        Text.pop();
        Column.create();
        Column.width("100%");
        Column.pop();
        Column.create();
        Column.width("100%");
        Column.pop();
        Column.create();
        Column.width("100%");
        Column.pop();
        Column.create();
        Column.width("100%");
        Column.pop();
        Column.create();
        Column.width("100%");
        Column.pop();
        Column.create();
        Column.width("100%");
        Column.pop();
        Text.create("(3)感情色彩+图标+反色主题");
        Text.fontSize(20);
        Text.height("50");
        Text.pop();
        Column.create();
        Column.width("100%");
        Column.pop();
        Column.create();
        Column.width("100%");
        Column.pop();
        Column.create();
        Column.width("100%");
        Column.pop();
        Column.create();
        Column.width("100%");
        Column.pop();
        Column.create();
        Column.width("100%");
        Column.pop();
        Column.create();
        Column.width("100%");
        Column.pop();
        Text.create("(4)块级消息");
        Text.fontSize(20);
        Text.height("50");
        Text.pop();
        Column.create();
        Column.width("100%");
        Column.pop();
        Column.create();
        Column.width("100%");
        Column.pop();
        Column.create();
        Column.width("100%");
        Column.pop();
        Column.create();
        Column.width("100%");
        Column.pop();
        Text.create("(5)可关闭的消息框");
        Text.fontSize(20);
        Text.height("50");
        Text.pop();
        Column.create();
        Column.width("100%");
        Column.pop();
        Column.create();
        Column.width("100%");
        Column.pop();
        Column.pop();
        Scroll.pop();
    }
}
loadDocument(new TestAlert("1", undefined, {}));
