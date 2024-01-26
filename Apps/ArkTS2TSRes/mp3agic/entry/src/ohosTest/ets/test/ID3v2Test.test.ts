let __generate__Id: number = 0;
function generateId(): string {
    return "ID3v2Test.test_" + ++__generate__Id;
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
import { describe, it, expect } from '@ohos/hypium';
import { EncodedText, ID3v2ChapterTOCFrameData, ID3v2CommentFrameData, ID3v2ObseleteFrame, ID3v2PictureFrameData, ID3v2PopmFrameData, ID3v2TextFrameData, ID3v2UrlFrameData, ID3v2WWWFrameData } from '@ohos/mp3agic';
export default function ID3v2Test() {
    describe('ID3v2Test', () => {
        it('isRoot01', 0, () => {
            let bytes: number[] = [13, 55, 2, 32, 17];
            let iD3v2ChapterTOCFrameData = new ID3v2ChapterTOCFrameData(true, bytes, true, true);
            iD3v2ChapterTOCFrameData.setRoot(true);
            let isRoot = iD3v2ChapterTOCFrameData.isRoot();
            expect(isRoot).assertTrue();
        });
        it('isRoot02', 0, () => {
            let bytes: number[] = [56, 3, 2, 7, 1];
            let iD3v2ChapterTOCFrameData = new ID3v2ChapterTOCFrameData(false, bytes, false, false);
            iD3v2ChapterTOCFrameData.setRoot(false);
            let isRoot = iD3v2ChapterTOCFrameData.isRoot();
            expect(isRoot).assertFalse();
        });
        it('isRoot03', 0, () => {
            let bytes: number[] = [6, 4, 24, 12, 1];
            let iD3v2ChapterTOCFrameData = new ID3v2ChapterTOCFrameData(true, bytes, false, true);
            iD3v2ChapterTOCFrameData.setRoot(true);
            let isRoot = iD3v2ChapterTOCFrameData.isRoot();
            expect(isRoot).assertTrue();
        });
        it('isRoot04', 0, () => {
            let bytes: number[] = [34, 23, 78, 70, 21];
            let iD3v2ChapterTOCFrameData = new ID3v2ChapterTOCFrameData(false, bytes, true, false);
            iD3v2ChapterTOCFrameData.setRoot(false);
            let isRoot = iD3v2ChapterTOCFrameData.isRoot();
            expect(isRoot).assertFalse();
        });
        it('isOrdered01', 0, () => {
            let bytes: number[] = [66, 4, 2, 7, 0];
            let iD3v2ChapterTOCFrameData = new ID3v2ChapterTOCFrameData(true, bytes, true, true);
            iD3v2ChapterTOCFrameData.setOrdered(true);
            let isOrdered = iD3v2ChapterTOCFrameData.isOrdered();
            expect(isOrdered).assertTrue();
        });
        it('isOrdered02', 0, () => {
            let bytes: number[] = [23, 32, 21, 17, 11];
            let iD3v2ChapterTOCFrameData = new ID3v2ChapterTOCFrameData(false, bytes, false, false);
            iD3v2ChapterTOCFrameData.setOrdered(false);
            let isOrdered = iD3v2ChapterTOCFrameData.isOrdered();
            expect(isOrdered).assertFalse();
        });
        it('getChildren01', 0, () => {
            let bytes: number[] = [9, 14, 7, 17, 83];
            let children: Array<any> = ['12', 3, 67, 8, 9, 'string'];
            let iD3v2ChapterTOCFrameData = new ID3v2ChapterTOCFrameData(true, bytes, true, true);
            iD3v2ChapterTOCFrameData.setChildren(children);
            let getChildren: any = iD3v2ChapterTOCFrameData.getChildren();
            expect(getChildren[0]).assertEqual('12');
        });
        it('getChildren02', 0, () => {
            let bytes: number[] = [29, 124, 13, 2, 7];
            let children: Array<any> = ['note', 3, 34, 'string'];
            let iD3v2ChapterTOCFrameData = new ID3v2ChapterTOCFrameData(false, bytes, false, false);
            iD3v2ChapterTOCFrameData.setChildren(children);
            let getChildren: any = iD3v2ChapterTOCFrameData.getChildren();
            expect(getChildren[3]).assertEqual('string');
        });
        it('getChildren03', 0, () => {
            let bytes: number[] = [5, 46, 47, 78, 9];
            let children: Array<any> = ['467', 6, 67, 6, 67, 'comment'];
            let iD3v2ChapterTOCFrameData = new ID3v2ChapterTOCFrameData(true, bytes, false, true);
            iD3v2ChapterTOCFrameData.setChildren(children);
            let getChildren: any = iD3v2ChapterTOCFrameData.getChildren();
            expect(getChildren[0]).assertEqual('467');
        });
        it('getChildren04', 0, () => {
            let children: Array<any> = ['time', 3, 1, 23, 'comment'];
            let iD3v2ChapterTOCFrameData = new ID3v2ChapterTOCFrameData(false, [], true, false);
            iD3v2ChapterTOCFrameData.setChildren(children);
            let getChildren: any = iD3v2ChapterTOCFrameData.getChildren();
            expect(getChildren[3]).assertEqual(23);
        });
        it('getText01', 0, () => {
            let text: EncodedText | any;
            let iD3v2TextFrameData = new ID3v2TextFrameData(true, text);
            iD3v2TextFrameData.setText(text);
            let getText = iD3v2TextFrameData.getText();
            expect(getText).assertUndefined();
        });
        it('getText02', 0, () => {
            let text: EncodedText | any;
            let iD3v2TextFrameData = new ID3v2TextFrameData(false, text);
            iD3v2TextFrameData.setText(text);
            let getText = iD3v2TextFrameData.getText();
            expect(getText).assertUndefined();
        });
        it('getLanguage01', 0, () => {
            let text: EncodedText | any;
            let iD3v2CommentFrameData = new ID3v2CommentFrameData(true, 'DESCRIPTION', text, text);
            iD3v2CommentFrameData.setLanguage('DESCRIPTION');
            let getLanguage = iD3v2CommentFrameData.getLanguage();
            expect(getLanguage).assertEqual('DESCRIPTION');
        });
        it('getLanguage02', 0, () => {
            let text: EncodedText | any;
            let iD3v2CommentFrameData = new ID3v2CommentFrameData(false, 'ENCODER', text, text);
            iD3v2CommentFrameData.setLanguage('ENCODER');
            let getLanguage = iD3v2CommentFrameData.getLanguage();
            expect(getLanguage).assertEqual('ENCODER');
        });
        it('getLanguage03', 0, () => {
            let text: EncodedText | any;
            let iD3v2CommentFrameData = new ID3v2CommentFrameData(true, 'TIME', text, text);
            iD3v2CommentFrameData.setLanguage('TIME');
            let getLanguage = iD3v2CommentFrameData.getLanguage();
            expect(getLanguage).assertEqual('TIME');
        });
        it('getLanguage04', 0, () => {
            let text: EncodedText | any;
            let iD3v2CommentFrameData = new ID3v2CommentFrameData(false, 'ENCODER', text, undefined);
            iD3v2CommentFrameData.setLanguage('');
            let getLanguage = iD3v2CommentFrameData.getLanguage();
            expect(getLanguage).assertEqual('');
        });
        it('getComment01', 0, () => {
            let text: EncodedText | any;
            let iD3v2CommentFrameData = new ID3v2CommentFrameData(true, 'DESCRIPTION', text, text);
            iD3v2CommentFrameData.setComment(text);
            let getComment = iD3v2CommentFrameData.getComment();
            expect(getComment).assertUndefined();
        });
        it('getComment02', 0, () => {
            let text: EncodedText | any;
            let iD3v2CommentFrameData = new ID3v2CommentFrameData(false, '', text, text);
            iD3v2CommentFrameData.setComment(text);
            let getComment = iD3v2CommentFrameData.getComment();
            expect(getComment).assertUndefined();
        });
        it('getComment03', 0, () => {
            let text: EncodedText | any;
            let iD3v2CommentFrameData = new ID3v2CommentFrameData(true, 'WORLD', text, text);
            let getComment = iD3v2CommentFrameData.getComment();
            expect(getComment).assertUndefined();
        });
        it('getComment04', 0, () => {
            let text: EncodedText | any;
            let iD3v2CommentFrameData = new ID3v2CommentFrameData(false, 'COMMEND', text, text);
            let getComment = iD3v2CommentFrameData.getComment();
            expect(getComment).assertUndefined();
        });
        it('getDescription01', 0, () => {
            let text: EncodedText | any;
            let iD3v2CommentFrameData = new ID3v2CommentFrameData(true, 'COPYRIGHT2345678', text, text);
            iD3v2CommentFrameData.setDescription(text);
            let getDescription = iD3v2CommentFrameData.getDescription();
            expect(getDescription).assertUndefined();
        });
        it('getDescription02', 0, () => {
            let text: EncodedText | any;
            let iD3v2CommentFrameData = new ID3v2CommentFrameData(false, '', text, text);
            iD3v2CommentFrameData.setDescription(text);
            let getDescription = iD3v2CommentFrameData.getDescription();
            expect(getDescription).assertUndefined();
        });
        it('getDescription03', 0, () => {
            let text: EncodedText | any;
            let iD3v2CommentFrameData = new ID3v2CommentFrameData(true);
            iD3v2CommentFrameData.setDescription(text);
            let getDescription = iD3v2CommentFrameData.getDescription();
            expect(getDescription).assertUndefined();
        });
        it('getDescription04', 0, () => {
            let text: EncodedText | any;
            let iD3v2CommentFrameData = new ID3v2CommentFrameData(false);
            iD3v2CommentFrameData.setDescription(text);
            let getDescription = iD3v2CommentFrameData.getDescription();
            expect(getDescription).assertUndefined();
        });
        it('ID3v2UrlFrameData_getDescription01', 0, () => {
            let text: EncodedText | any;
            let iD3v2UrlFrameData = new ID3v2UrlFrameData(true, text, 'DESCRIPTION');
            iD3v2UrlFrameData.setDescription(text);
            let getDescription = iD3v2UrlFrameData.getDescription();
            expect(getDescription).assertUndefined();
        });
        it('ID3v2UrlFrameData_getDescription02', 0, () => {
            let text: EncodedText | any;
            let iD3v2UrlFrameData = new ID3v2UrlFrameData(false, text, '');
            iD3v2UrlFrameData.setDescription(text);
            let getDescription = iD3v2UrlFrameData.getDescription();
            expect(getDescription).assertUndefined();
        });
        it('ID3v2UrlFrameData_getDescription03', 0, () => {
            let iD3v2UrlFrameData = new ID3v2UrlFrameData(true);
            let getDescription = iD3v2UrlFrameData.getDescription();
            expect(getDescription).assertUndefined();
        });
        it('ID3v2UrlFrameData_getDescription04', 0, () => {
            let iD3v2UrlFrameData = new ID3v2UrlFrameData(false);
            let getDescription = iD3v2UrlFrameData.getDescription();
            expect(getDescription).assertUndefined();
        });
        it('ID3v2UrlFrameData_getUrl01', 0, () => {
            let text: EncodedText | any;
            let iD3v2UrlFrameData = new ID3v2UrlFrameData(true, text, 'DESCRIPTION');
            iD3v2UrlFrameData.setUrl('My URL');
            let getUrl = iD3v2UrlFrameData.getUrl();
            expect(getUrl).assertEqual('My URL');
        });
        it('ID3v2UrlFrameData_getUrl02', 0, () => {
            let text: EncodedText | any;
            let iD3v2UrlFrameData = new ID3v2UrlFrameData(false, text, '');
            iD3v2UrlFrameData.setUrl('');
            let getUrl = iD3v2UrlFrameData.getUrl();
            expect(getUrl).assertEqual('');
        });
        it('ID3v2UrlFrameData_getUrl03', 0, () => {
            let iD3v2UrlFrameData = new ID3v2UrlFrameData(true);
            iD3v2UrlFrameData.setUrl('my language');
            let getUrl = iD3v2UrlFrameData.getUrl();
            expect(getUrl).assertEqual('my language');
        });
        it('ID3v2UrlFrameData_getUrl04', 0, () => {
            let iD3v2UrlFrameData = new ID3v2UrlFrameData(false);
            iD3v2UrlFrameData.setUrl('WORLD');
            let getUrl = iD3v2UrlFrameData.getUrl();
            expect(getUrl).assertEqual('WORLD');
        });
        it('ID3v2WWWFrameData_getUrl01', 0, () => {
            let iD3v2WWWFrameData = new ID3v2WWWFrameData(true, '/data/storage/el2/base/haps/entry/files/');
            iD3v2WWWFrameData.setUrl('/data/storage/el2/base/haps/entry/files/');
            let getUrl = iD3v2WWWFrameData.getUrl();
            expect(getUrl).assertEqual('/data/storage/el2/base/haps/entry/files/');
        });
        it('ID3v2WWWFrameData_getUrl02', 0, () => {
            let iD3v2WWWFrameData = new ID3v2WWWFrameData(false, '');
            iD3v2WWWFrameData.setUrl('');
            let getUrl = iD3v2WWWFrameData.getUrl();
            expect(getUrl).assertEqual('');
        });
        it('ID3v2WWWFrameData_getUrl03', 0, () => {
            let iD3v2WWWFrameData = new ID3v2WWWFrameData(true);
            iD3v2WWWFrameData.setUrl('mp3agic/src/main/ets/components/mp3agic/JMap.ts');
            let getUrl = iD3v2WWWFrameData.getUrl();
            expect(getUrl).assertEqual('mp3agic/src/main/ets/components/mp3agic/JMap.ts');
        });
        it('ID3v2WWWFrameData_getUrl04', 0, () => {
            let iD3v2WWWFrameData = new ID3v2WWWFrameData(false, 'mp3agic/src/main/ets/components/mp3agic/System.ts');
            iD3v2WWWFrameData.setUrl('mp3agic/Index.ets');
            let getUrl = iD3v2WWWFrameData.getUrl();
            expect(getUrl).assertEqual('mp3agic/Index.ets');
        });
        it('getMimeType01', 0, () => {
            let description: EncodedText | any;
            let types: number[] = [1, 2, 56, 7, 4, 32, 7, 5, 1];
            let iD3v2PictureFrameData = new ID3v2PictureFrameData(true, types, 'Mime Type 1', 5, description);
            iD3v2PictureFrameData.setMimeType('Mime Type 1');
            let getMimeType = iD3v2PictureFrameData.getMimeType();
            expect(getMimeType).assertEqual('Mime Type 1');
        });
        it('getMimeType02', 0, () => {
            let description: EncodedText | any;
            let types: number[] = [0, 12, 4, 0, 7, 50, 10];
            let iD3v2PictureFrameData = new ID3v2PictureFrameData(false, types, 'Mime Type 1', 2, description);
            iD3v2PictureFrameData.setMimeType('');
            let getMimeType = iD3v2PictureFrameData.getMimeType();
            expect(getMimeType).assertEqual('');
        });
        it('getMimeType03', 0, () => {
            let description: EncodedText | any;
            let iD3v2PictureFrameData = new ID3v2PictureFrameData(true, [], 'Mime Type', 89, description);
            iD3v2PictureFrameData.setMimeType('Mime');
            let getMimeType = iD3v2PictureFrameData.getMimeType();
            expect(getMimeType).assertEqual('Mime');
        });
        it('getMimeType04', 0, () => {
            let description: EncodedText | any;
            let types: number[] = [5, 234, 41, 20, 7, 2, 15];
            let iD3v2PictureFrameData = new ID3v2PictureFrameData(false, types, 'COMMEND', 1, description);
            iD3v2PictureFrameData.setMimeType('COMMEND');
            let getMimeType = iD3v2PictureFrameData.getMimeType();
            expect(getMimeType).assertEqual('COMMEND');
        });
        it('getPictureType01', 0, () => {
            let description: EncodedText | any;
            let types: number[] = [1, 2, 67, 5, 1];
            let iD3v2PictureFrameData = new ID3v2PictureFrameData(true, types, 'Mime Type 1', 5, description);
            iD3v2PictureFrameData.setPictureType(12);
            let getPictureType = iD3v2PictureFrameData.getPictureType();
            expect(getPictureType).assertEqual(12);
        });
        it('getPictureType02', 0, () => {
            let description: EncodedText | any;
            let types: number[] = [11, 2, 9, 7, 5, 18];
            let iD3v2PictureFrameData = new ID3v2PictureFrameData(false, types, 'Mime Type 1', 1, description);
            iD3v2PictureFrameData.setPictureType(0);
            let getPictureType = iD3v2PictureFrameData.getPictureType();
            expect(getPictureType).assertEqual(0);
        });
        it('getPictureType03', 0, () => {
            let description: EncodedText | any;
            let iD3v2PictureFrameData = new ID3v2PictureFrameData(true, [], 'TIME', 23, description);
            iD3v2PictureFrameData.setPictureType(8);
            let getPictureType = iD3v2PictureFrameData.getPictureType();
            expect(getPictureType).assertEqual(8);
        });
        it('getPictureType04', 0, () => {
            let description: EncodedText | any;
            let iD3v2PictureFrameData = new ID3v2PictureFrameData(false, [], 'TIME', 156, description);
            iD3v2PictureFrameData.setPictureType(65);
            let getPictureType = iD3v2PictureFrameData.getPictureType();
            expect(getPictureType).assertEqual(65);
        });
        it('ID3v2PictureFrameData_getDescription01', 0, () => {
            let description: EncodedText | any;
            let types: number[] = [1, 7, 5, 71, 0, 34];
            let iD3v2PictureFrameData = new ID3v2PictureFrameData(true, types, 'Mime Type 1', 1, description);
            iD3v2PictureFrameData.setDescription(description);
            let getDescription = iD3v2PictureFrameData.getDescription();
            expect(getDescription).assertUndefined();
        });
        it('ID3v2PictureFrameData_getDescription02', 0, () => {
            let description: EncodedText | any;
            let types: number[] = [12, 17, 5, 1, 34, 5, 75, 2, 6, 78, 8];
            let iD3v2PictureFrameData = new ID3v2PictureFrameData(false, types, 'Mime Type 1', 56, description);
            iD3v2PictureFrameData.setDescription(description);
            let getDescription = iD3v2PictureFrameData.getDescription();
            expect(getDescription).assertUndefined();
        });
        it('ID3v2PictureFrameData_getDescription03', 0, () => {
            let description: EncodedText | any;
            let iD3v2PictureFrameData = new ID3v2PictureFrameData(true, [], 'TIME', 34, description);
            iD3v2PictureFrameData.setDescription(description);
            let getDescription = iD3v2PictureFrameData.getDescription();
            expect(getDescription).assertUndefined();
        });
        it('ID3v2PictureFrameData_getDescription04', 0, () => {
            let description: EncodedText | any;
            let iD3v2PictureFrameData = new ID3v2PictureFrameData(false, [], 'TIME', 9, description);
            iD3v2PictureFrameData.setDescription(description);
            let getDescription = iD3v2PictureFrameData.getDescription();
            expect(getDescription).assertUndefined();
        });
        it('getImageData01', 0, () => {
            let description: EncodedText | any;
            let types: number[] = [11, 17, 5, 73, 7, 8, 17, 37];
            let iD3v2PictureFrameData = new ID3v2PictureFrameData(true, types, 'Mime Type 1', 451, description);
            iD3v2PictureFrameData.setImageData([1, 4, 5, 7]);
            let getImageData = iD3v2PictureFrameData.getImageData();
            expect(getImageData[3]).assertEqual(7);
        });
        it('getImageData02', 0, () => {
            let description: EncodedText | any;
            let types: number[] | any = [12, , 8];
            let iD3v2PictureFrameData = new ID3v2PictureFrameData(false, types, 'Mime Type 1', 96, description);
            iD3v2PictureFrameData.setImageData([98, 4, 54, 6, 8, 0]);
            let getImageData = iD3v2PictureFrameData.getImageData();
            expect(getImageData[0]).assertEqual(98);
        });
        it('getImageData03', 0, () => {
            let description: EncodedText | any;
            let iD3v2PictureFrameData = new ID3v2PictureFrameData(true, [], 'COMMEND', 32, description);
            iD3v2PictureFrameData.setImageData([]);
            let getImageData = iD3v2PictureFrameData.getImageData();
            expect(JSON.stringify(getImageData)).assertEqual('[]');
        });
        it('getImageData04', 0, () => {
            let description: EncodedText | any;
            let iD3v2PictureFrameData = new ID3v2PictureFrameData(false, [], 'COMMEND', 38, description);
            iD3v2PictureFrameData.setImageData([7, 47, 7, 32, 2, 34]);
            let getImageData = iD3v2PictureFrameData.getImageData();
            expect(JSON.stringify(getImageData)).assertEqual('[7,47,7,32,2,34]');
        });
        it('getAddress01', 0, () => {
            let types: number[] = [1, 2, 56, 7, 4, 32, 7, 5, 1];
            let path = '/data/storage/el2/base/haps/entry/files/v1andv23tagswithalbumimage.mp3';
            let iD3v2PopmFrameData = new ID3v2PopmFrameData(true, types, 23);
            iD3v2PopmFrameData.setAddress(path);
            let getMimeType = iD3v2PopmFrameData.getAddress();
            expect(getMimeType).assertEqual(path);
        });
        it('getAddress02', 0, () => {
            let types: number[] = [11, 22, 5, 21];
            let iD3v2PopmFrameData = new ID3v2PopmFrameData(false, types, 1);
            iD3v2PopmFrameData.setAddress('');
            let getMimeType = iD3v2PopmFrameData.getAddress();
            expect(getMimeType).assertEqual('');
        });
        it('getAddress03', 0, () => {
            let path = 'mp3agic/src/main/ets/components/mp3agic/ID3v24Tag.ts';
            let iD3v2PopmFrameData = new ID3v2PopmFrameData(true, [], 100);
            iD3v2PopmFrameData.setAddress(path);
            let getMimeType = iD3v2PopmFrameData.getAddress();
            expect(getMimeType).assertEqual(path);
        });
        it('getAddress04', 0, () => {
            let iD3v2PopmFrameData = new ID3v2PopmFrameData(false, [], 451);
            iD3v2PopmFrameData.setAddress('mp3agic/src/main/ets/');
            let getMimeType = iD3v2PopmFrameData.getAddress();
            expect(getMimeType).assertEqual('mp3agic/src/main/ets/');
        });
        it('getRating01', 0, () => {
            let types: number[] = [10, 2, 61, 2, 4];
            let iD3v2PopmFrameData = new ID3v2PopmFrameData(true, types, 2);
            iD3v2PopmFrameData.setRating(16);
            let getRating = iD3v2PopmFrameData.getRating();
            expect(getRating).assertEqual(16);
        });
        it('getRating02', 0, () => {
            let types: number[] = [9, 72, 3, 32, 4, 89, 9, 88, 2];
            let iD3v2PopmFrameData = new ID3v2PopmFrameData(false, types, 92);
            iD3v2PopmFrameData.setRating(0);
            let getRating = iD3v2PopmFrameData.getRating();
            expect(getRating).assertEqual(0);
        });
        it('getRating03', 0, () => {
            let iD3v2PopmFrameData = new ID3v2PopmFrameData(true, [], 90);
            iD3v2PopmFrameData.setRating(66);
            let getRating = iD3v2PopmFrameData.getRating();
            expect(getRating).assertEqual(66);
        });
        it('getRating04', 0, () => {
            let iD3v2PopmFrameData = new ID3v2PopmFrameData(false, [], 85);
            iD3v2PopmFrameData.setRating(46);
            let getRating = iD3v2PopmFrameData.getRating();
            expect(getRating).assertEqual(46);
        });
        it('getLength01', 0, () => {
            let data: Int8Array = new Int8Array([24, 2, 41, 34, 8, 0, 3, 2, 67]);
            let iD3v2ObseleteFrame = new ID3v2ObseleteFrame('23', data);
            let getLength = iD3v2ObseleteFrame.getLength();
            expect(getLength).assertEqual(15);
        });
        it('getLength02', 0, () => {
            let data: Int8Array = new Int8Array([]);
            let iD3v2ObseleteFrame = new ID3v2ObseleteFrame('1', data);
            let getLength = iD3v2ObseleteFrame.getLength();
            expect(getLength).assertEqual(6);
        });
        it('getLength03', 0, () => {
            let data: Int8Array = new Int8Array([30, 43, 23, 4]);
            let iD3v2ObseleteFrame = new ID3v2ObseleteFrame('445', data);
            let getLength = iD3v2ObseleteFrame.getLength();
            expect(getLength).assertEqual(10);
        });
        it('getLength04', 0, () => {
            let data: Int8Array = new Int8Array([9]);
            let iD3v2ObseleteFrame = new ID3v2ObseleteFrame('A', data);
            let getLength = iD3v2ObseleteFrame.getLength();
            expect(getLength).assertEqual(7);
        });
    });
}
