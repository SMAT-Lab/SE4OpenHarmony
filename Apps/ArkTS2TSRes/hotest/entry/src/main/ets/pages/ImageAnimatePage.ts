interface ImageAnimatePage_Params {
    state?: AnimationStatus;
    reverse?: boolean;
    iterations?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ImageAnimatePage_" + ++__generate__Id;
}
class ImageAnimatePage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__state = new ObservedPropertySimple(AnimationStatus.Initial, this, "state");
        this.__reverse = new ObservedPropertySimple(false, this, "reverse");
        this.__iterations = new ObservedPropertySimple(1, this, "iterations");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ImageAnimatePage_Params) {
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
        Column.padding(10);
        ImageAnimator.create();
        ImageAnimator.images([
            {
                src: $r("app.media.bg1"),
                duration: 500,
                width: 325,
                height: 600,
                top: 0,
                left: 0
            },
            {
                src: $r("app.media.bg2"),
                duration: 200,
                width: 325,
                height: 600,
                top: 0,
                left: 0
            },
            {
                src: $r("app.media.bg2"),
                duration: 200,
                width: 325,
                height: 600,
                top: 0,
                left: 0
            },
            {
                src: $r("app.media.bg4"),
                duration: 200,
                width: 325,
                height: 600,
                top: 0,
                left: 0
            },
            {
                src: $r("app.media.bg5"),
                duration: 200,
                width: 325,
                height: 600,
                top: 0,
                left: 0
            }
        ]);
        ImageAnimator.state(this.state);
        ImageAnimator.reverse(this.reverse);
        ImageAnimator.fixedSize(false);
        ImageAnimator.fillMode(FillMode.None);
        ImageAnimator.iterations(this.iterations);
        ImageAnimator.width("86%");
        ImageAnimator.height("50%");
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
        Row.create({ space: 5 });
        Button.createWithLabel('start');
        Button.width(100);
        Button.padding(5);
        Button.onClick(() => {
            this.state = AnimationStatus.Running;
        });
        Button.pop();
        Button.createWithLabel('pause');
        Button.width(100);
        Button.padding(5);
        Button.onClick(() => {
            this.state = AnimationStatus.Paused;
        });
        Button.pop();
        Button.createWithLabel('stop');
        Button.width(100);
        Button.padding(5);
        Button.onClick(() => {
            this.state = AnimationStatus.Stopped;
        });
        Button.pop();
        Row.pop();
        Row.create({ space: 5 });
        Button.createWithLabel('reverse');
        Button.width(100);
        Button.padding(5);
        Button.onClick(() => {
            this.reverse = !this.reverse;
        });
        Button.pop();
        Button.createWithLabel('once');
        Button.width(100);
        Button.padding(5);
        Button.onClick(() => {
            this.iterations = 1;
        });
        Button.pop();
        Button.createWithLabel('infinite');
        Button.width(100);
        Button.padding(5);
        Button.onClick(() => {
            this.iterations = -1;
        });
        Button.pop();
        Row.pop();
        Column.pop();
    }
}
loadDocument(new ImageAnimatePage("1", undefined, {}));
