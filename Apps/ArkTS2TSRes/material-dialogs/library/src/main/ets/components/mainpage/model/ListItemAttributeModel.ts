let __generate__Id: number = 0;
function generateId(): string {
    return "ListItemAttributeModel_" + ++__generate__Id;
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
export class ListItemAttributeModel {
    textWidth: Length = '100%';
    textHeight: Length = '';
    textFontSize: number | string | Resource = 16;
    enableFontColor: ResourceColor = "#000000";
    textFontWeight: number | FontWeight | string = 400;
    disableFontColor: ResourceColor = "#999999";
    textMaxLines: number = -1;
    textAlign: TextAlign = TextAlign.Start;
    iconWidth: Length = 24;
    iconHeight: Length = 24;
    checkedImage: string | PixelMap | Resource | undefined = undefined;
    uncheckedImage: string | PixelMap | Resource | undefined = undefined;
    itemBackgroundColor: ResourceColor = '#ffffff';
    itemSelectedBackgroundColor: ResourceColor = '#ececec';
}
