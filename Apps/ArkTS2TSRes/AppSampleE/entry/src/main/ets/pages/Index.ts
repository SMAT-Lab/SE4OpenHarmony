interface Index_Params {
    latitude?: string;
    longitude?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
import geoLocationManager from '@ohos.geoLocationManager';
import { BusinessError } from '@ohos.base';
import grantPermission from '../utils/PermissionUtils';
import Logger from '../utils/Logger';
const TAG: string = '[Index]';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.latitude = '';
        this.longitude = '';
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.latitude !== undefined) {
            this.latitude = params.latitude;
        }
        if (params.longitude !== undefined) {
            this.longitude = params.longitude;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private latitude: string;
    private longitude: string;
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
        }
        catch (err) {
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
        });
    }
    render() {
        Column.create();
        Column.backgroundColor($r('app.color.index_bg'));
        Column.width('100%');
        Column.height('100%');
        Row.create();
        Row.padding({ left: 18, right: 18 });
        Row.width('100%');
        Row.create();
        Row.margin({ top: 10, bottom: 10 });
        Row.layoutWeight(1);
        Row.height('7%');
        Row.backgroundColor(Color.White);
        Row.borderRadius(24);
        Text.create($r('app.string.index_coffee'));
        Text.fontSize(16);
        Text.fontColor($r('app.color.index_font'));
        Text.fontWeight(FontWeight.Medium);
        Text.margin({ left: 15 });
        Text.pop();
        Blank.create();
        Blank.pop();
        Button.createWithLabel($r('app.string.index_search'));
        Button.fontColor($r('app.color.index_font'));
        Button.fontSize(18);
        Button.width(80);
        Button.height('90%');
        Button.backgroundColor($r('app.color.index_search_btn_bg'));
        Button.margin({ right: 4 });
        Button.pop();
        Row.pop();
        Image.create($r('app.media.icon'));
        Image.objectFit(ImageFit.Contain);
        Image.width(35);
        Image.height(35);
        Image.margin({ left: 20 });
        Image.id('sweep');
        Row.pop();
        Row.create();
        Row.height('15%');
        Row.width('100%');
        Row.padding(8);
        Row.margin({ left: 12, right: 12 });
        Row.backgroundColor(Color.White);
        Row.borderRadius(8);
        Column.create();
        Text.create($r('app.string.index_text'));
        Text.width('100%');
        Text.margin({ left: 5 });
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Row.create();
        Row.margin({ top: 12 });
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceAround);
        Image.create($r('app.media.icon'));
        Image.height(38);
        Image.width(38);
        Image.id('business');
        Image.onClick(() => {
            router.push({ url: 'pages/takeaway/Business' });
        });
        Image.create($r('app.media.icon'));
        Image.height(38);
        Image.width(38);
        Image.id('buy');
        Image.onClick(() => {
            router.push({ url: 'pages/buy/Buy' });
        });
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
        Row.margin({ top: 8 });
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceAround);
        Text.create($r('app.string.index_takeaway'));
        Text.onClick(() => {
            router.push({ url: 'pages/takeaway/Business' });
        });
        Text.pop();
        Text.create($r('app.string.index_buy'));
        Text.onClick(() => {
            router.push({ url: 'pages/buy/Buy' });
        });
        Text.pop();
        Text.create($r('app.string.index_convenient'));
        Text.pop();
        Text.create($r('app.string.index_general_merchandise'));
        Text.pop();
        Text.create($r('app.string.index_medicine'));
        Text.pop();
        Row.pop();
        Column.pop();
        Row.pop();
        Scroll.create();
        Scroll.width('100%');
        Scroll.height('65%');
        Scroll.padding(8);
        Scroll.margin({ left: 12, right: 12, top: 12, bottom: 120 });
        Scroll.backgroundColor(Color.White);
        Scroll.borderRadius(8);
        Column.create();
        Row.create({ space: 60 });
        Row.width('90%');
        Row.justifyContent(FlexAlign.Center);
        Image.create($r('app.media.icon'));
        Image.height(160);
        Image.width(160);
        Image.create($r('app.media.icon'));
        Image.height(160);
        Image.width(160);
        Row.pop();
        Row.create({ space: 60 });
        Row.width('90%');
        Row.justifyContent(FlexAlign.Center);
        Row.margin({ top: 12 });
        Image.create($r('app.media.icon'));
        Image.height(160);
        Image.width(160);
        Image.create($r('app.media.icon'));
        Image.height(160);
        Image.width(160);
        Row.pop();
        Row.create({ space: 60 });
        Row.width('90%');
        Row.justifyContent(FlexAlign.Center);
        Row.margin({ top: 12 });
        Image.create($r('app.media.icon'));
        Image.height(160);
        Image.width(160);
        Image.create($r('app.media.icon'));
        Image.height(160);
        Image.width(160);
        Row.pop();
        Row.create({ space: 60 });
        Row.width('90%');
        Row.justifyContent(FlexAlign.Center);
        Row.margin({ top: 12 });
        Image.create($r('app.media.icon'));
        Image.height(160);
        Image.width(160);
        Image.create($r('app.media.icon'));
        Image.height(160);
        Image.width(160);
        Row.pop();
        Row.create({ space: 60 });
        Row.width('90%');
        Row.justifyContent(FlexAlign.Center);
        Row.margin({ top: 12 });
        Image.create($r('app.media.icon'));
        Image.height(160);
        Image.width(160);
        Image.create($r('app.media.icon'));
        Image.height(160);
        Image.width(160);
        Row.pop();
        Row.create({ space: 60 });
        Row.width('90%');
        Row.justifyContent(FlexAlign.Center);
        Row.margin({ top: 12 });
        Image.create($r('app.media.icon'));
        Image.height(160);
        Image.width(160);
        Image.create($r('app.media.icon'));
        Image.height(160);
        Image.width(160);
        Row.pop();
        Row.create({ space: 60 });
        Row.width('90%');
        Row.justifyContent(FlexAlign.Center);
        Row.margin({ top: 12 });
        Image.create($r('app.media.icon'));
        Image.height(160);
        Image.width(160);
        Image.create($r('app.media.icon'));
        Image.height(160);
        Image.width(160);
        Row.pop();
        Column.pop();
        Scroll.pop();
        Column.create();
        Column.position({ y: '90%' });
        Column.backgroundColor(Color.White);
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
        Image.create($r('app.media.icon'));
        Image.height(38);
        Image.width(38);
        Row.pop();
        Row.create();
        Row.margin({ top: 8, bottom: 8 });
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceAround);
        Text.create($r('app.string.index_recommend'));
        Text.pop();
        Text.create($r('app.string.index_optimization'));
        Text.pop();
        Text.create($r('app.string.index_video'));
        Text.pop();
        Text.create($r('app.string.index_message'));
        Text.pop();
        Text.create($r('app.string.index_me'));
        Text.pop();
        Row.pop();
        Column.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
