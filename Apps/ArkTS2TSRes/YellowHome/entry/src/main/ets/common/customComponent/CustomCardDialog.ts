interface CustomDialogExample_Params {
    level?: number;
    source?: number;
    controller?: CustomDialogController;
    cancel?: () => void;
    confirm?: () => void;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CustomCardDialog_" + ++__generate__Id;
}
export class CustomDialogExample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__level = new SynchedPropertySimpleTwoWay(params.level, this, "level");
        this.__source = new SynchedPropertySimpleTwoWay(params.source, this, "source");
        this.controller = undefined;
        this.cancel = undefined;
        this.confirm = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CustomDialogExample_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.cancel !== undefined) {
            this.cancel = params.cancel;
        }
        if (params.confirm !== undefined) {
            this.confirm = params.confirm;
        }
    }
    aboutToBeDeleted() {
        this.__level.aboutToBeDeleted();
        this.__source.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __level: SynchedPropertySimpleTwoWay<number>;
    get level() {
        return this.__level.get();
    }
    set level(newValue: number) {
        this.__level.set(newValue);
    }
    private __source: SynchedPropertySimpleTwoWay<number>;
    get source() {
        return this.__source.get();
    }
    set source(newValue: number) {
        this.__source.set(newValue);
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private cancel: () => void;
    private confirm: () => void;
    render() {
        Column.create();
        Text.create('点击空白处返回再抽一次');
        Text.fontSize(24);
        Text.margin({ top: '5%', bottom: '5%' });
        Text.pop();
        If.create();
        if (this.level == 1) {
            If.branchId(0);
            Image.create({ "id": 0, "type": 30000, params: ['images/redCard.png'] });
            Image.height('80%');
            Image.width('90%');
            Image.margin({ bottom: '10%' });
        }
        If.pop();
        If.create();
        if (this.level == 2) {
            If.branchId(0);
            Image.create({ "id": 0, "type": 30000, params: ['images/yellowCard.png'] });
            Image.height('80%');
            Image.width('90%');
            Image.margin({ bottom: '10%' });
        }
        If.pop();
        If.create();
        if (this.level == 3) {
            If.branchId(0);
            Image.create({ "id": 0, "type": 30000, params: ['images/blueCard.png'] });
            Image.height('80%');
            Image.width('90%');
            Image.margin({ bottom: '10%' });
        }
        If.pop();
        If.create();
        if (this.level == 4) {
            If.branchId(0);
            Image.create({ "id": 0, "type": 30000, params: ['images/greenCard.png'] });
            Image.height('80%');
            Image.width('90%');
            Image.margin({ bottom: '10%' });
        }
        If.pop();
        Column.pop();
    }
}
