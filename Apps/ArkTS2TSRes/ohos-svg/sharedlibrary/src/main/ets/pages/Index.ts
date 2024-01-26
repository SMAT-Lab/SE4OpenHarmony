interface Index_Params {
    model1?: SVGImageView.SVGImageViewModel;
    model2?: SVGImageView.SVGImageViewModel;
    model3?: SVGImageView.SVGImageViewModel;
    model4?: SVGImageView.SVGImageViewModel;
    model5?: SVGImageView.SVGImageViewModel;
    svgPixelMap?: PixelMap;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/**
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import { SVGImageView, SVG } from '@ohos/svg';
import router from '@ohos.router';
import common from '@ohos.app.ability.common';
import util from '@ohos.util';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.model1 = new SVGImageView.SVGImageViewModel();
        this.model2 = new SVGImageView.SVGImageViewModel();
        this.model3 = new SVGImageView.SVGImageViewModel();
        this.model4 = new SVGImageView.SVGImageViewModel();
        this.model5 = new SVGImageView.SVGImageViewModel();
        this.__svgPixelMap = new ObservedPropertyObject(undefined, this, "svgPixelMap");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.model1 !== undefined) {
            this.model1 = params.model1;
        }
        if (params.model2 !== undefined) {
            this.model2 = params.model2;
        }
        if (params.model3 !== undefined) {
            this.model3 = params.model3;
        }
        if (params.model4 !== undefined) {
            this.model4 = params.model4;
        }
        if (params.model5 !== undefined) {
            this.model5 = params.model5;
        }
        if (params.svgPixelMap !== undefined) {
            this.svgPixelMap = params.svgPixelMap;
        }
    }
    aboutToBeDeleted() {
        this.__svgPixelMap.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private model1: SVGImageView.SVGImageViewModel;
    private model2: SVGImageView.SVGImageViewModel;
    private model3: SVGImageView.SVGImageViewModel;
    private model4: SVGImageView.SVGImageViewModel;
    private model5: SVGImageView.SVGImageViewModel;
    private __svgPixelMap?: ObservedPropertyObject<PixelMap>;
    get svgPixelMap() {
        return this.__svgPixelMap.get();
    }
    set svgPixelMap(newValue: PixelMap) {
        this.__svgPixelMap.set(newValue);
    }
    render() {
        Scroll.create();
        Scroll.width('100%');
        Scroll.height('100%');
        Column.create();
        Button.createWithLabel('测试setImageResource');
        Button.margin({ top: 10, bottom: 10 });
        Button.onClick(() => {
            let ctx = getContext(this).createModuleContext('sharedlibrary') as common.UIAbilityContext;
            this.model1.setImageResource($r('app.media.ic_launcher_round'), ctx);
        });
        Button.pop();
        Button.createWithLabel('测试setImageRawfile');
        Button.margin({ top: 10, bottom: 10 });
        Button.onClick(() => {
            let ctx = getContext(this).createModuleContext('sharedlibrary') as common.UIAbilityContext;
            this.model2.setImageRawfile('ic_launcher_round.svg', ctx);
        });
        Button.pop();
        Button.createWithLabel("测试setCSS,点击该按钮上面SVG图像颜色发生变化");
        Button.onClick(() => {
            let brickColours = ["#1698ec", "#fef134", "#95e881", "#ea272e"];
            for (let i = brickColours.length - 1; i > 0; i--) {
                let index = Math.round(Math.random() * (brickColours.length - 1));
                let temp = brickColours[index];
                brickColours[index] = brickColours[i];
                brickColours[i] = temp;
            }
            this.model2.setCSS(".brick1 { fill:" + brickColours[0] + "; } .brick2 { fill:" + brickColours[1] + "; } .brick3 { fill:" + brickColours[2] + "; } .brick4 { fill:" + brickColours[3] + "; }");
        });
        Button.margin({ top: 10, bottom: 10 });
        Button.pop();
        Button.createWithLabel('测试setFromString');
        Button.margin({ top: 10, bottom: 10 });
        Button.onClick(() => {
            let ctx = getContext(this).createModuleContext('sharedlibrary') as common.UIAbilityContext;
            ctx.resourceManager.getMediaContent($r('app.media.ic_launcher_round')).then((uint8) => {
                let textDecoder = util.TextDecoder.create('utf-8', { ignoreBOM: true });
                let svgStr = textDecoder.decodeWithStream(uint8, { stream: false });
                this.model3.setFromString(svgStr, ctx);
            });
        });
        Button.pop();
        Button.createWithLabel('测试getSVGPixelMap');
        Button.margin({ top: 10, bottom: 10 });
        Button.onClick(() => {
            let ctx = getContext(this).createModuleContext('sharedlibrary') as common.UIAbilityContext;
            ctx.resourceManager.getMediaContent($r('app.media.ic_launcher_round')).then((uint8) => {
                let size = new SVGImageView.Size();
                size.width = 200;
                size.height = 200;
                this.model4.getSVGPixelMap(uint8, size, ctx).then(pixelmap => {
                    this.svgPixelMap = pixelmap;
                });
            });
        });
        Button.pop();
        Image.create(this.svgPixelMap);
        Image.margin({ top: 10, bottom: 10 });
        Image.backgroundColor(Color.Gray);
        Image.width(200);
        Image.height(200);
        Button.createWithLabel('测试setSVG');
        Button.margin({ top: 10, bottom: 10 });
        Button.onClick(() => {
            let brickColours = ["#1698ec", "#fef134", "#95e881", "#ea272e"];
            for (let i = brickColours.length - 1; i > 0; i--) {
                let index = Math.round(Math.random() * (brickColours.length - 1));
                let temp = brickColours[index];
                brickColours[index] = brickColours[i];
                brickColours[i] = temp;
            }
            let css = ".brick1 { fill:" + brickColours[0] + "; } .brick2 { fill:" + brickColours[1] + "; } .brick3 { fill:" + brickColours[2] + "; } .brick4 { fill:" + brickColours[3] + "; }";
            let ctx = getContext(this).createModuleContext('sharedlibrary') as common.UIAbilityContext;
            ctx.resourceManager.getMediaContent($r('app.media.ic_launcher_round')).then((uint8) => {
                let textDecoder = util.TextDecoder.create('utf-8', { ignoreBOM: true });
                let svgStr = textDecoder.decodeWithStream(uint8, { stream: false });
                let svg = SVG.getFromString(svgStr);
                this.model5.setSVG(svg, css, ctx);
            });
        });
        Button.pop();
        Column.pop();
        Scroll.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
