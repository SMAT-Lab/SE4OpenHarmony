interface SearchPage_Params {
    searchArr?: Array<string>;
    inputValue?: string;
    isInput?: boolean;
    isShowResult?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SearchPage_" + ++__generate__Id;
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
import Logger from '../../utils/Logger';
import { getMockSearch } from '../../mock/MockData';
import SearchComponent from '../../component/SearchComponent';
import SearchResultComponent from '../../component/SearchResultComponent';
const TAG: string = '[SearchPage]';
class SearchPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.searchArr = getMockSearch();
        this.__inputValue = new ObservedPropertySimple('', this, "inputValue");
        this.__isInput = new ObservedPropertySimple(false, this, "isInput");
        this.__isShowResult = new ObservedPropertySimple(false, this, "isShowResult");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SearchPage_Params) {
        if (params.searchArr !== undefined) {
            this.searchArr = params.searchArr;
        }
        if (params.inputValue !== undefined) {
            this.inputValue = params.inputValue;
        }
        if (params.isInput !== undefined) {
            this.isInput = params.isInput;
        }
        if (params.isShowResult !== undefined) {
            this.isShowResult = params.isShowResult;
        }
    }
    aboutToBeDeleted() {
        this.__inputValue.aboutToBeDeleted();
        this.__isInput.aboutToBeDeleted();
        this.__isShowResult.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private searchArr: Array<string>;
    private __inputValue: ObservedPropertySimple<string>;
    get inputValue() {
        return this.__inputValue.get();
    }
    set inputValue(newValue: string) {
        this.__inputValue.set(newValue);
    }
    private __isInput: ObservedPropertySimple<boolean>;
    get isInput() {
        return this.__isInput.get();
    }
    set isInput(newValue: boolean) {
        this.__isInput.set(newValue);
    }
    private __isShowResult: ObservedPropertySimple<boolean>;
    get isShowResult() {
        return this.__isShowResult.get();
    }
    set isShowResult(newValue: boolean) {
        this.__isShowResult.set(newValue);
    }
    pageTransition() {
        PageTransition.create();
        // 登录页面从底部滑入滑出
        PageTransitionEnter.create({ type: RouteType.Push, duration: 10 });
        // 登录页面从底部滑入滑出
        PageTransitionEnter.slide(SlideEffect.Right);
        PageTransitionExit.create({ type: RouteType.Pop, duration: 10 });
        PageTransitionExit.slide(SlideEffect.Right);
        PageTransition.pop();
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor($r('app.color.COLOR_151724'));
        Row.create();
        Row.width('100%');
        Row.height('10%');
        Row.backgroundColor($r('app.color.COLOR_151724'));
        Row.create();
        Row.id('searchBack');
        Row.width(50);
        Row.height('100%');
        Row.justifyContent(FlexAlign.Center);
        Row.onClick(e => {
            Logger.info(TAG, `ic_cancel_cir onClick`);
            // 如果在搜索结果界面，则返回至搜索界面
            if (this.isShowResult) {
                this.isShowResult = false;
            }
            else {
                // 在搜索界面直接返回上一级页面
                router.back();
            }
        });
        Image.create($r('app.media.app_icon'));
        Image.width(22);
        Image.height(22);
        Image.objectFit(ImageFit.Contain);
        Row.pop();
        Row.create();
        Row.width('75%');
        Row.height('65%');
        Row.backgroundColor($r('app.color.COLOR_393939'));
        Row.borderRadius(4);
        Image.create($r('app.media.app_icon'));
        Image.width(24);
        Image.height(24);
        Image.margin({ left: 10, right: 10 });
        Image.objectFit(ImageFit.Contain);
        TextInput.create({ placeholder: this.searchArr[0], text: this.inputValue });
        TextInput.width('75%');
        TextInput.height('80%');
        TextInput.placeholderColor($r('app.color.COLOR_99F1F3F5'));
        TextInput.fontColor($r('app.color.COLOR_FFFFFF'));
        TextInput.padding({ left: 0 });
        TextInput.onChange(value => {
            Logger.info(TAG, `TextInput onChange value= ${value}`);
            this.inputValue = value;
            if (this.inputValue) {
                this.isInput = true;
            }
            else {
                this.isInput = false;
            }
        });
        Row.create();
        Row.width(50);
        Row.height('100%');
        Row.onClick(e => {
            Logger.info(TAG, `ic_cancel_cir onClick`);
            if (this.inputValue) {
                this.inputValue = '';
            }
        });
        Image.create(this.isInput ? $r('app.media.app_icon') : $r('app.media.app_icon'));
        Image.width(24);
        Image.height(24);
        Image.margin({ left: 10, right: 10 });
        Image.objectFit(ImageFit.Contain);
        Image.opacity(0.8);
        Row.pop();
        Row.pop();
        Column.create();
        Column.width(64);
        Column.height('100%');
        Column.alignItems(HorizontalAlign.Center);
        Column.justifyContent(FlexAlign.Center);
        Column.onClick(e => {
            this.isShowResult = true;
        });
        Text.create($r('app.string.Search'));
        Text.fontColor($r('app.color.COLOR_E3163D'));
        Text.fontSize(18);
        Text.fontFamily($r('app.string.Font_family_medium'));
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Column.pop();
        Row.pop();
        Column.create();
        Column.width('100%');
        Column.height('90%');
        If.create();
        if (this.isShowResult) {
            If.branchId(0);
            let earlierCreatedChild_2: SearchResultComponent = (this && this.findChildById) ? this.findChildById("2") as SearchResultComponent : undefined;
            if (earlierCreatedChild_2 == undefined) {
                // 搜索结果界面
                View.create(new SearchResultComponent("2", this, { inputSearch: this.inputValue }));
            }
            else {
                earlierCreatedChild_2.updateWithValueParams({
                    inputSearch: this.inputValue
                });
                View.create(earlierCreatedChild_2);
            }
        }
        else {
            If.branchId(1);
            let earlierCreatedChild_3: SearchComponent = (this && this.findChildById) ? this.findChildById("3") as SearchComponent : undefined;
            if (earlierCreatedChild_3 == undefined) {
                // 搜索界面
                View.create(new SearchComponent("3", this, { inputValue: this.__inputValue, isShowResult: this.__isShowResult }));
            }
            else {
                earlierCreatedChild_3.updateWithValueParams({});
                View.create(earlierCreatedChild_3);
            }
        }
        If.pop();
        Column.pop();
        Column.pop();
    }
}
loadDocument(new SearchPage("1", undefined, {}));
