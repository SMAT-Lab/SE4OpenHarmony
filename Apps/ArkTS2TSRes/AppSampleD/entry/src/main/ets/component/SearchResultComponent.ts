interface SearchResultComponent_Params {
    scrollerHor_1?: Scroller;
    titleList?: Array<Resource>;
    searchResultList?: Array<SearchResult>;
    inputSearch?: string;
    currSearchResult?: SearchResult;
    selectTopIndex?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SearchResultComponent_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Hunan OpenValley Digital Industry Development Co., Ltd.
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
import Logger from '../utils/Logger';
import { getMockSearchResult, MockInput } from '../mock/MockData';
import { SearchResult } from '../appsampled/data/SearchResult';
import SearchSynthesizeComponent from './SearchSynthesizeComponent';
import SearchVideoComponent from './SearchVideoComponent';
const TAG: string = '[SearchResultComponent]';
export default class SearchResultComponent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.scrollerHor_1 = new Scroller();
        this.titleList = [$r('app.string.Synthesize'), $r('app.string.Video'), $r('app.string.Music'),
            $r('app.string.User'), $r('app.string.Commodity'), $r('app.string.Live_streaming')];
        this.searchResultList = getMockSearchResult();
        this.inputSearch = '';
        this.__currSearchResult = new ObservedPropertyObject(this.searchResultList[0], this, "currSearchResult");
        this.__selectTopIndex = new ObservedPropertySimple(0, this, "selectTopIndex");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SearchResultComponent_Params) {
        if (params.scrollerHor_1 !== undefined) {
            this.scrollerHor_1 = params.scrollerHor_1;
        }
        if (params.titleList !== undefined) {
            this.titleList = params.titleList;
        }
        if (params.searchResultList !== undefined) {
            this.searchResultList = params.searchResultList;
        }
        if (params.inputSearch !== undefined) {
            this.inputSearch = params.inputSearch;
        }
        if (params.currSearchResult !== undefined) {
            this.currSearchResult = params.currSearchResult;
        }
        if (params.selectTopIndex !== undefined) {
            this.selectTopIndex = params.selectTopIndex;
        }
    }
    aboutToBeDeleted() {
        this.__currSearchResult.aboutToBeDeleted();
        this.__selectTopIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private scrollerHor_1: Scroller;
    private titleList: Array<Resource>;
    private searchResultList: Array<SearchResult>; // mock
    private inputSearch: string; // 搜索输入框输入的字符串
    private __currSearchResult: ObservedPropertyObject<SearchResult>; // mock
    get currSearchResult() {
        return this.__currSearchResult.get();
    }
    set currSearchResult(newValue: SearchResult) {
        this.__currSearchResult.set(newValue);
    }
    private __selectTopIndex: ObservedPropertySimple<number>; // 综合、视频等title选择索引
    get selectTopIndex() {
        return this.__selectTopIndex.get();
    }
    set selectTopIndex(newValue: number) {
        this.__selectTopIndex.set(newValue);
    }
    aboutToAppear() {
        // 默认值
        if (this.inputSearch === '') {
            this.inputSearch = MockInput.TEST_INPUT_CONTENT_1;
        }
        // 依据不同的搜索展示不同的模拟数据
        Logger.info(TAG, `this.inputSearch: ${JSON.stringify(this.inputSearch)}`);
        if (this.inputSearch.indexOf(MockInput.TEST_INPUT_CONTENT_1) !== -1) {
            // 输入"黑夜问白天"的模拟数据
            this.currSearchResult = this.searchResultList[0];
        }
        else if (this.inputSearch.indexOf(MockInput.TEST_INPUT_CONTENT_2) !== -1) {
            // 输入"哦想"的模拟数据
            this.currSearchResult = this.searchResultList[1];
        }
        else if (this.inputSearch.indexOf(MockInput.TEST_INPUT_CONTENT_3) !== -1) {
            // 输入"我不愿让你一个人"的模拟数据
            this.currSearchResult = this.searchResultList[2];
        }
        Logger.info(TAG, `this.currSearchResult: ${JSON.stringify(this.currSearchResult)}`);
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor($r('app.color.COLOR_151724'));
        Row.create();
        Row.width('100%');
        Row.height('6%');
        Row.padding({ left: 8, right: 6 });
        Row.justifyContent(FlexAlign.Start);
        Row.backgroundColor($r('app.color.COLOR_151724'));
        // 横向Label列表
        Scroll.create(this.scrollerHor_1);
        // 横向Label列表
        Scroll.scrollable(ScrollDirection.Horizontal);
        // 横向Label列表
        Scroll.scrollBar(BarState.Off);
        // 横向Label列表
        Scroll.width('90%');
        // 横向Label列表
        Scroll.height('100%');
        Row.create();
        Row.height('100%');
        Row.justifyContent(FlexAlign.Start);
        ForEach.create("2", this, ObservedObject.GetRawObject(this.titleList), (title: Resource, index: number) => {
            Column.create();
            Column.id(`titleID_${index + 1}`);
            Column.width(78);
            Column.height('100%');
            Column.onClick(e => {
                this.selectTopIndex = index;
            });
            Text.create(title);
            Text.width(60);
            Text.height(20);
            Text.fontColor(this.selectTopIndex === index ? $r('app.color.COLOR_FFFFFF') : $r('app.color.COLOR_CCFFFFFF'));
            Text.fontSize(18);
            Text.fontFamily($r('app.string.Font_family_medium'));
            Text.textAlign(TextAlign.Center);
            Text.pop();
            Divider.create();
            Divider.vertical(false);
            Divider.height(20);
            Divider.width(60);
            Divider.strokeWidth(3);
            Divider.color($r('app.color.COLOR_D7B837'));
            Divider.visibility(this.selectTopIndex === index ? Visibility.Visible : Visibility.Hidden);
            Column.pop();
        });
        ForEach.pop();
        Row.pop();
        // 横向Label列表
        Scroll.pop();
        Row.create();
        Row.width('10%');
        Row.height('100%');
        Row.justifyContent(FlexAlign.Center);
        Row.alignItems(VerticalAlign.Top);
        Image.create($r('app.media.app_icon'));
        Image.width(18);
        Image.height(18);
        Image.objectFit(ImageFit.Contain);
        Image.margin({ left: 4, top: 2 });
        Row.pop();
        Row.pop();
        Divider.create();
        Divider.vertical(false);
        Divider.height(1);
        Divider.width('100%');
        Divider.color($r('app.color.COLOR_5A5B63'));
        Column.create();
        Column.width('100%');
        Column.height('94%');
        If.create();
        if (this.selectTopIndex === 0) {
            If.branchId(0);
            let earlierCreatedChild_3: SearchSynthesizeComponent = (this && this.findChildById) ? this.findChildById("3") as SearchSynthesizeComponent : undefined;
            if (earlierCreatedChild_3 == undefined) {
                View.create(new SearchSynthesizeComponent("3", this, { currSearchResult: this.currSearchResult }));
            }
            else {
                earlierCreatedChild_3.updateWithValueParams({
                    currSearchResult: this.currSearchResult
                });
                View.create(earlierCreatedChild_3);
            }
        }
        else if (this.selectTopIndex === 1) {
            If.branchId(1);
            let earlierCreatedChild_4: SearchVideoComponent = (this && this.findChildById) ? this.findChildById("4") as SearchVideoComponent : undefined;
            if (earlierCreatedChild_4 == undefined) {
                View.create(new SearchVideoComponent("4", this, { currSearchResult: this.currSearchResult }));
            }
            else {
                earlierCreatedChild_4.updateWithValueParams({
                    currSearchResult: this.currSearchResult
                });
                View.create(earlierCreatedChild_4);
            }
        }
        If.pop();
        Column.pop();
        Column.pop();
    }
}
