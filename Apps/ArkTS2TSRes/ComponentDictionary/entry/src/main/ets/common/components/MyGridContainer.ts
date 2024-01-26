interface MyGridContainer_Params {
    sizeType?: SizeType;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyGridContainer_" + ++__generate__Id;
}
export class MyGridContainer extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__sizeType = new ObservedPropertySimple(SizeType.XS, this, "sizeType");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyGridContainer_Params) {
        if (params.sizeType !== undefined) {
            this.sizeType = params.sizeType;
        }
    }
    aboutToBeDeleted() {
        this.__sizeType.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __sizeType: ObservedPropertySimple<SizeType>;
    get sizeType() {
        return this.__sizeType.get();
    }
    set sizeType(newValue: SizeType) {
        this.__sizeType.set(newValue);
    }
    render() {
        Column.create({ space: 5 });
        Column.width('100%');
        Column.margin({ top: 5 });
        GridContainer.create({ columns: 12, sizeType: this.sizeType, gutter: 10, margin: 20 });
        GridContainer.width('90%');
        Row.create();
        Text.create('1');
        Text.useSizeType({
            xs: { span: 6, offset: 0 },
            sm: { span: 2, offset: 0 },
            md: { span: 2, offset: 0 },
            lg: { span: 2, offset: 0 }
        });
        Text.height(50);
        Text.backgroundColor(0x4682B4);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Text.create('2');
        Text.useSizeType({
            xs: { span: 2, offset: 6 },
            sm: { span: 6, offset: 2 },
            md: { span: 2, offset: 2 },
            lg: { span: 2, offset: 2 }
        });
        Text.height(50);
        Text.backgroundColor(0x00BFFF);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Text.create('3');
        Text.useSizeType({
            xs: { span: 2, offset: 8 },
            sm: { span: 2, offset: 8 },
            md: { span: 6, offset: 4 },
            lg: { span: 2, offset: 4 }
        });
        Text.height(50);
        Text.backgroundColor(0x4682B4);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Text.create('4');
        Text.useSizeType({
            xs: { span: 2, offset: 10 },
            sm: { span: 2, offset: 10 },
            md: { span: 2, offset: 10 },
            lg: { span: 6, offset: 6 }
        });
        Text.height(50);
        Text.backgroundColor(0x00BFFF);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Row.pop();
        GridContainer.pop();
        Text.create('Click Simulate to change the device width');
        Text.fontSize(9);
        Text.width('90%');
        Text.fontColor(0xCCCCCC);
        Text.pop();
        Row.create();
        Button.createWithLabel('XS');
        Button.onClick(() => {
            this.sizeType = SizeType.XS;
        });
        Button.backgroundColor(0x317aff);
        Button.pop();
        Button.createWithLabel('SM');
        Button.onClick(() => {
            this.sizeType = SizeType.SM;
        });
        Button.backgroundColor(0x317aff);
        Button.pop();
        Button.createWithLabel('MD');
        Button.onClick(() => {
            this.sizeType = SizeType.MD;
        });
        Button.backgroundColor(0x317aff);
        Button.pop();
        Button.createWithLabel('LG');
        Button.onClick(() => {
            this.sizeType = SizeType.LG;
        });
        Button.backgroundColor(0x317aff);
        Button.pop();
        Row.pop();
        Column.pop();
    }
}
