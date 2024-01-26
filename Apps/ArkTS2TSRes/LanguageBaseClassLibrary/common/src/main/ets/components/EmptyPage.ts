interface EmptyPage_Params {
    img?: string | PixelMap | Resource;
    message?: ResourceStr;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "EmptyPage_" + ++__generate__Id;
}
export class EmptyPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.img = $r('app.media.bg_empty_page');
        this.message = $r('app.string.tv_no_data');
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: EmptyPage_Params) {
        if (params.img !== undefined) {
            this.img = params.img;
        }
        if (params.message !== undefined) {
            this.message = params.message;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private img: string | PixelMap | Resource;
    private message: ResourceStr;
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.justifyContent(FlexAlign.Center);
        Column.alignItems(HorizontalAlign.Center);
        Image.create(this.img);
        Image.width(120);
        Image.aspectRatio(1);
        Text.create(this.message);
        Text.fontSize(14);
        Text.fontColor($r('app.color.text_color_second'));
        Text.margin({ top: 8 });
        Text.pop();
        Column.pop();
    }
}
