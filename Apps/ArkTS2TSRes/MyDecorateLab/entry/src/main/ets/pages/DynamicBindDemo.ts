interface DialogDemo_Params {
    controller?: CustomDialogController;
}
interface DynamicBindDemo_Params {
    // 调用自定义弹窗
    dialogController?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "DynamicBindDemo_" + ++__generate__Id;
}
class DynamicBindDemo extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new DialogDemo("2", this, {});
                jsDialog.setController(this.
                // 调用自定义弹窗
                dialogController);
                View.create(jsDialog);
            },
            autoCancel: true
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: DynamicBindDemo_Params) {
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    // 调用自定义弹窗
    private dialogController: CustomDialogController;
    render() {
        Column.create({ space: 20 });
        Column.height('100%');
        Column.width('100%');
        Column.backgroundColor(0x1e90ff);
        Text.create('@Extend~~~~');
        __Text__TextDem(20);
        Text.pop();
        Divider.create();
        Divider.vertical(false);
        Divider.strokeWidth(5);
        Divider.color(0xf5f5f5);
        Divider.lineCap(LineCapStyle.Round);
        Button.createWithLabel('@Styles~~~~');
        ViewStackProcessor.visualState("normal");
        Button.backgroundColor(0xff69b4);
        Button.height(95);
        Button.width(95);
        ViewStackProcessor.visualState("pressed");
        Button.width(120);
        Button.height(120);
        Button.backgroundColor(0x00bfff);
        ViewStackProcessor.visualState();
        Button.pop();
        Divider.create();
        Divider.vertical(false);
        Divider.strokeWidth(5);
        Divider.color(0xf5f5f5);
        Divider.lineCap(LineCapStyle.Round);
        Button.createWithLabel('@CustomDialog~~~~');
        Button.backgroundColor(0xff69b4);
        Button.width(300);
        Button.borderRadius(8);
        Button.onClick(() => {
            //   弹出弹窗
            this.dialogController.open();
        });
        Button.pop();
        Divider.create();
        Divider.vertical(false);
        Divider.strokeWidth(5);
        Divider.color(0xf5f5f5);
        Divider.lineCap(LineCapStyle.Round);
        // 调用builder函数
        this.buildText('Builder~~~~~', this);
        Divider.create();
        Divider.vertical(false);
        Divider.strokeWidth(5);
        Divider.color(0xf5f5f5);
        Divider.lineCap(LineCapStyle.Round);
        Row.create({ space: 20 });
        Navigator.create({ target: "pages/WatchBind", type: NavigationType.Back });
        Button.createWithLabel('Back');
        Button.backgroundColor(0x7fffd4);
        Button.borderRadius(4);
        Button.width(120);
        Button.fontSize(20);
        Button.pop();
        Navigator.pop();
        Navigator.create({ target: "pages/Index", type: NavigationType.Push });
        Button.createWithLabel('First');
        Button.backgroundColor(0x7fffd4);
        Button.borderRadius(4);
        Button.width(120);
        Button.fontSize(20);
        Button.pop();
        Navigator.pop();
        Row.pop();
        Column.pop();
    }
    //   使用@Builder装饰函数，快速生成布局内容，且此函数在build组件外声明
    buildText(label: string, parent = null) {
        Text.create(label);
        Text.fontSize(25);
        Text.fontWeight(700);
        Text.fontColor(0xff69b4);
        Text.pop();
    }
}
// Extend只能定义在组件外
function __Text__TextDem(fontSize: number): void {
    Text.fontColor(0xffffff);
    Text.fontWeight(700);
    Text.fontStyle(FontStyle.Italic);
    Text.fontSize(fontSize);
    Text.margin({ top: 10 });
}
class DialogDemo extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: DialogDemo_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    render() {
        Button.createWithLabel('CustomDialog close~~~~');
        Button.onClick(() => {
            this.controller.close();
        });
        Button.pop();
    }
}
loadDocument(new DynamicBindDemo("1", undefined, {}));
