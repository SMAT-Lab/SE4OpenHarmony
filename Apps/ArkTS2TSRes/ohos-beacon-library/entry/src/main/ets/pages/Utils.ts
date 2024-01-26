let __generate__Id: number = 0;
function generateId(): string {
    return "Utils_" + ++__generate__Id;
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
// import common from '@ohos.app.ability.common';
// import featureAbility from '@ohos.ability.featureAbility';
import abilityAccessCtrl, { Permissions } from '@ohos.abilityAccessCtrl';
import { GlobalContext } from './GlobalContext';
import { BusinessError } from '@ohos.base';
export class ArrayHelper {
    public static add<T>(array: Array<T>, elem: T) {
        array.push(elem);
    }
    public static contains<T>(array: Array<T>, elem: T): boolean {
        return array.indexOf(elem) >= 0;
    }
    public static remove<T>(array: Array<T>, elem: T) {
        let index = array.indexOf(elem);
        if (index >= 0) {
            array.filter((item: T) => { item != array[index]; });
        }
    }
    public static removeIndex<T>(array: Array<T>, index: number) {
        if (index >= 0) {
            array.filter((item: T) => { item != array[index]; });
        }
    }
}
export class PermissionHelper {
    public static checkPermissions(permissions: Array<Permissions>, callback: (results: number[]) => void) {
        let results: Array<any> = new Array(permissions.length);
        let count = 0;
        let atManager = abilityAccessCtrl.createAtManager();
        for (let i = 0; i < permissions.length; i++) {
            let permission = permissions[i];
            atManager.checkAccessToken(0, permission).then((status) => {
                console.info("beacon  checkpermissions data:" + JSON.stringify(status));
                results[i] = status; // error occurs when operation failed, we consume not permitted
                count++;
                if (count == permissions.length) {
                    callback(results);
                }
            });
        }
        ;
    }
    public static requestPermissions(permissions: Array<Permissions>, callback: (results: number[]) => void) {
        PermissionHelper.checkPermissions(permissions, results1 => {
            let requests: Array<Permissions> = [];
            for (let i = 0; i < results1.length; i++) {
                if (results1[i] != 0) { // not permitted
                    requests.push(permissions[i]);
                }
            }
            console.log("checkPermissions requests.length:" + requests.length);
            if (requests.length == 0) {
                callback(results1);
                return;
            }
            let atManager = abilityAccessCtrl.createAtManager();
            let context: Context = GlobalContext.getContext().getValue("ctt") as Context;
            try {
                atManager.requestPermissionsFromUser(context, ['ohos.permission.ACCESS_BLUETOOTH'], (err: BusinessError, data: any) => {
                    console.info('data:' + JSON.stringify(data));
                    console.info('data permissions:' + data.permissions);
                    console.info('data authResults:' + data.authResults);
                });
            }
            catch (err) {
                console.log(`catch err->${JSON.stringify(err)}`);
            }
            // atManager.requestPermissionsFromUser(context,permissions,(err,result2)=>{
            //     console.info("songy  checkpermissions data:"+JSON.stringify(result2))
            //         let results: number[] = results1;
            //         for (let i = 0; i < requests.length; i++) {
            //             let index = permissions.indexOf(requests[i]);
            //             results[index] = result2.authResults[i];
            //         }
            //         callback(results);
            // })
            // context.requestPermissionsFromUser(requests, 123, (err, results2)=>{
            //     let results: number[] = results1;
            //     for (let i = 0; i < requests.length; i++) {
            //         let index = permissions.indexOf(requests[i]);
            //         results[index] = results2.authResults[i];
            //     }
            //     callback(results);
            // });
        });
    }
}
export class TextUtils {
    public static isEmpty(text: string) {
        return text == null || text == undefined || text.length == 0;
    }
}
