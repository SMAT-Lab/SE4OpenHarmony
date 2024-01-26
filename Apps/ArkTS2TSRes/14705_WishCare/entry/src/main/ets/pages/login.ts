interface Home_Params {
    username?: string;
    account?: string;
    password?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "login_" + ++__generate__Id;
}
import router from '@ohos.router';
import prompt from '@ohos.prompt';
import { db } from '../signup/Database';
class Home extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__username = new ObservedPropertySimple('123', this, "username");
        this.__account = new ObservedPropertySimple('', this, "account");
        this.__password = new ObservedPropertySimple('', this, "password");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Home_Params) {
        if (params.username !== undefined) {
            this.username = params.username;
        }
        if (params.account !== undefined) {
            this.account = params.account;
        }
        if (params.password !== undefined) {
            this.password = params.password;
        }
    }
    aboutToBeDeleted() {
        this.__username.aboutToBeDeleted();
        this.__account.aboutToBeDeleted();
        this.__password.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __username: ObservedPropertySimple<string>;
    get username() {
        return this.__username.get();
    }
    set username(newValue: string) {
        this.__username.set(newValue);
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
    render() {
        Column.create();
        Column.width("100%");
        Column.height("100%");
        Column.create();
        Column.width("100%");
        Column.height("100%");
        Column.alignItems(HorizontalAlign.Center);
        Column.justifyContent(FlexAlign.Center);
        Image.create($r('app.media.img1'));
        Image.width("78vp");
        Image.height("78vp");
        Image.offset({ x: "0px", y: "-150px" });
        Image.interpolation(ImageInterpolation.High);
        Text.create("登录界面");
        Text.width("200vp");
        Text.height("60vp");
        Text.offset({ x: "150px", y: "-150px" });
        Text.fontSize("24fp");
        Text.pop();
        Text.create("登录账号使用更多服务");
        Text.width("200vp");
        Text.height("60vp");
        Text.offset({ x: "20px", y: "-185.73px" });
        Text.fontColor("#99182431");
        Text.textAlign(TextAlign.Start);
        Text.fontSize("55px");
        Text.fontStyle(FontStyle.Normal);
        Text.fontWeight(400);
        Text.pop();
        TextInput.create();
        TextInput.width("80%");
        TextInput.height("5%");
        TextInput.offset({ x: "0px", y: "-115.43px" });
        TextInput.type(InputType.Normal);
        TextInput.onChange((value: string) => {
            this.account = value;
        });
        TextInput.create();
        TextInput.width("80%");
        TextInput.height("5%");
        TextInput.offset({ x: "0px", y: "-107.56px" });
        TextInput.type(InputType.Password);
        TextInput.onChange((value: string) => {
            this.password = value;
        });
        Row.create();
        Row.width("100%");
        Row.height("100vp");
        Row.offset({ x: "0px", y: "-13.32px" });
        Text.create("短信验证码登录");
        Text.width("200vp");
        Text.height("60vp");
        Text.offset({ x: "30.16px", y: "-60px" });
        Text.fontColor("#6e93e9");
        Text.fontSize("15fp");
        Text.pop();
        Text.create("忘记密码");
        Text.width("200vp");
        Text.height("60vp");
        Text.offset({ x: "222.37px", y: "-60px" });
        Text.fontColor("#6e93e9");
        Text.fontSize("15fp");
        Text.pop();
        Row.pop();
        Button.createWithLabel("登录");
        Button.width("80%");
        Button.height("5%");
        Button.offset({ x: "25px", y: "-113.29px" });
        Button.fontSize("18fp");
        Button.onClick(this.launch.bind(this));
        Button.pop();
        Text.create("注册账号");
        Text.width("200vp");
        Text.height("60vp");
        Text.offset({ x: ".27px", y: "-100.67px" });
        Text.fontColor("#6e93e9");
        Text.textAlign(TextAlign.Center);
        Text.fontSize("16fp");
        Text.fontWeight(FontWeight.Medium);
        Text.onClick(() => {
            router.pushUrl({ url: 'pages/register' });
        });
        Text.pop();
        Column.pop();
        Column.pop();
    }
    launch() {
        let account = db.tables.get("Account").select(1);
        if (account) {
            console.log(account.username + ' ' + account.password);
            if (this.account === account.username && this.password === account.password) {
                router.push({
                    url: 'pages/wisecare',
                });
            }
        }
        else if ((this.account === "admin" && this.password === "1")) {
            router.push({
                url: 'pages/wisecare',
            });
        }
        else {
            prompt.showToast({ message: '账号或密码错误' });
        }
    }
}
loadDocument(new Home("1", undefined, {}));
