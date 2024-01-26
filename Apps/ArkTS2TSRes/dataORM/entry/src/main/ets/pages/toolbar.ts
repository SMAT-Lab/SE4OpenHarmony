interface Toolbar_Params {
    title?: string;
    isBack?: boolean;
    rightText?: string;
    rightIcon?: Resource | string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "toolbar_" + ++__generate__Id;
}
/*
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
import router from '@ohos.router';
export class Toolbar extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.title = 'title';
        this.isBack = false;
        this.rightText = '';
        this.rightIcon = '';
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Toolbar_Params) {
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.isBack !== undefined) {
            this.isBack = params.isBack;
        }
        if (params.rightText !== undefined) {
            this.rightText = params.rightText;
        }
        if (params.rightIcon !== undefined) {
            this.rightIcon = params.rightIcon;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private title: string;
    private isBack: boolean;
    private rightText: string;
    private rightIcon: Resource | string;
    render() {
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.height(60);
        Flex.backgroundColor('#ff56ae97');
        Flex.zIndex(99);
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Start, justifyContent: FlexAlign.Start });
        Flex.width('20%');
        Column.create();
        Column.padding(10);
        Column.visibility(this.isBack ? Visibility.Visible : Visibility.Hidden);
        Column.onClick(e => {
            router.back();
        });
        Image.create($r("app.media.back"));
        Image.width(40);
        Image.height(40);
        Image.margin({ left: 20 });
        Column.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('60%');
        Text.create(this.title);
        Text.fontSize(20);
        Text.fontColor('white');
        Text.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.End, justifyContent: FlexAlign.End });
        Flex.width('20%');
        Stack.create();
        Stack.padding(10);
        Stack.onClick(e => {
            //this.rightClickCallBack()
        });
        Text.create('');
        Text.visibility(Visibility.Hidden);
        Text.pop();
        If.create();
        if (this.rightText != '') {
            If.branchId(0);
            Text.create(this.rightText);
            Text.fontSize(30);
            Text.fontColor('white');
            Text.pop();
        }
        If.pop();
        If.create();
        if (this.rightIcon != '') {
            If.branchId(0);
            Image.create(this.rightIcon);
            Image.width(40);
            Image.height(40);
            Image.margin({ right: 20 });
        }
        If.pop();
        Stack.pop();
        Flex.pop();
        Flex.pop();
    }
}
