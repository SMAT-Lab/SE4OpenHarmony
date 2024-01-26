interface EditBoxDialog_Params {
    showMessage?: string;
    inputMessage?: string;
    onTextChange?: (msg: string) => void;
    accept?: (msg: string) => void;
    controller?: CustomDialogController;
    cancel?: () => void;
    confirm?: () => void;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "EditBoxDialog_" + ++__generate__Id;
}
export class EditBoxDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.showMessage = '';
        this.inputMessage = '';
        this.onTextChange = undefined;
        this.accept = undefined;
        this.controller = undefined;
        this.cancel = undefined;
        this.confirm = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: EditBoxDialog_Params) {
        if (params.showMessage !== undefined) {
            this.showMessage = params.showMessage;
        }
        if (params.inputMessage !== undefined) {
            this.inputMessage = params.inputMessage;
        }
        if (params.onTextChange !== undefined) {
            this.onTextChange = params.onTextChange;
        }
        if (params.accept !== undefined) {
            this.accept = params.accept;
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
    private showMessage: string;
    private inputMessage: string;
    private onTextChange?: (msg: string) => void;
    private accept?: (msg: string) => void;
    private controller?: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private cancel?: () => void;
    private confirm?: () => void;
    render() {
        Column.create();
        Column.width('100%');
        Column.justifyContent(FlexAlign.End);
        Row.create();
        Row.padding({ left: 8, right: 8, top: 8, bottom: 8 });
        Row.backgroundColor(Color.Gray);
        TextInput.create({ text: this.showMessage });
        TextInput.backgroundColor('#ffffff');
        TextInput.layoutWeight(1);
        TextInput.onChange((value) => {
            if (this.onTextChange) {
                this.onTextChange(value);
            }
            this.inputMessage = value;
        });
        TextInput.onSubmit((value) => {
            if (this.accept) {
                this.accept(this.inputMessage);
            }
            this.controller?.close();
        });
        Blank.create(8);
        Blank.width(16);
        Blank.pop();
        Button.createWithLabel('完成');
        Button.onClick(() => {
            if (this.accept) {
                this.accept(this.inputMessage);
            }
            this.controller?.close();
        });
        Button.pop();
        Row.pop();
        Column.pop();
    }
}
