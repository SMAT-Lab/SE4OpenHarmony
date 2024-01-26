interface Index_Params {
    title?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Unionman Technology Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
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
import uart_ctl from '@ohos.uartapipart';
import Prompt from '@system.prompt';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__title = new ObservedPropertySimple('Uart Demo', this, "title");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.title !== undefined) {
            this.title = params.title;
        }
    }
    aboutToBeDeleted() {
        this.__title.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __title: ObservedPropertySimple<string>;
    get title() {
        return this.__title.get();
    }
    set title(newValue: string) {
        this.__title.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Row.onAppear(() => {
            uart_ctl.onTouch((event) => {
                switch (event) {
                    case uart_ctl.EventCode.right:
                        Prompt.showToast({ message: "get event right" });
                        break;
                    case uart_ctl.EventCode.left:
                        Prompt.showToast({ message: "get event left" });
                        break;
                    case uart_ctl.EventCode.back:
                        Prompt.showToast({ message: "get event back" });
                        break;
                    case uart_ctl.EventCode.forward:
                        Prompt.showToast({ message: "get event forward" });
                        break;
                    case uart_ctl.EventCode.pullUp:
                        Prompt.showToast({ message: "get event pull up" });
                        break;
                    case uart_ctl.EventCode.pullDown:
                        Prompt.showToast({ message: "get event pull down" });
                        break;
                    case uart_ctl.EventCode.pullMove:
                        Prompt.showToast({ message: "get event pull move" });
                        break;
                    case uart_ctl.EventCode.touch1:
                        Prompt.showToast({ message: "get event touch1" });
                        break;
                    case uart_ctl.EventCode.touch2:
                        Prompt.showToast({ message: "get event touch2" });
                        break;
                    case uart_ctl.EventCode.touch3:
                        Prompt.showToast({ message: "get event touch3" });
                        break;
                    case uart_ctl.EventCode.touch4:
                        Prompt.showToast({ message: "get event touch4" });
                        break;
                    case uart_ctl.EventCode.touch5:
                        Prompt.showToast({ message: "get event touch5" });
                        break;
                    default:
                        Prompt.showToast({ message: "error" });
                        break;
                }
            });
        });
        Column.create();
        Column.width('100%');
        Text.create(this.title);
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
