interface Index_Params {
    tabsIndex?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { NotificationList } from '../components/NotificationList';
import { NoticePublish } from '../components/NotificationPublish';
export interface TabImage {
    selectedImage: Resource;
    unselectedImage: Resource;
}
const MESSAGE_TAB: TabImage = {
    selectedImage: $r('app.media.ic_messages_filled'),
    unselectedImage: $r('app.media.ic_messages'),
};
const NOTIFICATION_TAB: TabImage = {
    selectedImage: $r('app.media.ic_public_send_filled'),
    unselectedImage: $r('app.media.ic_public_send'),
};
interface TAB_INDEX_TYPE {
    MESSAGE_TAB: number;
    NOTIFICATION_TAB: number;
}
const TAB_INDEX: TAB_INDEX_TYPE = {
    MESSAGE_TAB: 0,
    NOTIFICATION_TAB: 1
};
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__tabsIndex = new ObservedPropertySimple(0, this, "tabsIndex");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.tabsIndex !== undefined) {
            this.tabsIndex = params.tabsIndex;
        }
    }
    aboutToBeDeleted() {
        this.__tabsIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __tabsIndex: ObservedPropertySimple<number>;
    get tabsIndex() {
        return this.__tabsIndex.get();
    }
    set tabsIndex(newValue: number) {
        this.__tabsIndex.set(newValue);
    }
    TabBarBuilder(index: number, item: TabImage, tabBarName: Resource, parent = null) {
        Column.create();
        Column.width('100%');
        Column.padding({ top: 0, bottom: 0 });
        Column.alignItems(HorizontalAlign.Center);
        Column.id(`tabBar${index}`);
        Image.create(this.tabsIndex === index ? item.selectedImage : item.unselectedImage);
        Image.width(24);
        Image.height(24);
        Image.margin({ bottom: 10 });
        Text.create(tabBarName);
        Text.fontSize(10);
        Text.pop();
        Column.pop();
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor($r('app.color.background_light_gray'));
        Tabs.create({ barPosition: BarPosition.End });
        Tabs.barHeight(74);
        Tabs.barWidth('100%');
        Tabs.vertical(false);
        Tabs.onChange((index: number) => {
            this.tabsIndex = index;
        });
        TabContent.create();
        TabContent.tabBar({ builder: () => {
                this.TabBarBuilder.call(this, TAB_INDEX.MESSAGE_TAB, MESSAGE_TAB, $r('app.string.messages_list_title'));
            } });
        Column.create();
        Column.height('100%');
        If.create();
        if (this.tabsIndex === TAB_INDEX.MESSAGE_TAB) {
            If.branchId(0);
            let earlierCreatedChild_2: NotificationList = (this && this.findChildById) ? this.findChildById("2") as NotificationList : undefined;
            if (earlierCreatedChild_2 == undefined) {
                View.create(new NotificationList("2", this, {}));
            }
            else {
                earlierCreatedChild_2.updateWithValueParams({});
                View.create(earlierCreatedChild_2);
            }
        }
        If.pop();
        Blank.create();
        Blank.pop();
        Column.pop();
        TabContent.pop();
        TabContent.create();
        TabContent.tabBar({ builder: () => {
                this.TabBarBuilder.call(this, TAB_INDEX.NOTIFICATION_TAB, NOTIFICATION_TAB, $r('app.string.notification_publish_title'));
            } });
        Column.create();
        Column.height('100%');
        let earlierCreatedChild_3: NoticePublish = (this && this.findChildById) ? this.findChildById("3") as NoticePublish : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new NoticePublish("3", this, {}));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({});
            if (!earlierCreatedChild_3.needsUpdate()) {
                earlierCreatedChild_3.markStatic();
            }
            View.create(earlierCreatedChild_3);
        }
        Blank.create();
        Blank.pop();
        Column.pop();
        TabContent.pop();
        Tabs.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
