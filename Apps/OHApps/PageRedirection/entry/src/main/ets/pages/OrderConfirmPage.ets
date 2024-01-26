/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License,Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import promptAction from '@ohos.promptAction';
import router from '@ohos.router';
import { CommonConstants } from '../common/constants/CommonConstants';
import ProductModel from '../model/ProductModel';

@Extend(Text)
function titleStyle() {
  .fontSize($r('app.float.font_size_mm'))
  .lineHeight($r('app.float.line_height_mm'))
  .fontWeight(FontWeight.Normal)
  .fontFamily('HarmonyHeiTi')
}

@Entry
@Component
struct OrderConfirmPage {
  statusBarHeight: number = (router.getParams() as Record<string, number>)['statusBarHeight'];
  sliderBarHeight: number = (router.getParams() as Record<string, number>)['sliderBarHeight'];
  productDetail: ProductModel = JSON.parse((router.getParams() as Record<string, string>)['detailStr']) as ProductModel;

  build() {
    Column() {
      Row() {
        Image($r('app.media.ic_back_on'))
          .width($r('app.float.img_size'))
          .margin({ left: $r('app.float.md_padding_margin'), right: $r('app.float.lg_padding_margin') })
          .onClick(() => {
            router.back();
          })
        Text($r('app.string.confirm_order'))
          .fontSize($r('app.float.font_size_lg'))
          .fontWeight(FontWeight.Medium)
      }
      .width(CommonConstants.FULL_PERCENT)
      .height($r('app.float.navi_height'))

      Column() {
        Row() {
          Image($r('app.media.ic_location'))
            .width($r('app.float.location_img_size'))
            .aspectRatio(1)
          Column() {
            Row() {
              Text($r('app.string.user_name'))
                .titleStyle()
              Text($r('app.string.user_phone'))
                .titleStyle()
                .margin({ left: $r('app.float.md_padding_margin') })
            }

            Text($r('app.string.user_address'))
              .titleStyle()
              .fontSize($r('app.float.font_size_sm'))
              .fontColor($r('app.color.desc_font'))
              .margin({ top: $r('app.float.ss_padding_margin') })
          }
          .alignItems(HorizontalAlign.Start)
          .margin({ left: $r('app.float.md_padding_margin') })
          .layoutWeight(1)
        }
        .padding($r('app.float.md_padding_margin'))
        .margin({ top: $r('app.float.sm_padding_margin') })
        .backgroundColor(Color.White)
        .height($r('app.float.location_info_height'))
        .width(CommonConstants.FULL_PERCENT)
        .borderRadius($r('app.float.border_radius'))

        Column({ space: CommonConstants.NORMAL_SPACE }) {
          Row() {
            Image($r('app.media.ic_avatar'))
              .width($r('app.float.img_size'))
              .aspectRatio(1)
            Text($r('app.string.self_operated'))
              .titleStyle()
              .margin({ left: $r('app.float.sm_padding_margin') })
          }
          .height($r('app.float.ext_item_height'))
          .margin({ top: $r('app.float.md_padding_margin') })

          Divider()
            .vertical(false)
            .width(CommonConstants.FULL_PERCENT)
            .color($r('app.color.common_bg'))

          Row({ space: CommonConstants.NORMAL_SPACE }) {
            Image($rawfile(this.productDetail.img))
              .width($r('app.float.product_size'))
              .aspectRatio(1)
              .borderRadius($r('app.float.border_radius'))
            Column() {
              Text(this.productDetail.name)
                .titleStyle()
                .textOverflow({ overflow: TextOverflow.Ellipsis })
                .maxLines(2)
              Text(this.productDetail.sku)
                .titleStyle()
                .fontSize($r('app.float.font_size_sm'))
                .lineHeight($r('app.float.line_height_sm'))
                .fontColor($r('app.color.desc_font'))
                .textOverflow({ overflow: TextOverflow.Ellipsis })
                .maxLines(2)
            }
            .justifyContent(FlexAlign.SpaceBetween)
            .alignItems(HorizontalAlign.Start)
            .layoutWeight(1)
            .height($r('app.float.product_size'))

            Column() {
              Text($r('app.string.dollar', this.productDetail.price))
                .titleStyle()
                .fontWeight(FontWeight.Medium)
              Text('x1')
                .fontSize($r('app.float.font_size_sm'))
                .fontColor($r('app.color.desc_font'))
                .fontWeight(FontWeight.Medium)
                .fontFamily('HarmonyHeiTi-Medium')
                .margin({ top: $r('app.float.ss_padding_margin') })
            }
            .margin({ left: $r('app.float.lg_padding_margin') })
            .alignItems(HorizontalAlign.End)
          }
          .alignItems(VerticalAlign.Top)

          Row() {
            Text($r('app.string.delivery'))
              .titleStyle()
            Text($r('app.string.standard_delivery'))
              .titleStyle()
          }
          .height($r('app.float.ext_item_height'))
          .margin({ top: $r('app.float.md_padding_margin') })
          .width(CommonConstants.FULL_PERCENT)
          .justifyContent(FlexAlign.SpaceBetween)

          Divider()
            .vertical(false)
            .width(CommonConstants.FULL_PERCENT)
            .color($r('app.color.common_bg'))
          Row() {
            Text($r('app.string.invoice'))
              .titleStyle()
            Row() {
              Text($r('app.string.personal_invoice'))
                .titleStyle()
              Image($r('app.media.ic_more'))
                .width($r('app.float.more_img_width'))
                .height($r('app.float.more_img_height'))
                .margin({ left: $r('app.float.md_padding_margin') })
            }
          }
          .height($r('app.float.ext_item_height'))
          .margin({ bottom: $r('app.float.md_padding_margin') })
          .width(CommonConstants.FULL_PERCENT)
          .justifyContent(FlexAlign.SpaceBetween)
        }
        .alignItems(HorizontalAlign.Start)
        .margin({ top: $r('app.float.md_padding_margin') })
        .padding({ left: $r('app.float.md_padding_margin'), right: $r('app.float.md_padding_margin') })
        .backgroundColor(Color.White)
        .width(CommonConstants.FULL_PERCENT)
        .borderRadius($r('app.float.border_radius'))
      }
      .layoutWeight(1)

      Row() {
        Row() {
          Text($r('app.string.dollar', ''))
            .fontColor($r('app.color.price_red'))
            .fontSize($r('app.float.font_size_md'))
            .fontWeight(FontWeight.Medium)
          Text(this.productDetail.price.toString())
            .fontColor($r('app.color.price_red'))
            .fontSize($r('app.float.font_size_llg'))
            .fontWeight(FontWeight.Medium)
        }

        Button($r('app.string.confirm_order'))
          .width(CommonConstants.PERCENT_50)
          .linearGradient({
            angle: 90,
            colors: [[$r('app.color.button_start'), 0.11], [$r('app.color.button_end'), 0.89]]
          })
          .onClick(() => {
            promptAction.showToast({
              message: $r('app.string.toast_msg'),
              duration: CommonConstants.TOAST_DURATION
            });
          })
      }
      .justifyContent(FlexAlign.SpaceBetween)
      .width(CommonConstants.FULL_PERCENT)
      .height($r('app.float.navi_height'))
    }
    .width(CommonConstants.FULL_PERCENT)
    .height(CommonConstants.FULL_PERCENT)
    .backgroundColor($r('app.color.common_bg'))
    .padding({
      top: this.statusBarHeight,
      left: $r('app.float.md_padding_margin'),
      right: $r('app.float.md_padding_margin'),
      bottom: this.sliderBarHeight
    })
  }
}