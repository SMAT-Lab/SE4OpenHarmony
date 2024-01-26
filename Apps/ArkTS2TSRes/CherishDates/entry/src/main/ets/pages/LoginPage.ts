interface LoginPage_Params {
    message?: string;
    username?: string;
    password?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "LoginPage_" + ++__generate__Id;
}
import router from '@ohos.router';
class LoginPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('HelloWorld', this, "message");
        this.__username = new ObservedPropertySimple("", this, "username");
        this.__password = new ObservedPropertySimple("", this, "password");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: LoginPage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.username !== undefined) {
            this.username = params.username;
        }
        if (params.password !== undefined) {
            this.password = params.password;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__username.aboutToBeDeleted();
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
        Column.alignItems(HorizontalAlign.Center);
        Column.justifyContent(FlexAlign.Center);
        Column.margin({
            bottom: 40,
            top: 40
        });
        Row.create();
        Row.justifyContent(FlexAlign.Center);
        Text.create("登录");
        Text.fontSize(30);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({
            bottom: 50
        });
        Text.pop();
        Row.pop();
        Column.create({ space: 10 });
        Column.alignItems(HorizontalAlign.Start);
        Text.create("用户名");
        Text.fontWeight(FontWeight.Bold);
        Text.margin({
            bottom: 16
        });
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Medium);
        Text.padding(10);
        Text.pop();
        Row.create();
        Row.margin({
            bottom: 16
        });
        Image.create($r("app.media.user"));
        Image.width(30);
        Image.height(30);
        Image.objectFit(ImageFit.Cover);
        TextInput.create({
            placeholder: "请输入用户名",
            text: this.username
        });
        TextInput.width("60%");
        TextInput.onChange((val: string) => {
            this.username = val;
        });
        Row.pop();
        Divider.create();
        Divider.width("80%");
        Text.create("密码");
        Text.fontWeight(FontWeight.Bold);
        Text.margin({
            bottom: 16
        });
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Medium);
        Text.padding(10);
        Text.pop();
        Row.create();
        Row.margin({
            bottom: 16
        });
        Image.create($r("app.media.password"));
        Image.width(30);
        Image.height(30);
        Image.objectFit(ImageFit.Cover);
        TextInput.create({
            placeholder: "请输入密码",
            text: this.password
        });
        TextInput.width("60%");
        TextInput.onChange((val: string) => {
            this.password = val;
        });
        Row.pop();
        Divider.create();
        Divider.width("80%");
        Column.pop();
        Row.create();
        Row.width("60%");
        Row.margin({
            top: 16,
            bottom: 16
        });
        Blank.create();
        Blank.pop();
        Text.create("忘记密码?");
        Text.pop();
        Row.pop();
        Button.createWithLabel("Sign in");
        Button.width(300);
        Button.backgroundColor("#ff4589fe");
        Button.margin({
            bottom: 20
        });
        Button.onClick(() => {
            router.pushUrl({
                url: "pages/TabPage",
                params: {
                    name: this.username,
                    key: this.password
                }
            });
        });
        Button.pop();
        Text.create("通过第三方登录");
        Text.margin({
            bottom: 16
        });
        Text.pop();
        Row.create({ space: 10 });
        Row.margin({
            bottom: 16
        });
        Image.create($r("app.media.instagram"));
        Image.width(30);
        Image.height(30);
        Image.objectFit(ImageFit.Cover);
        Image.create($r("app.media.microsoft"));
        Image.width(30);
        Image.height(30);
        Image.objectFit(ImageFit.Cover);
        Image.create($r("app.media.facebook"));
        Image.width(30);
        Image.height(30);
        Image.objectFit(ImageFit.Cover);
        Row.pop();
        Button.createWithLabel("立即注册");
        Button.width(200);
        Button.backgroundColor(Color.Pink);
        Button.margin({
            bottom: 20
        });
        Button.pop();
        Column.pop();
    }
}
loadDocument(new LoginPage("1", undefined, {}));
