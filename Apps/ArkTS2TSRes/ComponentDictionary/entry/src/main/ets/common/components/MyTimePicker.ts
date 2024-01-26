interface MyTimePicker_Params {
    selectedTime?: Date;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyTimePicker_" + ++__generate__Id;
}
export class MyTimePicker extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.selectedTime = new Date('7/22/2022 8:00:00');
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyTimePicker_Params) {
        if (params.selectedTime !== undefined) {
            this.selectedTime = params.selectedTime;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private selectedTime: Date;
    render() {
        Column.create();
        Column.width('100%');
        TimePicker.create({
            selected: this.selectedTime
        });
        TimePicker.useMilitaryTime(true);
        TimePicker.onChange((date: TimePickerResult) => {
            console.info('select current date is: ' + JSON.stringify(date));
        });
        TimePicker.pop();
        Column.pop();
    }
}
