interface SpecInput_Params {
    result_str?: Resource;
    specStrInput?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SpecInput_" + ++__generate__Id;
}
export class SpecInput extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.result_str = $r('app.string.result_f');
        this.__specStrInput = new SynchedPropertySimpleTwoWay(params.specStrInput, this, "specStrInput");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SpecInput_Params) {
        if (params.result_str !== undefined) {
            this.result_str = params.result_str;
        }
    }
    aboutToBeDeleted() {
        this.__specStrInput.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private result_str: Resource;
    private __specStrInput: SynchedPropertySimpleTwoWay<string>;
    get specStrInput() {
        return this.__specStrInput.get();
    }
    set specStrInput(newValue: string) {
        this.__specStrInput.set(newValue);
    }
    render() {
        Row.create();
        Row.width('100%');
        Text.create(this.result_str);
        Text.height(30);
        Text.fontSize(15);
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Text.create(this.specStrInput);
        Text.height(30);
        Text.layoutWeight(1);
        Text.fontSize(15);
        Text.textAlign(TextAlign.Start);
        Text.border({ width: 2, radius: 5, color: "#0D9FFB" });
        Text.pop();
        Row.pop();
    }
}
