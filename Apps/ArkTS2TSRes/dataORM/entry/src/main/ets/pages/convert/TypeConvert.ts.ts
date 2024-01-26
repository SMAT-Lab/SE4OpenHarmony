/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import ArrayList from '@ohos.util.ArrayList';
import { StringBuilder } from '@ohos/dataorm/src/main/ets/core/StringBuilder';
import { PropertyConverter } from '@ohos/dataorm';
export class TypeConvert extends PropertyConverter<ArrayList<string>, string> {
    convertToEntityProperty(databaseValue: string): ArrayList<string> {
        let strings: ArrayList<string>;
        if (databaseValue.includes(",")) {
            let val = databaseValue.split(",");
            strings = new ArrayList();
            val.forEach((value, index) => {
                strings.add(value);
            });
        }
        return strings;
    }
    convertToDatabaseValue(entityProperty: ArrayList<string>): string {
        let builder = new StringBuilder();
        for (let i = 0; i < entityProperty.length; i++) {
            let suffix: string = "";
            if (i != entityProperty.length - 1) {
                suffix = ",";
            }
            builder.append(entityProperty[i] + suffix);
        }
        let str = builder.toString();
        return str;
    }
}
