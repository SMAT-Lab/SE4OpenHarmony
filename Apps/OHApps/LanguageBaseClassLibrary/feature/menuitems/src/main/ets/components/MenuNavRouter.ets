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

import common from '@ohos.app.ability.common';
import { ItemGroup } from './ItemGroup';
import { getString, logger } from '@ohos/common';
import { MainItem } from './MainItem';

const TAG: string = 'MenuNavRouter';

@Component
export struct MenuNavRouter {
  @StorageLink('selectedLabel') selectedLabel: string = '';
  @StorageLink('selectedSecondLabel') selectedSecondLabel: string = '';
  @BuilderParam navDestination: () => void;
  private childList: Array<string> = [];
  private addAction?: (title:string) => void;

  @Builder CustomDivider() {
    Divider()
      .strokeWidth('1px')
      .color($r('sys.color.ohos_id_color_list_separator'))
      .margin({ left: 8, right: 8 })
  }

  build() {
    ItemGroup() {
      Column() {
        ForEach(this.childList, (item: string, index: number) => {
          if (index > 0) {
            this.CustomDivider()
          }
          NavRouter() {
            MainItem({
              title: item
            })
            NavDestination() {
              this.navDestination()
            }
            .title(this.CustomTitle(item))
            .backgroundColor($r('sys.color.ohos_id_color_sub_background'))
          }
          .onStateChange((isActivated: boolean) => {
            if (isActivated) {
              this.selectedLabel = item;
              this.selectedSecondLabel = item;
              logger.info(TAG, `NavRouter isActivated= ${isActivated}, selectedLabel=${item}`);
            }
          })
        }, (item: string) => JSON.stringify(item))
      }
    }
  }

  @Builder
  CustomTitle(title: string) {
    Row() {
      Text(title)
        .fontColor($r('app.color.black'))
        .fontSize(16)
        .fontWeight(FontWeight.Bold)

      Row() {
        Image($r('app.media.ic_public_add'))
          .height(24)
          .aspectRatio(1)
          .objectFit(ImageFit.Contain)
      }
      .id('add')
      .height('100%')
      .aspectRatio(1)
      .visibility(this.showAddButton(title) ? Visibility.Visible : Visibility.None)
      .onClick(() => {
        logger.info(TAG, 'addAction')
        if (this.addAction) {
          this.addAction(title)
        }
      })
    }
    .width('85%')
    .height(56)
    .justifyContent(FlexAlign.SpaceBetween)
  }

  showAddButton(title: string) {
    let ret = false
    switch (title) {
      case getString($r('app.string.deque')):
      case getString($r('app.string.hash_map')):
      case getString($r('app.string.hash_set')):
      case getString($r('app.string.light_weight_map')):
      case getString($r('app.string.light_weight_set')):
      case getString($r('app.string.linked_list')):
      case getString($r('app.string.list')):
      case getString($r('app.string.array_list')):
      case getString($r('app.string.plain_array')):
      case getString($r('app.string.queue')):
      case getString($r('app.string.stack')):
      case getString($r('app.string.tree_map')):
      case getString($r('app.string.tree_set')):
      case getString($r('app.string.vector')):
        ret = true
        break;
    }
    return ret
  }

  getString(resource: Resource) {
    let context = getContext(this) as common.UIAbilityContext;
    let resultStr = context.resourceManager.getStringSync(resource);
    logger.info(TAG, `getString = ${resultStr}`);
    return resultStr;
  }
}