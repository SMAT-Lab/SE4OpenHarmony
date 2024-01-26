let __generate__Id: number = 0;
function generateId(): string {
    return "ColorPickAttributeModel_" + ++__generate__Id;
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
export class ColorPickAttributeModel {
    // 自定义颜色界面文案
    fontSize: number | string | Resource = 20;
    fontColor: ResourceColor = Color.Black;
    fontWeight: number | FontWeight | string = 400;
    // grid列数
    columnsTemplate: string = '1fr 1fr 1fr 1fr'; // 默认4列4等分
    // 列间距
    columnsGap: Length = 10;
    // 行间距
    rowsGap: Length = 10;
    // item圆形直接
    itemWidth: string | number = 60;
    backgroundColor: ResourceColor = 0xFFFFFF;
}
