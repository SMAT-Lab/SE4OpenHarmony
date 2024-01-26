interface IWheelDatePicker_Params {
    showWheelDatePicker?: WheelDatePicker.Model;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "wheeldatepicker_" + ++__generate__Id;
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
import { WheelDatePicker } from "@ohos/wheelpicker";
class IWheelDatePicker extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__showWheelDatePicker = new ObservedPropertyObject(new WheelDatePicker.Model(), this, "showWheelDatePicker");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: IWheelDatePicker_Params) {
        if (params.showWheelDatePicker !== undefined) {
            this.showWheelDatePicker = params.showWheelDatePicker;
        }
    }
    aboutToBeDeleted() {
        this.__showWheelDatePicker.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __showWheelDatePicker: ObservedPropertyObject<WheelDatePicker.Model>;
    get showWheelDatePicker() {
        return this.__showWheelDatePicker.get();
    }
    set showWheelDatePicker(newValue: WheelDatePicker.Model) {
        this.__showWheelDatePicker.set(newValue);
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width("100%");
        Flex.pop();
    }
    aboutToAppear() {
        this.showWheelDatePicker
            .setAtmospheric(true)
            .setItemTextSize(15)
            .setTextHeight(20);
    }
}
loadDocument(new IWheelDatePicker("1", undefined, {}));
