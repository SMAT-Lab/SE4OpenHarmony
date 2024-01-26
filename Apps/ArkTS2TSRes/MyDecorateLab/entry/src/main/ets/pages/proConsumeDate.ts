interface comC_Params {
    reviewVote?: number;
}
interface comB_Params {
    reviewVote?: number;
}
interface comA_Params {
    reviewVote?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "proConsumeDate_" + ++__generate__Id;
}
class comA extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__reviewVote = new ObservedPropertySimple(0, this, "reviewVote");
        this.addProvidedVar("reviewVote", this.__reviewVote, false);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: comA_Params) {
        if (params.reviewVote !== undefined) {
            this.reviewVote = params.reviewVote;
        }
    }
    aboutToBeDeleted() {
        this.__reviewVote.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __reviewVote: ObservedPropertySimple<number>;
    get reviewVote() {
        return this.__reviewVote.get();
    }
    set reviewVote(newValue: number) {
        this.__reviewVote.set(newValue);
    }
    // string给变量名起一个别名
    render() {
        Column.create();
        Column.height('100%');
        Column.width('100%');
        Column.backgroundColor(0x1e90ff);
        Text.create('@Provide与@Consume55555555555');
        __Text__textstyle4();
        Text.fontSize(20);
        Text.pop();
        Text.create('父组件的值' + this.reviewVote);
        __Text__textstyle4();
        Text.pop();
        Row.create();
        Row.margin({ top: 10, bottom: 10 });
        Button.createWithLabel('+', { type: ButtonType.Normal });
        __Button__buSty();
        Button.onClick(() => {
            this.reviewVote++;
        });
        Button.pop();
        Button.createWithLabel('-', { type: ButtonType.Normal });
        __Button__buSty();
        Button.onClick(() => {
            this.reviewVote--;
        });
        Button.pop();
        Row.pop();
        let earlierCreatedChild_2: comB = (this && this.findChildById) ? this.findChildById("2") as comB : undefined;
        if (earlierCreatedChild_2 == undefined) {
            // 子组件
            View.create(new comB("2", this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
        //   按钮
        Row.create();
        //   按钮
        Row.margin({ top: 10, bottom: 10 });
        Navigator.create({ target: 'pages/ClassBind', type: NavigationType.Back });
        Button.createWithLabel('Back', { type: ButtonType.Capsule });
        __Button__buSty2();
        Button.pop();
        Navigator.pop();
        Navigator.create({ target: 'pages/WatchBind', type: NavigationType.Push });
        Button.createWithLabel('Next', { type: ButtonType.Capsule });
        __Button__buSty2();
        Button.pop();
        Navigator.pop();
        //   按钮
        Row.pop();
        Column.pop();
    }
}
class comB extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__reviewVote = this.initializeConsume('reviewVote', "reviewVote");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: comB_Params) {
    }
    aboutToBeDeleted() {
        this.__reviewVote.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __reviewVote: SynchedPropertySimpleTwoWay<number>;
    get reviewVote() {
        return this.__reviewVote.get();
    }
    set reviewVote(newValue: number) {
        this.__reviewVote.set(newValue);
    }
    render() {
        Column.create();
        Column.width('80%');
        Column.height('50%');
        Column.backgroundColor(0x00bfff);
        Column.margin({ top: 10, bottom: 10 });
        Text.create('子组件值:' + this.reviewVote);
        __Text__textstyle4();
        Text.pop();
        Row.create();
        Row.margin({ top: 10, bottom: 10 });
        Button.createWithLabel('+', { type: ButtonType.Normal });
        __Button__buSty();
        Button.onClick(() => {
            this.reviewVote++;
        });
        Button.pop();
        Button.createWithLabel('-', { type: ButtonType.Normal });
        __Button__buSty();
        Button.onClick(() => {
            this.reviewVote--;
        });
        Button.pop();
        Row.pop();
        let earlierCreatedChild_3: comC = (this && this.findChildById) ? this.findChildById("3") as comC : undefined;
        if (earlierCreatedChild_3 == undefined) {
            //   孙组件comC
            View.create(new comC("3", this, {}));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({});
            View.create(earlierCreatedChild_3);
        }
        Column.pop();
    }
}
class comC extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__reviewVote = this.initializeConsume('reviewVote', "reviewVote");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: comC_Params) {
    }
    aboutToBeDeleted() {
        this.__reviewVote.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __reviewVote: SynchedPropertySimpleTwoWay<number>;
    get reviewVote() {
        return this.__reviewVote.get();
    }
    set reviewVote(newValue: number) {
        this.__reviewVote.set(newValue);
    }
    render() {
        Column.create();
        Column.width('80%');
        Column.height('50%');
        Column.backgroundColor(0x87cefa);
        Column.margin({ top: 10, bottom: 10 });
        Text.create('孙组件值:' + this.reviewVote);
        __Text__textstyle4();
        Text.pop();
        Row.create();
        Row.margin({ top: 10, bottom: 10 });
        Button.createWithLabel('+', { type: ButtonType.Normal });
        __Button__buSty();
        Button.onClick(() => {
            this.reviewVote++;
        });
        Button.pop();
        Button.createWithLabel('-', { type: ButtonType.Normal });
        __Button__buSty();
        Button.margin({ left: 10 });
        Button.onClick(() => {
            this.reviewVote--;
        });
        Button.pop();
        Row.pop();
        Column.pop();
    }
}
function __Text__textstyle4(): void {
    Text.fontWeight(700);
    Text.fontSize(30);
    Text.fontColor(0xffffff);
    Text.margin({ top: 10, bottom: 10 });
}
function __Button__buSty(): void {
    Button.fontColor(0xffffff);
    Button.backgroundColor(0xff1493);
    Button.borderRadius(8);
    Button.margin({ left: 40 });
    Button.width(90);
}
function __Button__buSty2(): void {
    Button.fontColor(0x696969);
    Button.backgroundColor(0x7fffd4);
    Button.borderRadius(8);
    Button.margin({ left: 40 });
    Button.width(90);
}
loadDocument(new comA("1", undefined, {}));
