interface MyCheckbox_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyCheckbox_" + ++__generate__Id;
}
export class MyCheckbox extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyCheckbox_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    //多选框组件，通常用于某选项的打开或关闭。
    render() {
        Row.create();
        //name:多选框名称,  group:多选框的群组名称
        Checkbox.create({ name: 'checkbox1', group: 'checkboxGroup' });
        //name:多选框名称,  group:多选框的群组名称
        Checkbox.select(true);
        //name:多选框名称,  group:多选框的群组名称
        Checkbox.selectedColor(0xed6f21);
        //name:多选框名称,  group:多选框的群组名称
        Checkbox.onChange((value: boolean) => {
            //当选中状态发生变化时，触发该回调;value为true时，表示已选中,反之
            console.info('Checkbox1 change is' + value);
        });
        //name:多选框名称,  group:多选框的群组名称
        Checkbox.pop();
        Checkbox.create({ name: 'checkbox2', group: 'checkboxGroup' });
        Checkbox.select(false);
        Checkbox.selectedColor(0x39a2db);
        Checkbox.onChange((value: boolean) => {
            console.info('Checkbox2 change is' + value);
        });
        Checkbox.pop();
        Row.pop();
    }
}
