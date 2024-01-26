interface ImagePage_Params {
    message?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ImagePage_" + ++__generate__Id;
}
class ImagePage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello Beijing', this, "message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ImagePage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Text.create(this.message);
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        //Image($r("app.media.icon")).width(200).height(200).objectFit(ImageFit.Contain)
        Image.create($r("app.media.Tiananmen"));
        //Image($r("app.media.icon")).width(200).height(200).objectFit(ImageFit.Contain)
        Image.width(300);
        //Image($r("app.media.icon")).width(200).height(200).objectFit(ImageFit.Contain)
        Image.margin(15);
        Row.create();
        Row.width('100%');
        Image.create("https://ts1.cn.mm.bing.net/th/id/R-C.df1eee3a3e9369c9ed73ed9eca79dfc6?rik=5D3AMyCZJW69xw&riu=http%3a%2f%2fp0.itc.cn%2fimages01%2f20201118%2fb88f9d5737af49958174d32aa6ca6d4b.jpeg&ehk=bz5Gen2vuIv6g9qCKlYGTpnx%2bDJZTpmKQTeRN4J6mVU%3d&risl=&pid=ImgRaw&r=0");
        Image.width(80);
        TextInput.create({
            placeholder: "请输入用户名"
        });
        Row.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new ImagePage("1", undefined, {}));
