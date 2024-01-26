interface ToastPage_Params {
    message?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ToastPage_" + ++__generate__Id;
}
import promptAction from '@ohos.promptAction';
class ToastPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ToastPage_Params) {
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
            promptAction.showToast({
                message: "我是弹窗",
                bottom: 500,
                duration: 50
            });
        });
        Text.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new ToastPage("1", undefined, {}));
