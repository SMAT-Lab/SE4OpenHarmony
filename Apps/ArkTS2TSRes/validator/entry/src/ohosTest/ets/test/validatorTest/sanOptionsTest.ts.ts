/**
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
export class SanOptions {
    sanitizer: string;
    args?: Array<string | boolean | number | argsObject | null>;
    expect: Record<string | number, string | number | boolean>;
}
export interface argsObject {
    returnScore?: boolean;
    pointsPerUnique?: number;
    pointsPerRepeat?: number;
    pointsForContainingLower?: number;
    pointsForContainingUpper?: number;
    pointsForContainingNumber?: number;
    pointsForContainingSymbol?: number;
    all_lowercase?: boolean;
    gmail_lowercase?: boolean;
    icloud_lowercase?: boolean;
    outlookdotcom_lowercase?: boolean;
    yahoo_lowercase?: boolean;
    yandex_lowercase?: boolean;
    gmail_remove_dots?: boolean;
    gmail_remove_subaddress?: boolean;
    icloud_remove_subaddress?: boolean;
    outlookdotcom_remove_subaddress?: boolean;
    yahoo_remove_subaddress?: boolean;
    gmail_convert_googlemaildotcom?: boolean;
}
// export interface Options {
//   sanitizer: string
//   expect: Object
// }
