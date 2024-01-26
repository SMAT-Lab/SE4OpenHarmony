interface XiaohuaPage_Params {
    message?: string;
    datas?: Array<any>;
    keys?: string;
    xiaohuaText?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "XiaohuaPage_" + ++__generate__Id;
}
import http from '@ohos.net.http';
import router from '@ohos.router';
import { XiaohuaModel } from '../Model/XiaohuaModel';
class XiaohuaPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.__datas = new ObservedPropertyObject([], this, "datas");
        this.__keys = new ObservedPropertySimple('63b9e7c5aee474002d71b0f55c0fe962' // 笑话key
        , this, "keys");
        this.__xiaohuaText = new ObservedPropertySimple(":D", this, "xiaohuaText");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: XiaohuaPage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.datas !== undefined) {
            this.datas = params.datas;
        }
        if (params.keys !== undefined) {
            this.keys = params.keys;
        }
        if (params.xiaohuaText !== undefined) {
            this.xiaohuaText = params.xiaohuaText;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__datas.aboutToBeDeleted();
        this.__keys.aboutToBeDeleted();
        this.__xiaohuaText.aboutToBeDeleted();
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
    private __keys: ObservedPropertySimple<string>; // 笑话key
    get keys() {
        return this.__keys.get();
    }
    set keys(newValue: string) {
        this.__keys.set(newValue);
    }
    private __xiaohuaText: ObservedPropertySimple<string>;
    get xiaohuaText() {
        return this.__xiaohuaText.get();
    }
    set xiaohuaText(newValue: string) {
        this.__xiaohuaText.set(newValue);
    }
    getData() {
        let httpRequest = http.createHttp();
        httpRequest.request("http://v.juhe.cn/joke/content/list.php?sort=desc&page=&pagesize=&time=1618816972&key=" + this.keys, {
            connectTimeout: 60000,
            readTimeout: 60000,
            usingProtocol: http.HttpProtocol.HTTP1_1,
        }, (err, data) => {
            if (!err) {
                this.message = JSON.stringify(data.result);
                let xiaohuaModel: XiaohuaModel = JSON.parse(data.result.toString());
                this.xiaohuaText = xiaohuaModel.result.data[6].content; // 获取笑话文本
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
        Text.create(this.xiaohuaText);
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Normal);
        Text.fontColor(Color.White);
        Text.onClick(() => {
            this.getData();
        });
        Text.width("80%");
        Text.backgroundColor("#f2b67d79");
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
        Image.create($r("app.media.xiaohua"));
        Image.width(120);
        Row.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new XiaohuaPage("1", undefined, {}));
