interface SettingPage_Params {
    message?: string;
    scroller?: Scroller;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SettingPage_" + ++__generate__Id;
}
// import { Tabss } from './Tabs'
import promptAction from '@ohos.promptAction';
import router from '@ohos.router';
import hilog from '@ohos.hilog';
import { Tabss3 } from './Tabss3';
class SettingPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.scroller = new Scroller();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SettingPage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
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
    private scroller: Scroller;
    render() {
        Scroll.create(this.scroller);
        Column.create();
        Column.width('100%');
        Column.height(800);
        Column.backgroundColor(Color.Pink);
        // Row() {
        //   Image($r("app.media.back")).margin({ top: 20 }).width(20).onClick(() => {
        //     router.pushUrl({
        //       url: "pages/TabPage",
        //     })
        //   })
        // }.justifyContent(FlexAlign.Start).width("80%").alignItems(VerticalAlign.Top)
        // Text("设置")
        //   .fontSize(50)
        //   .fontWeight(FontWeight.Bolder)
        //   .margin({ top: 15 })
        Row.create({ space: 10 });
        // Row() {
        //   Image($r("app.media.back")).margin({ top: 20 }).width(20).onClick(() => {
        //     router.pushUrl({
        //       url: "pages/TabPage",
        //     })
        //   })
        // }.justifyContent(FlexAlign.Start).width("80%").alignItems(VerticalAlign.Top)
        // Text("设置")
        //   .fontSize(50)
        //   .fontWeight(FontWeight.Bolder)
        //   .margin({ top: 15 })
        Row.width("100%");
        // Row() {
        //   Image($r("app.media.back")).margin({ top: 20 }).width(20).onClick(() => {
        //     router.pushUrl({
        //       url: "pages/TabPage",
        //     })
        //   })
        // }.justifyContent(FlexAlign.Start).width("80%").alignItems(VerticalAlign.Top)
        // Text("设置")
        //   .fontSize(50)
        //   .fontWeight(FontWeight.Bolder)
        //   .margin({ top: 15 })
        Row.width("100%");
        // Row() {
        //   Image($r("app.media.back")).margin({ top: 20 }).width(20).onClick(() => {
        //     router.pushUrl({
        //       url: "pages/TabPage",
        //     })
        //   })
        // }.justifyContent(FlexAlign.Start).width("80%").alignItems(VerticalAlign.Top)
        // Text("设置")
        //   .fontSize(50)
        //   .fontWeight(FontWeight.Bolder)
        //   .margin({ top: 15 })
        Row.padding(10);
        // Row() {
        //   Image($r("app.media.back")).margin({ top: 20 }).width(20).onClick(() => {
        //     router.pushUrl({
        //       url: "pages/TabPage",
        //     })
        //   })
        // }.justifyContent(FlexAlign.Start).width("80%").alignItems(VerticalAlign.Top)
        // Text("设置")
        //   .fontSize(50)
        //   .fontWeight(FontWeight.Bolder)
        //   .margin({ top: 15 })
        Row.backgroundColor(Color.White);
        // Row() {
        //   Image($r("app.media.back")).margin({ top: 20 }).width(20).onClick(() => {
        //     router.pushUrl({
        //       url: "pages/TabPage",
        //     })
        //   })
        // }.justifyContent(FlexAlign.Start).width("80%").alignItems(VerticalAlign.Top)
        // Text("设置")
        //   .fontSize(50)
        //   .fontWeight(FontWeight.Bolder)
        //   .margin({ top: 15 })
        Row.margin({
            bottom: 10
        });
        // 常用设置(转到ComSettingPage)
        Image.create($r("app.media.back"));
        // 常用设置(转到ComSettingPage)
        Image.width(30);
        // 常用设置(转到ComSettingPage)
        Image.margin(7);
        // 常用设置(转到ComSettingPage)
        Image.fillColor(Color.Brown);
        // 常用设置(转到ComSettingPage)
        Image.onClick(() => {
            router.pushUrl({
                url: "pages/TabPage"
            });
        });
        Text.create("设置");
        Text.fontSize(20);
        Text.margin({
            left: 156
        });
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        // Row() {
        //   Image($r("app.media.back")).margin({ top: 20 }).width(20).onClick(() => {
        //     router.pushUrl({
        //       url: "pages/TabPage",
        //     })
        //   })
        // }.justifyContent(FlexAlign.Start).width("80%").alignItems(VerticalAlign.Top)
        // Text("设置")
        //   .fontSize(50)
        //   .fontWeight(FontWeight.Bolder)
        //   .margin({ top: 15 })
        Row.pop();
        Column.create();
        Text.create("全局");
        Text.fontSize(20);
        Text.textAlign(TextAlign.Start);
        Text.margin(15);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Column.borderWidth(1);
        Column.borderRadius(15);
        Column.backgroundColor(Color.White);
        Column.borderColor(Color.Gray);
        Row.create();
        Row.margin(15);
        Image.create($r("app.media.yun"));
        Image.width(20);
        Text.create("数据同步");
        Text.fontSize(16);
        Text.textAlign(TextAlign.Start);
        Text.margin(15);
        Text.pop();
        Blank.create(195);
        Blank.pop();
        Toggle.create({ type: ToggleType.Switch });
        Toggle.selectedColor(Color.Pink);
        Toggle.margin({ right: 15 });
        Toggle.onChange((isOn: boolean) => {
            if (isOn) {
                promptAction.showToast({ message: 'plusone is on.' });
            }
            else {
                promptAction.showToast({ message: 'plusone is off.' });
            }
        });
        Toggle.pop();
        Row.pop();
        Divider.create();
        Divider.width("80%");
        __Common__.create();
        __Common__.margin(15);
        let earlierCreatedChild_2: Tabss3 = (this && this.findChildById) ? this.findChildById("2") as Tabss3 : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new Tabss3("2", this, {
                text: "主题颜色",
                img: $r("app.media.zhuti")
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                text: "主题颜色",
                img: $r("app.media.zhuti")
            });
            View.create(earlierCreatedChild_2);
        }
        __Common__.pop();
        Divider.create();
        Divider.width("80%");
        Row.create();
        Row.margin(15);
        Image.create($r("app.media.passwordsuo"));
        Image.width(20);
        Text.create("密码锁");
        Text.fontSize(16);
        Text.textAlign(TextAlign.Start);
        Text.margin(15);
        Text.pop();
        Blank.create(210);
        Blank.pop();
        Toggle.create({ type: ToggleType.Switch });
        Toggle.selectedColor(Color.Pink);
        Toggle.margin({ right: 15 });
        Toggle.onChange((isOn: boolean) => {
            if (isOn) {
                promptAction.showToast({ message: 'plusone is on.' });
            }
            else {
                promptAction.showToast({ message: 'plusone is off.' });
            }
        });
        Toggle.pop();
        Row.pop();
        Column.pop();
        Row.create();
        Row.borderWidth(1);
        Row.borderRadius(15);
        Row.backgroundColor(Color.White);
        Row.borderColor(Color.Gray);
        Row.margin({ top: 10 });
        __Common__.create();
        __Common__.margin(15);
        __Common__.onClick(() => {
            promptAction.showActionMenu({
                title: "标签管理",
                buttons: [
                    {
                        text: "倒计时",
                        color: $r("app.color.start_window_background")
                    },
                    {
                        text: "生日",
                        color: $r("app.color.start_window_background")
                    },
                    {
                        text: "纪念日",
                        color: $r("app.color.start_window_background")
                    },
                    {
                        text: "有效期",
                        color: $r("app.color.start_window_background")
                    },
                    {
                        text: "学习",
                        color: $r("app.color.start_window_background")
                    },
                    {
                        text: "考试",
                        color: $r("app.color.start_window_background")
                    }
                ]
            });
        });
        let earlierCreatedChild_3: Tabss3 = (this && this.findChildById) ? this.findChildById("3") as Tabss3 : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new Tabss3("3", this, {
                text: "标签管理",
                img: $r("app.media.label")
            }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                text: "标签管理",
                img: $r("app.media.label")
            });
            View.create(earlierCreatedChild_3);
        }
        __Common__.pop();
        Row.pop();
        Text.create("首页");
        Text.fontSize(20);
        Text.margin(15);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Row.create();
        Row.borderWidth(1);
        Row.borderRadius(15);
        Row.backgroundColor(Color.White);
        Row.borderColor(Color.Gray);
        __Common__.create();
        __Common__.margin(15);
        __Common__.onClick(() => {
            promptAction.showActionMenu({
                title: "选择颜色排序方式",
                buttons: [
                    {
                        text: "按使用次数",
                        color: $r("app.color.start_window_background")
                    },
                    {
                        text: "随机",
                        color: $r("app.color.start_window_background")
                    },
                    {
                        text: "按光谱",
                        color: $r("app.color.start_window_background")
                    }
                ]
            });
        });
        let earlierCreatedChild_4: Tabss3 = (this && this.findChildById) ? this.findChildById("4") as Tabss3 : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new Tabss3("4", this, {
                text: "颜色排序",
                img: $r("app.media.abc")
            }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({
                text: "颜色排序",
                img: $r("app.media.abc")
            });
            View.create(earlierCreatedChild_4);
        }
        __Common__.pop();
        Row.pop();
        Text.create("工具");
        Text.fontSize(20);
        Text.margin(15);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Column.create();
        Column.borderWidth(1);
        Column.borderRadius(15);
        Column.backgroundColor(Color.White);
        Column.borderColor(Color.Gray);
        Row.create();
        Row.margin(15);
        Image.create($r("app.media.notification"));
        Image.width(20);
        Text.create("显示小红点");
        Text.fontSize(16);
        Text.margin(15);
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Blank.create(180);
        Blank.pop();
        Toggle.create({ type: ToggleType.Switch });
        Toggle.selectedColor(Color.Pink);
        Toggle.margin({ right: 15 });
        Toggle.onChange((isOn: boolean) => {
            if (isOn) {
                promptAction.showToast({ message: 'plusone is on.' });
            }
            else {
                promptAction.showToast({ message: 'plusone is off.' });
            }
        });
        Toggle.pop();
        Row.pop();
        Column.pop();
        Column.pop();
        Column.pop();
        Scroll.pop();
    }
}
loadDocument(new SettingPage("1", undefined, {}));
