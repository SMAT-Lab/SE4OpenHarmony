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
import abilityAccessCtrl, { PermissionRequestResult } from '@ohos.abilityAccessCtrl';
import { Permissions } from '@ohos.abilityAccessCtrl';
import bundleManager from '@ohos.bundle.bundleManager';
import common from '@ohos.app.ability.common';
import Logger from './Logger';

const TAG: string = '[Permission]';

const PERMISSIONS: Array<Permissions> = [
  'ohos.permission.CAMERA'
];

const context = getContext(this) as common.UIAbilityContext;

export default async function grantPermission(): Promise<boolean> {
  try {
    let bundleInfo: bundleManager.BundleInfo =
      await bundleManager.getBundleInfoForSelf(
        bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_APPLICATION
      );
    let appInfo: bundleManager.ApplicationInfo = bundleInfo.appInfo;
    let tokenId = appInfo.accessTokenId;
    let atManager = abilityAccessCtrl.createAtManager();
    let pems: Array<Permissions> = [];
    for (let i = 0; i < PERMISSIONS.length; i++) {
      let state = await atManager.checkAccessToken(tokenId, PERMISSIONS[i]);
      Logger.info(TAG, `grantPermission checkAccessToken ${PERMISSIONS[i]} +: ${JSON.stringify(state)}`);
      if (state !== abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED) {
        pems.push(PERMISSIONS[i]);
      }
    }
    if (pems.length > 0) {
      Logger.info(TAG, 'grantPermission requestPermissionsFromUser:' + JSON.stringify(pems));
      let ctx = context
      let result: PermissionRequestResult = await atManager.requestPermissionsFromUser(ctx, pems);
      let grantStatus: Array<number> = result.authResults;
      let length: number = grantStatus.length;
      for (let i = 0; i < length; i++) {
        Logger.info(TAG, `grantPermission requestPermissionsFromUser ${result.permissions[i]} +: ${grantStatus[i]}`);
        if (grantStatus[i] !== 0) {
          Logger.info(TAG, 'grantPermission fail');
          return false;
        }
      }
    }
    Logger.info(TAG, 'grantPermission success');
    return true;
  } catch (error) {
    Logger.error(TAG, 'grantPermission fail');
    return false;
  }
}