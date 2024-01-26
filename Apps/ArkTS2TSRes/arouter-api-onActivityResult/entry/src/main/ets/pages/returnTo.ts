interface returnTo_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "returnTo_" + ++__generate__Id;
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
import { registerInterceptor, IInterceptor, InterceptorCallback, NavigationCallback } from "@ohos/arouteronactivityresult";
import { Postcard } from '@ohos/arouteronactivityresult';
import { Arouter } from "@ohos/arouteronactivityresult";
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
                    console.info('Closed callbacks');
                }
            });
        }
        else {
            callback.onContinue(postcard);
        }
    }
};
class returnTo extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: returnTo_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Scroll.create();
        Scroll.width('100%');
        Scroll.height('100%');
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Text.create('returnTo');
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Button.createWithLabel("返回index");
        Button.onClick(() => {
            postcard.setUri("pages/Index");
            let url = postcard.getUri();
            router.back({ url });
        });
        Button.pop();
        Button.createWithLabel("返回transit");
        Button.margin({ top: 10 });
        Button.onClick(() => {
            router.push({ url: "pages/transit" });
        });
        Button.pop();
        Button.createWithLabel("点击打开拦截器");
        Button.margin({ top: 10 });
        Button.onClick(() => {
            registerInterceptor(iInterceptor);
            AlertDialog.show({
                message: '拦截器已打开',
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
        Flex.pop();
        Scroll.pop();
    }
    onPageShow(): Postcard | void {
        interface Tag {
            title: string;
        }
        if (postcard == null) {
            postcard = Arouter.getInstance().getPostcard(router.getState().path + router.getState().name);
            let tag: Tag = { title: "pageShow" };
            let title: Tag = postcard.setTag(tag).getTag() as Tag;
            postcard.withFlags(true);
            if (postcard != null && postcard.getNavigationCallback() != null && title.title == "pageShow" && postcard.getFlags()) {
                (postcard.getNavigationCallback() as NavigationCallback).onArrival(postcard);
            }
            return postcard;
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
loadDocument(new returnTo("1", undefined, {}));
