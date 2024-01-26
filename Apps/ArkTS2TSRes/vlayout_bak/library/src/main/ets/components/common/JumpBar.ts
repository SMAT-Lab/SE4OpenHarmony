interface JumpBar_Params {
    jumpBarColor?: ResourceColor;
    jumpBarAspectRatio?: number;
    fontSize?: number | string | Resource;
    textShow?: boolean;
    scroller?: Scroller[];
    textFirst?: number;
    textExisting?: number;
    textCreated?: number;
    textCount?: number;
    textOffset?: number;
    textInput?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "JumpBar_" + ++__generate__Id;
}
export class JumpBar extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.jumpBarColor = 0x33000000;
        this.jumpBarAspectRatio = 4;
        this.fontSize = 17;
        this.textShow = true;
        this.__scroller = new SynchedPropertyObjectTwoWay(params.scroller, this, "scroller");
        this.__textFirst = new SynchedPropertySimpleTwoWay(params.textFirst, this, "textFirst");
        this.__textExisting = new SynchedPropertySimpleTwoWay(params.textExisting, this, "textExisting");
        this.__textCreated = new SynchedPropertySimpleTwoWay(params.textCreated, this, "textCreated");
        this.__textCount = new SynchedPropertySimpleTwoWay(params.textCount, this, "textCount");
        this.__textOffset = new SynchedPropertySimpleTwoWay(params.textOffset, this, "textOffset");
        this.__textInput = new SynchedPropertySimpleTwoWay(params.textInput, this, "textInput");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: JumpBar_Params) {
        if (params.jumpBarColor !== undefined) {
            this.jumpBarColor = params.jumpBarColor;
        }
        if (params.jumpBarAspectRatio !== undefined) {
            this.jumpBarAspectRatio = params.jumpBarAspectRatio;
        }
        if (params.fontSize !== undefined) {
            this.fontSize = params.fontSize;
        }
        if (params.textShow !== undefined) {
            this.textShow = params.textShow;
        }
    }
    aboutToBeDeleted() {
        this.__scroller.aboutToBeDeleted();
        this.__textFirst.aboutToBeDeleted();
        this.__textExisting.aboutToBeDeleted();
        this.__textCreated.aboutToBeDeleted();
        this.__textCount.aboutToBeDeleted();
        this.__textOffset.aboutToBeDeleted();
        this.__textInput.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private jumpBarColor: ResourceColor;
    private jumpBarAspectRatio: number;
    private fontSize: number | string | Resource;
    private textShow: boolean;
    private __scroller: SynchedPropertySimpleOneWay<Scroller[]>;
    get scroller() {
        return this.__scroller.get();
    }
    set scroller(newValue: Scroller[]) {
        this.__scroller.set(newValue);
    }
    private __textFirst: SynchedPropertySimpleTwoWay<number>;
    get textFirst() {
        return this.__textFirst.get();
    }
    set textFirst(newValue: number) {
        this.__textFirst.set(newValue);
    }
    private __textExisting: SynchedPropertySimpleTwoWay<number>;
    get textExisting() {
        return this.__textExisting.get();
    }
    set textExisting(newValue: number) {
        this.__textExisting.set(newValue);
    }
    private __textCreated: SynchedPropertySimpleTwoWay<number>;
    get textCreated() {
        return this.__textCreated.get();
    }
    set textCreated(newValue: number) {
        this.__textCreated.set(newValue);
    }
    private __textCount: SynchedPropertySimpleTwoWay<number>;
    get textCount() {
        return this.__textCount.get();
    }
    set textCount(newValue: number) {
        this.__textCount.set(newValue);
    }
    private __textOffset: SynchedPropertySimpleTwoWay<number>;
    get textOffset() {
        return this.__textOffset.get();
    }
    set textOffset(newValue: number) {
        this.__textOffset.set(newValue);
    }
    private __textInput: SynchedPropertySimpleTwoWay<number>;
    get textInput() {
        return this.__textInput.get();
    }
    set textInput(newValue: number) {
        this.__textInput.set(newValue);
    }
    render() {
        Column.create();
        Column.aspectRatio(this.jumpBarAspectRatio);
        Column.backgroundColor(this.jumpBarColor);
        Column.zIndex(10);
        Row.create();
        Row.layoutWeight(1);
        If.create();
        if (this.textShow) {
            If.branchId(0);
            Text.create(`First: ${this.textFirst}`);
            Text.layoutWeight(1);
            Text.fontSize(this.fontSize);
            Text.fontColor('#FFFFFF');
            Text.maxLines(1);
            Text.textAlign(TextAlign.Center);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.pop();
            Text.create(`Existing: ${this.textExisting} Created: ${this.textCreated}`);
            Text.layoutWeight(1);
            Text.fontSize(this.fontSize);
            Text.fontColor('#FFFFFF');
            Text.maxLines(2);
            Text.textAlign(TextAlign.Center);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.pop();
            Text.create(`Count: ${this.textCount}`);
            Text.layoutWeight(1);
            Text.fontSize(this.fontSize);
            Text.fontColor('#FFFFFF');
            Text.maxLines(1);
            Text.textAlign(TextAlign.Center);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.pop();
        }
        else {
            If.branchId(1);
            Blank.create();
            Blank.pop();
        }
        If.pop();
        Row.pop();
        Row.create();
        Row.layoutWeight(1.5);
        Text.create('Jump Position');
        Text.width('30%');
        Text.height('100%');
        Text.fontSize(this.fontSize);
        Text.maxLines(1);
        Text.textAlign(TextAlign.Center);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.pop();
        Column.create();
        Column.width('20%');
        Column.height('85%');
        TextInput.create({ placeholder: '请输入...', text: String(this.textInput) });
        TextInput.width('100%');
        TextInput.height('100%');
        TextInput.type(InputType.Number);
        TextInput.placeholderColor(0x000000);
        TextInput.placeholderFont({ size: this.fontSize });
        TextInput.enterKeyType(EnterKeyType.Go);
        TextInput.caretColor(0x000000);
        TextInput.onChange((value: string) => {
            if (Number(value) < 0) {
                console.error('error set');
            }
            else {
                this.textInput = Number(value);
            }
        });
        Divider.create();
        Divider.borderWidth(1);
        Divider.color('#000000');
        Column.pop();
        Button.createWithChild({ type: ButtonType.Normal, stateEffect: true });
        Button.width('20%');
        Button.height('85%');
        Button.backgroundColor('#D6D7D7');
        Button.onClick((event: ClickEvent) => {
            this.scroller[0].scrollToIndex(this.textInput / 4);
        });
        Text.create('JUMP');
        Text.fontSize(this.fontSize);
        Text.fontColor('#000000');
        Text.maxLines(1);
        Text.textAlign(TextAlign.Center);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.pop();
        Button.pop();
        If.create();
        if (this.textShow) {
            If.branchId(0);
            Text.create(`Total Offset: ${this.textOffset}`);
            Text.width('30%');
            Text.height('100%');
            Text.fontSize(this.fontSize);
            Text.fontColor('#FFFFFF');
            Text.maxLines(2);
            Text.textAlign(TextAlign.Center);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.pop();
        }
        else {
            If.branchId(1);
            Row.create();
            Row.width('30%');
            Row.height('85%');
            Row.pop();
        }
        If.pop();
        Row.pop();
        Column.pop();
    }
}
