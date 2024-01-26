interface Switch_disable_off_Params {
    circlePosition?: number;
    shadowColor?: string;
    bottomBorderWidth?: number;
    bottomBorderOpacity?: number;
    borderColorOn?: string;
}
interface Switch_disable_on_Params {
    circlePosition?: number;
    shadowColor?: string;
    bottomBorderWidth?: number;
    bottomBorderOpacity?: number;
    borderColorOn?: string;
}
interface Switch_inline_Params {
    switchOn?: boolean;
    circlePosition?: number;
    shadowColor?: string;
    bottomBorderWidth?: number;
    bottomBorderOpacity?: number;
    borderColorOn?: string;
}
interface Switch_textRight_Params {
    switchOn?: boolean;
    circlePosition?: number;
    shadowColor?: string;
    bottomBorderWidth?: number;
    bottomBorderOpacity?: number;
    borderColorOn?: string;
}
interface Switch_textLeft_Params {
    switchOn?: boolean;
    circlePosition?: number;
    shadowColor?: string;
    bottomBorderWidth?: number;
    bottomBorderOpacity?: number;
    borderColorOn?: string;
}
interface Switch_Params {
    switchOn?: boolean;
    circlePosition?: number;
    shadowColor?: string;
    bottomBorderWidth?: number;
    bottomBorderOpacity?: number;
    borderColorOn?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Switch_" + ++__generate__Id;
}
export class Switch extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.switchOn = false;
        this.__circlePosition = new ObservedPropertySimple(0, this, "circlePosition");
        this.__shadowColor = new ObservedPropertySimple("#ffffffff", this, "shadowColor");
        this.__bottomBorderWidth = new ObservedPropertySimple(0, this, "bottomBorderWidth");
        this.__bottomBorderOpacity = new ObservedPropertySimple(0, this, "bottomBorderOpacity");
        this.__borderColorOn = new ObservedPropertySimple("#ffd6d6d6", this, "borderColorOn");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Switch_Params) {
        if (params.switchOn !== undefined) {
            this.switchOn = params.switchOn;
        }
        if (params.circlePosition !== undefined) {
            this.circlePosition = params.circlePosition;
        }
        if (params.shadowColor !== undefined) {
            this.shadowColor = params.shadowColor;
        }
        if (params.bottomBorderWidth !== undefined) {
            this.bottomBorderWidth = params.bottomBorderWidth;
        }
        if (params.bottomBorderOpacity !== undefined) {
            this.bottomBorderOpacity = params.bottomBorderOpacity;
        }
        if (params.borderColorOn !== undefined) {
            this.borderColorOn = params.borderColorOn;
        }
    }
    aboutToBeDeleted() {
        this.__circlePosition.aboutToBeDeleted();
        this.__shadowColor.aboutToBeDeleted();
        this.__bottomBorderWidth.aboutToBeDeleted();
        this.__bottomBorderOpacity.aboutToBeDeleted();
        this.__borderColorOn.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private switchOn: boolean;
    private __circlePosition: ObservedPropertySimple<number>;
    get circlePosition() {
        return this.__circlePosition.get();
    }
    set circlePosition(newValue: number) {
        this.__circlePosition.set(newValue);
    }
    private __shadowColor: ObservedPropertySimple<string>;
    get shadowColor() {
        return this.__shadowColor.get();
    }
    set shadowColor(newValue: string) {
        this.__shadowColor.set(newValue);
    }
    private __bottomBorderWidth: ObservedPropertySimple<number>;
    get bottomBorderWidth() {
        return this.__bottomBorderWidth.get();
    }
    set bottomBorderWidth(newValue: number) {
        this.__bottomBorderWidth.set(newValue);
    }
    private __bottomBorderOpacity: ObservedPropertySimple<number>;
    get bottomBorderOpacity() {
        return this.__bottomBorderOpacity.get();
    }
    set bottomBorderOpacity(newValue: number) {
        this.__bottomBorderOpacity.set(newValue);
    }
    private __borderColorOn: ObservedPropertySimple<string>;
    get borderColorOn() {
        return this.__borderColorOn.get();
    }
    set borderColorOn(newValue: string) {
        this.__borderColorOn.set(newValue);
    }
    render() {
        Row.create();
        Row.margin(10);
        Row.width("95%");
        Row.borderWidth(1);
        Row.borderColor("#ffd6d6d6");
        Row.padding(20);
        Row.create();
        Row.markAnchor({
            x: 0,
            y: 0
        });
        Row.width(40);
        Row.height(25);
        Row.borderRadius(15);
        Row.borderWidth(1);
        Row.borderColor(this.borderColorOn);
        Row.shadow({
            radius: 10,
            color: this.shadowColor,
        });
        Row.onClick(() => {
            this.switchOn = !this.switchOn;
            this.shadowColor = "#ff3280fc";
            if (this.switchOn) {
                console.log("开关打开");
                this.borderColorOn = "#ff3280fc";
                this.shadowColor = "#ff3280fc";
                this.circlePosition = 15;
                this.bottomBorderWidth = 40;
                this.bottomBorderOpacity = 1;
            }
            else {
                console.log("开关关闭");
                this.borderColorOn = "#ffd6d6d6";
                this.shadowColor = "#ffffffff";
                this.circlePosition = 0;
                this.bottomBorderWidth = 0;
                this.bottomBorderOpacity = 0;
            }
        });
        Stack.create();
        Flex.create();
        Flex.create();
        Context.animation({
            duration: 200,
            curve: Curve.Smooth
        });
        Flex.backgroundColor("#ff007dff");
        Flex.width(this.bottomBorderWidth);
        Flex.height(24);
        Flex.borderRadius(11);
        Flex.opacity(this.bottomBorderOpacity);
        Context.animation(null);
        Flex.pop();
        Flex.pop();
        Circle.create();
        Context.animation({
            duration: 200,
            curve: Curve.Smooth
        });
        Circle.width(23);
        Circle.height(23);
        Circle.fill(Color.White);
        Circle.strokeWidth(1);
        Circle.stroke(this.borderColorOn);
        Circle.position({
            x: this.circlePosition,
            y: 0
        });
        Context.animation(null);
        Stack.pop();
        Row.pop();
        Text.create("夜间模式");
        Text.margin({ left: 5, right: 5 });
        Text.pop();
        Row.pop();
    }
}
export class Switch_textLeft extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.switchOn = false;
        this.__circlePosition = new ObservedPropertySimple(0, this, "circlePosition");
        this.__shadowColor = new ObservedPropertySimple("#ffffffff", this, "shadowColor");
        this.__bottomBorderWidth = new ObservedPropertySimple(0, this, "bottomBorderWidth");
        this.__bottomBorderOpacity = new ObservedPropertySimple(0, this, "bottomBorderOpacity");
        this.__borderColorOn = new ObservedPropertySimple("#ffd6d6d6", this, "borderColorOn");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Switch_textLeft_Params) {
        if (params.switchOn !== undefined) {
            this.switchOn = params.switchOn;
        }
        if (params.circlePosition !== undefined) {
            this.circlePosition = params.circlePosition;
        }
        if (params.shadowColor !== undefined) {
            this.shadowColor = params.shadowColor;
        }
        if (params.bottomBorderWidth !== undefined) {
            this.bottomBorderWidth = params.bottomBorderWidth;
        }
        if (params.bottomBorderOpacity !== undefined) {
            this.bottomBorderOpacity = params.bottomBorderOpacity;
        }
        if (params.borderColorOn !== undefined) {
            this.borderColorOn = params.borderColorOn;
        }
    }
    aboutToBeDeleted() {
        this.__circlePosition.aboutToBeDeleted();
        this.__shadowColor.aboutToBeDeleted();
        this.__bottomBorderWidth.aboutToBeDeleted();
        this.__bottomBorderOpacity.aboutToBeDeleted();
        this.__borderColorOn.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private switchOn: boolean;
    private __circlePosition: ObservedPropertySimple<number>;
    get circlePosition() {
        return this.__circlePosition.get();
    }
    set circlePosition(newValue: number) {
        this.__circlePosition.set(newValue);
    }
    private __shadowColor: ObservedPropertySimple<string>;
    get shadowColor() {
        return this.__shadowColor.get();
    }
    set shadowColor(newValue: string) {
        this.__shadowColor.set(newValue);
    }
    private __bottomBorderWidth: ObservedPropertySimple<number>;
    get bottomBorderWidth() {
        return this.__bottomBorderWidth.get();
    }
    set bottomBorderWidth(newValue: number) {
        this.__bottomBorderWidth.set(newValue);
    }
    private __bottomBorderOpacity: ObservedPropertySimple<number>;
    get bottomBorderOpacity() {
        return this.__bottomBorderOpacity.get();
    }
    set bottomBorderOpacity(newValue: number) {
        this.__bottomBorderOpacity.set(newValue);
    }
    private __borderColorOn: ObservedPropertySimple<string>;
    get borderColorOn() {
        return this.__borderColorOn.get();
    }
    set borderColorOn(newValue: string) {
        this.__borderColorOn.set(newValue);
    }
    render() {
        Row.create();
        Row.direction(Direction.Rtl);
        Row.margin(10);
        Row.width("95%");
        Row.borderWidth(1);
        Row.borderColor("#ffd6d6d6");
        Row.padding(20);
        Row.create();
        Row.markAnchor({
            x: 0,
            y: 0
        });
        Row.width(40);
        Row.height(25);
        Row.borderRadius(15);
        Row.borderWidth(1);
        Row.borderColor(this.borderColorOn);
        Row.shadow({
            radius: 10,
            color: this.shadowColor,
        });
        Row.onClick(() => {
            this.switchOn = !this.switchOn;
            this.shadowColor = "#ff3280fc";
            if (this.switchOn) {
                console.log("开关打开");
                this.borderColorOn = "#ff3280fc";
                this.shadowColor = "#ff3280fc";
                this.circlePosition = 15;
                this.bottomBorderWidth = 40;
                this.bottomBorderOpacity = 1;
            }
            else {
                console.log("开关关闭");
                this.borderColorOn = "#ffd6d6d6";
                this.shadowColor = "#ffffffff";
                this.circlePosition = 0;
                this.bottomBorderWidth = 0;
                this.bottomBorderOpacity = 0;
            }
        });
        Stack.create();
        Flex.create();
        Flex.create();
        Context.animation({
            duration: 200,
            curve: Curve.Smooth
        });
        Flex.backgroundColor("#ff007dff");
        Flex.width(this.bottomBorderWidth);
        Flex.height(24);
        Flex.borderRadius(11);
        Flex.opacity(this.bottomBorderOpacity);
        Context.animation(null);
        Flex.pop();
        Flex.pop();
        Circle.create();
        Context.animation({
            duration: 200,
            curve: Curve.Smooth
        });
        Circle.width(23);
        Circle.height(23);
        Circle.fill(Color.White);
        Circle.strokeWidth(1);
        Circle.stroke(this.borderColorOn);
        Circle.position({
            x: this.circlePosition,
            y: 0
        });
        Context.animation(null);
        Stack.pop();
        Row.pop();
        Blank.create();
        Blank.width("65%");
        Blank.pop();
        Text.create("夜间模式");
        Text.margin({ left: 5, right: 5 });
        Text.pop();
        Row.pop();
    }
}
export class Switch_textRight extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.switchOn = false;
        this.__circlePosition = new ObservedPropertySimple(0, this, "circlePosition");
        this.__shadowColor = new ObservedPropertySimple("#ffffffff", this, "shadowColor");
        this.__bottomBorderWidth = new ObservedPropertySimple(0, this, "bottomBorderWidth");
        this.__bottomBorderOpacity = new ObservedPropertySimple(0, this, "bottomBorderOpacity");
        this.__borderColorOn = new ObservedPropertySimple("#ffd6d6d6", this, "borderColorOn");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Switch_textRight_Params) {
        if (params.switchOn !== undefined) {
            this.switchOn = params.switchOn;
        }
        if (params.circlePosition !== undefined) {
            this.circlePosition = params.circlePosition;
        }
        if (params.shadowColor !== undefined) {
            this.shadowColor = params.shadowColor;
        }
        if (params.bottomBorderWidth !== undefined) {
            this.bottomBorderWidth = params.bottomBorderWidth;
        }
        if (params.bottomBorderOpacity !== undefined) {
            this.bottomBorderOpacity = params.bottomBorderOpacity;
        }
        if (params.borderColorOn !== undefined) {
            this.borderColorOn = params.borderColorOn;
        }
    }
    aboutToBeDeleted() {
        this.__circlePosition.aboutToBeDeleted();
        this.__shadowColor.aboutToBeDeleted();
        this.__bottomBorderWidth.aboutToBeDeleted();
        this.__bottomBorderOpacity.aboutToBeDeleted();
        this.__borderColorOn.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private switchOn: boolean;
    private __circlePosition: ObservedPropertySimple<number>;
    get circlePosition() {
        return this.__circlePosition.get();
    }
    set circlePosition(newValue: number) {
        this.__circlePosition.set(newValue);
    }
    private __shadowColor: ObservedPropertySimple<string>;
    get shadowColor() {
        return this.__shadowColor.get();
    }
    set shadowColor(newValue: string) {
        this.__shadowColor.set(newValue);
    }
    private __bottomBorderWidth: ObservedPropertySimple<number>;
    get bottomBorderWidth() {
        return this.__bottomBorderWidth.get();
    }
    set bottomBorderWidth(newValue: number) {
        this.__bottomBorderWidth.set(newValue);
    }
    private __bottomBorderOpacity: ObservedPropertySimple<number>;
    get bottomBorderOpacity() {
        return this.__bottomBorderOpacity.get();
    }
    set bottomBorderOpacity(newValue: number) {
        this.__bottomBorderOpacity.set(newValue);
    }
    private __borderColorOn: ObservedPropertySimple<string>;
    get borderColorOn() {
        return this.__borderColorOn.get();
    }
    set borderColorOn(newValue: string) {
        this.__borderColorOn.set(newValue);
    }
    render() {
        Row.create();
        Row.margin(10);
        Row.width("95%");
        Row.borderWidth(1);
        Row.borderColor("#ffd6d6d6");
        Row.padding(20);
        Row.create();
        Row.markAnchor({
            x: 0,
            y: 0
        });
        Row.width(40);
        Row.height(25);
        Row.borderRadius(15);
        Row.borderWidth(1);
        Row.borderColor(this.borderColorOn);
        Row.shadow({
            radius: 10,
            color: this.shadowColor,
        });
        Row.onClick(() => {
            this.switchOn = !this.switchOn;
            this.shadowColor = "#ff3280fc";
            if (this.switchOn) {
                console.log("开关打开");
                this.borderColorOn = "#ff3280fc";
                this.shadowColor = "#ff3280fc";
                this.circlePosition = 15;
                this.bottomBorderWidth = 40;
                this.bottomBorderOpacity = 1;
            }
            else {
                console.log("开关关闭");
                this.borderColorOn = "#ffd6d6d6";
                this.shadowColor = "#ffffffff";
                this.circlePosition = 0;
                this.bottomBorderWidth = 0;
                this.bottomBorderOpacity = 0;
            }
        });
        Stack.create();
        Flex.create();
        Flex.create();
        Context.animation({
            duration: 200,
            curve: Curve.Smooth
        });
        Flex.backgroundColor("#ff007dff");
        Flex.width(this.bottomBorderWidth);
        Flex.height(24);
        Flex.borderRadius(11);
        Flex.opacity(this.bottomBorderOpacity);
        Context.animation(null);
        Flex.pop();
        Flex.pop();
        Circle.create();
        Context.animation({
            duration: 200,
            curve: Curve.Smooth
        });
        Circle.width(23);
        Circle.height(23);
        Circle.fill(Color.White);
        Circle.strokeWidth(1);
        Circle.stroke(this.borderColorOn);
        Circle.position({
            x: this.circlePosition,
            y: 0
        });
        Context.animation(null);
        Stack.pop();
        Row.pop();
        Blank.create();
        Blank.width("65%");
        Blank.pop();
        Text.create("夜间模式");
        Text.margin({ left: 5, right: 5 });
        Text.pop();
        Row.pop();
    }
}
export class Switch_inline extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.switchOn = false;
        this.__circlePosition = new ObservedPropertySimple(0, this, "circlePosition");
        this.__shadowColor = new ObservedPropertySimple("#ffffffff", this, "shadowColor");
        this.__bottomBorderWidth = new ObservedPropertySimple(0, this, "bottomBorderWidth");
        this.__bottomBorderOpacity = new ObservedPropertySimple(0, this, "bottomBorderOpacity");
        this.__borderColorOn = new ObservedPropertySimple("#ffd6d6d6", this, "borderColorOn");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Switch_inline_Params) {
        if (params.switchOn !== undefined) {
            this.switchOn = params.switchOn;
        }
        if (params.circlePosition !== undefined) {
            this.circlePosition = params.circlePosition;
        }
        if (params.shadowColor !== undefined) {
            this.shadowColor = params.shadowColor;
        }
        if (params.bottomBorderWidth !== undefined) {
            this.bottomBorderWidth = params.bottomBorderWidth;
        }
        if (params.bottomBorderOpacity !== undefined) {
            this.bottomBorderOpacity = params.bottomBorderOpacity;
        }
        if (params.borderColorOn !== undefined) {
            this.borderColorOn = params.borderColorOn;
        }
    }
    aboutToBeDeleted() {
        this.__circlePosition.aboutToBeDeleted();
        this.__shadowColor.aboutToBeDeleted();
        this.__bottomBorderWidth.aboutToBeDeleted();
        this.__bottomBorderOpacity.aboutToBeDeleted();
        this.__borderColorOn.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private switchOn: boolean;
    private __circlePosition: ObservedPropertySimple<number>;
    get circlePosition() {
        return this.__circlePosition.get();
    }
    set circlePosition(newValue: number) {
        this.__circlePosition.set(newValue);
    }
    private __shadowColor: ObservedPropertySimple<string>;
    get shadowColor() {
        return this.__shadowColor.get();
    }
    set shadowColor(newValue: string) {
        this.__shadowColor.set(newValue);
    }
    private __bottomBorderWidth: ObservedPropertySimple<number>;
    get bottomBorderWidth() {
        return this.__bottomBorderWidth.get();
    }
    set bottomBorderWidth(newValue: number) {
        this.__bottomBorderWidth.set(newValue);
    }
    private __bottomBorderOpacity: ObservedPropertySimple<number>;
    get bottomBorderOpacity() {
        return this.__bottomBorderOpacity.get();
    }
    set bottomBorderOpacity(newValue: number) {
        this.__bottomBorderOpacity.set(newValue);
    }
    private __borderColorOn: ObservedPropertySimple<string>;
    get borderColorOn() {
        return this.__borderColorOn.get();
    }
    set borderColorOn(newValue: string) {
        this.__borderColorOn.set(newValue);
    }
    render() {
        Row.create();
        Row.backgroundColor("#fffff0d5");
        Row.margin(10);
        Row.borderColor("#ffd6d6d6");
        Row.padding({ top: 5, bottom: 5 });
        Row.create();
        Row.markAnchor({
            x: 0,
            y: 0
        });
        Row.width(40);
        Row.height(25);
        Row.backgroundColor("#ffffffff");
        Row.borderRadius(15);
        Row.borderWidth(1);
        Row.borderColor(this.borderColorOn);
        Row.shadow({
            radius: 10,
            color: this.shadowColor,
        });
        Row.onClick(() => {
            this.switchOn = !this.switchOn;
            this.shadowColor = "#ff3280fc";
            if (this.switchOn) {
                console.log("开关打开");
                this.borderColorOn = "#ff3280fc";
                this.shadowColor = "#ff3280fc";
                this.circlePosition = 15;
                this.bottomBorderWidth = 40;
                this.bottomBorderOpacity = 1;
            }
            else {
                console.log("开关关闭");
                this.borderColorOn = "#ffd6d6d6";
                this.shadowColor = "#ffffffff";
                this.circlePosition = 0;
                this.bottomBorderWidth = 0;
                this.bottomBorderOpacity = 0;
            }
        });
        Stack.create();
        Flex.create();
        Flex.create();
        Context.animation({
            duration: 200,
            curve: Curve.Smooth
        });
        Flex.backgroundColor("#ff007dff");
        Flex.width(this.bottomBorderWidth);
        Flex.height(24);
        Flex.borderRadius(11);
        Flex.opacity(this.bottomBorderOpacity);
        Context.animation(null);
        Flex.pop();
        Flex.pop();
        Circle.create();
        Context.animation({
            duration: 200,
            curve: Curve.Smooth
        });
        Circle.width(23);
        Circle.height(23);
        Circle.fill(Color.White);
        Circle.strokeWidth(1);
        Circle.stroke(this.borderColorOn);
        Circle.position({
            x: this.circlePosition,
            y: 0
        });
        Context.animation(null);
        Stack.pop();
        Row.pop();
        Text.create("夜间模式");
        Text.margin({ left: 5, right: 5 });
        Text.pop();
        Row.pop();
    }
}
export class Switch_disable_on extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__circlePosition = new ObservedPropertySimple(15, this, "circlePosition");
        this.__shadowColor = new ObservedPropertySimple("#ffffffff", this, "shadowColor");
        this.__bottomBorderWidth = new ObservedPropertySimple(40, this, "bottomBorderWidth");
        this.__bottomBorderOpacity = new ObservedPropertySimple(1, this, "bottomBorderOpacity");
        this.__borderColorOn = new ObservedPropertySimple("#ffd6d6d6", this, "borderColorOn");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Switch_disable_on_Params) {
        if (params.circlePosition !== undefined) {
            this.circlePosition = params.circlePosition;
        }
        if (params.shadowColor !== undefined) {
            this.shadowColor = params.shadowColor;
        }
        if (params.bottomBorderWidth !== undefined) {
            this.bottomBorderWidth = params.bottomBorderWidth;
        }
        if (params.bottomBorderOpacity !== undefined) {
            this.bottomBorderOpacity = params.bottomBorderOpacity;
        }
        if (params.borderColorOn !== undefined) {
            this.borderColorOn = params.borderColorOn;
        }
    }
    aboutToBeDeleted() {
        this.__circlePosition.aboutToBeDeleted();
        this.__shadowColor.aboutToBeDeleted();
        this.__bottomBorderWidth.aboutToBeDeleted();
        this.__bottomBorderOpacity.aboutToBeDeleted();
        this.__borderColorOn.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __circlePosition: ObservedPropertySimple<number>;
    get circlePosition() {
        return this.__circlePosition.get();
    }
    set circlePosition(newValue: number) {
        this.__circlePosition.set(newValue);
    }
    private __shadowColor: ObservedPropertySimple<string>;
    get shadowColor() {
        return this.__shadowColor.get();
    }
    set shadowColor(newValue: string) {
        this.__shadowColor.set(newValue);
    }
    private __bottomBorderWidth: ObservedPropertySimple<number>;
    get bottomBorderWidth() {
        return this.__bottomBorderWidth.get();
    }
    set bottomBorderWidth(newValue: number) {
        this.__bottomBorderWidth.set(newValue);
    }
    private __bottomBorderOpacity: ObservedPropertySimple<number>;
    get bottomBorderOpacity() {
        return this.__bottomBorderOpacity.get();
    }
    set bottomBorderOpacity(newValue: number) {
        this.__bottomBorderOpacity.set(newValue);
    }
    private __borderColorOn: ObservedPropertySimple<string>;
    get borderColorOn() {
        return this.__borderColorOn.get();
    }
    set borderColorOn(newValue: string) {
        this.__borderColorOn.set(newValue);
    }
    render() {
        Row.create();
        Row.margin(10);
        Row.width("95%");
        Row.borderWidth(1);
        Row.borderColor("#ffd6d6d6");
        Row.padding(20);
        Row.create();
        Row.markAnchor({
            x: 0,
            y: 0
        });
        Row.width(40);
        Row.height(25);
        Row.borderRadius(15);
        Row.borderWidth(1);
        Row.borderColor(this.borderColorOn);
        Stack.create();
        Flex.create();
        Flex.create();
        Context.animation({
            duration: 200,
            curve: Curve.Smooth
        });
        Flex.backgroundColor("#ffcccccc");
        Flex.width(this.bottomBorderWidth);
        Flex.height(24);
        Flex.borderRadius(11);
        Flex.opacity(this.bottomBorderOpacity);
        Context.animation(null);
        Flex.pop();
        Flex.pop();
        Circle.create();
        Context.animation({
            duration: 200,
            curve: Curve.Smooth
        });
        Circle.width(23);
        Circle.height(23);
        Circle.fill("#fff0f0f0");
        Circle.strokeWidth(1);
        Circle.stroke(this.borderColorOn);
        Circle.position({
            x: this.circlePosition,
            y: 0
        });
        Context.animation(null);
        Stack.pop();
        Row.pop();
        Text.create("夜间模式");
        Text.margin({ left: 5, right: 5 });
        Text.fontColor("#ffdddddd");
        Text.pop();
        Row.pop();
    }
}
export class Switch_disable_off extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__circlePosition = new ObservedPropertySimple(0, this, "circlePosition");
        this.__shadowColor = new ObservedPropertySimple("#ffffffff", this, "shadowColor");
        this.__bottomBorderWidth = new ObservedPropertySimple(40, this, "bottomBorderWidth");
        this.__bottomBorderOpacity = new ObservedPropertySimple(0, this, "bottomBorderOpacity");
        this.__borderColorOn = new ObservedPropertySimple("#ffd6d6d6", this, "borderColorOn");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Switch_disable_off_Params) {
        if (params.circlePosition !== undefined) {
            this.circlePosition = params.circlePosition;
        }
        if (params.shadowColor !== undefined) {
            this.shadowColor = params.shadowColor;
        }
        if (params.bottomBorderWidth !== undefined) {
            this.bottomBorderWidth = params.bottomBorderWidth;
        }
        if (params.bottomBorderOpacity !== undefined) {
            this.bottomBorderOpacity = params.bottomBorderOpacity;
        }
        if (params.borderColorOn !== undefined) {
            this.borderColorOn = params.borderColorOn;
        }
    }
    aboutToBeDeleted() {
        this.__circlePosition.aboutToBeDeleted();
        this.__shadowColor.aboutToBeDeleted();
        this.__bottomBorderWidth.aboutToBeDeleted();
        this.__bottomBorderOpacity.aboutToBeDeleted();
        this.__borderColorOn.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __circlePosition: ObservedPropertySimple<number>;
    get circlePosition() {
        return this.__circlePosition.get();
    }
    set circlePosition(newValue: number) {
        this.__circlePosition.set(newValue);
    }
    private __shadowColor: ObservedPropertySimple<string>;
    get shadowColor() {
        return this.__shadowColor.get();
    }
    set shadowColor(newValue: string) {
        this.__shadowColor.set(newValue);
    }
    private __bottomBorderWidth: ObservedPropertySimple<number>;
    get bottomBorderWidth() {
        return this.__bottomBorderWidth.get();
    }
    set bottomBorderWidth(newValue: number) {
        this.__bottomBorderWidth.set(newValue);
    }
    private __bottomBorderOpacity: ObservedPropertySimple<number>;
    get bottomBorderOpacity() {
        return this.__bottomBorderOpacity.get();
    }
    set bottomBorderOpacity(newValue: number) {
        this.__bottomBorderOpacity.set(newValue);
    }
    private __borderColorOn: ObservedPropertySimple<string>;
    get borderColorOn() {
        return this.__borderColorOn.get();
    }
    set borderColorOn(newValue: string) {
        this.__borderColorOn.set(newValue);
    }
    render() {
        Row.create();
        Row.margin(10);
        Row.width("95%");
        Row.borderWidth(1);
        Row.borderColor("#ffd6d6d6");
        Row.padding(20);
        Row.create();
        Row.markAnchor({
            x: 0,
            y: 0
        });
        Row.width(40);
        Row.height(25);
        Row.borderRadius(15);
        Row.borderWidth(1);
        Row.borderColor(this.borderColorOn);
        Stack.create();
        Flex.create();
        Flex.create();
        Context.animation({
            duration: 200,
            curve: Curve.Smooth
        });
        Flex.backgroundColor("#ffcccccc");
        Flex.width(this.bottomBorderWidth);
        Flex.height(24);
        Flex.borderRadius(11);
        Flex.opacity(this.bottomBorderOpacity);
        Context.animation(null);
        Flex.pop();
        Flex.pop();
        Circle.create();
        Context.animation({
            duration: 200,
            curve: Curve.Smooth
        });
        Circle.width(23);
        Circle.height(23);
        Circle.fill("#fff0f0f0");
        Circle.strokeWidth(1);
        Circle.stroke(this.borderColorOn);
        Circle.position({
            x: this.circlePosition,
            y: 0
        });
        Context.animation(null);
        Stack.pop();
        Row.pop();
        Text.create("夜间模式");
        Text.margin({ left: 5, right: 5 });
        Text.fontColor("#ffdddddd");
        Text.pop();
        Row.pop();
    }
}
