interface Index_Params {
    message?: string;
    //            20230726 OpenHarmony 代码优化以及JS数据引用
    //    我们通过学习，制作了一个排行榜，但是这个排行榜的代码有一定的问题，例如代码类型定义不
    //    明确，导致数据类型编写错误，但是代码编译器没有提示，还有所有的js数据写在同一个文件里
    //    导致代码扩展以及代码臃肿，所以需要采用模块化设计和在代码编写初应该规定好数据类型
    //
    //    1、使用interface关键字创建接口，在里面规定好数据类型
    //    2、再把Data数组里的数据类型写成我们定义的接口里的数据类型(Array<DataInfinity>)
    //    3、修改List里的item代码(ForEach(this.Dataswitch ? this.TestData : this.TestData2, (item:DataInfinity))
    //    4、创建一个文件夹，里面放入我们的排行榜数据
    //    5、在新建的文件中放入刚刚写的接口代码，添加export const数组
    //    6、使用import引入我们创建的数据文件
    //    7、最后修改TestData = DataInfinity_TestData
    //
    //    彭伟程
    //创建一个数组，数组里放上我们排行榜的数据，最后通过ForEach传入进List容器渲染
    TestData?: Array<DataInfinity>;
    TestData2?: Array<DataInfinity>;
    Dataswitch?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
// interface  DataInfinity{
//   id:string
//   name:string
//   GoodNum:string
//
// }
import { DataInfinity, DataInfinity_TestData, DataInfinity_TestData2 } from '../model/ListData';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World'
        //            20230726 OpenHarmony 代码优化以及JS数据引用
        //    我们通过学习，制作了一个排行榜，但是这个排行榜的代码有一定的问题，例如代码类型定义不
        //    明确，导致数据类型编写错误，但是代码编译器没有提示，还有所有的js数据写在同一个文件里
        //    导致代码扩展以及代码臃肿，所以需要采用模块化设计和在代码编写初应该规定好数据类型
        //
        //    1、使用interface关键字创建接口，在里面规定好数据类型
        //    2、再把Data数组里的数据类型写成我们定义的接口里的数据类型(Array<DataInfinity>)
        //    3、修改List里的item代码(ForEach(this.Dataswitch ? this.TestData : this.TestData2, (item:DataInfinity))
        //    4、创建一个文件夹，里面放入我们的排行榜数据
        //    5、在新建的文件中放入刚刚写的接口代码，添加export const数组
        //    6、使用import引入我们创建的数据文件
        //    7、最后修改TestData = DataInfinity_TestData
        //
        //    彭伟程
        //创建一个数组，数组里放上我们排行榜的数据，最后通过ForEach传入进List容器渲染
        , this, "message");
        this.TestData = DataInfinity_TestData;
        this.TestData2 = DataInfinity_TestData2;
        this.__Dataswitch = new ObservedPropertySimple(true //遇到的一个坑，boolean这个类型，首字母一定要小写
        , this, "Dataswitch");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.TestData !== undefined) {
            this.TestData = params.TestData;
        }
        if (params.TestData2 !== undefined) {
            this.TestData2 = params.TestData2;
        }
        if (params.Dataswitch !== undefined) {
            this.Dataswitch = params.Dataswitch;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__Dataswitch.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    //            20230726 OpenHarmony 代码优化以及JS数据引用
    //    我们通过学习，制作了一个排行榜，但是这个排行榜的代码有一定的问题，例如代码类型定义不
    //    明确，导致数据类型编写错误，但是代码编译器没有提示，还有所有的js数据写在同一个文件里
    //    导致代码扩展以及代码臃肿，所以需要采用模块化设计和在代码编写初应该规定好数据类型
    //
    //    1、使用interface关键字创建接口，在里面规定好数据类型
    //    2、再把Data数组里的数据类型写成我们定义的接口里的数据类型(Array<DataInfinity>)
    //    3、修改List里的item代码(ForEach(this.Dataswitch ? this.TestData : this.TestData2, (item:DataInfinity))
    //    4、创建一个文件夹，里面放入我们的排行榜数据
    //    5、在新建的文件中放入刚刚写的接口代码，添加export const数组
    //    6、使用import引入我们创建的数据文件
    //    7、最后修改TestData = DataInfinity_TestData
    //
    //    彭伟程
    //创建一个数组，数组里放上我们排行榜的数据，最后通过ForEach传入进List容器渲染
    private TestData: Array<DataInfinity>;
    private TestData2: Array<DataInfinity>;
    private __Dataswitch: ObservedPropertySimple<boolean>; //遇到的一个坑，boolean这个类型，首字母一定要小写
    get Dataswitch() {
        return this.__Dataswitch.get();
    }
    set Dataswitch(newValue: boolean) {
        this.__Dataswitch.set(newValue);
    }
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
        Image.onClick(() => {
            this.Dataswitch = !this.Dataswitch;
        });
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
        ForEach.create("2", this, ObservedObject.GetRawObject(this.Dataswitch ? this.TestData : this.TestData2), (item: DataInfinity) => {
            If.create();
            if (parseInt(item.id) <= 3) { //这里是我们通过if，else去选择选择渲染我们的循环渲染里的数据，这里就是判断数组里的id，如果小于3，我们渲染，否则不渲染
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
                ListItem.create();
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
