interface PurchaseHistoryPage_Params {
    message?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "PurchaseHistoryPage_" + ++__generate__Id;
}
import router from '@ohos.router';
class PurchaseHistoryPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: PurchaseHistoryPage_Params) {
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
        Row.create();
        Row.justifyContent(FlexAlign.Start);
        Row.width("80%");
        Row.alignItems(VerticalAlign.Top);
        Image.create($r("app.media.back"));
        Image.margin({ top: 20 });
        Image.width(20);
        Image.onClick(() => {
            router.pushUrl({
                url: "pages/MePage",
            });
        });
        Row.pop();
        Row.create();
        Row.alignItems(VerticalAlign.Top);
        Row.justifyContent(FlexAlign.Start);
        Text.create("我的购买记录");
        Text.fontSize(45);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({ top: 20, bottom: 250 });
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Row.pop();
        Text.create("还没有购买记录~");
        Text.fontSize(25);
        Text.fontColor(Color.Pink);
        Text.margin({ bottom: 250 });
        Text.pop();
        Button.createWithLabel("恢复购买记录");
        Button.margin({ top: 50 });
        Button.type(ButtonType.Normal);
        Button.fontSize(35);
        Button.backgroundColor(Color.Pink);
        Button.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new PurchaseHistoryPage("1", undefined, {}));
