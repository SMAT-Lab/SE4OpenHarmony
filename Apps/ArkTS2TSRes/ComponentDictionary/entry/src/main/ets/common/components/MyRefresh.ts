interface MyRefresh_Params {
    isRefreshing?: boolean;
    counter?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyRefresh_" + ++__generate__Id;
}
export class MyRefresh extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__isRefreshing = new ObservedPropertySimple(false, this, "isRefreshing");
        this.__counter = new ObservedPropertySimple(0, this, "counter");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyRefresh_Params) {
        if (params.isRefreshing !== undefined) {
            this.isRefreshing = params.isRefreshing;
        }
        if (params.counter !== undefined) {
            this.counter = params.counter;
        }
    }
    aboutToBeDeleted() {
        this.__isRefreshing.aboutToBeDeleted();
        this.__counter.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __isRefreshing: ObservedPropertySimple<boolean>;
    get isRefreshing() {
        return this.__isRefreshing.get();
    }
    set isRefreshing(newValue: boolean) {
        this.__isRefreshing.set(newValue);
    }
    private __counter: ObservedPropertySimple<number>;
    get counter() {
        return this.__counter.get();
    }
    set counter(newValue: number) {
        this.__counter.set(newValue);
    }
    render() {
        Column.create();
        Refresh.create({ refreshing: { value: this.isRefreshing, changeEvent: newValue => { this.isRefreshing = newValue; } }, offset: 120, friction: 100 });
        Refresh.onStateChange((refreshStatus: RefreshStatus) => {
            console.info('Refresh onStatueChange state is ' + refreshStatus);
        });
        Refresh.onRefreshing(() => {
            setTimeout(() => {
                this.counter++;
                this.isRefreshing = false;
            }, 1000);
            console.log('onRefreshing test');
        });
        Text.create('Pull Down and refresh: ' + this.counter);
        Text.fontSize(30);
        Text.margin(10);
        Text.pop();
        Refresh.pop();
        Column.pop();
    }
}
