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
        //*************************************************************
        //                  20230723 OpenHarmony开发练习
        //    实现练习垂直方向布局以及横向布局，练习text,button,img,和resourcs
        //    的值使用方法。
        //
        //    彭伟程
        //*************************************************************
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
    //*************************************************************
    //                  20230723 OpenHarmony开发练习
    //    实现练习垂直方向布局以及横向布局，练习text,button,img,和resourcs
    //    的值使用方法。
    //
    //    彭伟程
    //*************************************************************
    render() {
        Row.create();
        Column.create({ space: 10 });
        Column.width('100%');
        Column.create();
        Column.width('100%');
        Column.height(30);
        Column.backgroundColor($r('app.color.index_column_bgcolor'));
        Column.pop();
        Column.create();
        Column.height(30);
        Column.width('100%');
        Column.backgroundColor(Color.Red);
        Column.pop();
        //以下实现的功能是在一个垂直布局上放上一个Row水平布局
        //然后在水平布局里放入两个小的垂直布局，这样就可以实现双垂直布局在水平空间
        Column.create();
        //以下实现的功能是在一个垂直布局上放上一个Row水平布局
        //然后在水平布局里放入两个小的垂直布局，这样就可以实现双垂直布局在水平空间
        Column.height(50);
        Row.create({ space: 30 });
        Row.width('100%');
        Row.height(50);
        Row.backgroundColor('#3d7ef9');
        Row.justifyContent(FlexAlign.Center);
        Column.create();
        Column.height(30);
        Column.width(100);
        Column.backgroundColor(Color.Blue);
        Column.pop();
        Column.create();
        Column.height(30);
        Column.width(100);
        Column.backgroundColor(Color.Red);
        Column.pop();
        Row.pop();
        //以下实现的功能是在一个垂直布局上放上一个Row水平布局
        //然后在水平布局里放入两个小的垂直布局，这样就可以实现双垂直布局在水平空间
        Column.pop();
        //以下功能是实现文字，按钮，图片的展示和调用
        //新建一个Column垂直布局
        Column.create();
        Text.create('你好，openHarmony');
        Text.fontSize(30);
        Text.fontColor($r('app.color.index_column_bgcolor'));
        Text.pop();
        Button.createWithLabel('你好，button');
        Button.type(ButtonType.Normal);
        Button.fontColor(Color.Red);
        Button.backgroundColor($r('app.color.index_column_bgcolor'));
        Button.pop();
        Image.create($r('app.media.icon'));
        Image.width(100);
        Image.height(100);
        Image.create($r('app.media.icon'));
        Image.width(100);
        Image.height(100);
        //以下功能是实现文字，按钮，图片的展示和调用
        //新建一个Column垂直布局
        Column.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
