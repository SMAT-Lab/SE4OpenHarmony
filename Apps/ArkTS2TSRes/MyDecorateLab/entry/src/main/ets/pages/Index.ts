interface grandsonComponent_Params {
    grandsonValue?: number;
}
interface sonComponent_Params {
    sonValue?: number;
}
interface TwoDirectionBind_Params {
    fatherValue?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
class TwoDirectionBind extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__fatherValue = new ObservedPropertySimple(0, this, "fatherValue");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TwoDirectionBind_Params) {
        if (params.fatherValue !== undefined) {
            this.fatherValue = params.fatherValue;
        }
    }
    aboutToBeDeleted() {
        this.__fatherValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    // 表示组件中的状态变量，这个状态变量会引起UI变更
    private __fatherValue: ObservedPropertySimple<number>;
    get fatherValue() {
        return this.__fatherValue.get();
    }
    set fatherValue(newValue: number) {
        this.__fatherValue.set(newValue);
    }
    render() {
        Column.create();
        Column.backgroundColor(0x1e90ff);
        Column.height('100%');
        Column.width('100%');
        Text.create('单向绑定1111111');
        Text.fontSize(20);
        Text.fontWeight(700);
        __Text__tStyle();
        Text.pop();
        Text.create('父组件值:' + this.fatherValue);
        __Text__tStyle();
        Text.pop();
        Row.create();
        Button.createWithLabel('+', { type: ButtonType.Normal });
        Button.backgroundColor(0xff1493);
        __Button__bStyle();
        Button.onClick(() => {
            this.fatherValue++;
        });
        Button.pop();
        Button.createWithLabel('-', { type: ButtonType.Normal });
        Button.backgroundColor(0xff1493);
        __Button__bStyle();
        Button.onClick(() => {
            this.fatherValue--;
        });
        Button.pop();
        Row.pop();
        let earlierCreatedChild_2: sonComponent = (this && this.findChildById) ? this.findChildById("2") as sonComponent : undefined;
        if (earlierCreatedChild_2 == undefined) {
            //   应用子组件
            View.create(new sonComponent("2", this, { sonValue: this.fatherValue })); //父传子
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                sonValue: this.fatherValue
            });
            View.create(earlierCreatedChild_2);
        }
        //   实现页面跳转
        Navigator.create({ target: "pages/TwoDirectionBind", type: NavigationType.Push });
        //   按钮
        Button.createWithLabel('Next', { type: ButtonType.Capsule });
        //   按钮
        Button.backgroundColor(0x7ffd4);
        __Button__bStyle();
        //   按钮
        Button.fontColor(0x696969);
        //   按钮
        Button.margin({ top: 20 });
        //   按钮
        Button.pop();
        //   实现页面跳转
        Navigator.pop();
        Column.pop();
    }
}
class sonComponent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__sonValue = new SynchedPropertySimpleOneWay(params.sonValue, this, "sonValue");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: sonComponent_Params) {
        this.sonValue = params.sonValue;
    }
    aboutToBeDeleted() {
        this.__sonValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    // 在子组件中用@Prop组件装饰传递变量
    private __sonValue: SynchedPropertySimpleOneWay<number>;
    get sonValue() {
        return this.__sonValue.get();
    }
    set sonValue(newValue: number) {
        this.__sonValue.set(newValue);
    }
    render() {
        Column.create();
        Column.backgroundColor(0x00BFF);
        Column.width('80%');
        Column.height("60%");
        Column.margin({ top: 30 });
        Text.create('子组件值：' + this.sonValue);
        __Text__tStyle();
        Text.pop();
        Row.create();
        Button.createWithLabel('+', { type: ButtonType.Normal });
        Button.backgroundColor(0xff6984);
        __Button__bStyle();
        Button.onClick(() => {
            this.sonValue++;
        });
        Button.pop();
        Button.createWithLabel('-', { type: ButtonType.Normal });
        Button.backgroundColor(0xff6984);
        __Button__bStyle();
        Button.onClick(() => {
            this.sonValue--;
        });
        Button.pop();
        Row.pop();
        let earlierCreatedChild_3: grandsonComponent = (this && this.findChildById) ? this.findChildById("3") as grandsonComponent : undefined;
        if (earlierCreatedChild_3 == undefined) {
            // .justifyContent(FlexAlign.SpaceBetween)
            //   调用孙组件
            View.create(new grandsonComponent("3", this, { grandsonValue: this.sonValue }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                grandsonValue: this.sonValue
            });
            View.create(earlierCreatedChild_3);
        }
        Column.pop();
    }
}
class grandsonComponent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__grandsonValue = new SynchedPropertySimpleOneWay(params.grandsonValue, this, "grandsonValue");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: grandsonComponent_Params) {
        this.grandsonValue = params.grandsonValue;
    }
    aboutToBeDeleted() {
        this.__grandsonValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __grandsonValue: SynchedPropertySimpleOneWay<number>;
    get grandsonValue() {
        return this.__grandsonValue.get();
    }
    set grandsonValue(newValue: number) {
        this.__grandsonValue.set(newValue);
    }
    render() {
        Column.create();
        Column.backgroundColor(0x87cefa);
        Column.width('80%');
        Column.height('45%');
        Column.margin({ top: 30 });
        Text.create('孙组件的值：' + this.grandsonValue);
        __Text__tStyle();
        Text.margin({ top: 30, bottom: 30 });
        Text.pop();
        Row.create();
        Button.createWithLabel('+', { type: ButtonType.Normal });
        Button.backgroundColor(0xffc0cb);
        __Button__bStyle();
        Button.onClick(() => {
            this.grandsonValue++;
        });
        Button.pop();
        Button.createWithLabel('-', { type: ButtonType.Normal });
        Button.backgroundColor(0xffc0cb);
        __Button__bStyle();
        Button.onClick(() => {
            this.grandsonValue--;
        });
        Button.pop();
        Row.pop();
        Column.pop();
    }
}
//自定义组件，
// 可组合、可重用、具有生命周期、数据驱动更新
// 数据驱动更新：由状态变量的数据驱动，实现UI的自动更新，
// 也就是说，当我当前的自定义组件内容发生改变时，它会返回通知调用它的build重新构建
/*
@Component
struct myComponent{
  build(){
    Column(){
      Text('自定义组件1111')
    }
  }
}*/
function __Text__tStyle(): void {
    Text.fontColor(0xffffff);
    Text.margin({ top: 5, bottom: 10 });
    Text.fontSize(30);
    Text.fontWeight(1000);
}
function __Button__bStyle(): void {
    Button.borderRadius(8);
    Button.width(90);
    Button.margin({
        // left:40,
        right: 30
    });
}
loadDocument(new TwoDirectionBind("1", undefined, {}));
