interface CircleProgress_Params {
    progressCurrentValue?: number //进度条的当前值
    ;
    progressTotalValue?: number;
    progressWidth?: number;
    progressColor?: string | Color;
    progressStrokeWidth?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CirCleProgress_" + ++__generate__Id;
}
export class CircleProgress extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__progressCurrentValue = new SynchedPropertySimpleTwoWay(params.progressCurrentValue, this, "progressCurrentValue");
        this.progressTotalValue = 100 //进度条总共值
        ;
        this.progressWidth = 120 //进度条组件的宽度
        ;
        this.progressColor = "#ffdd2121" //进度条颜色
        ;
        this.progressStrokeWidth = 10 //进度条的环形宽度
        ;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CircleProgress_Params) {
        if (params.progressTotalValue !== undefined) {
            this.progressTotalValue = params.progressTotalValue;
        }
        if (params.progressWidth !== undefined) {
            this.progressWidth = params.progressWidth;
        }
        if (params.progressColor !== undefined) {
            this.progressColor = params.progressColor;
        }
        if (params.progressStrokeWidth !== undefined) {
            this.progressStrokeWidth = params.progressStrokeWidth;
        }
    }
    aboutToBeDeleted() {
        this.__progressCurrentValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __progressCurrentValue: SynchedPropertySimpleTwoWay<number>; //进度条的当前值
    get progressCurrentValue() {
        return this.__progressCurrentValue.get();
    }
    set progressCurrentValue(newValue: number //进度条的当前值
    ) {
        this.__progressCurrentValue.set(newValue);
    }
    private progressTotalValue: number; //进度条总共值
    private progressWidth: number; //进度条组件的宽度
    private progressColor: string | Color; //进度条颜色
    private progressStrokeWidth: number; //进度条的环形宽度
    render() {
        Stack.create();
        Column.create();
        Progress.create({
            value: this.progressCurrentValue,
            total: this.progressTotalValue,
            type: ProgressType.Ring
        });
        Progress.value(this.progressCurrentValue);
        Progress.width(this.progressWidth);
        Progress.color(this.progressColor);
        Progress.style({
            strokeWidth: this.progressStrokeWidth
        });
        Column.pop();
        Text.create(((this.progressCurrentValue / this.progressTotalValue * 100).toFixed()) + "%");
        Text.fontSize(16 * this.progressWidth / 120);
        Text.pop();
        Stack.pop();
    }
}
