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
import { SmartRefreshForTaurus } from "@ohos/smartrefreshlayout"
import { Phoenix } from "@ohos/smartrefreshlayout"
import { PhoenixBottomRefresh } from "@ohos/smartrefreshlayout"

class ArrParam {
  index:number = 0;
  name:string = "";
  color:string = "";
}
@Entry
@Component
struct PhoenixSample {
  @State model: SmartRefreshForTaurus.Model = new SmartRefreshForTaurus.Model()
  private arr: Array<ArrParam> = [
    {index:11, name: '折叠', color: '1' },
    {index:22, name: '展开', color: '2' },
    {index:44, name: '红色主题', color: '#ff4444' },
    {index:55, name: '绿色主题', color: '#99cc00' },
    {index:66, name: '蓝色主题', color: '#2299ee' },
    {index:33, name: '橙色主题', color: '#ffbb33' },

  ]
  private arrNumberOfCycles: Array<number> = [1,2,3,4,5,6]
  aboutToAppear() {
    this.model.setBackgroundColor('#ffbb33')
    this.model.setExpand(true)
    this.model.setTitleName('金色校园')
  }

  @Builder testHeader() {
    Phoenix({ model: $model })
  }

  @Builder testMain() {
    Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Start, justifyContent: FlexAlign.Start }) {
      ForEach(this.arr, (itemOther:ArrParam) => {
        Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Start, justifyContent: FlexAlign.Start }) {
          Text(itemOther.name)
            .fontSize(30)
            .fontColor('#282828')
            .padding({ left: 10, top: 10 })

          Text(
              itemOther.color == '1' ? '折叠AppBarLayout，变成正常的列表页面' :
                itemOther.color == '2' ? '展开AppBarLayout，变成可伸展头部的页面' :
                '更改为' + itemOther.name + '颜色')
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
          if (itemOther.color == '1') {
            this.model.setExpand(false)
          } else if (itemOther.color == '2') {
            this.model.setExpand(true)
          } else {
            this.model.setBackgroundColor(itemOther.color)
          }
        })

      }, (item:ArrParam) => item.index.toString())
      ForEach(this.arrNumberOfCycles, (item:ArrParam) => {

        Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Start, justifyContent: FlexAlign.Start }) {
          Text("橙色主题")
            .fontSize(30)
            .fontColor('#282828')
            .padding({ left: 10, top: 10 })

          Text('更改为橙色主题颜色')
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
            this.model.setBackgroundColor('#ffbb33')
        })
      }, (item:number) => item.toString())
    }
    .width("100%")
    .backgroundColor("#ffffff")
  }

  @Builder testFooter() {
    Column() {
      PhoenixBottomRefresh({ model: $model })
    }.width("100%")
  }

  build() {
    Column() {
      SmartRefreshForTaurus({
        model: $model,
        header: () => {
          this.testHeader()
        },
        main: () => {
          this.testMain()
        },
        footer: () => {
          this.testFooter()
        }
      })
    }.backgroundColor("#dddddd")
  }
}