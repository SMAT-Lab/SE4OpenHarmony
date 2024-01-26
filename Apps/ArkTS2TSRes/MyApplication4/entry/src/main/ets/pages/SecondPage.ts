interface SecondPage_Params {
    message?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SecondPage_" + ++__generate__Id;
}
import router from '@ohos.router';
class SecondPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SecondPage_Params) {
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
        Text.onClick(() => {
            router.back();
        });
        Text.fontColor($r("sys.color.ohos_toggle_bg_transparent"));
        Text.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new SecondPage("1", undefined, {}));
