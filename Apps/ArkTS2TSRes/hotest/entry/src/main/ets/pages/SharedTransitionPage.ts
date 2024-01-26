interface SharedTransitionPage_Params {
    active?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SharedTransitionPage_" + ++__generate__Id;
}
class SharedTransitionPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__active = new ObservedPropertySimple(false, this, "active");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SharedTransitionPage_Params) {
        if (params.active !== undefined) {
            this.active = params.active;
        }
    }
    aboutToBeDeleted() {
        this.__active.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __active: ObservedPropertySimple<boolean>;
    get active() {
        return this.__active.get();
    }
    set active(newValue: boolean) {
        this.__active.set(newValue);
    }
    render() {
        Column.create();
        Navigator.create({ target: 'pages/SharedTransitionPage2', type: NavigationType.Push });
        Navigator.padding({ left: 20, top: 20 });
        Navigator.onClick(() => {
            this.active = true;
        });
        Image.create($r('app.media.bg4'));
        Image.width(50);
        Image.height(50);
        Image.sharedTransition('sharedImage', { duration: 800, curve: Curve.Linear, delay: 100 });
        Navigator.pop();
        Column.pop();
    }
}
loadDocument(new SharedTransitionPage("1", undefined, {}));
