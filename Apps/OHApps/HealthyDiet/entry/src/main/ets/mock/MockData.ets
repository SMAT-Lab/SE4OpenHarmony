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

import { FoodInfo, CategoryId, MealTimeId, DietRecord, MealTime } from '../model/DataModels'

export let mockFoodInfo: FoodInfo = new FoodInfo(0, 'Tomato', $r('app.string.food_name_tomato'), $r('app.media.tomato'))

mockFoodInfo.categoryId = CategoryId.Vegetable
mockFoodInfo.calories = 15
mockFoodInfo.protein = 0.9
mockFoodInfo.fat = 0.2
mockFoodInfo.carbohydrates = 3.3
mockFoodInfo.vitaminC = 14.0

export let walnut: FoodInfo = new FoodInfo(2, 'walnut', $r('app.string.food_name_walnut'), $r('app.media.walnut'))

walnut.categoryId = CategoryId.Nut
walnut.calories = 646
walnut.protein = 14.9
walnut.fat = 58.8
walnut.carbohydrates = 19.1
walnut.vitaminC = 1.0

export let cucumber: FoodInfo = new FoodInfo(2, 'Cucumber', $r('app.string.food_name_cucumber'), $r('app.media.cucumber'))

cucumber.categoryId = CategoryId.Vegetable
cucumber.calories = 16
cucumber.protein = 0.8
cucumber.fat = 0.2
cucumber.carbohydrates = 2.9
cucumber.vitaminC = 9.0

export let blueberry: FoodInfo = new FoodInfo(3, 'Blueberry', $r('app.string.food_name_blueberry'), $r('app.media.blueberry'))

blueberry.categoryId = CategoryId.Fruit
blueberry.calories = 57
blueberry.protein = 0.7
blueberry.fat = 0.3
blueberry.carbohydrates = 14.5
blueberry.vitaminC = 9.7

export let crab: FoodInfo = new FoodInfo(4, 'Crab', $r('app.string.food_name_crab'), $r('app.media.crab'))

crab.categoryId = CategoryId.Seafood
crab.calories = 97
crab.protein = 19
crab.fat = 1.5
crab.carbohydrates = 0
crab.vitaminC = 7.6

export let iceCream: FoodInfo = new FoodInfo(5, 'IceCream', $r('app.string.food_name_ice_cream'), $r('app.media.icecream'))

iceCream.categoryId = CategoryId.Dessert
iceCream.calories = 150
iceCream.protein = 3.5
iceCream.fat = 11
iceCream.carbohydrates = 24
iceCream.vitaminC = 0.6

export let onion: FoodInfo = new FoodInfo(6, 'Onion', $r('app.string.food_name_onion'), $r('app.media.onion'))

onion.categoryId = CategoryId.Vegetable
onion.calories = 40
onion.protein = 1.1
onion.fat = 0.2
onion.carbohydrates = 9
onion.vitaminC = 8.0

export let mushroom: FoodInfo = new FoodInfo(7, 'Mushroom', $r('app.string.food_name_mushroom'), $r('app.media.mushroom'))

mushroom.categoryId = CategoryId.Vegetable
mushroom.calories = 20
mushroom.protein = 3.1
mushroom.fat = 0.3
mushroom.carbohydrates = 3.3
mushroom.vitaminC = 206

export let kiwi: FoodInfo = new FoodInfo(8, 'Kiwi', $r('app.string.food_name_kiwi'), $r('app.media.kiwi'))

kiwi.categoryId = CategoryId.Fruit
kiwi.calories = 61
kiwi.protein = 0.8
kiwi.fat = 0.6
kiwi.carbohydrates = 14.5
kiwi.vitaminC = 62

export let pitaya: FoodInfo = new FoodInfo(9, 'Pitaya', $r('app.string.food_name_pitaya'), $r('app.media.pitaya'))

pitaya.categoryId = CategoryId.Fruit
pitaya.calories = 55
pitaya.protein = 1.1
pitaya.fat = 0.2
pitaya.carbohydrates = 13.3
pitaya.vitaminC = 3.0

export let avocado: FoodInfo = new FoodInfo(10, 'Avocado', $r('app.string.food_name_avocado'), $r('app.media.avocado'))

avocado.categoryId = CategoryId.Fruit
avocado.calories = 171
avocado.protein = 2.0
avocado.fat = 15.2
avocado.carbohydrates = 7.4
avocado.vitaminC = 8.0

export let strawberry: FoodInfo = new FoodInfo(11, 'Strawberry', $r('app.string.food_name_strawberry'), $r('app.media.strawberry'))

strawberry.categoryId = CategoryId.Fruit
strawberry.calories = 32
strawberry.protein = 1.0
strawberry.fat = 0.2
strawberry.carbohydrates = 7.1
strawberry.vitaminC = 47.0

export let mockFoods: Array<FoodInfo> = [
  mockFoodInfo, walnut, cucumber, blueberry, crab, iceCream, onion, mushroom, kiwi, pitaya, strawberry, avocado
]

export let mockDietRecords: Array<DietRecord> = [
  new DietRecord(-1, 2, new MealTime(MealTimeId.Dinner), 200),
  new DietRecord(2, 8, new MealTime(MealTimeId.Lunch), 200),
  new DietRecord(3, 6, new MealTime(MealTimeId.Dinner), 200),
  new DietRecord(4, 3, new MealTime(MealTimeId.Supper), 200)
]