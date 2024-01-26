/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License")
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

import router from '@ohos.router';
import { SecondLevelCategory, ThirdLevelCategory, FourthLevelCategory } from './model/CategoricalDataType';

@Extend(Column)
function ColumnStyle() {
  .width('100%')
  .borderRadius(24)
  .backgroundColor(Color.White)
  .padding({ left: 12, right: 12, bottom: 4, top: 4 })
}

@Preview
@Component
export struct TabContentNavigation {
  private categories: ThirdLevelCategory[] | SecondLevelCategory[] = [];

  hasSecondLevelCategory(category: ThirdLevelCategory | SecondLevelCategory): boolean {
    return category && category.tag ? false : true;
  }

  build() {
    Column() {
      List() {
        if (this.categories.length > 0 && this.hasSecondLevelCategory(this.categories[0])) {
          ForEach(this.categories, (secondLevelCategory: SecondLevelCategory, secondLevelCategoryIndex: number) => {
            ListItem() {
              Column() {
                Text(secondLevelCategory.title)
                  .height(48)
                  .fontSize(14)
                  .width('100%')
                  .textAlign(TextAlign.Start)
                  .fontFamily('HarmonyHeiTi-Medium')
                  .fontColor($r('app.color.font_color_shallow'))
                  .padding({ bottom: 4, top: 4, left: 24 })

                Column() {
                  ForEach(secondLevelCategory.childNodes, (thirdLevelCategory: ThirdLevelCategory,
                                                           thirdLevelCategoryIndex: number) => {
                    ThirdLevelNavigation({
                      thirdLevelCategory: thirdLevelCategory,
                      secondLevelCategoryIndex: secondLevelCategoryIndex,
                      ThirdLevelNavigationIndex: thirdLevelCategoryIndex
                    })
                  })
                }
                .ColumnStyle()
              }
            }
          })
        } else {
          ForEach(this.categories, (thirdLevelCategory: ThirdLevelCategory) => {
            ListItem() {
              Column() {
                ThirdLevelNavigation({ thirdLevelCategory: thirdLevelCategory })
              }
              .ColumnStyle()
            }
            .margin({ top: 4, bottom: 4 })
          })
        }
      }
      .width('100%')
      .layoutWeight(1)
      .padding({ left: 16, right: 16, top: 4 })

      Blank()

      Divider()
        .height(0.75)
        .width('100%')
        .alignSelf(ItemAlign.Baseline)
        .color($r('app.color.tab_bar_divider'))
    }
    .height('100%')
    .padding({ top: 12 })
  }
}

@Component
struct ThirdLevelNavigation {
  @State isUnfold: boolean = false;
  private thirdLevelCategory: ThirdLevelCategory = new ThirdLevelCategory();
  private ThirdLevelNavigationIndex: number = 0;
  private secondLevelCategoryIndex: number = 0;

  build() {
    Column() {
      Row() {
        Text(this.thirdLevelCategory.title)
          .fontSize(16)
          .margin({ left: 16 })
          .fontFamily('HarmonyHeiTi-Medium')
          .fontColor($r('app.color.font_color_dark'))

        Blank()

        if (this.thirdLevelCategory.childNodes) {
          Image(this.isUnfold ? $r('app.media.ic_down_arrow') : $r('app.media.ic_right_arrow'))
            .width(this.isUnfold ? 24 : 12)
            .height(this.isUnfold ? 12 : 24)
            .margin({ right: this.isUnfold ? 0 : 6 })
        }
      }
      .height(56)
      .width('100%')
      .onClick(() => {
        if (this.thirdLevelCategory.childNodes === undefined) {
          // Click to jump to the corresponding page
          if (this.thirdLevelCategory.url !== undefined) {
            router.pushUrl({
              url: this.thirdLevelCategory.url
            });
          }
        } else {
          this.isUnfold = !this.isUnfold;
        }
      })

      // Click to expand the fourth-level category
      if (this.isUnfold) {
        ForEach(this.thirdLevelCategory.childNodes, (fourthLevelCategory: FourthLevelCategory) => {
          Column() {
            Divider()
              .height(1)
              .opacity(0.2)
              .margin({ left: 42, right: 8 })
              .color($r('app.color.font_color_dark'))

            FourthLevelNavigation({ fourthLevelCategory: fourthLevelCategory })
          }
        }, (item: FourthLevelCategory) => JSON.stringify(item))
      }
    }
    // 整体字符串折行会被识别出来，导致功能异常，只能放在单独一行，1和0分别为首页标题层级index
    .id(`secondLevelMenu${this.secondLevelCategoryIndex}${this.secondLevelCategoryIndex === 1 ? 0 : this.ThirdLevelNavigationIndex}`)
  }
}

@Component
struct FourthLevelNavigation {
  private fourthLevelCategory: FourthLevelCategory = new FourthLevelCategory();

  build() {
    Row() {
      Text(this.fourthLevelCategory.title)
        .fontSize(16)
        .layoutWeight(1)
        .margin({ left: 42 })
        .align(Alignment.Start)
        .fontFamily('HarmonyHeiTi-Medium')
        .fontColor($r('app.color.font_color_dark'))
      Blank()
    }
    .height(48)
    .width('100%')
    .onClick(() => {
      // Click to jump to the corresponding page
      if (this.fourthLevelCategory.url != undefined) {
        router.pushUrl({
          url: this.fourthLevelCategory.url
        });
      }
    })
  }
}