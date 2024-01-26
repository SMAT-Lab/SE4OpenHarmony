interface TestBigFile_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TestBigFile_" + ++__generate__Id;
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
import { ID3v1 } from '@ohos/mp3agic/';
import { ID3v2 } from '@ohos/mp3agic/';
import { GlobalContext } from '@ohos/mp3agic/';
class TestBigFile extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TestBigFile_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Button.createWithLabel('Test big file ');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            this.testBigFile1('TwoStepsFromHellStarSky.mp3');
        });
        Button.margin(5);
        Button.pop();
        Button.createWithLabel('Test two big file ');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            this.testBigFile1('TwoStepsFromHellStarSky.mp3');
            this.testBigFile1('GeorgeWinstonVariationsOnTheCanonByPachelbel.mp3');
        });
        Button.margin(5);
        Button.pop();
        Column.pop();
        Row.pop();
    }
    testBigFile1(filename: string) {
        try {
            let path: string = GlobalContext.getContext().getValue("path").toString();
            let mp3file = new Mp3File(path + '/' + filename);
            if (mp3file.hasId3v1Tag()) {
                let id3v1Tag: ID3v1 = mp3file.getId3v1Tag();
                id3v1Tag.setTrack("4");
                id3v1Tag.setTitle("The Title");
                id3v1Tag.setArtist("An Artist");
                id3v1Tag.setAlbum("The Album");
                id3v1Tag.setYear("2022");
                id3v1Tag.setGenre(16);
                id3v1Tag.setComment("Some comment");
            }
            if (mp3file.hasId3v2Tag()) {
                let id3v2Tag: ID3v2 = mp3file.getId3v2Tag();
                id3v2Tag.setComposer('is a Composer');
                id3v2Tag.setPublisher('A Publisher');
                id3v2Tag.setOriginalArtist('Another Artist');
                id3v2Tag.setAlbumArtist('An Artist');
                id3v2Tag.setCopyright('Copyright');
                id3v2Tag.setUrl('http://foobar.com');
                id3v2Tag.setEncoder('A Encoder');
                id3v2Tag.setPartOfSet('str');
            }
            mp3file.save(filename + '-copy.mp3');
        }
        catch (error) {
            console.error("mp3agiclog read v1tagwithnotrack.mp3:" + error);
        }
    }
}
loadDocument(new TestBigFile("1", undefined, {}));
