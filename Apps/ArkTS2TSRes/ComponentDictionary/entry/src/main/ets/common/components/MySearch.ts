interface MySearch_Params {
    changeValue?: string;
    submitValue?: string;
    controller?: SearchController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MySearch_" + ++__generate__Id;
}
export class MySearch extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__changeValue = new ObservedPropertySimple('', this, "changeValue");
        this.__submitValue = new ObservedPropertySimple('', this, "submitValue");
        this.controller = new SearchController();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MySearch_Params) {
        if (params.changeValue !== undefined) {
            this.changeValue = params.changeValue;
        }
        if (params.submitValue !== undefined) {
            this.submitValue = params.submitValue;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    aboutToBeDeleted() {
        this.__changeValue.aboutToBeDeleted();
        this.__submitValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __changeValue: ObservedPropertySimple<string>;
    get changeValue() {
        return this.__changeValue.get();
    }
    set changeValue(newValue: string) {
        this.__changeValue.set(newValue);
    }
    private __submitValue: ObservedPropertySimple<string>;
    get submitValue() {
        return this.__submitValue.get();
    }
    set submitValue(newValue: string) {
        this.__submitValue.set(newValue);
    }
    private controller: SearchController;
    render() {
        Column.create();
        Column.width('100%');
        Text.create('onSubmit:' + this.submitValue);
        Text.fontSize(18);
        Text.margin(15);
        Text.pop();
        Text.create('onChange:' + this.changeValue);
        Text.fontSize(18);
        Text.margin(15);
        Text.pop();
        Search.create({ value: this.changeValue, placeholder: 'Type to search...', controller: this.controller });
        Search.searchButton('SEARCH');
        Search.width(400);
        Search.height(40);
        Search.backgroundColor(Color.White);
        Search.placeholderColor(Color.Grey);
        Search.placeholderFont({ size: 14, weight: 400 });
        Search.textFont({ size: 14, weight: 400 });
        Search.onSubmit((value: string) => {
            this.submitValue = value;
        });
        Search.onChange((value: string) => {
            this.changeValue = value;
        });
        Search.margin(20);
        Search.pop();
        Button.createWithLabel('Set caretPosition 1');
        Button.onClick(() => {
            // 设置光标位置到输入的第一个字符后
            this.controller.caretPosition(1);
        });
        Button.pop();
        Column.pop();
    }
}
