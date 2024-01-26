interface MyRowSplit_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyRowSplit_" + ++__generate__Id;
}
export class MyRowSplit extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyRowSplit_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.margin({ top: 5 });
        Text.create('The second line can be dragged');
        Text.fontSize(9);
        Text.fontColor(0xCCCCCC);
        Text.width('90%');
        Text.pop();
        RowSplit.create();
        RowSplit.resizeable(true);
        RowSplit.width('90%');
        RowSplit.height(100);
        Text.create('1');
        Text.width('10%');
        Text.height(100);
        Text.backgroundColor(0xF5DEB3);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Text.create('2');
        Text.width('10%');
        Text.height(100);
        Text.backgroundColor(0xD2B48C);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Text.create('3');
        Text.width('10%');
        Text.height(100);
        Text.backgroundColor(0xF5DEB3);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Text.create('4');
        Text.width('10%');
        Text.height(100);
        Text.backgroundColor(0xD2B48C);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Text.create('5');
        Text.width('10%');
        Text.height(100);
        Text.backgroundColor(0xF5DEB3);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        RowSplit.pop();
        Column.pop();
    }
}
