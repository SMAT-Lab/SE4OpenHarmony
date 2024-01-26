interface ShowKey_Params {
    result?: string;
    checkResult?: string;
    presetValue?: Array<Int8Array | Number | String | Boolean>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ShowKey_" + ++__generate__Id;
}
export class ShowKey extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__result = new ObservedPropertySimple(' ', this, "result");
        this.__checkResult = new SynchedPropertySimpleTwoWay(params.checkResult, this, "checkResult");
        this.__presetValue = new SynchedPropertyObjectTwoWay(params.presetValue, this, "presetValue");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ShowKey_Params) {
        if (params.result !== undefined) {
            this.result = params.result;
        }
    }
    aboutToBeDeleted() {
        this.__result.aboutToBeDeleted();
        this.__checkResult.aboutToBeDeleted();
        this.__presetValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __result: ObservedPropertySimple<string>;
    get result() {
        return this.__result.get();
    }
    set result(newValue: string) {
        this.__result.set(newValue);
    }
    private __checkResult: SynchedPropertySimpleTwoWay<string>;
    get checkResult() {
        return this.__checkResult.get();
    }
    set checkResult(newValue: string) {
        this.__checkResult.set(newValue);
    }
    private __presetValue: SynchedPropertySimpleOneWay<Array<Int8Array | Number | String | Boolean>>;
    get presetValue() {
        return this.__presetValue.get();
    }
    set presetValue(newValue: Array<Int8Array | Number | String | Boolean>) {
        this.__presetValue.set(newValue);
    }
    render() {
        Button.createWithChild();
        Button.key('displayPresetValue');
        Button.type(ButtonType.Capsule);
        Button.backgroundColor('#0D9FFB');
        Button.padding(5);
        Button.margin({ top: 10 });
        Button.onClick(() => {
            this.checkResult = `numberVal = ${this.presetValue[0]}\n`
                + `stringVal = ${this.presetValue[1]}\n`
                + `booleanVal = ${this.presetValue[2]}\n`
                + `int8Array = ${this.presetValue[3]}`;
        });
        Text.create($r('app.string.show'));
        Text.fontColor(Color.Black);
        Text.fontSize(20);
        Text.textAlign(TextAlign.Center);
        Text.width('85%');
        Text.pop();
        Button.pop();
    }
}
