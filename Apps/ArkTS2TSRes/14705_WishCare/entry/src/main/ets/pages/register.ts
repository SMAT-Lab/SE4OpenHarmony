interface Home_Params {
    username?: string;
    password?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "register_" + ++__generate__Id;
}
import router from '@ohos.router';
import prompt from '@ohos.prompt';
import { db } from '../signup/Database';
class Home extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__username = new ObservedPropertySimple('', this, "username");
        this.__password = new ObservedPropertySimple('', this, "password");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Home_Params) {
        if (params.username !== undefined) {
            this.username = params.username;
        }
        if (params.password !== undefined) {
            this.password = params.password;
        }
    }
    aboutToBeDeleted() {
        this.__username.aboutToBeDeleted();
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
        Text.create("注册界面");
        Text.width("200vp");
        Text.height("60vp");
        Text.offset({ x: "150px", y: "-150px" });
        Text.fontSize("24fp");
        Text.pop();
        Text.create("注册账号使用更多服务");
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
            this.username = value;
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
        Row.pop();
        Button.createWithLabel("注册");
        Button.width("80%");
        Button.height("5%");
        Button.offset({ x: "25px", y: "-113.29px" });
        Button.fontSize("18fp");
        Button.onClick(this.signUp_account.bind(this));
        Button.pop();
        Text.create("已有账号，请登录");
        Text.width("200vp");
        Text.height("60vp");
        Text.offset({ x: ".27px", y: "-100.67px" });
        Text.fontColor("#6e93e9");
        Text.textAlign(TextAlign.Center);
        Text.fontSize("16fp");
        Text.fontWeight(FontWeight.Medium);
        Text.onClick(() => {
            router.pushUrl({ url: 'pages/login' });
        });
        Text.pop();
        Column.pop();
        Column.pop();
    }
    signUp_account() {
        // 添加账号
        db.tables.get("Account").insert({ id: 1, username: this.username, password: this.password });
        prompt.showToast({ message: '注册成功' });
        // 查询账号
        let account = db.tables.get("Account").select(1);
        console.log(account.username + account.password);
    }
}
loadDocument(new Home("1", undefined, {}));
