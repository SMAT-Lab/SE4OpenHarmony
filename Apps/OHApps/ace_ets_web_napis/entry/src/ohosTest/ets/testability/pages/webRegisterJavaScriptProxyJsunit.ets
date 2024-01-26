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

import testNapi from 'libentry.so'
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
    return "m114 Arkui Web Component"
  }

  toString(): void {
    console.log('m114 Web Component toString')
  }
}

class webObj {
  constructor() {
  }

  webTest(): string {
    console.log('web test');
    return 'm114 Web test'
  }

  webString(): void {
    console.log('m114 Web test toString')
  }
}

@Entry
@Component
struct Index {
  @State message: string = 'Hello World'
  @State message1: string = 'Hello World'
  @State data: string = 'aaaaaaaaaaaa';
  @State data1M: string = this.data.repeat(64 * 1024)
  webTag: string = 'web1211';
  @State testObjtest: testObj = new testObj();
  @State webTestObj: webObj = new webObj();
  @State outputStr: string = ''
  @State playing: boolean = false
  @State str: string = "emitRegisterJavaScriptProxy"
  @State arrid: number = 0

  controller: web_webview.WebviewController = new web_webview.WebviewController(this.webTag);

  onPageShow() {
    let valueChangeEvent: events_emitter.InnerEvent = {
      eventId: 10,
      priority: events_emitter.EventPriority.LOW
    }
    events_emitter.on(valueChangeEvent, this.valueChangeCallBack)
  }

  private valueChangeCallBack = (eventData: events_emitter.EventData) => {
    console.info("web page valueChangeCallBack");
    if (eventData != null) {
      console.info("valueChangeCallBack:" + JSON.stringify(eventData));
      if (eventData.data != null && eventData.data.ACTION != null) {
        this.str = eventData.data.ACTION;
      }
    }
  }

  aboutToAppear() {
    let abilityDelegator = AbilityDelegatorRegistry.getAbilityDelegator()
    let abilityDelegatorArguments = AbilityDelegatorRegistry.getArguments()
    console.info('start run testcase!!!')
    Hypium.hypiumTest(abilityDelegator, abilityDelegatorArguments, testsuite)
    console.error("ygz aboutToAppear")
    web_webview.WebviewController.setWebDebuggingAccess(true);
    //初始化web ndk
    testNapi.nativeWebInit(this.webTag);
  }

  aboutToDisappear() {
    console.error("ygz aboutToDisAppear")
  }

  build() {
    Column() {
      Row() {
        Column() {
          Button('路由')
            .onClick(() => {
              router.pushUrl({
                url: 'pages/m114JSProxy'
              })
            })
          Button('路由---same')
            .onClick(() => {
              router.pushUrl({
                url: 'pages/IndexSame'
              })
            })
        }
      }

      Row() {
        Button('runJS hello')
          .fontSize(12)
          .onClick(() => {
            testNapi.runJavaScript(this.webTag, "runJSRetStr(\"" + "hello" + "\")");
            // this.controller.runJavaScript("runJSRetStr(\"" + "hello" + "\")").then()
          })

        Button('runJS void')
          .fontSize(12)
          .onClick(() => {
            testNapi.runJavaScript(this.webTag, "runVoid1()");
          })

        Button("runJS 1M数据")
          .fontSize(12)
          .onClick(() => {
            let data1M = this.data.repeat(64 * 1024)
            console.log("ygz time in ets start:" + new Date().getTime());
            testNapi.runJavaScript(this.webTag, "runJSRetStr(\"" + data1M + "\")");
          })

        Button("runJS 5M数据")
          .fontSize(12)
          .onClick(() => {
            let data5M = this.data.repeat(64 * 1024 * 5)
            console.log("ygz time in ets start:" + new Date().getTime());
            testNapi.runJavaScript(this.webTag, "runJSRetStr(\"" + data5M + "\")");
          })
      }

      Row() {
        Button("runJS 10M数据")
          .fontSize(12)
          .onClick(() => {
            const data10M = this.data.repeat(64 * 1024 * 10);
            console.log("ygz time in ets start:" + new Date().getTime());
            testNapi.runJavaScript(this.webTag, "runJSRetStr(\"" + data10M + "\")");
          })
        Button("runJS 20M数据")
          .fontSize(12)
          .onClick(() => {
            const data10M = this.data.repeat(64 * 1024 * 20);
            console.log("ygz time in ets start:" + new Date().getTime());
            testNapi.runJavaScript(this.webTag, "runJSRetStr(\"" + data10M + "\")");
          })
      }

      Web({ src: $rawfile('runJS.html'), controller: this.controller })
        .onControllerAttached(() => {
          // 触发调用ndk接口
          testNapi.registerJavaScriptProxy(this.webTag);
        })

      Button("web click").key('webcomponent')
        .onClick(async () => {
          console.info("key==>" + this.str)
          switch (this.str) {
            case "emitRegisterJavaScriptProxy": {
              // 运行接口  验证接口是否注册成功
              await Utils.sleep(5000)
              this.controller.runJavaScript("testNdkProxyObj()")
                .then((result) => {
                  Utils.emitEvent("RegisterSuccess",23)
                })
              break;
            }
            case "emitRunJavaScript":{
              // 运行接口  验证接口是否运行成功
              this.controller.runJavaScript("testNdkProxyObj()")
                .then((result) => {
                  Utils.emitEvent("RegisterSuccess",24)
                })
              break;
            }
            default:
              console.info("can not match case")
          }
        })
    }
  }
}
