interface Index_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ID3v2FrameDataTest_" + ++__generate__Id;
}
/**
 *  MIT License
 *
 *  Copyright (c) 2023 Huawei Device Co., Ltd.
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
import { ID3v2CommentFrameData } from '@ohos/mp3agic/';
import { ID3v2UrlFrameData } from '@ohos/mp3agic/';
import { ID3v2WWWFrameData } from '@ohos/mp3agic/';
import { ID3v2TextFrameData } from '@ohos/mp3agic/';
import { ID3v2PictureFrameData } from '@ohos/mp3agic/';
import { JList } from '@ohos/mp3agic/';
import { ID3v2Frame } from '@ohos/mp3agic/';
import { ID3v2ChapterTOCFrameData } from '@ohos/mp3agic/';
import { ID3v2PopmFrameData } from '@ohos/mp3agic/';
import { EncodedText } from '@ohos/mp3agic/';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Button.createWithLabel('Test ID3v2CommentFrameData');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let frameData = new ID3v2CommentFrameData(false);
                let bytes = frameData.toBytes();
                let frameDataCopy = ID3v2CommentFrameData.create(false, bytes);
                // result eng
                console.log("mp3agiclog ID3v2CommentFrameData frameDataCopy getLanguage:" + frameDataCopy.getLanguage());
                // result ""
                console.log("mp3agiclog ID3v2CommentFrameData frameDataCopy getDescription:" + frameDataCopy.getDescription());
                // result ""
                console.log("mp3agiclog ID3v2CommentFrameData frameDataCopy getComment:" + frameDataCopy.getComment());
                frameData.setLanguage("my language");
                frameData.setComment(new EncodedText({ str: "my comment" }));
                frameData.setDescription(new EncodedText({ str: "my description" }));
                // result my language
                console.log("mp3agiclog ID3v2CommentFrameData frameData getLanguage:" + frameData.getLanguage());
                // result "my description"
                console.log("mp3agiclog ID3v2CommentFrameData frameData getDescription:" + frameData.getDescription());
                // result "my comment"
                console.log("mp3agiclog ID3v2CommentFrameData frameData getComment:" + frameData.getComment());
                let frameData1 = new ID3v2CommentFrameData(false, "", new EncodedText({ str: "lang" }), new EncodedText({ str: "abcdef" }));
                let bytes1 = frameData1.toBytes();
                let frameDataCopy1 = ID3v2CommentFrameData.create(false, bytes1);
                // result eng
                console.log("mp3agiclog ID3v2CommentFrameData getLanguage:" + frameDataCopy1.getLanguage());
                // result "lang"
                console.log("mp3agiclog ID3v2CommentFrameData getDescription:" + frameDataCopy1.getDescription());
                // result "abcdef"
                console.log("mp3agiclog ID3v2CommentFrameData getComment:" + frameDataCopy1.getComment());
                frameData1 = new ID3v2CommentFrameData(false, "han", null, new EncodedText({
                    textEncoding: EncodedText.TEXT_ENCODING_UTF_16,
                    str: "\u03C3\u03BF\u03C5"
                }));
                bytes1 = frameData1.toBytes();
                frameDataCopy1 = ID3v2CommentFrameData.create(false, bytes1);
                // result han
                console.log("mp3agiclog ID3v2CommentFrameData getLanguage:" + frameDataCopy1.getLanguage());
                // result ""
                console.log("mp3agiclog ID3v2CommentFrameData getDescription:" + frameDataCopy1.getDescription());
                // result "σου"
                console.log("mp3agiclog ID3v2CommentFrameData getComment:" + frameDataCopy1.getComment());
                // shouldConvertFrameDataWithBlankDescriptionAndLanguageToBytesAndBackToEquivalentObject
                bytes1 = [0, 0, 0, 0, 0, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81];
                frameDataCopy1 = ID3v2CommentFrameData.create(false, bytes1);
                // result ""
                console.log("mp3agiclog ID3v2CommentFrameData getLanguage:" + frameDataCopy1.getLanguage());
                // result ""
                console.log("mp3agiclog ID3v2CommentFrameData getDescription:" + frameDataCopy1.getDescription());
                // result "σου"
                console.log("mp3agiclog ID3v2CommentFrameData getComment:" + frameDataCopy1.getComment());
            }
            catch (error) {
                console.error("mp3agiclog Test ID3v2CommentFrameData:" + error);
            }
        });
        Button.margin(5);
        Button.pop();
        Button.createWithLabel('Test ID3v2UrlFrameData');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let frameData = new ID3v2UrlFrameData(false);
                frameData.setUrl(new EncodedText({ str: "My URL" }).toString());
                frameData.setDescription(new EncodedText({ str: "my description" }));
                // result "my description"
                console.log("mp3agiclog ID3v2UrlFrameData getDescription:" + frameData.getDescription());
                // result "My URL"
                console.log("mp3agiclog ID3v2UrlFrameData  getUrl:" + frameData.getUrl());
                // shouldConvertFrameDataWithUnicodeDescriptionToBytesAndBackToEquivalentObject
                let frameData1 = new ID3v2UrlFrameData(false, new EncodedText({
                    textEncoding: EncodedText.TEXT_ENCODING_UTF_16,
                    str: "\u03B3\u03B5\u03B9\u03AC"
                }), "http://ABCDEFGHIJKLMNOPQ");
                let bytes1 = frameData1.toBytes();
                let frameDataCopy1 = ID3v2UrlFrameData.create(false, bytes1);
                // result "http://ABCDEFGHIJKLMNOPQ"
                console.log("mp3agiclog ID3v2UrlFrameData getUrl:" + frameDataCopy1.getUrl());
                // result "γειά"
                console.log("mp3agiclog ID3v2UrlFrameData getDescription:" + frameDataCopy1.getDescription());
            }
            catch (error) {
                console.error("mp3agiclog ID3v2UrlFrameData:" + error);
            }
        });
        Button.margin(5);
        Button.pop();
        Button.createWithLabel('Test ID3v2PopmFrameData');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let bytes1 = [65, 100, 100, 114, 101, 115, 115, 0, 0];
                let frameDataCopy1 = new ID3v2PopmFrameData(false, bytes1);
                // result "Address"
                console.log("mp3agiclog ID3v2PopmFrameData getAddress:" + frameDataCopy1.getAddress());
                // result 0
                console.log("mp3agiclog ID3v2PopmFrameData getRating:" + frameDataCopy1.getRating());
                bytes1 = [65, 100, 100, 114, 101, 115, 115, 0, -128];
                frameDataCopy1 = new ID3v2PopmFrameData(false, bytes1);
                // result "Address"
                console.log("mp3agiclog ID3v2PopmFrameData getAddress:" + frameDataCopy1.getAddress());
                // result 3
                console.log("mp3agiclog ID3v2PopmFrameData getRating:" + frameDataCopy1.getRating());
                bytes1 = [65, 100, 100, 114, 101, 115, 115, 0, 51];
                frameDataCopy1 = new ID3v2PopmFrameData(false, bytes1);
                // result "Address"
                console.log("mp3agiclog ID3v2PopmFrameData getAddress:" + frameDataCopy1.getAddress());
                // result -1
                console.log("mp3agiclog ID3v2PopmFrameData getRating:" + frameDataCopy1.getRating());
                frameDataCopy1.setRating(11);
                frameDataCopy1.setAddress("New Address");
                // result "New Address"
                console.log("mp3agiclog ID3v2PopmFrameData getAddress:" + frameDataCopy1.getAddress());
                // result 11
                console.log("mp3agiclog ID3v2PopmFrameData getRating:" + frameDataCopy1.getRating());
                frameDataCopy1 = new ID3v2PopmFrameData(false, null, 5);
                let result = frameDataCopy1.packFrameData();
                // result[87,105,110,100,111,119,115,32,77,101,100,105,97,32,80,108,97,121,101,114,32,57,32,83,101,114,105,101,115,0,-1]
                console.log("mp3agiclog ID3v2PopmFrameData result:" + result);
            }
            catch (error) {
                console.error("mp3agiclog ID3v2PopmFrameData:" + error);
            }
        });
        Button.margin(5);
        Button.pop();
        Button.createWithLabel('Test ID3v2WWWFrameData');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let frameDataCopy1 = new ID3v2WWWFrameData(false);
                frameDataCopy1.setUrl("My URL");
                // result My URL
                console.log("mp3agiclog ID3v2WWWFrameData getUrl:" + frameDataCopy1.getUrl());
            }
            catch (error) {
                console.error("mp3agiclog ID3v2WWWFrameData:" + error);
            }
        });
        Button.margin(5);
        Button.pop();
        Button.createWithLabel('Test ID3v2TextFrameData');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let frameDataCopy1 = new ID3v2TextFrameData(false);
                frameDataCopy1.setText(new EncodedText({ str: "my text" }));
                console.log("mp3agiclog ID3v2TextFrameData getText:" + frameDataCopy1.getText());
            }
            catch (error) {
                console.error("mp3agiclog ID3v2TextFrameData:" + error);
            }
        });
        Button.margin(5);
        Button.pop();
        Button.createWithLabel('Test ID3v2ChapterTOCFrameData');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let frameData = new ID3v2ChapterTOCFrameData(false);
                frameData.setRoot(true);
                frameData.setOrdered(true);
                frameData.setChildren(["ch1", "ch2"]);
                frameData.setId("MY ID");
                let subframes = new JList<ID3v2Frame>();
                subframes.insert(new ID3v2Frame("", new Int8Array([99, 104, 49, 0])));
                subframes.insert(new ID3v2Frame("", new Int8Array([1, 0, 1, 0])));
                frameData.setSubframes(subframes);
                console.log("mp3agiclog ID3v2ChapterTOCFrameData getId:" + frameData.getId());
                console.log("mp3agiclog ID3v2ChapterTOCFrameData getChildren:" + frameData.getChildren());
                console.log("mp3agiclog ID3v2ChapterTOCFrameData isOrdered:" + frameData.isOrdered());
                console.log("mp3agiclog ID3v2ChapterTOCFrameData isRoot:" + frameData.isRoot());
                console.log("mp3agiclog ID3v2ChapterTOCFrameData getSubframes().length():" + frameData.getSubframes()
                    .length());
                console.log("mp3agiclog ID3v2ChapterTOCFrameData getData:" + frameData.getSubframes().get(0).getData());
                console.log("mp3agiclog ID3v2ChapterTOCFrameData getData:" + frameData.getSubframes().get(1).getData());
            }
            catch (error) {
                console.error("mp3agiclog ID3v2ChapterTOCFrameData:" + error);
            }
        });
        Button.margin(5);
        Button.pop();
        Button.createWithLabel('Test ID3v2PictureFrameData');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let frameData = new ID3v2PictureFrameData(false);
                frameData.setMimeType("Mime Type 1");
                frameData.setPictureType(4);
                frameData.setDescription(new EncodedText({ str: "my description" }));
                frameData.setImageData([1, 2]);
                // result My URL
                console.log("mp3agiclog ID3v2PictureFrameData getMimeType:" + frameData.getMimeType());
                console.log("mp3agiclog ID3v2PictureFrameData getPictureType:" + frameData.getPictureType());
                console.log("mp3agiclog ID3v2PictureFrameData getDescription:" + frameData.getDescription());
                console.log("mp3agiclog ID3v2PictureFrameData getImageData:" + frameData.getImageData());
                // shouldConvertFrameDataWithUnicodeDescriptionToBytesAndBackToEquivalentObject
                let b = [1, 2, 3, 4, 5];
                let text = new EncodedText({
                    textEncoding: EncodedText.TEXT_ENCODING_UTF_16,
                    str: "\u03B3\u03B5\u03B9\u03AC"
                });
                frameData = new ID3v2PictureFrameData(false, b, "mime/type", 3, text);
                // result [1, 109, 105, 109, 101, 47, 116, 121, 112, 101, 0, 3, -1, -2, -77, 3, -75, 3, -71, 3, -84, 3, 0, 0, 1, 2, 3, 4, 5]
                console.log("mp3agiclog ID3v2PictureFrameData getDescription:" + frameData.toBytes());
            }
            catch (error) {
                console.error("mp3agiclog ID3v2PictureFrameData:" + error);
            }
        });
        Button.margin(5);
        Button.pop();
        Flex.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
