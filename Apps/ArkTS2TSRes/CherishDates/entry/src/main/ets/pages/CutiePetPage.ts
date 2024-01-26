interface CutiePetPage_Params {
    message?: string;
    controller?: WebviewController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CutiePetPage_" + ++__generate__Id;
}
import webview from '@ohos.web.webview';
import router from '@ohos.router';
class CutiePetPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.controller = new webview.WebviewController();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CutiePetPage_Params) {
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
        // 顶部白条
        Column.create();
        Row.create({ space: 10 });
        Row.width("100%");
        Row.padding(10);
        Row.backgroundColor(Color.White);
        Row.margin({
            bottom: 0
        });
        Image.create($r("app.media.back"));
        Image.width(30);
        Image.margin(7);
        Image.fillColor(Color.Brown);
        Image.onClick(() => {
            router.pushUrl({
                url: "pages/TabPage"
            });
        });
        Text.create("治愈萌宠");
        Text.fontSize(20);
        Text.margin({
            left: 140
        });
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Row.pop();
        // 顶部白条
        Column.pop();
        Web.create({
            src: "https://www.bing.com/images/search?q=%e5%8f%af%e7%88%b1%e5%b0%8f%e7%8c%ab&form=HDRSC2&first=1",
            controller: this.controller
        });
        Web.height("100%");
        Column.pop();
        Row.pop();
    }
}
loadDocument(new CutiePetPage("1", undefined, {}));
