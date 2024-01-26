interface Popup_right_Params {
    right_visibility?: Visibility;
    right_visibility_1?: Visibility;
}
interface Popup_top_Params {
    top_visibility?: Visibility;
}
interface Popup_bottom_Params {
    bottom_visibility?: Visibility;
    cities?: string[];
}
interface Popup_default_Params {
    comp_w?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Popup_" + ++__generate__Id;
}
export class Popup_default extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__comp_w = new SynchedPropertySimpleTwoWay(params.comp_w, this, "comp_w");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Popup_default_Params) {
    }
    aboutToBeDeleted() {
        this.__comp_w.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    // @Link default_visibility: Visibility;
    private __comp_w: SynchedPropertySimpleTwoWay<string>;
    get comp_w() {
        return this.__comp_w.get();
    }
    set comp_w(newValue: string) {
        this.__comp_w.set(newValue);
    }
    render() {
        Column.create();
        Column.width(this.comp_w);
        Column.height("100%");
        Stack.create();
        Stack.height("100%");
        Stack.width("100%");
        Text.create();
        Text.height("140%");
        Text.width("100%");
        Text.backgroundColor(Color.Black);
        Text.opacity(0.6);
        Text.position({ x: 0, y: "-40%" });
        Text.onClick(() => {
            // this.default_visibility = Visibility.Hidden;
            this.comp_w = "0%";
        });
        Text.pop();
        Text.create("内容");
        Text.height("10%");
        Text.width("40%");
        Text.textAlign(TextAlign.Center);
        Text.backgroundColor(Color.White);
        Text.position({ x: "30%", y: "0%" });
        Text.pop();
        Stack.pop();
        Column.pop();
    }
}
export class Popup_bottom extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__bottom_visibility = new SynchedPropertySimpleTwoWay(params.bottom_visibility, this, "bottom_visibility");
        this.__cities = new ObservedPropertyObject(["杭州", "宁波", "温州", "嘉兴", "湖州"], this, "cities");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Popup_bottom_Params) {
        if (params.cities !== undefined) {
            this.cities = params.cities;
        }
    }
    aboutToBeDeleted() {
        this.__bottom_visibility.aboutToBeDeleted();
        this.__cities.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __bottom_visibility: SynchedPropertySimpleTwoWay<Visibility>;
    get bottom_visibility() {
        return this.__bottom_visibility.get();
    }
    set bottom_visibility(newValue: Visibility) {
        this.__bottom_visibility.set(newValue);
    }
    private __cities: ObservedPropertyObject<string[]>;
    get cities() {
        return this.__cities.get();
    }
    set cities(newValue: string[]) {
        this.__cities.set(newValue);
    }
    render() {
        Column.create();
        Column.height("100%");
        Column.width("100%");
        Column.position({ x: 0, y: 0 });
        Column.onAppear(() => {
            console.log(this.cities + "");
        });
        Column.visibility(this.bottom_visibility);
        Stack.create();
        Stack.height("100%");
        Stack.width("100%");
        Text.create();
        Text.height("100%");
        Text.width("100%");
        Text.backgroundColor(Color.Black);
        Text.opacity(0.6);
        Text.onClick(() => {
            this.bottom_visibility = Visibility.Hidden;
        });
        Text.pop();
        Stack.create();
        Stack.position({ y: "60%" });
        Text.create();
        Text.width("100%");
        Text.height("40%");
        Text.backgroundColor(Color.White);
        Text.pop();
        Column.create();
        Row.create();
        Row.width("100%");
        Text.create("取消");
        Text.width("100");
        Text.height("50");
        Text.fontSize(20);
        Text.fontColor(Color.Blue);
        Text.layoutWeight(2);
        Text.margin({ left: 20 });
        Text.onClick(() => {
            this.bottom_visibility = Visibility.Hidden;
        });
        Text.pop();
        Text.create();
        Text.height("50");
        Text.layoutWeight(10);
        Text.pop();
        Text.create("确认");
        Text.width("100");
        Text.height("50");
        Text.fontColor(Color.Blue);
        Text.fontSize(20);
        Text.layoutWeight(2);
        Text.onClick(() => {
            this.bottom_visibility = Visibility.Hidden;
        });
        Text.pop();
        Row.pop();
        TextPicker.create({ range: this.cities, selected: 0 });
        TextPicker.pop();
        Column.pop();
        Stack.pop();
        Stack.pop();
        Column.pop();
    }
}
export class Popup_top extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__top_visibility = new SynchedPropertySimpleTwoWay(params.top_visibility, this, "top_visibility");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Popup_top_Params) {
    }
    aboutToBeDeleted() {
        this.__top_visibility.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __top_visibility: SynchedPropertySimpleTwoWay<Visibility>;
    get top_visibility() {
        return this.__top_visibility.get();
    }
    set top_visibility(newValue: Visibility) {
        this.__top_visibility.set(newValue);
    }
    render() {
        Column.create();
        Column.height("12%");
        Column.width("100%");
        Column.position({ x: 0 });
        Column.visibility(this.top_visibility);
        Stack.create();
        Stack.height("100%");
        Stack.width("100%");
        Text.create();
        Text.height("140%");
        Text.width("100%");
        Text.backgroundColor(Color.Black);
        Text.opacity(0.7);
        Text.position({ x: 0, y: "-40%" });
        Text.onClick(() => {
            this.top_visibility = Visibility.Hidden;
        });
        Text.pop();
        Text.create("内容");
        Text.height("60%");
        Text.width("40%");
        Text.fontSize(30);
        Text.fontColor(Color.White);
        Text.textAlign(TextAlign.Center);
        Text.position({ x: "-10%", y: "15%" });
        Text.pop();
        Stack.pop();
        Column.pop();
    }
}
export class Popup_right extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__right_visibility = new SynchedPropertySimpleTwoWay(params.right_visibility, this, "right_visibility");
        this.__right_visibility_1 = new ObservedPropertySimple(Visibility.Hidden, this, "right_visibility_1");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Popup_right_Params) {
        if (params.right_visibility_1 !== undefined) {
            this.right_visibility_1 = params.right_visibility_1;
        }
    }
    aboutToBeDeleted() {
        this.__right_visibility.aboutToBeDeleted();
        this.__right_visibility_1.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __right_visibility: SynchedPropertySimpleTwoWay<Visibility>;
    get right_visibility() {
        return this.__right_visibility.get();
    }
    set right_visibility(newValue: Visibility) {
        this.__right_visibility.set(newValue);
    }
    private __right_visibility_1: ObservedPropertySimple<Visibility>;
    get right_visibility_1() {
        return this.__right_visibility_1.get();
    }
    set right_visibility_1(newValue: Visibility) {
        this.__right_visibility_1.set(newValue);
    }
    render() {
        Column.create();
        Column.height("100%");
        Column.width("100%");
        Column.position({ x: 0 });
        Column.visibility(this.right_visibility);
        Stack.create();
        Stack.height("100%");
        Stack.width("100%");
        Text.create();
        Text.height("140%");
        Text.width("100%");
        Text.backgroundColor(Color.White);
        Text.position({ x: 0, y: "-40%" });
        Text.pop();
        Row.create();
        Row.width("100%");
        Row.height("20%");
        Row.position({ x: 0, y: 0 });
        Button.createWithLabel("关闭弹层");
        Button.type(ButtonType.Normal);
        Button.height("60%");
        Button.width("30%");
        Button.margin({ left: "10%" });
        Button.backgroundColor(Color.White);
        Button.fontSize(25);
        Button.fontColor(Color.Black);
        Button.shadow({ radius: 5 });
        Button.onClick(() => {
            this.right_visibility = Visibility.Hidden;
        });
        Button.pop();
        Button.createWithLabel("右侧弹出");
        Button.type(ButtonType.Normal);
        Button.height("60%");
        Button.width("30%");
        Button.margin({ left: "10%" });
        Button.backgroundColor(Color.White);
        Button.fontSize(25);
        Button.fontColor(Color.Black);
        Button.shadow({ radius: 5 });
        Button.onClick(() => {
            this.right_visibility_1 = Visibility.Visible;
        });
        Button.pop();
        Row.pop();
        Column.create();
        Column.height("100%");
        Column.width("100%");
        Column.visibility(this.right_visibility_1);
        Text.create();
        Text.height("140%");
        Text.width("100%");
        Text.backgroundColor(Color.White);
        Text.position({ x: 0, y: "-40%" });
        Text.pop();
        Button.createWithLabel("关闭弹层");
        Button.type(ButtonType.Normal);
        Button.height("10%");
        Button.width("30%");
        Button.backgroundColor(Color.White);
        Button.fontSize(25);
        Button.fontColor(Color.Black);
        Button.shadow({ radius: 5 });
        Button.position({ x: "10%", y: "6%" });
        Button.onClick(() => {
            this.right_visibility_1 = Visibility.Hidden;
        });
        Button.pop();
        Column.pop();
        Stack.pop();
        Column.pop();
    }
}
