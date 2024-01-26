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

import { Information } from '../model/Information';
import { Constant } from '../Constant';
import { InformationItemView } from '../components/InformationItemView';
import { EmptyPage } from '@ohos/common';
import emitter from '@ohos.events.emitter';
import { ArrayListDataSource } from '../components/arraylistcomponents/ArrayListDataSource';

const MIN_LENGTH = 0;

@Preview
@Component
export struct ArrayListView {
  @State dataSource: ArrayListDataSource = new ArrayListDataSource();
  @State totalCount: number = MIN_LENGTH;

  aboutToAppear() {
    emitter.on({ eventId: Constant.EMITTER_ID_ARRAY_LIST }, (eventData) => {
      this.dataSource.addData(eventData.data as Information);
      this.totalCount = this.dataSource.totalCount();
    });
  }

  aboutToDisappear() {
    emitter.off(Constant.EMITTER_ID_ARRAY_LIST);
  }

  build() {
    Column() {
      if (this.totalCount > MIN_LENGTH) {
        List() {
          LazyForEach(this.dataSource, (item: Information, index: number) => {
            ListItem() {
              InformationItemView({ index: index, information: item, deleteAction: () => {
                this.dataSource.deleteData(index);
                this.totalCount = this.dataSource.totalCount();
              } })
            }
            .height(72)
            .width('100%')
            .margin({ bottom: 20 })
          }, (item: Information, index: number) => JSON.stringify(item) + index)
        }
        .width('100%')
        .layoutWeight(1)

      } else {
        EmptyPage()
      }
    }
    .backgroundColor($r('sys.color.ohos_id_color_sub_background'))
  }
}