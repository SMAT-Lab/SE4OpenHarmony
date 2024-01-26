let __generate__Id: number = 0;
function generateId(): string {
    return "DateTimeAttributeModel_" + ++__generate__Id;
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
export class DateTimeAttributeModel {
    // 年月日时分秒
    labelFontSize: number | string | Resource = 20;
    labelFontColor: ResourceColor = Color.Black;
    labelFontWeight: number | FontWeight | string = 400;
    labelHeight: Length = 50;
    // 滚动区域
    rollerFontSize: number | string | Resource = 20;
    rollerFontColor: ResourceColor = Color.Black;
    rollerFontWeight: number | FontWeight | string = 400;
    rollerTextHeight: number = 50;
    backgroundColor: ResourceColor = Color.White;
}
