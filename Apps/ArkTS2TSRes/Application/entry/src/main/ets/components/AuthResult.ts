interface AuthResultView_Params {
    onLoginPressed?: Function;
    currentUser?: AgUser;
    isEditingDisplayName?: boolean;
    displayNameText?: string;
    canLogOut?: boolean;
    loginButtonEnableState?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "AuthResult_" + ++__generate__Id;
}
import { CommonActionButton } from '../components/CommonActionButton';
import '@hw-agconnect/auth-ohos';
import { Constants } from '../common/Constants';
import { AGCAuth, AgUser } from '../services/Auth';
export class AuthResultView extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.onLoginPressed = undefined;
        this.__currentUser = AppStorage.SetAndLink('user', AppStorage.Get<AgUser>('user'), this, "currentUser");
        this.__isEditingDisplayName = new ObservedPropertySimple(false, this, "isEditingDisplayName");
        this.__displayNameText = new ObservedPropertySimple('', this, "displayNameText");
        this.__canLogOut = new ObservedPropertySimple(true, this, "canLogOut");
        this.__loginButtonEnableState = new ObservedPropertySimple(true, this, "loginButtonEnableState");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AuthResultView_Params) {
        if (params.onLoginPressed !== undefined) {
            this.onLoginPressed = params.onLoginPressed;
        }
        if (params.isEditingDisplayName !== undefined) {
            this.isEditingDisplayName = params.isEditingDisplayName;
        }
        if (params.displayNameText !== undefined) {
            this.displayNameText = params.displayNameText;
        }
        if (params.canLogOut !== undefined) {
            this.canLogOut = params.canLogOut;
        }
        if (params.loginButtonEnableState !== undefined) {
            this.loginButtonEnableState = params.loginButtonEnableState;
        }
    }
    aboutToBeDeleted() {
        this.__currentUser.aboutToBeDeleted();
        this.__isEditingDisplayName.aboutToBeDeleted();
        this.__displayNameText.aboutToBeDeleted();
        this.__canLogOut.aboutToBeDeleted();
        this.__loginButtonEnableState.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    public onLoginPressed: Function;
    private __currentUser: ObservedPropertyAbstract<AgUser>;
    get currentUser() {
        return this.__currentUser.get();
    }
    set currentUser(newValue: AgUser) {
        this.__currentUser.set(newValue);
    }
    private __isEditingDisplayName: ObservedPropertySimple<boolean>;
    get isEditingDisplayName() {
        return this.__isEditingDisplayName.get();
    }
    set isEditingDisplayName(newValue: boolean) {
        this.__isEditingDisplayName.set(newValue);
    }
    private __displayNameText: ObservedPropertySimple<string>;
    get displayNameText() {
        return this.__displayNameText.get();
    }
    set displayNameText(newValue: string) {
        this.__displayNameText.set(newValue);
    }
    private __canLogOut: ObservedPropertySimple<boolean>;
    get canLogOut() {
        return this.__canLogOut.get();
    }
    set canLogOut(newValue: boolean) {
        this.__canLogOut.set(newValue);
    }
    private __loginButtonEnableState: ObservedPropertySimple<boolean>;
    get loginButtonEnableState() {
        return this.__loginButtonEnableState.get();
    }
    set loginButtonEnableState(newValue: boolean) {
        this.__loginButtonEnableState.set(newValue);
    }
    aboutToAppear() {
        this.currentUser = AppStorage.Get<AgUser>('user');
    }
    async logout() {
        this.canLogOut = false;
        await new AGCAuth(getContext(this)).logout().then((res) => {
            if (res) {
                AppStorage.Set<AgUser>('user', new AgUser());
                this.canLogOut = true;
            }
        });
    }
    async deleteUser() {
        this.canLogOut = false;
        await new AGCAuth(getContext(this)).deleteUser().then((res) => {
            if (res) {
                AppStorage.Set<AgUser>('user', new AgUser());
                this.canLogOut = true;
            }
        });
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center });
        Flex.height(Constants.PERCENT_90);
        If.create();
        if (!this.currentUser?.getUid()) {
            If.branchId(0);
            let earlierCreatedChild_2: CommonActionButton = (this && this.findChildById) ? this.findChildById("2") as CommonActionButton : undefined;
            if (earlierCreatedChild_2 == undefined) {
                View.create(new CommonActionButton("2", this, {
                    title: $r('app.string.auth_service_login_button_text'),
                    color: $r('app.color.start_window_background'),
                    backColor: $r('app.color.action_button_background'),
                    onAction: () => {
                        this.onLoginPressed();
                    },
                    isEnabled: this.__loginButtonEnableState
                }));
            }
            else {
                earlierCreatedChild_2.updateWithValueParams({
                    title: $r('app.string.auth_service_login_button_text'),
                    color: $r('app.color.start_window_background'),
                    backColor: $r('app.color.action_button_background'),
                    onAction: () => {
                        this.onLoginPressed();
                    }
                });
                View.create(earlierCreatedChild_2);
            }
        }
        else {
            If.branchId(1);
            Column.create();
            Column.margin({ left: Constants.LENGTH_30_PX, right: Constants.LENGTH_30_PX, top: Constants.LENGTH_20_PX });
            Column.padding(Constants.LENGTH_15_PX);
            Column.border({ width: Constants.LENGTH_1_PX, color: $r('app.color.placeholder_background') });
            If.create();
            if (this.currentUser?.getPhotoUrl() !== null && this.currentUser?.getPhotoUrl() !== undefined && this.currentUser?.getPhotoUrl() !== '') {
                If.branchId(0);
                Image.create(this.currentUser?.getPhotoUrl().toString());
                Image.width(Constants.LENGTH_70_PX);
                Image.height(Constants.LENGTH_70_PX);
            }
            else {
                If.branchId(1);
                Image.create($r("app.media.user_dark"));
                Image.width(Constants.LENGTH_70_PX);
                Image.height(Constants.LENGTH_70_PX);
            }
            If.pop();
            Flex.create({ justifyContent: FlexAlign.SpaceBetween });
            Flex.margin({ top: Constants.LENGTH_10_PX, bottom: Constants.LENGTH_10_PX });
            Text.create($r('app.string.auth_result_mobile_number'));
            Text.fontSize($r('app.float.body_font_size'));
            Text.pop();
            Text.create(this.currentUser?.getPhone()?.toString());
            Text.fontSize($r('app.float.body_font_size'));
            Text.pop();
            Flex.pop();
            Divider.create();
            Divider.color($r('app.color.placeholder_background'));
            Flex.create({ justifyContent: FlexAlign.SpaceBetween });
            Flex.margin({ top: Constants.LENGTH_10_PX, bottom: Constants.LENGTH_10_PX });
            Text.create($r('app.string.auth_result_registered'));
            Text.fontSize($r('app.float.body_font_size'));
            Text.pop();
            If.create();
            if (this.currentUser?.getRegisterDate()) {
                If.branchId(0);
                Text.create(this.formatDate(this.currentUser?.getRegisterDate()));
                Text.fontSize($r('app.float.body_font_size'));
                Text.pop();
            }
            If.pop();
            Flex.pop();
            Divider.create();
            Divider.color($r('app.color.placeholder_background'));
            Flex.create({ justifyContent: FlexAlign.SpaceBetween });
            Flex.margin({ top: Constants.LENGTH_10_PX, bottom: Constants.LENGTH_10_PX });
            Text.create($r('app.string.auth_result_last_login'));
            Text.fontSize($r('app.float.body_font_size'));
            Text.pop();
            If.create();
            if (this.currentUser?.getLastLogin()) {
                If.branchId(0);
                Text.create(this.formatDate(this.currentUser?.getLastLogin()));
                Text.fontSize($r('app.float.body_font_size'));
                Text.pop();
            }
            If.pop();
            Flex.pop();
            Column.pop();
            Column.create();
            __Common__.create();
            __Common__.margin({ top: Constants.LENGTH_10_PX });
            let earlierCreatedChild_3: CommonActionButton = (this && this.findChildById) ? this.findChildById("3") as CommonActionButton : undefined;
            if (earlierCreatedChild_3 == undefined) {
                View.create(new CommonActionButton("3", this, {
                    title: $r('app.string.auth_service_delete_user_button_text'),
                    color: $r('app.color.black'),
                    backColor: $r('app.color.start_window_background'),
                    borderW: Constants.LENGTH_1_PX,
                    borderC: $r('app.color.black'),
                    onAction: () => {
                        this.deleteUser();
                    },
                    isEnabled: this.__canLogOut
                }));
            }
            else {
                earlierCreatedChild_3.updateWithValueParams({
                    title: $r('app.string.auth_service_delete_user_button_text'),
                    color: $r('app.color.black'),
                    backColor: $r('app.color.start_window_background'),
                    borderW: Constants.LENGTH_1_PX,
                    borderC: $r('app.color.black'),
                    onAction: () => {
                        this.deleteUser();
                    }
                });
                View.create(earlierCreatedChild_3);
            }
            __Common__.pop();
            __Common__.create();
            __Common__.margin({ top: Constants.LENGTH_10_PX });
            let earlierCreatedChild_4: CommonActionButton = (this && this.findChildById) ? this.findChildById("4") as CommonActionButton : undefined;
            if (earlierCreatedChild_4 == undefined) {
                View.create(new CommonActionButton("4", this, {
                    title: $r('app.string.auth_service_logout_button_text'),
                    color: $r('app.color.black'),
                    backColor: $r('app.color.start_window_background'),
                    borderW: Constants.LENGTH_1_PX,
                    borderC: $r('app.color.black'),
                    onAction: () => {
                        this.logout();
                    },
                    isEnabled: this.__canLogOut
                }));
            }
            else {
                earlierCreatedChild_4.updateWithValueParams({
                    title: $r('app.string.auth_service_logout_button_text'),
                    color: $r('app.color.black'),
                    backColor: $r('app.color.start_window_background'),
                    borderW: Constants.LENGTH_1_PX,
                    borderC: $r('app.color.black'),
                    onAction: () => {
                        this.logout();
                    }
                });
                View.create(earlierCreatedChild_4);
            }
            __Common__.pop();
            Column.pop();
        }
        If.pop();
        Flex.pop();
    }
    formatDate(date: String): string {
        if (date) {
            let d = new Date(parseInt(date.toString()));
            let ymd = d
                .toISOString()
                .replace('-', '/')
                .split('T')[0]
                .replace('-', '/');
            let hours = d.getHours().toString().length < 2 ? "0" + d.getHours() : d.getHours();
            let minutes = d.getMinutes().toString().length < 2 ? "0" + d.getMinutes() : d.getMinutes();
            let seconds = d.getSeconds().toString().length < 2 ? "0" + d.getSeconds() : d.getSeconds();
            let hm = hours + ':' + minutes + ':' + seconds;
            return ymd + ' ' + hm;
        }
    }
}
