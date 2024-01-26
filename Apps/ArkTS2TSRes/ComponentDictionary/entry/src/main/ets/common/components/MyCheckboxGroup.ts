interface MyCheckboxGroup_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyCheckboxGroup_" + ++__generate__Id;
}
export class MyCheckboxGroup extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyCheckboxGroup_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Scroll.create();
        Column.create();
        CheckboxGroup.create({ group: 'checkboxGroup' });
        CheckboxGroup.selectedColor(0xed6f21);
        CheckboxGroup.onChange((itemName: CheckboxGroupResult) => {
            console.info("TextPicker::dialogResult is" + JSON.stringify(itemName));
        });
        CheckboxGroup.pop();
        Checkbox.create({ name: 'checkbox1', group: 'checkboxGroup' });
        Checkbox.select(true);
        Checkbox.selectedColor(0x39a2db);
        Checkbox.onChange((value: boolean) => {
            console.info('Checkbox1 change is' + value);
        });
        Checkbox.pop();
        Checkbox.create({ name: 'checkbox2', group: 'checkboxGroup' });
        Checkbox.select(false);
        Checkbox.selectedColor(0x39a2db);
        Checkbox.onChange((value: boolean) => {
            console.info('Checkbox2 change is' + value);
        });
        Checkbox.pop();
        Checkbox.create({ name: 'checkbox3', group: 'checkboxGroup' });
        Checkbox.select(true);
        Checkbox.selectedColor(0x39a2db);
        Checkbox.onChange((value: boolean) => {
            console.info('Checkbox3 change is' + value);
        });
        Checkbox.pop();
        Column.pop();
        Scroll.pop();
    }
}
