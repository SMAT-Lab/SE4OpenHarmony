interface AttrAnimationPage_Params {
    widthSize?: number;
    heightSize?: number;
    rotateAngle?: number;
    flag?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "AttrAnimationPage_" + ++__generate__Id;
}
class AttrAnimationPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__widthSize = new ObservedPropertySimple(250, this, "widthSize");
        this.__heightSize = new ObservedPropertySimple(100, this, "heightSize");
        this.__rotateAngle = new ObservedPropertySimple(0, this, "rotateAngle");
        this.__flag = new ObservedPropertySimple(true, this, "flag");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AttrAnimationPage_Params) {
        if (params.widthSize !== undefined) {
            this.widthSize = params.widthSize;
        }
        if (params.heightSize !== undefined) {
            this.heightSize = params.heightSize;
        }
        if (params.rotateAngle !== undefined) {
            this.rotateAngle = params.rotateAngle;
        }
        if (params.flag !== undefined) {
            this.flag = params.flag;
        }
    }
    aboutToBeDeleted() {
        this.__widthSize.aboutToBeDeleted();
        this.__heightSize.aboutToBeDeleted();
        this.__rotateAngle.aboutToBeDeleted();
        this.__flag.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __widthSize: ObservedPropertySimple<number>;
    get widthSize() {
        return this.__widthSize.get();
    }
    set widthSize(newValue: number) {
        this.__widthSize.set(newValue);
    }
    private __heightSize: ObservedPropertySimple<number>;
    get heightSize() {
        return this.__heightSize.get();
    }
    set heightSize(newValue: number) {
        this.__heightSize.set(newValue);
    }
    private __rotateAngle: ObservedPropertySimple<number>;
    get rotateAngle() {
        return this.__rotateAngle.get();
    }
    set rotateAngle(newValue: number) {
        this.__rotateAngle.set(newValue);
    }
    private __flag: ObservedPropertySimple<boolean>;
    get flag() {
        return this.__flag.get();
    }
    set flag(newValue: boolean) {
        this.__flag.set(newValue);
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.margin({ top: 20 });
        Button.createWithLabel('change size');
        Context.animation({
            //设置动画时长。
            duration: 2000,
            //设置动画曲线。默认曲线为线性。
            curve: Curve.EaseOut,
            iterations: 3,
            playMode: PlayMode.Normal,
            tempo: 30,
            delay: 10, //设置动画延迟执行的时长。单位为毫秒，默认不延时播放。
        });
        Button.onClick(() => {
            if (this.flag) {
                this.widthSize = 150;
                this.heightSize = 60;
            }
            else {
                this.widthSize = 250;
                this.heightSize = 100;
            }
            this.flag = !this.flag;
        });
        Button.margin(30);
        Button.width(this.widthSize);
        Button.height(this.heightSize);
        Context.animation(null);
        Button.pop();
        Button.createWithLabel('change rotate angle');
        Context.animation({
            duration: 1200,
            curve: Curve.Friction,
            delay: 500,
            iterations: -1,
            playMode: PlayMode.Alternate
        });
        Button.onClick(() => {
            this.rotateAngle = 90;
        });
        Button.margin(50);
        Button.rotate({ angle: this.rotateAngle });
        Context.animation(null);
        Button.pop();
        Column.pop();
    }
}
loadDocument(new AttrAnimationPage("1", undefined, {}));
