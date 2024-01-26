interface ChartMenu_Params {
    menuItemArr?: Array<string>;
    model?: ChartTitleModel;
    controller?: CustomDialogController;
    callBack?: (itemStr: string, index: number) => void;
}
interface ChartTitle_Params {
    model?: ChartTitleModel;
    scroller?: Scroller;
    dialogController?: CustomDialogController | undefined;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "index_" + ++__generate__Id;
}
export default class ChartTitle extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new ChartTitleModel(), this, "model");
        this.scroller = new Scroller();
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new ChartMenu("2", this, { model: this.__model });
                jsDialog.setController(this.dialogController);
                View.create(jsDialog);
            },
            cancel: this.existApp,
            alignment: DialogAlignment.Top,
            offset: { dx: 0, dy: this.model.height },
            autoCancel: true,
            customStyle: true
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ChartTitle_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: ObservedPropertyObject<ChartTitleModel>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: ChartTitleModel) {
        this.__model.set(newValue);
    }
    private scroller: Scroller;
    private dialogController: CustomDialogController | undefined;
    aboutToDisappear() {
        this.dialogController = undefined;
    }
    render() {
        Column.create();
        Column.zIndex(10);
        Row.create();
        Row.backgroundColor(Color.Black);
        Row.padding(12);
        Row.width('100%');
        Row.height(this.model.height);
        Text.create(this.model.title);
        Text.fontSize(21);
        Text.fontColor(Color.White);
        Text.fontWeight(600);
        Text.layoutWeight(1);
        Text.pop();
        If.create();
        if (this.model.isShowMenu && !!this.model.menuItemArr && this.model.menuItemArr.length > 0) {
            If.branchId(0);
            Column.create();
            Column.width(50);
            Column.alignItems(HorizontalAlign.End);
            Column.onClick(() => {
                this.dialogController?.open();
            });
            Image.create($r('app.media.more'));
            Image.width(28);
            Image.height(30);
            Column.pop();
        }
        If.pop();
        Row.pop();
        Column.pop();
    }
    existApp() {
    }
}
export class ChartTitleModel {
    itemStr: string = '';
    index: number = -1;
    menuItemArr: Array<string> = [];
    title: string = 'title';
    isShowMenu: boolean = true;
    height: number = 54;
    setIndex(index: number): ChartTitleModel {
        this.index = index;
        return this;
    }
    getIndex(): number {
        return this.index;
    }
    setItemStr(itemStr: string): ChartTitleModel {
        this.itemStr = itemStr;
        return this;
    }
}
interface MenuItemValue {
    i: number;
    data: string;
}
class ChartMenu extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__menuItemArr = new ObservedPropertyObject(new Array<string>(), this, "menuItemArr");
        this.__model = new SynchedPropertyObjectTwoWay(params.model, this, "model");
        this.controller = new CustomDialogController({
            builder: () => {
                let jsDialog = new ChartMenu("4", this, { model: this.__model });
                jsDialog.setController(this.controller);
                View.create(jsDialog);
            },
            cancel: this.existApp,
            alignment: DialogAlignment.Top,
            offset: { dx: 0, dy: this.model.height },
            autoCancel: true,
            customStyle: true
        }, this);
        this.callBack = (itemStr: string, index: number) => {
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ChartMenu_Params) {
        if (params.menuItemArr !== undefined) {
            this.menuItemArr = params.menuItemArr;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.callBack !== undefined) {
            this.callBack = params.callBack;
        }
    }
    aboutToBeDeleted() {
        this.__menuItemArr.aboutToBeDeleted();
        this.__model.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __menuItemArr: ObservedPropertyObject<Array<string>>;
    get menuItemArr() {
        return this.__menuItemArr.get();
    }
    set menuItemArr(newValue: Array<string>) {
        this.__menuItemArr.set(newValue);
    }
    private __model: SynchedPropertySimpleOneWay<ChartTitleModel>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: ChartTitleModel) {
        this.__model.set(newValue);
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private callBack: (itemStr: string, index: number) => void;
    existApp() {
    }
    render() {
        Row.create();
        Row.width('100%');
        Row.zIndex(10);
        Blank.create();
        Blank.layoutWeight(1);
        Blank.pop();
        Column.create();
        Column.backgroundColor(Color.White);
        Column.zIndex(1);
        Column.alignItems(HorizontalAlign.Start);
        ForEach.create("3", this, ObservedObject.GetRawObject(this.model.menuItemArr.map((item: string, index: number) => {
            let value: MenuItemValue = { i: index, data: item };
            return value;
        })), (item: MenuItemValue) => {
            Text.create(item.data);
            Text.fontSize(21);
            Text.padding(16);
            Text.fontColor(Color.Black);
            Text.padding({ top: 10, right: 20, bottom: 10, left: 20 });
            Text.onClick(() => {
                this.model.setIndex(item.i);
                if (!!this.controller) {
                    this.controller.close();
                }
            });
            Text.pop();
        }, (item: MenuItemValue) => JSON.stringify(item));
        ForEach.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new ChartTitle("1", undefined, {}));
