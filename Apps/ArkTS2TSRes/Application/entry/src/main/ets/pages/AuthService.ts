interface AuthService_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "AuthService_" + ++__generate__Id;
}
import { Login, AuthMode } from "@hw-agconnect/auth-component";
import router from '@ohos.router';
class AuthService extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AuthService_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.justifyContent(FlexAlign.Center);
        Text.create('点击按钮登录');
        Text.fontSize(30);
        Text.padding({ bottom: 50 });
        Text.pop();
        Login.create({
            modes: [AuthMode.PASSWORD, AuthMode.PHONE_VERIFY_CODE, AuthMode.MAIL_VERIFY_CODE],
            onSuccess: (user) => {
                router.pushUrl({ url: "pages/Functions", params: { user: user } });
            },
            onError: (err) => {
                console.error('error: ', err && err.message);
            }
        });
        Button.createWithLabel('login');
        Button.width('90%');
        Button.align(Alignment.Center);
        Button.pop();
        Column.pop();
    }
}
loadDocument(new AuthService("1", undefined, {}));
