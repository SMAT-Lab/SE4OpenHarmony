interface SurfingPage_Params {
    message?: string;
    controller?: WebviewController;
    controller2?: WebviewController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SurfingPage_" + ++__generate__Id;
}
import web_v from '@ohos.web.webview';
export class SurfingPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('想好吃什么了吗', this, "message");
        this.controller = new web_v.WebviewController();
        this.controller2 = new web_v.WebviewController();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SurfingPage_Params) {
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
        Text.fontSize(35);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Web.create({
            src: "https://www.meishichina.com/",
            controller: this.controller
        });
        Web.height("100%");
        Column.pop();
        Row.pop();
    }
}
loadDocument(new SurfingPage("1", undefined, {}));
