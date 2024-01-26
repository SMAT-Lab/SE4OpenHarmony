interface SearchVideoComponent_Params {
    scrollerHor?: Scroller;
    scrollerVer?: Scroller;
    currSearchResult?: SearchResult;
    selectTopIndex?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SearchVideoComponent_" + ++__generate__Id;
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
import { SearchResult, VideoInfo } from '../appsampled/data/SearchResult';
const TAG: string = '[SearchVideoComponent]';
export default class SearchVideoComponent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.scrollerHor = new Scroller();
        this.scrollerVer = new Scroller();
        this.currSearchResult = undefined;
        this.__selectTopIndex = new ObservedPropertySimple(0, this, "selectTopIndex");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SearchVideoComponent_Params) {
        if (params.scrollerHor !== undefined) {
            this.scrollerHor = params.scrollerHor;
        }
        if (params.scrollerVer !== undefined) {
            this.scrollerVer = params.scrollerVer;
        }
        if (params.currSearchResult !== undefined) {
            this.currSearchResult = params.currSearchResult;
        }
        if (params.selectTopIndex !== undefined) {
            this.selectTopIndex = params.selectTopIndex;
        }
    }
    aboutToBeDeleted() {
        this.__selectTopIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private scrollerHor: Scroller;
    private scrollerVer: Scroller;
    private currSearchResult?: SearchResult;
    private __selectTopIndex: ObservedPropertySimple<number>;
    get selectTopIndex() {
        return this.__selectTopIndex.get();
    }
    set selectTopIndex(newValue: number) {
        this.__selectTopIndex.set(newValue);
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor($r('app.color.COLOR_151724'));
        Scroll.create(this.scrollerVer);
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBar(BarState.Off);
        Scroll.width('100%');
        Scroll.height('100%');
        Scroll.align(Alignment.Top);
        Column.create();
        Column.width('100%');
        // 横向Label列表
        Row.create();
        // 横向Label列表
        Row.width('100%');
        // 横向Label列表
        Row.height(60);
        // 横向Label列表
        Row.justifyContent(FlexAlign.Start);
        // 横向Label列表
        Row.padding({ left: 14, right: 8 });
        Scroll.create(this.scrollerHor);
        Scroll.scrollable(ScrollDirection.Horizontal);
        Scroll.scrollBar(BarState.Off);
        Scroll.width('100%');
        Scroll.height('100%');
        Row.create({ space: 8 });
        Row.height('100%');
        Row.justifyContent(FlexAlign.Start);
        // 全部
        Column.create();
        // 全部
        Column.height(40);
        // 全部
        Column.justifyContent(FlexAlign.Center);
        // 全部
        Column.backgroundColor(this.selectTopIndex === 0 ? $r('app.color.COLOR_393939') : $r('app.color.COLOR_99393939'));
        // 全部
        Column.borderRadius(4);
        // 全部
        Column.onClick(e => {
            this.selectTopIndex = 0;
        });
        Text.create($r('app.string.All'));
        Text.height(20);
        Text.fontColor(this.selectTopIndex === 0 ? $r('app.color.COLOR_FFFFFF') : $r('app.color.COLOR_CCFFFFFF'));
        Text.fontSize(16);
        Text.fontFamily($r('app.string.Font_family_medium'));
        Text.textAlign(TextAlign.Center);
        Text.padding({ left: 16, right: 16 });
        Text.pop();
        // 全部
        Column.pop();
        // 模拟数据 label列表
        ForEach.create("2", this, ObservedObject.GetRawObject(this.currSearchResult?.labelList), (title: string, index: number) => {
            Column.create();
            Column.height(40);
            Column.justifyContent(FlexAlign.Center);
            Column.backgroundColor(this.selectTopIndex === (index + 1) ? $r('app.color.COLOR_393939') : $r('app.color.COLOR_99393939'));
            Column.borderRadius(4);
            Column.onClick(e => {
                this.selectTopIndex = index + 1;
            });
            Text.create(title);
            Text.height(20);
            Text.fontColor(this.selectTopIndex === (index + 1) ? $r('app.color.COLOR_FFFFFF') : $r('app.color.COLOR_CCFFFFFF'));
            Text.fontSize(16);
            Text.fontFamily($r('app.string.Font_family_medium'));
            Text.textAlign(TextAlign.Center);
            Text.padding({ left: 16, right: 16 });
            Text.pop();
            Column.pop();
        });
        // 模拟数据 label列表
        ForEach.pop();
        Row.pop();
        Scroll.pop();
        // 横向Label列表
        Row.pop();
        // 视频列表
        GridRow.create({ columns: 2 });
        // 视频列表
        GridRow.width('100%');
        // 模拟数据 音乐列表
        ForEach.create("3", this, ObservedObject.GetRawObject(this.currSearchResult?.videoInfo), (videoInfo: VideoInfo) => {
            GridCol.create();
            GridCol.width('100%');
            GridCol.margin({ right: 1, bottom: 1 });
            this.VideoItem(videoInfo, this);
            GridCol.pop();
        });
        // 模拟数据 音乐列表
        ForEach.pop();
        // 视频列表
        GridRow.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    VideoItem(videoInfo: VideoInfo, parent = null) {
        Stack.create();
        Stack.width('100%');
        Stack.height(280);
        Stack.backgroundColor(Color.Pink);
        Stack.alignContent(Alignment.Bottom);
        Image.create($r('app.media.app_icon'));
        Image.width('100%');
        Image.height('100%');
        Image.objectFit(ImageFit.Fill);
        Image.borderRadius(4);
        Column.create();
        Column.width('100%');
        Column.height(56);
        Column.alignItems(HorizontalAlign.Start);
        Text.create(videoInfo.videoTitle);
        Text.fontColor($r('app.color.COLOR_FFFFFF'));
        Text.fontSize(18);
        Text.fontFamily($r('app.string.Font_family_regular'));
        Text.textAlign(TextAlign.Start);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.padding({ left: 6, right: 6 });
        Text.pop();
        Row.create({ space: 5 });
        Row.width('100%');
        Row.height(30);
        Row.padding({ left: 6, right: 6 });
        Image.create($r('app.media.app_icon'));
        Image.width(24);
        Image.height(24);
        Image.objectFit(ImageFit.Contain);
        Image.borderRadius(12);
        Text.create(videoInfo.videoAuthorName);
        Text.fontColor($r('app.color.COLOR_FFFFFF'));
        Text.fontSize(18);
        Text.fontFamily($r('app.string.Font_family_regular'));
        Text.textAlign(TextAlign.Start);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.pop();
        Blank.create();
        Blank.pop();
        Image.create($r('app.media.app_icon'));
        Image.width(24);
        Image.height(24);
        Image.objectFit(ImageFit.Contain);
        Image.borderRadius(12);
        Text.create(videoInfo.videoLikeNum);
        Text.fontColor($r('app.color.COLOR_FFFFFF'));
        Text.fontSize(18);
        Text.fontFamily($r('app.string.Font_family_regular'));
        Text.textAlign(TextAlign.Start);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.pop();
        Row.pop();
        Column.pop();
        Stack.pop();
    }
}
