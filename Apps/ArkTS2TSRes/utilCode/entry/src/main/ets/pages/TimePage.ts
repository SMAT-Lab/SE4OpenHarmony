interface TimePage_Params {
    select?: number;
    time24?: string[];
    time12?: string[];
    year?: number;
    scroller?: Scroller;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TimePage_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import { get12, get24 } from 'time-ampm';
import isLeapYear from 'leap-year';
import prompt from '@ohos.promptAction';
class TimePage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.select = 1;
        this.time24 = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"];
        this.time12 = ["12 am", "1 am", "2 am", "3 am", "4 am", "5 am", "6 am", "7 am", "8 am", "9 am", "10 am", "11 am", "12 pm", "1 pm", "2 pm", "3 pm", "4 pm", "5 pm", "6 pm", "7 pm", "8 pm", "9 pm", "10 pm", "11 pm", "11.59 pm"];
        this.__year = new ObservedPropertySimple(2014, this, "year");
        this.scroller = new Scroller();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TimePage_Params) {
        if (params.select !== undefined) {
            this.select = params.select;
        }
        if (params.time24 !== undefined) {
            this.time24 = params.time24;
        }
        if (params.time12 !== undefined) {
            this.time12 = params.time12;
        }
        if (params.year !== undefined) {
            this.year = params.year;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
    }
    aboutToBeDeleted() {
        this.__year.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private select: number;
    private time24: string[];
    private time12: string[];
    private __year: ObservedPropertySimple<number>;
    get year() {
        return this.__year.get();
    }
    set year(newValue: number) {
        this.__year.set(newValue);
    }
    private scroller: Scroller;
    render() {
        Scroll.create(this.scroller);
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBar(BarState.Off);
        Scroll.scrollBarColor(Color.Gray);
        Scroll.scrollBarWidth(1);
        Column.create();
        Column.create({ space: 12 });
        Column.margin({ top: 10 });
        Text.create('闰年测试，点击按钮判断是否为闰年');
        Text.margin({ top: 5 });
        Text.fontSize(16);
        Text.pop();
        TextInput.create({ text: this.year.toString(), placeholder: '请输入年份,年份范围，大于1581' });
        TextInput.height(60);
        TextInput.fontSize(18);
        TextInput.type(InputType.Number);
        TextInput.margin(18);
        TextInput.maxLength(4);
        TextInput.onChange((value: string) => {
            if (value.length > 0 && Number.parseInt(value) > 1581) {
                this.year = Number.parseInt(value);
            }
            else {
                prompt.showToast({ message: '请输入大于1581的年份', duration: 3000 });
            }
        });
        Button.createWithLabel(this.year + '年是否闰年判断' + isLeapYear(this.year), { type: ButtonType.Normal });
        Button.fontSize(18);
        Button.fontColor('#000');
        Button.height(60);
        Button.width(300);
        Button.margin({ top: 20 });
        Button.backgroundColor('#12939f');
        Button.onClick(() => {
            if (this.year == 0) {
                prompt.showToast({ message: '请输入大于1581的年份', duration: 3000 });
            }
            if (isLeapYear(this.year)) {
                prompt.showToast({ message: this.year + '是闰年', duration: 3000 });
            }
            else {
                prompt.showToast({ message: this.year + '不是闰年', duration: 3000 });
            }
        });
        Button.pop();
        Column.create();
        Text.create('上下午测试，判断对应时间为上午或下午');
        Text.margin({ top: 5 });
        Text.fontSize(16);
        Text.pop();
        ForEach.create("2", this, ObservedObject.GetRawObject(this.time24), (item: string, index?: number) => {
            Row.create();
            Text.create(item + '点为：' + get12(item));
            Text.margin({ top: 5 });
            Text.fontSize(16);
            Text.pop();
            Row.pop();
        });
        ForEach.pop();
        ForEach.create("3", this, ObservedObject.GetRawObject(this.time12), (item: string, index?: number) => {
            Row.create();
            Text.create(item + '点为：' + get24(item));
            Text.margin({ top: 5 });
            Text.fontSize(16);
            Text.pop();
            Row.pop();
        });
        ForEach.pop();
        Column.pop();
        Divider.create();
        Divider.strokeWidth(2);
        Divider.color('#F1F3F5');
        Divider.margin({ top: 8, bottom: 8 });
        Column.pop();
        Column.pop();
        Scroll.pop();
    }
    init() {
    }
}
loadDocument(new TimePage("1", undefined, {}));
