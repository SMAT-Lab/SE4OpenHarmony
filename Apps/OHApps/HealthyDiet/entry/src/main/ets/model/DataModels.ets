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

export enum CategoryId {
  Fruit = 0,
  Vegetable,
  Nut,
  Seafood,
  Dessert
}

export class Category {
  name: Resource | null = null;
  id: CategoryId | null = null;
}

export class FoodInfo {
  id: number = 0;
  letter: string = '';
  name: string | Resource = ''
  image: Resource | null = null;
  categoryId: CategoryId = CategoryId.Vegetable;
  calories: number = 0;
  protein: number = 0;
  fat: number = 0;
  carbohydrates: number = 0;
  vitaminC: number = 0;

  constructor(id: number = 0, letter: string, name: string | Resource = '', image: Resource | null = null) {
    this.id = id;
    this.letter = letter;
    this.name = name;
    this.image = image;
  }
}

export enum MealTimeId {
  Breakfast = 0,
  Lunch,
  Dinner,
  Supper,
}

export class MealTime {
  name: Resource
  id: MealTimeId

  constructor(id: MealTimeId) {
    this.id = id
    switch (id) {
      case MealTimeId.Breakfast:
        this.name = $r('app.string.meal_time_breakfast')
        break
      case MealTimeId.Lunch:
        this.name = $r('app.string.meal_time_lunch')
        break
      case MealTimeId.Dinner:
        this.name = $r('app.string.meal_time_dinner')
        break
      case MealTimeId.Supper:
        this.name = $r('app.string.meal_time_supper')
        break
    }
  }
}

export class DietRecord {
  id: number
  foodId: number
  mealTime: MealTime
  weight: number

  constructor(id: number, foodId: number, mealTime: MealTime, weight: number) {
    this.id = id
    this.foodId = foodId
    this.mealTime = mealTime
    this.weight = weight
  }
}

@Observed
export class OneMealStatisticsInfo {
  mealTime: MealTime
  mealFoods: Array<MealFoodInfo> = []
  totalCalories: number = 0
  totalFat: number = 0
  totalCarbohydrates: number = 0
  totalProtein: number = 0

  constructor(mealTime: MealTime) {
    this.mealTime = mealTime
  }
}

export class MealFoodInfo {
  recordId: number
  name: string | Resource
  image: Resource
  calories: number
  protein: number
  fat: number
  carbohydrates: number
  weight: number
  foodId?: number

  constructor(recordId: number, name: string | Resource, image: Resource, calories: number, protein: number, fat: number, carbohydrates: number, weight: number, foodId?: number) {
    this.recordId = recordId
    this.name = name
    this.image = image
    this.calories = calories
    this.protein = protein
    this.fat = fat
    this.carbohydrates = carbohydrates
    this.weight = weight
    this.foodId = foodId
  }
}