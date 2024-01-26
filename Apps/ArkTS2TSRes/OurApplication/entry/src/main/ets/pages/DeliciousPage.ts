interface DeliciousPage_Params {
    message?: string;
    recommend?: string;
    food?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "DeliciousPage_" + ++__generate__Id;
}
import http from "@ohos.net.http";
// import { FriendModel } from '../Model/friendModel';
import { DeliciousModel } from '../Model/deliciousModel';
export class DeliciousPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('', this, "message");
        this.__recommend = new ObservedPropertySimple('', this, "recommend");
        this.__food = new ObservedPropertySimple('麻辣小龙虾'
        // aboutToAppear() {
        //   this.getData()
        // }
        , this, "food");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: DeliciousPage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.recommend !== undefined) {
            this.recommend = params.recommend;
        }
        if (params.food !== undefined) {
            this.food = params.food;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__recommend.aboutToBeDeleted();
        this.__food.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __recommend: ObservedPropertySimple<string>;
    get recommend() {
        return this.__recommend.get();
    }
    set recommend(newValue: string) {
        this.__recommend.set(newValue);
    }
    private __food: ObservedPropertySimple<string>;
    get food() {
        return this.__food.get();
    }
    set food(newValue: string) {
        this.__food.set(newValue);
    }
    // aboutToAppear() {
    //   this.getData()
    // }
    getData() {
        let httpRequest = http.createHttp();
        // httpRequest.request("http://apis.juhe.cn/fapigx/caipu/query?key=a8e9fcc4a43e33882e02287d5651dfe1&word=" + this.recommend, {
        httpRequest.request("http://apis.juhe.cn/fapigx/caipu/query?key=a8e9fcc4a43e33882e02287d5651dfe1&word=" + this.food, {}, (err, data) => {
            if (!err) {
                let model: DeliciousModel = JSON.parse(data.result.toString());
                this.message = model.result.list[0].zuofa;
                httpRequest.destroy();
            }
            else {
                this.message = JSON.stringify(data.result);
                console.info('error:' + JSON.stringify(err));
                httpRequest.destroy();
            }
        });
    }
    render() {
        Column.create();
        Column.height('60%');
        Text.create("马尧今天吃什么？");
        Text.fontColor(Color.Brown);
        Text.fontSize(36);
        Text.fontWeight(600);
        Text.margin({
            bottom: 60
        });
        Text.pop();
        Column.create({ space: 10 });
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
        });
        Row.pop();
        Column.pop();
        Button.createWithLabel("试试怎么样！");
        Button.width(300);
        Button.backgroundColor(Color.Gray);
        Button.margin({
            bottom: 40
        });
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.onClick(() => {
            this.getData();
        });
        Button.width('100%');
        Button.pop();
        Text.create(this.message);
        Text.fontSize(20);
        Text.pop();
        Column.pop();
    }
}
loadDocument(new DeliciousPage("1", undefined, {}));
