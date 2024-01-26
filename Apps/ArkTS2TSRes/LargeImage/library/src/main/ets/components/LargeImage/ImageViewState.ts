let __generate__Id: number = 0;
function generateId(): string {
    return "ImageViewState_" + ++__generate__Id;
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
export default class ImageViewState {
    private scale: number;
    private centerX: number;
    private centerY: number;
    private orientation: number;
    constructor(scale: number, centerX: number, centerY: number, orientation: number) {
        this.scale = scale;
        this.centerX = centerX;
        this.centerY = centerY;
        this.orientation = orientation;
    }
    public getScale(): number {
        return this.scale;
    }
    public getCenterX(): number {
        return this.centerX;
    }
    public getCenterY(): number {
        return this.centerY;
    }
    public getOrientation(): number {
        return this.orientation;
    }
}
