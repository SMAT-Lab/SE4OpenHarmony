interface Tabbar_default_Params {
    tabIcon_up?: string[];
    tabIcon_cur?: string[];
    tabIcon_down?: string[];
    tabText?: string[];
    tabRed?: number[];
    tabRed_text?: string[];
    tabRed_w?: number[];
    tabRed_h?: number[];
    layoutweight?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Tabbar_" + ++__generate__Id;
}
export class Tabbar_default extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__tabIcon_up = new ObservedPropertyObject(["Tabbar_index_default_gray.png", "Tabbar_search_default_gray.png", "Tabbar_group_default_gray.png", "Tabbar_setting_default_gray.png"], this, "tabIcon_up");
        this.__tabIcon_cur = new ObservedPropertyObject(["Tabbar_index_default_gray.png", "Tabbar_search_default_gray.png", "Tabbar_group_default_gray.png", "Tabbar_setting_default_gray.png"], this, "tabIcon_cur");
        this.__tabIcon_down = new ObservedPropertyObject(["Tabbar_index_default_blue.png", "Tabbar_search_default_blue.png", "Tabbar_group_default_blue.png", "Tabbar_setting_default_blue.png"], this, "tabIcon_down");
        this.__tabText = new ObservedPropertyObject(["标签", "标签", "标签", "标签"], this, "tabText");
        this.__tabRed = new ObservedPropertyObject([0, 1, 5, 20], this, "tabRed");
        this.__tabRed_text = new ObservedPropertyObject(["", "", "5", "20"], this, "tabRed_text");
        this.__tabRed_w = new ObservedPropertyObject([0, 10, 20, 30], this, "tabRed_w");
        this.__tabRed_h = new ObservedPropertyObject([0, 10, 20, 20], this, "tabRed_h");
        this.__layoutweight = new ObservedPropertySimple(2.5, this, "layoutweight");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Tabbar_default_Params) {
        if (params.tabIcon_up !== undefined) {
            this.tabIcon_up = params.tabIcon_up;
        }
        if (params.tabIcon_cur !== undefined) {
            this.tabIcon_cur = params.tabIcon_cur;
        }
        if (params.tabIcon_down !== undefined) {
            this.tabIcon_down = params.tabIcon_down;
        }
        if (params.tabText !== undefined) {
            this.tabText = params.tabText;
        }
        if (params.tabRed !== undefined) {
            this.tabRed = params.tabRed;
        }
        if (params.tabRed_text !== undefined) {
            this.tabRed_text = params.tabRed_text;
        }
        if (params.tabRed_w !== undefined) {
            this.tabRed_w = params.tabRed_w;
        }
        if (params.tabRed_h !== undefined) {
            this.tabRed_h = params.tabRed_h;
        }
        if (params.layoutweight !== undefined) {
            this.layoutweight = params.layoutweight;
        }
    }
    aboutToBeDeleted() {
        this.__tabIcon_up.aboutToBeDeleted();
        this.__tabIcon_cur.aboutToBeDeleted();
        this.__tabIcon_down.aboutToBeDeleted();
        this.__tabText.aboutToBeDeleted();
        this.__tabRed.aboutToBeDeleted();
        this.__tabRed_text.aboutToBeDeleted();
        this.__tabRed_w.aboutToBeDeleted();
        this.__tabRed_h.aboutToBeDeleted();
        this.__layoutweight.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    //图标数组，并设置默认值
    private __tabIcon_up: ObservedPropertyObject<string[]>;
    get tabIcon_up() {
        return this.__tabIcon_up.get();
    }
    set tabIcon_up(newValue: string[]) {
        this.__tabIcon_up.set(newValue);
    }
    private __tabIcon_cur: ObservedPropertyObject<string[]>;
    get tabIcon_cur() {
        return this.__tabIcon_cur.get();
    }
    set tabIcon_cur(newValue: string[]) {
        this.__tabIcon_cur.set(newValue);
    }
    private __tabIcon_down: ObservedPropertyObject<string[]>;
    get tabIcon_down() {
        return this.__tabIcon_down.get();
    }
    set tabIcon_down(newValue: string[]) {
        this.__tabIcon_down.set(newValue);
    }
    //标签文本数组，并设置默认值；
    private __tabText: ObservedPropertyObject<string[]>;
    get tabText() {
        return this.__tabText.get();
    }
    set tabText(newValue: string[]) {
        this.__tabText.set(newValue);
    }
    //右上角的红点标签，0==没有，1==红点， 2~n==新消息数
    private __tabRed: ObservedPropertyObject<number[]>;
    get tabRed() {
        return this.__tabRed.get();
    }
    set tabRed(newValue: number[]) {
        this.__tabRed.set(newValue);
    }
    private __tabRed_text: ObservedPropertyObject<string[]>;
    get tabRed_text() {
        return this.__tabRed_text.get();
    }
    set tabRed_text(newValue: string[]) {
        this.__tabRed_text.set(newValue);
    }
    private __tabRed_w: ObservedPropertyObject<number[]>; //红点标签宽度
    get tabRed_w() {
        return this.__tabRed_w.get();
    }
    set tabRed_w(newValue: number[]) {
        this.__tabRed_w.set(newValue);
    }
    private __tabRed_h: ObservedPropertyObject<number[]>; //红点标签宽度
    get tabRed_h() {
        return this.__tabRed_h.get();
    }
    set tabRed_h(newValue: number[]) {
        this.__tabRed_h.set(newValue);
    }
    //单个标签在占整行(10)的权重，默认值为2.5
    private __layoutweight: ObservedPropertySimple<number>;
    get layoutweight() {
        return this.__layoutweight.get();
    }
    set layoutweight(newValue: number) {
        this.__layoutweight.set(newValue);
    }
    render() {
        Row.create();
        Row.onAppear(() => {
            this.layoutweight = 10.0 / this.tabIcon_up.length;
            console.log("[" + this.layoutweight + "]");
            for (let i = 0; i < this.tabIcon_cur.length; i++) {
                if (i == 0)
                    this.tabIcon_cur[i] = this.tabIcon_down[i];
                else {
                    this.tabIcon_cur[i] = this.tabIcon_up[i];
                }
            }
        });
        Row.width("100%");
        Row.height("100%");
        ForEach.create("2", this, ObservedObject.GetRawObject(this.tabIcon_cur), (item: any, index: number) => {
            Column.create();
            Column.onClick(() => {
                for (let i = 0; i < this.tabIcon_cur.length; i++) {
                    if (i == index)
                        this.tabIcon_cur[i] = this.tabIcon_down[i];
                    else {
                        this.tabIcon_cur[i] = this.tabIcon_up[i];
                    }
                }
            });
            Column.height("100%");
            Column.layoutWeight(this.layoutweight);
            Row.create();
            Row.height("60%");
            Stack.create();
            Image.create($rawfile(item));
            Image.height("90%");
            Text.create(this.tabRed_text[index]);
            Text.fontColor(Color.White);
            Text.textAlign(TextAlign.Center);
            Text.width(this.tabRed_w[index]);
            Text.height(this.tabRed_h[index]);
            Text.borderRadius(20);
            Text.backgroundColor(Color.Red);
            Text.position({
                x: "25%",
                y: 0
            });
            Text.onAppear(() => {
                console.log("==== " + this.tabRed[index]);
                if (this.tabRed[index] == 0) {
                    this.tabRed_w[index] = 0;
                    this.tabRed_text[index] = "";
                }
                else if (this.tabRed[index] == 1) {
                    this.tabRed_w[index] = 10;
                    this.tabRed_h[index] = 10;
                    this.tabRed_text[index] = "";
                }
                else if (this.tabRed[index] > 1 && this.tabRed[index] < 10) {
                    this.tabRed_w[index] = 20;
                    this.tabRed_h[index] = 20;
                    this.tabRed_text[index] = this.tabRed[index] + "";
                }
                else {
                    this.tabRed_w[index] = 30;
                    this.tabRed_h[index] = 20;
                    this.tabRed_text[index] = this.tabRed[index] + "";
                }
                console.log("==== " + this.tabRed_w + "  " + this.tabRed_h + " ====");
            });
            Text.pop();
            Stack.pop();
            Row.pop();
            Row.create();
            Row.height("40%");
            Text.create(this.tabText[index]);
            Text.fontSize(20);
            Text.pop();
            Row.pop();
            Column.pop();
        });
        ForEach.pop();
        Row.pop();
    }
}
