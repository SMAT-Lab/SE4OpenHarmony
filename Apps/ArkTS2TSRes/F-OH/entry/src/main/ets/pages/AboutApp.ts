interface AboutApp_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "AboutApp_" + ++__generate__Id;
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
import WindowStageUtil from '../util/WindowStageUtil';
import { SettingRow } from '../components/Settings';
import promptAction from '@ohos.promptAction';
import router from '@ohos.router';
const ToastDuration = 1000;
const APP_VERSION = "1.3.5";
class AboutApp extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AboutApp_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    onPageShow() {
        console.info('AboutComponent onPageShow');
        WindowStageUtil.setLayoutFullScreen(globalThis.windowStage, '#f3f4f6', WindowStageUtil.COLOR_BLACK, '#f3f4f6', WindowStageUtil.COLOR_BLACK);
    }
    NavigationTitle(parent = null) {
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Column.width('100%');
        Text.create('关于F-OH');
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
        Stack.backgroundColor('#f3f4f6');
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
        this.LogoAndVersionComponent(this);
        this.AppInfoComponent(this);
        Column.pop();
        Scroll.pop();
        Column.pop();
        Stack.pop();
    }
    LogoAndVersionComponent(parent = null) {
        Column.create();
        Column.alignItems(HorizontalAlign.Center);
        Column.align(Alignment.Top);
        Column.padding({
            top: 62,
            bottom: 62
        });
        Image.create($r("app.media.icon"));
        Image.height(72);
        Image.width(72);
        Image.border({ width: 0.7, radius: 16, color: '#ebebeb' });
        Text.create($r('app.string.EntryAbility_label'));
        Text.fontSize(18);
        Text.fontColor('#182431');
        Text.fontWeight(500);
        Text.padding({ top: 8 });
        Text.pop();
        Text.create('版本 ' + APP_VERSION);
        Text.fontSize(14);
        Text.fontColor('#99182431');
        Text.margin({ top: 4 });
        Text.pop();
        Column.pop();
    }
    AppInfoComponent(parent = null) {
        // 第一组
        Column.create();
        // 第一组
        Column.borderRadius(18);
        // 第一组
        Column.backgroundColor('#fff');
        List.create();
        List.divider({ strokeWidth: 0.5, color: '#d6d6d6', startMargin: 58, endMargin: 14 });
        ListItem.create();
        let earlierCreatedChild_2: SettingRow = ((parent ? parent : this) && (parent ? parent : this).findChildById) ? (parent ? parent : this).findChildById(generateId()) as SettingRow : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new SettingRow("AboutApp_" + __generate__Id, parent ? parent : this, { icon: $r('app.media.ic_foh'), title: '应用简介', info: 'OpenHarmony自由开源软件的应用中心', showRightArrow: false, clickHandler: () => { } }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                icon: $r('app.media.ic_foh'), title: '应用简介', info: 'OpenHarmony自由开源软件的应用中心', showRightArrow: false, clickHandler: () => { }
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        ListItem.pop();
        ListItem.create();
        let earlierCreatedChild_3: SettingRow = ((parent ? parent : this) && (parent ? parent : this).findChildById) ? (parent ? parent : this).findChildById(generateId()) as SettingRow : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new SettingRow("AboutApp_" + __generate__Id, parent ? parent : this, { icon: $r('app.media.author_avatar'), title: '应用作者', info: 'westinyang', clickHandler: () => {
                    router.pushUrl({ url: 'pages/AboutAuthor', params: {} });
                } }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                icon: $r('app.media.author_avatar'), title: '应用作者', info: 'westinyang', clickHandler: () => {
                    router.pushUrl({ url: 'pages/AboutAuthor', params: {} });
                }
            });
            if (!earlierCreatedChild_3.needsUpdate()) {
                earlierCreatedChild_3.markStatic();
            }
            View.create(earlierCreatedChild_3);
        }
        ListItem.pop();
        ListItem.create();
        let earlierCreatedChild_4: SettingRow = ((parent ? parent : this) && (parent ? parent : this).findChildById) ? (parent ? parent : this).findChildById(generateId()) as SettingRow : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new SettingRow("AboutApp_" + __generate__Id, parent ? parent : this, { icon: $r('app.media.ic_favorite'), title: '开源仓库', info: 'https://gitee.com/westinyang/f-oh', clickHandler: () => {
                    router.pushUrl({ url: 'pages/Browser', params: { title: '开源仓库', url: 'https://gitee.com/westinyang/f-oh' } });
                } }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({
                icon: $r('app.media.ic_favorite'), title: '开源仓库', info: 'https://gitee.com/westinyang/f-oh', clickHandler: () => {
                    router.pushUrl({ url: 'pages/Browser', params: { title: '开源仓库', url: 'https://gitee.com/westinyang/f-oh' } });
                }
            });
            if (!earlierCreatedChild_4.needsUpdate()) {
                earlierCreatedChild_4.markStatic();
            }
            View.create(earlierCreatedChild_4);
        }
        ListItem.pop();
        ListItem.create();
        let earlierCreatedChild_5: SettingRow = ((parent ? parent : this) && (parent ? parent : this).findChildById) ? (parent ? parent : this).findChildById(generateId()) as SettingRow : undefined;
        if (earlierCreatedChild_5 == undefined) {
            View.create(new SettingRow("AboutApp_" + __generate__Id, parent ? parent : this, { icon: $r('app.media.ic_gitee'), title: '开源社区', info: 'https://gitee.com/ohos-dev', clickHandler: () => {
                    router.pushUrl({ url: 'pages/Browser', params: { title: '开源社区', url: 'https://gitee.com/ohos-dev' } });
                } }));
        }
        else {
            earlierCreatedChild_5.updateWithValueParams({
                icon: $r('app.media.ic_gitee'), title: '开源社区', info: 'https://gitee.com/ohos-dev', clickHandler: () => {
                    router.pushUrl({ url: 'pages/Browser', params: { title: '开源社区', url: 'https://gitee.com/ohos-dev' } });
                }
            });
            if (!earlierCreatedChild_5.needsUpdate()) {
                earlierCreatedChild_5.markStatic();
            }
            View.create(earlierCreatedChild_5);
        }
        ListItem.pop();
        List.pop();
        // 第一组
        Column.pop();
    }
}
loadDocument(new AboutApp("1", undefined, {}));
