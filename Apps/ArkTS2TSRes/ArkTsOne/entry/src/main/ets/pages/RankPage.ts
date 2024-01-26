interface RankPage_Params {
    dataSource1?: RankData[];
    dataSource2?: RankData[];
    isSwitchDataSource?: boolean;
    clickBackTimeRecord?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "RankPage_" + ++__generate__Id;
}
import prompt from '@ohos.promptAction';
import { RankViewModel } from '../viewmodel/RankViewModel';
import { RankData } from '../common/bean/RankData';
import { ListHeaderComponent } from '../view/ListHeaderComponent';
import { TitleComponent } from '../view/TitleComponent';
import { ListItemComponent } from '../view/ListItemComponent';
import { APP_EXIT_INTERVAL, Style, TIME, TITLE, WEIGHT } from '../common/constants/Constants';
let rankModel: RankViewModel = new RankViewModel();
class RankPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__dataSource1 = new ObservedPropertyObject([], this, "dataSource1");
        this.__dataSource2 = new ObservedPropertyObject([], this, "dataSource2");
        this.__isSwitchDataSource = new ObservedPropertySimple(true, this, "isSwitchDataSource");
        this.clickBackTimeRecord = 0;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: RankPage_Params) {
        if (params.dataSource1 !== undefined) {
            this.dataSource1 = params.dataSource1;
        }
        if (params.dataSource2 !== undefined) {
            this.dataSource2 = params.dataSource2;
        }
        if (params.isSwitchDataSource !== undefined) {
            this.isSwitchDataSource = params.isSwitchDataSource;
        }
        if (params.clickBackTimeRecord !== undefined) {
            this.clickBackTimeRecord = params.clickBackTimeRecord;
        }
    }
    aboutToBeDeleted() {
        this.__dataSource1.aboutToBeDeleted();
        this.__dataSource2.aboutToBeDeleted();
        this.__isSwitchDataSource.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __dataSource1: ObservedPropertyObject<RankData[]>;
    get dataSource1() {
        return this.__dataSource1.get();
    }
    set dataSource1(newValue: RankData[]) {
        this.__dataSource1.set(newValue);
    }
    private __dataSource2: ObservedPropertyObject<RankData[]>;
    get dataSource2() {
        return this.__dataSource2.get();
    }
    set dataSource2(newValue: RankData[]) {
        this.__dataSource2.set(newValue);
    }
    // The State is used to decide whether to switch the data of RankList.
    private __isSwitchDataSource: ObservedPropertySimple<boolean>;
    get isSwitchDataSource() {
        return this.__isSwitchDataSource.get();
    }
    set isSwitchDataSource(newValue: boolean) {
        this.__isSwitchDataSource.set(newValue);
    }
    // It will record the time of clicking back button of system navigation.
    private clickBackTimeRecord: number;
    aboutToAppear() {
        this.dataSource1 = rankModel.loadRankDataSource1();
        this.dataSource2 = rankModel.loadRankDataSource2();
    }
    onBackPress() {
        let options = {
            message: $r('app.string.prompt_text'),
            duration: TIME
        };
        if (this.isShowToast()) {
            prompt.showToast(options);
            this.clickBackTimeRecord = new Date().getTime();
            return true;
        }
        return false;
    }
    isShowToast(): boolean {
        return new Date().getTime() - this.clickBackTimeRecord > APP_EXIT_INTERVAL;
    }
    render() {
        Column.create();
        Column.backgroundColor($r('app.color.background'));
        Column.height(WEIGHT);
        Column.width(WEIGHT);
        let earlierCreatedChild_2: TitleComponent = (this && this.findChildById) ? this.findChildById("2") as TitleComponent : undefined;
        if (earlierCreatedChild_2 == undefined) {
            // Title component in the top.
            View.create(new TitleComponent("2", this, { isRefreshData: this.__isSwitchDataSource, title: TITLE }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                title: TITLE
            });
            View.create(earlierCreatedChild_2);
        }
        __Common__.create();
        __Common__.margin({
            top: Style.HEADER_MARGIN_TOP,
            bottom: Style.HEADER_MARGIN_BOTTOM
        });
        let earlierCreatedChild_3: ListHeaderComponent = (this && this.findChildById) ? this.findChildById("3") as ListHeaderComponent : undefined;
        if (earlierCreatedChild_3 == undefined) {
            // The head style of List component.
            View.create(new ListHeaderComponent("3", this, {
                paddingValue: {
                    left: Style.RANK_PADDING,
                    right: Style.RANK_PADDING
                },
                widthValue: Style.CONTENT_WIDTH
            }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                paddingValue: {
                    left: Style.RANK_PADDING,
                    right: Style.RANK_PADDING
                },
                widthValue: Style.CONTENT_WIDTH
            });
            if (!earlierCreatedChild_3.needsUpdate()) {
                earlierCreatedChild_3.markStatic();
            }
            View.create(earlierCreatedChild_3);
        }
        __Common__.pop();
        // The style of List component.
        this.RankList(Style.CONTENT_WIDTH, this);
        Column.pop();
    }
    RankList(widthValue: Length, parent = null) {
        Column.create();
        Column.padding({
            left: Style.RANK_PADDING,
            right: Style.RANK_PADDING
        });
        Column.borderRadius(Style.BORDER_RADIUS);
        Column.width(widthValue);
        Column.alignItems(HorizontalAlign.Center);
        Column.backgroundColor(Color.White);
        List.create();
        List.width(WEIGHT);
        List.height(Style.LIST_HEIGHT);
        List.divider({ strokeWidth: Style.STROKE_WIDTH });
        ForEach.create("5", this, ObservedObject.GetRawObject(this.isSwitchDataSource ? this.dataSource1 : this.dataSource2), (item, index) => {
            ListItem.create();
            let earlierCreatedChild_4: ListItemComponent = ((parent ? parent : this) && (parent ? parent : this).findChildById) ? (parent ? parent : this).findChildById(generateId()) as ListItemComponent : undefined;
            if (earlierCreatedChild_4 == undefined) {
                View.create(new ListItemComponent("RankPage_" + __generate__Id, parent ? parent : this, { index: index + 1, name: item.name, vote: item.vote,
                    isSwitchDataSource: this.isSwitchDataSource
                }));
            }
            else {
                earlierCreatedChild_4.updateWithValueParams({
                    index: index + 1, name: item.name, vote: item.vote,
                    isSwitchDataSource: this.isSwitchDataSource
                });
                View.create(earlierCreatedChild_4);
            }
            ListItem.pop();
        }, item => JSON.stringify(item));
        ForEach.pop();
        List.pop();
        Column.pop();
    }
}
loadDocument(new RankPage("1", undefined, {}));
