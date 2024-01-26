let __generate__Id: number = 0;
function generateId(): string {
    return "OptionValidator_" + ++__generate__Id;
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
export class OptionValidator {
    private static isValidChar(c: string): boolean {
        //return Character.isJavaIdentifierPart(c);
        //字母、数字、下划线
        let re: RegExp = new RegExp('[a-zA-Z0-9_]');
        if (c.length == 1 && (c.match(re) || c == "$")) {
            return true;
        }
        else {
            return false;
        }
    }
    private static isValidOpt(c: string): boolean {
        return OptionValidator.isValidChar(c) || c == '?' || c == '@';
    }
    static validate(option: string): string {
        // if opt is NULL do not check further
        if (option == null) {
            return '';
        }
        // handle the single character opt
        if (option.length == 1) {
            let ch = option.charAt(0);
            if (!OptionValidator.isValidOpt(ch)) {
                throw new Error("Illegal option name '" + ch + "'");
            }
        }
        else {
            // handle the multi character opt
            for (let i = 0; i < option.length; i++) {
                let ch = option.charAt(i);
                if (!OptionValidator.isValidChar(ch)) {
                    throw new Error("The option '" + option + "' contains an illegal " + "character : '" + ch + "'");
                }
            }
        }
        return option;
    }
}
