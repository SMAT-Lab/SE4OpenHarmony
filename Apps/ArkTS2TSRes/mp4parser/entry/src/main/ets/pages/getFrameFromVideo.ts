interface GetFrameFromVideo_Params {
    imagePixelMap?: PixelMap;
    bufferForVideoFrameRetrieval?: ArrayBuffer;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "getFrameFromVideo_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
import { ICallBack, IFrameCallBack, MP4Parser } from '@ohos/mp4parser';
import image from '@ohos.multimedia.image';
import hilog from '@ohos.hilog';
class GetFrameFromVideo extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__imagePixelMap = new ObservedPropertyObject(undefined, this, "imagePixelMap");
        this.bufferForVideoFrameRetrieval = new ArrayBuffer(0);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: GetFrameFromVideo_Params) {
        if (params.imagePixelMap !== undefined) {
            this.imagePixelMap = params.imagePixelMap;
        }
        if (params.bufferForVideoFrameRetrieval !== undefined) {
            this.bufferForVideoFrameRetrieval = params.bufferForVideoFrameRetrieval;
        }
    }
    aboutToBeDeleted() {
        this.__imagePixelMap.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __imagePixelMap?: ObservedPropertyObject<PixelMap>;
    get imagePixelMap() {
        return this.__imagePixelMap.get();
    }
    set imagePixelMap(newValue: PixelMap) {
        this.__imagePixelMap.set(newValue);
    }
    private bufferForVideoFrameRetrieval: ArrayBuffer;
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Button.createWithLabel("视频取帧", { type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(8);
        Button.backgroundColor(0x317aff);
        Button.width(250);
        Button.margin({ top: 15 });
        Button.onClick(() => {
            if (this.bufferForVideoFrameRetrieval.byteLength == 0) {
                hilog.error(0x0001, "GetFrameFromVideo pages : ", "MP4Parser.getFrameAtTimeRang obtain frame ArrayBuffer is 0");
            }
            else {
                image.createImageSource(this.bufferForVideoFrameRetrieval)
                    .createPixelMap()
                    .then((imagePixelMap: PixelMap) => {
                    this.imagePixelMap = imagePixelMap;
                });
            }
        });
        Button.pop();
        Image.create(this.imagePixelMap);
        Image.objectFit(ImageFit.None);
        Flex.pop();
    }
    aboutToAppear() {
        const sourceMP4: string = getContext(this).cacheDir + "/testvideo.mp4";
        let setDataSourceCallback: ICallBack = {
            callBackResult: (code: number) => {
                if (code == 0) {
                    let frameCallBack: IFrameCallBack = {
                        callBackResult: (data: ArrayBuffer, timeUs: number) => {
                            this.bufferForVideoFrameRetrieval = data;
                        }
                    };
                    MP4Parser.getFrameAtTimeRang("1000000", "1500000", MP4Parser.OPTION_CLOSEST, frameCallBack);
                }
            }
        };
        MP4Parser.openNativeLog();
        MP4Parser.setDataSource(sourceMP4, setDataSourceCallback);
    }
    aboutToDisappear() {
        MP4Parser.stopGetFrame();
    }
}
loadDocument(new GetFrameFromVideo("1", undefined, {}));
