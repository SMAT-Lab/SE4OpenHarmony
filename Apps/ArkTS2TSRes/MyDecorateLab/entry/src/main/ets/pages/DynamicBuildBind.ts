interface DynamicBind_Params {
    message?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "DynamicBuildBind_" + ++__generate__Id;
}
class DynamicBind extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: DynamicBind_Params) {
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
        Row.create();
        Row.height('100%');
        Column.create({ space: 20 });
        Column.width('100%');
        // 在build中使用被@builder装饰的函数
        this.TextDemo(this.message, this);
        this.TextDemo('东山：愿先生心境四季如春', this);
        Text.create('再见');
        __Text__Tt(20);
        Text.pop();
        Text.create('你好');
        __Text__Tt(60);
        Text.pop();
        Column.pop();
        Row.pop();
    }
    // 在build函数外，使用@Builder装饰一个函数
    TextDemo(label: string, parent = null) {
        Text.create(label);
        Text.fontColor(0xff69b4);
        Text.fontWeight(700);
        Text.fontSize(30);
        Text.pop();
    }
}
function __Text__Tt(fontSize: number): void {
    Text.fontStyle(FontStyle.Italic);
    Text.fontSize(fontSize);
}
loadDocument(new DynamicBind("1", undefined, {}));
