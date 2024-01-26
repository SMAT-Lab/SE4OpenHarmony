interface OtherSample_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "OtherSample_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
class OtherSample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: OtherSample_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Column.create();
        Button.createWithLabel("AdobeJpegReader", { type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(8);
        Button.width("70%");
        Button.height("8%");
        Button.margin("2%");
        Button.onClick(() => {
            router.pushUrl({
                url: "pages/AdobeJpeg"
            });
        });
        Button.pop();
        Button.createWithLabel("ExifReader", { type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(8);
        Button.width("70%");
        Button.height("8%");
        Button.margin("2%");
        Button.onClick(() => {
            router.pushUrl({
                url: "pages/ExifReaderSample"
            });
        });
        Button.pop();
        Column.pop();
        Flex.pop();
    }
}
loadDocument(new OtherSample("1", undefined, {}));
