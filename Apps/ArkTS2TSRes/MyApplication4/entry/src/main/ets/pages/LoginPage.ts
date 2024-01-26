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
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
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
        Row.create();
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.alignItems(HorizontalAlign.Center);
        Column.justifyContent(FlexAlign.Center);
        Column.margin({
            left: 20,
            right: 20,
            bottom: 40,
            top: 40
        });
        // Part 1
        Text.create("登录");
        // Part 1
        Text.fontSize(40);
        // Part 1
        Text.fontWeight(600);
        // Part 1
        Text.margin({
            bottom: 60
        });
        // Part 1
        Text.pop();
        // Part 2
        Column.create();
        // Part 2
        Column.alignItems(HorizontalAlign.Start);
        Text.create("用户名");
        Text.fontWeight(FontWeight.Bold);
        Text.margin({
            bottom: 10
        });
        Text.pop();
        Row.create();
        Image.create($r("app.media.Name"));
        Image.width(20);
        Image.margin({
            right: 20
        });
        TextInput.create({
            placeholder: "请输入用户名",
            text: this.username
        });
        TextInput.width("70%");
        TextInput.onChange((val: string) => {
            this.username = val;
        });
        Row.pop();
        Divider.create();
        Divider.width("80%");
        Divider.margin({
            bottom: 10
        });
        Text.create("密码");
        Text.fontWeight(FontWeight.Bold);
        Text.margin({
            bottom: 10
        });
        Text.pop();
        Row.create();
        Image.create($r("app.media.pwd"));
        Image.width(20);
        Image.margin({
            right: 20
        });
        TextInput.create({
            placeholder: "请输入密码"
        });
        TextInput.width("70%");
        TextInput.onChange((val: string) => {
            this.password = val;
        });
        Row.pop();
        Divider.create();
        Divider.width("80%");
        // Part 2
        Column.pop();
        // Part 3
        Row.create();
        // Part 3
        Row.width("80%");
        Blank.create();
        Blank.pop();
        Text.create("忘记密码");
        Text.pop();
        // Part 3
        Row.pop();
        // Part 4 登录+跳转页面
        Button.createWithLabel("登录");
        // Part 4 登录+跳转页面
        Button.width(300);
        // Part 4 登录+跳转页面
        Button.backgroundColor(Color.Gray);
        // Part 4 登录+跳转页面
        Button.margin({
            bottom: 40,
            top: 20
        });
        // Part 4 登录+跳转页面
        Button.onClick(() => {
            router.pushUrl({
                url: "pages/TabPage",
                params: {
                    name: this.username
                }
            });
        });
        // Part 4 登录+跳转页面
        Button.pop();
        Row.create({ space: 10 });
        Image.create($r("app.media.QQ"));
        Image.width(20);
        Image.create($r("app.media.weixin"));
        Image.width(20);
        Image.create($r("app.media.weibo"));
        Image.width(20);
        Row.pop();
        Text.create("立即注册");
        Text.margin({
            top: 10
        });
        Text.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new LoginPage("1", undefined, {}));
