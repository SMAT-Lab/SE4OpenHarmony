interface Index_Params {
    message?: string;
    settings?: RenderingContextSettings;
    context?: CanvasRenderingContext2D;
    save_context?: CanvasRenderingContext2D;
    bundleName?;
    RealPath?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/* Copyright 2023 Unionman Technology Co., Ltd.
 *
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
 *
 */
import image from '@ohos.multimedia.image';
import fs from '@ohos.file.fs';
import opencvnapi from '@ohos.opencvnapi';
import lenetNapi from '@ohos.lenetNapi';
import promptAction from '@ohos.promptAction';
import bundleManager from '@ohos.bundle.bundleManager';
import hilog from '@ohos.hilog';
let bundleFlags = bundleManager.BundleFlag.GET_BUNDLE_INFO_DEFAULT;
let mcontext = getContext() as any;
function GetRealPath(bundleName: string) {
    let RealPath = "/data/app/el2/100/base/" + bundleName + "/haps/entry/files";
    return RealPath;
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('手写数字识别', this, "message");
        this.settings = new RenderingContextSettings(true);
        this.context = new CanvasRenderingContext2D(this.settings);
        this.save_context = new CanvasRenderingContext2D(this.settings);
        this.bundleName = "";
        this.RealPath = "";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.settings !== undefined) {
            this.settings = params.settings;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
        if (params.save_context !== undefined) {
            this.save_context = params.save_context;
        }
        if (params.bundleName !== undefined) {
            this.bundleName = params.bundleName;
        }
        if (params.RealPath !== undefined) {
            this.RealPath = params.RealPath;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private settings: RenderingContextSettings;
    private context: CanvasRenderingContext2D;
    private save_context: CanvasRenderingContext2D;
    private bundleName;
    private RealPath;
    aboutToAppear() {
        try {
            bundleManager.getBundleInfoForSelf(bundleFlags).then((data) => {
                hilog.info(0x0000, 'testTag', 'getBundleInfoForSelf successfully. Data: %{public}s', JSON.stringify(data));
                this.bundleName = data.name;
                this.RealPath = GetRealPath(this.bundleName);
            }).catch(err => {
                hilog.error(0x0000, 'testTag', 'getBundleInfoForSelf failed. Cause: %{public}s', err.message);
            });
        }
        catch (err) {
            hilog.error(0x0000, 'testTag', 'getBundleInfoForSelf failed: %{public}s', err.message);
        }
    }
    render() {
        Row.create();
        Column.create();
        Column.height('100%');
        Grid.create();
        Grid.rowsTemplate('1fr');
        Grid.columnsTemplate('1fr 1fr');
        Grid.columnsGap(25);
        Grid.rowsGap(25);
        GridItem.create();
        Column.create();
        Text.create(this.message);
        Text.fontSize(40);
        Text.pop();
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Canvas.create(this.context);
        Canvas.width(280);
        Canvas.height(280);
        Canvas.onReady(() => {
            this.context.fillStyle = Color.Black.toString();
            this.context.fillRect(0, 0, 280, 280);
            this.save_context.fillStyle = Color.Black.toString();
            this.save_context.fillRect(0, 0, 28, 28);
        });
        Canvas.onTouch((data) => {
            if (data.touches[0].type === 0) {
                this.context.beginPath();
                this.save_context.beginPath();
                this.context.moveTo(data.touches[0].x, data.touches[0].y);
                this.save_context.moveTo(data.touches[0].x / 10, data.touches[0].y / 10);
            }
            this.context.fillStyle = Color.White.toString();
            this.context.strokeStyle = Color.White.toString();
            this.save_context.fillStyle = Color.White.toString();
            this.save_context.strokeStyle = Color.White.toString();
            console.info("siteid" + JSON.stringify(data.touches[0]));
            this.context.lineTo(data.touches[0].x, data.touches[0].y);
            this.save_context.lineTo(data.touches[0].x / 10, data.touches[0].y / 10);
            console.info("site" + data.touches[0].x + "y:" + data.touches[0].y);
            this.context.stroke();
            this.save_context.stroke();
        });
        Canvas.pop();
        Flex.pop();
        Column.pop();
        GridItem.pop();
        GridItem.create();
        Column.create();
        Column.width('100%');
        Text.create("输入预览");
        Text.pop();
        Canvas.create(this.save_context);
        Canvas.width(28);
        Canvas.height(28);
        Canvas.margin(10);
        Canvas.pop();
        Button.createWithLabel("保存并图片二值化");
        Button.margin(10);
        Button.onClick(() => {
            fs.rmdir(mcontext.filesDir + "/aaa.jpg", (err) => {
                if (err) {
                    console.info("rmdir failed with error message: " + err.message + ", error code: " + err.code);
                }
                else {
                    console.info("Directory deleted");
                }
            });
            let imagePackerApi = image.createImagePacker();
            let pixelMap = this.save_context.getPixelMap(0, 0, 28, 28);
            let packOpts: image.PackingOption = { format: "image/jpeg", quality: 98 };
            imagePackerApi.packing(pixelMap, packOpts).then((data: ArrayBuffer) => {
                let filePath = mcontext.filesDir + "/test.jpg";
                let file = fs.openSync(filePath, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
                fs.write(file.fd, data).then((writeLen) => {
                    opencvnapi.imageTo1DWithPromise(mcontext.filesDir + "/test.jpg").then((result) => {
                        promptAction.showToast({
                            message: result,
                            duration: 1000,
                        });
                    });
                    console.info("write data to file succeed and size is:" + writeLen);
                    fs.closeSync(file);
                }).catch((err) => {
                    console.info("write data to file failed with error message: " + err.message + ", error code: " + err.code);
                });
            }).catch((error) => {
                console.error('Failed to pack the image. And the error is: ' + error);
            });
        });
        Button.pop();
        Button.createWithLabel("清理画布");
        Button.margin(10);
        Button.onClick(() => {
            this.context.fillStyle = Color.Black.toString();
            this.context.fillRect(0, 0, 280, 280);
            this.save_context.fillStyle = Color.Black.toString();
            this.save_context.fillRect(0, 0, 28, 28);
        });
        Button.pop();
        Button.createWithLabel("推理");
        Button.margin(10);
        Button.onClick(() => {
            fs.rmdir(mcontext.filesDir + "/test.jpg", (err) => {
                if (err) {
                    console.info("rmdir failed with error message: " + err.message + ", error code: " + err.code);
                }
                else {
                    console.info("Directory deleted");
                }
            });
            lenetNapi.lenetWithPromise(this.RealPath + "/aaa.jpg").then((result) => {
                promptAction.showToast({
                    message: result,
                    duration: 3000,
                });
            });
        });
        Button.pop();
        Column.pop();
        GridItem.pop();
        Grid.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
