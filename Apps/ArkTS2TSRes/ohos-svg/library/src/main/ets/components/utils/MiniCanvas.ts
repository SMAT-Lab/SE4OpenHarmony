interface MiniCanvas_Params {
    miniCanvas?: CanvasImpl;
    attribute?: MiniCanvasAttribute;
    onDraw?: (canvas: ICanvas) => void;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MiniCanvas_" + ++__generate__Id;
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
import { MiniCanvasAttribute, CanvasImpl, ICanvas } from './mini_canvas';
export class MiniCanvas extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.miniCanvas = undefined;
        this.attribute = undefined;
        this.onDraw = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MiniCanvas_Params) {
        if (params.miniCanvas !== undefined) {
            this.miniCanvas = params.miniCanvas;
        }
        if (params.attribute !== undefined) {
            this.attribute = params.attribute;
        }
        if (params.onDraw !== undefined) {
            this.onDraw = params.onDraw;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private miniCanvas: CanvasImpl;
    private attribute: MiniCanvasAttribute;
    private onDraw: (canvas: ICanvas) => void;
    render() {
        Canvas.create(this.miniCanvas.context);
        Canvas.width(this.attribute.width);
        Canvas.height(this.attribute.height);
        Canvas.backgroundColor(this.attribute.background);
        Canvas.id("really_mini_canvas");
        Canvas.onReady(() => {
            this.onDraw?.call(this, this.miniCanvas);
        });
        Canvas.onClick((event) => {
            this.attribute.clickListener?.call(this, event);
        });
        Canvas.onTouch((event) => {
            this.attribute.touchListener?.call(this, event);
        });
        Canvas.pop();
    }
    aboutToAppear() {
        this.attribute = MiniCanvasAttribute.checkAttribute(this.attribute);
        var setting = new RenderingContextSettings(this.attribute.antiAlias);
        var context = new CanvasRenderingContext2D(setting);
        this.miniCanvas = new CanvasImpl(context, this.attribute);
    }
}
