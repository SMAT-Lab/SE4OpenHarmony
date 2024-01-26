interface Index_Params {
    noteInfoList?: NoteInfo[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
import { IndexTitle } from '../view/Title';
import { NotebookItem } from '../view/NotebookItem';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__noteInfoList = new ObservedPropertyObject([], this, "noteInfoList");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.noteInfoList !== undefined) {
            this.noteInfoList = params.noteInfoList;
        }
    }
    aboutToBeDeleted() {
        this.__noteInfoList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __noteInfoList: ObservedPropertyObject<NoteInfo[]>; // 笔记信息列表
    get noteInfoList() {
        return this.__noteInfoList.get();
    }
    set noteInfoList(newValue: NoteInfo[]) {
        this.__noteInfoList.set(newValue);
    }
    render() {
        Column.create();
        Column.width(CommonConstants.FULL_WIDTH);
        Column.height(CommonConstants.FULL_HEIGHT);
        Column.create();
        Column.width(CommonConstants.FULL_WIDTH);
        Column.height(CommonConstants.FULL_HEIGHT);
        Column.padding({ left: CommonConstants.MARGIN_1, right: CommonConstants.MARGIN_1 });
        Column.backgroundColor($r('app.color.background'));
        let earlierCreatedChild_2: IndexTitle = (this && this.findChildById) ? this.findChildById("2") as IndexTitle : undefined;
        if (earlierCreatedChild_2 == undefined) {
            // 记事本标题
            View.create(new IndexTitle("2", this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
        // 笔记数量
        Text.create((this.noteInfoList.length + '条笔记'));
        // 笔记数量
        Text.fontSize(CommonConstants.FONT_SIZE_19);
        // 笔记数量
        Text.width('100%');
        // 笔记数量
        Text.fontColor($r('app.color.black_40'));
        // 笔记数量
        Text.pop();
        // 搜索
        Stack.create();
        // 搜索
        Stack.width(CommonConstants.FULL_WIDTH);
        // 搜索
        Stack.height(48);
        // 搜索
        Stack.borderRadius(48);
        // 搜索
        Stack.margin({
            top: 29,
            bottom: 19
        });
        // 搜索
        Stack.alignContent(Alignment.Start);
        Image.create($r("app.media.icon_search"));
        Image.width(19);
        Image.height(19);
        Image.margin({ left: 14 });
        TextInput.create({
            placeholder: $r('app.string.search')
        });
        TextInput.placeholderColor($r('app.color.black_30'));
        TextInput.fontSize(CommonConstants.FONT_SIZE_19);
        TextInput.padding({
            left: 43
        });
        TextInput.backgroundColor($r('app.color.black_3'));
        TextInput.height(48);
        TextInput.borderRadius(48);
        TextInput.width('100%');
        TextInput.onChange((search) => {
            // todo 搜索笔记
        });
        // 搜索
        Stack.pop();
        // 笔记列表
        List.create({ space: 0, initialIndex: 0 });
        // 笔记列表
        List.width(CommonConstants.FULL_WIDTH);
        // 笔记列表
        List.height(CommonConstants.FULL_HEIGHT);
        // 笔记列表
        List.layoutWeight(1);
        ForEach.create("4", this, ObservedObject.GetRawObject(this.noteInfoList), (item, index) => {
            ListItem.create();
            let earlierCreatedChild_3: NotebookItem = (this && this.findChildById) ? this.findChildById("3") as NotebookItem : undefined;
            if (earlierCreatedChild_3 == undefined) {
                View.create(new NotebookItem("3", this, {
                    noteInfo: item,
                    click: (id) => {
                        // todo 点击笔记，跳转至详情页
                    },
                    delete: (id) => {
                        // todo 删除笔记
                    }
                }));
            }
            else {
                earlierCreatedChild_3.updateWithValueParams({
                    noteInfo: item,
                    click: (id) => {
                        // todo 点击笔记，跳转至详情页
                    },
                    delete: (id) => {
                        // todo 删除笔记
                    }
                });
                View.create(earlierCreatedChild_3);
            }
            ListItem.pop();
        });
        ForEach.pop();
        // 笔记列表
        List.pop();
        Column.pop();
        // 新增笔记
        Image.create($r("app.media.icon_add"));
        // 新增笔记
        Image.width(96);
        // 新增笔记
        Image.height(96);
        // 新增笔记
        Image.position({
            x: '60%', y: '80%'
        });
        // 新增笔记
        Image.onClick(() => {
            // todo 点击按钮，跳转至新增页面
        });
        Column.pop();
    }
    // 生命周期函数
    aboutToAppear(): void {
        this.refreshData();
    }
    // 生命周期函数
    onPageShow(): void {
        this.refreshData();
    }
    // 查询笔记数据
    refreshData() {
        // todo 查询笔记数据
        // 为了展示页面效果添加的临时数据
        this.noteInfoList = [
            {
                id: 1,
                title: "标题1",
                content: "我是内容1",
                date: "03/20",
                imageArr: ""
            },
            {
                id: 2,
                title: "标题2",
                content: "我是内容2",
                date: "02/21",
                imageArr: ""
            }
        ];
    }
}
loadDocument(new Index("1", undefined, {}));
