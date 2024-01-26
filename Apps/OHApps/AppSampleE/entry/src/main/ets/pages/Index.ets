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
import geoLocationManager from '@ohos.geoLocationManager';
import { BusinessError } from '@ohos.base';

import grantPermission from '../utils/PermissionUtils';
import Logger from '../utils/Logger';

const TAG: string = '[Index]';

@Entry
@Component
struct Index {
  private latitude: string = '';
  private longitude: string = '';

  // 获取定位服务
  getLocation(): void {
    let locationChange = (err: BusinessError, location: geoLocationManager.Location) => {
      if (err) {
        console.log('locationChanger: err=' + JSON.stringify(err));
      }
      if (location) {
        this.latitude = location.latitude.toString();
        this.longitude = location.longitude.toString();
        console.log('locationChanger: location=' + JSON.stringify(location));
        Logger.info(TAG, `this.latitude  ${this.latitude}`);
        Logger.info(TAG, `this.longitude  ${this.longitude}`);
      }
    };
    try {
      geoLocationManager.getCurrentLocation(locationChange);
    } catch (err) {
      console.error("errCode:" + err.code + ",errMessage:" + err.message);
    }
  }

  async aboutToAppear() {
    // 申请权限
    await grantPermission().then(res => {
      this.getLocation();
      Logger.info(TAG, `权限申请成功  ${JSON.stringify(res)}`);
    }).catch((rej: BusinessError) => {
      Logger.info(TAG, `权限申请失败  ${JSON.stringify(rej)}`);
    })
  }

  build() {
    Column() {
      Row() {
        Row() {
          Text($r('app.string.index_coffee'))
            .fontSize(16)
            .fontColor($r('app.color.index_font'))
            .fontWeight(FontWeight.Medium)
            .margin({ left: 15 })
          Blank()
          Button($r('app.string.index_search'))
            .fontColor($r('app.color.index_font'))
            .fontSize(18)
            .width(80)
            .height('90%')
            .backgroundColor($r('app.color.index_search_btn_bg'))
            .margin({ right: 4 })
        }
        .margin({ top: 10, bottom: 10 })
        .layoutWeight(1)
        .height('7%')
        .backgroundColor(Color.White)
        .borderRadius(24)

        Image($r('app.media.icon'))
          .objectFit(ImageFit.Contain)
          .width(35)
          .height(35)
          .margin({ left: 20 })
          .id('sweep')
      }
      .padding({ left: 18, right: 18 })
      .width('100%')

      Row() {
        Column() {
          Text($r('app.string.index_text'))
            .width('100%')
            .margin({ left: 5 })
            .textAlign(TextAlign.Start)
          Row() {
            Image($r('app.media.icon'))
              .height(38)
              .width(38)
              .id('business')
              .onClick(() => {
                router.push({ url: 'pages/takeaway/Business' });
              })
            Image($r('app.media.icon'))
              .height(38)
              .width(38)
              .id('buy')
              .onClick(() => {
                router.push({ url: 'pages/buy/Buy' });
              })
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
            Text($r('app.string.index_takeaway'))
              .onClick(() => {
                router.push({ url: 'pages/takeaway/Business' });
              })
            Text($r('app.string.index_buy'))
              .onClick(() => {
                router.push({ url: 'pages/buy/Buy' });
              })
            Text($r('app.string.index_convenient'))
            Text($r('app.string.index_general_merchandise'))
            Text($r('app.string.index_medicine'))
          }
          .margin({ top: 8 })
          .width('100%')
          .justifyContent(FlexAlign.SpaceAround)
        }
      }
      .height('15%')
      .width('100%')
      .padding(8)
      .margin({ left: 12, right: 12 })
      .backgroundColor(Color.White)
      .borderRadius(8)

      Scroll() {
        Column() {
          Row({ space: 60 }) {
            Image($r('app.media.icon'))
              .height(160)
              .width(160)

            Image($r('app.media.icon'))
              .height(160)
              .width(160)
          }
          .width('90%')
          .justifyContent(FlexAlign.Center)

          Row({ space: 60 }) {
            Image($r('app.media.icon'))
              .height(160)
              .width(160)

            Image($r('app.media.icon'))
              .height(160)
              .width(160)
          }
          .width('90%')
          .justifyContent(FlexAlign.Center)
          .margin({ top: 12 })

          Row({ space: 60 }) {
            Image($r('app.media.icon'))
              .height(160)
              .width(160)

            Image($r('app.media.icon'))
              .height(160)
              .width(160)
          }
          .width('90%')
          .justifyContent(FlexAlign.Center)
          .margin({ top: 12 })

          Row({ space: 60 }) {
            Image($r('app.media.icon'))
              .height(160)
              .width(160)

            Image($r('app.media.icon'))
              .height(160)
              .width(160)
          }
          .width('90%')
          .justifyContent(FlexAlign.Center)
          .margin({ top: 12 })

          Row({ space: 60 }) {
            Image($r('app.media.icon'))
              .height(160)
              .width(160)

            Image($r('app.media.icon'))
              .height(160)
              .width(160)
          }
          .width('90%')
          .justifyContent(FlexAlign.Center)
          .margin({ top: 12 })

          Row({ space: 60 }) {
            Image($r('app.media.icon'))
              .height(160)
              .width(160)

            Image($r('app.media.icon'))
              .height(160)
              .width(160)
          }
          .width('90%')
          .justifyContent(FlexAlign.Center)
          .margin({ top: 12 })

          Row({ space: 60 }) {
            Image($r('app.media.icon'))
              .height(160)
              .width(160)

            Image($r('app.media.icon'))
              .height(160)
              .width(160)
          }
          .width('90%')
          .justifyContent(FlexAlign.Center)
          .margin({ top: 12 })
        }
      }
      .width('100%')
      .height('65%')
      .padding(8)
      .margin({ left: 12, right: 12, top: 12, bottom: 120 })
      .backgroundColor(Color.White)
      .borderRadius(8)

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
          Image($r('app.media.icon'))
            .height(38)
            .width(38)
        }
        .margin({ top: 12 })
        .width('100%')
        .justifyContent(FlexAlign.SpaceAround)

        Row() {
          Text($r('app.string.index_recommend'))
          Text($r('app.string.index_optimization'))
          Text($r('app.string.index_video'))
          Text($r('app.string.index_message'))
          Text($r('app.string.index_me'))
        }
        .margin({ top: 8, bottom: 8 })
        .width('100%')
        .justifyContent(FlexAlign.SpaceAround)
      }
      .position({ y: '90%' })
      .backgroundColor(Color.White)
    }
    .backgroundColor($r('app.color.index_bg'))
    .width('100%')
    .height('100%')
  }
}