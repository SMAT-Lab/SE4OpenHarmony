interface Index_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
import router from '@ohos.router';
import { ParamType } from "../util/interface";
let params = router.getParams() as ParamType;
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Button.createWithLabel('二维码', { type: ButtonType.Capsule, stateEffect: true });
        Button.backgroundColor(0x317aff);
        Button.width(240);
        Button.onClick(() => {
            let path = 'pages/qrCodePage';
            router.pushUrl({ url: path });
        });
        Button.pop();
        Button.createWithLabel('一维码', { type: ButtonType.Capsule, stateEffect: true });
        Button.backgroundColor(0x317aff);
        Button.width(240);
        Button.margin(20);
        Button.onClick(() => {
            let path = 'pages/zxingPage';
            router.pushUrl({ url: path });
        });
        Button.pop();
        Button.createWithLabel('扫一扫', { type: ButtonType.Capsule, stateEffect: true });
        Button.backgroundColor(0x317aff);
        Button.width(240);
        Button.margin({ bottom: 20 });
        Button.onClick(() => {
            let path = 'pages/scanCode';
            router.pushUrl({ url: path });
        });
        Button.pop();
        If.create();
        if (!!params) {
            If.branchId(0);
            Text.create("扫描结果：" + params.scanData);
            Text.width("100%");
            Text.textAlign(TextAlign.Center);
            Text.pop();
        }
        If.pop();
        Flex.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
