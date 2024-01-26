interface NewsList_Params {
    currentIndex?: number;
    newsData?: Array<any>;
    pageSize?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "NewsList_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import { NewsListConstant, FULL_WIDTH, FULL_HEIGHT, PAGE_SIZE } from '../common/constant/CommonConstant';
import NewsItem from './NewsItem';
import NewsViewModel from '../viewmodel/NewsViewModel';
import router from '@ohos.router';
export default class NewsList extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__currentIndex = new SynchedPropertySimpleTwoWay(params.currentIndex, this, "currentIndex");
        this.__newsData = new ObservedPropertyObject([], this, "newsData");
        this.__pageSize = new ObservedPropertySimple(PAGE_SIZE, this, "pageSize");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: NewsList_Params) {
        if (params.newsData !== undefined) {
            this.newsData = params.newsData;
        }
        if (params.pageSize !== undefined) {
            this.pageSize = params.pageSize;
        }
    }
    aboutToBeDeleted() {
        this.__currentIndex.aboutToBeDeleted();
        this.__newsData.aboutToBeDeleted();
        this.__pageSize.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __currentIndex: SynchedPropertySimpleTwoWay<number>;
    get currentIndex() {
        return this.__currentIndex.get();
    }
    set currentIndex(newValue: number) {
        this.__currentIndex.set(newValue);
    }
    private __newsData: ObservedPropertyObject<Array<any>>;
    get newsData() {
        return this.__newsData.get();
    }
    set newsData(newValue: Array<any>) {
        this.__newsData.set(newValue);
    }
    private __pageSize: ObservedPropertySimple<number>;
    get pageSize() {
        return this.__pageSize.get();
    }
    set pageSize(newValue: number) {
        this.__pageSize.set(newValue);
    }
    changeCategory() {
        this.newsData = NewsViewModel.getNewsList(this.currentIndex, this.pageSize);
    }
    aboutToAppear() {
        // Request news data.
        this.changeCategory();
    }
    render() {
        Column.create();
        Column.width(FULL_WIDTH);
        Column.height(FULL_HEIGHT);
        Column.justifyContent(FlexAlign.Center);
        this.ListLayout(this);
        Column.pop();
    }
    ListLayout(parent = null) {
        List.create();
        List.width(NewsListConstant.LIST_WIDTH);
        List.height(FULL_HEIGHT);
        List.margin({ left: NewsListConstant.LIST_MARGIN_LEFT, right: NewsListConstant.LIST_MARGIN_RIGHT });
        List.backgroundColor($r('app.color.listColor'));
        List.divider({
            color: $r('app.color.dividerColor'),
            strokeWidth: NewsListConstant.LIST_DIVIDER_STROKE_WIDTH,
            endMargin: NewsListConstant.LIST_MARGIN_RIGHT
        });
        ForEach.create("3", this, ObservedObject.GetRawObject(this.newsData), item => {
            ListItem.create();
            ListItem.height(NewsListConstant.ITEM_HEIGHT);
            ListItem.backgroundColor($r('app.color.white'));
            ListItem.margin({ top: NewsListConstant.ITEM_MARGIN_TOP });
            ListItem.borderRadius(NewsListConstant.ITEM_BORDER_RADIUS);
            ListItem.onClick(() => {
                router.pushUrl({
                    url: 'pages/DetailPage',
                    params: {
                        id: item.id
                    }
                });
            });
            let earlierCreatedChild_2: NewsItem = ((parent ? parent : this) && (parent ? parent : this).findChildById) ? (parent ? parent : this).findChildById(generateId()) as NewsItem : undefined;
            if (earlierCreatedChild_2 == undefined) {
                View.create(new NewsItem("NewsList_" + __generate__Id, parent ? parent : this, { newsData: item }));
            }
            else {
                earlierCreatedChild_2.updateWithValueParams({
                    newsData: item
                });
                if (!earlierCreatedChild_2.needsUpdate()) {
                    earlierCreatedChild_2.markStatic();
                }
                View.create(earlierCreatedChild_2);
            }
            ListItem.pop();
        }, (item, index) => JSON.stringify(item) + index.toString());
        ForEach.pop();
        List.pop();
    }
}
