interface PlayerList_Params {
    currentBreakpoint?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "PlayerList_" + ++__generate__Id;
}
import { BreakpointConstant } from '../../common/BreakpointConstant';
import { SongDataSource, SongItem } from './SongDataSource';
import { songList } from './SongOption';
export class PlayerList extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__currentBreakpoint = AppStorage.SetAndProp('currentBreakpoint', 'sm', this, "currentBreakpoint");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: PlayerList_Params) {
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
    PlayAll(parent = null) {
        Row.create({ space: 10 });
        Row.width('100%');
        Image.create($r('app.media.ic_play'));
        Image.width(20);
        Image.height(20);
        Image.objectFit(ImageFit.Contain);
        Text.create('播放全部');
        Text.fontSize(14);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Blank.create();
        Blank.pop();
        Image.create($r('app.media.ic_list'));
        Image.width(20);
        Image.height(20);
        Image.objectFit(ImageFit.Contain);
        Image.create($r('app.media.ic_public_view'));
        Image.width(20);
        Image.height(20);
        Image.objectFit(ImageFit.Contain);
        Row.pop();
    }
    render() {
        Column.create({ space: 10 });
        Column.width('100%');
        Column.padding(10);
        //播放列表标题栏
        this.PlayAll(this);
        //LazyForEach加载数据
        List.create({ space: 10 });
        //LazyForEach加载数据
        List.width('100%');
        //LazyForEach加载数据
        List.height('100%');
        //LazyForEach加载数据
        List.divider({ strokeWidth: 1, color: '#ffdadbda', startMargin: 10, endMargin: 10 });
        //LazyForEach加载数据
        List.lanes(this.currentBreakpoint == BreakpointConstant.BREAKPOINT_LG ? 2 : 1);
        //LazyForEach加载数据
        List.layoutWeight(1);
        //数据懒加载
        LazyForEach.create("2", this, ObservedObject.GetRawObject(new SongDataSource(songList)), (item: SongItem) => {
            this.isRenderingInProgress = true;
            ListItem.create();
            Row.create({ space: 10 });
            Row.width('100%');
            Row.padding(5);
            Row.onClick(() => {
            });
            Column.create({ space: 10 });
            Column.alignItems(HorizontalAlign.Start);
            Text.create(item.title);
            Text.fontSize(14);
            Text.fontWeight(FontWeight.Bold);
            Text.pop();
            Text.create(item.singer);
            Text.fontSize(12);
            Text.pop();
            Column.pop();
            Image.create(item.image);
            Image.width(40);
            Image.height(30);
            Image.objectFit(ImageFit.Fill);
            Blank.create();
            Blank.pop();
            Image.create($r('app.media.ic_more_list'));
            Image.width(20);
            Image.height(20);
            Image.objectFit(ImageFit.Contain);
            Row.pop();
            ListItem.pop();
            this.isRenderingInProgress = false;
        }, item => item);
        //数据懒加载
        LazyForEach.pop();
        //LazyForEach加载数据
        List.pop();
        Column.pop();
    }
}
