interface DialogExample_Params {
    controller?: CustomDialogController;
    action?: () => void;
}
interface DynamicStyleBuild_Params {
    //   调用customDialog组件
    dialogController?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "DynamicStyleBuild_" + ++__generate__Id;
}
class DynamicStyleBuild extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new DialogExample("2", this, { action: this.onAccept });
                jsDialog.setController(this.
                //   调用customDialog组件
                dialogController);
                View.create(jsDialog);
            },
            // cancel:this.existApp(),//点击遮障层退出时的回调
            autoCancel: true //是否允许点击遮障层退出
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: DynamicStyleBuild_Params) {
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    //   调用customDialog组件
    private dialogController: CustomDialogController;
    onAccept() {
        console.info('OnAccept');
    }
    existApp() {
        console.info('Cancel dialog');
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor(0x1e90ff);
        //   调用组件内定义的Style
        Button.createWithLabel('@Styles类型');
        ViewStackProcessor.visualState("normal");
        //   调用组件内定义的Style
        Button.backgroundColor(0xff69b4);
        //   调用组件内定义的Style
        Button.width('95');
        //   调用组件内定义的Style
        Button.height('95');
        ViewStackProcessor.visualState("pressed");
        //   调用组件内定义的Style
        Button.width(120);
        //   调用组件内定义的Style
        Button.height(120);
        //   调用组件内定义的Style
        Button.backgroundColor(0x00bfff);
        ViewStackProcessor.visualState();
        //   调用组件内定义的Style
        Button.pop();
        Button.createWithLabel('@Dialog');
        Button.onClick(() => {
            this.dialogController.open();
        });
        Button.pop();
        Column.pop();
    }
}
class DialogExample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = undefined;
        this.action = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: DialogExample_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.action !== undefined) {
            this.action = params.action;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private action: () => void;
    render() {
        Column.create();
        Button.createWithLabel('CustomDialog Close');
        Button.onClick(() => {
            this.controller.close();
            this.action();
        });
        Button.pop();
        Column.pop();
    }
}
loadDocument(new DynamicStyleBuild("1", undefined, {}));
