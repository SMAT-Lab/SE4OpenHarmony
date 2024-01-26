interface compAnniversary_Params {
    text?: string;
    date?: string;
    img?: Resource;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "compAnniversary_" + ++__generate__Id;
}
export class compAnniversary extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__text = new ObservedPropertySimple("成为大学生" // 之后改成传入的形式（AddPage）
        , this, "text");
        this.__date = new ObservedPropertySimple("2021-9-5" // 有没有日期格式的输入呢？
        , this, "date");
        this.__img = new ObservedPropertyObject($r("app.media.anniversary") // 设置默认值（生日图标）
        // @State bgColor:     // 定义默认颜色
        , this, "img");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: compAnniversary_Params) {
        if (params.text !== undefined) {
            this.text = params.text;
        }
        if (params.date !== undefined) {
            this.date = params.date;
        }
        if (params.img !== undefined) {
            this.img = params.img;
        }
    }
    aboutToBeDeleted() {
        this.__text.aboutToBeDeleted();
        this.__date.aboutToBeDeleted();
        this.__img.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __text: ObservedPropertySimple<string>; // 之后改成传入的形式（AddPage）
    get text() {
        return this.__text.get();
    }
    set text(newValue: string) {
        this.__text.set(newValue);
    }
    private __date: ObservedPropertySimple<string>; // 有没有日期格式的输入呢？
    get date() {
        return this.__date.get();
    }
    set date(newValue: string) {
        this.__date.set(newValue);
    }
    private __img: ObservedPropertyObject<Resource>; // 设置默认值（生日图标）
    get img() {
        return this.__img.get();
    }
    set img(newValue: Resource) {
        this.__img.set(newValue);
    }
    // @State bgColor:     // 定义默认颜色
    render() {
        Row.create({ space: 15 });
        Row.width("80%");
        Row.backgroundColor(Color.White);
        Row.borderRadius(15);
        Row.borderColor(Color.Gray);
        Row.borderWidth(1);
        Row.margin(10);
        Image.create(this.img);
        Image.width(37);
        Image.borderWidth(1);
        Image.borderRadius(12);
        Image.borderColor(Color.Gray);
        Image.padding(4);
        Image.margin({
            top: 15,
            bottom: 15,
            left: 20,
            right: 5
        });
        Column.create({ space: 3 });
        Column.alignItems(HorizontalAlign.Start);
        Text.create(this.text);
        Text.fontSize(17);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({
            top: 3
        });
        Text.pop();
        Text.create(this.date);
        Text.fontColor(Color.Gray);
        Text.fontSize(13);
        Text.pop();
        Column.pop();
        Row.pop();
    }
}
