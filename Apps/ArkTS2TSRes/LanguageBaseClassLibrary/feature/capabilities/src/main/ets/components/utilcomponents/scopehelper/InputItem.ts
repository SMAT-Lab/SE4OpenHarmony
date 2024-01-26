interface InputItem_Params {
    value?: number;
    textValue?: Resource;
    placeHolder?: Resource;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "InputItem_" + ++__generate__Id;
}
export class InputItem extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__value = new SynchedPropertySimpleTwoWay(params.value, this, "value");
        this.textValue = $r('app.string.short_sleep');
        this.placeHolder = $r('app.string.enter_sleep_time');
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: InputItem_Params) {
        if (params.textValue !== undefined) {
            this.textValue = params.textValue;
        }
        if (params.placeHolder !== undefined) {
            this.placeHolder = params.placeHolder;
        }
    }
    aboutToBeDeleted() {
        this.__value.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __value: SynchedPropertySimpleTwoWay<number>;
    get value() {
        return this.__value.get();
    }
    set value(newValue: number) {
        this.__value.set(newValue);
    }
    private textValue: Resource;
    private placeHolder: Resource;
    render() {
        Row.create();
        Text.create(this.textValue);
        Text.layoutWeight(1);
        Text.fontSize(20);
        Text.pop();
        TextInput.create({ placeholder: this.placeHolder });
        TextInput.key('shortestSleepTime');
        TextInput.layoutWeight(1);
        TextInput.type(InputType.Normal);
        TextInput.fontSize(20);
        TextInput.fontStyle(FontStyle.Italic);
        TextInput.maxLength(20);
        TextInput.fontWeight(FontWeight.Bold);
        TextInput.placeholderFont({ size: 16, weight: FontWeight.Normal });
        TextInput.enterKeyType(EnterKeyType.Go);
        TextInput.onChange((value: string) => {
            this.value = Number(value);
        });
        Row.pop();
    }
}
