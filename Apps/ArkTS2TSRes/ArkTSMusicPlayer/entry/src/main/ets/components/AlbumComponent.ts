interface AlbumComponent_Params {
    imgHeight?: number;
    currentBreakpoint?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "AlbumComponent_" + ++__generate__Id;
}
import { BreakpointConstants } from '../common/constants/BreakpointConstants';
import { ContentConstants } from '../common/constants/ContentConstants';
import { GridConstants } from '../common/constants/GridConstants';
import { StyleConstants } from '../common/constants/StyleConstants';
import { BreakpointType } from '../common/media/BreakpointSystem';
import { OptionItem, optionList } from '../viewmodel/SongListData';
export class AlbumComponent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__imgHeight = new ObservedPropertySimple(0, this, "imgHeight");
        this.__currentBreakpoint = new SynchedPropertySimpleTwoWay(params.currentBreakpoint, this, "currentBreakpoint");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AlbumComponent_Params) {
        if (params.imgHeight !== undefined) {
            this.imgHeight = params.imgHeight;
        }
    }
    aboutToBeDeleted() {
        this.__imgHeight.aboutToBeDeleted();
        this.__currentBreakpoint.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __imgHeight: ObservedPropertySimple<number>;
    get imgHeight() {
        return this.__imgHeight.get();
    }
    set imgHeight(newValue: number) {
        this.__imgHeight.set(newValue);
    }
    private __currentBreakpoint: SynchedPropertySimpleTwoWay<string>;
    get currentBreakpoint() {
        return this.__currentBreakpoint.get();
    }
    set currentBreakpoint(newValue: string) {
        this.__currentBreakpoint.set(newValue);
    }
    CoverImage(parent = null) {
        Stack.create({ alignContent: Alignment.BottomStart });
        Stack.width(StyleConstants.FULL_WIDTH);
        Stack.height(StyleConstants.FULL_HEIGHT);
        Stack.aspectRatio(ContentConstants.ASPECT_RATIO_ALBUM_COVER);
        Image.create($r('app.media.ic_album'));
        Image.width(StyleConstants.FULL_WIDTH);
        Image.aspectRatio(ContentConstants.ASPECT_RATIO_ALBUM_COVER);
        Image.borderRadius($r('app.float.album_cover_border_radius'));
        Image.onAreaChange((oldArea: Area, newArea: Area) => {
            this.imgHeight = newArea.height as number;
        });
        Text.create($r('app.string.collection_num'));
        Text.letterSpacing(ContentConstants.LETTER_SPACING);
        Text.fontColor(Color.White);
        Text.fontSize(new BreakpointType({
            sm: $r('app.float.collection_font_sm'),
            md: $r('app.float.collection_font_md'),
            lg: $r('app.float.collection_font_lg')
        }).getValue(this.currentBreakpoint));
        Text.translate({
            x: StyleConstants.TRANSLATE_X,
            y: StyleConstants.TRANSLATE_Y
        });
        Text.pop();
        Stack.pop();
    }
    CoverIntroduction(parent = null) {
        Column.create();
        Column.width(StyleConstants.FULL_WIDTH);
        Column.height(this.currentBreakpoint === BreakpointConstants.BREAKPOINT_SM ?
            this.imgHeight : $r('app.float.introduction_height'));
        Column.alignItems(HorizontalAlign.Start);
        Column.justifyContent(FlexAlign.Center);
        Column.padding({
            left: this.currentBreakpoint === BreakpointConstants.BREAKPOINT_SM ? $r('app.float.introduction_padding') : 0
        });
        Column.margin({
            top: this.currentBreakpoint === BreakpointConstants.BREAKPOINT_SM ? 0 : $r('app.float.introduction_margin_top'),
            bottom: this.currentBreakpoint === BreakpointConstants.BREAKPOINT_SM ?
                0 : $r('app.float.introduction_margin_bottom')
        });
        Text.create($r('app.string.list_name'));
        Text.opacity($r('app.float.album_name_opacity'));
        Text.fontWeight(ContentConstants.ALBUM_FONT_WEIGHT);
        Text.fontColor($r('app.color.album_name_introduction'));
        Text.fontSize(new BreakpointType({
            sm: $r('app.float.list_font_sm'),
            md: $r('app.float.list_font_md'),
            lg: $r('app.float.list_font_lg')
        }).getValue(this.currentBreakpoint));
        Text.margin({ bottom: $r('app.float.album_name_margin') });
        Text.pop();
        Text.create($r('app.string.playlist_Introduction'));
        Text.opacity($r('app.float.introduction_opacity'));
        Text.width(StyleConstants.FULL_WIDTH);
        Text.fontWeight(ContentConstants.INTRODUCTION_FONT_WEIGHT);
        Text.fontColor($r('app.color.album_name_introduction'));
        Text.fontSize(new BreakpointType({
            sm: $r('app.float.introduction_font_sm'),
            md: $r('app.float.introduction_font_md'),
            lg: $r('app.float.introduction_font_lg')
        }).getValue(this.currentBreakpoint));
        Text.pop();
        Column.pop();
    }
    CoverOptions(parent = null) {
        Row.create();
        Row.height($r('app.float.option_area_height'));
        Row.width(StyleConstants.FULL_WIDTH);
        Row.padding({
            left: $r('app.float.options_padding'),
            right: $r('app.float.options_padding')
        });
        Row.justifyContent(FlexAlign.SpaceBetween);
        ForEach.create("2", this, ObservedObject.GetRawObject(optionList), (item: OptionItem) => {
            Column.create({ space: ContentConstants.COVER_OPTION_SPACE });
            Column.onClick(item.action);
            Image.create(item.image);
            Image.height($r('app.float.option_image_size'));
            Image.width($r('app.float.option_image_size'));
            Text.create(item.text);
            Text.fontColor($r('app.color.album_name_introduction'));
            Text.fontSize(new BreakpointType({
                sm: $r('app.float.option_font_sm'),
                md: $r('app.float.option_font_md'),
                lg: $r('app.float.option_font_lg')
            }).getValue(this.currentBreakpoint));
            Text.pop();
            Column.pop();
        }, (item, index) => index + JSON.stringify(item));
        ForEach.pop();
        Row.pop();
    }
    render() {
        Column.create();
        Column.margin({
            left: new BreakpointType({
                sm: $r('app.float.cover_margin_sm'),
                md: $r('app.float.cover_margin_md'),
                lg: $r('app.float.cover_margin_lg')
            }).getValue(this.currentBreakpoint),
            right: new BreakpointType({
                sm: $r('app.float.cover_margin_sm'),
                md: $r('app.float.cover_margin_md'),
                lg: $r('app.float.cover_margin_lg')
            }).getValue(this.currentBreakpoint)
        });
        GridRow.create();
        GridRow.padding({
            top: this.currentBreakpoint === BreakpointConstants.BREAKPOINT_SM ?
                $r('app.float.cover_padding_top_sm') : $r('app.float.cover_padding_top_other'),
            left: new BreakpointType({
                sm: $r('app.float.album_padding_sm'),
                md: $r('app.float.album_padding_md'),
                lg: $r('app.float.album_padding_lg')
            }).getValue(this.currentBreakpoint),
            right: new BreakpointType({
                sm: $r('app.float.album_padding_sm'),
                md: $r('app.float.album_padding_md'),
                lg: $r('app.float.album_padding_lg')
            }).getValue(this.currentBreakpoint)
        });
        GridCol.create({
            span: { sm: GridConstants.SPAN_FOUR, md: GridConstants.SPAN_TWELVE, lg: GridConstants.SPAN_TWELVE }
        });
        this.CoverImage(this);
        GridCol.pop();
        GridCol.create({
            span: { sm: GridConstants.SPAN_EIGHT, md: GridConstants.SPAN_TWELVE, lg: GridConstants.SPAN_TWELVE }
        });
        this.CoverIntroduction(this);
        GridCol.pop();
        GridCol.create({
            span: { sm: GridConstants.SPAN_TWELVE, md: GridConstants.SPAN_TWELVE, lg: GridConstants.SPAN_TWELVE }
        });
        GridCol.padding({
            top: this.currentBreakpoint === BreakpointConstants.BREAKPOINT_SM ? $r('app.float.option_margin') : 0,
            bottom: this.currentBreakpoint === BreakpointConstants.BREAKPOINT_SM ? $r('app.float.option_margin') : 0
        });
        this.CoverOptions(this);
        GridCol.pop();
        GridRow.pop();
        Column.pop();
    }
}
