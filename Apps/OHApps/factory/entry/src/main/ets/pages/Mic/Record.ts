/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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

import mediaLibrary from '@ohos.multimedia.mediaLibrary'
import common from '@ohos.app.ability.common'
import DateTimeUtil from '../../model/DateTimeUtil'
import MediaManager from './MediaManager'

const dateTimeUtil = new DateTimeUtil()

export class Record {
  fileAsset?: mediaLibrary.FileAsset;
  title: string = ''
  duration: string = ''
  context!: common.UIAbilityContext;

  constructor(context: common.UIAbilityContext) {
    this.context = context
  }

  async init(fileAsset?: mediaLibrary.FileAsset) {
    this.fileAsset = fileAsset;
    if (fileAsset) {
      if (fileAsset.duration > 0) {
        this.duration = dateTimeUtil.getDurationString(fileAsset.duration)
      } else {
        let mediaManager = new MediaManager(this.context)
        this.duration = await mediaManager.getFileDuration(fileAsset.title)
      }
      this.title = fileAsset.title
    } else {
      this.duration = '00:00'
      this.title = ''
    }
  }
}