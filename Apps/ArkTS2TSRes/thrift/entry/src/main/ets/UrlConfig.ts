let __generate__Id: number = 0;
function generateId(): string {
    return "UrlConfig_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export default class UrlConfig {
    public static pageNameArr: string[] = ['collections', 'double', 'i8', 'i16', 'i32', 'i64', 'other'];
    public static pageIndexArr: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    public static getJumpUrl(position: number): string {
        if (position < 0) {
            return 'pages/index';
        }
        let url: string = 'pages/index';
        switch (position) {
            case 0:
                url = 'pages/collections';
                break;
            case 1:
                url = 'pages/double';
                break;
            case 2:
                url = 'pages/i8';
                break;
            case 3:
                url = 'pages/i16';
                break;
            case 4:
                url = 'pages/i32';
                break;
            case 5:
                url = 'pages/i64';
                break;
            case 6:
                url = 'pages/other';
                break;
            default:
                url = 'pages/index';
                break;
        }
        return url;
    }
}
