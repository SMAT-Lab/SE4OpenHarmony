interface NavBar_Params {
    title?: string;
    leftText?: string;
    rightText?: string;
    hasLeftArrow?: boolean;
    leftClickEvent?: () => void //左边按钮点击事件
    ;
    rightClickEvent?: () => void //右边按钮点击事件
    ;
    rightIcon?: string;
    leftClickBgColor?: string;
    rightClickBgColor?: string;
    leftClicked?: boolean;
    rightClicked?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "NavBar_" + ++__generate__Id;
}
export class NavBar extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.title = "标题" //标题
        ;
        this.leftText = "返回" //左边按钮文本
        ;
        this.rightText = "按钮" //右边按钮文本
        ;
        this.hasLeftArrow = true //是否有左箭头
        ;
        this.leftClickEvent = undefined;
        this.rightClickEvent = undefined;
        this.rightIcon = "" //右边图标
        ;
        this.__leftClickBgColor = new ObservedPropertySimple("#ffffffff" //左边文本点击后背景颜色改变
        , this, "leftClickBgColor");
        this.__rightClickBgColor = new ObservedPropertySimple("#ffffffff" //右边文本点击后背景颜色改变
        , this, "rightClickBgColor");
        this.__leftClicked = new SynchedPropertySimpleTwoWay(params.leftClicked, this, "leftClicked");
        this.__rightClicked = new SynchedPropertySimpleTwoWay(params.rightClicked, this, "rightClicked");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: NavBar_Params) {
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.leftText !== undefined) {
            this.leftText = params.leftText;
        }
        if (params.rightText !== undefined) {
            this.rightText = params.rightText;
        }
        if (params.hasLeftArrow !== undefined) {
            this.hasLeftArrow = params.hasLeftArrow;
        }
        if (params.leftClickEvent !== undefined) {
            this.leftClickEvent = params.leftClickEvent;
        }
        if (params.rightClickEvent !== undefined) {
            this.rightClickEvent = params.rightClickEvent;
        }
        if (params.rightIcon !== undefined) {
            this.rightIcon = params.rightIcon;
        }
        if (params.leftClickBgColor !== undefined) {
            this.leftClickBgColor = params.leftClickBgColor;
        }
        if (params.rightClickBgColor !== undefined) {
            this.rightClickBgColor = params.rightClickBgColor;
        }
    }
    aboutToBeDeleted() {
        this.__leftClickBgColor.aboutToBeDeleted();
        this.__rightClickBgColor.aboutToBeDeleted();
        this.__leftClicked.aboutToBeDeleted();
        this.__rightClicked.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private title: string; //标题
    private leftText: string; //左边按钮文本
    private rightText: string; //右边按钮文本
    private hasLeftArrow: boolean; //是否有左箭头
    private leftClickEvent: () => void; //左边按钮点击事件
    private rightClickEvent: () => void; //右边按钮点击事件
    private rightIcon: string; //右边图标
    private __leftClickBgColor: ObservedPropertySimple<string>; //左边文本点击后背景颜色改变
    get leftClickBgColor() {
        return this.__leftClickBgColor.get();
    }
    set leftClickBgColor(newValue: string) {
        this.__leftClickBgColor.set(newValue);
    }
    private __rightClickBgColor: ObservedPropertySimple<string>; //右边文本点击后背景颜色改变
    get rightClickBgColor() {
        return this.__rightClickBgColor.get();
    }
    set rightClickBgColor(newValue: string) {
        this.__rightClickBgColor.set(newValue);
    }
    private __leftClicked: SynchedPropertySimpleTwoWay<boolean>;
    get leftClicked() {
        return this.__leftClicked.get();
    }
    set leftClicked(newValue: boolean) {
        this.__leftClicked.set(newValue);
    }
    private __rightClicked: SynchedPropertySimpleTwoWay<boolean>;
    get rightClicked() {
        return this.__rightClicked.get();
    }
    set rightClicked(newValue: boolean) {
        this.__rightClicked.set(newValue);
    }
    render() {
        Row.create();
        Row.height(60);
        Row.width("100%");
        Row.backgroundColor("#ffffffff");
        Column.create();
        Context.animation({ duration: 100 });
        Column.layoutWeight(1);
        Column.height("100%");
        Column.backgroundColor(this.leftClickBgColor);
        Column.onClick(() => {
            this.leftClicked = !this.leftClicked; //左边触发点击，传回父页面
            this.leftClickEvent();
            this.leftClickBgColor = "#ffc3c3c3";
            setTimeout(() => {
                this.leftClickBgColor = "#ffffffff";
            }, 100);
        });
        Context.animation(null);
        Row.create();
        Row.height("100%");
        If.create();
        if (this.hasLeftArrow) {
            If.branchId(0);
            Column.create();
            Column.layoutWeight(1);
            Image.create({ "id": 0, "type": 30000, params: ["NavBar_leftArrow.png"] });
            Image.width(20);
            Image.height(20);
            Image.alignSelf(ItemAlign.End);
            Column.pop();
        }
        If.pop();
        Column.create();
        Column.layoutWeight(1);
        Text.create(this.leftText);
        Text.fontColor("#ff2c93fa");
        Text.alignSelf(ItemAlign.Start);
        Text.pop();
        Column.pop();
        Row.pop();
        Column.pop();
        Column.create();
        Column.layoutWeight(4);
        Column.height("100%");
        Text.create(this.title);
        Text.fontSize(18);
        Text.height("100%");
        Text.pop();
        Column.pop();
        Column.create();
        Context.animation({ duration: 100 });
        Column.layoutWeight(1);
        Column.height("100%");
        Column.backgroundColor(this.rightClickBgColor);
        Context.animation(null);
        Stack.create();
        Text.create(this.rightText);
        Text.height("100%");
        Text.fontColor("#ff2c93fa");
        Text.onClick(() => {
            this.rightClicked = !this.rightClicked; //右边触发点击，传回父页面
            this.rightClickEvent();
            this.rightClickBgColor = "#ffc3c3c3";
            setTimeout(() => {
                this.rightClickBgColor = "#ffffffff";
            }, 100);
        });
        Text.pop();
        If.create();
        if (this.rightIcon !== "") {
            If.branchId(0);
            Column.create();
            Column.width("100%");
            Column.backgroundColor("#ffffffff");
            Row.create();
            Row.height("100%");
            Image.create($rawfile(this.rightIcon));
            Image.height(25);
            Image.width(25);
            Row.pop();
            Column.pop();
        }
        If.pop();
        Stack.pop();
        Column.pop();
        Row.pop();
    }
}
