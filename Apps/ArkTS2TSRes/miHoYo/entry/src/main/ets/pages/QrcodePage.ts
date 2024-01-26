interface QrcodePage_Params {
    message?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "QrcodePage_" + ++__generate__Id;
}
class QrcodePage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple("北京师范大学人工智能学院", this, "message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: QrcodePage_Params) {
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
    aboutToAppear() {
        // this.message=""
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
        QRCode.create(this.message);
        QRCode.width("80%");
        QRCode.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new QrcodePage("1", undefined, {}));
