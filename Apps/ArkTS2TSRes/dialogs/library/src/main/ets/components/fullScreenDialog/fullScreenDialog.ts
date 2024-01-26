interface fullScreenDialog_Params {
    controller?: CustomDialogController;
    slotBgColor?: string;
    slotContent?: () => void;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "fullScreenDialog_" + ++__generate__Id;
}
export class fullScreenDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = undefined;
        this.__slotBgColor = new SynchedPropertySimpleOneWay(params.slotBgColor, this, "slotBgColor");
        this.slotContent = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: fullScreenDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        this.slotBgColor = params.slotBgColor;
        if (params.slotContent !== undefined) {
            this.slotContent = params.slotContent;
        }
    }
    aboutToBeDeleted() {
        this.__slotBgColor.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private __slotBgColor: SynchedPropertySimpleOneWay<string>;
    get slotBgColor() {
        return this.__slotBgColor.get();
    }
    set slotBgColor(newValue: string) {
        this.__slotBgColor.set(newValue);
    }
    private __slotContent?;
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor(this.slotBgColor);
        If.create();
        if (this.slotContent != undefined) {
            If.branchId(0);
            this.slotContent(this);
        }
        If.pop();
        Column.pop();
    }
}
