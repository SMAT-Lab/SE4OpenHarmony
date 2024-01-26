interface WindowPage_Params {
    status?: string;
    subWindowID?;
    subWindow?: window.Window;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "WindowPage_" + ++__generate__Id;
}
import window from '@ohos.window';
import router from '@ohos.router';
class WindowPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__status = new ObservedPropertySimple("", this, "status");
        this.subWindowID = "subWindowID";
        this.subWindow = null;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: WindowPage_Params) {
        if (params.status !== undefined) {
            this.status = params.status;
        }
        if (params.subWindowID !== undefined) {
            this.subWindowID = params.subWindowID;
        }
        if (params.subWindow !== undefined) {
            this.subWindow = params.subWindow;
        }
    }
    aboutToBeDeleted() {
        this.__status.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __status: ObservedPropertySimple<string>;
    get status() {
        return this.__status.get();
    }
    set status(newValue: string) {
        this.__status.set(newValue);
    }
    private subWindowID;
    private subWindow: window.Window;
    render() {
        Column.create({ space: 10 });
        Column.width('100%');
        Column.height("100%");
        Column.backgroundColor(Color.White);
        Column.padding(10);
        Button.createWithLabel("创建子窗口");
        Button.onClick(() => {
            this.createSubWindow();
        });
        Button.pop();
        Button.createWithLabel("加载内容");
        Button.onClick(() => {
            this.loadContent("pages/sub_window");
        });
        Button.pop();
        Button.createWithLabel("显示子窗口");
        Button.onClick(() => {
            this.showSubWindow();
        });
        Button.pop();
        Button.createWithLabel("销毁子窗口");
        Button.onClick(() => {
            this.destroySubWindow();
        });
        Button.pop();
        Button.createWithLabel("打开第二页");
        Button.onClick(() => {
            router.pushUrl({
                url: "pages/second" // second 页面读者请自行添加
            });
        });
        Button.pop();
        Text.create(this.status);
        Text.fontSize(24);
        Text.pop();
        Column.pop();
    }
    private destroySubWindow() {
        if (this.subWindow) {
            this.subWindow.destroy().then(() => {
                this.status = "destroy subWindow success";
                this.subWindow = null;
            }).catch((error) => {
                this.status = "destroy subWindow failure: " + JSON.stringify(error);
            });
        }
        else {
            this.status = "subWindow already destroyed";
        }
    }
    private showSubWindow() {
        if (this.subWindow) {
            this.subWindow.show().then(() => {
                this.status = "show subWindow success";
            }).catch((error) => {
                this.status = "show subWindow failure: " + JSON.stringify(error);
            });
        }
        else {
            this.status = "subWindow not created";
        }
    }
    private loadContent(path: string) {
        if (this.subWindow) {
            this.subWindow.loadContent(path).then(() => {
                this.status = "load content success";
            }).catch((error) => {
                this.status = "load content failure: " + JSON.stringify(error);
            });
        }
        else {
            this.status = "subWindow not created";
        }
    }
    private createSubWindow() {
        window.create(this.subWindowID, window.WindowType.TYPE_APP).then((subWindow) => {
            if (subWindow) {
                this.subWindow = subWindow;
                this.subWindow.setFocusable(false);
                this.subWindow.setDimBehind(0.4);
                this.subWindow.resetSize(750, 480);
                this.subWindow.moveTo(230, 1200);
                this.subWindow.setBackgroundColor(Color.Red.toString());
                this.subWindow.setOutsideTouchable(false);
                this.subWindow.setTouchable(false);
                this.status = "create subWindow success";
            }
            else {
                this.status = "create subWindow failure: " + JSON.stringify(subWindow);
            }
        }).catch((error) => {
            this.status = "create subWindow failure: " + JSON.stringify(error);
        });
    }
}
loadDocument(new WindowPage("1", undefined, {}));
