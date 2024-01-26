interface MyBadge_Params {
    counts?: number;
    message?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyBadge_" + ++__generate__Id;
}
export class MyBadge extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__counts = new ObservedPropertySimple(1, this, "counts");
        this.__message = new ObservedPropertySimple('new', this, "message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyBadge_Params) {
        if (params.counts !== undefined) {
            this.counts = params.counts;
        }
        if (params.message !== undefined) {
            this.message = params.message;
        }
    }
    aboutToBeDeleted() {
        this.__counts.aboutToBeDeleted();
        this.__message.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __counts: ObservedPropertySimple<number>;
    get counts() {
        return this.__counts.get();
    }
    set counts(newValue: number) {
        this.__counts.set(newValue);
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    render() {
        Column.create();
        Text.create('numberBadge');
        Text.width('80%');
        Text.pop();
        Row.create({ space: 10 });
        Row.margin(10);
        // 数字上标，maxCount默认99,超过99展示99+
        Badge.create({
            count: this.counts,
            maxCount: 99,
            position: BadgePosition.RightTop,
            style: { color: 0xFFFFFF, fontSize: 16, badgeSize: 20, badgeColor: Color.Red }
        });
        // 数字上标，maxCount默认99,超过99展示99+
        Badge.width(100);
        // 数字上标，maxCount默认99,超过99展示99+
        Badge.height(50);
        Button.createWithLabel('message');
        Button.onClick(() => {
            this.counts++;
        });
        Button.width(100);
        Button.height(50);
        Button.backgroundColor(0x317aff);
        Button.pop();
        // 数字上标，maxCount默认99,超过99展示99+
        Badge.pop();
        // 数字上标
        Badge.create({
            count: this.counts,
            maxCount: 99,
            position: BadgePosition.Left,
            style: { color: 0xFFFFFF, fontSize: 16, badgeSize: 20, badgeColor: Color.Red }
        });
        // 数字上标
        Badge.width(100);
        // 数字上标
        Badge.height(50);
        Button.createWithLabel('message');
        Button.onClick(() => {
            this.counts++;
        });
        Button.width(100);
        Button.height(50);
        Button.backgroundColor(0x317aff);
        Button.pop();
        // 数字上标
        Badge.pop();
        // 数字上标
        Badge.create({
            count: this.counts,
            maxCount: 99,
            position: BadgePosition.Right,
            style: { color: 0xFFFFFF, fontSize: 16, badgeSize: 20, badgeColor: Color.Red }
        });
        // 数字上标
        Badge.width(100);
        // 数字上标
        Badge.height(50);
        Button.createWithLabel('message');
        Button.onClick(() => {
            this.counts++;
        });
        Button.width(100);
        Button.height(50);
        Button.backgroundColor(0x317aff);
        Button.pop();
        // 数字上标
        Badge.pop();
        Row.pop();
        Text.create('stringBadge');
        Text.width('80%');
        Text.pop();
        Row.create({ space: 30 });
        Row.margin(10);
        Badge.create({
            value: this.message,
            style: { color: 0xFFFFFF, fontSize: 9, badgeSize: 20, badgeColor: Color.Blue }
        });
        Badge.width(80);
        Badge.height(50);
        Text.create('message');
        Text.width(80);
        Text.height(50);
        Text.fontSize(16);
        Text.lineHeight(37);
        Text.borderRadius(10);
        Text.textAlign(TextAlign.Center);
        Text.backgroundColor(0xF3F4ED);
        Text.pop();
        Badge.pop();
        // value为空，设置圆点标记
        Badge.create({
            value: '',
            position: BadgePosition.Right,
            style: { badgeSize: 6, badgeColor: Color.Red }
        });
        // value为空，设置圆点标记
        Badge.width(90);
        // value为空，设置圆点标记
        Badge.height(50);
        Text.create('message');
        Text.width(90);
        Text.height(50);
        Text.fontSize(16);
        Text.lineHeight(37);
        Text.borderRadius(10);
        Text.textAlign(TextAlign.Center);
        Text.backgroundColor(0xF3F4ED);
        Text.pop();
        // value为空，设置圆点标记
        Badge.pop();
        Row.pop();
        Column.pop();
    }
}
