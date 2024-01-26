interface IWheelDayPicker_Params {
    showWheelDayPicker?: WheelDayPicker.Model;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "wheeldaypicker_" + ++__generate__Id;
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
import { WheelDayPicker } from "@ohos/wheelpicker";
import prompt from '@system.prompt';
class IWheelDayPicker extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__showWheelDayPicker = new ObservedPropertyObject(new WheelDayPicker.Model(), this, "showWheelDayPicker");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: IWheelDayPicker_Params) {
        if (params.showWheelDayPicker !== undefined) {
            this.showWheelDayPicker = params.showWheelDayPicker;
        }
    }
    aboutToBeDeleted() {
        this.__showWheelDayPicker.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __showWheelDayPicker: ObservedPropertyObject<WheelDayPicker.Model>;
    get showWheelDayPicker() {
        return this.__showWheelDayPicker.get();
    }
    set showWheelDayPicker(newValue: WheelDayPicker.Model) {
        this.__showWheelDayPicker.set(newValue);
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width("100%");
        Flex.pop();
    }
    aboutToAppear() {
        this.showWheelDayPicker
            .setAtmospheric(true)
            .setItemTextSize(15)
            .setTextHeight(20)
            .setItemAlign(HorizontalAlign.End)
            .setSelectDataShow((text: string) => {
            prompt.showToast({
                message: "Day:" + text
            });
        });
    }
}
loadDocument(new IWheelDayPicker("1", undefined, {}));
