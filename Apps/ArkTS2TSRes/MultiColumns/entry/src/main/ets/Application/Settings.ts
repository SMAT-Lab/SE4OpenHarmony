interface Settings_Params {
    pathInfo?: NavPathStack;
    currentBreakPoint?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Settings_" + ++__generate__Id;
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
import { MainItem } from '../common/SettingItem';
import { WlanItem } from '../common/WlanItem';
let storage = LocalStorage.GetShared();
class Settings extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__pathInfo = new ObservedPropertyObject(new NavPathStack(), this, "pathInfo");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Settings_Params) {
        if (params.pathInfo !== undefined) {
            this.pathInfo = params.pathInfo;
        }
    }
    aboutToBeDeleted() {
        this.__pathInfo.aboutToBeDeleted();
        this.__currentBreakPoint.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __pathInfo: ObservedPropertyObject<NavPathStack>;
    get pathInfo() {
        return this.__pathInfo.get();
    }
    set pathInfo(newValue: NavPathStack) {
        this.__pathInfo.set(newValue);
    }
    private __currentBreakPoint: ObservedPropertyAbstract<string> = this.localStorage_.setAndLink<string>('currentBreakPoint', 'md', this, "currentBreakPoint");
    get currentBreakPoint() {
        return this.__currentBreakPoint.get();
    }
    set currentBreakPoint(newValue: string) {
        this.__currentBreakPoint.set(newValue);
    }
    myRouter(name: string, param?: number | undefined, parent = null) {
        let earlierCreatedChild_2: WlanItem = ((parent ? parent : this) && (parent ? parent : this).findChildById) ? (parent ? parent : this).findChildById(generateId()) as WlanItem : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new WlanItem("Settings_" + __generate__Id, parent ? parent : this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
    }
    CustomDivider(parent = null) {
        Divider.create();
        Divider.strokeWidth('1px');
        Divider.color($r('sys.color.ohos_id_color_list_separator'));
        Divider.margin({ left: 8, right: 8 });
    }
    aboutToAppear() {
        this.pathInfo.pushPath({ name: 'one' });
    }
    render() {
        GridRow.create();
        GridRow.onBreakpointChange((breakpoint: string) => {
            this.currentBreakPoint = breakpoint;
        });
        GridCol.create({ span: { sm: 12, md: 12, lg: 12 } });
        Navigation.create(this.pathInfo);
        Navigation.navBarWidth(293);
        Navigation.title($r('app.string.settings'));
        Navigation.backgroundColor('#f1f3f5');
        Navigation.width('100%');
        Navigation.height('100%');
        Navigation.navDestination({ builder: this.myRouter.bind(this) });
        List.create({ space: 10 });
        List.width('100%');
        List.height('100%');
        List.padding({ left: 12, right: 12 });
        ListItem.create();
        ListItem.padding({ top: 8, bottom: 8 });
        ListItem.width('100%');
        Search.create({ placeholder: $r('app.string.search') });
        Search.backgroundColor('#fff');
        Search.pop();
        ListItem.pop();
        ListItem.create();
        __Common__.create();
        __Common__.backgroundColor('#fff');
        __Common__.borderRadius(20);
        __Common__.padding({ top: 12, bottom: 12 });
        let earlierCreatedChild_3: MainItem = (this && this.findChildById) ? this.findChildById("3") as MainItem : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new MainItem("3", this, { isUserItem: true, src: $r('app.media.ic_mine_normal') }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                isUserItem: true, src: $r('app.media.ic_mine_normal')
            });
            if (!earlierCreatedChild_3.needsUpdate()) {
                earlierCreatedChild_3.markStatic();
            }
            View.create(earlierCreatedChild_3);
        }
        __Common__.pop();
        ListItem.pop();
        ListItem.create();
        Column.create();
        Column.width('100%');
        Column.borderRadius(24);
        Column.backgroundColor($r('sys.color.ohos_id_color_foreground_contrary'));
        Column.padding({ top: 4, bottom: 4 });
        let earlierCreatedChild_4: MainItem = (this && this.findChildById) ? this.findChildById("4") as MainItem : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new MainItem("4", this, {
                itemDesc: $r('app.string.WLAN'),
                src: $r('app.media.wlan'),
                itemStatusDesc: $r('app.string.closed')
            }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({
                itemDesc: $r('app.string.WLAN'),
                src: $r('app.media.wlan'),
                itemStatusDesc: $r('app.string.closed')
            });
            if (!earlierCreatedChild_4.needsUpdate()) {
                earlierCreatedChild_4.markStatic();
            }
            View.create(earlierCreatedChild_4);
        }
        this.CustomDivider(this);
        let earlierCreatedChild_5: MainItem = (this && this.findChildById) ? this.findChildById("5") as MainItem : undefined;
        if (earlierCreatedChild_5 == undefined) {
            View.create(new MainItem("5", this, {
                itemDesc: $r('app.string.bluetooth'),
                src: $r('app.media.blueTooth'),
                itemStatusDesc: $r('app.string.closed')
            }));
        }
        else {
            earlierCreatedChild_5.updateWithValueParams({
                itemDesc: $r('app.string.bluetooth'),
                src: $r('app.media.blueTooth'),
                itemStatusDesc: $r('app.string.closed')
            });
            if (!earlierCreatedChild_5.needsUpdate()) {
                earlierCreatedChild_5.markStatic();
            }
            View.create(earlierCreatedChild_5);
        }
        this.CustomDivider(this);
        let earlierCreatedChild_6: MainItem = (this && this.findChildById) ? this.findChildById("6") as MainItem : undefined;
        if (earlierCreatedChild_6 == undefined) {
            View.create(new MainItem("6", this, { itemDesc: $r('app.string.mobileData'), src: $r('app.media.mobileData') }));
        }
        else {
            earlierCreatedChild_6.updateWithValueParams({
                itemDesc: $r('app.string.mobileData'), src: $r('app.media.mobileData')
            });
            if (!earlierCreatedChild_6.needsUpdate()) {
                earlierCreatedChild_6.markStatic();
            }
            View.create(earlierCreatedChild_6);
        }
        this.CustomDivider(this);
        let earlierCreatedChild_7: MainItem = (this && this.findChildById) ? this.findChildById("7") as MainItem : undefined;
        if (earlierCreatedChild_7 == undefined) {
            View.create(new MainItem("7", this, {
                itemDesc: $r('app.string.moreConnections'),
                src: $r('app.media.ic_settings_more_connections')
            }));
        }
        else {
            earlierCreatedChild_7.updateWithValueParams({
                itemDesc: $r('app.string.moreConnections'),
                src: $r('app.media.ic_settings_more_connections')
            });
            if (!earlierCreatedChild_7.needsUpdate()) {
                earlierCreatedChild_7.markStatic();
            }
            View.create(earlierCreatedChild_7);
        }
        Column.pop();
        ListItem.pop();
        ListItem.create();
        Column.create();
        Column.width('100%');
        Column.borderRadius(24);
        Column.backgroundColor($r('sys.color.ohos_id_color_foreground_contrary'));
        Column.padding({ top: 4, bottom: 4 });
        let earlierCreatedChild_8: MainItem = (this && this.findChildById) ? this.findChildById("8") as MainItem : undefined;
        if (earlierCreatedChild_8 == undefined) {
            View.create(new MainItem("8", this, { itemDesc: $r('app.string.desktopAndWallpaper'), src: $r('app.media.desk') }));
        }
        else {
            earlierCreatedChild_8.updateWithValueParams({
                itemDesc: $r('app.string.desktopAndWallpaper'), src: $r('app.media.desk')
            });
            if (!earlierCreatedChild_8.needsUpdate()) {
                earlierCreatedChild_8.markStatic();
            }
            View.create(earlierCreatedChild_8);
        }
        this.CustomDivider(this);
        let earlierCreatedChild_9: MainItem = (this && this.findChildById) ? this.findChildById("9") as MainItem : undefined;
        if (earlierCreatedChild_9 == undefined) {
            View.create(new MainItem("9", this, { itemDesc: $r('app.string.displayAndBrightness'), src: $r('app.media.displayAndBrightness') }));
        }
        else {
            earlierCreatedChild_9.updateWithValueParams({
                itemDesc: $r('app.string.displayAndBrightness'), src: $r('app.media.displayAndBrightness')
            });
            if (!earlierCreatedChild_9.needsUpdate()) {
                earlierCreatedChild_9.markStatic();
            }
            View.create(earlierCreatedChild_9);
        }
        Column.pop();
        ListItem.pop();
        ListItem.create();
        Column.create();
        Column.width('100%');
        Column.borderRadius(24);
        Column.backgroundColor($r('sys.color.ohos_id_color_foreground_contrary'));
        Column.padding({ top: 4, bottom: 4 });
        let earlierCreatedChild_10: MainItem = (this && this.findChildById) ? this.findChildById("10") as MainItem : undefined;
        if (earlierCreatedChild_10 == undefined) {
            View.create(new MainItem("10", this, { itemDesc: $r('app.string.soundAndVibration'), src: $r('app.media.volume') }));
        }
        else {
            earlierCreatedChild_10.updateWithValueParams({
                itemDesc: $r('app.string.soundAndVibration'), src: $r('app.media.volume')
            });
            if (!earlierCreatedChild_10.needsUpdate()) {
                earlierCreatedChild_10.markStatic();
            }
            View.create(earlierCreatedChild_10);
        }
        this.CustomDivider(this);
        let earlierCreatedChild_11: MainItem = (this && this.findChildById) ? this.findChildById("11") as MainItem : undefined;
        if (earlierCreatedChild_11 == undefined) {
            View.create(new MainItem("11", this, { itemDesc: $r('app.string.notice'), src: $r('app.media.notify') }));
        }
        else {
            earlierCreatedChild_11.updateWithValueParams({
                itemDesc: $r('app.string.notice'), src: $r('app.media.notify')
            });
            if (!earlierCreatedChild_11.needsUpdate()) {
                earlierCreatedChild_11.markStatic();
            }
            View.create(earlierCreatedChild_11);
        }
        this.CustomDivider(this);
        let earlierCreatedChild_12: MainItem = (this && this.findChildById) ? this.findChildById("12") as MainItem : undefined;
        if (earlierCreatedChild_12 == undefined) {
            View.create(new MainItem("12", this, { itemDesc: $r('app.string.storage'), src: $r('app.media.storage') }));
        }
        else {
            earlierCreatedChild_12.updateWithValueParams({
                itemDesc: $r('app.string.storage'), src: $r('app.media.storage')
            });
            if (!earlierCreatedChild_12.needsUpdate()) {
                earlierCreatedChild_12.markStatic();
            }
            View.create(earlierCreatedChild_12);
        }
        this.CustomDivider(this);
        let earlierCreatedChild_13: MainItem = (this && this.findChildById) ? this.findChildById("13") as MainItem : undefined;
        if (earlierCreatedChild_13 == undefined) {
            View.create(new MainItem("13", this, { itemDesc: $r('app.string.safe'), src: $r('app.media.security') }));
        }
        else {
            earlierCreatedChild_13.updateWithValueParams({
                itemDesc: $r('app.string.safe'), src: $r('app.media.security')
            });
            if (!earlierCreatedChild_13.needsUpdate()) {
                earlierCreatedChild_13.markStatic();
            }
            View.create(earlierCreatedChild_13);
        }
        this.CustomDivider(this);
        let earlierCreatedChild_14: MainItem = (this && this.findChildById) ? this.findChildById("14") as MainItem : undefined;
        if (earlierCreatedChild_14 == undefined) {
            View.create(new MainItem("14", this, { itemDesc: $r('app.string.privacy'), src: $r('app.media.privacy') }));
        }
        else {
            earlierCreatedChild_14.updateWithValueParams({
                itemDesc: $r('app.string.privacy'), src: $r('app.media.privacy')
            });
            if (!earlierCreatedChild_14.needsUpdate()) {
                earlierCreatedChild_14.markStatic();
            }
            View.create(earlierCreatedChild_14);
        }
        Column.pop();
        ListItem.pop();
        ListItem.create();
        Column.create();
        Column.width('100%');
        Column.borderRadius(24);
        Column.backgroundColor($r('sys.color.ohos_id_color_foreground_contrary'));
        Column.padding(4);
        let earlierCreatedChild_15: MainItem = (this && this.findChildById) ? this.findChildById("15") as MainItem : undefined;
        if (earlierCreatedChild_15 == undefined) {
            View.create(new MainItem("15", this, { itemDesc: $r('app.string.userAccounts'), src: $r('app.media.userAccounts') }));
        }
        else {
            earlierCreatedChild_15.updateWithValueParams({
                itemDesc: $r('app.string.userAccounts'), src: $r('app.media.userAccounts')
            });
            if (!earlierCreatedChild_15.needsUpdate()) {
                earlierCreatedChild_15.markStatic();
            }
            View.create(earlierCreatedChild_15);
        }
        this.CustomDivider(this);
        let earlierCreatedChild_16: MainItem = (this && this.findChildById) ? this.findChildById("16") as MainItem : undefined;
        if (earlierCreatedChild_16 == undefined) {
            View.create(new MainItem("16", this, { itemDesc: $r('app.string.system'), src: $r('app.media.system') }));
        }
        else {
            earlierCreatedChild_16.updateWithValueParams({
                itemDesc: $r('app.string.system'), src: $r('app.media.system')
            });
            if (!earlierCreatedChild_16.needsUpdate()) {
                earlierCreatedChild_16.markStatic();
            }
            View.create(earlierCreatedChild_16);
        }
        this.CustomDivider(this);
        let earlierCreatedChild_17: MainItem = (this && this.findChildById) ? this.findChildById("17") as MainItem : undefined;
        if (earlierCreatedChild_17 == undefined) {
            View.create(new MainItem("17", this, { itemDesc: $r('app.string.aboutDevice'), src: $r('app.media.aboutDevice') }));
        }
        else {
            earlierCreatedChild_17.updateWithValueParams({
                itemDesc: $r('app.string.aboutDevice'), src: $r('app.media.aboutDevice')
            });
            if (!earlierCreatedChild_17.needsUpdate()) {
                earlierCreatedChild_17.markStatic();
            }
            View.create(earlierCreatedChild_17);
        }
        Column.pop();
        ListItem.pop();
        List.pop();
        Navigation.pop();
        GridCol.pop();
        GridRow.pop();
    }
}
loadDocument(new Settings("1", undefined, {}, storage));
