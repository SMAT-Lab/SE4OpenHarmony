interface MyTextTimer_Params {
    textTimerController?: TextTimerController;
    format?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyTextTimer_" + ++__generate__Id;
}
export class MyTextTimer extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.textTimerController = new TextTimerController();
        this.__format = new ObservedPropertySimple('hh:mm:ss.ms', this, "format");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyTextTimer_Params) {
        if (params.textTimerController !== undefined) {
            this.textTimerController = params.textTimerController;
        }
        if (params.format !== undefined) {
            this.format = params.format;
        }
    }
    aboutToBeDeleted() {
        this.__format.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private textTimerController: TextTimerController;
    private __format: ObservedPropertySimple<string>;
    get format() {
        return this.__format.get();
    }
    set format(newValue: string) {
        this.__format.set(newValue);
    }
    render() {
        Column.create();
        TextTimer.create({ controller: this.textTimerController });
        TextTimer.format(this.format);
        TextTimer.fontColor(Color.Black);
        TextTimer.fontSize(50);
        TextTimer.onTimer((utc: number, elapsedTime: number) => {
            console.info('textTimer notCountDown utc is：' + utc + ', elapsedTime: ' + elapsedTime);
        });
        TextTimer.pop();
        Row.create();
        Button.createWithLabel("start");
        Button.onClick(() => {
            this.textTimerController.start();
        });
        Button.pop();
        Button.createWithLabel("pause");
        Button.onClick(() => {
            this.textTimerController.pause();
        });
        Button.pop();
        Button.createWithLabel("reset");
        Button.onClick(() => {
            this.textTimerController.reset();
        });
        Button.pop();
        Row.pop();
        Column.pop();
    }
}
