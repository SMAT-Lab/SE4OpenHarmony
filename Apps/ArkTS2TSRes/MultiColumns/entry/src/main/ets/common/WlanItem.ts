interface WlanItem_Params {
    netWorkStatus?: Resource;
    currentBreakPoint?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "WlanItem_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { SubItem } from './SettingItem';
export class WlanItem extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__netWorkStatus = new ObservedPropertyObject($r('app.string.closed'), this, "netWorkStatus");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: WlanItem_Params) {
        if (params.netWorkStatus !== undefined) {
            this.netWorkStatus = params.netWorkStatus;
        }
    }
    aboutToBeDeleted() {
        this.__netWorkStatus.aboutToBeDeleted();
        this.__currentBreakPoint.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __netWorkStatus: ObservedPropertyObject<Resource>;
    get netWorkStatus() {
        return this.__netWorkStatus.get();
    }
    set netWorkStatus(newValue: Resource) {
        this.__netWorkStatus.set(newValue);
    }
    private __currentBreakPoint: ObservedPropertyAbstract<string> = this.localStorage_.setAndProp<string>('currentBreakPoint', 'md', this, "currentBreakPoint");
    get currentBreakPoint() {
        return this.__currentBreakPoint.get();
    }
    set currentBreakPoint(newValue: string) {
        this.__currentBreakPoint.set(newValue);
    }
    CustomDivider(parent = null) {
        Divider.create();
        Divider.strokeWidth('1px');
        Divider.color($r('sys.color.ohos_id_color_list_separator'));
        Divider.margin({ left: 8, right: 8 });
    }
    render() {
        NavDestination.create();
        NavDestination.title('WLAN');
        NavDestination.hideTitleBar(true);
        NavDestination.backgroundColor('#f1f3f5');
        Row.create();
        Row.width('100%');
        Row.height(26);
        Row.margin({ top: 38, bottom: 24 });
        Row.padding({ left: 24, right: 24 });
        If.create();
        if (this.currentBreakPoint === 'sm') {
            If.branchId(0);
            Image.create($r('app.media.ic_public_back'));
            Image.width(24);
            Image.height(24);
            Image.margin({ right: 16 });
        }
        If.pop();
        Text.create($r('app.string.WLAN'));
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Medium);
        Text.pop();
        Blank.create();
        Blank.pop();
        Image.create($r('app.media.ic_public_help'));
        Image.width(24);
        Image.aspectRatio(1);
        Row.pop();
        List.create({ space: 20 });
        List.padding({ left: 12, right: 12 });
        List.width('100%');
        List.height('100%');
        ListItem.create();
        ListItem.width('100%');
        ListItem.borderRadius(16);
        ListItem.backgroundColor($r('sys.color.ohos_id_color_foreground_contrary'));
        ListItem.padding({ top: 4, bottom: 4 });
        let earlierCreatedChild_2: SubItem = (this && this.findChildById) ? this.findChildById("2") as SubItem : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new SubItem("2", this, { itemDesc: $r('app.string.WLAN'), isShowButton: true }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                itemDesc: $r('app.string.WLAN'), isShowButton: true
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        ListItem.pop();
        ListItem.create();
        ListItem.width('100%');
        ListItem.borderRadius(16);
        ListItem.backgroundColor($r('sys.color.ohos_id_color_foreground_contrary'));
        ListItem.padding({ top: 4, bottom: 4 });
        let earlierCreatedChild_3: SubItem = (this && this.findChildById) ? this.findChildById("3") as SubItem : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new SubItem("3", this, {
                itemDesc: $r('app.string.networkAcceleration'),
                isShowRightArrow: true,
                itemStatusDesc: this.netWorkStatus
            }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                itemDesc: $r('app.string.networkAcceleration'),
                isShowRightArrow: true,
                itemStatusDesc: this.netWorkStatus
            });
            if (!earlierCreatedChild_3.needsUpdate()) {
                earlierCreatedChild_3.markStatic();
            }
            View.create(earlierCreatedChild_3);
        }
        ListItem.pop();
        ListItem.create();
        ListItem.width('100%');
        ListItem.borderRadius(16);
        ListItem.backgroundColor($r('sys.color.ohos_id_color_foreground_contrary'));
        ListItem.padding({ top: 4, bottom: 4 });
        let earlierCreatedChild_4: SubItem = (this && this.findChildById) ? this.findChildById("4") as SubItem : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new SubItem("4", this, { itemDesc: $r('app.string.moreWLANSettings'), isShowRightArrow: true }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({
                itemDesc: $r('app.string.moreWLANSettings'), isShowRightArrow: true
            });
            if (!earlierCreatedChild_4.needsUpdate()) {
                earlierCreatedChild_4.markStatic();
            }
            View.create(earlierCreatedChild_4);
        }
        ListItem.pop();
        ListItem.create();
        Column.create();
        Text.create($r('app.string.wlanConnected'));
        Text.fontSize(16);
        Text.fontColor('#66000000');
        Text.width('100%');
        Text.padding({ left: 12 });
        Text.pop();
        __Common__.create();
        __Common__.margin({ top: 8 });
        __Common__.width('100%');
        __Common__.borderRadius(16);
        __Common__.backgroundColor($r('sys.color.ohos_id_color_foreground_contrary'));
        __Common__.padding({ top: 4, bottom: 4 });
        let earlierCreatedChild_5: SubItem = (this && this.findChildById) ? this.findChildById("5") as SubItem : undefined;
        if (earlierCreatedChild_5 == undefined) {
            View.create(new SubItem("5", this, {
                itemDesc: $r('app.string.wifiName'),
                content: $r('app.string.connected'),
                src: $r('app.media.wlan2'),
                isLinkAddress: true
            }));
        }
        else {
            earlierCreatedChild_5.updateWithValueParams({
                itemDesc: $r('app.string.wifiName'),
                content: $r('app.string.connected'),
                src: $r('app.media.wlan2'),
                isLinkAddress: true
            });
            if (!earlierCreatedChild_5.needsUpdate()) {
                earlierCreatedChild_5.markStatic();
            }
            View.create(earlierCreatedChild_5);
        }
        __Common__.pop();
        Column.pop();
        ListItem.pop();
        ListItem.create();
        Column.create();
        Row.create();
        Text.create($r('app.string.wlanUseful'));
        Text.fontSize(16);
        Text.fontColor('#66000000');
        Text.width('100%');
        Text.padding({ left: 12 });
        Text.pop();
        Row.pop();
        Column.create();
        Column.width('100%');
        Column.borderRadius(16);
        Column.backgroundColor($r('sys.color.ohos_id_color_foreground_contrary'));
        Column.padding({ top: 4, bottom: 4 });
        Column.margin({ top: 8 });
        let earlierCreatedChild_6: SubItem = (this && this.findChildById) ? this.findChildById("6") as SubItem : undefined;
        if (earlierCreatedChild_6 == undefined) {
            View.create(new SubItem("6", this, {
                itemDesc: $r('app.string.wifiName'),
                content: $r('app.string.useful'),
                src: $r('app.media.wlan1')
            }));
        }
        else {
            earlierCreatedChild_6.updateWithValueParams({
                itemDesc: $r('app.string.wifiName'),
                content: $r('app.string.useful'),
                src: $r('app.media.wlan1')
            });
            if (!earlierCreatedChild_6.needsUpdate()) {
                earlierCreatedChild_6.markStatic();
            }
            View.create(earlierCreatedChild_6);
        }
        this.CustomDivider(this);
        let earlierCreatedChild_7: SubItem = (this && this.findChildById) ? this.findChildById("7") as SubItem : undefined;
        if (earlierCreatedChild_7 == undefined) {
            View.create(new SubItem("7", this, {
                itemDesc: $r('app.string.wifiName'),
                content: $r('app.string.useful'),
                src: $r('app.media.wlan2')
            }));
        }
        else {
            earlierCreatedChild_7.updateWithValueParams({
                itemDesc: $r('app.string.wifiName'),
                content: $r('app.string.useful'),
                src: $r('app.media.wlan2')
            });
            if (!earlierCreatedChild_7.needsUpdate()) {
                earlierCreatedChild_7.markStatic();
            }
            View.create(earlierCreatedChild_7);
        }
        this.CustomDivider(this);
        let earlierCreatedChild_8: SubItem = (this && this.findChildById) ? this.findChildById("8") as SubItem : undefined;
        if (earlierCreatedChild_8 == undefined) {
            View.create(new SubItem("8", this, {
                itemDesc: $r('app.string.wifiName'),
                content: $r('app.string.useless'),
                src: $r('app.media.wlan3')
            }));
        }
        else {
            earlierCreatedChild_8.updateWithValueParams({
                itemDesc: $r('app.string.wifiName'),
                content: $r('app.string.useless'),
                src: $r('app.media.wlan3')
            });
            if (!earlierCreatedChild_8.needsUpdate()) {
                earlierCreatedChild_8.markStatic();
            }
            View.create(earlierCreatedChild_8);
        }
        Column.pop();
        Column.pop();
        ListItem.pop();
        ListItem.create();
        ListItem.width('100%');
        ListItem.borderRadius(16);
        ListItem.backgroundColor($r('sys.color.ohos_id_color_foreground_contrary'));
        ListItem.padding({ top: 4, bottom: 4 });
        let earlierCreatedChild_9: SubItem = (this && this.findChildById) ? this.findChildById("9") as SubItem : undefined;
        if (earlierCreatedChild_9 == undefined) {
            View.create(new SubItem("9", this, { itemDesc: $r('app.string.addNetWork'), isLinkAddress: true }));
        }
        else {
            earlierCreatedChild_9.updateWithValueParams({
                itemDesc: $r('app.string.addNetWork'), isLinkAddress: true
            });
            if (!earlierCreatedChild_9.needsUpdate()) {
                earlierCreatedChild_9.markStatic();
            }
            View.create(earlierCreatedChild_9);
        }
        ListItem.pop();
        List.pop();
        NavDestination.pop();
    }
}
