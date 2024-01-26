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
 
import { CityModel } from '../../model/CityModel'
import { WeatherUiModel } from '../../model/WeatherUiModel'

@Component
export default struct SideBarContent {
  private lineHeight: number = 40;
  private lineWidth: number = 280;
  private pointArr: number[] = [20, 20, 20, 20, 20];
  @State selectDay: string = '今天';
  @Link isShowSideBar: boolean;
  @Link selectCity: CityModel;
  @Link @Watch('calculatePoint') weatherUiModel: WeatherUiModel;

  build() {
    Column() {

      // 头部
      Row() {
        Image($r('app.media.icon_city'))
          .width(28)
          .height(28)
          .onClick(() => {
            this.isShowSideBar = !this.isShowSideBar;
          })
        Blank()
        Image($r('app.media.icon_more'))
          .width(28)
          .height(28)
      }
      .width('100%')

      // 天气和城市
      Row() {
        Text(this.weatherUiModel.nowTemp.toString())
          .fontSize(120)
          .fontColor('#E6000000')
          .fontWeight(FontWeight.Bold)
        Column() {
          Text('°')
            .fontSize(48)
            .fontColor('#E6000000')
            .fontWeight(FontWeight.Bold)
          Text(this.weatherUiModel.nowWeatherText)
            .fontSize(38)
        }

        Blank()
        Text(this.selectCity.locationName)
          .fontSize(38)
          .margin({ top: 50 })
      }
      .margin({ top: 130 })
      .width('100%')

      // 日期、最高温度、最低温度
      Text(this.weatherUiModel.date + '  ' + this.weatherUiModel.day + '  ' +
      this.weatherUiModel.tempMin + '℃' + '/' + this.weatherUiModel.tempMax + '℃')
        .fontSize(16)
        .margin({ left: 4 })
        .textAlign(TextAlign.Start)
        .width('100%')

      //未来两小时天气和风向
      Row() {
        Column() {
          Text('未来两小时')
            .fontSize(14)
          Blank()
          if (this.weatherUiModel.precip > 0) {
            Text('有雨')
              .fontSize(32)
              .fontColor('#FFF7B500')
          } else if (this.weatherUiModel.precip >= 0) {
            Text('无雨')
              .fontSize(32)
              .fontColor('#FF6DD400')
          } else {
            Text('无雨')
              .fontSize(32)
              .fontColor('#FF6DD400')
          }
        }
        .backgroundColor('#05000000')
        .padding({ top: 12, bottom: 15 })
        .border({ radius: 14 })
        .size({ width: 140, height: 100 })

        Column() {
          Text('风向')
            .fontSize(14)
          Blank()
          Text(this.weatherUiModel.category)
            .fontSize(32)
            .fontColor('#FF6DD400')
        }
        .backgroundColor('#05000000')
        .padding({ top: 12, bottom: 15 })
        .margin({ left: 14 })
        .border({ radius: 14 })
        .size({ width: 140, height: 100 })

      }
      .margin({ top: 24 })
      .width('100%')

      // 实时温度信息
      Column() {
        //时间
        Row() {
          ForEach(this.weatherUiModel.hoursArr, (item) => {
            Text(item)
              .textAlign(TextAlign.Center)
              .layoutWeight(1)
          })
        }
        .margin({ bottom: 10 })

        // 温度折线
        if (this.weatherUiModel.hourlyTemp.length > 0) {
          Polyline({ width: this.lineWidth, height: this.lineHeight })
            .points([[0, this.pointArr[0]],
              [(this.lineWidth * 0.25).toString(), this.pointArr[1]], [(this.lineWidth * 0.5).toString(), this.pointArr[2]],
              [(this.lineWidth * 0.75).toString(), this.pointArr[3]], [(this.lineWidth * 1).toString(), this.pointArr[4]]])
            .fillOpacity(0)
            .stroke('#AAB8CA')
            .strokeWidth(1)

          Row() {
            ForEach(this.weatherUiModel.hourlyTemp, (item) => {
              Text(item.temp + '℃')
                .textAlign(TextAlign.Center)
                .layoutWeight(1)
            })
          }
          .margin({ top: 35 })
        }
      }
      .margin({ top: 39 })
      .width('100%')

      // 近一周天气
      Column() {
        // 天气icon
        Row() {
          ForEach(this.weatherUiModel.iconDays, (item) => {
            Column() {
              Image($rawfile(item.iconDay))
                .size({ width: 24, height: 24 })
            }
            .align(Alignment.Center)
            .layoutWeight(1)
          })
        }

        // 日期
        Row() {
          ForEach(this.weatherUiModel.dayArr, (item) => {
            Column() {
              if (item == this.selectDay) {
                Text(item)
                  .fontColor(Color.White)
                  .textAlign(TextAlign.Center)
                  .height(40)
                  .width(40)
                  .border({ radius: 40 })
                  .fontSize(14)
                  .backgroundColor(Color.Black)
              } else {
                Text(item)
                  .textAlign(TextAlign.Center)
                  .height(40)
                  .width(40)
                  .fontSize(14)
              }
            }
            .layoutWeight(1)
            .align(Alignment.Center)
          })
        }
        .margin({ top: 18 })
      }
      .margin({ top: 30 })
      .width('100%')
    }
    .padding({ left: 38, right: 24, top: 20 })
    .height('100%')
    .width('100%')
    .backgroundColor(Color.White)
  }

  //点位置计算
  calculatePoint() {
    if (this.weatherUiModel.hourlyTemp.length > 0) {
      for (var i = 0; i < 5; i++) {
        let tempArg = parseInt(this.weatherUiModel.hourlyTemp[0].temp)
        if (i == 0) {
          this.pointArr[i] = this.lineHeight - tempArg
        } else {
          this.pointArr[i] = this.lineHeight -
          (((parseInt(this.weatherUiModel.hourlyTemp[i].temp) - tempArg) * 3) +
          parseInt(this.weatherUiModel.hourlyTemp[i].temp))
        }
      }
    }
  }
}