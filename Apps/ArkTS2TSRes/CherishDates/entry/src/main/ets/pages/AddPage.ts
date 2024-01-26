interface AddPage_Params {
    message?: string;
    remind?: string;
    isLunar?: boolean;
    select?: number;
    labels?: string[];
    chongfu?: string[];
    templates?: string[];
    selectedDate?: Date;
    date?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "AddPage_" + ++__generate__Id;
}
import promptAction from '@ohos.promptAction';
import hilog from '@ohos.hilog';
import reminderAgentManager from '@ohos.reminderAgentManager';
import router from '@ohos.router';
import { Tabss3 } from './Tabss3';
class AddPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('添加提醒日', this, "message");
        this.__remind = new ObservedPropertySimple("", this, "remind");
        this.__isLunar = new ObservedPropertySimple(true, this, "isLunar");
        this.__select = new ObservedPropertySimple(1, this, "select");
        this.labels = ['倒计时', '生日', '纪念日'];
        this.chongfu = ['无', '1周', '1月', '1年'];
        this.templates = ['常规', '倒计时', '生日', '纪念日'];
        this.selectedDate = new Date("2023-6-25");
        this.__date = new ObservedPropertySimple("", this, "date");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AddPage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.remind !== undefined) {
            this.remind = params.remind;
        }
        if (params.isLunar !== undefined) {
            this.isLunar = params.isLunar;
        }
        if (params.select !== undefined) {
            this.select = params.select;
        }
        if (params.labels !== undefined) {
            this.labels = params.labels;
        }
        if (params.chongfu !== undefined) {
            this.chongfu = params.chongfu;
        }
        if (params.templates !== undefined) {
            this.templates = params.templates;
        }
        if (params.selectedDate !== undefined) {
            this.selectedDate = params.selectedDate;
        }
        if (params.date !== undefined) {
            this.date = params.date;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__remind.aboutToBeDeleted();
        this.__isLunar.aboutToBeDeleted();
        this.__select.aboutToBeDeleted();
        this.__date.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __remind: ObservedPropertySimple<string>;
    get remind() {
        return this.__remind.get();
    }
    set remind(newValue: string) {
        this.__remind.set(newValue);
    }
    private __isLunar: ObservedPropertySimple<boolean>;
    get isLunar() {
        return this.__isLunar.get();
    }
    set isLunar(newValue: boolean) {
        this.__isLunar.set(newValue);
    }
    private __select: ObservedPropertySimple<number>;
    get select() {
        return this.__select.get();
    }
    set select(newValue: number) {
        this.__select.set(newValue);
    }
    private labels: string[];
    private chongfu: string[];
    private templates: string[];
    private selectedDate: Date;
    private __date: ObservedPropertySimple<string>;
    get date() {
        return this.__date.get();
    }
    set date(newValue: string) {
        this.__date.set(newValue);
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor(Color.Pink);
        Text.create("添加提醒日");
        Text.fontSize(30);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({
            top: 30
        });
        Text.pop();
        Row.create();
        Row.borderWidth(1);
        Row.borderRadius(15);
        Row.backgroundColor(Color.White);
        Row.borderColor(Color.Gray);
        Row.margin({
            bottom: 16,
            top: 16
        });
        TextInput.create({
            placeholder: "请输入提醒日名称",
            text: this.remind
        });
        TextInput.width("80%");
        TextInput.onChange((val: string) => {
            this.remind = val;
        });
        Row.pop();
        Column.create();
        Column.borderWidth(1);
        Column.borderRadius(15);
        Column.backgroundColor(Color.White);
        Column.borderColor(Color.Gray);
        Column.margin({ bottom: 10 });
        __Common__.create();
        __Common__.margin(15);
        __Common__.onClick(() => {
            TextPickerDialog.show({
                range: this.templates,
                selected: this.select,
                onAccept: (value: TextPickerResult) => {
                    console.info("TextPickerDialog:onAccept()" + JSON.stringify(value));
                    this.select = value.index;
                },
                onCancel: () => {
                    console.info("TextPickerDialog:onCancel()");
                },
                onChange: (value: TextPickerResult) => {
                    console.info("TextPickerDialog:onChange()" + JSON.stringify(value));
                }
            });
        });
        let earlierCreatedChild_2: Tabss3 = (this && this.findChildById) ? this.findChildById("2") as Tabss3 : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new Tabss3("2", this, {
                text: "使用模板",
                img: $r("app.media.template")
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                text: "使用模板",
                img: $r("app.media.template")
            });
            View.create(earlierCreatedChild_2);
        }
        __Common__.pop();
        Divider.create();
        Divider.width("70%");
        __Common__.create();
        __Common__.margin(15);
        __Common__.onClick(() => {
            DatePickerDialog.show({
                start: new Date("2023-6-12"),
                end: new Date("2025-6-11"),
                selected: this.selectedDate,
                lunar: this.isLunar,
                onAccept: (value: DatePickerResult) => {
                    this.selectedDate.setUTCFullYear(value.year, value.month, value.day);
                    this.date = this.selectedDate.toString();
                    console.info("DatePickerDialog:onAccept()" + JSON.stringify(value));
                },
                onCancel: () => {
                    console.info("DatePickerDialog:onCancel()");
                },
                onChange: (value: DatePickerResult) => {
                    console.info("DatePickerDialog:onChange()" + JSON.stringify(value));
                }
            });
        });
        let earlierCreatedChild_3: Tabss3 = (this && this.findChildById) ? this.findChildById("3") as Tabss3 : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new Tabss3("3", this, {
                text: "目标日",
                img: $r("app.media.calendar")
            }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                text: "目标日",
                img: $r("app.media.calendar")
            });
            View.create(earlierCreatedChild_3);
        }
        __Common__.pop();
        Divider.create();
        Divider.width("70%");
        __Common__.create();
        __Common__.margin(15);
        __Common__.onClick(() => {
            TextPickerDialog.show({
                range: this.labels,
                selected: this.select,
                onAccept: (value: TextPickerResult) => {
                    console.info("TextPickerDialog:onAccept()" + JSON.stringify(value));
                    this.select = value.index;
                },
                onCancel: () => {
                    console.info("TextPickerDialog:onCancel()");
                },
                onChange: (value: TextPickerResult) => {
                    console.info("TextPickerDialog:onChange()" + JSON.stringify(value));
                }
            });
        });
        let earlierCreatedChild_4: Tabss3 = (this && this.findChildById) ? this.findChildById("4") as Tabss3 : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new Tabss3("4", this, {
                text: "标签",
                img: $r("app.media.label")
            }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({
                text: "标签",
                img: $r("app.media.label")
            });
            View.create(earlierCreatedChild_4);
        }
        __Common__.pop();
        Column.pop();
        Column.create();
        Column.borderWidth(1);
        Column.borderRadius(15);
        Column.backgroundColor(Color.White);
        Column.borderColor(Color.Gray);
        __Common__.create();
        __Common__.margin(15);
        __Common__.onClick(() => {
            TextPickerDialog.show({
                range: this.chongfu,
                selected: this.select,
                onAccept: (value: TextPickerResult) => {
                    console.info("TextPickerDialog:onAccept()" + JSON.stringify(value));
                    this.select = value.index;
                },
                onCancel: () => {
                    console.info("TextPickerDialog:onCancel()");
                },
                onChange: (value: TextPickerResult) => {
                    console.info("TextPickerDialog:onChange()" + JSON.stringify(value));
                }
            });
        });
        let earlierCreatedChild_5: Tabss3 = (this && this.findChildById) ? this.findChildById("5") as Tabss3 : undefined;
        if (earlierCreatedChild_5 == undefined) {
            View.create(new Tabss3("5", this, {
                text: "重复状态",
                img: $r("app.media.repeat")
            }));
        }
        else {
            earlierCreatedChild_5.updateWithValueParams({
                text: "重复状态",
                img: $r("app.media.repeat")
            });
            View.create(earlierCreatedChild_5);
        }
        __Common__.pop();
        Divider.create();
        Divider.width("70%");
        Row.create();
        Row.margin({ bottom: 15, top: 15 });
        Image.create($r("app.media.remind"));
        Image.width(20);
        Text.create("设置提醒");
        Text.fontSize(16);
        Text.textAlign(TextAlign.Start);
        Text.margin(15);
        Text.pop();
        Blank.create(195);
        Blank.pop();
        Toggle.create({ type: ToggleType.Switch });
        Toggle.selectedColor(Color.Pink);
        Toggle.margin({ right: 15 });
        Toggle.onChange((isOn: boolean) => {
            if (isOn) {
                promptAction.showToast({ message: 'reminder is on.' });
            }
            else {
                promptAction.showToast({ message: 'reminder is off.' });
            }
        });
        Toggle.pop();
        Row.pop();
        Divider.create();
        Divider.width("70%");
        Row.create();
        Row.margin({ bottom: 15, top: 15 });
        Image.create($r("app.media.top"));
        Image.width(20);
        Text.create("置顶");
        Text.fontSize(16);
        Text.textAlign(TextAlign.Start);
        Text.margin(15);
        Text.pop();
        Blank.create(225);
        Blank.pop();
        Toggle.create({ type: ToggleType.Switch });
        Toggle.selectedColor(Color.Pink);
        Toggle.margin({ right: 15 });
        Toggle.onChange((isOn: boolean) => {
            if (isOn) {
                promptAction.showToast({ message: 'top is on.' });
            }
            else {
                promptAction.showToast({ message: 'top is off.' });
            }
        });
        Toggle.pop();
        Row.pop();
        Divider.create();
        Divider.width("70%");
        Row.create();
        Row.margin({ bottom: 15, top: 15 });
        Image.create($r("app.media.plusone"));
        Image.width(20);
        Text.create("正数包含起始日(+1天)");
        Text.fontSize(16);
        Text.textAlign(TextAlign.Start);
        Text.margin(15);
        Text.pop();
        Blank.create(103);
        Blank.pop();
        Toggle.create({ type: ToggleType.Switch });
        Toggle.selectedColor(Color.Pink);
        Toggle.margin({ right: 15 });
        Toggle.onChange((isOn: boolean) => {
            if (isOn) {
                promptAction.showToast({ message: 'plusone is on.' });
            }
            else {
                promptAction.showToast({ message: 'plusone is off.' });
            }
        });
        Toggle.pop();
        Row.pop();
        Column.pop();
        Button.createWithLabel("确定");
        Button.width(200);
        Button.backgroundColor(Color.White);
        Button.fontColor(Color.Black);
        Button.margin({
            bottom: 20,
            top: 20
        });
        Button.onClick(() => {
            router.pushUrl({
                url: "pages/TabPage",
                params: {
                    name: this.remind,
                    text1: this.date,
                    text2: this.labels
                }
            });
        });
        Button.pop();
        Column.pop();
    }
}
loadDocument(new AddPage("1", undefined, {}));
