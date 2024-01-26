interface Slider_button_Params {
    selectValue?: number;
    circlePositionX?: number;
    minRange?: number;
    maxRange?: number;
    selectWidth?: number;
}
interface Slider_disable_Params {
    selectValue?: number;
    circlePositionX?: number;
    selectWidth?: number;
}
interface Slider_range_Params {
    selectValue?: number;
    circlePositionX?: number;
    minRange?: number;
    maxRange?: number;
    selectWidth?: number;
}
interface Slider_basic_Params {
    selectValue?: number;
    step?: number;
    trackColor?: string;
    sliderDirection?: Axis;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Slider_" + ++__generate__Id;
}
export class Slider_basic extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__selectValue = new SynchedPropertySimpleTwoWay(params.selectValue, this, "selectValue");
        this.step = 0;
        this.trackColor = "#ff007dff";
        this.sliderDirection = Axis.Horizontal;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Slider_basic_Params) {
        if (params.step !== undefined) {
            this.step = params.step;
        }
        if (params.trackColor !== undefined) {
            this.trackColor = params.trackColor;
        }
        if (params.sliderDirection !== undefined) {
            this.sliderDirection = params.sliderDirection;
        }
    }
    aboutToBeDeleted() {
        this.__selectValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __selectValue: SynchedPropertySimpleTwoWay<number>;
    get selectValue() {
        return this.__selectValue.get();
    }
    set selectValue(newValue: number) {
        this.__selectValue.set(newValue);
    }
    private step: number;
    private trackColor: string;
    private sliderDirection: Axis;
    render() {
        Column.create();
        Row.create();
        Slider.create({
            value: this.selectValue,
            min: 0,
            max: 100,
            style: SliderStyle.OutSet,
            step: this.step,
            direction: this.sliderDirection
        });
        Slider.blockColor('#ffffffff');
        Slider.trackColor('#ffe3e3e3');
        Slider.selectedColor(this.trackColor);
        Slider.onChange((value: number, mode: SliderChangeMode) => {
            if (mode.toString() == "2") {
                this.selectValue = value;
            }
        });
        Row.pop();
        Column.pop();
    }
}
export class Slider_range extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__selectValue = new SynchedPropertySimpleTwoWay(params.selectValue, this, "selectValue");
        this.__circlePositionX = new ObservedPropertySimple(0, this, "circlePositionX");
        this.minRange = 10;
        this.maxRange = 90;
        this.__selectWidth = new ObservedPropertySimple(0, this, "selectWidth");
        this.updateWithValueParams(params);
        this.declareWatch("selectValue", this.watchSelectValue);
    }
    updateWithValueParams(params: Slider_range_Params) {
        if (params.circlePositionX !== undefined) {
            this.circlePositionX = params.circlePositionX;
        }
        if (params.minRange !== undefined) {
            this.minRange = params.minRange;
        }
        if (params.maxRange !== undefined) {
            this.maxRange = params.maxRange;
        }
        if (params.selectWidth !== undefined) {
            this.selectWidth = params.selectWidth;
        }
    }
    aboutToBeDeleted() {
        this.__selectValue.aboutToBeDeleted();
        this.__circlePositionX.aboutToBeDeleted();
        this.__selectWidth.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __selectValue: SynchedPropertySimpleTwoWay<number>;
    get selectValue() {
        return this.__selectValue.get();
    }
    set selectValue(newValue: number) {
        this.__selectValue.set(newValue);
    }
    private __circlePositionX: ObservedPropertySimple<number>;
    get circlePositionX() {
        return this.__circlePositionX.get();
    }
    set circlePositionX(newValue: number) {
        this.__circlePositionX.set(newValue);
    }
    private minRange: number;
    private maxRange: number;
    private __selectWidth: ObservedPropertySimple<number>;
    get selectWidth() {
        return this.__selectWidth.get();
    }
    set selectWidth(newValue: number) {
        this.__selectWidth.set(newValue);
    }
    watchSelectValue(propName: string): void {
        this.circlePositionX = this.selectValue * 3.4 + 10;
        this.selectWidth = this.selectValue * 3.4;
    }
    aboutToAppear() {
        this.selectWidth = this.selectValue * 3.3 + 10;
        this.circlePositionX = this.selectValue * 3.3 + 10;
    }
    render() {
        Column.create();
        Column.markAnchor({
            x: 0,
            y: 0
        });
        Column.margin(10);
        Stack.create();
        Row.create();
        Row.height(2);
        Row.width(340);
        Row.backgroundColor("#ffd6d6d6");
        Row.borderRadius(10);
        Row.position({ x: 0, y: 10 });
        Row.pop();
        Flex.create();
        Row.create();
        Row.height(2);
        Row.width(this.selectWidth);
        Row.backgroundColor("#ff007dff");
        Row.borderRadius(10);
        Row.pop();
        Flex.pop();
        Row.create();
        Row.width(20);
        Row.height(20);
        Row.backgroundColor("#ffffffff");
        Row.borderRadius(20);
        Row.shadow({
            radius: 5,
            color: Color.Black,
            offsetX: 0,
            offsetY: 0
        });
        Row.position({
            x: this.circlePositionX,
            y: 0
        });
        Row.markAnchor({
            x: 20
        });
        Row.onTouch((event: TouchEvent) => {
            let realWidth;
            if (event.touches[0].screenX >= 340 - (100 - this.maxRange) * 3.4) {
                realWidth = 340 - (100 - this.maxRange) * 3.4;
                this.selectWidth = 350 - (100 - this.maxRange) * 3.4;
                this.circlePositionX = 350 - (100 - this.maxRange) * 3.4;
            }
            else if (event.touches[0].screenX <= +this.minRange * 3.4) {
                realWidth = 0 + this.minRange * 3.4;
                this.selectWidth = 0 + this.minRange * 3.4;
                this.circlePositionX = this.minRange * 3.4 + 10;
            }
            else {
                realWidth = event.touches[0].screenX;
                this.selectWidth = event.touches[0].screenX;
                this.circlePositionX = event.touches[0].screenX;
            }
            if (event.type == 1) {
                this.selectValue = realWidth / 340 * 100;
            }
        });
        Row.pop();
        Stack.pop();
        Column.pop();
    }
}
export class Slider_disable extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__selectValue = new SynchedPropertySimpleTwoWay(params.selectValue, this, "selectValue");
        this.__circlePositionX = new ObservedPropertySimple(0, this, "circlePositionX");
        this.__selectWidth = new ObservedPropertySimple(0
        // @Watch 回调
        , this, "selectWidth");
        this.updateWithValueParams(params);
        this.declareWatch("selectValue", this.watchSelectValue);
    }
    updateWithValueParams(params: Slider_disable_Params) {
        if (params.circlePositionX !== undefined) {
            this.circlePositionX = params.circlePositionX;
        }
        if (params.selectWidth !== undefined) {
            this.selectWidth = params.selectWidth;
        }
    }
    aboutToBeDeleted() {
        this.__selectValue.aboutToBeDeleted();
        this.__circlePositionX.aboutToBeDeleted();
        this.__selectWidth.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __selectValue: SynchedPropertySimpleTwoWay<number>;
    get selectValue() {
        return this.__selectValue.get();
    }
    set selectValue(newValue: number) {
        this.__selectValue.set(newValue);
    }
    private __circlePositionX: ObservedPropertySimple<number>;
    get circlePositionX() {
        return this.__circlePositionX.get();
    }
    set circlePositionX(newValue: number) {
        this.__circlePositionX.set(newValue);
    }
    private __selectWidth: ObservedPropertySimple<number>;
    get selectWidth() {
        return this.__selectWidth.get();
    }
    set selectWidth(newValue: number) {
        this.__selectWidth.set(newValue);
    }
    // @Watch 回调
    watchSelectValue(propName: string): void {
        this.circlePositionX = this.selectValue * 3.4 + 10;
        this.selectWidth = this.selectValue * 3.4;
    }
    aboutToAppear() {
        this.selectWidth = this.selectValue * 3.3;
        this.circlePositionX = this.selectValue * 3.3 + 10;
    }
    render() {
        Column.create();
        Column.markAnchor({
            x: 0,
            y: 0
        });
        Column.margin(10);
        Stack.create();
        Row.create();
        Row.height(2);
        Row.width(340);
        Row.backgroundColor("#ffd6d6d6");
        Row.borderRadius(10);
        Row.position({ x: 0, y: 10 });
        Row.pop();
        Flex.create();
        Row.create();
        Row.height(2);
        Row.width(this.selectWidth);
        Row.backgroundColor("#ffb0d3f7");
        Row.borderRadius(10);
        Row.pop();
        Flex.pop();
        Row.create();
        Row.width(20);
        Row.height(20);
        Row.backgroundColor("#ffffffff");
        Row.borderRadius(20);
        Row.shadow({
            radius: 5,
            color: Color.Grey,
            offsetX: 0,
            offsetY: 0
        });
        Row.markAnchor({
            x: 20
        });
        Row.position({
            x: this.circlePositionX,
            y: 0
        });
        Row.pop();
        Stack.pop();
        Column.pop();
    }
}
export class Slider_button extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__selectValue = new SynchedPropertySimpleTwoWay(params.selectValue, this, "selectValue");
        this.__circlePositionX = new ObservedPropertySimple(0, this, "circlePositionX");
        this.minRange = 0;
        this.maxRange = 100;
        this.__selectWidth = new ObservedPropertySimple(0
        // @Watch 回调
        , this, "selectWidth");
        this.updateWithValueParams(params);
        this.declareWatch("selectValue", this.watchSelectValue);
    }
    updateWithValueParams(params: Slider_button_Params) {
        if (params.circlePositionX !== undefined) {
            this.circlePositionX = params.circlePositionX;
        }
        if (params.minRange !== undefined) {
            this.minRange = params.minRange;
        }
        if (params.maxRange !== undefined) {
            this.maxRange = params.maxRange;
        }
        if (params.selectWidth !== undefined) {
            this.selectWidth = params.selectWidth;
        }
    }
    aboutToBeDeleted() {
        this.__selectValue.aboutToBeDeleted();
        this.__circlePositionX.aboutToBeDeleted();
        this.__selectWidth.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __selectValue: SynchedPropertySimpleTwoWay<number>;
    get selectValue() {
        return this.__selectValue.get();
    }
    set selectValue(newValue: number) {
        this.__selectValue.set(newValue);
    }
    private __circlePositionX: ObservedPropertySimple<number>;
    get circlePositionX() {
        return this.__circlePositionX.get();
    }
    set circlePositionX(newValue: number) {
        this.__circlePositionX.set(newValue);
    }
    private minRange: number;
    private maxRange: number;
    private __selectWidth: ObservedPropertySimple<number>;
    get selectWidth() {
        return this.__selectWidth.get();
    }
    set selectWidth(newValue: number) {
        this.__selectWidth.set(newValue);
    }
    // @Watch 回调
    watchSelectValue(propName: string): void {
        this.circlePositionX = this.selectValue * 3.4 + 10;
        this.selectWidth = this.selectValue * 3.4;
    }
    aboutToAppear() {
        this.selectWidth = this.selectValue * 3.3;
        this.circlePositionX = this.selectValue * 3.3 + 12;
    }
    render() {
        Column.create();
        Column.markAnchor({
            x: 0,
            y: 0
        });
        Column.margin(10);
        Stack.create();
        Row.create();
        Row.height(2);
        Row.width(340);
        Row.backgroundColor("#ffd6d6d6");
        Row.borderRadius(10);
        Row.position({ x: 0, y: 10 });
        Row.pop();
        Flex.create();
        Row.create();
        Row.height(2);
        Row.width(this.selectWidth);
        Row.backgroundColor("#ffff0000");
        Row.borderRadius(10);
        Row.pop();
        Flex.pop();
        Column.create();
        Column.width(30);
        Column.height(20);
        Column.backgroundColor("#ffff0000");
        Column.borderRadius(20);
        Column.shadow({
            radius: 5,
            color: Color.Black,
            offsetX: 0,
            offsetY: 0
        });
        Column.position({
            x: this.circlePositionX,
            y: 0
        });
        Column.markAnchor({
            x: 24
        });
        Column.onTouch((event: TouchEvent) => {
            let realWidth;
            if (event.touches[0].screenX >= 350 - (100 - this.maxRange) * 3.4) {
                realWidth = 340 - (100 - this.maxRange) * 3.4;
                this.selectWidth = 350 - (100 - this.maxRange) * 3.4;
                this.circlePositionX = 350 - (100 - this.maxRange) * 3.4;
            }
            else if (event.touches[0].screenX < this.minRange * 3.4) {
                realWidth = this.minRange * 3.4;
                this.selectWidth = this.minRange * 3.4 + 10;
                this.circlePositionX = this.minRange * 3.4 + 10;
            }
            else {
                realWidth = event.touches[0].screenX;
                this.selectWidth = event.touches[0].screenX;
                this.circlePositionX = event.touches[0].screenX + 10;
            }
            this.selectValue = realWidth / 340 * 100; //计算选中的值
            if (this.selectValue <= 2) {
                this.selectValue = 0;
            }
            if (this.selectValue >= 100) {
                this.selectValue = 100;
            }
        });
        Text.create(`${this.selectValue.toFixed()}`);
        Text.textAlign(TextAlign.Center);
        Text.alignSelf(ItemAlign.Center);
        Text.fontColor("#ffffffff");
        Text.pop();
        Column.pop();
        Stack.pop();
        Column.pop();
    }
}
