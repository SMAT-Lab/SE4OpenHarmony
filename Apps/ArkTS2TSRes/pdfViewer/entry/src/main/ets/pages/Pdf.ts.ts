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
export function getBuffer(imageData: Uint8Array, pdfMessage: string) {
    let jsPdf = new jsPDF();
    jsPdf.addImage(imageData, pdfMessage.split('.')[1], 50, 50, 150, 150);
    //PDF content
    let content: string | Uint8Array = jsPdf.buildDocument();
    let buf: ArrayBuffer = jsPdf.getArrayBuffer(content);
    return buf;
}
export function getBuffer2(imageData: Uint8Array, pdfMessage: string, options: Object) {
    let jsPdf = new jsPDF();
    jsPdf.addImage(imageData, pdfMessage.split('.')[1], (options as Record<string, Object>).x, (options as Record<string, Object>).y, (options as Record<string, Object>).width, (options as Record<string, Object>).height, (options as Record<string, Object>).alias, (options as Record<string, Object>).compression, (options as Record<string, Object>).rotation);
    //PDF content
    let content: string | Uint8Array = jsPdf.buildDocument();
    let buf: ArrayBuffer = jsPdf.getArrayBuffer(content);
    return buf;
}
export function getContent(doc, colortype_6_rgba_8_bit_png, str, x, y, h, w, compression, rotation, alias?) {
    if (alias) {
        doc.addImage(colortype_6_rgba_8_bit_png, str, x, y, h, w, compression, rotation, alias);
    }
    else {
        doc.addImage(colortype_6_rgba_8_bit_png, str, x, y, h, w, compression, rotation);
    }
    let content: Array<number> = doc.buildDocument();
    return content;
}
export function getContent2(doc, colortype_6_rgba_8_bit_png, str, x, y, h, w) {
    doc.addImage(colortype_6_rgba_8_bit_png, str, x, y, h, w);
    let content: Array<number> = doc.buildDocument();
    return content;
}
export function getContent3(doc) {
    doc.addPage();
    doc.addPage();
    doc.text("Text that will end up on page 3", 20, 20);
    doc.setPage(1);
    doc.text("Text that will end up on page 1", 20, 20);
    doc.setPage(2);
    doc.text("Text that will end up on page 2", 20, 20);
    let content: string = doc.buildDocument();
    return content;
}
export function getContent4(doc) {
    doc.text("Text that will end up on page 2", 20, 20);
    doc.addPage();
    doc.text("Text that will end up on page 3", 20, 20);
    doc.insertPage(1);
    doc.text("Text that will end up on page 1", 20, 20);
    let content: string = doc.buildDocument();
    return content;
}
export function getContent5(doc) {
    doc.text("Text that will end up on page 1", 20, 20);
    doc.addPage();
    doc.text("Text that will end up on page 3", 20, 20);
    doc.insertPage(2);
    doc.text("Text that will end up on page 2", 20, 20);
    let content: Array<number> = doc.buildDocument();
    return content;
}
export function getContent6(doc) {
    doc.text("Text that will end up on page 1", 20, 20);
    doc.addPage();
    doc.text("Text that will end up on page 2", 20, 20);
    doc.addPage();
    doc.text("This page is being deleted", 20, 20);
    doc.addPage();
    doc.text("Text that will end up on page 3", 20, 20);
    doc.deletePage(3);
    let content: Array<number> = doc.buildDocument();
    return content;
}
export function getContent7(doc) {
    doc.text("Text that will end up on page 2", 20, 20);
    doc.addPage();
    doc.text("Text that will end up on page 1", 20, 20);
    doc.movePage(2, 1);
    let content: string = doc.output();
    return content;
}
export function getContent8(doc) {
    doc.text("Text that will end up on page 2", 20, 20);
    doc.addPage();
    doc.text("Text that will end up on page 1", 20, 20);
    doc.movePage(1, 2);
    let content: Array<number> = doc.buildDocument();
    return content;
}
export function getArrayBuffer(doc, content) {
    return doc.getArrayBuffer(content);
}
export function getSHashCode(doc, str?) {
    if (str) {
        return doc.__addimage__.sHashCode(str);
    }
    else {
        return doc.__addimage__.sHashCode();
    }
}
export function addPage(doc) {
    doc.addPage();
}
export function getPageWidth(doc, count) {
    doc.getPageWidth(count);
}
export function getPageHeight(doc, count) {
    doc.getPageHeight(count);
}
