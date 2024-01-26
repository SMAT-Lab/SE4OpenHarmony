interface BackPage_Params {
    message?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "backPage_" + ++__generate__Id;
}
class BackPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: BackPage_Params) {
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
        Row.backgroundImage($r("app.media.icon"), ImageRepeat.NoRepeat);
        Column.create();
        Column.width('100%');
        Text.create(this.message);
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new BackPage("1", undefined, {}));
