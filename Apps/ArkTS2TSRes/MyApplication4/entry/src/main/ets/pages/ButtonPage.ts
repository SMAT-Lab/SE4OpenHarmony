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
        this.__isvisited = new ObservedPropertySimple(false, this, "isvisited");
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
        Text.create("BNU");
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bolder);
        Text.fontColor(Color.Brown);
        Text.backgroundColor(Color.Transparent);
        Text.padding({
            bottom: 10,
            top: 10,
            left: 40,
            right: 40
        });
        Text.border({
            width: 10,
            color: Color.Brown,
            style: BorderStyle.Solid,
            radius: 10
        });
        Text.pop();
        Text.create(this.message);
        Text.width(200);
        Text.height(200);
        Text.backgroundColor(Color.Pink);
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.fontColor(Color.White);
        Text.borderRadius({
            topRight: 50
        });
        Text.margin({
            bottom: 10,
            top: 20
        });
        Text.padding(10);
        Text.borderStyle(BorderStyle.Dashed);
        Text.borderWidth(5);
        Text.borderColor(Color.Black);
        Text.pop();
        //胶囊按钮
        Button.createWithLabel("按我");
        //胶囊按钮
        Button.type(ButtonType.Capsule);
        //胶囊按钮
        Button.onClick(() => {
            this.isvisited = true;
        });
        //胶囊按钮
        Button.width(80);
        //胶囊按钮
        Button.pop();
        If.create();
        if (this.isvisited) {
            If.branchId(0);
            //圆形按钮
            Button.createWithLabel("按");
            //圆形按钮
            Button.type(ButtonType.Circle);
            //圆形按钮
            Button.width("20%");
            //圆形按钮
            Button.pop();
        }
        If.pop();
        //Button("我是按钮").type(ButtonType.Normal).height(90)
        Button.createWithLabel("我是按钮");
        //Button("我是按钮").type(ButtonType.Normal).height(90)
        Button.type(ButtonType.Normal);
        //Button("我是按钮").type(ButtonType.Normal).height(90)
        Button.borderRadius(10);
        //Button("我是按钮").type(ButtonType.Normal).height(90)
        Button.pop();
        Button.createWithLabel("方形按钮");
        Button.type(ButtonType.Normal);
        Button.borderRadius({
            bottomLeft: 10,
            bottomRight: 20,
            topLeft: 10,
            topRight: 40
        });
        Button.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new ButtonPage("1", undefined, {}));
