interface Index_Params {
    message?: string;
    Num?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.__Num = new ObservedPropertySimple(0 //创建一个number类型的变量Num，并且添加@State检测数字变化刷新页面
        , this, "Num");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.Num !== undefined) {
            this.Num = params.Num;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__Num.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    //****************************************************
    //20230726 OpenHarmony @State 页面刷新与onClick点击事件练习
    //    通过一个简单的按钮与检测按钮点击，让创建的number类型的变量
    //    发生改变，并通过在创建的变量前加入@State检测数字变化刷新页面
    //
    //    彭伟程
    //****************************************************
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __Num: ObservedPropertySimple<number>; //创建一个number类型的变量Num，并且添加@State检测数字变化刷新页面
    get Num() {
        return this.__Num.get();
    }
    set Num(newValue: number) {
        this.__Num.set(newValue);
    }
    render() {
        Column.create();
        Column.height('100%');
        Column.width('100%');
        Button.createWithLabel('按钮');
        Button.height(40);
        Button.width(100);
        Button.onClick(() => [
            this.Num = this.Num + 1 //当检测到按钮被点击后，让Num变量加一
        ]);
        Button.pop();
        Text.create(this.Num.toString());
        Text.fontSize(40);
        Text.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
