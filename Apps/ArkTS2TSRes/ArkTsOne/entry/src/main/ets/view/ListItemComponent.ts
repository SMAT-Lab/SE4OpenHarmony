interface ListItemComponent_Params {
    index?: number;
    name?: Resource;
    vote?: string;
    isSwitchDataSource?: boolean;
    isChange?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ListItemComponent_" + ++__generate__Id;
}
/**
 * @Author 大连海事大学 袁佳林 572598394@qq.com
 * @Description
* @Date 2023/8/7 14:23
 */
import { FontSize, FontWeight, ItemStyle, WEIGHT } from '../common/constants/Constants';
export class ListItemComponent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.index = undefined;
        this.name = undefined;
        this.__vote = new SynchedPropertySimpleOneWay(params.vote, this, "vote");
        this.__isSwitchDataSource = new SynchedPropertySimpleOneWay(params.isSwitchDataSource, this, "isSwitchDataSource");
        this.__isChange = new ObservedPropertySimple(false, this, "isChange");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ListItemComponent_Params) {
        if (params.index !== undefined) {
            this.index = params.index;
        }
        if (params.name !== undefined) {
            this.name = params.name;
        }
        this.vote = params.vote;
        this.isSwitchDataSource = params.isSwitchDataSource;
        if (params.isChange !== undefined) {
            this.isChange = params.isChange;
        }
    }
    aboutToBeDeleted() {
        this.__vote.aboutToBeDeleted();
        this.__isSwitchDataSource.aboutToBeDeleted();
        this.__isChange.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private index: number;
    private name: Resource;
    private __vote: SynchedPropertySimpleOneWay<string>;
    get vote() {
        return this.__vote.get();
    }
    set vote(newValue: string) {
        this.__vote.set(newValue);
    }
    private __isSwitchDataSource: SynchedPropertySimpleOneWay<boolean>;
    get isSwitchDataSource() {
        return this.__isSwitchDataSource.get();
    }
    set isSwitchDataSource(newValue: boolean) {
        this.__isSwitchDataSource.set(newValue);
    }
    // The state is related to the font color of ListItemComponent.
    private __isChange: ObservedPropertySimple<boolean>;
    get isChange() {
        return this.__isChange.get();
    }
    set isChange(newValue: boolean) {
        this.__isChange.set(newValue);
    }
    render() {
        Row.create();
        Row.height(ItemStyle.BAR_HEIGHT);
        Row.width(WEIGHT);
        Row.onClick(() => {
            this.isSwitchDataSource = !this.isSwitchDataSource;
            this.isChange = !this.isChange;
        });
        Column.create();
        Column.width(ItemStyle.LAYOUT_WEIGHT_LEFT);
        Column.alignItems(HorizontalAlign.Start);
        If.create();
        if (this.isRenderCircleText()) {
            If.branchId(0);
            this.CircleText(this.index, this);
        }
        else {
            If.branchId(1);
            Text.create(this.index.toString());
            Text.lineHeight(ItemStyle.TEXT_LAYOUT_SIZE);
            Text.textAlign(TextAlign.Center);
            Text.width(ItemStyle.TEXT_LAYOUT_SIZE);
            Text.fontWeight(FontWeight.BOLD);
            Text.fontSize(FontSize.SMALL);
            Text.pop();
        }
        If.pop();
        Column.pop();
        Text.create(this.name);
        Text.width(ItemStyle.LAYOUT_WEIGHT_CENTER);
        Text.fontWeight(FontWeight.BOLDER);
        Text.fontSize(FontSize.MIDDLE);
        Text.fontColor(this.isChange ? ItemStyle.COLOR_BLUE : ItemStyle.COLOR_BLACK);
        Text.pop();
        Text.create(this.vote);
        Text.width(ItemStyle.LAYOUT_WEIGHT_RIGHT);
        Text.fontWeight(FontWeight.BOLD);
        Text.fontSize(FontSize.SMALL);
        Text.fontColor(this.isChange ? ItemStyle.COLOR_BLUE : ItemStyle.COLOR_BLACK);
        Text.pop();
        Row.pop();
    }
    CircleText(index: number, parent = null) {
        Row.create();
        Row.justifyContent(FlexAlign.Center);
        Row.borderRadius(ItemStyle.CIRCLE_TEXT_BORDER_RADIUS);
        Row.size({ width: ItemStyle.CIRCLE_TEXT_SIZE,
            height: ItemStyle.CIRCLE_TEXT_SIZE });
        Row.backgroundColor($r('app.color.circle_text_background'));
        Text.create(this.index.toString());
        Text.fontWeight(FontWeight.BOLD);
        Text.fontSize(FontSize.SMALL);
        Text.fontColor(Color.White);
        Text.pop();
        Row.pop();
    }
    isRenderCircleText(): boolean {
        // Just render the element before the fourth in the list.
        return this.index === 1 || this.index === 2 || this.index === 3;
    }
}
