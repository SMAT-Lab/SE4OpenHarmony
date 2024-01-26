interface grandssComponent_Params {
    grandssValue?: number;
}
interface ssComponent_Params {
    ssValue?: number;
}
interface EasyMixBind_Params {
    // 表示组件中的状态变量，这个状态变量会引起UI变更
    // @State ffValue2:number= 0 //传递
    ffValue2?: number;
    ffValue?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "EasyMixBind_" + ++__generate__Id;
}
class EasyMixBind extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.ffValue2 = 0 //传递
        ;
        this.__ffValue = new ObservedPropertySimple(this.ffValue2 //绑定
        , this, "ffValue");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: EasyMixBind_Params) {
        if (params.ffValue2 !== undefined) {
            this.ffValue2 = params.ffValue2;
        }
        if (params.ffValue !== undefined) {
            this.ffValue = params.ffValue;
        }
    }
    aboutToBeDeleted() {
        this.__ffValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    // 表示组件中的状态变量，这个状态变量会引起UI变更
    // @State ffValue2:number= 0 //传递
    private ffValue2: number; //传递
    private __ffValue: ObservedPropertySimple<number>; //绑定
    get ffValue() {
        return this.__ffValue.get();
    }
    set ffValue(newValue: number) {
        this.__ffValue.set(newValue);
    }
    render() {
        Column.create();
        Column.backgroundColor(0x1e90ff);
        Column.height('100%');
        Column.width('100%');
        Text.create('复杂单+双向绑定333333');
        Text.fontSize(20);
        Text.fontWeight(700);
        __Text__ttStyle();
        Text.pop();
        Text.create('父组件值:' + this.ffValue);
        __Text__ttStyle();
        Text.pop();
        Row.create();
        Button.createWithLabel('+', { type: ButtonType.Normal });
        Button.backgroundColor(0xff1493);
        __Button__bb();
        Button.onClick(() => {
            this.ffValue++; //父组件展示
            this.ffValue2++; //传给子组件
            // console.log(this.ffValue2 + '')
        });
        Button.pop();
        Button.createWithLabel('-', { type: ButtonType.Normal });
        Button.backgroundColor(0xff1493);
        __Button__bb();
        Button.onClick(() => {
            this.ffValue--;
            this.ffValue2--;
        });
        Button.pop();
        Row.pop();
        let earlierCreatedChild_2: ssComponent = (this && this.findChildById) ? this.findChildById("2") as ssComponent : undefined;
        if (earlierCreatedChild_2 == undefined) {
            //   应用子组件
            // ssComponent({ fromFV:this.ffValue2}) //父传子
            View.create(new ssComponent("2", this, { ssValue: this.ffValue2 })); //父传子
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                ssValue: this.ffValue2
            });
            View.create(earlierCreatedChild_2);
        }
        //   实现页面跳转
        Row.create();
        Navigator.create({ target: "pages/TwoDirectionBind", type: NavigationType.Back });
        //   按钮
        Button.createWithLabel('Back', { type: ButtonType.Capsule });
        //   按钮
        Button.backgroundColor(0x7ffd4);
        __Button__bb();
        //   按钮
        Button.fontColor(0x696969);
        //   按钮
        Button.margin({ top: 20 });
        //   按钮
        Button.pop();
        Navigator.pop();
        Navigator.create({ target: "pages/ClassBind", type: NavigationType.Push });
        //   按钮
        Button.createWithLabel('Next', { type: ButtonType.Capsule });
        //   按钮
        Button.backgroundColor(0x7ffd4);
        __Button__bb();
        //   按钮
        Button.fontColor(0x696969);
        //   按钮
        Button.margin({ top: 20 });
        //   按钮
        Button.pop();
        Navigator.pop();
        //   实现页面跳转
        Row.pop();
        Column.pop();
    }
}
class ssComponent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__ssValue = new ObservedPropertySimple(0, this, "ssValue");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ssComponent_Params) {
        if (params.ssValue !== undefined) {
            this.ssValue = params.ssValue;
        }
    }
    aboutToBeDeleted() {
        this.__ssValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    // 在子组件中用@Prop组件装饰传递变量
    //   @Prop fromFV:number
    //  @State ssValue: number= this.fromFV
    private __ssValue: ObservedPropertySimple<number>;
    get ssValue() {
        return this.__ssValue.get();
    }
    set ssValue(newValue: number) {
        this.__ssValue.set(newValue);
    }
    render() {
        Column.create();
        Column.backgroundColor(0x00BFF);
        Column.width('80%');
        Column.height("60%");
        Column.margin({ top: 30 });
        Text.create('子组件值：' + this.ssValue);
        __Text__ttStyle();
        Text.onClick(() => {
            console.log('sscom' + this.ssValue);
        });
        Text.pop();
        Row.create();
        Button.createWithLabel('+', { type: ButtonType.Normal });
        Button.backgroundColor(0xff6984);
        __Button__bb();
        Button.onClick(() => {
            this.ssValue++;
            // this.fromFV++
        });
        Button.pop();
        Button.createWithLabel('-', { type: ButtonType.Normal });
        Button.backgroundColor(0xff6984);
        __Button__bb();
        Button.onClick(() => {
            this.ssValue--;
            // this.fromFV--
        });
        Button.pop();
        Row.pop();
        let earlierCreatedChild_3: grandssComponent = (this && this.findChildById) ? this.findChildById("3") as grandssComponent : undefined;
        if (earlierCreatedChild_3 == undefined) {
            // .justifyContent(FlexAlign.SpaceBetween)
            //   调用孙组件
            View.create(new grandssComponent("3", this, { grandssValue: this.__ssValue }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({});
            View.create(earlierCreatedChild_3);
        }
        Column.pop();
    }
}
class grandssComponent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__grandssValue = new SynchedPropertySimpleTwoWay(params.grandssValue, this, "grandssValue");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: grandssComponent_Params) {
    }
    aboutToBeDeleted() {
        this.__grandssValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __grandssValue: SynchedPropertySimpleTwoWay<number>;
    get grandssValue() {
        return this.__grandssValue.get();
    }
    set grandssValue(newValue: number) {
        this.__grandssValue.set(newValue);
    }
    render() {
        Column.create();
        Column.backgroundColor(0x87cefa);
        Column.width('80%');
        Column.height('45%');
        Column.margin({ top: 30 });
        Text.create('孙组件的值：' + this.grandssValue);
        __Text__ttStyle();
        Text.margin({ top: 30, bottom: 30 });
        Text.pop();
        Row.create();
        Button.createWithLabel('+', { type: ButtonType.Normal });
        Button.backgroundColor(0xffc0cb);
        __Button__bb();
        Button.onClick(() => {
            this.grandssValue++;
        });
        Button.pop();
        Button.createWithLabel('-', { type: ButtonType.Normal });
        Button.backgroundColor(0xffc0cb);
        __Button__bb();
        Button.onClick(() => {
            this.grandssValue--;
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
function __Text__ttStyle(): void {
    Text.fontColor(0xffffff);
    Text.margin({ top: 5, bottom: 10 });
    Text.fontSize(30);
    Text.fontWeight(1000);
}
function __Button__bb(): void {
    Button.borderRadius(8);
    Button.width(90);
    Button.margin({
        // left:40,
        right: 30
    });
}
loadDocument(new EasyMixBind("1", undefined, {}));
