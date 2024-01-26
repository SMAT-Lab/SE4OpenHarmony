interface Parse_Params {
    parsePlistKeys?: Array<string>;
    parsePlistText?: string;
    xmlFile?: string;
    xmlArrayFile?: string;
    asciiFile?: string;
    binaryFile?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Parse_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import { NSNumber } from '@ohos/dd-plist';
import { NSArray } from '@ohos/dd-plist';
import { NSData } from '@ohos/dd-plist';
import { NSObject } from '@ohos/dd-plist';
import { NSDictionary } from '@ohos/dd-plist';
import { ArrayUtils } from '@ohos/dd-plist';
import { PropertyListParser } from '@ohos/dd-plist';
import router from '@ohos.router';
import fs from '@ohos.file.fs';
import prompt from '@ohos.promptAction';
import { GlobalContext } from '../pages/GlobalContext';
let path = GlobalContext.getContext().getValue("path");
let stream: fs.Stream;
async function routePage() {
    try {
        await router.pushUrl({
            url: 'pages/Write'
        });
    }
    catch (err) {
        console.error(`fail callback, code: ${err.code}, msg: ${err.msg}`);
    }
}
class Parse extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__parsePlistKeys = new ObservedPropertyObject(new Array(), this, "parsePlistKeys");
        this.__parsePlistText = new ObservedPropertySimple('', this, "parsePlistText");
        this.xmlFile = 'xmlForParse.plist';
        this.xmlArrayFile = 'xmlArrayForParse.plist';
        this.asciiFile = 'asciiForParse.plist';
        this.binaryFile = 'binaryForParse.plist';
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Parse_Params) {
        if (params.parsePlistKeys !== undefined) {
            this.parsePlistKeys = params.parsePlistKeys;
        }
        if (params.parsePlistText !== undefined) {
            this.parsePlistText = params.parsePlistText;
        }
        if (params.xmlFile !== undefined) {
            this.xmlFile = params.xmlFile;
        }
        if (params.xmlArrayFile !== undefined) {
            this.xmlArrayFile = params.xmlArrayFile;
        }
        if (params.asciiFile !== undefined) {
            this.asciiFile = params.asciiFile;
        }
        if (params.binaryFile !== undefined) {
            this.binaryFile = params.binaryFile;
        }
    }
    aboutToBeDeleted() {
        this.__parsePlistKeys.aboutToBeDeleted();
        this.__parsePlistText.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    public __parsePlistKeys: ObservedPropertyObject<Array<string>>;
    get parsePlistKeys() {
        return this.__parsePlistKeys.get();
    }
    set parsePlistKeys(newValue: Array<string>) {
        this.__parsePlistKeys.set(newValue);
    }
    public __parsePlistText: ObservedPropertySimple<string>;
    get parsePlistText() {
        return this.__parsePlistText.get();
    }
    set parsePlistText(newValue: string) {
        this.__parsePlistText.set(newValue);
    }
    private xmlFile: string;
    private xmlArrayFile: string;
    private asciiFile: string;
    private binaryFile: string;
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Text.create('读取plist文件');
        Text.fontSize(30);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Button.createWithChild();
        Button.type(ButtonType.Capsule);
        Button.margin({
            top: 20
        });
        Button.height(50);
        Button.backgroundColor('#4e9bd1');
        Button.onClick(() => {
            this.parseXMLPlist();
        });
        Text.create('读取plist文件（XML字典）');
        Text.fontSize(30);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.type(ButtonType.Capsule);
        Button.margin({
            top: 20
        });
        Button.height(50);
        Button.backgroundColor('#4e9bd1');
        Button.onClick(() => {
            this.parseXMLPlist2();
        });
        Text.create('读取plist文件（XML数组）');
        Text.fontSize(30);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.type(ButtonType.Capsule);
        Button.margin({
            top: 20
        });
        Button.backgroundColor('#4e9bd1');
        Button.height(50);
        Button.onClick(() => {
            this.parseASCIIPlist();
        });
        Text.create('读取plist文件（ASCII）');
        Text.fontSize(30);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.type(ButtonType.Capsule);
        Button.margin({
            top: 20
        });
        Button.height(50);
        Button.backgroundColor('#4e9bd1');
        Button.onClick(() => {
            this.parseBinaryPlist();
        });
        Text.create('读取plist文件（Binary）');
        Text.fontSize(30);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.type(ButtonType.Capsule);
        Button.margin({
            top: 20
        });
        Button.backgroundColor('#0D9FFB');
        Button.onClick(() => {
            this.clear();
            routePage();
        });
        Text.create('去测试写入');
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Button.pop();
        Text.create("该文件中包含下列key或内容：");
        Text.fontSize(20);
        Text.align(Alignment.Center);
        Text.margin({ top: 20 });
        Text.pop();
        List.create();
        List.width('80%');
        List.layoutWeight(1);
        List.margin({ top: 10 });
        List.padding({ left: 5, right: 5 });
        List.divider({ strokeWidth: 0.5, color: '#aaa' });
        If.create();
        if (this.parsePlistKeys.length > 0) {
            If.branchId(0);
            ForEach.create("2", this, ObservedObject.GetRawObject(this.parsePlistKeys), (key: string) => {
                ListItem.create();
                Row.create();
                Row.width('100%');
                Row.height(40);
                Column.create();
                Column.layoutWeight(1);
                Column.margin({ left: 10 });
                Column.alignItems(HorizontalAlign.Start);
                Text.create(key);
                Text.fontSize(14);
                Text.pop();
                Column.pop();
                Row.pop();
                ListItem.pop();
            }, (item: number) => item.toString());
            ForEach.pop();
        }
        else if (this.parsePlistText.length > 0) {
            If.branchId(1);
            ListItem.create();
            Row.create();
            Row.width('100%');
            Row.height(500);
            Column.create();
            Column.layoutWeight(1);
            Column.margin({ left: 10 });
            Column.alignItems(HorizontalAlign.Start);
            Text.create(this.parsePlistText);
            Text.fontSize(14);
            Text.pop();
            Column.pop();
            Row.pop();
            ListItem.pop();
        }
        If.pop();
        List.pop();
        Flex.pop();
    }
    public parseXMLPlist() {
        let filePath = path + this.xmlFile;
        let buf = new ArrayBuffer(8192);
        // 以同步方法从文件读取数据。
        try {
            stream = fs.createStreamSync(filePath, "r+");
        }
        catch (err) {
            prompt.showToast({
                message: 'No file found!',
                duration: 1000
            });
        }
        if (!stream) {
            return;
        }
        let nread = stream.readSync(buf);
        let temp = new Int8Array(buf);
        let arr: Int8Array = ArrayUtils.uint8Arr2Int8Arr(new Uint8Array(temp.subarray(0, nread).buffer));
        PropertyListParser.parseByInt8Array(arr, (obj: NSObject) => {
            if (obj instanceof NSDictionary) {
                let nsd: NSDictionary = obj;
                this.clear();
                this.parsePlistKeys = nsd.allKeys();
                let nsd2 = nsd.objectForKey("files2");
                if (nsd2 instanceof NSDictionary) {
                    let nsdata = nsd2.objectForKey("hash") as NSData;
                }
            }
        });
    }
    public parseXMLPlist2() {
        let filePath = path + this.xmlArrayFile;
        let buf = new ArrayBuffer(8192);
        // 以同步方法从文件读取数据。
        try {
            stream = fs.createStreamSync(filePath, "r+");
        }
        catch (err) {
            prompt.showToast({
                message: 'No file found!',
                duration: 1000
            });
        }
        if (!stream) {
            return;
        }
        let nread = stream.readSync(buf);
        let temp = new Int8Array(buf);
        let arr: Int8Array = ArrayUtils.uint8Arr2Int8Arr(new Uint8Array(temp.subarray(0, nread).buffer));
        PropertyListParser.parseByInt8Array(arr, (obj: NSObject) => {
            if (obj instanceof NSArray) {
                let nsa: NSArray = obj;
                this.clear();
                this.parsePlistText = "IntegerValue = " + nsa.getArray().toString();
            }
        });
    }
    public parseASCIIPlist() {
        let filePath = path + this.asciiFile;
        let buf = new ArrayBuffer(8192);
        // 以同步方法从文件读取数据。
        try {
            stream = fs.createStreamSync(filePath, "r+");
        }
        catch (err) {
            prompt.showToast({
                message: 'No file found!',
                duration: 1000
            });
        }
        if (!stream) {
            return;
        }
        let nread = stream.readSync(buf);
        let temp = new Int8Array(buf);
        let arr: Int8Array = ArrayUtils.uint8Arr2Int8Arr(new Uint8Array(temp.subarray(0, nread).buffer));
        PropertyListParser.parseByInt8Array(arr, (obj: NSObject) => {
            let root = obj as NSDictionary;
            this.clear();
            this.parsePlistText = root.toXMLPropertyList();
        });
    }
    public parseBinaryPlist() {
        let filePath = path + this.binaryFile;
        let buf = new ArrayBuffer(8192);
        // 以同步方法从文件读取数据。
        try {
            stream = fs.createStreamSync(filePath, "r+");
        }
        catch (err) {
            prompt.showToast({
                message: 'No file found!',
                duration: 1000
            });
        }
        if (!stream) {
            return;
        }
        let readLen = stream.readSync(buf);
        let arr: Int8Array = ArrayUtils.uint8Arr2Int8Arr(new Uint8Array(buf.slice(0, readLen)));
        PropertyListParser.parseByInt8Array(arr, (obj: NSObject) => {
            let root = obj as NSNumber;
            this.clear();
            this.parsePlistText = "doubleValue = " + root.getDoubleValue().toString();
        });
    }
    public clear() {
        this.parsePlistKeys = new Array();
        this.parsePlistText = '';
    }
}
loadDocument(new Parse("1", undefined, {}));
