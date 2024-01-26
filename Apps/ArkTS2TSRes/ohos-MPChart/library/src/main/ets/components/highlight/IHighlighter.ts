let __generate__Id: number = 0;
function generateId(): string {
    return "IHighlighter_" + ++__generate__Id;
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
import Highlight from './Highlight';
export default interface IHighlighter {
    /**
     * Returns a Highlight object corresponding to the given x- and y- touch positions in pixels.
     *
     * @param x
     * @param y
     * @return
     */
    getHighlight(x: number, y: number): Highlight | null;
}
