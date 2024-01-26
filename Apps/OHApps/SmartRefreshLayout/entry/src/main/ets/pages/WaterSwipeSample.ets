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
import {SmartRefresh} from "@ohos/smartrefreshlayout"
import {WaterSwipe} from "@ohos/smartrefreshlayout"

@Entry
@Component
struct WaterSwipeSample {
   @State model: SmartRefresh.Model = new SmartRefresh.Model()
  arr: string[] = ['默认主题', '橙色主题', '红色主题', '绿色主题', '蓝色主题', '默认主题', '橙色主题', '红色主题', '绿色主题', '蓝色主题']
  pickColor(SelectColorParam: string) {
    let SelectColor = SelectColorParam.trim()
    if (SelectColor == this.arr[0].trim()) {
      this.model.setBackgroundColor(Color.Gray)
    }
    if (SelectColor == this.arr[1].trim()) {
      this.model.setBackgroundColor(Color.Orange)
    }
    if (SelectColor == this.arr[2].trim()) {
      this.model.setBackgroundColor(Color.Red)
    }
    if (SelectColor == this.arr[3].trim()) {
      this.model.setBackgroundColor(Color.Green)
    }
    if (SelectColor == this.arr[4].trim()) {
      this.model.setBackgroundColor(Color.Blue)
    }
  }
  @Builder testHeader() {
    WaterSwipe({ model: $model})
  }
  @Builder card(item: string) {
    Row() {
     Button(item).onClick(()=> {this.pickColor(item)}).fontSize(40).width("100%").height("100%")
    }
    .width("100%")
    .height("280lpx")
    .margin("10lpx")
    .backgroundColor(Color.White)
    .padding("20lpx")
    .alignItems(VerticalAlign.Top)
    .border({ width: "2lpx", color: "#aaaaaa", style: BorderStyle.Solid })
  }
  @Builder testMain() {
    Column() {
      ForEach(this.arr, (item:string) => {
        this.card(item)
      }, (item:string) => item)
    }.width("100%").padding("20lpx")
  }

  build() {
    Column() {
      SmartRefresh({
        model: $model,
        header:()=> {this.testHeader()},
        main:()=> {this.testMain()},
        footer: ()=> {} })
    }.backgroundColor("#dddddd")
  }
}
export default WaterSwipeSample;