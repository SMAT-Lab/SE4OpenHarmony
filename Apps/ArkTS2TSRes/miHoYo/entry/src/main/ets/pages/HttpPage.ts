interface HttpPage_Params {
    message?: string;
    baseurl?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "HttpPage_" + ++__generate__Id;
}
//1.导入对应的http模块
import http from "@ohos.net.http";
import { FriendModel } from '../Model/friendModel';
import { jiModel } from '../Model/jiModel';
class HttpPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.baseurl = "https://apis.juhe.cn/fapig/soup/query?key=1c7bb3387aaf3954bbbffcc607633923";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: HttpPage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.baseurl !== undefined) {
            this.baseurl = params.baseurl;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    aboutToAppear() {
        this.getData();
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private baseurl: string;
    getData() {
        //2. 每一个httpRequest对应一个HTTP请求任务，不可复用
        let httpRequest = http.createHttp();
        httpRequest.request(this.baseurl, 
        // 填写HTTP请求的URL地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定"EXAMPLE_URL",
        {
            connectTimeout: 60000,
            readTimeout: 60000,
            usingProtocol: http.HttpProtocol.HTTP1_1, // 可选，协议类型默认值由系统自动指定
        }, (err, data) => {
            if (!err) {
                // this.message=JSON.stringify(data.result)
                // let friendModel:FriendModel=JSON.parse(data.result.toString())
                let jiModel: jiModel = JSON.parse(data.result.toString());
                this.message = jiModel.result.text;
                console.info("打印" + JSON.stringify(data.result));
                httpRequest.destroy();
            }
            else {
                this.message = JSON.stringify(err);
                console.info('error:' + JSON.stringify(err));
                // 当该请求使用完毕时，调用destroy方法主动销毁
                httpRequest.destroy();
            }
        });
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Text.create(this.message);
        Text.fontColor(Color.Orange);
        Text.fontSize(36);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            this.getData();
        });
        Text.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new HttpPage("1", undefined, {}));
