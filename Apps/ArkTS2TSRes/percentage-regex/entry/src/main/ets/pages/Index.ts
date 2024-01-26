interface Index_Params {
    strArray?: Array<string> | null;
    data?: Array<dataType>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/**
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import percentageRegex from 'percentage-regex';
import prompt from '@ohos.promptAction';
interface dataType {
    str: string;
    str1: string;
    mode: number;
}
interface exactType {
    exact: boolean;
}
let exactData1: exactType = { exact: true };
let exactData2: exactType = { exact: false };
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__strArray = new ObservedPropertyObject([], this, "strArray");
        this.__data = new ObservedPropertyObject([
            { str: "检查字符串是否是百分数", str1: "80%", mode: 1 },
            { str: "匹配字符串中的百分数", str1: "weafdz 80% dawedafa", mode: 2 }
        ], this, "data");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.strArray !== undefined) {
            this.strArray = params.strArray;
        }
        if (params.data !== undefined) {
            this.data = params.data;
        }
    }
    aboutToBeDeleted() {
        this.__strArray.aboutToBeDeleted();
        this.__data.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __strArray: ObservedPropertyObject<Array<string> | null>;
    get strArray() {
        return this.__strArray.get();
    }
    set strArray(newValue: Array<string> | null) {
        this.__strArray.set(newValue);
    }
    private __data: ObservedPropertyObject<Array<dataType>>;
    get data() {
        return this.__data.get();
    }
    set data(newValue: Array<dataType>) {
        this.__data.set(newValue);
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Start });
        List.create({ space: 20, initialIndex: 0 });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.data), (item: dataType, index?: number) => {
            ListItem.create();
            Column.create();
            Text.create(item.str);
            Text.fontSize(16);
            Text.margin({ top: 5 });
            Text.pop();
            TextInput.create({ text: item.str1, placeholder: '请输入字符串' });
            TextInput.height(60);
            TextInput.fontSize(18);
            TextInput.onChange((value: string) => {
                item.str1 = value;
            });
            Button.createWithLabel('验证', { type: ButtonType.Normal });
            Button.fontSize(18);
            Button.fontColor('#000');
            Button.height(60);
            Button.width(300);
            Button.margin({ top: 20 });
            Button.backgroundColor('#12939f');
            Button.onClick(() => {
                if (item.mode == 1) {
                    let result: boolean = percentageRegex(exactData1).test(item.str1);
                    prompt.showToast({ message: result.toString(), duration: 3000 });
                }
                else {
                    this.strArray = item.str1.match(percentageRegex(exactData2));
                }
            });
            Button.pop();
            If.create();
            if (item.mode == 2) {
                If.branchId(0);
                Text.create(JSON.stringify(ObservedObject.GetRawObject(this.strArray)));
                Text.fontSize(16);
                Text.margin({ top: 5 });
                Text.pop();
            }
            If.pop();
            Column.pop();
            ListItem.pop();
        });
        ForEach.pop();
        List.pop();
        Flex.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
