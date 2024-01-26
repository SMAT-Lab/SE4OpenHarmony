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

import { UniAndBidirectionSyncCode } from './UniAndBidirectionSyncCode';
import { CodeView } from '../../../../../commoncomponents/CodeView';

@Entry
@Component
struct UniAndBidirectionSync {
  @State title: Resource = $r('app.string.single_and_two_way_sync');

  build() {
    Column() {
      CodeView({ title: $title }) {
        UniAndBidirectionSyncCode()
      }
    }
    .width('100%')
    .height('100%')
    .padding($r('app.float.page_padding'))
    .backgroundColor($r('app.color.background_shallow_grey'))
  }

  aboutToDisappear(): void {
    AppStorage.setOrCreate('sideBarShow', false);
  }
}