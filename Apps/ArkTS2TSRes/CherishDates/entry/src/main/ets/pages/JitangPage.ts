interface JitangPage_Params {
    message?: string;
    datas?: Array<any>;
    keys?: string;
    jitangText?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "JitangPage_" + ++__generate__Id;
}
import http from '@ohos.net.http';
import router from '@ohos.router';
import { JitangModel } from '../Model/JitangModel';
class JitangPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.__datas = new ObservedPropertyObject([], this, "datas");
        this.__keys = new ObservedPropertySimple('125d1d2ea49e35337667d7c7f70f15e1' // 鸡汤key
        , this, "keys");
        this.__jitangText = new ObservedPropertySimple("加油！", this, "jitangText");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: JitangPage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.datas !== undefined) {
            this.datas = params.datas;
        }
        if (params.keys !== undefined) {
            this.keys = params.keys;
        }
        if (params.jitangText !== undefined) {
            this.jitangText = params.jitangText;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__datas.aboutToBeDeleted();
        this.__keys.aboutToBeDeleted();
        this.__jitangText.aboutToBeDeleted();
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
    private __keys: ObservedPropertySimple<string>; // 鸡汤key
    get keys() {
        return this.__keys.get();
    }
    set keys(newValue: string) {
        this.__keys.set(newValue);
    }
    private __jitangText: ObservedPropertySimple<string>;
    get jitangText() {
        return this.__jitangText.get();
    }
    set jitangText(newValue: string) {
        this.__jitangText.set(newValue);
    }
    getData() {
        let httpRequest = http.createHttp();
        httpRequest.request("https://apis.juhe.cn/fapig/soup/query?key=" + this.keys, {
            connectTimeout: 60000,
            readTimeout: 60000,
            usingProtocol: http.HttpProtocol.HTTP1_1,
        }, (err, data) => {
            if (!err) {
                this.message = JSON.stringify(data.result);
                let jitangModel: JitangModel = JSON.parse(data.result.toString());
                this.jitangText = jitangModel.result.text; // 获取鸡汤文本
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
        Text.create(this.jitangText);
        Text.fontSize(30);
        Text.fontWeight(FontWeight.Normal);
        Text.fontColor(Color.White);
        Text.onClick(() => {
            this.getData();
        });
        Text.width("80%");
        Text.backgroundColor(Color.Pink);
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
        Image.create($r("app.media.fight1"));
        Image.width(120);
        Row.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new JitangPage("1", undefined, {}));
