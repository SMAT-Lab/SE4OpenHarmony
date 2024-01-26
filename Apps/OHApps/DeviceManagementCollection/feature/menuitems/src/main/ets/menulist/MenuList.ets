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

import { getStringArray } from '@ohos/common';
import { MenuNavRouter } from '../components/MenuNavRouter';

@Component
export struct MenuList {
  @State menuListData: Array<string> = [];
  @BuilderParam childNavDestination: () => void;
  private menuList?: Resource = undefined;

  build() {
    List() {
      ListItem() {
        if (this.menuListData.length > 0) {
          MenuNavRouter({ childList: this.menuListData }) {
            this.childNavDestination();
          }
        }
      }
    }
    .borderRadius(20)
    .width('100%')
    .scrollBar(BarState.Off)
    .backgroundColor($r('sys.color.ohos_id_color_sub_background'))
  }

  aboutToAppear() {
    this.getData();
  }

  getData = async () => {
    if (this.menuList) {
      this.menuListData = await getStringArray(this.menuList);
    }
  }
}