interface Collapse_panel_Params {
    isCollapse_1?: boolean;
    isCollapse_2?: boolean;
    isCollapse_3?: boolean;
    collapseBorderHeight_1?: number;
    collapseBorderHeight_2?: number;
    collapseBorderHeight_3?: number;
}
interface Collapse_group_Params {
    isCollapse_1?: boolean;
    isCollapse_2?: boolean;
    isCollapse_3?: boolean;
    collapseBorderHeight_1?: number;
    collapseBorderHeight_2?: number;
    collapseBorderHeight_3?: number;
}
interface Collapse_Params {
    isCollapse?: boolean;
    collapseBorderHeight?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Collapse_" + ++__generate__Id;
}
export class Collapse extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.isCollapse = true;
        this.__collapseBorderHeight = new ObservedPropertySimple(0, this, "collapseBorderHeight");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Collapse_Params) {
        if (params.isCollapse !== undefined) {
            this.isCollapse = params.isCollapse;
        }
        if (params.collapseBorderHeight !== undefined) {
            this.collapseBorderHeight = params.collapseBorderHeight;
        }
    }
    aboutToBeDeleted() {
        this.__collapseBorderHeight.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private isCollapse: boolean;
    private __collapseBorderHeight: ObservedPropertySimple<number>;
    get collapseBorderHeight() {
        return this.__collapseBorderHeight.get();
    }
    set collapseBorderHeight(newValue: number) {
        this.__collapseBorderHeight.set(newValue);
    }
    render() {
        Column.create();
        Column.margin(10);
        Row.create();
        Row.alignSelf(ItemAlign.Start);
        Row.margin({ bottom: 5 });
        Button.createWithLabel("显示折叠内容");
        Button.type(ButtonType.Normal);
        Button.borderRadius(5);
        Button.backgroundColor("#ffe5e5e5");
        Button.fontColor(Color.Black);
        Button.onClick(() => {
            this.isCollapse = !this.isCollapse;
            if (this.isCollapse) {
                this.collapseBorderHeight = 0;
            }
            else {
                this.collapseBorderHeight = 80;
            }
        });
        Button.pop();
        Button.createWithLabel("显示折叠内容");
        Button.backgroundColor("#ffffffff");
        Button.borderRadius(5);
        Button.type(ButtonType.Normal);
        Button.fontColor("#ff145ccd");
        Button.margin({ left: 5 });
        Button.onClick(() => {
            this.isCollapse = !this.isCollapse;
            if (this.isCollapse) {
                this.collapseBorderHeight = 0;
            }
            else {
                this.collapseBorderHeight = 80;
            }
        });
        Button.pop();
        Row.pop();
        Column.create();
        Context.animation({
            duration: 200
        });
        Column.width("100%");
        Column.height(this.collapseBorderHeight);
        Column.backgroundColor("#ff0080ff");
        Context.animation(null);
        Column.alignItems(HorizontalAlign.Start);
        Text.create("被折叠元素内容。");
        Text.fontColor(Color.White);
        Text.fontSize(14);
        Text.margin({ top: 10, bottom: 5, left: 10 });
        Text.pop();
        Text.create("多个触发元素可以指向同一个折叠内容。");
        Text.fontColor(Color.White);
        Text.fontSize(14);
        Text.margin({ top: 10, bottom: 5, left: 10 });
        Text.pop();
        Column.pop();
        Column.pop();
    }
}
export class Collapse_group extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__isCollapse_1 = new ObservedPropertySimple(true, this, "isCollapse_1");
        this.__isCollapse_2 = new ObservedPropertySimple(true, this, "isCollapse_2");
        this.__isCollapse_3 = new ObservedPropertySimple(true, this, "isCollapse_3");
        this.__collapseBorderHeight_1 = new ObservedPropertySimple(0, this, "collapseBorderHeight_1");
        this.__collapseBorderHeight_2 = new ObservedPropertySimple(0, this, "collapseBorderHeight_2");
        this.__collapseBorderHeight_3 = new ObservedPropertySimple(0, this, "collapseBorderHeight_3");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Collapse_group_Params) {
        if (params.isCollapse_1 !== undefined) {
            this.isCollapse_1 = params.isCollapse_1;
        }
        if (params.isCollapse_2 !== undefined) {
            this.isCollapse_2 = params.isCollapse_2;
        }
        if (params.isCollapse_3 !== undefined) {
            this.isCollapse_3 = params.isCollapse_3;
        }
        if (params.collapseBorderHeight_1 !== undefined) {
            this.collapseBorderHeight_1 = params.collapseBorderHeight_1;
        }
        if (params.collapseBorderHeight_2 !== undefined) {
            this.collapseBorderHeight_2 = params.collapseBorderHeight_2;
        }
        if (params.collapseBorderHeight_3 !== undefined) {
            this.collapseBorderHeight_3 = params.collapseBorderHeight_3;
        }
    }
    aboutToBeDeleted() {
        this.__isCollapse_1.aboutToBeDeleted();
        this.__isCollapse_2.aboutToBeDeleted();
        this.__isCollapse_3.aboutToBeDeleted();
        this.__collapseBorderHeight_1.aboutToBeDeleted();
        this.__collapseBorderHeight_2.aboutToBeDeleted();
        this.__collapseBorderHeight_3.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __isCollapse_1: ObservedPropertySimple<boolean>;
    get isCollapse_1() {
        return this.__isCollapse_1.get();
    }
    set isCollapse_1(newValue: boolean) {
        this.__isCollapse_1.set(newValue);
    }
    private __isCollapse_2: ObservedPropertySimple<boolean>;
    get isCollapse_2() {
        return this.__isCollapse_2.get();
    }
    set isCollapse_2(newValue: boolean) {
        this.__isCollapse_2.set(newValue);
    }
    private __isCollapse_3: ObservedPropertySimple<boolean>;
    get isCollapse_3() {
        return this.__isCollapse_3.get();
    }
    set isCollapse_3(newValue: boolean) {
        this.__isCollapse_3.set(newValue);
    }
    private __collapseBorderHeight_1: ObservedPropertySimple<number>;
    get collapseBorderHeight_1() {
        return this.__collapseBorderHeight_1.get();
    }
    set collapseBorderHeight_1(newValue: number) {
        this.__collapseBorderHeight_1.set(newValue);
    }
    private __collapseBorderHeight_2: ObservedPropertySimple<number>;
    get collapseBorderHeight_2() {
        return this.__collapseBorderHeight_2.get();
    }
    set collapseBorderHeight_2(newValue: number) {
        this.__collapseBorderHeight_2.set(newValue);
    }
    private __collapseBorderHeight_3: ObservedPropertySimple<number>;
    get collapseBorderHeight_3() {
        return this.__collapseBorderHeight_3.get();
    }
    set collapseBorderHeight_3(newValue: number) {
        this.__collapseBorderHeight_3.set(newValue);
    }
    render() {
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Column.margin(10);
        Button.createWithLabel("折叠1");
        Button.type(ButtonType.Normal);
        Button.borderRadius(5);
        Button.backgroundColor(Color.White);
        Button.fontColor("#ff145ccd");
        Button.onClick(() => {
            this.isCollapse_1 = !this.isCollapse_1;
            if (this.isCollapse_1) {
                this.collapseBorderHeight_1 = 0;
            }
            else {
                this.collapseBorderHeight_1 = 80;
                this.isCollapse_2 = true;
                this.isCollapse_3 = true;
                this.collapseBorderHeight_2 = 0;
                this.collapseBorderHeight_3 = 0;
            }
        });
        Button.pop();
        Column.create();
        Context.animation({
            duration: 200
        });
        Column.width("100%");
        Column.height(this.collapseBorderHeight_1);
        Column.backgroundColor("#ff0080ff");
        Context.animation(null);
        Column.alignItems(HorizontalAlign.Start);
        Text.create("被折叠元素内容。");
        Text.fontColor(Color.White);
        Text.fontSize(14);
        Text.margin({ top: 10, bottom: 5, left: 10 });
        Text.pop();
        Text.create("多个触发元素可以指向同一个折叠内容。");
        Text.fontColor(Color.White);
        Text.fontSize(14);
        Text.margin({ top: 10, bottom: 5, left: 10 });
        Text.pop();
        Column.pop();
        Button.createWithLabel("折叠2");
        Button.type(ButtonType.Normal);
        Button.borderRadius(5);
        Button.backgroundColor(Color.White);
        Button.fontColor("#ff145ccd");
        Button.onClick(() => {
            this.isCollapse_2 = !this.isCollapse_2;
            if (this.isCollapse_2) {
                this.collapseBorderHeight_2 = 0;
            }
            else {
                this.collapseBorderHeight_2 = 80;
                this.isCollapse_1 = true;
                this.isCollapse_3 = true;
                this.collapseBorderHeight_1 = 0;
                this.collapseBorderHeight_3 = 0;
            }
        });
        Button.pop();
        Column.create();
        Context.animation({
            duration: 200
        });
        Column.width("100%");
        Column.height(this.collapseBorderHeight_2);
        Column.backgroundColor("#ff38b03f");
        Context.animation(null);
        Column.alignItems(HorizontalAlign.Start);
        Text.create("被折叠元素内容。");
        Text.fontColor(Color.White);
        Text.fontSize(14);
        Text.margin({ top: 10, bottom: 5, left: 10 });
        Text.pop();
        Text.create("多个触发元素可以指向同一个折叠内容。");
        Text.fontColor(Color.White);
        Text.fontSize(14);
        Text.margin({ top: 10, bottom: 5, left: 10 });
        Text.pop();
        Column.pop();
        Button.createWithLabel("折叠3");
        Button.type(ButtonType.Normal);
        Button.borderRadius(5);
        Button.backgroundColor(Color.White);
        Button.fontColor("#ff145ccd");
        Button.onClick(() => {
            this.isCollapse_3 = !this.isCollapse_3;
            if (this.isCollapse_3) {
                this.collapseBorderHeight_3 = 0;
            }
            else {
                this.collapseBorderHeight_3 = 80;
                this.isCollapse_1 = true;
                this.isCollapse_2 = true;
                this.collapseBorderHeight_1 = 0;
                this.collapseBorderHeight_2 = 0;
            }
        });
        Button.pop();
        Column.create();
        Context.animation({
            duration: 200
        });
        Column.width("100%");
        Column.height(this.collapseBorderHeight_3);
        Column.backgroundColor("#ffea644a");
        Context.animation(null);
        Column.alignItems(HorizontalAlign.Start);
        Text.create("被折叠元素内容。");
        Text.fontColor(Color.White);
        Text.fontSize(14);
        Text.margin({ top: 10, bottom: 5, left: 10 });
        Text.pop();
        Text.create("多个触发元素可以指向同一个折叠内容。");
        Text.fontColor(Color.White);
        Text.fontSize(14);
        Text.margin({ top: 10, bottom: 5, left: 10 });
        Text.pop();
        Column.pop();
        Column.pop();
    }
}
export class Collapse_panel extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__isCollapse_1 = new ObservedPropertySimple(true, this, "isCollapse_1");
        this.__isCollapse_2 = new ObservedPropertySimple(true, this, "isCollapse_2");
        this.__isCollapse_3 = new ObservedPropertySimple(true, this, "isCollapse_3");
        this.__collapseBorderHeight_1 = new ObservedPropertySimple(0, this, "collapseBorderHeight_1");
        this.__collapseBorderHeight_2 = new ObservedPropertySimple(0, this, "collapseBorderHeight_2");
        this.__collapseBorderHeight_3 = new ObservedPropertySimple(0, this, "collapseBorderHeight_3");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Collapse_panel_Params) {
        if (params.isCollapse_1 !== undefined) {
            this.isCollapse_1 = params.isCollapse_1;
        }
        if (params.isCollapse_2 !== undefined) {
            this.isCollapse_2 = params.isCollapse_2;
        }
        if (params.isCollapse_3 !== undefined) {
            this.isCollapse_3 = params.isCollapse_3;
        }
        if (params.collapseBorderHeight_1 !== undefined) {
            this.collapseBorderHeight_1 = params.collapseBorderHeight_1;
        }
        if (params.collapseBorderHeight_2 !== undefined) {
            this.collapseBorderHeight_2 = params.collapseBorderHeight_2;
        }
        if (params.collapseBorderHeight_3 !== undefined) {
            this.collapseBorderHeight_3 = params.collapseBorderHeight_3;
        }
    }
    aboutToBeDeleted() {
        this.__isCollapse_1.aboutToBeDeleted();
        this.__isCollapse_2.aboutToBeDeleted();
        this.__isCollapse_3.aboutToBeDeleted();
        this.__collapseBorderHeight_1.aboutToBeDeleted();
        this.__collapseBorderHeight_2.aboutToBeDeleted();
        this.__collapseBorderHeight_3.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __isCollapse_1: ObservedPropertySimple<boolean>;
    get isCollapse_1() {
        return this.__isCollapse_1.get();
    }
    set isCollapse_1(newValue: boolean) {
        this.__isCollapse_1.set(newValue);
    }
    private __isCollapse_2: ObservedPropertySimple<boolean>;
    get isCollapse_2() {
        return this.__isCollapse_2.get();
    }
    set isCollapse_2(newValue: boolean) {
        this.__isCollapse_2.set(newValue);
    }
    private __isCollapse_3: ObservedPropertySimple<boolean>;
    get isCollapse_3() {
        return this.__isCollapse_3.get();
    }
    set isCollapse_3(newValue: boolean) {
        this.__isCollapse_3.set(newValue);
    }
    private __collapseBorderHeight_1: ObservedPropertySimple<number>;
    get collapseBorderHeight_1() {
        return this.__collapseBorderHeight_1.get();
    }
    set collapseBorderHeight_1(newValue: number) {
        this.__collapseBorderHeight_1.set(newValue);
    }
    private __collapseBorderHeight_2: ObservedPropertySimple<number>;
    get collapseBorderHeight_2() {
        return this.__collapseBorderHeight_2.get();
    }
    set collapseBorderHeight_2(newValue: number) {
        this.__collapseBorderHeight_2.set(newValue);
    }
    private __collapseBorderHeight_3: ObservedPropertySimple<number>;
    get collapseBorderHeight_3() {
        return this.__collapseBorderHeight_3.get();
    }
    set collapseBorderHeight_3(newValue: number) {
        this.__collapseBorderHeight_3.set(newValue);
    }
    render() {
        Column.create();
        Column.margin(10);
        Column.create();
        Column.shadow({
            radius: 5,
            color: "#ff000000",
            offsetX: -5,
            offsetY: 5
        });
        Column.borderWidth(1);
        Column.borderRadius(5);
        Column.margin({ bottom: 10 });
        Text.create("折叠面板1");
        Text.fontSize(16);
        Text.fontWeight(FontWeight.Bold);
        Text.width('100%');
        Text.padding({ left: 10, top: 5, bottom: 5 });
        Text.backgroundColor("#ffeae8e8");
        Text.onClick(() => {
            this.isCollapse_1 = !this.isCollapse_1;
            if (this.isCollapse_1) {
                this.collapseBorderHeight_1 = 0;
            }
            else {
                this.collapseBorderHeight_1 = 60;
                this.isCollapse_2 = true;
                this.isCollapse_3 = true;
                this.collapseBorderHeight_2 = 0;
                this.collapseBorderHeight_3 = 0;
            }
        });
        Text.pop();
        Column.create();
        Context.animation({
            duration: 200
        });
        Column.width("100%");
        Column.height(this.collapseBorderHeight_1);
        Column.backgroundColor("#ffffffff");
        Context.animation(null);
        Text.create("被折叠元素内容1。");
        Text.fontSize(14);
        Text.margin({ top: 10, bottom: 5, left: 10 });
        Text.alignSelf(ItemAlign.Start);
        Text.pop();
        Column.pop();
        Column.pop();
        Column.create();
        Column.shadow({
            radius: 5,
            color: "#ff000000",
            offsetX: -5,
            offsetY: 5
        });
        Column.borderWidth(1);
        Column.borderRadius(5);
        Column.margin({ bottom: 10 });
        Text.create("折叠面板2");
        Text.fontSize(16);
        Text.fontWeight(FontWeight.Bold);
        Text.width('100%');
        Text.padding({ left: 10, top: 5, bottom: 5 });
        Text.backgroundColor("#ffeae8e8");
        Text.onClick(() => {
            this.isCollapse_2 = !this.isCollapse_2;
            if (this.isCollapse_2) {
                this.collapseBorderHeight_2 = 0;
            }
            else {
                this.collapseBorderHeight_2 = 60;
                this.isCollapse_1 = true;
                this.isCollapse_3 = true;
                this.collapseBorderHeight_1 = 0;
                this.collapseBorderHeight_3 = 0;
            }
        });
        Text.pop();
        Column.create();
        Context.animation({
            duration: 200
        });
        Column.width("100%");
        Column.height(this.collapseBorderHeight_2);
        Column.backgroundColor("#ffffffff");
        Context.animation(null);
        Text.create("被折叠元素内容2。");
        Text.fontSize(14);
        Text.margin({ top: 10, bottom: 5, left: 10 });
        Text.alignSelf(ItemAlign.Start);
        Text.pop();
        Column.pop();
        Column.pop();
        Column.create();
        Column.shadow({
            radius: 5,
            color: "#ff000000",
            offsetX: -5,
            offsetY: 5
        });
        Column.borderWidth(1);
        Column.borderRadius(5);
        Column.margin({ bottom: 10 });
        Text.create("折叠面板3");
        Text.fontSize(16);
        Text.fontWeight(FontWeight.Bold);
        Text.width('100%');
        Text.padding({ left: 10, top: 5, bottom: 5 });
        Text.backgroundColor("#ffeae8e8");
        Text.onClick(() => {
            this.isCollapse_3 = !this.isCollapse_3;
            if (this.isCollapse_3) {
                this.collapseBorderHeight_3 = 0;
            }
            else {
                this.collapseBorderHeight_3 = 60;
                this.isCollapse_1 = true;
                this.isCollapse_2 = true;
                this.collapseBorderHeight_1 = 0;
                this.collapseBorderHeight_2 = 0;
            }
        });
        Text.pop();
        Column.create();
        Context.animation({
            duration: 200
        });
        Column.width("100%");
        Column.height(this.collapseBorderHeight_3);
        Column.backgroundColor("#ffffffff");
        Context.animation(null);
        Text.create("被折叠元素内容3。");
        Text.fontSize(14);
        Text.margin({ top: 10, bottom: 5, left: 10 });
        Text.alignSelf(ItemAlign.Start);
        Text.pop();
        Column.pop();
        Column.pop();
        Column.pop();
    }
}
