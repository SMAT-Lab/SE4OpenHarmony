interface DiscoveryPage_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "DiscoveryPage_" + ++__generate__Id;
}
import { WeChatItemStyle, MyDivider, WeChatTitle } from '../model/CommonStyle';
export class DiscoveryPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: DiscoveryPage_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Column.width('100%');
        Column.height('100%');
        let earlierCreatedChild_2: WeChatTitle = (this && this.findChildById) ? this.findChildById("2") as WeChatTitle : undefined;
        if (earlierCreatedChild_2 == undefined) {
            // 标题
            View.create(new WeChatTitle("2", this, { text: "发现" }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                text: "发现"
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        let earlierCreatedChild_3: WeChatItemStyle = (this && this.findChildById) ? this.findChildById("3") as WeChatItemStyle : undefined;
        if (earlierCreatedChild_3 == undefined) {
            // 列表
            View.create(new WeChatItemStyle("3", this, { imageSrc: "moments.png", text: "朋友圈" }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                imageSrc: "moments.png", text: "朋友圈"
            });
            if (!earlierCreatedChild_3.needsUpdate()) {
                earlierCreatedChild_3.markStatic();
            }
            View.create(earlierCreatedChild_3);
        }
        let earlierCreatedChild_4: MyDivider = (this && this.findChildById) ? this.findChildById("4") as MyDivider : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new MyDivider("4", this, {}));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({});
            if (!earlierCreatedChild_4.needsUpdate()) {
                earlierCreatedChild_4.markStatic();
            }
            View.create(earlierCreatedChild_4);
        }
        let earlierCreatedChild_5: WeChatItemStyle = (this && this.findChildById) ? this.findChildById("5") as WeChatItemStyle : undefined;
        if (earlierCreatedChild_5 == undefined) {
            View.create(new WeChatItemStyle("5", this, { imageSrc: "shipinghao.png", text: "视频号" }));
        }
        else {
            earlierCreatedChild_5.updateWithValueParams({
                imageSrc: "shipinghao.png", text: "视频号"
            });
            if (!earlierCreatedChild_5.needsUpdate()) {
                earlierCreatedChild_5.markStatic();
            }
            View.create(earlierCreatedChild_5);
        }
        let earlierCreatedChild_6: MyDivider = (this && this.findChildById) ? this.findChildById("6") as MyDivider : undefined;
        if (earlierCreatedChild_6 == undefined) {
            View.create(new MyDivider("6", this, { style: '1' }));
        }
        else {
            earlierCreatedChild_6.updateWithValueParams({
                style: '1'
            });
            if (!earlierCreatedChild_6.needsUpdate()) {
                earlierCreatedChild_6.markStatic();
            }
            View.create(earlierCreatedChild_6);
        }
        let earlierCreatedChild_7: WeChatItemStyle = (this && this.findChildById) ? this.findChildById("7") as WeChatItemStyle : undefined;
        if (earlierCreatedChild_7 == undefined) {
            View.create(new WeChatItemStyle("7", this, { imageSrc: "zb.png", text: "直播" }));
        }
        else {
            earlierCreatedChild_7.updateWithValueParams({
                imageSrc: "zb.png", text: "直播"
            });
            if (!earlierCreatedChild_7.needsUpdate()) {
                earlierCreatedChild_7.markStatic();
            }
            View.create(earlierCreatedChild_7);
        }
        let earlierCreatedChild_8: MyDivider = (this && this.findChildById) ? this.findChildById("8") as MyDivider : undefined;
        if (earlierCreatedChild_8 == undefined) {
            View.create(new MyDivider("8", this, {}));
        }
        else {
            earlierCreatedChild_8.updateWithValueParams({});
            if (!earlierCreatedChild_8.needsUpdate()) {
                earlierCreatedChild_8.markStatic();
            }
            View.create(earlierCreatedChild_8);
        }
        let earlierCreatedChild_9: WeChatItemStyle = (this && this.findChildById) ? this.findChildById("9") as WeChatItemStyle : undefined;
        if (earlierCreatedChild_9 == undefined) {
            View.create(new WeChatItemStyle("9", this, { imageSrc: "sys.png", text: "扫一扫" }));
        }
        else {
            earlierCreatedChild_9.updateWithValueParams({
                imageSrc: "sys.png", text: "扫一扫"
            });
            if (!earlierCreatedChild_9.needsUpdate()) {
                earlierCreatedChild_9.markStatic();
            }
            View.create(earlierCreatedChild_9);
        }
        let earlierCreatedChild_10: MyDivider = (this && this.findChildById) ? this.findChildById("10") as MyDivider : undefined;
        if (earlierCreatedChild_10 == undefined) {
            View.create(new MyDivider("10", this, { style: '1' }));
        }
        else {
            earlierCreatedChild_10.updateWithValueParams({
                style: '1'
            });
            if (!earlierCreatedChild_10.needsUpdate()) {
                earlierCreatedChild_10.markStatic();
            }
            View.create(earlierCreatedChild_10);
        }
        let earlierCreatedChild_11: WeChatItemStyle = (this && this.findChildById) ? this.findChildById("11") as WeChatItemStyle : undefined;
        if (earlierCreatedChild_11 == undefined) {
            View.create(new WeChatItemStyle("11", this, { imageSrc: "yyy.png", text: "摇一摇" }));
        }
        else {
            earlierCreatedChild_11.updateWithValueParams({
                imageSrc: "yyy.png", text: "摇一摇"
            });
            if (!earlierCreatedChild_11.needsUpdate()) {
                earlierCreatedChild_11.markStatic();
            }
            View.create(earlierCreatedChild_11);
        }
        let earlierCreatedChild_12: MyDivider = (this && this.findChildById) ? this.findChildById("12") as MyDivider : undefined;
        if (earlierCreatedChild_12 == undefined) {
            View.create(new MyDivider("12", this, {}));
        }
        else {
            earlierCreatedChild_12.updateWithValueParams({});
            if (!earlierCreatedChild_12.needsUpdate()) {
                earlierCreatedChild_12.markStatic();
            }
            View.create(earlierCreatedChild_12);
        }
        let earlierCreatedChild_13: WeChatItemStyle = (this && this.findChildById) ? this.findChildById("13") as WeChatItemStyle : undefined;
        if (earlierCreatedChild_13 == undefined) {
            View.create(new WeChatItemStyle("13", this, { imageSrc: "kyk.png", text: "看一看" }));
        }
        else {
            earlierCreatedChild_13.updateWithValueParams({
                imageSrc: "kyk.png", text: "看一看"
            });
            if (!earlierCreatedChild_13.needsUpdate()) {
                earlierCreatedChild_13.markStatic();
            }
            View.create(earlierCreatedChild_13);
        }
        let earlierCreatedChild_14: MyDivider = (this && this.findChildById) ? this.findChildById("14") as MyDivider : undefined;
        if (earlierCreatedChild_14 == undefined) {
            View.create(new MyDivider("14", this, { style: '1' }));
        }
        else {
            earlierCreatedChild_14.updateWithValueParams({
                style: '1'
            });
            if (!earlierCreatedChild_14.needsUpdate()) {
                earlierCreatedChild_14.markStatic();
            }
            View.create(earlierCreatedChild_14);
        }
        let earlierCreatedChild_15: WeChatItemStyle = (this && this.findChildById) ? this.findChildById("15") as WeChatItemStyle : undefined;
        if (earlierCreatedChild_15 == undefined) {
            View.create(new WeChatItemStyle("15", this, { imageSrc: "souyisou.png", text: "搜一搜" }));
        }
        else {
            earlierCreatedChild_15.updateWithValueParams({
                imageSrc: "souyisou.png", text: "搜一搜"
            });
            if (!earlierCreatedChild_15.needsUpdate()) {
                earlierCreatedChild_15.markStatic();
            }
            View.create(earlierCreatedChild_15);
        }
        let earlierCreatedChild_16: MyDivider = (this && this.findChildById) ? this.findChildById("16") as MyDivider : undefined;
        if (earlierCreatedChild_16 == undefined) {
            View.create(new MyDivider("16", this, {}));
        }
        else {
            earlierCreatedChild_16.updateWithValueParams({});
            if (!earlierCreatedChild_16.needsUpdate()) {
                earlierCreatedChild_16.markStatic();
            }
            View.create(earlierCreatedChild_16);
        }
        let earlierCreatedChild_17: WeChatItemStyle = (this && this.findChildById) ? this.findChildById("17") as WeChatItemStyle : undefined;
        if (earlierCreatedChild_17 == undefined) {
            View.create(new WeChatItemStyle("17", this, { imageSrc: "fujin.png", text: "附近" }));
        }
        else {
            earlierCreatedChild_17.updateWithValueParams({
                imageSrc: "fujin.png", text: "附近"
            });
            if (!earlierCreatedChild_17.needsUpdate()) {
                earlierCreatedChild_17.markStatic();
            }
            View.create(earlierCreatedChild_17);
        }
        let earlierCreatedChild_18: MyDivider = (this && this.findChildById) ? this.findChildById("18") as MyDivider : undefined;
        if (earlierCreatedChild_18 == undefined) {
            View.create(new MyDivider("18", this, {}));
        }
        else {
            earlierCreatedChild_18.updateWithValueParams({});
            if (!earlierCreatedChild_18.needsUpdate()) {
                earlierCreatedChild_18.markStatic();
            }
            View.create(earlierCreatedChild_18);
        }
        let earlierCreatedChild_19: WeChatItemStyle = (this && this.findChildById) ? this.findChildById("19") as WeChatItemStyle : undefined;
        if (earlierCreatedChild_19 == undefined) {
            View.create(new WeChatItemStyle("19", this, { imageSrc: "gw.png", text: "购物" }));
        }
        else {
            earlierCreatedChild_19.updateWithValueParams({
                imageSrc: "gw.png", text: "购物"
            });
            if (!earlierCreatedChild_19.needsUpdate()) {
                earlierCreatedChild_19.markStatic();
            }
            View.create(earlierCreatedChild_19);
        }
        let earlierCreatedChild_20: MyDivider = (this && this.findChildById) ? this.findChildById("20") as MyDivider : undefined;
        if (earlierCreatedChild_20 == undefined) {
            View.create(new MyDivider("20", this, { style: '1' }));
        }
        else {
            earlierCreatedChild_20.updateWithValueParams({
                style: '1'
            });
            if (!earlierCreatedChild_20.needsUpdate()) {
                earlierCreatedChild_20.markStatic();
            }
            View.create(earlierCreatedChild_20);
        }
        let earlierCreatedChild_21: WeChatItemStyle = (this && this.findChildById) ? this.findChildById("21") as WeChatItemStyle : undefined;
        if (earlierCreatedChild_21 == undefined) {
            View.create(new WeChatItemStyle("21", this, { imageSrc: "game.png", text: "游戏" }));
        }
        else {
            earlierCreatedChild_21.updateWithValueParams({
                imageSrc: "game.png", text: "游戏"
            });
            if (!earlierCreatedChild_21.needsUpdate()) {
                earlierCreatedChild_21.markStatic();
            }
            View.create(earlierCreatedChild_21);
        }
        let earlierCreatedChild_22: MyDivider = (this && this.findChildById) ? this.findChildById("22") as MyDivider : undefined;
        if (earlierCreatedChild_22 == undefined) {
            View.create(new MyDivider("22", this, {}));
        }
        else {
            earlierCreatedChild_22.updateWithValueParams({});
            if (!earlierCreatedChild_22.needsUpdate()) {
                earlierCreatedChild_22.markStatic();
            }
            View.create(earlierCreatedChild_22);
        }
        let earlierCreatedChild_23: WeChatItemStyle = (this && this.findChildById) ? this.findChildById("23") as WeChatItemStyle : undefined;
        if (earlierCreatedChild_23 == undefined) {
            View.create(new WeChatItemStyle("23", this, { imageSrc: "xcx.png", text: "小程序" }));
        }
        else {
            earlierCreatedChild_23.updateWithValueParams({
                imageSrc: "xcx.png", text: "小程序"
            });
            if (!earlierCreatedChild_23.needsUpdate()) {
                earlierCreatedChild_23.markStatic();
            }
            View.create(earlierCreatedChild_23);
        }
        let earlierCreatedChild_24: MyDivider = (this && this.findChildById) ? this.findChildById("24") as MyDivider : undefined;
        if (earlierCreatedChild_24 == undefined) {
            View.create(new MyDivider("24", this, {}));
        }
        else {
            earlierCreatedChild_24.updateWithValueParams({});
            if (!earlierCreatedChild_24.needsUpdate()) {
                earlierCreatedChild_24.markStatic();
            }
            View.create(earlierCreatedChild_24);
        }
        Column.pop();
    }
}
