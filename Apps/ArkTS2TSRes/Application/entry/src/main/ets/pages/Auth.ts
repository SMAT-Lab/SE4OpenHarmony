interface AuthScreen_Params {
    currentUser?: AuthUser | null | undefined;
    isShowButton?: boolean;
    creatTime?: string;
    lastLogin?: string;
    userId?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Auth_" + ++__generate__Id;
}
import cloud, { AuthUser } from '@hw-agconnect/cloud';
import { Login, AuthMode } from "@hw-agconnect/auth-component";
class AuthScreen extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__currentUser = AppStorage.SetAndLink('user', null, this, "currentUser");
        this.__isShowButton = new ObservedPropertySimple(true, this, "isShowButton");
        this.__creatTime = new ObservedPropertySimple('', this, "creatTime");
        this.__lastLogin = new ObservedPropertySimple('', this, "lastLogin");
        this.__userId = new ObservedPropertySimple('', this, "userId");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AuthScreen_Params) {
        if (params.isShowButton !== undefined) {
            this.isShowButton = params.isShowButton;
        }
        if (params.creatTime !== undefined) {
            this.creatTime = params.creatTime;
        }
        if (params.lastLogin !== undefined) {
            this.lastLogin = params.lastLogin;
        }
        if (params.userId !== undefined) {
            this.userId = params.userId;
        }
    }
    aboutToBeDeleted() {
        this.__currentUser.aboutToBeDeleted();
        this.__isShowButton.aboutToBeDeleted();
        this.__creatTime.aboutToBeDeleted();
        this.__lastLogin.aboutToBeDeleted();
        this.__userId.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __currentUser: ObservedPropertyAbstract<AuthUser | null | undefined>;
    get currentUser() {
        return this.__currentUser.get();
    }
    set currentUser(newValue: AuthUser | null | undefined) {
        this.__currentUser.set(newValue);
    }
    private __isShowButton: ObservedPropertySimple<boolean>;
    get isShowButton() {
        return this.__isShowButton.get();
    }
    set isShowButton(newValue: boolean) {
        this.__isShowButton.set(newValue);
    }
    private __creatTime: ObservedPropertySimple<string>;
    get creatTime() {
        return this.__creatTime.get();
    }
    set creatTime(newValue: string) {
        this.__creatTime.set(newValue);
    }
    private __lastLogin: ObservedPropertySimple<string>;
    get lastLogin() {
        return this.__lastLogin.get();
    }
    set lastLogin(newValue: string) {
        this.__lastLogin.set(newValue);
    }
    private __userId: ObservedPropertySimple<string>;
    get userId() {
        return this.__userId.get();
    }
    set userId(newValue: string) {
        this.__userId.set(newValue);
    }
    NavigationTitle(parent = null) {
        Column.create();
        Text.create($r('app.string.auth_service_title'));
        Text.fontSize($r('app.float.navigation_font_size'));
        Text.pop();
        Column.pop();
    }
    async aboutToAppear() {
        this.currentUser = AppStorage.Get<AuthUser>('user');
        if (this.currentUser) {
            let agcUserExtra = await this.currentUser.getUserExtra();
            this.creatTime = agcUserExtra.getCreateTime();
            this.lastLogin = agcUserExtra.getLastSignInTime();
        }
    }
    async logout() {
        cloud.auth().signOut().then(() => {
            this.isShowButton = true;
            this.currentUser = null;
        }).catch((error: Object) => {
        });
    }
    deleteUser() {
        cloud.auth().deleteUser().then(() => {
            this.isShowButton = true;
            this.currentUser = null;
            this.creatTime = '';
            this.lastLogin = '';
        }).catch((err: Object) => {
        });
    }
    formatDate(date: string): string {
        if (!date) {
            return '';
        }
        let d = new Date(Number.parseInt(date.toString()));
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
    render() {
        Column.create();
        Navigation.create();
        Navigation.title({ builder: () => {
                this.NavigationTitle.call(this);
            } });
        Navigation.height('50vp');
        Navigation.width('100%');
        Navigation.margin({ bottom: 10 });
        Navigation.titleMode(NavigationTitleMode.Mini);
        Navigation.pop();
        Flex.create({ direction: FlexDirection.Column, justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center });
        Flex.height('90%');
        Column.create();
        Column.height('90%');
        Column.borderRadius('4vp');
        If.create();
        if (this.currentUser !== null && this.currentUser !== undefined) {
            If.branchId(0);
            Column.create();
            Column.margin({ left: 30, right: 30, top: 20 });
            Column.padding(15);
            Column.border({ width: 1, color: $r('app.color.placeholder_background') });
            If.create();
            if (this.currentUser?.getPhotoUrl() !== null && this.currentUser?.getPhotoUrl() !== undefined && this.currentUser?.getPhotoUrl() !== '') {
                If.branchId(0);
                Image.create(this.currentUser?.getPhotoUrl().toString());
                Image.width(70);
                Image.height(70);
            }
            else {
                If.branchId(1);
                Image.create($r("app.media.user_dark"));
                Image.width(70);
                Image.height(70);
            }
            If.pop();
            Flex.create({ justifyContent: FlexAlign.SpaceBetween });
            Flex.margin({ top: 10, bottom: 10 });
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
            Flex.margin({ top: 10, bottom: 10 });
            Text.create($r('app.string.auth_result_registered'));
            Text.fontSize($r('app.float.body_font_size'));
            Text.pop();
            If.create();
            if (this.creatTime) {
                If.branchId(0);
                Text.create(this.formatDate(this.creatTime));
                Text.fontSize($r('app.float.body_font_size'));
                Text.pop();
            }
            If.pop();
            Flex.pop();
            Divider.create();
            Divider.color($r('app.color.placeholder_background'));
            Flex.create({ justifyContent: FlexAlign.SpaceBetween });
            Flex.margin({ top: 10, bottom: 10 });
            Text.create($r('app.string.auth_result_last_login'));
            Text.fontSize($r('app.float.body_font_size'));
            Text.pop();
            If.create();
            if (this.lastLogin) {
                If.branchId(0);
                Text.create(this.formatDate(this.lastLogin));
                Text.fontSize($r('app.float.body_font_size'));
                Text.pop();
            }
            If.pop();
            Flex.pop();
            Column.pop();
            Column.create();
            Button.createWithChild({ type: ButtonType.Normal });
            Button.width('90%');
            Button.backgroundColor($r('app.color.login_button'));
            Button.borderRadius('8vp');
            Button.height('30vp');
            Button.margin({ top: 10 });
            Button.onClick(() => {
                this.deleteUser();
            });
            Text.create($r('app.string.auth_service_delete_user_button_text'));
            Text.fontColor($r('app.color.white'));
            Text.margin({ top: 5, bottom: 5 });
            Text.pop();
            Button.pop();
            Button.createWithChild({ type: ButtonType.Normal });
            Button.width('90%');
            Button.backgroundColor($r('app.color.login_button'));
            Button.borderRadius('8vp');
            Button.height('30vp');
            Button.margin({ top: 10 });
            Button.onClick(() => {
                this.logout();
            });
            Text.create($r('app.string.auth_service_logout_button_text'));
            Text.fontColor($r('app.color.white'));
            Text.margin({ top: 5, bottom: 5 });
            Text.pop();
            Button.pop();
            Column.pop();
        }
        else {
            If.branchId(1);
            Column.create();
            Login.create({
                modes: [AuthMode.PHONE_VERIFY_CODE],
                onSuccess: async (user: AuthUser) => {
                    this.isShowButton = false;
                    AppStorage.Set<AuthUser>('user', user);
                    this.currentUser = AppStorage.Get<AuthUser>('user');
                    if (this.currentUser != null && this.currentUser != undefined) {
                        let agcUserExtra = await this.currentUser.getUserExtra();
                        this.creatTime = agcUserExtra.getCreateTime();
                        this.lastLogin = agcUserExtra.getLastSignInTime();
                    }
                }
            });
            If.create();
            if (this.isShowButton) {
                If.branchId(0);
                Button.createWithChild({ type: ButtonType.Normal });
                Button.width('90%');
                Button.backgroundColor($r('app.color.login_button'));
                Button.borderRadius('8vp');
                Button.height('30vp');
                Text.create($r('app.string.auth_service_login_button_text'));
                Text.fontColor($r('app.color.white'));
                Text.pop();
                Button.pop();
            }
            If.pop();
            Column.pop();
        }
        If.pop();
        Column.pop();
        Flex.pop();
        Column.pop();
    }
}
loadDocument(new AuthScreen("1", undefined, {}));
