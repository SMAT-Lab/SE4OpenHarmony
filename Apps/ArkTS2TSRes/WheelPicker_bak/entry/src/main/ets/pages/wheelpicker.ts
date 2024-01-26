interface IWheelPicker_Params {
    showWheelPickerLeft?: WheelPicker.Model;
    showWheelPickerMiddle?: WheelPicker.Model;
    showWheelPickerRight?: WheelPicker.Model;
    array?: string[];
    randomNumber?: number;
    randomSelect?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "wheelpicker_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import { WheelPicker } from "@ohos/wheelpicker";
import prompt from '@system.prompt';
class IWheelPicker extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__showWheelPickerLeft = new ObservedPropertyObject(new WheelPicker.Model(), this, "showWheelPickerLeft");
        this.__showWheelPickerMiddle = new ObservedPropertyObject(new WheelPicker.Model(), this, "showWheelPickerMiddle");
        this.__showWheelPickerRight = new ObservedPropertyObject(new WheelPicker.Model(), this, "showWheelPickerRight");
        this.array = [
            "AigeStudio",
            "Aige",
            "爱哥",
            "الحب  اخي",
            "jeg elsker",
            "xiBa",
            "Amor de irmão",
            "armastan",
            "愛の兄",
            "xiOngD",
            "любовь - братa",
            "miłość bracie",
            "Liebe",
            "Lamour",
            "rakastan sinua",
            "láska..",
            "dragostea.",
            "jag älskar",
            "ljubezen, brat.",
            "愛哥",
            "bieLie",
            "αγάπη μου",
            "a szerelem.",
            "Amore, fratello."
        ];
        this.__randomNumber = new ObservedPropertySimple(Math.floor(Math.random() * (this.array.length + 1)), this, "randomNumber");
        this.__randomSelect = new ObservedPropertySimple(this.array[this.randomNumber], this, "randomSelect");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: IWheelPicker_Params) {
        if (params.showWheelPickerLeft !== undefined) {
            this.showWheelPickerLeft = params.showWheelPickerLeft;
        }
        if (params.showWheelPickerMiddle !== undefined) {
            this.showWheelPickerMiddle = params.showWheelPickerMiddle;
        }
        if (params.showWheelPickerRight !== undefined) {
            this.showWheelPickerRight = params.showWheelPickerRight;
        }
        if (params.array !== undefined) {
            this.array = params.array;
        }
        if (params.randomNumber !== undefined) {
            this.randomNumber = params.randomNumber;
        }
        if (params.randomSelect !== undefined) {
            this.randomSelect = params.randomSelect;
        }
    }
    aboutToBeDeleted() {
        this.__showWheelPickerLeft.aboutToBeDeleted();
        this.__showWheelPickerMiddle.aboutToBeDeleted();
        this.__showWheelPickerRight.aboutToBeDeleted();
        this.__randomNumber.aboutToBeDeleted();
        this.__randomSelect.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __showWheelPickerLeft: ObservedPropertyObject<WheelPicker.Model>;
    get showWheelPickerLeft() {
        return this.__showWheelPickerLeft.get();
    }
    set showWheelPickerLeft(newValue: WheelPicker.Model) {
        this.__showWheelPickerLeft.set(newValue);
    }
    private __showWheelPickerMiddle: ObservedPropertyObject<WheelPicker.Model>;
    get showWheelPickerMiddle() {
        return this.__showWheelPickerMiddle.get();
    }
    set showWheelPickerMiddle(newValue: WheelPicker.Model) {
        this.__showWheelPickerMiddle.set(newValue);
    }
    private __showWheelPickerRight: ObservedPropertyObject<WheelPicker.Model>;
    get showWheelPickerRight() {
        return this.__showWheelPickerRight.get();
    }
    set showWheelPickerRight(newValue: WheelPicker.Model) {
        this.__showWheelPickerRight.set(newValue);
    }
    private array: string[];
    private __randomNumber: ObservedPropertySimple<number>;
    get randomNumber() {
        return this.__randomNumber.get();
    }
    set randomNumber(newValue: number) {
        this.__randomNumber.set(newValue);
    }
    private __randomSelect: ObservedPropertySimple<string>;
    get randomSelect() {
        return this.__randomSelect.get();
    }
    set randomSelect(newValue: string) {
        this.__randomSelect.set(newValue);
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Start });
        Button.createWithLabel("go to:" + this.randomSelect);
        Button.height(70);
        Button.padding(10);
        Button.fontSize(24);
        Button.margin({ bottom: 10 });
        Button.onClick(() => {
            this.showWheelPickerMiddle.setSelectedItemPosition(this.randomNumber);
            this.randomNumber = Math.floor(Math.random() * (this.array.length + 1));
            this.randomSelect = this.array[this.randomNumber];
        });
        Button.pop();
        Flex.create({ justifyContent: FlexAlign.Center });
        Row.create();
        Row.pop();
        Flex.pop();
        Flex.pop();
    }
    aboutToAppear() {
        this.showWheelPickerLeft
            .setAtmospheric(true)
            .setItemAlign(HorizontalAlign.End)
            .setData(this.array)
            .setCurtain(true)
            .setCurtainColor("#FFFFFF")
            .setCyclic(true)
            .setFontFamily('')
            .setIndicator(true)
            .setIndicatorColor("red")
            .setIndicatorSize(1)
            .setItemSpace(8)
            .setItemTextColor("#536D8A")
            .setItemTextSize(15)
            .setSelectedItemTextColor("#FAFAaa")
            .setTextHeight(20)
            .setVisibleItemCount(7)
            .setSelectDataShow((text: string) => {
            prompt.showToast({
                message: "Left:" + text
            });
        });
        this.showWheelPickerMiddle
            .setItemAlign(HorizontalAlign.Center)
            .setItemTextSize(15)
            .setData(this.array)
            .setSelectDataShow((text: string) => {
            prompt.showToast({
                message: "Centre:" + text
            });
        });
        this.showWheelPickerRight
            .setItemAlign(HorizontalAlign.Start)
            .setItemTextSize(15)
            .setData(this.array)
            .setSelectDataShow((text: string) => {
            prompt.showToast({
                message: "Right:" + text
            });
        });
    }
}
loadDocument(new IWheelPicker("1", undefined, {}));
