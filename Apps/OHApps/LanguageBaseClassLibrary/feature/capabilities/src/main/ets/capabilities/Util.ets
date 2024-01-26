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

import { getString } from '@ohos/common';
import { LRUCache } from '../components/utilcomponents/LRUCache';
import { Base64Helper } from '../components/utilcomponents/Base64Helper';
import { MenuList } from '@ohos/menuitems';
import { RationalNumber } from '../components/utilcomponents/RationalNumber';
import { ScopeHelper } from '../components/utilcomponents/ScopeHelper';
import { StringCode } from '../components/utilcomponents/StringCode';
import { TypeCheck } from '../components/utilcomponents/TypeCheck';

@Component
export struct Util {
  @StorageLink('selectedSecondLabel') selectedSecondLabel: string = '';

  @Builder
  UtilCapabilities() {
    if (this.selectedSecondLabel === getString($r('app.string.lru_cache'))) {
      LRUCache()
    }
    if (this.selectedSecondLabel === getString($r('app.string.base64'))) {
      Base64Helper()
    }
    if (this.selectedSecondLabel === getString($r('app.string.string_code'))) {
      StringCode()
    }
    if (this.selectedSecondLabel === getString($r('app.string.rational_number'))) {
      RationalNumber()
    }
    if (this.selectedSecondLabel === getString($r('app.string.type_check'))) {
      TypeCheck()
    }
    if (this.selectedSecondLabel === getString($r('app.string.scope_helper'))) {
      ScopeHelper()
    }
  }

  build() {
    Column() {
      MenuList({ menuList: $r('app.strarray.util_menu') }) {
        Column() {
          Divider()
            .strokeWidth('1px')
            .color($r('sys.color.ohos_id_color_list_separator'))
          this.UtilCapabilities()
        }
      }
    }
    .margin({ left: -12, right: -12 })
  }
}