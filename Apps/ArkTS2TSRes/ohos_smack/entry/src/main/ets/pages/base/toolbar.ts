interface Toolbar_Params {
    title?: string;
    isBack?: boolean;
    rightText?: string;
    rightIcon?: Resource | string;
    rightClickCallBack?: () => void;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "toolbar_" + ++__generate__Id;
}
/**
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 *
 * This software is distributed under a license. The full license
 * agreement can be found in the file LICENSE in this distribution.
 * This software may not be copied, modified, sold or distributed
 * other than expressed in the named license agreement.
 *
 * This software is distributed without any warranty.
 */
import router from '@ohos.router';
export class Toolbar extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.title = 'title';
        this.isBack = false;
        this.rightText = '';
        this.rightIcon = '';
        this.rightClickCallBack = () => { };
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
        if (params.rightClickCallBack !== undefined) {
            this.rightClickCallBack = params.rightClickCallBack;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private title: string;
    private isBack: boolean;
    private rightText: string;
    private rightIcon: Resource | string;
    private rightClickCallBack: () => void;
    render() {
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.height(px2vp(100));
        Flex.backgroundColor('#ff56ae97');
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Start, justifyContent: FlexAlign.Start });
        Flex.width('20%');
        Column.create();
        Column.padding(10);
        Column.visibility(this.isBack ? Visibility.Visible : Visibility.Hidden);
        Column.onClick(e => {
            router.back();
        });
        Image.create($r("app.media.back"));
        Image.width(px2vp(40));
        Image.height(px2vp(40));
        Image.margin({ left: 20 });
        Column.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('60%');
        Text.create(this.title);
        Text.fontSize(px2fp(35));
        Text.fontColor('white');
        Text.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.End, justifyContent: FlexAlign.End });
        Flex.width('30%');
        Stack.create();
        Stack.padding(10);
        Stack.onClick(e => {
            this.rightClickCallBack();
        });
        Text.create('');
        Text.visibility(Visibility.Hidden);
        Text.pop();
        If.create();
        if (this.rightText != '') {
            If.branchId(0);
            Text.create(this.rightText);
            Text.fontSize(px2fp(30));
            Text.fontColor('white');
            Text.pop();
        }
        If.pop();
        If.create();
        if (this.rightIcon != '') {
            If.branchId(0);
            Image.create(this.rightIcon);
            Image.width(px2vp(40));
            Image.height(px2vp(40));
            Image.margin({ right: 20 });
        }
        If.pop();
        Stack.pop();
        Flex.pop();
        Flex.pop();
    }
}
