interface AreaDataJump_Params {
    model?: AreaDataPickerViewLib.Model;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "AreaDataJump_" + ++__generate__Id;
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
import { DividerType } from '@ohos/pickerView';
import router from '@ohos.router';
import { AreaDataPickerViewLib } from '@ohos/pickerView';
class AreaDataJump extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new AreaDataPickerViewLib.Model(), this, "model");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AreaDataJump_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: ObservedPropertyObject<AreaDataPickerViewLib.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: AreaDataPickerViewLib.Model) {
        this.__model.set(newValue);
    }
    render() {
        //设置Stack的对齐方式为底部起始端对齐，Stack默认为居中对齐。设置Stack构造参数alignContent为Alignment.BottomStart。
        // 其中Alignment和FontWeight一样，都是框架提供的内置枚举类型
        Column.create();
        //设置Stack的对齐方式为底部起始端对齐，Stack默认为居中对齐。设置Stack构造参数alignContent为Alignment.BottomStart。
        // 其中Alignment和FontWeight一样，都是框架提供的内置枚举类型
        Column.alignItems(HorizontalAlign.Center);
        //设置Stack的对齐方式为底部起始端对齐，Stack默认为居中对齐。设置Stack构造参数alignContent为Alignment.BottomStart。
        // 其中Alignment和FontWeight一样，都是框架提供的内置枚举类型
        Column.width("100%");
        Row.create();
        Row.alignItems(VerticalAlign.Top);
        Row.margin({ top: this.model.pickerSpace });
        Text.create('AreaDataParseSample');
        Text.height(50);
        Text.fontSize(20);
        Text.fontColor(Color.Black);
        Text.backgroundColor(Color.Gray);
        Text.width("90%");
        Text.textAlign(TextAlign.Center);
        Text.onClick(() => {
            router.pushUrl({ url: 'pages/AreaDataPickerView',
                params: {
                    text: this.model.text,
                    dividerLineColor: this.model.dividerLineColor,
                    dividerLineStroke: this.model.dividerLineStroke,
                    columnWidth: this.model.columnWidth,
                    fontSize: this.model.fontSize,
                    fontColor: this.model.fontColor,
                    titleFontSize: this.model.titleFontSize,
                    titleFontColor: this.model.titleFontColor,
                    cancelButtonFont: this.model.cancelButtonFont,
                    cancelButtonColor: this.model.cancelButtonColor,
                    confirmButtonFont: this.model.confirmButtonFont,
                    confirmButtonColor: this.model.confirmButtonColor,
                    defaultSelection: this.model.defaultSelection,
                    color: this.model.color,
                    pickerSpace: this.model.pickerSpace,
                    buttonBackgroundColor: this.model.buttonBackgroundColor,
                    dividerType: this.model.dividerType,
                    lineSpacingMultiplier: this.model.lineSpacingMultiplier,
                    popupWindowHeight: this.model.popupWindowHeight,
                    textHeight: this.model.textHeight
                }
            });
        });
        Text.pop();
        Row.pop();
        //设置Stack的对齐方式为底部起始端对齐，Stack默认为居中对齐。设置Stack构造参数alignContent为Alignment.BottomStart。
        // 其中Alignment和FontWeight一样，都是框架提供的内置枚举类型
        Column.pop();
    }
}
export default AreaDataJump;
