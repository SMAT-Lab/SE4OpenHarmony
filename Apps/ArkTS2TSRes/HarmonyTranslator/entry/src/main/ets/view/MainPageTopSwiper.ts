interface MainPageTopSwiper_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MainPageTopSwiper_" + ++__generate__Id;
}
import router from '@ohos.router';
import pasteboard from '@ohos.pasteboard';
import promptAction from '@ohos.promptAction';
export class MainPageTopSwiper extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MainPageTopSwiper_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private setPasteBoardData(content: string) {
        let data = pasteboard.createData(pasteboard.MIMETYPE_TEXT_PLAIN, content);
        pasteboard.getSystemPasteboard().setData(data, (error, data) => {
            if (error) {
                promptAction.showToast({ message: `复制出错--> ${JSON.stringify(error)}` });
            }
            else {
                promptAction.showToast({ message: "已复制到剪贴板" });
            }
        });
    }
    builderSwiperItem(title: string, link: string, toPage: string, parent = null) {
        Column.create();
        Column.width('100%');
        Column.height('10%');
        Column.backgroundColor(Color.White);
        Column.margin(15);
        Column.borderRadius(4);
        Column.borderColor(0xaaaaaa);
        Column.borderWidth(1);
        Column.padding(10);
        Column.justifyContent(FlexAlign.Center);
        Column.onClick(() => {
            router.pushUrl({
                url: toPage,
                params: { 'url': link }
            });
        });
        Text.create(title);
        __Text__titleStyle();
        Text.pop();
        Text.create(`链接：${link}`);
        Text.pop();
        Text.create("复制");
        Text.padding({ top: 4, bottom: 4, left: 10, right: 10 });
        Text.borderRadius(4);
        Text.borderColor(0xE5E5E5);
        Text.borderWidth(1);
        Text.onClick(() => {
            this.setPasteBoardData(link);
        });
        Text.pop();
        Column.pop();
    }
    render() {
        Swiper.create();
        Swiper.loop(true);
        Swiper.margin(10);
        Swiper.autoPlay(true);
        this.builderSwiperItem('百度通用文本翻译API', "https://fanyi-api.baidu.com/product/11", "pages/ApplyTranslateKey", this);
        this.builderSwiperItem('百度机器翻译：文本翻译-通用版', "https://ai.baidu.com/ai-doc/MT/4kqryjku9", "pages/ApplyTranslateKey", this);
        this.builderSwiperItem('百度机器翻译：文本翻译-词典版', "https://ai.baidu.com/ai-doc/MT/nkqrzmbpc", "pages/ApplyTranslateKey", this);
        this.builderSwiperItem('有道智云：文本翻译', "https://ai.youdao.com/DOCSIRMA/html/trans/api/wbfy/index.html", "pages/ApplyTranslateKey", this);
        Swiper.pop();
    }
}
function __Text__titleStyle(): void {
    Text.textAlign(TextAlign.Center);
    Text.fontSize(20);
}
