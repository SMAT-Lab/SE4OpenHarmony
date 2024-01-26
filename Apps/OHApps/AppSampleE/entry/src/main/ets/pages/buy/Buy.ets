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
import CommodityController from '../../controller/CommodityController';
import { BusinessInfo, CommodityInfo } from '../../data/Server';
import Logger from '../../utils/Logger';
import { getStringData } from '../../utils/ResourceDataHandle';
import { BusinessError } from '@ohos.base';

const TAG: string = '[Buy]';

@Entry
@Component
struct Buy {
  private businessController: BusinessController = new BusinessController();
  private commodityController: CommodityController = new CommodityController();
  @State businessList: Array<BusinessInfo> = []; // 商家列表
  @State commodityList: CommodityInfo[][] = []; // 商品列表
  @State longitude: string = getStringData($r('app.string.buy_longitude')); // 经度
  @State latitude: string = getStringData($r('app.string.buy_latitude')); // 纬度

  aboutToAppear() {
    Logger.info(TAG, 'Buy aboutToAppear begin');
    // 商家列表
    this.businessController.getBusinessList(this.longitude, this.latitude).then((res: BusinessInfo[]) => {
      Logger.info(TAG, `aboutToAppear then res= ${JSON.stringify(res)}`);
      this.businessList = res;
      this.businessList.forEach((business, index) => {
        // 商品列表
        let businessId = business['id'];
        Logger.info(TAG, `commodityList then business= ${JSON.stringify(businessId)},index = ${index}`);
        this.commodityController.getCommodityList(businessId).then((res: CommodityInfo[]) => {
          this.commodityList[index] = res;
          Logger.info(TAG, `commodityList then commodityList = ${JSON.stringify(this.commodityList)}`);
        }).catch((err: BusinessError) => {
          Logger.info(TAG, `commodityList catch err= ${err}`);
        })
      })
    }).catch((err: BusinessError) => {
      Logger.info(TAG, `aboutToAppear catch err= ${JSON.stringify(err)}`);
    })
  }

  build() {
    Column() {
      Column() {
        Row() {
          Image($r('app.media.icon'))
            .height(24)
            .width(24)
            .id('buyBack')
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
          }
          .height('70%')
          .margin({ left: 12, top: 12, bottom: 10 })
          .layoutWeight(1)
          .backgroundColor(Color.White)
          .borderRadius(24)

          Image($r('app.media.icon'))
            .height(36)
            .width(36)
            .margin({ left: 24 })
            .id('selfPickUp')
            .onClick(() => {
              router.push({ url: 'pages/buy/SelfPickUp' });
            })
        }
        .justifyContent(FlexAlign.Center)
        .margin({ top: 4 })
        .width('90%')
        .height('8%')

        Row() {
          Text($r('app.string.buy_all'))
            .fontSize(18)
          Text($r('app.string.buy_takeaway'))
            .fontSize(18)
          Text($r('app.string.buy_store'))
            .fontSize(18)
          Text($r('app.string.buy_hongtuan'))
            .fontSize(18)
          Text($r('app.string.buy_delivery'))
            .fontSize(18)
        }
        .justifyContent(FlexAlign.SpaceBetween)
        .width('90%')
        .height('8%')
      }
      .width('100%')
      .backgroundColor($r('app.color.index_bg'))

      Row() {
        Text($r('app.string.buy_shop'))
          .width('100%')
          .textAlign(TextAlign.Center)
          .padding({ top: 6, bottom: 6 })
      }
      .margin({ top: 24 })
      .borderRadius(8)
      .width('90%')
      .backgroundColor($r('app.color.index_bg'))

      Scroll() {
        Column() {
          ForEach(this.businessList, (business: BusinessInfo, index) => {
            Row() {
              Row() {
                Image($r('app.media.icon'))
                  .width(100)
                  .height(100)
              }
              .height('100%')
              .alignItems(VerticalAlign.Top)

              Column() {
                Row() {
                  Text(business.name)
                    .textOverflow({ overflow: TextOverflow.Ellipsis })
                    .fontSize(24)
                    .fontWeight(5)
                }
                .width('100%')

                Row() {
                  Text(business.score + getStringData($r('app.string.business_score')))
                    .fontColor($r('app.color.business_score'))
                    .fontSize(20)
                    .fontWeight(5)
                  Blank()
                  Text($r('app.string.buy_time'))
                    .fontSize(16)
                    .fontWeight(5)
                    .margin({ left: 6 })
                }
                .width('100%')
                .margin({ top: 4 })

                Row() {
                  Text(getStringData($r('app.string.buy_address')) + business.address)
                    .fontSize(16)
                    .fontWeight(5)
                  Blank()
                  Text(business.distance + getStringData($r('app.string.business_m')))
                    .fontSize(16)
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
                  .backgroundColor($r('app.color.business_buy_back_bg'))

                  Row() {
                    Text($r('app.string.business_buy_back'))
                      .fontColor($r('app.color.business_good_shop'))
                      .fontSize(12)
                      .fontWeight(5)
                  }
                  .margin({ left: 6 })
                  .backgroundColor($r('app.color.business_buy_back_bg'))
                }
                .width('100%')
                .margin({ top: 8 })

                Scroll() {
                  Row() {
                    ForEach(this.commodityList[index], (commodity: CommodityInfo) => {
                      Row() {
                        Column() {
                          Image($r('app.media.icon'))
                            .width(100)
                            .height(100)
                          Text(commodity.name.split('').join('\u200B'))
                            .textAlign(TextAlign.Start)
                            .textOverflow({ overflow: TextOverflow.Ellipsis })
                            .maxLines(1)
                            .margin({ top: 4 })
                          Text(commodity.salePrice)
                            .width(100)
                            .textAlign(TextAlign.Start)
                            .fontColor($r('app.color.business_score'))
                            .fontSize(20)
                            .fontWeight(5)
                            .margin({ top: 4 })
                        }
                        .margin({ top: 4 })
                        .width(100)
                      }
                      .margin({ left: 4, top: 8 })
                      .justifyContent(FlexAlign.Start)
                    })
                  }
                }
                .scrollable(ScrollDirection.Horizontal)
              }
              .width('70%')
              .height('100%')
              .margin({ left: 12, right: 12 })
              .justifyContent(FlexAlign.Start)
            }
            .height('44%')
            .margin({ top: 24 })
          })
        }
        .margin({ bottom: 120 })
      }
      .width('100%')
      .height('90%')
    }
  }
}