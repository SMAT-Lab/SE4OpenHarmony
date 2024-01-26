interface ProfilePage_Params {
    isLogin?: boolean;
    auth?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ProfilePage_" + ++__generate__Id;
}
import router from '@ohos.router';
import { PERCENT_100 } from '../../common/constants/CommonConstants';
import UserInfo from '../../common/utils/UserCacheInfo';
export class ProfilePage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__isLogin = new ObservedPropertySimple(true, this, "isLogin");
        this.__auth = new ObservedPropertySimple('', this, "auth");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ProfilePage_Params) {
        if (params.isLogin !== undefined) {
            this.isLogin = params.isLogin;
        }
        if (params.auth !== undefined) {
            this.auth = params.auth;
        }
    }
    aboutToBeDeleted() {
        this.__isLogin.aboutToBeDeleted();
        this.__auth.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __isLogin: ObservedPropertySimple<boolean>;
    get isLogin() {
        return this.__isLogin.get();
    }
    set isLogin(newValue: boolean) {
        this.__isLogin.set(newValue);
    }
    private __auth: ObservedPropertySimple<string>;
    get auth() {
        return this.__auth.get();
    }
    set auth(newValue: string) {
        this.__auth.set(newValue);
    }
    aboutToAppear() {
        this.refresh();
    }
    onPageShow() {
        this.refresh();
    }
    async refresh() {
        let auth = <string>await UserInfo.getAuth();
        this.auth = auth;
        this.isLogin = auth != '';
    }
    render() {
        Column.create();
        Navigation.create();
        Navigation.height(PERCENT_100);
        Navigation.title(getContext(this).resourceManager.getStringSync($r('app.string.tab_profile')));
        Navigation.titleMode(NavigationTitleMode.Mini);
        Navigation.hideBackButton(true);
        Navigation.menus([
            {
                value: '',
                icon: '../../../resources/base/media/ic_profile_settings.png',
                action: () => {
                    router.pushUrl({
                        url: 'pages/profile/SettingPage'
                    });
                }
            }
        ]);
        If.create();
        if (this.isLogin) {
            If.branchId(0);
            Text.create('已登录' + this.auth);
            Text.pop();
        }
        else {
            If.branchId(1);
            Column.create();
            Column.height(PERCENT_100);
            Column.justifyContent(FlexAlign.Center);
            Button.createWithLabel('登录');
            Button.backgroundColor($r('app.color.app_theme_primary'));
            Button.onClick(() => {
                UserInfo.setAuth('12345678');
                this.refresh();
                router.pushUrl({
                    url: 'pages/profile/LoginPage'
                });
            });
            Button.pop();
            Column.pop();
        }
        If.pop();
        Navigation.pop();
        Column.pop();
    }
}
loadDocument(new ProfilePage("1", undefined, {}));
