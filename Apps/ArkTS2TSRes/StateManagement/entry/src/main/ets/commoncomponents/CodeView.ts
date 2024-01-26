interface CodeView_Params {
    contentView?: () => void;
    title?: Resource;
    sideBarShow?: boolean;
    webSrc?: Resource;
    curBp?: string;
    isShowTitle?: boolean;
    controller?: webView.WebviewController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CodeView_" + ++__generate__Id;
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
import webView from '@ohos.web.webview';
import { TitleBar } from './TitleBar';
export class CodeView extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.contentView = undefined;
        this.__title = new SynchedPropertyObjectTwoWay(params.title, this, "title");
        this.__sideBarShow = AppStorage.SetAndLink('sideBarShow', false, this, "sideBarShow");
        this.__webSrc = AppStorage.SetAndLink('webSrc', { "id": 0, "type": 30000, params: ['BaseTypeCode.ets.html'] }, this, "webSrc");
        this.__curBp = AppStorage.SetAndLink('currentBreakpoint', 'sm', this, "curBp");
        this.isShowTitle = true;
        this.controller = new webView.WebviewController();
        this.updateWithValueParams(params);
        this.declareWatch("webSrc", this.webSrcChange);
    }
    updateWithValueParams(params: CodeView_Params) {
        if (params.contentView !== undefined) {
            this.contentView = params.contentView;
        }
        if (params.isShowTitle !== undefined) {
            this.isShowTitle = params.isShowTitle;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    aboutToBeDeleted() {
        this.__title.aboutToBeDeleted();
        this.__sideBarShow.aboutToBeDeleted();
        this.__webSrc.aboutToBeDeleted();
        this.__curBp.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __contentView;
    private __title: SynchedPropertySimpleOneWay<Resource>;
    get title() {
        return this.__title.get();
    }
    set title(newValue: Resource) {
        this.__title.set(newValue);
    }
    private __sideBarShow: ObservedPropertyAbstract<boolean>;
    get sideBarShow() {
        return this.__sideBarShow.get();
    }
    set sideBarShow(newValue: boolean) {
        this.__sideBarShow.set(newValue);
    }
    private __webSrc: ObservedPropertyAbstract<Resource>;
    get webSrc() {
        return this.__webSrc.get();
    }
    set webSrc(newValue: Resource) {
        this.__webSrc.set(newValue);
    }
    private __curBp: ObservedPropertyAbstract<string>;
    get curBp() {
        return this.__curBp.get();
    }
    set curBp(newValue: string) {
        this.__curBp.set(newValue);
    }
    private isShowTitle: boolean;
    private controller: webView.WebviewController;
    webSrcChange(): void {
        this.controller.loadUrl(this.webSrc);
    }
    codeView(parent = null) {
        Column.create({ space: 10 });
        Column.height('100%');
        Column.padding($r('app.float.page_padding'));
        Column.backgroundColor($r('app.color.code_view_background'));
        Text.create($r('app.string.close'));
        Text.fontSize($r('app.float.source_code_font_size'));
        Text.fontColor(Color.White);
        Text.alignSelf(ItemAlign.End);
        Text.id('close');
        Text.onClick(() => {
            this.sideBarShow = !this.sideBarShow;
        });
        Text.pop();
        Column.create();
        Column.height('100%');
        Column.width('100%');
        Column.padding({ bottom: $r('app.float.code_view_bottom') });
        Web.create({ src: this.webSrc, controller: this.controller });
        Web.width('100%');
        Web.height('100%');
        Column.pop();
        Column.pop();
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        If.create();
        if (this.isShowTitle) {
            If.branchId(0);
            let earlierCreatedChild_2: TitleBar = (this && this.findChildById) ? this.findChildById("2") as TitleBar : undefined;
            if (earlierCreatedChild_2 == undefined) {
                View.create(new TitleBar("2", this, { title: this.__title }));
            }
            else {
                earlierCreatedChild_2.updateWithValueParams({});
                View.create(earlierCreatedChild_2);
            }
        }
        If.pop();
        SideBarContainer.create(this.curBp === 'sm' ? SideBarContainerType.Overlay : SideBarContainerType.Embed);
        SideBarContainer.autoHide(false);
        SideBarContainer.showSideBar(this.sideBarShow);
        SideBarContainer.layoutWeight(1);
        SideBarContainer.sideBarWidth('100%');
        SideBarContainer.showControlButton(false);
        SideBarContainer.maxSideBarWidth(this.curBp === 'sm' ? '100%' : '60%');
        SideBarContainer.sideBarPosition(SideBarPosition.End);
        this.codeView(this);
        Scroll.create();
        Scroll.width('100%');
        Scroll.height('100%');
        Scroll.align(Alignment.Top);
        Scroll.scrollBar(BarState.Off);
        this.contentView(this);
        Scroll.pop();
        SideBarContainer.pop();
        Column.pop();
    }
}
