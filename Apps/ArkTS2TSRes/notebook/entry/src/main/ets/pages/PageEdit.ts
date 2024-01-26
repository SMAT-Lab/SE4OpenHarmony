interface PageEdit_Params {
    noteInfo?: NoteInfo;
    oldNoteInfo?: NoteInfo;
    change?: boolean;
    imageArray?: string[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "PageEdit_" + ++__generate__Id;
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
import { EditTitle } from '../view/EditTitle';
import DateUtil from '../common/utils/DateUtil';
class PageEdit extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__noteInfo = new ObservedPropertyObject({
            id: 1,
            title: "",
            content: "",
            date: "",
            imageArr: ''
        }, this, "noteInfo");
        this.__oldNoteInfo = new ObservedPropertyObject({
            id: 1,
            title: "",
            content: "",
            date: "",
            imageArr: ''
        }, this, "oldNoteInfo");
        this.__change = new ObservedPropertySimple(false, this, "change");
        this.__imageArray = new ObservedPropertyObject(this.noteInfo.imageArr.length > 5 ? JSON.parse(this.noteInfo.imageArr) : [], this, "imageArray");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: PageEdit_Params) {
        if (params.noteInfo !== undefined) {
            this.noteInfo = params.noteInfo;
        }
        if (params.oldNoteInfo !== undefined) {
            this.oldNoteInfo = params.oldNoteInfo;
        }
        if (params.change !== undefined) {
            this.change = params.change;
        }
        if (params.imageArray !== undefined) {
            this.imageArray = params.imageArray;
        }
    }
    aboutToBeDeleted() {
        this.__noteInfo.aboutToBeDeleted();
        this.__oldNoteInfo.aboutToBeDeleted();
        this.__change.aboutToBeDeleted();
        this.__imageArray.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __noteInfo: ObservedPropertyObject<NoteInfo>;
    get noteInfo() {
        return this.__noteInfo.get();
    }
    set noteInfo(newValue: NoteInfo) {
        this.__noteInfo.set(newValue);
    }
    private __oldNoteInfo: ObservedPropertyObject<NoteInfo>;
    get oldNoteInfo() {
        return this.__oldNoteInfo.get();
    }
    set oldNoteInfo(newValue: NoteInfo) {
        this.__oldNoteInfo.set(newValue);
    }
    private __change: ObservedPropertySimple<boolean>;
    get change() {
        return this.__change.get();
    }
    set change(newValue: boolean) {
        this.__change.set(newValue);
    }
    private __imageArray: ObservedPropertyObject<string[]>;
    get imageArray() {
        return this.__imageArray.get();
    }
    set imageArray(newValue: string[]) {
        this.__imageArray.set(newValue);
    }
    isChange() {
        this.change = this.oldNoteInfo.title != this.noteInfo.title
            || this.oldNoteInfo.content != this.noteInfo.content
            || this.oldNoteInfo.imageArr != this.noteInfo.imageArr;
    }
    render() {
        Column.create();
        Column.width(CommonConstants.FULL_WIDTH);
        Column.height(CommonConstants.FULL_HEIGHT);
        Column.padding({ left: CommonConstants.MARGIN_2, right: CommonConstants.MARGIN_2 });
        Column.backgroundColor($r('app.color.background'));
        Column.alignItems(HorizontalAlign.Start);
        let earlierCreatedChild_2: EditTitle = (this && this.findChildById) ? this.findChildById("2") as EditTitle : undefined;
        if (earlierCreatedChild_2 == undefined) {
            // 标题栏
            View.create(new EditTitle("2", this, {
                change: this.__change,
                back: (e) => {
                    // todo 返回
                },
                edit: (e) => {
                    this.change = false;
                    this.noteInfo.date = DateUtil.getCurrentTime();
                    // todo 更新笔记
                }
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                back: (e) => {
                    // todo 返回
                },
                edit: (e) => {
                    this.change = false;
                    this.noteInfo.date = DateUtil.getCurrentTime();
                    // todo 更新笔记
                }
            });
            View.create(earlierCreatedChild_2);
        }
        //
        Text.create(this.noteInfo.date + " | " + (this.noteInfo.content.length) + '字');
        //
        Text.margin({
            top: 29, bottom: 13, left: 2
        });
        //
        Text.fontColor($r('app.color.black_40'));
        //
        Text.fontSize(CommonConstants.FONT_SIZE_17);
        //
        Text.pop();
        // 笔记标题
        TextInput.create({
            text: this.noteInfo.title,
            placeholder: $r('app.string.input_title')
        });
        // 笔记标题
        TextInput.placeholderColor($r('app.color.black_40'));
        // 笔记标题
        TextInput.fontSize(CommonConstants.FONT_SIZE_19);
        // 笔记标题
        TextInput.borderWidth({ bottom: 1 });
        // 笔记标题
        TextInput.borderColor($r('app.color.black_10'));
        // 笔记标题
        TextInput.padding({
            left: 5
        });
        // 笔记标题
        TextInput.backgroundColor(Color.Transparent);
        // 笔记标题
        TextInput.height(58);
        // 笔记标题
        TextInput.borderRadius(0);
        // 笔记标题
        TextInput.margin({ bottom: 20 });
        // 笔记标题
        TextInput.width('100%');
        // 笔记标题
        TextInput.onChange((str) => {
            this.noteInfo.title = str;
            this.isChange();
        });
        // 笔记正文
        TextArea.create({
            text: this.noteInfo.content,
            placeholder: $r('app.string.input_content')
        });
        // 笔记正文
        TextArea.placeholderColor($r('app.color.black_40'));
        // 笔记正文
        TextArea.padding({ left: 5 });
        // 笔记正文
        TextArea.backgroundColor(Color.Transparent);
        // 笔记正文
        TextArea.borderRadius(0);
        // 笔记正文
        TextArea.height(160);
        // 笔记正文
        TextArea.margin({ top: 10 });
        // 笔记正文
        TextArea.onChange((str) => {
            this.noteInfo.content = str;
            this.isChange();
        });
        // 图片
        Grid.create();
        // 图片
        Grid.columnsTemplate('1fr 1fr 1fr');
        // 图片
        Grid.columnsGap(20);
        // 图片
        Grid.rowsGap(20);
        // 图片
        Grid.width(334);
        ForEach.create("3", this, ObservedObject.GetRawObject(this.imageArray), (src) => {
            GridItem.create();
            Image.create(src);
            Image.width(98);
            Image.height(98);
            GridItem.pop();
        });
        ForEach.pop();
        GridItem.create();
        Image.create($r("app.media.icon_add_image"));
        Image.width(98);
        Image.height(98);
        Image.onClick((e) => {
            // todo 添加图片
        });
        GridItem.pop();
        // 图片
        Grid.pop();
        Column.pop();
    }
}
loadDocument(new PageEdit("1", undefined, {}));
