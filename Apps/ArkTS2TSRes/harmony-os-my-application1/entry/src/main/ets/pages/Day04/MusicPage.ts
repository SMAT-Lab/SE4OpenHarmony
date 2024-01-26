interface MusicPage_Params {
    musics?: Music;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MusicPage_" + ++__generate__Id;
}
import router from '@ohos.router';
import { Music } from '../../model/Music';
export class MusicPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__musics = this.initializeConsume("music", "musics");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MusicPage_Params) {
    }
    aboutToBeDeleted() {
        this.__musics.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __musics: SynchedPropertySimpleOneWay<Music>;
    get musics() {
        return this.__musics.get();
    }
    set musics(newValue: Music) {
        this.__musics.set(newValue);
    }
    render() {
        Column.create();
        If.create();
        if (this.musics != null) {
            If.branchId(0);
            If.create();
            if (this.musics.data.length > 0) {
                If.branchId(0);
                List.create();
                List.layoutWeight(1);
                ForEach.create("2", this, ObservedObject.GetRawObject(this.musics.data), (item, index) => {
                    ListItem.create();
                    Row.create();
                    Row.margin(5);
                    Row.backgroundColor("#f3f3f3");
                    Row.borderRadius(10);
                    Image.create(item.pic);
                    Image.layoutWeight(4);
                    Image.margin(10);
                    Image.onClick(() => {
                        router.push({
                            url: "pages/Day02/WebPage",
                            params: {
                                url: item.link
                            }
                        });
                    });
                    Column.create();
                    Column.layoutWeight(6);
                    Column.onClick(() => {
                        router.push({
                            url: "pages/Day02/WebPage",
                            params: {
                                url: item.link
                            }
                        });
                    });
                    Text.create(item.title);
                    Text.fontSize(24);
                    Text.fontWeight(FontWeight.Bold);
                    Text.pop();
                    Flex.create();
                    Flex.height(1);
                    Flex.backgroundColor(Color.Gray);
                    Flex.width("100%");
                    Flex.margin(10);
                    Flex.pop();
                    Text.create(item.author);
                    Text.pop();
                    Column.pop();
                    Image.create($r("app.media.download"));
                    Image.layoutWeight(1);
                    Image.onClick(() => {
                        router.push({
                            url: "pages/Day02/WebPage",
                            params: {
                                url: item.url
                            }
                        });
                    });
                    Image.margin(5);
                    Row.pop();
                    ListItem.pop();
                });
                ForEach.pop();
                List.pop();
            }
            else {
                If.branchId(1);
                Text.create("无搜索结果");
                Text.width("100%");
                Text.textAlign(TextAlign.Center);
                Text.fontSize(20);
                Text.pop();
            }
            If.pop();
        }
        If.pop();
        Column.pop();
    }
}
