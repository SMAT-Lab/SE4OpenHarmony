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
import router from '@ohos.router';
import { Capabilities } from './components/Capabilities';
import { MenuList } from '@ohos/menuitems';
import { getString, logger } from '@ohos/common';
const TAG: string = 'Index';
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
        this.title = getContext().resourceManager.getStringSync($r('app.string.lable_name').id);
    }
    render() {
        Navigation.create();
        Navigation.title({ builder: () => {
                this.CustomTitle.call(this);
            } });
        Navigation.mode(this.isSplitMode ? NavigationMode.Split : NavigationMode.Stack);
        Navigation.navBarWidth(0.4 * this.windowWidth);
        Navigation.titleMode(NavigationTitleMode.Mini);
        Navigation.hideToolBar(true);
        Navigation.width('100%');
        Navigation.height('100%');
        Navigation.backgroundColor($r("sys.color.ohos_id_color_sub_background"));
        Divider.create();
        Divider.strokeWidth('1px');
        Divider.color($r('sys.color.ohos_id_color_list_separator'));
        MenuList.create({
            menuList: $r('app.strarray.language_base_class_library_list'),
            addAction: (title: string) => {
                logger.info(TAG, `addAction: title = ${title}`);
                switch (title) {
                    case getString($r('app.string.deque')):
                    case getString($r('app.string.linked_list')):
                    case getString($r('app.string.list')):
                    case getString($r('app.string.queue')):
                    case getString($r('app.string.stack')):
                    case getString($r('app.string.vector')):
                    case getString($r('app.string.array_list')):
                        router.pushUrl({ url: 'pages/AddInformationView', params: { 'title': title } });
                        break;
                    case getString($r('app.string.hash_map')):
                    case getString($r('app.string.light_weight_map')):
                    case getString($r('app.string.plain_array')):
                    case getString($r('app.string.tree_map')):
                        router.pushUrl({ url: 'pages/AddKeyValuePairView', params: { 'title': title } });
                        break;
                    case getString($r('app.string.hash_set')):
                    case getString($r('app.string.light_weight_set')):
                    case getString($r('app.string.tree_set')):
                        router.pushUrl({ url: 'pages/AddStringView', params: { 'title': title } });
                        break;
                }
            }
        });
        let earlierCreatedChild_2: Capabilities = (this && this.findChildById) ? this.findChildById("2") as Capabilities : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new Capabilities("2", this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
        Navigation.pop();
    }
    CustomTitle(parent = null) {
        Row.create();
        Row.height(56);
        Row.width('100%');
        Text.create(this.title);
        Text.fontColor($r('app.color.black'));
        Text.fontSize(26);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
