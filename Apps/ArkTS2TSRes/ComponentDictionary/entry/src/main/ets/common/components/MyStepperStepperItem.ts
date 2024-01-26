interface MyStepperStepperItem_Params {
    currentIndex?: number;
    firstState?: ItemState;
    secondState?: ItemState;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyStepperStepperItem_" + ++__generate__Id;
}
export class MyStepperStepperItem extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__currentIndex = new ObservedPropertySimple(0, this, "currentIndex");
        this.__firstState = new ObservedPropertySimple(ItemState.Normal, this, "firstState");
        this.__secondState = new ObservedPropertySimple(ItemState.Normal, this, "secondState");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyStepperStepperItem_Params) {
        if (params.currentIndex !== undefined) {
            this.currentIndex = params.currentIndex;
        }
        if (params.firstState !== undefined) {
            this.firstState = params.firstState;
        }
        if (params.secondState !== undefined) {
            this.secondState = params.secondState;
        }
    }
    aboutToBeDeleted() {
        this.__currentIndex.aboutToBeDeleted();
        this.__firstState.aboutToBeDeleted();
        this.__secondState.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __currentIndex: ObservedPropertySimple<number>;
    get currentIndex() {
        return this.__currentIndex.get();
    }
    set currentIndex(newValue: number) {
        this.__currentIndex.set(newValue);
    }
    private __firstState: ObservedPropertySimple<ItemState>;
    get firstState() {
        return this.__firstState.get();
    }
    set firstState(newValue: ItemState) {
        this.__firstState.set(newValue);
    }
    private __secondState: ObservedPropertySimple<ItemState>;
    get secondState() {
        return this.__secondState.get();
    }
    set secondState(newValue: ItemState) {
        this.__secondState.set(newValue);
    }
    render() {
        Stepper.create({
            index: this.currentIndex
        });
        Stepper.onFinish(() => {
            console.log('onFinish');
        });
        Stepper.onSkip(() => {
            console.log('onSkip');
        });
        Stepper.onChange((prevIndex: number, index: number) => {
            this.currentIndex = index;
        });
        Stepper.align(Alignment.Center);
        StepperItem.create();
        StepperItem.nextLabel('');
        StepperItem.position({ x: '35%', y: 0 });
        Text.create('Page One');
        Text.fontSize(35);
        Text.fontColor(Color.Blue);
        Text.width(200);
        Text.lineHeight(50);
        Text.margin({ top: 250 });
        Text.pop();
        StepperItem.pop();
        StepperItem.create();
        StepperItem.nextLabel('Next');
        StepperItem.prevLabel('Previous');
        StepperItem.status(this.firstState);
        StepperItem.position({ x: '35%', y: 0 });
        Text.create('Page Two');
        Text.fontSize(35);
        Text.fontColor(Color.Blue);
        Text.width(200);
        Text.lineHeight(50);
        Text.margin({ top: 250 });
        Text.onClick(() => {
            this.firstState = this.firstState === ItemState.Skip ? ItemState.Normal : ItemState.Skip;
        });
        Text.pop();
        StepperItem.pop();
        StepperItem.create();
        StepperItem.position({ x: '35%', y: 0 });
        StepperItem.status(this.secondState);
        Text.create('Page Three');
        Text.fontSize(35);
        Text.fontColor(Color.Blue);
        Text.width(200);
        Text.lineHeight(50);
        Text.margin({ top: 250 });
        Text.onClick(() => {
            this.secondState = this.secondState === ItemState.Waiting ? ItemState.Normal : ItemState.Waiting;
        });
        Text.pop();
        StepperItem.pop();
        StepperItem.create();
        StepperItem.position({ x: '35%', y: 0 });
        StepperItem.nextLabel('Finish');
        Text.create('Page four');
        Text.fontSize(35);
        Text.fontColor(Color.Blue);
        Text.width(200);
        Text.lineHeight(50);
        Text.margin({ top: 250 });
        Text.pop();
        StepperItem.pop();
        Stepper.pop();
    }
}
