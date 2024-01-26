interface WenanPage_Params {
    message?: string;
    datas?: Array<any>;
    keys?: string;
    wenanText?: string;
    source?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "WenanPage_" + ++__generate__Id;
}
import http from '@ohos.net.http';
import router from '@ohos.router';
import { WenanModel } from '../Model/WenanModel';
class WenanPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.__datas = new ObservedPropertyObject([], this, "datas");
        this.__keys = new ObservedPropertySimple('649d5e8be5436d055d9634954e3ca468' // 文案key
        , this, "keys");
        this.__wenanText = new ObservedPropertySimple("加油！", this, "wenanText");
        this.__source = new ObservedPropertySimple("Somebody", this, "source");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: WenanPage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.datas !== undefined) {
            this.datas = params.datas;
        }
        if (params.keys !== undefined) {
            this.keys = params.keys;
        }
        if (params.wenanText !== undefined) {
            this.wenanText = params.wenanText;
        }
        if (params.source !== undefined) {
            this.source = params.source;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__datas.aboutToBeDeleted();
        this.__keys.aboutToBeDeleted();
        this.__wenanText.aboutToBeDeleted();
        this.__source.aboutToBeDeleted();
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
    private __datas: ObservedPropertyObject<Array<any>>;
    get datas() {
        return this.__datas.get();
    }
    set datas(newValue: Array<any>) {
        this.__datas.set(newValue);
    }
    private __keys: ObservedPropertySimple<string>; // 文案key
    get keys() {
        return this.__keys.get();
    }
    set keys(newValue: string) {
        this.__keys.set(newValue);
    }
    private __wenanText: ObservedPropertySimple<string>;
    get wenanText() {
        return this.__wenanText.get();
    }
    set wenanText(newValue: string) {
        this.__wenanText.set(newValue);
    }
    private __source: ObservedPropertySimple<string>;
    get source() {
        return this.__source.get();
    }
    set source(newValue: string) {
        this.__source.set(newValue);
    }
    getData() {
        let httpRequest = http.createHttp();
        httpRequest.request("http://apis.juhe.cn/fapigx/pyqwenan/query?key=" + this.keys, {
            connectTimeout: 60000,
            readTimeout: 60000,
            usingProtocol: http.HttpProtocol.HTTP1_1,
        }, (err, data) => {
            if (!err) {
                this.message = JSON.stringify(data.result);
                let wenanModel: WenanModel = JSON.parse(data.result.toString());
                this.wenanText = wenanModel.result.content; // 文案
                this.source = wenanModel.result.source; // 来源
                // this.datas = jitangModel.result.list
                console.info("打印" + JSON.stringify(data.result));
                httpRequest.destroy();
            }
            else {
                this.message = JSON.stringify(err);
                console.info('error:' + JSON.stringify((err)));
                httpRequest.destroy();
            }
        });
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Scroll.create();
        Text.create(this.wenanText);
        Text.fontSize(30);
        Text.fontWeight(FontWeight.Normal);
        Text.fontColor(Color.White);
        Text.onClick(() => {
            this.getData();
        });
        Text.width("80%");
        Text.backgroundColor(Color.Orange);
        Text.borderRadius(20);
        Text.borderColor(Color.Black);
        Text.borderWidth(2);
        Text.padding(20);
        Text.pop();
        Scroll.pop();
        Row.create();
        Row.width("80%");
        Blank.create();
        Blank.pop();
        Image.create($r("app.media.wenan"));
        Image.width(140);
        Row.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new WenanPage("1", undefined, {}));
