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

import { OneMealStatisticsInfo, MealFoodInfo, DietRecord } from '../../model/DataModels'
import { statistics, updateDietWeight } from '../../model/DataUtil'
import { BreakPointType } from '../../common/BreakpointSystem'
import { CustomCounter } from './CustomCounter'

class HistogramLegend {
  public color: string
  public value: Resource

  constructor(color: string, value: Resource) {
    this.color = color
    this.value = value
  }
}

function GetColor(value: number): Resource {
  if (value / 1000 > 100) {
    return $r("app.color.theme_color_orange")
  } else {
    return $r("app.color.theme_color_green")
  }
}

@Component
struct Histogram {
  @Consume("dietData") dietData: Array<OneMealStatisticsInfo>
  @BuilderParam content?: (item: OneMealStatisticsInfo) => void
  @BuilderParam legendComponent?: (item: HistogramLegend) => void
  private title: string | Resource = ''
  private legend: HistogramLegend[] = []

  build() {
    Column() {
      Text(this.title)
        .textAlign(TextAlign.Start)
        .fontSize(24)
        .fontColor('#000000')
        .fontFamily('HarmonyHeTi-Medium')
        .width('100%')
        .height(46)

      Stack({ alignContent: Alignment.Bottom }) {
        Column() {
          ForEach([0, 0, 0, 0, 0, 0], (item: number) => {
            Divider()
              .strokeWidth(1)
              .color('#D8D8D8')
          })
        }
        .height('100%')
        .margin({ top: 20 })
        .justifyContent(FlexAlign.SpaceBetween)

        Column() {
          Flex({ direction: FlexDirection.Row, justifyContent: FlexAlign.SpaceEvenly, alignItems: ItemAlign.Start }) {
            ForEach(this.dietData, (item: OneMealStatisticsInfo) => {
              if (item.mealFoods.length > 1) {
                Column() {
                  if (this.content !== undefined) {
                    this.content(item)
                  }
                  Text(item.mealTime.name).fontSize(14)
                    .fontColor('#7E7E7E')
                    .fontFamily('HarmonyHeTi')
                    .margin({ top: 10 })
                }
                .justifyContent(FlexAlign.End)
                .height('100%')
              }
            })
          }
        }
        .height(236)
      }
      .height(190)

      Row() {
        ForEach(this.legend, (item: HistogramLegend) => {
          Row() {
            Rect({ width: 9, height: 9, radius: 9 }).fill(item.color).margin({ right: 18 })
            if (this.legendComponent !== undefined) {
              this.legendComponent(item)
            }
          }
        })
      }
      .justifyContent(FlexAlign.SpaceEvenly)
      .width('100%')
      .margin({ top: 70 })
    }
    .height('100%')
    .padding({ left: 32, right: 32 })
    .borderRadius(12)
    .backgroundColor('#FFFFFF')
  }
}

@Component
struct NutritionHistogramContent {
  private legend: HistogramLegend[] = [
    new HistogramLegend('#FFD339', $r("app.string.diet_record_fat")),
    new HistogramLegend('#FD9A42', $r("app.string.diet_record_protein")),
    new HistogramLegend('#73CD57', $r("app.string.diet_record_carbohydrates"))
  ]

  @Builder
  legendComponent(item: HistogramLegend) {
    Text(item.value).fontSize(12).fontColor('#18181A').fontFamily('HarmonyHeTi')
  }

  @Builder
  content(item: OneMealStatisticsInfo) {
    Column() {
      if (item.totalFat > 0) {
        Rect({ width: 14, height: item.totalFat / 200 + 14, radius: 7 }).fill('#FD9A42')
          .padding({ top: 14 })
          .margin({ bottom: -28 })
      }
      if (item.totalProtein > 0) {
        Rect({ width: 14, height: item.totalProtein / 200 + 14, radius: 7 })
          .fill('#FBD44E')
          .padding({ top: 14 })
          .margin({ bottom: -21 })
      }
      if (item.totalCarbohydrates > 0) {
        Rect({ width: 14, height: item.totalCarbohydrates / 200 + 14, radius: 7 }).fill('#73CD57')
          .padding({ top: 7 })
          .margin({ bottom: -7 })
      }
    }.clip(true)
  }

  build() {
    Row() {
      Histogram({
        title: $r("app.string.nutrition_element"),
        content: this.content,
        legend: this.legend,
        legendComponent: this.legendComponent
      })
    }
  }
}

@Component
struct HeatHistogramContent {
  private legend: HistogramLegend[] = [
    new HistogramLegend('#FD9A42', $r("app.string.high_calorie")),
    new HistogramLegend('#73CD57', $r("app.string.medium_low_calories")),
  ]

  @Builder
  legendComponent(item: HistogramLegend) {
    Text(item.value).fontSize(12).fontColor('#18181A').fontFamily('HarmonyHeTi')
  }

  @Builder
  content(item: OneMealStatisticsInfo) {
    Column() {
      Rect({ width: 14, height: item.totalCalories / 1000 + 14, radius: 14 })
        .fill(GetColor(item.totalCalories))
        .padding({ top: 7 })
        .margin({ bottom: -7 })
    }
    .clip(true)
  }

  build() {
    Row() {
      Histogram({
        title: $r("app.string.diet_record_calorie"),
        content: this.content,
        legend: this.legend,
        legendComponent: this.legendComponent
      })
    }
  }
}

@Component
struct MealFoodDetail {
  @Consume("dataChange") notifyDataChange: number
  @State shown: boolean = true
  @State translateX: number = 0
  private mealFoodInfo?: MealFoodInfo
  private panTranslateX: number = 300

  build() {
    if (this.shown) {
      if (this.mealFoodInfo !== undefined && this.mealFoodInfo.weight != 0) {
        Row() {
          Row() {
            Image(this.mealFoodInfo.image)
              .width(50)
              .height(50)
            Column() {
              Text(this.mealFoodInfo.name)
                .fontSize(16)
                .fontColor('#444444')
                .fontFamily('HarmonyHeTi')
                .margin({ bottom: 4 })
              Text($r('app.string.calorie_with_kcal_unit', (this.mealFoodInfo.calories / 100).toString()))
                .fontSize(11)
                .fontColor('#A3A3A3')
                .fontFamily('HarmonyHeTi')
            }.alignItems(HorizontalAlign.Start)

            Blank()
            CustomCounter({
              //              value: this.mealFoodInfo.weight + 'g',
              value: this.mealFoodInfo.weight + 'g',
              onDec: () => {
                if (this.mealFoodInfo !== undefined && this.mealFoodInfo.weight > 0) {
                  this.mealFoodInfo.weight -= 50
                  updateDietWeight(this.mealFoodInfo.recordId, this.mealFoodInfo.weight)
                  this.notifyDataChange++
                }
              },
              onInc: () => {
                if (this.mealFoodInfo !== undefined) {
                  this.mealFoodInfo.weight += 50
                  updateDietWeight(this.mealFoodInfo.recordId, this.mealFoodInfo.weight)
                  this.notifyDataChange++
                }
              }
            })
          }
          .width('100%')

          Image($r("app.media.ic_public_delete"))
            .backgroundColor('#E84026')
            .objectFit(ImageFit.ScaleDown)
            .borderRadius(20)
            .margin({ left: 50 })
            .size({ width: 40, height: 40 })
            .onClick(() => {
              animateTo({ duration: 400 }, () => {
                this.shown = false
                let dietRecords = AppStorage.Get<Array<DietRecord>>('dietRecords')
                if (dietRecords !== undefined && this.mealFoodInfo !== undefined) {
                  let index = dietRecords.findIndex((item) => {
                    return item.foodId == this.mealFoodInfo!.foodId
                  })
                  dietRecords[index].weight = 0
                  AppStorage.SetOrCreate<Array<DietRecord>>('dietRecords', dietRecords)
                }

              })
            })
        }
        .transition({ type: TransitionType.Delete, translate: { x: -350, y: 0 }, opacity: 0 })
        .translate({ x: this.translateX })
        .width('100%')
        .height(70)
        .gesture(
          PanGesture()
            .onActionUpdate((event?: GestureEvent) => {
              if (event && event.offsetX < 0) {
                if (event.offsetX < -100) {
                  this.translateX = (event.offsetX * Math.exp(-1.848)) - 100
                } else {
                  this.translateX = event.offsetX
                }
              }
            })
        )
      }
    }
  }
}

@Component
struct MealCard {
  @ObjectLink mealInfo: OneMealStatisticsInfo

  build() {
    Column() {
      if (this.mealInfo.mealFoods.length > 1) {
        Text(this.mealInfo.mealTime.name)
          .fontSize(24)
          .fontFamily('HarmonyHeTi-Medium')
          .height(56)
          .width('100%')
          .backgroundColor('#FFFFFF')
          .padding({ left: 16, right: 16 })

        ForEach(this.mealInfo.mealFoods, (mealItem: MealFoodInfo) => {
          MealFoodDetail({ mealFoodInfo: mealItem })
        })
      }
    }
    .backgroundColor(Color.White)
    .borderRadius(12)
    .padding({ left: 16, right: 16 })
    .margin(12)
  }
}

@Component
struct DietDetails {
  @Consume("dietData") dietData: Array<OneMealStatisticsInfo>
  @StorageProp('currentBreakpoint') currentBreakpoint: string = 'sm'

  build() {
    Scroll() {
      Column() {
        Swiper() {
          HeatHistogramContent()
          NutritionHistogramContent()
        }
        .itemSpace(12)
        .height(400)
        .width('100%')
        .indicatorStyle({ selectedColor: $r('app.color.theme_color_green') })
        .indicator(new BreakPointType({ sm: true, md: false, lg: false }).getValue(this.currentBreakpoint) as boolean)
        .displayCount(new BreakPointType({ sm: 1, md: 2, lg: 2 }).getValue(this.currentBreakpoint) as number)

        ForEach(this.dietData, (item: OneMealStatisticsInfo) => {
          MealCard({ mealInfo: item })
        })
      }
    }
    .backgroundColor('#EDF2F5')
  }
}

@Component
struct NoRecord {
  build() {
    Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Start }) {
      Text($r("app.string.title_record"))
        .fontSize(26)
        .padding({ left: 26, top: 12 })
      Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center }) {
        Image($r("app.media.norecord"))
          .height(130)
          .width(130)
        Text($r("app.string.no_record_content"))
          .fontSize(15)
          .fontColor('rgba(0, 0,0,0.4)')
      }
      .width('100%')
    }
    .width('100%')
  }
}

@Entry
@Component
export struct Records {
  @StorageLink('dietRecords') @Watch('onDataChange') dietRecords: Array<DietRecord> = []
  @Provide("dietData") dietStatisticsData: Array<OneMealStatisticsInfo> = []
  @Provide("dataChange") @Watch('onDataChange') listenDataChange: number = 0

  onDataChange() {
    console.log('onDataChange')
    this.dietStatisticsData = statistics()
  }

  aboutToAppear() {
    this.dietStatisticsData = statistics()
  }

  build() {
    Column() {
      if (this.dietStatisticsData.length === 0) {
        NoRecord()
      } else {
        DietDetails()
      }
    }
  }
}