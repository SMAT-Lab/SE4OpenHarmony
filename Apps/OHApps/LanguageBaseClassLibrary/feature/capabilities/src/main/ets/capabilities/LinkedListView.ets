/*
* Copyright (c) 2023 Hunan OpenValley Digital Industry Development Co., Ltd.
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

import emitter from '@ohos.events.emitter';
import { EmptyPage, logger } from '@ohos/common';
import { Information } from '../model/Information'
import { InformationItemView } from '../components/InformationItemView';
import { LinkedListDataSource } from '../components/linkedlistcomponents/LinkedListDataSource'
import { Constant } from '../Constant';

const TAG = 'LinkedListView'

@Component
export struct LinkedListView {
  @State totalCount: number = 0;
  @State dataSource: LinkedListDataSource = new LinkedListDataSource();

  aboutToAppear() {
    emitter.on({ eventId: Constant.EMITTER_ID_LINKED_LIST }, (eventData) => {
      let item = eventData.data as Information;
      this.dataSource.addData(item);
      this.totalCount = this.dataSource.totalCount();
    });
  }

  aboutToDisappear() {
    emitter.off(Constant.EMITTER_ID_LINKED_LIST);
  }

  build() {
    Column() {
      if (this.totalCount != 0) {
        List() {
          LazyForEach(this.dataSource, (item: Information, index: number) => {
            ListItem() {
              InformationItemView({
                index: index,
                information: item,
                deleteAction: () => {
                  logger.info(TAG, `deleteAction: ${JSON.stringify(item)}`);
                  if (index === 0) {
                    this.dataSource.deleteFirst();
                    this.totalCount = this.dataSource.totalCount();
                  } else if (index === this.totalCount - 1) {
                    this.dataSource.deleteLast();
                    this.totalCount = this.dataSource.totalCount();
                  } else {
                    this.dataSource.deleteData(index);
                    this.totalCount = this.dataSource.totalCount();
                  }
                }
              })
            }
            .height(72)
            .width('100%')
            .margin({ bottom: 20 })
          }, (item: Information, index: number) => JSON.stringify(item) + index)
        }
        .width('100%')
        .height('100%')
        .padding({ top: 8, left: 12, right: 12 })
      } else {
        EmptyPage()
      }
    }
    .backgroundColor($r('sys.color.ohos_id_color_sub_background'))
  }
}