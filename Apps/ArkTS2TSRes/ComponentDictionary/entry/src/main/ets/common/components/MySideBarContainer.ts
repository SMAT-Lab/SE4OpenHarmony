interface MySideBarContainer_Params {
    normalIcon?: Resource;
    selectedIcon?: Resource;
    arr?: number[];
    current?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MySideBarContainer_" + ++__generate__Id;
}
export class MySideBarContainer extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.normalIcon = $r("app.media.user");
        this.selectedIcon = $r("app.media.userFull");
        this.__arr = new ObservedPropertyObject([1, 2, 3], this, "arr");
        this.__current = new ObservedPropertySimple(1, this, "current");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MySideBarContainer_Params) {
        if (params.normalIcon !== undefined) {
            this.normalIcon = params.normalIcon;
        }
        if (params.selectedIcon !== undefined) {
            this.selectedIcon = params.selectedIcon;
        }
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
        if (params.current !== undefined) {
            this.current = params.current;
        }
    }
    aboutToBeDeleted() {
        this.__arr.aboutToBeDeleted();
        this.__current.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private normalIcon: Resource;
    private selectedIcon: Resource;
    private __arr: ObservedPropertyObject<number[]>;
    get arr() {
        return this.__arr.get();
    }
    set arr(newValue: number[]) {
        this.__arr.set(newValue);
    }
    private __current: ObservedPropertySimple<number>;
    get current() {
        return this.__current.get();
    }
    set current(newValue: number) {
        this.__current.set(newValue);
    }
    render() {
        SideBarContainer.create(SideBarContainerType.Embed);
        SideBarContainer.sideBarWidth(240);
        SideBarContainer.minSideBarWidth(210);
        SideBarContainer.maxSideBarWidth(260);
        SideBarContainer.onChange((value: boolean) => {
            console.info('status:' + value);
        });
        Column.create();
        Column.width('100%');
        Column.justifyContent(FlexAlign.SpaceEvenly);
        Column.backgroundColor('#19000000');
        ForEach.create("2", this, ObservedObject.GetRawObject(this.arr), (item, index) => {
            Column.create({ space: 5 });
            Column.onClick(() => {
                this.current = item;
            });
            Image.create(this.current === item ? this.selectedIcon : this.normalIcon);
            Image.width(64);
            Image.height(64);
            Text.create("Index0" + item);
            Text.fontSize(25);
            Text.fontColor(this.current === item ? '#0A59F7' : '#999');
            Text.fontFamily('source-sans-pro,cursive,sans-serif');
            Text.pop();
            Column.pop();
        }, item => item);
        ForEach.pop();
        Column.pop();
        RowSplit.create();
        RowSplit.width('100%');
        Column.create();
        Column.justifyContent(FlexAlign.Center);
        Text.create('Split page one');
        Text.fontSize(30);
        Text.pop();
        Column.pop();
        Column.create();
        Column.justifyContent(FlexAlign.Center);
        Text.create('Split page two');
        Text.fontSize(30);
        Text.pop();
        Column.pop();
        RowSplit.pop();
        SideBarContainer.pop();
    }
}
