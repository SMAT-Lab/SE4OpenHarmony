/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
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
import { getResource } from './Context'

import {
  FoodInfo,
  Category,
  CategoryId,
  MealTimeId,
  OneMealStatisticsInfo,
  MealFoodInfo,
  DietRecord,
  MealTime
} from './DataModels'
import { mockFoods, mockFoodInfo, mockDietRecords } from '../mock/MockData'
import { forEachTS } from './UtilTs'

const DEBUG_PREVIEW = false
const MOCK_API = true

export class LetterGroupType {
  letter: string = '';
  list: Array<FoodInfo> = [];
}

export function getFoods(): Array<FoodInfo> {
  return mockFoods
}

export function getFoodInfo(): FoodInfo {
  return DEBUG_PREVIEW ? mockFoodInfo : (router.getParams() as Record<string, FoodInfo>).foodId
}

// make records ordered by meal time
export let initDietRecords: Array<DietRecord> = [
  new DietRecord(-1, 0, new MealTime(MealTimeId.Breakfast), 0),
  new DietRecord(-1, 0, new MealTime(MealTimeId.Lunch), 0),
  new DietRecord(-1, 0, new MealTime(MealTimeId.Dinner), 0),
  new DietRecord(-1, 0, new MealTime(MealTimeId.Supper), 0)
]

export function getDietRecords(): Array<DietRecord> | undefined {
  return DEBUG_PREVIEW ? initDietRecords.concat(mockDietRecords) :
  AppStorage.Get<Array<DietRecord>>('dietRecords')
}

export function getFoodCategories(): Category[] {
  return [{ id: CategoryId.Vegetable, name: $r('app.string.category_vegetable') },
    { id: CategoryId.Fruit, name: $r('app.string.category_fruit') },
    { id: CategoryId.Nut, name: $r('app.string.category_nut') },
    { id: CategoryId.Seafood, name: $r('app.string.category_seafood') },
    { id: CategoryId.Dessert, name: $r('app.string.category_dessert') }]
}

export function getMileTimes(): string[] {
  if (MOCK_API) {
    return ['早餐', '午餐', '晚餐', '夜宵']
  } else {
    let mealTimeResources: Resource[] = [$r("app.string.meal_time_breakfast"), $r('app.string.meal_time_lunch'), $r('app.string.meal_time_dinner'), $r('app.string.meal_time_supper'), $r('app.string.category_dessert')]
    let mealTimes: Array<string> = []
    mealTimeResources.forEach(item => {
      let mealTime: string = getResource(item.id)
      if (mealTime !== '') {
        mealTimes.push(mealTime)
      }
    })
    return mealTimes
  }
}

export function getSortedFoodData(): Array<FoodInfo | string> {
  let letterReg = new RegExp('^[A-Z]$')
  let list: Map<string, Array<FoodInfo>> = new Map()
  let foods: Array<FoodInfo> = getFoods()
  for (let i = 0; i < foods.length; i++) {
    list['#'] = new Array()
    // convert the first letter to uppercase
    let letter = foods[i].letter.substr(0, 1).toUpperCase()
    if (!letterReg.test(letter)) {
      letter = '#'
    }
    if (list[letter] == undefined) {
      list[letter] = new Array()
    }
    list[letter].push(foods[i])
  }

  let letterGroup = new Array<LetterGroupType>()

  forEachTS(letterGroup, list)

  letterGroup.sort((x, y) => {
    return x.letter.charCodeAt(0) - y.letter.charCodeAt(0)
  })

  // put '#' to last for others
  let lastArr: LetterGroupType = letterGroup[0]
  letterGroup.splice(0, 1)
  letterGroup.push(lastArr)

  // create result list
  let resultList: Array<FoodInfo | string> = []
  for (let i = 0; i < letterGroup.length; i++) {
    resultList.push(letterGroup[i].letter)
    resultList = resultList.concat(letterGroup[i].list)
  }
  return resultList
}

export function statistics(): Array<OneMealStatisticsInfo> {
  console.info('meal statistics')
  let dietRecords = getDietRecords()
  const mealMap = new Map<MealTimeId, OneMealStatisticsInfo>()
  if (dietRecords !== undefined) {
    dietRecords.forEach((item: DietRecord) => {
      if (item.mealTime !== undefined) {
        let oneMealStatisticsInfo: OneMealStatisticsInfo = mealMap.get(item.mealTime.id!)!
        if (oneMealStatisticsInfo === undefined) {
          oneMealStatisticsInfo = new OneMealStatisticsInfo(item.mealTime)
        }
        let foodInfo: FoodInfo | undefined = getFoods().find((food) => {
          return food.id === item.foodId
        })
        if (foodInfo !== undefined && item.weight !== undefined) {
          let calories = foodInfo.calories ? foodInfo.calories * item.weight : 0
          let protein = foodInfo.protein ? foodInfo.protein * item.weight : 0
          let fat = foodInfo.fat ? foodInfo.fat * item.weight : 0
          let carbohydrates = foodInfo.carbohydrates ? foodInfo.carbohydrates * item.weight : 0
          if (foodInfo.calories !== null && foodInfo.protein !== null && foodInfo.fat !== null
            && foodInfo.carbohydrates !== null && foodInfo.image !== null && carbohydrates !== null
            && calories !== null && protein !== null && fat !== null && item.id !== undefined && calories !== undefined && protein !== undefined) {
            oneMealStatisticsInfo.mealFoods.push(
              new MealFoodInfo(item.id, foodInfo.name, foodInfo.image, calories, protein, fat, carbohydrates, item.weight, item.foodId))
            oneMealStatisticsInfo.totalFat += fat
            oneMealStatisticsInfo.totalCalories += calories
            oneMealStatisticsInfo.totalCarbohydrates += carbohydrates
            oneMealStatisticsInfo.totalProtein += protein
          }
        }
        mealMap.set(item.mealTime.id!, oneMealStatisticsInfo)
      }
    })
  }
  return Array.from(mealMap.values())
}

export function updateDietWeight(recordId: number, weight: number) {
  let dietRecords = getDietRecords()
  if (dietRecords !== undefined) {
    let index = dietRecords.findIndex((record) => {
      return record.id === recordId
    })
    dietRecords[index].weight = weight
    AppStorage.SetOrCreate<Array<DietRecord>>('dietRecords', dietRecords)
  }
}