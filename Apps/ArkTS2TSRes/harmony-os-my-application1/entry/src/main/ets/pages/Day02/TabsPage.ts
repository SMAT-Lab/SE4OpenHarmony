interface TabsPage_Params {
    message?: string;
    currentIndex?;
    controller?: TabsController;
    dataList?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TabsPage_" + ++__generate__Id;
}
class TabsPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.currentIndex = 0;
        this.controller = new TabsController();
        this.dataList = [
            { "name": "首页", "content": "" },
            { "name": "推荐", "content": "" },
            { "name": "国际", "content": "" },
            { "name": "政治", "content": "" },
            { "name": "军事", "content": "" },
            { "name": "经济", "content": "" },
            { "name": "教育", "content": "" },
            { "name": "科技", "content": "" },
            { "name": "民生", "content": "" },
            { "name": "医疗", "content": "" }
        ];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TabsPage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.currentIndex !== undefined) {
            this.currentIndex = params.currentIndex;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.dataList !== undefined) {
            this.dataList = params.dataList;
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
    private currentIndex;
    private controller: TabsController;
    private dataList;
    render() {
        Column.create();
        Column.height("100%");
        //页签容器
        //通过controller进行对页签的控制
        Tabs.create({ controller: this.controller });
        //页签容器
        //通过controller进行对页签的控制
        Tabs.barWidth(300);
        //页签容器
        //通过controller进行对页签的控制
        Tabs.barMode(BarMode.Scrollable);
        //页签容器
        //通过controller进行对页签的控制
        Tabs.height("80%");
        //页签容器
        //通过controller进行对页签的控制
        Tabs.onChange((index) => {
            //页面切换自动调用该函数
            console.info("当前页面索引" + index);
            this.currentIndex = index;
        });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.dataList), (item, index) => {
            TabContent.create();
            TabContent.tabBar(item.name);
            Text.create(item.name + "内容");
            Text.fontSize(30);
            Text.fontColor(Color.Red);
            Text.fontWeight(FontWeight.Bold);
            Text.pop();
            TabContent.pop();
        });
        ForEach.pop();
        //页签容器
        //通过controller进行对页签的控制
        Tabs.pop();
        Button.createWithLabel("下一页");
        Button.onClick(() => {
            this.currentIndex++;
            if (this.currentIndex >= this.dataList.length) {
                this.currentIndex = 0;
            }
            this.controller.changeIndex(this.currentIndex);
        });
        Button.pop();
        Column.pop();
    }
}
loadDocument(new TabsPage("1", undefined, {}));
