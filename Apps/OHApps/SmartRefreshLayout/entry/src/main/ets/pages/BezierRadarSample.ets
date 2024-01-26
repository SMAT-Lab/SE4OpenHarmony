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
import { SmartRefreshForBezierRadarSample } from "@ohos/smartrefreshlayout"
import { BezierRadar } from "@ohos/smartrefreshlayout"

class arrParam{
  index:number = 0;
  content:string = "";
}

@Entry
@Component
struct BezierRadarSample {
  @State model: SmartRefreshForBezierRadarSample.Model = new SmartRefreshForBezierRadarSample.Model()
  arr: arrParam[] = [{index:2,content:'蓝色主题'}, {index:3,content:'绿色主题'}, {index:4,content:'红色主题'}, {index:5,content:'橙色主题'},
    {index:8,content:'橙色主题'}, {index:9,content:'橙色主题'}, {index:10,content:'橙色主题'},{index:11,content:'橙色主题'}, {index:12,content:'橙色主题'},
    {index:13,content:'橙色主题'}, {index:14,content:'橙色主题'}, {index:15,content:'橙色主题'}]

  @Builder testMain() {
    Column() {
      ForEach(this.arr, (item:arrParam) => {
        Column() {
          Text(item.content).fontSize("60lpx")
        }.width("100%").alignItems(HorizontalAlign.Start)
        .height("150lpx").onClick(() => {
          if (this.model.refreshState == SmartRefreshForBezierRadarSample.REFRESHSTATE.REFRESHING) { //松开过后的刷新样式
          } else if (this.model.refreshState == SmartRefreshForBezierRadarSample.REFRESHSTATE.TOREFRESH) { //拖住过程中的样式
          } else {
            if (item.content == "蓝色主题") {
              this.model.setPrimaryColor("#0000FF")
              this.model.setRadarFillColor("#ADD8E6")
            } else if (item.content == "绿色主题") {
              this.model.setPrimaryColor("#00785D")
              this.model.setRadarFillColor("#90EE90")
            } else if (item.content == "红色主题") {
              this.model.setPrimaryColor("#FF0000")
              this.model.setRadarFillColor("#FFB6C1")
            } else if (item.content == "橙色主题") {
              this.model.setPrimaryColor("#FF8000")
              this.model.setRadarFillColor("#F5DEB3")
            } else if (item.content == "绿色主题") {
              this.model.setPrimaryColor("#00785D")
              this.model.setRadarFillColor("#90EE90")
            } else if (item.content == "红色主题") {
              this.model.setPrimaryColor("#FF0000")
              this.model.setRadarFillColor("#FFB6C1")
            } else if (item.content == "橙色主题") {
              this.model.setPrimaryColor("#FF8000")
              this.model.setRadarFillColor("#F5DEB3")
            }
          }
        })

        Divider().strokeWidth(2).color(Color.Grey)
      }, (item:arrParam) => item.index.toString())
    }.width("100%").padding("20lpx").backgroundColor(Color.White)
  }

  @Builder testHeader() {
    BezierRadar({ model: $model})
  }

  build() {
    Column() {
      SmartRefreshForBezierRadarSample({
        modelBezierRadar: $model,
        header: () => {
          this.testHeader()
        },
        main: () => {
          this.testMain()
        },
        footer: ()=> {}
      })
    }.backgroundColor("#ffffff")
  }
}
