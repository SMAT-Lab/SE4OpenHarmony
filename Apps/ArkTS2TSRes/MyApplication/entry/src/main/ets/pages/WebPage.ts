interface WebPage_Params {
    message?: string;
    controller?: WebviewController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "WebPage_" + ++__generate__Id;
}
import web_controller from "@ohos.web.webview";
class WebPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.controller = new web_controller.WebviewController;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: WebPage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
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
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Web.create({ src: "https://www.openharmony.cn/mainPlay", controller: this.controller });
        Column.pop();
        Row.pop();
    }
}
loadDocument(new WebPage("1", undefined, {}));
