interface LoginPage_Params {
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
        this.__username = new ObservedPropertySimple("", this, "username");
        this.__password = new ObservedPropertySimple("", this, "password");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: LoginPage_Params) {
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
        Column.alignItems(HorizontalAlign.Center);
        Column.justifyContent(FlexAlign.Center);
        Column.margin({
            left: 20,
            right: 20,
            bottom: 40,
            top: 40
        });
        //第一块
        Text.create("欢迎来到图片妙妙屋！");
        //第一块
        Text.fontColor(Color.Black);
        //第一块
        Text.fontSize(36);
        //第一块
        Text.fontWeight(600);
        //第一块
        Text.margin({
            bottom: 60
        });
        //第一块
        Text.pop();
        //第二块
        Column.create({ space: 10 });
        //第二块
        Column.alignItems(HorizontalAlign.Start);
        Text.create("您觉得咱做得咋样？");
        Text.fontWeight(FontWeight.Bold);
        Text.margin({
            bottom: 16
        });
        Text.pop();
        Row.create();
        Row.margin({
            bottom: 16
        });
        Image.create($r("app.media.user"));
        Image.width(20);
        Image.margin({
            right: 20
        });
        TextInput.create({
            placeholder: "给点鼓励吧！",
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
        Text.pop();
        Row.create();
        Row.margin({
            bottom: 16
        });
        Image.create($r("app.media.password"));
        Image.width(20);
        Image.margin({
            right: 20
        });
        TextInput.create({
            placeholder: "请输入密码",
            text: this.password
        });
        TextInput.width("60%");
        TextInput.onChange((val: string) => {
            this.password = val;
        });
        Row.pop();
        //第二块
        Column.pop();
        Divider.create();
        Divider.width("80%");
        Row.create();
        Row.width("60%");
        Blank.create();
        Blank.pop();
        Text.create("忘记密码");
        Text.pop();
        Row.pop();
        Button.createWithLabel("登录");
        Button.width(300);
        Button.backgroundColor(Color.Gray);
        Button.margin({
            bottom: 40
        });
        Button.onClick(() => {
            router.pushUrl({
                url: "pages/TabPage",
            });
        });
        Button.pop();
        Row.create({ space: 10 });
        Image.create($r("app.media.QQ"));
        Image.width(20);
        Image.create($r("app.media.zfb"));
        Image.width(20);
        Image.create($r("app.media.weixin"));
        Image.width(20);
        Row.pop();
        Text.create("立即注册");
        Text.margin({
            top: 20
        });
        Text.pop();
        Column.pop();
    }
}
loadDocument(new LoginPage("1", undefined, {}));
