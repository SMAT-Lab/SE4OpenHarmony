interface Header_Params {
    currentBreakpoint?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Header_" + ++__generate__Id;
}
import router from '@ohos.router';
import { StyleConstants } from '../common/constants/StyleConstants';
import { HeaderConstants } from '../common/constants/HeaderConstants';
import { BreakpointType } from '../common/media/BreakpointSystem';
export class Header extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__currentBreakpoint = new SynchedPropertySimpleTwoWay(params.currentBreakpoint, this, "currentBreakpoint");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Header_Params) {
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
    render() {
        Row.create();
        Row.width(StyleConstants.FULL_WIDTH);
        Row.height($r('app.float.title_bar_height'));
        Row.zIndex(HeaderConstants.Z_INDEX);
        // 返回按钮
        Image.create($r('app.media.ic_back'));
        // 返回按钮
        Image.width($r('app.float.icon_width'));
        // 返回按钮
        Image.height($r('app.float.icon_height'));
        // 返回按钮
        Image.margin({ left: $r('app.float.icon_margin') });
        // 返回按钮
        Image.onClick(() => {
            router.back();
        });
        // 播放器名称
        Text.create($r('app.string.play_list'));
        // 播放器名称
        Text.fontSize(new BreakpointType({
            sm: $r('app.float.header_font_sm'),
            md: $r('app.float.header_font_md'),
            lg: $r('app.float.header_font_lg')
        }).getValue(this.currentBreakpoint));
        // 播放器名称
        Text.fontWeight(HeaderConstants.TITLE_FONT_WEIGHT);
        // 播放器名称
        Text.fontColor($r('app.color.title_color'));
        // 播放器名称
        Text.opacity($r('app.float.title_opacity'));
        // 播放器名称
        Text.letterSpacing(HeaderConstants.LETTER_SPACING);
        // 播放器名称
        Text.padding({ left: $r('app.float.title_padding_left') });
        // 播放器名称
        Text.pop();
        Blank.create();
        Blank.pop();
        // 菜单
        Image.create($r('app.media.ic_more'));
        // 菜单
        Image.width($r('app.float.icon_width'));
        // 菜单
        Image.height($r('app.float.icon_height'));
        // 菜单
        Image.margin({ right: $r('app.float.icon_margin') });
        Row.pop();
    }
}
