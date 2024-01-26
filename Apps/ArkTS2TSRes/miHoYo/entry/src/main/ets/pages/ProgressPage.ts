interface ProgressPage_Params {
    message?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ProgressPage_" + ++__generate__Id;
}
class ProgressPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ProgressPage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Text.create(this.message);
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Progress.create({
            value: 40,
            total: 50,
            style: ProgressStyle.Ring
        });
        Progress.create({
            value: 40,
            total: 50,
            style: ProgressStyle.Linear
        });
        Progress.create({
            value: 40,
            total: 50,
            style: ProgressStyle.Eclipse
        });
        Progress.create({
            value: 40,
            total: 50,
            style: ProgressStyle.Capsule
        });
        Column.pop();
        Row.pop();
    }
}
loadDocument(new ProgressPage("1", undefined, {}));
