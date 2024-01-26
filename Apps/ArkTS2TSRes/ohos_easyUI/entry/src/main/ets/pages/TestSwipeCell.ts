interface TextSearch_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TestSwipeCell_" + ++__generate__Id;
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
import { SwipeCell_async, SwipeCell_default } from 'easyui';
class TextSearch extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TextSearch_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Column.create({ space: 20 });
        Column.backgroundColor("#ffdddddd");
        Column.height("100%");
        Column.width("100%");
        Text.create("SwipeCell基础用法");
        Text.fontSize(25);
        Text.width("100%");
        Text.height(30);
        Text.margin({ left: 10, top: 10 });
        Text.align(Alignment.Start);
        Text.pop();
        Text.create("SwipeCell异步删除");
        Text.fontSize(25);
        Text.width("100%");
        Text.height(30);
        Text.margin({ left: 10, top: 10 });
        Text.align(Alignment.Start);
        Text.pop();
        Column.pop();
    }
}
loadDocument(new TextSearch("1", undefined, {}));
