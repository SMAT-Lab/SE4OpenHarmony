interface Third_Params {
    content?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Third_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License")
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
import router from '@ohos.router';
class Third extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.content = "Third Page";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Third_Params) {
        if (params.content !== undefined) {
            this.content = params.content;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private content: string;
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Text.create(`${this.content}`);
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Button.createWithChild();
        Button.type(ButtonType.Capsule);
        Button.margin({
            top: 20
        });
        Button.backgroundColor('#0D9FFB');
        Button.onClick(() => {
            router.back();
        });
        Text.create('doubleClick');
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Button.pop();
        Flex.pop();
    }
}
loadDocument(new Third("1", undefined, {}));
