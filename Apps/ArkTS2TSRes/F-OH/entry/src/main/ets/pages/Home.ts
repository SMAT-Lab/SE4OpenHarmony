interface Home_Params {
    swiperController?: SwiperController;
    controller?: SearchController;
    changeValue?: string;
    submitValue?: string;
    totalCount?: number;
    appCount?: number;
    gameCount?: number;
    homePageData?: HomePageData;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Home_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 westinyang https://gitee.com/ohos-dev
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import { AppType } from '../model/AppInfo';
import { DataSource } from '../data/DataSource';
import { HomePageData } from '../model/HomePageData';
import promptAction from '@ohos.promptAction';
const ToastDuration = 2000;
export default class Home extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.swiperController = new SwiperController();
        this.controller = new SearchController();
        this.__changeValue = new ObservedPropertySimple('', this, "changeValue");
        this.__submitValue = new ObservedPropertySimple(''
        // 应用收录
        , this, "submitValue");
        this.__totalCount = new ObservedPropertySimple(0, this, "totalCount");
        this.__appCount = new ObservedPropertySimple(0, this, "appCount");
        this.__gameCount = new ObservedPropertySimple(0, this, "gameCount");
        this.__homePageData = new ObservedPropertyObject(new HomePageData({}), this, "homePageData");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Home_Params) {
        if (params.swiperController !== undefined) {
            this.swiperController = params.swiperController;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.changeValue !== undefined) {
            this.changeValue = params.changeValue;
        }
        if (params.submitValue !== undefined) {
            this.submitValue = params.submitValue;
        }
        if (params.totalCount !== undefined) {
            this.totalCount = params.totalCount;
        }
        if (params.appCount !== undefined) {
            this.appCount = params.appCount;
        }
        if (params.gameCount !== undefined) {
            this.gameCount = params.gameCount;
        }
        if (params.homePageData !== undefined) {
            this.homePageData = params.homePageData;
        }
    }
    aboutToBeDeleted() {
        this.__changeValue.aboutToBeDeleted();
        this.__submitValue.aboutToBeDeleted();
        this.__totalCount.aboutToBeDeleted();
        this.__appCount.aboutToBeDeleted();
        this.__gameCount.aboutToBeDeleted();
        this.__homePageData.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    // 搜索
    private swiperController: SwiperController;
    private controller: SearchController;
    private __changeValue: ObservedPropertySimple<string>;
    get changeValue() {
        return this.__changeValue.get();
    }
    set changeValue(newValue: string) {
        this.__changeValue.set(newValue);
    }
    private __submitValue: ObservedPropertySimple<string>;
    get submitValue() {
        return this.__submitValue.get();
    }
    set submitValue(newValue: string) {
        this.__submitValue.set(newValue);
    }
    // 应用收录
    private __totalCount: ObservedPropertySimple<number>;
    get totalCount() {
        return this.__totalCount.get();
    }
    set totalCount(newValue: number) {
        this.__totalCount.set(newValue);
    }
    private __appCount: ObservedPropertySimple<number>;
    get appCount() {
        return this.__appCount.get();
    }
    set appCount(newValue: number) {
        this.__appCount.set(newValue);
    }
    private __gameCount: ObservedPropertySimple<number>;
    get gameCount() {
        return this.__gameCount.get();
    }
    set gameCount(newValue: number) {
        this.__gameCount.set(newValue);
    }
    private __homePageData: ObservedPropertyObject<HomePageData>;
    get homePageData() {
        return this.__homePageData.get();
    }
    set homePageData(newValue: HomePageData) {
        this.__homePageData.set(newValue);
    }
    aboutToAppear() {
        DataSource.getHomePageData((data) => {
            this.homePageData = data;
        }, (err) => {
            promptAction.showToast({ message: '网路异常', duration: ToastDuration });
        });
        DataSource.getAppList(AppType.APP, (data, totalCount) => {
            this.totalCount = totalCount;
            this.appCount = (data as [
            ]).length;
            this.gameCount = totalCount - this.appCount;
        });
    }
    NavigationTitle(parent = null) {
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Column.width('100%');
        Text.create('F-OH');
        Text.fontColor('#182431');
        Text.fontSize(26);
        Text.fontWeight(500);
        Text.margin({ left: -25 });
        Text.pop();
        Column.pop();
    }
    render() {
        Stack.create({ alignContent: Alignment.TopStart });
        Stack.width('100%');
        Stack.height('100%');
        Stack.backgroundColor('#ffffff');
        Column.create();
        Column.width('100%');
        Column.height('100%');
        // 页面标题
        Navigation.create();
        // 页面标题
        Navigation.title({ builder: () => {
                this.NavigationTitle.call(this);
            } });
        // 页面标题
        Navigation.hideToolBar(true);
        // 页面标题
        Navigation.height(56);
        // 页面标题
        Navigation.width('100%');
        // 页面标题
        Navigation.titleMode(NavigationTitleMode.Mini);
        // 页面标题
        Navigation.hideBackButton(true);
        // 页面标题
        Navigation.padding({ left: 15, right: 15 });
        // 页面标题
        Navigation.pop();
        Scroll.create();
        Scroll.edgeEffect(EdgeEffect.None);
        Scroll.width('100%');
        Scroll.height('auto');
        Scroll.margin({ bottom: 56 });
        Column.create();
        Column.width('100%');
        Column.padding({ left: 15, right: 15 });
        // 搜索
        Search.create({ value: this.changeValue, placeholder: '应用、游戏...', controller: this.controller });
        // 搜索
        Search.searchButton('搜索');
        // 搜索
        Search.width('100%');
        // 搜索
        Search.height(40);
        // 搜索
        Search.backgroundColor('#F5F5F5');
        // 搜索
        Search.placeholderColor(Color.Grey);
        // 搜索
        Search.placeholderFont({ size: 14, weight: 400 });
        // 搜索
        Search.textFont({ size: 14, weight: 400 });
        // 搜索
        Search.onSubmit((value: string) => {
            promptAction.showToast({ message: '应用太少，无需搜索！', duration: ToastDuration });
        });
        // 搜索
        Search.onChange((value: string) => {
        });
        // 搜索
        Search.focusable(false);
        // 搜索
        Search.pop();
        // 滚动图
        Swiper.create(this.swiperController);
        // 滚动图
        Swiper.cachedCount(3);
        // 滚动图
        Swiper.index(0);
        // 滚动图
        Swiper.autoPlay(true);
        // 滚动图
        Swiper.interval(5000);
        // 滚动图
        Swiper.indicator(true);
        // 滚动图
        Swiper.loop(true);
        // 滚动图
        Swiper.duration(1000);
        // 滚动图
        Swiper.itemSpace(20);
        // 滚动图
        Swiper.curve(Curve.Linear);
        // 滚动图
        Swiper.onChange((index: number) => {
            console.info(index.toString());
        });
        // 滚动图
        Swiper.margin({ top: 10 });
        Image.create($r('app.media.main_banner_1'));
        Image.width('100%');
        Image.height(150);
        Image.borderRadius(15);
        Image.create($r('app.media.main_banner_2'));
        Image.width('100%');
        Image.height(150);
        Image.borderRadius(15);
        Image.create($r('app.media.main_banner_3'));
        Image.width('100%');
        Image.height(150);
        Image.borderRadius(15);
        // 滚动图
        Swiper.pop();
        // 收录统计
        Column.create();
        // 收录统计
        Column.margin({ top: 15 });
        Text.create("收录统计");
        Text.fontSize(20);
        Text.width('100%');
        Text.margin({ bottom: 10 });
        Text.pop();
        Flex.create({
            direction: FlexDirection.Row,
            justifyContent: FlexAlign.SpaceBetween,
            alignItems: ItemAlign.Center
        });
        Column.create();
        Column.width('100%');
        Column.margin({ right: 10 });
        Column.padding({ left: 5, right: 5 });
        Column.flexGrow(1);
        Column.backgroundImage($r('app.media.main_card_1'));
        Column.backgroundImageSize(ImageSize.Cover);
        Column.border({ width: 0.7, radius: 15, color: '#ebebeb' });
        Column.create();
        Column.width('100%');
        Column.border({ width: { bottom: 1 }, color: '#fff' });
        Text.create('总计');
        Text.height(30);
        Text.fontSize(16);
        Text.fontColor('#333');
        Text.pop();
        Column.pop();
        Column.create();
        Column.width('100%');
        Text.create(this.totalCount.toString());
        Text.height(30);
        Text.fontSize(16);
        Text.fontColor('#555');
        Text.pop();
        Column.pop();
        Column.pop();
        Column.create();
        Column.width('100%');
        Column.margin({ left: 5, right: 5 });
        Column.padding({ left: 5, right: 5 });
        Column.flexGrow(0);
        Column.backgroundImage($r('app.media.main_card_1'));
        Column.backgroundImageSize(ImageSize.Cover);
        Column.border({ width: 0.7, radius: 15, color: '#ebebeb' });
        Column.create();
        Column.width('100%');
        Column.border({ width: { bottom: 1 }, color: '#fff' });
        Text.create('应用');
        Text.height(30);
        Text.fontSize(16);
        Text.fontColor('#333');
        Text.pop();
        Column.pop();
        Column.create();
        Column.width('100%');
        Text.create(this.appCount.toString());
        Text.height(30);
        Text.fontSize(16);
        Text.fontColor('#555');
        Text.pop();
        Column.pop();
        Column.pop();
        Column.create();
        Column.width('100%');
        Column.margin({ left: 10 });
        Column.padding({ left: 5, right: 5 });
        Column.flexGrow(0);
        Column.backgroundImage($r('app.media.main_card_1'));
        Column.backgroundImageSize(ImageSize.Cover);
        Column.border({ width: 0.7, radius: 15, color: '#ebebeb' });
        Column.create();
        Column.width('100%');
        Column.border({ width: { bottom: 1 }, color: '#fff' });
        Text.create('游戏');
        Text.height(30);
        Text.fontSize(16);
        Text.fontColor('#333');
        Text.pop();
        Column.pop();
        Column.create();
        Column.width('100%');
        Text.create(this.gameCount.toString());
        Text.height(30);
        Text.fontSize(16);
        Text.fontColor('#555');
        Text.pop();
        Column.pop();
        Column.pop();
        Flex.pop();
        // 收录统计
        Column.pop();
        // 最新公告
        Column.create();
        // 最新公告
        Column.margin({ top: 15 });
        // 最新公告
        Column.visibility(this.homePageData.showAnnouncement ? Visibility.Visible : Visibility.None);
        Text.create("最新公告");
        Text.fontSize(20);
        Text.width('100%');
        Text.margin({ bottom: 10 });
        Text.pop();
        Text.create(this.homePageData.announcement || HomePageData.defaultAnnouncement);
        Text.width('100%');
        Text.borderRadius(15);
        Text.backgroundColor('#f6f6f6');
        Text.padding(10);
        Text.fontSize(16);
        Text.fontColor('#555555');
        Text.pop();
        // 最新公告
        Column.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
        Stack.pop();
    }
}
