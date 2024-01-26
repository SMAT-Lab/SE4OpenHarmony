interface PageAdd_Params {
    clickAble?: boolean;
    imageArray?: string[];
    noteInfo?: NoteInfo;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "PageAdd_" + ++__generate__Id;
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
import { AddTitle } from '../view/AddTitle';
import DateUtil from '../common/utils/DateUtil';
class PageAdd extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__clickAble = new ObservedPropertySimple(true, this, "clickAble");
        this.__imageArray = new ObservedPropertyObject([], this, "imageArray");
        this.__noteInfo = new ObservedPropertyObject({
            id: 1,
            title: "",
            content: "",
            date: "",
            imageArr: ''
        }, this, "noteInfo");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: PageAdd_Params) {
        if (params.clickAble !== undefined) {
            this.clickAble = params.clickAble;
        }
        if (params.imageArray !== undefined) {
            this.imageArray = params.imageArray;
        }
        if (params.noteInfo !== undefined) {
            this.noteInfo = params.noteInfo;
        }
    }
    aboutToBeDeleted() {
        this.__clickAble.aboutToBeDeleted();
        this.__imageArray.aboutToBeDeleted();
        this.__noteInfo.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __clickAble: ObservedPropertySimple<boolean>;
    get clickAble() {
        return this.__clickAble.get();
    }
    set clickAble(newValue: boolean) {
        this.__clickAble.set(newValue);
    }
    private __imageArray: ObservedPropertyObject<string[]>; // 图片列表
    get imageArray() {
        return this.__imageArray.get();
    }
    set imageArray(newValue: string[]) {
        this.__imageArray.set(newValue);
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
        Column.padding({ left: CommonConstants.MARGIN_2, right: CommonConstants.MARGIN_2 });
        Column.backgroundColor($r('app.color.background'));
        Column.alignItems(HorizontalAlign.Start);
        let earlierCreatedChild_2: AddTitle = (this && this.findChildById) ? this.findChildById("2") as AddTitle : undefined;
        if (earlierCreatedChild_2 == undefined) {
            // 标题栏
            View.create(new AddTitle("2", this, {
                clickAble: this.__clickAble,
                back: () => {
                    // todo 返回
                },
                save: () => {
                    this.noteInfo.date = DateUtil.getCurrentTime();
                    this.noteInfo.imageArr = JSON.stringify(ObservedObject.GetRawObject(this.imageArray));
                    // todo 新增笔记
                }
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                back: () => {
                    // todo 返回
                },
                save: () => {
                    this.noteInfo.date = DateUtil.getCurrentTime();
                    this.noteInfo.imageArr = JSON.stringify(ObservedObject.GetRawObject(this.imageArray));
                    // todo 新增笔记
                }
            });
            View.create(earlierCreatedChild_2);
        }
        // 笔记标题
        TextInput.create({
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
        TextInput.margin({ top: 55, bottom: 20 });
        // 笔记标题
        TextInput.width('100%');
        // 笔记标题
        TextInput.onChange((str) => {
            this.noteInfo.title = str;
        });
        // 笔记正文
        TextArea.create({
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
        TextArea.height(140);
        // 笔记正文
        TextArea.margin({ top: 10, bottom: 20 });
        // 笔记正文
        TextArea.onChange((str) => {
            this.noteInfo.content = str;
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
        ForEach.create("3", this, ObservedObject.GetRawObject(this.imageArray), (src: string) => {
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
        Image.onClick(() => {
            // todo 添加图片
        });
        GridItem.pop();
        // 图片
        Grid.pop();
        Column.pop();
    }
}
loadDocument(new PageAdd("1", undefined, {}));
