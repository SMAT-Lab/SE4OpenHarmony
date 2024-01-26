interface Index_Params {
    content?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ID3v2TagSpecialAndSetTest_" + ++__generate__Id;
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
import { ID3v22Tag } from '@ohos/mp3agic/';
import { GlobalContext } from '@ohos/mp3agic/';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__content = new ObservedPropertySimple('', this, "content");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.content !== undefined) {
            this.content = params.content;
        }
    }
    aboutToBeDeleted() {
        this.__content.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __content: ObservedPropertySimple<string>;
    get content() {
        return this.__content.get();
    }
    set content(newValue: string) {
        this.__content.set(newValue);
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Button.createWithLabel('Test shouldReadBPM');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let mp3file = new Mp3File(GlobalContext.getContext().getValue("path").toString() + '/v23tagwithbpm.mp3');
                if (mp3file.hasId3v2Tag()) {
                    let id3v2Tag: ID3v2 = mp3file.getId3v2Tag();
                    console.log("mp3agiclog Id3v2Tag getBPM: " + id3v2Tag.getBPM());
                }
            }
            catch (error) {
                console.error("mp3agiclog read v23unicodetags.mp3:" + error);
            }
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('Test shouldReadFloatingPointBPM');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let mp3file = new Mp3File(GlobalContext.getContext().getValue("path").toString() + '/v23tagwithbpmfloat.mp3');
                if (mp3file.hasId3v2Tag()) {
                    let id3v2Tag: ID3v2 = mp3file.getId3v2Tag();
                    console.log("mp3agiclog Id3v2Tag getBPM: " + id3v2Tag.getBPM());
                }
            }
            catch (error) {
                console.error("mp3agiclog read v23unicodetags.mp3:" + error);
            }
        });
        Button.margin(5);
        Button.pop();
        Button.createWithLabel('Test shouldReadFloatingPointBPMWithCommaDelimiter');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let mp3file = new Mp3File(GlobalContext.getContext().getValue("path").toString() + '/v23tagwithbpmfloatwithcomma.mp3');
                if (mp3file.hasId3v2Tag()) {
                    let id3v2Tag: ID3v2 = mp3file.getId3v2Tag();
                    console.log("mp3agiclog Id3v2Tag getBPM: " + id3v2Tag.getBPM());
                }
            }
            catch (error) {
                console.error("mp3agiclog Test shouldReadFloatingPointBPMWithCommaDelimiter:" + error);
            }
        });
        Button.margin(5);
        Button.pop();
        Button.createWithLabel('Test SetAndGet BPM');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let id3tag: ID3v22Tag = new ID3v22Tag();
                let bpm = 8 * 44100;
                id3tag.setBPM(bpm);
                let bytes = id3tag.toBytes();
                let newId3tag: ID3v22Tag = new ID3v22Tag(new Int8Array(bytes));
                console.log("mp3agiclog Id3v2Tag getBPM: " + newId3tag.getBPM());
            }
            catch (error) {
                console.error("mp3agiclog Test SetAndGet BPM:" + error);
            }
        });
        Button.margin(5);
        Button.pop();
        Button.createWithLabel('Test SetAndGet Grouping');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let id3tag: ID3v22Tag = new ID3v22Tag();
                let grouping = "GROUPING";
                id3tag.setGrouping(grouping);
                let bytes = id3tag.toBytes();
                let newId3tag: ID3v22Tag = new ID3v22Tag(new Int8Array(bytes));
                console.log("mp3agiclog Id3v2Tag getGrouping: " + newId3tag.getGrouping());
            }
            catch (error) {
                console.error("mp3agiclog Test SetAndGet Grouping:" + error);
            }
        });
        Button.margin(5);
        Button.pop();
        Button.createWithLabel('Test SetAndGet ItunesComment');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let id3tag: ID3v22Tag = new ID3v22Tag();
                let comment = "COMMENT";
                id3tag.setItunesComment(comment);
                let bytes = id3tag.toBytes();
                let newId3tag: ID3v22Tag = new ID3v22Tag(new Int8Array(bytes));
                console.log("mp3agiclog Id3v2Tag getItunesComment: " + newId3tag.getItunesComment());
            }
            catch (error) {
                console.error("mp3agiclog Test SetAndGet ItunesComment:" + error);
            }
        });
        Button.margin(5);
        Button.pop();
        Button.createWithLabel('Test SetAndGet Lyrics and AlbumArtist');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let id3tag: ID3v22Tag = new ID3v22Tag();
                let lyrics = "La-la-la";
                id3tag.setLyrics(lyrics);
                let bytes = id3tag.toBytes();
                let newId3tag: ID3v22Tag = new ID3v22Tag(new Int8Array(bytes));
                console.log("mp3agiclog Id3v2Tag getLyrics: " + newId3tag.getLyrics());
                let id3tag1: ID3v22Tag = new ID3v22Tag();
                let albumArtist = "ALBUMARTIST";
                id3tag1.setAlbumArtist(albumArtist);
                let bytes1 = id3tag1.toBytes();
                let newId3tag1: ID3v22Tag = new ID3v22Tag(new Int8Array(bytes1));
                console.log("mp3agiclog Id3v2Tag getAlbumArtist: " + newId3tag1.getAlbumArtist());
            }
            catch (error) {
                console.error("mp3agiclog Test SetAndGet Lyrics and AlbumArtist:" + error);
            }
        });
        Button.margin(5);
        Button.pop();
        Button.createWithLabel('Test SetAndGet Publisher');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let id3tag: ID3v22Tag = new ID3v22Tag();
                let publisher = "PUBLISHER";
                id3tag.setPublisher(publisher);
                let bytes = id3tag.toBytes();
                let newId3tag: ID3v22Tag = new ID3v22Tag(new Int8Array(bytes));
                console.log("mp3agiclog Id3v2Tag getPublisher: " + newId3tag.getPublisher());
            }
            catch (error) {
                console.error("mp3agiclog Test SetAndGet Publisher:" + error);
            }
        });
        Button.margin(5);
        Button.pop();
        Button.createWithLabel('Test SetAndGet Key and Date');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let id3tag: ID3v22Tag = new ID3v22Tag();
                let key = "KEY";
                id3tag.setKey(key);
                let bytes = id3tag.toBytes();
                let newId3tag: ID3v22Tag = new ID3v22Tag(new Int8Array(bytes));
                console.log("mp3agiclog Id3v2Tag getKey: " + newId3tag.getKey());
                let id3tag1: ID3v22Tag = new ID3v22Tag();
                let date = "DATE";
                id3tag1.setDate(date);
                let bytes1 = id3tag1.toBytes();
                let newId3tag1: ID3v22Tag = new ID3v22Tag(new Int8Array(bytes1));
                console.log("mp3agiclog Id3v2Tag getDate: " + newId3tag1.getDate());
            }
            catch (error) {
                console.error("mp3agiclog Test SetAndGet Key and Date:" + error);
            }
        });
        Button.margin(5);
        Button.pop();
        Button.createWithLabel('Test SetAndGet Compilation PartOfSet');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let id3tag: ID3v22Tag = new ID3v22Tag();
                let compilation = true;
                id3tag.setCompilation(compilation);
                let bytes = id3tag.toBytes();
                let newId3tag: ID3v22Tag = new ID3v22Tag(new Int8Array(bytes));
                console.log("mp3agiclog Id3v2Tag isCompilation: " + newId3tag.isCompilation());
                let id3tag1: ID3v22Tag = new ID3v22Tag();
                let partOfSet = "PARTOFSET";
                id3tag1.setPartOfSet(partOfSet);
                let bytes1 = id3tag1.toBytes();
                let newId3tag1: ID3v22Tag = new ID3v22Tag(new Int8Array(bytes1));
                console.log("mp3agiclog Id3v2Tag getPartOfSet: " + newId3tag1.getPartOfSet());
            }
            catch (error) {
                console.error("mp3agiclog Test SetAndGet Compilation PartOfSet:" + error);
            }
        });
        Button.margin(5);
        Button.pop();
        Button.createWithLabel('Test shouldCorrectlyUnpackHeader');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let data = [87, 88, 88, 88, 0, 0, 0, 33, 0, 0, 0, 0, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 65, 66, 67, 68, 69];
                let frame: ID3v2Frame = ID3v2Frame.create(new Int8Array(data), 0);
                console.log("mp3agiclog frame.hasDataLengthIndicator(): " + frame.hasDataLengthIndicator());
                console.log("mp3agiclog frame.hasCompression(): " + frame.hasCompression());
                console.log("mp3agiclog frame.hasEncryption(): " + frame.hasEncryption());
                console.log("mp3agiclog frame.hasGroup(): " + frame.hasGroup());
                console.log("mp3agiclog frame.hasPreserveFile(): " + frame.hasPreserveFile());
                console.log("mp3agiclog frame.hasPreserveTag(): " + frame.hasPreserveTag());
                console.log("mp3agiclog frame.isReadOnly(): " + frame.isReadOnly());
                console.log("mp3agiclog frame.hasUnsynchronisation(): " + frame.hasUnsynchronisation());
            }
            catch (error) {
                console.error("mp3agiclog Test shouldCorrectlyUnpackHeader:" + error);
            }
        });
        Button.margin(5);
        Button.pop();
        Flex.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
