interface Index_Params {
    value?: string;
    index?: string;
    service?: string;
    title?: string;
    router?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
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
import { Arouter } from "@ohos/arouteronactivityresult";
import { Postcard } from "@ohos/arouteronactivityresult";
import { registerInterceptor, InterceptorCallback, IInterceptor } from "@ohos/arouteronactivityresult";
import { PretreatmentService } from '@ohos/arouteronactivityresult';
import { NavigationCallback } from '@ohos/arouteronactivityresult';
import { Params } from './transit';
import router from '@ohos.router';
let iInterceptor: IInterceptor = {
    process(postcard: Postcard, callback: InterceptorCallback) {
        if (postcard.getUri() === 'pages/transit' || postcard.getUri() === 'pages/returnTo') {
            AlertDialog.show({
                title: '',
                message: '被拦截了，点击继续跳转',
                primaryButton: {
                    value: '取消',
                    action: () => {
                        callback.onInterrupt(postcard);
                    }
                },
                secondaryButton: {
                    value: '继续',
                    action: () => {
                        callback.onContinue(postcard);
                    }
                },
                cancel: () => {
                }
            });
        }
        else {
            callback.onContinue(postcard);
        }
    }
};
interface ReturnData {
    data: string;
}
let returnData: ReturnData = {
    data: ""
};
let callback: NavigationCallback = {
    onInterrupt(postcard: Postcard) {
    },
    onArrival(postcard: Postcard) {
    },
    onActivityResult(data) {
        returnData.data = data;
    }
};
let service = "true";
let pretreatmentService: PretreatmentService = {
    onPretreatment(postcard: Postcard): boolean {
        switch (service) {
            case "true":
                return true;
                break;
            case "false":
                return false;
                break;
            default:
                return true;
                break;
        }
    }
};
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__value = new ObservedPropertySimple("Route redirection"
        // 回调返回的参数
        , this, "value");
        this.__index = new ObservedPropertySimple("", this, "index");
        this.__service = new ObservedPropertySimple("true"
        // 标题
        , this, "service");
        this.__title = new ObservedPropertySimple("Route redirection"
        // 自定义跳转路径
        , this, "title");
        this.__router = new ObservedPropertySimple("pages/transit", this, "router");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.value !== undefined) {
            this.value = params.value;
        }
        if (params.index !== undefined) {
            this.index = params.index;
        }
        if (params.service !== undefined) {
            this.service = params.service;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.router !== undefined) {
            this.router = params.router;
        }
    }
    aboutToBeDeleted() {
        this.__value.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
        this.__service.aboutToBeDeleted();
        this.__title.aboutToBeDeleted();
        this.__router.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    // 输入框中的参数
    private __value: ObservedPropertySimple<string>;
    get value() {
        return this.__value.get();
    }
    set value(newValue: string) {
        this.__value.set(newValue);
    }
    // 回调返回的参数
    private __index: ObservedPropertySimple<string>;
    get index() {
        return this.__index.get();
    }
    set index(newValue: string) {
        this.__index.set(newValue);
    }
    private __service: ObservedPropertySimple<string>;
    get service() {
        return this.__service.get();
    }
    set service(newValue: string) {
        this.__service.set(newValue);
    }
    // 标题
    private __title: ObservedPropertySimple<string>;
    get title() {
        return this.__title.get();
    }
    set title(newValue: string) {
        this.__title.set(newValue);
    }
    // 自定义跳转路径
    private __router: ObservedPropertySimple<string>;
    get router() {
        return this.__router.get();
    }
    set router(newValue: string) {
        this.__router.set(newValue);
    }
    render() {
        Scroll.create();
        Scroll.width('100%');
        Scroll.height('100%');
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center });
        Button.createWithLabel("返回");
        Button.width("460px");
        Button.height("200px");
        Button.backgroundColor("#bb5959");
        Button.margin(10);
        Button.onClick(() => {
            router.back();
        });
        Button.pop();
        // 标题
        Text.create(this.title);
        // 标题
        Text.fontSize(24);
        // 标题
        Text.fontWeight(FontWeight.Bold);
        // 标题
        Text.pop();
        // 正常无参跳转
        Button.createWithLabel("正常跳转");
        // 正常无参跳转
        Button.width("460px");
        // 正常无参跳转
        Button.height("200px");
        // 正常无参跳转
        Button.backgroundColor("#bb5959");
        // 正常无参跳转
        Button.margin(10);
        // 正常无参跳转
        Button.onClick(() => {
            Arouter.getInstance()
                .build("pages/transit")
                .setGreenChannel(true)
                .navigation();
        });
        // 正常无参跳转
        Button.pop();
        Row.create();
        Text.create("参数:");
        Text.fontSize(18);
        Text.pop();
        TextInput.create({ placeholder: "请输入需要传的参数", text: this.value });
        TextInput.width(240);
        TextInput.height(40);
        TextInput.margin({ left: '30px' });
        TextInput.placeholderColor(Color.Blue);
        TextInput.placeholderFont({ size: "18fp", weight: "100" });
        TextInput.border({ width: "2", color: "#c2bfbf", radius: "15" });
        TextInput.onChange((value) => {
            this.value = value;
        });
        Row.pop();
        Text.create("将文本框中的内容传至transit页面");
        Text.fontSize(18);
        Text.pop();
        // 跳转传参
        Button.createWithLabel("跳转传参");
        // 跳转传参
        Button.width("460px");
        // 跳转传参
        Button.height("200px");
        // 跳转传参
        Button.backgroundColor("#bb5959");
        // 跳转传参
        Button.margin(10);
        // 跳转传参
        Button.onClick(() => {
            let data: Params = {
                index: this.value
            };
            Arouter.getInstance()
                .build("pages/transit")
                .withParams(data)
                .setGreenChannel(true)
                .navigation();
        });
        // 跳转传参
        Button.pop();
        Text.create(this.index);
        Text.fontSize(24);
        Text.pop();
        // 跳转并返回数据参数
        Button.createWithLabel("跳转回调");
        // 跳转并返回数据参数
        Button.width("460px");
        // 跳转并返回数据参数
        Button.height("200px");
        // 跳转并返回数据参数
        Button.backgroundColor("#bb5959");
        // 跳转并返回数据参数
        Button.margin(10);
        // 跳转并返回数据参数
        Button.onClick(() => {
            Arouter.getInstance()
                .build("pages/transit")
                .setGreenChannel(true)
                .navigationWithCallback(callback);
        });
        // 跳转并返回数据参数
        Button.pop();
        // 跳转拦截
        Button.createWithLabel("跳转拦截");
        // 跳转拦截
        Button.width("460px");
        // 跳转拦截
        Button.height("200px");
        // 跳转拦截
        Button.backgroundColor("#bb5959");
        // 跳转拦截
        Button.margin(10);
        // 跳转拦截
        Button.onClick(() => {
            let data: Params = {
                index: "Route redirection"
            };
            Arouter.getInstance()
                .build("pages/transit")
                .withParams(data)
                .navigationWithCallback(callback);
        });
        // 跳转拦截
        Button.pop();
        // 自定义跳转路径
        Row.create();
        Text.create("自定义跳转:");
        Text.fontSize(18);
        Text.pop();
        TextInput.create({ placeholder: "请输入需要跳转的路径", text: this.router });
        TextInput.width(240);
        TextInput.height(40);
        TextInput.margin({ left: '30px' });
        TextInput.placeholderColor(Color.Blue);
        TextInput.placeholderFont({ size: "18fp", weight: "100" });
        TextInput.border({ width: "2", color: "#c2bfbf", radius: "15" });
        TextInput.onChange((value) => {
            this.router = value;
        });
        // 自定义跳转路径
        Row.pop();
        Text.create("pages/transit或pages/returnTo");
        Text.fontSize(20);
        Text.pop();
        Button.createWithLabel("自定义跳转");
        Button.width("460px");
        Button.height("200px");
        Button.backgroundColor("#bb5959");
        Button.margin(10);
        Button.onClick(() => {
            let data: Params = {
                index: "Route redirection"
            };
            Arouter.getInstance()
                .build(this.router)
                .withParams(data)
                .setPretreatmentService(pretreatmentService)
                .navigationWithCallback(callback);
        });
        Button.pop();
        Row.create();
        Text.create("预处理:");
        Text.fontSize(18);
        Text.pop();
        TextInput.create({ placeholder: "", text: this.service });
        TextInput.width(240);
        TextInput.height(40);
        TextInput.margin({ left: '30px' });
        TextInput.placeholderColor(Color.Blue);
        TextInput.placeholderFont({ size: "18fp", weight: "100" });
        TextInput.border({ width: "2", color: "#c2bfbf", radius: "15" });
        TextInput.onChange((value) => {
            this.service = value;
            service = value;
        });
        Row.pop();
        Text.create("false不跳转,true继续跳转,其他默认为true,只对自定义跳转有效");
        Text.fontSize(16);
        Text.fontColor("red");
        Text.margin({ top: "10px" });
        Text.width("70%");
        Text.pop();
        Flex.pop();
        Scroll.pop();
    }
    // 页面显示时
    onPageShow() {
        this.index = returnData.data;
    }
    aboutToAppear() {
        registerInterceptor(iInterceptor);
    }
    pageTransition() {
        PageTransition.create();
        PageTransitionEnter.create({ duration: 600, curve: Curve.Linear });
        PageTransitionEnter.slide(SlideEffect.Right);
        PageTransitionExit.create({ duration: 600, curve: Curve.Linear });
        PageTransitionExit.slide(SlideEffect.Left);
        PageTransition.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
