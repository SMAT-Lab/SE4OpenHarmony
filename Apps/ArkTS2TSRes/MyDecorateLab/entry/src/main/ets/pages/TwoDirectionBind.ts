interface grandsComponent_Params {
    grandsValue?: number;
}
interface sComponent_Params {
    sValue?: number;
}
interface Index_Params {
    frValue?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TwoDirectionBind_" + ++__generate__Id;
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__frValue = new ObservedPropertySimple(0, this, "frValue");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.frValue !== undefined) {
            this.frValue = params.frValue;
        }
    }
    aboutToBeDeleted() {
        this.__frValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    // 表示组件中的状态变量，这个状态变量会引起UI变更
    private __frValue: ObservedPropertySimple<number>;
    get frValue() {
        return this.__frValue.get();
    }
    set frValue(newValue: number) {
        this.__frValue.set(newValue);
    }
    render() {
        Column.create();
        Column.backgroundColor(0x1e90ff);
        Column.height('100%');
        Column.width('100%');
        Text.create('双向绑定222222');
        Text.fontSize(20);
        Text.fontWeight(700);
        __Text__textStyle();
        Text.pop();
        Text.create('父组件值:' + this.frValue);
        __Text__textStyle();
        Text.pop();
        Row.create();
        Button.createWithLabel('+', { type: ButtonType.Normal });
        Button.backgroundColor(0xff1493);
        __Button__butStyle();
        Button.onClick(() => {
            this.frValue++;
        });
        Button.pop();
        Button.createWithLabel('-', { type: ButtonType.Normal });
        Button.backgroundColor(0xff1493);
        __Button__butStyle();
        Button.onClick(() => {
            this.frValue--;
        });
        Button.pop();
        Row.pop();
        let earlierCreatedChild_2: sComponent = (this && this.findChildById) ? this.findChildById("2") as sComponent : undefined;
        if (earlierCreatedChild_2 == undefined) {
            //   应用子组件
            View.create(new sComponent("2", this, { sValue: this.__frValue })); //父传子
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
        Row.create();
        Navigator.create({ target: 'pages/Index', type: NavigationType.Back });
        //   按钮
        Button.createWithLabel('Back', { type: ButtonType.Capsule });
        //   按钮
        Button.backgroundColor(0x7ffd4);
        __Button__butStyle();
        //   按钮
        Button.fontColor(0x696969);
        //   按钮
        Button.margin({ top: 20 });
        //   按钮
        Button.pop();
        Navigator.pop();
        Navigator.create({ target: 'pages/EasyMixBind', type: NavigationType.Push });
        //   按钮
        Button.createWithLabel('Next', { type: ButtonType.Capsule });
        //   按钮
        Button.backgroundColor(0x7ffd4);
        __Button__butStyle();
        //   按钮
        Button.fontColor(0x696969);
        //   按钮
        Button.margin({ top: 20 });
        //   按钮
        Button.pop();
        Navigator.pop();
        Row.pop();
        Column.pop();
    }
}
class sComponent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__sValue = new SynchedPropertySimpleTwoWay(params.sValue, this, "sValue");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: sComponent_Params) {
    }
    aboutToBeDeleted() {
        this.__sValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    // 在子组件中用@Prop组件装饰传递变量
    private __sValue: SynchedPropertySimpleTwoWay<number>;
    get sValue() {
        return this.__sValue.get();
    }
    set sValue(newValue: number) {
        this.__sValue.set(newValue);
    }
    render() {
        Column.create();
        Column.backgroundColor(0x00BFF);
        Column.width('80%');
        Column.height("60%");
        Column.margin({ top: 30 });
        Text.create('子组件值：' + this.sValue);
        __Text__textStyle();
        Text.pop();
        Row.create();
        Button.createWithLabel('+', { type: ButtonType.Normal });
        Button.backgroundColor(0xff6984);
        __Button__butStyle();
        Button.onClick(() => {
            this.sValue++;
        });
        Button.pop();
        Button.createWithLabel('-', { type: ButtonType.Normal });
        Button.backgroundColor(0xff6984);
        __Button__butStyle();
        Button.onClick(() => {
            this.sValue--;
        });
        Button.pop();
        Row.pop();
        let earlierCreatedChild_3: grandsComponent = (this && this.findChildById) ? this.findChildById("3") as grandsComponent : undefined;
        if (earlierCreatedChild_3 == undefined) {
            // .justifyContent(FlexAlign.SpaceBetween)
            //   调用孙组件
            // 当用到@Prop组件，调用父数据用this，当用到@Link组件，调用父数据用$
            View.create(new grandsComponent("3", this, { grandsValue: this.__sValue }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({});
            View.create(earlierCreatedChild_3);
        }
        Column.pop();
    }
}
class grandsComponent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__grandsValue = new SynchedPropertySimpleTwoWay(params.grandsValue, this, "grandsValue");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: grandsComponent_Params) {
    }
    aboutToBeDeleted() {
        this.__grandsValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __grandsValue: SynchedPropertySimpleTwoWay<number>;
    get grandsValue() {
        return this.__grandsValue.get();
    }
    set grandsValue(newValue: number) {
        this.__grandsValue.set(newValue);
    }
    render() {
        Column.create();
        Column.backgroundColor(0x87cefa);
        Column.width('80%');
        Column.height('45%');
        Column.margin({ top: 30 });
        Text.create('孙组件的值：' + this.grandsValue);
        __Text__textStyle();
        Text.margin({ top: 30, bottom: 30 });
        Text.pop();
        Row.create();
        Button.createWithLabel('+', { type: ButtonType.Normal });
        Button.backgroundColor(0xffc0cb);
        __Button__butStyle();
        Button.onClick(() => {
            this.grandsValue++;
        });
        Button.pop();
        Button.createWithLabel('-', { type: ButtonType.Normal });
        Button.backgroundColor(0xffc0cb);
        __Button__butStyle();
        Button.onClick(() => {
            this.grandsValue--;
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
function __Text__textStyle(): void {
    Text.fontColor(0xffffff);
    Text.margin({ top: 5, bottom: 10 });
    Text.fontSize(30);
    Text.fontWeight(1000);
}
function __Button__butStyle(): void {
    Button.borderRadius(8);
    Button.width(90);
    Button.margin({
        // left:40,
        right: 30
    });
}
loadDocument(new Index("1", undefined, {}));
