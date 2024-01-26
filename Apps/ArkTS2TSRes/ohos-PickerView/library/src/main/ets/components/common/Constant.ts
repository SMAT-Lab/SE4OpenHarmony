let __generate__Id: number = 0;
function generateId(): string {
    return "Constant_" + ++__generate__Id;
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
import display from '@ohos.display';
export enum DividerType {
    FILL = 0,
    WRAP = 1,
    CIRCLE = 2
}
export enum DateType {
    YearReachSecond = 0,
    HourReachSecond = 1,
    YearReachDay = 2
}
//获取设备的宽高
export let deviceWidth = display.getDefaultDisplaySync().width;
export let deviceHeight = display.getDefaultDisplaySync().height;
