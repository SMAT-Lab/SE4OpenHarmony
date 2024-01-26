interface MyRow_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyRow_" + ++__generate__Id;
}
export class MyRow extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyRow_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Column.create({ space: 5 });
        Column.width('100%');
        Text.create('space');
        Text.fontSize(9);
        Text.fontColor(0xCCCCCC);
        Text.width('90%');
        Text.pop();
        Row.create({ space: 5 });
        Row.width('90%');
        Row.height(107);
        Row.border({ width: 1 });
        Row.create();
        Row.width('30%');
        Row.height(50);
        Row.backgroundColor(0xAFEEEE);
        Row.pop();
        Row.create();
        Row.width('30%');
        Row.height(50);
        Row.backgroundColor(0x00FFFF);
        Row.pop();
        Row.pop();
        Text.create('alignItems(Top)');
        Text.fontSize(9);
        Text.fontColor(0xCCCCCC);
        Text.width('90%');
        Text.pop();
        Row.create();
        Row.alignItems(VerticalAlign.Top);
        Row.height('15%');
        Row.border({ width: 1 });
        Row.create();
        Row.width('30%');
        Row.height(50);
        Row.backgroundColor(0xAFEEEE);
        Row.pop();
        Row.create();
        Row.width('30%');
        Row.height(50);
        Row.backgroundColor(0x00FFFF);
        Row.pop();
        Row.pop();
        Text.create('alignItems(Center)');
        Text.fontSize(9);
        Text.fontColor(0xCCCCCC);
        Text.width('90%');
        Text.pop();
        Row.create();
        Row.alignItems(VerticalAlign.Center);
        Row.height('15%');
        Row.border({ width: 1 });
        Row.create();
        Row.width('30%');
        Row.height(50);
        Row.backgroundColor(0xAFEEEE);
        Row.pop();
        Row.create();
        Row.width('30%');
        Row.height(50);
        Row.backgroundColor(0x00FFFF);
        Row.pop();
        Row.pop();
        Text.create('justifyContent(End)');
        Text.fontSize(9);
        Text.fontColor(0xCCCCCC);
        Text.width('90%');
        Text.pop();
        Row.create();
        Row.width('90%');
        Row.border({ width: 1 });
        Row.justifyContent(FlexAlign.End);
        Row.create();
        Row.width('30%');
        Row.height(50);
        Row.backgroundColor(0xAFEEEE);
        Row.pop();
        Row.create();
        Row.width('30%');
        Row.height(50);
        Row.backgroundColor(0x00FFFF);
        Row.pop();
        Row.pop();
        Text.create('justifyContent(Center)');
        Text.fontSize(9);
        Text.fontColor(0xCCCCCC);
        Text.width('90%');
        Text.pop();
        Row.create();
        Row.width('90%');
        Row.border({ width: 1 });
        Row.justifyContent(FlexAlign.Center);
        Row.create();
        Row.width('30%');
        Row.height(50);
        Row.backgroundColor(0xAFEEEE);
        Row.pop();
        Row.create();
        Row.width('30%');
        Row.height(50);
        Row.backgroundColor(0x00FFFF);
        Row.pop();
        Row.pop();
        Column.pop();
    }
}
