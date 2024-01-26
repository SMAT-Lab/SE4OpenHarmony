interface TransitionPage_Params {
    flag?: boolean;
    show?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TransitionPage_" + ++__generate__Id;
}
class TransitionPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__flag = new ObservedPropertySimple(true, this, "flag");
        this.__show = new ObservedPropertySimple('show', this, "show");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TransitionPage_Params) {
        if (params.flag !== undefined) {
            this.flag = params.flag;
        }
        if (params.show !== undefined) {
            this.show = params.show;
        }
    }
    aboutToBeDeleted() {
        this.__flag.aboutToBeDeleted();
        this.__show.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __flag: ObservedPropertySimple<boolean>;
    get flag() {
        return this.__flag.get();
    }
    set flag(newValue: boolean) {
        this.__flag.set(newValue);
    }
    private __show: ObservedPropertySimple<string>;
    get show() {
        return this.__show.get();
    }
    set show(newValue: string) {
        this.__show.set(newValue);
    }
    render() {
        Column.create();
        Column.width('100%');
        Button.createWithLabel(this.show);
        Button.width(80);
        Button.height(30);
        Button.margin(30);
        Button.onClick(() => {
            // 点击Button控制Image的显示和消失
            Context.animateTo({ duration: 1000 }, () => {
                if (this.flag) {
                    this.show = 'hide';
                }
                else {
                    this.show = 'show';
                }
                this.flag = !this.flag;
            });
        });
        Button.pop();
        If.create();
        if (this.flag) {
            If.branchId(0);
            // Image的显示和消失配置为不同的过渡效果
            Image.create($r('app.media.bg5'));
            // Image的显示和消失配置为不同的过渡效果
            Image.width(300);
            // Image的显示和消失配置为不同的过渡效果
            Image.height(300);
            // Image的显示和消失配置为不同的过渡效果
            Image.transition({ type: TransitionType.Insert, scale: { x: 0, y: 1.0 } });
            // Image的显示和消失配置为不同的过渡效果
            Image.transition({ type: TransitionType.Delete, rotate: { angle: 180 } });
        }
        If.pop();
        Column.pop();
    }
}
loadDocument(new TransitionPage("1", undefined, {}));
