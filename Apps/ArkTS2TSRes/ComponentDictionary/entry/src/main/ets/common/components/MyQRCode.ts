interface MyQRCode_Params {
    value?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyQRCode_" + ++__generate__Id;
}
export class MyQRCode extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.value = 'hello world';
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyQRCode_Params) {
        if (params.value !== undefined) {
            this.value = params.value;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private value: string;
    render() {
        Column.create({ space: 5 });
        Column.width('100%');
        Column.margin({ top: 5 });
        Text.create('normal');
        Text.fontSize(9);
        Text.width('90%');
        Text.fontColor(0xCCCCCC);
        Text.fontSize(30);
        Text.pop();
        QRCode.create(this.value);
        QRCode.width(200);
        QRCode.height(200);
        QRCode.pop();
        // 设置二维码颜色
        Text.create('color');
        // 设置二维码颜色
        Text.fontSize(9);
        // 设置二维码颜色
        Text.width('90%');
        // 设置二维码颜色
        Text.fontColor(0xCCCCCC);
        // 设置二维码颜色
        Text.fontSize(30);
        // 设置二维码颜色
        Text.pop();
        QRCode.create(this.value);
        QRCode.color(0xF7CE00);
        QRCode.width(200);
        QRCode.height(200);
        QRCode.pop();
        // 设置二维码背景色
        Text.create('backgroundColor');
        // 设置二维码背景色
        Text.fontSize(9);
        // 设置二维码背景色
        Text.width('90%');
        // 设置二维码背景色
        Text.fontColor(0xCCCCCC);
        // 设置二维码背景色
        Text.fontSize(30);
        // 设置二维码背景色
        Text.pop();
        QRCode.create(this.value);
        QRCode.width(200);
        QRCode.height(200);
        QRCode.backgroundColor(Color.Orange);
        QRCode.pop();
        Column.pop();
    }
}
