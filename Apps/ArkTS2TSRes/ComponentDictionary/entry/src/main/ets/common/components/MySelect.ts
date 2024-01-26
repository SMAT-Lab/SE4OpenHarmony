interface MySelect_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MySelect_" + ++__generate__Id;
}
export class MySelect extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MySelect_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Column.create();
        Select.create([{ value: 'aaa', icon: "/common/1.png" },
            { value: 'bbb', icon: "/common/2.png" },
            { value: 'ccc', icon: "/common/3.png" },
            { value: 'ddd', icon: "/common/4.png" }]);
        Select.selected(2);
        Select.value('TTT');
        Select.font({ size: 30, weight: 400, family: 'serif', style: FontStyle.Normal });
        Select.selectedOptionFont({ size: 40, weight: 500, family: 'serif', style: FontStyle.Normal });
        Select.optionFont({ size: 30, weight: 400, family: 'serif', style: FontStyle.Normal });
        Select.onSelect((index: number) => {
            console.info("Select:" + index);
        });
        Select.pop();
        Column.pop();
    }
}
