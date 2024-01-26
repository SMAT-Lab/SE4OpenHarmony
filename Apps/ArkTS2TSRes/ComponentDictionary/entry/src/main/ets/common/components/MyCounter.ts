interface MyCounter_Params {
    value?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyCounter_" + ++__generate__Id;
}
export class MyCounter extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__value = new ObservedPropertySimple(0, this, "value");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyCounter_Params) {
        if (params.value !== undefined) {
            this.value = params.value;
        }
    }
    aboutToBeDeleted() {
        this.__value.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __value: ObservedPropertySimple<number>;
    get value() {
        return this.__value.get();
    }
    set value(newValue: number) {
        this.__value.set(newValue);
    }
    render() {
        Column.create();
        Column.width("100%");
        Counter.create();
        Counter.margin(100);
        Counter.onInc(() => {
            this.value++;
        });
        Counter.onDec(() => {
            this.value--;
        });
        Text.create(this.value.toString());
        Text.pop();
        Counter.pop();
        Column.pop();
    }
}
