interface Objects_Params {
    con?: Array<Array<string>>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "objects_" + ++__generate__Id;
}
export class Objects extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__con = new SynchedPropertyObjectTwoWay(params.con, this, "con");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Objects_Params) {
    }
    aboutToBeDeleted() {
        this.__con.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __con: SynchedPropertySimpleOneWay<Array<Array<string>>>;
    get con() {
        return this.__con.get();
    }
    set con(newValue: Array<Array<string>>) {
        this.__con.set(newValue);
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        ForEach.create("2", this, ObservedObject.GetRawObject(this.con), (item: Array<string>, index) => {
            If.create();
            if (index != undefined) {
                If.branchId(0);
                Row.create();
                Row.margin({ top: 5, bottom: 5 });
                TextInput.create({ placeholder: "请输入key", text: this.con[index][0] });
                TextInput.onChange((e) => {
                    this.con[index][0] = e;
                });
                TextInput.width("35%");
                TextInput.create({ placeholder: "请输入value", text: this.con[index][1] });
                TextInput.onChange((e) => {
                    this.con[index][1] = e;
                });
                TextInput.width("35%");
                Row.pop();
            }
            If.pop();
        });
        ForEach.pop();
        Column.pop();
    }
}
