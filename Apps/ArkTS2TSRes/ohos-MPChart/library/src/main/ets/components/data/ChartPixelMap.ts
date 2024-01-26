let __generate__Id: number = 0;
function generateId(): string {
    return "ChartPixelMap_" + ++__generate__Id;
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
export default class ChartPixelMap {
    private icon: PixelMap | null = null;
    private height: number = 0;
    private width: number = 0;
    public setIcon(newIcon: PixelMap) {
        this.icon = newIcon;
    }
    public getIcon(): PixelMap | null {
        return this.icon;
    }
    public setWidth(width: number) {
        this.width = width;
    }
    public getWidth(): number {
        return this.width;
    }
    public setHeight(height: number) {
        this.height = height;
    }
    public getHeight(): number {
        return this.height;
    }
}
