interface RoundedImageView_Params {
    model?: RoundedImageName.Model;
    settings?: RenderingContextSettings;
    context?: CanvasRenderingContext2D;
    bottomLayerContext?: CanvasRenderingContext2D;
    img?: PixelMap | null;
    srcWidth?: number;
    srcHeight?: number;
    minScale?: number;
    scaleW?: number;
    scaleH?: number;
    svgImageViewModel?: SVGImageView.SVGImageViewModel;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "RoundedImageView_" + ++__generate__Id;
}
/*
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
import { SVGImageView } from '@ohos/svg';
import PixelMapUtils from './PixelMapUtils';
import ScaleType from './ScaleType';
import TileMode from './TileMode';
import SrcType from './SrcType';
import { GlobalContext } from './GlobalContext';
import common from '@ohos.app.ability.common';
export class RoundedImageView extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new RoundedImageName.Model(), this, "model");
        this.settings = new RenderingContextSettings(true);
        this.context = new CanvasRenderingContext2D(this.settings);
        this.bottomLayerContext = new CanvasRenderingContext2D(this.settings);
        this.img = null;
        this.srcWidth = 0;
        this.srcHeight = 0;
        this.minScale = 1;
        this.scaleW = 0;
        this.scaleH = 0;
        this.svgImageViewModel = new SVGImageView.SVGImageViewModel();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: RoundedImageView_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.settings !== undefined) {
            this.settings = params.settings;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
        if (params.bottomLayerContext !== undefined) {
            this.bottomLayerContext = params.bottomLayerContext;
        }
        if (params.img !== undefined) {
            this.img = params.img;
        }
        if (params.srcWidth !== undefined) {
            this.srcWidth = params.srcWidth;
        }
        if (params.srcHeight !== undefined) {
            this.srcHeight = params.srcHeight;
        }
        if (params.minScale !== undefined) {
            this.minScale = params.minScale;
        }
        if (params.scaleW !== undefined) {
            this.scaleW = params.scaleW;
        }
        if (params.scaleH !== undefined) {
            this.scaleH = params.scaleH;
        }
        if (params.svgImageViewModel !== undefined) {
            this.svgImageViewModel = params.svgImageViewModel;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: ObservedPropertyObject<RoundedImageName.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: RoundedImageName.Model) {
        this.__model.set(newValue);
    }
    private settings: RenderingContextSettings;
    private context: CanvasRenderingContext2D;
    private bottomLayerContext: CanvasRenderingContext2D;
    private img: PixelMap | null;
    private srcWidth: number;
    private srcHeight: number;
    private minScale: number;
    private scaleW: number;
    private scaleH: number;
    private svgImageViewModel: SVGImageView.SVGImageViewModel;
    public aboutToAppear() {
    }
    setImageCanvasTransform() {
        switch (this.model.scaleType) {
            case ScaleType.FIT_START:
            case ScaleType.FIT_END:
            case ScaleType.FIT_CENTER:
                this.minScale = this.scaleW >= this.scaleH ? this.scaleH : this.scaleW;
                this.context.setTransform(this.minScale, 0, 0, this.minScale, 0, 0);
                break;
            case ScaleType.CENTER:
                break;
            case ScaleType.CENTER_CROP:
                this.minScale = this.scaleW >= this.scaleH ? this.scaleW : this.scaleH;
                this.context.setTransform(this.minScale, 0, 0, this.minScale, 0, 0);
                break;
            case ScaleType.FIT_XY:
                this.context.setTransform(this.scaleW, 0, 0, this.scaleH, 0, 0);
                break;
            case ScaleType.CENTER_INSIDE:
                if (this.scaleW < 1 || this.scaleH < 1) {
                    this.minScale = this.scaleW >= this.scaleH ? this.scaleH : this.scaleW;
                }
                this.context.setTransform(this.minScale, 0, 0, this.minScale, 0, 0);
                break;
        }
    }
    setImage() {
        if (!!this.img) {
            switch (this.model.scaleType) {
                case ScaleType.FIT_START:
                    this.context.drawImage(this.img, 0, 0, this.srcWidth, this.srcHeight);
                    break;
                case ScaleType.FIT_END:
                    this.context.drawImage(this.img, (this.model.uiWidth - this.model.padding * 2 - this.srcWidth * this.minScale) / (this.minScale * 1), (this.model.uiHeight - this.model.padding * 2 - this.srcHeight * this.minScale) / (this.minScale * 1), this.srcWidth, this.srcHeight);
                    break;
                case ScaleType.FIT_CENTER:
                    this.context.drawImage(this.img, (this.model.uiWidth - this.model.padding * 2 - this.srcWidth * this.minScale) / (this.minScale * 2), (this.model.uiHeight - this.model.padding * 2 - this.srcHeight * this.minScale) / (this.minScale * 2), this.srcWidth, this.srcHeight);
                    break;
                case ScaleType.CENTER:
                    this.context.drawImage(this.img, (this.model.uiWidth - this.model.padding * 2 - this.srcWidth) / 2, (this.model.uiHeight - this.model.padding * 2 - this.srcHeight) / 2, this.srcWidth, this.srcHeight);
                    break;
                case ScaleType.CENTER_CROP:
                    this.context.drawImage(this.img, (this.model.uiWidth - this.model.padding * 2 - this.srcWidth * this.minScale) / (this.minScale * 2), (this.model.uiHeight - this.model.padding * 2 - this.srcHeight * this.minScale) / (this.minScale * 2), this.srcWidth, this.srcHeight);
                    break;
                case ScaleType.FIT_XY:
                    if (this.model.tileMode == TileMode.REPEAT || this.model.tileMode == TileMode.MIRROR) {
                        this.context.restore();
                        this.setTileMode();
                    }
                    else {
                        this.context.drawImage(this.img, 0, 0, this.srcWidth, this.srcHeight);
                    }
                    break;
                case ScaleType.CENTER_INSIDE:
                    this.context.drawImage(this.img, (this.model.uiWidth - this.model.padding * 2 - this.srcWidth * this.minScale) / (this.minScale * 2), (this.model.uiHeight - this.model.padding * 2 - this.srcHeight * this.minScale) / (this.minScale * 2), this.srcWidth, this.srcHeight);
                    break;
            }
        }
    }
    setRect() {
        switch (this.model.scaleType) {
            case ScaleType.FIT_START:
                this.roundRect(this.context, this.model.borderWidth / 2, this.model.borderWidth / 2, this.srcWidth * this.minScale - this.model.borderWidth, this.srcHeight * this.minScale - this.model.borderWidth, this.model.cornerRadius);
                break;
            case ScaleType.FIT_END:
                this.roundRect(this.context, this.model.uiWidth - this.model.padding * 2 - this.srcWidth * this.minScale + this.model.borderWidth / 2, this.model.uiHeight - this.model.padding * 2 - this.srcHeight * this.minScale + this.model.borderWidth / 2, this.srcWidth * this.minScale - this.model.borderWidth, this.srcHeight * this.minScale - this.model.borderWidth, this.model.cornerRadius);
                break;
            case ScaleType.FIT_CENTER:
                this.roundRect(this.context, (this.model.uiWidth - this.model.padding * 2 - this.srcWidth * this.minScale) / 2 + this.model.borderWidth / 2, (this.model.uiHeight - this.model.padding * 2 - this.srcHeight * this.minScale) / 2 + this.model.borderWidth / 2, this.srcWidth * this.minScale - this.model.borderWidth, this.srcHeight * this.minScale - this.model.borderWidth, this.model.cornerRadius);
                break;
            case ScaleType.CENTER:
                let x: number = this.model.uiWidth - this.model.padding * 2 - this.srcWidth >= 0 ? this.model.uiWidth - this.model.padding * 2 - this.srcWidth : 0;
                let y: number = this.model.uiHeight - this.model.padding * 2 - this.srcHeight >= 0 ? this.model.uiHeight - this.model.padding * 2 - this.srcHeight : 0;
                let w: number = this.model.uiWidth - this.model.padding * 2 - this.srcWidth >= 0 ? this.srcWidth - this.model.padding * 2 : this.model.uiWidth - this.model.padding * 2;
                let h: number = this.model.uiHeight - this.model.padding * 2 - this.srcHeight >= 0 ? this.srcHeight - this.model.padding * 2 : this.model.uiHeight - this.model.padding * 2;
                this.roundRect(this.context, x / 2 + this.model.borderWidth / 2, y / 2 + this.model.borderWidth / 2, w - this.model.borderWidth, h - this.model.borderWidth, this.model.cornerRadius);
                break;
            case ScaleType.CENTER_CROP:
                this.roundRect(this.context, this.model.borderWidth / 2, this.model.borderWidth / 2, this.model.uiWidth - this.model.padding * 2 - this.model.borderWidth, this.model.uiHeight - this.model.padding * 2 - this.model.borderWidth, this.model.cornerRadius);
                break;
            case ScaleType.FIT_XY:
                this.roundRect(this.context, this.model.borderWidth / 2, this.model.borderWidth / 2, this.srcWidth * this.scaleW - this.model.borderWidth, this.srcHeight * this.scaleH - this.model.borderWidth, this.model.cornerRadius);
                break;
            case ScaleType.CENTER_INSIDE:
                this.roundRect(this.context, (this.model.uiWidth - this.model.padding * 2 - this.srcWidth * this.minScale) / 2 + this.model.borderWidth / 2, (this.model.uiHeight - this.model.padding * 2 - this.srcHeight * this.minScale) / 2 + this.model.borderWidth / 2, this.srcWidth * this.minScale - this.model.borderWidth, this.srcHeight * this.minScale - this.model.borderWidth, this.model.cornerRadius);
                break;
        }
    }
    roundRect(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
        if (w < 2 * r) {
            r = w / 2;
        }
        if (h < 2 * r) {
            r = h / 2;
        }
        context.beginPath();
        context.moveTo(x + r, y);
        context.arcTo(x + w, y, x + w, y + h, r);
        context.arcTo(x + w, y + h, x, y + h, r);
        context.arcTo(x, y + h, x, y, r);
        context.arcTo(x, y, x + w, y, r);
        context.closePath();
    }
    setOval() {
        switch (this.model.scaleType) {
            case ScaleType.FIT_START:
                this.context.ellipse(this.srcWidth * this.minScale / 2, this.srcHeight * this.minScale / 2, (this.srcWidth * this.minScale - this.model.borderWidth) / 2, (this.srcHeight * this.minScale - this.model.borderWidth) / 2, 0, 0, Math.PI * 2);
                break;
            case ScaleType.FIT_END:
                this.context.ellipse(this.model.uiWidth - this.srcWidth * this.minScale + this.srcWidth * this.minScale / 2, this.srcHeight * this.minScale / 2, (this.srcWidth * this.minScale - this.model.borderWidth) / 2, (this.srcHeight * this.minScale - this.model.borderWidth) / 2, 0, 0, Math.PI * 2);
                break;
            case ScaleType.FIT_CENTER:
                this.context.ellipse(this.model.uiWidth / 2, this.srcHeight * this.minScale / 2, (this.srcWidth * this.minScale - this.model.borderWidth) / 2, (this.srcHeight * this.minScale - this.model.borderWidth) / 2, 0, 0, Math.PI * 2);
                break;
            case ScaleType.CENTER:
                let x: number = this.model.uiWidth - this.srcWidth >= 0 ? this.model.uiWidth - this.srcWidth : 0;
                let y: number = this.model.uiHeight - this.srcHeight >= 0 ? this.model.uiHeight - this.srcHeight : 0;
                let w: number = this.model.uiWidth - this.srcWidth >= 0 ? this.srcWidth : this.model.uiWidth;
                let h: number = this.model.uiHeight - this.srcHeight >= 0 ? this.srcHeight : this.model.uiHeight;
                this.context.ellipse((x + w) / 2, (y + h) / 2, (w - this.model.borderWidth) / 2, (h - this.model.borderWidth) / 2, 0, 0, Math.PI * 2);
                break;
            case ScaleType.CENTER_CROP:
                this.context.ellipse(this.model.uiWidth / 2, this.model.uiHeight / 2, (this.model.uiWidth - this.model.borderWidth) / 2, (this.model.uiHeight - this.model.borderWidth) / 2, 0, 0, Math.PI * 2);
                break;
            case ScaleType.FIT_XY:
                this.context.ellipse(this.model.uiWidth / 2, this.model.uiHeight / 2, (this.srcWidth * this.scaleW - this.model.borderWidth) / 2, (this.srcHeight * this.scaleH - this.model.borderWidth) / 2, 0, 0, Math.PI * 2);
                break;
            case ScaleType.CENTER_INSIDE:
                this.context.ellipse(this.model.uiWidth / 2, this.model.uiHeight / 2, (this.srcWidth * this.minScale - this.model.borderWidth) / 2, (this.srcHeight * this.minScale - this.model.borderWidth) / 2, 0, 0, Math.PI * 2);
                break;
        }
    }
    setTileMode() {
        this.context.save();
        let countW: number = Math.ceil(this.model.uiWidth / this.srcWidth);
        let countH: number = Math.ceil(this.model.uiHeight / this.srcHeight);
        this.context.translate(-(countW * this.srcWidth - this.model.uiWidth) / 2, -(countH * this.srcHeight - this.model.uiHeight) / 2);
        for (let indexW = 0; indexW < countW; indexW++) {
            for (let indexH = 0; indexH < countH; indexH++) {
                this.context.save();
                if (this.model.tileMode == TileMode.MIRROR) {
                    if (indexW % 2 != 0 && indexH % 2 == 0) {
                        this.context.translate(this.srcWidth + indexW * this.srcWidth * 2, 0);
                        this.context.scale(-1, 1);
                    }
                    else if (indexW % 2 == 0 && indexH % 2 != 0) {
                        this.context.translate(0, this.srcHeight + indexH * this.srcHeight * 2);
                        this.context.scale(1, -1);
                    }
                    else if (indexW % 2 != 0 && indexH % 2 != 0) {
                        this.context.translate(this.srcWidth + indexW * this.srcWidth * 2, this.srcHeight + indexH * this.srcHeight * 2);
                        this.context.scale(-1, -1);
                    }
                }
                if (!!this.img) {
                    this.context.drawImage(this.img, indexW * this.srcWidth, indexH * this.srcHeight, this.srcWidth, this.srcHeight);
                    this.context.restore();
                }
            }
        }
        this.context.restore();
    }
    private getSvgData(callback: (svgData: Uint8Array) => void, context?: common.UIAbilityContext) {
        if (context != undefined) {
        }
        else {
            context = GlobalContext.getContext().getObject("context") as common.UIAbilityContext;
        }
        switch (this.model.srcType) {
            case SrcType.MEDIA:
                let mediaSrc: Resource = this.model.src as Resource;
                context.createModuleContext(mediaSrc.moduleName).resourceManager.getMediaContent(mediaSrc.id, (error: Error, value: Uint8Array) => {
                    callback(value);
                });
                break;
            case SrcType.RAWFILE:
                let rawfileSrc: string = this.model.src as string;
                context.resourceManager.getRawFileContent(rawfileSrc, (error: Error, value: Uint8Array) => {
                    callback(value);
                });
                break;
        }
    }
    private drawBitmap() {
        if (this.model.getIsSvg()) {
            this.getSvgData(svgData => {
                this.svgImageViewModel.getSVGPixelMap(svgData).then((pixmap: PixelMap) => {
                    this.img = pixmap;
                    this.img?.getImageInfo().then(imageInfo => {
                        this.srcWidth = imageInfo.size.width;
                        this.srcHeight = imageInfo.size.height;
                        this.scaleW = (this.model.uiWidth - this.model.padding * 2) / this.srcWidth;
                        this.scaleH = (this.model.uiHeight - this.model.padding * 2) / this.srcHeight;
                        this.context.strokeStyle = this.model.borderColor;
                        this.context.lineWidth = this.model.borderWidth;
                        this.context.save();
                        this.setImageCanvasTransform();
                        this.setImage();
                        this.context.restore();
                        this.context.globalCompositeOperation = 'destination-in';
                        this.setRect();
                        this.context.fill();
                        this.context.globalCompositeOperation = 'source-over';
                        this.setRect();
                        this.context.stroke();
                    });
                });
            }, this.model.getContext());
            return;
        }
        PixelMapUtils.createPixelMap(this.model.src, this.model.srcType, (pixelMap, width, height, error) => {
            if (!error) {
                this.img = pixelMap;
                this.srcWidth = width;
                this.srcHeight = height;
                this.scaleW = (this.model.uiWidth - this.model.padding * 2) / this.srcWidth;
                this.scaleH = (this.model.uiHeight - this.model.padding * 2) / this.srcHeight;
                this.context.strokeStyle = this.model.borderColor;
                this.context.lineWidth = this.model.borderWidth;
                this.context.save();
                this.setImageCanvasTransform();
                this.setImage();
                this.context.restore();
                this.context.globalCompositeOperation = 'destination-in';
                this.setRect();
                this.context.fill();
                this.context.globalCompositeOperation = 'source-over';
                this.setRect();
                this.context.stroke();
            }
        }, this.model.getContext());
    }
    private async drawOvals() {
        if (this.model.getIsSvg()) {
            this.getSvgData(svgData => {
                this.svgImageViewModel.getSVGPixelMap(svgData).then((pixmap: PixelMap) => {
                    this.img = pixmap;
                    this.img?.getImageInfo().then(imageInfo => {
                        this.srcWidth = imageInfo.size.width;
                        this.srcHeight = imageInfo.size.height;
                        this.scaleW = (this.model.uiWidth - this.model.padding * 2) / this.srcWidth;
                        this.scaleH = (this.model.uiHeight - this.model.padding * 2) / this.srcHeight;
                        this.context.strokeStyle = this.model.borderColor;
                        this.context.lineWidth = this.model.borderWidth;
                        this.context.save();
                        this.setImageCanvasTransform();
                        this.setImage();
                        this.context.restore();
                        this.context.globalCompositeOperation = 'destination-in';
                        this.setOval();
                        this.context.fill();
                        this.context.globalCompositeOperation = 'source-over';
                        this.setOval();
                        this.context.stroke();
                    });
                });
            }, this.model.getContext());
            return;
        }
        PixelMapUtils.createPixelMap(this.model.src, this.model.srcType, (pixelMap, width, height, error) => {
            if (!error) {
                this.img = pixelMap;
                this.srcWidth = width;
                this.srcHeight = height;
                this.scaleW = (this.model.uiWidth - this.model.padding * 2) / this.srcWidth;
                this.scaleH = (this.model.uiHeight - this.model.padding * 2) / this.srcHeight;
                this.context.strokeStyle = this.model.borderColor;
                this.context.lineWidth = this.model.borderWidth;
                this.context.save();
                this.setImageCanvasTransform();
                this.setImage();
                this.context.restore();
                this.context.globalCompositeOperation = 'destination-in';
                this.setOval();
                this.context.fill();
                this.context.globalCompositeOperation = 'source-over';
                this.setOval();
                this.context.stroke();
            }
        }, this.model.getContext());
    }
    private drawColors() {
        this.scaleW = this.model.uiWidth / this.model.colorWidth;
        this.scaleH = this.model.uiHeight / this.model.colorHeight;
        this.minScale = this.scaleW >= this.scaleH ? this.scaleH : this.scaleW;
        this.context.fillStyle = this.model.backgroundColor;
        this.context.strokeStyle = this.model.borderColor;
        this.context.lineWidth = this.model.borderWidth;
        switch (this.model.scaleType) {
            case ScaleType.FIT_START:
                this.context.fillRect(0, 0, this.model.colorWidth * this.minScale, this.model.colorHeight * this.minScale);
                this.context.globalCompositeOperation = 'destination-in';
                this.roundRect(this.context, this.model.borderWidth / 2, this.model.borderWidth / 2, this.model.colorWidth * this.minScale - this.model.borderWidth, this.model.colorHeight * this.minScale - this.model.borderWidth, this.model.cornerRadius);
                this.context.fill();
                this.context.globalCompositeOperation = 'source-over';
                this.roundRect(this.context, this.model.borderWidth / 2, this.model.borderWidth / 2, this.model.colorWidth * this.minScale - this.model.borderWidth, this.model.colorHeight * this.minScale - this.model.borderWidth, this.model.cornerRadius);
                this.context.stroke();
                break;
            case ScaleType.FIT_END:
                this.context.fillRect(this.model.uiWidth - this.model.colorWidth * this.minScale, this.model.uiHeight - this.model.colorHeight * this.minScale, this.model.colorWidth * this.minScale, this.model.colorHeight * this.minScale);
                this.context.globalCompositeOperation = 'destination-in';
                this.roundRect(this.context, this.model.uiWidth - this.model.colorWidth * this.minScale + this.model.borderWidth / 2, this.model.uiHeight - this.model.colorHeight * this.minScale + this.model.borderWidth / 2, this.model.colorWidth * this.minScale - this.model.borderWidth, this.model.colorHeight * this.minScale - this.model.borderWidth, this.model.cornerRadius);
                this.context.fill();
                this.context.globalCompositeOperation = 'source-over';
                this.roundRect(this.context, this.model.uiWidth - this.model.colorWidth * this.minScale + this.model.borderWidth / 2, this.model.uiHeight - this.model.colorHeight * this.minScale + this.model.borderWidth / 2, this.model.colorWidth * this.minScale - this.model.borderWidth, this.model.colorHeight * this.minScale - this.model.borderWidth, this.model.cornerRadius);
                this.context.stroke();
                break;
            case ScaleType.FIT_CENTER:
                this.context.fillRect((this.model.uiWidth - this.model.colorWidth * this.minScale) / 2, (this.model.uiHeight - this.model.colorHeight * this.minScale) / 2, this.model.colorWidth * this.minScale, this.model.colorHeight * this.minScale);
                this.context.globalCompositeOperation = 'destination-in';
                this.roundRect(this.context, (this.model.uiWidth - this.model.colorWidth * this.minScale) / 2 + this.model.borderWidth / 2, (this.model.uiHeight - this.model.colorHeight * this.minScale) / 2 + this.model.borderWidth / 2, this.model.colorWidth * this.minScale - this.model.borderWidth, this.model.colorHeight * this.minScale - this.model.borderWidth, this.model.cornerRadius);
                this.context.fill();
                this.context.globalCompositeOperation = 'source-over';
                this.roundRect(this.context, (this.model.uiWidth - this.model.colorWidth * this.minScale) / 2 + this.model.borderWidth / 2, (this.model.uiHeight - this.model.colorHeight * this.minScale) / 2 + this.model.borderWidth / 2, this.model.colorWidth * this.minScale - this.model.borderWidth, this.model.colorHeight * this.minScale - this.model.borderWidth, this.model.cornerRadius);
                this.context.stroke();
                break;
            case ScaleType.CENTER:
            case ScaleType.CENTER_CROP:
            case ScaleType.FIT_XY:
            case ScaleType.CENTER_INSIDE:
                this.context.fillRect(0, 0, this.model.uiWidth, this.model.uiHeight);
                this.context.globalCompositeOperation = 'destination-in';
                this.roundRect(this.context, this.model.borderWidth / 2, this.model.borderWidth / 2, this.model.uiWidth - this.model.borderWidth, this.model.uiHeight - this.model.borderWidth, this.model.cornerRadius);
                this.context.fill();
                this.context.globalCompositeOperation = 'source-over';
                this.roundRect(this.context, this.model.borderWidth / 2, this.model.borderWidth / 2, this.model.uiWidth - this.model.borderWidth, this.model.uiHeight - this.model.borderWidth, this.model.cornerRadius);
                this.context.stroke();
                break;
        }
        this.context.stroke();
    }
    private drawBackground() {
        this.bottomLayerContext.fillStyle = this.model.backgroundColor;
        this.bottomLayerContext.strokeStyle = this.model.borderColor;
        this.bottomLayerContext.lineWidth = this.model.borderWidth;
        this.bottomLayerContext.fillRect(0, 0, this.model.uiWidth, this.model.uiHeight);
        this.bottomLayerContext.globalCompositeOperation = 'destination-in';
        this.roundRect(this.bottomLayerContext, this.model.borderWidth / 2, this.model.borderWidth / 2, this.model.uiWidth - this.model.borderWidth, this.model.uiHeight - this.model.borderWidth, this.model.cornerRadius);
        this.bottomLayerContext.fill();
        this.bottomLayerContext.globalCompositeOperation = 'source-over';
        this.roundRect(this.bottomLayerContext, this.model.borderWidth / 2, this.model.borderWidth / 2, this.model.uiWidth - this.model.borderWidth, this.model.uiHeight - this.model.borderWidth, this.model.cornerRadius);
        this.bottomLayerContext.stroke();
    }
    render() {
        Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        If.create();
        if (this.model.typeValue == 'Bitmap') {
            If.branchId(0);
            Canvas.create(this.context);
            Canvas.width(this.model.uiWidth);
            Canvas.height(this.model.uiHeight);
            Canvas.onReady(() => {
                this.drawBitmap();
            });
            Canvas.pop();
        }
        else if (this.model.typeValue == 'Ovals') {
            If.branchId(1);
            Canvas.create(this.context);
            Canvas.width(this.model.uiWidth);
            Canvas.height(this.model.uiHeight);
            Canvas.onReady(() => {
                this.drawOvals();
            });
            Canvas.pop();
        }
        else if (this.model.typeValue == 'Color') {
            If.branchId(2);
            Canvas.create(this.context);
            Canvas.width(this.model.uiWidth);
            Canvas.height(this.model.uiHeight);
            Canvas.onReady(() => {
                this.drawColors();
            });
            Canvas.pop();
        }
        else if (this.model.typeValue == 'Background') {
            If.branchId(3);
            Stack.create();
            Stack.width(this.model.uiWidth);
            Stack.height(this.model.uiHeight);
            Canvas.create(this.bottomLayerContext);
            Canvas.onReady(() => {
                this.drawBackground();
            });
            Canvas.pop();
            Stack.create();
            Stack.padding(this.model.padding);
            Canvas.create(this.context);
            Canvas.onReady(() => {
                this.drawBitmap();
            });
            Canvas.pop();
            Stack.pop();
            Stack.pop();
        }
        else if (this.model.typeValue == 'SVG') {
            If.branchId(4);
            Canvas.create(this.context);
            Canvas.width(this.model.uiWidth);
            Canvas.height(this.model.uiHeight);
            Canvas.onReady(() => {
                let that = this;
                let timeoutID = setTimeout(() => {
                    that.drawBitmap();
                    clearTimeout(timeoutID);
                }, 100);
            });
            Canvas.pop();
        }
        If.pop();
        Flex.pop();
    }
}
export namespace RoundedImageName {
    export class Model {
        src: string | ArrayBuffer | Resource = '';
        srcType: SrcType | null = null;
        isSvg: boolean = false;
        typeValue: string = '';
        uiWidth: number = 0;
        uiHeight: number = 0;
        backgroundColor: string | CanvasGradient | CanvasPattern = '';
        tileMode: TileMode | null = null;
        scaleType: ScaleType | null = null;
        cornerRadius: number = 0;
        borderWidth: number = 0;
        borderColor: string | CanvasGradient | CanvasPattern = '';
        padding: number = 0;
        colorWidth: number = 0;
        colorHeight: number = 0;
        context: common.UIAbilityContext | undefined = undefined;
        constructor() {
        }
        setContext(context: common.UIAbilityContext) {
            this.context = context;
            return this;
        }
        getContext() {
            return this.context;
        }
        setImageSrc(src: string | ArrayBuffer | Resource): Model {
            this.src = src;
            return this;
        }
        getImageSrc(): string | Resource | ArrayBuffer {
            return this.src;
        }
        setSrcType(srcType: SrcType | null): Model {
            this.srcType = srcType;
            return this;
        }
        getSrcType(): SrcType | void {
            if (this.srcType !== null) {
                return this.srcType;
            }
        }
        setIsSvg(isSvg: boolean): Model {
            this.isSvg = isSvg;
            return this;
        }
        getIsSvg(): boolean {
            return this.isSvg;
        }
        setTypeValue(typeValue: string): Model {
            this.typeValue = typeValue;
            return this;
        }
        getTypeValue(): string {
            return this.typeValue;
        }
        setUiWidth(uiWidth: number): Model {
            this.uiWidth = uiWidth;
            return this;
        }
        getUiWidth(): number {
            return this.uiWidth;
        }
        setUiHeight(uiHeight: number): Model {
            this.uiHeight = uiHeight;
            return this;
        }
        getUiHeight(): number {
            return this.uiHeight;
        }
        setScaleType(scaleType: ScaleType): Model {
            this.scaleType = scaleType;
            return this;
        }
        getScaleType(): ScaleType | void {
            if (this.scaleType !== null) {
                return this.scaleType;
            }
        }
        setTileModeXY(tileMode: TileMode | null): Model {
            this.tileMode = tileMode;
            return this;
        }
        getTileModeXY(): TileMode | void {
            if (this.tileMode !== null) {
                return this.tileMode;
            }
        }
        setBackgroundColor(backgroundColor: string | CanvasGradient | CanvasPattern): Model {
            this.backgroundColor = backgroundColor;
            return this;
        }
        getBackgroundColor(): string | CanvasGradient | CanvasPattern {
            return this.backgroundColor;
        }
        setCornerRadius(cornerRadius: number): Model {
            this.cornerRadius = cornerRadius;
            return this;
        }
        getCornerRadius(): number {
            return this.cornerRadius;
        }
        setBorderWidth(borderWidth: number): Model {
            this.borderWidth = borderWidth;
            return this;
        }
        getBorderWidth(): number {
            return this.borderWidth;
        }
        setBorderColor(borderColor: string | CanvasGradient | CanvasPattern): Model {
            this.borderColor = borderColor;
            return this;
        }
        getBorderColor(): string | CanvasGradient | CanvasPattern {
            return this.borderColor;
        }
        setPadding(padding: number): Model {
            this.padding = padding;
            return this;
        }
        getPadding(): number {
            return this.padding;
        }
        setColorWidth(colorWidth: number): Model {
            this.colorWidth = colorWidth;
            return this;
        }
        getColorWidth(): number {
            return this.colorWidth;
        }
        setColorHeight(colorHeight: number): Model {
            this.colorHeight = colorHeight;
            return this;
        }
        getColorHeight(): number {
            return this.colorHeight;
        }
    }
}
