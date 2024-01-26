interface ItemGroup_Params {
    noParam?: () => void;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ItemGroup_" + ++__generate__Id;
}
export class ItemGroup extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.noParam = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ItemGroup_Params) {
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
        Column.borderRadius(20);
        Column.backgroundColor($r('sys.color.ohos_id_color_foreground_contrary'));
        Column.margin({ bottom: 12 });
        this.noParam(this);
        Column.pop();
    }
}
