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

import router from '@ohos.router'
class RefreshTypeMapParam{
  id:number = 0;
  name: string = "";
  url:string = ""
}
@Entry
@Component
struct Index {
  scroller: Scroller = new Scroller()
  private refreshTypeMap: Array<RefreshTypeMapParam> = [
    {id:1, name: "Classics", url: "pages/ClassicsSample" },
    {id:2, name: "WaterSwipe", url: "pages/WaterSwipeSample" },
    {id:3, name: "BezierCircle", url: "pages/BezierCircleSample" },
    {id:4, name: "Material", url: "pages/MaterialSample" },
    {id:5, name: "WaveSwipe", url: "pages/WaveSwipeSample" },
    {id:6, name: "BezierRadar", url: "pages/BezierRadarSample" },
    {id:7, name: "StoreHouse", url: "pages/StoreHouseSample" },
    {id:8, name: "Delivery", url: "pages/DeliverySample" },
    {id:9, name: "DropBox", url: "pages/DropBoxSample" },
    {id:10, name: "FlyRefreshHeader", url: "pages/FlyRefreshStylePage" },
    {id:11, name: "BattleCity", url: "pages/BattleCitySample" },
    {id:12, name: "HitBlock", url: "pages/HitBlockSample" },
    {id:13, name: "Phoenix", url: "pages/PhoenixSample" },
    {id:14, name: "Taurus", url: "pages/TaurusSample" },
  ]
  build() {
    Stack() {
      Scroll(this.scroller) {
        Column({ space: 20 }) {
          ForEach(this.refreshTypeMap, (item:RefreshTypeMapParam) => {
            Text(item.name)
              .height(50)
              .fontSize(40)
              .fontColor(Color.Black)
              .backgroundColor(Color.Gray)
              .width("100%")
              .textAlign(TextAlign.Center)
              .onClick(() => {
                 router.push({ url: item.url})
              })
          }, (item:RefreshTypeMapParam) => item.id.toString())
        }
      }
    }
  }
}