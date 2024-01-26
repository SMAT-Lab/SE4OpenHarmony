interface AppDetail_Params {
    appInfo?: AppInfo;
    localVersionName?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "AppDetail_" + ++__generate__Id;
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
import router from '@ohos.router';
import { InfoRow } from '../components/InfoRow';
import { AppInfo } from '../model/AppInfo';
import WindowStageUtil from '../util/WindowStageUtil';
class AppDetail extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__appInfo = new ObservedPropertyObject(new AppInfo(router.getParams()['appInfo']), this, "appInfo");
        this.__localVersionName = new ObservedPropertySimple(router.getParams()['localVersionName'] || '--', this, "localVersionName");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AppDetail_Params) {
        if (params.appInfo !== undefined) {
            this.appInfo = params.appInfo;
        }
        if (params.localVersionName !== undefined) {
            this.localVersionName = params.localVersionName;
        }
    }
    aboutToBeDeleted() {
        this.__appInfo.aboutToBeDeleted();
        this.__localVersionName.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __appInfo: ObservedPropertyObject<AppInfo>;
    get appInfo() {
        return this.__appInfo.get();
    }
    set appInfo(newValue: AppInfo) {
        this.__appInfo.set(newValue);
    }
    private __localVersionName: ObservedPropertySimple<string>;
    get localVersionName() {
        return this.__localVersionName.get();
    }
    set localVersionName(newValue: string) {
        this.__localVersionName.set(newValue);
    }
    onPageShow() {
        console.info('AboutComponent onPageShow');
        WindowStageUtil.setLayoutFullScreen(globalThis.windowStage, '#ffffff', WindowStageUtil.COLOR_BLACK, '#ffffff', WindowStageUtil.COLOR_BLACK);
    }
    NavigationTitle(parent = null) {
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Column.width('100%');
        Text.create('应用详情');
        Text.fontColor('#182431');
        Text.fontSize(26);
        Text.fontWeight(500);
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
        Navigation.hideBackButton(false);
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
        Flex.create({
            direction: FlexDirection.Row,
            justifyContent: FlexAlign.SpaceBetween,
            alignItems: ItemAlign.Center
        });
        Flex.width('100%');
        Flex.height(100);
        Flex.margin({ bottom: 15 });
        // 左 应用图标
        Image.create(this.appInfo.getIcon() || $r('app.media.icon_default'));
        // 左 应用图标
        Image.width(100);
        // 左 应用图标
        Image.height(100);
        // 左 应用图标
        Image.border({ width: 0.7, radius: 23, color: '#ebebeb' });
        // 左 应用图标
        Image.flexShrink(0);
        //        .backgroundColor('#00f')
        // 右 应用信息
        Column.create();
        //        .backgroundColor('#00f')
        // 右 应用信息
        Column.height('100%');
        //        .backgroundColor('#00f')
        // 右 应用信息
        Column.margin({ left: 15 });
        //        .backgroundColor('#00f')
        // 右 应用信息
        Column.alignItems(HorizontalAlign.Start);
        //        .backgroundColor('#00f')
        // 右 应用信息
        Column.flexGrow(1);
        //        .backgroundColor('#00f')
        // 右 应用信息
        Column.justifyContent(FlexAlign.Start);
        Text.create(this.appInfo.name);
        Text.fontSize(22);
        Text.margin({ top: 2, bottom: 5 });
        Text.maxLines(1);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.pop();
        Text.create(this.appInfo.desc);
        Text.fontSize(14);
        Text.maxLines(4);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.pop();
        //        .backgroundColor('#00f')
        // 右 应用信息
        Column.pop();
        Flex.pop();
        // .backgroundColor('#0f0')
        // 第一组
        Column.create();
        // .backgroundColor('#0f0')
        // 第一组
        Column.borderRadius(18);
        // .backgroundColor('#0f0')
        // 第一组
        Column.backgroundColor('#ffffff');
        List.create();
        List.divider({ strokeWidth: 0.5, color: '#d6d6d6', startMargin: 40, endMargin: 0 });
        ListItem.create();
        let earlierCreatedChild_2: InfoRow = (this && this.findChildById) ? this.findChildById("2") as InfoRow : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new InfoRow("2", this, { icon: $r('app.media.ic_bookmark'), title: '应用标签', info: this.appInfo.tags, showRightArrow: false }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                icon: $r('app.media.ic_bookmark'), title: '应用标签', info: this.appInfo.tags, showRightArrow: false
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        ListItem.pop();
        ListItem.create();
        let earlierCreatedChild_3: InfoRow = (this && this.findChildById) ? this.findChildById("3") as InfoRow : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new InfoRow("3", this, { icon: $r('app.media.ic_app'), title: '应用包名', info: this.appInfo.packageName, showRightArrow: false }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                icon: $r('app.media.ic_app'), title: '应用包名', info: this.appInfo.packageName, showRightArrow: false
            });
            if (!earlierCreatedChild_3.needsUpdate()) {
                earlierCreatedChild_3.markStatic();
            }
            View.create(earlierCreatedChild_3);
        }
        ListItem.pop();
        ListItem.create();
        let earlierCreatedChild_4: InfoRow = (this && this.findChildById) ? this.findChildById("4") as InfoRow : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new InfoRow("4", this, { icon: $r('app.media.ic_flags'), title: '当前版本', info: this.appInfo.version, showRightArrow: false }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({
                icon: $r('app.media.ic_flags'), title: '当前版本', info: this.appInfo.version, showRightArrow: false
            });
            if (!earlierCreatedChild_4.needsUpdate()) {
                earlierCreatedChild_4.markStatic();
            }
            View.create(earlierCreatedChild_4);
        }
        ListItem.pop();
        ListItem.create();
        let earlierCreatedChild_5: InfoRow = (this && this.findChildById) ? this.findChildById("5") as InfoRow : undefined;
        if (earlierCreatedChild_5 == undefined) {
            View.create(new InfoRow("5", this, { icon: $r('app.media.ic_laptop'), title: '开发者', info: this.appInfo.vender, showRightArrow: false }));
        }
        else {
            earlierCreatedChild_5.updateWithValueParams({
                icon: $r('app.media.ic_laptop'), title: '开发者', info: this.appInfo.vender, showRightArrow: false
            });
            if (!earlierCreatedChild_5.needsUpdate()) {
                earlierCreatedChild_5.markStatic();
            }
            View.create(earlierCreatedChild_5);
        }
        ListItem.pop();
        ListItem.create();
        let earlierCreatedChild_6: InfoRow = (this && this.findChildById) ? this.findChildById("6") as InfoRow : undefined;
        if (earlierCreatedChild_6 == undefined) {
            View.create(new InfoRow("6", this, { icon: $r('app.media.ic_link'), title: '开源仓库', info: this.appInfo.openSourceAddress, clickHandler: () => {
                    router.pushUrl({ url: 'pages/Browser', params: { title: this.appInfo.name, url: this.appInfo.openSourceAddress } });
                } }));
        }
        else {
            earlierCreatedChild_6.updateWithValueParams({
                icon: $r('app.media.ic_link'), title: '开源仓库', info: this.appInfo.openSourceAddress, clickHandler: () => {
                    router.pushUrl({ url: 'pages/Browser', params: { title: this.appInfo.name, url: this.appInfo.openSourceAddress } });
                }
            });
            if (!earlierCreatedChild_6.needsUpdate()) {
                earlierCreatedChild_6.markStatic();
            }
            View.create(earlierCreatedChild_6);
        }
        ListItem.pop();
        ListItem.create();
        let earlierCreatedChild_7: InfoRow = (this && this.findChildById) ? this.findChildById("7") as InfoRow : undefined;
        if (earlierCreatedChild_7 == undefined) {
            View.create(new InfoRow("7", this, { icon: $r('app.media.ic_send'), title: '发行时间', info: this.appInfo.releaseTime, showRightArrow: false }));
        }
        else {
            earlierCreatedChild_7.updateWithValueParams({
                icon: $r('app.media.ic_send'), title: '发行时间', info: this.appInfo.releaseTime, showRightArrow: false
            });
            if (!earlierCreatedChild_7.needsUpdate()) {
                earlierCreatedChild_7.markStatic();
            }
            View.create(earlierCreatedChild_7);
        }
        ListItem.pop();
        List.pop();
        // .backgroundColor('#0f0')
        // 第一组
        Column.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
        Stack.pop();
    }
}
loadDocument(new AppDetail("1", undefined, {}));
