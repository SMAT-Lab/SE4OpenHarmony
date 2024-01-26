interface SharedTransitionPage2_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SharedTransitionPage2_" + ++__generate__Id;
}
class SharedTransitionPage2 extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SharedTransitionPage2_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Stack.create();
        Stack.width('100%');
        Stack.height('100%');
        Image.create($r('app.media.bg4'));
        Image.width(150);
        Image.height(150);
        Image.sharedTransition('sharedImage', { duration: 800, curve: Curve.Linear, delay: 100 });
        Stack.pop();
    }
}
loadDocument(new SharedTransitionPage2("1", undefined, {}));
