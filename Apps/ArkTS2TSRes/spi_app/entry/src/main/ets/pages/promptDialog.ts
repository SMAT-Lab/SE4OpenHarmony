interface PromptDialog_Params {
    controller?: CustomDialogController;
    content?: string;
    title?: string;
    //点击yes后的事件处理
    confirm?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "promptDialog_" + ++__generate__Id;
}
export default class PromptDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = undefined;
        this.content = "";
        this.title = "";
        this.confirm = () => { };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: PromptDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.content !== undefined) {
            this.content = params.content;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.confirm !== undefined) {
            this.confirm = params.confirm;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private controller: CustomDialogController; // 定义controller
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private content: string;
    private title: string;
    //点击yes后的事件处理
    private confirm;
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
        Text.create(this.content);
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
        Text.create("返回");
        Text.height("100%");
        Text.layoutWeight(1);
        Text.textAlign(TextAlign.Center);
        Text.fontSize(18);
        Text.fontColor("#317ef5");
        Text.onClick(() => {
            this.controller.close(); // 关闭弹窗
        });
        Text.pop();
        Text.create();
        Text.size({ width: "2px", height: "100%" });
        Text.backgroundColor("#bebbc1");
        Text.pop();
        Text.create("继续");
        Text.textAlign(TextAlign.Center);
        Text.fontSize(18);
        Text.fontColor("#317ef5");
        Text.height("100%");
        Text.layoutWeight(1);
        Text.onClick(() => {
            this.controller.close(); // 关闭弹窗
            this.confirm(); //确认事件处理
        });
        Text.pop();
        Row.pop();
        Column.pop();
        Stack.pop();
    }
}
