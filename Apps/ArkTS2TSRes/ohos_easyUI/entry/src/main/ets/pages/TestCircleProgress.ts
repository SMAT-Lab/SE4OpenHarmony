interface TestCircleProgress_Params {
    progressCurrentValue?: number;
    progressToTalValue?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TestCircleProgress_" + ++__generate__Id;
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
import { CircleProgress } from 'easyui';
class TestCircleProgress extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__progressCurrentValue = new ObservedPropertySimple(20, this, "progressCurrentValue");
        this.progressToTalValue = 100;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TestCircleProgress_Params) {
        if (params.progressCurrentValue !== undefined) {
            this.progressCurrentValue = params.progressCurrentValue;
        }
        if (params.progressToTalValue !== undefined) {
            this.progressToTalValue = params.progressToTalValue;
        }
    }
    aboutToBeDeleted() {
        this.__progressCurrentValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __progressCurrentValue: ObservedPropertySimple<number>;
    get progressCurrentValue() {
        return this.__progressCurrentValue.get();
    }
    set progressCurrentValue(newValue: number) {
        this.__progressCurrentValue.set(newValue);
    }
    private progressToTalValue: number;
    render() {
        Column.create();
        Column.width("100%");
        Text.create("基础用法");
        Text.alignSelf(ItemAlign.Start);
        Text.margin(20);
        Text.pop();
        Row.create();
        Row.alignSelf(ItemAlign.Start);
        Row.margin({ left: 20 });
        Row.pop();
        Row.create();
        Row.alignSelf(ItemAlign.Start);
        Row.margin({ top: 20 });
        Button.createWithLabel("增加");
        Button.type(ButtonType.Normal);
        Button.backgroundColor("#ff07c161");
        Button.borderRadius(5);
        Button.fontColor(Color.White);
        Button.margin({ left: 10, right: 10 });
        Button.onClick(() => {
            if (this.progressCurrentValue < this.progressToTalValue)
                this.progressCurrentValue += 20;
        });
        Button.pop();
        Button.createWithLabel("减少");
        Button.type(ButtonType.Normal);
        Button.backgroundColor("#ffff4444");
        Button.borderRadius(5);
        Button.fontColor(Color.White);
        Button.onClick(() => {
            if (this.progressCurrentValue > 0)
                this.progressCurrentValue -= 20;
        });
        Button.pop();
        Row.pop();
        Column.pop();
    }
}
loadDocument(new TestCircleProgress("1", undefined, {}));
