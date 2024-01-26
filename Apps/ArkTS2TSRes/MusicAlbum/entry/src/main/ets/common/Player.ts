interface Player_Params {
    fontSize?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Player_" + ++__generate__Id;
}
export default class Player extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__fontSize = AppStorage.SetAndProp('fontSize', 0, this, "fontSize");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Player_Params) {
    }
    aboutToBeDeleted() {
        this.__fontSize.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __fontSize: ObservedPropertyAbstract<number>;
    get fontSize() {
        return this.__fontSize.get();
    }
    set fontSize(newValue: number) {
        this.__fontSize.set(newValue);
    }
    render() {
        Row.create();
        Row.width('100%');
        Row.height(48);
        Row.backgroundColor('#F6F9FC');
        Row.padding({ left: 16, right: 16 });
        Image.create($r('app.media.pic_music_cover'));
        Image.height(32);
        Image.width(32);
        Image.borderRadius(5);
        Image.margin({ right: 12 });
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Text.create($r('app.string.song_name'));
        Text.fontColor('#000000');
        Text.fontSize(this.fontSize - 1);
        Text.pop();
        Row.create();
        Image.create($r('app.media.ic_vip'));
        Image.height(16);
        Image.width(16);
        Image.margin({ right: 4 });
        Text.create($r('app.string.singer'));
        Text.fontColor('#000000');
        Text.fontSize(this.fontSize - 4);
        Text.opacity(0.38);
        Text.pop();
        Row.pop();
        Column.pop();
        Blank.create();
        Blank.pop();
        Image.create($r('app.media.icon_pause'));
        Image.height(26);
        Image.width(26);
        Image.margin({ right: 16 });
        Image.create($r('app.media.ic_next'));
        Image.height(24);
        Image.width(24);
        Image.margin({ right: 16 });
        Image.create($r('app.media.ic_Music_list'));
        Image.height(24);
        Image.width(24);
        Row.pop();
    }
}
