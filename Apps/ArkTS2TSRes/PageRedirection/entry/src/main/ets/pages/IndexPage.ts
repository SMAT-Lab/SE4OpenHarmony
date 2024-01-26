interface IndexPage_Params {
    webCanBack?: boolean;
    webCanForward?: boolean;
    controller?: webview.WebviewController;
    statusBarHeight?: number;
    sliderBarHeight?: number;
    arkTSObj?: ArkTSFunModel;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "IndexPage_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
import { BusinessError } from '@ohos.base';
import promptAction from '@ohos.promptAction';
import router from '@ohos.router';
import webview from '@ohos.web.webview';
import window from '@ohos.window';
import Logger from '../common/utils/Logger';
import { CommonConstants } from '../common/constants/CommonConstants';
import { ArkTSFunModel } from '../model/ProductModel';
const TAG = '[IndexPage]';
class IndexPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__webCanBack = new ObservedPropertySimple(false, this, "webCanBack");
        this.__webCanForward = new ObservedPropertySimple(false, this, "webCanForward");
        this.__controller = new ObservedPropertyObject(new webview.WebviewController(), this, "controller");
        this.__statusBarHeight = new ObservedPropertySimple(0, this, "statusBarHeight");
        this.__sliderBarHeight = new ObservedPropertySimple(0, this, "sliderBarHeight");
        this.arkTSObj = {
            jumpOrderConfirm: (detailStr: string) => this.jumpOrderConfirm(detailStr)
        };
        this.updateWithValueParams(params);
        this.declareWatch("webCanBack", this.updateStatus);
    }
    updateWithValueParams(params: IndexPage_Params) {
        if (params.webCanBack !== undefined) {
            this.webCanBack = params.webCanBack;
        }
        if (params.webCanForward !== undefined) {
            this.webCanForward = params.webCanForward;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.statusBarHeight !== undefined) {
            this.statusBarHeight = params.statusBarHeight;
        }
        if (params.sliderBarHeight !== undefined) {
            this.sliderBarHeight = params.sliderBarHeight;
        }
        if (params.arkTSObj !== undefined) {
            this.arkTSObj = params.arkTSObj;
        }
    }
    aboutToBeDeleted() {
        this.__webCanBack.aboutToBeDeleted();
        this.__webCanForward.aboutToBeDeleted();
        this.__controller.aboutToBeDeleted();
        this.__statusBarHeight.aboutToBeDeleted();
        this.__sliderBarHeight.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __webCanBack: ObservedPropertySimple<boolean>;
    get webCanBack() {
        return this.__webCanBack.get();
    }
    set webCanBack(newValue: boolean) {
        this.__webCanBack.set(newValue);
    }
    private __webCanForward: ObservedPropertySimple<boolean>;
    get webCanForward() {
        return this.__webCanForward.get();
    }
    set webCanForward(newValue: boolean) {
        this.__webCanForward.set(newValue);
    }
    private __controller: ObservedPropertyObject<webview.WebviewController>;
    get controller() {
        return this.__controller.get();
    }
    set controller(newValue: webview.WebviewController) {
        this.__controller.set(newValue);
    }
    private __statusBarHeight: ObservedPropertySimple<number>;
    get statusBarHeight() {
        return this.__statusBarHeight.get();
    }
    set statusBarHeight(newValue: number) {
        this.__statusBarHeight.set(newValue);
    }
    private __sliderBarHeight: ObservedPropertySimple<number>;
    get sliderBarHeight() {
        return this.__sliderBarHeight.get();
    }
    set sliderBarHeight(newValue: number) {
        this.__sliderBarHeight.set(newValue);
    }
    private arkTSObj: ArkTSFunModel;
    aboutToAppear() {
        webview.WebviewController.setWebDebuggingAccess(true);
        window.getLastWindow(getContext(this), (err: BusinessError, windowClass: window.Window) => {
            if (err.code) {
                Logger.error(TAG, 'Failed to obtain the main window. Cause: ' + JSON.stringify(err));
                return;
            }
            Logger.info(TAG, 'Succeeded in obtaining the main window. Data: ' + JSON.stringify(windowClass));
            // Realize the immersive effect.
            try {
                let type = window.AvoidAreaType.TYPE_SYSTEM;
                // Get status bar height.
                let area: window.AvoidArea = windowClass.getWindowAvoidArea(type);
                let statusBarHeight = px2vp(area.topRect.height);
                let sliderBarHeight = px2vp(area.bottomRect.height);
                this.statusBarHeight = statusBarHeight;
                this.sliderBarHeight = sliderBarHeight;
                if (statusBarHeight > 0) {
                    windowClass.setWindowLayoutFullScreen(true);
                }
            }
            catch (exception) {
                Logger.error(TAG, 'Failed to set the system bar properties. Cause: ' + JSON.stringify(exception));
            }
        });
    }
    onPageShow() {
        this.updateStatusBar(this.webCanBack);
    }
    onPageHide() {
        this.updateStatusBar(false);
    }
    updateStatus() {
        this.updateStatusBar(this.webCanBack);
    }
    onBackPress() {
        if (this.webCanBack) {
            this.controller.backward();
            return true;
        }
        return false;
    }
    updateStatusBar(isDarkMode?: boolean): void {
        window.getLastWindow(getContext(this)).then((windowClass: window.Window) => {
            let systemBarProperties: window.SystemBarProperties = {
                statusBarColor: isDarkMode ? '#000000' : '#F1F3F5',
                statusBarContentColor: isDarkMode ? '#FFFFFF' : '#000000',
            };
            try {
                windowClass.setWindowSystemBarProperties(systemBarProperties, (err) => {
                    if (err.code) {
                        Logger.error(TAG, 'Failed to set the system bar properties. Cause: ' + JSON.stringify(err));
                        return;
                    }
                    Logger.info(TAG, 'Succeeded in setting the system bar properties.');
                });
            }
            catch (exception) {
                Logger.error(TAG, 'Failed to set the system bar properties. Cause: ' + JSON.stringify(exception));
            }
        });
    }
    jumpOrderConfirm(detailStr: string): void {
        router.pushUrl({
            url: 'pages/OrderConfirmPage',
            params: { statusBarHeight: this.statusBarHeight, sliderBarHeight: this.sliderBarHeight, detailStr }
        });
    }
    render() {
        Column.create();
        Column.width(CommonConstants.FULL_PERCENT);
        Column.height(CommonConstants.FULL_PERCENT);
        Column.backgroundColor($r('app.color.common_bg'));
        Column.padding({ top: this.statusBarHeight - 1, bottom: this.sliderBarHeight });
        Web.create({ src: { "id": 0, "type": 30000, params: ['product_list.html'] }, controller: this.controller });
        Web.margin({ top: AppStorage.get('statusBarHeight') });
        Web.layoutWeight(1);
        Web.javaScriptProxy({
            object: this.arkTSObj,
            name: 'arkTSFunObj',
            methodList: ['jumpOrderConfirm'],
            controller: this.controller
        });
        Web.onConfirm(() => {
            promptAction.showToast({
                message: $r('app.string.toast_msg'),
                duration: CommonConstants.TOAST_DURATION
            });
            return false;
        });
        Web.onPageEnd(() => {
            this.webCanBack = this.controller.accessBackward();
            this.webCanForward = this.controller.accessForward();
        });
        Row.create();
        Row.justifyContent(FlexAlign.SpaceAround);
        Row.width(CommonConstants.FULL_PERCENT);
        Row.height($r('app.float.navi_height'));
        Button.createWithChild();
        Button.width($r('app.float.btn_size'));
        Button.backgroundColor($r('app.color.common_bg'));
        Button.aspectRatio(1);
        Button.enabled(this.webCanBack);
        Button.onClick(() => {
            this.controller.backward();
        });
        Image.create(this.webCanBack ? $r('app.media.ic_back_on') : $r('app.media.ic_back_off'));
        Image.width($r('app.float.img_size'));
        Image.aspectRatio(1);
        Button.pop();
        Button.createWithChild();
        Button.width($r('app.float.btn_size'));
        Button.backgroundColor($r('app.color.common_bg'));
        Button.aspectRatio(1);
        Button.enabled(this.webCanForward);
        Button.onClick(() => {
            this.controller.forward();
        });
        Image.create(this.webCanForward ? $r('app.media.ic_next_on') : $r('app.media.ic_next_off'));
        Image.width($r('app.float.img_size'));
        Image.aspectRatio(1);
        Button.pop();
        Button.createWithChild();
        Button.width($r('app.float.btn_size'));
        Button.backgroundColor($r('app.color.common_bg'));
        Button.aspectRatio(1);
        Button.onClick(() => {
            this.controller.backward();
        });
        Image.create($r('app.media.ic_home'));
        Image.width($r('app.float.img_size'));
        Image.aspectRatio(1);
        Button.pop();
        Row.pop();
        Column.pop();
    }
}
loadDocument(new IndexPage("1", undefined, {}));
