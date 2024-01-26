interface CustomBatteryDialog_Params {
    title?: string;
    message?: string;
    backColor?: Color;
    yesEvent?: () => void;
    noEvent?: () => void;
    controller?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "dialog_" + ++__generate__Id;
}
export class CustomBatteryDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__title = new ObservedPropertySimple('', this, "title");
        this.__message = new ObservedPropertySimple('', this, "message");
        this.__backColor = new SynchedPropertySimpleTwoWay(params.backColor, this, "backColor");
        this.yesEvent = undefined;
        this.noEvent = undefined;
        this.controller = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CustomBatteryDialog_Params) {
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.yesEvent !== undefined) {
            this.yesEvent = params.yesEvent;
        }
        if (params.noEvent !== undefined) {
            this.noEvent = params.noEvent;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    aboutToBeDeleted() {
        this.__title.aboutToBeDeleted();
        this.__message.aboutToBeDeleted();
        this.__backColor.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __title: ObservedPropertySimple<string>;
    get title() {
        return this.__title.get();
    }
    set title(newValue: string) {
        this.__title.set(newValue);
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __backColor: SynchedPropertySimpleTwoWay<Color>;
    get backColor() {
        return this.__backColor.get();
    }
    set backColor(newValue: Color) {
        this.__backColor.set(newValue);
    }
    private yesEvent: () => void;
    private noEvent: () => void;
    private controller: CustomDialogController; // 定义controller
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    render() {
        Stack.create();
        Stack.padding({ left: 40, right: 40 });
        Stack.width("100%");
        Column.create();
        Column.backgroundColor("#e6ffffff");
        Column.borderRadius(20);
        Text.create(this.title);
        Text.fontSize(20);
        Text.margin({ top: 15 });
        Text.pop();
        Text.create(this.message);
        Text.fontSize(16);
        Text.margin({ top: 3 });
        Text.pop();
        Text.create();
        Text.size({ width: "100%", height: "2px" });
        Text.backgroundColor("#bebbc1");
        Text.margin({ top: 15 });
        Text.pop();
        Row.create();
        Row.height(45);
        Row.width('100%');
        Text.create("不合格");
        Text.height("100%");
        Text.layoutWeight(1);
        Text.textAlign(TextAlign.Center);
        Text.fontSize(18);
        Text.fontColor("#317ef5");
        Text.onClick(() => {
            this.backColor = Color.Red;
            this.controller.close(); // 关闭弹窗
            if (this.noEvent) {
                this.noEvent();
            }
        });
        Text.pop();
        Text.create();
        Text.size({ width: "2px", height: "100%" });
        Text.backgroundColor("#bebbc1");
        Text.pop();
        Text.create("合格");
        Text.textAlign(TextAlign.Center);
        Text.fontSize(18);
        Text.fontColor("#317ef5");
        Text.height("100%");
        Text.layoutWeight(1);
        Text.onClick(() => {
            this.backColor = Color.Green;
            this.controller.close(); // 关闭弹窗
            if (this.yesEvent) {
                this.yesEvent();
            }
        });
        Text.pop();
        Row.pop();
        Column.pop();
        Stack.pop();
    }
}
