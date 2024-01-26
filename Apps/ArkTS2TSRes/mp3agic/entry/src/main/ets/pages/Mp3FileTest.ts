interface Index_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Mp3FileTest_" + ++__generate__Id;
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
        Button.createWithLabel('test remove ID3v1tag');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let mp3file = new Mp3File(GlobalContext.getContext().getValue("path").toString() + '/v1andv23andcustomtags.mp3');
                console.log('mp3agiclog mp3file.hasId3v1Tag():' + mp3file.hasId3v1Tag());
                // mp3file.setCustomTag(BufferTools.stringToBytes('test cusTomTag'));
                mp3file.removeId3v1Tag();
                mp3file.save('v1andv23andcustomtags-copy.mp3');
            }
            catch (error) {
                console.error("mp3agiclog test remove ID3v1tag:" + error);
            }
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('get remove ID3v1tag');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let mp3file = new Mp3File(GlobalContext.getContext().getValue("path").toString() + "/v1andv23andcustomtags-copy.mp3");
                console.log('mp3agiclog mp3file.hasId3v1Tag():' + mp3file.hasId3v1Tag());
                console.log('mp3agiclog mp3file.hasId3v2Tag():' + mp3file.hasId3v2Tag());
                console.log('mp3agiclog mp3file.hasCustomTag():' + mp3file.hasCustomTag());
            }
            catch (error) {
                console.error('mp3agiclog test remove ID3v1tag: ' + error);
            }
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('test remove ID3v2tag');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let mp3file = new Mp3File(GlobalContext.getContext().getValue("path").toString() + '/v1andv23andcustomtags.mp3');
                console.log('mp3agiclog mp3file.hasId3v2Tag():' + mp3file.hasId3v2Tag());
                // mp3file.setCustomTag(BufferTools.stringToBytes('test cusTomTag'));
                mp3file.removeId3v2Tag();
                mp3file.save('v1andv23andcustomtags2-copy.mp3');
            }
            catch (error) {
                console.error('mp3agiclog test remove ID3v2tag: ' + error);
            }
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('get remove ID3v2tag');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let mp3file = new Mp3File(GlobalContext.getContext().getValue("path").toString() + "/v1andv23andcustomtags2-copy.mp3");
                console.log('mp3agiclog mp3file.hasId3v1Tag():' + mp3file.hasId3v1Tag());
                console.log('mp3agiclog mp3file.hasId3v2Tag():' + mp3file.hasId3v2Tag());
                console.log('mp3agiclog mp3file.hasCustomTag():' + mp3file.hasCustomTag());
            }
            catch (error) {
                console.error('mp3agiclog test remove ID3v2tag: ' + error);
            }
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('读取文件 notanmp3.mp3');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let mp3file = new Mp3File(GlobalContext.getContext().getValue("path").toString() + '/notanmp3.mp3', 5000, true);
                // No mpegs frames found
            }
            catch (error) {
                console.error('mp3agiclog test error: ' + error);
            }
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('读取文件 notags.mp3');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let mp3file: any = new Mp3File(GlobalContext.getContext().getValue("path").toString() + '/notags.mp3', 5000, true);
                // result false
                console.log('mp3agiclog mp3file.hasId3v1Tag():' + mp3file.hasId3v1Tag());
                // result false
                console.log('mp3agiclog mp3file.hasId3v2Tag():' + mp3file.hasId3v2Tag());
                // result false
                console.log('mp3agiclog mp3file.hasCustomTag():' + mp3file.hasCustomTag());
                // 0x000  --- > 0
                console.log('mp3agiclog mp3file.getXingOffset():' + mp3file.getXingOffset());
                // 0x1A1  --- > 417
                console.log('mp3agiclog mp3file.getStartOffset():' + mp3file.getStartOffset());
                // 0xB34  --- > 2868
                console.log('mp3agiclog mp3file.getEndOffset():' + mp3file.getEndOffset());
                //  result 6
                console.log('mp3agiclog mp3file.getFrameCount():' + mp3file.getFrameCount());
                //  result 1.0
                console.log('mp3agiclog mp3file.getVersion():' + mp3file.getVersion());
                //  result III
                console.log('mp3agiclog mp3file.getLayer():' + mp3file.getLayer());
                //  result 44100
                console.log('mp3agiclog mp3file.getSampleRate():' + mp3file.getSampleRate());
                //  result Joint stereo
                console.log('mp3agiclog mp3file.getChannelMode():' + mp3file.getChannelMode());
                //  result None
                console.log('mp3agiclog mp3file.getEmphasis():' + mp3file.getEmphasis());
                //  result true
                console.log('mp3agiclog mp3file.isOriginal():' + mp3file.isOriginal());
                //  result false
                console.log('mp3agiclog mp3file.isCopyright():' + mp3file.isCopyright());
                //  result 128
                console.log('mp3agiclog mp3file.getXingBitrate():' + mp3file.getXingBitrate());
                //  result 125
                console.log('mp3agiclog mp3file.getBitrate():' + mp3file.getBitrate());
                // true
                console.log('mp3agiclog mp3file.isVbr():' + mp3file.isVbr());
                console.log('mp3agiclog mp3file.getModeExtension():' + mp3file.getModeExtension());
                // result 1
                console.log('mp3agiclog mp3file.getValue():' + (mp3file.getBitrates().get(224)).getValue());
                // result 1
                console.log('mp3agiclog mp3file.getValue():' + (mp3file.getBitrates().get(112)).getValue());
                // result 2
                console.log('mp3agiclog mp3file.getValue():' + (mp3file.getBitrates().get(96)).getValue());
                // result 1
                console.log('mp3agiclog mp3file.getValue():' + (mp3file.getBitrates().get(192)).getValue());
                // result 1
                console.log('mp3agiclog mp3file.getValue():' + (mp3file.getBitrates().get(32)).getValue());
                // result 156
                console.log('mp3agiclog mp3file.getLengthInMilliseconds():' + mp3file.getLengthInMilliseconds());
            }
            catch (error) {
                console.error('mp3agiclog test error: ' + error);
            }
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('读取文件 dummyframes.mp3');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let mp3file: any = new Mp3File(GlobalContext.getContext().getValue("path").toString() + '/dummyframes.mp3', 1024, true);
                console.log('mp3agiclog mp3file.hasXingFrame():' + mp3file.hasXingFrame());
                // false
                console.log('mp3agiclog mp3file.hasId3v1Tag():' + mp3file.hasId3v1Tag());
                // true
                console.log('mp3agiclog mp3file.hasId3v2Tag():' + mp3file.hasId3v2Tag());
                // false
                console.log('mp3agiclog mp3file.hasCustomTag():' + mp3file.hasCustomTag());
                // 0x0CA  --- > 202
                console.log('mp3agiclog mp3file.getXingOffset():' + mp3file.getXingOffset());
                // 0x26B  --- > 619
                console.log('mp3agiclog mp3file.getStartOffset():' + mp3file.getStartOffset());
                // 0xBFE  --- > 3070
                console.log('mp3agiclog mp3file.getEndOffset():' + mp3file.getEndOffset());
                // 6
                console.log('mp3agiclog mp3file.getFrameCount():' + mp3file.getFrameCount());
                // 1.0
                console.log('mp3agiclog mp3file.getVersion():' + mp3file.getVersion());
                // III
                console.log('mp3agiclog mp3file.getLayer():' + mp3file.getLayer());
                // 44100
                console.log('mp3agiclog mp3file.getSampleRate():' + mp3file.getSampleRate());
                // Joint stereo
                console.log('mp3agiclog mp3file.getChannelMode():' + mp3file.getChannelMode());
                // None
                console.log('mp3agiclog mp3file.getEmphasis():' + mp3file.getEmphasis());
                // true
                console.log('mp3agiclog mp3file.isOriginal():' + mp3file.isOriginal());
                // false
                console.log('mp3agiclog mp3file.isCopyright():' + mp3file.isCopyright());
                // 128
                console.log('mp3agiclog mp3file.getXingBitrate():' + mp3file.getXingBitrate());
                // 125
                console.log('mp3agiclog mp3file.getBitrate():' + mp3file.getBitrate());
                // true
                console.log('mp3agiclog mp3file.isVbr():' + mp3file.isVbr());
                // None
                console.log('mp3agiclog mp3file.getModeExtension():' + mp3file.getModeExtension());
                // result 1
                console.log('mp3agiclog mp3file.getValue():' + (mp3file.getBitrates().get(224)).getValue());
                // result 1
                console.log('mp3agiclog mp3file.getValue():' + (mp3file.getBitrates().get(112)).getValue());
                // result 2
                console.log('mp3agiclog mp3file.getValue():' + (mp3file.getBitrates().get(96)).getValue());
                // result 1
                console.log('mp3agiclog mp3file.getValue():' + (mp3file.getBitrates().get(192)).getValue());
                // result 1
                console.log('mp3agiclog mp3file.getValue():' + (mp3file.getBitrates().get(32)).getValue());
                // result 156
                console.log('mp3agiclog mp3file.getLengthInMilliseconds():' + mp3file.getLengthInMilliseconds());
            }
            catch (error) {
                console.error('mp3agiclog test error: ' + error);
            }
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('读取文件 v23unicodetags.mp3');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let mp3file: any = new Mp3File(GlobalContext.getContext().getValue("path").toString() + '/v23unicodetags.mp3', 256, true);
                console.log('mp3agiclog mp3file.hasXingFrame():' + mp3file.hasXingFrame());
                // true
                console.log('mp3agiclog mp3file.hasId3v1Tag():' + mp3file.hasId3v1Tag());
                // true
                console.log('mp3agiclog mp3file.hasId3v2Tag():' + mp3file.hasId3v2Tag());
                // false
                console.log('mp3agiclog mp3file.hasCustomTag():' + mp3file.hasCustomTag());
                // 0x44B  --- > 1099
                console.log('mp3agiclog mp3file.getXingOffset():' + mp3file.getXingOffset());
                // 0x5EC  --- > 1516
                console.log('mp3agiclog mp3file.getStartOffset():' + mp3file.getStartOffset());
                // 0xF7F  --- > 3967
                console.log('mp3agiclog mp3file.getEndOffset():' + mp3file.getEndOffset());
                // 6
                console.log('mp3agiclog mp3file.getFrameCount():' + mp3file.getFrameCount());
                // 1.0
                console.log('mp3agiclog mp3file.getVersion():' + mp3file.getVersion());
                // III
                console.log('mp3agiclog mp3file.getLayer():' + mp3file.getLayer());
                // 44100
                console.log('mp3agiclog mp3file.getSampleRate():' + mp3file.getSampleRate());
                // Joint stereo
                console.log('mp3agiclog mp3file.getChannelMode():' + mp3file.getChannelMode());
                // None
                console.log('mp3agiclog mp3file.getEmphasis():' + mp3file.getEmphasis());
                // true
                console.log('mp3agiclog mp3file.isOriginal():' + mp3file.isOriginal());
                // false
                console.log('mp3agiclog mp3file.isCopyright():' + mp3file.isCopyright());
                // 128
                console.log('mp3agiclog mp3file.getXingBitrate():' + mp3file.getXingBitrate());
                // 125
                console.log('mp3agiclog mp3file.getBitrate():' + mp3file.getBitrate());
                // true
                console.log('mp3agiclog mp3file.isVbr():' + mp3file.isVbr());
                // None
                console.log('mp3agiclog mp3file.getModeExtension():' + mp3file.getModeExtension());
                // result 1
                console.log('mp3agiclog mp3file.getValue():' + (mp3file.getBitrates().get(224)).getValue());
                // result 1
                console.log('mp3agiclog mp3file.getValue():' + (mp3file.getBitrates().get(112)).getValue());
                // result 2
                console.log('mp3agiclog mp3file.getValue():' + (mp3file.getBitrates().get(96)).getValue());
                // result 1
                console.log('mp3agiclog mp3file.getValue():' + (mp3file.getBitrates().get(192)).getValue());
                // result 1
                console.log('mp3agiclog mp3file.getValue():' + (mp3file.getBitrates().get(32)).getValue());
                // result 156
                console.log('mp3agiclog mp3file.getLengthInMilliseconds():' + mp3file.getLengthInMilliseconds());
            }
            catch (error) {
                console.error('mp3agiclog test error: ' + error);
            }
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('读取文件 incompletempegframe.mp3');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let mp3file = new Mp3File(GlobalContext.getContext().getValue("path").toString() + '/incompletempegframe.mp3', 256, true);
                // true
                console.log('mp3agiclog mp3file.hasId3v1Tag():' + mp3file.hasId3v1Tag());
                // true
                console.log('mp3agiclog mp3file.hasId3v2Tag():' + mp3file.hasId3v2Tag());
                // 0x44B  --- > 1099
                console.log('mp3agiclog mp3file.getXingOffset():' + mp3file.getXingOffset());
                // 0x5EC  --- > 1516
                console.log('mp3agiclog mp3file.getStartOffset():' + mp3file.getStartOffset());
                // 0xF17  --- > 3863
                console.log('mp3agiclog mp3file.getEndOffset():' + mp3file.getEndOffset());
                // 5
                console.log('mp3agiclog mp3file.getFrameCount():' + mp3file.getFrameCount());
            }
            catch (error) {
                console.error('mp3agiclog test error: ' + error);
            }
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('读取文件 incompletempegframe.mp3 scanflag as false');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let mp3file = new Mp3File(GlobalContext.getContext().getValue("path").toString() + '/incompletempegframe.mp3', 256, false);
                // true
                console.log('mp3agiclog mp3file.hasId3v1Tag():' + mp3file.hasId3v1Tag());
                // true
                console.log('mp3agiclog mp3file.hasId3v2Tag():' + mp3file.hasId3v2Tag());
                // 0x44B  --- > 1099
                console.log('mp3agiclog mp3file.getXingOffset():' + mp3file.getXingOffset());
                // 0x5EC  --- > 1516
                console.log('mp3agiclog mp3file.getStartOffset():' + mp3file.getStartOffset());
                // -1
                console.log('mp3agiclog mp3file.getEndOffset():' + mp3file.getEndOffset());
                // 1
                console.log('mp3agiclog mp3file.getFrameCount():' + mp3file.getFrameCount());
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
