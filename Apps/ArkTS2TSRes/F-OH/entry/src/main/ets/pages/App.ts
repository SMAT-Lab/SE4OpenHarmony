interface App_Params {
    appType?: AppType;
    appList?: AppInfo[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "App_" + ++__generate__Id;
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
import { AppInfo, AppType } from '../model/AppInfo';
import AppListItem from '../components/AppListItem';
import { DataSource } from '../data/DataSource';
import router from '@ohos.router';
export default class App extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.appType = undefined;
        this.__appList = new ObservedPropertyObject([], this, "appList");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: App_Params) {
        if (params.appType !== undefined) {
            this.appType = params.appType;
        }
        if (params.appList !== undefined) {
            this.appList = params.appList;
        }
    }
    aboutToBeDeleted() {
        this.__appList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private appType: AppType;
    private __appList: ObservedPropertyObject<AppInfo[]>;
    get appList() {
        return this.__appList.get();
    }
    set appList(newValue: AppInfo[]) {
        this.__appList.set(newValue);
    }
    aboutToAppear() {
        DataSource.getAppList(this.appType, (data, totalCount) => {
            this.appList = data;
        });
    }
    NavigationTitle(parent = null) {
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Column.width('100%');
        Text.create(this.appType == AppType.APP ? '应用' : '游戏');
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
        Navigation.border({ width: { bottom: 0.5 }, color: '#c9c9c9' });
        // 页面标题
        Navigation.padding({ left: 15, right: 15 });
        // 页面标题
        Navigation.pop();
        Scroll.create();
        Scroll.edgeEffect(EdgeEffect.Spring);
        Scroll.width('100%');
        Scroll.height('auto');
        Scroll.margin({ bottom: 56 });
        Column.create();
        Column.width('100%');
        List.create({ space: 0, initialIndex: 0 });
        List.width('auto');
        List.height('auto');
        List.padding({ left: 15, right: 15 });
        List.divider({
            strokeWidth: 0.5,
            color: '#d6d6d6',
            startMargin: 65,
            endMargin: 0
        });
        ForEach.create("3", this, ObservedObject.GetRawObject(this.appList), (item: AppInfo) => {
            ListItem.create();
            let earlierCreatedChild_2: AppListItem = (this && this.findChildById) ? this.findChildById("2") as AppListItem : undefined;
            if (earlierCreatedChild_2 == undefined) {
                View.create(new AppListItem("2", this, { appInfo: item }));
            }
            else {
                earlierCreatedChild_2.updateWithValueParams({
                    appInfo: item
                });
                View.create(earlierCreatedChild_2);
            }
            ListItem.pop();
        }, (item: AppInfo, index) => index + JSON.stringify(item));
        ForEach.pop();
        List.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
        Stack.pop();
    }
}
