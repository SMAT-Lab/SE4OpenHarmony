interface WebPage_Params {
    message?: string;
    controller?: WebviewController;
    controller2?: WebviewController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "WebPage_" + ++__generate__Id;
}
import webview from '@ohos.web.webview';
class WebPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.controller = new webview.WebviewController();
        this.controller2 = new webview.WebviewController();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: WebPage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.controller2 !== undefined) {
            this.controller2 = params.controller2;
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
    private controller: WebviewController;
    private controller2: WebviewController;
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Text.create(this.message);
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Web.create({
            src: "https://www.openharmony.cn/mainPlay",
            controller: this.controller
        });
        Web.height("40%");
        Web.create({
            src: { "id": 0, "type": 30000, params: ["index.html"] },
            controller: this.controller2
        });
        Web.height("40%");
        Column.pop();
        Row.pop();
    }
}
loadDocument(new WebPage("1", undefined, {}));
