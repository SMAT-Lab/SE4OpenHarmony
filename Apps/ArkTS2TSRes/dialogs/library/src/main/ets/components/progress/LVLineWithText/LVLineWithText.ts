interface LVLineWithText_Params {
    settings?: RenderingContextSettings;
    context2D?: CanvasRenderingContext2D;
    controller?: LVLineWithTextController;
    percentValue?: number;
    compWidth?: number;
    compHeight?: number;
    pad?: number;
    lineWidth?: number;
    textSize?: number;
    canvasHasReady?: boolean;
    onReadyNext?: (() => void) | undefined;
    draw?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "LVLineWithText_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { LVLineWithTextController } from './LVLineWithTextController';
export class LVLineWithText extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.settings = new RenderingContextSettings(true);
        this.context2D = new CanvasRenderingContext2D(this.settings);
        this.__controller = new SynchedPropertyObjectTwoWay(params.controller, this, "controller");
        this.__percentValue = new SynchedPropertySimpleTwoWay(params.percentValue, this, "percentValue");
        this.compWidth = 0;
        this.compHeight = 0;
        this.pad = 5;
        this.lineWidth = 3;
        this.textSize = 30;
        this.canvasHasReady = false;
        this.onReadyNext = undefined;
        this.draw = () => {
            this.context2D.globalCompositeOperation = 'copy';
            this.context2D.strokeStyle = this.controller.getViewColor();
            this.context2D.fillStyle = this.controller.getTextColor();
            this.context2D.lineWidth = this.lineWidth;
            this.context2D.textBaseline = 'middle';
            this.context2D.font = this.textSize + 'px sans-serif';
            let text = this.percentValue + "%";
            let textWidth = this.context2D.measureText(text).width;
            if (this.percentValue == 0) {
                this.context2D.beginPath();
                this.context2D.moveTo(this.pad + textWidth, this.compHeight / 2);
                this.context2D.lineTo(this.compWidth - this.pad, this.compHeight / 2);
                this.context2D.stroke();
                this.context2D.fillText(text, this.pad, this.compHeight / 2);
            }
            else if (this.percentValue >= 100) {
                this.context2D.beginPath();
                this.context2D.moveTo(this.pad, this.compHeight / 2);
                this.context2D.lineTo(this.compWidth - this.pad - textWidth, this.compHeight / 2);
                this.context2D.stroke();
                this.context2D.fillText(text, this.compWidth - this.pad - textWidth, this.compHeight / 2);
            }
            else {
                let width = this.compWidth - 2 * this.pad - textWidth;
                this.context2D.beginPath();
                this.context2D.moveTo(this.pad, this.compHeight / 2);
                this.context2D.lineTo(Number.parseInt(this.pad + '') + Number.parseInt(width * this.percentValue / 100 + ''), this.compHeight / 2);
                this.context2D.moveTo(Number.parseInt(this.pad + '') + Number.parseInt(width * this.percentValue / 100 + '') + textWidth, this.compHeight / 2);
                this.context2D.lineTo(this.compWidth - this.pad, this.compHeight / 2);
                this.context2D.stroke();
                this.context2D.fillText(text, Number.parseInt(this.pad + '') + Number(width * this.percentValue / 100 + ''), this.compHeight / 2);
            }
        };
        this.updateWithValueParams(params);
        this.declareWatch("controller", this.watchLVLineWithTextController);
        this.declareWatch("percentValue", this.watchPercentValue);
    }
    updateWithValueParams(params: LVLineWithText_Params) {
        if (params.settings !== undefined) {
            this.settings = params.settings;
        }
        if (params.context2D !== undefined) {
            this.context2D = params.context2D;
        }
        if (params.compWidth !== undefined) {
            this.compWidth = params.compWidth;
        }
        if (params.compHeight !== undefined) {
            this.compHeight = params.compHeight;
        }
        if (params.pad !== undefined) {
            this.pad = params.pad;
        }
        if (params.lineWidth !== undefined) {
            this.lineWidth = params.lineWidth;
        }
        if (params.textSize !== undefined) {
            this.textSize = params.textSize;
        }
        if (params.canvasHasReady !== undefined) {
            this.canvasHasReady = params.canvasHasReady;
        }
        if (params.onReadyNext !== undefined) {
            this.onReadyNext = params.onReadyNext;
        }
        if (params.draw !== undefined) {
            this.draw = params.draw;
        }
    }
    aboutToBeDeleted() {
        this.__controller.aboutToBeDeleted();
        this.__percentValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private settings: RenderingContextSettings;
    private context2D: CanvasRenderingContext2D;
    private __controller: SynchedPropertySimpleOneWay<LVLineWithTextController>;
    get controller() {
        return this.__controller.get();
    }
    set controller(newValue: LVLineWithTextController) {
        this.__controller.set(newValue);
    }
    private __percentValue: SynchedPropertySimpleTwoWay<number>;
    get percentValue() {
        return this.__percentValue.get();
    }
    set percentValue(newValue: number) {
        this.__percentValue.set(newValue);
    }
    private compWidth: number;
    private compHeight: number;
    private pad: number;
    private lineWidth: number;
    private textSize: number;
    private canvasHasReady: boolean;
    private onReadyNext: (() => void) | undefined;
    aboutToAppear() {
        this.userConfigs();
    }
    watchLVLineWithTextController() {
    }
    userConfigs() {
        if (this.controller.getPadding() != -1 && this.controller.getPadding() > 0) {
            this.pad = this.controller.getPadding();
        }
        if (this.controller.getLineWidth() != -1 && this.controller.getLineWidth() > 0) {
            this.lineWidth = this.controller.getLineWidth();
        }
        if (this.controller.getTextSize() != -1 && this.controller.getTextSize() > 0) {
            this.textSize = this.controller.getTextSize();
        }
    }
    watchPercentValue() {
        this.drawExecute();
    }
    render() {
        Canvas.create(this.context2D);
        Canvas.onReady(() => {
            this.canvasHasReady = true;
            if (this.onReadyNext != undefined) {
                this.onReadyNext();
                this.onReadyNext = undefined;
            }
        });
        Canvas.onAreaChange((oldValue, newValue) => {
            this.compWidth = newValue.width as number;
            this.compHeight = newValue.height as number;
            this.drawExecute();
        });
        Canvas.pop();
    }
    /**
     * 为了保证执行方法在canvas的onReay之后
     * 如果onReady未初始化,则将最新的绘制生命周期绑定到onReadNext上
     * 待onReady执行的时候执行
     * @param nextFunction 下一个方法
     */
    runNextFunction(nextFunction: () => void) {
        if (!this.canvasHasReady) {
            // canvas未初始化完成
            this.onReadyNext = nextFunction;
        }
        else {
            nextFunction();
        }
    }
    drawExecute() {
        this.runNextFunction(this.draw);
    }
    private draw;
}
