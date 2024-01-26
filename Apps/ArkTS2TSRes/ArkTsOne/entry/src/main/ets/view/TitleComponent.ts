interface TitleComponent_Params {
    isRefreshData?: boolean;
    title?: Resource;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TitleComponent_" + ++__generate__Id;
}
/**
 * @Author 大连海事大学 袁佳林 572598394@qq.com
 * @Description
* @Date 2023/8/7 14:24
 */
import AppContext from '@ohos.app.ability.common';
import { FontSize, TitleBarStyle, WEIGHT } from '../common/constants/Constants';
export class TitleComponent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__isRefreshData = new SynchedPropertySimpleTwoWay(params.isRefreshData, this, "isRefreshData");
        this.__title = new ObservedPropertyObject($r('app.string.title_default'), this, "title");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TitleComponent_Params) {
        if (params.title !== undefined) {
            this.title = params.title;
        }
    }
    aboutToBeDeleted() {
        this.__isRefreshData.aboutToBeDeleted();
        this.__title.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __isRefreshData: SynchedPropertySimpleTwoWay<boolean>; // User click the button to decide whether to switch data.
    get isRefreshData() {
        return this.__isRefreshData.get();
    }
    set isRefreshData(newValue: boolean) {
        this.__isRefreshData.set(newValue);
    }
    private __title: ObservedPropertyObject<Resource>;
    get title() {
        return this.__title.get();
    }
    set title(newValue: Resource) {
        this.__title.set(newValue);
    }
    render() {
        Row.create();
        Row.width(WEIGHT);
        Row.padding({ left: TitleBarStyle.BAR_MARGIN_HORIZONTAL,
            right: TitleBarStyle.BAR_MARGIN_HORIZONTAL });
        Row.margin({ top: TitleBarStyle.BAR_MARGIN_TOP });
        Row.height(TitleBarStyle.BAR_HEIGHT);
        Row.justifyContent(FlexAlign.SpaceAround);
        Row.create();
        Row.width(TitleBarStyle.WEIGHT);
        Row.height(WEIGHT);
        Row.justifyContent(FlexAlign.Start);
        Image.create($r('app.media.ic_public_back'));
        Image.height(TitleBarStyle.IMAGE_BACK_SIZE);
        Image.width(TitleBarStyle.IMAGE_BACK_SIZE);
        Image.margin({ right: TitleBarStyle.IMAGE_BACK_MARGIN_RIGHT });
        Image.onClick(() => {
            let handler = getContext(this) as AppContext.UIAbilityContext;
            handler.terminateSelf();
        });
        Text.create(this.title);
        Text.fontSize(FontSize.LARGE);
        Text.pop();
        Row.pop();
        Row.create();
        Row.width(TitleBarStyle.WEIGHT);
        Row.height(WEIGHT);
        Row.justifyContent(FlexAlign.End);
        Image.create($r('app.media.loading'));
        Image.height(TitleBarStyle.IMAGE_LOADING_SIZE);
        Image.width(TitleBarStyle.IMAGE_LOADING_SIZE);
        Image.onClick(() => {
            this.isRefreshData = !this.isRefreshData;
        });
        Row.pop();
        Row.pop();
    }
}
