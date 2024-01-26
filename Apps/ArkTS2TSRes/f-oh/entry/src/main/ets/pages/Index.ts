interface Index_Params {
    fontColor?: string;
    selectedFontColor?: string;
    currentIndex?: number;
    controller?: TabsController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
import Home from './Home';
import App from './App';
import Settings from './Settings';
import WindowStageUtil from '../util/WindowStageUtil';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__fontColor = new ObservedPropertySimple('#182431', this, "fontColor");
        this.__selectedFontColor = new ObservedPropertySimple('#007DFF', this, "selectedFontColor");
        this.__currentIndex = new ObservedPropertySimple(0, this, "currentIndex");
        this.controller = new TabsController();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.fontColor !== undefined) {
            this.fontColor = params.fontColor;
        }
        if (params.selectedFontColor !== undefined) {
            this.selectedFontColor = params.selectedFontColor;
        }
        if (params.currentIndex !== undefined) {
            this.currentIndex = params.currentIndex;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    aboutToBeDeleted() {
        this.__fontColor.aboutToBeDeleted();
        this.__selectedFontColor.aboutToBeDeleted();
        this.__currentIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __fontColor: ObservedPropertySimple<string>;
    get fontColor() {
        return this.__fontColor.get();
    }
    set fontColor(newValue: string) {
        this.__fontColor.set(newValue);
    }
    private __selectedFontColor: ObservedPropertySimple<string>;
    get selectedFontColor() {
        return this.__selectedFontColor.get();
    }
    set selectedFontColor(newValue: string) {
        this.__selectedFontColor.set(newValue);
    }
    private __currentIndex: ObservedPropertySimple<number>;
    get currentIndex() {
        return this.__currentIndex.get();
    }
    set currentIndex(newValue: number) {
        this.__currentIndex.set(newValue);
    }
    private controller: TabsController;
    onPageShow() {
        console.info('IndexComponent onPageShow');
        this.changeLFS();
    }
    TabBarBuilder(index: number, title: string, icon: Resource, iconSelected: Resource, parent = null) {
        Column.create();
        Column.justifyContent(FlexAlign.Center);
        Column.height('100%');
        Column.width('100%');
        Column.backgroundColor('#f7f7f7');
        Column.border({ width: { top: 0.5 }, color: '#bbbbbb' });
        Image.create(this.currentIndex === index ? iconSelected : icon);
        Image.width(24);
        Image.height(24);
        Image.margin(5);
        Image.objectFit(ImageFit.Contain);
        Text.create(title);
        Text.fontColor(this.currentIndex === index ? this.selectedFontColor : this.fontColor);
        Text.fontSize(10);
        Text.fontWeight(500);
        Text.lineHeight(14);
        Text.pop();
        Column.pop();
    }
    render() {
        Column.create();
        Column.width('100%');
        Tabs.create({ barPosition: BarPosition.End, controller: this.controller });
        Tabs.vertical(false);
        Tabs.barMode(BarMode.Fixed);
        Tabs.barWidth('100%');
        Tabs.barHeight(66);
        Tabs.onChange((index: number) => {
            this.currentIndex = index;
            this.changeLFS();
        });
        TabContent.create();
        TabContent.tabBar({ builder: () => {
                this.TabBarBuilder.call(this, 0, '首页', $r('app.media.ic_home_normal'), $r('app.media.ic_home_active'));
            } });
        let earlierCreatedChild_2: Home = (this && this.findChildById) ? this.findChildById("2") as Home : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new Home("2", this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
        TabContent.pop();
        TabContent.create();
        TabContent.tabBar({ builder: () => {
                this.TabBarBuilder.call(this, 1, '应用', $r('app.media.ic_app_normal'), $r('app.media.ic_app_active'));
            } });
        let earlierCreatedChild_3: App = (this && this.findChildById) ? this.findChildById("3") as App : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new App("3", this, { appType: AppType.APP }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                appType: AppType.APP
            });
            View.create(earlierCreatedChild_3);
        }
        TabContent.pop();
        TabContent.create();
        TabContent.tabBar({ builder: () => {
                this.TabBarBuilder.call(this, 2, '游戏', $r('app.media.ic_game_normal'), $r('app.media.ic_game_active'));
            } });
        let earlierCreatedChild_4: App = (this && this.findChildById) ? this.findChildById("4") as App : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new App("4", this, { appType: AppType.GAME }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({
                appType: AppType.GAME
            });
            View.create(earlierCreatedChild_4);
        }
        TabContent.pop();
        TabContent.create();
        TabContent.tabBar({ builder: () => {
                this.TabBarBuilder.call(this, 3, '设置', $r('app.media.ic_search_normal'), $r('app.media.ic_search_active'));
            } });
        let earlierCreatedChild_5: Settings = (this && this.findChildById) ? this.findChildById("5") as Settings : undefined;
        if (earlierCreatedChild_5 == undefined) {
            View.create(new Settings("5", this, {}));
        }
        else {
            earlierCreatedChild_5.updateWithValueParams({});
            if (!earlierCreatedChild_5.needsUpdate()) {
                earlierCreatedChild_5.markStatic();
            }
            View.create(earlierCreatedChild_5);
        }
        TabContent.pop();
        Tabs.pop();
        Column.pop();
    }
    changeLFS() {
        if (this.currentIndex == 3) {
            WindowStageUtil.setLayoutFullScreen(globalThis.windowStage, '#f3f4f6', WindowStageUtil.COLOR_BLACK, '#f7f7f7', WindowStageUtil.COLOR_BLACK);
        }
        else {
            WindowStageUtil.setLayoutFullScreen(globalThis.windowStage, WindowStageUtil.COLOR_WHITE, WindowStageUtil.COLOR_BLACK, '#f7f7f7', WindowStageUtil.COLOR_BLACK);
        }
    }
}
loadDocument(new Index("1", undefined, {}));
