interface RadiusColumn_Params {
    noParam?: () => void;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "RadiusColumn_" + ++__generate__Id;
}
export class RadiusColumn extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.noParam = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: RadiusColumn_Params) {
        if (params.noParam !== undefined) {
            this.noParam = params.noParam;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private __noParam;
    render() {
        Column.create();
        Column.width('100%');
        Column.borderRadius(24);
        Column.backgroundColor($r('sys.color.ohos_id_color_foreground_contrary'));
        Column.padding({
            left: 12,
            right: 12,
            top: 6,
            bottom: 6
        });
        Column.margin({ top: 6, bottom: 6 });
        this.noParam(this);
        Column.pop();
    }
}
