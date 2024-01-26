interface WatchBind_Params {
    Num?: number;
    Num2?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "WatchBind_" + ++__generate__Id;
}
class WatchBind extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__Num = new ObservedPropertySimple(0, this, "Num");
        this.__Num2 = new ObservedPropertySimple(0
        // Watch监听的状态变量一发生改变，就会调用它此函数
        , this, "Num2");
        this.updateWithValueParams(params);
        this.declareWatch("Num", this.OnNumChange);
    }
    updateWithValueParams(params: WatchBind_Params) {
        if (params.Num !== undefined) {
            this.Num = params.Num;
        }
        if (params.Num2 !== undefined) {
            this.Num2 = params.Num2;
        }
    }
    aboutToBeDeleted() {
        this.__Num.aboutToBeDeleted();
        this.__Num2.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __Num: ObservedPropertySimple<number>;
    get Num() {
        return this.__Num.get();
    }
    set Num(newValue: number) {
        this.__Num.set(newValue);
    }
    private __Num2: ObservedPropertySimple<number>;
    get Num2() {
        return this.__Num2.get();
    }
    set Num2(newValue: number) {
        this.__Num2.set(newValue);
    }
    // Watch监听的状态变量一发生改变，就会调用它此函数
    OnNumChange() {
        this.Num2 += 2;
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor(0x1e90ff);
        Text.create("@Watch的使用6666");
        __Text__textform1();
        Text.pop();
        Row.create();
        Text.create('Num=' + this.Num);
        __Text__textform1();
        Text.margin({ right: 40 });
        Text.pop();
        Text.create('Num2=' + this.Num2);
        __Text__textform1();
        Text.pop();
        Row.pop();
        Divider.create();
        Divider.vertical(false);
        Divider.strokeWidth(5);
        Divider.color(0xffffff);
        Button.createWithLabel('Num+1');
        __Button__but1form1();
        Button.onClick(() => {
            this.Num++;
        });
        Button.pop();
        Divider.create();
        Divider.vertical(false);
        Divider.strokeWidth(5);
        Divider.color(0xffffff);
        Navigator.create({ target: "pages/proConsumeDate", type: NavigationType.Back });
        Button.createWithLabel('Back');
        __Button__but1form1();
        Button.pop();
        Navigator.pop();
        Navigator.create({ target: "pages/DynamicBindDemo", type: NavigationType.Push });
        Button.createWithLabel('Next');
        __Button__but1form1();
        Button.pop();
        Navigator.pop();
        Column.pop();
    }
}
function __Text__textform1(): void {
    Text.fontSize(20);
    Text.fontColor(0xffffff);
    Text.fontWeight(700);
    Text.margin({ top: 10, bottom: 10 });
}
function __Button__but1form1(): void {
    Button.backgroundColor(0xff1493);
    Button.width(220);
    Button.margin({ top: 30, bottom: 30 });
}
loadDocument(new WatchBind("1", undefined, {}));
