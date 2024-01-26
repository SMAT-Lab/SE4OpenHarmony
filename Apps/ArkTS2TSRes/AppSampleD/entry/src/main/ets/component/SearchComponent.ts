interface SearchComponent_Params {
    scroller?: Scroller;
    searchArr?: Array<string>;
    inputValue?: string;
    isShowResult?: boolean // 点击Item改变此值以展示搜索结果页面
    ;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SearchComponent_" + ++__generate__Id;
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
import Logger from '../utils/Logger';
import { getMockSearch } from '../mock/MockData';
const TAG: string = '[SearchComponent]';
export default class SearchComponent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.scroller = new Scroller();
        this.searchArr = getMockSearch();
        this.__inputValue = new SynchedPropertySimpleTwoWay(params.inputValue, this, "inputValue");
        this.__isShowResult = new SynchedPropertySimpleTwoWay(params.isShowResult, this, "isShowResult");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SearchComponent_Params) {
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.searchArr !== undefined) {
            this.searchArr = params.searchArr;
        }
    }
    aboutToBeDeleted() {
        this.__inputValue.aboutToBeDeleted();
        this.__isShowResult.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private scroller: Scroller;
    private searchArr: Array<string>;
    private __inputValue: SynchedPropertySimpleTwoWay<string>;
    get inputValue() {
        return this.__inputValue.get();
    }
    set inputValue(newValue: string) {
        this.__inputValue.set(newValue);
    }
    private __isShowResult: SynchedPropertySimpleTwoWay<boolean>; // 点击Item改变此值以展示搜索结果页面
    get isShowResult() {
        return this.__isShowResult.get();
    }
    set isShowResult(newValue: boolean // 点击Item改变此值以展示搜索结果页面
    ) {
        this.__isShowResult.set(newValue);
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor($r('app.color.COLOR_151724'));
        Scroll.create(this.scroller);
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBar(BarState.Off);
        Scroll.width('100%');
        Scroll.height('45%');
        Scroll.align(Alignment.Top);
        Column.create({ space: 4 });
        Column.width('100%');
        ForEach.create("2", this, ObservedObject.GetRawObject(this.searchArr), (item: string, index: number) => {
            Row.create();
            Row.id(`searchItem_${index + 1}`);
            Row.width('100%');
            Row.height(40);
            Row.onClick(e => {
                // 只有前三条拥有对应的假数据，其他item不做处理
                if (index < 3) {
                    this.inputValue = item;
                    this.isShowResult = true;
                }
            });
            Image.create($r('app.media.app_icon'));
            Image.width(18);
            Image.height(18);
            Image.objectFit(ImageFit.Contain);
            Image.margin({ left: 14, right: 10 });
            Image.opacity(0.8);
            Text.create(item);
            Text.height(20);
            Text.fontColor($r('app.color.COLOR_CCFFFFFF'));
            Text.fontSize(20);
            Text.fontFamily($r('app.string.Font_family_medium'));
            Text.textAlign(TextAlign.Center);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.margin({ right: 12 });
            Text.pop();
            Blank.create();
            Blank.pop();
            Image.create($r('app.media.app_icon'));
            Image.width(16);
            Image.height(16);
            Image.objectFit(ImageFit.Contain);
            Image.margin({ right: 14 });
            Image.opacity(0.7);
            Row.pop();
        });
        ForEach.pop();
        Column.pop();
        Scroll.pop();
        Column.create({ space: 12 });
        Column.width('100%');
        Column.height(30);
        Column.margin({ top: 10 });
        Column.justifyContent(FlexAlign.Center);
        Column.alignItems(HorizontalAlign.Center);
        Text.create($r('app.string.Clear_all_search_record'));
        Text.fontColor($r('app.color.COLOR_5A5B63'));
        Text.fontSize(18);
        Text.fontFamily($r('app.string.Font_family_medium'));
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Divider.create();
        Divider.vertical(false);
        Divider.height(1);
        Divider.width('90%');
        Divider.color($r('app.color.COLOR_5A5B63'));
        Column.pop();
        Column.pop();
    }
}
