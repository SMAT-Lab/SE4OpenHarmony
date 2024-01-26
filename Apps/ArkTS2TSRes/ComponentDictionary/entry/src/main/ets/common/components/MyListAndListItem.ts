interface MyListAndListItem_Params {
    arr?: number[];
    editFlag?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyListAndListItem_" + ++__generate__Id;
}
export class MyListAndListItem extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.__editFlag = new ObservedPropertySimple(false, this, "editFlag");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyListAndListItem_Params) {
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
        if (params.editFlag !== undefined) {
            this.editFlag = params.editFlag;
        }
    }
    aboutToBeDeleted() {
        this.__editFlag.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private arr: number[];
    private __editFlag: ObservedPropertySimple<boolean>;
    get editFlag() {
        return this.__editFlag.get();
    }
    set editFlag(newValue: boolean) {
        this.__editFlag.set(newValue);
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor(0xDCDCDC);
        Column.padding({ top: 5 });
        List.create({ space: 20, initialIndex: 0 });
        List.editMode(true);
        List.onItemDelete((index: number) => {
            console.info(this.arr[index - 1] + 'Delete');
            this.arr.splice(index - 1, 1);
            this.editFlag = false;
            return true;
        });
        List.width('90%');
        ListItem.create();
        ListItem.sticky(Sticky.Normal);
        Text.create('sticky:Normal , click me edit list');
        Text.width('100%');
        Text.height(40);
        Text.fontSize(12);
        Text.fontColor(0xFFFFFF);
        Text.textAlign(TextAlign.Center);
        Text.backgroundColor(0x696969);
        Text.onClick(() => {
            this.editFlag = !this.editFlag;
        });
        Text.pop();
        ListItem.pop();
        ForEach.create("2", this, ObservedObject.GetRawObject(this.arr), (item) => {
            ListItem.create();
            ListItem.editable(this.editFlag);
            Text.create('' + item);
            Text.width('100%');
            Text.height(100);
            Text.fontSize(16);
            Text.textAlign(TextAlign.Center);
            Text.borderRadius(10);
            Text.backgroundColor(0xFFFFFF);
            Text.pop();
            ListItem.pop();
        }, item => item);
        ForEach.pop();
        List.pop();
        Column.pop();
    }
}
