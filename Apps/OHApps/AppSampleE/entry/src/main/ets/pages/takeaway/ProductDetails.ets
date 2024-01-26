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
import CommodityController from '../../controller/CommodityController';
import Logger from '../../utils/Logger';
import com from '../../data/Commodity'
import { getStringData } from '../../utils/ResourceDataHandle';
import { BusinessError } from '@ohos.base';
import { CommodityInfo } from '../../data/Server';

const TAG: string = '[ProductDetails]';

@Entry
@Component
struct ProductDetails { // 商品详情页面
  private CommodityController: CommodityController = new CommodityController();
  private com: com = new com();
  @State commodity: CommodityInfo | undefined = undefined;
  @State commodityId: string = (router.getParams() as Record<string, Object>).commodityId as string;
  @State name: string = '';
  @State description: string = '';
  @State standards: string = '';
  @State price: string = '';
  @State salesNumber: string = '';

  aboutToAppear() {
    Logger.info(TAG, 'ProductDetails aboutToAppear');
    Logger.info(TAG, 'ProductDetails this.commodityId' + this.commodityId);
    this.CommodityController.getCommodityById(this.commodityId).then((res: CommodityInfo) => {
      Logger.info(TAG, 'ProductDetails getCommodityById');
      this.com.name = res.name;
      this.com.description = res.description;
      this.standards = res.standards;
      this.price = res.price;
      this.salesNumber = res.salesNumber;
      this.name = this.com.name;
      this.description = this.com.description;
      Logger.info(TAG, 'ProductDetails com===' + this.com.name);
      Logger.info(TAG, 'ProductDetails com===' + this.com.description);
      Logger.info(TAG, 'ProductDetails com===' + this.price);
      Logger.info(TAG, 'ProductDetails com===' + this.salesNumber);
      Logger.info(TAG, 'ProductDetails com===' + this.description);
      this.commodity = res;
      Logger.info(TAG, `ProductDetails then res= ${JSON.stringify(this.commodity)}`);
    }).catch((err: BusinessError) => {
      Logger.info(TAG, `ProductDetails catch err= ${JSON.stringify(err)}`);
    })
  }

  build() {
    Column() {
      Column() {
        Row() {
          Image($r('app.media.icon'))
            .width(24)
            .height(24)
            .onClick(() => {
              router.back();
            })
            .id('ProductDetailsBack')
          Blank()
          Image($r('app.media.icon'))
            .width(24)
            .height(24)
        }
        .width('90%')
        .height('8%')

        Column() {
          Text(this.name)
            .width('100%')
            .textAlign(TextAlign.Start)
            .fontSize(24)
          Text($r('app.string.commodity_one'))
            .width('100%')
            .textAlign(TextAlign.Start)
            .fontColor($r('app.color.pd_font_gray'))
            .margin({ top: 4 })
          Row() {
            Button(this.standards)
              .fontColor($r('app.color.pd_standard'))
              .backgroundColor($r('app.color.pd_standard_bg'))
              .margin({ top: 6, bottom: 6 })
            Blank()
          }
          .width('100%')
          .margin({ top: 4 })

          Text(getStringData($r('app.string.commodity_month')) + this.salesNumber)
            .width('100%')
            .textAlign(TextAlign.Start)
            .fontColor($r('app.color.pd_font_gray'))
            .margin({ top: 4 })

          Text(getStringData($r('app.string.commodity_money')) + this.price)
            .textAlign(TextAlign.Start)
            .fontColor($r('app.color.pd_money'))
            .width('100%')
            .fontSize(24)
            .margin({ top: 24, bottom: 24 })
        }
        .width('90%')
      }
      .width('100%')
      .backgroundColor(Color.White)
      .margin({ bottom: 12 })

      Row() {
        Tabs({ barPosition: BarPosition.Start }) {
          // 详情
          TabContent() {
            Column() {
              Row() {
                Text($r('app.string.pd_dispenser_description'))
                  .fontColor($r('app.color.pd_font_gray'))
                  .fontSize(18)
                Text(this.description)
                  .margin({ left: 24 })
                  .fontSize(18)
              }
              .width('100%')
              .justifyContent(FlexAlign.Start)
              .margin({ top: 12 })

              Row() {
                Text($r('app.string.pd_package_contents'))
                  .fontSize(18)
                  .fontColor($r('app.color.pd_font_gray'))
                Text(this.description)
                  .fontSize(18)
                  .margin({ left: 12 })
              }
              .width('100%')
              .justifyContent(FlexAlign.Start)
              .margin({ top: 12 })

              Row() {
                Text($r('app.string.pd_price_description'))
                  .fontSize(18)
                  .fontColor($r('app.color.pd_font_gray'))
                Image($r('app.media.icon'))
                  .width(20)
                  .height(20)
                  .margin({ left: 8 })
              }
              .width('100%')
              .justifyContent(FlexAlign.Start)
              .margin({ top: 12 })
            }
            .width('100%')
          }
          .align(Alignment.Top)
          .tabBar($r('app.string.pd_tabs_detail'))
        }
        .width('90%')
      }
      .justifyContent(FlexAlign.Center)
      .height('100%')
      .width('100%')
      .backgroundColor(Color.White)
    }
    .backgroundColor($r('app.color.index_bg'))
    .width('100%')
    .height('100%')
  }
}