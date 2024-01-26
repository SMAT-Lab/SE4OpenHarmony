/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
export class GsonIterator<T> {
    private index: number = 0;
    private length: number = 0;
    private contents: Array<T>;
    constructor(contents: Array<T>) {
        this.contents = contents;
        this.length = contents.length;
    }
    public getNextIndex(): number {
        return this.index;
    }
    public getLength(): number {
        return this.length;
    }
    public getContents(): Array<T> {
        return this.contents;
    }
    public hasNext(): boolean {
        if (this.index < this.length) {
            return true;
        }
        else {
            return false;
        }
    }
    public next(): T {
        if (this.hasNext()) {
            let content = this.contents[this.index];
            this.index++;
            return content;
        }
        return null;
    }
}
