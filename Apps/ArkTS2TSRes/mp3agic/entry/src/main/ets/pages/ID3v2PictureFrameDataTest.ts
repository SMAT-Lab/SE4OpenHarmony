interface Index_Params {
    LONG_T_FRAME?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ID3v2PictureFrameDataTest_" + ++__generate__Id;
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
import { ID3v2 } from '@ohos/mp3agic/';
import { BufferTools } from '@ohos/mp3agic/';
import { Mp3File } from '@ohos/mp3agic/';
import { ID3v23Tag } from '@ohos/mp3agic/';
import { EncodedText } from '@ohos/mp3agic/';
import { ID3v2PictureFrameData } from '@ohos/mp3agic/';
import { ID3v2ObseleteFrame } from '@ohos/mp3agic/';
import { ID3v2ObseletePictureFrameData } from '@ohos/mp3agic/';
import fileio from '@ohos.fileio';
import { GlobalContext } from '@ohos/mp3agic/';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.LONG_T_FRAME = "TP10110Metamorphosis A a very long album B a very long album C a very long album D a very long album E a very long album F a very long album G a very long album H a very long album I a very long album J a very long album K a very long album L a very long album M0";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.LONG_T_FRAME !== undefined) {
            this.LONG_T_FRAME = params.LONG_T_FRAME;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private LONG_T_FRAME: string;
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Button.createWithLabel('Test obsolete');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let mp3file = new Mp3File(GlobalContext.getContext().getValue("path").toString() + '/obsolete.mp3');
                console.log('mp3agiclog log Id3v2Tag mp3file.hasId3v2Tag():' + mp3file.hasId3v2Tag());
                // Dayu board takes a long time
                if (mp3file.hasId3v2Tag()) {
                    let id3v2Tag: ID3v2 | any = mp3file.getId3v2Tag();
                    console.log("mp3agiclog obsolete TCM:" + (id3v2Tag.getFrameSets().get("TCM")).getFrames().length());
                    console.log("mp3agiclog obsolete COM:" + (id3v2Tag.getFrameSets().get("COM")).getFrames().length());
                    console.log("mp3agiclog obsolete TP1:" + (id3v2Tag.getFrameSets().get("TP1")).getFrames().length());
                    console.log("mp3agiclog obsolete TAL:" + (id3v2Tag.getFrameSets().get("TAL")).getFrames().length());
                    console.log("mp3agiclog obsolete TRK:" + (id3v2Tag.getFrameSets().get("TRK")).getFrames().length());
                    console.log("mp3agiclog obsolete TPA:" + (id3v2Tag.getFrameSets().get("TPA")).getFrames().length());
                    console.log("mp3agiclog obsolete TYE:" + (id3v2Tag.getFrameSets().get("TYE")).getFrames().length());
                    console.log("mp3agiclog obsolete PIC:" + (id3v2Tag.getFrameSets().get("PIC")).getFrames().length());
                    console.log("mp3agiclog obsolete TCO:" + (id3v2Tag.getFrameSets().get("TCO")).getFrames().length());
                    console.log("mp3agiclog obsolete TT2:" + (id3v2Tag.getFrameSets().get("TT2")).getFrames().length());
                }
            }
            catch (error) {
                console.error("mp3agiclog read obsolete.mp3:" + error);
            }
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('Test ID3v2ObseleteFrameTest');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let bytes = BufferTools.stringToByteBuffer(this.LONG_T_FRAME, 0, this.LONG_T_FRAME.length);
                BufferTools.replaceNumbersWithBytes(bytes, 3);
                let frame: ID3v2ObseleteFrame = ID3v2ObseleteFrame.create(new Int8Array(bytes), 0);
                // result 263
                console.log("mp3agiclog frame.getLength():" + frame.getLength());
                // result TP1
                console.log("mp3agiclog frame.getId():" + frame.getId());
                // result 0,77,101,116,97,109,111,114,112,104,111,115,105,115,32,65,32,97,32,118,101,114,121,32,108,111,110,103,32,97,108,98,117,109,32,66,32,97,32,118,101,114,121,32,108,111,110,103,32,97,108,98,117,109,32,67,32,97,32,118,101,114,121,32,108,111,110,103,32,97,108,98,117,109,32,68,32,97,32,118,101,114,121,32,108,111,110,103,32,97,108,98,117,109,32,69,32,97,32,118,101,114,121,32,108,111,110,103,32,97,108,98,117,109,32,70,32,97,32,118,101,114,121,32,108,111,110,103,32,97,108,98,117,109,32,71,32,97,32,118,101,114,121,32,108,111,110,103,32,97,108,98,117,109,32,72,32,97,32,118,101,114,121,32,108,111,110,103,32,97,108,98,117,109,32,73,32,97,32,118,101,114,121,32,108,111,110,103,32,97,108,98,117,109,32,74,32,97,32,118,101,114,121,32,108,111,110,103,32,97,108,98,117,109,32,75,32,97,32,118,101,114,121,32,108,111,110,103,32,97,108,98,117,109,32,76,32,97,32,118,101,114,121,32,108,111,110,103,32,97,108,98,117,109,32,77,0,
                console.log("mp3agiclog  frame.getData():" + frame.getData());
            }
            catch (error) {
                console.error('mp3agiclog test ID3v2ObseleteFrameTest error:' + error);
            }
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('Test ID3v2PictureFrameData');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let frameData: ID3v2PictureFrameData = new ID3v2PictureFrameData(false, undefined);
                frameData.setMimeType("Mime Type 1");
                frameData.setPictureType(4);
                let description: EncodedText = new EncodedText({ str: "Hello there" });
                frameData.setDescription(description);
                frameData.setImageData([1, 2]);
                console.log("mp3agiclog Mime Type 1:" + frameData.getMimeType());
                console.log("mp3agiclog getPictureType:" + frameData.getPictureType());
                console.log("mp3agiclog getDescription:" + frameData.getDescription());
                console.log("mp3agiclog getImageData:" + frameData.getImageData());
                let data = [0, 109, 105, 109, 101, 47, 116, 121, 112, 101, 0, 3, 68, 69, 83, 67, 82, 73, 80, 84, 73, 79, 78, 0, 1, 2, 3, -1, 0, -5, -1, 0, -5, -1, 0, 0, 4, 5];
                let frame: ID3v2PictureFrameData = new ID3v2PictureFrameData(true, data);
                // result 1,2,3,-1,-5,-1,-5,-1,0,4,5
                console.log("mp3agiclog getImageData:" + frame.getImageData());
                // [0,109,105,109,101,47,116,121,112,101,0,3,68,69,83,67,82,73,80,84,73,79,78,0,1,2,3,-1,0,-5,-1,0,-5,-1,0,0,4,5]
                console.log("mp3agiclog getImageData:" + frame.toBytes());
            }
            catch (error) {
                console.error('mp3agiclog test ID3v2PictureFrameData error:' + error);
            }
        });
        Button.margin(10);
        Button.pop();
        // test ID3v2ObseletePictureFrameData
        Button.createWithLabel('Test ID3v2ObseletePictureFrameData');
        // test ID3v2ObseletePictureFrameData
        Button.backgroundColor(0x2788D9);
        // test ID3v2ObseletePictureFrameData
        Button.onClick((event: ClickEvent) => {
            try {
                // let bytes : number [] = [0x00, 'P', 'N', 'G', 0x01, 'D', 'E', 'S', 'C', 'R', 'I', 'P', 'T', 'I', 'O', 'N', 0x00, 1, 2, 3, 4, 5];
                let bytes: number[] = [0, 80, 78, 71, 1, 68, 69, 83, 67, 82, 73, 80, 84, 73, 79, 78, 0, 1, 2, 3, 4, 5];
                let frameData: ID3v2ObseletePictureFrameData = new ID3v2ObseletePictureFrameData(false, bytes);
                console.log('mp3agiclog  frameData.getMimeType():' + frameData.getMimeType());
                console.log('mp3agiclog  frameData.getPictureType():' + frameData.getPictureType());
                console.log('mp3agiclog  frameData.getDescription():' + frameData.getDescription());
                console.log('mp3agiclog  frameData.getImageData():' + frameData.getImageData());
            }
            catch (error) {
                console.error('mp3agiclog test ID3v2ObseletePictureFrameData error:' + error);
            }
        });
        // test ID3v2ObseletePictureFrameData
        Button.margin(5);
        // test ID3v2ObseletePictureFrameData
        Button.pop();
        Button.createWithLabel('test 23TagToBytesAndBackToEquivalentTag');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let id3tag: ID3v23Tag = new ID3v23Tag();
                id3tag.setTrack("1");
                id3tag.setArtist("ARTIST");
                id3tag.setTitle("TITLE");
                id3tag.setAlbum("ALBUM");
                id3tag.setYear("1954");
                id3tag.setGenre(0x0d);
                id3tag.setComment("COMMENT");
                id3tag.setComposer("COMPOSER");
                id3tag.setOriginalArtist("ORIGINALARTIST");
                id3tag.setCopyright("COPYRIGHT");
                id3tag.setUrl("URL");
                id3tag.setCommercialUrl("COMMERCIALURL");
                id3tag.setCopyrightUrl("COPYRIGHTURL");
                id3tag.setArtistUrl("OFFICIALARTISTURL");
                id3tag.setAudiofileUrl("OFFICIALAUDIOFILEURL");
                id3tag.setAudioSourceUrl("OFFICIALAUDIOSOURCEURL");
                id3tag.setRadiostationUrl("INTERNETRADIOSTATIONURL");
                id3tag.setPaymentUrl("PAYMENTURL");
                id3tag.setPublisherUrl("PUBLISHERURL");
                id3tag.setEncoder("ENCODER");
                let bufFrame = new ArrayBuffer(1885);
                let srcFd = fileio.openSync(GlobalContext.getContext().getValue("path").toString() + '/image.png', 0o2);
                let bytesRead = fileio.readSync(srcFd, bufFrame);
                let albumImage = new Int8Array(bufFrame);
                console.log('mp3agiclog  albumImage:' + albumImage.byteLength);
                id3tag.setAlbumImage(Array.from(albumImage), "image/png", 0, null);
                let data: number[] = id3tag.toBytes();
                let id3tagCopy: ID3v23Tag = new ID3v23Tag(new Int8Array(data));
                console.log('mp3agiclog  getTrack:' + id3tagCopy.getTrack());
                console.log('mp3agiclog  getArtist:' + id3tagCopy.getArtist());
                console.log('mp3agiclog  getTitle:' + id3tagCopy.getTitle());
                console.log('mp3agiclog  getAlbum:' + id3tagCopy.getAlbum());
                console.log('mp3agiclog  getYear:' + id3tagCopy.getYear());
                console.log('mp3agiclog  getGenre:' + id3tagCopy.getGenre());
                console.log('mp3agiclog  getComment:' + id3tagCopy.getComment());
                console.log('mp3agiclog  getComposer:' + id3tagCopy.getComposer());
                console.log('mp3agiclog  getOriginalArtist:' + id3tagCopy.getOriginalArtist());
                console.log('mp3agiclog  getCopyright:' + id3tagCopy.getCopyright());
                console.log('mp3agiclog  getUrl:' + id3tagCopy.getUrl());
                console.log('mp3agiclog  getCommercialUrl:' + id3tagCopy.getCommercialUrl());
                console.log('mp3agiclog  getCopyrightUrl:' + id3tagCopy.getCopyrightUrl());
                console.log('mp3agiclog  getArtistUrl:' + id3tagCopy.getArtistUrl());
                console.log('mp3agiclog  getAudiofileUrl:' + id3tagCopy.getAudiofileUrl());
                console.log('mp3agiclog  getAudioSourceUrl:' + id3tagCopy.getAudioSourceUrl());
                console.log('mp3agiclog  getRadiostationUrl:' + id3tagCopy.getRadiostationUrl());
                console.log('mp3agiclog  getPaymentUrl:' + id3tagCopy.getPaymentUrl());
                console.log('mp3agiclog  getPublisherUrl:' + id3tagCopy.getPublisherUrl());
                console.log('mp3agiclog  getEncoder:' + id3tagCopy.getEncoder());
                let albumImageData: number[] = id3tagCopy.getAlbumImage();
                if (albumImageData != null) {
                    // 1885
                    console.log("mp3agiclog Id3v2Tag Have album image data, length: " + albumImageData.length + " bytes");
                    // "image/png"
                    console.log("mp3agiclog Id3v2Tag album image mime type: " + id3tagCopy.getAlbumImageMimeType());
                }
            }
            catch (error) {
                console.error("mp3agiclog test 23TagToBytesAndBackToEquivalentTag:" + error);
            }
        });
        Button.margin(10);
        Button.pop();
        Flex.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
