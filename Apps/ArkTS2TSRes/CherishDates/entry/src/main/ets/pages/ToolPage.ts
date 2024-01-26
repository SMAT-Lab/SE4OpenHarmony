interface ToolPage_Params {
    message?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ToolPage_" + ++__generate__Id;
}
import { compTool } from './compTool';
import router from '@ohos.router';
import http from '@ohos.net.http';
import { JitangModel } from '../Model/JitangModel';
export class ToolPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ToolPage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
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
    render() {
        Row.create();
        Row.alignItems(VerticalAlign.Top);
        Column.create();
        Column.alignItems(HorizontalAlign.Center);
        // Part1：首页最顶白条 ”Tools“
        Row.create();
        // Part1：首页最顶白条 ”Tools“
        Row.alignItems(VerticalAlign.Top);
        Column.create();
        Column.width("100%");
        Column.margin(20);
        Column.padding(20);
        Column.height("9%");
        Column.backgroundColor(Color.White);
        Text.create("Tools     ");
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Column.pop();
        // Part1：首页最顶白条 ”Tools“
        Row.pop();
        __Common__.create();
        __Common__.onClick(() => {
            router.pushUrl({
                url: "pages/JitangPage"
            });
        });
        let earlierCreatedChild_2: compTool = (this && this.findChildById) ? this.findChildById("2") as compTool : undefined;
        if (earlierCreatedChild_2 == undefined) {
            // Part2：添加多个工具
            View.create(new compTool("2", this, {
                tool: "每日打气",
                intro: "每日一句正能量，开启鲜活一天！"
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                tool: "每日打气",
                intro: "每日一句正能量，开启鲜活一天！"
            });
            View.create(earlierCreatedChild_2);
        }
        __Common__.pop();
        __Common__.create();
        __Common__.onClick(() => {
            router.pushUrl({
                url: "pages/XingzuoPage"
            });
        });
        let earlierCreatedChild_3: compTool = (this && this.findChildById) ? this.findChildById("3") as compTool : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new compTool("3", this, {
                tool: "星座运势",
                intro: "根据日期或星座名称,查询星座详细信息~",
                img: $r("app.media.xingzuo")
            }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                tool: "星座运势",
                intro: "根据日期或星座名称,查询星座详细信息~",
                img: $r("app.media.xingzuo")
            });
            View.create(earlierCreatedChild_3);
        }
        __Common__.pop();
        __Common__.create();
        __Common__.onClick(() => {
            router.pushUrl({
                url: "pages/CutiePetPage"
            });
        });
        let earlierCreatedChild_4: compTool = (this && this.findChildById) ? this.findChildById("4") as compTool : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new compTool("4", this, {
                tool: "治愈萌宠",
                intro: "与可爱的治愈萌宠一起放松身心，享受纯粹的快乐时光！",
                img: $r("app.media.cat")
            }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({
                tool: "治愈萌宠",
                intro: "与可爱的治愈萌宠一起放松身心，享受纯粹的快乐时光！",
                img: $r("app.media.cat")
            });
            View.create(earlierCreatedChild_4);
        }
        __Common__.pop();
        __Common__.create();
        __Common__.onClick(() => {
            router.pushUrl({
                url: "pages/WhitenoisePage"
            });
        });
        let earlierCreatedChild_5: compTool = (this && this.findChildById) ? this.findChildById("5") as compTool : undefined;
        if (earlierCreatedChild_5 == undefined) {
            View.create(new compTool("5", this, {
                tool: "静心白噪",
                intro: "带您进入宁静世界，舒缓压力，提供放松和专注的美妙体验。",
                img: $r("app.media.whitenoise")
            }));
        }
        else {
            earlierCreatedChild_5.updateWithValueParams({
                tool: "静心白噪",
                intro: "带您进入宁静世界，舒缓压力，提供放松和专注的美妙体验。",
                img: $r("app.media.whitenoise")
            });
            View.create(earlierCreatedChild_5);
        }
        __Common__.pop();
        __Common__.create();
        __Common__.onClick(() => {
            router.pushUrl({
                url: "pages/WenanPage"
            });
        });
        let earlierCreatedChild_6: compTool = (this && this.findChildById) ? this.findChildById("6") as compTool : undefined;
        if (earlierCreatedChild_6 == undefined) {
            View.create(new compTool("6", this, {
                tool: "文案生成",
                intro: "还在苦想朋友圈文案吗？让我来帮你吧！",
                img: $r("app.media.wenan2")
            }));
        }
        else {
            earlierCreatedChild_6.updateWithValueParams({
                tool: "文案生成",
                intro: "还在苦想朋友圈文案吗？让我来帮你吧！",
                img: $r("app.media.wenan2")
            });
            View.create(earlierCreatedChild_6);
        }
        __Common__.pop();
        __Common__.create();
        __Common__.onClick(() => {
            router.pushUrl({
                url: "pages/XiaohuaPage"
            });
        });
        let earlierCreatedChild_7: compTool = (this && this.findChildById) ? this.findChildById("7") as compTool : undefined;
        if (earlierCreatedChild_7 == undefined) {
            View.create(new compTool("7", this, {
                tool: "轻松一刻",
                intro: "笑一笑，十年少:D",
                img: $r("app.media.xiaohua")
            }));
        }
        else {
            earlierCreatedChild_7.updateWithValueParams({
                tool: "轻松一刻",
                intro: "笑一笑，十年少:D",
                img: $r("app.media.xiaohua")
            });
            View.create(earlierCreatedChild_7);
        }
        __Common__.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new ToolPage("1", undefined, {}));
