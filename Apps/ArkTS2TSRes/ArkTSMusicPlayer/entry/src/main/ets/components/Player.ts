interface Player_Params {
    selectIndex?: number;
    isPlay?: boolean;
    songList?: SongItem[];
    currentBreakpoint?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Player_" + ++__generate__Id;
}
import { SongItem } from '../common/bean/SongItem';
import { PlayerConstants } from '../common/constants/PlayerConstants';
import { StyleConstants } from '../common/constants/StyleConstants';
import { BreakpointType } from '../common/media/BreakpointSystem';
import { MusicList } from '../common/media/MusicList';
export class Player extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__selectIndex = AppStorage.SetAndProp('selectIndex', 0, this, "selectIndex");
        this.__isPlay = AppStorage.SetAndLink('isPlay', false, this, "isPlay");
        this.songList = MusicList;
        this.__currentBreakpoint = new SynchedPropertySimpleTwoWay(params.currentBreakpoint, this, "currentBreakpoint");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Player_Params) {
        if (params.songList !== undefined) {
            this.songList = params.songList;
        }
    }
    aboutToBeDeleted() {
        this.__selectIndex.aboutToBeDeleted();
        this.__isPlay.aboutToBeDeleted();
        this.__currentBreakpoint.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __selectIndex: ObservedPropertyAbstract<number>;
    get selectIndex() {
        return this.__selectIndex.get();
    }
    set selectIndex(newValue: number) {
        this.__selectIndex.set(newValue);
    }
    private __isPlay: ObservedPropertyAbstract<boolean>;
    get isPlay() {
        return this.__isPlay.get();
    }
    set isPlay(newValue: boolean) {
        this.__isPlay.set(newValue);
    }
    private songList: SongItem[];
    private __currentBreakpoint: SynchedPropertySimpleTwoWay<string>;
    get currentBreakpoint() {
        return this.__currentBreakpoint.get();
    }
    set currentBreakpoint(newValue: string) {
        this.__currentBreakpoint.set(newValue);
    }
    render() {
        Row.create();
        Row.width(StyleConstants.FULL_WIDTH);
        Row.height($r('app.float.player_area_height'));
        Row.backgroundColor($r('app.color.player_background'));
        Row.padding({
            left: $r('app.float.player_padding'),
            right: $r('app.float.player_padding')
        });
        Row.position({
            x: 0,
            y: StyleConstants.FULL_HEIGHT
        });
        Row.translate({
            x: 0,
            y: StyleConstants.TRANSLATE_PLAYER_Y
        });
        Row.create();
        Row.layoutWeight(PlayerConstants.LAYOUT_WEIGHT_PLAYER_CONTROL);
        Image.create(this.songList[this.selectIndex]?.label);
        Context.animation({
            duration: PlayerConstants.ANIMATION_DURATION,
            iterations: PlayerConstants.ITERATIONS,
            curve: Curve.Linear
        });
        Image.height($r('app.float.cover_height'));
        Image.width($r('app.float.cover_width'));
        Image.borderRadius($r('app.float.label_border_radius'));
        Image.margin({ right: $r('app.float.cover_margin') });
        Image.rotate({ angle: this.isPlay ? PlayerConstants.ROTATE : 0 });
        Context.animation(null);
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Text.create(this.songList[this.selectIndex].title);
        Text.fontColor($r('app.color.song_name'));
        Text.fontSize(new BreakpointType({
            sm: $r('app.float.song_title_sm'),
            md: $r('app.float.song_title_md'),
            lg: $r('app.float.song_title_lg')
        }).getValue(this.currentBreakpoint));
        Text.pop();
        Row.create();
        Image.create($r('app.media.ic_vip'));
        Image.height($r('app.float.vip_icon_height'));
        Image.width($r('app.float.vip_icon_width'));
        Image.margin({ right: $r('app.float.vip_icon_margin') });
        Text.create(this.songList[this.selectIndex].singer);
        Text.fontColor($r('app.color.singer'));
        Text.fontSize(new BreakpointType({
            sm: $r('app.float.singer_title_sm'),
            md: $r('app.float.singer_title_md'),
            lg: $r('app.float.singer_title_lg')
        }).getValue(this.currentBreakpoint));
        Text.opacity($r('app.float.singer_opacity'));
        Text.pop();
        Row.pop();
        Column.pop();
        Row.pop();
        Blank.create();
        Blank.pop();
        Row.create();
        Row.width(new BreakpointType({
            sm: $r('app.float.play_width_sm'),
            md: $r('app.float.play_width_sm'),
            lg: $r('app.float.play_width_lg')
        }).getValue(this.currentBreakpoint));
        Row.justifyContent(FlexAlign.End);
        Image.create($r('app.media.ic_previous'));
        Image.height($r('app.float.control_icon_height'));
        Image.width($r('app.float.control_icon_width'));
        Image.margin({ right: $r('app.float.control_icon_margin') });
        Image.displayPriority(PlayerConstants.DISPLAY_PRIORITY_TWO);
        Image.create(this.isPlay ? $r('app.media.ic_play') : $r('app.media.ic_pause'));
        Image.height($r('app.float.control_icon_height'));
        Image.width($r('app.float.control_icon_width'));
        Image.displayPriority(PlayerConstants.DISPLAY_PRIORITY_THREE);
        Image.create($r('app.media.ic_next'));
        Image.height($r('app.float.control_icon_height'));
        Image.width($r('app.float.control_icon_width'));
        Image.margin({
            right: $r('app.float.control_icon_margin'),
            left: $r('app.float.control_icon_margin')
        });
        Image.displayPriority(PlayerConstants.DISPLAY_PRIORITY_TWO);
        Image.create($r('app.media.ic_music_list'));
        Image.height($r('app.float.control_icon_height'));
        Image.width($r('app.float.control_icon_width'));
        Image.displayPriority(PlayerConstants.DISPLAY_PRIORITY_ONE);
        Row.pop();
        Row.pop();
    }
}
