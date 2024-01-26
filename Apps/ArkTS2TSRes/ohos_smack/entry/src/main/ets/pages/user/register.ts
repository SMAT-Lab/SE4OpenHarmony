interface Register_Params {
    userName?: string;
    passWord?: string;
    email?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "register_" + ++__generate__Id;
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
import { Toolbar } from '../base/toolbar';
import { Constant } from '../../entity/Constant';
import prompt from '@ohos.prompt';
import { Smack } from '@ohos/smack';
class Register extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.userName = '';
        this.passWord = '';
        this.email = '';
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Register_Params) {
        if (params.userName !== undefined) {
            this.userName = params.userName;
        }
        if (params.passWord !== undefined) {
            this.passWord = params.passWord;
        }
        if (params.email !== undefined) {
            this.email = params.email;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private userName: string;
    private passWord: string;
    private email: string;
    render() {
        Column.create();
        let earlierCreatedChild_2: Toolbar = (this && this.findChildById) ? this.findChildById("2") as Toolbar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new Toolbar("2", this, { title: '注册', isBack: true }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                title: '注册', isBack: true
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        Column.create();
        Column.margin({ top: 100 });
        Column.padding({ left: 50, right: 50 });
        Column.height('100%');
        Column.width('100%');
        Column.create();
        TextInput.create({ placeholder: '请输入用户名' });
        TextInput.margin({ bottom: 20 });
        TextInput.height(px2vp(100));
        TextInput.fontSize(px2fp(30));
        TextInput.type(InputType.Normal);
        TextInput.onChange(v => {
            this.userName = v;
        });
        TextInput.create({ placeholder: '请输入密码' });
        TextInput.margin({ bottom: 20 });
        TextInput.height(px2vp(100));
        TextInput.fontSize(px2fp(30));
        TextInput.type(InputType.Normal);
        TextInput.onChange(v => {
            this.passWord = v;
        });
        Button.createWithLabel('注 册');
        Button.width('100%');
        Button.margin({ top: 25 });
        Button.height(px2vp(80));
        Button.fontSize(px2fp(30));
        Button.onClick(v => {
            this.onRegister();
        });
        Button.pop();
        Column.pop();
        Column.pop();
        Column.pop();
    }
    // 注册
    private onRegister() {
        if (this.userName == '' || this.passWord == '') {
            prompt.showToast({
                message: '请输入完整信息'
            });
        }
        else {
            let result: number = Smack.registers(Constant.HOST_IP, this.userName, this.passWord);
            if (result == 0) {
                router.back();
            }
            else {
                prompt.showToast({
                    message: '注册失败'
                });
            }
        }
    }
}
loadDocument(new Register("1", undefined, {}));
