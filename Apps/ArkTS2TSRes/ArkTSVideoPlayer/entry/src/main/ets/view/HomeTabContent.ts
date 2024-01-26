interface HomeTabContent_Params {
    currIndex?: number;
    videoList?: Array<VideoBean>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "HomeTabContent_" + ++__generate__Id;
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
import { VideoBean } from '../common/bean/VideoBean';
import { HomeTabContentList } from './HomeTabContentList';
import { HomeTabContentButton } from './HomeTabContentButton';
import { CommonConstants } from '../common/constants/CommonConstants';
export class HomeTabContent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.currIndex = undefined;
        this.__videoList = new ObservedPropertyObject([], this, "videoList");
        this.addProvidedVar("videoList", this.__videoList, false);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: HomeTabContent_Params) {
        if (params.currIndex !== undefined) {
            this.currIndex = params.currIndex;
        }
        if (params.videoList !== undefined) {
            this.videoList = params.videoList;
        }
    }
    aboutToBeDeleted() {
        this.__videoList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private currIndex: number;
    private __videoList: ObservedPropertyObject<Array<VideoBean>>;
    get videoList() {
        return this.__videoList.get();
    }
    set videoList(newValue: Array<VideoBean>) {
        this.__videoList.set(newValue);
    }
    render() {
        Column.create();
        Column.width(CommonConstants.FULL_PERCENT);
        Column.height(CommonConstants.FULL_PERCENT);
        let earlierCreatedChild_2: HomeTabContentList = (this && this.findChildById) ? this.findChildById("2") as HomeTabContentList : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new HomeTabContentList("2", this, { currIndex: this.currIndex }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                currIndex: this.currIndex
            });
            View.create(earlierCreatedChild_2);
        }
        let earlierCreatedChild_3: HomeTabContentButton = (this && this.findChildById) ? this.findChildById("3") as HomeTabContentButton : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new HomeTabContentButton("3", this, { currIndex: this.currIndex }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                currIndex: this.currIndex
            });
            View.create(earlierCreatedChild_3);
        }
        Column.pop();
    }
}
