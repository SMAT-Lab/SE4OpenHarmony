interface MyBlank_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyBlank_" + ++__generate__Id;
}
export class MyBlank extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyBlank_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Column.create();
        Column.backgroundColor(0xEFEFEF);
        Column.padding(20);
        Row.create();
        Row.width('100%');
        Row.backgroundColor(0xFFFFFF);
        Row.borderRadius(15);
        Row.padding({ left: 12 });
        Text.create('Bluetooth');
        Text.fontSize(18);
        Text.pop();
        Blank.create();
        Blank.pop();
        Toggle.create({ type: ToggleType.Switch });
        Toggle.pop();
        Row.pop();
        Column.pop();
    }
}
