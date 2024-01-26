interface Index_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ID3v1TagOrID3v2TagTest_" + ++__generate__Id;
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
        Button.createWithLabel('读取 v23unicodetags.mp3');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let mp3file = new Mp3File(GlobalContext.getContext().getValue("path").toString() + '/' + "v23unicodetags.mp3");
                if (mp3file.hasId3v2Tag()) {
                    let id3v2Tag: ID3v2 = mp3file.getId3v2Tag();
                    // result
                    console.log("mp3agiclog Id3v2Tag getArtist: " + id3v2Tag.getArtist());
                    // result
                    console.log("mp3agiclog Id3v2Tag getTitle: " + id3v2Tag.getTitle());
                    // result
                    console.log("mp3agiclog Id3v2Tag getAlbum: " + id3v2Tag.getAlbum());
                    // result
                    console.log("mp3agiclog Id3v2Tag Composer: " + id3v2Tag.getComposer());
                }
            }
            catch (error) {
                console.error("mp3agiclog read v23unicodetags.mp3:" + error);
            }
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('读取 withitunescomment.mp3');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let mp3file = new Mp3File(GlobalContext.getContext().getValue("path").toString() + '/withitunescomment.mp3');
                if (mp3file.hasId3v2Tag()) {
                    let id3v2Tag: ID3v2 = mp3file.getId3v2Tag();
                    // COMMENT123456789012345678901
                    console.log("mp3agiclog Id3v2Tag getComment: " + id3v2Tag.getComment());
                    // 00000A78 00000A74 00000C7C 00000C6C 00000000 00000000 000051F7 00005634 00000000 00000000
                    console.log("mp3agiclog Id3v2Tag getItunesComment: " + id3v2Tag.getItunesComment());
                }
            }
            catch (error) {
                console.error("mp3agiclog 读取 withitunescomment.mp3:" + error);
            }
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('读取 v1andv23tagswithalbumimage.mp3');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let mp3file = new Mp3File(GlobalContext.getContext().getValue("path").toString() + '/v1andv23tagswithalbumimage.mp3');
                if (mp3file.hasId3v2Tag()) {
                    let id3v2Tag: ID3v2 = mp3file.getId3v2Tag();
                    // 1
                    console.log("mp3agiclog Id3v2Tag getTrack: " + id3v2Tag.getTrack());
                    // ARTIST123456789012345678901234
                    console.log("mp3agiclog Id3v2Tag getArtist: " + id3v2Tag.getArtist());
                    // TITLE1234567890123456789012345
                    console.log("mp3agiclog Id3v2Tag getTitle: " + id3v2Tag.getTitle());
                    // ALBUM1234567890123456789012345
                    console.log("mp3agiclog Id3v2Tag getAlbum: " + id3v2Tag.getAlbum());
                    // 2001
                    console.log("mp3agiclog Id3v2Tag getYear: " + id3v2Tag.getYear());
                    // 0x0d---->13
                    console.log("mp3agiclog Id3v2Tag getGenre: " + id3v2Tag.getGenre());
                    // Pop
                    console.log("mp3agiclog Id3v2Tag getGenreDescription: " + id3v2Tag.getGenreDescription());
                    // COMMENT123456789012345678901
                    console.log("mp3agiclog Id3v2Tag getComment: " + id3v2Tag.getComment());
                    // LYRICS1234567890123456789012345
                    console.log("mp3agiclog Id3v2Tag Lyrics: " + id3v2Tag.getLyrics());
                    // COMPOSER23456789012345678901234
                    console.log("mp3agiclog Id3v2Tag Composer: " + id3v2Tag.getComposer());
                    // ORIGARTIST234567890123456789012
                    console.log("mp3agiclog Id3v2Tag Original artist: " + id3v2Tag.getOriginalArtist());
                    // COPYRIGHT2345678901234567890123
                    console.log("mp3agiclog Id3v2Tag Copyright: " + id3v2Tag.getCopyright());
                    // URL2345678901234567890123456789
                    console.log("mp3agiclog Id3v2Tag URL: " + id3v2Tag.getUrl());
                    // ENCODER234567890123456789012345"
                    console.log("mp3agiclog Id3v2Tag Encoder: " + id3v2Tag.getEncoder());
                    let albumImageData: number[] = id3v2Tag.getAlbumImage();
                    if (albumImageData != null) {
                        // 1885
                        console.log("mp3agiclog Id3v2Tag Have album image data, length: " + albumImageData.length + " bytes");
                        // "image/png"
                        console.log("mp3agiclog Id3v2Tag album image mime type: " + id3v2Tag.getAlbumImageMimeType());
                    }
                }
            }
            catch (error) {
                console.error("mp3agiclog 读取 v1andv23tagswithalbumimage.mp3:" + error);
            }
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('test RemoveAlbumImageFrame');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let mp3file = new Mp3File(GlobalContext.getContext().getValue("path").toString() + '/v1andv23tagswithalbumimage.mp3');
                if (mp3file.hasId3v2Tag()) {
                    let id3v2Tag: ID3v2 = mp3file.getId3v2Tag();
                    let albumImageData: number[] = id3v2Tag.getAlbumImage();
                    if (albumImageData != null) {
                        // 1885
                        console.log("mp3agiclog Id3v2Tag Have album image data, length: " + albumImageData.length + " bytes");
                    }
                    id3v2Tag.clearAlbumImage();
                    console.log("mp3agiclog Id3v2Tag getAlbumImage(): " + id3v2Tag.getAlbumImage());
                }
            }
            catch (error) {
                console.error("mp3agiclog test RemoveAlbumImageFrame:" + error);
            }
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('读取 v1andv23tagswithalbumimage_utf16le.mp3');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let mp3file = new Mp3File(GlobalContext.getContext().getValue("path").toString() + '/v1andv23tagswithalbumimage_utf16le.mp3');
                if (mp3file.hasId3v2Tag()) {
                    let id3v2Tag: ID3v2 = mp3file.getId3v2Tag();
                    //  1
                    console.log("mp3agiclog Id3v2Tag getTrack: " + id3v2Tag.getTrack());
                    //  ARTIST123456789012345678901234
                    console.log("mp3agiclog Id3v2Tag getArtist: " + id3v2Tag.getArtist());
                    //  TITLE1234567890123456789012345
                    console.log("mp3agiclog Id3v2Tag getTitle: " + id3v2Tag.getTitle());
                    //  ALBUM1234567890123456789012345
                    console.log("mp3agiclog Id3v2Tag getAlbum: " + id3v2Tag.getAlbum());
                    //  2001
                    console.log("mp3agiclog Id3v2Tag getYear: " + id3v2Tag.getYear());
                    //  0x01---->1
                    console.log("mp3agiclog Id3v2Tag getGenre: " + id3v2Tag.getGenre());
                    // Classic Rock
                    console.log("mp3agiclog Id3v2Tag getGenreDescription: " + id3v2Tag.getGenreDescription());
                    // COMMENT123456789012345678901
                    console.log("mp3agiclog Id3v2Tag getComment: " + id3v2Tag.getComment());
                    // COMPOSER23456789012345678901234
                    console.log("mp3agiclog Id3v2Tag Composer: " + id3v2Tag.getComposer());
                    // ORIGARTIST234567890123456789012
                    console.log("mp3agiclog Id3v2Tag Original artist: " + id3v2Tag.getOriginalArtist());
                    // COPYRIGHT2345678901234567890123
                    console.log("mp3agiclog Id3v2Tag Copyright: " + id3v2Tag.getCopyright());
                    // URL2345678901234567890123456789
                    console.log("mp3agiclog Id3v2Tag URL: " + id3v2Tag.getUrl());
                    // ENCODER234567890123456789012345"
                    console.log("mp3agiclog Id3v2Tag Encoder: " + id3v2Tag.getEncoder());
                    let albumImageData: number[] = id3v2Tag.getAlbumImage();
                    if (albumImageData != null) {
                        // 1885
                        console.log("mp3agiclog Id3v2Tag Have album image data, length: " + albumImageData.length + " bytes");
                        // "image/png"
                        console.log("mp3agiclog Id3v2Tag album image mime type: " + id3v2Tag.getAlbumImageMimeType());
                    }
                }
            }
            catch (error) {
                console.error("mp3agiclog 读取 v1andv23tagswithalbumimage_utf16le.mp3:" + error);
            }
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('确认修改 v1andv23tagswithalbumimage');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let mp3file = new Mp3File(GlobalContext.getContext().getValue("path").toString() + '/v1andv23tagswithalbumimage.mp3');
                if (mp3file.hasId3v1Tag()) {
                    let id3v1Tag: ID3v1 = mp3file.getId3v1Tag();
                    id3v1Tag.setTrack("33");
                    id3v1Tag.setTitle("title");
                    id3v1Tag.setArtist("zhou");
                    id3v1Tag.setAlbum("The Album");
                    id3v1Tag.setYear("2020");
                    id3v1Tag.setGenre(18);
                    id3v1Tag.setComment("new comment");
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
                }
                mp3file.save('v1andv23tagswithalbumimage-copy.mp3');
            }
            catch (error) {
                console.error("mp3agiclog update v1andv23tagswithalbumimage.mp3:" + error);
            }
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('读取文件 v1andv23tagswithalbumimage-copy');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let mp3file = new Mp3File(GlobalContext.getContext().getValue("path").toString() + '/v1andv23tagswithalbumimage-copy.mp3');
                console.log('mp3agiclog Id3v1Tag mp3file.hasId3v1Tag(): ' + mp3file.hasId3v1Tag());
                if (mp3file.hasId3v1Tag()) {
                    let id3v1Tag: ID3v1 = mp3file.getId3v1Tag();
                    console.log('mp3agiclog Id3v1Tag Track: ' + id3v1Tag.getTrack());
                    console.log('mp3agiclog Id3v1Tag Artist: ' + id3v1Tag.getArtist());
                    console.log('mp3agiclog Id3v1Tag Artist length: ' + id3v1Tag.getArtist().length);
                    console.log('mp3agiclog Id3v1Tag Title: ' + id3v1Tag.getTitle());
                    console.log('mp3agiclog Id3v1Tag Album: ' + id3v1Tag.getAlbum());
                    console.log('mp3agiclog Id3v1Tag Year: ' + id3v1Tag.getYear());
                    console.log('mp3agiclog Id3v1Tag Genre: ' + id3v1Tag.getGenre() + " (" + id3v1Tag.getGenreDescription() + ")");
                    console.log('mp3agiclog Id3v1Tag Comment: ' + id3v1Tag.getComment());
                }
                console.log('mp3agiclog Id3v2Tag mp3file.hasId3v2Tag(): ' + mp3file.hasId3v2Tag());
                if (mp3file.hasId3v2Tag()) {
                    let id3v2Tag: ID3v2 = mp3file.getId3v2Tag();
                    console.log("mp3agiclog Id3v2Tag Lyrics: " + id3v2Tag.getLyrics());
                    console.log("mp3agiclog Id3v2Tag Composer: " + id3v2Tag.getComposer());
                    console.log("mp3agiclog Id3v2Tag Publisher: " + id3v2Tag.getPublisher());
                    console.log("mp3agiclog Id3v2Tag Original artist: " + id3v2Tag.getOriginalArtist());
                    console.log("mp3agiclog Id3v2Tag Album artist: " + id3v2Tag.getAlbumArtist());
                    console.log("mp3agiclog Id3v2Tag Copyright: " + id3v2Tag.getCopyright());
                    console.log("mp3agiclog Id3v2Tag URL: " + id3v2Tag.getUrl());
                    console.log("mp3agiclog Id3v2Tag Encoder: " + id3v2Tag.getEncoder());
                    console.log("mp3agiclog getVersion:" + id3v2Tag.getVersion());
                    console.log("mp3agiclog getLength: " + id3v2Tag.getLength());
                    console.log("mp3agiclog getFrameSets().size: " + id3v2Tag.getFrameSets()
                        .size);
                    let albumImageData: number[] = id3v2Tag.getAlbumImage();
                    if (albumImageData != null) {
                        console.log("mp3agiclog Id3v2Tag Have album image data, length: " + albumImageData.length + " bytes");
                        console.log("mp3agiclog Id3v2Tag album image mime type: " + id3v2Tag.getAlbumImageMimeType());
                    }
                }
            }
            catch (error) {
                console.error('mp3agiclog test ID3v1Tag or ID3v2Tag error: ' + error);
            }
        });
        Button.margin(10);
        Button.pop();
        Flex.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
