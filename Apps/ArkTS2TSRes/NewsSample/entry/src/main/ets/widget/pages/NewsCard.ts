interface NewsCard_Params {
    newsId?: number;
    newsTitle?: string;
    newsImage?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "NewsCard_" + ++__generate__Id;
}
let newsStorage = new LocalStorage();
class NewsCard extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: NewsCard_Params) {
    }
    aboutToBeDeleted() {
        this.__newsId.aboutToBeDeleted();
        this.__newsTitle.aboutToBeDeleted();
        this.__newsImage.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __newsId: ObservedPropertyAbstract<number> = this.localStorage_.setAndProp<number>('id', 0, this, "newsId");
    get newsId() {
        return this.__newsId.get();
    }
    set newsId(newValue: number) {
        this.__newsId.set(newValue);
    }
    private __newsTitle: ObservedPropertyAbstract<string> = this.localStorage_.setAndProp<string>('title', "入春来，百花香", this, "newsTitle");
    get newsTitle() {
        return this.__newsTitle.get();
    }
    set newsTitle(newValue: string) {
        this.__newsTitle.set(newValue);
    }
    private __newsImage: ObservedPropertyAbstract<string> = this.localStorage_.setAndProp<string>('image', "ic_news_1_1.png", this, "newsImage");
    get newsImage() {
        return this.__newsImage.get();
    }
    set newsImage(newValue: string) {
        this.__newsImage.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Row.alignItems(VerticalAlign.Top);
        Row.onClick(() => {
            postCardAction(this, {
                "action": 'router',
                "abilityName": 'EntryAbility',
                "params": {
                    "from": "WidgetCard",
                    "targetPage": "pages/DetailPage",
                    "id": this.newsId
                }
            });
        });
        Stack.create({ alignContent: Alignment.BottomStart });
        Stack.width('100%');
        Stack.height('100%');
        Stack.backgroundColor($r('app.color.start_window_background'));
        Image.create($rawfile(this.newsImage));
        Image.width('100%');
        Image.height('100%');
        Image.objectFit(ImageFit.Fill);
        Image.borderRadius($r('app.float.image_border_radius'));
        Text.create(this.newsTitle);
        Text.fontSize($r('app.float.mini_title_font_size'));
        Text.fontWeight(FontWeight.Bolder);
        Text.fontColor($r('app.color.mini_text_font_color'));
        Text.padding({ left: $r('app.float.row_padding'), bottom: $r('app.float.row_padding') });
        Text.pop();
        Stack.pop();
        Row.pop();
    }
}
loadDocument(new NewsCard("1", undefined, {}, newsStorage));
