interface TextInputPage_Params {
    message?: string;
    text?: string;
    controller?: TextInputController;
    controller2?: TextInputController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TestInputPage_" + ++__generate__Id;
}
class TextInputPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.__text = new ObservedPropertySimple('', this, "text");
        this.controller = new TextInputController();
        this.controller2 = new TextInputController();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TextInputPage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.text !== undefined) {
            this.text = params.text;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.controller2 !== undefined) {
            this.controller2 = params.controller2;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__text.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __text: ObservedPropertySimple<string>;
    get text() {
        return this.__text.get();
    }
    set text(newValue: string) {
        this.__text.set(newValue);
    }
    private controller: TextInputController;
    private controller2: TextInputController;
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Text.create(this.message);
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({
            placeholder: "请输入密码",
            text: this.text,
            controller: this.controller
        });
        TextInput.onChange((value: string) => {
            this.message = value;
        });
        TextInput.type(InputType.Password);
        TextInput.placeholderColor(Color.Blue);
        TextInput.placeholderFont({
            size: 40,
            weight: 100,
        });
        TextInput.width("80%");
        TextInput.height(100);
        TextInput.fontSize(40);
        TextInput.fontColor(Color.Green);
        TextInput.create({
            placeholder: "请输入电话号码",
            text: this.text,
            controller: this.controller2
        });
        TextInput.type(InputType.PhoneNumber);
        Column.pop();
        Row.pop();
    }
}
loadDocument(new TextInputPage("1", undefined, {}));
