interface Index_Params {
    message?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World'
        //          20230724  OpenHarmony 容器布局专练
        //    本次练习，练习使用垂直容器布局，水平容器布局，堆叠容器布局
        //    这三个容器的使用方法，练习容器的对齐方式
        //
        //    彭伟程
        , this, "message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    //          20230724  OpenHarmony 容器布局专练
    //    本次练习，练习使用垂直容器布局，水平容器布局，堆叠容器布局
    //    这三个容器的使用方法，练习容器的对齐方式
    //
    //    彭伟程
    render() {
        Row.create();
        Row.height('100%');
        Column.create({ space: 10 });
        Column.width('100%');
        // Text(this.message)
        //   .fontSize(50)
        //   .fontWeight(FontWeight.Bold)
        //以下创建了一个垂直容器布局，在这个基础上又创建了2个垂直容器布局
        //特点是学习使用布局的对齐方式，使用的是开始对齐（左对齐）
        Column.create({ space: 10 });
        // Text(this.message)
        //   .fontSize(50)
        //   .fontWeight(FontWeight.Bold)
        //以下创建了一个垂直容器布局，在这个基础上又创建了2个垂直容器布局
        //特点是学习使用布局的对齐方式，使用的是开始对齐（左对齐）
        Column.width('100%');
        // Text(this.message)
        //   .fontSize(50)
        //   .fontWeight(FontWeight.Bold)
        //以下创建了一个垂直容器布局，在这个基础上又创建了2个垂直容器布局
        //特点是学习使用布局的对齐方式，使用的是开始对齐（左对齐）
        Column.alignItems(HorizontalAlign.Start);
        Column.create();
        Column.width(50);
        Column.height(50);
        Column.backgroundColor(Color.Blue);
        Column.pop();
        Column.create();
        Column.width(50);
        Column.height(50);
        Column.backgroundColor(Color.Red);
        Column.pop();
        // Text(this.message)
        //   .fontSize(50)
        //   .fontWeight(FontWeight.Bold)
        //以下创建了一个垂直容器布局，在这个基础上又创建了2个垂直容器布局
        //特点是学习使用布局的对齐方式，使用的是开始对齐（左对齐）
        Column.pop();
        //以下创建了一个垂直容器布局，在这个基础上又创建了2个垂直容器布局
        //特点是学习使用布局的对齐方式，使用的是结束对齐（右对齐）
        Column.create({ space: 10 });
        //以下创建了一个垂直容器布局，在这个基础上又创建了2个垂直容器布局
        //特点是学习使用布局的对齐方式，使用的是结束对齐（右对齐）
        Column.width('100%');
        //以下创建了一个垂直容器布局，在这个基础上又创建了2个垂直容器布局
        //特点是学习使用布局的对齐方式，使用的是结束对齐（右对齐）
        Column.alignItems(HorizontalAlign.End);
        Column.create();
        Column.width(50);
        Column.height(50);
        Column.backgroundColor(Color.Yellow);
        Column.pop();
        Column.create();
        Column.width(50);
        Column.height(50);
        Column.backgroundColor(Color.Green);
        Column.pop();
        //以下创建了一个垂直容器布局，在这个基础上又创建了2个垂直容器布局
        //特点是学习使用布局的对齐方式，使用的是结束对齐（右对齐）
        Column.pop();
        //以下创建了一个水平容器布局，在这个基础上又创建了2个垂直容器布局
        //特点是学习使用布局的对齐方式，使用的是结束对齐（右对齐）
        Row.create({ space: 10 });
        //以下创建了一个水平容器布局，在这个基础上又创建了2个垂直容器布局
        //特点是学习使用布局的对齐方式，使用的是结束对齐（右对齐）
        Row.width('100%');
        //以下创建了一个水平容器布局，在这个基础上又创建了2个垂直容器布局
        //特点是学习使用布局的对齐方式，使用的是结束对齐（右对齐）
        Row.justifyContent(FlexAlign.End);
        Column.create();
        Column.width(100);
        Column.height(100);
        Column.backgroundColor(Color.Gray);
        Column.pop();
        Column.create();
        Column.width(100);
        Column.height(100);
        Column.backgroundColor(Color.Orange);
        Column.pop();
        //以下创建了一个水平容器布局，在这个基础上又创建了2个垂直容器布局
        //特点是学习使用布局的对齐方式，使用的是结束对齐（右对齐）
        Row.pop();
        //以下创建了一个水平容器布局，在这个基础上又创建了2个垂直容器布局
        //特点是学习使用布局的对齐方式，使用的是居中对齐
        Row.create({ space: 10 });
        //以下创建了一个水平容器布局，在这个基础上又创建了2个垂直容器布局
        //特点是学习使用布局的对齐方式，使用的是居中对齐
        Row.width('100%');
        //以下创建了一个水平容器布局，在这个基础上又创建了2个垂直容器布局
        //特点是学习使用布局的对齐方式，使用的是居中对齐
        Row.justifyContent(FlexAlign.Center);
        Column.create();
        Column.width(100);
        Column.height(100);
        Column.backgroundColor(Color.Pink);
        Column.pop();
        Column.create();
        Column.width(100);
        Column.height(100);
        Column.backgroundColor(Color.Brown);
        Column.pop();
        //以下创建了一个水平容器布局，在这个基础上又创建了2个垂直容器布局
        //特点是学习使用布局的对齐方式，使用的是居中对齐
        Row.pop();
        //以下创建了一个堆叠容器布局，在这个基础上又创建了3个堆叠容器布局
        //特点是学习使用布局的对齐方式，使用的是开始对齐（左对齐）
        Stack.create({ alignContent: Alignment.Start });
        Stack.create();
        Stack.height(300);
        Stack.width(300);
        Stack.backgroundColor(Color.Red);
        Stack.pop();
        Stack.create();
        Stack.height(200);
        Stack.width(200);
        Stack.backgroundColor(Color.Blue);
        Stack.pop();
        Stack.create();
        Stack.height(100);
        Stack.width(100);
        Stack.backgroundColor(Color.Yellow);
        Stack.pop();
        //以下创建了一个堆叠容器布局，在这个基础上又创建了3个堆叠容器布局
        //特点是学习使用布局的对齐方式，使用的是开始对齐（左对齐）
        Stack.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
