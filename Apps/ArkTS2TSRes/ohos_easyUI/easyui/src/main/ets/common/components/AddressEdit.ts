interface Area_placeholder_Params {
    result?: string;
    provinces?: string[];
    cities?: string[];
    district?: string[];
    selectedProvince?: number;
    selectedCity?: number;
    selectedDistrict?: number;
    title?: string;
    dataInfo?;
    areaSelectHeight?: string;
    showAreaSelect?: boolean;
    cancel?: boolean;
    confirm?: boolean;
}
interface AddressEdit_Params {
    result?: string;
    showResult?: string;
    areaSelectHeight?: string;
    showAreaSelect?: boolean;
    maskOpacity?: number;
    cancel?: boolean;
    confirm?: boolean;
    nameText?: string;
    phoneText?: string;
    detailInfoText?: string;
    codeText?: string;
    isShowCloseImg_name?: boolean;
    isShowCloseImg_phone?: boolean;
    isShowCloseImg_detailInfo?: boolean;
    isShowCloseImg_code?: boolean;
    defaultPlaceholderColor?: string;
    warnPlaceholderColor?: string;
    blackFontColor?: string;
    phoneNumberFontColor?: string;
    nameFontColor?: string;
    phoneFontColor?: string;
    detailInfoFontColor?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "AddressEdit_" + ++__generate__Id;
}
export class AddressEdit extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__result = new ObservedPropertySimple("选择省/市/区", this, "result");
        this.__showResult = new ObservedPropertySimple("选择省/市/区", this, "showResult");
        this.__areaSelectHeight = new ObservedPropertySimple("0%", this, "areaSelectHeight");
        this.__showAreaSelect = new ObservedPropertySimple(false, this, "showAreaSelect");
        this.__maskOpacity = new ObservedPropertySimple(0.6, this, "maskOpacity");
        this.__cancel = new ObservedPropertySimple(false, this, "cancel");
        this.__confirm = new ObservedPropertySimple(false, this, "confirm");
        this.__nameText = new ObservedPropertySimple("", this, "nameText");
        this.__phoneText = new ObservedPropertySimple("", this, "phoneText");
        this.__detailInfoText = new ObservedPropertySimple("", this, "detailInfoText");
        this.__codeText = new ObservedPropertySimple("", this, "codeText");
        this.__isShowCloseImg_name = new ObservedPropertySimple(false, this, "isShowCloseImg_name");
        this.__isShowCloseImg_phone = new ObservedPropertySimple(false, this, "isShowCloseImg_phone");
        this.__isShowCloseImg_detailInfo = new ObservedPropertySimple(false, this, "isShowCloseImg_detailInfo");
        this.__isShowCloseImg_code = new ObservedPropertySimple(false, this, "isShowCloseImg_code");
        this.defaultPlaceholderColor = "#ff858585";
        this.warnPlaceholderColor = "#ffff0000";
        this.blackFontColor = "#ff000000";
        this.__phoneNumberFontColor = new ObservedPropertySimple(this.blackFontColor, this, "phoneNumberFontColor");
        this.__nameFontColor = new ObservedPropertySimple(this.defaultPlaceholderColor, this, "nameFontColor");
        this.__phoneFontColor = new ObservedPropertySimple(this.defaultPlaceholderColor, this, "phoneFontColor");
        this.__detailInfoFontColor = new ObservedPropertySimple(this.defaultPlaceholderColor
        //处理点击确定事件
        , this, "detailInfoFontColor");
        this.updateWithValueParams(params);
        this.declareWatch("cancel", this.closeAreaSelect);
        this.declareWatch("confirm", this.handleResult);
    }
    updateWithValueParams(params: AddressEdit_Params) {
        if (params.result !== undefined) {
            this.result = params.result;
        }
        if (params.showResult !== undefined) {
            this.showResult = params.showResult;
        }
        if (params.areaSelectHeight !== undefined) {
            this.areaSelectHeight = params.areaSelectHeight;
        }
        if (params.showAreaSelect !== undefined) {
            this.showAreaSelect = params.showAreaSelect;
        }
        if (params.maskOpacity !== undefined) {
            this.maskOpacity = params.maskOpacity;
        }
        if (params.cancel !== undefined) {
            this.cancel = params.cancel;
        }
        if (params.confirm !== undefined) {
            this.confirm = params.confirm;
        }
        if (params.nameText !== undefined) {
            this.nameText = params.nameText;
        }
        if (params.phoneText !== undefined) {
            this.phoneText = params.phoneText;
        }
        if (params.detailInfoText !== undefined) {
            this.detailInfoText = params.detailInfoText;
        }
        if (params.codeText !== undefined) {
            this.codeText = params.codeText;
        }
        if (params.isShowCloseImg_name !== undefined) {
            this.isShowCloseImg_name = params.isShowCloseImg_name;
        }
        if (params.isShowCloseImg_phone !== undefined) {
            this.isShowCloseImg_phone = params.isShowCloseImg_phone;
        }
        if (params.isShowCloseImg_detailInfo !== undefined) {
            this.isShowCloseImg_detailInfo = params.isShowCloseImg_detailInfo;
        }
        if (params.isShowCloseImg_code !== undefined) {
            this.isShowCloseImg_code = params.isShowCloseImg_code;
        }
        if (params.defaultPlaceholderColor !== undefined) {
            this.defaultPlaceholderColor = params.defaultPlaceholderColor;
        }
        if (params.warnPlaceholderColor !== undefined) {
            this.warnPlaceholderColor = params.warnPlaceholderColor;
        }
        if (params.blackFontColor !== undefined) {
            this.blackFontColor = params.blackFontColor;
        }
        if (params.phoneNumberFontColor !== undefined) {
            this.phoneNumberFontColor = params.phoneNumberFontColor;
        }
        if (params.nameFontColor !== undefined) {
            this.nameFontColor = params.nameFontColor;
        }
        if (params.phoneFontColor !== undefined) {
            this.phoneFontColor = params.phoneFontColor;
        }
        if (params.detailInfoFontColor !== undefined) {
            this.detailInfoFontColor = params.detailInfoFontColor;
        }
    }
    aboutToBeDeleted() {
        this.__result.aboutToBeDeleted();
        this.__showResult.aboutToBeDeleted();
        this.__areaSelectHeight.aboutToBeDeleted();
        this.__showAreaSelect.aboutToBeDeleted();
        this.__maskOpacity.aboutToBeDeleted();
        this.__cancel.aboutToBeDeleted();
        this.__confirm.aboutToBeDeleted();
        this.__nameText.aboutToBeDeleted();
        this.__phoneText.aboutToBeDeleted();
        this.__detailInfoText.aboutToBeDeleted();
        this.__codeText.aboutToBeDeleted();
        this.__isShowCloseImg_name.aboutToBeDeleted();
        this.__isShowCloseImg_phone.aboutToBeDeleted();
        this.__isShowCloseImg_detailInfo.aboutToBeDeleted();
        this.__isShowCloseImg_code.aboutToBeDeleted();
        this.__phoneNumberFontColor.aboutToBeDeleted();
        this.__nameFontColor.aboutToBeDeleted();
        this.__phoneFontColor.aboutToBeDeleted();
        this.__detailInfoFontColor.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __result: ObservedPropertySimple<string>;
    get result() {
        return this.__result.get();
    }
    set result(newValue: string) {
        this.__result.set(newValue);
    }
    private __showResult: ObservedPropertySimple<string>;
    get showResult() {
        return this.__showResult.get();
    }
    set showResult(newValue: string) {
        this.__showResult.set(newValue);
    }
    private __areaSelectHeight: ObservedPropertySimple<string>;
    get areaSelectHeight() {
        return this.__areaSelectHeight.get();
    }
    set areaSelectHeight(newValue: string) {
        this.__areaSelectHeight.set(newValue);
    }
    private __showAreaSelect: ObservedPropertySimple<boolean>;
    get showAreaSelect() {
        return this.__showAreaSelect.get();
    }
    set showAreaSelect(newValue: boolean) {
        this.__showAreaSelect.set(newValue);
    }
    private __maskOpacity: ObservedPropertySimple<number>;
    get maskOpacity() {
        return this.__maskOpacity.get();
    }
    set maskOpacity(newValue: number) {
        this.__maskOpacity.set(newValue);
    }
    private __cancel: ObservedPropertySimple<boolean>;
    get cancel() {
        return this.__cancel.get();
    }
    set cancel(newValue: boolean) {
        this.__cancel.set(newValue);
    }
    private __confirm: ObservedPropertySimple<boolean>;
    get confirm() {
        return this.__confirm.get();
    }
    set confirm(newValue: boolean) {
        this.__confirm.set(newValue);
    }
    private __nameText: ObservedPropertySimple<string>;
    get nameText() {
        return this.__nameText.get();
    }
    set nameText(newValue: string) {
        this.__nameText.set(newValue);
    }
    private __phoneText: ObservedPropertySimple<string>;
    get phoneText() {
        return this.__phoneText.get();
    }
    set phoneText(newValue: string) {
        this.__phoneText.set(newValue);
    }
    private __detailInfoText: ObservedPropertySimple<string>;
    get detailInfoText() {
        return this.__detailInfoText.get();
    }
    set detailInfoText(newValue: string) {
        this.__detailInfoText.set(newValue);
    }
    private __codeText: ObservedPropertySimple<string>;
    get codeText() {
        return this.__codeText.get();
    }
    set codeText(newValue: string) {
        this.__codeText.set(newValue);
    }
    private __isShowCloseImg_name: ObservedPropertySimple<boolean>;
    get isShowCloseImg_name() {
        return this.__isShowCloseImg_name.get();
    }
    set isShowCloseImg_name(newValue: boolean) {
        this.__isShowCloseImg_name.set(newValue);
    }
    private __isShowCloseImg_phone: ObservedPropertySimple<boolean>;
    get isShowCloseImg_phone() {
        return this.__isShowCloseImg_phone.get();
    }
    set isShowCloseImg_phone(newValue: boolean) {
        this.__isShowCloseImg_phone.set(newValue);
    }
    private __isShowCloseImg_detailInfo: ObservedPropertySimple<boolean>;
    get isShowCloseImg_detailInfo() {
        return this.__isShowCloseImg_detailInfo.get();
    }
    set isShowCloseImg_detailInfo(newValue: boolean) {
        this.__isShowCloseImg_detailInfo.set(newValue);
    }
    private __isShowCloseImg_code: ObservedPropertySimple<boolean>;
    get isShowCloseImg_code() {
        return this.__isShowCloseImg_code.get();
    }
    set isShowCloseImg_code(newValue: boolean) {
        this.__isShowCloseImg_code.set(newValue);
    }
    private defaultPlaceholderColor: string;
    private warnPlaceholderColor: string;
    private blackFontColor: string;
    private __phoneNumberFontColor: ObservedPropertySimple<string>;
    get phoneNumberFontColor() {
        return this.__phoneNumberFontColor.get();
    }
    set phoneNumberFontColor(newValue: string) {
        this.__phoneNumberFontColor.set(newValue);
    }
    private __nameFontColor: ObservedPropertySimple<string>;
    get nameFontColor() {
        return this.__nameFontColor.get();
    }
    set nameFontColor(newValue: string) {
        this.__nameFontColor.set(newValue);
    }
    private __phoneFontColor: ObservedPropertySimple<string>;
    get phoneFontColor() {
        return this.__phoneFontColor.get();
    }
    set phoneFontColor(newValue: string) {
        this.__phoneFontColor.set(newValue);
    }
    private __detailInfoFontColor: ObservedPropertySimple<string>;
    get detailInfoFontColor() {
        return this.__detailInfoFontColor.get();
    }
    set detailInfoFontColor(newValue: string) {
        this.__detailInfoFontColor.set(newValue);
    }
    //处理点击确定事件
    handleResult() {
        let arr = [];
        arr = this.result.split("/");
        if (arr.includes("请选择") || arr.includes("")) {
            this.showTips("请选择地区");
            console.log("error");
        }
        else {
            this.showResult = this.result;
            console.log("success");
            this.closeAreaSelect();
        }
    }
    //关闭地区选择面板
    closeAreaSelect() {
        setTimeout(() => {
            this.showAreaSelect = false;
        }, 350);
        this.maskOpacity = 0;
        this.areaSelectHeight = "0%";
    }
    //展示提示弹窗
    showTips(message: string) {
        promptAction.showToast({
            message: message,
            duration: 1000,
            bottom: 400
        });
    }
    //验证手机号是否正确
    isRightPhone(phone: string): boolean {
        if (phone == "" || phone.length > 11) {
            return false;
        }
        let reg = /^1[3|4|5|7|8][0-9]{9}/;
        if (reg.test(phone)) {
            return true; //手机号码正确
        }
        return false;
    }
    aboutToAppear() {
        console.log("test+" + this.isRightPhone("1807040668"));
    }
    render() {
        Stack.create();
        Column.create();
        Column.width("100%");
        Column.create();
        Column.layoutWeight(5);
        Column.backgroundColor("#ffffffff");
        Column.borderWidth(0.5);
        Column.borderColor("#ffbebebe");
        Row.create();
        Row.width("100%");
        Row.layoutWeight(1);
        Column.create();
        Column.layoutWeight(3);
        Text.create("姓名");
        Text.alignSelf(ItemAlign.Start);
        Text.margin(10);
        Text.pop();
        Column.pop();
        Column.create();
        Column.layoutWeight(7);
        Row.create();
        TextInput.create({ text: this.nameText, placeholder: "收货人姓名" });
        TextInput.placeholderColor(this.nameFontColor);
        TextInput.alignSelf(ItemAlign.Start);
        TextInput.margin({ right: 10 });
        TextInput.backgroundColor("#ffffffff");
        TextInput.width("88%");
        TextInput.onChange((value: string) => {
            this.nameText = value;
        });
        TextInput.onEditChange((isEditing: boolean) => {
            this.nameFontColor = this.defaultPlaceholderColor;
            if (isEditing && this.nameText != "") {
                this.isShowCloseImg_name = true;
            }
            else {
                this.isShowCloseImg_name = false;
            }
        });
        Image.create({ "id": 0, "type": 30000, params: ["AddressEdit_close.png"] });
        Image.width(18);
        Image.height(18);
        Image.visibility(this.isShowCloseImg_name ? Visibility.Visible : Visibility.Hidden);
        Image.onClick(() => {
            this.nameText = "";
            this.isShowCloseImg_name = false;
        });
        Row.pop();
        Column.pop();
        Row.pop();
        Divider.create();
        Divider.width("98%");
        Divider.height(1);
        Divider.alignSelf(ItemAlign.End);
        Row.create();
        Row.width("100%");
        Row.layoutWeight(1);
        Column.create();
        Column.layoutWeight(3);
        Text.create("电话");
        Text.alignSelf(ItemAlign.Start);
        Text.margin(10);
        Text.pop();
        Column.pop();
        Column.create();
        Column.layoutWeight(7);
        Row.create();
        TextInput.create({ text: this.phoneText, placeholder: "收货人手机号" });
        TextInput.backgroundColor("#ffffffff");
        TextInput.placeholderColor(this.phoneFontColor);
        TextInput.fontColor(this.phoneNumberFontColor);
        TextInput.alignSelf(ItemAlign.Start);
        TextInput.margin({ right: 10 });
        TextInput.width("88%");
        TextInput.onChange((value: string) => {
            this.phoneText = value;
        });
        TextInput.onEditChange((isEditing: boolean) => {
            this.phoneFontColor = this.defaultPlaceholderColor;
            this.phoneNumberFontColor = this.blackFontColor;
            if (isEditing && this.phoneText != "") {
                this.isShowCloseImg_phone = true;
            }
            else {
                this.isShowCloseImg_phone = false;
            }
        });
        Image.create({ "id": 0, "type": 30000, params: ["AddressEdit_close.png"] });
        Image.width(18);
        Image.height(18);
        Image.visibility(this.isShowCloseImg_phone ? Visibility.Visible : Visibility.Hidden);
        Image.onClick(() => {
            this.phoneText = "";
            this.isShowCloseImg_phone = false;
        });
        Row.pop();
        Column.pop();
        Row.pop();
        Divider.create();
        Divider.width("98%");
        Divider.height(1);
        Divider.alignSelf(ItemAlign.End);
        Row.create();
        Row.width("100%");
        Row.layoutWeight(1);
        Column.create();
        Column.layoutWeight(3);
        Text.create("地区");
        Text.alignSelf(ItemAlign.Start);
        Text.margin(10);
        Text.pop();
        Column.pop();
        Column.create();
        Column.layoutWeight(7);
        Text.create(this.showResult);
        Text.fontColor(this.showResult == "选择省/市/区" ? "#ff84888b" : Color.Black);
        Text.margin({ left: 15 });
        Text.alignSelf(ItemAlign.Start);
        Text.onClick(() => {
            this.showAreaSelect = true;
            this.areaSelectHeight = "100%";
            this.maskOpacity = 0.6;
        });
        Text.pop();
        Column.pop();
        Row.pop();
        Divider.create();
        Divider.width("98%");
        Divider.height(1);
        Divider.alignSelf(ItemAlign.End);
        Row.create();
        Row.width("100%");
        Row.layoutWeight(1);
        Column.create();
        Column.layoutWeight(3);
        Text.create("详细地址");
        Text.alignSelf(ItemAlign.Start);
        Text.margin(10);
        Text.pop();
        Column.pop();
        Column.create();
        Column.layoutWeight(7);
        Row.create();
        TextInput.create({ text: this.detailInfoText, placeholder: "街道门牌、楼层房间号等信息" });
        TextInput.placeholderColor(this.detailInfoFontColor);
        TextInput.backgroundColor("#ffffffff");
        TextInput.alignSelf(ItemAlign.Start);
        TextInput.margin({ right: 10 });
        TextInput.width("88%");
        TextInput.onChange((value: string) => {
            this.detailInfoText = value;
        });
        TextInput.onEditChange((isEditing: boolean) => {
            this.detailInfoFontColor = this.defaultPlaceholderColor;
            if (isEditing && this.detailInfoText != "") {
                this.isShowCloseImg_detailInfo = true;
            }
            else {
                this.isShowCloseImg_detailInfo = false;
            }
        });
        Image.create({ "id": 0, "type": 30000, params: ["AddressEdit_close.png"] });
        Image.width(18);
        Image.height(18);
        Image.visibility(this.isShowCloseImg_detailInfo ? Visibility.Visible : Visibility.Hidden);
        Image.onClick(() => {
            this.detailInfoText = "";
            this.isShowCloseImg_detailInfo = false;
        });
        Row.pop();
        Column.pop();
        Row.pop();
        Divider.create();
        Divider.width("98%");
        Divider.height(1);
        Divider.alignSelf(ItemAlign.End);
        Row.create();
        Row.width("100%");
        Row.layoutWeight(1);
        Column.create();
        Column.layoutWeight(3);
        Text.create("邮政编码");
        Text.alignSelf(ItemAlign.Start);
        Text.margin(10);
        Text.pop();
        Column.pop();
        Column.create();
        Column.layoutWeight(7);
        Row.create();
        TextInput.create({ text: this.codeText, placeholder: "邮政编码" });
        TextInput.backgroundColor("#ffffffff");
        TextInput.alignSelf(ItemAlign.Start);
        TextInput.margin({ right: 10 });
        TextInput.width("88%");
        TextInput.onChange((value: string) => {
            this.codeText = value;
        });
        TextInput.onEditChange((isEditing: boolean) => {
            if (isEditing && this.codeText != "") {
                this.isShowCloseImg_code = true;
            }
            else {
                this.isShowCloseImg_code = false;
            }
        });
        Image.create({ "id": 0, "type": 30000, params: ["AddressEdit_close.png"] });
        Image.width(18);
        Image.height(18);
        Image.visibility(this.isShowCloseImg_code ? Visibility.Visible : Visibility.Hidden);
        Image.onClick(() => {
            this.codeText = "";
            this.isShowCloseImg_code = false;
        });
        Row.pop();
        Column.pop();
        Row.pop();
        Divider.create();
        Divider.width("98%");
        Divider.height(1);
        Divider.alignSelf(ItemAlign.End);
        Row.create();
        Row.width("100%");
        Row.layoutWeight(1);
        Flex.create({ justifyContent: FlexAlign.SpaceBetween });
        Row.create();
        Row.height("100%");
        Text.create("设为默认收获地址");
        Text.margin(10);
        Text.pop();
        Row.pop();
        Row.create();
        Row.height("100%");
        Toggle.create({ type: ToggleType.Switch, isOn: false });
        Toggle.margin(10);
        Toggle.width(100);
        Toggle.height("50%");
        Toggle.pop();
        Row.pop();
        Flex.pop();
        Row.pop();
        Column.pop();
        //保存 删除
        Row.create();
        //保存 删除
        Row.layoutWeight(2);
        //保存 删除
        Row.margin({ top: 40 });
        Flex.create({
            direction: FlexDirection.Column,
            justifyContent: FlexAlign.SpaceAround,
            alignItems: ItemAlign.Center
        });
        Flex.width("100%");
        Row.create();
        Row.layoutWeight(1);
        Button.createWithLabel("保存");
        Button.type(ButtonType.Normal);
        Button.backgroundColor("#ffff0000");
        Button.borderWidth(1);
        Button.borderColor("#ffff0000");
        Button.width("90%");
        Button.onClick(() => {
            if (this.nameText == "") {
                this.nameFontColor = this.warnPlaceholderColor;
                this.showTips("请填写姓名");
            }
            else if (!this.isRightPhone(this.phoneText)) {
                this.phoneFontColor = this.warnPlaceholderColor;
                this.showTips("请填写正确的手机号");
                this.phoneNumberFontColor = this.warnPlaceholderColor;
            }
            else if (this.showResult == "选择省/市/区") {
                this.showTips("请选择地区");
                console.log(this.showResult);
            }
            else if (this.detailInfoText == "") {
                this.showTips("请填写详细地址");
                this.detailInfoFontColor = this.warnPlaceholderColor;
            }
            else {
                this.showTips("保存");
            }
        });
        Button.pop();
        Row.pop();
        Row.create();
        Row.layoutWeight(1);
        Button.createWithLabel("删除");
        Button.fontColor("#ff000000");
        Button.borderWidth(1);
        Button.borderColor("#ffbebebe");
        Button.type(ButtonType.Normal);
        Button.backgroundColor("#ffffffff");
        Button.width("90%");
        Button.alignSelf(ItemAlign.Center);
        Button.onClick(() => {
            AlertDialog.show({
                message: '\n确定要删除么\n',
                primaryButton: {
                    value: '取消',
                    action: () => {
                        console.info('Callback when the first button is clicked');
                    },
                    fontColor: Color.Black
                },
                secondaryButton: {
                    value: '确定',
                    action: () => {
                        console.info('Callback when the second button is clicked');
                    }
                },
                cancel: () => {
                    console.info('Closed callbacks');
                }
            });
        });
        Button.pop();
        Row.pop();
        Flex.pop();
        //保存 删除
        Row.pop();
        //底部空余
        Row.create();
        //底部空余
        Row.layoutWeight(3);
        //底部空余
        Row.pop();
        Column.pop();
        //展示弹出框
        Row.create();
        Context.animation({
            duration: 300
        });
        //展示弹出框
        Row.width("100%");
        //展示弹出框
        Row.height("100%");
        //展示弹出框
        Row.backgroundColor("#ff000000");
        //展示弹出框
        Row.opacity(this.maskOpacity);
        Context.animation(null);
        //展示弹出框
        Row.visibility(this.showAreaSelect ? Visibility.Visible : Visibility.Hidden);
        //展示弹出框
        Row.pop();
        Column.create();
        Column.height("100%");
        Column.visibility(this.showAreaSelect ? Visibility.Visible : Visibility.Hidden);
        Row.create();
        Row.width("100%");
        Row.height("55%");
        Row.opacity(0);
        Row.onClick(() => {
            setTimeout(() => {
                this.showAreaSelect = false;
            }, 350);
            this.maskOpacity = 0;
            this.areaSelectHeight = "0%";
        });
        Row.pop();
        Row.create();
        Row.height("45%");
        __Common__.create();
        __Common__.alignSelf(ItemAlign.End);
        let earlierCreatedChild_2: Area_placeholder = (this && this.findChildById) ? this.findChildById("2") as Area_placeholder : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new Area_placeholder("2", this, {
                result: this.__result,
                title: "",
                areaSelectHeight: this.__areaSelectHeight,
                showAreaSelect: this.__showAreaSelect,
                cancel: this.__cancel,
                confirm: this.__confirm
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                title: ""
            });
            View.create(earlierCreatedChild_2);
        }
        __Common__.pop();
        Row.pop();
        Column.pop();
        Stack.pop();
    }
}
class Area_placeholder extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__result = new SynchedPropertySimpleTwoWay(params.result, this, "result");
        this.__provinces = new ObservedPropertyObject([], this, "provinces");
        this.__cities = new ObservedPropertyObject([], this, "cities");
        this.__district = new ObservedPropertyObject([], this, "district");
        this.__selectedProvince = new ObservedPropertySimple(0, this, "selectedProvince");
        this.__selectedCity = new ObservedPropertySimple(0, this, "selectedCity");
        this.__selectedDistrict = new ObservedPropertySimple(0, this, "selectedDistrict");
        this.title = "标题";
        this.dataInfo = new ObtainInfo();
        this.__areaSelectHeight = new SynchedPropertySimpleTwoWay(params.areaSelectHeight, this, "areaSelectHeight");
        this.__showAreaSelect = new SynchedPropertySimpleTwoWay(params.showAreaSelect, this, "showAreaSelect");
        this.__cancel = new SynchedPropertySimpleTwoWay(params.cancel, this, "cancel");
        this.__confirm = new SynchedPropertySimpleTwoWay(params.confirm, this, "confirm");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Area_placeholder_Params) {
        if (params.provinces !== undefined) {
            this.provinces = params.provinces;
        }
        if (params.cities !== undefined) {
            this.cities = params.cities;
        }
        if (params.district !== undefined) {
            this.district = params.district;
        }
        if (params.selectedProvince !== undefined) {
            this.selectedProvince = params.selectedProvince;
        }
        if (params.selectedCity !== undefined) {
            this.selectedCity = params.selectedCity;
        }
        if (params.selectedDistrict !== undefined) {
            this.selectedDistrict = params.selectedDistrict;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.dataInfo !== undefined) {
            this.dataInfo = params.dataInfo;
        }
    }
    aboutToBeDeleted() {
        this.__result.aboutToBeDeleted();
        this.__provinces.aboutToBeDeleted();
        this.__cities.aboutToBeDeleted();
        this.__district.aboutToBeDeleted();
        this.__selectedProvince.aboutToBeDeleted();
        this.__selectedCity.aboutToBeDeleted();
        this.__selectedDistrict.aboutToBeDeleted();
        this.__areaSelectHeight.aboutToBeDeleted();
        this.__showAreaSelect.aboutToBeDeleted();
        this.__cancel.aboutToBeDeleted();
        this.__confirm.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __result: SynchedPropertySimpleTwoWay<string>;
    get result() {
        return this.__result.get();
    }
    set result(newValue: string) {
        this.__result.set(newValue);
    }
    private __provinces: ObservedPropertyObject<string[]>;
    get provinces() {
        return this.__provinces.get();
    }
    set provinces(newValue: string[]) {
        this.__provinces.set(newValue);
    }
    private __cities: ObservedPropertyObject<string[]>;
    get cities() {
        return this.__cities.get();
    }
    set cities(newValue: string[]) {
        this.__cities.set(newValue);
    }
    private __district: ObservedPropertyObject<string[]>;
    get district() {
        return this.__district.get();
    }
    set district(newValue: string[]) {
        this.__district.set(newValue);
    }
    private __selectedProvince: ObservedPropertySimple<number>;
    get selectedProvince() {
        return this.__selectedProvince.get();
    }
    set selectedProvince(newValue: number) {
        this.__selectedProvince.set(newValue);
    }
    private __selectedCity: ObservedPropertySimple<number>;
    get selectedCity() {
        return this.__selectedCity.get();
    }
    set selectedCity(newValue: number) {
        this.__selectedCity.set(newValue);
    }
    private __selectedDistrict: ObservedPropertySimple<number>;
    get selectedDistrict() {
        return this.__selectedDistrict.get();
    }
    set selectedDistrict(newValue: number) {
        this.__selectedDistrict.set(newValue);
    }
    private title: string;
    private dataInfo;
    private __areaSelectHeight: SynchedPropertySimpleTwoWay<string>;
    get areaSelectHeight() {
        return this.__areaSelectHeight.get();
    }
    set areaSelectHeight(newValue: string) {
        this.__areaSelectHeight.set(newValue);
    }
    private __showAreaSelect: SynchedPropertySimpleTwoWay<boolean>;
    get showAreaSelect() {
        return this.__showAreaSelect.get();
    }
    set showAreaSelect(newValue: boolean) {
        this.__showAreaSelect.set(newValue);
    }
    private __cancel: SynchedPropertySimpleTwoWay<boolean>;
    get cancel() {
        return this.__cancel.get();
    }
    set cancel(newValue: boolean) {
        this.__cancel.set(newValue);
    }
    private __confirm: SynchedPropertySimpleTwoWay<boolean>;
    get confirm() {
        return this.__confirm.get();
    }
    set confirm(newValue: boolean) {
        this.__confirm.set(newValue);
    }
    aboutToAppear() {
        this.provinces = this.dataInfo.allProvince();
        this.provinces.splice(0, 0, "请选择");
    }
    provinceChange(index: number) {
        this.selectedProvince = index;
        this.selectedCity = 0;
        this.selectedDistrict = 0;
        this.district = [""];
        if (this.selectedProvince != 0) {
            this.cities = this.dataInfo.allCity(this.provinces[index]);
            this.cities.splice(0, 0, "请选择");
        }
        else {
            this.selectedCity = 0;
            this.cities = [""];
        }
    }
    cityChange(index: number) {
        this.selectedCity = index;
        this.selectedDistrict = 0;
        if (this.selectedCity != 0) {
            this.district = this.dataInfo.allDistrict(this.provinces[this.selectedProvince], this.cities[index]);
            this.district.splice(0, 0, "请选择");
        }
        else {
            this.selectedDistrict = 0;
            this.district = [""];
        }
    }
    districtChange(index: number) {
        this.selectedDistrict = index;
    }
    render() {
        Column.create();
        Context.animation({
            duration: 300
        });
        Column.backgroundColor("#ffffffff");
        Column.height(this.areaSelectHeight);
        Context.animation(null);
        Row.create();
        Row.margin({ top: 10 });
        Row.width("100%");
        Button.createWithLabel("取消");
        Button.margin({ left: 10 });
        Button.fontColor("#ff2181e9");
        Button.fontSize(16);
        Button.type(ButtonType.Normal);
        Button.borderRadius(20);
        Button.backgroundColor("#ffffffff");
        Button.layoutWeight(2);
        Button.onClick(() => {
            this.cancel = !this.cancel;
        });
        Button.pop();
        Column.create();
        Column.height(20);
        Column.layoutWeight(5);
        Text.create(this.title);
        Text.fontSize(16);
        Text.pop();
        Column.pop();
        Button.createWithLabel("确认");
        Button.margin({ right: 10 });
        Button.fontColor("#ff2181e9");
        Button.fontSize(16);
        Button.type(ButtonType.Normal);
        Button.borderRadius(20);
        Button.backgroundColor("#ffffffff");
        Button.layoutWeight(2);
        Button.onClick(() => {
            this.result = this.provinces[this.selectedProvince] + "/" + this.cities[this.selectedCity] + "/" + this.district[this.selectedDistrict];
            this.confirm = !this.confirm;
        });
        Button.pop();
        Row.pop();
        Row.create();
        Row.width("100%");
        Row.height(300);
        TextPicker.create({ range: this.provinces, selected: this.selectedProvince });
        TextPicker.onChange((value: string, index: number) => {
            this.provinceChange(index);
        });
        TextPicker.margin({ left: 10 });
        TextPicker.layoutWeight(1);
        TextPicker.pop();
        TextPicker.create({ range: this.cities, selected: this.selectedCity });
        TextPicker.onChange((value: string, index: number) => {
            this.cityChange(index);
        });
        TextPicker.layoutWeight(1);
        TextPicker.pop();
        TextPicker.create({ range: this.district, selected: this.selectedDistrict });
        TextPicker.onChange((value: string, index: number) => {
            this.districtChange(index);
        });
        TextPicker.layoutWeight(1);
        TextPicker.margin({ right: 10 });
        TextPicker.pop();
        Row.pop();
        Column.pop();
    }
}
import { areaInfo } from "../data/Data";
import promptAction from '@ohos.promptAction';
//获取省份，城市，区域信息
class ObtainInfo {
    private provinces: string[] = [];
    private cities: string[] = [];
    private district: string[] = [];
    allProvince(): string[] {
        this.provinces = [];
        areaInfo.forEach(element => {
            this.provinces.push(element.label);
        });
        return this.provinces;
    }
    allCity(provinceName = "北京市"): string[] {
        this.cities = [];
        areaInfo.forEach(element => {
            if (element.label == provinceName) {
                let cityForProvince = element.children;
                cityForProvince.forEach(element => {
                    this.cities.push(element.label);
                });
            }
        });
        return this.cities;
    }
    allDistrict(provinceName = "北京市", cityName = "北京市"): string[] {
        this.district = [];
        areaInfo.forEach(element => {
            if (element.label == provinceName) {
                let cityForProvince = element.children;
                cityForProvince.forEach(element => {
                    if (element.label == cityName) {
                        let districtForCity = element.children;
                        districtForCity.forEach(element => {
                            this.district.push(element.label);
                        });
                    }
                });
            }
        });
        return this.district;
    }
    InitSelectPDC(provinces: string[], cities: string[], districts: string[], province, city, district): number[] {
        let P = 0;
        let C = 0;
        let D = 0;
        for (let i = 0; i < provinces.length; i++) {
            if (provinces[i] == province) {
                P = i;
                for (let j = 0; j < cities.length; j++) {
                    if (cities[j] == city) {
                        C = j;
                        for (let k = 0; k < districts.length; k++) {
                            if (districts[k] == district) {
                                D = k;
                                break;
                            }
                        }
                    }
                }
            }
        }
        return [P, C, D];
    }
}
