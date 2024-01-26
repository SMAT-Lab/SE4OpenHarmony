interface AreaDataPickerView_Params {
    areaDataModel?: AreaDataPickerViewLib.Model;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "AreaDataPickerView_" + ++__generate__Id;
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
import { initializeProvinceOnStartup, Province, CityAndArea } from '@ohos/pickerview';
import router from '@ohos.router';
import { showToast, setTimeOut } from '@ohos/pickerview';
import { DividerType } from '@ohos/pickerview';
import { AreaDataPickerViewLib } from '@ohos/pickerview';
class AreaDataPickerView extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.areaDataModel = new AreaDataPickerViewLib.Model();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AreaDataPickerView_Params) {
        if (params.areaDataModel !== undefined) {
            this.areaDataModel = params.areaDataModel;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private areaDataModel: AreaDataPickerViewLib.Model;
    aboutToAppear() {
        this.areaDataModel.setDividerLineStroke((router.getParams() as Record<string, Object>)['dividerLineStroke'] as number)
            .setDividerLineColor((router.getParams() as Record<string, Object>)['dividerLineColor'] as Color)
            .setFontSize((router.getParams() as Record<string, Object>)['fontSize'] as number)
            .setFontColor((router.getParams() as Record<string, Object>)['fontColor'] as Color)
            .setConfirmButtonFont((router.getParams() as Record<string, Object>)['confirmButtonFont'] as string)
            .setCancelButtonFont((router.getParams() as Record<string, Object>)['cancelButtonFont'] as string)
            .setCancelButtonColor((router.getParams() as Record<string, Object>)['cancelButtonColor'] as Color)
            .setConfirmButtonColor((router.getParams() as Record<string, Object>)['confirmButtonColor'] as Color)
            .setTitleFontSize((router.getParams() as Record<string, Object>)['titleFontSize'] as number)
            .setTitleFontColor((router.getParams() as Record<string, Object>)['titleFontColor'] as Color)
            .setPickerSpace((router.getParams() as Record<string, Object>)['pickerSpace'] as number)
            .setButtonBackgroundColor((router.getParams() as Record<string, Object>)['buttonBackgroundColor'] as string)
            .setDividerType((router.getParams() as Record<string, Object>)['dividerType'] as DividerType)
            .setLineSpacingMultiplier((router.getParams() as Record<string, Object>)['lineSpacingMultiplier'] as number);
    }
    render() {
        Column.create();
        Column.pop();
    }
}
loadDocument(new AreaDataPickerView("1", undefined, {}));
