interface JtarTest_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "index_" + ++__generate__Id;
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
import fs from '@ohos.file.fs';
import { OHOSTar, GlobalContext } from "@ohos/tar";
import prompt from '@system.prompt';
// 一个简单的创建文件创建目录的类，用于对jtar进行测试
class OHOStarTestInit {
    private static instance: OHOStarTestInit;
    rootPath: string = GlobalContext.getContext().getObject('filesDir') as string;
    public static getInstance(): OHOStarTestInit {
        if (!OHOStarTestInit.instance) {
            OHOStarTestInit.instance = new OHOStarTestInit();
        }
        return OHOStarTestInit.instance;
    }
    public GetDirName(): string {
        return this.rootPath + '/' + "tartestdir";
    }
    // tartest初始化
    TestTarInit(): void {
        fs.mkdir(this.GetDirName(), (err) => {
            if (err) {
                console.info("mkdir failed with error message:" + err.message + ",errorcode:" + err.code);
            }
            else {
                let filePath = this.GetDirName() + "/test.txt";
                let file = fs.openSync(filePath, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
                fs.write(file.fd, "1234567890abcdefghij", (err) => {
                    if (err) {
                        console.info("write failed with error message: " + err.message + " error code: " + err.code);
                    }
                    else {
                        fs.closeSync(file);
                    }
                });
            }
        });
    }
    // untartest初始化
    TestUnTarInit(): void {
        fs.rmdir(this.GetDirName()); // 删除 tartestdir目录
    }
    //重置
    public DirReset() {
        fs.listFile(this.rootPath, (err, filenames) => {
            if (err) {
                console.info("list file failed with error message: " + err.message + ", error code: " + err.code);
            }
            else {
                for (let i = 0; i < filenames.length; i++) {
                    let deleteFile = this.rootPath + '/' + filenames[i];
                    if (fs.statSync(deleteFile).isDirectory()) {
                        fs.rmdirSync(deleteFile);
                    }
                    else {
                        fs.unlink(deleteFile);
                    }
                }
            }
        });
    }
}
// 创建tar工具对象
let tar: OHOSTar = new OHOSTar(OHOStarTestInit.getInstance().rootPath, "testdir", "tartestdir");
class JtarTest extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: JtarTest_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Text.create('OHOSTar Test');
        Text.fontSize(40);
        Text.fontWeight(FontWeight.Bold);
        Text.margin(15);
        Text.pop();
        Button.createWithLabel("Tar Init");
        Button.fontSize(40);
        Button.fontWeight(FontWeight.Bold);
        Button.height(60);
        Button.onClick(() => {
            prompt.showToast({ message: "Tar Init", duration: 3000 });
            OHOStarTestInit.getInstance().TestTarInit();
        });
        Button.margin(15);
        Button.pop();
        Button.createWithLabel("Tar");
        Button.fontSize(40);
        Button.fontWeight(FontWeight.Bold);
        Button.height(60);
        Button.onClick(() => {
            prompt.showToast({ message: "Tar", duration: 3000 });
            tar.addTarPath("tartestdir");
            tar.tar();
        });
        Button.margin(15);
        Button.pop();
        Button.createWithLabel("UnTar Init");
        Button.fontSize(40);
        Button.fontWeight(FontWeight.Bold);
        Button.height(60);
        Button.onClick(() => {
            prompt.showToast({ message: "UnTar Init", duration: 3000 });
            OHOStarTestInit.getInstance().TestUnTarInit();
        });
        Button.margin(15);
        Button.pop();
        Button.createWithLabel("UnTar");
        Button.fontSize(40);
        Button.fontWeight(FontWeight.Bold);
        Button.height(60);
        Button.onClick(() => {
            prompt.showToast({ message: "UnTar", duration: 3000 });
            tar.untar();
        });
        Button.margin(15);
        Button.pop();
        Button.createWithLabel("reset");
        Button.fontSize(40);
        Button.fontWeight(FontWeight.Bold);
        Button.height(60);
        Button.onClick(() => {
            prompt.showToast({ message: "reset", duration: 3000 });
            OHOStarTestInit.getInstance().DirReset();
        });
        Button.margin(15);
        Button.pop();
        Flex.pop();
    }
}
loadDocument(new JtarTest("1", undefined, {}));
