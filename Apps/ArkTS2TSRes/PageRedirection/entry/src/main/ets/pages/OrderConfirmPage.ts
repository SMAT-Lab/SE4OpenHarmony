interface OrderConfirmPage_Params {
    statusBarHeight?: number;
    sliderBarHeight?: number;
    productDetail?: ProductModel;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "OrderConfirmPage_" + ++__generate__Id;
}
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
function __Text__titleStyle(): void {
    Text.fontSize($r('app.float.font_size_mm'));
    Text.lineHeight($r('app.float.line_height_mm'));
    Text.fontWeight(FontWeight.Normal);
    Text.fontFamily('HarmonyHeiTi');
}
class OrderConfirmPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.statusBarHeight = (router.getParams() as Record<string, number>)['statusBarHeight'];
        this.sliderBarHeight = (router.getParams() as Record<string, number>)['sliderBarHeight'];
        this.productDetail = JSON.parse((router.getParams() as Record<string, string>)['detailStr']) as ProductModel;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: OrderConfirmPage_Params) {
        if (params.statusBarHeight !== undefined) {
            this.statusBarHeight = params.statusBarHeight;
        }
        if (params.sliderBarHeight !== undefined) {
            this.sliderBarHeight = params.sliderBarHeight;
        }
        if (params.productDetail !== undefined) {
            this.productDetail = params.productDetail;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private statusBarHeight: number;
    private sliderBarHeight: number;
    private productDetail: ProductModel;
    render() {
        Column.create();
        Column.width(CommonConstants.FULL_PERCENT);
        Column.height(CommonConstants.FULL_PERCENT);
        Column.backgroundColor($r('app.color.common_bg'));
        Column.padding({
            top: this.statusBarHeight,
            left: $r('app.float.md_padding_margin'),
            right: $r('app.float.md_padding_margin'),
            bottom: this.sliderBarHeight
        });
        Row.create();
        Row.width(CommonConstants.FULL_PERCENT);
        Row.height($r('app.float.navi_height'));
        Image.create($r('app.media.ic_back_on'));
        Image.width($r('app.float.img_size'));
        Image.margin({ left: $r('app.float.md_padding_margin'), right: $r('app.float.lg_padding_margin') });
        Image.onClick(() => {
            router.back();
        });
        Text.create($r('app.string.confirm_order'));
        Text.fontSize($r('app.float.font_size_lg'));
        Text.fontWeight(FontWeight.Medium);
        Text.pop();
        Row.pop();
        Column.create();
        Column.layoutWeight(1);
        Row.create();
        Row.padding($r('app.float.md_padding_margin'));
        Row.margin({ top: $r('app.float.sm_padding_margin') });
        Row.backgroundColor(Color.White);
        Row.height($r('app.float.location_info_height'));
        Row.width(CommonConstants.FULL_PERCENT);
        Row.borderRadius($r('app.float.border_radius'));
        Image.create($r('app.media.ic_location'));
        Image.width($r('app.float.location_img_size'));
        Image.aspectRatio(1);
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Column.margin({ left: $r('app.float.md_padding_margin') });
        Column.layoutWeight(1);
        Row.create();
        Text.create($r('app.string.user_name'));
        __Text__titleStyle();
        Text.pop();
        Text.create($r('app.string.user_phone'));
        __Text__titleStyle();
        Text.margin({ left: $r('app.float.md_padding_margin') });
        Text.pop();
        Row.pop();
        Text.create($r('app.string.user_address'));
        __Text__titleStyle();
        Text.fontSize($r('app.float.font_size_sm'));
        Text.fontColor($r('app.color.desc_font'));
        Text.margin({ top: $r('app.float.ss_padding_margin') });
        Text.pop();
        Column.pop();
        Row.pop();
        Column.create({ space: CommonConstants.NORMAL_SPACE });
        Column.alignItems(HorizontalAlign.Start);
        Column.margin({ top: $r('app.float.md_padding_margin') });
        Column.padding({ left: $r('app.float.md_padding_margin'), right: $r('app.float.md_padding_margin') });
        Column.backgroundColor(Color.White);
        Column.width(CommonConstants.FULL_PERCENT);
        Column.borderRadius($r('app.float.border_radius'));
        Row.create();
        Row.height($r('app.float.ext_item_height'));
        Row.margin({ top: $r('app.float.md_padding_margin') });
        Image.create($r('app.media.ic_avatar'));
        Image.width($r('app.float.img_size'));
        Image.aspectRatio(1);
        Text.create($r('app.string.self_operated'));
        __Text__titleStyle();
        Text.margin({ left: $r('app.float.sm_padding_margin') });
        Text.pop();
        Row.pop();
        Divider.create();
        Divider.vertical(false);
        Divider.width(CommonConstants.FULL_PERCENT);
        Divider.color($r('app.color.common_bg'));
        Row.create({ space: CommonConstants.NORMAL_SPACE });
        Row.alignItems(VerticalAlign.Top);
        Image.create($rawfile(this.productDetail.img));
        Image.width($r('app.float.product_size'));
        Image.aspectRatio(1);
        Image.borderRadius($r('app.float.border_radius'));
        Column.create();
        Column.justifyContent(FlexAlign.SpaceBetween);
        Column.alignItems(HorizontalAlign.Start);
        Column.layoutWeight(1);
        Column.height($r('app.float.product_size'));
        Text.create(this.productDetail.name);
        __Text__titleStyle();
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.maxLines(2);
        Text.pop();
        Text.create(this.productDetail.sku);
        __Text__titleStyle();
        Text.fontSize($r('app.float.font_size_sm'));
        Text.lineHeight($r('app.float.line_height_sm'));
        Text.fontColor($r('app.color.desc_font'));
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.maxLines(2);
        Text.pop();
        Column.pop();
        Column.create();
        Column.margin({ left: $r('app.float.lg_padding_margin') });
        Column.alignItems(HorizontalAlign.End);
        Text.create($r('app.string.dollar', this.productDetail.price));
        __Text__titleStyle();
        Text.fontWeight(FontWeight.Medium);
        Text.pop();
        Text.create('x1');
        Text.fontSize($r('app.float.font_size_sm'));
        Text.fontColor($r('app.color.desc_font'));
        Text.fontWeight(FontWeight.Medium);
        Text.fontFamily('HarmonyHeiTi-Medium');
        Text.margin({ top: $r('app.float.ss_padding_margin') });
        Text.pop();
        Column.pop();
        Row.pop();
        Row.create();
        Row.height($r('app.float.ext_item_height'));
        Row.margin({ top: $r('app.float.md_padding_margin') });
        Row.width(CommonConstants.FULL_PERCENT);
        Row.justifyContent(FlexAlign.SpaceBetween);
        Text.create($r('app.string.delivery'));
        __Text__titleStyle();
        Text.pop();
        Text.create($r('app.string.standard_delivery'));
        __Text__titleStyle();
        Text.pop();
        Row.pop();
        Divider.create();
        Divider.vertical(false);
        Divider.width(CommonConstants.FULL_PERCENT);
        Divider.color($r('app.color.common_bg'));
        Row.create();
        Row.height($r('app.float.ext_item_height'));
        Row.margin({ bottom: $r('app.float.md_padding_margin') });
        Row.width(CommonConstants.FULL_PERCENT);
        Row.justifyContent(FlexAlign.SpaceBetween);
        Text.create($r('app.string.invoice'));
        __Text__titleStyle();
        Text.pop();
        Row.create();
        Text.create($r('app.string.personal_invoice'));
        __Text__titleStyle();
        Text.pop();
        Image.create($r('app.media.ic_more'));
        Image.width($r('app.float.more_img_width'));
        Image.height($r('app.float.more_img_height'));
        Image.margin({ left: $r('app.float.md_padding_margin') });
        Row.pop();
        Row.pop();
        Column.pop();
        Column.pop();
        Row.create();
        Row.justifyContent(FlexAlign.SpaceBetween);
        Row.width(CommonConstants.FULL_PERCENT);
        Row.height($r('app.float.navi_height'));
        Row.create();
        Text.create($r('app.string.dollar', ''));
        Text.fontColor($r('app.color.price_red'));
        Text.fontSize($r('app.float.font_size_md'));
        Text.fontWeight(FontWeight.Medium);
        Text.pop();
        Text.create(this.productDetail.price.toString());
        Text.fontColor($r('app.color.price_red'));
        Text.fontSize($r('app.float.font_size_llg'));
        Text.fontWeight(FontWeight.Medium);
        Text.pop();
        Row.pop();
        Button.createWithLabel($r('app.string.confirm_order'));
        Button.width(CommonConstants.PERCENT_50);
        Button.linearGradient({
            angle: 90,
            colors: [[$r('app.color.button_start'), 0.11], [$r('app.color.button_end'), 0.89]]
        });
        Button.onClick(() => {
            promptAction.showToast({
                message: $r('app.string.toast_msg'),
                duration: CommonConstants.TOAST_DURATION
            });
        });
        Button.pop();
        Row.pop();
        Column.pop();
    }
}
loadDocument(new OrderConfirmPage("1", undefined, {}));
