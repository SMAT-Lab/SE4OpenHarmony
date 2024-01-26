interface EncodeComponent_Params {
    logName?: string;
    barcodeFormat?: number;
    content?: string;
    widths?: number;
    heights?: number;
    pixelMap?: PixelMap | undefined;
    decodeText?: string;
    inputText?: string;
    encodeTimeStr?: string;
    decodeTimeStr?: string;
}
interface zxingPage_Params {
    barcodeFormatArray?: Array<string>;
    format?: number;
    logName?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "zxingPage_" + ++__generate__Id;
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
import { getPixelMap, getPixelMapInt32ArrayData, createEmptyPixelMap } from "../util/imageUtils";
import { decode, decodeEAN_13, decodeCODE_128 } from "../util/decode";
import { encode, encodeEAN_13, encodeUPC_E, encodeOnBar128Code } from "../util/encoder";
import { maxiCodeData } from "../util/maxiCodeData";
import { rss14CodeData } from "../util/rss14CodeData";
import { rssexandedCodeData } from "../util/rssexandedCodeData";
import { CodeData, Params } from '../util/interface';
let gobleFormat: number = BarcodeFormat.QR_CODE;
class zxingPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.barcodeFormatArray = new Array();
        this.__format = new ObservedPropertySimple(gobleFormat, this, "format");
        this.__logName = new ObservedPropertySimple("", this, "logName");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: zxingPage_Params) {
        if (params.barcodeFormatArray !== undefined) {
            this.barcodeFormatArray = params.barcodeFormatArray;
        }
        if (params.format !== undefined) {
            this.format = params.format;
        }
        if (params.logName !== undefined) {
            this.logName = params.logName;
        }
    }
    aboutToBeDeleted() {
        this.__format.aboutToBeDeleted();
        this.__logName.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private barcodeFormatArray: Array<string>;
    private __format: ObservedPropertySimple<number>;
    get format() {
        return this.__format.get();
    }
    set format(newValue: number) {
        this.__format.set(newValue);
    }
    private __logName: ObservedPropertySimple<string>;
    get logName() {
        return this.__logName.get();
    }
    set logName(newValue: string) {
        this.__logName.set(newValue);
    }
    render() {
        Flex.create({ direction: FlexDirection.Column });
        Text.create('Hello Zxing');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Row.create();
        Row.height("50%");
        Row.alignItems(VerticalAlign.Top);
        Row.backgroundColor(0xAFEEEE);
        Column.create();
        Column.backgroundColor(0xFFEFD5);
        Column.layoutWeight(2);
        List.create({ space: 5, initialIndex: 0 });
        List.listDirection(Axis.Vertical);
        ForEach.create("2", this, ObservedObject.GetRawObject(this.barcodeFormatArray), (item: string) => {
            ListItem.create();
            ListItem.editable(true);
            ListItem.onClick(() => {
                console.log(TAG + item);
                this.format = this.barcodeFormatArray.indexOf(item);
                console.log(TAG + "onClick() " + this.format);
                gobleFormat = this.format;
                this.logName = item + '';
            });
            Text.create('' + item);
            Text.width('100%');
            Text.height(40);
            Text.fontSize(16);
            Text.textAlign(TextAlign.Center);
            Text.backgroundColor(0xFFFFFF);
            Text.pop();
            ListItem.pop();
        }, (item: string, index?: number) => {
            return item + '';
        });
        ForEach.pop();
        List.pop();
        Column.pop();
        Column.create();
        Column.backgroundColor(0xF5DEB3);
        Column.layoutWeight(5);
        let earlierCreatedChild_3: EncodeComponent = (this && this.findChildById) ? this.findChildById("3") as EncodeComponent : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new EncodeComponent("3", this, {
                logName: this.logName + "码生成解析",
                content: "12345678",
                barcodeFormat: this.format,
                widths: 200,
                heights: 200
            }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                logName: this.logName + "码生成解析",
                content: "12345678",
                barcodeFormat: this.format,
                widths: 200,
                heights: 200
            });
            View.create(earlierCreatedChild_3);
        }
        Column.pop();
        Row.pop();
        Flex.pop();
    }
    aboutToAppear(): void {
        console.log(TAG + "parent aboutToAppear");
        let barcodeFormatArrayTemp: Array<string> = [
            'AZTEC', 'CODABAR', 'CODE_39', 'CODE_93', 'CODE_128',
            'DATA_MATRIX', 'EAN_8', 'EAN_13', 'ITF', 'MAXICODE',
            'PDF_417', 'QR_CODE', 'RSS_14', 'RSS_EXPANDED', 'UPC_A',
            'UPC_E'
        ];
        this.barcodeFormatArray = barcodeFormatArrayTemp;
        this.logName = this.barcodeFormatArray[this.format].toString();
    }
}
class EncodeComponent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__logName = new SynchedPropertySimpleOneWay(params.logName, this, "logName");
        this.__barcodeFormat = new SynchedPropertySimpleOneWay(params.barcodeFormat, this, "barcodeFormat");
        this.__content = new SynchedPropertySimpleOneWay(params.content, this, "content");
        this.__widths = new SynchedPropertySimpleOneWay(params.widths, this, "widths");
        this.__heights = new SynchedPropertySimpleOneWay(params.heights, this, "heights");
        this.__pixelMap = new ObservedPropertyObject(undefined, this, "pixelMap");
        this.__decodeText = new ObservedPropertySimple('', this, "decodeText");
        this.__inputText = new ObservedPropertySimple('', this, "inputText");
        this.__encodeTimeStr = new ObservedPropertySimple("生成耗时:", this, "encodeTimeStr");
        this.__decodeTimeStr = new ObservedPropertySimple("解析耗时:", this, "decodeTimeStr");
        this.updateWithValueParams(params);
        this.declareWatch("barcodeFormat", this.onBarcodeFormat);
    }
    updateWithValueParams(params: EncodeComponent_Params) {
        this.logName = params.logName;
        this.barcodeFormat = params.barcodeFormat;
        this.content = params.content;
        this.widths = params.widths;
        this.heights = params.heights;
        if (params.pixelMap !== undefined) {
            this.pixelMap = params.pixelMap;
        }
        if (params.decodeText !== undefined) {
            this.decodeText = params.decodeText;
        }
        if (params.inputText !== undefined) {
            this.inputText = params.inputText;
        }
        if (params.encodeTimeStr !== undefined) {
            this.encodeTimeStr = params.encodeTimeStr;
        }
        if (params.decodeTimeStr !== undefined) {
            this.decodeTimeStr = params.decodeTimeStr;
        }
    }
    aboutToBeDeleted() {
        this.__logName.aboutToBeDeleted();
        this.__barcodeFormat.aboutToBeDeleted();
        this.__content.aboutToBeDeleted();
        this.__widths.aboutToBeDeleted();
        this.__heights.aboutToBeDeleted();
        this.__pixelMap.aboutToBeDeleted();
        this.__decodeText.aboutToBeDeleted();
        this.__inputText.aboutToBeDeleted();
        this.__encodeTimeStr.aboutToBeDeleted();
        this.__decodeTimeStr.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __logName: SynchedPropertySimpleOneWay<string>;
    get logName() {
        return this.__logName.get();
    }
    set logName(newValue: string) {
        this.__logName.set(newValue);
    }
    private __barcodeFormat: SynchedPropertySimpleOneWay<number>;
    get barcodeFormat() {
        return this.__barcodeFormat.get();
    }
    set barcodeFormat(newValue: number) {
        this.__barcodeFormat.set(newValue);
    }
    private __content: SynchedPropertySimpleOneWay<string>;
    get content() {
        return this.__content.get();
    }
    set content(newValue: string) {
        this.__content.set(newValue);
    }
    private __widths: SynchedPropertySimpleOneWay<number>;
    get widths() {
        return this.__widths.get();
    }
    set widths(newValue: number) {
        this.__widths.set(newValue);
    }
    private __heights: SynchedPropertySimpleOneWay<number>;
    get heights() {
        return this.__heights.get();
    }
    set heights(newValue: number) {
        this.__heights.set(newValue);
    }
    private __pixelMap: ObservedPropertyObject<PixelMap | undefined>;
    get pixelMap() {
        return this.__pixelMap.get();
    }
    set pixelMap(newValue: PixelMap | undefined) {
        this.__pixelMap.set(newValue);
    }
    private __decodeText: ObservedPropertySimple<string>;
    get decodeText() {
        return this.__decodeText.get();
    }
    set decodeText(newValue: string) {
        this.__decodeText.set(newValue);
    }
    private __inputText: ObservedPropertySimple<string>;
    get inputText() {
        return this.__inputText.get();
    }
    set inputText(newValue: string) {
        this.__inputText.set(newValue);
    }
    private __encodeTimeStr: ObservedPropertySimple<string>;
    get encodeTimeStr() {
        return this.__encodeTimeStr.get();
    }
    set encodeTimeStr(newValue: string) {
        this.__encodeTimeStr.set(newValue);
    }
    private __decodeTimeStr: ObservedPropertySimple<string>;
    get decodeTimeStr() {
        return this.__decodeTimeStr.get();
    }
    set decodeTimeStr(newValue: string) {
        this.__decodeTimeStr.set(newValue);
    }
    render() {
        Column.create();
        Text.create(this.logName);
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Image.create(this.pixelMap);
        Image.width(this.widths);
        Image.height(this.heights);
        Image.backgroundColor(Color.Red);
        Image.border({ width: 5, color: Color.Yellow });
        Image.objectFit(ImageFit.Contain);
        Text.create(this.encodeTimeStr);
        Text.fontSize(18);
        Text.pop();
        TextInput.create({ placeholder: 'input your word', text: this.inputText });
        TextInput.height(60);
        TextInput.border({ width: 5, color: Color.Red });
        TextInput.placeholderColor(Color.Blue);
        TextInput.placeholderFont({ size: 100, weight: FontWeight.Normal, family: "sans-serif", style: FontStyle.Italic });
        TextInput.caretColor(Color.Blue);
        TextInput.enterKeyType(EnterKeyType.Search);
        TextInput.onSubmit((enterKey: EnterKeyType) => {
            this.decodeText = "正在解析中";
            this.encodeCode();
        });
        TextInput.onChange((value: string) => {
            this.content = value;
            this.inputText = value;
            this.decodeText = "正在解析中";
            this.encodeCode();
        });
        Text.create(this.decodeTimeStr);
        Text.fontSize(20);
        Text.pop();
        Text.create(this.logName + "解析成的结果:::" + this.decodeText);
        Text.pop();
        Divider.create();
        Divider.color(Color.Black);
        Divider.strokeWidth(2);
        Column.pop();
    }
    onBarcodeFormat(barcodeFormat: number): void {
        // 这里用个全局的gobleFormat存储format，不然这里每次或者到的this.barcodeFormat都是前一次数据
        this.encodeCodes(gobleFormat);
    }
    aboutToAppear(): void {
        console.log(TAG + "child aboutToAppear");
        this.encodeCode();
    }
    typedArrayToBuffer(array: Int32Array | Uint32Array): ArrayBuffer {
        return array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset);
    }
    encodeCode() {
        this.encodeCodes(this.barcodeFormat);
    }
    encodeCodes(barcodeFormat: number) {
        // 通过zxing获取到二维码图片数据
        let logName: string = this.logName;
        let content: string = this.content;
        let width = getOneBarWidth(barcodeFormat, this.widths);
        console.info(TAG + "encodeCode " + 'content:' + content);
        let height = getOneBarHeight(barcodeFormat, this.heights);
        let statTime = Date.now();
        const encodeObj = getEncode(content, barcodeFormat, width, height);
        this.encodeTimeStr = "生成码耗时:" + (Date.now() - statTime);
        console.info(TAG + "encodeCode " + "生成码耗时:" + (Date.now() - statTime));
        if (encodeObj.error !== "") {
            createEmptyPixelMap().then((pixelMap) => this.pixelMap = pixelMap);
            this.decodeText = `解析失败:${encodeObj.error}`;
            this.decodeTimeStr = "解析码耗时:error";
            console.info(TAG + "encodeCode " + 'err:' + `解析失败:${encodeObj.error}`);
            return;
        }
        getPixelMap(this.typedArrayToBuffer(encodeObj.matrixPixelData), encodeObj.width, encodeObj.height)
            .then((data) => {
            setTimeout(() => {
                this.pixelMap = data;
                console.error(TAG + logName + ' encodeAsPixelMap Succeed');
                getPixelMapInt32ArrayData(data)
                    .then((arrayData: Int32Array) => {
                    statTime = Date.now();
                    const resultText = getDecode(arrayData, encodeObj.width, encodeObj.height, barcodeFormat);
                    this.decodeText = resultText == null ? "解析失败" : "<content:" + content + "> 解析为:::" + resultText;
                    this.decodeTimeStr = "解析码耗时:" + (Date.now() - statTime);
                    console.log(TAG + logName + " encodeCode decode result:::" + resultText);
                });
            }, 100);
        });
    }
}
function getOneBarHeight(format: number, height: number) {
    if (is2DCode(format)) {
        return height;
    }
    return 100;
}
function getOneBarWidth(format: number, width: number) {
    if (is2DCode(format)) {
        return width;
    }
    return 200;
}
function is2DCode(format: number) {
    return format == BarcodeFormat.QR_CODE
        || format == BarcodeFormat.DATA_MATRIX
        || format == BarcodeFormat.AZTEC
        || format == BarcodeFormat.PDF_417
        || format == BarcodeFormat.MAXICODE;
}
function getEncode(content: string, barcodeFormat: number, width: number, height: number): CodeData {
    if (barcodeFormat === BarcodeFormat.MAXICODE) {
        return maxiCodeData;
    }
    else if (barcodeFormat === BarcodeFormat.RSS_14) {
        return rss14CodeData;
    }
    else if (barcodeFormat === BarcodeFormat.RSS_EXPANDED) {
        return rssexandedCodeData;
    }
    if (barcodeFormat === BarcodeFormat.EAN_13) {
        return encodeEAN_13(content, width, height);
    }
    else if (barcodeFormat === BarcodeFormat.UPC_E) {
        return encodeUPC_E(content, width, height);
    }
    else if (barcodeFormat === BarcodeFormat.CODE_128) {
        return encodeOnBar128Code(content, width, height);
    }
    if (is2DCode(barcodeFormat)) {
        return encode(content, barcodeFormat, width, height);
    }
    else {
        return encode(content, barcodeFormat, width, height, null);
    }
}
function getDecode(arrayData: Uint8ClampedArray | Int32Array, width: number, height: number, barcodeFormat: BarcodeFormat): string {
    if (barcodeFormat === BarcodeFormat.EAN_13) {
        return decodeEAN_13(arrayData, width, height);
    }
    else if (barcodeFormat === BarcodeFormat.CODE_128) {
        return decodeCODE_128(arrayData, width, height);
    }
    return decode(arrayData, width, height, barcodeFormat);
}
let TAG: string = "zxingPage-----------";
loadDocument(new zxingPage("1", undefined, {}));
