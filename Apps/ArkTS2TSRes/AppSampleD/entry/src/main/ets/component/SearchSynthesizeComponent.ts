interface SearchSynthesizeComponent_Params {
    scrollerHor?: Scroller;
    scrollerVer?: Scroller;
    currSearchResult?: SearchResult;
    selectTopIndex?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SearchSynthesizeComponent_" + ++__generate__Id;
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
import { AudioInfo, SearchResult, VideoDetailInfo } from '../appsampled/data/SearchResult';
import SearchPlayMusicComponent from './SearchPlayMusicComponent';
import SearchPlayVideoComponent from './SearchPlayVideoComponent';
import Logger from '../utils/Logger';
const TAG: string = '[SearchSynthesizeComponent]';
export default class SearchSynthesizeComponent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.scrollerHor = new Scroller();
        this.scrollerVer = new Scroller();
        this.currSearchResult = undefined;
        this.__selectTopIndex = new ObservedPropertySimple(0, this, "selectTopIndex");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SearchSynthesizeComponent_Params) {
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
        // 音乐列表
        Column.create();
        // 音乐列表
        Column.width('100%');
        // 音乐列表
        Column.justifyContent(FlexAlign.Start);
        // 音乐列表
        Column.padding({ left: 14, right: 14 });
        // 音乐 Title
        Row.create();
        // 音乐 Title
        Row.width('100%');
        // 音乐 Title
        Row.height(40);
        // 音乐 Title
        Row.margin({ top: 10 });
        Text.create($r('app.string.Music'));
        Text.width(60);
        Text.height(20);
        Text.fontColor($r('app.color.COLOR_FFFFFF'));
        Text.fontSize(18);
        Text.fontFamily($r('app.string.Font_family_medium'));
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Blank.create();
        Blank.pop();
        Image.create($r('app.media.app_icon'));
        Image.width(22);
        Image.height(30);
        Image.objectFit(ImageFit.Contain);
        Image.create($r('app.media.app_icon'));
        Image.width(18);
        Image.height(18);
        Image.objectFit(ImageFit.Contain);
        Image.margin({ left: 25, right: 14 });
        // 音乐 Title
        Row.pop();
        // 模拟数据 音乐列表
        ForEach.create("4", this, ObservedObject.GetRawObject(this.currSearchResult?.audioInfoList), (audioInfo: AudioInfo) => {
            let earlierCreatedChild_3: SearchPlayMusicComponent = (this && this.findChildById) ? this.findChildById("3") as SearchPlayMusicComponent : undefined;
            if (earlierCreatedChild_3 == undefined) {
                View.create(new SearchPlayMusicComponent("3", this, { audioInfo: audioInfo }));
            }
            else {
                earlierCreatedChild_3.updateWithValueParams({
                    audioInfo: audioInfo
                });
                View.create(earlierCreatedChild_3);
            }
        });
        // 模拟数据 音乐列表
        ForEach.pop();
        // 音乐列表
        Column.pop();
        // 模拟数据 视频详细信息列表
        Column.create();
        // 模拟数据 视频详细信息列表
        Column.width('100%');
        // 模拟数据 视频详细信息列表
        Column.justifyContent(FlexAlign.Start);
        ForEach.create("6", this, ObservedObject.GetRawObject(this.currSearchResult?.videoDetailInfo), (videoDetailInfo: VideoDetailInfo) => {
            Divider.create();
            Divider.vertical(false);
            Divider.height(10);
            Divider.width('100%');
            Divider.strokeWidth(8);
            Divider.color($r('app.color.COLOR_000000'));
            Column.create();
            Column.width('100%');
            Column.padding({ left: 14, right: 14 });
            let earlierCreatedChild_5: SearchPlayVideoComponent = (this && this.findChildById) ? this.findChildById("5") as SearchPlayVideoComponent : undefined;
            if (earlierCreatedChild_5 == undefined) {
                View.create(new SearchPlayVideoComponent("5", this, { videoDetailInfo: videoDetailInfo }));
            }
            else {
                earlierCreatedChild_5.updateWithValueParams({
                    videoDetailInfo: videoDetailInfo
                });
                View.create(earlierCreatedChild_5);
            }
            Column.pop();
        });
        ForEach.pop();
        // 模拟数据 视频详细信息列表
        Column.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
}
