interface IWheelYearPicker_Params {
    showWheelYearPicker?: WheelYearPicker.Model;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "wheelyearpicker_" + ++__generate__Id;
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
import { WheelYearPicker } from "@ohos/wheelpicker";
class IWheelYearPicker extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__showWheelYearPicker = new ObservedPropertyObject(new WheelYearPicker.Model(), this, "showWheelYearPicker");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: IWheelYearPicker_Params) {
        if (params.showWheelYearPicker !== undefined) {
            this.showWheelYearPicker = params.showWheelYearPicker;
        }
    }
    aboutToBeDeleted() {
        this.__showWheelYearPicker.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __showWheelYearPicker: ObservedPropertyObject<WheelYearPicker.Model>;
    get showWheelYearPicker() {
        return this.__showWheelYearPicker.get();
    }
    set showWheelYearPicker(newValue: WheelYearPicker.Model) {
        this.__showWheelYearPicker.set(newValue);
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width("100%");
        Flex.pop();
    }
    aboutToAppear() {
        this.showWheelYearPicker
            .setAtmospheric(true)
            .setItemTextSize(15)
            .setTextHeight(20)
            .setItemAlign(HorizontalAlign.End);
    }
}
loadDocument(new IWheelYearPicker("1", undefined, {}));
