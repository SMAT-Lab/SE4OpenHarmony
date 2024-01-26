interface Index_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ID3v24TagTest_" + ++__generate__Id;
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
import { ID3v24Tag } from '@ohos/mp3agic/';
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
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Button.createWithLabel('读取 v1andv24tags');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let mp3file = new Mp3File(GlobalContext.getContext().getValue("path").toString() + '/v1andv24tags.mp3');
                if (mp3file.hasId3v1Tag()) {
                    let id3v24tag: ID3v2 = mp3file.getId3v2Tag();
                    // 4.0
                    console.log('mp3agiclog ID3v24Tag id3v24tag.getVersion():' + id3v24tag.getVersion());
                    // 0x44B -----》 1099
                    console.log('mp3agiclog ID3v24Tag id3v24tag.getLength():' + id3v24tag.getLength());
                }
            }
            catch (error) {
                console.error("mp3agiclog read v1andv24tags.mp3:" + error);
            }
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('读取 get and set RecordingTime');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let id3tag: ID3v24Tag = new ID3v24Tag();
                let recordingTime = "01/01/2011 00:00:00";
                id3tag.setRecordingTime(recordingTime);
                let bytes = id3tag.toBytes();
                let newId3tag: ID3v24Tag = new ID3v24Tag(new Int8Array((bytes)));
                console.log('mp3agiclog ID3v24Tag newId3tag.getRecordingTime():' + newId3tag.getRecordingTime());
            }
            catch (error) {
                console.error("mp3agiclog 读取 get and set RecordingTime:" + error);
            }
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('确认修改');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let mp3file = new Mp3File(GlobalContext.getContext().getValue("path").toString() + '/v24tagswithalbumimage.mp3');
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
                    id3v2Tag.setComposer('The Composer');
                    id3v2Tag.setPublisher('A Publisher');
                    id3v2Tag.setOriginalArtist('Another Artist');
                    id3v2Tag.setAlbumArtist('An Artist');
                    id3v2Tag.setCopyright('Copyright');
                    id3v2Tag.setUrl('http://foobar');
                    id3v2Tag.setEncoder('The Encoder');
                    id3v2Tag.setLyrics('happy new year');
                    id3v2Tag.setCommercialUrl('http://xbt.com');
                    id3v2Tag.setCopyrightUrl('http://dlh.cn');
                    id3v2Tag.setArtistUrl('http://artist.com');
                    id3v2Tag.setAudiofileUrl('http://audio.cn');
                    id3v2Tag.setAudioSourceUrl('http://audiosource.com');
                    id3v2Tag.setRadiostationUrl('http://radio.cn');
                    id3v2Tag.setPaymentUrl('http://Payment.cn');
                    id3v2Tag.setPublisherUrl('http://publish.com');
                }
                mp3file.save('v24tagswithalbumimage-copy.mp3');
            }
            catch (error) {
                console.error("mp3agiclog test error:" + error);
            }
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('读取文件');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let mp3file = new Mp3File(GlobalContext.getContext().getValue("path").toString() + '/v24tagswithalbumimage-copy.mp3');
                console.log('mp3agiclog Id3v2Tag mp3file.hasId3v2Tag():' + mp3file.hasId3v2Tag());
                if (mp3file.hasId3v2Tag()) {
                    let id3v24tag: ID3v2 = mp3file.getId3v2Tag();
                    console.log('mp3agiclog ID3v24Tag id3v24tag.getVersion():' + id3v24tag.getVersion());
                    console.log('mp3agiclog ID3v24Tag id3v24tag.getTrack():' + id3v24tag.getTrack());
                    console.log('mp3agiclog ID3v24Tag id3v24tag.getArtist():' + id3v24tag.getArtist());
                    console.log('mp3agiclog ID3v24Tag id3v24tag.getTitle():' + id3v24tag.getTitle());
                    console.log('mp3agiclog ID3v24Tag id3v24tag.getAlbum():' + id3v24tag.getAlbum());
                    console.log('mp3agiclog ID3v24Tag id3v24tag.getGenre():' + id3v24tag.getGenre());
                    console.log('mp3agiclog ID3v24Tag id3v24tag.getGenreDescription():' + id3v24tag.getGenreDescription());
                    console.log('mp3agiclog ID3v24Tag id3v24tag.getComment():' + id3v24tag.getComment());
                    console.log('mp3agiclog ID3v24Tag id3v24tag.getLyrics():' + id3v24tag.getLyrics());
                    console.log('mp3agiclog ID3v24Tag id3v24tag.getComposer():' + id3v24tag.getComposer());
                    console.log('mp3agiclog ID3v24Tag id3v24tag.getOriginalArtist():' + id3v24tag.getOriginalArtist());
                    console.log('mp3agiclog ID3v24Tag id3v24tag.getCopyright():' + id3v24tag.getCopyright());
                    console.log('mp3agiclog ID3v24Tag id3v24tag.getUrl():' + id3v24tag.getUrl());
                    console.log('mp3agiclog ID3v24Tag id3v24tag.getCommercialUrl():' + id3v24tag.getCommercialUrl());
                    console.log('mp3agiclog ID3v24Tag id3v24tag.getCopyrightUrl():' + id3v24tag.getCopyrightUrl());
                    console.log('mp3agiclog ID3v24Tag id3v24tag.getArtistUrl():' + id3v24tag.getArtistUrl());
                    console.log('mp3agiclog ID3v24Tag id3v24tag.getAudiofileUrl():' + id3v24tag.getAudiofileUrl());
                    console.log('mp3agiclog ID3v24Tag id3v24tag.getAudioSourceUrl():' + id3v24tag.getAudioSourceUrl());
                    console.log('mp3agiclog ID3v24Tag id3v24tag.getRadiostationUrl():' + id3v24tag.getRadiostationUrl());
                    console.log('mp3agiclog ID3v24Tag id3v24tag.getPaymentUrl():' + id3v24tag.getPaymentUrl());
                    console.log('mp3agiclog ID3v24Tag id3v24tag.getPublisherUrl():' + id3v24tag.getPublisherUrl());
                    console.log('mp3agiclog ID3v24Tag id3v24tag.getEncoder():' + id3v24tag.getEncoder());
                    let albumImageData: number[] = id3v24tag.getAlbumImage();
                    if (albumImageData != null) {
                        console.log("mp3agiclog ID3v24Tag Have album image data, length: " + albumImageData.length + " bytes");
                        console.log("mp3agiclog ID3v24Tag lbum image mime type: " + id3v24tag.getAlbumImageMimeType());
                    }
                }
            }
            catch (error) {
                console.error('mp3agiclog test error: ' + error);
            }
        });
        Button.margin(10);
        Button.pop();
        Flex.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
