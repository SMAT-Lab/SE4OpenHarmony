interface ButtonPage_Params {
    message?: string;
    isvisited?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ButtonPage_" + ++__generate__Id;
}
class ButtonPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.__isvisited = new ObservedPropertySimple(true, this, "isvisited");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ButtonPage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.isvisited !== undefined) {
            this.isvisited = params.isvisited;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__isvisited.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __isvisited: ObservedPropertySimple<boolean>;
    get isvisited() {
        return this.__isvisited.get();
    }
    set isvisited(newValue: boolean) {
        this.__isvisited.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Text.create("北师大");
        Text.backgroundColor(Color.Blue);
        Text.padding({
            bottom: 10,
            top: 20,
            left: 30,
            right: 40
        });
        Text.border({
            width: 10,
            color: Color.Gray,
            style: BorderStyle.Dotted,
            radius: 10
        });
        Text.pop();
        Text.create(this.message);
        Text.width(200);
        Text.height(200);
        Text.backgroundColor(Color.Orange);
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.borderRadius({
            topRight: 20,
            bottomRight: 10
        });
        Text.margin({
            bottom: 10,
            top: 10
        });
        Text.borderStyle(BorderStyle.Dotted);
        Text.borderWidth(10);
        Text.borderColor(Color.Pink);
        Text.pop();
        Button.createWithLabel("按钮");
        Button.type(ButtonType.Capsule);
        Button.backgroundColor(Color.Black);
        Button.onClick(() => {
            this.isvisited = true;
        });
        Button.width(200);
        Button.pop();
        If.create();
        if (this.isvisited) {
            If.branchId(0);
            Button.createWithLabel("yuanxing按钮");
            Button.type(ButtonType.Circle);
            Button.width("30%");
            Button.pop();
        }
        If.pop();
        Button.createWithLabel("按钮");
        Button.type(ButtonType.Normal);
        Button.borderRadius(30);
        Button.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new ButtonPage("1", undefined, {}));
