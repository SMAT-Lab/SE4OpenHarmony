interface NavigationPage_Params {
    index?: number;
    hideToolBar?: boolean;
    hideTitleBar?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "NavigationPage_" + ++__generate__Id;
}
import prompt from '@ohos.promptAction';
class NavigationPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__index = new ObservedPropertySimple(0, this, "index");
        this.__hideToolBar = new ObservedPropertySimple(false, this, "hideToolBar");
        this.__hideTitleBar = new ObservedPropertySimple(false, this, "hideTitleBar");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: NavigationPage_Params) {
        if (params.index !== undefined) {
            this.index = params.index;
        }
        if (params.hideToolBar !== undefined) {
            this.hideToolBar = params.hideToolBar;
        }
        if (params.hideTitleBar !== undefined) {
            this.hideTitleBar = params.hideTitleBar;
        }
    }
    aboutToBeDeleted() {
        this.__index.aboutToBeDeleted();
        this.__hideToolBar.aboutToBeDeleted();
        this.__hideTitleBar.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __index: ObservedPropertySimple<number>;
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    private __hideToolBar: ObservedPropertySimple<boolean>;
    get hideToolBar() {
        return this.__hideToolBar.get();
    }
    set hideToolBar(newValue: boolean) {
        this.__hideToolBar.set(newValue);
    }
    private __hideTitleBar: ObservedPropertySimple<boolean>;
    get hideTitleBar() {
        return this.__hideTitleBar.get();
    }
    set hideTitleBar(newValue: boolean) {
        this.__hideTitleBar.set(newValue);
    }
    toolbar(parent = null) {
        Row.create();
        Row.width('100%');
        Row.height(60);
        Column.create();
        Column.alignItems(HorizontalAlign.Center);
        Column.height('100%');
        Column.layoutWeight(1);
        Column.onClick(() => {
            this.index = 0;
        });
        Image.create(this.index == 0 ? 'pages/icon_message_selected.png' : 'pages/icon_message_normal.png');
        Image.size({ width: 25, height: 25 });
        Text.create('消息');
        Text.fontSize(16);
        Text.fontColor(this.index == 0 ? "#2a58d0" : "#6b6b6b");
        Text.pop();
        Column.pop();
        Column.create();
        Column.alignItems(HorizontalAlign.Center);
        Column.height('100%');
        Column.layoutWeight(1);
        Column.onClick(() => {
            this.index = 1;
        });
        Image.create(this.index == 1 ? 'pages/icon_contract_selected.png' : 'pages/icon_contract_normal.png');
        Image.size({ width: 25, height: 25 });
        Text.create('联系人');
        Text.fontSize(16);
        Text.fontColor(this.index == 1 ? "#2a58d0" : "#6b6b6b");
        Text.pop();
        Column.pop();
        Column.create();
        Column.alignItems(HorizontalAlign.Center);
        Column.height('100%');
        Column.layoutWeight(1);
        Column.onClick(() => {
            this.index = 2;
        });
        Image.create(this.index == 2 ? 'pages/icon_dynamic_selected.png' : 'pages/icon_dynamic_normal.png');
        Image.size({ width: 25, height: 25 });
        Text.create('动态');
        Text.fontSize(16);
        Text.fontColor(this.index == 2 ? "#2a58d0" : "#6b6b6b");
        Text.pop();
        Column.pop();
        Row.pop();
    }
    render() {
        Navigation.create();
        Navigation.size({ width: '100%', height: '100%' });
        Navigation.title("标题栏");
        Navigation.toolBar({ builder: () => {
                this.toolbar.call(this);
            } });
        Navigation.hideToolBar(this.hideToolBar);
        Navigation.hideTitleBar(this.hideTitleBar);
        Navigation.menus([
            {
                value: "搜索",
                icon: "pages/icon_search.png",
                action: () => {
                    prompt.showToast({ message: "搜索" });
                }
            },
            {
                value: "扫码",
                icon: "pages/icon_scan.png",
                action: () => {
                    prompt.showToast({ message: "扫码" });
                }
            }
        ]);
        Column.create({ space: 10 });
        Column.backgroundColor('#aabbcc');
        Column.size({ width: '100%', height: '100%' });
        Text.create(this.index == 0 ? "消息" : this.index == 1 ? "联系人" : "动态");
        Text.textAlign(TextAlign.Center);
        Text.fontSize(30);
        Text.pop();
        Button.createWithLabel(this.hideTitleBar ? "显示TitleBar" : "隐藏TitleBar");
        Button.onClick(() => {
            this.hideTitleBar = !this.hideTitleBar;
        });
        Button.pop();
        Button.createWithLabel(this.hideToolBar ? "显示ToolBar" : "隐藏ToolBar");
        Button.onClick(() => {
            this.hideToolBar = !this.hideToolBar;
        });
        Button.pop();
        Column.pop();
        Navigation.pop();
    }
}
loadDocument(new NavigationPage("1", undefined, {}));
