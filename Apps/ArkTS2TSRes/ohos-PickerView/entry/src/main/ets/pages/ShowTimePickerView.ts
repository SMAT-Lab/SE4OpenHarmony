interface ShowTimePickerView_Params {
    showTimePickerModel?: ShowTimePickerViewLib.Model;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ShowTimePickerView_" + ++__generate__Id;
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
import router from '@ohos.router';
import { ShowTimePickerViewLib } from '@ohos/pickerview';
import { DividerType } from '@ohos/pickerview';
class ShowTimePickerView extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.showTimePickerModel = new ShowTimePickerViewLib.Model();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ShowTimePickerView_Params) {
        if (params.showTimePickerModel !== undefined) {
            this.showTimePickerModel = params.showTimePickerModel;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private showTimePickerModel: ShowTimePickerViewLib.Model;
    aboutToAppear() {
        this.showTimePickerModel
            .setDividerLineStroke((router.getParams() as Record<string, Object>)['dividerLineStroke'] as number)
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
            .setYearRangeStart((router.getParams() as Record<string, Object>)['yearRangeStart'] as number)
            .setYearRangeEnd((router.getParams() as Record<string, Object>)['yearRangeEnd'] as number)
            .setDefaultSelection((router.getParams() as Record<string, Object>)['defaultSelection'] as any)
            .setDividerType((router.getParams() as Record<string, Object>)['dividerType'] as DividerType)
            .setLineSpacingMultiplier((router.getParams() as Record<string, Object>)['lineSpacingMultiplier'] as number);
    }
    render() {
        Column.create();
        Column.pop();
    }
}
loadDocument(new ShowTimePickerView("1", undefined, {}));
