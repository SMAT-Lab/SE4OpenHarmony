interface TipsDialog_Params {
    title?: string;
    text?: string;
    controller?: CustomDialogController;
    // 若尝试在CustomDialog中传入多个其他的Controller，以实现在CustomDialog中打开另一个或另一些CustomDialog，那么此处需要将指向自己的controller放在最后
    cancel?: () => void;
    confirm?: () => void;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TipsDialog_" + ++__generate__Id;
}
export class TipsDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.title = undefined;
        this.text = undefined;
        this.controller = undefined;
        this.cancel = undefined;
        this.confirm = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TipsDialog_Params) {
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.text !== undefined) {
            this.text = params.text;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.cancel !== undefined) {
            this.cancel = params.cancel;
        }
        if (params.confirm !== undefined) {
            this.confirm = params.confirm;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private title: string;
    private text: string;
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    // 若尝试在CustomDialog中传入多个其他的Controller，以实现在CustomDialog中打开另一个或另一些CustomDialog，那么此处需要将指向自己的controller放在最后
    private cancel: () => void;
    private confirm: () => void;
    render() {
        Column.create();
        Text.create(this.title);
        Text.fontSize(20);
        Text.margin({ top: 10, bottom: 10 });
        Text.pop();
        Text.create(this.text);
        Text.fontSize(16);
        Text.margin({ bottom: 10 });
        Text.pop();
        Column.pop();
    }
}
