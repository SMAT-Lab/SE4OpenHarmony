interface SettingRow_Params {
    icon?: string | PixelMap | Resource;
    title?: string;
    info?: string | Resource;
    clickHandler?: (event?: ClickEvent) => void;
    showRightArrow?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Settings_" + ++__generate__Id;
}
export class SettingRow extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.icon = undefined;
        this.title = undefined;
        this.info = undefined;
        this.clickHandler = undefined;
        this.showRightArrow = true;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SettingRow_Params) {
        if (params.icon !== undefined) {
            this.icon = params.icon;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.info !== undefined) {
            this.info = params.info;
        }
        if (params.clickHandler !== undefined) {
            this.clickHandler = params.clickHandler;
        }
        if (params.showRightArrow !== undefined) {
            this.showRightArrow = params.showRightArrow;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private icon?: string | PixelMap | Resource;
    private title: string;
    private info?: string | Resource;
    private clickHandler?: (event?: ClickEvent) => void;
    private showRightArrow?: boolean;
    render() {
        Row.create();
        Row.width('100%');
        Row.height(48);
        Row.onClick(this.clickHandler);
        Row.margin({ top: 5, bottom: 5 });
        Image.create(this.icon);
        Image.width(26);
        Image.height(26);
        Image.borderRadius(13);
        Image.margin({ left: 14 });
        Column.create();
        Column.margin({ left: 14 });
        Column.alignItems(HorizontalAlign.Center);
        Text.create(this.title);
        Text.fontSize(16);
        Text.fontColor('#FF182431');
        Text.alignSelf(ItemAlign.Start);
        Text.pop();
        Text.create(this.info);
        Text.fontSize(12);
        Text.fontColor('#99182431');
        Text.maxLines(1);
        Text.alignSelf(ItemAlign.Start);
        Text.margin({ top: 4 });
        Text.pop();
        Column.pop();
        Blank.create();
        Blank.pop();
        If.create();
        // Text('RightInfo').fontSize(12).fontColor('#99182431').margin({ right: 4 })
        if (this.showRightArrow) {
            If.branchId(0);
            Image.create($r('app.media.ic_right_arrow'));
            Image.width(12);
            Image.height(24);
            Image.objectFit(ImageFit.Contain);
            Image.margin({ right: 14 });
        }
        If.pop();
        Row.pop();
    }
}
