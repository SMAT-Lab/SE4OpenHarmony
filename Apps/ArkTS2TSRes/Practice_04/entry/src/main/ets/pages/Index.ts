interface Index_Params {
    message?: string;
    //            20230725 OpenHarmony 排行榜ForEach，if，else练习
    //    通过一个排行榜案例，综合学习练习布局，文本等控件的使用，学习ForEach循环渲染以及if，else选择渲染
    //    达到逐步学习制作项目的目的
    //
    //    彭伟程
    //创建一个数组，数组里放上我们排行榜的数据，最后通过ForEach传入进List容器渲染
    TestData?: Array<Object>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World'
        //            20230725 OpenHarmony 排行榜ForEach，if，else练习
        //    通过一个排行榜案例，综合学习练习布局，文本等控件的使用，学习ForEach循环渲染以及if，else选择渲染
        //    达到逐步学习制作项目的目的
        //
        //    彭伟程
        //创建一个数组，数组里放上我们排行榜的数据，最后通过ForEach传入进List容器渲染
        , this, "message");
        this.TestData = [
            {
                "id": '1',
                "name": '苹果',
                "GoodNum": '114514'
            },
            {
                "id": '2',
                "name": '葡萄',
                "GoodNum": '19198'
            },
            {
                "id": '3',
                "name": '西瓜',
                "GoodNum": '9801'
            },
            {
                "id": '4',
                "name": '香蕉',
                "GoodNum": '8431'
            },
            {
                "id": '5',
                "name": '菠萝',
                "GoodNum": '7546'
            },
            {
                "id": '6',
                "name": '榴莲',
                "GoodNum": '7431'
            }
        ];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.TestData !== undefined) {
            this.TestData = params.TestData;
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
    //            20230725 OpenHarmony 排行榜ForEach，if，else练习
    //    通过一个排行榜案例，综合学习练习布局，文本等控件的使用，学习ForEach循环渲染以及if，else选择渲染
    //    达到逐步学习制作项目的目的
    //
    //    彭伟程
    //创建一个数组，数组里放上我们排行榜的数据，最后通过ForEach传入进List容器渲染
    private TestData: Array<Object>;
    render() {
        //创建一个垂直容器，并且铺满全屏
        //作用：实现最大的一个容器，这个容器里包含页面的所有元素
        Column.create();
        //创建一个垂直容器，并且铺满全屏
        //作用：实现最大的一个容器，这个容器里包含页面的所有元素
        Column.height('100%');
        //创建一个垂直容器，并且铺满全屏
        //作用：实现最大的一个容器，这个容器里包含页面的所有元素
        Column.width('100%');
        //创建一个垂直容器，并且铺满全屏
        //作用：实现最大的一个容器，这个容器里包含页面的所有元素
        Column.backgroundColor('#f0f0f0');
        //页面头
        //创建一个水平容器，并且铺满纵向
        //作用：实现一个最大的水平的容器，这个容器里包含两个小的水平容器，实现左右分离
        Row.create();
        //页面头
        //创建一个水平容器，并且铺满纵向
        //作用：实现一个最大的水平的容器，这个容器里包含两个小的水平容器，实现左右分离
        Row.width('100%');
        //页面头
        //创建一个水平容器，并且铺满纵向
        //作用：实现一个最大的水平的容器，这个容器里包含两个小的水平容器，实现左右分离
        Row.height(80);
        //页面头
        //创建一个水平容器，并且铺满纵向
        //作用：实现一个最大的水平的容器，这个容器里包含两个小的水平容器，实现左右分离
        Row.padding({
            left: 30,
            right: 30
        });
        //左边小容器里包含返回图标和排行榜文字
        //并且它的对齐方式为开始对齐（左对齐）
        Row.create();
        //左边小容器里包含返回图标和排行榜文字
        //并且它的对齐方式为开始对齐（左对齐）
        Row.width('50%');
        Image.create($r('app.media.back'));
        Image.width(30);
        Image.height(30);
        Image.margin({ right: 10 });
        Text.create('排行榜');
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        //左边小容器里包含返回图标和排行榜文字
        //并且它的对齐方式为开始对齐（左对齐）
        Row.pop();
        //右边小容器里包含刷新图片
        //并且它的对齐方式为结束对齐（右对齐）
        Row.create();
        //右边小容器里包含刷新图片
        //并且它的对齐方式为结束对齐（右对齐）
        Row.width('50%');
        //右边小容器里包含刷新图片
        //并且它的对齐方式为结束对齐（右对齐）
        Row.justifyContent(FlexAlign.End);
        Image.create($r('app.media.ReLoad'));
        Image.width(30);
        Image.height(30);
        //右边小容器里包含刷新图片
        //并且它的对齐方式为结束对齐（右对齐）
        Row.pop();
        //页面头
        //创建一个水平容器，并且铺满纵向
        //作用：实现一个最大的水平的容器，这个容器里包含两个小的水平容器，实现左右分离
        Row.pop();
        //列表头
        //创建一个水平容器，里面包含三个text
        //因为水平容器默认对齐方式为开始对齐（左对齐），所以要重新设置对齐方式为居中对齐
        Row.create();
        //列表头
        //创建一个水平容器，里面包含三个text
        //因为水平容器默认对齐方式为开始对齐（左对齐），所以要重新设置对齐方式为居中对齐
        Row.width('100%');
        //列表头
        //创建一个水平容器，里面包含三个text
        //因为水平容器默认对齐方式为开始对齐（左对齐），所以要重新设置对齐方式为居中对齐
        Row.justifyContent(FlexAlign.Center);
        Text.create('排名');
        Text.width('20%');
        Text.fontColor('#808080');
        Text.pop();
        Text.create('种类');
        Text.width('40%');
        Text.fontColor('#808080');
        Text.pop();
        Text.create('点赞数');
        Text.width('20%');
        Text.fontColor('#808080');
        Text.pop();
        //列表头
        //创建一个水平容器，里面包含三个text
        //因为水平容器默认对齐方式为开始对齐（左对齐），所以要重新设置对齐方式为居中对齐
        Row.pop();
        //列表项
        //这里是新知识，学习了使用List容器，创建List需要创建一个List容器，然后ListItem是容器元素
        //容器元素里包含的就是数据项
        Column.create({ space: 20 });
        //新知识！！！ForEach循环渲染，this数组，把item传入List列表渲染
        ForEach.create("2", this, ObservedObject.GetRawObject(this.TestData), (item) => {
            If.create();
            if (item.id <= 3) { //这里是我们通过if，else去选择选择渲染我们的循环渲染里的数据，这里就是判断数组里的id，如果小于3，我们渲染，否则不渲染
                If.branchId(0);
                List.create();
                ListItem.create();
                Row.create();
                Row.width('100%');
                Row.justifyContent(FlexAlign.Center);
                Row.padding({ top: 20 });
                Column.create();
                Column.alignItems(HorizontalAlign.Start);
                Column.width('20%');
                Text.create(item.id);
                Text.width(25);
                Text.height(25);
                Text.fontSize(20);
                Text.fontColor(Color.White);
                Text.borderRadius(25);
                Text.backgroundColor('#3d7ef9');
                Text.textAlign(TextAlign.Center);
                Text.pop();
                Column.pop();
                Text.create(item.name);
                Text.fontSize(20);
                Text.width('40%');
                Text.pop();
                Text.create(item.GoodNum);
                Text.fontSize(20);
                Text.width('20%');
                Text.pop();
                Row.pop();
                ListItem.pop();
                List.pop();
            }
            else {
                If.branchId(1);
                List.create();
                ListItem.create(item);
                Row.create();
                Row.width('100%');
                Row.justifyContent(FlexAlign.Center);
                Row.padding({ top: 20 });
                Text.create(item.id);
                Text.fontSize(20);
                Text.width('20%');
                Text.padding({ left: 6 });
                Text.pop();
                Text.create(item.name);
                Text.fontSize(20);
                Text.width('40%');
                Text.pop();
                Text.create(item.GoodNum);
                Text.fontSize(20);
                Text.width('20%');
                Text.pop();
                Row.pop();
                ListItem.pop();
                List.pop();
            }
            If.pop();
        });
        //新知识！！！ForEach循环渲染，this数组，把item传入List列表渲染
        ForEach.pop();
        //列表项
        //这里是新知识，学习了使用List容器，创建List需要创建一个List容器，然后ListItem是容器元素
        //容器元素里包含的就是数据项
        Column.pop();
        //创建一个垂直容器，并且铺满全屏
        //作用：实现最大的一个容器，这个容器里包含页面的所有元素
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
