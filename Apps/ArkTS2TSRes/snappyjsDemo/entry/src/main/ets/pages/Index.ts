interface SnappyTest_Params {
    newfolder?: string;
    newfile?: string;
    newfile1?: string;
    isCompressSnappyFileShow?: boolean;
    isDeCompressSnappyShow?: boolean;
    preTimestamp?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
import snappyJS from 'snappyjs';
import fileio from '@ohos.fileio';
import { GlobalContext } from '../entryability/GlobalContext';
export class SnappyTest extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__newfolder = new ObservedPropertySimple('newfolder', this, "newfolder");
        this.__newfile = new ObservedPropertySimple('bla.txt', this, "newfile");
        this.__newfile1 = new ObservedPropertySimple('bla1.txt', this, "newfile1");
        this.__isCompressSnappyFileShow = new ObservedPropertySimple(false, this, "isCompressSnappyFileShow");
        this.__isDeCompressSnappyShow = new ObservedPropertySimple(false, this, "isDeCompressSnappyShow");
        this.preTimestamp = 0;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SnappyTest_Params) {
        if (params.newfolder !== undefined) {
            this.newfolder = params.newfolder;
        }
        if (params.newfile !== undefined) {
            this.newfile = params.newfile;
        }
        if (params.newfile1 !== undefined) {
            this.newfile1 = params.newfile1;
        }
        if (params.isCompressSnappyFileShow !== undefined) {
            this.isCompressSnappyFileShow = params.isCompressSnappyFileShow;
        }
        if (params.isDeCompressSnappyShow !== undefined) {
            this.isDeCompressSnappyShow = params.isDeCompressSnappyShow;
        }
        if (params.preTimestamp !== undefined) {
            this.preTimestamp = params.preTimestamp;
        }
    }
    aboutToBeDeleted() {
        this.__newfolder.aboutToBeDeleted();
        this.__newfile.aboutToBeDeleted();
        this.__newfile1.aboutToBeDeleted();
        this.__isCompressSnappyFileShow.aboutToBeDeleted();
        this.__isDeCompressSnappyShow.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __newfolder: ObservedPropertySimple<string>;
    get newfolder() {
        return this.__newfolder.get();
    }
    set newfolder(newValue: string) {
        this.__newfolder.set(newValue);
    }
    private __newfile: ObservedPropertySimple<string>;
    get newfile() {
        return this.__newfile.get();
    }
    set newfile(newValue: string) {
        this.__newfile.set(newValue);
    }
    private __newfile1: ObservedPropertySimple<string>;
    get newfile1() {
        return this.__newfile1.get();
    }
    set newfile1(newValue: string) {
        this.__newfile1.set(newValue);
    }
    private __isCompressSnappyFileShow: ObservedPropertySimple<boolean>;
    get isCompressSnappyFileShow() {
        return this.__isCompressSnappyFileShow.get();
    }
    set isCompressSnappyFileShow(newValue: boolean) {
        this.__isCompressSnappyFileShow.set(newValue);
    }
    private __isDeCompressSnappyShow: ObservedPropertySimple<boolean>;
    get isDeCompressSnappyShow() {
        return this.__isDeCompressSnappyShow.get();
    }
    set isDeCompressSnappyShow(newValue: boolean) {
        this.__isDeCompressSnappyShow.set(newValue);
    }
    private preTimestamp: number;
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Text.create('Snappy相关功能');
        Text.fontSize(20);
        Text.margin({ top: 16 });
        Text.pop();
        Text.create('点击生成bla.txt');
        Text.fontSize(16);
        Text.margin({ top: 32 });
        Text.padding(8);
        Text.border({ width: 2, color: '#535353', radius: 6 });
        Text.onClick((event) => {
            if (!this.isFastClick()) {
                this.createFile();
            }
        });
        Text.pop();
        If.create();
        if (this.isCompressSnappyFileShow) {
            If.branchId(0);
            Text.create('点击压缩bla.txt为sz文件');
            Text.fontSize(16);
            Text.margin({ top: 32 });
            Text.padding(8);
            Text.border({ width: 2, color: '#535353', radius: 6 });
            Text.onClick((event) => {
                if (!this.isFastClick()) {
                    this.snappyJsTest(true);
                }
            });
            Text.pop();
        }
        If.pop();
        If.create();
        if (this.isDeCompressSnappyShow) {
            If.branchId(0);
            Text.create('点击解压sz文件');
            Text.fontSize(16);
            Text.margin({ top: 32 });
            Text.padding(8);
            Text.border({ width: 2, color: '#535353', radius: 6 });
            Text.onClick((event) => {
                if (!this.isFastClick()) {
                    this.snappyJsTest(false);
                }
            });
            Text.pop();
        }
        If.pop();
        Flex.pop();
    }
    aboutToAppear() {
        this.createFolder();
    }
    createFolder() {
        let context: Context = GlobalContext.getContext().getObject("context") as Context;
        try {
            try {
                fileio.mkdirSync(context.filesDir + '/' + this.newfolder);
            }
            catch (err) {
            }
        }
        catch (error) {
            console.error('File to obtain the file directory. Cause: ' + error.message);
        }
    }
    createFile() {
        let context: Context = GlobalContext.getContext().getObject("context") as Context;
        try {
            let data = context.filesDir;
            let fd = fileio.openSync(data + '/' + this.newfolder + '/' + this.newfile, 0o102, 0o666);
            fileio.writeSync(fd, "hello, world!  adjasjdakjdakjdkjakjdakjskjasdkjaskjdajksdkjasdkjaksjdkja\n"
                + "adasajsdkjadjkakjdakjsdkjadkjakjdakjsdkjasdkjaskjdakjsdkjaskjdakjsdkjaskjakjdakjs\n"
                + "adasajsdkjadjkakjdakjsdkjadkjakjdakjsdkjasdkjaskjdakjsdkjaskjdakjsdkjaskjakjdakjs\n"
                + "adasajsdkjadjkakjdakjsdkjadkjakjdakjsdkjasdkjaskjdakjsdkjaskjdakjsdkjaskjakjdakjs\n"
                + "adasajsdkjadjkakjdakjsdkjadkjakjdakjsdkjasdkjaskjdakjsdkjaskjdakjsdkjaskjakjdakjs\n"
                + "adasajsdkjadjkakjdakjsdkjadkjakjdakjsdkjasdkjaskjdakjsdkjaskjdakjsdkjaskjakjdakjs\n"
                + "adasajsdkjadjkakjdakjsdkjadkjakjdakjsdkjasdkjaskjdakjsdkjaskjdakjsdkjaskjakjdakjs\n"
                + "adasajsdkjadjkakjdakjsdkjadkjakjdakjsdkjasdkjaskjdakjsdkjaskjdakjsdkjaskjakjdakjs\n"
                + "adasajsdkjadjkakjdakjsdkjadkjakjdakjsdkjasdkjaskjdakjsdkjaskjdakjsdkjaskjakjdakjs\n"
                + "adasajsdkjadjkakjdakjsdkjadkjakjdakjsdkjasdkjaskjdakjsdkjaskjdakjsdkjaskjakjdakjs\n"
                + "adasajsdkjadjkakjdakjsdkjadkjakjdakjsdkjasdkjaskjdakjsdkjaskjdakjsdkjaskjakjdakjs\n"
                + "adasajsdkjadjkakjdakjsdkjadkjakjdakjsdkjasdkjaskjdakjsdkjaskjdakjsdkjaskjakjdakjs\n"
                + "adasajsdkjadjkakjdakjsdkjadkjakjdakjsdkjasdkjaskjdakjsdkjaskjdakjsdkjaskjakjdakjs");
            fileio.closeSync(fd);
            AlertDialog.show({ title: '生成成功',
                message: '请查看沙箱路径' + data + '/' + this.newfolder + '/' + this.newfile,
                confirm: { value: 'OK', action: () => {
                        this.isCompressSnappyFileShow = true;
                    } }
            });
        }
        catch (error) {
            console.error('File to obtain the file directory. Cause: ' + error.message);
        }
    }
    snappyJsTest(value: Boolean) {
        let context: Context = GlobalContext.getContext().getObject("context") as Context;
        try {
            let data = context.filesDir;
            if (value) {
                let path = data + '/' + this.newfolder;
                console.log('snappyCompress');
                snappyCompress(path, this.newfile)
                    .then(() => {
                    AlertDialog.show({ title: '压缩成功',
                        message: '请查看沙箱路径 ' + data + '/' + this.newfolder + '/' + this.newfile + '.sz',
                        confirm: { value: 'OK', action: () => {
                                this.isDeCompressSnappyShow = true;
                            } }
                    });
                });
            }
            else {
                console.log('snappyUncompress');
                snappyUncompress(data, this.newfolder, this.newfile, this.newfile1)
                    .then(() => {
                    AlertDialog.show({ title: '解缩成功',
                        message: '请查看沙箱路径 ' + data + '/' + this.newfile1,
                        confirm: { value: 'OK', action: () => {
                            } }
                    });
                });
            }
        }
        catch (error) {
            console.error('File to obtain the file directory. Cause: ' + error.message);
        }
    }
    isFastClick(): boolean {
        let timestamp = Date.parse(new Date().toString());
        if ((timestamp - this.preTimestamp) > 1500) {
            this.preTimestamp = timestamp;
            return false;
        }
        else {
            return true;
        }
    }
}
export async function snappyCompress(path: string, newfile: string) {
    let newpath = path + '/' + newfile;
    let buf = getFileBuf(newpath);
    /* 压缩文件*/
    let compressed: string = snappyJS.compress(buf);
    let fd = fileio.openSync(path + '/' + newfile + '.sz', 0o102, 0o666);
    let num = await fileio.write(fd, compressed);
    fileio.closeSync(fd);
}
/* 解压文件*/
export async function snappyUncompress(path: string, newfolder: string, newfile: string, newfile1: string) {
    let newpath = path + '/' + newfolder + '/' + newfile + '.sz';
    let buf = getFileBuf(newpath);
    let uncompressed: string = snappyJS.uncompress(buf);
    let fd = fileio.openSync(path + '/' + newfile1, 0o102, 0o666);
    let num = await fileio.write(fd, uncompressed);
    fileio.closeSync(fd);
}
function getFileBuf(Bufpath: string): ArrayBuffer {
    let stat = fileio.statSync(Bufpath);
    const reader = fileio.openSync(Bufpath);
    let buf = new ArrayBuffer(stat.size);
    fileio.readSync(reader, buf);
    fileio.closeSync(reader);
    return buf;
}
loadDocument(new SnappyTest("1", undefined, {}));
