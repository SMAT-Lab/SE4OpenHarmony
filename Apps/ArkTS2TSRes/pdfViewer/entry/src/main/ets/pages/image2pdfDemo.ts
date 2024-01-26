interface image2pdfDemo_Params {
    runCount?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "image2pdfDemo_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
import { testJsPDF, testBuildDocument, testAddImage, testGetArrayBuffer, testOutput, testAddPage, testMovePage, testText, testSetPage, testInsertPage, testGetPageWidth, testGetPageHeight, testDeletePage } from './iImage2pdfResponse';
class image2pdfDemo extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.runCount = 100;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: image2pdfDemo_Params) {
        if (params.runCount !== undefined) {
            this.runCount = params.runCount;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Button.createWithLabel('测试jsPDF()');
        Button.margin({ top: 10 });
        Button.onClick(() => {
            this.runTimes(testJsPDF);
        });
        Button.pop();
        Button.createWithLabel('测试buildDocument()');
        Button.margin({ top: 10 });
        Button.onClick(() => {
            this.runTimes(testBuildDocument);
        });
        Button.pop();
        Button.createWithLabel('测试addImage()');
        Button.margin({ top: 10 });
        Button.onClick(() => {
            this.runTimes(testAddImage);
        });
        Button.pop();
        Button.createWithLabel('测试getArrayBuffer()');
        Button.margin({ top: 10 });
        Button.onClick(() => {
            this.runTimes(testGetArrayBuffer);
        });
        Button.pop();
        Button.createWithLabel('测试addPage()');
        Button.margin({ top: 10 });
        Button.onClick(() => {
            this.runTimes(testAddPage);
        });
        Button.pop();
        Button.createWithLabel('测试movePage()');
        Button.margin({ top: 10 });
        Button.onClick(() => {
            this.runTimes(testMovePage);
        });
        Button.pop();
        Button.createWithLabel('测试text()');
        Button.margin({ top: 10 });
        Button.onClick(() => {
            this.runTimes(testText);
        });
        Button.pop();
        Button.createWithLabel('测试setPage()');
        Button.margin({ top: 10 });
        Button.onClick(() => {
            this.runTimes(testSetPage);
        });
        Button.pop();
        Button.createWithLabel('测试insertPage()');
        Button.margin({ top: 10 });
        Button.onClick(() => {
            this.runTimes(testInsertPage);
        });
        Button.pop();
        Button.createWithLabel('测试getPageWidth()');
        Button.margin({ top: 10 });
        Button.onClick(() => {
            this.runTimes(testGetPageWidth);
        });
        Button.pop();
        Button.createWithLabel('测试getPageHeight()');
        Button.margin({ top: 10 });
        Button.onClick(() => {
            this.runTimes(testGetPageHeight);
        });
        Button.pop();
        Button.createWithLabel('测试deletePage()');
        Button.margin({ top: 10 });
        Button.onClick(() => {
            this.runTimes(testDeletePage);
        });
        Button.pop();
        Button.createWithLabel('测试output()');
        Button.margin({ top: 10 });
        Button.onClick(() => {
            this.runTimes(testOutput);
        });
        Button.pop();
        Column.pop();
    }
    private runCount: number;
    runTimes(func: () => number) {
        let sum = 0;
        for (let i = 0; i < this.runCount; i++) {
            let diffTime: number = func();
            sum += diffTime * 1000.0;
        }
        let avg = sum / (this.runCount);
        console.log('dodo avg = ' + avg + ' us' + ' function name =' + func.name);
    }
}
loadDocument(new image2pdfDemo("1", undefined, {}));
