interface CustomDialogExample_Params {
    level?: number;
    score?: number;
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
        this.__score = new SynchedPropertySimpleTwoWay(params.score, this, "score");
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
        this.__score.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __level: SynchedPropertySimpleTwoWay<number>;
    get level() {
        return this.__level.get();
    }
    set level(newValue: number) {
        this.__level.set(newValue);
    }
    private __score: SynchedPropertySimpleTwoWay<number>;
    get score() {
        return this.__score.get();
    }
    set score(newValue: number) {
        this.__score.set(newValue);
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private cancel: () => void;
    private confirm: () => void;
    render() {
        Column.create();
        Text.create('再抽一次');
        Text.fontSize(24);
        Text.margin({ top: '5%', bottom: '5%' });
        Text.onClick(() => {
            this.controller.close();
            this.cancel();
        });
        Text.pop();
        If.create();
        if (this.level == 1) {
            If.branchId(0);
            Image.create({ "id": 0, "type": 30000, params: ['images/redCard.png'] });
            Image.height('40%');
            Image.width('40%');
            Image.margin({ bottom: '10%' });
        }
        If.pop();
        If.create();
        if (this.level == 2) {
            If.branchId(0);
            Image.create({ "id": 0, "type": 30000, params: ['images/yellowCard.png'] });
            Image.height('40%');
            Image.width('40%');
            Image.margin({ bottom: '10%' });
        }
        If.pop();
        If.create();
        if (this.level == 3) {
            If.branchId(0);
            Image.create({ "id": 0, "type": 30000, params: ['images/blueCard.png'] });
            Image.height('40%');
            Image.width('40%');
            Image.margin({ bottom: '10%' });
        }
        If.pop();
        If.create();
        if (this.level == 4) {
            If.branchId(0);
            Image.create({ "id": 0, "type": 30000, params: ['images/greenCard.png'] });
            Image.height('40%');
            Image.width('40%');
            Image.margin({ bottom: '10%' });
        }
        If.pop();
        Column.pop();
    }
}
