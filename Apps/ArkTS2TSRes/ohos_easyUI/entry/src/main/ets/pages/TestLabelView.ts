interface TestLabelView_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TestLabelView_" + ++__generate__Id;
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
import { LabelView } from 'easyui';
import prompt from '@ohos.prompt';
class TestLabelView extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TestLabelView_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        // LabelView组件测试
        //Button组件
        Stack.create();
        // LabelView组件测试
        //Button组件
        Stack.width("95%");
        // LabelView组件测试
        //Button组件
        Stack.height(80);
        // LabelView组件测试
        //Button组件
        Stack.margin({ top: 20 });
        // LabelView组件测试
        //Button组件
        Stack.border({ width: 5, color: Color.Gray, radius: 15 });
        // LabelView组件测试
        //Button组件
        Stack.backgroundColor(Color.White);
        // LabelView组件测试
        //Button组件
        Stack.shadow({
            radius: 15,
            color: Color.Gray,
            offsetX: 15,
            offsetY: 15
        });
        Button.createWithLabel("Button");
        Button.width(300);
        Button.height(60);
        Button.fontSize(25);
        Button.type(ButtonType.Normal);
        Button.pop();
        Rect.create();
        Rect.width(300);
        Rect.height(60);
        Rect.opacity(0);
        Rect.onClick(() => {
            prompt.showToast({
                message: "click button",
                duration: 1500,
                bottom: 800 // 距离底部的距离
            });
        });
        // LabelView组件测试
        //Button组件
        Stack.pop();
    }
}
loadDocument(new TestLabelView("1", undefined, {}));
