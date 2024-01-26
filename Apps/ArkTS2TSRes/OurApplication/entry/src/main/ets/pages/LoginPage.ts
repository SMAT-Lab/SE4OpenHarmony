interface LoginPage_Params {
    account?: string;
    password?: string;
    isShowProgress?: boolean;
    timeOutId?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "LoginPage_" + ++__generate__Id;
}
import router from '@ohos.router';
import prompt from '@ohos.promptAction';
import CommonConstants from '../common/constants/CommonConstants';
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
    Line.height($r('app.float.small_text_size'));
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
        this.__account = new ObservedPropertySimple("", this, "account");
        this.__password = new ObservedPropertySimple("", this, "password");
        this.__isShowProgress = new ObservedPropertySimple(false, this, "isShowProgress");
        this.timeOutId = null;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: LoginPage_Params) {
        if (params.account !== undefined) {
            this.account = params.account;
        }
        if (params.password !== undefined) {
            this.password = params.password;
        }
        if (params.isShowProgress !== undefined) {
            this.isShowProgress = params.isShowProgress;
        }
        if (params.timeOutId !== undefined) {
            this.timeOutId = params.timeOutId;
        }
    }
    aboutToBeDeleted() {
        this.__account.aboutToBeDeleted();
        this.__password.aboutToBeDeleted();
        this.__isShowProgress.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __account: ObservedPropertySimple<string>;
    get account() {
        return this.__account.get();
    }
    set account(newValue: string) {
        this.__account.set(newValue);
    }
    private __password: ObservedPropertySimple<string>;
    get password() {
        return this.__password.get();
    }
    set password(newValue: string) {
        this.__password.set(newValue);
    }
    private __isShowProgress: ObservedPropertySimple<boolean>;
    get isShowProgress() {
        return this.__isShowProgress.get();
    }
    set isShowProgress(newValue: boolean) {
        this.__isShowProgress.set(newValue);
    }
    private timeOutId;
    imageButton(src: Resource, parent = null) {
        Button.createWithChild({ type: ButtonType.Circle, stateEffect: true });
        Button.height($r('app.float.other_login_image_size'));
        Button.width($r('app.float.other_login_image_size'));
        Button.backgroundColor($r('app.color.background'));
        Image.create(src);
        Button.pop();
    }
    login() {
        if (this.account === '' || this.password === '') {
            prompt.showToast({
                message: $r('app.string.input_empty_tips')
            });
        }
        else {
            this.isShowProgress = true;
            if (this.timeOutId === null) {
                this.timeOutId = setTimeout(() => {
                    this.isShowProgress = false;
                    this.timeOutId = null;
                    router.replaceUrl({ url: 'pages/FirstPage' });
                }, CommonConstants.LOGIN_DELAY_TIME);
            }
        }
    }
    aboutToAppear() {
        clearTimeout(this.timeOutId);
        this.timeOutId = null;
    }
    render() {
        Column.create();
        Column.height('100%');
        Image.create($r('app.media.weini'));
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
            this.account = value;
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
        Button.createWithLabel($r('app.string.login'));
        Button.type(ButtonType.Capsule);
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
        If.create();
        if (this.isShowProgress) {
            If.branchId(0);
            LoadingProgress.create();
            LoadingProgress.color($r('app.color.loading_color'));
            LoadingProgress.width($r('app.float.login_progress_size'));
            LoadingProgress.height($r('app.float.login_progress_size'));
            LoadingProgress.margin({ top: $r('app.float.login_progress_margin_top') });
        }
        If.pop();
        Blank.create();
        Blank.pop();
        Column.pop();
    }
}
loadDocument(new LoginPage("1", undefined, {}));
