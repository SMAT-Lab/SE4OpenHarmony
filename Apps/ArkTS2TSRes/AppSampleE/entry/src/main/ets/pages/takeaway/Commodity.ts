interface Commodity_Params {
    isShow?: boolean;
    isPanel?: boolean;
    isShop?: boolean;
    isLogin?: boolean;
    money?: number;
    count?: number;
    commodityList?: Array<CommodityInfo>;
    commentList?: Array<CommentInfo>;
    buyCarList?: Array<Car>;
    businessId?: string;
    businessName?: string;
    businessScore?: string;
    businessSale?: string;
    businessTime?: string;
    businessRank?: string;
    commodityController?: CommodityController;
    businessController?: BusinessController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Commodity_" + ++__generate__Id;
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
import call from '@ohos.telephony.call';
import BusinessController from '../../controller/BusinessController';
import CommodityController from '../../controller/CommodityController';
import Logger from '../../utils/Logger';
import Car from '../../data/Car';
import { getStringData } from '../../utils/ResourceDataHandle';
import { CommentInfo, CommodityInfo } from '../../data/Server';
import { BusinessError } from '@ohos.base';
const TAG: string = '[Commodity]';
const CAR_NUM = 1; // 初始化数量
const RESET = 0; // 重置
function __Row__rowStyleShop(): void {
    Row.width('95%');
    Row.height(170);
    Row.borderRadius(8);
    Row.margin({ top: 12 });
    Row.padding(12);
}
class Commodity extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__isShow = new ObservedPropertySimple(false, this, "isShow");
        this.__isPanel = new ObservedPropertySimple(false, this, "isPanel");
        this.__isShop = new ObservedPropertySimple(true, this, "isShop");
        this.__isLogin = new ObservedPropertySimple(false, this, "isLogin");
        this.__money = new ObservedPropertySimple(0, this, "money");
        this.__count = new ObservedPropertySimple(0, this, "count");
        this.__commodityList = new ObservedPropertyObject([], this, "commodityList");
        this.__commentList = new ObservedPropertyObject([], this, "commentList");
        this.__buyCarList = new ObservedPropertyObject([], this, "buyCarList");
        this.__businessId = new ObservedPropertySimple((router.getParams() as Record<string, Object>).businessId as string, this, "businessId");
        this.__businessName = new ObservedPropertySimple((router.getParams() as Record<string, Object>).businessName as string, this, "businessName");
        this.__businessScore = new ObservedPropertySimple((router.getParams() as Record<string, Object>).businessScore as string, this, "businessScore");
        this.__businessSale = new ObservedPropertySimple((router.getParams() as Record<string, Object>).businessSale as string, this, "businessSale");
        this.__businessTime = new ObservedPropertySimple((router.getParams() as Record<string, Object>).businessTime as string, this, "businessTime");
        this.__businessRank = new ObservedPropertySimple((router.getParams() as Record<string, Object>).businessRank as string, this, "businessRank");
        this.commodityController = new CommodityController();
        this.businessController = new BusinessController();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Commodity_Params) {
        if (params.isShow !== undefined) {
            this.isShow = params.isShow;
        }
        if (params.isPanel !== undefined) {
            this.isPanel = params.isPanel;
        }
        if (params.isShop !== undefined) {
            this.isShop = params.isShop;
        }
        if (params.isLogin !== undefined) {
            this.isLogin = params.isLogin;
        }
        if (params.money !== undefined) {
            this.money = params.money;
        }
        if (params.count !== undefined) {
            this.count = params.count;
        }
        if (params.commodityList !== undefined) {
            this.commodityList = params.commodityList;
        }
        if (params.commentList !== undefined) {
            this.commentList = params.commentList;
        }
        if (params.buyCarList !== undefined) {
            this.buyCarList = params.buyCarList;
        }
        if (params.businessId !== undefined) {
            this.businessId = params.businessId;
        }
        if (params.businessName !== undefined) {
            this.businessName = params.businessName;
        }
        if (params.businessScore !== undefined) {
            this.businessScore = params.businessScore;
        }
        if (params.businessSale !== undefined) {
            this.businessSale = params.businessSale;
        }
        if (params.businessTime !== undefined) {
            this.businessTime = params.businessTime;
        }
        if (params.businessRank !== undefined) {
            this.businessRank = params.businessRank;
        }
        if (params.commodityController !== undefined) {
            this.commodityController = params.commodityController;
        }
        if (params.businessController !== undefined) {
            this.businessController = params.businessController;
        }
    }
    aboutToBeDeleted() {
        this.__isShow.aboutToBeDeleted();
        this.__isPanel.aboutToBeDeleted();
        this.__isShop.aboutToBeDeleted();
        this.__isLogin.aboutToBeDeleted();
        this.__money.aboutToBeDeleted();
        this.__count.aboutToBeDeleted();
        this.__commodityList.aboutToBeDeleted();
        this.__commentList.aboutToBeDeleted();
        this.__buyCarList.aboutToBeDeleted();
        this.__businessId.aboutToBeDeleted();
        this.__businessName.aboutToBeDeleted();
        this.__businessScore.aboutToBeDeleted();
        this.__businessSale.aboutToBeDeleted();
        this.__businessTime.aboutToBeDeleted();
        this.__businessRank.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __isShow: ObservedPropertySimple<boolean>;
    get isShow() {
        return this.__isShow.get();
    }
    set isShow(newValue: boolean) {
        this.__isShow.set(newValue);
    }
    private __isPanel: ObservedPropertySimple<boolean>;
    get isPanel() {
        return this.__isPanel.get();
    }
    set isPanel(newValue: boolean) {
        this.__isPanel.set(newValue);
    }
    private __isShop: ObservedPropertySimple<boolean>;
    get isShop() {
        return this.__isShop.get();
    }
    set isShop(newValue: boolean) {
        this.__isShop.set(newValue);
    }
    private __isLogin: ObservedPropertySimple<boolean>;
    get isLogin() {
        return this.__isLogin.get();
    }
    set isLogin(newValue: boolean) {
        this.__isLogin.set(newValue);
    }
    private __money: ObservedPropertySimple<number>;
    get money() {
        return this.__money.get();
    }
    set money(newValue: number) {
        this.__money.set(newValue);
    }
    private __count: ObservedPropertySimple<number>;
    get count() {
        return this.__count.get();
    }
    set count(newValue: number) {
        this.__count.set(newValue);
    }
    private __commodityList: ObservedPropertyObject<Array<CommodityInfo>>; // 商品列表
    get commodityList() {
        return this.__commodityList.get();
    }
    set commodityList(newValue: Array<CommodityInfo>) {
        this.__commodityList.set(newValue);
    }
    private __commentList: ObservedPropertyObject<Array<CommentInfo>>; // 评论列表
    get commentList() {
        return this.__commentList.get();
    }
    set commentList(newValue: Array<CommentInfo>) {
        this.__commentList.set(newValue);
    }
    private __buyCarList: ObservedPropertyObject<Array<Car>>; // 购物车列表
    get buyCarList() {
        return this.__buyCarList.get();
    }
    set buyCarList(newValue: Array<Car>) {
        this.__buyCarList.set(newValue);
    }
    private __businessId: ObservedPropertySimple<string>;
    get businessId() {
        return this.__businessId.get();
    }
    set businessId(newValue: string) {
        this.__businessId.set(newValue);
    }
    private __businessName: ObservedPropertySimple<string>;
    get businessName() {
        return this.__businessName.get();
    }
    set businessName(newValue: string) {
        this.__businessName.set(newValue);
    }
    private __businessScore: ObservedPropertySimple<string>;
    get businessScore() {
        return this.__businessScore.get();
    }
    set businessScore(newValue: string) {
        this.__businessScore.set(newValue);
    }
    private __businessSale: ObservedPropertySimple<string>;
    get businessSale() {
        return this.__businessSale.get();
    }
    set businessSale(newValue: string) {
        this.__businessSale.set(newValue);
    }
    private __businessTime: ObservedPropertySimple<string>;
    get businessTime() {
        return this.__businessTime.get();
    }
    set businessTime(newValue: string) {
        this.__businessTime.set(newValue);
    }
    private __businessRank: ObservedPropertySimple<string>;
    get businessRank() {
        return this.__businessRank.get();
    }
    set businessRank(newValue: string) {
        this.__businessRank.set(newValue);
    }
    private commodityController: CommodityController;
    private businessController: BusinessController;
    callUp(phoneNumber: string): void {
        let isSupport = call.hasVoiceCapability();
        Logger.info(TAG, `callUp isSupport = ${isSupport}`);
        call.makeCall(phoneNumber, err => {
            if (!err) {
                Logger.info(TAG, 'callUp make call success');
            }
            else {
                Logger.info(TAG, `callUp make call fail, err is: = ${JSON.stringify(err)}`);
            }
        });
    }
    addCar(name: string, price: number): void {
        let cars: Car = new Car();
        cars.name = name;
        cars.price = Number(price);
        cars.num = CAR_NUM;
        this.buyCarList.push(cars);
    }
    aboutToAppear() {
        Logger.info(TAG, 'Commodity aboutToAppear');
        // 商品列表
        this.commodityController.getCommodityList(this.businessId).then((res: CommodityInfo[]) => {
            this.commodityList = res;
            Logger.info(TAG, `commodityList then res= ${JSON.stringify(this.commodityList)}`);
        }).catch((err: BusinessError) => {
            Logger.info(TAG, `commodityList catch err= ${JSON.stringify(err)}`);
        });
        // 商家评论列表
        this.businessController.getCommentList(this.businessId).then((res: CommentInfo[]) => {
            this.commentList = res;
            Logger.info(TAG, `commentList then res= ${JSON.stringify(this.commentList)}`);
        }).catch((err: BusinessError) => {
            Logger.info(TAG, `commentList catch err= ${JSON.stringify(err)}`);
        });
    }
    render() {
        Stack.create();
        Stack.onClick(() => {
            this.isShow = false;
        });
        Stack.width('100%');
        Stack.height('100%');
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Row.create();
        Row.width('90%');
        Row.height('8%');
        Image.create($r('app.media.icon'));
        Image.width(24);
        Image.height(24);
        Image.onClick(() => {
            router.back();
        });
        Blank.create();
        Blank.pop();
        Image.create($r('app.media.icon'));
        Image.width(24);
        Image.height(24);
        Image.onClick(() => {
            this.isShow = !this.isShow;
        });
        Row.pop();
        Row.create();
        Row.height('17%');
        Row.margin({ top: 12 });
        Column.create();
        Column.justifyContent(FlexAlign.Start);
        Column.height('90%');
        Column.width('90%');
        Column.margin({ left: 12, right: 12 });
        Row.create();
        Row.width('100%');
        Text.create(this.businessName);
        Text.fontSize(24);
        Text.fontWeight(5);
        Text.pop();
        Row.pop();
        Row.create();
        Row.width('100%');
        Row.margin({ top: 4 });
        Text.create(this.businessScore + getStringData($r('app.string.business_score')));
        Text.fontColor($r('app.color.business_score'));
        Text.fontSize(20);
        Text.fontWeight(5);
        Text.pop();
        Row.create();
        Row.margin({ left: 6 });
        Row.borderWidth(2);
        Row.border({ color: $r('app.color.comm_border') });
        Text.create($r('app.string.business_delivery'));
        Text.fontColor($r('app.color.business_delivery'));
        Text.fontSize(12);
        Text.fontWeight(5);
        Text.margin({ left: 6, right: 6 });
        Text.pop();
        Row.pop();
        Text.create(getStringData($r('app.string.business_distribution')) + this.businessTime + getStringData($r('app.string.business_min')));
        Text.fontSize(12);
        Text.fontWeight(5);
        Text.margin({ left: 12 });
        Text.pop();
        Text.create(getStringData($r('app.string.commodity_month')) + this.businessSale);
        Text.fontSize(12);
        Text.fontWeight(5);
        Text.margin({ left: 6 });
        Text.pop();
        Row.pop();
        Row.create();
        Row.width('100%');
        Row.margin({ top: 12 });
        Row.create();
        Row.backgroundColor($r('app.color.index_bg'));
        Text.create(this.businessRank);
        Text.fontSize(12);
        Text.fontWeight(5);
        Text.pop();
        Row.pop();
        Blank.create();
        Blank.pop();
        Row.pop();
        Row.create();
        Row.width('100%');
        Row.margin({ top: 12 });
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
        Row.create();
        Row.width('100%');
        Row.height('70%');
        Tabs.create({ barPosition: BarPosition.Start });
        Tabs.onChange((index: number) => {
            if (index === 0) {
                this.isShop = true;
            }
            else {
                this.isShop = false;
            }
        });
        // 点菜
        TabContent.create();
        // 点菜
        TabContent.tabBar($r('app.string.commodity_tabs_order'));
        // 点菜
        TabContent.id('order');
        Scroll.create();
        Scroll.width('90%');
        Scroll.height('95%');
        Column.create();
        Column.margin({ bottom: 55 });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.commodityList), (commodity: CommodityInfo, index) => {
            Row.create();
            __Row__rowStyleShop();
            Row.id('commentList' + index);
            Row.onClick(() => {
                router.push({
                    url: 'pages/takeaway/ProductDetails',
                    params: {
                        commodityId: commodity.id
                    }
                });
            });
            Image.create($r('app.media.icon'));
            Image.width(150);
            Image.height(150);
            Column.create();
            Column.justifyContent(FlexAlign.Start);
            Column.height('100%');
            Column.width('58%');
            Column.margin({ left: 12 });
            Row.create();
            Row.width('100%');
            Text.create(commodity.name);
            Text.fontSize(20);
            Text.fontWeight(5);
            Text.pop();
            Row.pop();
            Row.create();
            Row.width('100%');
            Row.margin({ top: 4 });
            Button.createWithLabel(commodity.standards + getStringData($r('app.string.commodity_right')));
            Button.fontColor($r('app.color.pd_standard'));
            Button.backgroundColor($r('app.color.pd_standard_bg'));
            Button.margin({ top: 6, bottom: 6 });
            Button.pop();
            Blank.create();
            Blank.pop();
            Row.pop();
            Row.create();
            Row.width('100%');
            Row.margin({ top: 4 });
            Text.create(getStringData($r('app.string.commodity_month')) + commodity.salesNumber);
            Text.fontColor($r('app.color.pd_font_gray'));
            Text.pop();
            Text.create(getStringData($r('app.string.commodity_good')));
            Text.fontColor($r('app.color.pd_font_gray'));
            Text.margin({ left: 12 });
            Text.pop();
            Blank.create();
            Blank.pop();
            Row.pop();
            Row.create();
            Row.width('90%');
            Row.width('100%');
            Row.margin({ top: 4 });
            Text.create(getStringData($r('app.string.commodity_money')) + commodity.price);
            Text.fontSize(20);
            Text.pop();
            Blank.create();
            Blank.pop();
            Text.create($r('app.string.commodity_plus'));
            Text.textAlign(TextAlign.Center);
            Text.width(28);
            Text.height(28);
            Text.fontColor(Color.Black);
            Text.fontSize(20);
            Text.fontWeight(15);
            Text.borderRadius(24);
            Text.backgroundColor($r('app.color.comm_plus'));
            Text.onClick(() => {
                this.money = this.money + Number(commodity.price);
                this.count++;
                if (this.buyCarList.length <= this.commentList.length && this.count === 1) {
                    this.addCar(commodity.name, Number(commodity.price));
                }
                else {
                    for (let index = 0; index < this.buyCarList.length; index++) {
                        const element = this.buyCarList[index]['name'];
                        if (element === commodity.name) {
                            // 更新数据
                            Logger.info(TAG, 'cars this.commentList.length==' + JSON.stringify(this.buyCarList[index]['num']));
                            let carsL: Car = new Car();
                            carsL.num = this.buyCarList[index]['num'] + 1;
                            Logger.info(TAG, 'cars carsL.num==' + JSON.stringify(carsL.num));
                            carsL.name = commodity.name;
                            carsL.price = Number(commodity.price);
                            this.buyCarList[index] = carsL;
                            break;
                        }
                        else {
                            if (index == this.buyCarList.length - 1) {
                                this.addCar(commodity.name, Number(commodity.price));
                                break;
                            }
                            else {
                                continue;
                            }
                        }
                    }
                }
                Logger.info(TAG, 'this.buyCarList==' + JSON.stringify(ObservedObject.GetRawObject(this.buyCarList)));
            });
            Text.id('commodity' + index);
            Text.pop();
            Row.pop();
            Column.pop();
            Row.pop();
        }, (commodity: CommodityInfo) => JSON.stringify(commodity));
        ForEach.pop();
        Column.pop();
        Scroll.pop();
        // 点菜
        TabContent.pop();
        // 评价
        TabContent.create();
        // 评价
        TabContent.tabBar($r('app.string.pd_tabs_appraise'));
        // 评价
        TabContent.id('appraise');
        Column.create();
        Row.create();
        Text.create($r('app.string.commodity_all_in'));
        Text.padding({ left: 12, right: 12, top: 6, bottom: 6 });
        Text.backgroundColor($r('app.color.pd_standard'));
        Text.height(38);
        Text.borderRadius(8);
        Text.pop();
        Text.create($r('app.string.commodity_best_new'));
        Text.padding({ left: 12, right: 12, top: 6, bottom: 6 });
        Text.backgroundColor($r('app.color.comm_good'));
        Text.height(38);
        Text.borderRadius(8);
        Text.margin({ left: 12 });
        Text.pop();
        Text.create($r('app.string.commodity_good_reviews'));
        Text.padding({ left: 12, right: 12, top: 6, bottom: 6 });
        Text.backgroundColor($r('app.color.comm_good'));
        Text.height(38);
        Text.borderRadius(8);
        Text.margin({ left: 12 });
        Text.pop();
        Text.create($r('app.string.commodity_bad_reviews'));
        Text.fontSize(16);
        Text.padding({ left: 12, right: 12, top: 6, bottom: 6 });
        Text.backgroundColor($r('app.color.comm_bad'));
        Text.height(38);
        Text.borderRadius(8);
        Text.margin({ left: 12 });
        Text.pop();
        Text.create($r('app.string.commodity_video'));
        Text.padding({ left: 12, right: 12, top: 6, bottom: 6 });
        Text.backgroundColor($r('app.color.comm_video'));
        Text.height(38);
        Text.borderRadius(8);
        Text.margin({ left: 12 });
        Text.pop();
        Row.pop();
        Scroll.create();
        Scroll.width('90%');
        Scroll.height('95%');
        Column.create();
        Column.margin({ bottom: 55 });
        ForEach.create("3", this, ObservedObject.GetRawObject(this.commentList), (comment: CommentInfo) => {
            Column.create();
            Column.width('100%');
            Row.create();
            Row.margin({ top: 24 });
            Row.width('90%');
            Image.create($r('app.media.icon'));
            Image.width(70);
            Image.height(70);
            Column.create();
            Column.width('100%');
            Column.margin({ left: 12 });
            Row.create();
            Row.justifyContent(FlexAlign.Start);
            Row.width('100%');
            Text.create(comment.userName);
            Text.fontSize(18);
            Text.pop();
            Text.create($r('app.string.commodity_vip'));
            Text.margin({ left: 12 });
            Text.padding(4);
            Text.borderRadius(8);
            Text.textAlign(TextAlign.Center);
            Text.fontColor($r('app.color.comm_vip'));
            Text.backgroundColor($r('app.color.comm_vip_bg'));
            Text.pop();
            Row.pop();
            Text.create(comment.createTime);
            Text.width('100%');
            Text.textAlign(TextAlign.Start);
            Text.fontColor($r('app.color.pd_font_gray'));
            Text.margin({ top: 6 });
            Text.pop();
            Column.pop();
            Blank.create();
            Blank.pop();
            Row.pop();
            Column.create();
            Column.margin({ top: 24 });
            Column.width('90%');
            Text.create(comment.content);
            Text.width('100%');
            Text.textAlign(TextAlign.Start);
            Text.maxLines(3);
            Text.pop();
            Row.create();
            Row.justifyContent(FlexAlign.Start);
            Row.width('100%');
            Image.create($r('app.media.icon'));
            Image.margin({ top: 12 });
            Image.width(200);
            Image.height(200);
            Row.pop();
            Column.pop();
            Column.pop();
        });
        ForEach.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
        // 评价
        TabContent.pop();
        Tabs.pop();
        Row.pop();
        Column.pop();
        // 去结
        Column.create();
        // 去结
        Column.justifyContent(FlexAlign.Center);
        // 去结
        Column.position({ y: '88%' });
        // 去结
        Column.width('100%');
        // 去结
        Column.zIndex(3);
        Column.create();
        Column.borderRadius(8);
        Column.width('90%');
        Column.backgroundColor($r('app.color.comm_to_pay'));
        If.create();
        if (this.isShop) {
            If.branchId(0);
            Row.create();
            Row.padding({ top: 6, bottom: 6 });
            Row.height('4%');
            Text.create($r('app.string.commodity_des'));
            Text.pop();
            Row.pop();
            Row.create();
            Row.borderRadius(24);
            Row.backgroundColor($r('app.color.comm_car'));
            Row.width('100%');
            Row.height('8%');
            Row.create();
            Row.width('75%');
            Row.borderRadius({ topLeft: 24, bottomLeft: 24 });
            Row.padding({ left: 24 });
            Row.onClick(() => {
                this.isPanel = !this.isPanel;
                Logger.info(TAG, 'isPanel make call success ' + this.isPanel);
            });
            Row.id('panel');
            Image.create($r('app.media.icon'));
            Image.width(38);
            Image.height(38);
            Text.create(getStringData($r('app.string.commodity_money')) + this.money);
            Text.fontSize(24);
            Text.fontColor(Color.White);
            Text.fontWeight(5);
            Text.margin({ left: 12 });
            Text.pop();
            Divider.create();
            Divider.height(24);
            Divider.vertical(true);
            Divider.color($r('app.color.comm_fee'));
            Divider.margin({ left: 6 });
            Text.create($r('app.string.commodity_fee'));
            Text.fontColor($r('app.color.comm_fee'));
            Text.margin({ left: 6 });
            Text.pop();
            Row.pop();
            Row.create();
            Row.padding({ left: 24 });
            Row.height('100%');
            Row.width('25%');
            Row.backgroundColor(this.money == 0 ? $r('app.color.comm_car') : $r('app.color.comm_plus'));
            Row.borderRadius({ topRight: 24, bottomRight: 24 });
            If.create();
            if (this.money !== 0) {
                If.branchId(0);
                Text.create($r('app.string.commodity_to_pay'));
                Text.fontSize(20);
                Text.fontColor($r('app.color.comm_fee'));
                Text.onClick(() => {
                    this.callUp(getStringData($r('app.string.commodity_tell')));
                });
                Text.id('pay');
                Text.pop();
            }
            else {
                If.branchId(1);
                Text.create($r('app.string.commodity_to_give'));
                Text.fontColor($r('app.color.comm_fee'));
                Text.pop();
            }
            If.pop();
            Row.pop();
            Row.pop();
        }
        If.pop();
        Column.pop();
        // 去结
        Column.pop();
        // 购物车
        Panel.create(this.isPanel);
        // 购物车
        Panel.type(PanelType.Foldable);
        // 购物车
        Panel.dragBar(false);
        // 购物车
        Panel.halfHeight(500);
        // 购物车
        Panel.width('100%');
        // 购物车
        Panel.mode(PanelMode.Half);
        // 购物车
        Panel.zIndex(2);
        Column.create();
        Text.create($r('app.string.commodity_reduce_money'));
        Text.fontSize(18);
        Text.margin({ top: 12, bottom: 12 });
        Text.width('100%');
        Text.backgroundColor($r('app.color.pd_standard_bg'));
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Row.create();
        Row.width('90%');
        Row.margin({ left: 12 });
        Row.padding({ right: 24, left: 24, top: 12, bottom: 12 });
        Row.onClick(() => {
            this.buyCarList = [];
            this.isPanel = false;
            this.money = RESET; // 重置金额
            this.count = RESET;
        });
        Blank.create();
        Blank.pop();
        Image.create($r('app.media.icon'));
        Image.width(18);
        Image.height(18);
        Text.create($r('app.string.commodity_clear_car'));
        Text.fontColor($r('app.color.pd_font_gray'));
        Text.margin({ left: 12 });
        Text.pop();
        Row.pop();
        Divider.create();
        Divider.width('90%');
        Scroll.create();
        Scroll.height('100%');
        Scroll.width('90%');
        Column.create();
        Column.margin({ bottom: 200 });
        ForEach.create("4", this, ObservedObject.GetRawObject(this.buyCarList), (buyCar: Car, index) => {
            Row.create();
            Row.width('100%');
            Row.padding({ top: 12, bottom: 12 });
            Image.create($r('app.media.icon'));
            Image.width(100);
            Image.height(100);
            Column.create();
            Column.width('70%');
            Column.margin({ left: 12 });
            Row.create();
            Row.width('100%');
            Text.create(buyCar.name);
            Text.fontWeight(10);
            Text.fontSize(24);
            Text.pop();
            Row.pop();
            Row.create();
            Row.width('100%');
            Text.create($r('app.string.commodity_one'));
            Text.fontColor($r('app.color.pd_font_gray'));
            Text.pop();
            Row.pop();
            Row.create();
            Row.margin({ top: 12 });
            Row.width('100%');
            Text.create(getStringData($r('app.string.commodity_money')) + buyCar.price);
            Text.fontWeight(10);
            Text.fontColor($r('app.color.pd_money'));
            Text.fontSize(24);
            Text.pop();
            Blank.create();
            Blank.pop();
            Text.create($r('app.string.commodity_reduce'));
            Text.fontSize(18);
            Text.borderRadius(24);
            Text.borderWidth(2);
            Text.border({ color: $r('app.color.comm_plus') });
            Text.width(28);
            Text.height(28);
            Text.backgroundColor(Color.White);
            Text.textAlign(TextAlign.Center);
            Text.onClick(() => {
                this.money = this.money - Number(buyCar.price);
                let carsL: Car = new Car();
                carsL.num = this.buyCarList[index]['num'] - 1;
                carsL.name = buyCar.name;
                carsL.price = Number(buyCar.price);
                this.buyCarList[index] = carsL;
                if (buyCar.num === 1) {
                    this.buyCarList.splice(index, 1);
                }
                if (this.buyCarList.length === 0) {
                    this.isPanel = false;
                    this.count = RESET;
                }
            });
            Text.pop();
            Text.create(String(buyCar.num));
            Text.margin({ left: 12 });
            Text.pop();
            Text.create($r('app.string.commodity_plus'));
            Text.borderRadius(24);
            Text.fontSize(18);
            Text.width(28);
            Text.height(28);
            Text.backgroundColor($r('app.color.comm_plus'));
            Text.textAlign(TextAlign.Center);
            Text.margin({ left: 12 });
            Text.onClick(() => {
                this.money = this.money + Number(buyCar.price);
                let carsL: Car = new Car();
                carsL.num = this.buyCarList[index]['num'] + 1;
                carsL.name = buyCar.name;
                carsL.price = Number(buyCar.price);
                this.buyCarList[index] = carsL;
            });
            Text.pop();
            Row.pop();
            Column.pop();
            Row.pop();
        });
        ForEach.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
        // 购物车
        Panel.pop();
        If.create();
        if (this.isShow) {
            If.branchId(0);
            Stack.create();
            Stack.position({ x: '65%', y: '6%' });
            Column.create();
            Column.borderRadius(8);
            Column.opacity(1);
            Column.backgroundColor($r('app.color.comm_bg'));
            Column.height('20%');
            Column.width('32%');
            Row.create();
            Row.width('100%');
            Row.height('33%');
            Row.padding(12);
            Image.create($r('app.media.icon'));
            Image.width(24);
            Image.height(24);
            Text.create($r('app.string.commodity_car'));
            Text.margin({ left: 12 });
            Text.pop();
            Row.pop();
            Row.create();
            Row.onClick(() => {
                Logger.info(TAG, 'onClick onClick ');
                this.callUp(getStringData($r('app.string.commodity_tell')));
            });
            Row.width('100%');
            Row.height('33%');
            Row.padding(12);
            Image.create($r('app.media.icon'));
            Image.width(24);
            Image.height(24);
            Text.create($r('app.string.commodity_share'));
            Text.margin({ left: 12 });
            Text.pop();
            Row.pop();
            Row.create();
            Row.onClick(() => {
                Logger.info(TAG, 'onClick onClick ');
                this.callUp(getStringData($r('app.string.commodity_tell')));
            });
            Row.width('100%');
            Row.height('33%');
            Row.padding(12);
            Image.create($r('app.media.icon'));
            Image.width(24);
            Image.height(24);
            Text.create($r('app.string.commodity_call'));
            Text.margin({ left: 12 });
            Text.pop();
            Row.pop();
            Column.pop();
            Stack.pop();
        }
        If.pop();
        Stack.pop();
    }
}
loadDocument(new Commodity("1", undefined, {}));
