interface SelfPickUp_Params {
    groupBuyController?: GroupBuyController;
    selfPickUpList?: Array<SelfPickUpInfo>;
    longitude?: string;
    latitude?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SelfPickUp_" + ++__generate__Id;
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
import { BusinessError } from '@ohos.base';
import GroupBuyController from '../../controller/GroupBuyController';
import Logger from '../../utils/Logger';
import { getStringData } from '../../utils/ResourceDataHandle';
import { SelfPickUpInfo } from '../../data/Server';
const TAG: string = '[SelfPickUp]';
class SelfPickUp extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.groupBuyController = new GroupBuyController();
        this.__selfPickUpList = new ObservedPropertyObject([], this, "selfPickUpList");
        this.__longitude = new ObservedPropertySimple(getStringData($r('app.string.buy_longitude')), this, "longitude");
        this.__latitude = new ObservedPropertySimple(getStringData($r('app.string.buy_latitude')), this, "latitude");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SelfPickUp_Params) {
        if (params.groupBuyController !== undefined) {
            this.groupBuyController = params.groupBuyController;
        }
        if (params.selfPickUpList !== undefined) {
            this.selfPickUpList = params.selfPickUpList;
        }
        if (params.longitude !== undefined) {
            this.longitude = params.longitude;
        }
        if (params.latitude !== undefined) {
            this.latitude = params.latitude;
        }
    }
    aboutToBeDeleted() {
        this.__selfPickUpList.aboutToBeDeleted();
        this.__longitude.aboutToBeDeleted();
        this.__latitude.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private groupBuyController: GroupBuyController;
    private __selfPickUpList: ObservedPropertyObject<Array<SelfPickUpInfo>>; // 站点列表
    get selfPickUpList() {
        return this.__selfPickUpList.get();
    }
    set selfPickUpList(newValue: Array<SelfPickUpInfo>) {
        this.__selfPickUpList.set(newValue);
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
        this.groupBuyController.getGroupBuyList(this.longitude, this.latitude).then((res: SelfPickUpInfo[]) => {
            Logger.info(TAG, `aboutToAppear then res= ${JSON.stringify(res)}`);
            this.selfPickUpList = res;
            Logger.info(TAG, `aboutToAppear forEach this.selfPickUpList= ${JSON.stringify(this.selfPickUpList)}`);
        }).catch((err: BusinessError) => {
            Logger.info(TAG, `aboutToAppear catch err= ${JSON.stringify(err)}`);
        });
    }
    render() {
        Column.create();
        Column.backgroundColor($r('app.color.index_bg'));
        Column.width('100%');
        Column.height('100%');
        Row.create();
        Row.justifyContent(FlexAlign.Center);
        Row.margin({ top: 4 });
        Row.width('90%');
        Row.height('6%');
        Image.create($r('app.media.icon'));
        Image.height(24);
        Image.width(24);
        Image.margin({ top: 20 });
        Image.onClick(() => {
            router.back();
        });
        Image.id('selfPickUpBack');
        Row.create();
        Row.height('100%');
        Row.margin({ left: 12, top: 20 });
        Row.layoutWeight(1);
        Row.backgroundColor(Color.White);
        Row.borderRadius(24);
        Image.create($r('app.media.icon'));
        Image.height(18);
        Image.width(18);
        Image.margin({ left: 12 });
        Text.create($r('app.string.self_ponit'));
        Text.fontSize(16);
        Text.fontColor($r('app.color.business_font'));
        Text.fontWeight(FontWeight.Medium);
        Text.margin({ left: 12 });
        Text.pop();
        Blank.create();
        Blank.pop();
        Row.pop();
        Row.pop();
        Column.create();
        Column.borderRadius(8);
        Column.backgroundColor(Color.White);
        Column.width('90%');
        Column.height('95%');
        Column.margin({ top: 24 });
        Row.create();
        Row.margin({ top: 24 });
        Row.width('95%');
        Text.create($r('app.string.self_near'));
        Text.fontSize(24);
        Text.fontWeight(10);
        Text.pop();
        Blank.create();
        Blank.pop();
        Row.pop();
        Row.create({ space: 20 });
        Row.margin({ top: 12 });
        Row.width('90%');
        Text.create($r('app.string.self_cold'));
        Text.fontColor($r('app.color.pd_font_gray'));
        Text.textAlign(TextAlign.Center);
        Text.padding({ left: 12, right: 12, top: 6, bottom: 6 });
        Text.borderRadius(8);
        Text.backgroundColor($r('app.color.index_bg'));
        Text.pop();
        Text.create($r('app.string.self_door'));
        Text.fontColor($r('app.color.pd_font_gray'));
        Text.textAlign(TextAlign.Center);
        Text.padding({ left: 12, right: 12, top: 6, bottom: 6 });
        Text.borderRadius(8);
        Text.backgroundColor($r('app.color.index_bg'));
        Text.pop();
        Text.create($r('app.string.self_service'));
        Text.fontColor($r('app.color.pd_font_gray'));
        Text.textAlign(TextAlign.Center);
        Text.padding({ left: 12, right: 12, top: 6, bottom: 6 });
        Text.borderRadius(8);
        Text.backgroundColor($r('app.color.index_bg'));
        Text.pop();
        Row.pop();
        Scroll.create();
        Column.create();
        Column.margin({ bottom: 150 });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.selfPickUpList), (selfPickUp: SelfPickUpInfo) => {
            Row.create();
            Row.width('95%');
            Row.height('20%');
            Row.margin({ top: 24 });
            Row.create();
            Row.height('100%');
            Row.alignItems(VerticalAlign.Top);
            Image.create($r('app.media.icon'));
            Image.width(100);
            Image.height(100);
            Row.pop();
            Column.create();
            Column.width('50%');
            Column.height('100%');
            Column.margin({ left: 12, right: 12 });
            Column.justifyContent(FlexAlign.Start);
            Row.create();
            Row.width('100%');
            Text.create(selfPickUp.name);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.fontSize(18);
            Text.fontWeight(5);
            Text.pop();
            Row.pop();
            Row.create();
            Row.width('100%');
            Row.margin({ top: 4 });
            Text.create(selfPickUp.address.split('')
                .join('\u200B'));
            Text.textAlign(TextAlign.Start);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.maxLines(2);
            Text.fontSize(16);
            Text.lineHeight(20);
            Text.fontWeight(5);
            Text.fontColor($r('app.color.pd_font_gray'));
            Text.pop();
            Row.pop();
            Row.create();
            Row.justifyContent(FlexAlign.Start);
            Row.width('100%');
            Row.margin({ top: 8 });
            Text.create($r('app.string.self_cold'));
            Text.fontColor($r('app.color.self_cold_font'));
            Text.fontSize(14);
            Text.fontWeight(5);
            Text.borderWidth(1);
            Text.borderColor($r('app.color.self_cold_bg'));
            Text.pop();
            Row.pop();
            Row.create();
            Row.margin({ left: 6 });
            Row.width('100%');
            Row.margin({ top: 8 });
            Text.create(getStringData($r('app.string.self_walk')) + selfPickUp.distance);
            Text.fontSize(18);
            Text.pop();
            Row.pop();
            Column.pop();
            Row.create();
            Row.height('100%');
            Row.alignItems(VerticalAlign.Bottom);
            Button.createWithLabel($r('app.string.self_choose'));
            Button.fontColor(Color.Black);
            Button.backgroundColor($r('app.color.business_buy_back'));
            Button.pop();
            Row.pop();
            Row.pop();
        }, (selfPickUp: SelfPickUpInfo) => JSON.stringify(selfPickUp));
        ForEach.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
        Column.pop();
    }
}
loadDocument(new SelfPickUp("1", undefined, {}));
