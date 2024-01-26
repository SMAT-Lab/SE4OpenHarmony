interface HttpPage_Params {
    datas?: Array<any>;
    message?: string;
    keys?: string;
    LVURL?: string;
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
// import { LuYou, luyouModel } from '../Model/lvyou';
import router from '@ohos.router';
class HttpPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__datas = new ObservedPropertyObject([], this, "datas");
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.__keys = new ObservedPropertySimple("123", this, "keys");
        this.LVURL = "";
        this.baseurl = "https://apis.juhe.cn/fapig/soup/query?key=1c7bb3387aaf3954bbbffcc607633923";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: HttpPage_Params) {
        if (params.datas !== undefined) {
            this.datas = params.datas;
        }
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.keys !== undefined) {
            this.keys = params.keys;
        }
        if (params.LVURL !== undefined) {
            this.LVURL = params.LVURL;
        }
        if (params.baseurl !== undefined) {
            this.baseurl = params.baseurl;
        }
    }
    aboutToBeDeleted() {
        this.__datas.aboutToBeDeleted();
        this.__message.aboutToBeDeleted();
        this.__keys.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    aboutToAppear() {
        this.getData();
    }
    //key:56bc45f8b5a0fb89437eea8d23095fcf
    private __datas: ObservedPropertyObject<Array<any>>;
    get datas() {
        return this.__datas.get();
    }
    set datas(newValue: Array<any>) {
        this.__datas.set(newValue);
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __keys: ObservedPropertySimple<string>;
    get keys() {
        return this.__keys.get();
    }
    set keys(newValue: string) {
        this.__keys.set(newValue);
    }
    private LVURL: string;
    private baseurl: string;
    getData() {
        //2. 每一个httpRequest对应一个HTTP请求任务，不可复用
        let httpRequest = http.createHttp();
        httpRequest.request("https://apis.juhe.cn/fapig/soup/query?key=" + this.keys + "", 
        // 填写HTTP请求的URL地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定"EXAMPLE_URL",
        {
            connectTimeout: 60000,
            readTimeout: 60000,
            usingProtocol: http.HttpProtocol.HTTP1_1, // 可选，协议类型默认值由系统自动指定
        }, (err, data) => {
            if (!err) {
                // this.message=JSON.stringify(data.result)
                // let friendModel:FriendModel=JSON.parse(data.result.toString())
                // let jiModel: LuYou = JSON.parse(data.result.toString())
                // this.datas = jiModel.result.list
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
        Scroll.create();
        TextInput.create();
        TextInput.onChange(() => {
            this.keys = "value";
            this.getData();
        });
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
        Scroll.pop();
        Row.pop();
    }
}
loadDocument(new HttpPage("1", undefined, {}));
