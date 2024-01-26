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

import { AbilityGlobalDataSyncCode } from './AbilityGlobalDataSyncCode';
import { CodeView } from '../../../commoncomponents/CodeView';
import { TitleBarDark } from '../../../commoncomponents/TitleBarDark';
import { TitleBar } from '../../../commoncomponents/TitleBar';

let storage: LocalStorage = LocalStorage.GetShared();

@Entry(storage)
@Component
struct AbilityGlobalDataSync {
  @State title: Resource = $r('app.string.ability_storage_ui');
  // 初始化夜间模式的状态
  @LocalStorageLink('currentModelStatus') currentModelStatus: boolean = true;

  build() {
    Column() {
      // 展示不同模式下的标题
      if (this.currentModelStatus) {
        TitleBarDark({ title: $title })
      } else {
        TitleBar({ title: $title })
      }
      CodeView({ title: $title, isShowTitle: false }) {
        AbilityGlobalDataSyncCode()
      }
    }
    .width('100%')
    .height('100%')
    .backgroundColor(this.currentModelStatus ? $r('app.color.nightnode_color') : $r('app.color.background_shallow_grey'))
  }

  aboutToDisappear(): void {
    AppStorage.setOrCreate('sideBarShow', false);
  }
}