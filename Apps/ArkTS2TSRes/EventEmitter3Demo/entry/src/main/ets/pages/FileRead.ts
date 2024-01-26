interface FileRead_Params {
    message?: string;
    filePath?: string | undefined;
    state?: string;
    emitter?: EventEmitter<string, Object> | undefined;
    isCreateFinish?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "FileRead_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import EventEmitter from 'eventemitter3';
import fs from '@ohos.file.fs';
import buffer from '@ohos.buffer';
import { GlobalContext } from './GlobalContext';
class FileRead extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('监听文件读取', this, "message");
        this.__filePath = new ObservedPropertyObject(undefined, this, "filePath");
        this.__state = new ObservedPropertySimple('状态信息：', this, "state");
        this.__emitter = new ObservedPropertyObject(undefined, this, "emitter");
        this.__isCreateFinish = new ObservedPropertySimple(false, this, "isCreateFinish");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: FileRead_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.filePath !== undefined) {
            this.filePath = params.filePath;
        }
        if (params.state !== undefined) {
            this.state = params.state;
        }
        if (params.emitter !== undefined) {
            this.emitter = params.emitter;
        }
        if (params.isCreateFinish !== undefined) {
            this.isCreateFinish = params.isCreateFinish;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__filePath.aboutToBeDeleted();
        this.__state.aboutToBeDeleted();
        this.__emitter.aboutToBeDeleted();
        this.__isCreateFinish.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __filePath: ObservedPropertyObject<string | undefined>;
    get filePath() {
        return this.__filePath.get();
    }
    set filePath(newValue: string | undefined) {
        this.__filePath.set(newValue);
    }
    private __state: ObservedPropertySimple<string>;
    get state() {
        return this.__state.get();
    }
    set state(newValue: string) {
        this.__state.set(newValue);
    }
    private __emitter: ObservedPropertyObject<EventEmitter<string, Object> | undefined>;
    get emitter() {
        return this.__emitter.get();
    }
    set emitter(newValue: EventEmitter<string, Object> | undefined) {
        this.__emitter.set(newValue);
    }
    private __isCreateFinish: ObservedPropertySimple<boolean>;
    get isCreateFinish() {
        return this.__isCreateFinish.get();
    }
    set isCreateFinish(newValue: boolean) {
        this.__isCreateFinish.set(newValue);
    }
    aboutToAppear() {
        let cacheDir = GlobalContext.getContext().getObject(GlobalContext.KEY_CACHE_DIR) as string;
        if (cacheDir) {
            this.filePath = cacheDir + "/test.txt";
        }
        console.log('zdy------>' + 'this.filePath  ' + this.filePath);
        this.emitter = new EventEmitter<string, Object>();
        this.emitter.on('finish', (data: Object) => {
            this.state = this.state + "\r\n" + "读取文件内容成功：\r\n" + data;
            console.log('zdy------>' + 'file read finished');
            this.isCreateFinish = false;
        });
        this.emitter.on('create file', (data: Object) => {
            this.state = this.state + "\r\n" + "文件生成成功：\r\n" + data;
            this.isCreateFinish = true;
            console.log('zdy------>' + 'file read finished');
        });
        this.emitter.on('create err', () => {
            this.state = this.state + "\r\n" + "生成文件失败";
            this.isCreateFinish = false;
            console.log('zdy------>' + 'create file err');
        });
        this.emitter.on('not create', () => {
            this.state = this.state + "\r\n" + "文件还没有生成，请点击“文件生成”并稍候片刻";
            this.isCreateFinish = false;
            console.log('zdy------>' + 'create file err');
        });
        this.emitter.on('read err', () => {
            this.state = this.state + "\r\n" + "文件读取失败";
            this.isCreateFinish = false;
            console.log('zdy------>' + 'create file err');
        });
        console.log('zdy------>' + 'this.emitter  ' + this.emitter);
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Text.create(this.message);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.width('100%');
        Text.height(100);
        Text.pop();
        Button.createWithLabel('文件生成');
        Button.width('100%');
        Button.height(50);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.margin(20);
        Button.onClick(() => {
            this.createFile();
        });
        Button.pop();
        Button.createWithLabel('文件读取');
        Button.width('100%');
        Button.height(50);
        Button.backgroundColor(Color.Blue);
        Button.fontColor(Color.White);
        Button.margin(20);
        Button.onClick(() => {
            this.readFile();
        });
        Button.pop();
        Text.create(this.state);
        Text.width('100%');
        Text.backgroundColor(Color.Red);
        Text.fontColor(Color.White);
        Text.margin(20);
        Text.pop();
        Column.pop();
        Row.pop();
    }
    createFile(): void {
        try {
            if (!this.emitter) {
                this.state = this.state + "\r\n" + "emitter尚未初始化，请检查是否初始化失败";
                return;
            }
            console.log('zdy------>' + 'createFile start ');
            if (this.filePath) {
                let file = fs.openSync(this.filePath, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
                console.log('zdy------>' + 'createFile openSync ');
                fs.writeSync(file.fd, "this is test content which will be writed to a local txt file");
                console.log('zdy------>' + 'createFile writeSync ');
                fs.fsyncSync(file.fd);
                console.log('zdy------>' + 'createFile fsyncSync ');
                fs.closeSync(file);
                console.log('zdy------>' + 'createFile closeSync ');
                this.emitter.emit('create file', "create file success");
            }
            else {
                this.emitter.emit('create err');
            }
        }
        catch (err) {
            if (this.emitter) {
                console.log('zdy------>' + 'createFile err ' + err);
                this.emitter.emit('create err');
            }
        }
    }
    readFile() {
        try {
            if (!this.emitter) {
                this.state = this.state + "\r\n" + "emitter尚未初始化，请检查是否初始化失败";
                return;
            }
            if (!this.isCreateFinish) {
                this.emitter.emit('not create', "create file success");
                return;
            }
            if (this.filePath) {
                let file = fs.openSync(this.filePath, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
                let size = fs.statSync(this.filePath).size;
                let buff = new ArrayBuffer(size);
                fs.readSync(file.fd, buff);
                fs.fsyncSync(file.fd);
                fs.closeSync(file);
                let result = buffer.from(buff).toString("utf-8");
                this.emitter.emit('finish', result);
            }
            else {
                this.emitter.emit('read err', "create file success");
            }
        }
        catch (err) {
            if (this.emitter) {
                console.log('zdy------>' + 'readFile err ' + err);
                this.emitter.emit('read err');
            }
        }
    }
}
loadDocument(new FileRead("1", undefined, {}));
