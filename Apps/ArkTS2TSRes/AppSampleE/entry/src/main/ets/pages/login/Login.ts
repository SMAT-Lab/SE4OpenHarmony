interface Login_Params {
    loginController?: LoginController;
    phoneNumber?: string;
    password?: string;
    isLoginSuccess?: boolean;
    isPass?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Login_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Hunan OpenValley Digital Industry Development Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import router from '@ohos.router';
import promptAction from '@ohos.promptAction';
import LoginController from '../../controller/LoginController';
import LoginResult from '../../data/LoginResult';
import Logger from '../../utils/Logger';
import { getStringData } from '../../utils/ResourceDataHandle';
import { BusinessError } from '@ohos.base';
const TAG: string = '[Login]';
class Login extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.loginController = new LoginController();
        this.__phoneNumber = new ObservedPropertySimple(getStringData($r('app.string.login_phone_input')), this, "phoneNumber");
        this.__password = new ObservedPropertySimple(getStringData($r('app.string.login_pass_input')), this, "password");
        this.__isLoginSuccess = new ObservedPropertySimple(false, this, "isLoginSuccess");
        this.__isPass = new ObservedPropertySimple(false, this, "isPass");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Login_Params) {
        if (params.loginController !== undefined) {
            this.loginController = params.loginController;
        }
        if (params.phoneNumber !== undefined) {
            this.phoneNumber = params.phoneNumber;
        }
        if (params.password !== undefined) {
            this.password = params.password;
        }
        if (params.isLoginSuccess !== undefined) {
            this.isLoginSuccess = params.isLoginSuccess;
        }
        if (params.isPass !== undefined) {
            this.isPass = params.isPass;
        }
    }
    aboutToBeDeleted() {
        this.__phoneNumber.aboutToBeDeleted();
        this.__password.aboutToBeDeleted();
        this.__isLoginSuccess.aboutToBeDeleted();
        this.__isPass.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private loginController: LoginController;
    private __phoneNumber: ObservedPropertySimple<string>; // 13111111111
    get phoneNumber() {
        return this.__phoneNumber.get();
    }
    set phoneNumber(newValue: string) {
        this.__phoneNumber.set(newValue);
    }
    private __password: ObservedPropertySimple<string>; // 123456
    get password() {
        return this.__password.get();
    }
    set password(newValue: string) {
        this.__password.set(newValue);
    }
    private __isLoginSuccess: ObservedPropertySimple<boolean>;
    get isLoginSuccess() {
        return this.__isLoginSuccess.get();
    }
    set isLoginSuccess(newValue: boolean) {
        this.__isLoginSuccess.set(newValue);
    }
    private __isPass: ObservedPropertySimple<boolean>;
    get isPass() {
        return this.__isPass.get();
    }
    set isPass(newValue: boolean) {
        this.__isPass.set(newValue);
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Row.create();
        Row.padding({ left: 24, right: 24 });
        Row.width('100%');
        Row.height('8%');
        Image.create($r('app.media.icon'));
        Image.width(24);
        Image.height(24);
        Blank.create();
        Blank.pop();
        Text.create($r('app.string.login_help'));
        Text.fontSize(16);
        Text.pop();
        Row.pop();
        Row.create();
        Row.width('75%');
        Row.height('16%');
        Text.create($r('app.string.login_welcome'));
        Text.fontSize(32);
        Text.padding({ top: 30 });
        Text.pop();
        Row.pop();
        Row.create();
        Row.width('75%');
        Row.height('9%');
        Column.create();
        Row.create();
        Row.layoutWeight(1);
        Row.width('100%');
        Text.create($r('app.string.login_86'));
        Text.fontColor($r('app.color.login_86'));
        Text.fontSize(18);
        Text.pop();
        Image.create($r('app.media.icon'));
        Image.width(18);
        Image.height(18);
        Image.objectFit(ImageFit.Contain);
        Image.margin({ left: 8 });
        TextInput.create({ placeholder: $r('app.string.login_phone') });
        TextInput.enableKeyboardOnFocus(false);
        TextInput.width('75%');
        TextInput.margin({ left: 16 });
        TextInput.padding({ left: 0 });
        TextInput.maxLength(11);
        TextInput.placeholderFont({ size: 24 });
        TextInput.fontSize(24);
        TextInput.placeholderColor($r('app.color.login_input'));
        TextInput.type(InputType.PhoneNumber);
        TextInput.borderRadius(0);
        TextInput.backgroundColor(Color.White);
        TextInput.onChange((value: string) => {
            this.phoneNumber = value;
            if (this.password !== '' && this.phoneNumber !== '') {
                this.isPass = true;
            }
            else {
                this.isPass = false;
            }
        });
        Blank.create();
        Blank.pop();
        Image.create($r('app.media.icon'));
        Image.width(24);
        Image.height(24);
        Image.objectFit(ImageFit.Contain);
        Image.margin({ right: 10 });
        Row.pop();
        Row.create();
        Row.width('100%');
        Divider.create();
        Divider.strokeWidth(1);
        Divider.color($r('app.color.login_divider'));
        Row.pop();
        Column.pop();
        Row.pop();
        Row.create();
        Row.width('75%');
        Row.height('9%');
        Column.create();
        Row.create();
        Row.layoutWeight(1);
        Row.width('100%');
        TextInput.create({ placeholder: $r('app.string.login_pass') });
        TextInput.focusable(true);
        TextInput.padding({ left: 0 });
        TextInput.maxLength(11);
        TextInput.placeholderFont({ size: 24 });
        TextInput.placeholderColor($r('app.color.login_input'));
        TextInput.type(InputType.Password);
        TextInput.borderRadius(0);
        TextInput.style(TextInputStyle.Inline);
        TextInput.backgroundColor(Color.White);
        TextInput.onChange((value: string) => {
            this.password = value;
            if (this.password !== '' && this.phoneNumber !== '') {
                this.isPass = true;
            }
            else {
                this.isPass = false;
            }
        });
        Row.pop();
        Row.create();
        Row.width('100%');
        Divider.create();
        Divider.strokeWidth(1);
        Divider.color($r('app.color.login_divider'));
        Row.pop();
        Column.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 50 });
        Row.width('75%');
        Row.height('5%');
        Radio.create({ value: 'Radio1', group: 'radioGroup' });
        Radio.checked(true);
        Text.create($r('app.string.login_agree'));
        Text.fontSize(16);
        Text.margin({ left: 12 });
        Text.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 18 });
        Row.width('75%');
        Row.height('8%');
        Button.createWithLabel($r('app.string.login_login'), { type: ButtonType.Normal });
        Button.borderRadius(8);
        Button.fontSize(18);
        Button.fontWeight(6);
        Button.fontColor(this.isPass ? $r('app.color.login_button_font_color_yes') : $r('app.color.login_button_font_color_no'));
        Button.backgroundColor(this.isPass ? $r('app.color.login_button_bg_yes') : $r('app.color.login_button_bg_no'));
        Button.width('100%');
        Button.height('100%');
        Button.onClick(() => {
            Logger.info(TAG, `phone=${this.phoneNumber},password=${this.password}`);
            this.loginController.login(this.phoneNumber, this.password).then(res => {
                Logger.info(TAG, `login then: ${JSON.stringify(res)}`);
                // 提示服务端返回的登录信息
                promptAction.showToast({ message: res.message, duration: 1000, bottom: 500 });
                setTimeout(() => {
                    if (res.code === 200) {
                        let data: LoginResult = res.data;
                        Logger.info(TAG, `login success: ${JSON.stringify(data.token)}`);
                        // 存储用户信息, 包括token
                        AppStorage.setOrCreate('userInfo', data);
                        // 跳转页面
                        router.pushUrl({ url: 'pages/Index' });
                        return;
                    }
                    Logger.info(TAG, `login failed: ${JSON.stringify(res)}`);
                }, 800);
            }).catch((err: BusinessError) => {
                Logger.info(TAG, `login err: ${JSON.stringify(err)}`);
                promptAction.showToast({ message: $r('app.string.Connection_timesout'), duration: 1000, bottom: 500 });
            });
        });
        Button.id('login');
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 24 });
        Row.width('75%');
        Row.height('8%');
        Text.create($r('app.string.login_captcha'));
        Text.fontSize(16);
        Text.pop();
        Blank.create();
        Blank.pop();
        Text.create($r('app.string.login_question'));
        Text.fontSize(16);
        Text.pop();
        Row.pop();
        Column.pop();
    }
}
loadDocument(new Login("1", undefined, {}));
