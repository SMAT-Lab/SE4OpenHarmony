interface Toast_advance_Params {
    comp_visibility?: Visibility;
    cur_countDown?: number;
    mainRenderingSettings?: RenderingContextSettings;
    mainCanvasRenderingContext?: CanvasRenderingContext2D;
    animateName?: string;
    animatePath?: string;
}
interface Toast_successOrFailed_Params {
    content?: string;
    comp_visibility?: Visibility;
    imgURL?: string;
}
interface Toast_loading_Params {
    content?: string;
    comp_visibility?: Visibility;
    mainRenderingSettings?: RenderingContextSettings;
    mainCanvasRenderingContext?: CanvasRenderingContext2D;
    animateName?: string;
    animatePath?: string;
}
interface Toast_default_Params {
    content?: string;
    comp_visibility?: Visibility;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Toast_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Institute of Software, Chinese Academy of Sciences.
 * Licensed under the Apache License,Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import lottie from '@ohos/lottie';
export class Toast_default extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__content = new SynchedPropertySimpleTwoWay(params.content, this, "content");
        this.__comp_visibility = new SynchedPropertySimpleTwoWay(params.comp_visibility, this, "comp_visibility");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Toast_default_Params) {
    }
    aboutToBeDeleted() {
        this.__content.aboutToBeDeleted();
        this.__comp_visibility.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __content: SynchedPropertySimpleTwoWay<string>;
    get content() {
        return this.__content.get();
    }
    set content(newValue: string) {
        this.__content.set(newValue);
    }
    private __comp_visibility: SynchedPropertySimpleTwoWay<Visibility>;
    get comp_visibility() {
        return this.__comp_visibility.get();
    }
    set comp_visibility(newValue: Visibility) {
        this.__comp_visibility.set(newValue);
    }
    render() {
        Row.create();
        Row.align(Alignment.Center);
        Row.borderRadius(10);
        Row.width(200);
        Row.height(80);
        Row.backgroundColor(Color.Black);
        Row.opacity(0.7);
        Row.visibility(this.comp_visibility);
        Row.onAppear(() => {
            setInterval(() => {
                this.comp_visibility = Visibility.Hidden;
            }, 3000);
        });
        Text.create(this.content);
        Text.fontColor(Color.White);
        Text.fontSize(20);
        Text.lineHeight(20);
        Text.textAlign(TextAlign.Start);
        Text.margin(10);
        Text.pop();
        Row.pop();
    }
}
export class Toast_loading extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__content = new SynchedPropertySimpleTwoWay(params.content, this, "content");
        this.__comp_visibility = new SynchedPropertySimpleTwoWay(params.comp_visibility, this, "comp_visibility");
        this.mainRenderingSettings = new RenderingContextSettings(true);
        this.mainCanvasRenderingContext = new CanvasRenderingContext2D(this.mainRenderingSettings);
        this.animateName = "loading";
        this.animatePath = "common/data/loading.json";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Toast_loading_Params) {
        if (params.mainRenderingSettings !== undefined) {
            this.mainRenderingSettings = params.mainRenderingSettings;
        }
        if (params.mainCanvasRenderingContext !== undefined) {
            this.mainCanvasRenderingContext = params.mainCanvasRenderingContext;
        }
        if (params.animateName !== undefined) {
            this.animateName = params.animateName;
        }
        if (params.animatePath !== undefined) {
            this.animatePath = params.animatePath;
        }
    }
    aboutToBeDeleted() {
        this.__content.aboutToBeDeleted();
        this.__comp_visibility.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __content: SynchedPropertySimpleTwoWay<string>;
    get content() {
        return this.__content.get();
    }
    set content(newValue: string) {
        this.__content.set(newValue);
    }
    private __comp_visibility: SynchedPropertySimpleTwoWay<Visibility>;
    get comp_visibility() {
        return this.__comp_visibility.get();
    }
    set comp_visibility(newValue: Visibility) {
        this.__comp_visibility.set(newValue);
    }
    private mainRenderingSettings: RenderingContextSettings;
    private mainCanvasRenderingContext: CanvasRenderingContext2D;
    private animateName: string;
    private animatePath: string;
    onPageHide(): void {
        console.log('onPageHide');
        lottie.destroy();
    }
    render() {
        Column.create();
        Column.align(Alignment.Center);
        Column.width("100%");
        Column.height("100%");
        Column.backgroundColor(Color.Black);
        Column.opacity(0.6);
        Column.visibility(this.comp_visibility);
        Column.position({ y: "-0%" });
        Column.onAppear(() => {
            setInterval(() => {
                this.comp_visibility = Visibility.Hidden;
            }, 5000);
        });
        Column.create();
        Column.width("40%");
        Column.height("25%");
        Column.borderRadius(10);
        Column.margin({ top: "60%" });
        Column.backgroundColor("#ff4f4e4e");
        Canvas.create(this.mainCanvasRenderingContext);
        Canvas.width("60%");
        Canvas.height("60%");
        Canvas.pop();
        Text.create("  ");
        Text.fontSize(30);
        Text.onAppear(() => {
            setTimeout(() => {
                lottie.loadAnimation({
                    container: this.mainCanvasRenderingContext,
                    renderer: 'canvas',
                    loop: true,
                    autoplay: true,
                    name: this.animateName,
                    path: this.animatePath, // 路径加载动画只支持entry/src/main/ets 文件夹下的相对路径
                });
            }, 50);
        });
        Text.pop();
        Text.create(this.content);
        Text.fontColor(Color.White);
        Text.fontSize(20);
        Text.lineHeight(20);
        Text.textAlign(TextAlign.Start);
        Text.margin(10);
        Text.pop();
        Column.pop();
        Column.pop();
    }
}
export class Toast_successOrFailed extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__content = new SynchedPropertySimpleTwoWay(params.content, this, "content");
        this.__comp_visibility = new SynchedPropertySimpleTwoWay(params.comp_visibility, this, "comp_visibility");
        this.__imgURL = new ObservedPropertySimple("Toast_success.png", this, "imgURL");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Toast_successOrFailed_Params) {
        if (params.imgURL !== undefined) {
            this.imgURL = params.imgURL;
        }
    }
    aboutToBeDeleted() {
        this.__content.aboutToBeDeleted();
        this.__comp_visibility.aboutToBeDeleted();
        this.__imgURL.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __content: SynchedPropertySimpleTwoWay<string>;
    get content() {
        return this.__content.get();
    }
    set content(newValue: string) {
        this.__content.set(newValue);
    }
    private __comp_visibility: SynchedPropertySimpleTwoWay<Visibility>;
    get comp_visibility() {
        return this.__comp_visibility.get();
    }
    set comp_visibility(newValue: Visibility) {
        this.__comp_visibility.set(newValue);
    }
    private __imgURL: ObservedPropertySimple<string>;
    get imgURL() {
        return this.__imgURL.get();
    }
    set imgURL(newValue: string) {
        this.__imgURL.set(newValue);
    }
    render() {
        Column.create();
        Column.align(Alignment.Center);
        Column.width("100%");
        Column.height("100%");
        Column.visibility(this.comp_visibility);
        Column.position({ y: "-0%" });
        Column.onAppear(() => {
            setInterval(() => {
                this.comp_visibility = Visibility.Hidden;
            }, 3000);
        });
        Column.create();
        Column.width("40%");
        Column.height("25%");
        Column.borderRadius(10);
        Column.margin({ top: "60%" });
        Column.backgroundColor("#ff4f4e4e");
        Image.create($rawfile(this.imgURL));
        Image.width("50%");
        Image.margin({ top: "10%" });
        Text.create(this.content);
        Text.fontColor(Color.White);
        Text.fontSize(20);
        Text.lineHeight(20);
        Text.textAlign(TextAlign.Start);
        Text.margin(10);
        Text.pop();
        Column.pop();
        Column.pop();
    }
}
export class Toast_advance extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__comp_visibility = new SynchedPropertySimpleTwoWay(params.comp_visibility, this, "comp_visibility");
        this.__cur_countDown = new ObservedPropertySimple(5, this, "cur_countDown");
        this.mainRenderingSettings = new RenderingContextSettings(true);
        this.mainCanvasRenderingContext = new CanvasRenderingContext2D(this.mainRenderingSettings);
        this.animateName = "loading";
        this.animatePath = "common/data/loading.json";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Toast_advance_Params) {
        if (params.cur_countDown !== undefined) {
            this.cur_countDown = params.cur_countDown;
        }
        if (params.mainRenderingSettings !== undefined) {
            this.mainRenderingSettings = params.mainRenderingSettings;
        }
        if (params.mainCanvasRenderingContext !== undefined) {
            this.mainCanvasRenderingContext = params.mainCanvasRenderingContext;
        }
        if (params.animateName !== undefined) {
            this.animateName = params.animateName;
        }
        if (params.animatePath !== undefined) {
            this.animatePath = params.animatePath;
        }
    }
    aboutToBeDeleted() {
        this.__comp_visibility.aboutToBeDeleted();
        this.__cur_countDown.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __comp_visibility: SynchedPropertySimpleTwoWay<Visibility>;
    get comp_visibility() {
        return this.__comp_visibility.get();
    }
    set comp_visibility(newValue: Visibility) {
        this.__comp_visibility.set(newValue);
    }
    private __cur_countDown: ObservedPropertySimple<number>;
    get cur_countDown() {
        return this.__cur_countDown.get();
    }
    set cur_countDown(newValue: number) {
        this.__cur_countDown.set(newValue);
    }
    private mainRenderingSettings: RenderingContextSettings;
    private mainCanvasRenderingContext: CanvasRenderingContext2D;
    private animateName: string;
    private animatePath: string;
    onPageHide(): void {
        console.log('onPageHide');
        lottie.destroy();
    }
    render() {
        Column.create();
        Column.align(Alignment.Center);
        Column.width("100%");
        Column.height("100%");
        Column.visibility(this.comp_visibility);
        Column.position({ y: "-0%" });
        Column.create();
        Column.width("40%");
        Column.height("25%");
        Column.borderRadius(10);
        Column.margin({ top: "60%" });
        Column.backgroundColor("#ff4f4e4e");
        Canvas.create(this.mainCanvasRenderingContext);
        Canvas.width("60%");
        Canvas.height("60%");
        Canvas.pop();
        Text.create(" ");
        Text.fontSize(30);
        Text.onAppear(() => {
            setTimeout(() => {
                lottie.loadAnimation({
                    container: this.mainCanvasRenderingContext,
                    renderer: 'canvas',
                    loop: true,
                    autoplay: true,
                    name: this.animateName,
                    path: this.animatePath, // 路径加载动画只支持entry/src/main/ets 文件夹下的相对路径
                });
            }, 50);
        });
        Text.pop();
        Text.create("倒计时" + this.cur_countDown + "秒");
        Text.fontColor(Color.White);
        Text.fontSize(20);
        Text.lineHeight(20);
        Text.textAlign(TextAlign.Start);
        Text.margin(10);
        Text.onAppear(() => {
            var instance = setInterval(() => {
                if (this.comp_visibility == Visibility.Visible) {
                    this.cur_countDown = 5;
                    return;
                }
                else {
                    this.cur_countDown = 0;
                }
            }, 500);
            if (this.cur_countDown == 5) {
                clearInterval(instance);
                setInterval(() => {
                    if (this.cur_countDown > 0)
                        this.cur_countDown--;
                    else {
                        this.comp_visibility = Visibility.Hidden;
                        this.cur_countDown = 5;
                    }
                }, 1000);
            }
        });
        Text.pop();
        Column.pop();
        Column.pop();
    }
}
