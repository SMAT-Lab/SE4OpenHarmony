interface Index_Params {
    message?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/* Copyright 2023 Unionman Technology Co., Ltd.
 *
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
 *
 */
import hilog from '@ohos.hilog';
var msliteNapi = globalThis.requireNapi("entry", true); // 导入msliteNapi模块。
let context = getContext();
const TAG = 'MSLiteNativeDemo';
let resourceManager = context.resourceManager;
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('MindSpore Lite Demo', this, "message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Text.create(this.message);
        Text.fontSize(30);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            hilog.info(0x0000, TAG, '*** Start MSLite Demo ***');
            let ret: number = 0;
            ret = msliteNapi.runDemo("", resourceManager); // 调用runDemo()，执行AI模型推理。
            if (ret == -1) {
                hilog.info(0x0000, TAG, 'Error when running MSLite Demo!');
            }
            ;
            hilog.info(0x0000, TAG, '*** Finished MSLite Demo ***');
        });
        Text.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
