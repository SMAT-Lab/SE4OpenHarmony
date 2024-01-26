interface SelectInput_Params {
    select?: SelectParam;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SelectInput_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { SelectParam } from './SelectParam';
export class SelectInput extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__select = new ObservedPropertyObject(new SelectParam(), this, "select");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SelectInput_Params) {
        if (params.select !== undefined) {
            this.select = params.select;
        }
    }
    aboutToBeDeleted() {
        this.__select.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __select: ObservedPropertyObject<SelectParam>;
    get select() {
        return this.__select.get();
    }
    set select(newValue: SelectParam) {
        this.__select.set(newValue);
    }
    render() {
        Column.create({ space: 10 });
        Flex.create({ justifyContent: FlexAlign.Center, alignItems: ItemAlign.Center });
        Flex.backgroundColor('#ffcfcccc');
        Checkbox.create({ name: 'checkbox1', group: 'checkboxGroup' });
        Checkbox.select(true);
        Checkbox.selectedColor(0x39a2db);
        Checkbox.onChange((value: boolean) => {
            this.select.autoCancel = value;
        });
        Checkbox.width(30);
        Checkbox.height(30);
        Checkbox.pop();
        Text.create('设置点击蒙层是否退出');
        Text.fontSize(20);
        Text.pop();
        Flex.pop();
        Flex.create({ justifyContent: FlexAlign.Center, alignItems: ItemAlign.Center });
        Flex.backgroundColor('#ffcfcccc');
        Checkbox.create({ name: 'checkbox2', group: 'checkboxGroup' });
        Checkbox.select(true);
        Checkbox.selectedColor(0x39a2db);
        Checkbox.onChange((value: boolean) => {
            this.select.autoClose = value;
        });
        Checkbox.width(30);
        Checkbox.height(30);
        Checkbox.pop();
        Text.create('确认后是否关闭弹窗');
        Text.fontSize(20);
        Text.pop();
        Flex.pop();
        Flex.create({ justifyContent: FlexAlign.Center, alignItems: ItemAlign.Center });
        Flex.backgroundColor('#ffcfcccc');
        TextInput.create();
        TextInput.onChange((value: string) => {
            this.select.maskColor = value;
        });
        TextInput.backgroundColor(Color.White);
        TextInput.margin({ right: 20 });
        Text.create('自定义蒙层颜色');
        Text.fontSize(20);
        Text.pop();
        Flex.pop();
        Flex.create({ justifyContent: FlexAlign.Center, alignItems: ItemAlign.Center });
        Flex.backgroundColor('#ffcfcccc');
        TextInput.create();
        TextInput.onChange((value: string) => {
            this.select.borderRadius = Number.parseInt(value);
        });
        TextInput.backgroundColor(Color.White);
        TextInput.margin({ right: 20 });
        Text.create('圆角弧度');
        Text.fontSize(20);
        Text.pop();
        Flex.pop();
        Flex.create({ justifyContent: FlexAlign.Center, alignItems: ItemAlign.Center });
        Flex.backgroundColor('#ffcfcccc');
        Checkbox.create({ name: 'checkbox3', group: 'checkboxGroup' });
        Checkbox.select(true);
        Checkbox.selectedColor(0x39a2db);
        Checkbox.onChange((value: boolean) => {
            this.select.isDisplayInput = value;
        });
        Checkbox.width(30);
        Checkbox.height(30);
        Checkbox.pop();
        Text.create('包含输入法的弹框拉起输入法');
        Text.fontSize(20);
        Text.pop();
        Flex.pop();
        Column.create();
        Column.backgroundColor('#ffcfcccc');
        Flex.create({ justifyContent: FlexAlign.Center, alignItems: ItemAlign.Center });
        Flex.height(50);
        Text.create('offsetX:');
        Text.fontSize(16);
        Text.padding(10);
        Text.pop();
        TextInput.create();
        TextInput.onChange((value: string) => {
            this.select.dx = Number.parseInt(value);
        });
        TextInput.backgroundColor(Color.White);
        TextInput.margin({ right: 20 });
        TextInput.width(100);
        TextInput.height(30);
        Text.create('offsetY:');
        Text.fontSize(16);
        Text.padding(10);
        Text.pop();
        TextInput.create();
        TextInput.onChange((value: string) => {
            this.select.dy = Number.parseInt(value);
        });
        TextInput.backgroundColor(Color.White);
        TextInput.margin({ right: 20 });
        TextInput.width(100);
        TextInput.height(30);
        Flex.pop();
        Text.create('设置偏移量offset');
        Text.fontSize(20);
        Text.pop();
        Column.pop();
        Flex.create({ justifyContent: FlexAlign.Center, alignItems: ItemAlign.Center });
        Flex.backgroundColor('#ffcfcccc');
        Checkbox.create({ name: 'checkbox4', group: 'checkboxGroup' });
        Checkbox.select(false);
        Checkbox.selectedColor(0x39a2db);
        Checkbox.onChange((value: boolean) => {
            this.select.isDeleteOnDisappear = value;
        });
        Checkbox.width(30);
        Checkbox.height(30);
        Checkbox.pop();
        Text.create('弹出退出时删除对象');
        Text.fontSize(20);
        Text.pop();
        Flex.pop();
        Column.pop();
    }
}
