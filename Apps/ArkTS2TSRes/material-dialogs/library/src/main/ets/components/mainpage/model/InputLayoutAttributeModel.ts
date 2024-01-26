let __generate__Id: number = 0;
function generateId(): string {
    return "InputLayoutAttributeModel_" + ++__generate__Id;
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
export class InputLayoutAttributeModel {
    // label属性
    labelText: string | Resource = 'Type something';
    labelFontSize: number | string | Resource = 16;
    labelNormalFontColor: ResourceColor = "#9c47ff";
    labelWarnFontColor: ResourceColor = Color.Red;
    labelFontWeight: number | FontWeight | string = 400;
    inputNumberFontSize: number | string | Resource = 14;
    // 输入框属性
    width: Length = '100%';
    height: Length = '';
    fontSize: number | string | Resource = 16;
    fontColor: ResourceColor = "#000000";
    fontWeight: number | FontWeight | string = 400;
    maxLength: number = -1;
    backgroundColor: ResourceColor = "#ececec";
    placeholderColor: ResourceColor = Color.Gray;
    placeholderFont: Font = { size: 25, weight: 2 };
    type: InputType = InputType.Normal;
    // 输入框大布局背景
    layoutBackgroundColor: ResourceColor = "#ececec";
}
