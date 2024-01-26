interface MyLoadingProgress_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyLoadingProgress_" + ++__generate__Id;
}
export class MyLoadingProgress extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyLoadingProgress_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Column.create({ space: 5 });
        Column.width('100%');
        Column.margin({ top: 5 });
        Text.create('Orbital LoadingProgress ');
        Text.fontSize(9);
        Text.fontColor(0xCCCCCC);
        Text.width('90%');
        Text.pop();
        LoadingProgress.create();
        LoadingProgress.color(Color.Blue);
        Column.pop();
    }
}
loadDocument(new MyLoadingProgress("1", undefined, {}));
