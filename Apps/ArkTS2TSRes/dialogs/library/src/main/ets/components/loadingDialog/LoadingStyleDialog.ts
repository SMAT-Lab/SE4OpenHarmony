interface LoadingStyleDialog_Params {
    showLoadingDialog?: boolean;
    closeLoadingDialog?: boolean;
    dialogBackGroundColor?: number | string;
    dialogToastMessage?: string;
    mDialogController?: CustomDialogController;
}
interface LoadingComponent_Params {
    controller?: CustomDialogController;
    componentBackGround?: number | string;
    loadTextMessage?: string;
    canvasCtx?: CanvasRenderingContext2D;
    lineCount?: number;
    time?: number;
    intervalTime?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "LoadingStyleDialog_" + ++__generate__Id;
}
class LoadingComponent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = undefined;
        this.__componentBackGround = new SynchedPropertySimpleTwoWay(params.componentBackGround, this, "componentBackGround");
        this.__loadTextMessage = new SynchedPropertySimpleTwoWay(params.loadTextMessage, this, "loadTextMessage");
        this.canvasCtx = new CanvasRenderingContext2D({ antialias: true });
        this.lineCount = 10;
        this.time = 0;
        this.intervalTime = 0;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: LoadingComponent_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.canvasCtx !== undefined) {
            this.canvasCtx = params.canvasCtx;
        }
        if (params.lineCount !== undefined) {
            this.lineCount = params.lineCount;
        }
        if (params.time !== undefined) {
            this.time = params.time;
        }
        if (params.intervalTime !== undefined) {
            this.intervalTime = params.intervalTime;
        }
    }
    aboutToBeDeleted() {
        this.__componentBackGround.aboutToBeDeleted();
        this.__loadTextMessage.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private __componentBackGround: SynchedPropertySimpleTwoWay<number | string>;
    get componentBackGround() {
        return this.__componentBackGround.get();
    }
    set componentBackGround(newValue: number | string) {
        this.__componentBackGround.set(newValue);
    }
    private __loadTextMessage: SynchedPropertySimpleTwoWay<string>;
    get loadTextMessage() {
        return this.__loadTextMessage.get();
    }
    set loadTextMessage(newValue: string) {
        this.__loadTextMessage.set(newValue);
    }
    private canvasCtx: CanvasRenderingContext2D;
    private lineCount: number;
    private time: number;
    private intervalTime: number;
    render() {
        Stack.create();
        Stack.margin({ left: 30, right: 30 });
        Stack.borderRadius(10);
        Stack.backgroundColor(this.componentBackGround);
        Column.create();
        Column.margin({ left: 30, right: 30, top: 30, bottom: 30 });
        Canvas.create(this.canvasCtx);
        Canvas.width(60);
        Canvas.height(60);
        Canvas.onReady(() => {
            let canvasWidth = this.canvasCtx.width;
            let canvasHeight = this.canvasCtx.height;
            let radius = canvasWidth / 2;
            let radiusOffset = radius / 2;
            let centerX = canvasWidth / 2;
            let centerY = canvasHeight / 2;
            let stokeWidth = vp2px(2);
            this.canvasCtx.lineWidth = stokeWidth;
            let lineLength = radius / 3;
            let startX = centerX + radiusOffset;
            let endX = startX + lineLength;
            let minCircleR = startX - centerX;
            let maxCircleR = endX - centerX;
            this.intervalTime = setInterval(() => {
                this.time++;
                for (let i = this.lineCount - 1; i >= 0; i--) {
                    let firstX = centerX + minCircleR * Math.cos(2 * Math.PI / this.lineCount * i);
                    let firstY = centerY + minCircleR * Math.sin(2 * Math.PI / this.lineCount * i);
                    let secondX = centerX + maxCircleR * Math.cos(2 * Math.PI / this.lineCount * i);
                    let secondY = centerY + maxCircleR * Math.sin(2 * Math.PI / this.lineCount * i);
                    let temp = Math.abs(i + this.time) % this.lineCount;
                    let fraction = (temp + 1) / this.lineCount;
                    let color = this.evaluate(fraction, this.parseColor("#EEEEEE"), this.parseColor("#111111"));
                    let r = (color >> 16) & 0xff;
                    let g = (color >> 8) & 0xff;
                    let b = color & 0xff;
                    let a = (color >> 24) & 0xff;
                    let paintColor = this.rgbaToHex("rgba(" + r + "," + g + "," + b + "," + a + ")");
                    this.canvasCtx.strokeStyle = paintColor;
                    this.canvasCtx.beginPath();
                    this.canvasCtx.lineCap = 'round';
                    this.canvasCtx.moveTo(firstX, firstY);
                    this.canvasCtx.lineTo(secondX, secondY);
                    this.canvasCtx.stroke();
                }
            }, 80);
        });
        Canvas.pop();
        Text.create(this.loadTextMessage);
        Text.padding({ top: 20, left: 12, right: 12 });
        Text.fontColor("#EEEEEE");
        Text.fontSize(20);
        Text.maxLines(1);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.visibility(this.loadTextMessage ? Visibility.Visible : Visibility.None);
        Text.pop();
        Column.pop();
        Stack.pop();
    }
    aboutToDisappear() {
        if (this.intervalTime) {
            clearInterval(this.intervalTime);
        }
    }
    private evaluate(fraction: number, startValue: number, endValue: number): number {
        let startInt = startValue;
        let startA = (startInt >> 24) & 0xff;
        let startR = (startInt >> 16) & 0xff;
        let startG = (startInt >> 8) & 0xff;
        let startB = startInt & 0xff;
        let endInt = endValue;
        let endA = (endInt >> 24) & 0xff;
        let endR = (endInt >> 16) & 0xff;
        let endG = (endInt >> 8) & 0xff;
        let endB = endInt & 0xff;
        return ((startA + (fraction * (endA - startA))) << 24) |
            ((startR + (fraction * (endR - startR))) << 16) |
            ((startG + (fraction * (endG - startG))) << 8) |
            ((startB + (fraction * (endB - startB))));
    }
    private parseColor(colorString: string): number {
        let color: number = 0;
        if (colorString.charAt(0) == '#') {
            color = Number('0x' + colorString.substring(1));
            if (colorString.length == 7) {
                color |= 0x00000000ff000000;
            }
            else if (colorString.length != 9) {
                throw new Error("Unknown color");
            }
        }
        return color;
    }
    private rgbaToHex(color: string) {
        let values = color.replace(new RegExp('/rgba?\\(', 'g'), '').replace(new RegExp('\\)', 'g'), '').replace(new RegExp('[\\s+]', 'g'), '').split(',');
        let a = Number.parseFloat(values[3] || 1 + ''), r = Math.floor(a * Number.parseInt(values[0]) + (1 - a) * 225), g = Math.floor(a * Number.parseInt(values[1]) + (1 - a) * 225), b = Math.floor(a * Number.parseInt(values[2]) + (1 - a) * 225);
        return "#" + ("0" + r.toString(16)).slice(-2) + ("0" + g.toString(16)).slice(-2) + ("0" + b.toString(16)).slice(-2);
    }
}
export class LoadingStyleDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__showLoadingDialog = new SynchedPropertySimpleTwoWay(params.showLoadingDialog, this, "showLoadingDialog");
        this.__closeLoadingDialog = new SynchedPropertySimpleTwoWay(params.closeLoadingDialog, this, "closeLoadingDialog");
        this.__dialogBackGroundColor = new ObservedPropertySimple(Color.Black, this, "dialogBackGroundColor");
        this.__dialogToastMessage = new SynchedPropertySimpleOneWay(params.dialogToastMessage, this, "dialogToastMessage");
        this.mDialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new LoadingComponent("2", this, {
                    componentBackGround: this.__dialogBackGroundColor,
                    loadTextMessage: this.__dialogToastMessage
                });
                jsDialog.setController(this.mDialogController);
                View.create(jsDialog);
            },
            autoCancel: false,
            alignment: DialogAlignment.Center,
            offset: { dx: 0, dy: 0 },
            customStyle: true,
            maskColor: 0x33000000
        }, this);
        this.updateWithValueParams(params);
        this.declareWatch("showLoadingDialog", this.showLoading);
        this.declareWatch("closeLoadingDialog", this.closeLoading);
    }
    updateWithValueParams(params: LoadingStyleDialog_Params) {
        if (params.dialogBackGroundColor !== undefined) {
            this.dialogBackGroundColor = params.dialogBackGroundColor;
        }
        this.dialogToastMessage = params.dialogToastMessage;
        if (params.mDialogController !== undefined) {
            this.mDialogController = params.mDialogController;
        }
    }
    aboutToBeDeleted() {
        this.__showLoadingDialog.aboutToBeDeleted();
        this.__closeLoadingDialog.aboutToBeDeleted();
        this.__dialogBackGroundColor.aboutToBeDeleted();
        this.__dialogToastMessage.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __showLoadingDialog: SynchedPropertySimpleTwoWay<boolean>;
    get showLoadingDialog() {
        return this.__showLoadingDialog.get();
    }
    set showLoadingDialog(newValue: boolean) {
        this.__showLoadingDialog.set(newValue);
    }
    private __closeLoadingDialog: SynchedPropertySimpleTwoWay<boolean>;
    get closeLoadingDialog() {
        return this.__closeLoadingDialog.get();
    }
    set closeLoadingDialog(newValue: boolean) {
        this.__closeLoadingDialog.set(newValue);
    }
    private __dialogBackGroundColor: ObservedPropertySimple<number | string>;
    get dialogBackGroundColor() {
        return this.__dialogBackGroundColor.get();
    }
    set dialogBackGroundColor(newValue: number | string) {
        this.__dialogBackGroundColor.set(newValue);
    }
    private __dialogToastMessage: SynchedPropertySimpleOneWay<string>;
    get dialogToastMessage() {
        return this.__dialogToastMessage.get();
    }
    set dialogToastMessage(newValue: string) {
        this.__dialogToastMessage.set(newValue);
    }
    private mDialogController: CustomDialogController;
    showLoading() {
        if (this.mDialogController) {
            this.mDialogController.open();
        }
    }
    closeLoading() {
        if (this.mDialogController) {
            this.mDialogController.close();
        }
    }
    render() {
    }
}
