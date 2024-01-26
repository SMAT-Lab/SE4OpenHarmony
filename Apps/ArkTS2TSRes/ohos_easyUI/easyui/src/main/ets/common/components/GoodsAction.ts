interface GoodsAction_big_Params {
    text?: string;
    isPrimary?: boolean;
    disable?: boolean;
    url?: string;
    isShowPrompt?: boolean;
    promptMessage?: string;
}
interface GoodsAction_mini_Params {
    text?: string;
    icon?: string;
    showTip?: boolean;
    tipNumber?: number;
    url?: string;
    isShowPrompt?: boolean;
    promptMessage?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "GoodsAction_" + ++__generate__Id;
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
import router from '@ohos.router';
import promptAction from '@ohos.promptAction';
export class GoodsAction_mini extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.text = "客服";
        this.icon = "GoodAction_service.png";
        this.showTip = false;
        this.tipNumber = 0;
        this.url = "";
        this.isShowPrompt = false;
        this.promptMessage = "点击图标";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: GoodsAction_mini_Params) {
        if (params.text !== undefined) {
            this.text = params.text;
        }
        if (params.icon !== undefined) {
            this.icon = params.icon;
        }
        if (params.showTip !== undefined) {
            this.showTip = params.showTip;
        }
        if (params.tipNumber !== undefined) {
            this.tipNumber = params.tipNumber;
        }
        if (params.url !== undefined) {
            this.url = params.url;
        }
        if (params.isShowPrompt !== undefined) {
            this.isShowPrompt = params.isShowPrompt;
        }
        if (params.promptMessage !== undefined) {
            this.promptMessage = params.promptMessage;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private text: string;
    private icon: string;
    private showTip: boolean;
    private tipNumber: number;
    private url: string;
    private isShowPrompt: boolean;
    private promptMessage: string;
    showPrompt() {
        promptAction.showToast({
            message: this.promptMessage,
            duration: 1000,
            bottom: 440
        });
    }
    render() {
        Column.create();
        Button.createWithChild();
        Button.type(ButtonType.Normal);
        Button.backgroundColor("#ffffffff");
        Button.width(50);
        Button.height(50);
        Button.borderWidth(1);
        Button.borderColor("#ffefefef");
        Button.onClick(() => {
            if (this.isShowPrompt) {
                this.showPrompt();
            }
            router.pushUrl({
                url: this.url
            });
        });
        Stack.create();
        Stack.height("100%");
        Column.create();
        Column.alignSelf(ItemAlign.Center);
        Image.create($rawfile(this.icon));
        Image.height(20);
        Image.width(20);
        Text.create(this.text);
        Text.fontSize(12);
        Text.margin({ top: 3 });
        Text.pop();
        Column.pop();
        If.create();
        if (this.showTip) {
            If.branchId(0);
            Column.create();
            Column.width("100%");
            Column.height("100%");
            Text.create(this.tipNumber.toString());
            Text.fontSize(9);
            Text.fontColor("#ffffffff");
            Text.textAlign(TextAlign.Center);
            Text.backgroundColor("#ffff0000");
            Text.borderRadius(20);
            Text.padding(this.tipNumber >= 10 ? 1 : { left: 3, right: 3, top: 1, bottom: 1 });
            Text.alignSelf(ItemAlign.End);
            Text.margin({ right: 5, top: 2 });
            Text.pop();
            Column.pop();
        }
        If.pop();
        Stack.pop();
        Button.pop();
        Column.pop();
    }
}
export class GoodsAction_big extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.text = "加入购物车";
        this.isPrimary = false;
        this.disable = false;
        this.url = "";
        this.isShowPrompt = false;
        this.promptMessage = "点击按钮";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: GoodsAction_big_Params) {
        if (params.text !== undefined) {
            this.text = params.text;
        }
        if (params.isPrimary !== undefined) {
            this.isPrimary = params.isPrimary;
        }
        if (params.disable !== undefined) {
            this.disable = params.disable;
        }
        if (params.url !== undefined) {
            this.url = params.url;
        }
        if (params.isShowPrompt !== undefined) {
            this.isShowPrompt = params.isShowPrompt;
        }
        if (params.promptMessage !== undefined) {
            this.promptMessage = params.promptMessage;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private text: string;
    private isPrimary: boolean;
    private disable: boolean;
    private url: string;
    private isShowPrompt: boolean;
    private promptMessage: string;
    showPrompt() {
        promptAction.showToast({
            message: this.promptMessage,
            duration: 1000,
            bottom: 440
        });
    }
    render() {
        Button.createWithChild();
        Button.backgroundColor(this.isPrimary ? "#ffff4444" : "#ffff976a");
        Button.type(ButtonType.Normal);
        Button.hitTestBehavior(this.disable ? HitTestMode.None : HitTestMode.Default);
        Button.height(50);
        Button.layoutWeight(1);
        Button.onClick(() => {
            if (this.isShowPrompt) {
                this.showPrompt();
            }
            router.pushUrl({
                url: this.url
            });
        });
        Column.create();
        Text.create(this.text);
        Text.margin(10);
        Text.fontColor("#ffffffff");
        Text.pop();
        Column.pop();
        Button.pop();
    }
}
