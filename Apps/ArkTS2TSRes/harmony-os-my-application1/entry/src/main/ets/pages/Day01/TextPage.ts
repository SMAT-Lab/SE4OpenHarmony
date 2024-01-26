interface TextPage_Params {
    message?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TextPage_" + ++__generate__Id;
}
class TextPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TextPage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    render() {
        Column.create();
        Row.create({ space: 10 });
        Text.create("文本一");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.backgroundColor(Color.Blue);
        Text.fontWeight(FontWeight.Bold);
        Text.layoutWeight(2);
        Text.padding(10);
        Text.pop();
        Text.create("文本二");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.backgroundColor(Color.Green);
        Text.fontWeight(FontWeight.Bold);
        Text.layoutWeight(3);
        Text.padding(10);
        Text.pop();
        Text.create("文本三");
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.backgroundColor(Color.Red);
        Text.fontWeight(FontWeight.Bold);
        Text.layoutWeight(4);
        Text.pop();
        Row.pop();
        Row.create();
        Button.createWithLabel("登录");
        Button.width(200);
        Button.type(ButtonType.Normal);
        Button.fontColor(Color.Black);
        Button.backgroundColor(Color.Gray);
        Button.pop();
        Row.pop();
        Column.pop();
    }
}
loadDocument(new TextPage("1", undefined, {}));
