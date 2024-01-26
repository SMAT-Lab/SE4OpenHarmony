interface ViewCodeText_Params {
    sideBarShow?: boolean;
    webSrc?: Resource;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ViewCodeText_" + ++__generate__Id;
}
export class ViewCodeText extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__sideBarShow = AppStorage.SetAndLink('sideBarShow', false, this, "sideBarShow");
        this.webSrc = { "id": 0, "type": 30000, params: ['BaseTypeCode.ets.html'] };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ViewCodeText_Params) {
        if (params.webSrc !== undefined) {
            this.webSrc = params.webSrc;
        }
    }
    aboutToBeDeleted() {
        this.__sideBarShow.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __sideBarShow: ObservedPropertyAbstract<boolean>;
    get sideBarShow() {
        return this.__sideBarShow.get();
    }
    set sideBarShow(newValue: boolean) {
        this.__sideBarShow.set(newValue);
    }
    private webSrc: Resource;
    render() {
        Column.create();
        Column.width('100%');
        Column.justifyContent(FlexAlign.End);
        Text.create($r('app.string.source_code'));
        Text.fontColor($r('app.color.source_code_font_color'));
        Text.fontSize($r('app.float.source_code_font_size'));
        Text.alignSelf(ItemAlign.End);
        Text.id('viewSourceCode');
        Text.onClick(() => {
            // 点击查看源码
            AppStorage.setOrCreate('sideBarShow', !this.sideBarShow);
            AppStorage.setOrCreate('webSrc', this.webSrc);
        });
        Text.pop();
        Column.pop();
    }
}
