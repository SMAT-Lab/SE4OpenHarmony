interface MyTextClock_Params {
    accumulateTime?: number;
    controller?: TextClockController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyTextClock_" + ++__generate__Id;
}
export class MyTextClock extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__accumulateTime = new ObservedPropertySimple(0, this, "accumulateTime");
        this.controller = new TextClockController();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyTextClock_Params) {
        if (params.accumulateTime !== undefined) {
            this.accumulateTime = params.accumulateTime;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    aboutToBeDeleted() {
        this.__accumulateTime.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __accumulateTime: ObservedPropertySimple<number>;
    get accumulateTime() {
        return this.__accumulateTime.get();
    }
    set accumulateTime(newValue: number) {
        this.__accumulateTime.set(newValue);
    }
    private controller: TextClockController;
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Text.create('current milliseconds is' + this.accumulateTime);
        Text.fontSize(20);
        Text.pop();
        TextClock.create({ timeZoneOffset: -8, controller: this.controller });
        TextClock.format('hhmmss');
        TextClock.onDateChange((value: number) => {
            this.accumulateTime = value;
        });
        TextClock.margin(20);
        TextClock.fontSize(30);
        TextClock.pop();
        Button.createWithLabel("start TextClock");
        Button.margin({ bottom: 10 });
        Button.onClick(() => {
            this.controller.start();
        });
        Button.pop();
        Button.createWithLabel("stop TextClock");
        Button.onClick(() => {
            this.controller.stop();
        });
        Button.pop();
        Flex.pop();
    }
}
