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

import router from '@ohos.router';
import common from '@ohos.app.ability.common';
import TitleBar from '../component/TitleBar';
import OperationView from '../component/OperationView';
import ResourceUtil from '../util/ResourceUtil';


const TAG: string = 'Index';
const operationUrls: Array<string> = ['pages/Calendar', 'pages/TextProcessing'];

@Entry
@Component
struct Index {
  @State operations: Array<string> = [];
  private context: common.UIAbilityContext = getContext(this) as common.UIAbilityContext;

  aboutToAppear() {
    this.getOperation();
  }

  async getOperation() {
    this.operations = await ResourceUtil.getStringArray($r('app.strarray.operation_arr').id, this.context);
  }

  build() {
    Column() {
      TitleBar()
      ForEach(this.operations, (item: string, index) => {
        Row() {
          OperationView({ operationKey: item, handleClick: () => {
            router.pushUrl({
              url: operationUrls[index]
            })
          }
          })
            .id(`operationView_${index}`)
            .margin({ left: 12, right: 12, top: 12 })
        }
      }, (item: string) => item)
    }
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.background'))
  }
}