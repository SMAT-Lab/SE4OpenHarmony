let __generate__Id: number = 0;
function generateId(): string {
    return "utils_" + ++__generate__Id;
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
import { expect as _expect } from "@ohos/hypium";
import { ArrMeth, ReType } from "../utils/expectUtils";
const tag = `JZ`;
export const expect = (param: any) => {
    const result: ReType = {
        not: {
            to: {
                equal(value: any) {
                    _expect(param != value).assertTrue();
                }
            }
        },
        to: {
            eql(arr: any) {
                console.log(`${tag} expect.to.eql   param:${JSON.stringify(param)}   arr:${JSON.stringify(arr)}`);
                if (ArrMeth(arr)) {
                    for (let i = 0; i < arr.length; i++) {
                        _expect(arr[i]).assertEqual(param[i]);
                    }
                }
                else {
                    Object.keys(arr).forEach(v => {
                        _expect(param[v]).assertEqual(arr[v]);
                    });
                }
            },
            have: {
                property(key: string, value?: boolean | number) {
                    console.log(`${tag} expect.to.property param:${JSON.stringify(param)}  key:${key}   value:${value}`);
                    if (!value && (typeof value != "boolean") && value != 0) {
                        _expect(Boolean<number>(param[key])).assertTrue();
                        console.log(`yzq-------------2`);
                        return;
                    }
                    _expect(param[key]).assertEqual(value);
                },
                length(value: number) {
                    console.log(`${tag} expect.to.length     param:${JSON.stringify(param)}    value:${value}`);
                    _expect(param.length).assertEqual(value);
                },
                keys(...args: string[]) {
                    console.log(`${tag} expect.to.keys     param:${JSON.stringify(param)}    args:${JSON.stringify(args)}`);
                    const keys = Object.keys(param);
                    args.forEach((v: string) => {
                        _expect(keys.includes(v)).assertTrue();
                    });
                },
            },
            be: {
                an: {
                    instanceof(Cursor: any) {
                        _expect(param instanceof Cursor).assertTrue();
                    }
                }
            },
            equal(value: any) {
                console.log(`${tag} expect.to.equal     param:${param}    args:${value}`);
                _expect(param).assertEqual(value);
            }
        }
    };
    return result;
};
