interface QrCodePage_Params {
    pixelMap?: image.PixelMap | undefined;
    message?: string;
    inputText?: string;
    qrcode?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "qrCodePage_" + ++__generate__Id;
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
import { BarcodeFormat } from '@ohos/zxing';
import QRCode from '../util/QRCode';
import image from '@ohos.multimedia.image';
class QrCodePage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__pixelMap = new ObservedPropertyObject(undefined, this, "pixelMap");
        this.__message = new ObservedPropertySimple('', this, "message");
        this.__inputText = new ObservedPropertySimple('', this, "inputText");
        this.qrcode = new QRCode();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: QrCodePage_Params) {
        if (params.pixelMap !== undefined) {
            this.pixelMap = params.pixelMap;
        }
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.inputText !== undefined) {
            this.inputText = params.inputText;
        }
        if (params.qrcode !== undefined) {
            this.qrcode = params.qrcode;
        }
    }
    aboutToBeDeleted() {
        this.__pixelMap.aboutToBeDeleted();
        this.__message.aboutToBeDeleted();
        this.__inputText.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __pixelMap: ObservedPropertyObject<image.PixelMap | undefined>;
    get pixelMap() {
        return this.__pixelMap.get();
    }
    set pixelMap(newValue: image.PixelMap | undefined) {
        this.__pixelMap.set(newValue);
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __inputText: ObservedPropertySimple<string>;
    get inputText() {
        return this.__inputText.get();
    }
    set inputText(newValue: string) {
        this.__inputText.set(newValue);
    }
    private qrcode;
    async encode() {
        this.pixelMap = await this.qrcode.encode(this.inputText, {
            width: 260,
            height: 260,
            format: BarcodeFormat.QR_CODE
        });
    }
    async decode() {
        try {
            this.message = await this.qrcode.decode(this.pixelMap as image.PixelMap, {
                width: 260,
                height: 260,
                format: BarcodeFormat.QR_CODE
            });
        }
        catch (err) {
            console.log('[Demo] decode error:' + JSON.stringify(err));
        }
    }
    render() {
        Column.create();
        If.create();
        if (this.pixelMap) {
            If.branchId(0);
            Image.create(this.pixelMap);
            Image.width(260);
            Image.height(260);
            Image.margin(30);
        }
        If.pop();
        Text.create('解析结果：' + this.message);
        Text.fontSize(14);
        Text.pop();
        TextInput.create({ placeholder: 'input your word', text: this.inputText });
        TextInput.height(60);
        TextInput.border({ width: 5, color: Color.Red });
        TextInput.placeholderColor(Color.Blue);
        TextInput.placeholderFont({ size: 20, weight: FontWeight.Normal, family: "sans-serif", style: FontStyle.Italic });
        TextInput.caretColor(Color.Blue);
        TextInput.enterKeyType(EnterKeyType.Search);
        TextInput.onChange((value: string) => {
            this.inputText = value;
        });
        Button.createWithLabel('生成二维码');
        Button.fontSize(25);
        Button.width(300);
        Button.margin(20);
        Button.onClick(() => this.encode());
        Button.pop();
        Button.createWithLabel('解析二维码');
        Button.fontSize(25);
        Button.width(300);
        Button.margin(20);
        Button.onClick(() => this.decode());
        Button.pop();
        Column.pop();
    }
}
loadDocument(new QrCodePage("1", undefined, {}));
