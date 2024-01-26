interface Settings_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Settings_" + ++__generate__Id;
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
import fs from '@ohos.file.fs';
import promptAction from '@ohos.promptAction';
import { SettingRow } from '../components/Settings';
const ToastDuration = 1000;
export default class Settings extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Settings_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    aboutToAppear(): void {
    }
    NavigationTitle(parent = null) {
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Column.width('100%');
        Text.create('设置');
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
        // 第1组
        Column.create();
        // 第1组
        Column.borderRadius(18);
        // 第1组
        Column.backgroundColor('#fff');
        // 第1组
        Column.margin({ bottom: 10 });
        List.create();
        List.divider({ strokeWidth: 0.5, color: '#d6d6d6', startMargin: 54, endMargin: 14 });
        ListItem.create();
        let earlierCreatedChild_2: SettingRow = (this && this.findChildById) ? this.findChildById("2") as SettingRow : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new SettingRow("2", this, { icon: $r('app.media.ic_download'), title: '下载管理', info: '待实现', clickHandler: () => {
                    promptAction.showToast({ message: '待实现，下载管理', duration: ToastDuration });
                } }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                icon: $r('app.media.ic_download'), title: '下载管理', info: '待实现', clickHandler: () => {
                    promptAction.showToast({ message: '待实现，下载管理', duration: ToastDuration });
                }
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        ListItem.pop();
        ListItem.create();
        let earlierCreatedChild_3: SettingRow = (this && this.findChildById) ? this.findChildById("3") as SettingRow : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new SettingRow("3", this, { icon: $r('app.media.ic_control'), title: '应用管理', info: '待实现', clickHandler: () => {
                    promptAction.showToast({ message: '待实现，应用管理', duration: ToastDuration });
                } }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                icon: $r('app.media.ic_control'), title: '应用管理', info: '待实现', clickHandler: () => {
                    promptAction.showToast({ message: '待实现，应用管理', duration: ToastDuration });
                }
            });
            if (!earlierCreatedChild_3.needsUpdate()) {
                earlierCreatedChild_3.markStatic();
            }
            View.create(earlierCreatedChild_3);
        }
        ListItem.pop();
        ListItem.create();
        let earlierCreatedChild_4: SettingRow = (this && this.findChildById) ? this.findChildById("4") as SettingRow : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new SettingRow("4", this, { icon: $r('app.media.ic_internet'), title: '应用元数据源管理', info: '待实现', clickHandler: () => {
                    promptAction.showToast({ message: '待实现，应用元数据源管理', duration: ToastDuration });
                } }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({
                icon: $r('app.media.ic_internet'), title: '应用元数据源管理', info: '待实现', clickHandler: () => {
                    promptAction.showToast({ message: '待实现，应用元数据源管理', duration: ToastDuration });
                }
            });
            if (!earlierCreatedChild_4.needsUpdate()) {
                earlierCreatedChild_4.markStatic();
            }
            View.create(earlierCreatedChild_4);
        }
        ListItem.pop();
        List.pop();
        // 第1组
        Column.pop();
        // 第2组
        Column.create();
        // 第2组
        Column.borderRadius(18);
        // 第2组
        Column.backgroundColor('#fff');
        // 第2组
        Column.margin({ bottom: 10 });
        List.create();
        List.divider({ strokeWidth: 0.5, color: '#d6d6d6', startMargin: 54, endMargin: 14 });
        ListItem.create();
        let earlierCreatedChild_5: SettingRow = (this && this.findChildById) ? this.findChildById("5") as SettingRow : undefined;
        if (earlierCreatedChild_5 == undefined) {
            View.create(new SettingRow("5", this, { icon: $r('app.media.ic_delete'), title: '清空缓存', info: '清理全部已下载到本地的应用安装包', showRightArrow: false, clickHandler: () => {
                    this.clearCache();
                } }));
        }
        else {
            earlierCreatedChild_5.updateWithValueParams({
                icon: $r('app.media.ic_delete'), title: '清空缓存', info: '清理全部已下载到本地的应用安装包', showRightArrow: false, clickHandler: () => {
                    this.clearCache();
                }
            });
            if (!earlierCreatedChild_5.needsUpdate()) {
                earlierCreatedChild_5.markStatic();
            }
            View.create(earlierCreatedChild_5);
        }
        ListItem.pop();
        List.pop();
        // 第2组
        Column.pop();
        // 第3组
        Column.create();
        // 第3组
        Column.borderRadius(18);
        // 第3组
        Column.backgroundColor('#fff');
        // 第3组
        Column.margin({ bottom: 10 });
        List.create();
        List.divider({ strokeWidth: 0.5, color: '#d6d6d6', startMargin: 54, endMargin: 14 });
        ListItem.create();
        let earlierCreatedChild_6: SettingRow = (this && this.findChildById) ? this.findChildById("6") as SettingRow : undefined;
        if (earlierCreatedChild_6 == undefined) {
            View.create(new SettingRow("6", this, { icon: $r('app.media.ic_foh'), title: '关于F-OH', info: 'OpenHarmony自由开源软件的应用中心', clickHandler: () => {
                    router.pushUrl({ url: 'pages/AboutApp', params: {} });
                } }));
        }
        else {
            earlierCreatedChild_6.updateWithValueParams({
                icon: $r('app.media.ic_foh'), title: '关于F-OH', info: 'OpenHarmony自由开源软件的应用中心', clickHandler: () => {
                    router.pushUrl({ url: 'pages/AboutApp', params: {} });
                }
            });
            if (!earlierCreatedChild_6.needsUpdate()) {
                earlierCreatedChild_6.markStatic();
            }
            View.create(earlierCreatedChild_6);
        }
        ListItem.pop();
        ListItem.create();
        let earlierCreatedChild_7: SettingRow = (this && this.findChildById) ? this.findChildById("7") as SettingRow : undefined;
        if (earlierCreatedChild_7 == undefined) {
            View.create(new SettingRow("7", this, { icon: $r('app.media.author_avatar'), title: '关于作者', info: 'westinyang', clickHandler: () => {
                    router.pushUrl({ url: 'pages/AboutAuthor', params: {} });
                } }));
        }
        else {
            earlierCreatedChild_7.updateWithValueParams({
                icon: $r('app.media.author_avatar'), title: '关于作者', info: 'westinyang', clickHandler: () => {
                    router.pushUrl({ url: 'pages/AboutAuthor', params: {} });
                }
            });
            if (!earlierCreatedChild_7.needsUpdate()) {
                earlierCreatedChild_7.markStatic();
            }
            View.create(earlierCreatedChild_7);
        }
        ListItem.pop();
        List.pop();
        // 第3组
        Column.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
        Stack.pop();
    }
    clearCache() {
        try {
            promptAction.showDialog({
                title: '确认要清空缓存吗？',
                message: '此操作将会清理全部已下载到本地的应用安装包',
                buttons: [
                    { text: '取消', color: '#000000', },
                    { text: '确认', color: '#3478f6', }
                ],
            }).then(data => {
                console.info('showDialog success, click button: ' + data.index);
                if (data.index == 1) {
                    // 下载路径 /data/storage/el2/base/haps/entry/files
                    let dirPath = globalThis.abilityContext.filesDir;
                    fs.rmdir(dirPath, (err) => {
                        if (err) {
                            console.info("rmdir failed with error message: " + err.message + ", error code: " + err.code);
                            promptAction.showToast({ message: '清空缓存失败：' + err.code, duration: ToastDuration });
                        }
                        else {
                            console.info("rmdir succeed");
                            promptAction.showToast({ message: '清空缓存完毕', duration: ToastDuration });
                        }
                    });
                }
            }).catch(err => {
                console.info('showDialog error: ' + err);
            });
        }
        catch (error) {
            console.error(`showDialog args error code is ${error.code}, message is ${error.message}`);
        }
    }
}
