interface DatetimePicker_date_Params {
    cur_height?: number;
    cur_width?: number;
    cur_Date?: string;
    cur_Time?: string;
    years?: string[];
    selected_year?: number;
    months?: string[];
    selected_month?: number;
    days_normal?: number[];
    days_leap?: number[];
    days?: string[];
    selected_day?: number;
    hours?: string[];
    selected_hour?: number;
    minutes?: string[];
    selected_minute?: number;
    hasYear?: boolean;
    hasMonth?: boolean;
    hasDay?: boolean;
    hasHour?: boolean;
    hasMinute?: boolean;
    visibility_Year?: Visibility;
    visibility_Month?: Visibility;
    visibility_Day?: Visibility;
    visibility_Hour?: Visibility;
    visibility_Minute?: Visibility;
    year_picker_width?: number;
    month_picker_width?: number;
    day_picker_width?: number;
    hour_picker_width?: number;
    minute_picker_width?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "DatetimePicker_" + ++__generate__Id;
}
export class DatetimePicker_date extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__cur_height = new ObservedPropertySimple(250, this, "cur_height");
        this.__cur_width = new ObservedPropertySimple(360, this, "cur_width");
        this.__cur_Date = new ObservedPropertySimple("", this, "cur_Date");
        this.__cur_Time = new ObservedPropertySimple("", this, "cur_Time");
        this.__years = new ObservedPropertyObject(["1970", "1971", "1972", "1973", "1974"], this, "years");
        this.__selected_year = new ObservedPropertySimple(0, this, "selected_year");
        this.__months = new ObservedPropertyObject(["01", "02", "03", "04", "05"], this, "months");
        this.__selected_month = new ObservedPropertySimple(0, this, "selected_month");
        this.days_normal = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        this.days_leap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        this.__days = new ObservedPropertyObject(["01", "02", "03", "04", "05"], this, "days");
        this.__selected_day = new ObservedPropertySimple(0, this, "selected_day");
        this.__hours = new ObservedPropertyObject(["00", "01", "02", "03", "04"], this, "hours");
        this.__selected_hour = new ObservedPropertySimple(0, this, "selected_hour");
        this.__minutes = new ObservedPropertyObject(["00", "01", "02", "03", "04"], this, "minutes");
        this.__selected_minute = new ObservedPropertySimple(0, this, "selected_minute");
        this.__hasYear = new ObservedPropertySimple(false, this, "hasYear");
        this.__hasMonth = new ObservedPropertySimple(false, this, "hasMonth");
        this.__hasDay = new ObservedPropertySimple(false, this, "hasDay");
        this.__hasHour = new ObservedPropertySimple(false, this, "hasHour");
        this.__hasMinute = new ObservedPropertySimple(false, this, "hasMinute");
        this.__visibility_Year = new ObservedPropertySimple(Visibility.Hidden, this, "visibility_Year");
        this.__visibility_Month = new ObservedPropertySimple(Visibility.Hidden, this, "visibility_Month");
        this.__visibility_Day = new ObservedPropertySimple(Visibility.Hidden, this, "visibility_Day");
        this.__visibility_Hour = new ObservedPropertySimple(Visibility.Hidden, this, "visibility_Hour");
        this.__visibility_Minute = new ObservedPropertySimple(Visibility.Hidden, this, "visibility_Minute");
        this.__year_picker_width = new ObservedPropertySimple(this.cur_width / 5, this, "year_picker_width");
        this.__month_picker_width = new ObservedPropertySimple(this.cur_width / 5, this, "month_picker_width");
        this.__day_picker_width = new ObservedPropertySimple(this.cur_width / 5, this, "day_picker_width");
        this.__hour_picker_width = new ObservedPropertySimple(this.cur_width / 5, this, "hour_picker_width");
        this.__minute_picker_width = new ObservedPropertySimple(this.cur_width / 5, this, "minute_picker_width");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: DatetimePicker_date_Params) {
        if (params.cur_height !== undefined) {
            this.cur_height = params.cur_height;
        }
        if (params.cur_width !== undefined) {
            this.cur_width = params.cur_width;
        }
        if (params.cur_Date !== undefined) {
            this.cur_Date = params.cur_Date;
        }
        if (params.cur_Time !== undefined) {
            this.cur_Time = params.cur_Time;
        }
        if (params.years !== undefined) {
            this.years = params.years;
        }
        if (params.selected_year !== undefined) {
            this.selected_year = params.selected_year;
        }
        if (params.months !== undefined) {
            this.months = params.months;
        }
        if (params.selected_month !== undefined) {
            this.selected_month = params.selected_month;
        }
        if (params.days_normal !== undefined) {
            this.days_normal = params.days_normal;
        }
        if (params.days_leap !== undefined) {
            this.days_leap = params.days_leap;
        }
        if (params.days !== undefined) {
            this.days = params.days;
        }
        if (params.selected_day !== undefined) {
            this.selected_day = params.selected_day;
        }
        if (params.hours !== undefined) {
            this.hours = params.hours;
        }
        if (params.selected_hour !== undefined) {
            this.selected_hour = params.selected_hour;
        }
        if (params.minutes !== undefined) {
            this.minutes = params.minutes;
        }
        if (params.selected_minute !== undefined) {
            this.selected_minute = params.selected_minute;
        }
        if (params.hasYear !== undefined) {
            this.hasYear = params.hasYear;
        }
        if (params.hasMonth !== undefined) {
            this.hasMonth = params.hasMonth;
        }
        if (params.hasDay !== undefined) {
            this.hasDay = params.hasDay;
        }
        if (params.hasHour !== undefined) {
            this.hasHour = params.hasHour;
        }
        if (params.hasMinute !== undefined) {
            this.hasMinute = params.hasMinute;
        }
        if (params.visibility_Year !== undefined) {
            this.visibility_Year = params.visibility_Year;
        }
        if (params.visibility_Month !== undefined) {
            this.visibility_Month = params.visibility_Month;
        }
        if (params.visibility_Day !== undefined) {
            this.visibility_Day = params.visibility_Day;
        }
        if (params.visibility_Hour !== undefined) {
            this.visibility_Hour = params.visibility_Hour;
        }
        if (params.visibility_Minute !== undefined) {
            this.visibility_Minute = params.visibility_Minute;
        }
        if (params.year_picker_width !== undefined) {
            this.year_picker_width = params.year_picker_width;
        }
        if (params.month_picker_width !== undefined) {
            this.month_picker_width = params.month_picker_width;
        }
        if (params.day_picker_width !== undefined) {
            this.day_picker_width = params.day_picker_width;
        }
        if (params.hour_picker_width !== undefined) {
            this.hour_picker_width = params.hour_picker_width;
        }
        if (params.minute_picker_width !== undefined) {
            this.minute_picker_width = params.minute_picker_width;
        }
    }
    aboutToBeDeleted() {
        this.__cur_height.aboutToBeDeleted();
        this.__cur_width.aboutToBeDeleted();
        this.__cur_Date.aboutToBeDeleted();
        this.__cur_Time.aboutToBeDeleted();
        this.__years.aboutToBeDeleted();
        this.__selected_year.aboutToBeDeleted();
        this.__months.aboutToBeDeleted();
        this.__selected_month.aboutToBeDeleted();
        this.__days.aboutToBeDeleted();
        this.__selected_day.aboutToBeDeleted();
        this.__hours.aboutToBeDeleted();
        this.__selected_hour.aboutToBeDeleted();
        this.__minutes.aboutToBeDeleted();
        this.__selected_minute.aboutToBeDeleted();
        this.__hasYear.aboutToBeDeleted();
        this.__hasMonth.aboutToBeDeleted();
        this.__hasDay.aboutToBeDeleted();
        this.__hasHour.aboutToBeDeleted();
        this.__hasMinute.aboutToBeDeleted();
        this.__visibility_Year.aboutToBeDeleted();
        this.__visibility_Month.aboutToBeDeleted();
        this.__visibility_Day.aboutToBeDeleted();
        this.__visibility_Hour.aboutToBeDeleted();
        this.__visibility_Minute.aboutToBeDeleted();
        this.__year_picker_width.aboutToBeDeleted();
        this.__month_picker_width.aboutToBeDeleted();
        this.__day_picker_width.aboutToBeDeleted();
        this.__hour_picker_width.aboutToBeDeleted();
        this.__minute_picker_width.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __cur_height: ObservedPropertySimple<number>; //组件高度
    get cur_height() {
        return this.__cur_height.get();
    }
    set cur_height(newValue: number) {
        this.__cur_height.set(newValue);
    }
    private __cur_width: ObservedPropertySimple<number>; //组件宽度
    get cur_width() {
        return this.__cur_width.get();
    }
    set cur_width(newValue: number) {
        this.__cur_width.set(newValue);
    }
    private __cur_Date: ObservedPropertySimple<string>; //当前日期
    get cur_Date() {
        return this.__cur_Date.get();
    }
    set cur_Date(newValue: string) {
        this.__cur_Date.set(newValue);
    }
    private __cur_Time: ObservedPropertySimple<string>; //当前时间
    get cur_Time() {
        return this.__cur_Time.get();
    }
    set cur_Time(newValue: string) {
        this.__cur_Time.set(newValue);
    }
    private __years: ObservedPropertyObject<string[]>;
    get years() {
        return this.__years.get();
    }
    set years(newValue: string[]) {
        this.__years.set(newValue);
    }
    private __selected_year: ObservedPropertySimple<number>; //初始选中的 年 的下标
    get selected_year() {
        return this.__selected_year.get();
    }
    set selected_year(newValue: number) {
        this.__selected_year.set(newValue);
    }
    private __months: ObservedPropertyObject<string[]>;
    get months() {
        return this.__months.get();
    }
    set months(newValue: string[]) {
        this.__months.set(newValue);
    }
    private __selected_month: ObservedPropertySimple<number>; //初始选中的 月 的下标
    get selected_month() {
        return this.__selected_month.get();
    }
    set selected_month(newValue: number) {
        this.__selected_month.set(newValue);
    }
    private days_normal: number[];
    private days_leap: number[];
    private __days: ObservedPropertyObject<string[]>;
    get days() {
        return this.__days.get();
    }
    set days(newValue: string[]) {
        this.__days.set(newValue);
    }
    private __selected_day: ObservedPropertySimple<number>; //初始选中的 日 的下标
    get selected_day() {
        return this.__selected_day.get();
    }
    set selected_day(newValue: number) {
        this.__selected_day.set(newValue);
    }
    private __hours: ObservedPropertyObject<string[]>;
    get hours() {
        return this.__hours.get();
    }
    set hours(newValue: string[]) {
        this.__hours.set(newValue);
    }
    private __selected_hour: ObservedPropertySimple<number>;
    get selected_hour() {
        return this.__selected_hour.get();
    }
    set selected_hour(newValue: number) {
        this.__selected_hour.set(newValue);
    }
    private __minutes: ObservedPropertyObject<string[]>;
    get minutes() {
        return this.__minutes.get();
    }
    set minutes(newValue: string[]) {
        this.__minutes.set(newValue);
    }
    private __selected_minute: ObservedPropertySimple<number>;
    get selected_minute() {
        return this.__selected_minute.get();
    }
    set selected_minute(newValue: number) {
        this.__selected_minute.set(newValue);
    }
    private __hasYear: ObservedPropertySimple<boolean>;
    get hasYear() {
        return this.__hasYear.get();
    }
    set hasYear(newValue: boolean) {
        this.__hasYear.set(newValue);
    }
    private __hasMonth: ObservedPropertySimple<boolean>;
    get hasMonth() {
        return this.__hasMonth.get();
    }
    set hasMonth(newValue: boolean) {
        this.__hasMonth.set(newValue);
    }
    private __hasDay: ObservedPropertySimple<boolean>;
    get hasDay() {
        return this.__hasDay.get();
    }
    set hasDay(newValue: boolean) {
        this.__hasDay.set(newValue);
    }
    private __hasHour: ObservedPropertySimple<boolean>;
    get hasHour() {
        return this.__hasHour.get();
    }
    set hasHour(newValue: boolean) {
        this.__hasHour.set(newValue);
    }
    private __hasMinute: ObservedPropertySimple<boolean>;
    get hasMinute() {
        return this.__hasMinute.get();
    }
    set hasMinute(newValue: boolean) {
        this.__hasMinute.set(newValue);
    }
    private __visibility_Year: ObservedPropertySimple<Visibility>;
    get visibility_Year() {
        return this.__visibility_Year.get();
    }
    set visibility_Year(newValue: Visibility) {
        this.__visibility_Year.set(newValue);
    }
    private __visibility_Month: ObservedPropertySimple<Visibility>;
    get visibility_Month() {
        return this.__visibility_Month.get();
    }
    set visibility_Month(newValue: Visibility) {
        this.__visibility_Month.set(newValue);
    }
    private __visibility_Day: ObservedPropertySimple<Visibility>;
    get visibility_Day() {
        return this.__visibility_Day.get();
    }
    set visibility_Day(newValue: Visibility) {
        this.__visibility_Day.set(newValue);
    }
    private __visibility_Hour: ObservedPropertySimple<Visibility>;
    get visibility_Hour() {
        return this.__visibility_Hour.get();
    }
    set visibility_Hour(newValue: Visibility) {
        this.__visibility_Hour.set(newValue);
    }
    private __visibility_Minute: ObservedPropertySimple<Visibility>;
    get visibility_Minute() {
        return this.__visibility_Minute.get();
    }
    set visibility_Minute(newValue: Visibility) {
        this.__visibility_Minute.set(newValue);
    }
    private __year_picker_width: ObservedPropertySimple<number>;
    get year_picker_width() {
        return this.__year_picker_width.get();
    }
    set year_picker_width(newValue: number) {
        this.__year_picker_width.set(newValue);
    }
    private __month_picker_width: ObservedPropertySimple<number>;
    get month_picker_width() {
        return this.__month_picker_width.get();
    }
    set month_picker_width(newValue: number) {
        this.__month_picker_width.set(newValue);
    }
    private __day_picker_width: ObservedPropertySimple<number>;
    get day_picker_width() {
        return this.__day_picker_width.get();
    }
    set day_picker_width(newValue: number) {
        this.__day_picker_width.set(newValue);
    }
    private __hour_picker_width: ObservedPropertySimple<number>;
    get hour_picker_width() {
        return this.__hour_picker_width.get();
    }
    set hour_picker_width(newValue: number) {
        this.__hour_picker_width.set(newValue);
    }
    private __minute_picker_width: ObservedPropertySimple<number>;
    get minute_picker_width() {
        return this.__minute_picker_width.get();
    }
    set minute_picker_width(newValue: number) {
        this.__minute_picker_width.set(newValue);
    }
    aboutToAppear() {
        //初始化 年 范围
        let k = 0;
        for (let i = 1970; i <= 2100; i++) {
            this.years[k++] = "" + i;
        }
        //初始化 月 范围
        for (let i = 0; i < 12; i++) {
            if (i < 9)
                this.months[i] = "0" + (i + 1);
            else
                this.months[i] = "" + (i + 1);
        }
        //初始 日 范围
        this.getDays(this.years[this.selected_year], this.months[this.selected_month]);
        //初始化 小时 范围
        for (let i = 0; i < 24; i++) {
            if (i < 9)
                this.hours[i] = "0" + i;
            else
                this.hours[i] = "" + i;
        }
        //初始化 分钟 范围
        for (let i = 0; i < 60; i++) {
            if (i < 9)
                this.minutes[i] = "0" + i;
            else
                this.minutes[i] = "" + i;
        }
    }
    isLeapYear(year: string): boolean {
        let year_ = parseInt(year, 10);
        if ((year_ % 4 == 0 && year_ % 100 != 0) || year_ % 400 == 0)
            return true;
        return false;
    }
    getDays(year: string, month: string) {
        let selected_month_ = parseInt(month, 10); //当前月份
        if (this.isLeapYear(year)) {
            for (let i = 0; i < this.days_leap[selected_month_ - 1]; i++) {
                if (i < 9)
                    this.days[i] = "0" + (i + 1);
                else
                    this.days[i] = "" + (i + 1);
            }
        }
        else {
            for (let i = 0; i < this.days_normal[selected_month_ - 1]; i++) {
                if (i < 9)
                    this.days[i] = "0" + (i + 1);
                else
                    this.days[i] = "" + (i + 1);
            }
        }
    }
    render() {
        Column.create();
        Column.onAppear(() => {
            if (this.hasYear) {
                this.visibility_Year = Visibility.Visible;
            }
            else {
                this.visibility_Year = Visibility.Hidden;
            }
            if (this.hasMonth) {
                this.visibility_Month = Visibility.Visible;
            }
            else {
                this.visibility_Month = Visibility.Hidden;
            }
            if (this.hasDay) {
                this.visibility_Day = Visibility.Visible;
            }
            else {
                this.visibility_Day = Visibility.Hidden;
            }
            if (this.hasHour) {
                this.visibility_Hour = Visibility.Visible;
            }
            else {
                this.visibility_Hour = Visibility.Hidden;
            }
            if (this.hasMinute) {
                this.visibility_Minute = Visibility.Visible;
            }
            else {
                this.visibility_Minute = Visibility.Hidden;
            }
            let vis_num = 0;
            if (this.visibility_Year == Visibility.Visible)
                vis_num++;
            if (this.visibility_Month == Visibility.Visible)
                vis_num++;
            if (this.visibility_Day == Visibility.Visible)
                vis_num++;
            if (this.visibility_Hour == Visibility.Visible)
                vis_num++;
            if (this.visibility_Minute == Visibility.Visible)
                vis_num++;
            console.log("===" + vis_num);
            if (this.hasYear) {
                this.year_picker_width = this.cur_width / vis_num;
            }
            else {
                this.year_picker_width = 0;
            }
            if (this.hasMonth) {
                this.month_picker_width = this.cur_width / vis_num;
            }
            else {
                this.month_picker_width = 0;
            }
            if (this.hasDay) {
                this.day_picker_width = this.cur_width / vis_num;
            }
            else {
                this.day_picker_width = 0;
            }
            if (this.hasHour) {
                this.hour_picker_width = this.cur_width / vis_num;
            }
            else {
                this.hour_picker_width = 0;
            }
            if (this.hasMinute) {
                this.minute_picker_width = this.cur_width / vis_num;
            }
            else {
                this.minute_picker_width = 0;
            }
            if (this.hasYear && this.hasMonth && !this.hasDay && !this.hasHour && !this.hasMinute) {
                for (let i = 0; i < this.years.length; i++) {
                    this.years[i] = this.years[i] + " 年";
                }
                for (let i = 0; i < this.months.length; i++) {
                    this.months[i] = this.months[i] + "月";
                }
            }
            this.cur_Date = this.years[this.selected_year] + " 年 " + this.months[this.selected_month] + " 月 " + this.days[this.selected_day] + " 日";
            this.cur_Time = this.hours[this.selected_hour] + " 时 " + this.minutes[this.selected_minute] + " 分";
        });
        Column.width(this.cur_width);
        Row.create();
        Row.width("100%");
        Text.create("取消");
        Text.width("100");
        Text.height("50");
        Text.margin({ left: 20 });
        Text.fontSize(20);
        Text.fontColor(Color.Blue);
        Text.pop();
        Text.create("确认");
        Text.width("100");
        Text.height("50");
        Text.fontColor(Color.Blue);
        Text.fontSize(20);
        Text.margin({ left: this.cur_width * 0.5 });
        Text.onClick(() => {
            console.log("当前选择的日期为：" + this.cur_Date + this.cur_Time);
        });
        Text.pop();
        Row.pop();
        Row.create();
        Row.height(this.cur_height);
        Row.width(this.cur_width);
        Column.create();
        Column.margin({ left: -10 });
        Column.width(this.year_picker_width + 10);
        Column.visibility(this.visibility_Year);
        TextPicker.create({ range: this.years, selected: this.selected_year });
        TextPicker.onChange((value: string, index: number) => {
            this.selected_year = index;
            this.days = [];
            this.getDays(this.years[this.selected_year], this.months[this.selected_month]);
            console.log(this.years[this.selected_year] + "====" + this.months[this.selected_month] + "=== " + this.days[this.selected_day]);
        });
        TextPicker.pop();
        Column.pop();
        // .borderWidth(3)
        Column.create();
        // .borderWidth(3)
        Column.width(this.month_picker_width);
        // .borderWidth(3)
        Column.visibility(this.visibility_Month);
        TextPicker.create({ range: this.months, selected: this.selected_month });
        TextPicker.onChange((value: string, index: number) => {
            this.selected_month = index;
            this.days = [];
            this.getDays(this.years[this.selected_year], this.months[this.selected_month]);
            console.log(this.years[this.selected_year] + "====" + this.months[this.selected_month] + "=== " + this.days[this.selected_day]);
        });
        TextPicker.pop();
        // .borderWidth(3)
        Column.pop();
        // .borderWidth(3)
        // .borderColor(Color.Red)
        Column.create();
        // .borderWidth(3)
        // .borderColor(Color.Red)
        Column.width(this.day_picker_width);
        // .borderWidth(3)
        // .borderColor(Color.Red)
        Column.visibility(this.visibility_Day);
        TextPicker.create({ range: this.days, selected: this.selected_day });
        TextPicker.onChange((value: string, index: number) => {
            this.selected_day = index;
            this.days = [];
            this.getDays(this.years[this.selected_year], this.months[this.selected_month]);
            console.log(this.years[this.selected_year] + "====" + this.months[this.selected_month] + " === " + this.days[this.selected_day]);
        });
        TextPicker.pop();
        // .borderWidth(3)
        // .borderColor(Color.Red)
        Column.pop();
        // .borderWidth(3)
        // .borderColor(Color.Green)
        Column.create();
        // .borderWidth(3)
        // .borderColor(Color.Green)
        Column.width(this.hour_picker_width);
        // .borderWidth(3)
        // .borderColor(Color.Green)
        Column.visibility(this.visibility_Hour);
        TextPicker.create({ range: this.hours, selected: this.selected_hour });
        TextPicker.onChange((value: string, index: number) => {
            this.selected_hour = index;
            console.log(this.hours[this.selected_hour] + "==h==" + this.minutes[this.selected_minute]);
        });
        TextPicker.pop();
        // .borderWidth(3)
        // .borderColor(Color.Green)
        Column.pop();
        // .borderWidth(3)
        // .borderColor(Color.Blue)
        Column.create();
        // .borderWidth(3)
        // .borderColor(Color.Blue)
        Column.width(this.minute_picker_width);
        // .borderWidth(3)
        // .borderColor(Color.Blue)
        Column.visibility(this.visibility_Minute);
        TextPicker.create({ range: this.minutes, selected: this.selected_minute });
        TextPicker.onChange((value: string, index: number) => {
            this.selected_minute = index;
            console.log(this.hours[this.selected_hour] + "==m==" + this.minutes[this.selected_minute]);
        });
        TextPicker.pop();
        // .borderWidth(3)
        // .borderColor(Color.Blue)
        Column.pop();
        Row.pop();
        Column.pop();
    }
}
