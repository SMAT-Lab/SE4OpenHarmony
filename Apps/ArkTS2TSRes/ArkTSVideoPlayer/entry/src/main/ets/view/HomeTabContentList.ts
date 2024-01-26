interface HomeTabContentList_Params {
    currIndex?: number;
    videoList?: Array<VideoBean>;
    item?: VideoBean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "HomeTabContentList_" + ++__generate__Id;
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
import Logger from '../common/util/Logger';
import { VideoBean } from '../common/bean/VideoBean';
import HomeVideoListModel from '../viewmodel/HomeVideoListModel';
import { HomeConstants } from '../common/constants/HomeConstants';
import { CommonConstants } from '../common/constants/CommonConstants';
import { HomeTabContentListItem } from './HomeTabContentListItem';
export class HomeTabContentList extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.currIndex = undefined;
        this.__videoList = this.initializeConsume("videoList", "videoList");
        this.__item = new ObservedPropertyObject(undefined, this, "item");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: HomeTabContentList_Params) {
        if (params.currIndex !== undefined) {
            this.currIndex = params.currIndex;
        }
        if (params.item !== undefined) {
            this.item = params.item;
        }
    }
    aboutToBeDeleted() {
        this.__videoList.aboutToBeDeleted();
        this.__item.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private currIndex: number;
    private __videoList: SynchedPropertySimpleOneWay<Array<VideoBean>>;
    get videoList() {
        return this.__videoList.get();
    }
    set videoList(newValue: Array<VideoBean>) {
        this.__videoList.set(newValue);
    }
    private __item: ObservedPropertyObject<VideoBean>;
    get item() {
        return this.__item.get();
    }
    set item(newValue: VideoBean) {
        this.__item.set(newValue);
    }
    async aboutToAppear() {
        if (this.currIndex === CommonConstants.TYPE_LOCAL) {
            this.videoList = await HomeVideoListModel.getLocalVideo();
        }
        else {
            this.videoList = globalThis.videoInternetList;
        }
    }
    render() {
        Column.create();
        Column.width(HomeConstants.HOME_TAB_LIST.COLUMN_WIDTH);
        Column.height(CommonConstants.NINETY_PERCENT);
        List.create({
            space: HomeConstants.HOME_TAB_LIST.LIST_SPACE,
            initialIndex: HomeConstants.HOME_TAB_LIST.LIST_INITIAL_INDEX
        });
        List.backgroundColor(Color.White);
        List.borderRadius($r('app.float.list_border_radius'));
        ForEach.create("3", this, ObservedObject.GetRawObject(this.videoList), (item: VideoBean, index: number) => {
            ListItem.create();
            ListItem.onClick(() => {
                globalThis.videoList = this.videoList;
                router.pushUrl({
                    url: CommonConstants.PAGE,
                    params: {
                        src: item.src,
                        index: index,
                        type: this.currIndex
                    }
                }).catch(err => {
                    Logger.error('[IndexTabLocalList] router error: ' + JSON.stringify(err));
                });
            });
            let earlierCreatedChild_2: HomeTabContentListItem = (this && this.findChildById) ? this.findChildById("2") as HomeTabContentListItem : undefined;
            if (earlierCreatedChild_2 == undefined) {
                View.create(new HomeTabContentListItem("2", this, { item: item }));
            }
            else {
                earlierCreatedChild_2.updateWithValueParams({
                    item: item
                });
                if (!earlierCreatedChild_2.needsUpdate()) {
                    earlierCreatedChild_2.markStatic();
                }
                View.create(earlierCreatedChild_2);
            }
            ListItem.pop();
        }, item => JSON.stringify(item));
        ForEach.pop();
        List.pop();
        Column.pop();
    }
}
