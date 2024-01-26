interface DetailPage_Params {
    newsId?: number;
    newsData?: NewsData;
    title?: string;
    scroller?: Scroller;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "DetailPage_" + ++__generate__Id;
}
import router from '@ohos.router';
import { NewsData } from '../common/bean/NewsData';
import { DEFAULT_48, FULL_HEIGHT, FULL_WIDTH, NewsDetailContent, NewsDetailScrollItem, NewsDetailSource, NewsDetailTitle } from '../common/constant/CommonConstant';
import NewsViewModel from '../viewmodel/NewsViewModel';
class DetailPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.newsId = undefined;
        this.newsData = undefined;
        this.__title = new ObservedPropertySimple('', this, "title");
        this.scroller = new Scroller();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: DetailPage_Params) {
        if (params.newsId !== undefined) {
            this.newsId = params.newsId;
        }
        if (params.newsData !== undefined) {
            this.newsData = params.newsData;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
    }
    aboutToBeDeleted() {
        this.__title.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private newsId: number;
    private newsData: NewsData;
    private __title: ObservedPropertySimple<string>;
    get title() {
        return this.__title.get();
    }
    set title(newValue: string) {
        this.__title.set(newValue);
    }
    private scroller: Scroller;
    parseRouterParams() {
        let params = router.getParams() as Record<string, Object>;
        if (params == null) {
            this.newsId = AppStorage.Get('newsId');
            return;
        }
        console.error("params" + params.id);
        this.newsId = (params.id as number);
    }
    getDetails() {
        this.newsData = NewsViewModel.getDetailNews(this.newsId);
    }
    aboutToAppear() {
        this.parseRouterParams();
        // Request news data.
        this.getDetails();
    }
    onScrollAction(that) {
        that.yOffset = that.scroller.currentOffset().yOffset;
        if (that.yOffset > DEFAULT_48) {
            this.title = this.newsData.title;
        }
        else {
            this.title = "";
        }
    }
    render() {
        Navigation.create();
        Navigation.size({ width: FULL_WIDTH, height: FULL_HEIGHT });
        Navigation.title(this.title);
        Navigation.titleMode(NavigationTitleMode.Mini);
        Scroll.create(this.scroller);
        Scroll.onScroll(() => { this.onScrollAction(this); });
        Column.create();
        Column.margin({ bottom: NewsDetailScrollItem.MARGIN_BOTTOM });
        Text.create(this.newsData.title);
        Text.fontSize(NewsDetailTitle.TEXT_FONT_SIZE);
        Text.fontColor($r('app.color.fontColor_text'));
        Text.width(FULL_WIDTH);
        Text.maxLines(NewsDetailTitle.TEXT_MAX_LINES);
        Text.margin({ top: NewsDetailTitle.TEXT_MARGIN_TOP });
        Text.padding({ left: NewsDetailTitle.TEXT_MARGIN_LEFT });
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.fontWeight(NewsDetailTitle.TEXT_FONT_WEIGHT);
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Text.create(this.newsData.source);
        Text.fontSize(NewsDetailSource.FONT_SIZE);
        Text.fontColor($r('app.color.fontColor_text2'));
        Text.height(NewsDetailSource.HEIGHT);
        Text.width(NewsDetailSource.WIDTH);
        Text.maxLines(NewsDetailSource.MAX_LINES);
        Text.margin({ left: NewsDetailSource.MARGIN_LEFT, top: NewsDetailSource.MARGIN_TOP });
        Text.textOverflow({ overflow: TextOverflow.None });
        Text.pop();
        Text.create(this.newsData.content);
        Text.fontSize(NewsDetailContent.FONT_SIZE);
        Text.fontColor($r('app.color.fontColor_text'));
        Text.width(NewsDetailContent.WIDTH);
        Text.margin({ left: NewsDetailContent.MARGIN_LEFT, top: NewsDetailContent.MARGIN_TOP });
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.pop();
        ForEach.create("2", this, ObservedObject.GetRawObject(this.newsData.imagesUrl), itemImg => {
            Image.create($rawfile(itemImg.url));
            Image.objectFit(ImageFit.Cover);
            Image.width(NewsDetailScrollItem.WIDTH);
            Image.height(NewsDetailScrollItem.HEIGHT);
            Image.margin({ left: NewsDetailScrollItem.MARGIN_LEFT, top: NewsDetailScrollItem.MARGIN_TOP,
                right: NewsDetailScrollItem.MARGIN_RIGHT });
        }, (itemImg, index) => JSON.stringify(itemImg) + index.toString());
        ForEach.pop();
        Column.pop();
        Scroll.pop();
        Navigation.pop();
    }
}
loadDocument(new DetailPage("1", undefined, {}));
