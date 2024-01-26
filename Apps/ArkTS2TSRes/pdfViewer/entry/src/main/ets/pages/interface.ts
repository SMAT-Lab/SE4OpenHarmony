let __generate__Id: number = 0;
function generateId(): string {
    return "interface_" + ++__generate__Id;
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
export interface RenderTask {
    promise: Promise<void>;
    cancel: () => void;
}
export interface RenderContext {
    canvasContext: CanvasContext;
    viewport: Viewport;
}
export class CanvasContext extends CanvasRenderingContext2D {
    canvas?: Cavans = {};
}
export interface Cavans {
    height?: number;
    width?: number;
}
export interface Viewport {
    height: number;
    offsetX: number;
    offsetY: number;
    rotation: number;
    scale: number;
    width: number;
    transform: Array<number>;
    viewBox: Array<number>;
}
export interface Options {
    scale: number;
}
export interface Info {
    $ID: number;
    $rect: string;
    $type: string;
}
export interface PDF {
    getPage(pageNumber: number): Promise<Page>;
}
export interface LoadingTask {
    promise?: Promise<PDF>;
}
export interface Page {
    getViewport(options: Options): Viewport;
    render(renderContext: RenderContext): RenderTask;
}
