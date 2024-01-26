interface CustomCalendar_Params {
    controller?: CustomDialogController;
    time_title?: string;
    isSelectDay?: string;
    selectedDay?: string;
    confirmSelectedDay?: string //将改变量与父页面变量绑定。
    ;
    dayList?: any[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CustomCalendar_" + ++__generate__Id;
}
export class CustomCalendar extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = undefined;
        this.__time_title = new ObservedPropertySimple('2022年08月' //年月栏
        , this, "time_title");
        this.__isSelectDay = new ObservedPropertySimple('' // 点击选中的时间
        , this, "isSelectDay");
        this.__selectedDay = new ObservedPropertySimple("" // 点击选中的时间
        , this, "selectedDay");
        this.__confirmSelectedDay = new SynchedPropertySimpleTwoWay(params.confirmSelectedDay, this, "confirmSelectedDay");
        this.__dayList = new ObservedPropertyObject([
            [{ "year": 2022, "month": 7, "day": 31, "time": "2022-07-31", "label": "last" },
                { "year": 2022, "month": 8, "day": 1, "time": "2022-08-01", "label": "at" },
                { "year": 2022, "month": 8, "day": 2, "time": "2022-08-02", "label": "at" },
                { "year": 2022, "month": 8, "day": 3, "time": "2022-08-03", "label": "at" },
                { "year": 2022, "month": 8, "day": 4, "time": "2022-08-04", "label": "at" },
                { "year": 2022, "month": 8, "day": 5, "time": "2022-08-05", "label": "at" },
                { "year": 2022, "month": 8, "day": 6, "time": "2022-08-06", "label": "at" }],
            [{ "year": 2022, "month": 8, "day": 7, "time": "2022-08-07", "label": "at" },
                { "year": 2022, "month": 8, "day": 8, "time": "2022-08-08", "label": "at" },
                { "year": 2022, "month": 8, "day": 9, "time": "2022-08-09", "label": "at" },
                { "year": 2022, "month": 8, "day": 10, "time": "2022-08-10", "label": "at" },
                { "year": 2022, "month": 8, "day": 11, "time": "2022-08-11", "label": "at" },
                { "year": 2022, "month": 8, "day": 12, "time": "2022-08-12", "label": "at" },
                { "year": 2022, "month": 8, "day": 13, "time": "2022-08-13", "label": "at" }],
            [{ "year": 2022, "month": 8, "day": 14, "time": "2022-08-14", "label": "at" },
                { "year": 2022, "month": 8, "day": 15, "time": "2022-08-15", "label": "at" },
                { "year": 2022, "month": 8, "day": 16, "time": "2022-08-16", "label": "at" },
                { "year": 2022, "month": 8, "day": 17, "time": "2022-08-17", "label": "at" },
                { "year": 2022, "month": 8, "day": 18, "time": "2022-08-18", "label": "at" },
                { "year": 2022, "month": 8, "day": 19, "time": "2022-08-19", "label": "at" },
                { "year": 2022, "month": 8, "day": 20, "time": "2022-08-20", "label": "at" }],
            [{ "year": 2022, "month": 8, "day": 21, "time": "2022-08-21", "label": "at" },
                { "year": 2022, "month": 8, "day": 22, "time": "2022-08-22", "label": "at" },
                { "year": 2022, "month": 8, "day": 23, "time": "2022-08-23", "label": "at" },
                { "year": 2022, "month": 8, "day": 24, "time": "2022-08-24", "label": "at" },
                { "year": 2022, "month": 8, "day": 25, "time": "2022-08-25", "label": "at" },
                { "year": 2022, "month": 8, "day": 26, "time": "2022-08-26", "label": "at" },
                { "year": 2022, "month": 8, "day": 27, "time": "2022-08-27", "label": "at" }],
            [{ "year": 2022, "month": 8, "day": 28, "time": "2022-08-28", "label": "at" },
                { "year": 2022, "month": 8, "day": 29, "time": "2022-08-29", "label": "at" },
                { "year": 2022, "month": 8, "day": 30, "time": "2022-08-30", "label": "at" },
                { "year": 2022, "month": 8, "day": 31, "time": "2022-08-31", "label": "at" },
                { "year": 2022, "month": 9, "day": 1, "time": "2022-09-01", "label": "next" },
                { "year": 2022, "month": 9, "day": 2, "time": "2022-09-02", "label": "next" },
                { "year": 2022, "month": 9, "day": 3, "time": "2022-09-03", "label": "next" }]
        ] // 显示的日历列表
        //初始化时间, 需要显示初始化日历的年月，格式：y-M
        , this, "dayList");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CustomCalendar_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.time_title !== undefined) {
            this.time_title = params.time_title;
        }
        if (params.isSelectDay !== undefined) {
            this.isSelectDay = params.isSelectDay;
        }
        if (params.selectedDay !== undefined) {
            this.selectedDay = params.selectedDay;
        }
        if (params.dayList !== undefined) {
            this.dayList = params.dayList;
        }
    }
    aboutToBeDeleted() {
        this.__time_title.aboutToBeDeleted();
        this.__isSelectDay.aboutToBeDeleted();
        this.__selectedDay.aboutToBeDeleted();
        this.__confirmSelectedDay.aboutToBeDeleted();
        this.__dayList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    cancel(): void {
        console.info('取消选择日期');
    }
    confirm(): void {
        this.confirmSelectedDay = this.isSelectDay;
        console.info(this.confirmSelectedDay);
    }
    private __time_title: ObservedPropertySimple<string>; //年月栏
    get time_title() {
        return this.__time_title.get();
    }
    set time_title(newValue: string) {
        this.__time_title.set(newValue);
    }
    private __isSelectDay: ObservedPropertySimple<string>; // 点击选中的时间
    get isSelectDay() {
        return this.__isSelectDay.get();
    }
    set isSelectDay(newValue: string) {
        this.__isSelectDay.set(newValue);
    }
    private __selectedDay: ObservedPropertySimple<string>; // 点击选中的时间
    get selectedDay() {
        return this.__selectedDay.get();
    }
    set selectedDay(newValue: string) {
        this.__selectedDay.set(newValue);
    }
    private __confirmSelectedDay: SynchedPropertySimpleTwoWay<string>; //将改变量与父页面变量绑定。
    get confirmSelectedDay() {
        return this.__confirmSelectedDay.get();
    }
    set confirmSelectedDay(newValue: string //将改变量与父页面变量绑定。
    ) {
        this.__confirmSelectedDay.set(newValue);
    }
    private __dayList: ObservedPropertyObject<any[]>; // 显示的日历列表
    get dayList() {
        return this.__dayList.get();
    }
    set dayList(newValue: any[]) {
        this.__dayList.set(newValue);
    }
    //初始化时间, 需要显示初始化日历的年月，格式：y-M
    initDay(day: Date) {
        this.today = this.formatDate(new Date(), 'y-M-d');
        if (!day) {
            day = this.today;
        }
        console.log('传入的当前年月：' + day);
        console.log('获取今天的时间：' + this.today);
        this.getCld(day);
        this.isSelectDay = this.today;
        console.log(this.isSelectDay);
    }
    //获取日历
    getCld(time: Date) {
        let dd = new Date(time);
        let { year: y, month: m, monthLen } = this.getDateInfo(time);
        let { year: l_y, month: l_m, monthLen: l_monthLen } = this.getDateInfo(time, -1);
        let { year: n_y, month: n_m } = this.getDateInfo(time, +1);
        console.log('getcld函数参数time：' + time);
        console.log('getcld函数参数dd：' + dd);
        this.time_title = this.formatDate(dd, 'y年M月');
        let date = new Date(y, m - 1, 1);
        //该月1号周几
        let week_start = date.getDay();
        // 该月有多少周
        let week_len = Math.ceil((week_start + monthLen) / 7);
        let arr = [];
        let num = 1;
        let n_num = 1;
        for (var i = 0; i < week_len; i++) {
            arr.push([]);
            for (var j = 0; j < 7; j++) {
                if ((i < 1 && j < week_start)) {
                    // 上个月
                    let l_d = l_monthLen - week_start + (1 + j);
                    arr[i].push({
                        year: l_y,
                        month: l_m,
                        day: l_d,
                        time: `${l_y}-${l_m.toString().padStart(2, '0')}-${l_d.toString().padStart(2, '0')}`,
                        label: 'last',
                    });
                }
                else if ((num > monthLen)) {
                    // 下个月
                    arr[i].push({
                        year: n_y,
                        month: n_m,
                        day: n_num,
                        time: `${n_y}-${n_m.toString().padStart(2, '0')}-${n_num.toString().padStart(2, '0')}`,
                        label: 'next',
                    });
                    n_num++;
                }
                else {
                    // 本月
                    arr[i].push({
                        year: y,
                        month: m,
                        day: num,
                        time: `${y}-${m.toString().padStart(2, '0')}-${num.toString().padStart(2, '0')}`,
                        label: 'at',
                    });
                    num++;
                }
            }
        }
        this.dayList = arr;
    }
    // 跳转到今天
    toToday() {
        this.isSelectDay = this.today;
        this.currentYM = this.today;
        this.initDay(this.currentYM);
    }
    // 点击<>切换月份
    cutMonth(num) {
        let date = this.currentYM || this.today;
        let { year, month } = this.getDateInfo(date, num);
        this.currentYM = `${year}-${month.toString().padStart(2, '0')}`;
        this.getCld(this.currentYM);
    }
    // 获取上下个月的年份和月份方法
    getDateInfo(date, num = 0) {
        let m_len = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //月份的天数
        let dd = new Date(date);
        let y = dd.getFullYear();
        let m = dd.getMonth() + 1;
        let d = dd.getDate();
        if (m + num > 12) {
            y = y + num;
            m = 1;
        }
        else if (m + num == 0) {
            y = y + num;
            m = 12;
        }
        else {
            m = m + num;
        }
        m_len[1] = (m == 2 && this.leapYear(y)) ? 29 : 28;
        return { year: y, month: m, day: d, monthLen: m_len[m - 1] };
    }
    // 点击选择日期
    selectDay(e: any) {
        //    if(!e) return;
        if (e.label == 'last') {
            this.cutMonth(-1);
        }
        if (e.label == 'next') {
            this.cutMonth(1);
        }
        this.isSelectDay = e.time;
        console.log(this.isSelectDay);
    }
    // 格式化时间
    formatDate(date: Date, fmt: string) {
        let ret;
        let o = {
            "y+": date.getFullYear(),
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "H+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "W+": date.getDay(),
        };
        for (let k in o) {
            ret = new RegExp("(" + k + ")").exec(fmt);
            if (ret) {
                let str = o[k].toString();
                str = str.padStart(2, 0);
                fmt = fmt.replace(ret[1], str);
            }
        }
        return fmt;
    }
    // 判断是否是闰年，是返回true，不是返回false
    leapYear(year: number) {
        if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
            return true;
        }
        return false;
    }
    render() {
        Column.create();
        Column.height('55%');
        Column.justifyContent(FlexAlign.SpaceAround);
        Column.onAppear(() => { this.initDay(this.currentYM); });
        Row.create();
        Row.width('100%');
        Row.justifyContent(FlexAlign.End);
        Text.create('<');
        Text.fontSize(20);
        Text.margin(10);
        Text.fontColor(Color.Grey);
        Text.onClick(() => {
            this.cutMonth(-1);
        });
        Text.pop();
        Text.create(this.time_title);
        Text.fontSize(20);
        Text.margin(10);
        Text.fontColor(Color.Black);
        Text.pop();
        Text.create('>');
        Text.fontSize(20);
        Text.margin(10);
        Text.fontColor(Color.Grey);
        Text.onClick(() => {
            this.cutMonth(1);
        });
        Text.pop();
        Button.createWithChild({ type: ButtonType.Normal });
        Button.height(20);
        Button.backgroundColor(Color.White);
        Button.margin({ right: 15, left: 18 });
        Button.onClick(() => {
            this.initDay(this.today);
        });
        Text.create('今天');
        Text.fontSize(20);
        Text.fontColor(Color.Blue);
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceEvenly);
        ForEach.create("2", this, ObservedObject.GetRawObject(this.weekList), (item: any, index?: number) => {
            Text.create(`${item}`);
            Text.width(30);
            Text.fontSize(20);
            Text.textAlign(TextAlign.Center);
            Text.backgroundColor(Color.White);
            Text.pop();
        });
        ForEach.pop();
        Row.pop();
        ForEach.create("4", this, ObservedObject.GetRawObject(this.dayList), (item: any) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceEvenly);
            ForEach.create("3", this, ObservedObject.GetRawObject(item), (i: any) => {
                If.create();
                if (i.label === "at" && i.time === this.isSelectDay) {
                    If.branchId(0);
                    Text.create(i.day.toString());
                    Text.fontSize(20);
                    Text.width(30);
                    Text.textAlign(TextAlign.Center);
                    Text.backgroundColor(Color.Pink);
                    Text.borderRadius(15);
                    Text.onClick(() => { this.selectDay(i); });
                    Text.pop();
                }
                else if (i.label === "at") {
                    If.branchId(1);
                    Text.create(i.day.toString());
                    Text.fontSize(20);
                    Text.width(30);
                    Text.textAlign(TextAlign.Center);
                    Text.borderRadius(15);
                    Text.onClick(() => { this.selectDay(i); });
                    Text.pop();
                }
                else if (i.label === "last" || i.label === "next") {
                    If.branchId(2);
                    Text.create(i.day.toString());
                    Text.fontSize(20);
                    Text.fontColor(Color.Grey);
                    Text.width(30);
                    Text.textAlign(TextAlign.Center);
                    Text.onClick(() => { this.selectDay(i); });
                    Text.pop();
                }
                If.pop();
            });
            ForEach.pop();
            Row.pop();
        });
        ForEach.pop();
        Row.create();
        Row.width('100%');
        Row.justifyContent(FlexAlign.SpaceEvenly);
        Button.createWithLabel('取消');
        Button.height(20);
        Button.fontSize(20);
        Button.backgroundColor(Color.White);
        Button.fontColor(Color.Blue);
        Button.onClick(() => {
            this.controller.close();
            this.cancel();
        });
        Button.pop();
        Button.createWithLabel('|');
        Button.height(20);
        Button.fontSize(20);
        Button.backgroundColor(Color.White);
        Button.fontColor(Color.Grey);
        Button.pop();
        Button.createWithLabel('确定');
        Button.height(20);
        Button.fontSize(20);
        Button.backgroundColor(Color.White);
        Button.fontColor(Color.Blue);
        Button.onClick(() => {
            this.controller.close();
            this.confirm();
        });
        Button.pop();
        Row.pop();
        Column.pop();
    }
}
