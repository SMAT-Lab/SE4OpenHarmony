interface MyTextPicker_Params {
    select?: number;
    fruits?: string[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyTextPicker_" + ++__generate__Id;
}
export class MyTextPicker extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.select = 1;
        this.fruits = ['apple1', 'orange2', 'peach3', 'grape4'];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyTextPicker_Params) {
        if (params.select !== undefined) {
            this.select = params.select;
        }
        if (params.fruits !== undefined) {
            this.fruits = params.fruits;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private select: number;
    private fruits: string[];
    render() {
        Column.create();
        TextPicker.create({ range: this.fruits, selected: this.select });
        TextPicker.onChange((value: string, index: number) => {
            console.info('Picker item changed, value: ' + value + ', index: ' + index);
        });
        TextPicker.pop();
        Column.pop();
    }
}
