interface SplashPage_Params {
    secondInfo?: number;
    timerId?;
    intervalId?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SplashPage_" + ++__generate__Id;
}
import router from '@ohos.router';
class SplashPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__secondInfo = new ObservedPropertySimple(3, this, "secondInfo");
        this.timerId = undefined;
        this.intervalId = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SplashPage_Params) {
        if (params.secondInfo !== undefined) {
            this.secondInfo = params.secondInfo;
        }
        if (params.timerId !== undefined) {
            this.timerId = params.timerId;
        }
        if (params.intervalId !== undefined) {
            this.intervalId = params.intervalId;
        }
    }
    aboutToBeDeleted() {
        this.__secondInfo.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __secondInfo: ObservedPropertySimple<number>;
    get secondInfo() {
        return this.__secondInfo.get();
    }
    set secondInfo(newValue: number) {
        this.__secondInfo.set(newValue);
    }
    private timerId;
    private intervalId;
    aboutToAppear() {
        this.timerId = setTimeout(() => {
            router.pushUrl({
                url: 'pages/Index'
            });
        }, 3000);
        this.intervalId = setInterval(() => {
            if (this.secondInfo > 0) {
                this.secondInfo--;
            }
            else {
                clearInterval(this.intervalId);
            }
        }, 1000);
    }
    aboutToDisappear() {
        clearTimeout(this.timerId);
    }
    render() {
        Stack.create({ alignContent: Alignment.TopEnd });
        Stack.width('100%');
        Stack.height('100%');
        Image.create($r('app.media.ic_album'));
        Row.create();
        Row.margin({ top: 10, right: 10 });
        Button.createWithChild();
        Button.backgroundColor(Color.Transparent);
        Text.create('跳过 ');
        Text.fontSize(16);
        Text.pop();
        Button.pop();
        Text.create(this.secondInfo + '秒');
        Text.fontSize(16);
        Text.pop();
        Row.pop();
        Stack.pop();
    }
}
loadDocument(new SplashPage("1", undefined, {}));
