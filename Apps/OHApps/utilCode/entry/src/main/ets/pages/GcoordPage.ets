/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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

import gcoord from 'gcoord'
import { Position } from 'gcoord'

@Entry
@Component
struct GcoordPage {
  @State BD092GCJ02: number[] = [];
  @State GCJ022BD09: number[] = [];
  @State GCJ022WGS84: number[] = [];
  @State WGS842GCJ02: number[] = [];
  @State BD092WGS84: number[] = [];
  @State WGS842BD09: number[] = [];

  @State lat: number = 39;//纬度
  @State lon: number = 116;//经度
  private point: number[] = [this.lon,this.lat];
  scroller: Scroller = new Scroller()

  build() {

    Scroll(this.scroller){

      Column() {

        Column() {

          TextInput({text: this.lon.toString(), placeholder: '请输入经度' })
            .height(60)
            .fontSize(18)
            .type(InputType.Number)
            .margin(18)
            .maxLength(3)
            .onChange((value: string) => {
              if (value.length > 0) {
                this.lon = Number.parseFloat(value)
              }else {
                this.lon = 0
              }
            })

          TextInput({text: this.lat.toString(), placeholder: '请输入维度' })
            .height(60)
            .fontSize(18)
            .margin(18)
            .maxLength(2)
            .onChange((value: string) => {
              if (value.length>0) {
                this.lat = Number.parseFloat(value)
              }else {
                this.lat = 0
              }
            })


          Button('全部转换')
            .fontSize(18)
            .onClick(() => {

              this.BD092GCJ02 = gcoord.transform<Position>(
                [this.lon, this.lat], // 经纬度坐标
                gcoord.BD09, // 当前坐标系
                gcoord.GCJ02 // 目标坐标系
              );

              this.GCJ022BD09 = gcoord.transform<Position>(
                [this.lon, this.lat], // 经纬度坐标
                gcoord.GCJ02, // 当前坐标系
                gcoord.BD09 // 目标坐标系
              );
              this.GCJ022WGS84 = gcoord.transform<Position>(
                [this.lon, this.lat], // 经纬度坐标
                gcoord.GCJ02, // 当前坐标系
                gcoord.WGS84 // 目标坐标系
              );
              this.WGS842GCJ02 = gcoord.transform<Position>(
                [this.lon, this.lat], // 经纬度坐标
                gcoord.WGS84, // 当前坐标系
                gcoord.GCJ02 // 目标坐标系
              );
              this.BD092WGS84 = gcoord.transform<Position>(
                [this.lon, this.lat], // 经纬度坐标
                gcoord.BD09, // 当前坐标系
                gcoord.WGS84 // 目标坐标系
              );
              this.WGS842BD09 = gcoord.transform<Position>(
                [this.lon, this.lat], // 经纬度坐标
                gcoord.WGS84, // 当前坐标系
                gcoord.BD09 // 目标坐标系
              );
            })
        }

        Divider().strokeWidth(1).color('#F1F3F5').margin({ top: 8, bottom: 8 })

        Column() {
          Button('BD09 坐标转 GCJ02 坐标')
            .fontSize(18)
            .onClick(() => {
              this.BD092GCJ02 = gcoord.transform<Position>(
                [this.lon, this.lat], // 经纬度坐标
                gcoord.BD09, // 当前坐标系
                gcoord.GCJ02 // 目标坐标系
              );
              console.log('BD09 坐标转 GCJ02 坐标:' + this.BD092GCJ02); // [116.41661560068297, 39.92196580126834]
            })
          Text('' + this.BD092GCJ02)
        }

        Divider().strokeWidth(1).color('#F1F3F5').margin({ top: 8, bottom: 8 })

        Column() {
          Button('GCJ02 坐标转 BD09 坐标')
            .fontSize(18)
            .onClick(() => {
              this.GCJ022BD09 = gcoord.transform<Position>(
                [this.lon, this.lat], // 经纬度坐标
                gcoord.GCJ02, // 当前坐标系
                gcoord.BD09 // 目标坐标系
              );
              console.log('GCJ02 坐标转 BD09 坐标:' + this.GCJ022BD09); // [116.41661560068297, 39.92196580126834]
            })
          Text('' + this.GCJ022BD09)
        }

        Divider().strokeWidth(1).color('#F1F3F5').margin({ top: 8, bottom: 8 })

        Column() {
          Button('GCJ02  坐标转 WGS84  坐标')
            .fontSize(18)
            .onClick(() => {
              this.GCJ022WGS84 = gcoord.transform<Position>(
                [this.lon, this.lat], // 经纬度坐标
                gcoord.GCJ02, // 当前坐标系
                gcoord.WGS84 // 目标坐标系
              );
              console.log('GCJ02 坐标转 WGS84 坐标:' + this.GCJ022WGS84); // [116.41661560068297, 39.92196580126834]
            })
          Text('' + this.GCJ022WGS84)
        }

        Divider().strokeWidth(1).color('#F1F3F5').margin({ top: 8, bottom: 8 })

        Column() {
          Button('WGS84  坐标转 GCJ02  坐标')
            .fontSize(18)
            .onClick(() => {
              this.WGS842GCJ02 = gcoord.transform<Position>(
                [this.lon, this.lat], // 经纬度坐标
                gcoord.WGS84, // 当前坐标系
                gcoord.GCJ02 // 目标坐标系
              );
              console.log('GCJ02 坐标转 WGS84 坐标:' + this.WGS842GCJ02); // [116.41661560068297, 39.92196580126834]
            })
          Text('' + this.WGS842GCJ02)
        }

        Divider().strokeWidth(1).color('#F1F3F5').margin({ top: 8, bottom: 8 })

        Column() {
          Button('BD09  坐标转 WGS84  坐标')
            .fontSize(18)
            .onClick(() => {
              this.BD092WGS84 = gcoord.transform<Position>(
                [this.lon, this.lat], // 经纬度坐标
                gcoord.BD09, // 当前坐标系
                gcoord.WGS84 // 目标坐标系
              );
              console.log('GCJ02 坐标转 WGS84 坐标:' + this.BD092WGS84); // [116.41661560068297, 39.92196580126834]
            })
          Text('' + this.BD092WGS84)
        }

        Divider().strokeWidth(1).color('#F1F3F5').margin({ top: 8, bottom: 8 })

        Column() {
          Button('WGS84  坐标转 BD09  坐标')
            .fontSize(18)
            .onClick(() => {
              this.WGS842BD09 = gcoord.transform<Position>(
                [this.lon, this.lat], // 经纬度坐标
                gcoord.WGS84, // 当前坐标系
                gcoord.BD09 // 目标坐标系
              );
              console.log('WGS84 坐标转 BD09 坐标:' + this.WGS842BD09); // [116.41661560068297, 39.92196580126834]
            })
          Text('' + this.WGS842BD09)
        }


      }
      .padding({ top: 18, bottom: 18 })
    }
    .scrollable(ScrollDirection.Vertical)
    .scrollBar(BarState.Off)
    .scrollBarColor(Color.Gray)
    .scrollBarWidth(1)


  }
}