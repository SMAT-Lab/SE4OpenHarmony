interface Index_Params {
    message?: string;
    message1?: string;
    data?: string;
    data1M?: string;
    webTag?: string;
    testObjtest?: testObj;
    webTestObj?: webObj;
    outputStr?: string;
    playing?: boolean;
    str?: string;
    arrid?: number;
    controller?: web_webview.WebviewController;
    valueChangeCallBack?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "webRegisterJavaScriptProxyJsunit_" + ++__generate__Id;
}
/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
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
var testNapi = globalThis.requireNapi("entry", true);
import router from '@ohos.router';
import web_webview from '@ohos.web.webview';
import events_emitter from '@ohos.events.emitter';
import testsuite from '../../test/List.test';
import AbilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry';
import { Hypium } from '@ohos/hypium';
import Utils from '../../test/Utils';
class testObj {
    constructor() {
    }
    test(): string {
        console.log('m114 Arkui web Component');
        return "m114 Arkui Web Component";
    }
    toString(): void {
        console.log('m114 Web Component toString');
    }
}
class webObj {
    constructor() {
    }
    webTest(): string {
        console.log('web test');
        return 'm114 Web test';
    }
    webString(): void {
        console.log('m114 Web test toString');
    }
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.__message1 = new ObservedPropertySimple('Hello World', this, "message1");
        this.__data = new ObservedPropertySimple('aaaaaaaaaaaa', this, "data");
        this.__data1M = new ObservedPropertySimple(this.data.repeat(64 * 1024), this, "data1M");
        this.webTag = 'web1211';
        this.__testObjtest = new ObservedPropertyObject(new testObj(), this, "testObjtest");
        this.__webTestObj = new ObservedPropertyObject(new webObj(), this, "webTestObj");
        this.__outputStr = new ObservedPropertySimple('', this, "outputStr");
        this.__playing = new ObservedPropertySimple(false, this, "playing");
        this.__str = new ObservedPropertySimple("emitRegisterJavaScriptProxy", this, "str");
        this.__arrid = new ObservedPropertySimple(0, this, "arrid");
        this.controller = new web_webview.WebviewController(this.webTag);
        this.valueChangeCallBack = (eventData: events_emitter.EventData) => {
            console.info("web page valueChangeCallBack");
            if (eventData != null) {
                console.info("valueChangeCallBack:" + JSON.stringify(eventData));
                if (eventData.data != null && eventData.data.ACTION != null) {
                    this.str = eventData.data.ACTION;
                }
            }
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.message1 !== undefined) {
            this.message1 = params.message1;
        }
        if (params.data !== undefined) {
            this.data = params.data;
        }
        if (params.data1M !== undefined) {
            this.data1M = params.data1M;
        }
        if (params.webTag !== undefined) {
            this.webTag = params.webTag;
        }
        if (params.testObjtest !== undefined) {
            this.testObjtest = params.testObjtest;
        }
        if (params.webTestObj !== undefined) {
            this.webTestObj = params.webTestObj;
        }
        if (params.outputStr !== undefined) {
            this.outputStr = params.outputStr;
        }
        if (params.playing !== undefined) {
            this.playing = params.playing;
        }
        if (params.str !== undefined) {
            this.str = params.str;
        }
        if (params.arrid !== undefined) {
            this.arrid = params.arrid;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.valueChangeCallBack !== undefined) {
            this.valueChangeCallBack = params.valueChangeCallBack;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__message1.aboutToBeDeleted();
        this.__data.aboutToBeDeleted();
        this.__data1M.aboutToBeDeleted();
        this.__testObjtest.aboutToBeDeleted();
        this.__webTestObj.aboutToBeDeleted();
        this.__outputStr.aboutToBeDeleted();
        this.__playing.aboutToBeDeleted();
        this.__str.aboutToBeDeleted();
        this.__arrid.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __message1: ObservedPropertySimple<string>;
    get message1() {
        return this.__message1.get();
    }
    set message1(newValue: string) {
        this.__message1.set(newValue);
    }
    private __data: ObservedPropertySimple<string>;
    get data() {
        return this.__data.get();
    }
    set data(newValue: string) {
        this.__data.set(newValue);
    }
    private __data1M: ObservedPropertySimple<string>;
    get data1M() {
        return this.__data1M.get();
    }
    set data1M(newValue: string) {
        this.__data1M.set(newValue);
    }
    private webTag: string;
    private __testObjtest: ObservedPropertyObject<testObj>;
    get testObjtest() {
        return this.__testObjtest.get();
    }
    set testObjtest(newValue: testObj) {
        this.__testObjtest.set(newValue);
    }
    private __webTestObj: ObservedPropertyObject<webObj>;
    get webTestObj() {
        return this.__webTestObj.get();
    }
    set webTestObj(newValue: webObj) {
        this.__webTestObj.set(newValue);
    }
    private __outputStr: ObservedPropertySimple<string>;
    get outputStr() {
        return this.__outputStr.get();
    }
    set outputStr(newValue: string) {
        this.__outputStr.set(newValue);
    }
    private __playing: ObservedPropertySimple<boolean>;
    get playing() {
        return this.__playing.get();
    }
    set playing(newValue: boolean) {
        this.__playing.set(newValue);
    }
    private __str: ObservedPropertySimple<string>;
    get str() {
        return this.__str.get();
    }
    set str(newValue: string) {
        this.__str.set(newValue);
    }
    private __arrid: ObservedPropertySimple<number>;
    get arrid() {
        return this.__arrid.get();
    }
    set arrid(newValue: number) {
        this.__arrid.set(newValue);
    }
    private controller: web_webview.WebviewController;
    onPageShow() {
        let valueChangeEvent: events_emitter.InnerEvent = {
            eventId: 10,
            priority: events_emitter.EventPriority.LOW
        };
        events_emitter.on(valueChangeEvent, this.valueChangeCallBack);
    }
    private valueChangeCallBack;
    aboutToAppear() {
        let abilityDelegator = AbilityDelegatorRegistry.getAbilityDelegator();
        let abilityDelegatorArguments = AbilityDelegatorRegistry.getArguments();
        console.info('start run testcase!!!');
        Hypium.hypiumTest(abilityDelegator, abilityDelegatorArguments, testsuite);
        console.error("ygz aboutToAppear");
        web_webview.WebviewController.setWebDebuggingAccess(true);
        //初始化web ndk
        testNapi.nativeWebInit(this.webTag);
    }
    aboutToDisappear() {
        console.error("ygz aboutToDisAppear");
    }
    render() {
        Column.create();
        Row.create();
        Column.create();
        Button.createWithLabel('路由');
        Button.onClick(() => {
            router.pushUrl({
                url: 'pages/m114JSProxy'
            });
        });
        Button.pop();
        Button.createWithLabel('路由---same');
        Button.onClick(() => {
            router.pushUrl({
                url: 'pages/IndexSame'
            });
        });
        Button.pop();
        Column.pop();
        Row.pop();
        Row.create();
        Button.createWithLabel('runJS hello');
        Button.fontSize(12);
        Button.onClick(() => {
            testNapi.runJavaScript(this.webTag, "runJSRetStr(\"" + "hello" + "\")");
            // this.controller.runJavaScript("runJSRetStr(\"" + "hello" + "\")").then()
        });
        Button.pop();
        Button.createWithLabel('runJS void');
        Button.fontSize(12);
        Button.onClick(() => {
            testNapi.runJavaScript(this.webTag, "runVoid1()");
        });
        Button.pop();
        Button.createWithLabel("runJS 1M数据");
        Button.fontSize(12);
        Button.onClick(() => {
            let data1M = this.data.repeat(64 * 1024);
            console.log("ygz time in ets start:" + new Date().getTime());
            testNapi.runJavaScript(this.webTag, "runJSRetStr(\"" + data1M + "\")");
        });
        Button.pop();
        Button.createWithLabel("runJS 5M数据");
        Button.fontSize(12);
        Button.onClick(() => {
            let data5M = this.data.repeat(64 * 1024 * 5);
            console.log("ygz time in ets start:" + new Date().getTime());
            testNapi.runJavaScript(this.webTag, "runJSRetStr(\"" + data5M + "\")");
        });
        Button.pop();
        Row.pop();
        Row.create();
        Button.createWithLabel("runJS 10M数据");
        Button.fontSize(12);
        Button.onClick(() => {
            const data10M = this.data.repeat(64 * 1024 * 10);
            console.log("ygz time in ets start:" + new Date().getTime());
            testNapi.runJavaScript(this.webTag, "runJSRetStr(\"" + data10M + "\")");
        });
        Button.pop();
        Button.createWithLabel("runJS 20M数据");
        Button.fontSize(12);
        Button.onClick(() => {
            const data10M = this.data.repeat(64 * 1024 * 20);
            console.log("ygz time in ets start:" + new Date().getTime());
            testNapi.runJavaScript(this.webTag, "runJSRetStr(\"" + data10M + "\")");
        });
        Button.pop();
        Row.pop();
        Web.create({ src: { "id": 0, "type": 30000, params: ['runJS.html'] }, controller: this.controller });
        Web.onControllerAttached(() => {
            // 触发调用ndk接口
            testNapi.registerJavaScriptProxy(this.webTag);
        });
        Button.createWithLabel("web click");
        Button.key('webcomponent');
        Button.onClick(async () => {
            console.info("key==>" + this.str);
            switch (this.str) {
                case "emitRegisterJavaScriptProxy": {
                    // 运行接口  验证接口是否注册成功
                    await Utils.sleep(5000);
                    this.controller.runJavaScript("testNdkProxyObj()")
                        .then((result) => {
                        Utils.emitEvent("RegisterSuccess", 23);
                    });
                    break;
                }
                case "emitRunJavaScript": {
                    // 运行接口  验证接口是否运行成功
                    this.controller.runJavaScript("testNdkProxyObj()")
                        .then((result) => {
                        Utils.emitEvent("RegisterSuccess", 24);
                    });
                    break;
                }
                default:
                    console.info("can not match case");
            }
        });
        Button.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
