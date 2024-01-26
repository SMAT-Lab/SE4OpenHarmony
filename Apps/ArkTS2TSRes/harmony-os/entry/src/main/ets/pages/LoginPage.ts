interface LoginPage_Params {
    message?: string;
    phone?: string;
    password?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "LoginPage_" + ++__generate__Id;
}
import promptAction from '@ohos.promptAction';
import http from '@ohos.net.http';
import CommonConstants from '../common/constants/CommonConstants';
import router from '@ohos.router';
function __TextInput__inputStyle(): void {
    TextInput.placeholderColor($r('app.color.placeholder_color'));
    TextInput.height($r('app.float.login_input_height'));
    TextInput.fontSize($r('app.float.big_text_size'));
    TextInput.backgroundColor($r('app.color.background'));
    TextInput.width(CommonConstants.FULL_PARENT);
    TextInput.padding({ left: CommonConstants.INPUT_PADDING_LEFT });
    TextInput.margin({ top: $r('app.float.input_margin_top') });
}
function __Line__lineStyle(): void {
    Line.width(CommonConstants.FULL_PARENT);
    Line.height($r('app.float.line_height'));
    Line.backgroundColor($r('app.color.line_color'));
}
function __Text__blueTextStyle(): void {
    Text.fontColor($r('app.color.login_blue_text_color'));
    Text.fontSize($r('app.float.small_text_size'));
    Text.fontWeight(FontWeight.Medium);
}
class LoginPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.__phone = new ObservedPropertySimple('', this, "phone");
        this.__password = new ObservedPropertySimple('', this, "password");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: LoginPage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.phone !== undefined) {
            this.phone = params.phone;
        }
        if (params.password !== undefined) {
            this.password = params.password;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__phone.aboutToBeDeleted();
        this.__password.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __phone: ObservedPropertySimple<string>;
    get phone() {
        return this.__phone.get();
    }
    set phone(newValue: string) {
        this.__phone.set(newValue);
    }
    private __password: ObservedPropertySimple<string>;
    get password() {
        return this.__password.get();
    }
    set password(newValue: string) {
        this.__password.set(newValue);
    }
    login() {
        if (this.phone === '' || this.password === '') {
            //   当号码或密码为空，给提示
            promptAction.showToast({
                message: '账号或密码不能为空',
                duration: 500
            });
        }
        else {
            let httpRequest = http.createHttp();
            let url = "http://localhost:8089/api/user/login_app";
            httpRequest.request(url, {
                method: http.RequestMethod.POST,
                header: {
                    'Content-Type': 'application/json'
                },
                extraData: {
                    phone: this.phone,
                    password: this.password
                },
                connectTimeout: 6000
            }).then((data) => {
                console.log(data.result.toString());
                let code = JSON.parse(data.result.toString()).code;
                let user = JSON.parse(data.result.toString()).data;
                if (code == 200) {
                    router.replaceUrl({
                        url: 'pages/MainPage',
                        params: {
                            user
                        }
                    });
                }
                else {
                    promptAction.showDialog({
                        message: data.result.toString()
                    });
                }
            }, (error) => {
                promptAction.showDialog({
                    message: error
                });
            });
        }
    }
    imageButton(src: Resource, parent = null) {
        Button.createWithChild({ type: ButtonType.Circle, stateEffect: true });
        Button.height($r('app.float.other_login_image_size'));
        Button.width($r('app.float.other_login_image_size'));
        Button.backgroundColor($r('app.color.background'));
        Image.create(src);
        Button.pop();
    }
    render() {
        Column.create();
        Column.backgroundColor($r('app.color.background'));
        Column.height(CommonConstants.FULL_PARENT);
        Column.width(CommonConstants.FULL_PARENT);
        Column.padding({
            left: $r('app.float.page_padding_hor'),
            right: $r('app.float.page_padding_hor'),
            bottom: $r('app.float.login_page_padding_bottom')
        });
        Image.create($r('app.media.logo'));
        Image.width($r('app.float.logo_image_size'));
        Image.height($r('app.float.logo_image_size'));
        Image.margin({ top: $r('app.float.logo_margin_top'), bottom: $r('app.float.logo_margin_bottom') });
        Text.create($r('app.string.login_page'));
        Text.fontSize($r('app.float.page_title_text_size'));
        Text.fontWeight(FontWeight.Medium);
        Text.fontColor($r('app.color.title_text_color'));
        Text.pop();
        Text.create($r('app.string.login_more'));
        Text.fontSize($r('app.float.normal_text_size'));
        Text.fontColor($r('app.color.login_more_text_color'));
        Text.margin({ bottom: $r('app.float.login_more_margin_bottom'), top: $r('app.float.login_more_margin_top') });
        Text.pop();
        TextInput.create({ placeholder: $r('app.string.account') });
        TextInput.maxLength(CommonConstants.INPUT_ACCOUNT_LENGTH);
        TextInput.type(InputType.Number);
        __TextInput__inputStyle();
        TextInput.onChange((value: string) => {
            this.phone = value;
        });
        Line.create();
        __Line__lineStyle();
        TextInput.create({ placeholder: $r('app.string.password') });
        TextInput.maxLength(CommonConstants.INPUT_PASSWORD_LENGTH);
        TextInput.type(InputType.Password);
        __TextInput__inputStyle();
        TextInput.onChange((value: string) => {
            this.password = value;
        });
        Line.create();
        __Line__lineStyle();
        Row.create();
        Row.justifyContent(FlexAlign.SpaceBetween);
        Row.width(CommonConstants.FULL_PARENT);
        Row.margin({ top: $r('app.float.forgot_margin_top') });
        Text.create($r('app.string.message_login'));
        __Text__blueTextStyle();
        Text.pop();
        Text.create($r('app.string.forgot_password'));
        __Text__blueTextStyle();
        Text.pop();
        Row.pop();
        Button.createWithLabel($r('app.string.login'));
        Button.width(CommonConstants.BUTTON_WIDTH);
        Button.height($r('app.float.login_button_height'));
        Button.fontSize($r('app.float.normal_text_size'));
        Button.fontWeight(FontWeight.Medium);
        Button.backgroundColor($r('app.color.login_button_color'));
        Button.margin({ top: $r('app.float.login_button_margin_top'), bottom: $r('app.float.login_button_margin_bottom') });
        Button.onClick(() => {
            this.login();
        });
        Button.pop();
        Text.create($r('app.string.register_account'));
        Text.fontColor($r('app.color.login_blue_text_color'));
        Text.fontSize($r('app.float.normal_text_size'));
        Text.fontWeight(FontWeight.Medium);
        Text.pop();
        Text.create($r('app.string.other_login_method'));
        Text.fontColor($r('app.color.other_login_text_color'));
        Text.fontSize($r('app.float.little_text_size'));
        Text.fontWeight(FontWeight.Medium);
        Text.margin({ top: $r('app.float.other_login_margin_top'), bottom: $r('app.float.other_login_margin_bottom') });
        Text.pop();
        // {space:CommonConstants.LOGIN_METHODS_SPACE}设置行内组件间的间距
        Row.create({ space: CommonConstants.LOGIN_METHODS_SPACE });
        this.imageButton($r('app.media.login_method1'), this);
        this.imageButton($r('app.media.login_method2'), this);
        this.imageButton($r('app.media.login_method3'), this);
        // {space:CommonConstants.LOGIN_METHODS_SPACE}设置行内组件间的间距
        Row.pop();
        Column.pop();
    }
}
loadDocument(new LoginPage("1", undefined, {}));
