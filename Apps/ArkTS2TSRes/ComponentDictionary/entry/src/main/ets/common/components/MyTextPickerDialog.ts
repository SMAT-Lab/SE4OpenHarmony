interface MyTextPickerDialog_Params {
    select?: number;
    fruits?: string[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyTextPickerDialog_" + ++__generate__Id;
}
export class MyTextPickerDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__select = new ObservedPropertySimple(1, this, "select");
        this.fruits = ['apple1', 'orange2', 'peach3', 'grape4'];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyTextPickerDialog_Params) {
        if (params.select !== undefined) {
            this.select = params.select;
        }
        if (params.fruits !== undefined) {
            this.fruits = params.fruits;
        }
    }
    aboutToBeDeleted() {
        this.__select.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __select: ObservedPropertySimple<number>;
    get select() {
        return this.__select.get();
    }
    set select(newValue: number) {
        this.__select.set(newValue);
    }
    private fruits: string[];
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center,
            justifyContent: FlexAlign.Center });
        Button.createWithLabel("TextPickerDialog");
        Button.onClick(() => {
            TextPickerDialog.show({
                range: this.fruits,
                selected: this.select,
                onAccept: (value: TextPickerResult) => {
                    console.info("TextPickerDialog:onAccept()" + JSON.stringify(value));
                    this.select = value.index;
                },
                onCancel: () => {
                    console.info("TextPickerDialog:onCancel()");
                },
                onChange: (value: TextPickerResult) => {
                    console.info("TextPickerDialog:onChange()" + JSON.stringify(value));
                }
            });
        });
        Button.pop();
        Flex.pop();
    }
}
