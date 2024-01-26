interface Index_Params {
    message?: string;
    controller?: web.WebviewController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
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
import window from '@ohos.window';
import web from '@ohos.web.webview';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.controller = new web.WebviewController();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
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
    private controller: web.WebviewController;
    render() {
        Stack.create();
        Stack.align(Alignment.BottomEnd);
        Stack.width('100%');
        Stack.height('100%');
        //https://53004908n5.imdo.co   ThreeJs实现全景效果的h5页面
        Web.create({ src: "https://53004908n5.imdo.co", controller: this.controller });
        //https://53004908n5.imdo.co   ThreeJs实现全景效果的h5页面
        Web.width('100%');
        //https://53004908n5.imdo.co   ThreeJs实现全景效果的h5页面
        Web.height('100%');
        //https://53004908n5.imdo.co   ThreeJs实现全景效果的h5页面
        Web.margin({ top: 10 });
        //https://53004908n5.imdo.co   ThreeJs实现全景效果的h5页面
        Web.imageAccess(true);
        //https://53004908n5.imdo.co   ThreeJs实现全景效果的h5页面
        Web.horizontalScrollBarAccess(true);
        //https://53004908n5.imdo.co   ThreeJs实现全景效果的h5页面
        Web.onProgressChange((ev) => {
            console.log("ThreeJs360 progress:" + ev.newProgress);
        });
        //https://53004908n5.imdo.co   ThreeJs实现全景效果的h5页面
        Web.onErrorReceive((error) => {
            console.log("ThreeJs360 error:" + error.error.getErrorInfo() + ";code:" + error.error.getErrorCode());
            console.log("ThreeJs360 error url:" + error.request.getRequestUrl());
        });
        Button.createWithLabel("返回");
        Button.onClick(() => {
            if (this.controller.accessBackward()) {
                this.controller.backward();
            }
        });
        Button.width(200);
        Button.margin({ right: 20, bottom: 20 });
        Button.pop();
        Stack.pop();
    }
    aboutToAppear() {
        window.getLastWindow(getContext(this)).then((win) => {
            win.setWindowSystemBarEnable(["navigation"]);
            win.setPreferredOrientation(window.Orientation.LANDSCAPE);
        });
    }
}
loadDocument(new Index("1", undefined, {}));
