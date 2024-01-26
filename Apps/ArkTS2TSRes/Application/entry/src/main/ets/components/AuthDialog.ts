interface AuthDialog_Params {
    agcAuth?: AGCAuth;
    controller?: CustomDialogController;
    countryCode?: string;
    phoneNumber?: string;
    verificationCode?: string;
    intervalId?: number;
    timer?: number;
    canLogin?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "AuthDialog_" + ++__generate__Id;
}
import { Log } from '../common/Log';
import { mockData } from '../common/CountryViewModel';
import { AGCAuth, AgUser } from '../services/Auth';
import { Constants } from '../common/Constants';
const TAG = "[AuthPage]";
export class AuthDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.agcAuth = undefined;
        this.controller = undefined;
        this.__countryCode = new ObservedPropertySimple('+86', this, "countryCode");
        this.__phoneNumber = new ObservedPropertySimple('', this, "phoneNumber");
        this.__verificationCode = new ObservedPropertySimple('', this, "verificationCode");
        this.__intervalId = new ObservedPropertySimple(-123456, this, "intervalId");
        this.__timer = new ObservedPropertySimple(60, this, "timer");
        this.__canLogin = new ObservedPropertySimple(true, this, "canLogin");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AuthDialog_Params) {
        if (params.agcAuth !== undefined) {
            this.agcAuth = params.agcAuth;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.countryCode !== undefined) {
            this.countryCode = params.countryCode;
        }
        if (params.phoneNumber !== undefined) {
            this.phoneNumber = params.phoneNumber;
        }
        if (params.verificationCode !== undefined) {
            this.verificationCode = params.verificationCode;
        }
        if (params.intervalId !== undefined) {
            this.intervalId = params.intervalId;
        }
        if (params.timer !== undefined) {
            this.timer = params.timer;
        }
        if (params.canLogin !== undefined) {
            this.canLogin = params.canLogin;
        }
    }
    aboutToBeDeleted() {
        this.__countryCode.aboutToBeDeleted();
        this.__phoneNumber.aboutToBeDeleted();
        this.__verificationCode.aboutToBeDeleted();
        this.__intervalId.aboutToBeDeleted();
        this.__timer.aboutToBeDeleted();
        this.__canLogin.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private agcAuth: AGCAuth;
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private __countryCode: ObservedPropertySimple<string>;
    get countryCode() {
        return this.__countryCode.get();
    }
    set countryCode(newValue: string) {
        this.__countryCode.set(newValue);
    }
    private __phoneNumber: ObservedPropertySimple<string>;
    get phoneNumber() {
        return this.__phoneNumber.get();
    }
    set phoneNumber(newValue: string) {
        this.__phoneNumber.set(newValue);
    }
    private __verificationCode: ObservedPropertySimple<string>;
    get verificationCode() {
        return this.__verificationCode.get();
    }
    set verificationCode(newValue: string) {
        this.__verificationCode.set(newValue);
    }
    private __intervalId: ObservedPropertySimple<number>;
    get intervalId() {
        return this.__intervalId.get();
    }
    set intervalId(newValue: number) {
        this.__intervalId.set(newValue);
    }
    private __timer: ObservedPropertySimple<number>;
    get timer() {
        return this.__timer.get();
    }
    set timer(newValue: number) {
        this.__timer.set(newValue);
    }
    private __canLogin: ObservedPropertySimple<boolean>;
    get canLogin() {
        return this.__canLogin.get();
    }
    set canLogin(newValue: boolean) {
        this.__canLogin.set(newValue);
    }
    aboutToAppear() {
        this.agcAuth = new AGCAuth(getContext(this));
    }
    canAuthorize(): boolean {
        return this.countryCode !== '' && this.phoneNumber !== '' && this.verificationCode !== '';
    }
    canGetCode(): boolean {
        return this.phoneNumber.length > 5 && this.phoneNumber.length <= 20;
    }
    startTimer(): void {
        this.timer = 60;
        this.intervalId = setInterval(() => {
            this.timer--;
            if (this.timer === 0) {
                clearInterval(this.intervalId);
                this.timer = 60;
            }
        }, 1000);
    }
    async onGetCodeButtonClicked() {
        if (this.phoneNumber !== '' && this.timer === 60) {
            this.startTimer();
            this.agcAuth.requestPhoneVerifyCode(this.countryCode, this.phoneNumber);
        }
    }
    onAuthButtonClicked() {
        this.canLogin = false;
        this.agcAuth.login(this.countryCode, this.phoneNumber, this.verificationCode).then(user => {
            AppStorage.Set<AgUser>('user', user);
            Log.info(TAG, "Logged in succesfully.");
            this.canLogin = true;
            this.controller?.close();
        }).catch((err) => {
            this.canLogin = true;
            Log.error(TAG, "Logged in failed " + JSON.stringify(err));
            AlertDialog.show({
                title: $r('app.string.common_prompt'),
                message: $r('app.string.common_login_fail'),
            });
        });
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.height(Constants.PERCENT_50);
        Flex.padding({ right: Constants.LENGTH_20_PX, left: Constants.LENGTH_20_PX });
        Text.create($r('app.string.auth_dialog_title'));
        Text.fontSize($r('app.float.navigation_font_size'));
        Text.margin({ bottom: Constants.LENGTH_20_PX });
        Text.pop();
        Flex.create({ direction: FlexDirection.Row });
        Flex.margin({ bottom: Constants.LENGTH_20_PX });
        Select.create(mockData);
        Select.font({ size: $r('app.float.body_font_size') });
        Select.selectedOptionFont({ size: $r('app.float.body_font_size') });
        Select.optionFont({ size: $r('app.float.body_font_size') });
        Select.value(this.countryCode);
        Select.layoutWeight(Constants.LENGTH_1_PX);
        Select.backgroundColor($r('app.color.placeholder_background'));
        Select.borderRadius(Constants.BORDER_RADIUS_4_PX);
        Select.height(Constants.HEIGHT_40);
        Select.onSelect((_, val) => {
            this.countryCode = val.substring(0, val.length - 4);
        });
        Select.pop();
        TextInput.create({ placeholder: $r('app.string.auth_dialog_number_placeholder') });
        TextInput.layoutWeight(Constants.LENGTH_3_PX);
        TextInput.margin({ left: Constants.LENGTH_5_PX });
        TextInput.borderRadius(Constants.BORDER_RADIUS_4_PX);
        TextInput.maxLength(Constants.LENGTH_20_PX);
        TextInput.height(Constants.HEIGHT_40);
        TextInput.enabled(this.timer === 60);
        TextInput.onChange((val) => {
            this.phoneNumber = val;
        });
        Flex.pop();
        Flex.create({ direction: FlexDirection.Row });
        Flex.margin({ bottom: Constants.LENGTH_20_PX });
        TextInput.create({ placeholder: $r('app.string.auth_dialog_code_placeholder'), text: this.verificationCode });
        TextInput.layoutWeight(Constants.LENGTH_3_PX);
        TextInput.margin({ right: Constants.LENGTH_5_PX });
        TextInput.borderRadius(Constants.BORDER_RADIUS_4_PX);
        TextInput.maxLength(Constants.LENGTH_6_PX);
        TextInput.height(Constants.HEIGHT_40);
        TextInput.onChange((val) => {
            this.verificationCode = val;
        });
        Button.createWithLabel(this.timer === 60 ? $r('app.string.auth_dialog_get_code_button_text') : this.timer.toString(), {
            type: ButtonType.Normal
        });
        Button.backgroundColor($r('app.color.start_window_background'));
        Button.layoutWeight(Constants.LENGTH_2_PX);
        Button.borderColor($r('app.color.action_button_background'));
        Button.borderWidth(Constants.LENGTH_1_PX);
        Button.fontColor($r('app.color.action_button_background'));
        Button.borderRadius(Constants.BORDER_RADIUS_4_PX);
        Button.margin({ left: Constants.LENGTH_5_PX });
        Button.height(Constants.HEIGHT_40);
        Button.enabled(this.canGetCode() && this.timer === 60);
        Button.onClick(() => this.onGetCodeButtonClicked());
        Button.pop();
        Flex.pop();
        Button.createWithLabel($r('app.string.auth_dialog_auth_button_text'), { type: ButtonType.Normal });
        Button.width(Constants.PERCENT_100);
        Button.borderRadius(Constants.BORDER_RADIUS_4_PX);
        Button.backgroundColor($r('app.color.action_button_background'));
        Button.enabled(this.canAuthorize() && this.verificationCode.length > 5 && this.canLogin);
        Button.opacity(this.canLogin ? 1 : 0.5);
        Button.height(Constants.HEIGHT_40);
        Button.onClick(() => this.onAuthButtonClicked());
        Button.pop();
        Flex.pop();
    }
}
