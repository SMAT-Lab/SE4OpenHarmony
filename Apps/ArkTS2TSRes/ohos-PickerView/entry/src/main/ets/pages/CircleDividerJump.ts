interface CircleDividerJump_Params {
    model?: CircleDividerViewLib.Model;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CircleDividerJump_" + ++__generate__Id;
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
import { CircleDividerViewLib } from '@ohos/pickerview';
class CircleDividerJump extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.model = new CircleDividerViewLib.Model();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CircleDividerJump_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private model: CircleDividerViewLib.Model;
    render() {
        Column.create();
        Column.alignItems(HorizontalAlign.Center);
        Column.width("100%");
        Row.create();
        Row.alignItems(VerticalAlign.Top);
        Row.margin({ top: this.model.pickerSpace });
        Text.create('圆形分割器');
        Text.height(50);
        Text.fontSize(20);
        Text.fontColor(Color.Black);
        Text.backgroundColor(Color.Gray);
        Text.width("90%");
        Text.textAlign(TextAlign.Center);
        Text.onClick(() => {
            router.pushUrl({ url: 'pages/CircleDividerPickerView',
                params: { text: this.model.text,
                    firstArray: this.model.firstArray,
                    dividerLineColor: this.model.dividerLineColor,
                    dividerLineStroke: this.model.dividerLineStroke,
                    columnWidth: this.model.columnWidth,
                    fontSize: this.model.fontSize,
                    fontColor: this.model.fontColor,
                    titleFontSize: this.model.titleFontSize,
                    titleFontColor: this.model.titleFontColor,
                    cancelButtonFont: this.model.cancelButtonFont,
                    confirmButtonFont: this.model.confirmButtonFont,
                    cancelButtonColor: this.model.cancelButtonColor,
                    confirmButtonColor: this.model.confirmButtonColor,
                    color: this.model.color,
                    pickerSpace: this.model.pickerSpace,
                    buttonBackgroundColor: this.model.buttonBackgroundColor,
                    defaultSelection: this.model.defaultSelection
                }
            });
        });
        Text.pop();
        Row.pop();
        Column.pop();
    }
}
export default CircleDividerJump;
