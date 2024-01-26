interface IWheelMonthPicker_Params {
    showWheelMonthPicker?: WheelMonthPicker.Model;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "wheelmonthpicker_" + ++__generate__Id;
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
import { WheelMonthPicker } from "@ohos/wheelpicker";
import prompt from '@system.prompt';
class IWheelMonthPicker extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__showWheelMonthPicker = new ObservedPropertyObject(new WheelMonthPicker.Model(), this, "showWheelMonthPicker");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: IWheelMonthPicker_Params) {
        if (params.showWheelMonthPicker !== undefined) {
            this.showWheelMonthPicker = params.showWheelMonthPicker;
        }
    }
    aboutToBeDeleted() {
        this.__showWheelMonthPicker.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __showWheelMonthPicker: ObservedPropertyObject<WheelMonthPicker.Model>;
    get showWheelMonthPicker() {
        return this.__showWheelMonthPicker.get();
    }
    set showWheelMonthPicker(newValue: WheelMonthPicker.Model) {
        this.__showWheelMonthPicker.set(newValue);
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width("100%");
        Flex.pop();
    }
    aboutToAppear() {
        this.showWheelMonthPicker
            .setAtmospheric(true)
            .setItemTextSize(15)
            .setTextHeight(20)
            .setItemAlign(HorizontalAlign.Center)
            .setSelectDataShow((text: string) => {
            prompt.showToast({
                message: "Month:" + text
            });
        });
    }
}
loadDocument(new IWheelMonthPicker("1", undefined, {}));
