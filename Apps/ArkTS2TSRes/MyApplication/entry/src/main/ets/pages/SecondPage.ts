interface SecondPage_Params {
    message?: string;
    value?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SecondPage_" + ++__generate__Id;
}
import router from '@ohos.router';
class SecondPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple(' 第二个页面', this, "message");
        this.value = router.getParams()["value"];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SecondPage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.value !== undefined) {
            this.value = params.value;
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
    private value: string;
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
        Text.pop();
        Text.create(this.value);
        Text.fontSize(50);
        Text.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new SecondPage("1", undefined, {}));
