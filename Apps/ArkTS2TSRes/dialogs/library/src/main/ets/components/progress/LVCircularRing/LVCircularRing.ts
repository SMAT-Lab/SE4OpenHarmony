interface LVCircularRing_Params {
    settings?: RenderingContextSettings;
    context2D?: CanvasRenderingContext2D;
    controller?: LVCircularRingController;
    animateManager?: AnimateManager;
    compWidth?: number;
    compHeight?: number;
    minWidth?: number;
    pad?: number;
    lineWidth?: number;
    canvasHasReady?: boolean;
    onReadyNext?: (() => void) | undefined;
    draw?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "LVCircularRing_" + ++__generate__Id;
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
import { LVCircularRingController } from './LVCircularRingController';
import { AnimateManager, Switch } from '../base/AnimateManager';
export class LVCircularRing extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.settings = new RenderingContextSettings(true);
        this.context2D = new CanvasRenderingContext2D(this.settings);
        this.__controller = new SynchedPropertyObjectTwoWay(params.controller, this, "controller");
        this.__animateManager = new SynchedPropertyObjectTwoWay(params.animateManager, this, "animateManager");
        this.compWidth = 0;
        this.compHeight = 0;
        this.minWidth = 0;
        this.pad = 5;
        this.lineWidth = 8;
        this.canvasHasReady = false;
        this.onReadyNext = undefined;
        this.draw = () => {
            // 忽略上一次的绘制结果，只显示下面绘制的内容
            this.context2D.globalCompositeOperation = 'copy';
            this.context2D.beginPath();
            this.context2D.lineWidth = this.lineWidth; //圆环宽度
            this.context2D.strokeStyle = this.controller.getViewColor();
            this.context2D.arc(this.compWidth / 2, this.compHeight / 2, // 圆心
            this.minWidth / 2 - this.lineWidth / 2 - this.pad, // 半径
            0, Math.PI * 2); // 起始点和绘制弧度
            this.context2D.stroke();
            // 切换回默认显示模式，否则上面绘制的图像将不显示
            this.context2D.globalCompositeOperation = 'source-over';
            this.context2D.beginPath();
            this.context2D.lineWidth = 8;
            this.context2D.strokeStyle = this.controller.getBarColor();
            this.context2D.arc(this.compWidth / 2, this.compHeight / 2, this.minWidth / 2 - this.lineWidth / 2 - this.pad, this.controller.getAnimValue() / 360 * Math.PI * 2, (this.controller.getAnimValue() + 100) / 360 * Math.PI * 2);
            this.context2D.stroke();
        };
        this.updateWithValueParams(params);
        this.declareWatch("controller", this.watchLVCircularRingController);
        this.declareWatch("animateManager", this.watchAnimateManager);
    }
    updateWithValueParams(params: LVCircularRing_Params) {
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
        if (params.minWidth !== undefined) {
            this.minWidth = params.minWidth;
        }
        if (params.pad !== undefined) {
            this.pad = params.pad;
        }
        if (params.lineWidth !== undefined) {
            this.lineWidth = params.lineWidth;
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
        this.__animateManager.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private settings: RenderingContextSettings;
    private context2D: CanvasRenderingContext2D;
    private __controller: SynchedPropertySimpleOneWay<LVCircularRingController>;
    get controller() {
        return this.__controller.get();
    }
    set controller(newValue: LVCircularRingController) {
        this.__controller.set(newValue);
    }
    private __animateManager: SynchedPropertySimpleOneWay<AnimateManager>;
    get animateManager() {
        return this.__animateManager.get();
    }
    set animateManager(newValue: AnimateManager) {
        this.__animateManager.set(newValue);
    }
    private compWidth: number;
    private compHeight: number;
    private minWidth: number;
    private pad: number;
    private lineWidth: number;
    private canvasHasReady: boolean;
    private onReadyNext: (() => void) | undefined;
    aboutToAppear() {
        this.userConfigs();
    }
    watchLVCircularRingController() {
    }
    userConfigs() {
        if (this.controller.getPadding() != -1 && this.controller.getPadding() > 0) {
            this.pad = this.controller.getPadding();
        }
    }
    watchAnimateManager() {
        if (this.animateManager) {
            if (Switch.OPEN == this.animateManager.animatedSwitch) {
                if (this.animateManager.duration) {
                    this.startAnimWithTime(this.animateManager.duration);
                }
                else {
                    this.startAnim();
                }
            }
            else if (Switch.CLOSE == this.animateManager.animatedSwitch) {
                this.stopAnim();
            }
        }
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
            this.minWidth = Math.min(this.compWidth, this.compHeight);
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
    startAnim() {
        this.controller.startViewAnim(500, this.draw);
    }
    startAnimWithTime(time: number) {
        this.controller.startViewAnim(time, this.draw);
    }
    stopAnim() {
        this.controller.stopViewAnim(this.draw);
    }
}
