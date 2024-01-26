interface MyTimePickerDialog_Params {
    isUseMilitaryTime?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyTimePickerDialog_" + ++__generate__Id;
}
export class MyTimePickerDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__isUseMilitaryTime = new ObservedPropertySimple(false, this, "isUseMilitaryTime");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyTimePickerDialog_Params) {
        if (params.isUseMilitaryTime !== undefined) {
            this.isUseMilitaryTime = params.isUseMilitaryTime;
        }
    }
    aboutToBeDeleted() {
        this.__isUseMilitaryTime.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __isUseMilitaryTime: ObservedPropertySimple<boolean>;
    get isUseMilitaryTime() {
        return this.__isUseMilitaryTime.get();
    }
    set isUseMilitaryTime(newValue: boolean) {
        this.__isUseMilitaryTime.set(newValue);
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center,
            justifyContent: FlexAlign.Center });
        Button.createWithLabel("TimePickerDialog");
        Button.onClick(() => {
            TimePickerDialog.show({
                useMilitaryTime: this.isUseMilitaryTime,
                onAccept: (value: TimePickerResult) => {
                    console.info("TimePickerDialog:onAccept()" + JSON.stringify(value));
                },
                onCancel: () => {
                    console.info("TimePickerDialog:onCancel()");
                },
                onChange: (value: TimePickerResult) => {
                    console.info("TimePickerDialog:onChange()" + JSON.stringify(value));
                }
            });
        });
        Button.pop();
        Flex.pop();
    }
}
