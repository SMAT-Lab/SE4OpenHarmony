interface DynamicPage_Params {
    message?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "DynamicPage_" + ++__generate__Id;
}
class DynamicPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: DynamicPage_Params) {
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
        Column.create();
        Column.width('100%');
        Text.create(this.message);
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        this.createText("测试", this);
        Column.pop();
        Row.pop();
    }
    //@Builder 快速生成多个布局内容
    createText(name: string, parent = null) {
        Text.create(name);
        Text.fontSize(30);
        Text.fontColor(Color.White);
        Text.height(100);
        Text.width(100);
        Text.backgroundColor(Color.Blue);
        Text.height(100);
        Text.width(100);
        Text.backgroundColor(Color.Red);
        Text.pop();
        Text.create(name);
        Text.fontSize(30);
        Text.fontColor(Color.White);
        __Text__textEf();
        Text.pop();
    }
}
//扩展原生组件样式
function __Text__textEf(): void {
    Text.fontColor(Color.Orange);
    Text.fontSize(50);
}
loadDocument(new DynamicPage("1", undefined, {}));
