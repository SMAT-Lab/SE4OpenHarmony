interface ApplyTranslateKey_Params {
    webviewController?: webview.WebviewController;
    url?: string;
    title?: string;
    loadProgress?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ApplyTranslateKey_" + ++__generate__Id;
}
import webview from '@ohos.web.webview';
import router from '@ohos.router';
class ApplyTranslateKey extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.webviewController = new webview.WebviewController();
        this.__url = new ObservedPropertySimple('', this, "url");
        this.__title = new ObservedPropertySimple('', this, "title");
        this.__loadProgress = new ObservedPropertySimple(0, this, "loadProgress");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ApplyTranslateKey_Params) {
        if (params.webviewController !== undefined) {
            this.webviewController = params.webviewController;
        }
        if (params.url !== undefined) {
            this.url = params.url;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.loadProgress !== undefined) {
            this.loadProgress = params.loadProgress;
        }
    }
    aboutToBeDeleted() {
        this.__url.aboutToBeDeleted();
        this.__title.aboutToBeDeleted();
        this.__loadProgress.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private webviewController: webview.WebviewController;
    private __url: ObservedPropertySimple<string>;
    get url() {
        return this.__url.get();
    }
    set url(newValue: string) {
        this.__url.set(newValue);
    }
    private __title: ObservedPropertySimple<string>;
    get title() {
        return this.__title.get();
    }
    set title(newValue: string) {
        this.__title.set(newValue);
    }
    private __loadProgress: ObservedPropertySimple<number>;
    get loadProgress() {
        return this.__loadProgress.get();
    }
    set loadProgress(newValue: number) {
        this.__loadProgress.set(newValue);
    }
    aboutToAppear() {
        this.url = router.getParams()['url'];
        console.error('aboutToAppear 获取url--> ' + router.getParams()['url']);
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.padding({ top: 48 });
        Row.create();
        Row.alignItems(VerticalAlign.Center);
        Image.create($r('app.media.left_arrow'));
        Image.width(24);
        Image.height(24);
        Image.onClick(() => {
            router.back();
        });
        Image.margin(15);
        Text.create(this.title);
        Text.textAlign(TextAlign.Center);
        Text.fontSize(24);
        Text.layoutWeight(1);
        Text.pop();
        Row.pop();
        If.create();
        if (this.loadProgress < 100) {
            If.branchId(0);
            Progress.create({ value: this.loadProgress, total: 100, type: ProgressType.Linear });
            Progress.width('100%');
        }
        If.pop();
        Web.create({ src: this.url, controller: this.webviewController });
        Web.domStorageAccess(true);
        Web.mixedMode(MixedMode.All);
        Web.onTitleReceive((event) => {
            this.title = event.title;
        });
        Web.onProgressChange((event) => {
            this.loadProgress = event.newProgress;
        });
        Web.width('100%');
        Web.height('100%');
        Column.pop();
    }
}
loadDocument(new ApplyTranslateKey("1", undefined, {}));
