let __generate__Id: number = 0;
function generateId(): string {
    return "ScreenUtil_" + ++__generate__Id;
}
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
import { Info } from './interface';
export class ScreenUtil {
    private static TAG = "ScreenUtil";
    public static getSize(id: string): Array<number> {
        let info: Info = JSON.parse(getInspectorByKey(id));
        let rectStr: Array<string> = info.$rect.replace('][', ',')
            .replace('[', '')
            .replace(']', '')
            .replace(' ', '')
            .split(',');
        return [Number(rectStr[2]) - Number(rectStr[0]), Number(rectStr[3]) - Number(rectStr[1])];
    }
}
