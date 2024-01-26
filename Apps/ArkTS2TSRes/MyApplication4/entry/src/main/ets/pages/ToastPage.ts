interface ToastPage_Params {
    message?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ToastPage_" + ++__generate__Id;
}
import promptAction from '@ohos.promptAction';
import data from '@ohos.telephony.data';
import hilog from '@ohos.hilog';
class ToastPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('弹窗', this, "message");
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
                message: "我是toast",
                bottom: 400,
                duration: 600
            });
        });
        Text.pop();
        Button.createWithLabel("弹窗");
        Button.onClick(() => {
            promptAction.showDialog({
                title: "我是弹窗",
                buttons: [
                    {
                        text: "文本1",
                        color: $r("app.color.start_window_background")
                    },
                    {
                        text: "文本2",
                        color: $r("app.color.start_window_background")
                    },
                    {
                        text: "文本3",
                        color: $r("app.color.start_window_background")
                    }
                ]
            }).then(data => {
                hilog.info(123, "tag", data.index.toString());
                if (data.index == 0) {
                    console.info("我是" + data.index);
                }
            });
        });
        Button.pop();
        Button.createWithLabel("按钮");
        Button.onClick(() => {
            promptAction.showActionMenu({
                title: "12",
                buttons: [
                    {
                        text: "文本1",
                        color: $r("app.color.start_window_background")
                    },
                    {
                        text: "文本2",
                        color: $r("app.color.start_window_background")
                    },
                    {
                        text: "文本3",
                        color: $r("app.color.start_window_background")
                    }
                ]
            }).then(data => {
                if (data.index == 1) {
                    promptAction.showToast({
                        message: "我是index执行的逻辑",
                        bottom: 400,
                        duration: 7000
                    });
                }
                else {
                    promptAction.showToast({
                        message: "我其它执行的逻辑",
                        bottom: 400,
                        duration: 7000
                    });
                }
            });
        });
        Button.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new ToastPage("1", undefined, {}));
