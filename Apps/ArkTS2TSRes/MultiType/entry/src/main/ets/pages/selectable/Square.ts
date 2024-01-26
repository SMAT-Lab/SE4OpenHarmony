let __generate__Id: number = 0;
function generateId(): string {
    return "Square_" + ++__generate__Id;
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
export class Square {
    title: string;
    grids: Array<SquareGrid>;
    constructor(title: string, grids: Array<SquareGrid>) {
        this.title = title;
        this.grids = grids;
    }
}
export class SquareGrid {
    id: number;
    isSelected: boolean;
    constructor(id: number, isSelected: boolean) {
        this.id = id;
        this.isSelected = isSelected;
    }
}
