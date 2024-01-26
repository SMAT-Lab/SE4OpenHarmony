interface DeleteView_Params {
    enable?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "DeleteView_" + ++__generate__Id;
}
export class DeleteView extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.enable = false;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: DeleteView_Params) {
        if (params.enable !== undefined) {
            this.enable = params.enable;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private enable: boolean;
    render() {
        Row.create();
        Row.width(40);
        Row.aspectRatio(1);
        Row.borderRadius(20);
        Row.justifyContent(FlexAlign.Center);
        Row.alignItems(VerticalAlign.Center);
        Row.backgroundColor($r('app.color.bg_btn_red'));
        Row.opacity(this.enable ? 1.0 : 0.25);
        Image.create($r('app.media.ic_delete_plane'));
        Image.width(24);
        Image.aspectRatio(1);
        Row.pop();
    }
}
