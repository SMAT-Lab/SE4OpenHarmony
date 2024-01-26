interface TestTag_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TestTag_" + ++__generate__Id;
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
import { Tag, TagSize, TagType } from 'easyui';
class TestTag extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TestTag_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    click() {
        console.log("这是点击事件测试的方法");
    }
    render() {
        Column.create();
        Column.width("100%");
        //基础用法
        Text.create("基础用法");
        //基础用法
        Text.margin(20);
        //基础用法
        Text.alignSelf(ItemAlign.Start);
        //基础用法
        Text.pop();
        Row.create();
        Row.margin({ left: 20, bottom: 20 });
        Row.alignSelf(ItemAlign.Start);
        Row.pop();
        //空心样式
        Text.create("空心样式");
        //空心样式
        Text.margin(20);
        //空心样式
        Text.alignSelf(ItemAlign.Start);
        //空心样式
        Text.pop();
        Row.create();
        Row.margin({ left: 20, bottom: 20 });
        Row.alignSelf(ItemAlign.Start);
        Row.pop();
        //圆角样式
        Text.create("圆角样式");
        //圆角样式
        Text.margin(20);
        //圆角样式
        Text.alignSelf(ItemAlign.Start);
        //圆角样式
        Text.pop();
        Row.create();
        Row.margin({ left: 20, bottom: 20 });
        Row.alignSelf(ItemAlign.Start);
        Row.pop();
        // 标记样式
        Text.create("标记样式");
        // 标记样式
        Text.margin(20);
        // 标记样式
        Text.alignSelf(ItemAlign.Start);
        // 标记样式
        Text.pop();
        Row.create();
        Row.margin({ left: 20, bottom: 20 });
        Row.alignSelf(ItemAlign.Start);
        Row.pop();
        //自定义颜色
        Text.create("自定义颜色");
        //自定义颜色
        Text.margin(20);
        //自定义颜色
        Text.alignSelf(ItemAlign.Start);
        //自定义颜色
        Text.pop();
        Row.create();
        Row.margin({ left: 20, bottom: 20 });
        Row.alignSelf(ItemAlign.Start);
        Row.pop();
        //自定义颜色
        Text.create("标签大小");
        //自定义颜色
        Text.margin(20);
        //自定义颜色
        Text.alignSelf(ItemAlign.Start);
        //自定义颜色
        Text.pop();
        Row.create();
        Row.margin({ left: 20, bottom: 20 });
        Row.alignSelf(ItemAlign.Start);
        Row.pop();
        Column.pop();
    }
}
loadDocument(new TestTag("1", undefined, {}));
