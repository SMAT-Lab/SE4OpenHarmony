interface TempPage_Params {
    C?: number;
    F?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TempPage_" + ++__generate__Id;
}
/*
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
import { TempUtils } from '@ohos/util_code';
class TempPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__C = new ObservedPropertySimple(0, this, "C");
        this.__F = new ObservedPropertySimple(0, this, "F");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TempPage_Params) {
        if (params.C !== undefined) {
            this.C = params.C;
        }
        if (params.F !== undefined) {
            this.F = params.F;
        }
    }
    aboutToBeDeleted() {
        this.__C.aboutToBeDeleted();
        this.__F.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __C: ObservedPropertySimple<number>;
    get C() {
        return this.__C.get();
    }
    set C(newValue: number) {
        this.__C.set(newValue);
    }
    private __F: ObservedPropertySimple<number>;
    get F() {
        return this.__F.get();
    }
    set F(newValue: number) {
        this.__F.set(newValue);
    }
    render() {
        Column.create();
        Column.create({ space: 12 });
        Column.margin({ top: 10 });
        Text.create('摄氏度转华氏度');
        Text.margin({ top: 5 });
        Text.fontSize(16);
        Text.pop();
        TextInput.create({ placeholder: '请输入摄氏度' });
        TextInput.height(60);
        TextInput.fontSize(18);
        TextInput.maxLength(5);
        TextInput.type(InputType.Number);
        TextInput.onChange((value: string) => {
            if (value.length > 0) {
                this.C = Number.parseInt(value);
            }
            else {
                this.C = 0;
            }
        });
        Text.create('摄氏度：' + this.C + '为华氏度：' + TempUtils.C2F(this.C));
        Text.fontSize(18);
        Text.fontColor('#000');
        Text.margin({ top: 20 });
        Text.backgroundColor('#12939f');
        Text.pop();
        Divider.create();
        Divider.strokeWidth(2);
        Divider.color('#F1F3F5');
        Divider.margin({ top: 8, bottom: 8 });
        Column.pop();
        Column.create({ space: 12 });
        Column.margin({ top: 10 });
        Text.create('华氏度转摄氏度');
        Text.margin({ top: 5 });
        Text.fontSize(16);
        Text.pop();
        TextInput.create({ placeholder: '请输入华氏度' });
        TextInput.height(60);
        TextInput.fontSize(18);
        TextInput.maxLength(5);
        TextInput.type(InputType.Number);
        TextInput.onChange((value: string) => {
            if (value.length > 0) {
                this.F = Number.parseInt(value);
            }
            else {
                this.F = 0;
            }
        });
        Text.create('华氏度：' + this.F + '为摄氏度：' + TempUtils.F2C(this.F));
        Text.fontSize(18);
        Text.fontColor('#000');
        Text.margin({ top: 20 });
        Text.backgroundColor('#12939f');
        Text.pop();
        Divider.create();
        Divider.strokeWidth(2);
        Divider.color('#F1F3F5');
        Divider.margin({ top: 8, bottom: 8 });
        Column.pop();
        Column.pop();
    }
}
loadDocument(new TempPage("1", undefined, {}));
