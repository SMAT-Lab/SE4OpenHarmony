interface AudioMergePage_Params {
    btnText?: string;
    btnText2?: string;
    imageWidth?: number;
    imageHeight?: number;
    myVideoController?: VideoController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "audioMergePage_" + ++__generate__Id;
}
/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { MP4Parser } from "@ohos/mp4parser";
import { ICallBack } from "@ohos/mp4parser";
class AudioMergePage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__btnText = new ObservedPropertySimple("音频合成点击执行", this, "btnText");
        this.__btnText2 = new ObservedPropertySimple("音频合成点击执行", this, "btnText2");
        this.__imageWidth = new ObservedPropertySimple(0, this, "imageWidth");
        this.__imageHeight = new ObservedPropertySimple(0, this, "imageHeight");
        this.myVideoController = new VideoController();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AudioMergePage_Params) {
        if (params.btnText !== undefined) {
            this.btnText = params.btnText;
        }
        if (params.btnText2 !== undefined) {
            this.btnText2 = params.btnText2;
        }
        if (params.imageWidth !== undefined) {
            this.imageWidth = params.imageWidth;
        }
        if (params.imageHeight !== undefined) {
            this.imageHeight = params.imageHeight;
        }
        if (params.myVideoController !== undefined) {
            this.myVideoController = params.myVideoController;
        }
    }
    aboutToBeDeleted() {
        this.__btnText.aboutToBeDeleted();
        this.__btnText2.aboutToBeDeleted();
        this.__imageWidth.aboutToBeDeleted();
        this.__imageHeight.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __btnText: ObservedPropertySimple<string>;
    get btnText() {
        return this.__btnText.get();
    }
    set btnText(newValue: string) {
        this.__btnText.set(newValue);
    }
    private __btnText2: ObservedPropertySimple<string>;
    get btnText2() {
        return this.__btnText2.get();
    }
    set btnText2(newValue: string) {
        this.__btnText2.set(newValue);
    }
    private __imageWidth: ObservedPropertySimple<number>;
    get imageWidth() {
        return this.__imageWidth.get();
    }
    set imageWidth(newValue: number) {
        this.__imageWidth.set(newValue);
    }
    private __imageHeight: ObservedPropertySimple<number>;
    get imageHeight() {
        return this.__imageHeight.get();
    }
    set imageHeight(newValue: number) {
        this.__imageHeight.set(newValue);
    }
    private myVideoController: VideoController;
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Text.create('testsound.wav');
        Text.fontSize(16);
        Text.fontColor(0x000000);
        Text.pop();
        Video.create({
            src: $r("app.media.testsound"),
            currentProgressRate: 1,
            controller: this.myVideoController
        });
        Video.muted(false);
        Video.autoPlay(true);
        Video.controls(true);
        Video.objectFit(ImageFit.Contain);
        Video.loop(true);
        Video.width(320);
        Video.height(200);
        Text.create('testsound.wav');
        Text.fontSize(16);
        Text.fontColor(0x000000);
        Text.pop();
        Video.create({
            src: $r("app.media.testsound"),
            currentProgressRate: 1,
            controller: this.myVideoController
        });
        Video.muted(false);
        Video.autoPlay(true);
        Video.controls(true);
        Video.objectFit(ImageFit.Contain);
        Video.loop(true);
        Video.width(320);
        Video.height(200);
        Text.create('testsound.wav');
        Text.fontSize(16);
        Text.fontColor(0x000000);
        Text.pop();
        Video.create({
            src: $r("app.media.testsound"),
            currentProgressRate: 1,
            controller: this.myVideoController
        });
        Video.muted(false);
        Video.autoPlay(true);
        Video.controls(true);
        Video.objectFit(ImageFit.Contain);
        Video.loop(true);
        Video.width(320);
        Video.height(200);
        Image.create($r('app.media.icon_load'));
        Image.objectFit(ImageFit.None);
        Image.width(this.imageWidth);
        Image.height(this.imageHeight);
        Image.border({ width: 0 });
        Image.borderStyle(BorderStyle.Dashed);
        Button.createWithLabel(this.btnText + "_2", { type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(8);
        Button.backgroundColor(0x317aff);
        Button.width(250);
        Button.margin({ top: 15 });
        Button.onClick(() => {
            this.btnText = "正在执行...";
            this.imageWidth = 25;
            this.imageHeight = 25;
            this.audioMerge();
        });
        Button.pop();
        Button.createWithLabel(this.btnText2 + "_3", { type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(8);
        Button.backgroundColor(0x317aff);
        Button.width(250);
        Button.margin({ top: 15 });
        Button.onClick(() => {
            this.btnText2 = "正在执行...";
            this.imageWidth = 25;
            this.imageHeight = 25;
            this.audioMultMerge();
        });
        Button.pop();
        Flex.pop();
    }
    /**
     * 音频合成
     */
    private audioMerge() {
        let getLocalDirPath = getContext(this).cacheDir + "/";
        let that = this;
        let filePathOne = getLocalDirPath + "testsound.wav";
        let filePathTwo = getLocalDirPath + "testsound.wav";
        let outPath = getLocalDirPath + "mergeout.wav";
        let callBack: ICallBack = {
            callBackResult(code: number) {
                console.log("mp4parser-->audioMerge--->end");
                that.btnText = "音频合成点击执行";
                that.imageWidth = 0;
                that.imageHeight = 0;
                if (code == 0) {
                    AlertDialog.show({ message: '执行成功' });
                }
                else {
                    AlertDialog.show({ message: '执行失败' });
                }
            }
        };
        MP4Parser.audioMerge(filePathOne, filePathTwo, outPath, callBack);
    }
    /**
     * 音频批量合成
     */
    private audioMultMerge() {
        let getLocalDirPath = getContext(this).cacheDir + "/";
        let that = this;
        let filePath = getLocalDirPath + "mergewavList.txt";
        let outPath = getLocalDirPath + "mergeout3.wav";
        let callBack: ICallBack = {
            callBackResult(code: number) {
                that.btnText2 = "音频合成点击执行";
                that.imageWidth = 0;
                that.imageHeight = 0;
                if (code == 0) {
                    AlertDialog.show({ message: '执行成功' });
                }
                else {
                    AlertDialog.show({ message: '执行失败' });
                }
            }
        };
        MP4Parser.audioMultMerge(filePath, outPath, callBack);
    }
    aboutToAppear() {
        MP4Parser.openNativeLog();
    }
}
loadDocument(new AudioMergePage("1", undefined, {}));
