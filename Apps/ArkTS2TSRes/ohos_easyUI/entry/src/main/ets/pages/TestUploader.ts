interface TestUploader_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TestUploader_" + ++__generate__Id;
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
import { Uploader } from 'easyui';
class TestUploader extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TestUploader_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Column.create();
        Text.create("基础用法");
        Text.margin({ top: 20, left: 10, bottom: 20 });
        Text.alignSelf(ItemAlign.Start);
        Text.pop();
        Text.create("图片单选");
        Text.margin({ left: 10, bottom: 20 });
        Text.alignSelf(ItemAlign.Start);
        Text.pop();
        Text.create("图片多选");
        Text.margin({ left: 10, bottom: 20 });
        Text.alignSelf(ItemAlign.Start);
        Text.pop();
        Column.pop();
    }
}
loadDocument(new TestUploader("1", undefined, {}));
