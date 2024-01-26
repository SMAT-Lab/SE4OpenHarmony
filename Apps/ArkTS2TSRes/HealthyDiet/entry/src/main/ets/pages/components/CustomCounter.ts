interface PreviewCustomCounter_Params {
    weight?: number;
}
interface CustomCounter_Params {
    value?: string;
    onDec?: () => void;
    onInc?: () => void;
}
interface IncIcon_Params {
    click?: () => void;
}
interface DecIcon_Params {
    click?: () => void;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CustomCounter_" + ++__generate__Id;
}
class DecIcon extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.click = () => {
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: DecIcon_Params) {
        if (params.click !== undefined) {
            this.click = params.click;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private click: () => void;
    render() {
        Stack.create();
        Stack.borderRadius(10);
        Stack.backgroundColor('#35BD6A');
        Stack.width(20);
        Stack.height(20);
        Stack.opacity(0.4);
        Stack.onClick(() => {
            this.click();
        });
        Line.create();
        Line.startPoint([0, 0]);
        Line.endPoint([12, 0]);
        Line.stroke(Color.White);
        Line.strokeWidth(2);
        Line.strokeLineCap(LineCapStyle.Round);
        Stack.pop();
    }
}
class IncIcon extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.click = () => {
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: IncIcon_Params) {
        if (params.click !== undefined) {
            this.click = params.click;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private readonly click: () => void;
    render() {
        Stack.create();
        Stack.borderRadius(10);
        Stack.backgroundColor('#35BD6A');
        Stack.width(20);
        Stack.height(20);
        Stack.onClick(() => {
            this.click();
        });
        Line.create();
        Line.startPoint([0, 0]);
        Line.endPoint([0, 12]);
        Line.stroke(Color.White);
        Line.strokeWidth(2);
        Line.strokeLineCap(LineCapStyle.Round);
        Stack.pop();
    }
}
export class CustomCounter extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__value = new SynchedPropertySimpleOneWay(params.value, this, "value");
        this.onDec = () => {
        };
        this.onInc = () => {
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CustomCounter_Params) {
        this.value = params.value;
        if (params.onDec !== undefined) {
            this.onDec = params.onDec;
        }
        if (params.onInc !== undefined) {
            this.onInc = params.onInc;
        }
    }
    aboutToBeDeleted() {
        this.__value.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __value: SynchedPropertySimpleOneWay<string>;
    get value() {
        return this.__value.get();
    }
    set value(newValue: string) {
        this.__value.set(newValue);
    }
    private onDec: () => void;
    private onInc: () => void;
    render() {
        Row.create();
        let earlierCreatedChild_2: DecIcon = (this && this.findChildById) ? this.findChildById("2") as DecIcon : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new DecIcon("2", this, { click: this.onDec }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                click: this.onDec
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        Text.create(this.value);
        Text.margin({ left: 11, right: 11 });
        Text.pop();
        let earlierCreatedChild_3: IncIcon = (this && this.findChildById) ? this.findChildById("3") as IncIcon : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new IncIcon("3", this, { click: this.onInc }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                click: this.onInc
            });
            if (!earlierCreatedChild_3.needsUpdate()) {
                earlierCreatedChild_3.markStatic();
            }
            View.create(earlierCreatedChild_3);
        }
        Row.pop();
    }
}
class PreviewCustomCounter extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__weight = new ObservedPropertySimple(50, this, "weight");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: PreviewCustomCounter_Params) {
        if (params.weight !== undefined) {
            this.weight = params.weight;
        }
    }
    aboutToBeDeleted() {
        this.__weight.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __weight: ObservedPropertySimple<number>;
    get weight() {
        return this.__weight.get();
    }
    set weight(newValue: number) {
        this.__weight.set(newValue);
    }
    render() {
        Row.create();
        let earlierCreatedChild_4: CustomCounter = (this && this.findChildById) ? this.findChildById("4") as CustomCounter : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new CustomCounter("4", this, {
                value: this.weight + 'g',
                onDec: () => {
                    this.weight -= 50;
                },
                onInc: () => {
                    this.weight += 50;
                }
            }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({
                value: this.weight + 'g',
                onDec: () => {
                    this.weight -= 50;
                },
                onInc: () => {
                    this.weight += 50;
                }
            });
            View.create(earlierCreatedChild_4);
        }
        Row.pop();
    }
}
loadDocument(new PreviewCustomCounter("1", undefined, {}));
