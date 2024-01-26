interface Index_Params {
    encoding?: string;
    BasicFileEncodingDetection?: String[];
    GB18030SamplesTest?: String[];
    GB18030SMFalsePositiveTest?: String[];
    TIS620BasicTest?: String[];
    Bug8VariousFailedCharsets?: String[];
    ShortStringTests?: String[];
    TestDetectorFile?: String[];
    BasicStreamEncodingDetection?: String[];
    Bug20LatinDetectedAsMaccyrillic?: String[];
    Bug33USASCIIToGenerous?: String[];
    TestDetector?: String[];
    // For the base64 encoding pieces.
    alphabet?: string[];
    values?: number[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is mozilla.org code.
 *
 * The Initial Developer of the Original Code is
 * Netscape Communications Corporation.
 * Portions created by the Initial Developer are Copyright (C) 1998
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Copyright (c) 2022 Huawei Device Co., Ltd.
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */
import fs from '@ohos.file.fs';
import prompt from '@system.prompt';
import { UniversalDetector } from '@ohos/juniversalchardet';
import { EncodingDetectorInputStream } from '@ohos/juniversalchardet';
import { EncodingDetectorOutputStream } from '@ohos/juniversalchardet';
import { GlobalContext } from '../entryability/GlobalContext';
function getPath(): string {
    let context: Context = GlobalContext.getContext().getObject("context") as Context;
    let filesDir: string = context.filesDir;
    let path: string = filesDir + '/';
    console.warn(`---> api-9 path:${path}`);
    return path;
}
const asciiFile: string = 'ascii.txt';
const utf8File: string = 'utf8.txt';
const utf8nFile: string = 'utf8n.txt';
const utf16leFile: string = 'utf16le.txt';
const shiftjisFile: string = 'shiftjis.txt';
const eucFile: string = 'euc.txt';
const iso2022jpFile: string = 'iso2022jp.txt';
const big5File: string = 'big5.txt';
const euctwFile: string = 'euctw.txt';
const euckrFile: string = 'euckr.txt';
const windows1255File: string = 'windows1255.txt';
const utf8nEmojiFile: string = 'utf8n-emoji.txt';
const gb2312SampleFile: string = 'gb2312-sample.txt';
const gbkSampleFile: string = 'gbk-sample.txt';
const tis620File: string = 'tis620.txt';
const bug8VariousFailedCharsetsFile: string = 'bug8-various-failed-charsets.dat';
const bug20ExampleLatinFile: string = 'bug20-example-latin.txt';
const gb18030File: string = 'gb18030.txt';
const iso88598File: string = 'iso88598.txt';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__encoding = new ObservedPropertySimple('', this, "encoding");
        this.__BasicFileEncodingDetection = new ObservedPropertyObject([asciiFile, utf8File, utf8nFile, utf16leFile, shiftjisFile,
            eucFile, iso2022jpFile, big5File, euctwFile, euckrFile, windows1255File, utf8nEmojiFile], this, "BasicFileEncodingDetection");
        this.__GB18030SamplesTest = new ObservedPropertyObject([gb2312SampleFile, gbkSampleFile], this, "GB18030SamplesTest");
        this.__GB18030SMFalsePositiveTest = new ObservedPropertyObject(['[°4°0°T°C°C°0°C°T', 'Wykamol,£588.95,0.18,0.12,testingSpecialised Products for DIY and Professionals£12'], this, "GB18030SMFalsePositiveTest");
        this.__TIS620BasicTest = new ObservedPropertyObject([tis620File], this, "TIS620BasicTest");
        this.__Bug8VariousFailedCharsets = new ObservedPropertyObject(['wPzDvCCwy7v2', 'W1Nhbm9va10gt7TKzbq70a3L0qHSw83o0rnA0snS5LfCzdWhpMPR6acg8fLz', 'zfjS19PKz+TX1Lavu9i4tDo='], this, "Bug8VariousFailedCharsets");
        this.__ShortStringTests = new ObservedPropertyObject(['aeaCàêäÇ', 'Château', 'abcd'], this, "ShortStringTests");
        this.__TestDetectorFile = new ObservedPropertyObject([bug8VariousFailedCharsetsFile, bug20ExampleLatinFile, gb18030File, iso88598File], this, "TestDetectorFile");
        this.__BasicStreamEncodingDetection = new ObservedPropertyObject([utf8File, utf8nFile, utf16leFile, shiftjisFile,
            eucFile, iso2022jpFile, big5File, euctwFile, euckrFile, windows1255File, utf8nEmojiFile], this, "BasicStreamEncodingDetection");
        this.__Bug20LatinDetectedAsMaccyrillic = new ObservedPropertyObject(['ÄÜÖßäöü,Name1ÄÜÖßäöü,Name2ÄÜÖßäöü,Name3ÄÜÖßäöü,StreetÄÜÖßäöü,MÄÜÖßäöü,DE,80080,München,ContactÄÜÖßäöü,+49(0)ÄÜÖßäöü,ÄÜÖßäöü@gls-itservices.com,CommentÄÜÖßäöü,+49,(0)98,765,432,BlÄÜÖßäöü'], this, "Bug20LatinDetectedAsMaccyrillic");
        this.__Bug33USASCIIToGenerous = new ObservedPropertyObject(['testZipHeader'], this, "Bug33USASCIIToGenerous");
        this.__TestDetector = new ObservedPropertyObject(['testDetector']
        // For the base64 encoding pieces.
        , this, "TestDetector");
        this.alphabet = [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
            'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
            'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
            'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
            'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
            'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
            'w', 'x', 'y', 'z', '0', '1', '2', '3',
            '4', '5', '6', '7', '8', '9', '+', '/'
        ];
        this.values = new Array();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.encoding !== undefined) {
            this.encoding = params.encoding;
        }
        if (params.BasicFileEncodingDetection !== undefined) {
            this.BasicFileEncodingDetection = params.BasicFileEncodingDetection;
        }
        if (params.GB18030SamplesTest !== undefined) {
            this.GB18030SamplesTest = params.GB18030SamplesTest;
        }
        if (params.GB18030SMFalsePositiveTest !== undefined) {
            this.GB18030SMFalsePositiveTest = params.GB18030SMFalsePositiveTest;
        }
        if (params.TIS620BasicTest !== undefined) {
            this.TIS620BasicTest = params.TIS620BasicTest;
        }
        if (params.Bug8VariousFailedCharsets !== undefined) {
            this.Bug8VariousFailedCharsets = params.Bug8VariousFailedCharsets;
        }
        if (params.ShortStringTests !== undefined) {
            this.ShortStringTests = params.ShortStringTests;
        }
        if (params.TestDetectorFile !== undefined) {
            this.TestDetectorFile = params.TestDetectorFile;
        }
        if (params.BasicStreamEncodingDetection !== undefined) {
            this.BasicStreamEncodingDetection = params.BasicStreamEncodingDetection;
        }
        if (params.Bug20LatinDetectedAsMaccyrillic !== undefined) {
            this.Bug20LatinDetectedAsMaccyrillic = params.Bug20LatinDetectedAsMaccyrillic;
        }
        if (params.Bug33USASCIIToGenerous !== undefined) {
            this.Bug33USASCIIToGenerous = params.Bug33USASCIIToGenerous;
        }
        if (params.TestDetector !== undefined) {
            this.TestDetector = params.TestDetector;
        }
        if (params.alphabet !== undefined) {
            this.alphabet = params.alphabet;
        }
        if (params.values !== undefined) {
            this.values = params.values;
        }
    }
    aboutToBeDeleted() {
        this.__encoding.aboutToBeDeleted();
        this.__BasicFileEncodingDetection.aboutToBeDeleted();
        this.__GB18030SamplesTest.aboutToBeDeleted();
        this.__GB18030SMFalsePositiveTest.aboutToBeDeleted();
        this.__TIS620BasicTest.aboutToBeDeleted();
        this.__Bug8VariousFailedCharsets.aboutToBeDeleted();
        this.__ShortStringTests.aboutToBeDeleted();
        this.__TestDetectorFile.aboutToBeDeleted();
        this.__BasicStreamEncodingDetection.aboutToBeDeleted();
        this.__Bug20LatinDetectedAsMaccyrillic.aboutToBeDeleted();
        this.__Bug33USASCIIToGenerous.aboutToBeDeleted();
        this.__TestDetector.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __encoding: ObservedPropertySimple<string>;
    get encoding() {
        return this.__encoding.get();
    }
    set encoding(newValue: string) {
        this.__encoding.set(newValue);
    }
    private __BasicFileEncodingDetection: ObservedPropertyObject<String[]>;
    get BasicFileEncodingDetection() {
        return this.__BasicFileEncodingDetection.get();
    }
    set BasicFileEncodingDetection(newValue: String[]) {
        this.__BasicFileEncodingDetection.set(newValue);
    }
    private __GB18030SamplesTest: ObservedPropertyObject<String[]>;
    get GB18030SamplesTest() {
        return this.__GB18030SamplesTest.get();
    }
    set GB18030SamplesTest(newValue: String[]) {
        this.__GB18030SamplesTest.set(newValue);
    }
    private __GB18030SMFalsePositiveTest: ObservedPropertyObject<String[]>;
    get GB18030SMFalsePositiveTest() {
        return this.__GB18030SMFalsePositiveTest.get();
    }
    set GB18030SMFalsePositiveTest(newValue: String[]) {
        this.__GB18030SMFalsePositiveTest.set(newValue);
    }
    private __TIS620BasicTest: ObservedPropertyObject<String[]>;
    get TIS620BasicTest() {
        return this.__TIS620BasicTest.get();
    }
    set TIS620BasicTest(newValue: String[]) {
        this.__TIS620BasicTest.set(newValue);
    }
    private __Bug8VariousFailedCharsets: ObservedPropertyObject<String[]>;
    get Bug8VariousFailedCharsets() {
        return this.__Bug8VariousFailedCharsets.get();
    }
    set Bug8VariousFailedCharsets(newValue: String[]) {
        this.__Bug8VariousFailedCharsets.set(newValue);
    }
    private __ShortStringTests: ObservedPropertyObject<String[]>;
    get ShortStringTests() {
        return this.__ShortStringTests.get();
    }
    set ShortStringTests(newValue: String[]) {
        this.__ShortStringTests.set(newValue);
    }
    private __TestDetectorFile: ObservedPropertyObject<String[]>;
    get TestDetectorFile() {
        return this.__TestDetectorFile.get();
    }
    set TestDetectorFile(newValue: String[]) {
        this.__TestDetectorFile.set(newValue);
    }
    private __BasicStreamEncodingDetection: ObservedPropertyObject<String[]>;
    get BasicStreamEncodingDetection() {
        return this.__BasicStreamEncodingDetection.get();
    }
    set BasicStreamEncodingDetection(newValue: String[]) {
        this.__BasicStreamEncodingDetection.set(newValue);
    }
    private __Bug20LatinDetectedAsMaccyrillic: ObservedPropertyObject<String[]>;
    get Bug20LatinDetectedAsMaccyrillic() {
        return this.__Bug20LatinDetectedAsMaccyrillic.get();
    }
    set Bug20LatinDetectedAsMaccyrillic(newValue: String[]) {
        this.__Bug20LatinDetectedAsMaccyrillic.set(newValue);
    }
    private __Bug33USASCIIToGenerous: ObservedPropertyObject<String[]>;
    get Bug33USASCIIToGenerous() {
        return this.__Bug33USASCIIToGenerous.get();
    }
    set Bug33USASCIIToGenerous(newValue: String[]) {
        this.__Bug33USASCIIToGenerous.set(newValue);
    }
    private __TestDetector: ObservedPropertyObject<String[]>;
    get TestDetector() {
        return this.__TestDetector.get();
    }
    set TestDetector(newValue: String[]) {
        this.__TestDetector.set(newValue);
    }
    // For the base64 encoding pieces.
    private alphabet: string[];
    private values: number[];
    render() {
        Scroll.create();
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBar(BarState.On);
        Scroll.scrollBarColor(Color.Gray);
        Scroll.scrollBarWidth(30);
        Scroll.onScroll((xOffset: number, yOffset: number) => {
            console.info(xOffset + ' ' + yOffset);
        });
        Scroll.onScrollEdge(() => {
            console.info('To the edge');
        });
        Scroll.onScrollEnd(() => {
            console.info('Scroll Stop');
        });
        Column.create({ space: 5 });
        Column.width('100%');
        Column.margin({ top: 5, bottom: 135 });
        Text.create('BasicFileEncodingDetectionTest(12) Samples：');
        Text.fontSize(26);
        Text.padding(15);
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Grid.create();
        Grid.columnsTemplate('1fr 1fr 1fr 1fr 1fr 1fr');
        Grid.columnsGap(10);
        Grid.rowsGap(10);
        Grid.onScrollIndex((first: number) => {
            console.info(first.toString());
        });
        Grid.width('90%');
        Grid.backgroundColor(0xFAEEE0);
        Grid.height(170);
        ForEach.create("2", this, ObservedObject.GetRawObject(this.BasicFileEncodingDetection), (file: string) => {
            GridItem.create();
            Text.create(file);
            Text.fontSize(16);
            Text.backgroundColor(0xF9CF93);
            Text.width('100%');
            Text.height(80);
            Text.textAlign(TextAlign.Center);
            Text.onClick(() => {
                this.encoding = 'Detected Encoding = ';
                let filePath = getPath() + file;
                UniversalDetector.detectCharset(filePath).then((encoing) => {
                    console.info('---> UniversalDetector.detectCharset:' + (this.encoding += encoing));
                    this.showResult();
                }).catch((err: Error) => {
                    this.encoding = 'detect charset err:' + JSON.stringify(err);
                    this.showResult();
                });
            });
            Text.pop();
            GridItem.pop();
        }, (day: string) => day);
        ForEach.pop();
        Grid.pop();
        Text.create('GB18030SamplesTest(2) Samples：');
        Text.fontSize(26);
        Text.padding(15);
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Grid.create();
        Grid.columnsTemplate('1fr 1fr');
        Grid.columnsGap(10);
        Grid.rowsGap(10);
        Grid.onScrollIndex((first: number) => {
            console.info(first.toString());
        });
        Grid.width('90%');
        Grid.backgroundColor(0xFAEEE0);
        Grid.height(40);
        ForEach.create("3", this, ObservedObject.GetRawObject(this.GB18030SamplesTest), (file: string) => {
            GridItem.create();
            Text.create(file);
            Text.fontSize(16);
            Text.backgroundColor(0xF9CF93);
            Text.width('100%');
            Text.height(40);
            Text.textAlign(TextAlign.Center);
            Text.onClick(() => {
                this.encoding = 'Detected Encoding = ';
                let filePath = getPath() + file;
                UniversalDetector.detectCharset(filePath).then((encoing) => {
                    console.info(this.encoding += encoing);
                    this.showResult();
                });
            });
            Text.pop();
            GridItem.pop();
        }, (day: string) => day);
        ForEach.pop();
        Grid.pop();
        Text.create('GB18030SMFalsePositiveTest(2) Samples：');
        Text.fontSize(26);
        Text.padding(15);
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Grid.create();
        Grid.columnsTemplate('1fr 1fr');
        Grid.columnsGap(10);
        Grid.rowsGap(10);
        Grid.onScrollIndex((first: number) => {
            console.info(first.toString());
        });
        Grid.width('90%');
        Grid.backgroundColor(0xFAEEE0);
        Grid.height(100);
        ForEach.create("4", this, ObservedObject.GetRawObject(this.GB18030SMFalsePositiveTest), (data: string) => {
            GridItem.create();
            Text.create(data);
            Text.fontSize(16);
            Text.backgroundColor(0xF9CF93);
            Text.width('100%');
            Text.height(100);
            Text.textAlign(TextAlign.Center);
            Text.onClick(() => {
                let fileName: string = 'GB18030SMFalsePositiveTest_' + (this.GB18030SMFalsePositiveTest.indexOf(data) + 1) + '.txt';
                this.encoding = 'Detected Encoding = ';
                let filePath = getPath() + fileName;
                let stream = fs.createStreamSync(filePath, "r+");
                let buf = new ArrayBuffer(1024);
                let nread: number = 0;
                let read_total: number = 0;
                while ((nread = stream.readSync(buf, { offset: read_total, length: buf.byteLength })) > 0) {
                    read_total += nread;
                }
                let temp = new Int8Array(buf);
                buf = this.typedArrayToBuffer(temp.subarray(0, read_total));
                this.encoding = 'Detected Encoding = ';
                let encoing: string = this.detect(buf);
                console.info(this.encoding += encoing);
                this.showResult();
            });
            Text.pop();
            GridItem.pop();
        }, (day: string) => day);
        ForEach.pop();
        Grid.pop();
        Text.create('TIS620BasicTest(1) Samples：');
        Text.fontSize(26);
        Text.padding(15);
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Grid.create();
        Grid.columnsTemplate('1fr');
        Grid.columnsGap(10);
        Grid.rowsGap(10);
        Grid.onScrollIndex((first: number) => {
            console.info(first.toString());
        });
        Grid.width('90%');
        Grid.backgroundColor(0xFAEEE0);
        Grid.height(40);
        ForEach.create("5", this, ObservedObject.GetRawObject(this.TIS620BasicTest), (file: string) => {
            GridItem.create();
            Text.create(file);
            Text.fontSize(16);
            Text.backgroundColor(0xF9CF93);
            Text.width('100%');
            Text.height(40);
            Text.textAlign(TextAlign.Center);
            Text.onClick(() => {
                this.encoding = 'Detected Encoding = ';
                let filePath = getPath() + file;
                UniversalDetector.detectCharset(filePath).then((encoing) => {
                    console.info(this.encoding += encoing);
                    this.showResult();
                });
            });
            Text.pop();
            GridItem.pop();
        }, (day: string) => day);
        ForEach.pop();
        Grid.pop();
        Text.create('Bug8VariousFailedCharsets(3) Samples：');
        Text.fontSize(26);
        Text.padding(15);
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Grid.create();
        Grid.columnsTemplate('1fr 1fr 1fr');
        Grid.columnsGap(10);
        Grid.rowsGap(10);
        Grid.onScrollIndex((first: number) => {
            console.info(first.toString());
        });
        Grid.width('90%');
        Grid.backgroundColor(0xFAEEE0);
        Grid.height(120);
        ForEach.create("6", this, ObservedObject.GetRawObject(this.Bug8VariousFailedCharsets), (data: string) => {
            GridItem.create();
            Text.create(data);
            Text.fontSize(16);
            Text.backgroundColor(0xF9CF93);
            Text.width('100%');
            Text.height(120);
            Text.textAlign(TextAlign.Center);
            Text.onClick(() => {
                for (let i = 0; i < 64; ++i) {
                    this.values[this.alphabet[i]] = i;
                }
                this.encoding = 'Detected Encoding = ';
                let buf: ArrayBuffer = this.typedArrayToBuffer(this.decode(data));
                let encoing: string = this.detect(buf);
                console.info(this.encoding += encoing);
                this.showResult();
            });
            Text.pop();
            GridItem.pop();
        }, (day: string) => day);
        ForEach.pop();
        Grid.pop();
        Text.create('ShortStringTests(3) Samples：');
        Text.fontSize(26);
        Text.padding(15);
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Grid.create();
        Grid.columnsTemplate('1fr 1fr 1fr');
        Grid.columnsGap(10);
        Grid.rowsGap(10);
        Grid.onScrollIndex((first: number) => {
            console.info(first.toString());
        });
        Grid.width('90%');
        Grid.backgroundColor(0xFAEEE0);
        Grid.height(40);
        ForEach.create("7", this, ObservedObject.GetRawObject(this.ShortStringTests), (data: string) => {
            GridItem.create();
            Text.create(data);
            Text.fontSize(16);
            Text.backgroundColor(0xF9CF93);
            Text.width('100%');
            Text.height(40);
            Text.textAlign(TextAlign.Center);
            Text.onClick(() => {
                let fileName: string = 'ShortStringTests_' + (this.ShortStringTests.indexOf(data) + 1) + '.txt';
                this.encoding = 'Detected Encoding = ';
                let filePath = getPath() + fileName;
                console.info('GetCacheDir Successful. Path: ' + filePath);
                let stream = fs.createStreamSync(filePath, "r+");
                stream.writeSync(data, {
                    offset: 0,
                    length: data.length,
                    encoding: 'utf-8'
                });
                console.info('Write Successful. Content: \'' + data + '\'');
                let buf = new ArrayBuffer(1024);
                let encoing: string = this.guessCharsetName(buf, filePath);
                console.info(this.encoding += encoing);
                this.showResult();
            });
            Text.pop();
            GridItem.pop();
        }, (day: string) => day);
        ForEach.pop();
        Grid.pop();
        Text.create('TestDetectorFile(4) Samples：');
        Text.fontSize(26);
        Text.padding(15);
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Grid.create();
        Grid.columnsTemplate('1fr 1fr 1fr 1fr');
        Grid.columnsGap(10);
        Grid.rowsGap(10);
        Grid.onScrollIndex((first: number) => {
            console.info(first.toString());
        });
        Grid.width('90%');
        Grid.backgroundColor(0xFAEEE0);
        Grid.height(100);
        ForEach.create("8", this, ObservedObject.GetRawObject(this.TestDetectorFile), (file: string) => {
            GridItem.create();
            Text.create(file);
            Text.fontSize(16);
            Text.backgroundColor(0xF9CF93);
            Text.width('100%');
            Text.height(100);
            Text.textAlign(TextAlign.Center);
            Text.onClick(() => {
                this.encoding = 'Detected Encoding = ';
                let filePath = getPath() + file;
                UniversalDetector.detectCharset(filePath).then((encoing) => {
                    console.info(this.encoding += encoing);
                    this.showResult();
                });
            });
            Text.pop();
            GridItem.pop();
        }, (day: string) => day);
        ForEach.pop();
        Grid.pop();
        Text.create('BasicStreamEncodingDetectionTest(11) Samples：');
        Text.fontSize(26);
        Text.padding(15);
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Grid.create();
        Grid.columnsTemplate('1fr 1fr 1fr 1fr 1fr 1fr');
        Grid.columnsGap(10);
        Grid.rowsGap(10);
        Grid.onScrollIndex((first: number) => {
            console.info(first.toString());
        });
        Grid.width('90%');
        Grid.backgroundColor(0xFAEEE0);
        Grid.height(170);
        ForEach.create("9", this, ObservedObject.GetRawObject(this.BasicStreamEncodingDetection), (file: string) => {
            GridItem.create();
            Text.create(file);
            Text.fontSize(16);
            Text.backgroundColor(0xF9CF93);
            Text.width('100%');
            Text.height(80);
            Text.textAlign(TextAlign.Center);
            Text.onClick(() => {
                this.encoding = 'Detected Encoding = ';
                let filePath = getPath() + file;
                let encoing: string = this.guessCharsetNameByBasicStream(filePath);
                console.info(this.encoding += encoing);
                this.showResult();
            });
            Text.pop();
            GridItem.pop();
        }, (day: string) => day);
        ForEach.pop();
        Grid.pop();
        Text.create('Bug20LatinDetectedAsMaccyrillicTest(1) Samples：');
        Text.fontSize(26);
        Text.padding(15);
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Grid.create();
        Grid.columnsTemplate('1fr');
        Grid.columnsGap(10);
        Grid.rowsGap(10);
        Grid.onScrollIndex((first: number) => {
            console.info(first.toString());
        });
        Grid.width('90%');
        Grid.backgroundColor(0xFAEEE0);
        Grid.height(130);
        ForEach.create("10", this, ObservedObject.GetRawObject(this.Bug20LatinDetectedAsMaccyrillic), (data: string) => {
            GridItem.create();
            Text.create(data);
            Text.fontSize(16);
            Text.backgroundColor(0xF9CF93);
            Text.width('100%');
            Text.height(130);
            Text.textAlign(TextAlign.Center);
            Text.onClick(() => {
                let fileName: string = 'Bug20LatinDetectedAsMaccyrillicTest_' + (this.Bug20LatinDetectedAsMaccyrillic.indexOf(data) + 1) + '.txt';
                this.encoding = 'Detected Encoding = ';
                let filePath = getPath() + fileName;
                let stream = fs.createStreamSync(filePath, "r+");
                stream.writeSync(data, {
                    offset: 0,
                    length: data.length,
                    encoding: 'utf-8'
                });
                console.info('Write Successful. Content: \'' + data + '\'');
                let buf = new ArrayBuffer(1024);
                let encoing: string = this.guessCharsetName(buf, filePath);
                console.info(this.encoding += encoing);
                this.showResult();
            });
            Text.pop();
            GridItem.pop();
        }, (day: string) => day);
        ForEach.pop();
        Grid.pop();
        // zipHeader Test Result:
        Text.create('Bug33USASCIIToGenerous(1) Samples：');
        // zipHeader Test Result:
        Text.fontSize(26);
        // zipHeader Test Result:
        Text.padding(15);
        // zipHeader Test Result:
        Text.textAlign(TextAlign.Start);
        // zipHeader Test Result:
        Text.pop();
        Grid.create();
        Grid.columnsTemplate('1fr');
        Grid.columnsGap(10);
        Grid.rowsGap(10);
        Grid.onScrollIndex((first: number) => {
            console.info(first.toString());
        });
        Grid.width('90%');
        Grid.backgroundColor(0xFAEEE0);
        Grid.height(40);
        ForEach.create("11", this, ObservedObject.GetRawObject(this.Bug33USASCIIToGenerous), (data: string) => {
            GridItem.create();
            Text.create(data);
            Text.fontSize(16);
            Text.backgroundColor(0xF9CF93);
            Text.width('100%');
            Text.height(40);
            Text.textAlign(TextAlign.Center);
            Text.onClick(() => {
                let fileName: string = 'Bug33USASCIIToGenerous_' + (this.Bug33USASCIIToGenerous.indexOf(data) + 1) + '.txt';
                this.encoding = 'Detected Encoding = ';
                let filePath = getPath() + fileName;
                let stream = fs.createStreamSync(filePath, "r+");
                let zipHeader: number[] = new Array(0x50, 0x4b, 0x03, 0x04, 0x14, 0x00, 0x02, 0x00);
                let tempIntArray = this.typedArrayToBuffer(new Int8Array(zipHeader));
                let encoing: string = UniversalDetector.detectCharsetBranch(stream, tempIntArray);
                console.info(this.encoding += encoing);
                this.showResult();
            });
            Text.pop();
            GridItem.pop();
        }, (day: string) => day);
        ForEach.pop();
        Grid.pop();
        Text.create('TestDetector(1) Samples：');
        Text.fontSize(26);
        Text.padding(15);
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Grid.create();
        Grid.columnsTemplate('1fr');
        Grid.columnsGap(10);
        Grid.rowsGap(10);
        Grid.onScrollIndex((first: number) => {
            console.info(first.toString());
        });
        Grid.width('90%');
        Grid.backgroundColor(0xFAEEE0);
        Grid.height(40);
        ForEach.create("12", this, ObservedObject.GetRawObject(this.TestDetector), (data: string) => {
            GridItem.create();
            Text.create(data);
            Text.fontSize(16);
            Text.backgroundColor(0xF9CF93);
            Text.width('100%');
            Text.height(40);
            Text.textAlign(TextAlign.Center);
            Text.onClick(() => {
                let fileName: string = 'TestDetector_' + (this.TestDetector.indexOf(data) + 1) + '.txt';
                this.encoding = 'Detected Encoding = ';
                let filePath = getPath() + fileName;
                let encoing: string = this.guessCharsetNameByTestDetector(filePath);
                console.info(this.encoding += encoing);
                if (encoing == null) {
                    this.encoding = 'No encoding detected.';
                }
                this.showResult();
            });
            Text.pop();
            GridItem.pop();
        }, (day: string) => day);
        ForEach.pop();
        Grid.pop();
        Text.create(this.encoding);
        Text.fontSize(36);
        Text.padding(15);
        Text.visibility(Visibility.Hidden);
        Text.pop();
        Column.pop();
        Scroll.pop();
    }
    guessCharsetName(buf: ArrayBuffer, filePath: string): string {
        let detector: UniversalDetector = new UniversalDetector();
        let stream = fs.createStreamSync(filePath, "r+");
        let nread = 0;
        let read_total: number = 0;
        while ((nread = stream.readSync(buf, { offset: read_total, length: buf.byteLength })) > 0) {
            read_total += nread;
        }
        let temp = new Int8Array(buf);
        buf = this.typedArrayToBuffer(temp.subarray(0, read_total));
        detector.handleData(buf, 0, buf.byteLength);
        detector.dataEnd();
        return detector.getDetectedCharset();
    }
    detect(data: ArrayBuffer): string {
        let detector: UniversalDetector = new UniversalDetector();
        detector.handleData(data, 0, data.byteLength);
        detector.dataEnd();
        let detected: string = detector.getDetectedCharset();
        detector.reset();
        return detected;
    }
    guessCharsetNameByBasicStream(path: string): string {
        let edis: EncodingDetectorInputStream = new EncodingDetectorInputStream();
        let edos: EncodingDetectorOutputStream = new EncodingDetectorOutputStream();
        try {
            let stream = fs.createStreamSync(path, "r+");
            let buffer = new ArrayBuffer(1024);
            let read: number = 0;
            let read_total: number = 0;
            while ((read = edis.readWithOneParameter(stream, buffer, read_total)) > 0) {
                edos.writeWithTreeParameter(stream, buffer, read_total, read);
                read_total += read;
            }
        }
        finally {
            edos.close();
            edis.close();
        }
        let encodingRead: string = edis.getDetectedCharset();
        let encodingWrite: string = edos.getDetectedCharset();
        let encoing: string = '';
        if (encodingRead != null && encodingWrite != null && encodingRead.valueOf() == encodingWrite.valueOf()) {
            encoing = encodingRead;
        }
        return encoing;
    }
    guessCharsetNameByTestDetector(path: string): string {
        let stream = fs.createStreamSync(path, "r+");
        let buf = new ArrayBuffer(1024);
        let detector: UniversalDetector = new UniversalDetector();
        let nread: number;
        let read_total: number = 0;
        while ((nread = stream.readSync(buf, { offset: read_total, length: buf.byteLength })) > 0 && !detector.isDone()) {
            detector.handleData(buf, 0, nread);
            read_total += nread;
        }
        detector.dataEnd();
        let encoding: string = detector.getDetectedCharset();
        detector.reset();
        return encoding;
    }
    /**
     * @param {?} data
     * @return {?}
     */
    decode(data: string) {
        let size: number = data.length;
        if (size === 0) {
            return new Int8Array(new ArrayBuffer(0));
        }
        if (size % 4 !== 0) {
            throw new Error('Bad length: ' + size);
        }
        let reg: RegExp = new RegExp("^[a-zA-Z0-9+/]+={0,2}$");
        if (!data.match(reg)) {
            throw new Error('Invalid base64 encoded value');
        }
        // Every 4 base64 chars = 24 bits = 3 bytes. But, we also need to figure out
        // padding, if any.
        let bytes = 3 * (size / 4);
        let numPad = 0;
        if (data.charAt(size - 1) === '=') {
            numPad++;
            bytes--;
        }
        if (data.charAt(size - 2) === '=') {
            numPad++;
            bytes--;
        }
        let buffer = new Int8Array(new ArrayBuffer(bytes));
        let index = 0;
        let bufferIndex = 0;
        let quantum = 0;
        if (numPad > 0) {
            size -= 4; // handle the last one specially
        }
        /* tslint:disable:no-bitwise */
        while (index < size) {
            quantum = 0;
            for (let i = 0; i < 4; ++i) {
                quantum = (quantum << 6) | this.values[data.charAt(index + i)];
            }
            // quantum is now a 24-bit value.
            buffer[bufferIndex++] = (quantum >> 16) & 0xff;
            buffer[bufferIndex++] = (quantum >> 8) & 0xff;
            buffer[bufferIndex++] = quantum & 0xff;
            index += 4;
        }
        if (numPad > 0) {
            // if numPad == 1, there is one =, and we have 18 bits with 2 0s at end.
            // if numPad == 2, there is two ==, and we have 12 bits with 4 0s at end.
            // First, grab my quantum.
            quantum = 0;
            for (let i = 0; i < 4 - numPad; ++i) {
                quantum = (quantum << 6) | this.values[data.charAt(index + i)];
            }
            if (numPad === 1) {
                // quantum is 18 bits, but really represents two bytes.
                quantum = quantum >> 2;
                buffer[bufferIndex++] = (quantum >> 8) & 0xff;
                buffer[bufferIndex++] = quantum & 0xff;
            }
            else {
                // quantum is 12 bits, but really represents only one byte.
                quantum = quantum >> 4;
                buffer[bufferIndex++] = quantum & 0xff;
            }
        }
        /* tslint:enable:no-bitwise */
        return buffer;
    }
    showResult() {
        prompt.showToast({
            message: this.encoding,
            duration: 5000
        });
    }
    typedArrayToBuffer(array: Int8Array): ArrayBuffer {
        return array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset);
    }
}
loadDocument(new Index("1", undefined, {}));
