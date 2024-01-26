/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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

import { SmartRefreshForGame } from "@ohos/smartrefreshlayout"
import {HitBlock} from "@ohos/smartrefreshlayout"

class ThemeParam{
  index:number = 0;
  name:string = "";
  color:string = "";
}

@Entry
@Component
struct HitBlockSample {
  private arr: Array<ThemeParam> = [
    {index:1, name: '默认主题', color: '#ffffff' },
    {index:2, name: '橙色主题', color: '#ffbb33' },
    {index:3, name: '红色主题', color: '#ff4444' },
    {index:4, name: '绿色主题', color: '#99cc00' },
    {index:5, name: '蓝色主题', color: '#2299ee' },
    {index:6, name: '蓝色主题', color: '#2299ee' },
    {index:7, name: '蓝色主题', color: '#2299ee' },
    {index:8, name: '蓝色主题', color: '#2299ee' },
    {index:9, name: '蓝色主题', color: '#2299ee' },
    { index:10,name: '蓝色主题', color: '#2299ee' },
  ]
  @State modelGame: SmartRefreshForGame.Model = new SmartRefreshForGame.Model()

  public aboutToAppear() {
    this.modelGame.setBackgroundColor('#ffbb33')
    this.modelGame.autoRefresh()
  }

  @Builder testHeader() {
    HitBlock({ hitBlockModel: $modelGame })
  }

  @Builder testMain() {
    Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Start, justifyContent: FlexAlign.Start }) {
        ForEach(this.arr, (itemOther:ThemeParam) => {
          Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Start, justifyContent: FlexAlign.Start }) {
            Text(itemOther.name)
              .fontSize(30)
              .fontColor('#282828')
              .padding({ left: 10, top: 10 })

            Text('更改为' + itemOther.name + '颜色')
              .fontSize(25)
              .fontColor('#8c8c8c')
              .padding({ left: 10, top: 5 })

            Text('')
              .backgroundColor('#ececec')
              .height(0.5)
              .width('100%')
              .margin({ top: 10, bottom: 5 })
          }
          .onClick(e => {
            this.modelGame.setBackgroundColor(itemOther.color)
            this.modelGame.autoRefresh()
          })
        }, (item:ThemeParam) => item.index.toString())
    }
    .width("100%")
    .backgroundColor("#ffffff")
  }

  build() {
    Column() {
      SmartRefreshForGame({
        modelGame: $modelGame,
        header: () => {this.testHeader()},
        main: () => {
          this.testMain()
        },
        footer: ()=>{}
      })
    }
  }
}