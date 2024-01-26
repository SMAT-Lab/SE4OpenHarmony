interface AxiosPage_Params {
    message?: string;
    baseUrl?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "axiosPage_" + ++__generate__Id;
}
import axios from '@ohos/axios';
import { HealthyModel } from '../Model/healthyModel';
import prompt from '@ohos.prompt';
import promptAction from '@ohos.promptAction';
class AxiosPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.baseUrl = "http://apis.juhe.cn/fapigx/healthtip/query?key=749faa66c0d7676ae6ec73efd4833b47";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AxiosPage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.baseUrl !== undefined) {
            this.baseUrl = params.baseUrl;
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
    private baseUrl: string;
    aboutToAppear() {
        this.getData();
    }
    getData() {
        axios.get(this.baseUrl).then(response => {
            // let  mode:HealthyModel=JSON.parse(response.data)
            //    this. message=mode.result.content
            promptAction.showToast({
                message: JSON.stringify(response)
            });
            this.message = JSON.stringify(response);
            console.info("12322" + JSON.stringify(response));
        });
        //   // 发送一个get请求
        //   axios({
        //     method: "get",
        //     url: this.baseUrl
        //   }).then(function (response) {
        //     console.info(JSON.stringify(response));
        //
        //
        //     let  mode:HealthyModel=JSON.parse(response.data)
        //    this. message=mode.result.content
        //
        //     promptAction.showToast({
        //       message:JSON.stringify(response)
        //     })
        //   })
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Text.create(this.message);
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            this.getData();
        });
        Text.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new AxiosPage("1", undefined, {}));
