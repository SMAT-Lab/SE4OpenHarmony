interface MyDataPanel_Params {
    values1?: number[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyDataPanel_" + ++__generate__Id;
}
export class MyDataPanel extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.values1 = [10, 10, 10, 10, 10, 10, 10, 10, 10];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyDataPanel_Params) {
        if (params.values1 !== undefined) {
            this.values1 = params.values1;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    public values1: number[];
    render() {
        Column.create({ space: 5 });
        Column.width('100%');
        Column.margin({ top: 5 });
        Text.create('Circle');
        Text.fontSize(9);
        Text.fontColor(0xCCCCCC);
        Text.margin({ top: 20, right: '80%' });
        Text.pop();
        DataPanel.create({ values: this.values1, max: 100, type: DataPanelType.Circle });
        DataPanel.width(200);
        DataPanel.height(200);
        DataPanel.pop();
        Text.create('Line');
        Text.fontSize(9);
        Text.fontColor(0xCCCCCC);
        Text.margin({ bottom: 20, right: '80%' });
        Text.pop();
        DataPanel.create({ values: this.values1, max: 100, type: DataPanelType.Line });
        DataPanel.width(300);
        DataPanel.height(10);
        DataPanel.pop();
        Column.pop();
    }
}
