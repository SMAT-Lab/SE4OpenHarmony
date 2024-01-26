/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import jsPDF from "@ohos/img2pdf";
import { GlobalContext } from './globalThis';
import common from '@ohos.app.ability.common';
export interface Options {
    orientation?: string;
    unit?: string;
    format?: string;
    floatPrecision?: number;
    filters?: string[];
    level?: number;
    mem?: number;
    tmp?: Uint8Array;
}
export function testJsPDF(): number {
    console.log("Calling jsPDF()...");
    let options: Options = {
        orientation: 'p',
        unit: 'pt',
        format: 'a4',
        floatPrecision: 2
    };
    const startTime = new Date().getTime();
    // 调用 jsPDF() 接口
    const doc = new jsPDF(options);
    const endTime = new Date().getTime();
    const timeDiff = endTime - startTime;
    console.log("jsPDF() completed. (doc != undefined)=" + (doc != undefined));
    console.log("Time taken: " + timeDiff + " milliseconds.");
    return timeDiff;
}
export function testBuildDocument() {
    console.log("Calling buildDocument()...");
    const doc = new jsPDF();
    doc.text('Hello, World!', 10, 10);
    doc.text('This is a sample document.', 10, 20);
    doc.text('Created using jsPDF.', 10, 30);
    const startTime = new Date().getTime();
    // 调用 buildDocument() 接口
    doc.buildDocument();
    const endTime = new Date().getTime();
    const timeDiff = endTime - startTime;
    console.log("buildDocument() completed.");
    console.log("Time taken: " + timeDiff + " milliseconds.");
    return timeDiff;
}
export function testAddImage2() {
    let gloContext: common.UIAbilityContext = GlobalContext.getContext().getObject("context") as common.UIAbilityContext;
    gloContext.resourceManager.getMediaContent($r('app.media.icon').id).then((value: Uint8Array) => {
        let jsPdf = new jsPDF();
        console.log("Calling addImage()...");
        const startTime = new Date().getTime();
        // 调用 addImage() 接口
        jsPdf.addImage(value, 'png', 50, 50, 150, 150);
        const endTime = new Date().getTime();
        const timeDiff = endTime - startTime;
        console.log("addImage() completed.");
        console.log("Time taken: " + timeDiff + " milliseconds.");
        return timeDiff;
    });
}
export function testAddImage() {
    let blackpixel = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
    let jsPdf = new jsPDF();
    console.log("Calling addImage()...");
    const startTime = new Date().getTime();
    // 调用 addImage() 接口
    let uint8 = new Uint8Array();
    jsPdf.addImage(blackpixel, 'PNG', 50, 50, 51, 51, undefined, undefined, undefined);
    const endTime = new Date().getTime();
    const timeDiff = endTime - startTime;
    console.log("addImage() completed.");
    console.log("Time taken: " + timeDiff + " milliseconds.");
    return timeDiff;
}
export function testGetArrayBuffer() {
    console.log("Calling getArrayBuffer()...");
    const doc = new jsPDF();
    doc.text('Hello, World!', 10, 10);
    doc.text('This is a sample document.', 10, 20);
    doc.text('Created using jsPDF.', 10, 30);
    let content: string = doc.buildDocument();
    const startTime = new Date().getTime();
    // 调用 getArrayBuffer() 接口
    const arrayBuffer: ArrayBuffer = doc.getArrayBuffer(content);
    const endTime = new Date().getTime();
    const timeDiff = endTime - startTime;
    console.log("getArrayBuffer() completed. arrayBuffer byteLength=" + arrayBuffer.byteLength);
    console.log("Time taken: " + timeDiff + " milliseconds.");
    return timeDiff;
}
export function testOutput() {
    console.log("Calling output()...");
    const doc = new jsPDF();
    doc.text('Hello, World!', 10, 10);
    doc.text('This is a sample document.', 10, 20);
    doc.text('Created using jsPDF.', 10, 30);
    const startTime = new Date().getTime();
    // 调用 output() 接口
    let content: string = doc.output();
    const endTime = new Date().getTime();
    const timeDiff = endTime - startTime;
    console.log("output() completed. content length =" + content.length);
    console.log("Time taken: " + timeDiff + " milliseconds.");
    return timeDiff;
}
export function testAddPage() {
    console.log("Calling addPage()...");
    const doc = new jsPDF();
    doc.text('Page 1', 10, 10);
    const startTime = new Date().getTime();
    // 调用 addPage() 接口
    doc.addPage();
    const endTime = new Date().getTime();
    const timeDiff = endTime - startTime;
    doc.text('Page 2', 10, 10);
    let content: string = doc.output();
    console.log("addPage() completed.content.length=" + content.length);
    console.log("Time taken: " + timeDiff + " milliseconds.");
    return timeDiff;
}
export function testMovePage() {
    console.log("Calling movePage()...");
    const doc = new jsPDF();
    doc.text('Page 1', 10, 10);
    doc.addPage();
    doc.text('Page 2', 10, 10);
    const startTime = new Date().getTime();
    // 调用 movePage() 接口
    doc.movePage(1, 2);
    const endTime = new Date().getTime();
    const timeDiff = endTime - startTime;
    let content: string = doc.output();
    console.log("movePage() completed. content length= " + content.length);
    console.log("Time taken: " + timeDiff + " milliseconds.");
    return timeDiff;
}
export function testText() {
    console.log("Calling text()...");
    const doc = new jsPDF();
    const startTime = new Date().getTime();
    // 调用 text() 接口
    doc.text('Hello, World!', 10, 10);
    const endTime = new Date().getTime();
    const timeDiff = endTime - startTime;
    doc.text('This is a sample document.', 10, 20);
    let content: string = doc.output();
    console.log("text() completed.content length= " + content.length);
    console.log("Time taken: " + timeDiff + " milliseconds.");
    return timeDiff;
}
export function testSetPage() {
    console.log("Calling setPage()...");
    const doc = new jsPDF();
    const startTime = new Date().getTime();
    // 调用 setPage() 接口
    doc.setPage('a4');
    const endTime = new Date().getTime();
    const timeDiff = endTime - startTime;
    doc.text('Hello, World!', 10, 10);
    let content: string = doc.output();
    console.log("setPage() completed.length= " + content.length);
    console.log("Time taken: " + timeDiff + " milliseconds.");
    return timeDiff;
}
export function testInsertPage() {
    console.log("Calling insertPage()...");
    const doc = new jsPDF();
    const startTime = new Date().getTime();
    // 调用 insertPage() 接口
    doc.insertPage(1);
    const endTime = new Date().getTime();
    const timeDiff = endTime - startTime;
    doc.text('Inserted Page', 10, 10);
    let content: string = doc.output();
    console.log("insertPage() completed. content length= " + content.length);
    console.log("Time taken: " + timeDiff + " milliseconds.");
    return timeDiff;
}
export function testGetPageWidth() {
    console.log("Calling getPageWidth()...");
    const doc = new jsPDF();
    const startTime = new Date().getTime();
    // 调用 getPageWidth() 接口
    const pageWidth = doc.getPageWidth();
    const endTime = new Date().getTime();
    const timeDiff = endTime - startTime;
    console.log("getPageWidth() completed. Page Width:=" + pageWidth);
    console.log("Time taken: " + timeDiff + " milliseconds.");
    return timeDiff;
}
export function testGetPageHeight() {
    console.log("Calling getPageHeight()...");
    const doc = new jsPDF();
    const startTime = new Date().getTime();
    // 调用 getPageWidth() 接口
    const pageHeight = doc.getPageHeight();
    const endTime = new Date().getTime();
    const timeDiff = endTime - startTime;
    console.log("getPageHeight() completed. Page Height:=" + pageHeight);
    console.log("Time taken: " + timeDiff + " milliseconds.");
    return timeDiff;
}
export function testDeletePage() {
    console.log("Calling deletePage()...");
    const doc = new jsPDF();
    doc.text('Page 1', 10, 10);
    doc.addPage();
    doc.text('Page 2', 10, 10);
    const startTime = new Date().getTime();
    // 调用deletePage() 接口
    doc.deletePage(1);
    const endTime = new Date().getTime();
    const timeDiff = endTime - startTime;
    let content: string = doc.output();
    console.log("deletePage() completed.  content length= " + content.length);
    console.log("Time taken: " + timeDiff + " milliseconds.");
    return timeDiff;
}
