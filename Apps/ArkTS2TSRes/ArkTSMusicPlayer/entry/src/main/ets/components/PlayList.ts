interface PlayList_Params {
    currentBreakpoint?: string;
    songList?: SongItem[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "PlayList_" + ++__generate__Id;
}
import { SongItem } from '../common/bean/SongItem';
import { BreakpointConstants } from '../common/constants/BreakpointConstants';
import { ContentConstants } from '../common/constants/ContentConstants';
import { StyleConstants } from '../common/constants/StyleConstants';
import { BreakpointType } from '../common/media/BreakpointSystem';
import { MusicList } from '../common/media/MusicList';
import { SongDataSource } from '../viewmodel/SongDataSource';
export class PlayList extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__currentBreakpoint = new SynchedPropertySimpleTwoWay(params.currentBreakpoint, this, "currentBreakpoint");
        this.songList = MusicList;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: PlayList_Params) {
        if (params.songList !== undefined) {
            this.songList = params.songList;
        }
    }
    aboutToBeDeleted() {
        this.__currentBreakpoint.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __currentBreakpoint: SynchedPropertySimpleTwoWay<string>;
    get currentBreakpoint() {
        return this.__currentBreakpoint.get();
    }
    set currentBreakpoint(newValue: string) {
        this.__currentBreakpoint.set(newValue);
    }
    private songList: SongItem[];
    PlayAll(parent = null) {
        Row.create();
        Row.height($r('app.float.play_all_area_height'));
        Row.width(StyleConstants.FULL_WIDTH);
        Row.backgroundColor(Color.White);
        Row.padding({
            left: $r('app.float.play_all_area_padding'),
            right: $r('app.float.play_all_area_padding')
        });
        Row.borderRadius({
            topRight: $r('app.float.play_all_border_radius'),
            topLeft: $r('app.float.play_all_border_radius')
        });
        Row.position({ x: 0, y: 0 });
        Image.create($r('app.media.ic_play_all'));
        Image.height($r('app.float.play_all_icon_size'));
        Image.width($r('app.float.play_all_icon_size'));
        Text.create($r('app.string.play_all', this.songList.length));
        Text.maxLines(ContentConstants.PLAY_ALL_MAX_LINES);
        Text.padding({ left: $r('app.float.play_all_text_padding') });
        Text.fontColor(Color.Black);
        Text.fontSize(new BreakpointType({
            sm: $r('app.float.play_font_sm'),
            md: $r('app.float.play_font_md'),
            lg: $r('app.float.play_font_lg')
        }).getValue(this.currentBreakpoint));
        Text.pop();
        Blank.create();
        Blank.pop();
        Image.create($r('app.media.ic_order_play'));
        Image.width($r('app.float.order_icon_size'));
        Image.height($r('app.float.order_icon_size'));
        Image.margin({ right: $r('app.float.order_icon_margin') });
        Image.create($r('app.media.ic_sort_list'));
        Image.height($r('app.float.order_icon_size'));
        Image.width($r('app.float.order_icon_size'));
        Row.pop();
    }
    SongItem(item: SongItem, index: number, parent = null) {
        Row.create();
        Row.height($r('app.float.list_item_height'));
        Row.width(StyleConstants.FULL_WIDTH);
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Text.create(item.title);
        Text.fontColor(Color.Black);
        Text.fontSize(new BreakpointType({
            sm: $r('app.float.item_font_sm'),
            md: $r('app.float.item_font_md'),
            lg: $r('app.float.item_font_lg')
        }).getValue(this.currentBreakpoint));
        Text.margin({ bottom: $r('app.float.list_item_title_margin') });
        Text.pop();
        Row.create();
        Image.create(item.mark);
        Image.width($r('app.float.list_item_image_size'));
        Image.height($r('app.float.list_item_image_size'));
        Image.margin({ right: $r('app.float.list_item_image_margin') });
        Text.create(item.singer);
        Text.opacity($r('app.float.singer_opacity'));
        Text.fontColor(Color.Black);
        Text.fontSize(new BreakpointType({
            sm: $r('app.float.singer_title_sm'),
            md: $r('app.float.singer_title_md'),
            lg: $r('app.float.singer_title_lg')
        }).getValue(this.currentBreakpoint));
        Text.pop();
        Row.pop();
        Column.pop();
        Blank.create();
        Blank.pop();
        Image.create($r('app.media.ic_list_more'));
        Image.height($r('app.float.order_icon_size'));
        Image.width($r('app.float.order_icon_size'));
        Row.pop();
    }
    render() {
        Column.create();
        Column.padding({
            top: this.currentBreakpoint === BreakpointConstants.BREAKPOINT_SM ? 0 : $r('app.float.list_area_padding_top'),
            bottom: $r('app.float.list_area_padding_bottom')
        });
        // 播放全部
        this.PlayAll(this);
        // 歌单列表
        List.create();
        // 歌单列表
        List.width(StyleConstants.FULL_WIDTH);
        // 歌单列表
        List.backgroundColor(Color.White);
        // 歌单列表
        List.margin({ top: $r('app.float.list_area_margin_top') });
        // 歌单列表
        List.lanes(this.currentBreakpoint === BreakpointConstants.BREAKPOINT_LG ?
            ContentConstants.COL_TWO : ContentConstants.COL_ONE);
        // 歌单列表
        List.layoutWeight(1);
        // 歌单列表
        List.divider({
            color: $r('app.color.list_divider'),
            strokeWidth: $r('app.float.stroke_width'),
            startMargin: $r('app.float.list_item_padding'),
            endMargin: $r('app.float.list_item_padding')
        });
        LazyForEach.create("2", this, ObservedObject.GetRawObject(new SongDataSource(this.songList)), (item: SongItem, index: number) => {
            this.isRenderingInProgress = true;
            ListItem.create();
            Column.create();
            Column.padding({
                left: $r('app.float.list_item_padding'),
                right: $r('app.float.list_item_padding')
            });
            this.SongItem(item, index, this);
            Column.pop();
            ListItem.pop();
            this.isRenderingInProgress = false;
        }, (item, index) => JSON.stringify(item) + index);
        LazyForEach.pop();
        // 歌单列表
        List.pop();
        Column.pop();
    }
}
