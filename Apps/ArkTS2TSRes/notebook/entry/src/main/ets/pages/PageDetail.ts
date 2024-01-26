interface PageDetail_Params {
    noteInfo?: NoteInfo;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "PageDetail_" + ++__generate__Id;
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
import CommonConstants from '../common/constants/CommonConstants';
import NoteInfo from '../common/bean/NoteInfo';
import { DetailTitle } from '../view/DetailTitle';
class PageDetail extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__noteInfo = new ObservedPropertyObject({
            id: 1,
            title: "",
            content: "",
            date: "",
            imageArr: ''
        }, this, "noteInfo");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: PageDetail_Params) {
        if (params.noteInfo !== undefined) {
            this.noteInfo = params.noteInfo;
        }
    }
    aboutToBeDeleted() {
        this.__noteInfo.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __noteInfo: ObservedPropertyObject<NoteInfo>;
    get noteInfo() {
        return this.__noteInfo.get();
    }
    set noteInfo(newValue: NoteInfo) {
        this.__noteInfo.set(newValue);
    }
    render() {
        Column.create();
        Column.width(CommonConstants.FULL_WIDTH);
        Column.height(CommonConstants.FULL_HEIGHT);
        Column.padding({ left: CommonConstants.MARGIN_2, right: CommonConstants.MARGIN_1 });
        Column.backgroundColor($r('app.color.background'));
        let earlierCreatedChild_2: DetailTitle = (this && this.findChildById) ? this.findChildById("2") as DetailTitle : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new DetailTitle("2", this, {
                back: () => {
                    // todo 跳转到编辑页面
                },
                edit: () => {
                    // todo 跳转到编辑页面
                }
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                back: () => {
                    // todo 跳转到编辑页面
                },
                edit: () => {
                    // todo 跳转到编辑页面
                }
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        Scroll.create();
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.layoutWeight(1);
        Scroll.scrollBar(BarState.Off);
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Text.create(this.noteInfo.date + " | " + (this.noteInfo.content.length) + '字');
        Text.margin({
            top: 34
        });
        Text.fontColor($r('app.color.black_40'));
        Text.fontSize(CommonConstants.FONT_SIZE_17);
        Text.pop();
        Text.create(this.noteInfo.title.length == 0 ? '暂无标题' : this.noteInfo.title);
        Text.margin({
            top: 29
        });
        Text.fontColor(this.noteInfo.title.length == 0 ? $r('app.color.black_40') : $r('app.color.black'));
        Text.fontSize(CommonConstants.FONT_SIZE_29);
        Text.pop();
        Text.create(this.noteInfo.content);
        Text.margin({
            top: 35, bottom: 10
        });
        Text.fontSize(CommonConstants.FONT_SIZE_19);
        Text.pop();
        List.create({ space: 10, initialIndex: 0 });
        List.width(CommonConstants.FULL_WIDTH);
        List.height(CommonConstants.FULL_HEIGHT);
        List.enabled(false);
        ForEach.create("3", this, ObservedObject.GetRawObject(this.noteInfo.imageArr.length > 5 ? JSON.parse(this.noteInfo.imageArr) : [""]), (item) => {
            ListItem.create();
            Image.create(item);
            Image.width(CommonConstants.FULL_WIDTH);
            ListItem.pop();
        });
        ForEach.pop();
        List.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
}
loadDocument(new PageDetail("1", undefined, {}));
