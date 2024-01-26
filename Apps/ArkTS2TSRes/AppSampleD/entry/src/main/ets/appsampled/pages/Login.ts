interface Login_Params {
    loginController?: LoginController;
    phoneNumber?: string;
    password?: string;
    isLoginSuccess?: boolean;
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
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import promptAction from '@ohos.promptAction';
import router from '@ohos.router';
import Logger from '../../utils/Logger';
import LoginController from '../../controller/LoginController';
import LoginResult from '../data/LoginResult';
import User from '../data/User';
import { BusinessError } from '@ohos.base';
const TAG: string = '[Login]';
class Login extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.loginController = new LoginController();
        this.__phoneNumber = new ObservedPropertySimple('13111111111', this, "phoneNumber");
        this.__password = new ObservedPropertySimple('123456', this, "password");
        this.__isLoginSuccess = new ObservedPropertySimple(false, this, "isLoginSuccess");
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
    }
    aboutToBeDeleted() {
        this.__phoneNumber.aboutToBeDeleted();
        this.__password.aboutToBeDeleted();
        this.__isLoginSuccess.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private loginController: LoginController;
    private __phoneNumber: ObservedPropertySimple<string>;
    get phoneNumber() {
        return this.__phoneNumber.get();
    }
    set phoneNumber(newValue: string) {
        this.__phoneNumber.set(newValue);
    }
    private __password: ObservedPropertySimple<string>;
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
    pageTransition() {
        PageTransition.create();
        // 登录页面从底部滑入滑出
        PageTransitionEnter.create({ type: RouteType.Push, duration: 300 });
        // 登录页面从底部滑入滑出
        PageTransitionEnter.slide(SlideEffect.Bottom);
        PageTransitionExit.create({ type: RouteType.Pop, duration: 300 });
        PageTransitionExit.slide(SlideEffect.Bottom);
        PageTransition.pop();
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor($r('app.color.COLOR_FFFFFF'));
        Row.create();
        Row.width('80%');
        Row.height('8%');
        Row.margin({ bottom: 10 });
        Row.justifyContent(FlexAlign.Start);
        Text.create($r('app.string.LoginByPhone'));
        Text.height('100%');
        Text.fontColor($r('app.color.COLOR_E6000000'));
        Text.fontSize(24);
        Text.fontFamily($r('app.string.Font_family_medium'));
        Text.pop();
        Row.pop();
        Column.create({ space: 10 });
        Column.width('100%');
        Column.height('92%');
        Stack.create();
        Stack.width('80%');
        Stack.height(50);
        TextInput.create({ placeholder: $r('app.string.Input_phone') });
        TextInput.width('100%');
        TextInput.height(50);
        TextInput.borderRadius(5);
        TextInput.type(InputType.PhoneNumber);
        TextInput.onChange(value => {
            this.phoneNumber = value;
        });
        Stack.pop();
        TextInput.create({ placeholder: $r('app.string.Input_password') });
        TextInput.width('80%');
        TextInput.height(50);
        TextInput.borderRadius(5);
        TextInput.type(InputType.Password);
        TextInput.onChange(value => {
            this.password = value;
        });
        Row.create();
        Row.width('80%');
        Row.height(20);
        Row.justifyContent(FlexAlign.Start);
        Image.create($r('app.media.app_icon'));
        Image.width(240);
        Image.height(25);
        Image.objectFit(ImageFit.Contain);
        Row.pop();
        Text.create($r('app.string.Login'));
        Text.id('login');
        Text.width('80%');
        Text.height(50);
        Text.borderRadius(10);
        Text.textAlign(TextAlign.Center);
        Text.backgroundColor($r('app.color.COLOR_FF785F'));
        Text.fontColor($r('app.color.COLOR_FFFFFF'));
        Text.fontSize(20);
        Text.fontFamily($r('app.string.Font_family_medium'));
        Text.onClick(e => {
            this.loginController.login(this.phoneNumber, this.password).then(res => {
                Logger.info(TAG, `login then: ${JSON.stringify(res)}`);
                // 提示服务端返回的登录信息
                promptAction.showToast({ message: res.getMessage(), duration: 1000, bottom: 500 });
                setTimeout(() => {
                    if (res.getCode() === 200) {
                        let data: LoginResult = res.getData();
                        Logger.info(TAG, `login success: ${JSON.stringify(data.getToken())}`);
                        // 存储用户信息, 包括token
                        AppStorage.setOrCreate("userInfo", data);
                        // 分别存储当前用户和对端用户的用户名和头像
                        if (data.getUsername() === '13111111111') {
                            let currUser = new User(data.getUsername(), $r('app.media.app_icon'));
                            let oppositeUser = new User('13122222222', $r('app.media.app_icon'));
                            AppStorage.setOrCreate("currentUser", currUser);
                            AppStorage.setOrCreate("oppositeUser", oppositeUser);
                        }
                        else {
                            let currentUser = new User(data.getUsername(), $r('app.media.app_icon'));
                            let oppositeUser = new User('13111111111', $r('app.media.app_icon'));
                            AppStorage.setOrCreate("currentUser", currentUser);
                            AppStorage.setOrCreate("oppositeUser", oppositeUser);
                        }
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
        Text.pop();
        Column.pop();
        Column.pop();
    }
}
loadDocument(new Login("1", undefined, {}));
