interface Button_color_danger_Params {
    buttonName?: string;
}
interface Button_color_warn_Params {
    buttonName?: string;
}
interface Button_color_success_Params {
    buttonName?: string;
}
interface Button_color_info_Params {
    buttonName?: string;
}
interface Button_color_main_Params {
    buttonName?: string;
}
interface Button_color_default_Params {
    buttonName?: string;
}
interface Button_state_disable_grey_Params {
    buttonName?: string;
}
interface Button_state_disable_blue_Params {
    buttonName?: string;
}
interface Button_state_loading_Params {
    buttonName?: string;
    textContent?: string;
    btnColor?: string;
}
interface Button_state_singleSelect_Params {
    buttonName_1?: string;
    buttonName_2?: string;
    buttonName_3?: string;
    btnColor_1?: string;
    btnColor_2?: string;
    btnColor_3?: string;
    isClick_1?: boolean;
    isClick_2?: boolean;
    isClick_3?: boolean;
}
interface Button_state_multSelect_Params {
    buttonName_1?: string;
    buttonName_2?: string;
    buttonName_3?: string;
    btnColor_1?: string;
    btnColor_2?: string;
    btnColor_3?: string;
    isClick_1?: boolean;
    isClick_2?: boolean;
    isClick_3?: boolean;
}
interface Button_state_stateSwitching_Params {
    buttonName?: string;
    btnColor?: string;
    isClick?: Boolean;
}
interface Button_state_withIcon_Params {
    buttonName?: string;
    imgName?: string;
}
interface Button_size_block_grey_Params {
    buttonName?: string;
}
interface Button_size_block_blue_Params {
    buttonName?: string;
}
interface Button_size_tiny_grey_Params {
    buttonName?: string;
}
interface Button_size_tiny_blue_Params {
    buttonName?: string;
}
interface Button_size_small_grey_Params {
    buttonName?: string;
}
interface Button_size_small_blue_Params {
    buttonName?: string;
}
interface Button_size_big_grey_Params {
    buttonName?: string;
}
interface Button_size_big_blue_Params {
    buttonName?: string;
}
interface Button_type_group_Params {
    buttonName_1?: string;
    buttonName_2?: string;
    buttonName_3?: string;
}
interface Button_type_link_Params {
    buttonName?: string;
}
interface Button_type_normal_Params {
    buttonName?: string;
}
interface Button_type_main_Params {
    buttonName?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Button_" + ++__generate__Id;
}
export class Button_type_main extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.buttonName = "主要按钮";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Button_type_main_Params) {
        if (params.buttonName !== undefined) {
            this.buttonName = params.buttonName;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private buttonName: string;
    render() {
        Flex.create();
        Button.createWithLabel(this.buttonName);
        Button.borderRadius(10);
        Button.shadow({
            radius: 5,
            color: Color.Black,
            offsetX: -2,
            offsetY: -2
        });
        Button.type(ButtonType.Normal);
        Button.onClick(() => {
            console.log(`点击了${this.buttonName}`);
        });
        Button.pop();
        Flex.pop();
    }
}
export class Button_type_normal extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.buttonName = "标准按钮";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Button_type_normal_Params) {
        if (params.buttonName !== undefined) {
            this.buttonName = params.buttonName;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private buttonName: string;
    render() {
        Flex.create();
        Button.createWithLabel(this.buttonName);
        Button.borderRadius(10);
        Button.shadow({
            radius: 5,
            color: Color.Black,
            offsetX: -2,
            offsetY: -2
        });
        Button.type(ButtonType.Normal);
        Button.backgroundColor("#ffe1e1e1");
        Button.fontColor("#ff353535");
        Button.onClick(() => {
            console.log(`点击了${this.buttonName}`);
        });
        Button.pop();
        Flex.pop();
    }
}
export class Button_type_link extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.buttonName = "链接按钮";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Button_type_link_Params) {
        if (params.buttonName !== undefined) {
            this.buttonName = params.buttonName;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private buttonName: string;
    render() {
        Flex.create();
        Button.createWithLabel(this.buttonName);
        Button.borderRadius(10);
        Button.shadow({
            radius: 5,
            color: Color.Black,
            offsetX: -2,
            offsetY: -2
        });
        Button.type(ButtonType.Normal);
        Button.backgroundColor("#ffffffff");
        Button.fontColor("#ff0a8fec");
        Button.onClick(() => {
            console.log(`点击了${this.buttonName}`);
        });
        Button.pop();
        Flex.pop();
    }
}
export class Button_type_group extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.buttonName_1 = "按钮组";
        this.buttonName_2 = "第二个";
        this.buttonName_3 = "第三个";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Button_type_group_Params) {
        if (params.buttonName_1 !== undefined) {
            this.buttonName_1 = params.buttonName_1;
        }
        if (params.buttonName_2 !== undefined) {
            this.buttonName_2 = params.buttonName_2;
        }
        if (params.buttonName_3 !== undefined) {
            this.buttonName_3 = params.buttonName_3;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private buttonName_1: string;
    private buttonName_2: string;
    private buttonName_3: string;
    render() {
        Flex.create();
        Row.create();
        Row.borderRadius(10);
        Row.shadow({
            radius: 5,
            color: Color.Black,
            offsetX: -2,
            offsetY: -2
        });
        Row.height(40);
        Row.backgroundColor("");
        Row.backgroundColor("#ffe1e1e1");
        Row.borderWidth(1);
        Row.borderColor("#ffe1e1e1");
        Button.createWithLabel(this.buttonName_1);
        Button.type(ButtonType.Normal);
        Button.backgroundColor("#ffe1e1e1");
        Button.fontColor("#ff353535");
        Button.borderRadius(5);
        Button.height(40);
        Button.onClick(() => {
            console.log(`点击了${this.buttonName_1}`);
        });
        Button.pop();
        Divider.create();
        Divider.vertical(true);
        Divider.strokeWidth(1);
        Divider.color('#ff353535');
        Button.createWithLabel(this.buttonName_2);
        Button.type(ButtonType.Normal);
        Button.backgroundColor("#ffe1e1e1");
        Button.fontColor("#ff353535");
        Button.height(40);
        Button.onClick(() => {
            console.log(`点击了${this.buttonName_2}`);
        });
        Button.pop();
        Divider.create();
        Divider.vertical(true);
        Divider.strokeWidth(1);
        Divider.color('#ff353535');
        Button.createWithLabel(this.buttonName_3);
        Button.type(ButtonType.Normal);
        Button.borderRadius(5);
        Button.backgroundColor("#ffe1e1e1");
        Button.fontColor("#ff353535");
        Button.height(40);
        Button.onClick(() => {
            console.log(`点击了${this.buttonName_3}`);
        });
        Button.pop();
        Row.pop();
        Flex.pop();
    }
}
export class Button_size_big_blue extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.buttonName = "大尺寸按钮";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Button_size_big_blue_Params) {
        if (params.buttonName !== undefined) {
            this.buttonName = params.buttonName;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    //  @State btnHeight:number=60
    private buttonName: string;
    render() {
        Flex.create();
        Button.createWithLabel(this.buttonName);
        Button.borderRadius(10);
        Button.shadow({
            radius: 5,
            color: Color.Black,
            offsetX: -2,
            offsetY: -2
        });
        Button.type(ButtonType.Normal);
        Button.height(60);
        Button.fontSize(20);
        Button.onClick(() => {
            console.log(`点击了${this.buttonName}`);
        });
        Button.pop();
        Flex.pop();
    }
}
export class Button_size_big_grey extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.buttonName = "大尺寸按钮";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Button_size_big_grey_Params) {
        if (params.buttonName !== undefined) {
            this.buttonName = params.buttonName;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private buttonName: string;
    render() {
        Flex.create();
        Button.createWithLabel(this.buttonName);
        Button.borderRadius(10);
        Button.shadow({
            radius: 5,
            color: Color.Black,
            offsetX: -2,
            offsetY: -2
        });
        Button.type(ButtonType.Normal);
        Button.height(60);
        Button.fontSize(20);
        Button.fontColor("#ff353535");
        Button.backgroundColor("#ffe1e1e1");
        Button.onClick(() => {
            console.log(`点击了${this.buttonName}`);
        });
        Button.pop();
        Flex.pop();
    }
}
export class Button_size_small_blue extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.buttonName = "较小按钮";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Button_size_small_blue_Params) {
        if (params.buttonName !== undefined) {
            this.buttonName = params.buttonName;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private buttonName: string;
    render() {
        Flex.create();
        Button.createWithLabel(this.buttonName);
        Button.borderRadius(10);
        Button.shadow({
            radius: 5,
            color: Color.Black,
            offsetX: -2,
            offsetY: -2
        });
        Button.borderRadius(5);
        Button.type(ButtonType.Normal);
        Button.fontSize(14);
        Button.height(30);
        Button.onClick(() => {
            console.log(`点击了${this.buttonName}`);
        });
        Button.pop();
        Flex.pop();
    }
}
export class Button_size_small_grey extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.buttonName = "较小按钮";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Button_size_small_grey_Params) {
        if (params.buttonName !== undefined) {
            this.buttonName = params.buttonName;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private buttonName: string;
    render() {
        Flex.create();
        Button.createWithLabel(this.buttonName);
        Button.borderRadius(10);
        Button.shadow({
            radius: 5,
            color: Color.Black,
            offsetX: -2,
            offsetY: -2
        });
        Button.borderRadius(5);
        Button.type(ButtonType.Normal);
        Button.fontSize(14);
        Button.height(30);
        Button.fontColor("#ff353535");
        Button.backgroundColor("#ffe1e1e1");
        Button.onClick(() => {
            console.log(`点击了${this.buttonName}`);
        });
        Button.pop();
        Flex.pop();
    }
}
export class Button_size_tiny_blue extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.buttonName = "迷你按钮";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Button_size_tiny_blue_Params) {
        if (params.buttonName !== undefined) {
            this.buttonName = params.buttonName;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private buttonName: string;
    render() {
        Flex.create();
        Button.createWithLabel(this.buttonName);
        Button.borderRadius(10);
        Button.shadow({
            radius: 5,
            color: Color.Black,
            offsetX: -2,
            offsetY: -2
        });
        Button.borderRadius(5);
        Button.type(ButtonType.Normal);
        Button.fontSize(10);
        Button.height(20);
        Button.onClick(() => {
            console.log(`点击了${this.buttonName}`);
        });
        Button.pop();
        Flex.pop();
    }
}
export class Button_size_tiny_grey extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.buttonName = "迷你按钮";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Button_size_tiny_grey_Params) {
        if (params.buttonName !== undefined) {
            this.buttonName = params.buttonName;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private buttonName: string;
    render() {
        Flex.create();
        Button.createWithLabel(this.buttonName);
        Button.borderRadius(10);
        Button.shadow({
            radius: 5,
            color: Color.Black,
            offsetX: -2,
            offsetY: -2
        });
        Button.borderRadius(5);
        Button.type(ButtonType.Normal);
        Button.fontSize(10);
        Button.height(20);
        Button.fontColor("#ff353535");
        Button.backgroundColor("#ffe1e1e1");
        Button.onClick(() => {
            console.log(`点击了${this.buttonName}`);
        });
        Button.pop();
        Flex.pop();
    }
}
export class Button_size_block_blue extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.buttonName = "块状按钮";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Button_size_block_blue_Params) {
        if (params.buttonName !== undefined) {
            this.buttonName = params.buttonName;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private buttonName: string;
    render() {
        Flex.create();
        Button.createWithLabel(this.buttonName);
        Button.borderRadius(10);
        Button.shadow({
            radius: 5,
            color: Color.Black,
            offsetX: -2,
            offsetY: -2
        });
        Button.type(ButtonType.Normal);
        Button.width("100%");
        Button.onClick(() => {
            console.log(`点击了${this.buttonName}`);
        });
        Button.pop();
        Flex.pop();
    }
}
export class Button_size_block_grey extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.buttonName = "块状按钮";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Button_size_block_grey_Params) {
        if (params.buttonName !== undefined) {
            this.buttonName = params.buttonName;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private buttonName: string;
    render() {
        Flex.create();
        Button.createWithLabel(this.buttonName);
        Button.borderRadius(10);
        Button.shadow({
            radius: 5,
            color: Color.Black,
            offsetX: -2,
            offsetY: -2
        });
        Button.type(ButtonType.Normal);
        Button.width("100%");
        Button.fontColor("#ff353535");
        Button.backgroundColor("#ffe1e1e1");
        Button.onClick(() => {
            console.log(`点击了${this.buttonName}`);
        });
        Button.pop();
        Flex.pop();
    }
}
export class Button_state_withIcon extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.buttonName = "带图标的按钮";
        this.imgName = "Alert_warning2.png";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Button_state_withIcon_Params) {
        if (params.buttonName !== undefined) {
            this.buttonName = params.buttonName;
        }
        if (params.imgName !== undefined) {
            this.imgName = params.imgName;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private buttonName: string;
    private imgName: string;
    render() {
        Flex.create();
        Button.createWithChild();
        Button.width(180);
        Button.height(50);
        Button.backgroundColor("#ffe1e1e1");
        Button.type(ButtonType.Normal);
        Button.borderRadius(10);
        Button.shadow({
            radius: 5,
            color: Color.Black,
            offsetX: -2,
            offsetY: -2
        });
        Button.onClick(() => {
            console.log(`点击了${this.buttonName}`);
        });
        Flex.create();
        Image.create($rawfile(this.imgName));
        Image.objectFit(ImageFit.Fill);
        Image.borderRadius(10);
        Image.width(40);
        Image.height(40);
        Image.margin({ left: 5 });
        Text.create("带图标的按钮");
        Text.fontSize(16);
        Text.margin({ left: 5 });
        Text.alignSelf(ItemAlign.Center);
        Text.pop();
        Flex.pop();
        Button.pop();
        Flex.pop();
    }
}
export class Button_state_stateSwitching extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.buttonName = "状态切换按钮";
        this.__btnColor = new ObservedPropertySimple("#ff0a58f6", this, "btnColor");
        this.isClick = false;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Button_state_stateSwitching_Params) {
        if (params.buttonName !== undefined) {
            this.buttonName = params.buttonName;
        }
        if (params.btnColor !== undefined) {
            this.btnColor = params.btnColor;
        }
        if (params.isClick !== undefined) {
            this.isClick = params.isClick;
        }
    }
    aboutToBeDeleted() {
        this.__btnColor.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private buttonName: string;
    private __btnColor: ObservedPropertySimple<string>;
    get btnColor() {
        return this.__btnColor.get();
    }
    set btnColor(newValue: string) {
        this.__btnColor.set(newValue);
    }
    private isClick: Boolean;
    render() {
        Flex.create();
        Button.createWithLabel(this.buttonName);
        Button.borderRadius(10);
        Button.shadow({
            radius: 5,
            color: Color.Black,
            offsetX: -2,
            offsetY: -2
        });
        Button.type(ButtonType.Normal);
        Button.backgroundColor(this.btnColor);
        Button.onClick(() => {
            this.isClick = !this.isClick;
            if (this.isClick) {
                this.btnColor = "#ff053183";
            }
            else {
                this.btnColor = "#ff0a58f6";
            }
            console.log(`点击了${this.buttonName}`);
        });
        Button.pop();
        Flex.pop();
    }
}
export class Button_state_multSelect extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.buttonName_1 = "多选1";
        this.buttonName_2 = "多选2";
        this.buttonName_3 = "多选3";
        this.__btnColor_1 = new ObservedPropertySimple("#ffe1e1e1", this, "btnColor_1");
        this.__btnColor_2 = new ObservedPropertySimple("#ffe1e1e1", this, "btnColor_2");
        this.__btnColor_3 = new ObservedPropertySimple("#ffe1e1e1", this, "btnColor_3");
        this.isClick_1 = false;
        this.isClick_2 = false;
        this.isClick_3 = false;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Button_state_multSelect_Params) {
        if (params.buttonName_1 !== undefined) {
            this.buttonName_1 = params.buttonName_1;
        }
        if (params.buttonName_2 !== undefined) {
            this.buttonName_2 = params.buttonName_2;
        }
        if (params.buttonName_3 !== undefined) {
            this.buttonName_3 = params.buttonName_3;
        }
        if (params.btnColor_1 !== undefined) {
            this.btnColor_1 = params.btnColor_1;
        }
        if (params.btnColor_2 !== undefined) {
            this.btnColor_2 = params.btnColor_2;
        }
        if (params.btnColor_3 !== undefined) {
            this.btnColor_3 = params.btnColor_3;
        }
        if (params.isClick_1 !== undefined) {
            this.isClick_1 = params.isClick_1;
        }
        if (params.isClick_2 !== undefined) {
            this.isClick_2 = params.isClick_2;
        }
        if (params.isClick_3 !== undefined) {
            this.isClick_3 = params.isClick_3;
        }
    }
    aboutToBeDeleted() {
        this.__btnColor_1.aboutToBeDeleted();
        this.__btnColor_2.aboutToBeDeleted();
        this.__btnColor_3.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private buttonName_1: string;
    private buttonName_2: string;
    private buttonName_3: string;
    private __btnColor_1: ObservedPropertySimple<string>;
    get btnColor_1() {
        return this.__btnColor_1.get();
    }
    set btnColor_1(newValue: string) {
        this.__btnColor_1.set(newValue);
    }
    private __btnColor_2: ObservedPropertySimple<string>;
    get btnColor_2() {
        return this.__btnColor_2.get();
    }
    set btnColor_2(newValue: string) {
        this.__btnColor_2.set(newValue);
    }
    private __btnColor_3: ObservedPropertySimple<string>;
    get btnColor_3() {
        return this.__btnColor_3.get();
    }
    set btnColor_3(newValue: string) {
        this.__btnColor_3.set(newValue);
    }
    private isClick_1: boolean;
    private isClick_2: boolean;
    private isClick_3: boolean;
    render() {
        Flex.create();
        Row.create();
        Row.borderRadius(10);
        Row.shadow({
            radius: 5,
            color: Color.Black,
            offsetX: -2,
            offsetY: -2
        });
        Row.height(40);
        Row.backgroundColor("#ffe1e1e1");
        Row.borderWidth(1);
        Row.borderColor("#ffe1e1e1");
        Button.createWithLabel(this.buttonName_1);
        Button.type(ButtonType.Normal);
        Button.borderRadius(5);
        Button.backgroundColor(this.btnColor_1);
        Button.fontColor("#ff353535");
        Button.height(40);
        Button.onClick(() => {
            console.log(`点击了${this.buttonName_1}`);
            this.isClick_1 = !this.isClick_1;
            if (this.isClick_1) {
                this.btnColor_1 = "#ff838383";
            }
            else {
                this.btnColor_1 = "#ffe1e1e1";
            }
        });
        Button.pop();
        Divider.create();
        Divider.vertical(true);
        Divider.strokeWidth(1);
        Divider.color('#ff353535');
        Button.createWithLabel(this.buttonName_2);
        Button.type(ButtonType.Normal);
        Button.backgroundColor(this.btnColor_2);
        Button.fontColor("#ff353535");
        Button.height(40);
        Button.onClick(() => {
            console.log(`点击了${this.buttonName_2}`);
            this.isClick_2 = !this.isClick_2;
            if (this.isClick_2) {
                this.btnColor_2 = "#ff838383";
            }
            else {
                this.btnColor_2 = "#ffe1e1e1";
            }
        });
        Button.pop();
        Divider.create();
        Divider.vertical(true);
        Divider.strokeWidth(1);
        Divider.color('#ff353535');
        Button.createWithLabel(this.buttonName_3);
        Button.type(ButtonType.Normal);
        Button.borderRadius(5);
        Button.backgroundColor(this.btnColor_3);
        Button.fontColor("#ff353535");
        Button.height(40);
        Button.onClick(() => {
            console.log(`点击了${this.buttonName_3}`);
            this.isClick_3 = !this.isClick_3;
            if (this.isClick_3) {
                this.btnColor_3 = "#ff838383";
            }
            else {
                this.btnColor_3 = "#ffe1e1e1";
            }
        });
        Button.pop();
        Row.pop();
        Flex.pop();
    }
}
export class Button_state_singleSelect extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.buttonName_1 = "单选1";
        this.buttonName_2 = "单选2";
        this.buttonName_3 = "单选3";
        this.__btnColor_1 = new ObservedPropertySimple("#ff0a58f6", this, "btnColor_1");
        this.__btnColor_2 = new ObservedPropertySimple("#ff0a58f6", this, "btnColor_2");
        this.__btnColor_3 = new ObservedPropertySimple("#ff0a58f6", this, "btnColor_3");
        this.isClick_1 = false;
        this.isClick_2 = false;
        this.isClick_3 = false;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Button_state_singleSelect_Params) {
        if (params.buttonName_1 !== undefined) {
            this.buttonName_1 = params.buttonName_1;
        }
        if (params.buttonName_2 !== undefined) {
            this.buttonName_2 = params.buttonName_2;
        }
        if (params.buttonName_3 !== undefined) {
            this.buttonName_3 = params.buttonName_3;
        }
        if (params.btnColor_1 !== undefined) {
            this.btnColor_1 = params.btnColor_1;
        }
        if (params.btnColor_2 !== undefined) {
            this.btnColor_2 = params.btnColor_2;
        }
        if (params.btnColor_3 !== undefined) {
            this.btnColor_3 = params.btnColor_3;
        }
        if (params.isClick_1 !== undefined) {
            this.isClick_1 = params.isClick_1;
        }
        if (params.isClick_2 !== undefined) {
            this.isClick_2 = params.isClick_2;
        }
        if (params.isClick_3 !== undefined) {
            this.isClick_3 = params.isClick_3;
        }
    }
    aboutToBeDeleted() {
        this.__btnColor_1.aboutToBeDeleted();
        this.__btnColor_2.aboutToBeDeleted();
        this.__btnColor_3.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private buttonName_1: string;
    private buttonName_2: string;
    private buttonName_3: string;
    private __btnColor_1: ObservedPropertySimple<string>;
    get btnColor_1() {
        return this.__btnColor_1.get();
    }
    set btnColor_1(newValue: string) {
        this.__btnColor_1.set(newValue);
    }
    private __btnColor_2: ObservedPropertySimple<string>;
    get btnColor_2() {
        return this.__btnColor_2.get();
    }
    set btnColor_2(newValue: string) {
        this.__btnColor_2.set(newValue);
    }
    private __btnColor_3: ObservedPropertySimple<string>;
    get btnColor_3() {
        return this.__btnColor_3.get();
    }
    set btnColor_3(newValue: string) {
        this.__btnColor_3.set(newValue);
    }
    private isClick_1: boolean;
    private isClick_2: boolean;
    private isClick_3: boolean;
    render() {
        Flex.create();
        Row.create();
        Row.borderRadius(10);
        Row.shadow({
            radius: 5,
            color: Color.Black,
            offsetX: -2,
            offsetY: -2
        });
        Row.height(40);
        Row.backgroundColor("#ff0a58f6");
        Row.borderWidth(1);
        Row.borderColor("#ffe1e1e1");
        Button.createWithLabel(this.buttonName_1);
        Button.type(ButtonType.Normal);
        Button.borderRadius(5);
        Button.backgroundColor(this.btnColor_1);
        Button.height(40);
        Button.onClick(() => {
            console.log(`点击了${this.buttonName_1}`);
            this.isClick_1 = !this.isClick_1;
            if (this.isClick_1) {
                this.btnColor_1 = "#ff053183";
                this.isClick_2 = false;
                this.btnColor_2 = "#ff0a58f6";
                this.isClick_3 = false;
                this.btnColor_3 = "#ff0a58f6";
            }
            else {
                this.isClick_1 = false;
                this.btnColor_1 = "#ff0a58f6";
            }
        });
        Button.pop();
        Divider.create();
        Divider.vertical(true);
        Divider.strokeWidth(1);
        Divider.color('#ff353535');
        Button.createWithLabel(this.buttonName_2);
        Button.type(ButtonType.Normal);
        Button.backgroundColor(this.btnColor_2);
        Button.height(40);
        Button.onClick(() => {
            console.log(`点击了${this.buttonName_2}`);
            this.isClick_2 = !this.isClick_2;
            if (this.isClick_2) {
                this.btnColor_2 = "#ff053183";
                this.isClick_1 = false;
                this.btnColor_1 = "#ff0a58f6";
                this.isClick_3 = false;
                this.btnColor_3 = "#ff0a58f6";
            }
            else {
                this.isClick_2 = false;
                this.btnColor_2 = "#ff0a58f6";
            }
        });
        Button.pop();
        Divider.create();
        Divider.vertical(true);
        Divider.strokeWidth(1);
        Divider.color('#ff353535');
        Button.createWithLabel(this.buttonName_3);
        Button.type(ButtonType.Normal);
        Button.borderRadius(5);
        Button.backgroundColor(this.btnColor_3);
        Button.height(40);
        Button.onClick(() => {
            console.log(`点击了${this.buttonName_3}`);
            this.isClick_3 = !this.isClick_3;
            if (this.isClick_3) {
                this.btnColor_3 = "#ff053183";
                this.isClick_1 = false;
                this.btnColor_1 = "#ff0a58f6";
                this.isClick_2 = false;
                this.btnColor_2 = "#ff0a58f6";
            }
            else {
                this.isClick_3 = false;
                this.btnColor_3 = "#ff0a58f6";
            }
        });
        Button.pop();
        Row.pop();
        Flex.pop();
    }
}
export class Button_state_loading extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.buttonName = "加载状态";
        this.__textContent = new ObservedPropertySimple("", this, "textContent");
        this.btnColor = "#ff0a58f6";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Button_state_loading_Params) {
        if (params.buttonName !== undefined) {
            this.buttonName = params.buttonName;
        }
        if (params.textContent !== undefined) {
            this.textContent = params.textContent;
        }
        if (params.btnColor !== undefined) {
            this.btnColor = params.btnColor;
        }
    }
    aboutToBeDeleted() {
        this.__textContent.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private buttonName: string;
    private __textContent: ObservedPropertySimple<string>;
    get textContent() {
        return this.__textContent.get();
    }
    set textContent(newValue: string) {
        this.__textContent.set(newValue);
    }
    private btnColor: string;
    aboutToAppear() {
        this.textContent = this.buttonName;
    }
    render() {
        Flex.create();
        Button.createWithLabel(this.textContent);
        Button.borderRadius(10);
        Button.shadow({
            radius: 5,
            color: Color.Black,
            offsetX: -2,
            offsetY: -2
        });
        Button.type(ButtonType.Normal);
        Button.backgroundColor(this.btnColor);
        Button.onClick(() => {
            console.log(`点击了${this.buttonName}`);
            this.textContent = `正在${this.buttonName.substr(0, this.buttonName.length - 2)}...`;
            this.btnColor = "#ff5bbeee";
            setTimeout(() => {
                this.textContent = this.buttonName;
                this.btnColor = "#ff0a58f6";
            }, 2000);
        });
        Button.pop();
        Flex.pop();
    }
}
export class Button_state_disable_blue extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.buttonName = "已禁用的操作";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Button_state_disable_blue_Params) {
        if (params.buttonName !== undefined) {
            this.buttonName = params.buttonName;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private buttonName: string;
    render() {
        Flex.create();
        Button.createWithLabel(this.buttonName);
        Button.borderRadius(10);
        Button.shadow({
            radius: 5,
            color: Color.Black,
            offsetX: -2,
            offsetY: -2
        });
        Button.type(ButtonType.Normal);
        Button.fontColor("#ffc8c8c8");
        Button.hitTestBehavior(HitTestMode.None);
        Button.pop();
        Flex.pop();
    }
}
export class Button_state_disable_grey extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.buttonName = "已禁用的操作";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Button_state_disable_grey_Params) {
        if (params.buttonName !== undefined) {
            this.buttonName = params.buttonName;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private buttonName: string;
    render() {
        Flex.create();
        Button.createWithLabel(this.buttonName);
        Button.borderRadius(10);
        Button.shadow({
            radius: 5,
            color: Color.Black,
            offsetX: -2,
            offsetY: -2
        });
        Button.type(ButtonType.Normal);
        Button.backgroundColor("#ffe1e1e1");
        Button.fontColor("#ffc8c8c8");
        Button.hitTestBehavior(HitTestMode.None);
        Button.pop();
        Flex.pop();
    }
}
export class Button_color_default extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.buttonName = "默认";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Button_color_default_Params) {
        if (params.buttonName !== undefined) {
            this.buttonName = params.buttonName;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private buttonName: string;
    render() {
        Flex.create();
        Button.createWithLabel(this.buttonName);
        Button.borderRadius(10);
        Button.shadow({
            radius: 5,
            color: Color.Black,
            offsetX: -2,
            offsetY: -2
        });
        Button.type(ButtonType.Normal);
        Button.fontColor("#ff353535");
        Button.backgroundColor("#ffe1e1e1");
        Button.onClick(() => {
            console.log(`点击了${this.buttonName}`);
        });
        Button.pop();
        Flex.pop();
    }
}
export class Button_color_main extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.buttonName = "主要";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Button_color_main_Params) {
        if (params.buttonName !== undefined) {
            this.buttonName = params.buttonName;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private buttonName: string;
    render() {
        Flex.create();
        Button.createWithLabel(this.buttonName);
        Button.borderRadius(10);
        Button.shadow({
            radius: 5,
            color: Color.Black,
            offsetX: -2,
            offsetY: -2
        });
        Button.type(ButtonType.Normal);
        Button.backgroundColor("#ff030fe5");
        Button.onClick(() => {
            console.log(`点击了${this.buttonName}`);
        });
        Button.pop();
        Flex.pop();
    }
}
export class Button_color_info extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.buttonName = "信息";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Button_color_info_Params) {
        if (params.buttonName !== undefined) {
            this.buttonName = params.buttonName;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private buttonName: string;
    render() {
        Flex.create();
        Button.createWithLabel("信息");
        Button.borderRadius(10);
        Button.shadow({
            radius: 5,
            color: Color.Black,
            offsetX: -2,
            offsetY: -2
        });
        Button.type(ButtonType.Normal);
        Button.backgroundColor("#ff03b8cf");
        Button.onClick(() => {
            console.log(`点击了${this.buttonName}`);
        });
        Button.pop();
        Flex.pop();
    }
}
export class Button_color_success extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.buttonName = "成功";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Button_color_success_Params) {
        if (params.buttonName !== undefined) {
            this.buttonName = params.buttonName;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private buttonName: string;
    render() {
        Button.createWithLabel(this.buttonName);
        Button.borderRadius(10);
        Button.shadow({
            radius: 5,
            color: Color.Black,
            offsetX: -2,
            offsetY: -2
        });
        Button.type(ButtonType.Normal);
        Button.fontColor("#ff353535");
        Button.backgroundColor("#ff38b03f");
        Button.onClick(() => {
            console.log(`点击了${this.buttonName}`);
        });
        Button.pop();
    }
}
export class Button_color_warn extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.buttonName = "警告";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Button_color_warn_Params) {
        if (params.buttonName !== undefined) {
            this.buttonName = params.buttonName;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private buttonName: string;
    render() {
        Flex.create();
        Button.createWithLabel(this.buttonName);
        Button.borderRadius(10);
        Button.shadow({
            radius: 5,
            color: Color.Black,
            offsetX: -2,
            offsetY: -2
        });
        Button.type(ButtonType.Normal);
        Button.fontColor("#ff353535");
        Button.backgroundColor("#fff1a325");
        Button.onClick(() => {
            console.log(`点击了${this.buttonName}`);
        });
        Button.pop();
        Flex.pop();
    }
}
export class Button_color_danger extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.buttonName = "危险";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Button_color_danger_Params) {
        if (params.buttonName !== undefined) {
            this.buttonName = params.buttonName;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private buttonName: string;
    render() {
        Flex.create();
        Button.createWithLabel(this.buttonName);
        Context.animation({
            duration: 200,
            curve: Curve.FastOutSlowIn
        });
        Button.borderRadius(10);
        Button.shadow({
            radius: 5,
            color: Color.Black,
            offsetX: -2,
            offsetY: -2
        });
        Button.type(ButtonType.Normal);
        Button.fontColor("#ff353535");
        Button.backgroundColor("#ffea654a");
        Context.animation(null);
        Button.onClick(() => {
            console.log(`点击了${this.buttonName}`);
        });
        Button.pop();
        Flex.pop();
    }
}
export default { Button_type_main, Button_type_normal, Button_type_link,
    Button_type_group, Button_size_big_blue, Button_size_big_grey, Button_size_small_blue,
    Button_size_small_grey, Button_size_tiny_blue, Button_size_tiny_grey,
    Button_size_block_blue, Button_size_block_grey, Button_state_withIcon, Button_state_stateSwitching,
    Button_state_multSelect, Button_state_singleSelect, Button_state_loading, Button_state_disable_blue, Button_state_disable_grey,
    Button_color_main, Button_color_info, Button_color_success, Button_color_danger, Button_color_warn };
