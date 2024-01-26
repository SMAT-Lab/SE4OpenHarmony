interface Transit_Params {
    value?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "transit_" + ++__generate__Id;
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
import router from '@ohos.router';
import { Arouter, NavigationCallback } from "@ohos/arouteronactivityresult";
import { unregisterInterceptor } from "@ohos/arouteronactivityresult";
import { Postcard } from "@ohos/arouteronactivityresult";
let callback: NavigationCallback = {
    onInterrupt(postcard) {
    },
    onArrival(postcard) {
    },
    onActivityResult(data) {
    }
};
export interface Params {
    index: string;
}
class Transit extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__value = new ObservedPropertySimple("Back to previous page", this, "value");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Transit_Params) {
        if (params.value !== undefined) {
            this.value = params.value;
        }
    }
    aboutToBeDeleted() {
        this.__value.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    // index页面传来的参数
    private __value: ObservedPropertySimple<string>;
    get value() {
        return this.__value.get();
    }
    set value(newValue: string) {
        this.__value.set(newValue);
    }
    render() {
        Scroll.create();
        Scroll.width('100%');
        Scroll.height('100%');
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center });
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Column.width(300);
        Column.height(200);
        Column.border({ width: "4px", color: "#c5bfbf", radius: 10 });
        Column.margin("20px");
        Text.create(`index页面传来的参数：`);
        Text.fontSize(24);
        Text.width("100%");
        Text.height(34);
        Text.pop();
        Divider.create();
        Divider.color("#e1d7d7");
        Divider.strokeWidth(2);
        Divider.width(300);
        // index页面传来的参数
        Text.create(router.getParams() ? (router.getParams() as Params).index ? (router.getParams() as Params).index.toString() : "空" : "空");
        // index页面传来的参数
        Text.fontColor("#7e7a7a");
        // index页面传来的参数
        Text.fontSize(24);
        // index页面传来的参数
        Text.pop();
        Column.pop();
        Divider.create();
        Divider.color("#888585");
        Divider.strokeWidth(2);
        Text.create("将输入框中的内容回调至index页面");
        Text.fontSize(28);
        Text.pop();
        Row.create();
        Text.create("参数:");
        Text.fontSize(18);
        Text.pop();
        // 将输入框中的内容回调至index页面
        TextInput.create({ placeholder: "请输入需要返回的参数", text: this.value });
        // 将输入框中的内容回调至index页面
        TextInput.width(240);
        // 将输入框中的内容回调至index页面
        TextInput.height(40);
        // 将输入框中的内容回调至index页面
        TextInput.margin({ left: '30px' });
        // 将输入框中的内容回调至index页面
        TextInput.placeholderColor(Color.Blue);
        // 将输入框中的内容回调至index页面
        TextInput.placeholderFont({ size: "18fp", weight: "100" });
        // 将输入框中的内容回调至index页面
        TextInput.border({ width: "2", color: "#c2bfbf", radius: "15" });
        // 将输入框中的内容回调至index页面
        TextInput.onChange((value) => {
            this.value = value;
        });
        Row.pop();
        Text.create("* 此按钮点击跳转回调才会有效果");
        Text.fontSize(16);
        Text.fontColor("red");
        Text.pop();
        Button.createWithLabel("返回上个页面并回调参数");
        Button.width("460px");
        Button.height("200px");
        Button.margin({ bottom: 22 });
        Button.onClick(() => {
            if (postcard != null && postcard.getNavigationCallback() != null) {
                (postcard.getNavigationCallback() as NavigationCallback)
                    .onActivityResult(this.value);
            }
            router.back();
        });
        Button.pop();
        Button.createWithLabel("返回上个页面");
        Button.width("460px");
        Button.height("200px");
        Button.margin(22);
        Button.onClick(() => {
            router.back();
        });
        Button.pop();
        Button.createWithLabel("关闭页面拦截");
        Button.onClick(() => {
            // 关闭页面拦截
            unregisterInterceptor();
            AlertDialog.show({
                message: '拦截器已关闭',
                confirm: {
                    value: '知道啦',
                    action: () => {
                    }
                },
                cancel: () => {
                }
            });
        });
        Button.pop();
        Button.createWithLabel("returnTo");
        Button.onClick(() => {
            Arouter.getInstance()
                .build("pages/returnTo")
                .navigationWithCallback(callback);
        });
        Button.pop();
        Flex.pop();
        Scroll.pop();
    }
    onPageShow() {
        if (postcard == null) {
            postcard = Arouter.getInstance().getPostcard(router.getState().path + router.getState().name);
            if (postcard != null && postcard.getNavigationCallback() != null) {
                (postcard.getNavigationCallback() as NavigationCallback).onArrival(postcard);
            }
        }
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
let postcard: Postcard;
loadDocument(new Transit("1", undefined, {}));
