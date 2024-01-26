interface IWheelAreaPicker_Params {
    showWheelAreaPicker?: WheelAreaPicker.Model;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "wheelareapicker_" + ++__generate__Id;
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
import { WheelAreaPicker } from "@ohos/wheelpicker";
class IWheelAreaPicker extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__showWheelAreaPicker = new ObservedPropertyObject(new WheelAreaPicker.Model(), this, "showWheelAreaPicker");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: IWheelAreaPicker_Params) {
        if (params.showWheelAreaPicker !== undefined) {
            this.showWheelAreaPicker = params.showWheelAreaPicker;
        }
    }
    aboutToBeDeleted() {
        this.__showWheelAreaPicker.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __showWheelAreaPicker: ObservedPropertyObject<WheelAreaPicker.Model>;
    get showWheelAreaPicker() {
        return this.__showWheelAreaPicker.get();
    }
    set showWheelAreaPicker(newValue: WheelAreaPicker.Model) {
        this.__showWheelAreaPicker.set(newValue);
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width("100%");
        Flex.pop();
    }
    aboutToAppear() {
        this.showWheelAreaPicker
            .setAtmospheric(true)
            .setItemTextSize(15)
            .setTextHeight(20)
            .setItemAlign(HorizontalAlign.Center);
    }
}
loadDocument(new IWheelAreaPicker("1", undefined, {}));
