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
import { GlobalContext } from '../utils/GlobalContext';
import common from '@ohos.app.ability.common';

@Component
export struct ExitVideo {
  @StorageLink('videoName') videoName: Resource = $r('app.string.video_res_1');

  build() {
    Row() {
      // 退出
      Image($r("app.media.ic_video_back"))
        .id('Exit')
        .width($r('app.float.size_35'))
        .height($r('app.float.size_35'))

      Text(this.videoName)
        .fontColor(Color.White)
        .fontWeight(FontWeight.Medium)
        .fontSize($r('app.float.size_24'))
        .margin({ left: $r('app.float.size_16') })
    }
    .margin({ top: $r('app.float.size_20'), left: $r('app.float.size_25') })
    .onClick(() => {
      (GlobalContext.getContext().getObject('context') as (common.UIAbilityContext)).terminateSelf();
    })
  }
}