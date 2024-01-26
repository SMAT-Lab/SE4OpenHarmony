interface MainnPage_Params {
    message?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MainnPage_" + ++__generate__Id;
}
import router from '@ohos.router';
export class MainnPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MainnPage_Params) {
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
        Row.create();
        Row.backgroundColor(Color.White);
        Row.create();
        Row.height('36%');
        Row.alignItems(VerticalAlign.Top);
        Column.create();
        Column.width('100%');
        // Part1：首页最顶白条 “CherishDates”
        Row.create({ space: 10 });
        // Part1：首页最顶白条 “CherishDates”
        Row.width("100%");
        // Part1：首页最顶白条 “CherishDates”
        Row.margin(10);
        // 常用设置(转到ComSettingPage)
        Image.create($r("app.media.setting4"));
        // 常用设置(转到ComSettingPage)
        Image.width(30);
        // 常用设置(转到ComSettingPage)
        Image.margin(7);
        // 常用设置(转到ComSettingPage)
        Image.fillColor(Color.Brown);
        // 常用设置(转到ComSettingPage)
        Image.onClick(() => {
            router.pushUrl({
                url: "pages/SettingPage"
            });
        });
        Text.create("CherishDates");
        Text.fontSize(20);
        Text.margin({
            left: 130
        });
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        // Part1：首页最顶白条 “CherishDates”
        Row.pop();
        // Part2：主题设置卡片(Days for Me)
        Image.create($r("app.media.daysforme"));
        // Part2：主题设置卡片(Days for Me)
        Image.width("100%");
        // Part3：思考要不要分部件，先空着
        // 先放必要组件：添加按钮（转到AddPage）
        Button.createWithLabel("＋");
        // Part3：思考要不要分部件，先空着
        // 先放必要组件：添加按钮（转到AddPage）
        Button.type(ButtonType.Capsule);
        // Part3：思考要不要分部件，先空着
        // 先放必要组件：添加按钮（转到AddPage）
        Button.fontSize(25);
        // Part3：思考要不要分部件，先空着
        // 先放必要组件：添加按钮（转到AddPage）
        Button.backgroundColor('#ffd8d6fd');
        // Part3：思考要不要分部件，先空着
        // 先放必要组件：添加按钮（转到AddPage）
        Button.onClick(() => {
            router.pushUrl({
                url: "pages/AddPage"
            });
        });
        // Part3：思考要不要分部件，先空着
        // 先放必要组件：添加按钮（转到AddPage）
        Button.width(60);
        // Part3：思考要不要分部件，先空着
        // 先放必要组件：添加按钮（转到AddPage）
        Button.pop();
        Column.pop();
        Row.pop();
        Row.pop();
    }
}
loadDocument(new MainnPage("1", undefined, {}));
