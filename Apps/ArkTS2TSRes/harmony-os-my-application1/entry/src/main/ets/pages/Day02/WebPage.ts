interface WebPage_Params {
    controller?: web_webview.WebviewController;
    webUrl?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "WebPage_" + ++__generate__Id;
}
// xxx.ets
import web_webview from '@ohos.web.webview';
import router from '@ohos.router';
class WebPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = new web_webview.WebviewController();
        this.webUrl = router.getParams()["url"];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: WebPage_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.webUrl !== undefined) {
            this.webUrl = params.webUrl;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private controller: web_webview.WebviewController;
    private webUrl;
    render() {
        Column.create();
        Flex.create();
        Image.create($r("app.media.back"));
        Image.onClick(() => {
            router.back();
        });
        Image.height(30);
        Flex.pop();
        Web.create({ src: this.webUrl, controller: this.controller });
        Web.layoutWeight(1);
        Column.pop();
    }
}
loadDocument(new WebPage("1", undefined, {}));
