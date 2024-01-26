/*
 * Copyright 2023 Unionman Technology Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { TempInfo, TempInfoTable } from '../common/database/TempInfoTable';
import { value_text, get_value_button, GridExample, time_text, getdata, onlywirte } from "./widgets"
import prompt from '@system.prompt';
import router from '@ohos.router';
import { GlobalContext } from '../global/Global';

//查看100s内的温度数据，如果不足100s则实时生成动态变化。
@Entry
@Component
struct Index {
  @State datainfolist: Array<TempInfo> = []; //存放查询结果的数组
  @State TempInfoobj: TempInfoTable = new TempInfoTable();

  onPageShow() {
    let TempInfo = GlobalContext.getContext().getObject("obj") as TempInfoTable
    this.TempInfoobj = TempInfo;
    console.log("xxxxx");
  }

  build() {
    Column() {
      Row() {
        Image($r('app.media.icon_back'))
          .width(24)
          .height(24)
      }
      .width('95%')
      .onClick(() => {
        router.back();
      })

      GridExample({ TempInfoobj: $TempInfoobj, datainfolist: $datainfolist });
    }
  }
}
