interface MyColumnSplit_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyColumnSplit_" + ++__generate__Id;
}
export class MyColumnSplit extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyColumnSplit_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Column.create();
        Column.width('100%');
        Text.create('The secant line can be dragged');
        Text.fontSize(9);
        Text.fontColor(0xCCCCCC);
        Text.width('90%');
        Text.pop();
        ColumnSplit.create();
        ColumnSplit.resizeable(true);
        ColumnSplit.width('90%');
        ColumnSplit.height('60%');
        Text.create('1');
        Text.width('100%');
        Text.height(50);
        Text.backgroundColor(0xF5DEB3);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Text.create('2');
        Text.width('100%');
        Text.height(50);
        Text.backgroundColor(0xD2B48C);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Text.create('3');
        Text.width('100%');
        Text.height(50);
        Text.backgroundColor(0xF5DEB3);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Text.create('4');
        Text.width('100%');
        Text.height(50);
        Text.backgroundColor(0xD2B48C);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Text.create('5');
        Text.width('100%');
        Text.height(50);
        Text.backgroundColor(0xF5DEB3);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        ColumnSplit.pop();
        Column.pop();
    }
}
