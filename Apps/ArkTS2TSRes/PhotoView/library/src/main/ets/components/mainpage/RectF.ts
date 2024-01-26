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
export default class RectF {
    public left: number;
    public top: number;
    public right: number;
    public bottom: number;
    public constructor(left: number, top: number, right: number, bottom: number) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }
    public setLeft(left: number) {
        this.left = left;
    }
    public setTop(top: number) {
        this.top = top;
    }
    public setRight(right: number) {
        this.right = right;
    }
    public setBottom(bottom: number) {
        this.bottom = bottom;
    }
    /**
       * @return the rectangle's width. This does not check for a valid rectangle
       * (i.e. left <= right) so the result may be negative.
       */
    public width(): number {
        return this.right - this.left;
    }
    /**
       * @return the rectangle's height. This does not check for a valid rectangle
       * (i.e. top <= bottom) so the result may be negative.
       */
    public height(): number {
        return this.bottom - this.top;
    }
    public contains(x: number, y: number): boolean {
        return this.left < this.right && this.top < this.bottom // check for empty first
            && x >= this.left && x < this.right && y >= this.top && y < this.bottom;
    }
    public toString(): string {
        return "RectF(" + this.numberToString(this.left) + ", " + this.numberToString(this.top) + ", "
            + this.numberToString(this.right) + ", " + this.numberToString(this.bottom) + ")";
    }
    private numberToString(src: number): string {
        let source = String(src);
        let split: string[] = source.split(new RegExp("\\."));
        if (split.length == 2) {
            return split[0] + "." + split[1].substring(0, 2);
        }
        return source;
    }
}
