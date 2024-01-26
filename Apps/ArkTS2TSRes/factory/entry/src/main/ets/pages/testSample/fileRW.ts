interface fileRW_Params {
    message?: string;
    myBtnEnabled?: boolean;
    myWriteTimeSpeed?: number;
    myReadTimeSpeed?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "fileRW_" + ++__generate__Id;
}
/*
 * Copyright 2023 Unionman Technology Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import fs from '@ohos.file.fs';
import systemDateTime from '@ohos.systemDateTime';
import { BusinessError } from '@ohos.base';
import { TitleBar } from '../../common/TitleBar';
import Logger from '../../model/Logger';
import { TipsDialog } from '../../common/TipsDialog';
import worker, { MessageEvents } from '@ohos.worker';
import prompt from '@system.prompt';
const TAG = 'fileRW';
enum fileOperateType {
    WRITE = 0,
    READ = 1
}
export class fileRW extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('', this, "message");
        this.__myBtnEnabled = AppStorage.SetAndLink('btnEnabled', true, this, "myBtnEnabled");
        this.myWriteTimeSpeed = 0;
        this.myReadTimeSpeed = 0;
        this.updateWithValueParams(params);
        this.declareWatch("myBtnEnabled", this.btnEnabledOnchange);
    }
    updateWithValueParams(params: fileRW_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.myWriteTimeSpeed !== undefined) {
            this.myWriteTimeSpeed = params.myWriteTimeSpeed;
        }
        if (params.myReadTimeSpeed !== undefined) {
            this.myReadTimeSpeed = params.myReadTimeSpeed;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__myBtnEnabled.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __myBtnEnabled: ObservedPropertyAbstract<boolean>;
    get myBtnEnabled() {
        return this.__myBtnEnabled.get();
    }
    set myBtnEnabled(newValue: boolean) {
        this.__myBtnEnabled.set(newValue);
    }
    private myWriteTimeSpeed: number;
    private myReadTimeSpeed: number;
    btnEnabledOnchange() {
        Logger.info(TAG, "btnEnabledOnchange:" + this.myBtnEnabled);
        if (this.myBtnEnabled) {
            Logger.info(TAG, "myWriteTimeSpeed:" + this.myWriteTimeSpeed + "myReadTimeSpeed:" + this.myReadTimeSpeed);
            if (this.myWriteTimeSpeed && this.myReadTimeSpeed) {
                this.message = "写入速度：" + this.myWriteTimeSpeed + " M/s\n\n" + "读取速度：" + this.myReadTimeSpeed + " M/s\n";
            }
        }
        else {
            this.message = "正在读写测试中....";
        }
    }
    getSpeed(mSTime: number): number {
        let ret: number = 0;
        let sTime: number = mSTime / 1000;
        Logger.info(TAG, `getSpeed sTime: ${sTime}`);
        ret = 2048 / sTime;
        return Math.round(ret);
    }
    createFileWork() {
        let writeAndReadWorkerInstance = new worker.ThreadWorker('@bundle:com.yarward.factorytest/entry/ets/pages/workers/fileWorker');
        // 主线程向worker线程传递信息
        let myFilePath: string = globalThis.pathDir + "/test.txt";
        writeAndReadWorkerInstance.postMessage(myFilePath);
        // 在调用terminate后，执行onexit
        writeAndReadWorkerInstance.onexit = function () {
            Logger.info(TAG, "writeAndReadWorkerInstance main thread terminate");
        };
        // 写入数据接收信息回调监听
        writeAndReadWorkerInstance.addEventListener("message", (event: MessageEvents) => {
            Logger.info(TAG, "writeAndReadWorkerInstance onmessage listener callback");
            if (event.data < 0) {
                Logger.info(TAG, "file Operate fail");
                return;
            }
            Logger.info(TAG, "writeAndReadWorkerInstance onmessage listener event.data:" + event.data);
            // 获取写入速度
            let writeTimeSpeed = event.data[0];
            let readTimeSpeed = event.data[1];
            this.myWriteTimeSpeed = writeTimeSpeed;
            this.myReadTimeSpeed = readTimeSpeed;
            try {
                Logger.info(TAG, "writeAndReadWorkerInstance onmessage listener this.writeTimeSpeed:" + writeTimeSpeed + "this.readTimeSpeed:" + writeTimeSpeed);
                AppStorage.set("writeTimeSpeed", writeTimeSpeed);
                AppStorage.set("readTimeSpeed", readTimeSpeed);
                AppStorage.set("btnEnabled", true);
            }
            catch (err) {
                Logger.error(TAG, "AppStorage.setOrCreate fail.err:" + err);
            }
            writeAndReadWorkerInstance.terminate();
        });
    }
    onPageShow() {
        let writeTimeSpeed = AppStorage.get("writeTimeSpeed") as number;
        let readTimeSpeed = AppStorage.get("readTimeSpeed") as number;
        let myBtnEnabled = <boolean>AppStorage.get("btnEnabled");
        Logger.info(TAG, "aboutToAppear writeTimeSpeed: " + writeTimeSpeed + "readTimeSpeed:" + readTimeSpeed + "myBtnEnabled" + myBtnEnabled);
        if (writeTimeSpeed) {
            this.myWriteTimeSpeed = writeTimeSpeed;
        }
        if (readTimeSpeed) {
            this.myReadTimeSpeed = readTimeSpeed;
        }
        Logger.info(TAG, "aboutToAppear myWriteTimeSecond: " + this.myWriteTimeSpeed + "myReadTimeSecond:" + this.myReadTimeSpeed);
        this.myBtnEnabled = myBtnEnabled;
        if (myBtnEnabled === false) {
            this.message = "正在读写测试中....";
        }
        else {
            this.btnEnabledOnchange();
        }
    }
    render() {
        Column.create();
        let earlierCreatedChild_2: TitleBar = (this && this.findChildById) ? this.findChildById("2") as TitleBar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new TitleBar("2", this, { title: '存储设备读写测试' }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                title: '存储设备读写测试'
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        Scroll.create();
        Column.create();
        Column.width('100%');
        Column.constraintSize({ minHeight: '100%' });
        Button.createWithLabel("读写300M文件开始测试");
        Button.onClick(() => {
            Logger.info(TAG, "onClick");
            if (this.myBtnEnabled === false) {
                prompt.showToast({
                    message: '正在读写测试，请勿重复点击！',
                    duration: 2000,
                });
            }
            else {
                try {
                    AppStorage.setOrCreate("btnEnabled", false);
                }
                catch (err) {
                    Logger.error(TAG, "AppStorage.setOrCreate fail.err:" + err);
                }
                this.myWriteTimeSpeed = 0;
                this.myReadTimeSpeed = 0;
                this.createFileWork();
            }
        });
        Button.pop();
        Text.create(this.message);
        Text.margin({ top: 100 });
        Text.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
}
loadDocument(new fileRW("1", undefined, {}));
