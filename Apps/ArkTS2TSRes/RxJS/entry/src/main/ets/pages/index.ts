interface Index_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "index_" + ++__generate__Id;
}
/*
 * Copyright (C) 2024 Huawei Device Co., Ltd.
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
    MyButton(content: string, eventType: number, parent = null) {
        Button.createWithLabel(content, { type: ButtonType.Normal });
        Button.borderRadius(5);
        Button.width(300);
        Button.fontColor('#ffffff');
        Button.fontSize(15);
        Button.padding({ top: 12, right: 6, bottom: 12, left: 6 });
        Button.margin({ top: 10, left: 10, right: 10 });
        Button.alignSelf(ItemAlign.Center);
        Button.onClick((event: ClickEvent) => {
            this.click(eventType);
        });
        Button.pop();
    }
    render() {
        Scroll.create();
        Scroll.width('100%');
        Scroll.height('100%');
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center });
        this.MyButton('创建操作', 1, this);
        this.MyButton('过滤操作', 2, this);
        this.MyButton('多播操作', 3, this);
        this.MyButton('组合操作', 4, this);
        this.MyButton('错误操作', 5, this);
        this.MyButton('条件操作', 6, this);
        this.MyButton('转换操作', 7, this);
        this.MyButton('工具', 8, this);
        this.MyButton('调度器', 9, this);
        Flex.pop();
        Scroll.pop();
    }
    click(eventType: number) {
        switch (eventType) {
            case 1:
                router.pushUrl({ url: 'pages/create' });
                break;
            case 2:
                router.pushUrl({ url: 'pages/filter' });
                break;
            case 3:
                router.pushUrl({ url: 'pages/multicast' });
                break;
            case 4:
                router.pushUrl({ url: 'pages/combine' });
                break;
            case 5:
                router.pushUrl({ url: 'pages/error' });
                break;
            case 6:
                router.pushUrl({ url: 'pages/condition' });
                break;
            case 7:
                router.pushUrl({ url: 'pages/convert' });
                break;
            case 8:
                router.pushUrl({ url: 'pages/tool' });
                break;
            case 9:
                router.pushUrl({ url: 'pages/scheduler' });
                break;
        }
    }
}
loadDocument(new Index("1", undefined, {}));
