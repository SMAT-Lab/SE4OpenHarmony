interface Index_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "V1AndV23AndCustomTagsTest_" + ++__generate__Id;
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
import { BufferTools } from '@ohos/mp3agic/';
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
        Button.createWithLabel('test remove CustomTag');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let mp3file = new Mp3File(GlobalContext.getContext().getValue("path").toString() + '/v1andv23andcustomtags.mp3');
                console.log('mp3agiclog mp3file.hasCustomTag():' + mp3file.hasCustomTag());
                mp3file.removeCustomTag();
                mp3file.save('v1andv23andcustomtags-copy.mp3');
            }
            catch (error) {
                console.error("mp3agiclog test remove CustomTag:" + error);
            }
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('get remove CustomTag');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let mp3file = new Mp3File(GlobalContext.getContext().getValue("path").toString() + '/v1andv23andcustomtags-copy.mp3');
                console.log('mp3agiclog mp3file.hasId3v1Tag():' + mp3file.hasId3v1Tag());
                console.log('mp3agiclog mp3file.hasId3v2Tag():' + mp3file.hasId3v2Tag());
                console.log('mp3agiclog mp3file.hasCustomTag():' + mp3file.hasCustomTag());
            }
            catch (error) {
                console.error('mp3agiclog test remove CustomTag: ' + error);
            }
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('确认修改 CustomTag');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let mp3file = new Mp3File(GlobalContext.getContext().getValue("path").toString() + '/v1andv23andcustomtags.mp3');
                mp3file.setCustomTag(BufferTools.stringToBytes('test,cusTomTag'));
                mp3file.save('v1andv23andcustomtags2-copy.mp3');
            }
            catch (error) {
                console.error('mp3agiclog CustomTag: ' + error);
            }
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('读取文件');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            try {
                let mp3file: any = new Mp3File(GlobalContext.getContext().getValue("path").toString() + "/v1andv23andcustomtags2-copy.mp3");
                console.log('mp3agiclog mp3file.hasXingFrame():' + mp3file.hasXingFrame());
                console.log('mp3agiclog mp3file.hasId3v1Tag():' + mp3file.hasId3v1Tag());
                console.log('mp3agiclog mp3file.hasId3v2Tag():' + mp3file.hasId3v2Tag());
                console.log('mp3agiclog mp3file.hasCustomTag():' + mp3file.hasCustomTag());
                console.log('mp3agiclog mp3file.getCustomTag:' + mp3file.getCustomTag());
                // 0x44B  --- > 1099
                console.log('mp3agiclog mp3file.getXingOffset():' + mp3file.getXingOffset());
                // 0x5EC  --- > 1516
                console.log('mp3agiclog mp3file.getStartOffset():' + mp3file.getStartOffset());
                // 0xF7F  --- > 3967
                console.log('mp3agiclog mp3file.getEndOffset():' + mp3file.getEndOffset());
                console.log('mp3agiclog mp3file.getFrameCount():' + mp3file.getFrameCount());
                console.log('mp3agiclog mp3file.getVersion():' + mp3file.getVersion());
                console.log('mp3agiclog mp3file.getLayer():' + mp3file.getLayer());
                console.log('mp3agiclog mp3file.getSampleRate():' + mp3file.getSampleRate());
                console.log('mp3agiclog mp3file.getChannelMode():' + mp3file.getChannelMode());
                console.log('mp3agiclog mp3file.getEmphasis():' + mp3file.getEmphasis());
                console.log('mp3agiclog mp3file.isOriginal():' + mp3file.isOriginal());
                console.log('mp3agiclog mp3file.isCopyright():' + mp3file.isCopyright());
                console.log('mp3agiclog mp3file.getXingBitrate():' + mp3file.getXingBitrate());
                console.log('mp3agiclog mp3file.getBitrate():' + mp3file.getBitrate());
                console.log('mp3agiclog mp3file.isVbr():' + mp3file.isVbr());
                console.log('mp3agiclog mp3file.getModeExtension():' + mp3file.getModeExtension());
                console.log('mp3agiclog mp3file.getValue():' + (mp3file.getBitrates().get(224)).getValue());
                console.log('mp3agiclog mp3file.getValue():' + (mp3file.getBitrates().get(112)).getValue());
                console.log('mp3agiclog mp3file.getValue():' + (mp3file.getBitrates().get(96)).getValue());
                console.log('mp3agiclog mp3file.getValue():' + (mp3file.getBitrates().get(192)).getValue());
                console.log('mp3agiclog mp3file.getValue():' + (mp3file.getBitrates().get(32)).getValue());
                console.log('mp3agiclog mp3file.getLengthInMilliseconds():' + mp3file.getLengthInMilliseconds());
                console.log('mp3agiclog mp3file.getLengthInSeconds():' + mp3file.getLengthInSeconds());
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
