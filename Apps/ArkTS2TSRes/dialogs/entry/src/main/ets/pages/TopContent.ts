interface TopContent_Params {
    scroller?: Scroller;
    model?: BaseCenterMode;
    isAnimation?: boolean;
    topController?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TopContent_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { TopDialog, BaseCenterMode } from '@ohos/dialogs';
import { animation } from '../utils/animation';
class TopContent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.scroller = new Scroller();
        this.__model = new ObservedPropertyObject(new BaseCenterMode(), this, "model");
        this.__isAnimation = new ObservedPropertySimple(false, this, "isAnimation");
        this.topController = new CustomDialogController({
            builder: () => {
                let jsDialog = new TopDialog({
                    slotContent: () => {
                        this.componentBuilder();
                    },
                    model: this.model,
                    isAnimation: this.isAnimation
                });
                jsDialog.setController(this.topController);
                View.create(jsDialog);
            },
            customStyle: true,
            alignment: DialogAlignment.Top
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TopContent_Params) {
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.isAnimation !== undefined) {
            this.isAnimation = params.isAnimation;
        }
        if (params.topController !== undefined) {
            this.topController = params.topController;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__isAnimation.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private scroller: Scroller;
    private __model: ObservedPropertyObject<BaseCenterMode>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: BaseCenterMode) {
        this.__model.set(newValue);
    }
    private __isAnimation: ObservedPropertySimple<boolean>;
    get isAnimation() {
        return this.__isAnimation.get();
    }
    set isAnimation(newValue: boolean) {
        this.__isAnimation.set(newValue);
    }
    aboutToAppear() {
        this.model.dialogBgColor = '#008577';
        this.model.dialogHeight = 400;
        this.model.dialogWidth = '100%';
        this.model.popupAnimation = animation('translateFromTop');
    }
    private topController: CustomDialogController;
    componentBuilder(parent = null) {
        Stack.create({ alignContent: Alignment.TopStart });
        Stack.height('100%');
        Stack.padding(10);
        Scroll.create(this.scroller);
        Column.create();
        Column.padding(20);
        Text.create('我是从顶部向下弹窗的自由定位弹窗，可以做一些通知的UI交互');
        Text.fontColor(Color.White);
        Text.fontSize(20);
        Text.pop();
        Text.create('这里只是用自由定位position弹窗来演示');
        Text.fontColor(Color.White);
        Text.fontSize(20);
        Text.pop();
        Column.create();
        Column.height(200);
        Column.width('100%');
        Column.backgroundColor('#f6f6f6');
        Column.margin({ top: 20 });
        Column.pop();
        Button.createWithLabel('我知道了');
        Button.backgroundColor(Color.White);
        Button.margin({ top: 20 });
        Button.fontColor(Color.Black);
        Button.onClick(() => {
            this.topController.close();
            this.isAnimation = false;
        });
        Button.pop();
        Column.pop();
        Scroll.pop();
        Stack.pop();
    }
    render() {
        Button.createWithLabel('打开顶部弹窗');
        Button.onClick(() => {
            this.topController.open();
        });
        Button.pop();
    }
}
loadDocument(new TopContent("1", undefined, {}));
