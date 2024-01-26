interface AlbumCover_Params {
    currentBreakpoint?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "AlbumCover_" + ++__generate__Id;
}
import { BreakpointConstant } from '../../common/BreakpointConstant';
import { songOption } from '../content/SongOption';
import { PlayerList } from './PlayerList';
export class AlbumCover extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__currentBreakpoint = AppStorage.SetAndProp('currentBreakpoint', 'sm', this, "currentBreakpoint");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AlbumCover_Params) {
    }
    aboutToBeDeleted() {
        this.__currentBreakpoint.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __currentBreakpoint: ObservedPropertyAbstract<string>;
    get currentBreakpoint() {
        return this.__currentBreakpoint.get();
    }
    set currentBreakpoint(newValue: string) {
        this.__currentBreakpoint.set(newValue);
    }
    CoverImage(parent = null) {
        Row.create();
        Image.create($r('app.media.ic_album'));
        Image.objectFit(ImageFit.Contain);
        Image.aspectRatio(1);
        Row.pop();
    }
    CoverIntroduction(parent = null) {
        Column.create({ space: 20 });
        Column.width('100%');
        Column.alignItems(HorizontalAlign.Start);
        Column.padding({ left: 10 });
        Text.create('独立民谣');
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Text.create('歌单选取了一批比较受关注的民谣歌曲');
        Text.fontSize(14);
        Text.pop();
        Column.pop();
    }
    CoverOption(parent = null) {
        Row.create();
        Row.width('100%');
        Row.margin({ top: 20, bottom: 10 });
        Row.justifyContent(FlexAlign.SpaceEvenly);
        ForEach.create("2", this, ObservedObject.GetRawObject(songOption), (item) => {
            Column.create({ space: 10 });
            Column.height(45);
            Image.create(item.image);
            Image.width(30);
            Image.height(30);
            Image.objectFit(ImageFit.Fill);
            Text.create(item.txt);
            Text.fontSize(12);
            Text.pop();
            Column.pop();
        });
        ForEach.pop();
        Row.pop();
    }
    render() {
        Column.create();
        GridRow.create();
        GridRow.width('100%');
        GridRow.padding(10);
        GridCol.create({
            span: { sm: 4, md: 12, lg: 12 }
        });
        this.CoverImage(this);
        GridCol.pop();
        GridCol.create({
            span: { sm: 8, md: 12, lg: 12 }
        });
        this.CoverIntroduction(this);
        GridCol.pop();
        GridCol.create({
            span: { sm: 12, md: 12, lg: 12 }
        });
        this.CoverOption(this);
        GridCol.pop();
        GridRow.pop();
        Column.pop();
    }
}
