interface Index_Params {
    pixelMap?: PixelMap;
    arr?: Array<string>;
    select?: string;
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
import yolo5snapi from '@ohos.yolo5snapi';
import opencvnapi from '@ohos.opencvnapi';
import promptAction from '@ohos.promptAction';
import image from '@ohos.multimedia.image';
import bundleManager from '@ohos.bundle.bundleManager';
import hilog from '@ohos.hilog';
import fs from '@ohos.file.fs';
import { BusinessError } from '@ohos.base';
let context;
context = getContext(this) as any;
let bundleFlags = bundleManager.BundleFlag.GET_BUNDLE_INFO_DEFAULT;
function GetRealPath(bundleName: string) {
    let RealPath = "/data/app/el2/100/base/" + bundleName + "/haps/entry/files";
    return RealPath;
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__pixelMap = new ObservedPropertyObject(undefined, this, "pixelMap");
        this.__arr = new ObservedPropertyObject([], this, "arr");
        this.__select = new ObservedPropertySimple("", this, "select");
        this.bundleName = "";
        this.RealPath = "";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.pixelMap !== undefined) {
            this.pixelMap = params.pixelMap;
        }
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
        if (params.select !== undefined) {
            this.select = params.select;
        }
        if (params.bundleName !== undefined) {
            this.bundleName = params.bundleName;
        }
        if (params.RealPath !== undefined) {
            this.RealPath = params.RealPath;
        }
    }
    aboutToBeDeleted() {
        this.__pixelMap.aboutToBeDeleted();
        this.__arr.aboutToBeDeleted();
        this.__select.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __pixelMap: ObservedPropertyObject<PixelMap>;
    get pixelMap() {
        return this.__pixelMap.get();
    }
    set pixelMap(newValue: PixelMap) {
        this.__pixelMap.set(newValue);
    }
    private __arr: ObservedPropertyObject<Array<string>>;
    get arr() {
        return this.__arr.get();
    }
    set arr(newValue: Array<string>) {
        this.__arr.set(newValue);
    }
    private __select: ObservedPropertySimple<string>;
    get select() {
        return this.__select.get();
    }
    set select(newValue: string) {
        this.__select.set(newValue);
    }
    private bundleName;
    private RealPath;
    loadimg(path: string) {
        image.createImageSource(path).createPixelMap({
            sampleSize: 1,
            rotate: 0,
            editable: false
        }).then((pixelMap) => {
            this.pixelMap = pixelMap;
        });
    }
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
        Row.width('100%');
        Row.height('100%');
        Grid.create();
        Grid.rowsTemplate('1fr 1fr');
        Grid.columnsTemplate('1fr 1fr');
        Grid.columnsGap(25);
        Grid.rowsGap(25);
        GridItem.create();
        Column.create();
        If.create();
        if (undefined != this.pixelMap) {
            If.branchId(0);
            Image.create(this.pixelMap);
            Image.width("100%");
            Image.height("100%");
            Image.objectFit(ImageFit.Fill);
        }
        If.pop();
        Column.pop();
        GridItem.pop();
        GridItem.create();
        Column.create();
        Text.create("图片文件目录");
        Text.width("50%");
        Text.pop();
        ForEach.create("2", this, ObservedObject.GetRawObject(this.arr.slice(0, 5)), (item: number) => {
            Text.create(`${item} `);
            Text.fontSize(18);
            Text.width("50%");
            Text.onClick(() => {
                fs.rmdir(context.filesDir + "/out.bmp", (err: BusinessError) => {
                    if (err) {
                        console.info("rmdir failed with error message: " + err.message + ", error code: " + err.code);
                    }
                    else {
                        console.info("Directory deleted");
                    }
                });
                this.select = item.toString();
                this.loadimg(context.filesDir + "/" + this.select);
            });
            Text.pop();
        }, (item: number) => item.toString());
        ForEach.pop();
        Column.pop();
        GridItem.pop();
        GridItem.create();
        Column.create();
        Button.createWithLabel("图片尺寸转换");
        Button.margin(10);
        Button.onClick(() => {
            opencvnapi.opencvWithPromise(context.filesDir, this.select, 640, 640).then((result) => {
                promptAction.showToast({
                    message: result,
                    duration: 3000,
                });
            });
        });
        Button.pop();
        Button.createWithLabel("点击推理");
        Button.margin(10);
        Button.onClick(() => {
            yolo5snapi.Yolo5sWithPromise(this.RealPath + "/aaa.jpg").then((result) => {
                promptAction.showToast({
                    message: result,
                    duration: 3000,
                });
                fs.rmdir(context.filesDir + "/aaa.jpg", (err: BusinessError) => {
                    if (err) {
                        console.info("rmdir failed with error message: " + err.message + ", error code: " + err.code);
                    }
                    else {
                        console.info("Directory deleted");
                    }
                });
            });
        });
        Button.pop();
        Button.createWithLabel("显示结果");
        Button.margin(10);
        Button.onClick(() => {
            this.loadimg(context.filesDir + "/out.bmp");
        });
        Button.pop();
        Column.pop();
        GridItem.pop();
        GridItem.create();
        Column.create();
        Text.create("当前选择的图片:" + this.select);
        Text.pop();
        Button.createWithLabel("查看图片路径文件夹");
        Button.margin(10);
        Button.onClick(() => {
            fs.rmdir(context.filesDir + "/out.bmp", (err: BusinessError) => {
                if (err) {
                    console.info("rmdir failed with error message: " + err.message + ", error code: " + err.code);
                }
                else {
                    console.info("Directory deleted");
                }
                fs.listFile(context.filesDir).then((filenames) => {
                    console.info("listFile succeed");
                    promptAction.showToast({
                        message: 'listFile succeed',
                        duration: 2000,
                    });
                    for (let i = 0; i < filenames.length; i++) {
                        if (filenames[i] != "shader_cache") {
                            this.arr[i] = filenames[i];
                        }
                    }
                }).catch((err) => {
                    promptAction.showToast({
                        message: "listFile fails,list file failed with error message: " + err.message + ", error code: " + err.code,
                        duration: 2000,
                    });
                    console.info("list file failed with error message: " + err.message + ", error code: " + err.code);
                });
            });
        });
        Button.pop();
        Column.pop();
        GridItem.pop();
        Grid.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
