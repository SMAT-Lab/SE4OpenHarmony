interface MyTextInput_Params {
    text?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyTextInput_" + ++__generate__Id;
}
export class MyTextInput extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__text = new ObservedPropertySimple('', this, "text");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyTextInput_Params) {
        if (params.text !== undefined) {
            this.text = params.text;
        }
    }
    aboutToBeDeleted() {
        this.__text.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __text: ObservedPropertySimple<string>;
    get text() {
        return this.__text.get();
    }
    set text(newValue: string) {
        this.__text.set(newValue);
    }
    render() {
        Column.create();
        TextInput.create({ placeholder: 'input your word' });
        TextInput.placeholderColor("rgb(0,0,225)");
        TextInput.placeholderFont({ size: 30, weight: 100, family: 'cursive', style: FontStyle.Italic });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.fontWeight(FontWeight.Bold);
        TextInput.fontFamily("sans-serif");
        TextInput.fontStyle(FontStyle.Normal);
        TextInput.fontColor(Color.Red);
        TextInput.onChange((value: string) => {
            this.text = value;
        });
        Text.create(this.text);
        Text.width('90%');
        Text.pop();
        Column.pop();
    }
}
