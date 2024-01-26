interface MyGridGridItem_Params {
    numbers?: string[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyGridGridItem_" + ++__generate__Id;
}
export class MyGridGridItem extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__numbers = new ObservedPropertyObject(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'], this, "numbers");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyGridGridItem_Params) {
        if (params.numbers !== undefined) {
            this.numbers = params.numbers;
        }
    }
    aboutToBeDeleted() {
        this.__numbers.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __numbers: ObservedPropertyObject<string[]>;
    get numbers() {
        return this.__numbers.get();
    }
    set numbers(newValue: string[]) {
        this.__numbers.set(newValue);
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.margin({ top: 5 });
        Grid.create();
        Grid.columnsTemplate('1fr 1fr 1fr 1fr 1fr');
        Grid.rowsTemplate('1fr 1fr 1fr 1fr 1fr');
        Grid.width('90%');
        Grid.height(300);
        GridItem.create();
        GridItem.rowStart(1);
        GridItem.rowEnd(4);
        Text.create('4');
        Text.fontSize(16);
        Text.backgroundColor(0xFAEEE0);
        Text.width('100%');
        Text.height('100%');
        Text.textAlign(TextAlign.Center);
        Text.pop();
        GridItem.pop();
        ForEach.create("2", this, ObservedObject.GetRawObject(this.numbers), (item) => {
            GridItem.create();
            GridItem.forceRebuild(false);
            Text.create(item);
            Text.fontSize(16);
            Text.backgroundColor(0xF9CF93);
            Text.width('100%');
            Text.height('100%');
            Text.textAlign(TextAlign.Center);
            Text.pop();
            GridItem.pop();
        }, item => item);
        ForEach.pop();
        GridItem.create();
        GridItem.columnStart(1);
        GridItem.columnEnd(5);
        Text.create('5');
        Text.fontSize(16);
        Text.backgroundColor(0xDBD0C0);
        Text.width('100%');
        Text.height('100%');
        Text.textAlign(TextAlign.Center);
        Text.pop();
        GridItem.pop();
        Grid.pop();
        Column.pop();
    }
}
