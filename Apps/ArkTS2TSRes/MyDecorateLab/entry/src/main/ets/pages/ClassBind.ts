interface sonCompo_Params {
    sonValue?: ClassA;
}
interface classBind_Params {
    fatherValue?: ClassB;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ClassBind_" + ++__generate__Id;
}
// 数据对象
class ClassB {
    public name: string;
    //   嵌套一个类
    public a: ClassA;
    constructor(a: ClassA, name: string = 'Mike') {
        this.a = a;
        this.name = name;
    }
}
// 内置ClassA,要传递或修改的数据就是这里面的内容
@Observed
class ClassA {
    public name: string;
    public id: number;
    constructor(id: number, name: string = 'OK') {
        this.name = name;
        this.id = id;
    }
}
class classBind extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__fatherValue = new ObservedPropertyObject(new ClassB(new ClassA(10)), this, "fatherValue");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: classBind_Params) {
        if (params.fatherValue !== undefined) {
            this.fatherValue = params.fatherValue;
        }
    }
    aboutToBeDeleted() {
        this.__fatherValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __fatherValue: ObservedPropertyObject<ClassB>;
    get fatherValue() {
        return this.__fatherValue.get();
    }
    set fatherValue(newValue: ClassB) {
        this.__fatherValue.set(newValue);
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor(0x1e90ff);
        Text.create('@Observed与@ObjectLink44444444');
        __Text__textform();
        Text.pop();
        Text.create('父组件的ID值:' + this.fatherValue.a.id);
        __Text__textform();
        Text.pop();
        // 按钮交互区
        Column.create();
        // 点击+，子组件ID自增
        // 不会生效，只会导致@ObjectLInk装饰的变量法国所在组件被刷新，当前组件是不会被刷新的
        Button.createWithLabel('+', { type: ButtonType.Capsule, });
        __Button__but1form();
        // 点击+，子组件ID自增
        // 不会生效，只会导致@ObjectLInk装饰的变量法国所在组件被刷新，当前组件是不会被刷新的
        Button.onClick((event: ClickEvent) => {
            this.fatherValue.a.id += 1;
        });
        // 点击+，子组件ID自增
        // 不会生效，只会导致@ObjectLInk装饰的变量法国所在组件被刷新，当前组件是不会被刷新的
        Button.pop();
        // 点击，父组件ID和子组件ID一起清0
        // 重置数据对象中的类
        Button.createWithLabel('重置方式一', { type: ButtonType.Capsule, });
        __Button__but1form();
        // 点击，父组件ID和子组件ID一起清0
        // 重置数据对象中的类
        Button.onClick((event: ClickEvent) => {
            this.fatherValue.a = new ClassA(0);
        });
        // 点击，父组件ID和子组件ID一起清0
        // 重置数据对象中的类
        Button.pop();
        // 点击，只有子组件清0
        // 重置数据对象
        Button.createWithLabel('重置方式二', { type: ButtonType.Capsule, });
        __Button__but1form();
        // 点击，只有子组件清0
        // 重置数据对象
        Button.onClick((event: ClickEvent) => {
            this.fatherValue = new ClassB(new ClassA(0));
        });
        // 点击，只有子组件清0
        // 重置数据对象
        Button.pop();
        // 按钮交互区
        Column.pop();
        let earlierCreatedChild_2: sonCompo = (this && this.findChildById) ? this.findChildById("2") as sonCompo : undefined;
        if (earlierCreatedChild_2 == undefined) {
            // 子组件
            View.create(new sonCompo("2", this, { sonValue: this.fatherValue.a }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                sonValue: this.fatherValue.a
            });
            View.create(earlierCreatedChild_2);
        }
        //   页面切换按钮
        Row.create();
        Navigator.create({ target: 'pages/EasyMixBind', type: NavigationType.Back });
        Button.createWithLabel('Back');
        __Button__but3form();
        Button.pop();
        Navigator.pop();
        Navigator.create({ target: 'pages/proConsumeDate', type: NavigationType.Push });
        Button.createWithLabel('Next');
        __Button__but3form();
        Button.pop();
        Navigator.pop();
        //   页面切换按钮
        Row.pop();
        Column.pop();
    }
}
class sonCompo extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__sonValue = new SynchedPropertyNesedObject(params.sonValue, this, "sonValue");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: sonCompo_Params) {
        this.__sonValue.set(params.sonValue);
    }
    aboutToBeDeleted() {
        this.__sonValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __sonValue: SynchedPropertyNesedObject<ClassA>;
    get sonValue() {
        return this.__sonValue.get();
    }
    render() {
        Column.create();
        Column.width('80%');
        Column.height('40%');
        Column.backgroundColor(0x00bfff);
        Column.margin({ top: 20 });
        Text.create('子组件的ID值:' + this.sonValue.id);
        __Text__textform();
        Text.pop();
        Row.create();
        Button.createWithLabel('+', { type: ButtonType.Normal });
        __Button__but2form();
        Button.onClick(() => {
            this.sonValue.id += 1;
        });
        Button.pop();
        Button.createWithLabel('reset', { type: ButtonType.Normal });
        __Button__but2form();
        Button.onClick(() => {
            this.sonValue = new ClassA(0);
        });
        Button.pop();
        Row.pop();
        Column.pop();
    }
}
function __Text__textform(): void {
    Text.fontSize(20);
    Text.fontColor(0xffffff);
    Text.fontWeight(700);
    Text.margin({ top: 10, bottom: 10 });
}
function __Button__but1form(): void {
    Button.backgroundColor(0xff1493);
    Button.width(320);
    Button.margin(4);
}
function __Button__but2form(): void {
    Button.backgroundColor(0xff69b4);
    Button.width(90);
    Button.borderRadius(8);
    Button.margin({ right: 30 });
}
function __Button__but3form(): void {
    Button.borderRadius(4);
    Button.backgroundColor(0x7ffd4);
    Button.width(120);
    Button.fontColor(0x696969);
    Button.margin({ top: 20, left: 20 });
}
loadDocument(new classBind("1", undefined, {}));
