interface Player_Params {
    IMAGE_WIDTH?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Player_" + ++__generate__Id;
}
export class Player extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.IMAGE_WIDTH = 20;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Player_Params) {
        if (params.IMAGE_WIDTH !== undefined) {
            this.IMAGE_WIDTH = params.IMAGE_WIDTH;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private IMAGE_WIDTH: number;
    render() {
        Row.create({ space: 10 });
        Row.width('100%');
        Row.backgroundColor('#ffe4e4e6');
        Row.borderRadius(10);
        Row.padding(10);
        Image.create($r('app.media.ic_album'));
        Image.width(30);
        Image.height(30);
        Image.aspectRatio(1);
        Image.objectFit(ImageFit.Contain);
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Text.create('不知道');
        Text.fontSize(12);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Row.create();
        Image.create($r('app.media.app_icon'));
        Image.width(10);
        Image.height(10);
        Image.objectFit(ImageFit.Contain);
        Text.create('小小树人');
        Text.fontSize(10);
        Text.pop();
        Row.pop();
        Column.pop();
        Blank.create();
        Blank.pop();
        Row.create({ space: 10 });
        Row.justifyContent(FlexAlign.End);
        Image.create($r('app.media.ic_public_favor'));
        Image.width(this.IMAGE_WIDTH);
        Image.aspectRatio(1);
        Image.create($r('app.media.ic_play_last'));
        Image.width(this.IMAGE_WIDTH);
        Image.aspectRatio(1);
        Image.create($r('app.media.ic_public_play'));
        Image.width(this.IMAGE_WIDTH);
        Image.aspectRatio(1);
        Image.create($r('app.media.ic_play_next'));
        Image.width(this.IMAGE_WIDTH);
        Image.aspectRatio(1);
        Image.create($r('app.media.ic_play_view'));
        Image.width(this.IMAGE_WIDTH);
        Image.aspectRatio(1);
        Row.pop();
        Row.pop();
    }
}
