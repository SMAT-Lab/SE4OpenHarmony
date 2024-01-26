let __generate__Id: number = 0;
function generateId(): string {
    return "customUiData_" + ++__generate__Id;
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
import EntryOhos from './EntryOhos';
// @Observed
export class CustomUiInfo {
    width: number;
    height: number;
    showUi: boolean;
    x: number;
    y: number;
    offsetLeft: number;
    offsetRight: number;
    data: EntryOhos | null;
    isInbounds: boolean;
    constructor(width: number, height: number, showUi: boolean = false, x: number = 0, y: number = 0, offsetLeft: number = 0, offsetRight: number = 0, data: EntryOhos | null = null, isInbounds: boolean = false) {
        this.x = x;
        this.y = y;
        this.offsetLeft = offsetLeft;
        this.offsetRight = offsetRight;
        this.data = data;
        this.isInbounds = isInbounds;
        this.width = width;
        this.height = height;
        this.showUi = showUi;
    }
}
