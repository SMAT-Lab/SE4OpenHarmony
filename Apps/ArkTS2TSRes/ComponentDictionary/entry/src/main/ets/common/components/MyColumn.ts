interface MyColumn_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyColumn_" + ++__generate__Id;
}
export class MyColumn extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyColumn_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.padding({ top: 5 });
        Text.create('space');
        Text.fontSize(9);
        Text.fontColor(0xCCCCCC);
        Text.width('90%');
        Text.pop();
        Column.create({ space: 5 });
        Column.width('90%');
        Column.height(100);
        Column.border({ width: 1 });
        Column.create();
        Column.width('100%');
        Column.height(30);
        Column.backgroundColor(0xAFEEEE);
        Column.pop();
        Column.create();
        Column.width('100%');
        Column.height(30);
        Column.backgroundColor(0x00FFFF);
        Column.pop();
        Column.pop();
        Text.create('alignItems(Start)');
        Text.fontSize(9);
        Text.fontColor(0xCCCCCC);
        Text.width('90%');
        Text.pop();
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Column.width('90%');
        Column.border({ width: 1 });
        Column.create();
        Column.width('50%');
        Column.height(30);
        Column.backgroundColor(0xAFEEEE);
        Column.pop();
        Column.create();
        Column.width('50%');
        Column.height(30);
        Column.backgroundColor(0x00FFFF);
        Column.pop();
        Column.pop();
        Text.create('alignItems(End)');
        Text.fontSize(9);
        Text.fontColor(0xCCCCCC);
        Text.width('90%');
        Text.pop();
        Column.create();
        Column.alignItems(HorizontalAlign.End);
        Column.width('90%');
        Column.border({ width: 1 });
        Column.create();
        Column.width('50%');
        Column.height(30);
        Column.backgroundColor(0xAFEEEE);
        Column.pop();
        Column.create();
        Column.width('50%');
        Column.height(30);
        Column.backgroundColor(0x00FFFF);
        Column.pop();
        Column.pop();
        Text.create('justifyContent(Center)');
        Text.fontSize(9);
        Text.fontColor(0xCCCCCC);
        Text.width('90%');
        Text.pop();
        Column.create();
        Column.height('15%');
        Column.border({ width: 1 });
        Column.justifyContent(FlexAlign.Center);
        Column.create();
        Column.width('30%');
        Column.height(30);
        Column.backgroundColor(0xAFEEEE);
        Column.pop();
        Column.create();
        Column.width('30%');
        Column.height(30);
        Column.backgroundColor(0x00FFFF);
        Column.pop();
        Column.pop();
        Text.create('justifyContent(End)');
        Text.fontSize(9);
        Text.fontColor(0xCCCCCC);
        Text.width('90%');
        Text.pop();
        Column.create();
        Column.height('15%');
        Column.border({ width: 1 });
        Column.justifyContent(FlexAlign.End);
        Column.create();
        Column.width('30%');
        Column.height(30);
        Column.backgroundColor(0xAFEEEE);
        Column.pop();
        Column.create();
        Column.width('30%');
        Column.height(30);
        Column.backgroundColor(0x00FFFF);
        Column.pop();
        Column.pop();
        Column.pop();
    }
}
