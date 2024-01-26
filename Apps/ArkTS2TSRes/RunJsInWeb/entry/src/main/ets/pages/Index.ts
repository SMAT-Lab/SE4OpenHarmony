interface Index_Params {
    gameLeft?: string;
    gameRight?: string;
    gameStart?: string;
    gameReset?: string;
    removeDesc?: string;
    imgRequestUrl?: string;
    controller?: web_webview.WebviewController;
    responseweb?: WebResourceResponse;
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
import web_webview from '@ohos.web.webview';
import Logger from '../model/Logger';
const TAG: string = '[Index]';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__gameLeft = new ObservedPropertySimple("console.info('webgame gameLeft'); _main.paddle.moveLeft();", this, "gameLeft");
        this.__gameRight = new ObservedPropertySimple("console.info('webgame gameRight'); _main.paddle.moveRight();", this, "gameRight");
        this.__gameStart = new ObservedPropertySimple("console.info('webgame gameStart'); if (_main.game.state !== _main.game.state_GAMEOVER) {_main.game.state = _main.game.state_RUNNING; _main.ball.fired = true;}", this, "gameStart");
        this.__gameReset = new ObservedPropertySimple("console.info('webgame gameReset'); if (_main.game.state === _main.game.state_GAMEOVER) {_main.game.state = _main.game.state_START; _main.start()}", this, "gameReset");
        this.__removeDesc = new ObservedPropertySimple("console.info('webgame removeDesc'); y=document.getElementsByTagName('div')[0]; y.parentNode.removeChild(y)", this, "removeDesc");
        this.imgRequestUrl = 'https://yangyunhe369.github.io/h5-game-blockBreaker/images/background.jpg';
        this.controller = new web_webview.WebviewController();
        this.responseweb = new WebResourceResponse();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.gameLeft !== undefined) {
            this.gameLeft = params.gameLeft;
        }
        if (params.gameRight !== undefined) {
            this.gameRight = params.gameRight;
        }
        if (params.gameStart !== undefined) {
            this.gameStart = params.gameStart;
        }
        if (params.gameReset !== undefined) {
            this.gameReset = params.gameReset;
        }
        if (params.removeDesc !== undefined) {
            this.removeDesc = params.removeDesc;
        }
        if (params.imgRequestUrl !== undefined) {
            this.imgRequestUrl = params.imgRequestUrl;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.responseweb !== undefined) {
            this.responseweb = params.responseweb;
        }
    }
    aboutToBeDeleted() {
        this.__gameLeft.aboutToBeDeleted();
        this.__gameRight.aboutToBeDeleted();
        this.__gameStart.aboutToBeDeleted();
        this.__gameReset.aboutToBeDeleted();
        this.__removeDesc.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __gameLeft: ObservedPropertySimple<string>;
    get gameLeft() {
        return this.__gameLeft.get();
    }
    set gameLeft(newValue: string) {
        this.__gameLeft.set(newValue);
    }
    private __gameRight: ObservedPropertySimple<string>;
    get gameRight() {
        return this.__gameRight.get();
    }
    set gameRight(newValue: string) {
        this.__gameRight.set(newValue);
    }
    private __gameStart: ObservedPropertySimple<string>;
    get gameStart() {
        return this.__gameStart.get();
    }
    set gameStart(newValue: string) {
        this.__gameStart.set(newValue);
    }
    private __gameReset: ObservedPropertySimple<string>;
    get gameReset() {
        return this.__gameReset.get();
    }
    set gameReset(newValue: string) {
        this.__gameReset.set(newValue);
    }
    private __removeDesc: ObservedPropertySimple<string>;
    get removeDesc() {
        return this.__removeDesc.get();
    }
    set removeDesc(newValue: string) {
        this.__removeDesc.set(newValue);
    }
    private imgRequestUrl: string;
    private controller: web_webview.WebviewController;
    private responseweb: WebResourceResponse;
    render() {
        Row.create();
        Column.create();
        Column.width('10%');
        Button.createWithLabel('Start', { type: ButtonType.Capsule });
        Button.onClick(() => {
            try {
                this.controller.loadUrl("javascript:" + this.gameStart);
            }
            catch (error) {
                Logger.info(TAG, `loadUrl gameStart fail: ${JSON.stringify(error)}`);
            }
        });
        Button.pop();
        Button.createWithLabel('L', { type: ButtonType.Capsule });
        Button.width(50);
        Button.height(100);
        Button.backgroundColor(Color.Red);
        Gesture.create(GesturePriority.Low);
        LongPressGesture.create({ repeat: true, duration: 20 });
        LongPressGesture.onAction((event: GestureEvent) => {
            if (event.repeat) {
                try {
                    this.controller.loadUrl("javascript:" + this.gameLeft);
                }
                catch (error) {
                    Logger.info(TAG, `loadUrl gameLeft fail: ${JSON.stringify(error)}`);
                }
            }
        });
        LongPressGesture.pop();
        Gesture.pop();
        Button.pop();
        Column.pop();
        Column.create();
        Column.width('80%');
        Web.create({ src: "https://yangyunhe369.github.io/h5-game-blockBreaker/", controller: this.controller });
        Web.domStorageAccess(true);
        Web.onlineImageAccess(true);
        Web.imageAccess(true);
        Web.zoomAccess(false);
        Web.javaScriptAccess(true);
        Web.backgroundColor(Color.Orange);
        Web.onInterceptRequest((event) => {
            let url = '';
            if (event) {
                url = event.request.getRequestUrl();
            }
            if (url === this.imgRequestUrl) {
                return this.responseweb;
            }
            return null;
        });
        Web.onPageEnd(e => {
            try {
                this.controller.loadUrl("javascript:" + this.removeDesc);
            }
            catch (error) {
                Logger.info(TAG, `loadUrl removeDesc fail: ${JSON.stringify(error)}`);
            }
        });
        Column.pop();
        Column.create();
        Column.width('10%');
        Button.createWithLabel('Reset', { type: ButtonType.Capsule });
        Button.onClick(() => {
            try {
                this.controller.loadUrl("javascript:" + this.gameReset);
            }
            catch (error) {
                Logger.info(TAG, `loadUrl gameReset fail: ${JSON.stringify(error)}`);
            }
        });
        Button.pop();
        Button.createWithLabel('R', { type: ButtonType.Capsule });
        Button.width(50);
        Button.height(100);
        Button.backgroundColor(Color.Red);
        Gesture.create(GesturePriority.Low);
        LongPressGesture.create({ repeat: true, duration: 20 });
        LongPressGesture.onAction((event: GestureEvent) => {
            if (event.repeat) {
                try {
                    this.controller.loadUrl("javascript:" + this.gameRight);
                }
                catch (error) {
                    Logger.info(TAG, `loadUrl gameRight fail: ${JSON.stringify(error)}`);
                }
            }
        });
        LongPressGesture.pop();
        Gesture.pop();
        Button.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
