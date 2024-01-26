interface Radio_cell_Params {
    name?: string[];
    checked_init?: boolean[];
    radio_groupName?: string;
    checked_imgName?: string[];
    curBg?: String[];
    name_num?: number;
}
interface Radio_icon_Params {
    name?: string[];
    checked_init?: boolean[];
    radio_groupName?: string;
    checked_imgName?: string[];
    cur_borderWidth?: number[];
    name_num?: number;
}
interface Radio_color_Params {
    name?: string[];
    checked_init?: boolean[];
    radio_groupName?: string;
    checked_imgName?: string[];
    name_num?: number;
}
interface Radio_disabled_Params {
    name?: string[];
    radio_groupName?: string;
    checked_init?: boolean[];
    checked_imgName?: string[];
    isDisabled?: boolean[];
    cur_opacity?: number;
    name_num?: number;
}
interface Radio_default_Params {
    name?: string[];
    checked_init?: boolean[];
    radio_groupName?: string;
    checked_imgName?: string[];
    name_num?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Radio_" + ++__generate__Id;
}
export class Radio_default extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__name = new ObservedPropertyObject([], this, "name");
        this.__checked_init = new ObservedPropertyObject([], this, "checked_init");
        this.__radio_groupName = new ObservedPropertySimple("", this, "radio_groupName");
        this.__checked_imgName = new ObservedPropertyObject([], this, "checked_imgName");
        this.name_num = 0;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Radio_default_Params) {
        if (params.name !== undefined) {
            this.name = params.name;
        }
        if (params.checked_init !== undefined) {
            this.checked_init = params.checked_init;
        }
        if (params.radio_groupName !== undefined) {
            this.radio_groupName = params.radio_groupName;
        }
        if (params.checked_imgName !== undefined) {
            this.checked_imgName = params.checked_imgName;
        }
        if (params.name_num !== undefined) {
            this.name_num = params.name_num;
        }
    }
    aboutToBeDeleted() {
        this.__name.aboutToBeDeleted();
        this.__checked_init.aboutToBeDeleted();
        this.__radio_groupName.aboutToBeDeleted();
        this.__checked_imgName.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __name: ObservedPropertyObject<string[]>; // 保存所有单选框的名称
    get name() {
        return this.__name.get();
    }
    set name(newValue: string[]) {
        this.__name.set(newValue);
    }
    private __checked_init: ObservedPropertyObject<boolean[]>; // 初始选中状态
    get checked_init() {
        return this.__checked_init.get();
    }
    set checked_init(newValue: boolean[]) {
        this.__checked_init.set(newValue);
    }
    private __radio_groupName: ObservedPropertySimple<string>; // 单选框所属的组别
    get radio_groupName() {
        return this.__radio_groupName.get();
    }
    set radio_groupName(newValue: string) {
        this.__radio_groupName.set(newValue);
    }
    private __checked_imgName: ObservedPropertyObject<string[]>; // 选中/未选中状态下的图标
    get checked_imgName() {
        return this.__checked_imgName.get();
    }
    set checked_imgName(newValue: string[]) {
        this.__checked_imgName.set(newValue);
    }
    private name_num: number; //单选框数量
    func_checked(index: number) {
        //点击文本选中当前单选框
        for (let i = 0; i < this.name.length; i++) {
            this.checked_imgName[i] = "Radio_no_checked_1.png";
        }
        this.checked_imgName[index] = "Radio_checked_blue_1.png";
        console.log("console ==== " + this.checked_imgName[index]);
    }
    render() {
        Column.create();
        Column.onAppear(() => {
            this.name_num = this.name.length;
            for (let i = 0; i < this.name.length; i++) {
                if (this.checked_init[i] == true) {
                    for (let j = 0; j < this.name.length; j++) {
                        this.checked_imgName[j] = "Radio_no_checked_1.png";
                    }
                    this.checked_imgName[i] = "Radio_checked_blue_1.png";
                }
                else
                    this.checked_imgName[i] = "Radio_no_checked_1.png";
            }
        });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.name), (item: any, index: number) => {
            Column.create();
            Column.margin({ top: 20 });
            Column.height(40);
            Column.width("100%");
            Row.create();
            Row.width("100%");
            Row.align(Alignment.Start);
            Stack.create();
            Stack.width(40);
            Stack.height(40);
            Stack.borderRadius(20);
            Stack.border({ width: 1, color: Color.Gray });
            Stack.onClick(() => {
                this.func_checked(index);
            });
            Image.create($rawfile(this.checked_imgName[index]));
            Image.size({ width: 42, height: 42 });
            Image.borderRadius(21);
            Image.offset({
                x: -2,
                y: -2
            });
            Stack.pop();
            Text.create(item);
            Text.margin({ left: 10 });
            Text.fontSize(25);
            Text.onClick(() => {
                this.func_checked(index);
            });
            Text.pop();
            Row.pop();
            Column.pop();
        });
        ForEach.pop();
        Column.pop();
    }
}
export class Radio_disabled extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__name = new ObservedPropertyObject([], this, "name");
        this.__radio_groupName = new ObservedPropertySimple("", this, "radio_groupName");
        this.__checked_init = new ObservedPropertyObject([], this, "checked_init");
        this.__checked_imgName = new ObservedPropertyObject([], this, "checked_imgName");
        this.__isDisabled = new ObservedPropertyObject([], this, "isDisabled");
        this.__cur_opacity = new ObservedPropertySimple(1, this, "cur_opacity");
        this.name_num = 0;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Radio_disabled_Params) {
        if (params.name !== undefined) {
            this.name = params.name;
        }
        if (params.radio_groupName !== undefined) {
            this.radio_groupName = params.radio_groupName;
        }
        if (params.checked_init !== undefined) {
            this.checked_init = params.checked_init;
        }
        if (params.checked_imgName !== undefined) {
            this.checked_imgName = params.checked_imgName;
        }
        if (params.isDisabled !== undefined) {
            this.isDisabled = params.isDisabled;
        }
        if (params.cur_opacity !== undefined) {
            this.cur_opacity = params.cur_opacity;
        }
        if (params.name_num !== undefined) {
            this.name_num = params.name_num;
        }
    }
    aboutToBeDeleted() {
        this.__name.aboutToBeDeleted();
        this.__radio_groupName.aboutToBeDeleted();
        this.__checked_init.aboutToBeDeleted();
        this.__checked_imgName.aboutToBeDeleted();
        this.__isDisabled.aboutToBeDeleted();
        this.__cur_opacity.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __name: ObservedPropertyObject<string[]>; // 保存所有单选框的名称
    get name() {
        return this.__name.get();
    }
    set name(newValue: string[]) {
        this.__name.set(newValue);
    }
    private __radio_groupName: ObservedPropertySimple<string>; // 单选框所属的组别
    get radio_groupName() {
        return this.__radio_groupName.get();
    }
    set radio_groupName(newValue: string) {
        this.__radio_groupName.set(newValue);
    }
    private __checked_init: ObservedPropertyObject<boolean[]>; // 初始选中状态
    get checked_init() {
        return this.__checked_init.get();
    }
    set checked_init(newValue: boolean[]) {
        this.__checked_init.set(newValue);
    }
    private __checked_imgName: ObservedPropertyObject<string[]>; // 选中/未选中状态下的图标
    get checked_imgName() {
        return this.__checked_imgName.get();
    }
    set checked_imgName(newValue: string[]) {
        this.__checked_imgName.set(newValue);
    }
    private __isDisabled: ObservedPropertyObject<boolean[]>; // 是否禁用
    get isDisabled() {
        return this.__isDisabled.get();
    }
    set isDisabled(newValue: boolean[]) {
        this.__isDisabled.set(newValue);
    }
    private __cur_opacity: ObservedPropertySimple<number>;
    get cur_opacity() {
        return this.__cur_opacity.get();
    }
    set cur_opacity(newValue: number) {
        this.__cur_opacity.set(newValue);
    }
    private name_num: number; //单选框数量
    func_checked(index: number) {
        if (this.isDisabled[index] == true)
            return;
        //点击文本选中当前单选框
        for (let i = 0; i < this.name.length; i++) {
            if (this.isDisabled[i] == false)
                this.checked_imgName[i] = "Radio_no_checked_1.png";
        }
        this.checked_imgName[index] = "Radio_checked_blue_1.png";
        console.log(this.checked_imgName + " ");
    }
    render() {
        Column.create();
        Column.onAppear(() => {
            for (let i = 0; i < this.name.length; i++) {
                if (this.isDisabled[i] == true) { //禁用状态下初始化
                    this.cur_opacity = 0.5;
                    if (this.checked_init[i] == true) {
                        for (let j = 0; j < this.name.length; j++) {
                            if (this.isDisabled[j] == true)
                                this.checked_imgName[j] = "Radio_no_checked_2.png";
                        }
                        this.checked_imgName[i] = "Radio_checked_disabled.png";
                    }
                    else
                        this.checked_imgName[i] = "Radio_no_checked_2.png";
                }
                else { //非禁用状态下初始化
                    if (this.checked_init[i] == true) {
                        for (let j = 0; j < this.name.length; j++) {
                            if (this.isDisabled[j] == false)
                                this.checked_imgName[j] = "Radio_no_checked_1.png";
                        }
                        this.checked_imgName[i] = "Radio_checked_blue_1.png";
                    }
                    else
                        this.checked_imgName[i] = "Radio_no_checked_1.png";
                }
            }
        });
        ForEach.create("3", this, ObservedObject.GetRawObject(this.name), (item: any, index: number) => {
            Column.create();
            Column.opacity(this.cur_opacity);
            Column.height(40);
            Column.margin({ top: 20 });
            Column.width("100%");
            Row.create();
            Row.width("100%");
            Row.align(Alignment.Start);
            Stack.create();
            Stack.width(40);
            Stack.height(40);
            Stack.borderRadius(20);
            Stack.border({ width: 1, color: Color.Gray });
            Stack.onClick(() => {
                this.func_checked(index);
            });
            Image.create($rawfile(this.checked_imgName[index]));
            Image.borderRadius(21);
            Image.size({ width: 42, height: 42 });
            Image.offset({
                x: -2,
                y: -2
            });
            Stack.pop();
            Text.create(item);
            Text.fontSize(20);
            Text.margin({ left: 10 });
            Text.onClick(() => {
                this.func_checked(index);
            });
            Text.pop();
            Row.pop();
            Column.pop();
        });
        ForEach.pop();
        Column.pop();
    }
}
export class Radio_color extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__name = new ObservedPropertyObject([], this, "name");
        this.__checked_init = new ObservedPropertyObject([], this, "checked_init");
        this.__radio_groupName = new ObservedPropertySimple("", this, "radio_groupName");
        this.__checked_imgName = new ObservedPropertyObject([], this, "checked_imgName");
        this.name_num = 0;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Radio_color_Params) {
        if (params.name !== undefined) {
            this.name = params.name;
        }
        if (params.checked_init !== undefined) {
            this.checked_init = params.checked_init;
        }
        if (params.radio_groupName !== undefined) {
            this.radio_groupName = params.radio_groupName;
        }
        if (params.checked_imgName !== undefined) {
            this.checked_imgName = params.checked_imgName;
        }
        if (params.name_num !== undefined) {
            this.name_num = params.name_num;
        }
    }
    aboutToBeDeleted() {
        this.__name.aboutToBeDeleted();
        this.__checked_init.aboutToBeDeleted();
        this.__radio_groupName.aboutToBeDeleted();
        this.__checked_imgName.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __name: ObservedPropertyObject<string[]>; // 保存所有单选框的名称
    get name() {
        return this.__name.get();
    }
    set name(newValue: string[]) {
        this.__name.set(newValue);
    }
    private __checked_init: ObservedPropertyObject<boolean[]>; // 初始选中状态
    get checked_init() {
        return this.__checked_init.get();
    }
    set checked_init(newValue: boolean[]) {
        this.__checked_init.set(newValue);
    }
    private __radio_groupName: ObservedPropertySimple<string>; // 单选框所属的组别
    get radio_groupName() {
        return this.__radio_groupName.get();
    }
    set radio_groupName(newValue: string) {
        this.__radio_groupName.set(newValue);
    }
    private __checked_imgName: ObservedPropertyObject<string[]>; // 选中/未选中状态下的图标
    get checked_imgName() {
        return this.__checked_imgName.get();
    }
    set checked_imgName(newValue: string[]) {
        this.__checked_imgName.set(newValue);
    }
    private name_num: number; //单选框数量
    func_checked(index: number) {
        //点击文本选中当前单选框
        for (let i = 0; i < this.name.length; i++) {
            this.checked_imgName[i] = "Radio_no_checked_1.png";
        }
        this.checked_imgName[index] = "Radio_checked_green.png";
        console.log("console ==== " + this.checked_imgName[index]);
    }
    render() {
        Column.create();
        Column.onAppear(() => {
            this.name_num = this.name.length;
            for (let i = 0; i < this.name.length; i++) {
                if (this.checked_init[i] == true) {
                    for (let j = 0; j < this.name.length; j++) {
                        this.checked_imgName[j] = "Radio_no_checked_1.png";
                    }
                    this.checked_imgName[i] = "Radio_checked_green.png";
                }
                else
                    this.checked_imgName[i] = "Radio_no_checked_1.png";
            }
        });
        ForEach.create("4", this, ObservedObject.GetRawObject(this.name), (item: any, index: number) => {
            Column.create();
            Column.margin({ top: 20 });
            Column.height(30);
            Column.width("100%");
            Row.create();
            Row.width("100%");
            Row.align(Alignment.Start);
            Stack.create();
            Stack.width(40);
            Stack.height(40);
            Stack.borderRadius(20);
            Stack.border({ width: 1, color: Color.Gray });
            Stack.onClick(() => {
                this.func_checked(index);
            });
            Image.create($rawfile(this.checked_imgName[index]));
            Image.size({ width: 42, height: 42 });
            Image.borderRadius(21);
            Image.offset({
                x: -2,
                y: -2
            });
            Stack.pop();
            Text.create(item);
            Text.fontSize(20);
            Text.margin({ left: 10 });
            Text.onClick(() => {
                this.func_checked(index);
            });
            Text.pop();
            Row.pop();
            Column.pop();
        });
        ForEach.pop();
        Column.pop();
    }
}
export class Radio_icon extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__name = new ObservedPropertyObject([], this, "name");
        this.__checked_init = new ObservedPropertyObject([], this, "checked_init");
        this.__radio_groupName = new ObservedPropertySimple("", this, "radio_groupName");
        this.__checked_imgName = new ObservedPropertyObject([], this, "checked_imgName");
        this.__cur_borderWidth = new ObservedPropertyObject([], this, "cur_borderWidth");
        this.name_num = 0;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Radio_icon_Params) {
        if (params.name !== undefined) {
            this.name = params.name;
        }
        if (params.checked_init !== undefined) {
            this.checked_init = params.checked_init;
        }
        if (params.radio_groupName !== undefined) {
            this.radio_groupName = params.radio_groupName;
        }
        if (params.checked_imgName !== undefined) {
            this.checked_imgName = params.checked_imgName;
        }
        if (params.cur_borderWidth !== undefined) {
            this.cur_borderWidth = params.cur_borderWidth;
        }
        if (params.name_num !== undefined) {
            this.name_num = params.name_num;
        }
    }
    aboutToBeDeleted() {
        this.__name.aboutToBeDeleted();
        this.__checked_init.aboutToBeDeleted();
        this.__radio_groupName.aboutToBeDeleted();
        this.__checked_imgName.aboutToBeDeleted();
        this.__cur_borderWidth.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __name: ObservedPropertyObject<string[]>; // 保存所有单选框的名称
    get name() {
        return this.__name.get();
    }
    set name(newValue: string[]) {
        this.__name.set(newValue);
    }
    private __checked_init: ObservedPropertyObject<boolean[]>; // 初始选中状态
    get checked_init() {
        return this.__checked_init.get();
    }
    set checked_init(newValue: boolean[]) {
        this.__checked_init.set(newValue);
    }
    private __radio_groupName: ObservedPropertySimple<string>; // 单选框所属的组别
    get radio_groupName() {
        return this.__radio_groupName.get();
    }
    set radio_groupName(newValue: string) {
        this.__radio_groupName.set(newValue);
    }
    private __checked_imgName: ObservedPropertyObject<string[]>; // 选中/未选中状态下的图标
    get checked_imgName() {
        return this.__checked_imgName.get();
    }
    set checked_imgName(newValue: string[]) {
        this.__checked_imgName.set(newValue);
    }
    private __cur_borderWidth: ObservedPropertyObject<number[]>; //单选框按钮边框宽度
    get cur_borderWidth() {
        return this.__cur_borderWidth.get();
    }
    set cur_borderWidth(newValue: number[]) {
        this.__cur_borderWidth.set(newValue);
    }
    private name_num: number; //单选框数量
    func_checked(index: number) {
        //点击文本选中当前单选框
        for (let i = 0; i < this.name.length; i++) {
            this.cur_borderWidth[i] = 1;
            this.checked_imgName[i] = "Radio_no_checked_1.png";
        }
        this.cur_borderWidth[index] = 0;
        this.checked_imgName[index] = "Radio_checked_blue_2.png";
    }
    render() {
        Column.create();
        Column.onAppear(() => {
            this.name_num = this.name.length;
            for (let i = 0; i < this.name.length; i++) {
                if (this.checked_init[i] == true) {
                    for (let j = 0; j < this.name.length; j++) {
                        this.cur_borderWidth[j] = 1;
                        this.checked_imgName[j] = "Radio_no_checked_1.png";
                    }
                    this.cur_borderWidth[i] = 0;
                    this.checked_imgName[i] = "Radio_checked_blue_2.png";
                }
                else
                    this.checked_imgName[i] = "Radio_no_checked_1.png";
            }
        });
        ForEach.create("5", this, ObservedObject.GetRawObject(this.name), (item: any, index: number) => {
            Column.create();
            Column.height(30);
            Column.margin({ top: 20 });
            Column.width("100%");
            Row.create();
            Row.width("100%");
            Row.align(Alignment.Start);
            Stack.create();
            Stack.width(40);
            Stack.height(40);
            Stack.borderRadius(20);
            Stack.border({ width: this.cur_borderWidth[index], color: Color.Gray });
            Stack.onClick(() => {
                this.func_checked(index);
            });
            Image.create($rawfile(this.checked_imgName[index]));
            Image.size({ width: 42, height: 42 });
            Image.borderRadius(21);
            Stack.pop();
            Text.create(item);
            Text.fontSize(20);
            Text.margin({ left: 10 });
            Text.onClick(() => {
                this.func_checked(index);
            });
            Text.pop();
            Row.pop();
            Column.pop();
        });
        ForEach.pop();
        Column.pop();
    }
}
export class Radio_cell extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__name = new ObservedPropertyObject([], this, "name");
        this.__checked_init = new ObservedPropertyObject([], this, "checked_init");
        this.__radio_groupName = new ObservedPropertySimple("", this, "radio_groupName");
        this.__checked_imgName = new ObservedPropertyObject([], this, "checked_imgName");
        this.__curBg = new ObservedPropertyObject([], this, "curBg");
        this.name_num = 0;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Radio_cell_Params) {
        if (params.name !== undefined) {
            this.name = params.name;
        }
        if (params.checked_init !== undefined) {
            this.checked_init = params.checked_init;
        }
        if (params.radio_groupName !== undefined) {
            this.radio_groupName = params.radio_groupName;
        }
        if (params.checked_imgName !== undefined) {
            this.checked_imgName = params.checked_imgName;
        }
        if (params.curBg !== undefined) {
            this.curBg = params.curBg;
        }
        if (params.name_num !== undefined) {
            this.name_num = params.name_num;
        }
    }
    aboutToBeDeleted() {
        this.__name.aboutToBeDeleted();
        this.__checked_init.aboutToBeDeleted();
        this.__radio_groupName.aboutToBeDeleted();
        this.__checked_imgName.aboutToBeDeleted();
        this.__curBg.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __name: ObservedPropertyObject<string[]>; // 保存所有单选框的名称
    get name() {
        return this.__name.get();
    }
    set name(newValue: string[]) {
        this.__name.set(newValue);
    }
    private __checked_init: ObservedPropertyObject<boolean[]>; // 初始选中状态
    get checked_init() {
        return this.__checked_init.get();
    }
    set checked_init(newValue: boolean[]) {
        this.__checked_init.set(newValue);
    }
    private __radio_groupName: ObservedPropertySimple<string>; // 单选框所属的组别
    get radio_groupName() {
        return this.__radio_groupName.get();
    }
    set radio_groupName(newValue: string) {
        this.__radio_groupName.set(newValue);
    }
    private __checked_imgName: ObservedPropertyObject<string[]>; // 选中/未选中状态下的图标
    get checked_imgName() {
        return this.__checked_imgName.get();
    }
    set checked_imgName(newValue: string[]) {
        this.__checked_imgName.set(newValue);
    }
    private __curBg: ObservedPropertyObject<String[]>; //背景颜色
    get curBg() {
        return this.__curBg.get();
    }
    set curBg(newValue: String[]) {
        this.__curBg.set(newValue);
    }
    private name_num: number; //单选框数量
    func_checked(index: number) {
        //点击文本选中当前单选框
        for (let i = 0; i < this.name.length; i++) {
            this.checked_imgName[i] = "Radio_no_checked_1.png";
        }
        this.checked_imgName[index] = "Radio_checked_blue_1.png";
        console.log("console ==== " + this.checked_imgName[index]);
    }
    render() {
        Column.create();
        Column.onAppear(() => {
            this.name_num = this.name.length;
            for (let i = 0; i < this.name.length; i++) {
                this.curBg[i] = "#FFFFFF";
                if (this.checked_init[i] == true) {
                    for (let j = 0; j < this.name.length; j++) {
                        this.checked_imgName[j] = "Radio_no_checked_1.png";
                    }
                    this.checked_imgName[i] = "Radio_checked_blue_1.png";
                }
                else
                    this.checked_imgName[i] = "Radio_no_checked_1.png";
            }
        });
        ForEach.create("6", this, ObservedObject.GetRawObject(this.name), (item: any, index: number) => {
            Column.create();
            Column.margin({ top: 20 });
            Column.height(40);
            Column.width("100%");
            Column.backgroundColor("" + this.curBg[index]);
            Column.onClick(() => {
                this.curBg[index] = "#EAEAEA";
                this.func_checked(index);
                setTimeout(() => {
                    this.curBg[index] = "#FFFFFF";
                }, 150);
            });
            Row.create();
            Row.alignItems(VerticalAlign.Center);
            Row.height("100%");
            Row.width("100%");
            Text.create(item);
            Text.fontSize(20);
            Text.onClick(() => {
                this.func_checked(index);
            });
            Text.pop();
            Column.create();
            Column.width("80%");
            Column.alignItems(HorizontalAlign.End);
            Stack.create();
            Stack.width(40);
            Stack.height(40);
            Stack.borderRadius(20);
            Stack.border({ width: 1, color: Color.Gray });
            Stack.onClick(() => {
                this.func_checked(index);
            });
            Image.create($rawfile(this.checked_imgName[index]));
            Image.size({ width: 42, height: 42 });
            Image.borderRadius(21);
            Image.offset({
                x: -2,
                y: -2
            });
            Stack.pop();
            Column.pop();
            Row.pop();
            Column.pop();
        });
        ForEach.pop();
        Column.pop();
    }
}
