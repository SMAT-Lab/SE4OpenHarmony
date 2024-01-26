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

import curves from '@ohos.curves'
import router from '@ohos.router'
import { CIRCLE_RADIUS } from '../common/Constants'
import { BreakPointType } from '../common/BreakpointSystem'
import { FoodInfo, CategoryId, MealTime, MealTimeId, DietRecord } from '../model/DataModels'
import { getFoodInfo, initDietRecords, getMileTimes } from '../model/DataUtil'

@Styles
function cardStyle() {
  .height('100%')
  .padding({ top: 20, right: 20, left: 20 })
  .backgroundColor(Color.White)
  .borderRadius(12)
}

@Component
struct CardTitle {
  private title: string | Resource | undefined = '';
  private subtitle: string | Resource | undefined = '';

  build() {
    Row() {
      Text(this.title)
        .fontSize(26)
      Blank()
      Text(this.subtitle)
        .fontSize(13)
        .fontColor('rgba(0,0,0,0.6)')
    }
    .width('100%')
    .height(26)
  }
}

@Component
struct PageTitle {
  private foodName: Resource = $r('app.string.title_food_detail')

  build() {
    Row() {
      Image($r('app.media.back'))
        .width(20)
        .height(20)
        .onClick(() => {
          router.back()
        })
      Text(this.foodName)
        .fontSize(22)
        .margin({ left: 20 })
    }
    .padding(12)
    .width('100%')
  }
}

@Component
struct FoodImageDisplay {
  private foodInfo: FoodInfo = new FoodInfo(0, '', '', null)
  @State imageBgColorA: number = 0
  @StorageProp('currentBreakpoint') currentBreakpoint: string = 'sm'

  build() {
    Stack({ alignContent: Alignment.BottomStart }) {
      Image(this.foodInfo.image!)
        .sharedTransition(this.foodInfo.letter, {
          duration: 400,
          curve: curves.cubicBezier(0.2, 0.2, 0.1, 1.0),
          delay: 100
        })
        .backgroundColor(`rgba(255, 255, 255, ${this.imageBgColorA})`)
        .objectFit(ImageFit.Contain)
      Text(this.foodInfo.name)
        .fontSize(26)
        .fontWeight(FontWeight.Bold)
        .margin({ left: 26, bottom: 18 })
    }
    .height(this.currentBreakpoint == 'lg' ? 166 : 280)
  }
}

@Component
struct ContentTable {
  private foodInfo: FoodInfo = new FoodInfo(0, '', '', null)

  @Builder
  IngredientItem(title: string | Resource | undefined, colorValue: string, name: Resource, value: Resource) {
    Row() {
      Text(title)
        .fontSize(18)
        .fontWeight(FontWeight.Bold)
        .layoutWeight(1)
        .align(Alignment.Start)
      Row() {
        Circle({ width: 6, height: 6 })
          .margin({ right: 12 })
          .fill(colorValue)
        Text(name)
          .fontSize(18)
        Blank()
        Text(value)
          .fontSize(18)
      }
      .width('100%')
      .layoutWeight(2)
    }
    .margin({ bottom: 20 })
  }

  build() {
    Column() {
      this.IngredientItem($r('app.string.diet_record_calorie'), '#F54040', $r('app.string.diet_record_calorie'), $r('app.string.calorie_with_kcal_unit', this.foodInfo.calories.toString()))
      Row().height(20)
      this.IngredientItem($r('app.string.nutrition_element'), '#CCC', $r('app.string.nutrition_element'), $r('app.string.weight_with_gram_unit', this.foodInfo.protein.toString()))
      this.IngredientItem('', '#F5D640', $r('app.string.diet_record_fat'), $r('app.string.weight_with_gram_unit', this.foodInfo.fat.toString()))
      this.IngredientItem('', '#9E9EFF', $r('app.string.diet_record_carbohydrates'), $r('app.string.weight_with_gram_unit', this.foodInfo.carbohydrates.toString()))
      this.IngredientItem('', '#53F540', $r('app.string.diet_record_vitaminC'), $r('app.string.weight_with_milligram_unit', this.foodInfo.vitaminC.toString()))
    }
    .cardStyle()
  }
}

@Component
struct CaloriesProgress {
  private foodInfo: FoodInfo = new FoodInfo(0, '', '', null);
  private averageCalories: number = 0
  private totalCalories: number = 0
  private highCalories: boolean = false

  aboutToAppear() {
    switch (this.foodInfo.categoryId) {
      case CategoryId.Vegetable:
        this.averageCalories = 26
        break
      case CategoryId.Fruit:
        this.averageCalories = 60
        break
      case CategoryId.Nut:
        this.averageCalories = 606
        break
      case CategoryId.Seafood:
        this.averageCalories = 56
        break
      case CategoryId.Dessert:
        this.averageCalories = 365
        break
    }
    this.totalCalories = this.averageCalories * 2
    this.highCalories = this.foodInfo.calories < this.averageCalories
  }

  build() {
    Column() {
      CardTitle({ title: $r('app.string.diet_record_calorie'), subtitle: $r('app.string.unit_weight') })

      Row() {
        Text(this.foodInfo.calories.toString())
          .fontColor(this.getCalorieColor())
          .fontSize(65)
        Text($r('app.string.calorie_with_kcal_unit', ''))
          .fontSize(20)
          .margin({ bottom: 10 })
      }
      .margin({ top: 25, bottom: 25 })
      .alignItems(VerticalAlign.Bottom)

      Text(this.highCalories ? $r('app.string.high_calorie_food') : $r('app.string.low_calorie_food'))
        .fontSize(13)
        .fontColor('#313131')

      Progress({ value: this.foodInfo.calories, total: this.totalCalories, style: ProgressStyle.Linear })
        .style({ strokeWidth: 24 })
        .color(this.getCalorieColor())
        .margin({ top: 18 })
    }
    .cardStyle()
  }

  getCalorieColor() {
    return this.highCalories ? $r('app.color.high_calorie') : $r('app.color.low_calorie')
  }
}

class NutritionElement {
  element: string | Resource | undefined = '';
  weight: number = 0;
  percent: number = 0;
  beginAngle: number = 0;
  endAngle: number = 0;
  color: string = '';

  constructor(element: Resource, weight: number, color: string) {
    this.element = element
    this.weight = weight
    this.color = color
  }
}

@Component
struct NutritionPieChart {
  private foodInfo: FoodInfo | null = null;
  private nutritionElements: NutritionElement[] = [];
  private settings: RenderingContextSettings = new RenderingContextSettings(true)
  private context: CanvasRenderingContext2D = new CanvasRenderingContext2D(this.settings)

  build() {
    Column() {
      CardTitle({ title: $r('app.string.nutrition_element'), subtitle: $r('app.string.unit_weight') })
      Canvas(this.context)
        .height(CIRCLE_RADIUS * 2)
        .aspectRatio(1)
        .margin({ top: 30, bottom: 32 })
        .onReady(() => {
          this.nutritionElements.forEach((item) => {
            this.context.beginPath()
            this.context.moveTo(CIRCLE_RADIUS, CIRCLE_RADIUS)
            this.context.arc(CIRCLE_RADIUS, CIRCLE_RADIUS, CIRCLE_RADIUS, item.beginAngle, item.endAngle)
            this.context.fillStyle = item.color
            this.context.fill()
          })
        })
      Row() {
        ForEach(this.nutritionElements, (item: NutritionElement) => {
          Row({ space: 4 }) {
            Circle({ width: 8, height: 8 }).fill(item.color)
            Text(item.element).fontSize(12)
            Text($r('app.string.weight_with_gram_unit', item.weight.toString())).fontSize(12)
          }
        })
      }
      .width('100%')
      .justifyContent(FlexAlign.SpaceAround)
    }
    .cardStyle()
  }
}

@Component
struct NutritionPercent {
  private foodInfo: FoodInfo = new FoodInfo(0, '', '', null);
  private nutritionElements: NutritionElement[] = [new NutritionElement($r('app.string.nutrition_element'), 0, '')];

  build() {
    Column() {
      CardTitle({ title: $r('app.string.nutrition_element'), subtitle: $r('app.string.unit_weight') })

      Row() {
        ForEach(this.nutritionElements, (item: NutritionElement) => {
          Column() {
            Stack({ alignContent: Alignment.Center }) {
              Progress({ value: item.percent, type: ProgressType.Ring })
                .style({ strokeWidth: 10 })
                .color(item.color)
                .margin(4)
              Text(item.percent + '%').fontSize(17)
            }

            Text(item.element)
              .fontSize(13)
              .margin({ top: 24 })
            Text($r('app.string.weight_with_gram_unit', item.weight.toString()))
              .fontSize(13)
          }.layoutWeight(1)

        })
      }
      .width('100%')
      .margin({ top: 50 })
    }
    .cardStyle()
  }
}

@CustomDialog
struct Record {
  private foodInfo: FoodInfo = new FoodInfo(0, '', '', null);
  private controller?: CustomDialogController;
  private select: number = 1
  private mileTime: string[] = getMileTimes()
  private foodWeight: string[] = ['25', '50', '100', '150', '200', '250', '300', '350', '400', '450', '500']
  private mealTimeId: MealTimeId = MealTimeId.Lunch
  private mealWeight: number = Number(this.foodWeight[this.select])

  build() {
    Column() {
      Row({ space: 6 }) {
        Column() {
          Text(this.foodInfo.name)
            .minFontSize(18)
            .maxFontSize(30)
            .maxLines(1)
          Text($r('app.string.calorie_with_kcal_unit', this.foodInfo.calories.toString()))
            .fontSize(16)
            .fontColor('rgba(0,0,0,0.4)')
            .margin({ top: 2 })
        }
        .layoutWeight(1)
        .justifyContent(FlexAlign.Center)

        TextPicker({ range: this.mileTime, selected: this.select })
          .height('100%')
          .layoutWeight(1)
          .linearGradient({
            angle: 0,
            direction: GradientDirection.Top,
            colors: [[0xfdfdfd, 0.0], [0xe0e0e0, 0.5], [0xfdfdfd, 1]],
          })
          .onChange((value: string | string[], index: number | number[]) => {
            this.mealTimeId = index as number
          })

        TextPicker({ range: this.foodWeight, selected: this.select })
          .height('100%')
          .layoutWeight(1)
          .linearGradient({
            angle: 0,
            direction: GradientDirection.Top,
            colors: [[0xfdfdfd, 0.0], [0xe0e0e0, 0.5], [0xfdfdfd, 1]],
          })
          .onChange((value: string | string[], index: number | number[]) => {
            this.mealWeight = Number(value)
          })
      }
      .height(128)

      Button($r('app.string.button_food_detail_complete'), { type: ButtonType.Capsule, stateEffect: true })
        .height(43)
        .width('100%')
        .margin({ top: 33, left: 72, right: 72 })
        .backgroundColor($r('app.color.theme_color_green'))
        .onClick(() => {
          let dietRecordsList = AppStorage.Get<Array<DietRecord>>('dietRecords')
          if (dietRecordsList == undefined || dietRecordsList.length === 0) {
            dietRecordsList = initDietRecords
          }
          let dietRecordData = new DietRecord(dietRecordsList.length, this.foodInfo.id, new MealTime(this.mealTimeId), this.mealWeight)
          dietRecordsList.push(dietRecordData)
          AppStorage.SetOrCreate<Array<DietRecord>>('dietRecords', dietRecordsList)
          if (this.controller !== undefined) {
            this.controller.close()
          }
        })
    }
    .cardStyle()
    .height(254)
    .width('90%')
  }
}

@Entry
@Component
struct FoodDetail {
  @StorageProp('currentBreakpoint') currentBreakpoint: string = 'sm'
  private foodInfo: FoodInfo = getFoodInfo()
  private nutritionElements: NutritionElement[] | undefined = undefined;
  dialogController: CustomDialogController = new CustomDialogController({
    builder: Record({ foodInfo: this.foodInfo }),
    autoCancel: true,
    alignment: DialogAlignment.Bottom,
    offset: { dx: 0, dy: -20 },
    customStyle: true
  })

  aboutToAppear() {
    let total = this.foodInfo.protein + this.foodInfo.fat + this.foodInfo.carbohydrates
    this.nutritionElements = [
      new NutritionElement($r('app.string.diet_record_protein'), this.foodInfo.protein, '#ff9421'),
      new NutritionElement($r('app.string.diet_record_fat'), this.foodInfo.fat, '#ffd100'),
      new NutritionElement($r('app.string.diet_record_carbohydrates'), this.foodInfo.carbohydrates, '#4cd041')
    ]
    let lastEndAngle = -0.5 * Math.PI
    this.nutritionElements.forEach((value) => {
      let percent = value.weight / total
      value.percent = Math.round(percent * 100)
      value.beginAngle = lastEndAngle
      value.endAngle = (percent * 2 * Math.PI) + lastEndAngle
      lastEndAngle = value.endAngle
      return value
    })
  }

  build() {
    Scroll() {
      Column() {
        PageTitle()
        FoodImageDisplay({ foodInfo: this.foodInfo })
        Swiper() {
          ContentTable({ foodInfo: this.foodInfo })
          CaloriesProgress({ foodInfo: this.foodInfo })
          NutritionPercent({ foodInfo: this.foodInfo, nutritionElements: this.nutritionElements })
          NutritionPieChart({ foodInfo: this.foodInfo, nutritionElements: this.nutritionElements })
        }
        .indicator(new BreakPointType({ sm: true, md: false, lg: false }).getValue(this.currentBreakpoint) as boolean)
        .displayCount(new BreakPointType({ sm: 1, md: 2, lg: 3 }).getValue(this.currentBreakpoint) as number)
        .clip(new Rect().width('100%').height('100%').radiusWidth(15).radiusHeight(15))
        .itemSpace(20)
        .height(330)
        .indicatorStyle({ selectedColor: $r('app.color.theme_color_green') })
        .margin({ top: 10, right: 10, left: 10 })

        Button($r('app.string.button_food_detail_record'), { type: ButtonType.Capsule, stateEffect: true })
          .height(42)
          .width('80%')
          .margin({ top: 32, bottom: 32 })
          .backgroundColor($r('app.color.theme_color_green'))
          .onClick(() => {
            this.dialogController.open()
          })
      }
      .alignItems(HorizontalAlign.Center)
    }
    .backgroundColor('#EDF2F5')
    .height('100%')
    .align(Alignment.Top)
  }
}