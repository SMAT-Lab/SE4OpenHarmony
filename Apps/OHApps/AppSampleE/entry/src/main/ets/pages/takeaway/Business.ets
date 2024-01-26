/*
 * Copyright (c) 2023 Hunan OpenValley Digital Industry Development Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import router from '@ohos.router';
import BusinessController from '../../controller/BusinessController';
import { BusinessInfo } from '../../data/Server';
import Logger from '../../utils/Logger';
import { getStringData } from '../../utils/ResourceDataHandle';
import { BusinessError } from '@ohos.base';

const TAG: string = '[Business]';

@Extend(Row) function rowStyle() {
  .borderRadius(8)
  .backgroundColor($r('app.color.index_bg'))
  .margin({ top: 8 })
  .padding({ left: 24, right: 24, top: 8, bottom: 8 })
}

@Extend(Row) function rowStyleShop() {
  .backgroundColor(Color.White)
  .width('90%')
  .height(150)
  .borderRadius(8)
  .margin({ top: 12 })
  .padding(12)
}

@Entry
@Component
struct Business {
  private businessController: BusinessController = new BusinessController();
  @State businessList: Array<BusinessInfo> = []; // 商家列表
  @State longitude: string = getStringData($r('app.string.buy_longitude')); // 经度
  @State latitude: string = getStringData($r('app.string.buy_latitude')); // 纬度

  aboutToAppear() {
    Logger.info(TAG, 'aboutToAppear begin');
    this.businessController.getBusinessList(this.longitude, this.latitude).then((res: BusinessInfo[]) => {
      Logger.info(TAG, `aboutToAppear then res= ${JSON.stringify(res)}`);
      this.businessList = res;
    }).catch((err: BusinessError) => {
      Logger.info(TAG, `aboutToAppear catch err= ${JSON.stringify(err)}`);
    })
  }

  build() {
    Column() {
      Row() {
        Image($r('app.media.icon'))
          .height(24)
          .width(24)
          .onClick(() => {
            router.back();
          })

        Row() {
          Image($r('app.media.icon'))
            .height(18)
            .width(18)
            .margin({ left: 12 })
          Text($r('app.string.business_noodles'))
            .fontSize(18)
            .fontColor($r('app.color.business_font'))
            .fontWeight(FontWeight.Medium)
            .margin({ left: 12 })
          Blank()
          Button($r('app.string.index_search'))
            .fontColor($r('app.color.index_font'))
            .fontSize(18)
            .width(75)
            .height('85%')
            .backgroundColor($r('app.color.index_search_btn_bg'))
            .margin({ right: 4 })
        }
        .height('100%')
        .border({ color: $r('app.color.business_border'), width: 2 })
        .margin({ left: 12, top: 10, bottom: 10 })
        .layoutWeight(1)
        .backgroundColor(Color.White)
        .borderRadius(24)
      }
      .width('90%')
      .height('8%')

      Row() {
        Row() {
          Text($r('app.string.business_less_delivery'))
            .fontSize(18)
        }
        .rowStyle()

        Row() {
          Text($r('app.string.business_zero'))
            .fontSize(18)
        }
        .rowStyle()

        Row() {
          Text($r('app.string.business_order_minus'))
            .fontSize(18)
        }
        .rowStyle()
      }
      .justifyContent(FlexAlign.SpaceAround)
      .width('90%')
      .height('8%')

      Scroll() {
        Column() {
          ForEach(this.businessList, (business: BusinessInfo, index: number) => {
            Row() {
              Image($r('app.media.icon'))
                .width(125)
                .height(125)
              Column() {
                Row() {
                  Text(business.name)
                    .fontSize(24)
                    .fontWeight(5)
                }
                .width('100%')

                Row() {
                  Text(getStringData($r('app.string.business_score')) + business.score)
                    .fontColor($r('app.color.business_score'))
                    .fontSize(20)
                    .fontWeight(5)
                  Text(getStringData($r('app.string.business_monthly_sale')) + business.monthlySale)
                    .fontSize(12)
                    .fontWeight(5)
                    .margin({ left: 6 })
                  Text(getStringData($r('app.string.business_per_capita')) + business.perCapita)
                    .fontSize(12)
                    .fontWeight(5)
                    .margin({ left: 6 })
                  Row() {
                    Text($r('app.string.business_delivery'))
                      .fontColor($r('app.color.business_delivery'))
                      .fontSize(12)
                      .fontWeight(5)
                      .margin({ left: 6, right: 6 })
                  }
                  .margin({ left: 6 })
                  .borderWidth(2)
                  .border({ color: $r('app.color.business_delivery_bg') })
                }
                .width('100%')
                .margin({ top: 4 })

                Row() {
                  Text(getStringData($r('app.string.business_give')) + business.startPrice)
                    .fontSize(12)
                    .fontWeight(5)
                  Text(getStringData($r('app.string.business_distribution')) + business.deliveryPrice)
                    .fontSize(12)
                    .fontWeight(5)
                    .margin({ left: 6 })
                  Blank()
                  Text(business.deliveryTime + getStringData($r('app.string.business_min')))
                    .fontSize(12)
                    .fontWeight(5)
                    .margin({ left: 12, right: 6 })
                  Text(business.distance + getStringData($r('app.string.business_m')))
                    .fontSize(12)
                    .fontWeight(5)
                }
                .width('100%')
                .margin({ top: 4 })

                Row() {
                  Row() {
                    Text($r('app.string.business_good_shop'))
                      .fontColor($r('app.color.business_good_shop'))
                      .fontSize(12)
                      .fontWeight(5)
                  }
                  .backgroundColor($r('app.color.business_good_shop_bg'))

                  Row() {
                    Text($r('app.string.business_buy_back'))
                      .fontColor($r('app.color.business_buy_back'))
                      .fontSize(12)
                      .fontWeight(5)
                  }
                  .margin({ left: 6 })
                  .backgroundColor($r('app.color.business_buy_back_bg'))
                }
                .width('100%')
                .margin({ top: 8 })

                Row() {
                  Text($r('app.string.business_reduce'))
                    .fontColor(Color.Red)
                    .fontSize(12)
                    .fontWeight(5)
                    .borderWidth(2)
                    .border({ color: Color.Red })
                }
                .width('100%')
                .margin({ top: 6 })
              }
              .justifyContent(FlexAlign.Start)
              .height('90%')
              .width('60%')
              .margin({ left: 12, right: 12 })
            }
            .rowStyleShop()
            .onClick(() => {
              router.push({
                url: 'pages/takeaway/Commodity',
                params: {
                  businessId: business.id,
                  businessName: business.name,
                  businessScore: business.score,
                  businessSale: business.monthlySale,
                  businessTime: business.deliveryTime,
                  businessRank: business.ranking
                }
              });
            })
            .id('business' + index)
          })
        }
      }
      .borderRadius(8)
      .margin({ left: 12, right: 12, top: 12, bottom: 200 })
      .width('95%')
      .height('85%')
      .backgroundColor($r('app.color.index_bg'))

      Column() {
        Row() {
          Image($r('app.media.icon'))
            .height(38)
            .width(38)
          Image($r('app.media.icon'))
            .height(38)
            .width(38)
          Image($r('app.media.icon'))
            .height(38)
            .width(38)
          Image($r('app.media.icon'))
            .height(38)
            .width(38)
        }
        .margin({ top: 12 })
        .width('100%')
        .justifyContent(FlexAlign.SpaceAround)

        Row() {
          Text($r('app.string.business_takeaway'))
          Text($r('app.string.business_vip'))
          Text($r('app.string.business_order'))
          Text($r('app.string.business_more'))
        }
        .margin({ top: 8, bottom: 8 })
        .width('100%')
        .justifyContent(FlexAlign.SpaceAround)
      }
      .backgroundColor(Color.White)
      .position({ y: '92%' })
    }
    .width('100%')
    .height('100%')
  }
}
