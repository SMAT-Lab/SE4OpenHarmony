interface commonButton_Params {
    backColor?: Color;
    btnName?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "commonButton_" + ++__generate__Id;
}
export class commonButton extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__backColor = new SynchedPropertySimpleTwoWay(params.backColor, this, "backColor");
        this.__btnName = new SynchedPropertySimpleTwoWay(params.btnName, this, "btnName");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: commonButton_Params) {
    }
    aboutToBeDeleted() {
        this.__backColor.aboutToBeDeleted();
        this.__btnName.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __backColor: SynchedPropertySimpleTwoWay<Color>;
    get backColor() {
        return this.__backColor.get();
    }
    set backColor(newValue: Color) {
        this.__backColor.set(newValue);
    }
    private __btnName: SynchedPropertySimpleTwoWay<string>;
    get btnName() {
        return this.__btnName.get();
    }
    set btnName(newValue: string) {
        this.__btnName.set(newValue);
    }
    render() {
        Column.create();
        Text.create(this.btnName);
        Text.fontSize(20);
        Text.width('100%');
        Text.height(50);
        Text.align(Alignment.Center);
        Text.backgroundColor(this.backColor);
        Text.pop();
        Column.pop();
    }
}
