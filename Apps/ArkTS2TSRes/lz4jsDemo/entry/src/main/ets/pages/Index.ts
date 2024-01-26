interface lz4jsDemo_Params {
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
import lz4 from "lz4js";
import fs from '@ohos.file.fs';
import prompt from '@ohos.promptAction';
import { GlobalContext } from "./GlobalContext";
import common from '@ohos.app.ability.common';
interface errs {
    message: string;
    code: number;
}
let context = GlobalContext.getContext().getfindex('context');
export default class lz4jsDemo extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: lz4jsDemo_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Start });
        List.create({ space: 20, initialIndex: 0 });
        ListItem.create();
        Column.create({ space: 12 });
        Button.createWithLabel('生成txt文件', { type: ButtonType.Normal });
        Button.fontSize(18);
        Button.fontColor('#000');
        Button.height(60);
        Button.width(300);
        Button.margin({ top: 20 });
        Button.backgroundColor('#12939f');
        Button.onClick(() => {
            this.creatTxt();
        });
        Button.pop();
        Column.pop();
        ListItem.pop();
        ListItem.create();
        Column.create({ space: 12 });
        Button.createWithLabel('压缩txt文件', { type: ButtonType.Normal });
        Button.fontSize(18);
        Button.fontColor('#000');
        Button.height(60);
        Button.width(300);
        Button.margin({ top: 20 });
        Button.backgroundColor('#12939f');
        Button.onClick(() => {
            this.compressTxt();
        });
        Button.pop();
        Column.pop();
        ListItem.pop();
        ListItem.create();
        Column.create({ space: 12 });
        Button.createWithLabel('解压txt文件', { type: ButtonType.Normal });
        Button.fontSize(18);
        Button.fontColor('#000');
        Button.height(60);
        Button.width(300);
        Button.margin({ top: 20 });
        Button.backgroundColor('#12939f');
        Button.onClick(() => {
            this.deCompressTxt();
        });
        Button.pop();
        Column.pop();
        ListItem.pop();
        List.pop();
        Flex.pop();
    }
    creatTxt() {
        const str: string = 'DevEco Studio V3.1 Canary1版本兼容性配套关系如下表所示';
        let path = (context as common.UIAbilityContext).filesDir + '/test.txt';
        let file = fs.openSync(path, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
        let writeLen = fs.writeSync(file.fd, str);
        prompt.showToast({ message: '创建txt文件成功', duration: 4000 });
    }
    compressTxt() {
        let path = (context as common.UIAbilityContext).filesDir + '/test.txt';
        fs.stat(path).then((stat) => {
            let file = fs.openSync(path, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
            let buf = new ArrayBuffer(stat.size);
            fs.readSync(file.fd, buf);
            let unitArray = new Uint8Array(buf);
            let compressed: Uint8Array = lz4.compress(unitArray);
            let path1 = (context as common.UIAbilityContext).filesDir + '/test.lz4';
            let file1 = fs.openSync(path1, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
            let writeLen = fs.writeSync(file1.fd, compressed.buffer);
            prompt.showToast({ message: '压缩txt文件成功', duration: 4000 });
        }).catch((err: errs) => {
            console.info("get file info failed with error message: " + err.message + ", error code: " + err.code);
            prompt.showToast({ message: '压缩txt文件失败', duration: 4000 });
        });
    }
    deCompressTxt() {
        let path = (context as common.UIAbilityContext).filesDir + '/test.lz4';
        fs.stat(path).then((stat) => {
            let file = fs.openSync(path, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
            let buf = new ArrayBuffer(stat.size);
            fs.readSync(file.fd, buf);
            let unitArray = new Uint8Array(buf);
            let deCompressed: Uint8Array = lz4.decompress(unitArray);
            let path1 = (context as common.UIAbilityContext).filesDir + '/test1.txt';
            let file1 = fs.openSync(path1, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
            let writeLen = fs.writeSync(file1.fd, deCompressed.buffer);
            prompt.showToast({ message: '解压缩txt文件成功', duration: 4000 });
        }).catch((err: errs) => {
            console.info("get file info failed with error message: " + err.message + ", error code: " + err.code);
            prompt.showToast({ message: '解压缩txt文件失败', duration: 4000 });
        });
    }
}
loadDocument(new lz4jsDemo("1", undefined, {}));
