interface Index_Params {
    test?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__test = new ObservedPropertySimple('abc', this, "test");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.test !== undefined) {
            this.test = params.test;
        }
    }
    aboutToBeDeleted() {
        this.__test.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __test: ObservedPropertySimple<string>;
    get test() {
        return this.__test.get();
    }
    set test(newValue: string) {
        this.__test.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.height('90%');
        Column.width('100%');
        Text.create('repeat(0):' + this.test.repeat(0));
        Text.width('80%');
        Text.pop();
        Text.create('\nrepeat(2):' + this.test.repeat(2));
        Text.width('80%');
        Text.pop();
        Text.create('\nrepeat(3.1):' + this.test.repeat(3.1));
        Text.width('80%');
        Text.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
