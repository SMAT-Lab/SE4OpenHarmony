interface NoticeBar_nextLine_Params {
    cur_height?: number;
    cur_width?: number;
    notice_text?: string;
    notice_textLen?: number;
    textLine?: number;
}
interface NoticeBar_disabled_Params {
    cur_height?: number;
    cur_width?: number;
    notice_text?: string;
    notice_textLen?: number;
}
interface NoticeBar_bar_Params {
    cur_height?: number;
    cur_width?: number;
    notice_text?: string;
    notice_textLen?: number;
    roll_number?: number;
    iconURL?: string;
}
interface NoticeBar_default_Params {
    cur_height?: number;
    cur_width?: number;
    notice_text?: string;
    notice_textLen?: number;
    roll_number?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "NoticeBar_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Institute of Software, Chinese Academy of Sciences.
 * Licensed under the Apache License,Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { WindowMode } from '@ohos.UiTest';
import display from '@ohos.display';
export class NoticeBar_default extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__cur_height = new ObservedPropertySimple(50, this, "cur_height");
        this.__cur_width = new ObservedPropertySimple(500, this, "cur_width");
        this.__notice_text = new ObservedPropertySimple("滚动文本滚动文本滚动文本", this, "notice_text");
        this.__notice_textLen = new ObservedPropertySimple(0, this, "notice_textLen");
        this.__roll_number = new ObservedPropertySimple(0, this, "roll_number");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: NoticeBar_default_Params) {
        if (params.cur_height !== undefined) {
            this.cur_height = params.cur_height;
        }
        if (params.cur_width !== undefined) {
            this.cur_width = params.cur_width;
        }
        if (params.notice_text !== undefined) {
            this.notice_text = params.notice_text;
        }
        if (params.notice_textLen !== undefined) {
            this.notice_textLen = params.notice_textLen;
        }
        if (params.roll_number !== undefined) {
            this.roll_number = params.roll_number;
        }
    }
    aboutToBeDeleted() {
        this.__cur_height.aboutToBeDeleted();
        this.__cur_width.aboutToBeDeleted();
        this.__notice_text.aboutToBeDeleted();
        this.__notice_textLen.aboutToBeDeleted();
        this.__roll_number.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __cur_height: ObservedPropertySimple<number>; //组件高度
    get cur_height() {
        return this.__cur_height.get();
    }
    set cur_height(newValue: number) {
        this.__cur_height.set(newValue);
    }
    private __cur_width: ObservedPropertySimple<number>; //组件宽度
    get cur_width() {
        return this.__cur_width.get();
    }
    set cur_width(newValue: number) {
        this.__cur_width.set(newValue);
    }
    private __notice_text: ObservedPropertySimple<string>; //滚动文本
    get notice_text() {
        return this.__notice_text.get();
    }
    set notice_text(newValue: string) {
        this.__notice_text.set(newValue);
    }
    private __notice_textLen: ObservedPropertySimple<number>; //滚动文本长度
    get notice_textLen() {
        return this.__notice_textLen.get();
    }
    set notice_textLen(newValue: number) {
        this.__notice_textLen.set(newValue);
    }
    private __roll_number: ObservedPropertySimple<number>; //向左滚动值
    get roll_number() {
        return this.__roll_number.get();
    }
    set roll_number(newValue: number) {
        this.__roll_number.set(newValue);
    }
    render() {
        Stack.create();
        Stack.height(this.cur_height);
        Stack.width(this.cur_width);
        Stack.backgroundColor("#FFFBE8");
        Stack.onAppear(() => {
            this.notice_textLen = this.notice_text.length;
            console.log("======" + this.notice_textLen);
        });
        //音量图标
        Row.create();
        //音量图标
        Row.height("100%");
        //音量图标
        Row.width("10%");
        //音量图标
        Row.backgroundColor("#FFFBE8");
        //音量图标
        Row.zIndex(10);
        //音量图标
        Row.position({ x: 0 });
        Image.create({ "id": 0, "type": 30000, params: ["NoticeBar_volume.png"] });
        Image.width("60%");
        Image.height("50%");
        Image.margin(10);
        //音量图标
        Row.pop();
        //滚动文本
        Row.create();
        //滚动文本
        Row.margin(5);
        //滚动文本
        Row.height("100%");
        //滚动文本
        Row.width("84%");
        //滚动文本
        Row.position({ x: "10%" });
        //滚动文本
        Row.onAppear(() => {
            setInterval(() => {
                if (this.roll_number >= -(this.notice_textLen - 1) * 15)
                    this.roll_number -= 3;
                else
                    this.roll_number = this.cur_width * 0.9;
            }, 50);
        });
        Text.create(this.notice_text);
        Text.fontColor("#F06A0C");
        Text.fontSize(15);
        Text.width(this.notice_textLen * 15);
        Text.maxLines(1);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.align(Alignment.Center);
        Text.offset({
            x: this.roll_number,
            y: 0
        });
        Text.pop();
        //滚动文本
        Row.pop();
        //末尾间隙
        Row.create();
        //末尾间隙
        Row.backgroundColor("#FFFBE8");
        //末尾间隙
        Row.height("100%");
        //末尾间隙
        Row.width("6%");
        //末尾间隙
        Row.margin(5);
        //末尾间隙
        Row.zIndex(2);
        //末尾间隙
        Row.position({ x: "94%" });
        //末尾间隙
        Row.pop();
        Stack.pop();
    }
}
export class NoticeBar_bar extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__cur_height = new ObservedPropertySimple(50, this, "cur_height");
        this.__cur_width = new ObservedPropertySimple(500, this, "cur_width");
        this.__notice_text = new ObservedPropertySimple("滚动文本滚动文本滚动文本滚动文本滚动文本滚动文本", this, "notice_text");
        this.__notice_textLen = new ObservedPropertySimple(0, this, "notice_textLen");
        this.__roll_number = new ObservedPropertySimple(0, this, "roll_number");
        this.__iconURL = new ObservedPropertySimple("NoticeBar_close.png", this, "iconURL");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: NoticeBar_bar_Params) {
        if (params.cur_height !== undefined) {
            this.cur_height = params.cur_height;
        }
        if (params.cur_width !== undefined) {
            this.cur_width = params.cur_width;
        }
        if (params.notice_text !== undefined) {
            this.notice_text = params.notice_text;
        }
        if (params.notice_textLen !== undefined) {
            this.notice_textLen = params.notice_textLen;
        }
        if (params.roll_number !== undefined) {
            this.roll_number = params.roll_number;
        }
        if (params.iconURL !== undefined) {
            this.iconURL = params.iconURL;
        }
    }
    aboutToBeDeleted() {
        this.__cur_height.aboutToBeDeleted();
        this.__cur_width.aboutToBeDeleted();
        this.__notice_text.aboutToBeDeleted();
        this.__notice_textLen.aboutToBeDeleted();
        this.__roll_number.aboutToBeDeleted();
        this.__iconURL.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __cur_height: ObservedPropertySimple<number>; //组件高度
    get cur_height() {
        return this.__cur_height.get();
    }
    set cur_height(newValue: number) {
        this.__cur_height.set(newValue);
    }
    private __cur_width: ObservedPropertySimple<number>; //组件宽度
    get cur_width() {
        return this.__cur_width.get();
    }
    set cur_width(newValue: number) {
        this.__cur_width.set(newValue);
    }
    private __notice_text: ObservedPropertySimple<string>; //滚动文本
    get notice_text() {
        return this.__notice_text.get();
    }
    set notice_text(newValue: string) {
        this.__notice_text.set(newValue);
    }
    private __notice_textLen: ObservedPropertySimple<number>; //滚动文本长度
    get notice_textLen() {
        return this.__notice_textLen.get();
    }
    set notice_textLen(newValue: number) {
        this.__notice_textLen.set(newValue);
    }
    private __roll_number: ObservedPropertySimple<number>; //向左滚动值
    get roll_number() {
        return this.__roll_number.get();
    }
    set roll_number(newValue: number) {
        this.__roll_number.set(newValue);
    }
    private __iconURL: ObservedPropertySimple<string>; //图标url
    get iconURL() {
        return this.__iconURL.get();
    }
    set iconURL(newValue: string) {
        this.__iconURL.set(newValue);
    }
    render() {
        Stack.create();
        Stack.height(this.cur_height);
        Stack.width(this.cur_width);
        Stack.backgroundColor("#FFFBE8");
        Stack.onAppear(() => {
            this.notice_textLen = this.notice_text.length;
            console.log("======" + this.notice_textLen);
        });
        //开头间隙
        Row.create();
        //开头间隙
        Row.backgroundColor("#FFFBE8");
        //开头间隙
        Row.height("100%");
        //开头间隙
        Row.width("6%");
        //开头间隙
        Row.margin(5);
        //开头间隙
        Row.zIndex(10);
        //开头间隙
        Row.position({ x: "0%" });
        //开头间隙
        Row.pop();
        //滚动文本
        Row.create();
        //滚动文本
        Row.margin(5);
        //滚动文本
        Row.height("100%");
        //滚动文本
        Row.width("84%");
        //滚动文本
        Row.position({ x: "6%" });
        //滚动文本
        Row.onAppear(() => {
            setInterval(() => {
                if (this.roll_number >= -(this.notice_textLen - 1) * 15)
                    this.roll_number -= 3;
                else
                    this.roll_number = this.cur_width * 0.85;
            }, 50);
        });
        Text.create(this.notice_text);
        Text.fontColor("#F06A0C");
        Text.fontSize(15);
        Text.width(this.notice_textLen * 15);
        Text.maxLines(1);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.align(Alignment.Center);
        Text.offset({
            x: this.roll_number,
            y: 0
        });
        Text.pop();
        //滚动文本
        Row.pop();
        //图标
        Row.create();
        //图标
        Row.height("100%");
        //图标
        Row.width("10%");
        //图标
        Row.margin({ left: 10 });
        //图标
        Row.backgroundColor("#FFFBE8");
        //图标
        Row.zIndex(10);
        //图标
        Row.position({ x: "90%" });
        //图标
        Row.onClick(() => {
            if (this.iconURL == "NoticeBar_close.png") {
                this.cur_height = 0;
            }
        });
        Image.create($rawfile(this.iconURL));
        Image.width("50%");
        Image.height("30%");
        Image.align(Alignment.Center);
        //图标
        Row.pop();
        Stack.pop();
    }
}
export class NoticeBar_disabled extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__cur_height = new ObservedPropertySimple(50, this, "cur_height");
        this.__cur_width = new ObservedPropertySimple(500, this, "cur_width");
        this.__notice_text = new ObservedPropertySimple("滚动文本滚动文本滚动文本滚动文本滚动文本滚动文本", this, "notice_text");
        this.__notice_textLen = new ObservedPropertySimple(0, this, "notice_textLen");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: NoticeBar_disabled_Params) {
        if (params.cur_height !== undefined) {
            this.cur_height = params.cur_height;
        }
        if (params.cur_width !== undefined) {
            this.cur_width = params.cur_width;
        }
        if (params.notice_text !== undefined) {
            this.notice_text = params.notice_text;
        }
        if (params.notice_textLen !== undefined) {
            this.notice_textLen = params.notice_textLen;
        }
    }
    aboutToBeDeleted() {
        this.__cur_height.aboutToBeDeleted();
        this.__cur_width.aboutToBeDeleted();
        this.__notice_text.aboutToBeDeleted();
        this.__notice_textLen.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __cur_height: ObservedPropertySimple<number>; //组件高度
    get cur_height() {
        return this.__cur_height.get();
    }
    set cur_height(newValue: number) {
        this.__cur_height.set(newValue);
    }
    private __cur_width: ObservedPropertySimple<number>; //组件宽度
    get cur_width() {
        return this.__cur_width.get();
    }
    set cur_width(newValue: number) {
        this.__cur_width.set(newValue);
    }
    private __notice_text: ObservedPropertySimple<string>; //滚动文本
    get notice_text() {
        return this.__notice_text.get();
    }
    set notice_text(newValue: string) {
        this.__notice_text.set(newValue);
    }
    private __notice_textLen: ObservedPropertySimple<number>; //滚动文本长度
    get notice_textLen() {
        return this.__notice_textLen.get();
    }
    set notice_textLen(newValue: number) {
        this.__notice_textLen.set(newValue);
    }
    render() {
        Stack.create();
        Stack.height(this.cur_height);
        Stack.width(this.cur_width);
        Stack.backgroundColor("#FFFBE8");
        Stack.onAppear(() => {
            this.notice_textLen = this.notice_text.length;
            console.log("======" + this.notice_textLen);
        });
        //开头间隙
        Row.create();
        //开头间隙
        Row.backgroundColor("#FFFBE8");
        //开头间隙
        Row.height("100%");
        //开头间隙
        Row.width("6%");
        //开头间隙
        Row.margin(5);
        //开头间隙
        Row.zIndex(10);
        //开头间隙
        Row.position({ x: "0%" });
        //开头间隙
        Row.pop();
        //滚动文本
        Row.create();
        //滚动文本
        Row.margin(5);
        //滚动文本
        Row.height("100%");
        //滚动文本
        Row.width("84%");
        //滚动文本
        Row.position({ x: "6%" });
        Text.create(this.notice_text);
        Text.fontColor("#F06A0C");
        Text.fontSize(15);
        Text.maxLines(1);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.align(Alignment.Center);
        Text.pop();
        //滚动文本
        Row.pop();
        //图标
        Row.create();
        //图标
        Row.height("100%");
        //图标
        Row.width("10%");
        //图标
        Row.backgroundColor("#FFFBE8");
        //图标
        Row.zIndex(10);
        //图标
        Row.position({ x: "90%" });
        //图标
        Row.pop();
        Stack.pop();
    }
}
export class NoticeBar_nextLine extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__cur_height = new ObservedPropertySimple(50, this, "cur_height");
        this.__cur_width = new ObservedPropertySimple(500, this, "cur_width");
        this.__notice_text = new ObservedPropertySimple("滚动文本滚动文本滚动文本滚动文本滚动文本滚动文本", this, "notice_text");
        this.__notice_textLen = new ObservedPropertySimple(0, this, "notice_textLen");
        this.__textLine = new ObservedPropertySimple(1, this, "textLine");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: NoticeBar_nextLine_Params) {
        if (params.cur_height !== undefined) {
            this.cur_height = params.cur_height;
        }
        if (params.cur_width !== undefined) {
            this.cur_width = params.cur_width;
        }
        if (params.notice_text !== undefined) {
            this.notice_text = params.notice_text;
        }
        if (params.notice_textLen !== undefined) {
            this.notice_textLen = params.notice_textLen;
        }
        if (params.textLine !== undefined) {
            this.textLine = params.textLine;
        }
    }
    aboutToBeDeleted() {
        this.__cur_height.aboutToBeDeleted();
        this.__cur_width.aboutToBeDeleted();
        this.__notice_text.aboutToBeDeleted();
        this.__notice_textLen.aboutToBeDeleted();
        this.__textLine.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __cur_height: ObservedPropertySimple<number>; //组件高度
    get cur_height() {
        return this.__cur_height.get();
    }
    set cur_height(newValue: number) {
        this.__cur_height.set(newValue);
    }
    private __cur_width: ObservedPropertySimple<number>; //组件宽度
    get cur_width() {
        return this.__cur_width.get();
    }
    set cur_width(newValue: number) {
        this.__cur_width.set(newValue);
    }
    private __notice_text: ObservedPropertySimple<string>; //滚动文本
    get notice_text() {
        return this.__notice_text.get();
    }
    set notice_text(newValue: string) {
        this.__notice_text.set(newValue);
    }
    private __notice_textLen: ObservedPropertySimple<number>; //滚动文本长度
    get notice_textLen() {
        return this.__notice_textLen.get();
    }
    set notice_textLen(newValue: number) {
        this.__notice_textLen.set(newValue);
    }
    private __textLine: ObservedPropertySimple<number>; //滚动文本行数
    get textLine() {
        return this.__textLine.get();
    }
    set textLine(newValue: number) {
        this.__textLine.set(newValue);
    }
    render() {
        Stack.create();
        Stack.height(this.cur_height);
        Stack.width(this.cur_width);
        Stack.backgroundColor("#FFFBE8");
        Stack.onAppear(() => {
            this.notice_textLen = this.notice_text.length;
            console.log("======" + this.notice_textLen);
        });
        //开头间隙
        Row.create();
        //开头间隙
        Row.backgroundColor("#FFFBE8");
        //开头间隙
        Row.height("100%");
        //开头间隙
        Row.width("6%");
        //开头间隙
        Row.margin(5);
        //开头间隙
        Row.zIndex(10);
        //开头间隙
        Row.position({ x: "0%" });
        //开头间隙
        Row.pop();
        //滚动文本
        Row.create();
        //滚动文本
        Row.margin(5);
        //滚动文本
        Row.height("100%");
        //滚动文本
        Row.width("90%");
        //滚动文本
        Row.position({ x: "6%" });
        Text.create(this.notice_text);
        Text.fontColor("#F06A0C");
        Text.fontSize(15);
        Text.maxLines(this.textLine);
        Text.textOverflow({ overflow: TextOverflow.None });
        Text.align(Alignment.Center);
        Text.onAppear(() => {
            this.textLine = Math.ceil((15 * this.notice_textLen) / (this.cur_width * 0.9));
            this.cur_height = this.textLine * this.cur_height * 0.5;
            console.log("===== ooo ==== " + this.textLine + "----" + this.cur_height);
        });
        Text.pop();
        //滚动文本
        Row.pop();
        //图标
        Row.create();
        //图标
        Row.height("100%");
        //图标
        Row.width("4%");
        //图标
        Row.backgroundColor("#FFFBE8");
        //图标
        Row.zIndex(10);
        //图标
        Row.position({ x: "96%" });
        //图标
        Row.pop();
        Stack.pop();
    }
}
