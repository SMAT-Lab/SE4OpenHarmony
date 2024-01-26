interface MyNavigation_Params {
    currentIndex?: number;
    Build?: Array<Object>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyNavigation_" + ++__generate__Id;
}
export class MyNavigation extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__currentIndex = new ObservedPropertySimple(0, this, "currentIndex");
        this.__Build = new ObservedPropertyObject([
            {
                icon: $r('app.media.add'),
                icon_after: $r('app.media.addcolor'),
                text: 'add',
                num: 0
            },
            {
                icon: $r('app.media.app'),
                icon_after: $r('app.media.appcolor'),
                text: 'app',
                num: 1
            },
            {
                icon: $r('app.media.collect'),
                icon_after: $r('app.media.collectcolor'),
                text: 'collect',
                num: 2
            }
        ], this, "Build");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyNavigation_Params) {
        if (params.currentIndex !== undefined) {
            this.currentIndex = params.currentIndex;
        }
        if (params.Build !== undefined) {
            this.Build = params.Build;
        }
    }
    aboutToBeDeleted() {
        this.__currentIndex.aboutToBeDeleted();
        this.__Build.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __currentIndex: ObservedPropertySimple<number>;
    get currentIndex() {
        return this.__currentIndex.get();
    }
    set currentIndex(newValue: number) {
        this.__currentIndex.set(newValue);
    }
    private __Build: ObservedPropertyObject<Array<Object>>;
    get Build() {
        return this.__Build.get();
    }
    set Build(newValue: Array<Object>) {
        this.__Build.set(newValue);
    }
    NavigationToolbar(parent = null) {
        Row.create();
        ForEach.create("2", this, ObservedObject.GetRawObject(this.Build), item => {
            Column.create();
            Column.onClick(() => {
                this.currentIndex = item.num;
            });
            Column.margin({ left: 70 });
            Image.create(this.currentIndex == item.num ? item.icon_after : item.icon);
            Image.width(25);
            Image.height(25);
            Text.create(item.text);
            Text.fontColor(this.currentIndex == item.num ? "#ff7500" : "#000000");
            Text.pop();
            Column.pop();
        });
        ForEach.pop();
        Row.pop();
    }
    render() {
        Column.create();
        Navigation.create();
        Navigation.toolBar({ builder: this.NavigationToolbar.bind(this) });
        Text.create('Navigation组件');
        Text.fontSize(30);
        Text.fontWeight(700);
        Text.pop();
        Navigation.pop();
        Column.pop();
    }
}
