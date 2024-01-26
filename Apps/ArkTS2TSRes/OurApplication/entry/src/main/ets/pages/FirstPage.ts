interface FirstPage_Params {
    recommend?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "FirstPage_" + ++__generate__Id;
}
import router from '@ohos.router';
class FirstPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__recommend = new ObservedPropertySimple("", this, "recommend");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: FirstPage_Params) {
        if (params.recommend !== undefined) {
            this.recommend = params.recommend;
        }
    }
    aboutToBeDeleted() {
        this.__recommend.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __recommend: ObservedPropertySimple<string>;
    get recommend() {
        return this.__recommend.get();
    }
    set recommend(newValue: string) {
        this.__recommend.set(newValue);
    }
    render() {
        Column.create();
        Column.width("100%");
        Column.height("100%");
        Column.alignItems(HorizontalAlign.Center);
        Column.justifyContent(FlexAlign.Center);
        Column.margin({
            left: 20,
            right: 20,
            bottom: 40,
            top: 40
        });
        //第一块
        Text.create("马尧今天吃什么？");
        //第一块
        Text.fontColor(Color.Brown);
        //第一块
        Text.fontSize(36);
        //第一块
        Text.fontWeight(600);
        //第一块
        Text.margin({
            bottom: 60
        });
        //第一块
        Text.pop();
        //第二块
        Column.create({ space: 10 });
        //第二块
        Column.alignItems(HorizontalAlign.Start);
        Text.create("马尧现在饿惨了，但是他不知道吃些什么，给点建议吧！");
        Text.fontWeight(FontWeight.Bold);
        Text.margin({
            bottom: 16
        });
        Text.width('80%');
        Text.pop();
        Row.create();
        Row.margin({
            bottom: 16
        });
        Image.create($r("app.media.weini"));
        Image.width(60);
        Image.margin({
            right: 20
        });
        TextInput.create({
            placeholder: "给点建议吧",
            text: this.recommend
        });
        TextInput.width("60%");
        TextInput.onChange((val: string) => {
            this.recommend = val;
            // params:{
            //   content: this.recommend
            // }
        });
        Row.pop();
        //第二块
        Column.pop();
        Button.createWithLabel("马氏菜谱，启动！");
        Button.width(300);
        Button.backgroundColor(Color.Gray);
        Button.margin({
            bottom: 40
        });
        Button.onClick(() => {
            router.pushUrl({
                url: "pages/TabPage",
            });
        });
        Button.pop();
        Row.create({ space: 10 });
        Image.create($r("app.media.anemo"));
        Image.width(20);
        Image.create($r("app.media.dendro"));
        Image.width(20);
        Image.create($r("app.media.electro"));
        Image.width(20);
        Image.create($r("app.media.geo"));
        Image.width(20);
        Image.create($r("app.media.hydro"));
        Image.width(20);
        Image.create($r("app.media.pyro"));
        Image.width(20);
        Row.pop();
        Text.create("立即启动！");
        Text.margin({
            top: 20
        });
        Text.pop();
        Column.pop();
    }
}
loadDocument(new FirstPage("1", undefined, {}));
