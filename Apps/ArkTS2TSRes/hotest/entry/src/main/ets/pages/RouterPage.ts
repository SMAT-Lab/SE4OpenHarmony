interface RouterPage_Params {
    value?: string;
    message?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "RouterPage_" + ++__generate__Id;
}
import router from '@ohos.router';
class RouterPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.value = router.getParams()['value'];
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: RouterPage_Params) {
        if (params.value !== undefined) {
            this.value = params.value;
        }
        if (params.message !== undefined) {
            this.message = params.message;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private value: string;
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
        Text.pop();
        Text.create(this.value);
        Text.fontSize(50);
        Text.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new RouterPage("1", undefined, {}));
