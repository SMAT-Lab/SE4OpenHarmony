interface Index_Params {
    context?;
    message?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
import router from '@ohos.router';
import common from '@ohos.app.ability.common';
import { TitleDesc } from '../common/TitleDesc';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.context = getContext(this) as common.UIAbilityContext;
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.context !== undefined) {
            this.context = params.context;
        }
        if (params.message !== undefined) {
            this.message = params.message;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private context;
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    render() {
        Scroll.create();
        Scroll.height('100%');
        Column.create();
        Column.width('100%');
        let earlierCreatedChild_2: TitleDesc = (this && this.findChildById) ? this.findChildById("2") as TitleDesc : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new TitleDesc("2", this, { text: '属性动画', Url: "pages/AttrAnimationPage" }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                text: '属性动画', Url: "pages/AttrAnimationPage"
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        let earlierCreatedChild_3: TitleDesc = (this && this.findChildById) ? this.findChildById("3") as TitleDesc : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new TitleDesc("3", this, { text: '显式动画', Url: "pages/AnimationToPage" }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                text: '显式动画', Url: "pages/AnimationToPage"
            });
            if (!earlierCreatedChild_3.needsUpdate()) {
                earlierCreatedChild_3.markStatic();
            }
            View.create(earlierCreatedChild_3);
        }
        let earlierCreatedChild_4: TitleDesc = (this && this.findChildById) ? this.findChildById("4") as TitleDesc : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new TitleDesc("4", this, { text: '路径动画', Url: "pages/MotionPathPage" }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({
                text: '路径动画', Url: "pages/MotionPathPage"
            });
            if (!earlierCreatedChild_4.needsUpdate()) {
                earlierCreatedChild_4.markStatic();
            }
            View.create(earlierCreatedChild_4);
        }
        let earlierCreatedChild_5: TitleDesc = (this && this.findChildById) ? this.findChildById("5") as TitleDesc : undefined;
        if (earlierCreatedChild_5 == undefined) {
            View.create(new TitleDesc("5", this, { text: '页面间转场1', Url: "pages/PageTransitionPage1" }));
        }
        else {
            earlierCreatedChild_5.updateWithValueParams({
                text: '页面间转场1', Url: "pages/PageTransitionPage1"
            });
            if (!earlierCreatedChild_5.needsUpdate()) {
                earlierCreatedChild_5.markStatic();
            }
            View.create(earlierCreatedChild_5);
        }
        let earlierCreatedChild_6: TitleDesc = (this && this.findChildById) ? this.findChildById("6") as TitleDesc : undefined;
        if (earlierCreatedChild_6 == undefined) {
            View.create(new TitleDesc("6", this, { text: '页面间转场2', Url: "pages/PageTransitionPage2" }));
        }
        else {
            earlierCreatedChild_6.updateWithValueParams({
                text: '页面间转场2', Url: "pages/PageTransitionPage2"
            });
            if (!earlierCreatedChild_6.needsUpdate()) {
                earlierCreatedChild_6.markStatic();
            }
            View.create(earlierCreatedChild_6);
        }
        let earlierCreatedChild_7: TitleDesc = (this && this.findChildById) ? this.findChildById("7") as TitleDesc : undefined;
        if (earlierCreatedChild_7 == undefined) {
            View.create(new TitleDesc("7", this, { text: '组件内转场', Url: "pages/TransitionPage" }));
        }
        else {
            earlierCreatedChild_7.updateWithValueParams({
                text: '组件内转场', Url: "pages/TransitionPage"
            });
            if (!earlierCreatedChild_7.needsUpdate()) {
                earlierCreatedChild_7.markStatic();
            }
            View.create(earlierCreatedChild_7);
        }
        let earlierCreatedChild_8: TitleDesc = (this && this.findChildById) ? this.findChildById("8") as TitleDesc : undefined;
        if (earlierCreatedChild_8 == undefined) {
            View.create(new TitleDesc("8", this, { text: '共享元素转场', Url: "pages/SharedTransitionPage" }));
        }
        else {
            earlierCreatedChild_8.updateWithValueParams({
                text: '共享元素转场', Url: "pages/SharedTransitionPage"
            });
            if (!earlierCreatedChild_8.needsUpdate()) {
                earlierCreatedChild_8.markStatic();
            }
            View.create(earlierCreatedChild_8);
        }
        let earlierCreatedChild_9: TitleDesc = (this && this.findChildById) ? this.findChildById("9") as TitleDesc : undefined;
        if (earlierCreatedChild_9 == undefined) {
            View.create(new TitleDesc("9", this, { text: '帧动画', Url: "pages/ImageAnimatePage" }));
        }
        else {
            earlierCreatedChild_9.updateWithValueParams({
                text: '帧动画', Url: "pages/ImageAnimatePage"
            });
            if (!earlierCreatedChild_9.needsUpdate()) {
                earlierCreatedChild_9.markStatic();
            }
            View.create(earlierCreatedChild_9);
        }
        let earlierCreatedChild_10: TitleDesc = (this && this.findChildById) ? this.findChildById("10") as TitleDesc : undefined;
        if (earlierCreatedChild_10 == undefined) {
            View.create(new TitleDesc("10", this, { text: '下拉刷新', Url: "pages/RefreshPage" }));
        }
        else {
            earlierCreatedChild_10.updateWithValueParams({
                text: '下拉刷新', Url: "pages/RefreshPage"
            });
            if (!earlierCreatedChild_10.needsUpdate()) {
                earlierCreatedChild_10.markStatic();
            }
            View.create(earlierCreatedChild_10);
        }
        let earlierCreatedChild_11: TitleDesc = (this && this.findChildById) ? this.findChildById("11") as TitleDesc : undefined;
        if (earlierCreatedChild_11 == undefined) {
            View.create(new TitleDesc("11", this, { text: '自定义组件·', Url: "pages/StylePage" }));
        }
        else {
            earlierCreatedChild_11.updateWithValueParams({
                text: '自定义组件·', Url: "pages/StylePage"
            });
            if (!earlierCreatedChild_11.needsUpdate()) {
                earlierCreatedChild_11.markStatic();
            }
            View.create(earlierCreatedChild_11);
        }
        let earlierCreatedChild_12: TitleDesc = (this && this.findChildById) ? this.findChildById("12") as TitleDesc : undefined;
        if (earlierCreatedChild_12 == undefined) {
            View.create(new TitleDesc("12", this, { text: '自定义弹窗', Url: "pages/CustomDialogPage" }));
        }
        else {
            earlierCreatedChild_12.updateWithValueParams({
                text: '自定义弹窗', Url: "pages/CustomDialogPage"
            });
            if (!earlierCreatedChild_12.needsUpdate()) {
                earlierCreatedChild_12.markStatic();
            }
            View.create(earlierCreatedChild_12);
        }
        Text.create("Lottie动画");
        Text.fontSize(36);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            router.pushUrl({
                url: "pages/LottiePage"
            });
        });
        Text.pop();
        Text.create("路由跳转参数传递");
        Text.fontSize(36);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            router.pushUrl({
                url: "pages/RouterPage",
                params: { value: 'OpenHarmony' }, // 给新页面传递一个对象，key为value，取值以.value的形式
            });
        });
        Text.pop();
        Text.create("启动应用内的UIAbility");
        Text.fontSize(36);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let context = this.context; // UIAbilityContext
            let wantInfo = {
                deviceId: '',
                bundleName: "com.example.hotest",
                abilityName: 'SecondAbility',
                // moduleName: 'module1', // moduleName非必选
                parameters: {
                    info: '来自EntryAbility Index页面',
                },
            };
            const RESULT_CODE: number = 1001;
            // context为调用方UIAbility的UIAbilityContext
            context.startAbilityForResult(wantInfo).then((data) => {
                if (data?.resultCode === RESULT_CODE) {
                    // 解析被调用方UIAbility返回的信息
                    let info = data.want?.parameters?.info;
                    this.message = JSON.stringify(info);
                    // ...
                }
            }).catch((err) => {
                // ...
            });
        });
        Text.pop();
        Text.create(this.message);
        Text.pop();
        let earlierCreatedChild_13: TitleDesc = (this && this.findChildById) ? this.findChildById("13") as TitleDesc : undefined;
        if (earlierCreatedChild_13 == undefined) {
            View.create(new TitleDesc("13", this, { text: '窗口', Url: "pages/WindowPage" }));
        }
        else {
            earlierCreatedChild_13.updateWithValueParams({
                text: '窗口', Url: "pages/WindowPage"
            });
            if (!earlierCreatedChild_13.needsUpdate()) {
                earlierCreatedChild_13.markStatic();
            }
            View.create(earlierCreatedChild_13);
        }
        Column.pop();
        Scroll.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
