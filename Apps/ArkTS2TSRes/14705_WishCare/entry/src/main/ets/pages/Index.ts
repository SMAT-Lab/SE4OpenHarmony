interface Index_Params {
    message?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
import router from '@ohos.router';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('WiseCare', this, "message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
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
        Column.create();
        Column.width("100%");
        Column.height("100%");
        Column.alignItems(HorizontalAlign.End);
        Column.create();
        Column.width("100%");
        Column.height("100%");
        Column.offset({ x: "0px", y: "0px" });
        Column.alignItems(HorizontalAlign.End);
        Image.create($r('app.media.img'));
        Image.width("100%");
        Image.height("100%");
        Image.offset({ x: "0", y: "0px" });
        Column.pop();
        Text.create(`${this.message}`);
        Text.width("300vp");
        Text.height("60vp");
        Text.offset({ x: "-90px", y: "-2046.91px" });
        Text.textAlign(TextAlign.Center);
        Text.fontSize("50fp");
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Column.pop();
    }
    aboutToAppear() {
        //延迟五秒钟 做一个操作
        setTimeout(function () {
            //操作的内容->跳转
            router.pushUrl({
                url: "pages/login"
            });
        }, 5000);
    }
    //跳转时候动画
    pageTransition() {
        PageTransition.create();
        //入场动画
        PageTransitionEnter.create({ duration: 2000, curve: Curve.Friction });
        //入场动画
        PageTransitionEnter.slide(SlideEffect.Left);
        //出场动画
        PageTransitionExit.create({ duration: 2000, curve: Curve.Smooth });
        //出场动画
        PageTransitionExit.slide(SlideEffect.Bottom);
        PageTransition.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
