interface Index_Params {
    windowWidth?: number;
    isSplitMode?: boolean;
    title?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
import { Capabilities } from './components/Capabilities';
import { MenuList } from '@ohos/menuitems';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__windowWidth = AppStorage.SetAndProp('windowWidth', 300, this, "windowWidth");
        this.__isSplitMode = AppStorage.SetAndProp('isSplitMode', false, this, "isSplitMode");
        this.__title = new ObservedPropertySimple('', this, "title");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.title !== undefined) {
            this.title = params.title;
        }
    }
    aboutToBeDeleted() {
        this.__windowWidth.aboutToBeDeleted();
        this.__isSplitMode.aboutToBeDeleted();
        this.__title.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __windowWidth: ObservedPropertyAbstract<number>;
    get windowWidth() {
        return this.__windowWidth.get();
    }
    set windowWidth(newValue: number) {
        this.__windowWidth.set(newValue);
    }
    private __isSplitMode: ObservedPropertyAbstract<boolean>;
    get isSplitMode() {
        return this.__isSplitMode.get();
    }
    set isSplitMode(newValue: boolean) {
        this.__isSplitMode.set(newValue);
    }
    private __title: ObservedPropertySimple<string>;
    get title() {
        return this.__title.get();
    }
    set title(newValue: string) {
        this.__title.set(newValue);
    }
    aboutToAppear() {
        this.title = getContext().resourceManager.getStringSync($r('app.string.device_management').id);
    }
    render() {
        Navigation.create();
        Navigation.title({ builder: () => {
                this.CustomTitle.call(this);
            } });
        Navigation.mode(this.isSplitMode ? NavigationMode.Split : NavigationMode.Stack);
        Navigation.navBarWidth(0.4 * this.windowWidth);
        Navigation.titleMode(NavigationTitleMode.Full);
        Navigation.hideToolBar(true);
        Navigation.width('100%');
        Navigation.height('100%');
        Navigation.backgroundColor($r("app.color.list_background"));
        Column.create();
        Column.padding(16);
        MenuList.create({ menuList: $r('app.strarray.device_management_list') });
        let earlierCreatedChild_2: Capabilities = (this && this.findChildById) ? this.findChildById("2") as Capabilities : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new Capabilities("2", this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
        Column.pop();
        Navigation.pop();
    }
    CustomTitle(parent = null) {
        Row.create();
        Row.width('100%');
        Row.height('100%');
        Row.alignItems(VerticalAlign.Bottom);
        Text.create(this.title);
        Text.fontColor($r("app.color.list_title"));
        Text.fontSize(26);
        Text.fontWeight(FontWeight.Medium);
        Text.padding({ left: 16 });
        Text.margin({ bottom: 10 });
        Text.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
