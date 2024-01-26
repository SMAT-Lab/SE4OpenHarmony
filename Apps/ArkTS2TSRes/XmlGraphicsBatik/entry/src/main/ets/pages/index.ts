interface Index_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "index_" + ++__generate__Id;
}
/**
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import router from '@system.router';
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
        Button.createWithLabel('show svg');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.width(300);
        Button.height(50);
        Button.onClick(() => {
            router.push({ uri: "pages/testShowSVGImagePage" });
        });
        Button.pop();
        Button.createWithLabel('test operate svg obj');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.width(300);
        Button.height(50);
        Button.margin({ top: 5 });
        Button.onClick(() => {
            router.push({ uri: "pages/testOperateSVGPage" });
        });
        Button.pop();
        Button.createWithLabel('test operate rect obj');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.width(300);
        Button.height(50);
        Button.margin({ top: 5 });
        Button.onClick(() => {
            router.push({ uri: "pages/testOperateRectPage" });
        });
        Button.pop();
        Button.createWithLabel('test operate circle obj');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.width(300);
        Button.height(50);
        Button.margin({ top: 5 });
        Button.onClick(() => {
            router.push({ uri: "pages/testOperateCirclePage" });
        });
        Button.pop();
        Button.createWithLabel('test operate ellipse obj');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.width(300);
        Button.height(50);
        Button.margin({ top: 5 });
        Button.onClick(() => {
            router.push({ uri: "pages/testOperateEllipsePage" });
        });
        Button.pop();
        Button.createWithLabel('test operate line obj');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.width(300);
        Button.height(50);
        Button.margin({ top: 5 });
        Button.onClick(() => {
            router.push({ uri: "pages/testOperateLinePage" });
        });
        Button.pop();
        Button.createWithLabel('test operate polyline obj');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.width(300);
        Button.height(50);
        Button.margin({ top: 5 });
        Button.onClick(() => {
            router.push({ uri: "pages/testOperatePolylinePage" });
        });
        Button.pop();
        Button.createWithLabel('test operate polygon obj');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.width(300);
        Button.height(50);
        Button.margin({ top: 5 });
        Button.onClick(() => {
            router.push({ uri: "pages/testOperatePolygonPage" });
        });
        Button.pop();
        Button.createWithLabel('test operate path obj');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.width(300);
        Button.height(50);
        Button.margin({ top: 5 });
        Button.onClick(() => {
            router.push({ uri: "pages/testOperatePathPage" });
        });
        Button.pop();
        Button.createWithLabel('test parse svg file obj');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.width(300);
        Button.height(50);
        Button.margin({ top: 5 });
        Button.onClick(() => {
            router.push({ uri: "pages/testParseSVGFilePage" });
        });
        Button.pop();
        Flex.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
