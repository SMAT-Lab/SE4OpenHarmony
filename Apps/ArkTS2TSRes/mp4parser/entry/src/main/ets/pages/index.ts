interface Index_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "index_" + ++__generate__Id;
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
import router from '@ohos.router';
import fileio from '@ohos.fileio';
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
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Button.createWithLabel('视频裁剪', { type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(8);
        Button.backgroundColor(0x317aff);
        Button.width(250);
        Button.onClick(() => {
            router.pushUrl({ url: "pages/videoClipPage" });
        });
        Button.pop();
        Button.createWithLabel('视频合成', { type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(8);
        Button.backgroundColor(0x317aff);
        Button.width(250);
        Button.margin({ top: 15 });
        Button.onClick(() => {
            router.pushUrl({ url: "pages/videoMergePage" });
        });
        Button.pop();
        Button.createWithLabel('音频合成', { type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(8);
        Button.backgroundColor(0x317aff);
        Button.width(250);
        Button.margin({ top: 15 });
        Button.onClick(() => {
            router.pushUrl({ url: "pages/audioMergePage" });
        });
        Button.pop();
        Button.createWithLabel('音频裁剪', { type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(8);
        Button.backgroundColor(0x317aff);
        Button.width(250);
        Button.margin({ top: 15 });
        Button.onClick(() => {
            router.pushUrl({ url: "pages/audioClipPage" });
        });
        Button.pop();
        Button.createWithLabel('视频取帧', { type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(8);
        Button.backgroundColor(0x317aff);
        Button.width(250);
        Button.margin({ top: 15 });
        Button.onClick(() => {
            router.pushUrl({ url: "pages/getFrameFromVideo" });
        });
        Button.pop();
        Flex.pop();
    }
    typedArrayToBuffer(array: Uint8Array): ArrayBuffer {
        return array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset);
    }
    writeFile(path: string, content: ArrayBuffer | string) {
        try {
            let fd = fileio.openSync(path, 0o102, 0o666);
            fileio.ftruncateSync(fd);
            fileio.writeSync(fd, content);
            fileio.fsyncSync(fd);
            fileio.closeSync(fd);
        }
        catch (e) {
        }
    }
    aboutToAppear() {
        let path = getContext(this).cacheDir + "/";
        getContext(this).resourceManager.getMediaContent($r("app.media.testsound").id, (error, value) => {
            if (error == null) {
                let arrayBuffer = this.typedArrayToBuffer(value);
                this.writeFile(path + "testsound.wav", arrayBuffer);
            }
        });
        getContext(this).resourceManager.getMediaContent($r("app.media.testvideo").id, (error, value) => {
            if (error == null) {
                let arrayBuffer = this.typedArrayToBuffer(value);
                this.writeFile(path + "testvideo.mp4", arrayBuffer);
            }
        });
        getContext(this).resourceManager.getMediaContent($r("app.media.mergeList").id, (error, value) => {
            if (error == null) {
                let arrayBuffer = this.typedArrayToBuffer(value);
                this.writeFile(path + "mergeList.txt", arrayBuffer);
            }
        });
        getContext(this).resourceManager.getMediaContent($r("app.media.mergewavList").id, (error, value) => {
            if (error == null) {
                let arrayBuffer = this.typedArrayToBuffer(value);
                this.writeFile(path + "mergewavList.txt", arrayBuffer);
            }
        });
    }
}
loadDocument(new Index("1", undefined, {}));
