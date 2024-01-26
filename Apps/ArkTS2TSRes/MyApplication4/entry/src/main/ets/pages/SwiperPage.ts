interface SwiperPage_Params {
    message?: string;
    friend?: string[];
    controller?: SwiperController;
    controller2?: SwiperController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SwiperPage_" + ++__generate__Id;
}
import router from '@ohos.router';
import { Swiper_Data } from "../Model/imagedata";
class SwiperPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.__friend = new ObservedPropertyObject(["zhangsan", "lisi", "wangwu"], this, "friend");
        this.controller = new SwiperController();
        this.controller2 = new SwiperController();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SwiperPage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.friend !== undefined) {
            this.friend = params.friend;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.controller2 !== undefined) {
            this.controller2 = params.controller2;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__friend.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __friend: ObservedPropertyObject<string[]>;
    get friend() {
        return this.__friend.get();
    }
    set friend(newValue: string[]) {
        this.__friend.set(newValue);
    }
    private controller: SwiperController;
    private controller2: SwiperController;
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Text.create(this.message);
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        ForEach.create("2", this, ObservedObject.GetRawObject(this.friend), (item: string) => {
            Text.create(`${item}`);
            Text.fontColor(Color.Orange);
            Text.fontSize(34);
            Text.pop();
        });
        ForEach.pop();
        //滑动
        Swiper.create(this.controller);
        //滑动
        Swiper.autoPlay(true);
        ForEach.create("3", this, ObservedObject.GetRawObject(this.friend), (item: string) => {
            Text.create(`${item}`);
            Text.fontColor(Color.Orange);
            Text.fontSize(34);
            Text.height(200);
            Text.backgroundColor(Color.Black);
            Text.width(200);
            Text.pop();
        });
        ForEach.pop();
        //滑动
        Swiper.pop();
        Swiper.create(this.controller2);
        Swiper.autoPlay(true);
        ForEach.create("4", this, ObservedObject.GetRawObject(Swiper_Data), item => {
            Image.create(item.image);
            Image.height(200);
            Image.width(200);
            Image.onClick(() => {
                router.pushUrl({
                    url: item.url
                });
            });
        });
        ForEach.pop();
        Swiper.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new SwiperPage("1", undefined, {}));
