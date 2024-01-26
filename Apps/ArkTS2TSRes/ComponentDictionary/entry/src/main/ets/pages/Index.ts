interface DialogList_Params {
    listArray?: Array<ComponentItem>;
}
interface MediaList_Params {
    listArray?: Array<ComponentItem>;
}
interface CotainerList_Params {
    listArray?: Array<ComponentItem>;
}
interface BaseList_Params {
    listArray?: Array<ComponentItem>;
}
interface Index_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
import router from '@ohos.router';
import { initializeOnStartup } from '../model/Model';
import { ComponentItem } from '../model/Model';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Column.width('100%');
        Text.create('ArkTS Components list');
        Text.fontSize(35);
        Text.fontWeight(700);
        Text.fontColor(0x366bfc);
        Text.fontStyle(FontStyle.Italic);
        Text.margin({ top: 5, left: 40, bottom: 5 });
        Text.pop();
        Tabs.create();
        Tabs.barWidth(500);
        Tabs.barHeight(50);
        Tabs.scrollable(true);
        Tabs.barMode(BarMode.Scrollable);
        Tabs.height(630);
        Tabs.backgroundColor(0xF5F5F5);
        TabContent.create();
        TabContent.tabBar('基础组件');
        let earlierCreatedChild_2: BaseList = (this && this.findChildById) ? this.findChildById("2") as BaseList : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new BaseList("2", this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        TabContent.pop();
        TabContent.create();
        TabContent.tabBar('容器组件');
        let earlierCreatedChild_3: CotainerList = (this && this.findChildById) ? this.findChildById("3") as CotainerList : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new CotainerList("3", this, {}));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({});
            if (!earlierCreatedChild_3.needsUpdate()) {
                earlierCreatedChild_3.markStatic();
            }
            View.create(earlierCreatedChild_3);
        }
        TabContent.pop();
        TabContent.create();
        TabContent.tabBar('媒体组件');
        let earlierCreatedChild_4: MediaList = (this && this.findChildById) ? this.findChildById("4") as MediaList : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new MediaList("4", this, {}));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({});
            if (!earlierCreatedChild_4.needsUpdate()) {
                earlierCreatedChild_4.markStatic();
            }
            View.create(earlierCreatedChild_4);
        }
        TabContent.pop();
        TabContent.create();
        TabContent.tabBar('弹窗');
        let earlierCreatedChild_5: DialogList = (this && this.findChildById) ? this.findChildById("5") as DialogList : undefined;
        if (earlierCreatedChild_5 == undefined) {
            View.create(new DialogList("5", this, {}));
        }
        else {
            earlierCreatedChild_5.updateWithValueParams({});
            if (!earlierCreatedChild_5.needsUpdate()) {
                earlierCreatedChild_5.markStatic();
            }
            View.create(earlierCreatedChild_5);
        }
        TabContent.pop();
        Tabs.pop();
        Column.pop();
    }
}
class BaseList extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.listArray = [];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: BaseList_Params) {
        if (params.listArray !== undefined) {
            this.listArray = params.listArray;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    //创建一个空数组，转存切割好的基础组件数据
    private listArray: Array<ComponentItem>;
    //获取数据
    aboutToAppear() {
        var newArray = initializeOnStartup();
        this.listArray = newArray.slice(0, 31);
    }
    render() {
        Column.create();
        List.create({ space: 4 });
        List.height('90%');
        List.width('90%');
        List.align(Alignment.Top);
        List.borderColor(Color.Gray);
        List.margin({ left: 20 });
        ForEach.create("6", this, ObservedObject.GetRawObject(this.listArray), item => {
            ListItem.create();
            ListItem.sticky(Sticky.Normal);
            Button.createWithLabel(item.componentName, { type: ButtonType.Normal });
            Button.width('100%');
            Button.height(56);
            Button.backgroundColor(0xFFFFFF);
            Button.fontColor('rgb(0, 0, 0)');
            Button.onClick(() => {
                router.push({
                    url: 'pages/componentDetail',
                    params: { name: item.componentName }
                });
            });
            Button.pop();
            ListItem.pop();
        }, item => item.id.toString());
        ForEach.pop();
        List.pop();
        Column.pop();
    }
}
class CotainerList extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.listArray = [];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CotainerList_Params) {
        if (params.listArray !== undefined) {
            this.listArray = params.listArray;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    //创建一个空数组，转存切割好的容器组件数据
    private listArray: Array<ComponentItem>;
    //获取数据
    aboutToAppear() {
        var newArray = initializeOnStartup();
        this.listArray = newArray.slice(31, 51);
    }
    render() {
        Column.create();
        List.create({ space: 4 });
        List.height('90%');
        List.width('90%');
        List.align(Alignment.Top);
        List.borderColor(Color.Gray);
        List.margin({ left: 20 });
        ForEach.create("7", this, ObservedObject.GetRawObject(this.listArray), item => {
            ListItem.create();
            ListItem.sticky(Sticky.Normal);
            Button.createWithLabel(item.componentName, { type: ButtonType.Normal });
            Button.width('100%');
            Button.height(56);
            Button.backgroundColor(0xFFFFFF);
            Button.fontColor('rgb(0, 0, 0)');
            Button.onClick(() => {
                router.push({
                    url: 'pages/componentDetail',
                    params: { name: item.componentName }
                });
            });
            Button.pop();
            ListItem.pop();
        }, item => item.id.toString());
        ForEach.pop();
        List.pop();
        Column.pop();
    }
}
class MediaList extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.listArray = [];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MediaList_Params) {
        if (params.listArray !== undefined) {
            this.listArray = params.listArray;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    //创建一个空数组，转存切割好的媒体组件数据
    private listArray: Array<ComponentItem>;
    //获取数据
    aboutToAppear() {
        var newArray = initializeOnStartup();
        this.listArray = newArray.slice(51, 52);
    }
    render() {
        Column.create();
        List.create({ space: 4 });
        List.height('90%');
        List.width('90%');
        List.align(Alignment.Top);
        List.borderColor(Color.Gray);
        List.margin({ left: 20 });
        ForEach.create("8", this, ObservedObject.GetRawObject(this.listArray), item => {
            ListItem.create();
            ListItem.sticky(Sticky.Normal);
            Button.createWithLabel(item.componentName, { type: ButtonType.Normal });
            Button.width('100%');
            Button.height(56);
            Button.backgroundColor(0xFFFFFF);
            Button.fontColor('rgb(0, 0, 0)');
            Button.onClick(() => {
                router.push({
                    url: 'pages/componentDetail',
                    params: { name: item.componentName }
                });
            });
            Button.pop();
            ListItem.pop();
        }, item => item.id.toString());
        ForEach.pop();
        List.pop();
        Column.pop();
    }
}
class DialogList extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.listArray = [];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: DialogList_Params) {
        if (params.listArray !== undefined) {
            this.listArray = params.listArray;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    //创建一个空数组，转存切割好的弹窗组件数据
    private listArray: Array<ComponentItem>;
    //获取数据
    aboutToAppear() {
        var newArray = initializeOnStartup();
        this.listArray = newArray.slice(52);
    }
    render() {
        Column.create();
        List.create({ space: 4 });
        List.height('90%');
        List.width('90%');
        List.align(Alignment.Top);
        List.borderColor(Color.Gray);
        List.margin({ left: 20 });
        ForEach.create("9", this, ObservedObject.GetRawObject(this.listArray), item => {
            ListItem.create();
            ListItem.sticky(Sticky.Normal);
            Button.createWithLabel(item.componentName, { type: ButtonType.Normal });
            Button.width('100%');
            Button.height(56);
            Button.backgroundColor(0xFFFFFF);
            Button.fontColor('rgb(0, 0, 0)');
            Button.onClick(() => {
                router.push({
                    url: 'pages/componentDetail',
                    params: { name: item.componentName }
                });
            });
            Button.pop();
            ListItem.pop();
        }, item => item.id.toString());
        ForEach.pop();
        List.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
