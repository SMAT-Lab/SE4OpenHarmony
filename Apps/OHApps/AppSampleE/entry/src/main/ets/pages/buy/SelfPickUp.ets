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
import { BusinessError } from '@ohos.base';
import GroupBuyController from '../../controller/GroupBuyController';
import Logger from '../../utils/Logger';
import { getStringData } from '../../utils/ResourceDataHandle';
import { SelfPickUpInfo } from '../../data/Server'

const TAG: string = '[SelfPickUp]';

@Entry
@Component
struct SelfPickUp {
  private groupBuyController: GroupBuyController = new GroupBuyController();
  @State selfPickUpList: Array<SelfPickUpInfo> = []; // 站点列表
  @State longitude: string = getStringData($r('app.string.buy_longitude')); // 经度
  @State latitude: string = getStringData($r('app.string.buy_latitude')); // 纬度

  aboutToAppear() {
    Logger.info(TAG, 'aboutToAppear begin');
    this.groupBuyController.getGroupBuyList(this.longitude, this.latitude).then((res: SelfPickUpInfo[]) => {
      Logger.info(TAG, `aboutToAppear then res= ${JSON.stringify(res)}`);
      this.selfPickUpList = res;
      Logger.info(TAG, `aboutToAppear forEach this.selfPickUpList= ${JSON.stringify(this.selfPickUpList)}`);
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
          .margin({ top: 20 })
          .onClick(() => {
            router.back();
          })
        .id('selfPickUpBack')

        Row() {
          Image($r('app.media.icon'))
            .height(18)
            .width(18)
            .margin({ left: 12 })
          Text($r('app.string.self_ponit'))
            .fontSize(16)
            .fontColor($r('app.color.business_font'))
            .fontWeight(FontWeight.Medium)
            .margin({ left: 12 })
          Blank()
        }
        .height('100%')
        .margin({ left: 12, top: 20 })
        .layoutWeight(1)
        .backgroundColor(Color.White)
        .borderRadius(24)
      }
      .justifyContent(FlexAlign.Center)
      .margin({ top: 4 })
      .width('90%')
      .height('6%')

      Column() {
        Row() {
          Text($r('app.string.self_near'))
            .fontSize(24)
            .fontWeight(10)
          Blank()
        }
        .margin({ top: 24 })
        .width('95%')

        Row({ space: 20 }) {
          Text($r('app.string.self_cold'))
            .fontColor($r('app.color.pd_font_gray'))
            .textAlign(TextAlign.Center)
            .padding({ left: 12, right: 12, top: 6, bottom: 6 })
            .borderRadius(8)
            .backgroundColor($r('app.color.index_bg'))

          Text($r('app.string.self_door'))
            .fontColor($r('app.color.pd_font_gray'))
            .textAlign(TextAlign.Center)
            .padding({ left: 12, right: 12, top: 6, bottom: 6 })
            .borderRadius(8)
            .backgroundColor($r('app.color.index_bg'))

          Text($r('app.string.self_service'))
            .fontColor($r('app.color.pd_font_gray'))
            .textAlign(TextAlign.Center)
            .padding({ left: 12, right: 12, top: 6, bottom: 6 })
            .borderRadius(8)
            .backgroundColor($r('app.color.index_bg'))
        }
        .margin({ top: 12 })
        .width('90%')

        Scroll() {
          Column() {
            ForEach(this.selfPickUpList, (selfPickUp: SelfPickUpInfo) => {
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
                    Text(selfPickUp.name)
                      .textOverflow({ overflow: TextOverflow.Ellipsis })
                      .fontSize(18)
                      .fontWeight(5)
                  }
                  .width('100%')

                  Row() {
                    Text(selfPickUp.address.split('')
                      .join('\u200B'))
                      .textAlign(TextAlign.Start)
                      .textOverflow({ overflow: TextOverflow.Ellipsis })
                      .maxLines(2)
                      .fontSize(16)
                      .lineHeight(20)
                      .fontWeight(5)
                      .fontColor($r('app.color.pd_font_gray'))
                  }
                  .width('100%')
                  .margin({ top: 4 })

                  Row() {
                    Text($r('app.string.self_cold'))
                      .fontColor($r('app.color.self_cold_font'))
                      .fontSize(14)
                      .fontWeight(5)
                      .borderWidth(1)
                      .borderColor($r('app.color.self_cold_bg'))
                  }
                  .justifyContent(FlexAlign.Start)
                  .width('100%')
                  .margin({ top: 8 })

                  Row() {
                    Text(getStringData($r('app.string.self_walk')) + selfPickUp.distance)
                      .fontSize(18)
                  }
                  .margin({ left: 6 })
                  .width('100%')
                  .margin({ top: 8 })
                }
                .width('50%')
                .height('100%')
                .margin({ left: 12, right: 12 })
                .justifyContent(FlexAlign.Start)

                Row() {
                  Button($r('app.string.self_choose'))
                    .fontColor(Color.Black)
                    .backgroundColor($r('app.color.business_buy_back'))
                }
                .height('100%')
                .alignItems(VerticalAlign.Bottom)
              }
              .width('95%')
              .height('20%')
              .margin({ top: 24 })
            }, (selfPickUp: SelfPickUpInfo) => JSON.stringify(selfPickUp))
          }
          .margin({ bottom: 150 })
        }
      }
      .borderRadius(8)
      .backgroundColor(Color.White)
      .width('90%')
      .height('95%')
      .margin({ top: 24 })
    }
    .backgroundColor($r('app.color.index_bg'))
    .width('100%')
    .height('100%')
  }
}