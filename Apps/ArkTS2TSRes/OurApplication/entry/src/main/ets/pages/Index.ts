interface Picture_Params {
    message?: string;
    img_link?: string;
    img_tag?: string;
    img_list?: Array<any>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
import promptAction from '@ohos.promptAction';
import router from '@ohos.router';
import http from '@ohos.net.http';
import data_preferences from '@ohos.data.preferences';
import featureAbility from '@ohos.ability.featureAbility';
export class Picture extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('诱人美景', this, "message");
        this.__img_link = new ObservedPropertySimple('', this, "img_link");
        this.__img_tag = new ObservedPropertySimple('', this, "img_tag");
        this.img_list = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Picture_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.img_link !== undefined) {
            this.img_link = params.img_link;
        }
        if (params.img_tag !== undefined) {
            this.img_tag = params.img_tag;
        }
        if (params.img_list !== undefined) {
            this.img_list = params.img_list;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__img_link.aboutToBeDeleted();
        this.__img_tag.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __img_link: ObservedPropertySimple<string>;
    get img_link() {
        return this.__img_link.get();
    }
    set img_link(newValue: string) {
        this.__img_link.set(newValue);
    }
    private __img_tag: ObservedPropertySimple<string>;
    get img_tag() {
        return this.__img_tag.get();
    }
    set img_tag(newValue: string) {
        this.__img_tag.set(newValue);
    }
    private img_list: Array<any>;
    aboutToAppear() {
        http.createHttp().request('https://qqlykm.cn/api/fengjing/index?key=84MhdyhPdOY66ltcJhyukusPAI&type=json', (err, data) => {
            if (!err) {
                let target: any = JSON.parse(data.result.toString());
                this.img_link = target.data.cover;
                this.img_tag = target.data.tag;
            }
        });
        //   let context = featureAbility.getContext();
        //   let preferences = null;
        //   let promise = data_preferences.getPreferences(context, 'mystore');
        //   promise.then((object) => {
        //     preferences = object;
        //     preferences.get('cityList', [{'url':'','tag':''}]).then((value) => { this.img_list = this.img_list.concat(value); });
        //     console.info("Succeeded in getting preferences.");
        //   }).catch((err) => {
        //     console.log("Failed to get preferences. code = " + err.code + ", message = " + err.message);
        //   })
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Text.create(this.message);
        Text.fontSize(40);
        Text.fontColor(Color.Brown);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Image.create(this.img_link);
        Image.width("90%");
        Image.height("75%");
        Text.create(this.img_tag);
        Text.fontSize(25);
        Text.fontColor(Color.Black);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Row.create();
        // Button('保存图像')
        //   .onClick(() => {
        //   let context = featureAbility.getContext();
        //   let preferences = null;
        //   let promise = data_preferences.getPreferences(context, 'mystore');
        //   promise.then((object) => {
        //     preferences = object;
        //     this.img
        Button.createWithLabel('返回主页');
        // Button('保存图像')
        //   .onClick(() => {
        //   let context = featureAbility.getContext();
        //   let preferences = null;
        //   let promise = data_preferences.getPreferences(context, 'mystore');
        //   promise.then((object) => {
        //     preferences = object;
        //     this.img
        Button.width(100);
        // Button('保存图像')
        //   .onClick(() => {
        //   let context = featureAbility.getContext();
        //   let preferences = null;
        //   let promise = data_preferences.getPreferences(context, 'mystore');
        //   promise.then((object) => {
        //     preferences = object;
        //     this.img
        Button.backgroundColor(Color.Gray);
        // Button('保存图像')
        //   .onClick(() => {
        //   let context = featureAbility.getContext();
        //   let preferences = null;
        //   let promise = data_preferences.getPreferences(context, 'mystore');
        //   promise.then((object) => {
        //     preferences = object;
        //     this.img
        Button.margin({
            bottom: 40
        });
        // Button('保存图像')
        //   .onClick(() => {
        //   let context = featureAbility.getContext();
        //   let preferences = null;
        //   let promise = data_preferences.getPreferences(context, 'mystore');
        //   promise.then((object) => {
        //     preferences = object;
        //     this.img
        Button.onClick(() => {
            router.pushUrl({ url: 'pages/FirstPage',
                params: { img: this.img_list } });
        });
        // Button('保存图像')
        //   .onClick(() => {
        //   let context = featureAbility.getContext();
        //   let preferences = null;
        //   let promise = data_preferences.getPreferences(context, 'mystore');
        //   promise.then((object) => {
        //     preferences = object;
        //     this.img
        Button.pop();
        Button.createWithLabel('重新生成');
        Button.width(100);
        Button.backgroundColor(Color.Gray);
        Button.margin({
            bottom: 40
        });
        Button.fontColor(Color.Orange);
        Button.onClick(() => http.createHttp().request('https://qqlykm.cn/api/fengjing/index?key=84MhdyhPdOY66ltcJhyukusPAI&type=json', (err, data) => {
            if (!err) {
                let target: any = JSON.parse(data.result.toString());
                this.img_link = target.data.cover;
                this.img_tag = target.data.tag;
            }
        }));
        Button.pop();
        Row.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Picture("1", undefined, {}));
