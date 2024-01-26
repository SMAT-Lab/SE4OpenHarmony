interface AnimationToPage_Params {
    widthSize?: number;
    heightSize?: number;
    rotateAngle?: number;
    flag?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "AnimationToPage_" + ++__generate__Id;
}
import promptAction from '@ohos.promptAction';
class AnimationToPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__widthSize = new ObservedPropertySimple(250, this, "widthSize");
        this.__heightSize = new ObservedPropertySimple(100, this, "heightSize");
        this.__rotateAngle = new ObservedPropertySimple(0, this, "rotateAngle");
        this.flag = true;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AnimationToPage_Params) {
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
    private flag: boolean;
    render() {
        Column.create();
        Column.width('100%');
        Column.margin({ top: 5 });
        Button.createWithLabel('change size');
        Button.width(this.widthSize);
        Button.height(this.heightSize);
        Button.margin(30);
        Button.onClick(() => {
            if (this.flag) {
                Context.animateTo({
                    duration: 2000,
                    curve: Curve.EaseOut,
                    iterations: 3,
                    playMode: PlayMode.Normal,
                    onFinish: () => {
                        promptAction.showToast({ message: "加载完成" });
                    }
                }, 
                //指定显示动效的闭包函数，在闭包函数中导致的状态变化系统会自动插入过渡动画。
                () => {
                    this.widthSize = 150;
                    this.heightSize = 60;
                });
            }
            else {
                Context.animateTo({}, () => {
                    this.widthSize = 250;
                    this.heightSize = 100;
                });
            }
            this.flag = !this.flag;
        });
        Button.pop();
        Button.createWithLabel('change rotate angle');
        Button.margin(50);
        Button.rotate({ x: 0, y: 0, z: 1, angle: this.rotateAngle });
        Button.onClick(() => {
            Context.animateTo({
                duration: 1200,
                curve: Curve.Friction,
                delay: 500,
                iterations: -1,
                playMode: PlayMode.Alternate,
                onFinish: () => {
                    console.info('play end');
                }
            }, () => {
                this.rotateAngle = 90;
            });
        });
        Button.pop();
        Column.pop();
    }
}
loadDocument(new AnimationToPage("1", undefined, {}));
