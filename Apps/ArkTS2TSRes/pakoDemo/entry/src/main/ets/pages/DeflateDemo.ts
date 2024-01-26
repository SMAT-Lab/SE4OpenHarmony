interface DeflateTest_Params {
    isCompressGZipFileShow?: boolean;
    isDeCompressGZipShow?: boolean;
    preTimestamp?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "DeflateDemo_" + ++__generate__Id;
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
import fileio from '@ohos.fileio';
import pako from 'pako';
import { GlobalContext } from '../entryability/GlobalContext';
interface optionsType {
    deflate: boolean;
    level: number;
}
export async function DeflateFile(src: string, dest: string): Promise<boolean> {
    try {
        let stat = fileio.statSync(src);
        const buf = new ArrayBuffer(stat.size);
        const reader = fileio.openSync(src, 0o2);
        fileio.readSync(reader, buf);
        const writer = fileio.openSync(dest, 0o102, 0o666);
        const options: optionsType = { deflate: true, level: 9 };
        fileio.writeSync(writer, pako.deflate(new Uint8Array(buf), options).buffer);
        fileio.closeSync(reader);
        fileio.closeSync(writer);
        return true;
    }
    catch (error) {
        return false;
    }
}
export async function InflateFile(src: string, target: string): Promise<boolean> {
    try {
        const reader = fileio.openSync(src, 0o2);
        const stat = fileio.statSync(src);
        const buf = new ArrayBuffer(stat.size);
        const res = await fileio.read(reader, buf);
        const options: optionsType = { deflate: true, level: 9 };
        const data: Uint8Array = pako.inflate(new Uint8Array(res.buffer), options);
        const writer = fileio.openSync(target, 0o102, 0o666);
        fileio.writeSync(writer, data.buffer);
        fileio.closeSync(writer);
        fileio.closeSync(reader);
        return true;
    }
    catch (error) {
        return false;
    }
}
export class DeflateTest extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__isCompressGZipFileShow = new ObservedPropertySimple(false, this, "isCompressGZipFileShow");
        this.__isDeCompressGZipShow = new ObservedPropertySimple(false, this, "isDeCompressGZipShow");
        this.preTimestamp = 0;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: DeflateTest_Params) {
        if (params.isCompressGZipFileShow !== undefined) {
            this.isCompressGZipFileShow = params.isCompressGZipFileShow;
        }
        if (params.isDeCompressGZipShow !== undefined) {
            this.isDeCompressGZipShow = params.isDeCompressGZipShow;
        }
        if (params.preTimestamp !== undefined) {
            this.preTimestamp = params.preTimestamp;
        }
    }
    aboutToBeDeleted() {
        this.__isCompressGZipFileShow.aboutToBeDeleted();
        this.__isDeCompressGZipShow.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __isCompressGZipFileShow: ObservedPropertySimple<boolean>;
    get isCompressGZipFileShow() {
        return this.__isCompressGZipFileShow.get();
    }
    set isCompressGZipFileShow(newValue: boolean) {
        this.__isCompressGZipFileShow.set(newValue);
    }
    private __isDeCompressGZipShow: ObservedPropertySimple<boolean>;
    get isDeCompressGZipShow() {
        return this.__isDeCompressGZipShow.get();
    }
    set isDeCompressGZipShow(newValue: boolean) {
        this.__isDeCompressGZipShow.set(newValue);
    }
    private preTimestamp: number;
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Text.create('Deflate相关功能');
        Text.fontSize(20);
        Text.margin({ top: 16 });
        Text.pop();
        Text.create('点击生成hello.txt');
        Text.fontSize(16);
        Text.margin({ top: 32 });
        Text.padding(8);
        Text.border({ width: 2, color: '#535353', radius: 6 });
        Text.onClick((event) => {
            if (!this.isFastClick()) {
                this.generateTextFile();
            }
        });
        Text.pop();
        If.create();
        if (this.isCompressGZipFileShow) {
            If.branchId(0);
            Text.create('点击压缩');
            Text.fontSize(16);
            Text.margin({ top: 32 });
            Text.padding(8);
            Text.border({ width: 2, color: '#535353', radius: 6 });
            Text.onClick(() => {
                if (!this.isFastClick()) {
                    this.DeflateFileTest();
                }
            });
            Text.pop();
        }
        If.pop();
        If.create();
        if (this.isDeCompressGZipShow) {
            If.branchId(0);
            Text.create('点击解压');
            Text.fontSize(16);
            Text.margin({ top: 32 });
            Text.padding(8);
            Text.border({ width: 2, color: '#535353', radius: 6 });
            Text.onClick(() => {
                if (!this.isFastClick()) {
                    this.InflateFileTest();
                }
            });
            Text.pop();
        }
        If.pop();
        Flex.pop();
    }
    InflateFileTest(): void {
        let context: Context = GlobalContext.getContext().getObject("context") as Context;
        try {
            let data = context.filesDir;
            InflateFile(data + "/hello.txt.deflate", data + '/test.txt')
                .then(() => {
                AlertDialog.show({ title: '解缩成功',
                    message: '请查看沙箱路径 ' + data + '/test.txt',
                    confirm: { value: 'OK', action: () => {
                        } }
                });
            });
        }
        catch (error) {
            console.error('File to obtain the file directory. Cause: ' + error.message);
        }
    }
    DeflateFileTest(): void {
        let context: Context = GlobalContext.getContext().getObject("context") as Context;
        try {
            let data = context.filesDir;
            console.info('directory obtained. Data:' + data);
            DeflateFile(data + '/hello.txt', data + '/hello.txt.deflate')
                .then((isSuccess) => {
                if (isSuccess) {
                    AlertDialog.show({ title: '压缩成功',
                        message: '请查看沙箱路径 ' + data + '/test.txt.deflate',
                        confirm: { value: 'OK', action: () => {
                                this.isDeCompressGZipShow = true;
                            } }
                    });
                }
            });
        }
        catch (error) {
            console.error('File to obtain the file directory. Cause: ' + error.message);
        }
    }
    generateTextFile(): void {
        let context: Context = GlobalContext.getContext().getObject("context") as Context;
        try {
            let data = context.filesDir;
            const writer = fileio.openSync(data + '/hello.txt', 0o102, 0o666);
            fileio.writeSync(writer, "hello, world!  adjasjdakjdakjdkjakjdakjskjasdkjaskjdajksdkjasdkjaksjdkja\n"
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
            fileio.closeSync(writer);
            AlertDialog.show({ title: '生成成功',
                message: '请查看沙箱路径' + data + '/hello.txt',
                confirm: { value: 'OK', action: () => {
                        this.isCompressGZipFileShow = true;
                    } }
            });
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
loadDocument(new DeflateTest("1", undefined, {}));
