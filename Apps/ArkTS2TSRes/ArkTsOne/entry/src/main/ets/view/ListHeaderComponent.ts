interface ListHeaderComponent_Params {
    paddingValue?: Padding | Length;
    widthValue?: Length;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ListHeaderComponent_" + ++__generate__Id;
}
/**
 * @Author 大连海事大学 袁佳林 572598394@qq.com
 * @Description
* @Date 2023/8/7 14:23
 */
import { FontSize, ListHeaderStyle } from '../common/constants/Constants';
export class ListHeaderComponent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.paddingValue = undefined;
        this.widthValue = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ListHeaderComponent_Params) {
        if (params.paddingValue !== undefined) {
            this.paddingValue = params.paddingValue;
        }
        if (params.widthValue !== undefined) {
            this.widthValue = params.widthValue;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private paddingValue: Padding | Length;
    private widthValue: Length;
    render() {
        Row.create();
        Row.width(this.widthValue);
        Row.padding(this.paddingValue);
        Text.create($r('app.string.page_number'));
        Text.fontSize(FontSize.SMALL);
        Text.width(ListHeaderStyle.LAYOUT_WEIGHT_LEFT);
        Text.fontWeight(ListHeaderStyle.FONT_WEIGHT);
        Text.fontColor($r('app.color.font_description'));
        Text.pop();
        Text.create($r('app.string.page_type'));
        Text.fontSize(FontSize.SMALL);
        Text.width(ListHeaderStyle.LAYOUT_WEIGHT_CENTER);
        Text.fontWeight(ListHeaderStyle.FONT_WEIGHT);
        Text.fontColor($r('app.color.font_description'));
        Text.pop();
        Text.create($r('app.string.page_vote'));
        Text.fontSize(FontSize.SMALL);
        Text.width(ListHeaderStyle.LAYOUT_WEIGHT_RIGHT);
        Text.fontWeight(ListHeaderStyle.FONT_WEIGHT);
        Text.fontColor($r('app.color.font_description'));
        Text.pop();
        Row.pop();
    }
}
