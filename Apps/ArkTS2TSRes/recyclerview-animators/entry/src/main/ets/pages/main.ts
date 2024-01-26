interface Index_Params {
    isOn?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "main_" + ++__generate__Id;
}
/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
 *
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
import router from '@ohos.router';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.isOn = false;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.isOn !== undefined) {
            this.isOn = params.isOn;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private isOn: boolean;
    render() {
        Flex.create({ direction: FlexDirection.Column, justifyContent: FlexAlign.Start, alignItems: ItemAlign.Start });
        Flex.width('100%');
        Flex.height('100%');
        Flex.create({ direction: FlexDirection.Column, justifyContent: FlexAlign.Start, alignItems: ItemAlign.Start });
        Flex.height(150);
        Flex.margin(15);
        Flex.padding(15);
        Button.createWithLabel('ANIMATION SAMPLE PAGE');
        Button.backgroundColor('#d6d7d7');
        Button.fontColor('black');
        Button.onClick(e => {
            router.pushUrl({
                url: 'pages/index_item_animator',
                params: { isOn: this.isOn }
            });
        });
        Button.pop();
        Flex.create({ direction: FlexDirection.Row, justifyContent: FlexAlign.End });
        Row.create();
        Text.create('Set to Grid');
        Text.fontSize(18);
        Text.pop();
        Toggle.create({ isOn: false, type: ToggleType.Switch });
        Toggle.onChange((isOn: boolean) => {
            this.isOn = isOn == true ? true : false;
        });
        Toggle.pop();
        Row.pop();
        Flex.pop();
        Flex.pop();
        Button.createWithLabel('ADAPTER SAMPLE PAGE');
        Button.backgroundColor('#d6d7d7');
        Button.fontColor('black');
        Button.margin({ left: 30 });
        Button.onClick(e => {
            router.pushUrl({
                url: 'pages/index_adapter_animator'
            });
        });
        Button.pop();
        Flex.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
