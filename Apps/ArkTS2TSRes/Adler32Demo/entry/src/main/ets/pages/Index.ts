interface Index_Params {
    btrBtn?: string;
    utrBtn?: string;
    strBtn?: string;
    vtrBtn?: string;
    message?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
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
import adler32 from 'adler-32';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__btrBtn = new ObservedPropertySimple('byte数组输入', this, "btrBtn");
        this.__utrBtn = new ObservedPropertySimple('ucs-2字符串输入', this, "utrBtn");
        this.__strBtn = new ObservedPropertySimple('js正常字符串（utf-8）输入', this, "strBtn");
        this.__vtrBtn = new ObservedPropertySimple('获取adler32js版本号', this, "vtrBtn");
        this.__message = new ObservedPropertySimple('', this, "message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.btrBtn !== undefined) {
            this.btrBtn = params.btrBtn;
        }
        if (params.utrBtn !== undefined) {
            this.utrBtn = params.utrBtn;
        }
        if (params.strBtn !== undefined) {
            this.strBtn = params.strBtn;
        }
        if (params.vtrBtn !== undefined) {
            this.vtrBtn = params.vtrBtn;
        }
        if (params.message !== undefined) {
            this.message = params.message;
        }
    }
    aboutToBeDeleted() {
        this.__btrBtn.aboutToBeDeleted();
        this.__utrBtn.aboutToBeDeleted();
        this.__strBtn.aboutToBeDeleted();
        this.__vtrBtn.aboutToBeDeleted();
        this.__message.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __btrBtn: ObservedPropertySimple<string>;
    get btrBtn() {
        return this.__btrBtn.get();
    }
    set btrBtn(newValue: string) {
        this.__btrBtn.set(newValue);
    }
    private __utrBtn: ObservedPropertySimple<string>;
    get utrBtn() {
        return this.__utrBtn.get();
    }
    set utrBtn(newValue: string) {
        this.__utrBtn.set(newValue);
    }
    private __strBtn: ObservedPropertySimple<string>;
    get strBtn() {
        return this.__strBtn.get();
    }
    set strBtn(newValue: string) {
        this.__strBtn.set(newValue);
    }
    private __vtrBtn: ObservedPropertySimple<string>;
    get vtrBtn() {
        return this.__vtrBtn.get();
    }
    set vtrBtn(newValue: string) {
        this.__vtrBtn.set(newValue);
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Text.create("输出结果：" + this.message);
        Text.fontSize(13);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({ bottom: 50 });
        Text.pop();
        Text.create(this.btrBtn);
        Text.width('90%');
        Text.height(50);
        Text.backgroundColor(0xEEEEEE);
        Text.borderRadius(15);
        Text.fontSize(13);
        Text.textAlign(TextAlign.Center);
        Text.margin({ top: 10 });
        Text.onClick(() => {
            let pam = [
                1, 2, 4, 5, 6, 7, 8, 9, 10,
                1, 2, 4, 5, 6, 7, 8, 9, 10,
                1, 2, 4, 5, 6, 7, 8, 9, 10,
                1, 2, 4, 5, 6, 7, 8, 9, 10,
                1, 2, 4, 5, 6, 7, 8, 9, 10,
                1, 2, 4, 5, 6, 7, 8, 9, 10,
                1, 2, 4, 5, 6, 7, 8, 9, 10,
                1, 2, 4, 5, 6, 7, 8, 9, 10,
                1, 2, 4, 5, 6, 7, 8, 9, 10,
                1, 2, 4, 5, 6, 7, 8, 9, 10,
                1, 2, 4, 5, 6, 7, 8, 9, 10,
                1, 2, 4, 5, 6, 7, 8, 9, 10,
                1, 2, 4, 5, 6, 7, 8, 9, 10,
                1, 2, 4, 5, 6, 7, 8, 9, 10,
                1, 2, 4, 5, 6, 7, 8, 9, 10,
                1, 2, 4, 5, 6, 7, 8, 9, 10,
                1, 2, 4, 5, 6, 7, 8, 9, 10,
                1, 2, 4, 5, 6, 7, 8, 9, 10,
                1, 2, 4, 5, 6, 7, 8, 9, 10,
                1, 2, 4, 5, 6, 7, 8, 9, 10,
                1, 2, 4, 5, 6, 7, 8, 9, 10,
                1, 2, 4, 5, 6, 7, 8, 9, 10,
                1, 2, 4, 5, 6, 7, 8, 9, 10,
                1, 2, 4, 5, 6, 7, 8, 9, 10,
                1, 2, 4, 5, 6, 7, 8, 9, 10,
                1, 2, 4, 5, 6, 7, 8, 9, 10,
                1, 2, 4, 5, 6, 7, 8, 9, 10,
                1, 2, 4, 5, 6, 7, 8, 9, 10,
                1, 2, 4, 5, 6, 7, 8, 9, 10,
                1, 2, 4, 5, 6, 7, 8, 9, 10,
                1, 2, 4, 5, 6, 7, 8, 9, 10,
                1, 2, 4, 5, 6, 7, 8, 9, 10,
                1, 2, 4, 5, 6, 7, 8, 9, 10,
                1, 2, 4, 5, 6, 7, 8, 9, 10,
                1, 2, 4, 5, 6, 7, 8, 9, 10,
                1, 2, 4, 5, 6, 7, 8, 9, 10,
                1, 2, 4, 5, 6, 7, 8, 9, 10,
                1, 2, 4, 5, 6, 7, 8, 9, 10,
                1, 2, 4, 5, 6, 7, 8, 9, 10,
                1, 2, 4, 5, 6, 7, 8, 9, 10,
                1, 2, 4, 5, 6, 7, 8, 9, 10,
                1, 2, 4, 5, 6, 7, 8, 9, 10,
                1, 2, 4, 5, 6, 7, 8, 9, 10,
                1, 2, 4, 5, 6, 7, 8, 9, 10,
                1, 2, 4, 5, 6, 7, 8, 9, 10,
                1, 2, 4, 5, 6, 7, 0, 0
            ];
            let result = adler32.buf(pam);
            this.message = result + "";
        });
        Text.pop();
        Text.create(this.utrBtn);
        Text.width('90%');
        Text.height(50);
        Text.backgroundColor(0xEEEEEE);
        Text.borderRadius(15);
        Text.fontSize(13);
        Text.textAlign(TextAlign.Center);
        Text.margin({ top: 10 });
        Text.onClick(() => {
            let pam = "SheetJS";
            let result = adler32.bstr(pam);
            let s = adler32.buf([83, 104]); // 17825980  "Sh"
            s = adler32.str("eet", s); // 95486458  "Sheet"
            result = adler32.bstr("JS", s);
            this.message = result + "";
        });
        Text.pop();
        Text.create(this.strBtn);
        Text.width('90%');
        Text.height(50);
        Text.backgroundColor(0xEEEEEE);
        Text.borderRadius(15);
        Text.fontSize(13);
        Text.textAlign(TextAlign.Center);
        Text.margin({ top: 10 });
        Text.onClick(() => {
            let par = "foo bar baz٪☃🍣";
            let result = adler32.str(par);
            this.message = result + "";
        });
        Text.pop();
        Text.create(this.vtrBtn);
        Text.width('90%');
        Text.height(50);
        Text.backgroundColor(0xEEEEEE);
        Text.borderRadius(15);
        Text.fontSize(13);
        Text.textAlign(TextAlign.Center);
        Text.margin({ top: 10 });
        Text.onClick(() => {
            this.message = adler32.version;
        });
        Text.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
