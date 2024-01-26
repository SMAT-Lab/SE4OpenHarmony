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
            style: ProgressStyle.Ring //环形
            // style:ProgressStyle.Linear  //线型
            // style:ProgressStyle.Eclipse   //圆形
            // style:ProgressStyle.ScaleRing   //环形（粗）
            // style:ProgressStyle.Capsule    //胶囊形（为什么和圆形一样？）
        });
        Column.pop();
        Row.pop();
    }
}
loadDocument(new ProgressPage("1", undefined, {}));
