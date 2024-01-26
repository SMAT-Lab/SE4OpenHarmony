/**
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

import { getString } from '@ohos/common';
import {
  ArrayListView,
  ConvertXml,
  Url,
  Util,
  TaskPool,
  DequeView,
  HashMapView,
  HashSetView,
  LightWeightMapView,
  LightWeightSetView,
  LinkedListView,
  ListView,
  PlainArrayView,
  QueueView,
  StackView,
  TreeMapView,
  TreeSetView,
  VectorView
} from '@ohos/capabilities';

@Component
export struct Capabilities {
  @StorageLink('selectedLabel') selectedLabel: string = '';

  build() {
    Column() {
      Divider()
        .strokeWidth('1px')
        .color($r('sys.color.ohos_id_color_list_separator'))
      Column() {
        // 此处根据选中的菜单，显示对应的页面内容
        if (this.selectedLabel === getString($r('app.string.xml'))) {
          ConvertXml()
        }
        if (this.selectedLabel === getString($r('app.string.util'))) {
          Util()
        }
        if (this.selectedLabel === getString($r('app.string.url'))) {
          Url()
        }
        if (this.selectedLabel === getString($r('app.string.array_list'))) {
          ArrayListView()
        }
        if (this.selectedLabel === getString($r('app.string.task_pool'))) {
          TaskPool()
        }
        if (this.selectedLabel === getString($r('app.string.deque'))) {
          DequeView()
        }
        if (this.selectedLabel === getString($r('app.string.hash_map'))) {
          HashMapView()
        }
        if (this.selectedLabel === getString($r('app.string.hash_set'))) {
          HashSetView()
        }
        if (this.selectedLabel === getString($r('app.string.light_weight_map'))) {
          LightWeightMapView()
        }
        if (this.selectedLabel === getString($r('app.string.light_weight_set'))) {
          LightWeightSetView()
        }
        if (this.selectedLabel === getString($r('app.string.linked_list'))) {
          LinkedListView()
        }
        if (this.selectedLabel === getString($r('app.string.list'))) {
          ListView()
        }
        if (this.selectedLabel === getString($r('app.string.plain_array'))) {
          PlainArrayView()
        }
        if (this.selectedLabel === getString($r('app.string.queue'))) {
          QueueView()
        }
        if (this.selectedLabel === getString($r('app.string.stack'))) {
          StackView()
        }
        if (this.selectedLabel === getString($r('app.string.tree_map'))) {
          TreeMapView()
        }
        if (this.selectedLabel === getString($r('app.string.tree_set'))) {
          TreeSetView()
        }
        if (this.selectedLabel === getString($r('app.string.vector'))) {
          VectorView()
        }
      }
      .padding({ left: 12, right: 12 })
    }
  }
}