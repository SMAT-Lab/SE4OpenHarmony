interface MyPage_Params {
    imageTitle?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyPage_" + ++__generate__Id;
}
import { WeChatItemStyle, MyDivider } from '../model/CommonStyle';
export class MyPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.imageTitle = "title.png";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyPage_Params) {
        if (params.imageTitle !== undefined) {
            this.imageTitle = params.imageTitle;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private imageTitle: string;
    render() {
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Column.width('100%');
        Column.height('100%');
        // 用户信息部分
        Image.create($rawfile(this.imageTitle));
        // 用户信息部分
        Image.height(144);
        // 用户信息部分
        Image.width('100%');
        let earlierCreatedChild_2: WeChatItemStyle = (this && this.findChildById) ? this.findChildById("2") as WeChatItemStyle : undefined;
        if (earlierCreatedChild_2 == undefined) {
            // 列表
            View.create(new WeChatItemStyle("2", this, { imageSrc: "pay.png", text: "服务" }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                imageSrc: "pay.png", text: "服务"
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        let earlierCreatedChild_3: MyDivider = (this && this.findChildById) ? this.findChildById("3") as MyDivider : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new MyDivider("3", this, {}));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({});
            if (!earlierCreatedChild_3.needsUpdate()) {
                earlierCreatedChild_3.markStatic();
            }
            View.create(earlierCreatedChild_3);
        }
        let earlierCreatedChild_4: WeChatItemStyle = (this && this.findChildById) ? this.findChildById("4") as WeChatItemStyle : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new WeChatItemStyle("4", this, { imageSrc: "favorites.png", text: "收藏" }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({
                imageSrc: "favorites.png", text: "收藏"
            });
            if (!earlierCreatedChild_4.needsUpdate()) {
                earlierCreatedChild_4.markStatic();
            }
            View.create(earlierCreatedChild_4);
        }
        let earlierCreatedChild_5: MyDivider = (this && this.findChildById) ? this.findChildById("5") as MyDivider : undefined;
        if (earlierCreatedChild_5 == undefined) {
            View.create(new MyDivider("5", this, { style: '1' }));
        }
        else {
            earlierCreatedChild_5.updateWithValueParams({
                style: '1'
            });
            if (!earlierCreatedChild_5.needsUpdate()) {
                earlierCreatedChild_5.markStatic();
            }
            View.create(earlierCreatedChild_5);
        }
        let earlierCreatedChild_6: WeChatItemStyle = (this && this.findChildById) ? this.findChildById("6") as WeChatItemStyle : undefined;
        if (earlierCreatedChild_6 == undefined) {
            View.create(new WeChatItemStyle("6", this, { imageSrc: "moments2.png", text: "朋友圈" }));
        }
        else {
            earlierCreatedChild_6.updateWithValueParams({
                imageSrc: "moments2.png", text: "朋友圈"
            });
            if (!earlierCreatedChild_6.needsUpdate()) {
                earlierCreatedChild_6.markStatic();
            }
            View.create(earlierCreatedChild_6);
        }
        let earlierCreatedChild_7: MyDivider = (this && this.findChildById) ? this.findChildById("7") as MyDivider : undefined;
        if (earlierCreatedChild_7 == undefined) {
            View.create(new MyDivider("7", this, { style: '1' }));
        }
        else {
            earlierCreatedChild_7.updateWithValueParams({
                style: '1'
            });
            if (!earlierCreatedChild_7.needsUpdate()) {
                earlierCreatedChild_7.markStatic();
            }
            View.create(earlierCreatedChild_7);
        }
        let earlierCreatedChild_8: WeChatItemStyle = (this && this.findChildById) ? this.findChildById("8") as WeChatItemStyle : undefined;
        if (earlierCreatedChild_8 == undefined) {
            View.create(new WeChatItemStyle("8", this, { imageSrc: "video.png", text: "视频号" }));
        }
        else {
            earlierCreatedChild_8.updateWithValueParams({
                imageSrc: "video.png", text: "视频号"
            });
            if (!earlierCreatedChild_8.needsUpdate()) {
                earlierCreatedChild_8.markStatic();
            }
            View.create(earlierCreatedChild_8);
        }
        let earlierCreatedChild_9: MyDivider = (this && this.findChildById) ? this.findChildById("9") as MyDivider : undefined;
        if (earlierCreatedChild_9 == undefined) {
            View.create(new MyDivider("9", this, { style: '1' }));
        }
        else {
            earlierCreatedChild_9.updateWithValueParams({
                style: '1'
            });
            if (!earlierCreatedChild_9.needsUpdate()) {
                earlierCreatedChild_9.markStatic();
            }
            View.create(earlierCreatedChild_9);
        }
        let earlierCreatedChild_10: WeChatItemStyle = (this && this.findChildById) ? this.findChildById("10") as WeChatItemStyle : undefined;
        if (earlierCreatedChild_10 == undefined) {
            View.create(new WeChatItemStyle("10", this, { imageSrc: "card.png", text: "卡包" }));
        }
        else {
            earlierCreatedChild_10.updateWithValueParams({
                imageSrc: "card.png", text: "卡包"
            });
            if (!earlierCreatedChild_10.needsUpdate()) {
                earlierCreatedChild_10.markStatic();
            }
            View.create(earlierCreatedChild_10);
        }
        let earlierCreatedChild_11: MyDivider = (this && this.findChildById) ? this.findChildById("11") as MyDivider : undefined;
        if (earlierCreatedChild_11 == undefined) {
            View.create(new MyDivider("11", this, { style: '1' }));
        }
        else {
            earlierCreatedChild_11.updateWithValueParams({
                style: '1'
            });
            if (!earlierCreatedChild_11.needsUpdate()) {
                earlierCreatedChild_11.markStatic();
            }
            View.create(earlierCreatedChild_11);
        }
        let earlierCreatedChild_12: WeChatItemStyle = (this && this.findChildById) ? this.findChildById("12") as WeChatItemStyle : undefined;
        if (earlierCreatedChild_12 == undefined) {
            View.create(new WeChatItemStyle("12", this, { imageSrc: "emoticon.png", text: "表情" }));
        }
        else {
            earlierCreatedChild_12.updateWithValueParams({
                imageSrc: "emoticon.png", text: "表情"
            });
            if (!earlierCreatedChild_12.needsUpdate()) {
                earlierCreatedChild_12.markStatic();
            }
            View.create(earlierCreatedChild_12);
        }
        let earlierCreatedChild_13: MyDivider = (this && this.findChildById) ? this.findChildById("13") as MyDivider : undefined;
        if (earlierCreatedChild_13 == undefined) {
            View.create(new MyDivider("13", this, {}));
        }
        else {
            earlierCreatedChild_13.updateWithValueParams({});
            if (!earlierCreatedChild_13.needsUpdate()) {
                earlierCreatedChild_13.markStatic();
            }
            View.create(earlierCreatedChild_13);
        }
        let earlierCreatedChild_14: WeChatItemStyle = (this && this.findChildById) ? this.findChildById("14") as WeChatItemStyle : undefined;
        if (earlierCreatedChild_14 == undefined) {
            View.create(new WeChatItemStyle("14", this, { imageSrc: "setting.png", text: "设置" }));
        }
        else {
            earlierCreatedChild_14.updateWithValueParams({
                imageSrc: "setting.png", text: "设置"
            });
            if (!earlierCreatedChild_14.needsUpdate()) {
                earlierCreatedChild_14.markStatic();
            }
            View.create(earlierCreatedChild_14);
        }
        let earlierCreatedChild_15: MyDivider = (this && this.findChildById) ? this.findChildById("15") as MyDivider : undefined;
        if (earlierCreatedChild_15 == undefined) {
            View.create(new MyDivider("15", this, {}));
        }
        else {
            earlierCreatedChild_15.updateWithValueParams({});
            if (!earlierCreatedChild_15.needsUpdate()) {
                earlierCreatedChild_15.markStatic();
            }
            View.create(earlierCreatedChild_15);
        }
        Column.pop();
    }
}
