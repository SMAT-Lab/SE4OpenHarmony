interface Buy_Params {
    businessController?: BusinessController;
    commodityController?: CommodityController;
    businessList?: Array<BusinessInfo>;
    commodityList?: CommodityInfo[][];
    longitude?: string;
    latitude?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Buy_" + ++__generate__Id;
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
import CommodityController from '../../controller/CommodityController';
import { BusinessInfo, CommodityInfo } from '../../data/Server';
import Logger from '../../utils/Logger';
import { getStringData } from '../../utils/ResourceDataHandle';
import { BusinessError } from '@ohos.base';
const TAG: string = '[Buy]';
class Buy extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.businessController = new BusinessController();
        this.commodityController = new CommodityController();
        this.__businessList = new ObservedPropertyObject([], this, "businessList");
        this.__commodityList = new ObservedPropertyObject([], this, "commodityList");
        this.__longitude = new ObservedPropertySimple(getStringData($r('app.string.buy_longitude')), this, "longitude");
        this.__latitude = new ObservedPropertySimple(getStringData($r('app.string.buy_latitude')), this, "latitude");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Buy_Params) {
        if (params.businessController !== undefined) {
            this.businessController = params.businessController;
        }
        if (params.commodityController !== undefined) {
            this.commodityController = params.commodityController;
        }
        if (params.businessList !== undefined) {
            this.businessList = params.businessList;
        }
        if (params.commodityList !== undefined) {
            this.commodityList = params.commodityList;
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
        this.__commodityList.aboutToBeDeleted();
        this.__longitude.aboutToBeDeleted();
        this.__latitude.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private businessController: BusinessController;
    private commodityController: CommodityController;
    private __businessList: ObservedPropertyObject<Array<BusinessInfo>>; // 商家列表
    get businessList() {
        return this.__businessList.get();
    }
    set businessList(newValue: Array<BusinessInfo>) {
        this.__businessList.set(newValue);
    }
    private __commodityList: ObservedPropertyObject<CommodityInfo[][]>; // 商品列表
    get commodityList() {
        return this.__commodityList.get();
    }
    set commodityList(newValue: CommodityInfo[][]) {
        this.__commodityList.set(newValue);
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
                });
            });
        }).catch((err: BusinessError) => {
            Logger.info(TAG, `aboutToAppear catch err= ${JSON.stringify(err)}`);
        });
    }
    render() {
        Column.create();
        Column.create();
        Column.width('100%');
        Column.backgroundColor($r('app.color.index_bg'));
        Row.create();
        Row.justifyContent(FlexAlign.Center);
        Row.margin({ top: 4 });
        Row.width('90%');
        Row.height('8%');
        Image.create($r('app.media.icon'));
        Image.height(24);
        Image.width(24);
        Image.id('buyBack');
        Image.onClick(() => {
            router.back();
        });
        Row.create();
        Row.height('70%');
        Row.margin({ left: 12, top: 12, bottom: 10 });
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
        Row.pop();
        Image.create($r('app.media.icon'));
        Image.height(36);
        Image.width(36);
        Image.margin({ left: 24 });
        Image.id('selfPickUp');
        Image.onClick(() => {
            router.push({ url: 'pages/buy/SelfPickUp' });
        });
        Row.pop();
        Row.create();
        Row.justifyContent(FlexAlign.SpaceBetween);
        Row.width('90%');
        Row.height('8%');
        Text.create($r('app.string.buy_all'));
        Text.fontSize(18);
        Text.pop();
        Text.create($r('app.string.buy_takeaway'));
        Text.fontSize(18);
        Text.pop();
        Text.create($r('app.string.buy_store'));
        Text.fontSize(18);
        Text.pop();
        Text.create($r('app.string.buy_hongtuan'));
        Text.fontSize(18);
        Text.pop();
        Text.create($r('app.string.buy_delivery'));
        Text.fontSize(18);
        Text.pop();
        Row.pop();
        Column.pop();
        Row.create();
        Row.margin({ top: 24 });
        Row.borderRadius(8);
        Row.width('90%');
        Row.backgroundColor($r('app.color.index_bg'));
        Text.create($r('app.string.buy_shop'));
        Text.width('100%');
        Text.textAlign(TextAlign.Center);
        Text.padding({ top: 6, bottom: 6 });
        Text.pop();
        Row.pop();
        Scroll.create();
        Scroll.width('100%');
        Scroll.height('90%');
        Column.create();
        Column.margin({ bottom: 120 });
        ForEach.create("3", this, ObservedObject.GetRawObject(this.businessList), (business: BusinessInfo, index) => {
            Row.create();
            Row.height('44%');
            Row.margin({ top: 24 });
            Row.create();
            Row.height('100%');
            Row.alignItems(VerticalAlign.Top);
            Image.create($r('app.media.icon'));
            Image.width(100);
            Image.height(100);
            Row.pop();
            Column.create();
            Column.width('70%');
            Column.height('100%');
            Column.margin({ left: 12, right: 12 });
            Column.justifyContent(FlexAlign.Start);
            Row.create();
            Row.width('100%');
            Text.create(business.name);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.fontSize(24);
            Text.fontWeight(5);
            Text.pop();
            Row.pop();
            Row.create();
            Row.width('100%');
            Row.margin({ top: 4 });
            Text.create(business.score + getStringData($r('app.string.business_score')));
            Text.fontColor($r('app.color.business_score'));
            Text.fontSize(20);
            Text.fontWeight(5);
            Text.pop();
            Blank.create();
            Blank.pop();
            Text.create($r('app.string.buy_time'));
            Text.fontSize(16);
            Text.fontWeight(5);
            Text.margin({ left: 6 });
            Text.pop();
            Row.pop();
            Row.create();
            Row.width('100%');
            Row.margin({ top: 4 });
            Text.create(getStringData($r('app.string.buy_address')) + business.address);
            Text.fontSize(16);
            Text.fontWeight(5);
            Text.pop();
            Blank.create();
            Blank.pop();
            Text.create(business.distance + getStringData($r('app.string.business_m')));
            Text.fontSize(16);
            Text.fontWeight(5);
            Text.pop();
            Row.pop();
            Row.create();
            Row.width('100%');
            Row.margin({ top: 8 });
            Row.create();
            Row.backgroundColor($r('app.color.business_buy_back_bg'));
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
            Text.fontColor($r('app.color.business_good_shop'));
            Text.fontSize(12);
            Text.fontWeight(5);
            Text.pop();
            Row.pop();
            Row.pop();
            Scroll.create();
            Scroll.scrollable(ScrollDirection.Horizontal);
            Row.create();
            ForEach.create("2", this, ObservedObject.GetRawObject(this.commodityList[index]), (commodity: CommodityInfo) => {
                Row.create();
                Row.margin({ left: 4, top: 8 });
                Row.justifyContent(FlexAlign.Start);
                Column.create();
                Column.margin({ top: 4 });
                Column.width(100);
                Image.create($r('app.media.icon'));
                Image.width(100);
                Image.height(100);
                Text.create(commodity.name.split('').join('\u200B'));
                Text.textAlign(TextAlign.Start);
                Text.textOverflow({ overflow: TextOverflow.Ellipsis });
                Text.maxLines(1);
                Text.margin({ top: 4 });
                Text.pop();
                Text.create(commodity.salePrice);
                Text.width(100);
                Text.textAlign(TextAlign.Start);
                Text.fontColor($r('app.color.business_score'));
                Text.fontSize(20);
                Text.fontWeight(5);
                Text.margin({ top: 4 });
                Text.pop();
                Column.pop();
                Row.pop();
            });
            ForEach.pop();
            Row.pop();
            Scroll.pop();
            Column.pop();
            Row.pop();
        });
        ForEach.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
}
loadDocument(new Buy("1", undefined, {}));
