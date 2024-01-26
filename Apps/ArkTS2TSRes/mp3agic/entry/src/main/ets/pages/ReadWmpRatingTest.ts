interface Index_Params {
    TEST_STRING?: string;
    UNICODE_TEST_STRING?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ReadWmpRatingTest_" + ++__generate__Id;
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
import { EncodedText } from '@ohos/mp3agic/';
import { ID3v2 } from '@ohos/mp3agic/';
import ability_featureAbility from '@ohos.ability.featureAbility';
import { GlobalContext } from '@ohos/mp3agic/';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.TEST_STRING = "This is a string!";
        this.UNICODE_TEST_STRING = "\u03B3\u03B5\u03B9\u03AC \u03C3\u03BF\u03C5";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.TEST_STRING !== undefined) {
            this.TEST_STRING = params.TEST_STRING;
        }
        if (params.UNICODE_TEST_STRING !== undefined) {
            this.UNICODE_TEST_STRING = params.UNICODE_TEST_STRING;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private TEST_STRING: string;
    private UNICODE_TEST_STRING: string;
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Button.createWithLabel('Test EncodeAndDecodeISO8859_1 Text');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let encodedText: EncodedText = new EncodedText({
                    textEncoding: EncodedText.TEXT_ENCODING_ISO_8859_1,
                    str: this.TEST_STRING
                });
                // result
                console.log('mp3agiclog encodedText ISO8859_1 getCharacterSet: ' + encodedText.getCharacterSet());
                // result This is a string!
                console.log('mp3agiclog encodedText ISO8859_1 toString: ' + encodedText.toString());
                let encodedText2: EncodedText = new EncodedText({
                    textEncoding: EncodedText.TEXT_ENCODING_ISO_8859_1,
                    value: encodedText.toBytes(false, false)
                });
                // result This is a string!
                console.log('mp3agiclog encodedText2 ISO8859_1 toString: ' + encodedText2.toString());
                let encodedText3: EncodedText = new EncodedText({
                    textEncoding: EncodedText.TEXT_ENCODING_ISO_8859_1,
                    value: encodedText.toBytes(true, false)
                });
                // result This is a string!
                console.log('mp3agiclog encodedText3 ISO8859_1 toString: ' + encodedText3.toString());
                let encodedText4: EncodedText = new EncodedText({
                    textEncoding: EncodedText.TEXT_ENCODING_ISO_8859_1,
                    value: encodedText.toBytes(false, true)
                });
                // result This is a string!
                console.log('mp3agiclog encodedText4 ISO8859_1 toString: ' + encodedText4.toString());
                let encodedText5: EncodedText = new EncodedText({
                    textEncoding: EncodedText.TEXT_ENCODING_ISO_8859_1,
                    value: encodedText.toBytes(true, true)
                });
                // result This is a string!
                console.log('mp3agiclog encodedText5 ISO8859_1 toString: ' + encodedText5.toString());
            }
            catch (error) {
                console.error('mp3agiclog encodedText ISO8859_1 toString: ' + error);
            }
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('Test EncodeAndDecodeUTF8 Text');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let encodedText: EncodedText = new EncodedText({
                    textEncoding: EncodedText.TEXT_ENCODING_UTF_8,
                    str: this.UNICODE_TEST_STRING
                });
                // result
                console.log('mp3agiclog encodedText UTF8 getCharacterSet: ' + encodedText.getCharacterSet());
                // result γειά σου
                console.log('mp3agiclog encodedText UTF8 toString: ' + encodedText.toString());
                let encodedText2: EncodedText = new EncodedText({
                    textEncoding: EncodedText.TEXT_ENCODING_UTF_8,
                    value: encodedText.toBytes(false, false)
                });
                // result γειά σου
                console.log('mp3agiclog encodedText2 UTF8 toString: ' + encodedText2.toString());
                let encodedText3: EncodedText = new EncodedText({
                    textEncoding: EncodedText.TEXT_ENCODING_UTF_8,
                    value: encodedText.toBytes(true, false)
                });
                // result γειά σου
                console.log('mp3agiclog encodedText3 UTF8 toString: ' + encodedText3.toString());
                let encodedText4: EncodedText = new EncodedText({
                    textEncoding: EncodedText.TEXT_ENCODING_UTF_8,
                    value: encodedText.toBytes(false, true)
                });
                // result γειά σου
                console.log('mp3agiclog encodedText4 UTF8 toString: ' + encodedText4.toString());
                let encodedText5: EncodedText = new EncodedText({
                    textEncoding: EncodedText.TEXT_ENCODING_UTF_8,
                    value: encodedText.toBytes(true, true)
                });
                // result γειά σου
                console.log('mp3agiclog encodedText5 UTF8 toString: ' + encodedText5.toString());
            }
            catch (error) {
                console.error('mp3agiclog encodedText UTF8 toString: ' + error);
            }
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('Test EncodeAndDecodeUTF16 Text');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let encodedText: EncodedText = new EncodedText({
                    textEncoding: EncodedText.TEXT_ENCODING_UTF_16,
                    str: this.UNICODE_TEST_STRING
                });
                // result
                console.log('mp3agiclog encodedText TEXT_ENCODING_UTF_16 getCharacterSet: ' + encodedText.getCharacterSet());
                // result γειά σου
                console.log('mp3agiclog encodedText TEXT_ENCODING_UTF_16 toString: ' + encodedText.toString());
                let encodedText2: EncodedText = new EncodedText({
                    textEncoding: EncodedText.TEXT_ENCODING_UTF_16,
                    value: encodedText.toBytes(false, false)
                });
                // result γειά σου
                console.log('mp3agiclog encodedText2 TEXT_ENCODING_UTF_16 toString: ' + encodedText2.toString());
                let encodedText3: EncodedText = new EncodedText({
                    textEncoding: EncodedText.TEXT_ENCODING_UTF_16,
                    value: encodedText.toBytes(true, false)
                });
                // result γειά σου
                console.log('mp3agiclog encodedText3 TEXT_ENCODING_UTF_16 toString: ' + encodedText3.toString());
                let encodedText4: EncodedText = new EncodedText({
                    textEncoding: EncodedText.TEXT_ENCODING_UTF_16,
                    value: encodedText.toBytes(false, true)
                });
                // result γειά σου
                console.log('mp3agiclog encodedText4 TEXT_ENCODING_UTF_16 toString: ' + encodedText4.toString());
                let encodedText5: EncodedText = new EncodedText({
                    textEncoding: EncodedText.TEXT_ENCODING_UTF_16,
                    value: encodedText.toBytes(true, true)
                });
                // result γειά σου
                console.log('mp3agiclog encodedText5 TEXT_ENCODING_UTF_16 toString: ' + encodedText5.toString());
            }
            catch (error) {
                console.error('mp3agiclog encodedText TEXT_ENCODING_UTF_16 toString: ' + error);
            }
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('Test EncodeAndDecodeUTF16BE Text');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let encodedText: EncodedText = new EncodedText({
                    textEncoding: EncodedText.TEXT_ENCODING_UTF_16BE,
                    str: this.UNICODE_TEST_STRING
                });
                // result
                console.log('mp3agiclog encodedText TEXT_ENCODING_UTF_16BE getCharacterSet: ' + encodedText.getCharacterSet());
                // result γειά σου
                console.log('mp3agiclog encodedText TEXT_ENCODING_UTF_16BE toString: ' + encodedText.toString());
                let encodedText2: EncodedText = new EncodedText({
                    textEncoding: EncodedText.TEXT_ENCODING_UTF_16BE,
                    value: encodedText.toBytes(false, false)
                });
                // result γειά σου
                console.log('mp3agiclog encodedText2 TEXT_ENCODING_UTF_16BE toString: ' + encodedText2.toString());
                let encodedText3: EncodedText = new EncodedText({
                    textEncoding: EncodedText.TEXT_ENCODING_UTF_16BE,
                    value: encodedText.toBytes(true, false)
                });
                // result γειά σου
                console.log('mp3agiclog encodedText3 TEXT_ENCODING_UTF_16BE toString: ' + encodedText3.toString());
                let encodedText4: EncodedText = new EncodedText({
                    textEncoding: EncodedText.TEXT_ENCODING_UTF_16BE,
                    value: encodedText.toBytes(false, true)
                });
                // result γειά σου
                console.log('mp3agiclog encodedText4 TEXT_ENCODING_UTF_16BE toString: ' + encodedText4.toString());
                let encodedText5: EncodedText = new EncodedText({
                    textEncoding: EncodedText.TEXT_ENCODING_UTF_16BE,
                    value: encodedText.toBytes(true, true)
                });
                // result γειά σου
                console.log('mp3agiclog encodedText5 TEXT_ENCODING_UTF_16BE toString: ' + encodedText5.toString());
            }
            catch (error) {
                console.error('mp3agiclog encodedText TEXT_ENCODING_UTF_16BE toString: ' + error);
            }
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('Test UTF16BEEncodingFromBytesWithBOM');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let bytes = [-2, -1, 3, -77, 3, -75, 3, -71, 3, -84, 0, 32, 3, -61, 3, -65, 3, -59];
                let encodedText: EncodedText = new EncodedText({
                    textEncoding: EncodedText.TEXT_ENCODING_UTF_16BE,
                    value: bytes
                });
                // result 2
                console.log('mp3agiclog encodedText.getTextEncoding(): ' + encodedText.getTextEncoding());
            }
            catch (error) {
                console.error('mp3agiclog encodedText UTF16BEEncodingFromBytesWithBOM: ' + error);
            }
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('Test FromOneEncodingToAnother');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let bytes = [67, 97, 102, -61, -87, 32, 80, 97, 114, 97, 100, 105, 115, 111];
                let encodedText: EncodedText = new EncodedText({
                    textEncoding: EncodedText.TEXT_ENCODING_UTF_8,
                    value: bytes
                });
                encodedText.setTextEncoding(EncodedText.TEXT_ENCODING_ISO_8859_1, true);
                console.log('mp3agiclog encodedText.getTextEncoding(): ' + encodedText.getTextEncoding());
            }
            catch (error) {
                console.error('mp3agiclog encodedText FromOneEncodingToAnother: ' + error);
            }
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('Test NullWhenDecodingInvalidString');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let bytes = [78, 111, 116, 32, 117, 110, 105, 99, 111, 100, 101];
                let encodedText: EncodedText = new EncodedText({
                    textEncoding: EncodedText.TEXT_ENCODING_UTF_16,
                    value: bytes
                });
                // Not unicode
                console.log('mp3agiclog encodedText.getTextEncoding(): ' + encodedText.toString());
            }
            catch (error) {
                console.error('mp3agiclog encodedText NullWhenDecodingInvalidString: ' + error);
            }
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('确认修改');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let mp3file = new Mp3File(GlobalContext.getContext().getValue("path").toString() + '/v23tagwithwmprating.mp3');
                if (mp3file.hasId3v2Tag()) {
                    let id3v2Tag: ID3v2 = mp3file.getId3v2Tag();
                    id3v2Tag.setWmpRating(5);
                }
                mp3file.save('v23tagwithwmprating-copy.mp3');
            }
            catch (error) {
                console.error("mp3agiclog read v23tagwithwmprating.mp3:" + error);
            }
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('读取文件');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let mp3file = new Mp3File(GlobalContext.getContext().getValue("path").toString() + "/v23tagwithwmprating-copy.mp3");
                console.log('mp3agiclog Id3v2Tag mp3file.hasId3v2Tag(): ' + mp3file.hasId3v2Tag());
                if (mp3file.hasId3v2Tag()) {
                    let id3v2Tag: ID3v2 = mp3file.getId3v2Tag();
                    console.log('mp3agiclog id3v2Tag.getWmpRating():' + id3v2Tag.getWmpRating());
                }
            }
            catch (error) {
                console.error('mp3agiclog test ReadWmpRating error: ' + error);
            }
        });
        Button.margin(10);
        Button.pop();
        Flex.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
