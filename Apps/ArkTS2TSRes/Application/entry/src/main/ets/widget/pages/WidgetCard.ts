interface WidgetCard_Params {
    MAX_LINES?: number;
    ACTION_TYPE?: string;
    MESSAGE?: string;
    ABILITY_NAME?: string;
    FULL_WIDTH_PERCENT?: string;
    FULL_HEIGHT_PERCENT?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "WidgetCard_" + ++__generate__Id;
}
class WidgetCard extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.MAX_LINES = 1;
        this.ACTION_TYPE = 'router';
        this.MESSAGE = 'add detail';
        this.ABILITY_NAME = 'EntryAbility';
        this.FULL_WIDTH_PERCENT = '100%';
        this.FULL_HEIGHT_PERCENT = '100%';
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: WidgetCard_Params) {
        if (params.MAX_LINES !== undefined) {
            this.MAX_LINES = params.MAX_LINES;
        }
        if (params.ACTION_TYPE !== undefined) {
            this.ACTION_TYPE = params.ACTION_TYPE;
        }
        if (params.MESSAGE !== undefined) {
            this.MESSAGE = params.MESSAGE;
        }
        if (params.ABILITY_NAME !== undefined) {
            this.ABILITY_NAME = params.ABILITY_NAME;
        }
        if (params.FULL_WIDTH_PERCENT !== undefined) {
            this.FULL_WIDTH_PERCENT = params.FULL_WIDTH_PERCENT;
        }
        if (params.FULL_HEIGHT_PERCENT !== undefined) {
            this.FULL_HEIGHT_PERCENT = params.FULL_HEIGHT_PERCENT;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    /*
     * The max lines.
     */
    readonly MAX_LINES: number;
    /*
     * The action type.
     */
    readonly ACTION_TYPE: string;
    /*
     * The message.
     */
    readonly MESSAGE: string;
    /*
     * The ability name.
     */
    readonly ABILITY_NAME: string;
    /*
     * The width percentage setting.
     */
    readonly FULL_WIDTH_PERCENT: string;
    /*
     * The height percentage setting.
     */
    readonly FULL_HEIGHT_PERCENT: string;
    render() {
        Stack.create();
        Stack.width(this.FULL_WIDTH_PERCENT);
        Stack.height(this.FULL_HEIGHT_PERCENT);
        Stack.onClick(() => {
            postCardAction(this, {
                action: this.ACTION_TYPE,
                abilityName: this.ABILITY_NAME,
                params: {
                    message: this.MESSAGE
                }
            });
        });
        Image.create($r("app.media.ic_widget"));
        Image.width(this.FULL_WIDTH_PERCENT);
        Image.height(this.FULL_HEIGHT_PERCENT);
        Column.create();
        Column.width(this.FULL_WIDTH_PERCENT);
        Column.height(this.FULL_HEIGHT_PERCENT);
        Column.alignItems(HorizontalAlign.Start);
        Column.justifyContent(FlexAlign.End);
        Column.padding($r('app.float.column_padding'));
        Text.create($r('app.string.title_immersive'));
        Text.fontSize($r('app.float.title_immersive_font_size'));
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.fontColor($r('app.color.title_font'));
        Text.fontWeight(FontWeight.Medium);
        Text.maxLines(this.MAX_LINES);
        Text.pop();
        Text.create($r('app.string.detail_immersive'));
        Text.fontSize($r('app.float.detail_immersive_font_size'));
        Text.margin({ top: $r('app.float.item_margin_top') });
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.fontColor($r('app.color.immersive_item_text'));
        Text.fontWeight(FontWeight.Regular);
        Text.maxLines(this.MAX_LINES);
        Text.pop();
        Column.pop();
        Stack.pop();
    }
}
loadDocument(new WidgetCard("1", undefined, {}));
