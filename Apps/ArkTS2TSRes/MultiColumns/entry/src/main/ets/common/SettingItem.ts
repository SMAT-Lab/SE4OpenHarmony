interface SubItem_Params {
    itemDesc?: Resource;
    src?: Resource;
    isShowButton?: boolean;
    isShowRightArrow?: boolean;
    itemStatusDesc?: Resource;
    content?: Resource;
    isLinkAddress?: boolean;
}
interface MainItem_Params {
    itemDesc?: Resource;
    src?: Resource;
    isUserItem?: boolean;
    itemStatusDesc?: Resource;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SettingItem_" + ++__generate__Id;
}
export class MainItem extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.itemDesc = $r("app.string.nonSense");
        this.src = $r("app.media.icon");
        this.isUserItem = false;
        this.itemStatusDesc = $r("app.string.nonSense");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MainItem_Params) {
        if (params.itemDesc !== undefined) {
            this.itemDesc = params.itemDesc;
        }
        if (params.src !== undefined) {
            this.src = params.src;
        }
        if (params.isUserItem !== undefined) {
            this.isUserItem = params.isUserItem;
        }
        if (params.itemStatusDesc !== undefined) {
            this.itemStatusDesc = params.itemStatusDesc;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private itemDesc: Resource;
    private src: Resource;
    private isUserItem: boolean;
    private itemStatusDesc: Resource;
    render() {
        Row.create();
        Row.padding({ left: 12, right: 12 });
        Row.height(56);
        Row.borderRadius(20);
        Row.width('100%');
        Image.create(this.src);
        Image.width(32);
        Image.aspectRatio(1);
        If.create();
        if (this.isUserItem) {
            If.branchId(0);
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({ left: 12 });
            Column.flexShrink(1);
            Text.create($r('app.string.userInfo'));
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.pop();
            Text.create($r('app.string.aboutUserInfo'));
            Text.fontSize(14);
            Text.fontWeight(FontWeight.Regular);
            Text.opacity(0.6);
            Text.maxLines(1);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.pop();
            Column.pop();
        }
        else {
            If.branchId(1);
            Text.create(this.itemDesc);
            Text.fontSize(16);
            Text.lineHeight(22);
            Text.fontWeight(FontWeight.Medium);
            Text.fontFamily('HarmonyHeiTi');
            Text.fontColor($r('sys.color.ohos_id_color_text_primary'));
            Text.align(Alignment.Start);
            Text.margin({ left: 16 });
            Text.pop();
        }
        If.pop();
        Blank.create();
        Blank.pop();
        If.create();
        if (this.itemStatusDesc) {
            If.branchId(0);
            Text.create(this.itemStatusDesc);
            Text.fontWeight(FontWeight.Regular);
            Text.fontSize(14);
            Text.pop();
        }
        If.pop();
        Image.create($r('app.media.ic_settings_arrow'));
        Image.width(12);
        Image.height(24);
        Image.fillColor($r('sys.color.ohos_id_color_fourth'));
        Image.margin({ left: 4 });
        Row.pop();
    }
}
export class SubItem extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.itemDesc = $r("app.string.nonSense");
        this.src = $r("app.media.icon");
        this.isShowButton = false;
        this.isShowRightArrow = false;
        this.itemStatusDesc = $r("app.string.nonSense");
        this.content = $r("app.string.nonSense");
        this.isLinkAddress = false;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SubItem_Params) {
        if (params.itemDesc !== undefined) {
            this.itemDesc = params.itemDesc;
        }
        if (params.src !== undefined) {
            this.src = params.src;
        }
        if (params.isShowButton !== undefined) {
            this.isShowButton = params.isShowButton;
        }
        if (params.isShowRightArrow !== undefined) {
            this.isShowRightArrow = params.isShowRightArrow;
        }
        if (params.itemStatusDesc !== undefined) {
            this.itemStatusDesc = params.itemStatusDesc;
        }
        if (params.content !== undefined) {
            this.content = params.content;
        }
        if (params.isLinkAddress !== undefined) {
            this.isLinkAddress = params.isLinkAddress;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private itemDesc: Resource;
    private src: Resource;
    private isShowButton: boolean;
    private isShowRightArrow: boolean;
    private itemStatusDesc: Resource;
    private content: Resource;
    private isLinkAddress: boolean;
    render() {
        Row.create();
        Row.height(56);
        Row.borderRadius(20);
        Row.width('100%');
        Row.padding({ left: 12, right: 12 });
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Text.create(this.itemDesc);
        Text.fontSize(16);
        Text.lineHeight(22);
        Text.fontWeight(FontWeight.Medium);
        Text.fontFamily('HarmonyHeiTi');
        Text.fontColor(this.isLinkAddress ? '#254ff7' : $r('sys.color.ohos_id_color_text_primary'));
        Text.align(Alignment.Start);
        Text.pop();
        If.create();
        if (this.content) {
            If.branchId(0);
            Text.create(this.content);
            Text.fontWeight(FontWeight.Regular);
            Text.fontSize(14);
            Text.fontColor('#99000000');
            Text.margin({ top: 1.5 });
            Text.pop();
        }
        If.pop();
        Column.pop();
        Blank.create();
        Blank.pop();
        If.create();
        if (this.isShowButton) {
            If.branchId(0);
            Toggle.create({ type: ToggleType.Switch, isOn: true });
            Toggle.id('ToggleSwitch');
            Toggle.width(36);
            Toggle.height(20);
            Toggle.selectedColor('#007DFF');
            Toggle.pop();
        }
        else if (this.isShowRightArrow) {
            If.branchId(1);
            If.create();
            if (this.itemStatusDesc) {
                If.branchId(0);
                Text.create(this.itemStatusDesc);
                Text.fontWeight(FontWeight.Regular);
                Text.fontSize(14);
                Text.pop();
            }
            If.pop();
            Image.create($r('app.media.ic_settings_arrow'));
            Image.width(12);
            Image.height(24);
            Image.fillColor($r('sys.color.ohos_id_color_fourth'));
            Image.margin({ left: 4
            });
        }
        else {
            If.branchId(2);
            Image.create(this.src);
            Image.width(24);
            Image.height(24);
            Image.fillColor($r('sys.color.ohos_id_color_primary'));
        }
        If.pop();
        Row.pop();
    }
}
