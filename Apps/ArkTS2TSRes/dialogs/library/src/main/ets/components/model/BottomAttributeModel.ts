let __generate__Id: number = 0;
function generateId(): string {
    return "BottomAttributeModel_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export interface DividerAttribute {
    strokeWidth: Length;
    color?: ResourceColor;
    startMargin?: Length;
    endMargin?: Length;
}
export class BottomAttributeModel {
    minHeight: Length = '20%';
    maxHeight: Length = '70%';
    barState?: BarState = BarState.Off;
    divider?: DividerAttribute;
    dialogHeight?: number = 250;
    backgroundColor: ResourceColor = Color.White;
    hasTitle?: boolean = false;
    titleFontSize?: number | string | Resource = 25;
    titleFontColor?: ResourceColor = Color.Black;
    titleBg?: ResourceColor = Color.White;
}
