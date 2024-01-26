interface ProductDetails_Params {
    CommodityController?: CommodityController;
    com?: com;
    commodity?: CommodityInfo | undefined;
    commodityId?: string;
    name?: string;
    description?: string;
    standards?: string;
    price?: string;
    salesNumber?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ProductDetails_" + ++__generate__Id;
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
import CommodityController from '../../controller/CommodityController';
import Logger from '../../utils/Logger';
import com from '../../data/Commodity';
import { getStringData } from '../../utils/ResourceDataHandle';
import { BusinessError } from '@ohos.base';
import { CommodityInfo } from '../../data/Server';
const TAG: string = '[ProductDetails]';
class ProductDetails extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.CommodityController = new CommodityController();
        this.com = new com();
        this.__commodity = new ObservedPropertyObject(undefined, this, "commodity");
        this.__commodityId = new ObservedPropertySimple((router.getParams() as Record<string, Object>).commodityId as string, this, "commodityId");
        this.__name = new ObservedPropertySimple('', this, "name");
        this.__description = new ObservedPropertySimple('', this, "description");
        this.__standards = new ObservedPropertySimple('', this, "standards");
        this.__price = new ObservedPropertySimple('', this, "price");
        this.__salesNumber = new ObservedPropertySimple('', this, "salesNumber");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ProductDetails_Params) {
        if (params.CommodityController !== undefined) {
            this.CommodityController = params.CommodityController;
        }
        if (params.com !== undefined) {
            this.com = params.com;
        }
        if (params.commodity !== undefined) {
            this.commodity = params.commodity;
        }
        if (params.commodityId !== undefined) {
            this.commodityId = params.commodityId;
        }
        if (params.name !== undefined) {
            this.name = params.name;
        }
        if (params.description !== undefined) {
            this.description = params.description;
        }
        if (params.standards !== undefined) {
            this.standards = params.standards;
        }
        if (params.price !== undefined) {
            this.price = params.price;
        }
        if (params.salesNumber !== undefined) {
            this.salesNumber = params.salesNumber;
        }
    }
    aboutToBeDeleted() {
        this.__commodity.aboutToBeDeleted();
        this.__commodityId.aboutToBeDeleted();
        this.__name.aboutToBeDeleted();
        this.__description.aboutToBeDeleted();
        this.__standards.aboutToBeDeleted();
        this.__price.aboutToBeDeleted();
        this.__salesNumber.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private CommodityController: CommodityController;
    private com: com;
    private __commodity: ObservedPropertyObject<CommodityInfo | undefined>;
    get commodity() {
        return this.__commodity.get();
    }
    set commodity(newValue: CommodityInfo | undefined) {
        this.__commodity.set(newValue);
    }
    private __commodityId: ObservedPropertySimple<string>;
    get commodityId() {
        return this.__commodityId.get();
    }
    set commodityId(newValue: string) {
        this.__commodityId.set(newValue);
    }
    private __name: ObservedPropertySimple<string>;
    get name() {
        return this.__name.get();
    }
    set name(newValue: string) {
        this.__name.set(newValue);
    }
    private __description: ObservedPropertySimple<string>;
    get description() {
        return this.__description.get();
    }
    set description(newValue: string) {
        this.__description.set(newValue);
    }
    private __standards: ObservedPropertySimple<string>;
    get standards() {
        return this.__standards.get();
    }
    set standards(newValue: string) {
        this.__standards.set(newValue);
    }
    private __price: ObservedPropertySimple<string>;
    get price() {
        return this.__price.get();
    }
    set price(newValue: string) {
        this.__price.set(newValue);
    }
    private __salesNumber: ObservedPropertySimple<string>;
    get salesNumber() {
        return this.__salesNumber.get();
    }
    set salesNumber(newValue: string) {
        this.__salesNumber.set(newValue);
    }
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
        });
    }
    render() {
        Column.create();
        Column.backgroundColor($r('app.color.index_bg'));
        Column.width('100%');
        Column.height('100%');
        Column.create();
        Column.width('100%');
        Column.backgroundColor(Color.White);
        Column.margin({ bottom: 12 });
        Row.create();
        Row.width('90%');
        Row.height('8%');
        Image.create($r('app.media.icon'));
        Image.width(24);
        Image.height(24);
        Image.onClick(() => {
            router.back();
        });
        Image.id('ProductDetailsBack');
        Blank.create();
        Blank.pop();
        Image.create($r('app.media.icon'));
        Image.width(24);
        Image.height(24);
        Row.pop();
        Column.create();
        Column.width('90%');
        Text.create(this.name);
        Text.width('100%');
        Text.textAlign(TextAlign.Start);
        Text.fontSize(24);
        Text.pop();
        Text.create($r('app.string.commodity_one'));
        Text.width('100%');
        Text.textAlign(TextAlign.Start);
        Text.fontColor($r('app.color.pd_font_gray'));
        Text.margin({ top: 4 });
        Text.pop();
        Row.create();
        Row.width('100%');
        Row.margin({ top: 4 });
        Button.createWithLabel(this.standards);
        Button.fontColor($r('app.color.pd_standard'));
        Button.backgroundColor($r('app.color.pd_standard_bg'));
        Button.margin({ top: 6, bottom: 6 });
        Button.pop();
        Blank.create();
        Blank.pop();
        Row.pop();
        Text.create(getStringData($r('app.string.commodity_month')) + this.salesNumber);
        Text.width('100%');
        Text.textAlign(TextAlign.Start);
        Text.fontColor($r('app.color.pd_font_gray'));
        Text.margin({ top: 4 });
        Text.pop();
        Text.create(getStringData($r('app.string.commodity_money')) + this.price);
        Text.textAlign(TextAlign.Start);
        Text.fontColor($r('app.color.pd_money'));
        Text.width('100%');
        Text.fontSize(24);
        Text.margin({ top: 24, bottom: 24 });
        Text.pop();
        Column.pop();
        Column.pop();
        Row.create();
        Row.justifyContent(FlexAlign.Center);
        Row.height('100%');
        Row.width('100%');
        Row.backgroundColor(Color.White);
        Tabs.create({ barPosition: BarPosition.Start });
        Tabs.width('90%');
        // 详情
        TabContent.create();
        // 详情
        TabContent.align(Alignment.Top);
        // 详情
        TabContent.tabBar($r('app.string.pd_tabs_detail'));
        Column.create();
        Column.width('100%');
        Row.create();
        Row.width('100%');
        Row.justifyContent(FlexAlign.Start);
        Row.margin({ top: 12 });
        Text.create($r('app.string.pd_dispenser_description'));
        Text.fontColor($r('app.color.pd_font_gray'));
        Text.fontSize(18);
        Text.pop();
        Text.create(this.description);
        Text.margin({ left: 24 });
        Text.fontSize(18);
        Text.pop();
        Row.pop();
        Row.create();
        Row.width('100%');
        Row.justifyContent(FlexAlign.Start);
        Row.margin({ top: 12 });
        Text.create($r('app.string.pd_package_contents'));
        Text.fontSize(18);
        Text.fontColor($r('app.color.pd_font_gray'));
        Text.pop();
        Text.create(this.description);
        Text.fontSize(18);
        Text.margin({ left: 12 });
        Text.pop();
        Row.pop();
        Row.create();
        Row.width('100%');
        Row.justifyContent(FlexAlign.Start);
        Row.margin({ top: 12 });
        Text.create($r('app.string.pd_price_description'));
        Text.fontSize(18);
        Text.fontColor($r('app.color.pd_font_gray'));
        Text.pop();
        Image.create($r('app.media.icon'));
        Image.width(20);
        Image.height(20);
        Image.margin({ left: 8 });
        Row.pop();
        Column.pop();
        // 详情
        TabContent.pop();
        Tabs.pop();
        Row.pop();
        Column.pop();
    }
}
loadDocument(new ProductDetails("1", undefined, {}));
