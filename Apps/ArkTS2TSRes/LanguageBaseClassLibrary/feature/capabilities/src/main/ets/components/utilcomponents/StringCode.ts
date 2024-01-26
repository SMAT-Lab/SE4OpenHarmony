interface StringCode_Params {
    specStrInput_f?: string;
    specStrInput_s?: string;
    specStrInput_d?: string;
    specStrInput_i?: string;
    resen?: string;
    resdec?: string;
    read?: string;
    write?: string;
    resArray?: Uint8Array | undefined;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "StringCode_" + ++__generate__Id;
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
import util from '@ohos.util';
import { getString } from '@ohos/common';
import { SpecInput } from './stringcode/SpecInput';
export class StringCode extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__specStrInput_f = new ObservedPropertySimple('', this, "specStrInput_f");
        this.__specStrInput_s = new ObservedPropertySimple('', this, "specStrInput_s");
        this.__specStrInput_d = new ObservedPropertySimple('', this, "specStrInput_d");
        this.__specStrInput_i = new ObservedPropertySimple('', this, "specStrInput_i");
        this.__resen = new ObservedPropertySimple('', this, "resen");
        this.__resdec = new ObservedPropertySimple('', this, "resdec");
        this.__read = new ObservedPropertySimple('', this, "read");
        this.__write = new ObservedPropertySimple('', this, "write");
        this.resArray = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: StringCode_Params) {
        if (params.specStrInput_f !== undefined) {
            this.specStrInput_f = params.specStrInput_f;
        }
        if (params.specStrInput_s !== undefined) {
            this.specStrInput_s = params.specStrInput_s;
        }
        if (params.specStrInput_d !== undefined) {
            this.specStrInput_d = params.specStrInput_d;
        }
        if (params.specStrInput_i !== undefined) {
            this.specStrInput_i = params.specStrInput_i;
        }
        if (params.resen !== undefined) {
            this.resen = params.resen;
        }
        if (params.resdec !== undefined) {
            this.resdec = params.resdec;
        }
        if (params.read !== undefined) {
            this.read = params.read;
        }
        if (params.write !== undefined) {
            this.write = params.write;
        }
        if (params.resArray !== undefined) {
            this.resArray = params.resArray;
        }
    }
    aboutToBeDeleted() {
        this.__specStrInput_f.aboutToBeDeleted();
        this.__specStrInput_s.aboutToBeDeleted();
        this.__specStrInput_d.aboutToBeDeleted();
        this.__specStrInput_i.aboutToBeDeleted();
        this.__resen.aboutToBeDeleted();
        this.__resdec.aboutToBeDeleted();
        this.__read.aboutToBeDeleted();
        this.__write.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __specStrInput_f: ObservedPropertySimple<string>;
    get specStrInput_f() {
        return this.__specStrInput_f.get();
    }
    set specStrInput_f(newValue: string) {
        this.__specStrInput_f.set(newValue);
    }
    private __specStrInput_s: ObservedPropertySimple<string>;
    get specStrInput_s() {
        return this.__specStrInput_s.get();
    }
    set specStrInput_s(newValue: string) {
        this.__specStrInput_s.set(newValue);
    }
    private __specStrInput_d: ObservedPropertySimple<string>;
    get specStrInput_d() {
        return this.__specStrInput_d.get();
    }
    set specStrInput_d(newValue: string) {
        this.__specStrInput_d.set(newValue);
    }
    private __specStrInput_i: ObservedPropertySimple<string>;
    get specStrInput_i() {
        return this.__specStrInput_i.get();
    }
    set specStrInput_i(newValue: string) {
        this.__specStrInput_i.set(newValue);
    }
    private __resen: ObservedPropertySimple<string>;
    get resen() {
        return this.__resen.get();
    }
    set resen(newValue: string) {
        this.__resen.set(newValue);
    }
    private __resdec: ObservedPropertySimple<string>;
    get resdec() {
        return this.__resdec.get();
    }
    set resdec(newValue: string) {
        this.__resdec.set(newValue);
    }
    private __read: ObservedPropertySimple<string>;
    get read() {
        return this.__read.get();
    }
    set read(newValue: string) {
        this.__read.set(newValue);
    }
    private __write: ObservedPropertySimple<string>;
    get write() {
        return this.__write.get();
    }
    set write(newValue: string) {
        this.__write.set(newValue);
    }
    private resArray: Uint8Array | undefined;
    render() {
        Scroll.create();
        Scroll.scrollBar(BarState.Off);
        Scroll.align(Alignment.Start);
        Column.create({ space: 12 });
        Column.width('100%');
        Column.padding(16);
        Row.create();
        Text.create($r('app.string.SpecString'));
        Text.fontSize(15);
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Text.create($r('app.string.SpecString_info'));
        Text.fontSize(15);
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Row.pop();
        let earlierCreatedChild_2: SpecInput = (this && this.findChildById) ? this.findChildById("2") as SpecInput : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new SpecInput("2", this, { result_str: $r('app.string.result_f'), specStrInput: this.__specStrInput_f }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                result_str: $r('app.string.result_f')
            });
            View.create(earlierCreatedChild_2);
        }
        let earlierCreatedChild_3: SpecInput = (this && this.findChildById) ? this.findChildById("3") as SpecInput : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new SpecInput("3", this, { result_str: $r('app.string.result_i'), specStrInput: this.__specStrInput_i }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                result_str: $r('app.string.result_i')
            });
            View.create(earlierCreatedChild_3);
        }
        let earlierCreatedChild_4: SpecInput = (this && this.findChildById) ? this.findChildById("4") as SpecInput : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new SpecInput("4", this, { result_str: $r('app.string.result_d'), specStrInput: this.__specStrInput_d }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({
                result_str: $r('app.string.result_d')
            });
            View.create(earlierCreatedChild_4);
        }
        let earlierCreatedChild_5: SpecInput = (this && this.findChildById) ? this.findChildById("5") as SpecInput : undefined;
        if (earlierCreatedChild_5 == undefined) {
            View.create(new SpecInput("5", this, { result_str: $r('app.string.result_s'), specStrInput: this.__specStrInput_s }));
        }
        else {
            earlierCreatedChild_5.updateWithValueParams({
                result_str: $r('app.string.result_s')
            });
            View.create(earlierCreatedChild_5);
        }
        Button.createWithChild();
        Button.id('specFormatOutput');
        Button.width('100%');
        Button.height(40);
        Button.onClick(() => {
            this.specStrInput_f = util.format("%f", "OpenHarmony 4.0");
            this.specStrInput_i = util.format("%i", "OpenHarmony 4.0");
            this.specStrInput_d = util.format("%d", "OpenHarmony 4.0");
            this.specStrInput_s = util.format("%s", "OpenHarmony 4.0");
        });
        Text.create($r('app.string.SpecFormOutput'));
        Text.fontSize(15);
        Text.fontWeight(FontWeight.Bold);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Divider.create();
        Divider.strokeWidth(4);
        Divider.color($r('sys.color.ohos_id_color_floating_button_shadow_end'));
        Row.create();
        Text.create($r('app.string.SpecString'));
        Text.fontSize(15);
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Text.create($r('app.string.StringCodec_info'));
        Text.fontSize(15);
        Text.margin({ left: 5 });
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 20 });
        Row.width('100%');
        Text.create($r('app.string.result'));
        Text.width('20%');
        Text.height(30);
        Text.fontSize(15);
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Text.create(this.resen);
        Text.height(60);
        Text.fontSize(15);
        Text.layoutWeight(1);
        Text.maxLines(2);
        Text.textAlign(TextAlign.Start);
        Text.border({ width: 2, radius: 5, color: $r('app.color.text_color') });
        Text.pop();
        Row.pop();
        Row.create();
        Row.width('100%');
        Text.create($r('app.string.read'));
        Text.width('20%');
        Text.fontSize(15);
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Text.create(this.read);
        Text.id('read');
        Text.width('30%');
        Text.fontSize(15);
        Text.height(30);
        Text.textAlign(TextAlign.Start);
        Text.border({ width: 2, radius: 5, color: $r('app.color.text_color') });
        Text.pop();
        Text.create($r('app.string.write'));
        Text.width('20%');
        Text.fontSize(15);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Text.create(this.write);
        Text.id('write');
        Text.width('30%');
        Text.fontSize(15);
        Text.height(30);
        Text.textAlign(TextAlign.Start);
        Text.border({ width: 2, radius: 5, color: $r('app.color.text_color') });
        Text.pop();
        Row.pop();
        Button.createWithChild();
        Button.id('textEncoder');
        Button.width('100%');
        Button.height(40);
        Button.onClick(() => {
            this.textEncode();
        });
        Text.create($r('app.string.Text_encoder'));
        Text.fontColor(Color.White);
        Text.fontSize(15);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Button.pop();
        Row.create();
        Row.margin({ top: 20 });
        Row.width(300);
        Text.create($r('app.string.result'));
        Text.width('20%');
        Text.height(30);
        Text.fontSize(15);
        Text.textAlign(TextAlign.Start);
        Text.fontColor(Color.Black);
        Text.pop();
        Text.create(this.resdec);
        Text.id('decRes');
        Text.width('80%');
        Text.height(60);
        Text.fontSize(15);
        Text.textAlign(TextAlign.Start);
        Text.maxLines(2);
        Text.border({ width: 2, radius: 5, color: $r('app.color.text_color') });
        Text.pop();
        Row.pop();
        Button.createWithChild();
        Button.id('textDecoder');
        Button.width('100%');
        Button.height(40);
        Button.margin({ bottom: 50 });
        Button.onClick(() => {
            this.textDecode();
        });
        Text.create($r('app.string.Text_decoder'));
        Text.fontColor(Color.White);
        Text.fontSize(15);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Button.pop();
        Column.pop();
        Scroll.pop();
    }
    textEncode() {
        let textEncoder = new util.TextEncoder();
        let buffer = new ArrayBuffer(100);
        this.resArray = new Uint8Array(buffer);
        this.resArray = textEncoder.encodeInto(getString($r('app.string.message')));
        let resArratNum = textEncoder.encodeIntoUint8Array(getString($r('app.string.message')), this.resArray);
        this.resen = this.resArray.toString();
        this.read = JSON.stringify(resArratNum.read);
        this.write = JSON.stringify(resArratNum.written);
    }
    textDecode() {
        let textDecoder = util.TextDecoder.create('utf-8', { ignoreBOM: true });
        if (this.resArray === undefined) {
            return;
        }
        this.resdec = textDecoder.decodeWithStream(this.resArray, { stream: false });
    }
}
