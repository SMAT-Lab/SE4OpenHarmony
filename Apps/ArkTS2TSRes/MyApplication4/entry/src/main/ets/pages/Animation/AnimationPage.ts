interface AnimationPage_Params {
    message?: string;
    txtWidth?: number;
    txtHeight?: number;
    flag?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "AnimationPage_" + ++__generate__Id;
}
class AnimationPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.__txtWidth = new ObservedPropertySimple(300, this, "txtWidth");
        this.__txtHeight = new ObservedPropertySimple(300, this, "txtHeight");
        this.__flag = new ObservedPropertySimple(true, this, "flag");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AnimationPage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.txtWidth !== undefined) {
            this.txtWidth = params.txtWidth;
        }
        if (params.txtHeight !== undefined) {
            this.txtHeight = params.txtHeight;
        }
        if (params.flag !== undefined) {
            this.flag = params.flag;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__txtWidth.aboutToBeDeleted();
        this.__txtHeight.aboutToBeDeleted();
        this.__flag.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __txtWidth: ObservedPropertySimple<number>;
    get txtWidth() {
        return this.__txtWidth.get();
    }
    set txtWidth(newValue: number) {
        this.__txtWidth.set(newValue);
    }
    private __txtHeight: ObservedPropertySimple<number>;
    get txtHeight() {
        return this.__txtHeight.get();
    }
    set txtHeight(newValue: number) {
        this.__txtHeight.set(newValue);
    }
    private __flag: ObservedPropertySimple<boolean>;
    get flag() {
        return this.__flag.get();
    }
    set flag(newValue: boolean) {
        this.__flag.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Text.create(this.message);
        Context.animation(null);
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            this.txtHeight = 100, this.txtWidth = 100;
        });
        Text.width(this.txtWidth);
        Text.height(this.txtHeight);
        Text.backgroundColor(Color.Orange);
        Text.pop();
        Button.createWithLabel("按钮");
        Button.width(this.txtWidth);
        Button.height(this.txtHeight);
        Button.onClick(() => {
            Context.animateTo({
                duration: 1000,
                tempo: 0,
                playMode: PlayMode.AlternateReverse,
                curve: Curve.EaseOut,
                iterations: 5
            }, () => {
                if (this.flag == true) {
                    this.txtHeight = 100,
                        this.txtWidth = 100;
                }
                else {
                    this.txtHeight = 200,
                        this.txtWidth = 200;
                }
                this.flag != this.flag;
            });
        });
        Button.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new AnimationPage("1", undefined, {}));
