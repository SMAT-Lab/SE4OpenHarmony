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

import {LVBase} from '../base/LVBase'

export class LVCircularRingController extends LVBase {
    animValue:number = 0;
    viewColor:string = '#A0FFFFFF';
    barColor:string = '#FFFFFF';

    getAnimValue() {
        return this.animValue;
    }

    getViewColor() {
        return this.viewColor;
    }

    setViewColor(viewColor:string) {
        this.viewColor = viewColor;
        return this;
    }

    getBarColor() {
        return this.barColor;
    }

    setBarColor(barColor:string) {
        this.barColor = barColor;
        return this;
    }

    OnAnimationUpdate(value:number) {
        this.animValue = 360 * value;
    }
}