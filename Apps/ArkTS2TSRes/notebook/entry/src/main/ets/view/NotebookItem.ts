interface NotebookItem_Params {
    selectId?: number;
    noteInfo?: NoteInfo;
    delete?: (id) => void;
    click?: (id) => void;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "NotebookItem_" + ++__generate__Id;
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
export class NotebookItem extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__selectId = new ObservedPropertySimple(-1, this, "selectId");
        this.__noteInfo = new ObservedPropertyObject({
            id: 1,
            title: "",
            content: "",
            date: "",
            imageArr: ""
        }, this, "noteInfo");
        this.delete = undefined;
        this.click = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: NotebookItem_Params) {
        if (params.selectId !== undefined) {
            this.selectId = params.selectId;
        }
        if (params.noteInfo !== undefined) {
            this.noteInfo = params.noteInfo;
        }
        if (params.delete !== undefined) {
            this.delete = params.delete;
        }
        if (params.click !== undefined) {
            this.click = params.click;
        }
    }
    aboutToBeDeleted() {
        this.__selectId.aboutToBeDeleted();
        this.__noteInfo.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __selectId: ObservedPropertySimple<number>; // 选中笔记项ID
    get selectId() {
        return this.__selectId.get();
    }
    set selectId(newValue: number) {
        this.__selectId.set(newValue);
    }
    private __noteInfo: ObservedPropertyObject<NoteInfo>;
    get noteInfo() {
        return this.__noteInfo.get();
    }
    set noteInfo(newValue: NoteInfo) {
        this.__noteInfo.set(newValue);
    }
    private delete: (id) => void;
    private click: (id) => void;
    render() {
        Stack.create();
        Stack.height(108);
        Stack.width(CommonConstants.FULL_WIDTH);
        Stack.margin({ bottom: 14 });
        Stack.alignContent(Alignment.TopEnd);
        Gesture.create(GesturePriority.Low);
        //水平侧滑事件
        PanGesture.create({ distance: 20, direction: PanDirection.Horizontal });
        //水平侧滑事件
        PanGesture.onActionUpdate((event: GestureEvent) => {
            if (event.offsetX < -20) {
                this.selectId = this.noteInfo.id;
            }
            else {
                this.selectId = -1;
            }
        });
        //水平侧滑事件
        PanGesture.pop();
        Gesture.pop();
        Column.create();
        Column.padding(23);
        Column.backgroundColor($r('app.color.item_bg'));
        Column.width(CommonConstants.FULL_WIDTH);
        Column.alignItems(HorizontalAlign.Start);
        Column.justifyContent(FlexAlign.SpaceBetween);
        Column.borderRadius(12);
        Column.height(108);
        Column.onClick((e) => {
            this.click(this.noteInfo.id);
        });
        Image.create(this.noteInfo.imageArr.length > 5 ? JSON.parse(this.noteInfo.imageArr)[0] : "");
        Image.width(48);
        Image.height(48);
        Image.position({ x: 0, y: 7 });
        Image.visibility(this.noteInfo.imageArr.length > 5 ? Visibility.Visible : Visibility.None);
        Text.create(this.noteInfo.title.length == 0 ? '暂无标题' : this.noteInfo.title);
        Text.fontSize(CommonConstants.FONT_SIZE_19);
        Text.margin({ left: this.noteInfo.imageArr.length > 5 ? 48 + 19 : 0 });
        Text.maxLines(1);
        Text.pop();
        Row.create();
        Row.width(CommonConstants.FULL_WIDTH);
        Row.margin({ bottom: 4, left: this.noteInfo.imageArr.length > 5 ? 48 + 19 : 0 });
        Image.create($r("app.media.icon_time"));
        Image.width(19);
        Image.height(19);
        Text.create(this.noteInfo.date.substr(5, 5) + ' | ' + this.noteInfo.content);
        Text.fontSize(CommonConstants.FONT_SIZE_19);
        Text.fontColor($r('app.color.black_40'));
        Text.margin({ left: 8, right: 12 });
        Text.maxLines(1);
        Text.pop();
        Row.pop();
        Column.pop();
        // 删除按钮
        Row.create();
        // 删除按钮
        Row.borderRadius({ topRight: 12, bottomRight: 12 });
        // 删除按钮
        Row.width(58);
        // 删除按钮
        Row.height(108);
        // 删除按钮
        Row.padding({ left: 15, right: 15, top: 40, bottom: 40 });
        // 删除按钮
        Row.backgroundColor($r('app.color.delete_bg'));
        // 删除按钮
        Row.visibility(this.selectId == this.noteInfo.id ? Visibility.Visible : Visibility.None);
        // 删除按钮
        Row.onClick((e) => {
            this.delete(this.noteInfo.id);
            this.selectId = -1;
        });
        Image.create($r('app.media.icon_delete_white'));
        Image.width(28);
        Image.height(28);
        // 删除按钮
        Row.pop();
        Stack.pop();
    }
}
