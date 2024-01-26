/*
 * Copyright (c) 2023 Shenzhen Kaihong Digital Industry Development Co., Ltd.
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

import UIAbility from '@ohos.app.ability.UIAbility';
import window from '@ohos.window';
import abilityAccessCtrl from '@ohos.abilityAccessCtrl';
import type { Permissions } from '@ohos.abilityAccessCtrl';

import type Want from '@ohos.application.Want';
import MediaFileUri from '../media/MediaFileUri';
import Logger from '../common/Logger';

const TAG = 'EntryAbility: ';

let wantInfo = null;

export default class EntryAbility extends UIAbility {
  private mediaFileUri: MediaFileUri = new MediaFileUri();

  private fileName: string = '';
  private size: number = 0;
  private content: string = '';
  private showFlag: Boolean = false;
  private windowStage: window.WindowStage;

  private loadFlag: Boolean = false;
  private loadFileSize: number = 0;
  private loadFileName: string = '';
  private loadFileContent: string = '';
  private loadUri: string = '';

  private storage: LocalStorage = new LocalStorage();

  onCreate(want, launchParam): void {
    Logger.info(TAG, 'Ability onCreate');
    this.getPermission(want);
    wantInfo = want;
  }

  getWantInfo(want: Want): void {
    if (want === null || want === undefined) {
      Logger.info(TAG, 'getWantInfo want is null');
      return;
    }

    let srcUri = want.uri;
    if (srcUri === null || srcUri === undefined) {
      Logger.info(TAG, 'getWantInfo srcUri is null');
      return;
    }

    let parameters = want.parameters;
    if (parameters === null || parameters === undefined) {
      Logger.info(TAG, 'getWantInfo parameters is null');
      return;
    }

    let keyFd = want.parameters.keyFd;
    if (keyFd === null || keyFd === undefined) {
      Logger.info(TAG, 'getWantInfo keyFd is null');
      return;
    }

    let size = want.parameters.keyFd.size;
    if (size === null || size === undefined) {
      Logger.info(TAG, 'getWantInfo size is null');
      return;
    }

    let name = want.parameters.keyFd.name;
    if (name === null || name === undefined) {
      Logger.info(TAG, 'getWantInfo name is null');
      return;
    }

    let content = want.parameters.keyFd.content;
    if (content === null || content === undefined) {
      Logger.info(TAG, 'getWantInfo content is null');
      return;
    }

    let fd = want.parameters.keyFd.value;
    if (fd === null || fd === undefined) {
      Logger.info(TAG, 'getWantInfo fd is null');
      return;
    }

    this.loadFlag = true;
    this.loadFileName = want.parameters.keyFd.name;
    this.loadFileSize = want.parameters.keyFd.size;
    this.loadFileContent = want.parameters.keyFd.content;
    this.loadUri = want.uri;

    this.storage.setOrCreate('loadFlag', this.loadFlag);
    this.storage.setOrCreate('loadUri', this.loadUri);
    this.storage.setOrCreate('loadFileName', this.loadFileName);
    this.storage.setOrCreate('loadFileSize', this.loadFileSize);
    this.storage.setOrCreate('loadFileContent', this.loadFileContent);
    this.storage.setOrCreate('fd', fd);

    Logger.info(TAG, 'getWantInfo Ability loadFlag: ' + this.loadFlag);
    Logger.info(TAG, 'getWantInfo Ability loadUri: ' + want.uri);
    Logger.info(TAG, 'getWantInfo Ability loadFileName: ' + this.loadFileName);
    Logger.info(TAG, 'getWantInfo Ability loadFileSize: ' + this.loadFileSize);
    Logger.info(TAG, 'getWantInfo Ability loadFileContent: ' + this.loadFileContent);

    this.loadEditFilePage();
  }

  onNewWant(want, launchParam): void {
    Logger.info(TAG, 'Ability onNewWant');
    wantInfo = want;
    this.getWantInfo(want);
  }

  onDestroy(): void {
    Logger.info(TAG, 'Ability onDestroy');
  }

  onWindowStageCreate(windowStage: window.WindowStage): void {
    this.windowStage = windowStage;

    // Main window is created, set main page for this ability
    Logger.info(TAG, 'Ability onWindowStageCreate');
    windowStage.loadContent('pages/Index', (err, data) => {
      if (err.code) {
        Logger.error(TAG, 'Failed to load the content. Cause: ' + JSON.stringify(err) ?? '');
        return;
      }
      Logger.info(TAG, 'Succeeded in loading the content. Data: ' + JSON.stringify(data) ?? '');
    });
  }

  onWindowStageDestroy(): void {
    // Main window is destroyed, release UI related resources
    Logger.info(TAG, 'Ability onWindowStageDestroy');
  }

  onForeground(): void {
    // Ability has brought to foreground
    Logger.info(TAG, 'Ability onForeground');
  }

  onBackground(): void {
    // Ability has back to background
    Logger.info(TAG, 'Ability onBackground');
  }

  loadEditFilePage(): void {
    this.windowStage.loadContent('pages/EditFile', this.storage, (err, data) => {
      if (err.code) {
        Logger.error(TAG, 'Failed to load the content. Cause: ' + JSON.stringify(err) ?? '');
        return;
      }
      Logger.info(TAG, 'Succeeded in loading the content. Data: ' + JSON.stringify(data) ?? '');
    });
  }

  getPermission(want: Want): void {
    let array: Array<Permissions> = [
      'ohos.permission.READ_MEDIA',
      'ohos.permission.WRITE_MEDIA',
      'ohos.permission.MEDIA_LOCATION',
      'ohos.permission.READ_IMAGEVIDEO',
      'ohos.permission.WRITE_IMAGEVIDEO',
    ];
    let context = this.context;
    let atManager = abilityAccessCtrl.createAtManager();
    // requestPermissionsFromUser会判断权限的授权状态来决定是否唤起弹窗
    atManager.requestPermissionsFromUser(context, array).then((data) => {
      Logger.info(TAG, 'data type:' + typeof (data));
      Logger.info(TAG, 'data:' + data);
      Logger.info(TAG, 'data permissions:' + data.permissions);
      Logger.info(TAG, 'data result:' + data.authResults);

      this.mediaFileUri.getAllFiles(context);
      Logger.info(TAG, 'getPermission getWantInfo');
      this.getWantInfo(want);
    }).catch((err) => {
      Logger.error(TAG, 'Failed to start ability' + err.code);
    });
  }
}
