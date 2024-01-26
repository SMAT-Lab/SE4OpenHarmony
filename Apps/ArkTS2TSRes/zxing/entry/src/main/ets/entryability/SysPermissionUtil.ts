let __generate__Id: number = 0;
function generateId(): string {
    return "SysPermissionUtil_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
import abilityAccessCtrl, { Permissions } from '@ohos.abilityAccessCtrl';
import bundleManager from '@ohos.bundle.bundleManager';
import common from '@ohos.app.ability.common';
import { ErrType } from '../util/interface';
export default class SysPermissionUtils {
    static async checkPermissions(permission: Permissions): Promise<boolean> {
        let atManager = abilityAccessCtrl.createAtManager();
        let grantStatus: abilityAccessCtrl.GrantStatus;
        let tokenId: number;
        let bundleInfo: bundleManager.BundleInfo = await bundleManager.getBundleInfoForSelf(bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_APPLICATION);
        let appInfo: bundleManager.ApplicationInfo = bundleInfo.appInfo;
        tokenId = appInfo.accessTokenId;
        grantStatus = await atManager.checkAccessToken(tokenId, permission);
        if (grantStatus !== abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED) {
            return false;
        }
        return true;
    }
    static request(context: common.UIAbilityContext, resultCallback?: Function, ...permissions: Array<Permissions>) {
        let atManager = abilityAccessCtrl.createAtManager();
        atManager.requestPermissionsFromUser(context, permissions).then((data) => {
            let grantStatus: Array<number> = data.authResults;
            let length: number = grantStatus.length;
            for (let i = 0; i < length; i++) {
                if (resultCallback) {
                    let isGranted = grantStatus[i] === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED;
                    resultCallback(isGranted, data.permissions[i]);
                }
            }
        }).catch((err: ErrType) => {
            console.error(`requestPermissionsFromUser failed , code is ${err.code},message is ${err.message}`);
        });
    }
}
