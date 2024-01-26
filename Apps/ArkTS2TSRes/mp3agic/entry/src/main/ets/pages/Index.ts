interface Index_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
import { Mp3File } from '@ohos/mp3agic/';
import { ID3v2 } from '@ohos/mp3agic/';
import { ID3v2Frame } from '@ohos/mp3agic/';
import { ID3v2ChapterFrameData } from '@ohos/mp3agic/';
import { ID3v2ChapterTOCFrameData } from '@ohos/mp3agic/';
import { ID3v2TextFrameData } from '@ohos/mp3agic/';
import { EncodedText } from '@ohos/mp3agic/';
import { JList } from '@ohos/mp3agic/';
import router from '@ohos.router';
import { GlobalContext } from '@ohos/mp3agic/';
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
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        // contains v1tagwithnotrack.mp3、v1tag.mp3、v23tag.mp3、v1andv23tags.mp3、v1andv23tagswithalbumimage.mp3
        Button.createWithLabel('Test ID3v1Tag or ID3v2Tag');
        // contains v1tagwithnotrack.mp3、v1tag.mp3、v23tag.mp3、v1andv23tags.mp3、v1andv23tagswithalbumimage.mp3
        Button.backgroundColor(0x2788D9);
        // contains v1tagwithnotrack.mp3、v1tag.mp3、v23tag.mp3、v1andv23tags.mp3、v1andv23tagswithalbumimage.mp3
        Button.onClick((event: ClickEvent) => {
            let path = 'pages/ID3v1TagOrID3v2TagTest';
            router.pushUrl({
                url: path,
            });
        });
        // contains v1tagwithnotrack.mp3、v1tag.mp3、v23tag.mp3、v1andv23tags.mp3、v1andv23tagswithalbumimage.mp3
        Button.margin(5);
        // contains v1tagwithnotrack.mp3、v1tag.mp3、v23tag.mp3、v1andv23tags.mp3、v1andv23tagswithalbumimage.mp3
        Button.pop();
        // test new ID3v22Tag(), obsolete.mp3
        Button.createWithLabel('Test obsolete and picture');
        // test new ID3v22Tag(), obsolete.mp3
        Button.backgroundColor(0x2788D9);
        // test new ID3v22Tag(), obsolete.mp3
        Button.onClick((event: ClickEvent) => {
            let path = 'pages/ID3v2PictureFrameDataTest';
            router.pushUrl({
                url: path,
            });
        });
        // test new ID3v22Tag(), obsolete.mp3
        Button.margin(5);
        // test new ID3v22Tag(), obsolete.mp3
        Button.pop();
        // test v23tagwithwmprating.mp3
        Button.createWithLabel('Test ReadWmpRating and EncodeText');
        // test v23tagwithwmprating.mp3
        Button.backgroundColor(0x2788D9);
        // test v23tagwithwmprating.mp3
        Button.onClick((event: ClickEvent) => {
            let path = 'pages/ReadWmpRatingTest';
            router.pushUrl({
                url: path,
            });
        });
        // test v23tagwithwmprating.mp3
        Button.margin(5);
        // test v23tagwithwmprating.mp3
        Button.pop();
        // test ID3v2ChapterFrameData  use v23tagwithchapters.mp3 Dayu board takes a long time
        Button.createWithLabel('Test ID3v2ChapterFrameData');
        // test ID3v2ChapterFrameData  use v23tagwithchapters.mp3 Dayu board takes a long time
        Button.backgroundColor(0x2788D9);
        // test ID3v2ChapterFrameData  use v23tagwithchapters.mp3 Dayu board takes a long time
        Button.onClick((event: ClickEvent) => {
            try {
                let mp3file = new Mp3File(GlobalContext.getContext().getValue("path").toString() + '/v23tagwithchapters.mp3');
                console.log('mp3agiclog  Id3v2Tag mp3file.hasId3v2Tag(): ' + mp3file.hasId3v2Tag());
                if (mp3file.hasId3v2Tag()) {
                    let id3v2Tag: ID3v2 = mp3file.getId3v2Tag();
                    let chapters: JList<ID3v2ChapterFrameData> | any = id3v2Tag.getChapters();
                    console.log("mp3agiclog  ChapterFrame size:" + chapters.length());
                    let chapter1: ID3v2ChapterFrameData = chapters.get(0);
                    // result ch1
                    console.log("mp3agiclog  Chapter1 getId:" + chapter1.getId());
                    console.log("mp3agiclog  Chapter1 getStartTime:" + chapter1.getStartTime());
                    console.log("mp3agiclog  Chapter1 getEndTime:" + chapter1.getEndTime());
                    console.log("mp3agiclog  Chapter1 getStartOffset:" + chapter1.getStartOffset());
                    console.log("mp3agiclog  Chapter1 getEndOffset:" + chapter1.getEndOffset());
                    let subFrames1: JList<ID3v2Frame> = chapter1.getSubframes();
                    // size 1
                    console.log("mp3agiclog  Chapter1 subFrames length:" + subFrames1.length());
                    let subFrame1: ID3v2Frame = subFrames1.get(0);
                    // result TIT2
                    console.log("mp3agiclog  Chapter1 subFrames getId:" + subFrame1.getId());
                    let frameData1: ID3v2TextFrameData = ID3v2TextFrameData.create(false, subFrame1.getData());
                    // result start
                    console.log("mp3agiclog  Chapter1 subFrames frameData1.getText().toString():" + frameData1.getText()
                        .toString());
                    let chapter2: ID3v2ChapterFrameData = chapters.get(1);
                    // result ch2
                    console.log("mp3agiclog  chapter2 getId:" + chapter2.getId());
                    console.log("mp3agiclog  chapter2 getStartTime:" + chapter2.getStartTime());
                    console.log("mp3agiclog  chapter2 getEndTime:" + chapter2.getEndTime());
                    console.log("mp3agiclog  chapter2 getStartOffset:" + chapter2.getStartOffset());
                    console.log("mp3agiclog  chapter2 getEndOffset:" + chapter2.getEndOffset());
                    let subFrames2: JList<ID3v2Frame> = chapter2.getSubframes();
                    // size 1
                    console.log("mp3agiclog  Chapter2 subFrames length:" + subFrames2.length());
                    let subFrame2: ID3v2Frame = subFrames2.get(0);
                    // result TIT2
                    console.log("mp3agiclog  Chapter2 subFrames getId:" + subFrame2.getId());
                    let frameData2: ID3v2TextFrameData = ID3v2TextFrameData.create(false, subFrame2.getData());
                    // result 5 seconds
                    console.log("mp3agiclog  Chapter2 subFrames frameData2.getText().toString():" + frameData2.getText()
                        .toString());
                    let chapter3: ID3v2ChapterFrameData = chapters.get(2);
                    // result ch3
                    console.log("mp3agiclog  chapter3 getId:" + chapter3.getId());
                    console.log("mp3agiclog  chapter3 getStartTime:" + chapter3.getStartTime());
                    console.log("mp3agiclog  chapter3 getEndTime:" + chapter3.getEndTime());
                    console.log("mp3agiclog  chapter3 getStartOffset:" + chapter3.getStartOffset());
                    console.log("mp3agiclog  chapter3 getEndOffset:" + chapter3.getEndOffset());
                    let subFrames3: JList<ID3v2Frame> = chapter3.getSubframes();
                    // size 1
                    console.log("mp3agiclog  Chapter3 subFrames length:" + subFrames3.length());
                    let subFrame3: ID3v2Frame = subFrames3.get(0);
                    // result TIT2
                    console.log("mp3agiclog  Chapter3 subFrames getId:" + subFrame3.getId());
                    let frameData3: ID3v2TextFrameData = ID3v2TextFrameData.create(false, subFrame3.getData());
                    // result 10 seconds
                    console.log("mp3agiclog  Chapter3 subFrames frameData3.getText().toString():" + frameData3.getText()
                        .toString());
                }
            }
            catch (error) {
                console.error('mp3agiclog test ID3v2ChapterFrameData error: ' + error);
            }
        });
        // test ID3v2ChapterFrameData  use v23tagwithchapters.mp3 Dayu board takes a long time
        Button.margin(5);
        // test ID3v2ChapterFrameData  use v23tagwithchapters.mp3 Dayu board takes a long time
        Button.pop();
        // test ID3v2ChapterFrameData
        Button.createWithLabel('Test ID3v2Chapter TOC packData');
        // test ID3v2ChapterFrameData
        Button.backgroundColor(0x2788D9);
        // test ID3v2ChapterFrameData
        Button.onClick((event: ClickEvent) => {
            try {
                let frameData: ID3v2ChapterFrameData = new ID3v2ChapterFrameData(false, undefined, "ch1", 1, 380, 3, 400);
                let subFrameData: ID3v2TextFrameData = new ID3v2TextFrameData(false, new EncodedText({
                    str: "Hello there"
                }));
                frameData.addSubframe("TIT2", subFrameData);
                let bytes = frameData.toBytes();
                // result 99,104,49,0,0,0,0,1,0,0,1,124,0,0,0,3,0,0,1,-112,84,73,84,50,0,0,0,12,0,0,0,72,101,108,108,111,32,116,104,101,114,101
                console.log('mp3agiclog  test ID3v2ChapterFrameData bytes:' + bytes);
                let chapterFrame: ID3v2ChapterFrameData = new ID3v2ChapterFrameData(false, undefined);
                chapterFrame.setId("My ID");
                chapterFrame.setStartTime(5);
                chapterFrame.setEndTime(6);
                chapterFrame.setStartOffset(7);
                chapterFrame.setEndOffset(8);
                console.log('mp3agiclog  chapterFrame chapterFrame.getId():' + chapterFrame.getId());
                console.log('mp3agiclog  chapterFrame chapterFrame.getStartTime():' + chapterFrame.getStartTime());
                console.log('mp3agiclog  chapterFrame chapterFrame.getEndTime():' + chapterFrame.getEndTime());
                console.log('mp3agiclog  chapterFrame chapterFrame.getStartOffset():' + chapterFrame.getStartOffset());
                console.log('mp3agiclog  chapterFrame chapterFrame.getEndOffset():' + chapterFrame.getEndOffset());
                let subframes = new JList<ID3v2Frame>();
                // 'c' --- 99,  'h' ---104,'1'-----49
                subframes.insert(new ID3v2Frame("", new Int8Array([99, 104, 49, 0])));
                subframes.insert(new ID3v2Frame("", new Int8Array([1, 0, 1, 0])));
                chapterFrame.setSubframes(subframes);
                console.log('mp3agiclog  chapterFrame chapterFrame.getSubframes():' + chapterFrame.getSubframes().toString());
                console.log('mp3agiclog  chapterFrame chapterFrame.getSubframes().lerngth():' + chapterFrame.getSubframes()
                    .length());
            }
            catch (error) {
                console.error('mp3agiclog test ID3v2ChapterFrameData packData error: ' + error);
            }
            try {
                let strs = ["ch1", "ch2"];
                let frameData: ID3v2ChapterTOCFrameData = new ID3v2ChapterTOCFrameData(false, undefined, true, true, "toc1", strs);
                let subFrameData: ID3v2TextFrameData = new ID3v2TextFrameData(false, new EncodedText({
                    str: "Hello there"
                }));
                frameData.addSubframe("TIT2", subFrameData);
                let bytes = frameData.toBytes();
                // result 116,111,99,49,0,3,2,99,104,49,0,99,104,50,0,84,73,84,50,0,0,0,12,0,0,0,72,101,108,108,111,32,116,104,101,114,101
                console.log('mp3agiclog  test ID3v2ChapterTOCFrameData bytes:' + bytes);
            }
            catch (error) {
                console.error('mp3agiclog test ID3v2ChapterTOCFrameData packData error: ' + error);
            }
        });
        // test ID3v2ChapterFrameData
        Button.margin(5);
        // test ID3v2ChapterFrameData
        Button.pop();
        // test ID3v2ChapterTOCFrameData  use v23tagwithchapters.mp3 Dayu board takes a long time
        Button.createWithLabel('Test ID3v2ChapterTOCFrameData');
        // test ID3v2ChapterTOCFrameData  use v23tagwithchapters.mp3 Dayu board takes a long time
        Button.backgroundColor(0x2788D9);
        // test ID3v2ChapterTOCFrameData  use v23tagwithchapters.mp3 Dayu board takes a long time
        Button.onClick((event: ClickEvent) => {
            try {
                let mp3file = new Mp3File(GlobalContext.getContext().getValue("path").toString() + '/v23tagwithchapters.mp3');
                console.log('mp3agiclog  Id3v2Tag mp3file.hasId3v2Tag(): ' + mp3file.hasId3v2Tag());
                if (mp3file.hasId3v2Tag()) {
                    let id3v2Tag: ID3v2 = mp3file.getId3v2Tag();
                    let chapterTOCs: JList<ID3v2ChapterTOCFrameData> | any = id3v2Tag.getChapterTOC();
                    // result 1
                    console.log("mp3agiclog  ChapterTOC chapterTOCs.length():" + chapterTOCs.length());
                    let tocFrameData: ID3v2ChapterTOCFrameData = chapterTOCs.get(0);
                    console.log("mp3agiclog  ChapterTOC tocFrameData.getId():" + tocFrameData.getId());
                    console.log("mp3agiclog  ChapterTOC tocFrameData.getChildren().length:" + tocFrameData.getChildren()
                        .length);
                    console.log("mp3agiclog  ChapterTOC tocFrameData.getChildren(1):" + tocFrameData.getChildren()[0]);
                    console.log("mp3agiclog  ChapterTOC tocFrameData.getChildren(2):" + tocFrameData.getChildren()[1]);
                    console.log("mp3agiclog  ChapterTOC tocFrameData.getChildren(3):" + tocFrameData.getChildren()[2]);
                    let subFrames: JList<ID3v2Frame> = tocFrameData.getSubframes();
                    console.log("mp3agiclog  ChapterTOC subFrames.length():" + subFrames.length());
                }
            }
            catch (error) {
                console.error('mp3agiclog test ID3v2ChapterTOCFrameData error: ' + error);
            }
        });
        // test ID3v2ChapterTOCFrameData  use v23tagwithchapters.mp3 Dayu board takes a long time
        Button.margin(5);
        // test ID3v2ChapterTOCFrameData  use v23tagwithchapters.mp3 Dayu board takes a long time
        Button.pop();
        Button.createWithLabel('Test ID3v2Tag Special And Set');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            let path = 'pages/ID3v2TagSpecialAndSetTest';
            router.pushUrl({
                url: path,
            });
        });
        Button.margin(5);
        Button.pop();
        Button.createWithLabel('Test ID3v24Tag');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            let path = 'pages/ID3v24TagTest';
            router.pushUrl({
                url: path,
            });
        });
        Button.margin(5);
        Button.pop();
        Button.createWithLabel('Test ID3v1NoTrack');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            let path = 'pages/ID3v1NoTrackTest';
            router.pushUrl({
                url: path,
            });
        });
        Button.margin(5);
        Button.pop();
        // test contains  v1andv23andcustomtags.mp3、dummyframes.mp3、notags.mp3
        Button.createWithLabel('Test Mp3File');
        // test contains  v1andv23andcustomtags.mp3、dummyframes.mp3、notags.mp3
        Button.backgroundColor(0x2788D9);
        // test contains  v1andv23andcustomtags.mp3、dummyframes.mp3、notags.mp3
        Button.onClick((event: ClickEvent) => {
            let path = 'pages/Mp3FileTest';
            router.pushUrl({
                url: path,
            });
        });
        // test contains  v1andv23andcustomtags.mp3、dummyframes.mp3、notags.mp3
        Button.margin(5);
        // test contains  v1andv23andcustomtags.mp3、dummyframes.mp3、notags.mp3
        Button.pop();
        Button.createWithLabel('Test v1andv23andcustomtags');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            let path = 'pages/V1AndV23AndCustomTagsTest';
            router.pushUrl({
                url: path,
            });
        });
        Button.margin(5);
        Button.pop();
        Button.createWithLabel('Test ID3v2FrameData');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            let path = 'pages/ID3v2FrameDataTest';
            router.pushUrl({
                url: path,
            });
        });
        Button.margin(5);
        Button.pop();
        Button.createWithLabel('Test big map3 file ');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            let path = 'pages/TestBigFile';
            router.pushUrl({
                url: path,
            });
        });
        Button.pop();
        Flex.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
