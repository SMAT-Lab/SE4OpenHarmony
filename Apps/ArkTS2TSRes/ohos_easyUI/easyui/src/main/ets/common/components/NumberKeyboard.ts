interface NumberKeyboard_custom_Params {
    result?: string;
    isPop?: boolean;
    Number?: String[];
}
interface NumberKeyboard_default_Params {
    result?: string;
    isPop?: boolean;
    Number?: String[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "NumberKeyboard_" + ++__generate__Id;
}
export class NumberKeyboard_default extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__result = new SynchedPropertySimpleTwoWay(params.result, this, "result");
        this.__isPop = new SynchedPropertySimpleTwoWay(params.isPop, this, "isPop");
        this.Number = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '删除'];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: NumberKeyboard_default_Params) {
        if (params.Number !== undefined) {
            this.Number = params.Number;
        }
    }
    aboutToBeDeleted() {
        this.__result.aboutToBeDeleted();
        this.__isPop.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __result: SynchedPropertySimpleTwoWay<string>;
    get result() {
        return this.__result.get();
    }
    set result(newValue: string) {
        this.__result.set(newValue);
    }
    private __isPop: SynchedPropertySimpleTwoWay<boolean>;
    get isPop() {
        return this.__isPop.get();
    }
    set isPop(newValue: boolean) {
        this.__isPop.set(newValue);
    }
    private Number: String[];
    render() {
        Column.create();
        Context.animation({
            duration: 250
        });
        Column.height(this.isPop == true ? 330 : 0);
        Context.animation(null);
        Column.create();
        Column.width("100%");
        Column.backgroundColor("#ffffffff");
        Column.height(30);
        Column.borderWidth(0.2);
        Column.borderColor("#fff1f1f1");
        Button.createWithLabel("完成");
        Button.fontColor("#ff0081ff");
        Button.type(ButtonType.Normal);
        Button.backgroundColor("#ffffffff");
        Button.alignSelf(ItemAlign.End);
        Button.onClick(() => {
            this.isPop = false;
        });
        Button.pop();
        Column.pop();
        Grid.create();
        Grid.columnsTemplate('1fr 1fr 1fr');
        Grid.rowsTemplate('1fr 1fr 1fr 1fr');
        Grid.width('100%');
        Grid.backgroundColor("#ffffffff");
        Grid.height(300);
        ForEach.create("2", this, ObservedObject.GetRawObject(this.Number), (element: string) => {
            If.create();
            if (element != '.' && element != '删除') {
                If.branchId(0);
                GridItem.create();
                Button.createWithChild();
                Button.borderWidth(0.5);
                Button.borderColor("#ffececec");
                Button.type(ButtonType.Normal);
                Button.backgroundColor("#ffffffff");
                Button.onClick(() => {
                    console.log("Input:", element);
                    this.result = element;
                });
                Text.create(element);
                Text.fontSize(20);
                Text.fontWeight(FontWeight.Bold);
                Text.width('100%');
                Text.height('100%');
                Text.textAlign(TextAlign.Center);
                Text.pop();
                Button.pop();
                GridItem.pop();
            }
            else {
                If.branchId(1);
                GridItem.create();
                Button.createWithChild();
                Button.borderWidth(0.5);
                Button.borderColor("#ffececec");
                Button.type(ButtonType.Normal);
                Button.backgroundColor("#ffd9d9d9");
                Button.onClick(() => {
                    if (element == "删除") {
                        this.result = "delete";
                    }
                    else {
                        this.result = element;
                    }
                });
                Text.create(element);
                Text.fontSize(20);
                Text.fontWeight(FontWeight.Bold);
                Text.width('100%');
                Text.height('100%');
                Text.textAlign(TextAlign.Center);
                Text.pop();
                Button.pop();
                GridItem.pop();
            }
            If.pop();
        }, element => element);
        ForEach.pop();
        Grid.pop();
        Column.pop();
    }
}
export class NumberKeyboard_custom extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__result = new SynchedPropertySimpleTwoWay(params.result, this, "result");
        this.__isPop = new SynchedPropertySimpleTwoWay(params.isPop, this, "isPop");
        this.Number = ['1', '2', '3', '删除', '4', '5', '6', '7', '8', '9', '完成', '0', '.'];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: NumberKeyboard_custom_Params) {
        if (params.Number !== undefined) {
            this.Number = params.Number;
        }
    }
    aboutToBeDeleted() {
        this.__result.aboutToBeDeleted();
        this.__isPop.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __result: SynchedPropertySimpleTwoWay<string>;
    get result() {
        return this.__result.get();
    }
    set result(newValue: string) {
        this.__result.set(newValue);
    }
    private __isPop: SynchedPropertySimpleTwoWay<boolean>;
    get isPop() {
        return this.__isPop.get();
    }
    set isPop(newValue: boolean) {
        this.__isPop.set(newValue);
    }
    private Number: String[];
    render() {
        Column.create();
        Context.animation({
            duration: 250
        });
        Column.height(this.isPop == true ? 300 : 0);
        Context.animation(null);
        Grid.create();
        Grid.columnsTemplate('1fr 1fr 1fr 1fr');
        Grid.rowsTemplate('1fr 1fr 1fr 1fr');
        Grid.width('100%');
        Grid.backgroundColor("#ffffffff");
        ForEach.create("3", this, ObservedObject.GetRawObject(this.Number), (element: string) => {
            If.create();
            if (element == '删除') {
                If.branchId(0);
                GridItem.create();
                GridItem.rowStart(1);
                GridItem.rowEnd(2);
                Button.createWithChild();
                Button.borderWidth(0.5);
                Button.borderColor("#ffececec");
                Button.type(ButtonType.Normal);
                Button.backgroundColor("#ffd9d9d9");
                Button.onClick(() => {
                    this.result = "delete";
                });
                Text.create(element);
                Text.fontSize(20);
                Text.fontWeight(FontWeight.Bold);
                Text.width('100%');
                Text.height('100%');
                Text.textAlign(TextAlign.Center);
                Text.pop();
                Button.pop();
                GridItem.pop();
            }
            else if (element == '完成') {
                If.branchId(1);
                GridItem.create();
                GridItem.rowStart(3);
                GridItem.rowEnd(4);
                Button.createWithChild();
                Button.borderWidth(0.5);
                Button.borderColor("#ffececec");
                Button.type(ButtonType.Normal);
                Button.backgroundColor("#ff0a7ef1");
                Button.onClick(() => {
                    this.isPop = false;
                });
                Text.create(element);
                Text.fontSize(20);
                Text.fontWeight(FontWeight.Bold);
                Text.width('100%');
                Text.height('100%');
                Text.textAlign(TextAlign.Center);
                Text.pop();
                Button.pop();
                GridItem.pop();
            }
            else if (element == '0') {
                If.branchId(2);
                GridItem.create();
                GridItem.columnStart(1);
                GridItem.columnEnd(2);
                Button.createWithChild();
                Button.borderWidth(0.5);
                Button.borderColor("#ffececec");
                Button.type(ButtonType.Normal);
                Button.backgroundColor("#ffffffff");
                Button.onClick(() => {
                    this.result = element;
                });
                Text.create(element);
                Text.fontSize(20);
                Text.fontWeight(FontWeight.Bold);
                Text.width('100%');
                Text.height('100%');
                Text.textAlign(TextAlign.Center);
                Text.pop();
                Button.pop();
                GridItem.pop();
            }
            else {
                If.branchId(3);
                GridItem.create();
                Button.createWithChild();
                Button.borderWidth(0.5);
                Button.borderColor("#ffececec");
                Button.type(ButtonType.Normal);
                Button.backgroundColor("#ffffffff");
                Button.onClick(() => {
                    this.result = element;
                });
                Text.create(element);
                Text.fontSize(20);
                Text.fontWeight(FontWeight.Bold);
                Text.width('100%');
                Text.height('100%');
                Text.textAlign(TextAlign.Center);
                Text.pop();
                Button.pop();
                GridItem.pop();
            }
            If.pop();
        }, element => element);
        ForEach.pop();
        Grid.pop();
        Column.pop();
    }
}
