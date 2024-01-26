interface ThridPage_Params {
    message?: string;
    password?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ThridPage_" + ++__generate__Id;
}
class ThridPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.__password = new ObservedPropertySimple('密码', this, "password");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ThridPage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.password !== undefined) {
            this.password = params.password;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
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
    private __password: ObservedPropertySimple<string>;
    get password() {
        return this.__password.get();
    }
    set password(newValue: string) {
        this.__password.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Text.create(this.message);
        Text.fontSize(50);
        Text.fontColor(Color.Orange);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Image.create("https://img1.baidu.com/it/u=1960110688,1786190632&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281");
        Image.width("50%");
        Image.height("50%");
        Button.createWithLabel("按钮");
        Button.type(ButtonType.Capsule);
        Button.width(200);
        Button.margin(20);
        Button.pop();
        TextInput.create({ text: this.password });
        TextInput.onChange((value: string) => {
            this.password = value;
        });
        TextInput.height(60);
        Text.create(this.password);
        Text.fontSize(60);
        Text.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new ThridPage("1", undefined, {}));
