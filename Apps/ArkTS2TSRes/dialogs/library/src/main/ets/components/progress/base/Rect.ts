let __generate__Id: number = 0;
function generateId(): string {
    return "Rect_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
export class Rect {
    top = 0;
    left = 0;
    bottom = 0;
    right = 0;
    getWidth() {
        return this.right - this.left;
    }
    getHeight() {
        return this.bottom - this.top;
    }
    getCenterX() {
        return (this.left + this.right) / 2;
    }
    getCenterY() {
        return (this.top + this.bottom) / 2;
    }
}
