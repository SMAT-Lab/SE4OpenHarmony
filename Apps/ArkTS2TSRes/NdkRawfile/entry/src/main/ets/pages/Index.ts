interface Index_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var testNapi = globalThis.requireNapi("entry", true);
;
import resourceManager from '@ohos.resourceManager';
let rawfilelist: string[];
let rawfileContet: Uint8Array;
let rawfileDescriptor: resourceManager.RawFileDescriptor;
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    async aboutToAppear() {
        rawfilelist = testNapi.getFileList(getContext().resourceManager, ''); // 获取rawfile目录下的子目录和文件
        rawfileContet = testNapi.getRawFileContent(getContext().resourceManager, 'rawfile.txt');
        rawfileDescriptor = testNapi.getRawFileDescriptor(getContext().resourceManager, 'rawfile.txt');
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Text.create('getFileList = ' + rawfilelist);
        Text.id('get_file_list');
        Text.fontSize(30);
        Text.pop();
        Text.create('getRawFileContent = ' + rawfileContet);
        Text.id('get_raw_file_content');
        Text.fontSize(30);
        Text.pop();
        Text.create('rawfileDescriptor.fd = ' + rawfileDescriptor.fd);
        Text.fontSize(30);
        Text.pop();
        Text.create('rawfileDescriptor.offset = ' + rawfileDescriptor.offset);
        Text.fontSize(30);
        Text.pop();
        Text.create('rawfileDescriptor.length = ' + rawfileDescriptor.length);
        Text.id('length');
        Text.fontSize(30);
        Text.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
