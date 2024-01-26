interface ItemInput_Params {
    title?: string | Resource;
    value?: string;
    typeStr?: string;
    radio?: boolean;
    widthStr?: string;
    widthInput?: string;
    val?: string;
    selectDialog?: () => void;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ItemInput_" + ++__generate__Id;
}
export class ItemInput extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.title = "";
        this.__value = new SynchedPropertySimpleTwoWay(params.value, this, "value");
        this.typeStr = "1" //1:Normal,2:Password,3:Email,4:Number
        ;
        this.radio = false;
        this.widthStr = '30%';
        this.widthInput = '65%';
        this.__val = new SynchedPropertySimpleTwoWay(params.val, this, "val");
        this.selectDialog = () => { };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ItemInput_Params) {
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.typeStr !== undefined) {
            this.typeStr = params.typeStr;
        }
        if (params.radio !== undefined) {
            this.radio = params.radio;
        }
        if (params.widthStr !== undefined) {
            this.widthStr = params.widthStr;
        }
        if (params.widthInput !== undefined) {
            this.widthInput = params.widthInput;
        }
        if (params.selectDialog !== undefined) {
            this.selectDialog = params.selectDialog;
        }
    }
    aboutToBeDeleted() {
        this.__value.aboutToBeDeleted();
        this.__val.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private title: string | Resource;
    private __value: SynchedPropertySimpleTwoWay<string>;
    get value() {
        return this.__value.get();
    }
    set value(newValue: string) {
        this.__value.set(newValue);
    }
    private typeStr: string; //1:Normal,2:Password,3:Email,4:Number
    private radio: boolean;
    private widthStr: string;
    private widthInput: string;
    private __val: SynchedPropertySimpleTwoWay<string>;
    get val() {
        return this.__val.get();
    }
    set val(newValue: string) {
        this.__val.set(newValue);
    }
    private selectDialog: () => void;
    render() {
        Column.create();
        Column.height(55);
        Column.backgroundColor(Color.White);
        Column.width("100%");
        Column.margin({ top: 1 });
        Row.create();
        Row.padding({ left: 15 });
        Row.height(54);
        Row.width('100%');
        Text.create(this.title);
        Text.width(this.widthStr);
        Text.height('100%');
        Text.fontSize(18);
        Text.pop();
        If.create();
        if (!this.radio) {
            If.branchId(0);
            TextInput.create({ text: this.value, placeholder: '请输入' });
            TextInput.type(this.typeStr == "1" ? InputType.Normal : this.typeStr == "2" ? InputType.Password : this.typeStr == "3" ? InputType.Email : InputType.Number);
            TextInput.width(this.widthInput);
            TextInput.fontSize(18);
            TextInput.textAlign(TextAlign.End);
            TextInput.onChange(v => {
                this.value = v;
            });
        }
        else {
            If.branchId(1);
            Text.create(this.val);
            Text.width(this.widthInput);
            Text.fontSize(18);
            Text.textAlign(TextAlign.End);
            Text.onClick(v => {
                this.selectDialog();
            });
            Text.pop();
        }
        If.pop();
        Row.pop();
        Column.pop();
    }
}
