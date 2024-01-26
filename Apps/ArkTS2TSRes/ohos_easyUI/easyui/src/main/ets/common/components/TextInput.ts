interface TextInput_disabled_Params {
    iconUrl?: string;
    placeholder?: string;
    inputType?: InputType;
    borderRadius_num?: number;
    isEnabled?: boolean;
    isVisibility?: Visibility;
}
interface TextInput_search_Params {
    searchIconUrl?: string;
    placeholder?: string;
    inputType?: InputType;
    borderRadius_num?: number;
}
interface TextInput_label_Params {
    placeholder?: string;
    inputType?: InputType;
    labelText?: string;
    labelTextColor?: Color;
}
interface TextInput_icon_Params {
    iconUrl?: string;
    placeholder?: string;
    inputType?: InputType;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TextInput_" + ++__generate__Id;
}
export class TextInput_icon extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__iconUrl = new ObservedPropertySimple("", this, "iconUrl");
        this.__placeholder = new ObservedPropertySimple("", this, "placeholder");
        this.__inputType = new ObservedPropertySimple(InputType.Normal, this, "inputType");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TextInput_icon_Params) {
        if (params.iconUrl !== undefined) {
            this.iconUrl = params.iconUrl;
        }
        if (params.placeholder !== undefined) {
            this.placeholder = params.placeholder;
        }
        if (params.inputType !== undefined) {
            this.inputType = params.inputType;
        }
    }
    aboutToBeDeleted() {
        this.__iconUrl.aboutToBeDeleted();
        this.__placeholder.aboutToBeDeleted();
        this.__inputType.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __iconUrl: ObservedPropertySimple<string>; //图标图片路径
    get iconUrl() {
        return this.__iconUrl.get();
    }
    set iconUrl(newValue: string) {
        this.__iconUrl.set(newValue);
    }
    private __placeholder: ObservedPropertySimple<string>; //输入框提示文本
    get placeholder() {
        return this.__placeholder.get();
    }
    set placeholder(newValue: string) {
        this.__placeholder.set(newValue);
    }
    private __inputType: ObservedPropertySimple<InputType>; //输入框类型
    get inputType() {
        return this.__inputType.get();
    }
    set inputType(newValue: InputType) {
        this.__inputType.set(newValue);
    }
    render() {
        Column.create();
        Row.create();
        Row.create();
        Row.margin({ right: "5%", left: "5%", top: "10" });
        Row.backgroundColor("#F3F3F3");
        Stack.create();
        Stack.width("15%");
        Image.create($rawfile(this.iconUrl));
        Image.height(30);
        Image.margin({ top: 5, left: 5 });
        Stack.pop();
        Stack.create();
        Stack.width("85%");
        Stack.onAppear(() => {
            switch (this.placeholder) {
                case "密码":
                    this.inputType = InputType.Password;
                    break;
                case "邮箱":
                    this.inputType = InputType.Email;
                    break;
                case "手机号":
                    this.inputType = InputType.Number;
                    break;
            }
        });
        Stack.opacity(0.5);
        TextInput.create({ placeholder: this.placeholder });
        TextInput.placeholderColor(Color.Gray);
        TextInput.caretColor(Color.Black);
        TextInput.height(50);
        TextInput.fontSize(20);
        TextInput.maxLength(15);
        TextInput.fontWeight(FontWeight.Bold);
        TextInput.fontFamily("sans-serif");
        TextInput.fontStyle(FontStyle.Normal);
        TextInput.fontColor(Color.Black);
        TextInput.borderWidth(0);
        TextInput.borderRadius(0);
        TextInput.type(this.inputType);
        Stack.pop();
        Row.pop();
        Row.pop();
        Column.pop();
    }
}
export class TextInput_label extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__placeholder = new ObservedPropertySimple("", this, "placeholder");
        this.__inputType = new ObservedPropertySimple(InputType.Normal, this, "inputType");
        this.__labelText = new ObservedPropertySimple("", this, "labelText");
        this.__labelTextColor = new ObservedPropertySimple(Color.Red, this, "labelTextColor");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TextInput_label_Params) {
        if (params.placeholder !== undefined) {
            this.placeholder = params.placeholder;
        }
        if (params.inputType !== undefined) {
            this.inputType = params.inputType;
        }
        if (params.labelText !== undefined) {
            this.labelText = params.labelText;
        }
        if (params.labelTextColor !== undefined) {
            this.labelTextColor = params.labelTextColor;
        }
    }
    aboutToBeDeleted() {
        this.__placeholder.aboutToBeDeleted();
        this.__inputType.aboutToBeDeleted();
        this.__labelText.aboutToBeDeleted();
        this.__labelTextColor.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __placeholder: ObservedPropertySimple<string>; //输入框提示文本
    get placeholder() {
        return this.__placeholder.get();
    }
    set placeholder(newValue: string) {
        this.__placeholder.set(newValue);
    }
    private __inputType: ObservedPropertySimple<InputType>; //输入框类型
    get inputType() {
        return this.__inputType.get();
    }
    set inputType(newValue: InputType) {
        this.__inputType.set(newValue);
    }
    private __labelText: ObservedPropertySimple<string>; //标签文本
    get labelText() {
        return this.__labelText.get();
    }
    set labelText(newValue: string) {
        this.__labelText.set(newValue);
    }
    private __labelTextColor: ObservedPropertySimple<Color>; //标签文本的颜色
    get labelTextColor() {
        return this.__labelTextColor.get();
    }
    set labelTextColor(newValue: Color) {
        this.__labelTextColor.set(newValue);
    }
    render() {
        Column.create();
        Row.create();
        Row.create();
        Row.margin({ right: "5%", left: "5%", top: "10" });
        Row.backgroundColor("#F3F3F3");
        Stack.create();
        Stack.width("18%");
        Text.create(this.placeholder);
        Text.fontSize(15);
        Text.margin({ left: 5 });
        Text.pop();
        Stack.pop();
        Stack.create({ alignContent: Alignment.End });
        Stack.width("82%");
        Stack.onAppear(() => {
            switch (this.placeholder) {
                case "密码:":
                    this.inputType = InputType.Password;
                    break;
                case "邮箱:":
                    this.inputType = InputType.Email;
                    break;
                case "手机号:":
                    this.inputType = InputType.Number;
                    break;
                case "用户名:":
                    this.inputType = InputType.Normal;
                    break;
            }
        });
        Stack.opacity(0.5);
        TextInput.create();
        TextInput.placeholderColor(Color.Gray);
        TextInput.caretColor(Color.Black);
        TextInput.height(50);
        TextInput.fontSize(20);
        TextInput.maxLength(15);
        TextInput.fontFamily("sans-serif");
        TextInput.fontStyle(FontStyle.Normal);
        TextInput.fontColor(Color.Black);
        TextInput.borderRadius(0);
        TextInput.type(this.inputType);
        Text.create(this.labelText);
        Text.fontSize(15);
        Text.fontColor(this.labelTextColor);
        Text.zIndex(10);
        Text.onAppear(() => {
            switch (this.labelText) {
                case "合法!!":
                    this.labelTextColor = Color.Green;
                    break;
                case "不合法!!":
                    this.labelTextColor = Color.Red;
                    break;
            }
        });
        Text.pop();
        Stack.pop();
        Row.pop();
        Row.pop();
        Column.pop();
    }
}
export class TextInput_search extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__searchIconUrl = new ObservedPropertySimple("", this, "searchIconUrl");
        this.__placeholder = new ObservedPropertySimple("", this, "placeholder");
        this.__inputType = new ObservedPropertySimple(InputType.Normal, this, "inputType");
        this.__borderRadius_num = new ObservedPropertySimple(0, this, "borderRadius_num");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TextInput_search_Params) {
        if (params.searchIconUrl !== undefined) {
            this.searchIconUrl = params.searchIconUrl;
        }
        if (params.placeholder !== undefined) {
            this.placeholder = params.placeholder;
        }
        if (params.inputType !== undefined) {
            this.inputType = params.inputType;
        }
        if (params.borderRadius_num !== undefined) {
            this.borderRadius_num = params.borderRadius_num;
        }
    }
    aboutToBeDeleted() {
        this.__searchIconUrl.aboutToBeDeleted();
        this.__placeholder.aboutToBeDeleted();
        this.__inputType.aboutToBeDeleted();
        this.__borderRadius_num.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __searchIconUrl: ObservedPropertySimple<string>; //搜索图标图片路径
    get searchIconUrl() {
        return this.__searchIconUrl.get();
    }
    set searchIconUrl(newValue: string) {
        this.__searchIconUrl.set(newValue);
    }
    private __placeholder: ObservedPropertySimple<string>; //输入框提示文本
    get placeholder() {
        return this.__placeholder.get();
    }
    set placeholder(newValue: string) {
        this.__placeholder.set(newValue);
    }
    private __inputType: ObservedPropertySimple<InputType>; //输入框类型
    get inputType() {
        return this.__inputType.get();
    }
    set inputType(newValue: InputType) {
        this.__inputType.set(newValue);
    }
    private __borderRadius_num: ObservedPropertySimple<number>; //输入框圆角值
    get borderRadius_num() {
        return this.__borderRadius_num.get();
    }
    set borderRadius_num(newValue: number) {
        this.__borderRadius_num.set(newValue);
    }
    render() {
        Column.create();
        Row.create();
        Row.borderRadius(this.borderRadius_num);
        Row.width("100%");
        Row.alignItems(VerticalAlign.Center);
        Row.create();
        Row.borderRadius(this.borderRadius_num);
        Row.width('90%');
        Row.margin({ right: "5%", left: "5%", top: "10" });
        Row.backgroundColor("#F3F3F3");
        Stack.create();
        Stack.width("15%");
        Image.create($rawfile(this.searchIconUrl));
        Image.height(30);
        Image.width(30);
        Stack.pop();
        Stack.create();
        Stack.width("85%");
        Stack.opacity(0.5);
        TextInput.create({ placeholder: this.placeholder });
        TextInput.placeholderColor(Color.Gray);
        TextInput.caretColor(Color.Black);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.fontWeight(FontWeight.Bold);
        TextInput.fontFamily("sans-serif");
        TextInput.fontStyle(FontStyle.Normal);
        TextInput.fontColor(Color.Black);
        TextInput.borderWidth(0);
        TextInput.borderRadius(this.borderRadius_num);
        TextInput.type(this.inputType);
        Stack.pop();
        Row.pop();
        Row.pop();
        Column.pop();
    }
}
export class TextInput_disabled extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__iconUrl = new ObservedPropertySimple("", this, "iconUrl");
        this.__placeholder = new ObservedPropertySimple("", this, "placeholder");
        this.__inputType = new ObservedPropertySimple(InputType.Normal, this, "inputType");
        this.__borderRadius_num = new ObservedPropertySimple(0, this, "borderRadius_num");
        this.__isEnabled = new ObservedPropertySimple(false, this, "isEnabled");
        this.__isVisibility = new ObservedPropertySimple(Visibility.Visible, this, "isVisibility");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TextInput_disabled_Params) {
        if (params.iconUrl !== undefined) {
            this.iconUrl = params.iconUrl;
        }
        if (params.placeholder !== undefined) {
            this.placeholder = params.placeholder;
        }
        if (params.inputType !== undefined) {
            this.inputType = params.inputType;
        }
        if (params.borderRadius_num !== undefined) {
            this.borderRadius_num = params.borderRadius_num;
        }
        if (params.isEnabled !== undefined) {
            this.isEnabled = params.isEnabled;
        }
        if (params.isVisibility !== undefined) {
            this.isVisibility = params.isVisibility;
        }
    }
    aboutToBeDeleted() {
        this.__iconUrl.aboutToBeDeleted();
        this.__placeholder.aboutToBeDeleted();
        this.__inputType.aboutToBeDeleted();
        this.__borderRadius_num.aboutToBeDeleted();
        this.__isEnabled.aboutToBeDeleted();
        this.__isVisibility.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __iconUrl: ObservedPropertySimple<string>; //图标图片路径
    get iconUrl() {
        return this.__iconUrl.get();
    }
    set iconUrl(newValue: string) {
        this.__iconUrl.set(newValue);
    }
    private __placeholder: ObservedPropertySimple<string>; //输入框提示文本
    get placeholder() {
        return this.__placeholder.get();
    }
    set placeholder(newValue: string) {
        this.__placeholder.set(newValue);
    }
    private __inputType: ObservedPropertySimple<InputType>; //输入框类型
    get inputType() {
        return this.__inputType.get();
    }
    set inputType(newValue: InputType) {
        this.__inputType.set(newValue);
    }
    private __borderRadius_num: ObservedPropertySimple<number>; //输入框的圆角值
    get borderRadius_num() {
        return this.__borderRadius_num.get();
    }
    set borderRadius_num(newValue: number) {
        this.__borderRadius_num.set(newValue);
    }
    private __isEnabled: ObservedPropertySimple<boolean>; //是否禁用
    get isEnabled() {
        return this.__isEnabled.get();
    }
    set isEnabled(newValue: boolean) {
        this.__isEnabled.set(newValue);
    }
    private __isVisibility: ObservedPropertySimple<Visibility>; //“已禁用！”提示文本的可见性
    get isVisibility() {
        return this.__isVisibility.get();
    }
    set isVisibility(newValue: Visibility) {
        this.__isVisibility.set(newValue);
    }
    render() {
        Column.create();
        Row.create();
        Row.borderRadius(this.borderRadius_num);
        Row.width("100%");
        Row.alignItems(VerticalAlign.Center);
        Row.create();
        Row.borderRadius(this.borderRadius_num);
        Row.width('90%');
        Row.margin({ right: "5%", left: "5%", top: "10" });
        Row.backgroundColor("#F3F3F3");
        Stack.create();
        Stack.width("15%");
        Image.create($rawfile(this.iconUrl));
        Image.height(30);
        Image.width(30);
        Stack.pop();
        Stack.create({ alignContent: Alignment.End });
        Stack.width("85%");
        Stack.opacity(0.5);
        TextInput.create({ placeholder: this.placeholder });
        TextInput.placeholderColor(Color.Gray);
        TextInput.caretColor(Color.Black);
        TextInput.height(50);
        TextInput.fontSize(30);
        TextInput.fontWeight(FontWeight.Bold);
        TextInput.fontFamily("sans-serif");
        TextInput.fontStyle(FontStyle.Normal);
        TextInput.fontColor(Color.Black);
        TextInput.borderWidth(0);
        TextInput.borderRadius(this.borderRadius_num);
        TextInput.type(this.inputType);
        TextInput.enabled(this.isEnabled);
        TextInput.onAppear(() => {
            if (!this.isEnabled) {
                this.isVisibility = Visibility.Visible;
            }
            else {
                this.isVisibility = Visibility.Hidden;
            }
        });
        Text.create("已禁用！");
        Text.fontSize(15);
        Text.fontColor(Color.Red);
        Text.zIndex(10);
        Text.visibility(this.isVisibility);
        Text.pop();
        Stack.pop();
        Row.pop();
        Row.pop();
        Column.pop();
    }
}
