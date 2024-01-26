interface Index_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
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
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Scroll.create();
        Scroll.height('100%');
        Scroll.scrollable(ScrollDirection.Vertical);
        Column.create();
        Column.width('100%');
        Column.margin({ top: 5 });
        Flex.create({ direction: FlexDirection.Column });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Button.createWithLabel('Core');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(25);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            router.pushUrl({
                url: 'pages/core'
            });
        });
        Button.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Column });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Button.createWithLabel('Sample');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(25);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            router.pushUrl({
                url: 'pages/sample'
            });
        });
        Button.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Column });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Button.createWithLabel('UploadAndDownload');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            router.pushUrl({
                url: 'pages/uploadAndDownload'
            });
        });
        Button.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Column });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Button.createWithLabel('Auxiliary');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(25);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            router.pushUrl({
                url: 'pages/auxiliary'
            });
        });
        Button.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Column });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Button.createWithLabel('Crypto');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(25);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            router.pushUrl({
                url: 'pages/crypto'
            });
        });
        Button.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Column });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Button.createWithLabel('Encode_Decode_sample');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(25);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            router.pushUrl({
                url: 'pages/encode_decode_sample'
            });
        });
        Button.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Column });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Button.createWithLabel('Compression');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(25);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            router.pushUrl({
                url: 'pages/compression'
            });
        });
        Button.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Column });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Button.createWithLabel('sockets');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(25);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            router.pushUrl({
                url: 'pages/sockets'
            });
        });
        Button.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Column });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Button.createWithLabel('RetryAndFollowUp');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(25);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            router.pushUrl({
                url: 'pages/retry'
            });
        });
        Button.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Column });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Button.createWithLabel('http2');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(25);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            router.pushUrl({
                url: 'pages/http2'
            });
        });
        Button.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Column });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Button.createWithLabel('Ip优选');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(25);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            router.pushUrl({
                url: 'pages/dns'
            });
        });
        Button.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Column });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Button.createWithLabel('自定义证书_单向证书');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(25);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            router.pushUrl({
                url: 'pages/unidirectionalCustomCertificate'
            });
        });
        Button.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Column });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Button.createWithLabel('自定义证书_双向证书');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(25);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            router.pushUrl({
                url: 'pages/bidirectionalCustomCertificate'
            });
        });
        Button.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Column });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Button.createWithLabel('证书校验');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(25);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            router.pushUrl({
                url: 'pages/certificate_cert'
            });
        });
        Button.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Column });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Button.createWithLabel('responseData');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(25);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            router.push({
                url: 'pages/WidgetsPage'
            });
        });
        Button.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Column });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Button.createWithLabel('请求队列+优先级');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(20);
        Button.fontColor(0xFFFFFF);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            router.pushUrl({
                url: 'pages/priorityQueue'
            });
        });
        Button.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Column });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Button.createWithLabel('requestGzip');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(20);
        Button.fontColor(0xFFFFFF);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            router.pushUrl({
                url: 'pages/requestGzip'
            });
        });
        Button.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Column });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Button.createWithLabel('eventListener');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(25);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            router.push({
                url: 'pages/eventListener'
            });
        });
        Button.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Column });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Button.createWithLabel('证书锁定');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(25);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            router.pushUrl({
                url: 'pages/certificate_pinner'
            });
        });
        Button.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Column });
        Flex.height('10%');
        Flex.width('100%');
        Flex.padding(10);
        Button.createWithLabel('设置代理');
        Button.width('80%');
        Button.height('100%');
        Button.fontSize(25);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick((event: ClickEvent) => {
            router.pushUrl({
                url: 'pages/Proxy'
            });
        });
        Button.pop();
        Flex.pop();
        Blank.create();
        Blank.height(150);
        Blank.pop();
        Column.pop();
        Scroll.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
