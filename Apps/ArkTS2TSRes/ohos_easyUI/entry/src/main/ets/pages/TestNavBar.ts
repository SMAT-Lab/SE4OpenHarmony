interface TestNavBar_Params {
    leftClicked?: boolean;
    rightClicked?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TestNavBar_" + ++__generate__Id;
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
import { NavBar } from 'easyui';
import promptAction from '@ohos.promptAction';
class TestNavBar extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__leftClicked = new ObservedPropertySimple(false, this, "leftClicked");
        this.__rightClicked = new ObservedPropertySimple(false
        //左边文本按钮点击事件
        , this, "rightClicked");
        this.updateWithValueParams(params);
        this.declareWatch("leftClicked", this.showLeftWarn);
        this.declareWatch("rightClicked", this.showRightWarn);
    }
    updateWithValueParams(params: TestNavBar_Params) {
        if (params.leftClicked !== undefined) {
            this.leftClicked = params.leftClicked;
        }
        if (params.rightClicked !== undefined) {
            this.rightClicked = params.rightClicked;
        }
    }
    aboutToBeDeleted() {
        this.__leftClicked.aboutToBeDeleted();
        this.__rightClicked.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __leftClicked: ObservedPropertySimple<boolean>;
    get leftClicked() {
        return this.__leftClicked.get();
    }
    set leftClicked(newValue: boolean) {
        this.__leftClicked.set(newValue);
    }
    private __rightClicked: ObservedPropertySimple<boolean>;
    get rightClicked() {
        return this.__rightClicked.get();
    }
    set rightClicked(newValue: boolean) {
        this.__rightClicked.set(newValue);
    }
    //左边文本按钮点击事件
    leftClickEvent() {
        console.log("leftClickEvent");
    }
    //右边文本按钮点击事件
    rightClickEvent() {
        console.log("rightClickEvent");
    }
    //左边按钮的提示弹窗消息
    showLeftWarn() {
        promptAction.showToast({
            message: "返回",
            duration: 2000,
            bottom: 300
        });
    }
    //右边按钮的提示弹窗消息
    showRightWarn() {
        promptAction.showToast({
            message: "按钮",
            duration: 2000,
            bottom: 300
        });
    }
    render() {
        Column.create();
        Column.width("100%");
        Column.height("100%");
        Column.backgroundColor("#ffeeeeee");
        Text.create("基础用法");
        Text.fontColor("#ff737373");
        Text.margin(20);
        Text.alignSelf(ItemAlign.Start);
        Text.pop();
        Text.create("高级用法");
        Text.fontColor("#ff737373");
        Text.margin(20);
        Text.alignSelf(ItemAlign.Start);
        Text.pop();
        Column.pop();
    }
}
loadDocument(new TestNavBar("1", undefined, {}));
