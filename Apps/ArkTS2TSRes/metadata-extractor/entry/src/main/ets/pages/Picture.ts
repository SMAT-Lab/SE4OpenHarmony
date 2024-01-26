interface Picture_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Picture_" + ++__generate__Id;
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
class Picture extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Picture_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Start, justifyContent: FlexAlign.Start });
        Flex.width('100%');
        Flex.height('100%');
        Column.create();
        Text.create("GIF");
        Text.fontSize(25);
        Text.padding(10);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.border({ width: "2px", color: "#000000" });
        Text.onClick(() => {
            router.pushUrl({
                url: "pages/GifSample"
            });
        });
        Text.pop();
        Text.create("ICO");
        Text.fontSize(25);
        Text.padding(10);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.border({ width: "2px", color: "#000000" });
        Text.onClick(() => {
            router.pushUrl({
                url: "pages/IcoSample"
            });
        });
        Text.pop();
        Text.create("PCX");
        Text.fontSize(25);
        Text.padding(10);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.border({ width: "2px", color: "#000000" });
        Text.onClick(() => {
            router.pushUrl({
                url: "pages/PcxSample"
            });
        });
        Text.pop();
        Text.create("PNG");
        Text.fontSize(25);
        Text.padding(10);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.border({ width: "2px", color: "#000000" });
        Text.onClick(() => {
            router.pushUrl({
                url: "pages/PngSample"
            });
        });
        Text.pop();
        Text.create("Bmp");
        Text.fontSize(25);
        Text.padding(10);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.border({ width: "2px", color: "#000000" });
        Text.onClick(() => {
            router.pushUrl({
                url: "pages/BmpSample"
            });
        });
        Text.pop();
        Text.create("WEBP");
        Text.fontSize(25);
        Text.padding(10);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.border({ width: "2px", color: "#000000" });
        Text.onClick(() => {
            router.pushUrl({
                url: "pages/WebpSample"
            });
        });
        Text.pop();
        Text.create("JPG");
        Text.fontSize(25);
        Text.padding(10);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.border({ width: "2px", color: "#000000" });
        Text.onClick(() => {
            router.pushUrl({
                url: "pages/JpgSample"
            });
        });
        Text.pop();
        Text.create("PSD");
        Text.fontSize(25);
        Text.padding(10);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.border({ width: "2px", color: "#000000" });
        Text.onClick(() => {
            router.pushUrl({
                url: "pages/PsdSample"
            });
        });
        Text.pop();
        Column.pop();
        Flex.pop();
    }
}
loadDocument(new Picture("1", undefined, {}));
