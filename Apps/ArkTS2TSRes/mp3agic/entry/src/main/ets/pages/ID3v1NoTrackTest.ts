interface Index_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ID3v1NoTrackTest_" + ++__generate__Id;
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
import { GlobalContext, Mp3File } from '@ohos/mp3agic/';
import { ID3v1 } from '@ohos/mp3agic/';
import { ID3v2 } from '@ohos/mp3agic/';
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
        Button.createWithLabel('确认修改');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let mp3file = new Mp3File(GlobalContext.getContext().getValue("path").toString() + '/v1tagwithnotrack.mp3');
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
                mp3file.save('v1tagwithnotrack-copy.mp3');
            }
            catch (error) {
                console.error("mp3agiclog read v1tagwithnotrack.mp3:" + error);
            }
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('读取文件');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let mp3file = new Mp3File(GlobalContext.getContext().getValue("path").toString() + "/v1tagwithnotrack-copy.mp3");
                console.log('mp3agiclog Id3v1Tag mp3file.hasId3v1Tag(): ' + mp3file.hasId3v1Tag());
                if (mp3file.hasId3v1Tag()) {
                    let id3v1Tag: ID3v1 = mp3file.getId3v1Tag();
                    console.log('mp3agiclog Id3v1Tag Track: ' + id3v1Tag.getTrack());
                    console.log('mp3agiclog Id3v1Tag Artist: ' + id3v1Tag.getArtist());
                    console.log('mp3agiclog Id3v1Tag Title: ' + id3v1Tag.getTitle());
                    console.log('mp3agiclog Id3v1Tag Album: ' + id3v1Tag.getAlbum());
                    console.log('mp3agiclog Id3v1Tag Year: ' + id3v1Tag.getYear());
                    console.log('mp3agiclog Id3v1Tag Genre: ' + id3v1Tag.getGenre() + " (" + id3v1Tag.getGenreDescription() + ")");
                    console.log('mp3agiclog Id3v1Tag Comment: ' + id3v1Tag.getComment());
                }
                console.log('mp3agiclog Id3v2Tag mp3file.hasId3v2Tag(): ' + mp3file.hasId3v2Tag());
            }
            catch (error) {
                console.error('mp3agiclog new Id3v1Tag:' + error);
            }
        });
        Button.margin(10);
        Button.pop();
        Flex.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
