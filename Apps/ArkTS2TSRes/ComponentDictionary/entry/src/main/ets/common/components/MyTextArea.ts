interface MyTextArea_Params {
    controller?: TextAreaController;
    text?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyTextArea_" + ++__generate__Id;
}
export class MyTextArea extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = new TextAreaController();
        this.__text = new ObservedPropertySimple('', this, "text");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyTextArea_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.text !== undefined) {
            this.text = params.text;
        }
    }
    aboutToBeDeleted() {
        this.__text.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private controller: TextAreaController;
    private __text: ObservedPropertySimple<string>;
    get text() {
        return this.__text.get();
    }
    set text(newValue: string) {
        this.__text.set(newValue);
    }
    render() {
        Column.create();
        TextArea.create({ placeholder: 'input your word', controller: this.controller });
        TextArea.placeholderColor("rgb(0,0,225)");
        TextArea.placeholderFont({ size: 20, weight: 100, family: 'cursive', style: FontStyle.Italic });
        TextArea.textAlign(TextAlign.Center);
        TextArea.caretColor(Color.Blue);
        TextArea.fontSize(30);
        TextArea.fontWeight(FontWeight.Bold);
        TextArea.fontFamily("sans-serif");
        TextArea.fontStyle(FontStyle.Normal);
        TextArea.fontColor(Color.Red);
        TextArea.inputFilter('^[\u4E00-\u9FA5A-Za-z0-9_]+$', (value: string) => {
            console.info("hyb" + value);
        });
        TextArea.onChange((value: string) => {
            this.text = value;
            this.controller.caretPosition(-1);
        });
        Text.create(this.text);
        Text.width('90%');
        Text.pop();
        Column.pop();
    }
}
