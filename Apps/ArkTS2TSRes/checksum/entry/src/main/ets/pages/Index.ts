interface Index_Params {
    mgs?: string;
    path?: string;
    mArguments?: Options;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/**
 *  MIT License
 *
 *  Copyright (c) 2021 Huawei Device Co., Ltd.
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 */
import fileio from '@ohos.fileio';
import { Checksum, Options } from '@ohos/checksum';
import * as EntryAbility from "../entryability/EntryAbility";
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__mgs = new ObservedPropertySimple("空", this, "mgs");
        this.__path = new ObservedPropertySimple("", this, "path");
        this.__mArguments = new ObservedPropertyObject(new Options(), this, "mArguments");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.mgs !== undefined) {
            this.mgs = params.mgs;
        }
        if (params.path !== undefined) {
            this.path = params.path;
        }
        if (params.mArguments !== undefined) {
            this.mArguments = params.mArguments;
        }
    }
    aboutToBeDeleted() {
        this.__mgs.aboutToBeDeleted();
        this.__path.aboutToBeDeleted();
        this.__mArguments.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __mgs: ObservedPropertySimple<string>;
    get mgs() {
        return this.__mgs.get();
    }
    set mgs(newValue: string) {
        this.__mgs.set(newValue);
    }
    private __path: ObservedPropertySimple<string>;
    get path() {
        return this.__path.get();
    }
    set path(newValue: string) {
        this.__path.set(newValue);
    }
    private __mArguments: ObservedPropertyObject<Options>;
    get mArguments() {
        return this.__mArguments.get();
    }
    set mArguments(newValue: Options) {
        this.__mArguments.set(newValue);
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Scroll.create();
        Scroll.pop();
        Text.create("显示判断结果:" + this.mgs);
        Text.width(400);
        Text.height(100);
        Text.fontSize(16);
        Text.fontColor(Color.Green);
        Text.textAlign(TextAlign.Start);
        Text.textOverflow({ overflow: TextOverflow.Clip });
        Text.padding(20);
        Text.pop();
        Button.createWithLabel("sha1 编码文字 dshaw ");
        Button.width(200);
        Button.height(50);
        Button.onClick((event: ClickEvent) => {
            this.mArguments.algorithm = "sha1";
            let mChecksum = new Checksum();
            this.mgs = mChecksum.checksum("dshaw", ObservedObject.GetRawObject(this.mArguments));
        });
        Button.margin(20);
        Button.pop();
        Button.createWithLabel("md5 编码文字 dshaw ");
        Button.width(200);
        Button.height(50);
        Button.onClick((event: ClickEvent) => {
            this.mArguments.algorithm = "md5";
            let mChecksum = new Checksum();
            this.mgs = mChecksum.checksum("dshaw", ObservedObject.GetRawObject(this.mArguments));
        });
        Button.margin(20);
        Button.pop();
        Button.createWithLabel("创建 Test 文件");
        Button.width(200);
        Button.height(50);
        Button.onClick((event: ClickEvent) => {
            this.writeFiles();
        });
        Button.margin(20);
        Button.pop();
        Button.createWithLabel("sha1 编码文件 Test ");
        Button.width(200);
        Button.height(50);
        Button.onClick((event: ClickEvent) => {
            this.mArguments.algorithm = "sha1";
            let mChecksum = new Checksum();
            mChecksum.checksumFile(this.path + "/Test.txt", ObservedObject.GetRawObject(this.mArguments), (err: any, data: any) => {
                this.mgs = "sha1 : " + data;
            });
        });
        Button.margin(20);
        Button.pop();
        Button.createWithLabel("md5 编码文件 Test ");
        Button.width(200);
        Button.height(50);
        Button.onClick((event: ClickEvent) => {
            this.mArguments.algorithm = "md5";
            let mChecksum = new Checksum();
            mChecksum.checksumFile(this.path + "/Test.txt", ObservedObject.GetRawObject(this.mArguments), (err: any, data: any) => {
                this.mgs = "md5 :" + data;
            });
        });
        Button.margin(20);
        Button.pop();
        Flex.pop();
    }
    private writeFiles() {
        this.path = EntryAbility.ChecksumPath;
        console.log("写入成功" + EntryAbility.ChecksumPath);
        try {
            let fd = fileio.openSync(EntryAbility.ChecksumPath + "/Test.txt", 0o100 | 0o102, 0o666);
            fileio.ftruncateSync(fd);
            fileio.writeSync(fd, "dshaw");
            fileio.fsyncSync(fd);
            fileio.closeSync(fd);
            console.log("写入成功");
        }
        catch (e) {
            console.info('writeFile', 'Failed to writeFile for ' + e);
        }
    }
}
loadDocument(new Index("1", undefined, {}));
