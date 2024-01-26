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


import { ItemGroup } from './ItemGroup';
import { logger } from '@ohos/common';
import { MainItem } from './MainItem';

const TAG: string = 'MenuNavRouter';

@Component
export struct MenuNavRouter {
  @StorageLink('selectedLabel') selectedLabel: string = '';
  @BuilderParam navDestination: () => void;
  private childList: Array<string> = [];

  @Builder CustomDivider() {
    Divider()
      .strokeWidth('1px')
      .color($r("app.color.divider"))
      .margin({ left: 16, right: 16 })
  }

  build() {
    ItemGroup() {
      Column() {
        ForEach(this.childList, (item: string, index: number) => {
          if (index > 0) {
            this.CustomDivider();
          }
          NavRouter() {
            MainItem({
              title: item
            })
            NavDestination() {
              Column() {
                this.navDestination();
              }
            }
            .title(item)
            .backgroundColor($r('sys.color.ohos_id_color_sub_background'))
          }
          .onStateChange((isActivated: boolean) => {
            if (isActivated) {
              this.selectedLabel = item;
              logger.info(TAG, `NavRouter isActivated= ${isActivated}, selectedLabel=${item}`);
            }
          })
        }, (item: string) => JSON.stringify(item))
      }
    }
  }
}