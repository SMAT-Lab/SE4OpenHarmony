/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
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
import { Params } from './interface';
export function getKeys(obj: Params): string[] {
    let keys: string[] = Object.keys(obj);
    return keys;
}
export function getResult() {
    return result;
}
const result = [
    {
        "index": "test",
        "oldFileName": "test",
        "oldHeader": "header1",
        "newFileName": "test",
        "newHeader": "header2",
        "hunks": [
            {
                "oldStart": 1,
                "oldLines": 3,
                "newStart": 1,
                "newLines": 4,
                "lines": [" line2", " line3", "+line4", " line5"],
                "linedelimiters": ["\n", "\n", "\n", "\n"
                ]
            }
        ]
    }
];
