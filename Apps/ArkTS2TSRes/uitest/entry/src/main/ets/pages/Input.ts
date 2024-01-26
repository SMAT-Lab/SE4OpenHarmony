interface Input_Params {
    message?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Input_" + ++__generate__Id;
}
class Input extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Input_Params) {
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
        TextInput.create({ placeholder: 'welcome', text: 'Hello World' });
        TextInput.type(InputType.Normal);
        TextInput.width(300);
        TextInput.height(50);
        TextInput.fontSize(40);
        TextInput.enabled(true);
        TextInput.margin({ top: 20 });
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Input("1", undefined, {}));
