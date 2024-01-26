interface PicturePage_Params {
    jpg?: boolean;
    png?: boolean;
    gif?: boolean;
    tif?: boolean;
    bmp?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "PicturePage_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import imtype from 'imtype';
import { GlobalContext } from '../entryability/GlobalContext';
class PicturePage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__jpg = new ObservedPropertySimple(false, this, "jpg");
        this.__png = new ObservedPropertySimple(false, this, "png");
        this.__gif = new ObservedPropertySimple(false, this, "gif");
        this.__tif = new ObservedPropertySimple(false, this, "tif");
        this.__bmp = new ObservedPropertySimple(false, this, "bmp");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: PicturePage_Params) {
        if (params.jpg !== undefined) {
            this.jpg = params.jpg;
        }
        if (params.png !== undefined) {
            this.png = params.png;
        }
        if (params.gif !== undefined) {
            this.gif = params.gif;
        }
        if (params.tif !== undefined) {
            this.tif = params.tif;
        }
        if (params.bmp !== undefined) {
            this.bmp = params.bmp;
        }
    }
    aboutToBeDeleted() {
        this.__jpg.aboutToBeDeleted();
        this.__png.aboutToBeDeleted();
        this.__gif.aboutToBeDeleted();
        this.__tif.aboutToBeDeleted();
        this.__bmp.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __jpg: ObservedPropertySimple<boolean>;
    get jpg() {
        return this.__jpg.get();
    }
    set jpg(newValue: boolean) {
        this.__jpg.set(newValue);
    }
    private __png: ObservedPropertySimple<boolean>;
    get png() {
        return this.__png.get();
    }
    set png(newValue: boolean) {
        this.__png.set(newValue);
    }
    private __gif: ObservedPropertySimple<boolean>;
    get gif() {
        return this.__gif.get();
    }
    set gif(newValue: boolean) {
        this.__gif.set(newValue);
    }
    private __tif: ObservedPropertySimple<boolean>;
    get tif() {
        return this.__tif.get();
    }
    set tif(newValue: boolean) {
        this.__tif.set(newValue);
    }
    private __bmp: ObservedPropertySimple<boolean>;
    get bmp() {
        return this.__bmp.get();
    }
    set bmp(newValue: boolean) {
        this.__bmp.set(newValue);
    }
    render() {
        Column.create();
        Column.margin({ top: 18 });
        Button.createWithLabel('是否jpg:' + this.jpg);
        Button.fontSize(18);
        Button.margin({ left: 18 });
        Button.onClick(() => {
            this.jpgTest();
        });
        Button.margin({ top: 18 });
        Button.pop();
        Button.createWithLabel('是否png:' + this.png);
        Button.fontSize(18);
        Button.margin({ left: 18 });
        Button.onClick(() => {
            this.pngTest();
        });
        Button.margin({ top: 18 });
        Button.pop();
        Button.createWithLabel('是否gif:' + this.gif);
        Button.fontSize(18);
        Button.margin({ left: 18 });
        Button.onClick(() => {
            this.gifTest();
        });
        Button.margin({ top: 18 });
        Button.pop();
        Button.createWithLabel('是否tif:' + this.tif);
        Button.fontSize(18);
        Button.margin({ left: 18 });
        Button.onClick(() => {
            this.tifTest();
        });
        Button.margin({ top: 18 });
        Button.pop();
        Button.createWithLabel('是否bmp:' + this.bmp);
        Button.fontSize(18);
        Button.margin({ left: 18 });
        Button.onClick(() => {
            this.bmpTest();
        });
        Button.margin({ top: 18 });
        Button.pop();
        Button.createWithLabel('文本测试');
        Button.fontSize(18);
        Button.margin({ left: 18 });
        Button.onClick(() => {
            this.textTest();
        });
        Button.margin({ top: 18 });
        Button.pop();
        Column.pop();
    }
    jpgTest() {
        let context: Context = GlobalContext.getContext().getObject("context") as Context;
        context.resourceManager.getMediaContent($r("app.media.jpg").id)
            .then((data: Iterable<number>) => {
            this.jpg = imtype.isJPG(new Uint8Array(data));
        })
            .catch((err: Error) => {
            console.log('addFileToDisk err=' + err);
        });
    }
    pngTest() {
        let context: Context = GlobalContext.getContext().getObject("context") as Context;
        context.resourceManager.getMediaContent($r("app.media.png").id)
            .then((data: Iterable<number>) => {
            this.png = imtype.isPNG(new Uint8Array(data));
        })
            .catch((err: Error) => {
            console.log('addFileToDisk err=' + err);
        });
    }
    gifTest() {
        let context: Context = GlobalContext.getContext().getObject("context") as Context;
        context.resourceManager.getMediaContent($r("app.media.gif").id)
            .then((data: Iterable<number>) => {
            this.gif = imtype.isGIF(new Uint8Array(data));
        })
            .catch((err: Error) => {
            console.log('addFileToDisk err=' + err);
        });
    }
    bmpTest() {
        let context: Context = GlobalContext.getContext().getObject("context") as Context;
        context.resourceManager.getMediaContent($r("app.media.bmp").id)
            .then((data: Iterable<number>) => {
            this.bmp = imtype.isBMP(new Uint8Array(data));
        })
            .catch((err: Error) => {
            console.log('addFileToDisk err=' + err);
        });
    }
    tifTest() {
        let context: Context = GlobalContext.getContext().getObject("context") as Context;
        context.resourceManager.getMediaContent($r("app.media.tif").id)
            .then((data: Iterable<number>) => {
            this.tif = imtype.isTIF(new Uint8Array(data));
        })
            .catch((err: Error) => {
            console.log('addFileToDisk err=' + err);
        });
    }
    textTest() {
        let context: Context = GlobalContext.getContext().getObject("context") as Context;
        context.resourceManager.getMediaContent($r("app.media.text").id)
            .then((data: Iterable<number>) => {
            console.log('是否jpg:' + imtype.isJPG(new Uint8Array(data)));
            console.log('是否png:' + imtype.isPNG(new Uint8Array(data)));
            console.log('是否gif:' + imtype.isGIF(new Uint8Array(data)));
            console.log('是否bmp:' + imtype.isBMP(new Uint8Array(data)));
            console.log('是否tif:' + imtype.isTIF(new Uint8Array(data)));
        })
            .catch((err: Error) => {
            console.log('addFileToDisk err=' + err);
        });
    }
}
loadDocument(new PicturePage("1", undefined, {}));
