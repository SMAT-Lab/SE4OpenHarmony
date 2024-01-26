let __generate__Id: number = 0;
function generateId(): string {
    return "RectF_" + ++__generate__Id;
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
export class RectF {
    public left: number = 0;
    public top: number = 0;
    public right: number = 0;
    public bottom: number = 0;
    public setEmpty(): void {
        this.left = this.right = this.top = this.bottom = 0;
    }
    public set(left: number, top: number, right: number, bottom: number): void {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }
    public intersect(left: number, top: number, right: number, bottom: number): boolean {
        if (this.left < right && left < this.right
            && this.top < bottom && top < this.bottom) {
            if (this.left < left) {
                this.left = left;
            }
            if (this.top < top) {
                this.top = top;
            }
            if (this.right > right) {
                this.right = right;
            }
            if (this.bottom > bottom) {
                this.bottom = bottom;
            }
            return true;
        }
        return false;
    }
    public width(): number {
        return this.right - this.left;
    }
    public height(): number {
        return this.bottom - this.top;
    }
}
