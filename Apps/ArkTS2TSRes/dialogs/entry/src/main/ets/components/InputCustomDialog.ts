interface InputCustomDialog_Params {
    text?: string;
    controller?: CustomDialogController;
    onButtonClick?: (value: string) => void;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "InputCustomDialog_" + ++__generate__Id;
}
export class InputCustomDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.text = "";
        this.controller = undefined;
        this.onButtonClick = (value: string) => { };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: InputCustomDialog_Params) {
        if (params.text !== undefined) {
            this.text = params.text;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.onButtonClick !== undefined) {
            this.onButtonClick = params.onButtonClick;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private text: string;
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private onButtonClick: (value: string) => void;
    render() {
        Column.create();
        Column.width('100%');
        Column.backgroundColor("#fff");
        Column.create();
        Column.width('100%');
        Column.height(48);
        Column.backgroundColor('#eee');
        Column.justifyContent(FlexAlign.Center);
        Text.create("带有输入框并贴着输入法的弹窗");
        Text.fontSize(18);
        Text.fontColor('#333');
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Column.pop();
        Column.create();
        Column.width('100%');
        Column.margin({ top: 15, left: 20, right: 20 });
        TextArea.create({ placeholder: "请输入" });
        TextArea.backgroundColor("#fff");
        TextArea.onChange((value: string) => {
            this.text = value;
        });
        Column.pop();
        Column.create();
        Column.width('100%');
        Column.margin({ top: 10, bottom: 10 });
        Button.createWithLabel("发表评论");
        Button.width(150);
        Button.onClick(() => {
            console.log("text: " + this.text);
            this.onButtonClick(this.text);
            this.controller.close();
        });
        Button.pop();
        Column.pop();
        Column.pop();
    }
}
