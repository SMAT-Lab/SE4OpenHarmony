interface MyImageAnimator_Params {
    state?: AnimationStatus;
    reverse?: boolean;
    iterations?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyImageAnimator_" + ++__generate__Id;
}
export class MyImageAnimator extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__state = new ObservedPropertySimple(AnimationStatus.Initial, this, "state");
        this.__reverse = new ObservedPropertySimple(false, this, "reverse");
        this.__iterations = new ObservedPropertySimple(1, this, "iterations");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyImageAnimator_Params) {
        if (params.state !== undefined) {
            this.state = params.state;
        }
        if (params.reverse !== undefined) {
            this.reverse = params.reverse;
        }
        if (params.iterations !== undefined) {
            this.iterations = params.iterations;
        }
    }
    aboutToBeDeleted() {
        this.__state.aboutToBeDeleted();
        this.__reverse.aboutToBeDeleted();
        this.__iterations.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __state: ObservedPropertySimple<AnimationStatus>;
    get state() {
        return this.__state.get();
    }
    set state(newValue: AnimationStatus) {
        this.__state.set(newValue);
    }
    private __reverse: ObservedPropertySimple<boolean>;
    get reverse() {
        return this.__reverse.get();
    }
    set reverse(newValue: boolean) {
        this.__reverse.set(newValue);
    }
    private __iterations: ObservedPropertySimple<number>;
    get iterations() {
        return this.__iterations.get();
    }
    set iterations(newValue: number) {
        this.__iterations.set(newValue);
    }
    render() {
        Column.create({ space: 10 });
        Column.width('100%');
        Column.height('100%');
        ImageAnimator.create();
        ImageAnimator.images([
            {
                src: $r('app.media.img'),
                duration: 500,
                width: 170,
                height: 120,
                top: 0,
                left: 0
            },
            {
                src: $r('app.media.img2'),
                duration: 500,
                width: 170,
                height: 120,
                top: 0,
                left: 170
            },
            {
                src: $r('app.media.img3'),
                duration: 500,
                width: 170,
                height: 120,
                top: 120,
                left: 170
            },
            {
                src: $r('app.media.img4'),
                duration: 500,
                width: 170,
                height: 120,
                top: 120,
                left: 0
            }
        ]);
        ImageAnimator.state(this.state);
        ImageAnimator.reverse(this.reverse);
        ImageAnimator.fixedSize(false);
        ImageAnimator.preDecode(2);
        ImageAnimator.fillMode(FillMode.None);
        ImageAnimator.iterations(this.iterations);
        ImageAnimator.width(340);
        ImageAnimator.height(240);
        ImageAnimator.margin({ top: 100 });
        ImageAnimator.onStart(() => {
            console.info('Start');
        });
        ImageAnimator.onPause(() => {
            console.info('Pause');
        });
        ImageAnimator.onRepeat(() => {
            console.info('Repeat');
        });
        ImageAnimator.onCancel(() => {
            console.info('Cancel');
        });
        ImageAnimator.onFinish(() => {
            console.info('Finish');
        });
        Row.create();
        Button.createWithLabel('start');
        Button.width(100);
        Button.padding(5);
        Button.onClick(() => {
            this.state = AnimationStatus.Running;
        });
        Button.margin(5);
        Button.pop();
        Button.createWithLabel('pause');
        Button.width(100);
        Button.padding(5);
        Button.onClick(() => {
            this.state = AnimationStatus.Paused; // 显示当前帧图片
        });
        Button.margin(5);
        Button.pop();
        Button.createWithLabel('stop');
        Button.width(100);
        Button.padding(5);
        Button.onClick(() => {
            this.state = AnimationStatus.Stopped; // 显示动画的起始帧图片
        });
        Button.margin(5);
        Button.pop();
        Row.pop();
        Row.create();
        Button.createWithLabel('reverse');
        Button.width(100);
        Button.padding(5);
        Button.onClick(() => {
            this.reverse = !this.reverse;
        });
        Button.margin(5);
        Button.pop();
        Button.createWithLabel('once');
        Button.width(100);
        Button.padding(5);
        Button.onClick(() => {
            this.iterations = 1;
        });
        Button.margin(5);
        Button.pop();
        Button.createWithLabel('infinite');
        Button.width(100);
        Button.padding(5);
        Button.onClick(() => {
            this.iterations = -1; // 无限循环播放
        });
        Button.margin(5);
        Button.pop();
        Row.pop();
        Column.pop();
    }
}
