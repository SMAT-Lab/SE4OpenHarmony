interface steper_Params {
    currentValue?: number;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    asyncChange?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Steper_" + ++__generate__Id;
}
export class steper extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__currentValue = new ObservedPropertySimple(1, this, "currentValue");
        this.min = 1;
        this.max = 100;
        this.step = 1;
        this.disabled = false;
        this.asyncChange = false;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: steper_Params) {
        if (params.currentValue !== undefined) {
            this.currentValue = params.currentValue;
        }
        if (params.min !== undefined) {
            this.min = params.min;
        }
        if (params.max !== undefined) {
            this.max = params.max;
        }
        if (params.step !== undefined) {
            this.step = params.step;
        }
        if (params.disabled !== undefined) {
            this.disabled = params.disabled;
        }
        if (params.asyncChange !== undefined) {
            this.asyncChange = params.asyncChange;
        }
    }
    aboutToBeDeleted() {
        this.__currentValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __currentValue: ObservedPropertySimple<number>;
    get currentValue() {
        return this.__currentValue.get();
    }
    set currentValue(newValue: number) {
        this.__currentValue.set(newValue);
    }
    private min: number;
    private max: number;
    private step: number;
    private disabled: boolean;
    private asyncChange: boolean;
    render() {
        If.create();
        if (!this.disabled) {
            If.branchId(0);
            Row.create();
            If.create();
            if (this.currentValue == this.min) {
                If.branchId(0);
                Button.createWithChild();
                Button.type(ButtonType.Normal);
                Button.backgroundColor("#ffececec");
                Button.borderRadius(2);
                Button.width(30);
                Button.height(30);
                Text.create("-");
                Text.fontColor("#ff757575");
                Text.pop();
                Button.pop();
            }
            else {
                If.branchId(1);
                Button.createWithChild();
                Button.type(ButtonType.Normal);
                Button.backgroundColor("#ffd9d9d9");
                Button.borderRadius(2);
                Button.width(30);
                Button.height(30);
                Button.onClick(() => {
                    if ((this.currentValue - this.step) >= this.step) {
                        if (!this.asyncChange) {
                            this.currentValue -= this.step;
                        }
                        else {
                            setTimeout(() => {
                                this.currentValue -= this.step;
                            }, 1000);
                        }
                    }
                    else {
                        if (!this.asyncChange) {
                            this.currentValue = this.min;
                        }
                        else {
                            setTimeout(() => {
                                this.currentValue = this.min;
                            }, 1000);
                        }
                    }
                });
                Text.create("-");
                Text.fontColor("#ff000000");
                Text.pop();
                Button.pop();
            }
            If.pop();
            Text.create(`${this.currentValue}`);
            Text.backgroundColor("#ffd9d9d9");
            Text.textAlign(TextAlign.Center);
            Text.margin({ left: 2, right: 2 });
            Text.width(30);
            Text.height(30);
            Text.pop();
            If.create();
            if (this.currentValue == this.max) {
                If.branchId(0);
                Button.createWithChild();
                Button.type(ButtonType.Normal);
                Button.backgroundColor("#ffececec");
                Button.borderRadius(2);
                Button.width(30);
                Button.height(30);
                Text.create("+");
                Text.fontColor("#ff757575");
                Text.pop();
                Button.pop();
            }
            else {
                If.branchId(1);
                Button.createWithChild();
                Button.type(ButtonType.Normal);
                Button.backgroundColor("#ffd9d9d9");
                Button.borderRadius(2);
                Button.width(30);
                Button.height(30);
                Button.onClick(() => {
                    if ((this.currentValue + this.step) <= this.max) {
                        if (!this.asyncChange) {
                            this.currentValue += this.step;
                        }
                        else {
                            setTimeout(() => {
                                this.currentValue += this.step;
                            }, 1000);
                        }
                    }
                    else {
                        if (!this.asyncChange) {
                            this.currentValue = this.max;
                        }
                        else {
                            setTimeout(() => {
                                this.currentValue = this.max;
                            }, 1000);
                        }
                    }
                });
                Text.create("+");
                Text.fontColor("#ff000000");
                Text.pop();
                Button.pop();
            }
            If.pop();
            Row.pop();
        }
        else {
            If.branchId(1);
            Row.create();
            Button.createWithChild();
            Button.type(ButtonType.Normal);
            Button.backgroundColor("#ffececec");
            Button.borderRadius(2);
            Button.width(30);
            Button.height(30);
            Button.hitTestBehavior(HitTestMode.None);
            Text.create("-");
            Text.fontColor("#ffc1c1c1");
            Text.pop();
            Button.pop();
            Text.create(`${this.currentValue}`);
            Text.fontColor("#ffc1c1c1");
            Text.backgroundColor("#ffececec");
            Text.textAlign(TextAlign.Center);
            Text.margin({ left: 2, right: 2 });
            Text.width(30);
            Text.height(30);
            Text.pop();
            Button.createWithChild();
            Button.type(ButtonType.Normal);
            Button.backgroundColor("#ffececec");
            Button.borderRadius(2);
            Button.width(30);
            Button.height(30);
            Button.hitTestBehavior(HitTestMode.None);
            Text.create("+");
            Text.fontColor("#ffc1c1c1");
            Text.pop();
            Button.pop();
            Row.pop();
        }
        If.pop();
    }
}
