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

import {LVLineWithTextController} from './LVLineWithTextController'

@Component
export struct LVLineWithText {
    private settings: RenderingContextSettings = new RenderingContextSettings(true)
    private context2D: CanvasRenderingContext2D = new CanvasRenderingContext2D(this.settings)
    @Watch('watchLVLineWithTextController') @Link controller:LVLineWithTextController;
    @Watch('watchPercentValue') @Link percentValue:number;

    compWidth:number= 0
    compHeight:number = 0
    pad:number = 5
    lineWidth:number = 3
    textSize:number = 30

    private canvasHasReady: boolean = false;
    private onReadyNext: (() => void) | undefined = undefined


    aboutToAppear(){
        this.userConfigs();
    }
    watchLVLineWithTextController(){

    }
    userConfigs(){
        if(this.controller.getPadding()!=-1 && this.controller.getPadding() > 0) {
            this.pad = this.controller.getPadding()
        }
        if(this.controller.getLineWidth()!=-1 && this.controller.getLineWidth() > 0) {
            this.lineWidth = this.controller.getLineWidth()
        }
        if(this.controller.getTextSize()!=-1 && this.controller.getTextSize() > 0) {
            this.textSize = this.controller.getTextSize()
        }
    }


    watchPercentValue(){
        this.drawExecute();
    }

    build() {
        Canvas(this.context2D)
            .onReady(() => {
                this.canvasHasReady = true;
                if (this.onReadyNext != undefined) {
                    this.onReadyNext()
                    this.onReadyNext = undefined;
                }
            })
            .onAreaChange((oldValue, newValue) => {
                this.compWidth = newValue.width as number;
                this.compHeight = newValue.height as number
                this.drawExecute()
            })
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
        } else {
            nextFunction();
        }
    }



    drawExecute() {
        this.runNextFunction(this.draw);
    }

    draw =()=>{
        this.context2D.globalCompositeOperation = 'copy';
        this.context2D.strokeStyle = this.controller.getViewColor()
        this.context2D.fillStyle = this.controller.getTextColor();
        this.context2D.lineWidth = this.lineWidth;
        this.context2D.textBaseline = 'middle';
        this.context2D.font = this.textSize + 'px sans-serif';

        let text = this.percentValue + "%";
        let textWidth = this.context2D.measureText(text).width;

        if (this.percentValue == 0) {
            this.context2D.beginPath()
            this.context2D.moveTo(this.pad + textWidth, this.compHeight / 2);
            this.context2D.lineTo(this.compWidth - this.pad, this.compHeight / 2);
            this.context2D.stroke();
            this.context2D.fillText(text, this.pad, this.compHeight / 2);
        } else if (this.percentValue >= 100) {
            this.context2D.beginPath()
            this.context2D.moveTo(this.pad, this.compHeight / 2);
            this.context2D.lineTo(this.compWidth - this.pad - textWidth, this.compHeight / 2);
            this.context2D.stroke();
            this.context2D.fillText(text, this.compWidth - this.pad - textWidth, this.compHeight / 2);
        } else {
            let width = this.compWidth - 2 * this.pad - textWidth;
            this.context2D.beginPath()
            this.context2D.moveTo(this.pad, this.compHeight / 2);
            this.context2D.lineTo(Number.parseInt(this.pad+'') + Number.parseInt(width * this.percentValue / 100+''), this.compHeight / 2);
            this.context2D.moveTo(Number.parseInt(this.pad+'') + Number.parseInt(width * this.percentValue / 100 +'') + textWidth, this.compHeight / 2);
            this.context2D.lineTo(this.compWidth - this.pad, this.compHeight / 2);
            this.context2D.stroke();
            this.context2D.fillText(text, Number.parseInt(this.pad+'') + Number(width * this.percentValue / 100 +''), this.compHeight / 2);
        }

    }
}


