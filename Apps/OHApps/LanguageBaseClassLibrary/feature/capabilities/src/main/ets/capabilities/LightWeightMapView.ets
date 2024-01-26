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

import LightWeightMap from '@ohos.util.LightWeightMap';
import emitter from '@ohos.events.emitter';
import { EmptyPage, logger } from '@ohos/common';
import { KeyValueItemView } from '../components/KeyValueItemView';
import { KeyValuePair } from '../model/KeyValuePair';
import { LightWeightMapDataSource } from '../components/lightweightmapcomponents/LightWeightMapDataSource';
import { Constant } from '../Constant';

const TAG = 'LightWeightMapView';

@Component
export struct LightWeightMapView {
  @State totalCount: number = 0;
  private lightWeightMap: LightWeightMap<string, string> = new LightWeightMap();
  @State dataSource: LightWeightMapDataSource = new LightWeightMapDataSource();

  aboutToAppear() {
    emitter.on({ eventId: Constant.EMITTER_ID_LIGHT_WEIGHT_MAP }, (eventData) => {
      let item: KeyValuePair = eventData.data as KeyValuePair;
      this.dataSource.addData(item);
      this.totalCount = this.dataSource.totalCount();
      this.lightWeightMap.set(item.key, item.value);
    });
  }

  aboutToDisappear() {
    emitter.off(Constant.EMITTER_ID_LIGHT_WEIGHT_MAP);
  }

  build() {
    Column() {
      if (this.totalCount != 0) {
        List({ space: 12 }) {
          LazyForEach(this.dataSource, (item: KeyValuePair, index: number) => {
            ListItem() {
              KeyValueItemView({
                index: index,
                keyValuePair: item,
                deleteAction: () => {
                  logger.info(TAG, `item = ${JSON.stringify(item)}`)
                  this.dataSource.deleteData(item, index);
                  this.totalCount = this.dataSource.totalCount();
                  this.lightWeightMap.remove(item.key);
                }
              })
            }
            .height(72)
            .width('100%')
          }, (item: KeyValuePair, index: number) => JSON.stringify(item) + index)
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