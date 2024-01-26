interface MyDatePicker_Params {
    isLunar?: boolean;
    selectedDate?: Date;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyDatePicker_" + ++__generate__Id;
}
export class MyDatePicker extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__isLunar = new ObservedPropertySimple(false, this, "isLunar");
        this.selectedDate = new Date('2021-08-08');
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyDatePicker_Params) {
        if (params.isLunar !== undefined) {
            this.isLunar = params.isLunar;
        }
        if (params.selectedDate !== undefined) {
            this.selectedDate = params.selectedDate;
        }
    }
    aboutToBeDeleted() {
        this.__isLunar.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __isLunar: ObservedPropertySimple<boolean>;
    get isLunar() {
        return this.__isLunar.get();
    }
    set isLunar(newValue: boolean) {
        this.__isLunar.set(newValue);
    }
    private selectedDate: Date;
    render() {
        Column.create();
        Column.width('100%');
        Button.createWithLabel('切换公历农历');
        Button.margin({ top: 30 });
        Button.onClick(() => {
            this.isLunar = !this.isLunar;
        });
        Button.pop();
        DatePicker.create({
            start: new Date('1970-1-1'),
            end: new Date('2100-1-1'),
            selected: this.selectedDate
        });
        DatePicker.lunar(this.isLunar);
        DatePicker.onChange((value: DatePickerResult) => {
            this.selectedDate.setFullYear(value.year, value.month, value.day);
            console.info('select current date is: ' + JSON.stringify(value));
        });
        DatePicker.pop();
        Column.pop();
    }
}
