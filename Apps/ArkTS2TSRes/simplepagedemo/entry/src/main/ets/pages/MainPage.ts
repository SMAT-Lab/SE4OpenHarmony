interface MainPage_Params {
    message?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MainPage_" + ++__generate__Id;
}
class MainPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MainPage_Params) {
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
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Tabs.create({ barPosition: BarPosition.End });
        Tabs.backgroundColor(Color.White);
        // 首页
        TabContent.create();
        // 首页
        TabContent.tabBar('首页');
        // 首页
        TabContent.backgroundColor(0xefefef);
        Column.create();
        Text.create('首页');
        Text.fontSize('60px');
        Text.fontWeight(600);
        Text.pop();
        Swiper.create();
        Swiper.onChange((index: number) => {
        });
        Swiper.pop();
        Column.pop();
        // 首页
        TabContent.pop();
        // 我的
        TabContent.create();
        // 我的
        TabContent.tabBar('首页');
        // 我的
        TabContent.backgroundColor(0xefefef);
        Text.create('22222222222');
        Text.pop();
        // 我的
        TabContent.pop();
        Tabs.pop();
        Column.pop();
    }
}
loadDocument(new MainPage("1", undefined, {}));
