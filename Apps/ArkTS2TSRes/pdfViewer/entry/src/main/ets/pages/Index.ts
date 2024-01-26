interface Index_Params {
    settings?: RenderingContextSettings;
    context?: CanvasRenderingContext2D;
    ctx?: CanvasContext;
    canvasWidth?: number;
    canvasHeight?: number;
    scroller?: Scroller;
    loadingTask?: ESObject;
    gloContext?: Context;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
import { getDocument, PDFWorker } from '@ohos/pdfjs';
import { ScreenUtil } from './ScreenUtil';
import router from '@ohos.router';
import { RenderTask, Viewport, Options, CanvasContext, PDF, Page, LoadingTask, RenderContext } from './interface';
import { GlobalContext } from './globalThis';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.settings = new RenderingContextSettings(true);
        this.context = new CanvasRenderingContext2D(this.settings);
        this.ctx = new CanvasRenderingContext2D(this.settings);
        this.__canvasWidth = new ObservedPropertySimple(100, this, "canvasWidth");
        this.__canvasHeight = new ObservedPropertySimple(100, this, "canvasHeight");
        this.scroller = new Scroller();
        this.loadingTask = undefined;
        this.gloContext = GlobalContext.getContext().getObject("context") as Context;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.settings !== undefined) {
            this.settings = params.settings;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
        if (params.ctx !== undefined) {
            this.ctx = params.ctx;
        }
        if (params.canvasWidth !== undefined) {
            this.canvasWidth = params.canvasWidth;
        }
        if (params.canvasHeight !== undefined) {
            this.canvasHeight = params.canvasHeight;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.loadingTask !== undefined) {
            this.loadingTask = params.loadingTask;
        }
        if (params.gloContext !== undefined) {
            this.gloContext = params.gloContext;
        }
    }
    aboutToBeDeleted() {
        this.__canvasWidth.aboutToBeDeleted();
        this.__canvasHeight.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private settings: RenderingContextSettings;
    private context: CanvasRenderingContext2D;
    private ctx: CanvasContext;
    private __canvasWidth: ObservedPropertySimple<number>;
    get canvasWidth() {
        return this.__canvasWidth.get();
    }
    set canvasWidth(newValue: number) {
        this.__canvasWidth.set(newValue);
    }
    private __canvasHeight: ObservedPropertySimple<number>;
    get canvasHeight() {
        return this.__canvasHeight.get();
    }
    set canvasHeight(newValue: number) {
        this.__canvasHeight.set(newValue);
    }
    private scroller: Scroller;
    private loadingTask: any;
    private gloContext: Context;
    //private width:number = 1024
    //private height = 768
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Scroll.create(this.scroller);
        Scroll.width("70%");
        Scroll.height("90%");
        Column.create({ space: 1 });
        Column.width("100%");
        Column.height("100%");
        Button.createWithLabel('测试image2pdf接口响应');
        Button.onClick(() => {
            router.pushUrl({ url: "pages/image2pdfDemo" });
        });
        Button.pop();
        Canvas.create(this.context);
        Canvas.id("cvssize");
        Canvas.width("100%");
        Canvas.height("100%");
        Canvas.onReady(() => {
            let size = ScreenUtil.getSize("cvssize");
            this.canvasWidth = px2vp(size[0]);
            this.canvasHeight = px2vp(size[1]);
        });
        Canvas.pop();
        Column.pop();
        Scroll.pop();
        /*
        .onReady(() => {
          const color = new ArrayBuffer(100 * 100 * 4);
          let bufferArr = new Uint8ClampedArray(color);
          bufferArr.fill(122)
          let opts = { editable: true, pixelFormat: 3, size: { height: 100, width: 100 } }
          image.createPixelMap(color, opts)
            .then((pixelmap) => {
              this.context.drawImage(pixelmap, 100, 100)
            })
        })
        */
        Button.createWithLabel('Ok', { type: ButtonType.Normal, stateEffect: true });
        /*
        .onReady(() => {
          const color = new ArrayBuffer(100 * 100 * 4);
          let bufferArr = new Uint8ClampedArray(color);
          bufferArr.fill(122)
          let opts = { editable: true, pixelFormat: 3, size: { height: 100, width: 100 } }
          image.createPixelMap(color, opts)
            .then((pixelmap) => {
              this.context.drawImage(pixelmap, 100, 100)
            })
        })
        */
        Button.borderRadius(8);
        /*
        .onReady(() => {
          const color = new ArrayBuffer(100 * 100 * 4);
          let bufferArr = new Uint8ClampedArray(color);
          bufferArr.fill(122)
          let opts = { editable: true, pixelFormat: 3, size: { height: 100, width: 100 } }
          image.createPixelMap(color, opts)
            .then((pixelmap) => {
              this.context.drawImage(pixelmap, 100, 100)
            })
        })
        */
        Button.width(160);
        /*
        .onReady(() => {
          const color = new ArrayBuffer(100 * 100 * 4);
          let bufferArr = new Uint8ClampedArray(color);
          bufferArr.fill(122)
          let opts = { editable: true, pixelFormat: 3, size: { height: 100, width: 100 } }
          image.createPixelMap(color, opts)
            .then((pixelmap) => {
              this.context.drawImage(pixelmap, 100, 100)
            })
        })
        */
        Button.height(50);
        /*
        .onReady(() => {
          const color = new ArrayBuffer(100 * 100 * 4);
          let bufferArr = new Uint8ClampedArray(color);
          bufferArr.fill(122)
          let opts = { editable: true, pixelFormat: 3, size: { height: 100, width: 100 } }
          image.createPixelMap(color, opts)
            .then((pixelmap) => {
              this.context.drawImage(pixelmap, 100, 100)
            })
        })
        */
        Button.backgroundColor('#FF0000');
        /*
        .onReady(() => {
          const color = new ArrayBuffer(100 * 100 * 4);
          let bufferArr = new Uint8ClampedArray(color);
          bufferArr.fill(122)
          let opts = { editable: true, pixelFormat: 3, size: { height: 100, width: 100 } }
          image.createPixelMap(color, opts)
            .then((pixelmap) => {
              this.context.drawImage(pixelmap, 100, 100)
            })
        })
        */
        Button.onClick(() => {
            this.getDocumentFromResource("rawfile/icon.pdf");
        });
        /*
        .onReady(() => {
          const color = new ArrayBuffer(100 * 100 * 4);
          let bufferArr = new Uint8ClampedArray(color);
          bufferArr.fill(122)
          let opts = { editable: true, pixelFormat: 3, size: { height: 100, width: 100 } }
          image.createPixelMap(color, opts)
            .then((pixelmap) => {
              this.context.drawImage(pixelmap, 100, 100)
            })
        })
        */
        Button.pop();
        Button.createWithLabel('跳转到 jspdfDemo', { type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(8);
        Button.margin(20);
        Button.fontSize(15);
        Button.fontWeight(FontWeight.Bold);
        Button.margin({ top: 32 });
        Button.padding({ left: 10 });
        Button.width('150');
        Button.height('50');
        Button.onClick(() => {
            router.pushUrl({ url: "pages/jspdfDemo" });
        });
        Button.pop();
        Flex.pop();
    }
    getDocumentFromResource(pdfFilePath: string) {
        this.gloContext.resourceManager.getRawFileContent(pdfFilePath, (error: Error, value: Uint8Array) => {
            if (error != null) {
                console.log(error.message);
            }
            else {
                this.getPDFDocument(value);
            }
        });
    }
    getPDFDocument(pdfFile: Uint8Array) {
        if (!!!this.loadingTask) {
            this.loadingTask = getDocument(pdfFile);
        }
        if (this.loadingTask && this.loadingTask.promise) {
            this.loadingTask.promise.then((pdf: PDF) => {
                let pageNumber = 1;
                pdf.getPage(pageNumber).then((page: Page) => {
                    this.ctx = this.context as CanvasContext;
                    this.ctx.canvas = {};
                    this.ctx.canvas.width = this.canvasWidth; //this.ctx.canvas.getBoundingClientRect().width
                    this.ctx.canvas.height = this.canvasHeight; //this.ctx.canvas.getBoundingClientRect().height
                    let options: Options = { scale: 1 };
                    let wScale = px2vp(this.ctx.canvas.width) / px2vp(page.getViewport(options).width); //page PDFPageProxy
                    let hScale = px2vp(this.ctx.canvas.height) / page.getViewport(options).height; //page PDFPageProxy
                    this.canvasHeight = page.getViewport(options).height * wScale;
                    let scale = wScale; //Math.min(wScale,hScale) //wScale
                    let options2: Options = { scale: scale };
                    let viewport: Viewport = page.getViewport(options2);
                    let renderContext: RenderContext = {
                        canvasContext: this.ctx,
                        viewport: viewport
                    };
                    let renderTask: RenderTask = page.render(renderContext);
                    renderTask.promise.then(() => {
                    });
                });
            });
        }
    }
}
loadDocument(new Index("1", undefined, {}));
