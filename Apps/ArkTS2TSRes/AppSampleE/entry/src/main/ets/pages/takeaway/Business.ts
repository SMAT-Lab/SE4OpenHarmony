interface Business_Params {
    businessController?: BusinessController;
    businessList?: Array<BusinessInfo>;
    longitude?: string;
    latitude?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Business_" + ++__generate__Id;
}
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
function __Row__rowStyle(): void {
    Row.borderRadius(8);
    Row.backgroundColor($r('app.color.index_bg'));
    Row.margin({ top: 8 });
    Row.padding({ left: 24, right: 24, top: 8, bottom: 8 });
}
function __Row__rowStyleShop(): void {
    Row.backgroundColor(Color.White);
    Row.width('90%');
    Row.height(150);
    Row.borderRadius(8);
    Row.margin({ top: 12 });
    Row.padding(12);
}
class Business extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.businessController = new BusinessController();
        this.__businessList = new ObservedPropertyObject([], this, "businessList");
        this.__longitude = new ObservedPropertySimple(getStringData($r('app.string.buy_longitude')), this, "longitude");
        this.__latitude = new ObservedPropertySimple(getStringData($r('app.string.buy_latitude')), this, "latitude");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Business_Params) {
        if (params.businessController !== undefined) {
            this.businessController = params.businessController;
        }
        if (params.businessList !== undefined) {
            this.businessList = params.businessList;
        }
        if (params.longitude !== undefined) {
            this.longitude = params.longitude;
        }
        if (params.latitude !== undefined) {
            this.latitude = params.latitude;
        }
    }
    aboutToBeDeleted() {
        this.__businessList.aboutToBeDeleted();
        this.__longitude.aboutToBeDeleted();
        this.__latitude.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private businessController: BusinessController;
    private __businessList: ObservedPropertyObject<Array<BusinessInfo>>; // 商家列表
    get businessList() {
        return this.__businessList.get();
    }
    set businessList(newValue: Array<BusinessInfo>) {
        this.__businessList.set(newValue);
    }
    private __longitude: ObservedPropertySimple<string>; // 经度
    get longitude() {
        return this.__longitude.get();
    }
    set longitude(newValue: string) {
        this.__longitude.set(newValue);
    }
    private __latitude: ObservedPropertySimple<string>; // 纬度
    get latitude() {
        return this.__latitude.get();
    }
    set latitude(newValue: string) {
        this.__latitude.set(newValue);
    }
    aboutToAppear() {
        Logger.info(TAG, 'aboutToAppear begin');
        this.businessController.getBusinessList(this.longitude, this.latitude).then((res: BusinessInfo[]) => {
            Logger.info(TAG, `aboutToAppear then res= ${JSON.stringify(res)}`);
            this.businessList = res;
        }).catch((err: BusinessError) => {
            Logger.info(TAG, `aboutToAppear catch err= ${JSON.stringify(err)}`);
        });
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Row.create();
        Row.width('90%');
        Row.height('8%');
        Image.create($r('app.media.icon'));
        Image.height(24);
        Image.width(24);
        Image.onClick(() => {
            router.back();
        });
        Row.create();
        Row.height('100%');
        Row.border({ color: $r('app.color.business_border'), width: 2 });
        Row.margin({ left: 12, top: 10, bottom: 10 });
        Row.layoutWeight(1);
        Row.backgroundColor(Color.White);
        Row.borderRadius(24);
        Image.create($r('app.media.icon'));
        Image.height(18);
        Image.width(18);
        Image.margin({ left: 12 });
        Text.create($r('app.string.business_noodles'));
        Text.fontSize(18);
        Text.fontColor($r('app.color.business_font'));
        Text.fontWeight(FontWeight.Medium);
        Text.margin({ left: 12 });
        Text.pop();
        Blank.create();
        Blank.pop();
        Button.createWithLabel($r('app.string.index_search'));
        Button.fontColor($r('app.color.index_font'));
        Button.fontSize(18);
        Button.width(75);
        Button.height('85%');
        Button.backgroundColor($r('app.color.index_search_btn_bg'));
        Button.margin({ right: 4 });
        Button.pop();
        Row.pop();
        Row.pop();
        Row.create();
        Row.justifyContent(FlexAlign.SpaceAround);
        Row.width('90%');
        Row.height('8%');
        Row.create();
        __Row__rowStyle();
        Text.create($r('app.string.business_less_delivery'));
        Text.fontSize(18);
        Text.pop();
        Row.pop();
        Row.create();
        __Row__rowStyle();
        Text.create($r('app.string.business_zero'));
        Text.fontSize(18);
        Text.pop();
        Row.pop();
        Row.create();
        __Row__rowStyle();
        Text.create($r('app.string.business_order_minus'));
        Text.fontSize(18);
        Text.pop();
        Row.pop();
        Row.pop();
        Scroll.create();
        Scroll.borderRadius(8);
        Scroll.margin({ left: 12, right: 12, top: 12, bottom: 200 });
        Scroll.width('95%');
        Scroll.height('85%');
        Scroll.backgroundColor($r('app.color.index_bg'));
        Column.create();
        ForEach.create("2", this, ObservedObject.GetRawObject(this.businessList), (business: BusinessInfo, index: number) => {
            Row.create();
            __Row__rowStyleShop();
            Row.onClick(() => {
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
            });
            Row.id('business' + index);
            Image.create($r('app.media.icon'));
            Image.width(125);
            Image.height(125);
            Column.create();
            Column.justifyContent(FlexAlign.Start);
            Column.height('90%');
            Column.width('60%');
            Column.margin({ left: 12, right: 12 });
            Row.create();
            Row.width('100%');
            Text.create(business.name);
            Text.fontSize(24);
            Text.fontWeight(5);
            Text.pop();
            Row.pop();
            Row.create();
            Row.width('100%');
            Row.margin({ top: 4 });
            Text.create(getStringData($r('app.string.business_score')) + business.score);
            Text.fontColor($r('app.color.business_score'));
            Text.fontSize(20);
            Text.fontWeight(5);
            Text.pop();
            Text.create(getStringData($r('app.string.business_monthly_sale')) + business.monthlySale);
            Text.fontSize(12);
            Text.fontWeight(5);
            Text.margin({ left: 6 });
            Text.pop();
            Text.create(getStringData($r('app.string.business_per_capita')) + business.perCapita);
            Text.fontSize(12);
            Text.fontWeight(5);
            Text.margin({ left: 6 });
            Text.pop();
            Row.create();
            Row.margin({ left: 6 });
            Row.borderWidth(2);
            Row.border({ color: $r('app.color.business_delivery_bg') });
            Text.create($r('app.string.business_delivery'));
            Text.fontColor($r('app.color.business_delivery'));
            Text.fontSize(12);
            Text.fontWeight(5);
            Text.margin({ left: 6, right: 6 });
            Text.pop();
            Row.pop();
            Row.pop();
            Row.create();
            Row.width('100%');
            Row.margin({ top: 4 });
            Text.create(getStringData($r('app.string.business_give')) + business.startPrice);
            Text.fontSize(12);
            Text.fontWeight(5);
            Text.pop();
            Text.create(getStringData($r('app.string.business_distribution')) + business.deliveryPrice);
            Text.fontSize(12);
            Text.fontWeight(5);
            Text.margin({ left: 6 });
            Text.pop();
            Blank.create();
            Blank.pop();
            Text.create(business.deliveryTime + getStringData($r('app.string.business_min')));
            Text.fontSize(12);
            Text.fontWeight(5);
            Text.margin({ left: 12, right: 6 });
            Text.pop();
            Text.create(business.distance + getStringData($r('app.string.business_m')));
            Text.fontSize(12);
            Text.fontWeight(5);
            Text.pop();
            Row.pop();
            Row.create();
            Row.width('100%');
            Row.margin({ top: 8 });
            Row.create();
            Row.backgroundColor($r('app.color.business_good_shop_bg'));
            Text.create($r('app.string.business_good_shop'));
            Text.fontColor($r('app.color.business_good_shop'));
            Text.fontSize(12);
            Text.fontWeight(5);
            Text.pop();
            Row.pop();
            Row.create();
            Row.margin({ left: 6 });
            Row.backgroundColor($r('app.color.business_buy_back_bg'));
            Text.create($r('app.string.business_buy_back'));
            Text.fontColor($r('app.color.business_buy_back'));
            Text.fontSize(12);
            Text.fontWeight(5);
            Text.pop();
            Row.pop();
            Row.pop();
            Row.create();
            Row.width('100%');
            Row.margin({ top: 6 });
            Text.create($r('app.string.business_reduce'));
            Text.fontColor(Color.Red);
            Text.fontSize(12);
            Text.fontWeight(5);
            Text.borderWidth(2);
            Text.border({ color: Color.Red });
            Text.pop();
            Row.pop();
            Column.pop();
            Row.pop();
        });
        ForEach.pop();
        Column.pop();
        Scroll.pop();
        Column.create();
        Column.backgroundColor(Color.White);
        Column.position({ y: '92%' });
        Row.create();
        Row.margin({ top: 12 });
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceAround);
        Image.create($r('app.media.icon'));
        Image.height(38);
        Image.width(38);
        Image.create($r('app.media.icon'));
        Image.height(38);
        Image.width(38);
        Image.create($r('app.media.icon'));
        Image.height(38);
        Image.width(38);
        Image.create($r('app.media.icon'));
        Image.height(38);
        Image.width(38);
        Row.pop();
        Row.create();
        Row.margin({ top: 8, bottom: 8 });
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceAround);
        Text.create($r('app.string.business_takeaway'));
        Text.pop();
        Text.create($r('app.string.business_vip'));
        Text.pop();
        Text.create($r('app.string.business_order'));
        Text.pop();
        Text.create($r('app.string.business_more'));
        Text.pop();
        Row.pop();
        Column.pop();
        Column.pop();
    }
}
loadDocument(new Business("1", undefined, {}));
