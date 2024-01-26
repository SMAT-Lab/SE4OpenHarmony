interface MySlider_Params {
    outSetValueOne?: number;
    inSetValueOne?: number;
    outSetValueTwo?: number;
    inSetValueTwo?: number;
    vOutSetValueOne?: number;
    vInSetValueOne?: number;
    vOutSetValueTwo?: number;
    vInSetValueTwo?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MySlider_" + ++__generate__Id;
}
export class MySlider extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__outSetValueOne = new ObservedPropertySimple(40, this, "outSetValueOne");
        this.__inSetValueOne = new ObservedPropertySimple(40, this, "inSetValueOne");
        this.__outSetValueTwo = new ObservedPropertySimple(40, this, "outSetValueTwo");
        this.__inSetValueTwo = new ObservedPropertySimple(40, this, "inSetValueTwo");
        this.__vOutSetValueOne = new ObservedPropertySimple(40, this, "vOutSetValueOne");
        this.__vInSetValueOne = new ObservedPropertySimple(40, this, "vInSetValueOne");
        this.__vOutSetValueTwo = new ObservedPropertySimple(40, this, "vOutSetValueTwo");
        this.__vInSetValueTwo = new ObservedPropertySimple(40, this, "vInSetValueTwo");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MySlider_Params) {
        if (params.outSetValueOne !== undefined) {
            this.outSetValueOne = params.outSetValueOne;
        }
        if (params.inSetValueOne !== undefined) {
            this.inSetValueOne = params.inSetValueOne;
        }
        if (params.outSetValueTwo !== undefined) {
            this.outSetValueTwo = params.outSetValueTwo;
        }
        if (params.inSetValueTwo !== undefined) {
            this.inSetValueTwo = params.inSetValueTwo;
        }
        if (params.vOutSetValueOne !== undefined) {
            this.vOutSetValueOne = params.vOutSetValueOne;
        }
        if (params.vInSetValueOne !== undefined) {
            this.vInSetValueOne = params.vInSetValueOne;
        }
        if (params.vOutSetValueTwo !== undefined) {
            this.vOutSetValueTwo = params.vOutSetValueTwo;
        }
        if (params.vInSetValueTwo !== undefined) {
            this.vInSetValueTwo = params.vInSetValueTwo;
        }
    }
    aboutToBeDeleted() {
        this.__outSetValueOne.aboutToBeDeleted();
        this.__inSetValueOne.aboutToBeDeleted();
        this.__outSetValueTwo.aboutToBeDeleted();
        this.__inSetValueTwo.aboutToBeDeleted();
        this.__vOutSetValueOne.aboutToBeDeleted();
        this.__vInSetValueOne.aboutToBeDeleted();
        this.__vOutSetValueTwo.aboutToBeDeleted();
        this.__vInSetValueTwo.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __outSetValueOne: ObservedPropertySimple<number>;
    get outSetValueOne() {
        return this.__outSetValueOne.get();
    }
    set outSetValueOne(newValue: number) {
        this.__outSetValueOne.set(newValue);
    }
    private __inSetValueOne: ObservedPropertySimple<number>;
    get inSetValueOne() {
        return this.__inSetValueOne.get();
    }
    set inSetValueOne(newValue: number) {
        this.__inSetValueOne.set(newValue);
    }
    private __outSetValueTwo: ObservedPropertySimple<number>;
    get outSetValueTwo() {
        return this.__outSetValueTwo.get();
    }
    set outSetValueTwo(newValue: number) {
        this.__outSetValueTwo.set(newValue);
    }
    private __inSetValueTwo: ObservedPropertySimple<number>;
    get inSetValueTwo() {
        return this.__inSetValueTwo.get();
    }
    set inSetValueTwo(newValue: number) {
        this.__inSetValueTwo.set(newValue);
    }
    private __vOutSetValueOne: ObservedPropertySimple<number>;
    get vOutSetValueOne() {
        return this.__vOutSetValueOne.get();
    }
    set vOutSetValueOne(newValue: number) {
        this.__vOutSetValueOne.set(newValue);
    }
    private __vInSetValueOne: ObservedPropertySimple<number>;
    get vInSetValueOne() {
        return this.__vInSetValueOne.get();
    }
    set vInSetValueOne(newValue: number) {
        this.__vInSetValueOne.set(newValue);
    }
    private __vOutSetValueTwo: ObservedPropertySimple<number>;
    get vOutSetValueTwo() {
        return this.__vOutSetValueTwo.get();
    }
    set vOutSetValueTwo(newValue: number) {
        this.__vOutSetValueTwo.set(newValue);
    }
    private __vInSetValueTwo: ObservedPropertySimple<number>;
    get vInSetValueTwo() {
        return this.__vInSetValueTwo.get();
    }
    set vInSetValueTwo(newValue: number) {
        this.__vInSetValueTwo.set(newValue);
    }
    render() {
        Column.create({ space: 8 });
        Column.width('100%');
        Text.create('outset slider');
        Text.fontSize(9);
        Text.fontColor(0xCCCCCC);
        Text.width('90%');
        Text.margin(15);
        Text.pop();
        Row.create();
        Row.width('80%');
        Slider.create({
            value: this.outSetValueOne,
            min: 0,
            max: 100,
            style: SliderStyle.OutSet
        });
        Slider.showTips(true);
        Slider.onChange((value: number, mode: SliderChangeMode) => {
            this.outSetValueOne = value;
            console.info('value:' + value + 'mode:' + mode.toString());
        });
        // toFixed(0)将滑动条返回值处理为整数精度
        Text.create(this.outSetValueOne.toFixed(0));
        // toFixed(0)将滑动条返回值处理为整数精度
        Text.fontSize(12);
        // toFixed(0)将滑动条返回值处理为整数精度
        Text.pop();
        Row.pop();
        Row.create();
        Row.width('80%');
        Slider.create({
            value: this.outSetValueTwo,
            step: 10,
            style: SliderStyle.OutSet
        });
        Slider.showSteps(true);
        Slider.onChange((value: number, mode: SliderChangeMode) => {
            this.outSetValueTwo = value;
            console.info('value:' + value + 'mode:' + mode.toString());
        });
        Text.create(this.outSetValueTwo.toFixed(0));
        Text.fontSize(12);
        Text.pop();
        Row.pop();
        Text.create('inset slider');
        Text.fontSize(9);
        Text.fontColor(0xCCCCCC);
        Text.width('90%');
        Text.margin(15);
        Text.pop();
        Row.create();
        Row.width('80%');
        Slider.create({
            value: this.inSetValueOne,
            min: 0,
            max: 100,
            style: SliderStyle.InSet
        });
        Slider.blockColor('#191970');
        Slider.trackColor('#ADD8E6');
        Slider.selectedColor('#4169E1');
        Slider.showTips(true);
        Slider.onChange((value: number, mode: SliderChangeMode) => {
            this.inSetValueOne = value;
            console.info('value:' + value + 'mode:' + mode.toString());
        });
        Text.create(this.inSetValueOne.toFixed(0));
        Text.fontSize(12);
        Text.pop();
        Row.pop();
        Row.create();
        Row.width('80%');
        Slider.create({
            value: this.inSetValueTwo,
            step: 10,
            style: SliderStyle.InSet
        });
        Slider.blockColor('#191970');
        Slider.trackColor('#ADD8E6');
        Slider.selectedColor('#4169E1');
        Slider.showSteps(true);
        Slider.onChange((value: number, mode: SliderChangeMode) => {
            this.inSetValueTwo = value;
            console.info('value:' + value + 'mode:' + mode.toString());
        });
        Text.create(this.inSetValueTwo.toFixed(0));
        Text.fontSize(12);
        Text.pop();
        Row.pop();
        Row.create();
        Column.create();
        Column.width('50%');
        Column.height(300);
        Text.create('vertical outset slider');
        Text.fontSize(9);
        Text.fontColor(0xCCCCCC);
        Text.width('50%');
        Text.margin(15);
        Text.pop();
        Row.create();
        Slider.create({
            value: this.vOutSetValueOne,
            style: SliderStyle.OutSet,
            direction: Axis.Vertical
        });
        Slider.blockColor('#191970');
        Slider.trackColor('#ADD8E6');
        Slider.selectedColor('#4169E1');
        Slider.showTips(true);
        Slider.onChange((value: number, mode: SliderChangeMode) => {
            this.vOutSetValueOne = value;
            console.info('value:' + value + 'mode:' + mode.toString());
        });
        Slider.create({
            value: this.vOutSetValueTwo,
            step: 10,
            style: SliderStyle.OutSet,
            direction: Axis.Vertical
        });
        Slider.blockColor('#191970');
        Slider.trackColor('#ADD8E6');
        Slider.selectedColor('#4169E1');
        Slider.showSteps(true);
        Slider.onChange((value: number, mode: SliderChangeMode) => {
            this.vOutSetValueTwo = value;
            console.info('value:' + value + 'mode:' + mode.toString());
        });
        Row.pop();
        Column.pop();
        Column.create();
        Column.width('50%');
        Column.height(300);
        Text.create('vertical inset slider');
        Text.fontSize(9);
        Text.fontColor(0xCCCCCC);
        Text.width('50%');
        Text.margin(15);
        Text.pop();
        Row.create();
        Slider.create({
            value: this.vInSetValueOne,
            style: SliderStyle.InSet,
            direction: Axis.Vertical,
            reverse: true // 竖向的Slider默认是上端是min值，下端是max值，因此想要从下往上滑动，需要设置reverse为true
        });
        Slider.showTips(true);
        Slider.onChange((value: number, mode: SliderChangeMode) => {
            this.vInSetValueOne = value;
            console.info('value:' + value + 'mode:' + mode.toString());
        });
        Slider.create({
            value: this.vInSetValueTwo,
            step: 10,
            style: SliderStyle.InSet,
            direction: Axis.Vertical,
            reverse: true
        });
        Slider.showSteps(true);
        Slider.onChange((value: number, mode: SliderChangeMode) => {
            this.vInSetValueTwo = value;
            console.info('value:' + value + 'mode:' + mode.toString());
        });
        Row.pop();
        Column.pop();
        Row.pop();
        Column.pop();
    }
}
