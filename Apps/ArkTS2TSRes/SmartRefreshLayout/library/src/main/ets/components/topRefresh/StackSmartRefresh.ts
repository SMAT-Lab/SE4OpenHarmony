interface StackSmartRefresh_Params {
    model?: StackSmartRefresh.Model;
    header?: () => {};
    main?: () => {};
    needScroller?: boolean;
    refreshLocation?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "StackSmartRefresh_" + ++__generate__Id;
}
class StackSmartRefresh extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new StackSmartRefresh.Model(), this, "model");
        this.header = undefined;
        this.main = undefined;
        this.__needScroller = new ObservedPropertySimple(false
        //  @BuilderParam footer?: () => {}
        , this, "needScroller");
        this.refreshLocation = false //true 内容跟随偏移， false: 内容不偏移
        ;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: StackSmartRefresh_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.header !== undefined) {
            this.header = params.header;
        }
        if (params.main !== undefined) {
            this.main = params.main;
        }
        if (params.needScroller !== undefined) {
            this.needScroller = params.needScroller;
        }
        if (params.refreshLocation !== undefined) {
            this.refreshLocation = params.refreshLocation;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__needScroller.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: ObservedPropertyObject<StackSmartRefresh.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: StackSmartRefresh.Model) {
        this.__model.set(newValue);
    }
    private __header?;
    private __main?;
    private __needScroller: ObservedPropertySimple<boolean>;
    get needScroller() {
        return this.__needScroller.get();
    }
    set needScroller(newValue: boolean) {
        this.__needScroller.set(newValue);
    }
    //  @BuilderParam footer?: () => {}
    private refreshLocation: boolean; //true 内容跟随偏移， false: 内容不偏移
    refreshEnd(location) {
        this.needScroller = true;
        this.model.refreshState = StackSmartRefresh.REFRESHSTATE.NONE;
        //    let that = this
        //    if (location == StackSmartRefresh.LOCATION.HEAD) {
        //      that.model.scroller.scrollTo({
        //        xOffset: 0,
        //        yOffset: this.model.initHeaderHeight,
        //        animation: { duration: 250, curve: Curve.Ease }
        //      })
        //    } else if (location == StackSmartRefresh.LOCATION.FOOT) {
        //
        //    }
    }
    render() {
        Scroll.create(this.model.scroller);
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBar(BarState.Off);
        Scroll.backgroundColor(this.model.backgroundColor);
        Scroll.onScroll((xOffset: number, yOffset: number) => {
            let that = this;
            this.model.latestYOffset = this.model.scroller.currentOffset().yOffset;
            if (!this.model.init) { //初始化刷新
                this.model.init = true;
                this.model.headerHeight = this.model.initHeaderHeight;
                this.model.refreshState = StackSmartRefresh.REFRESHSTATE.REFRESHING;
                this.model.scroller.scrollTo({
                    xOffset: 0,
                    yOffset: 0,
                    animation: { duration: 10, curve: Curve.Ease }
                });
                this.model.refreshTimeOut = setTimeout(() => {
                    this.refreshEnd(StackSmartRefresh.LOCATION.HEAD);
                    this.model.refreshTimeOut = 0;
                }, this.model.refreshDuration);
            }
            if (this.refreshLocation) { //刷新跟随内容移动
                if (this.needScroller) { //重置Scroller
                    this.needScroller = false;
                    if (this.model.scroller.currentOffset().yOffset < this.model.headerHeight) {
                        this.model.scroller.scrollTo({
                            xOffset: 0,
                            yOffset: this.model.initHeaderHeight,
                            animation: { duration: this.model.toRefreshDuration, curve: Curve.Ease }
                        });
                    }
                }
            }
        });
        Scroll.onTouch((event: TouchEvent) => {
            if (event.type === TouchType.Down) {
                this.model.waterDropYTopCoordinate = 0;
                this.model.waterDropYMiddleCoordinate = 400;
                this.model.waterDropYBottomCoordinate = 600;
                this.model.downY = event.touches[0].y;
            }
            if (event.type === TouchType.Move) {
                this.model.dropMoveState = true;
                this.model.dropUpState = false;
                if (this.model.refreshState != StackSmartRefresh.REFRESHSTATE.REFRESHING &&
                    this.model.scroller.currentOffset().yOffset < this.model.initHeaderHeight
                    && (event.touches[0].y - this.model.downY) > 0) { //非刷新状态下拉
                    if ((event.touches[0].y - this.model.downY) > this.model.initHeaderHeight) { //下拉超出初始范围
                        this.model.headerHeight = this.model.initHeaderHeight + (Math.pow(event.touches[0].y - this.model.downY - this.model.initHeaderHeight, 0.8));
                    }
                    this.model.refreshState = StackSmartRefresh.REFRESHSTATE.TOREFRESH;
                }
                else if (this.model.refreshState == StackSmartRefresh.REFRESHSTATE.REFRESHING && (event.touches[0].y - this.model.downY) > 0) { //刷新状态下拉
                    this.model.headerHeight = this.model.initHeaderHeight + (Math.pow(event.touches[0].y - this.model.downY, 0.8));
                }
            }
            if (event.type === TouchType.Up) {
                this.model.dropMoveState = false;
                this.model.dropUpState = true;
                if (this.model.refreshState != StackSmartRefresh.REFRESHSTATE.NONE) {
                    this.model.headerHeight = this.model.initHeaderHeight; //重置头部高度
                    if (this.model.refreshState == StackSmartRefresh.REFRESHSTATE.TOREFRESH) {
                        if (this.model.scroller.currentOffset().yOffset >= this.model.initHeaderHeight / 2) { //未下滑到指定位置则不刷新
                            this.refreshEnd(StackSmartRefresh.LOCATION.HEAD);
                        }
                        else {
                            this.model.scroller.scrollTo({
                                xOffset: 0,
                                yOffset: 0,
                                animation: { duration: 10, curve: Curve.Ease }
                            });
                            this.model.refreshState = StackSmartRefresh.REFRESHSTATE.REFRESHING; //更改为刷新态
                            if (this.model.refreshTimeOut == 0) {
                                this.model.refreshTimeOut = setTimeout(() => {
                                    this.refreshEnd(StackSmartRefresh.LOCATION.HEAD);
                                    this.model.refreshTimeOut = 0;
                                    this.model.lastRefreshTime = new Date();
                                }, this.model.refreshDuration);
                            }
                        }
                    }
                }
            }
        });
        Column.create();
        Column.width('100%');
        If.create();
        if (this.needScroller) { //重置Scroller
            If.branchId(0);
            Text.create("0");
            Text.visibility(Visibility.None);
            Text.pop();
        }
        else {
            If.branchId(1);
            Text.create("1");
            Text.visibility(Visibility.None);
            Text.pop();
        }
        If.pop();
        If.create();
        if (this.header) {
            If.branchId(0);
            If.create();
            if (!this.refreshLocation) {
                If.branchId(0);
                Flex.create();
                Flex.height(0);
                Flex.zIndex(this.model.zIndex);
                this.header(this);
                Flex.pop();
            }
            else {
                If.branchId(1);
                Flex.create();
                Flex.height(this.model.headerHeight);
                Flex.zIndex(this.model.zIndex);
                this.header(this);
                Flex.pop();
            }
            If.pop();
        }
        If.pop();
        If.create();
        if (this.main) {
            If.branchId(0);
            this.main(this);
        }
        If.pop();
        Column.pop();
        Scroll.pop();
    }
}
namespace StackSmartRefresh {
    export enum LOCATION {
        HEAD = 0,
        MIDDER = 1,
        FOOT = 2
    }
    export enum REFRESHSTATE {
        NONE = 0,
        TOREFRESH = 1,
        REFRESHING = 2
    }
    export class Model {
        scroller: Scroller = new Scroller();
        refreshIsShow: boolean = false;
        headerHeight: number = 150; //实际头部高度
        footerHeight: number = 0;
        initHeaderHeight: number = 150; //标准头部高度
        initFooterHeight: number = 150;
        downY: number = 0;
        scrollLocation: LOCATION = LOCATION.HEAD;
        refreshDuration: number = 5000; //刷新态持续时间
        toRefreshDuration: number = 250; //
        refreshTimeOut: number = 0;
        refreshInterval: number = 0;
        init: boolean = false;
        latestYOffset: number = 0;
        refreshState: REFRESHSTATE = REFRESHSTATE.NONE; //刷新状态
        zIndex: number = 2; //首部zIndex
        backgroundColor: Color | string | number = Color.Gray; //主题色
        lastRefreshTime: Date = new Date(); //上次刷新时间
        dropMoveState: boolean = false;
        dropUpState: boolean = false;
        waterDropYTopCoordinate = 0;
        waterDropYMiddleCoordinate = 400;
        waterDropYBottomCoordinate = 600;
        getOffset(): number {
            if (this.headerHeight > this.initHeaderHeight) {
                return this.headerHeight / this.initHeaderHeight;
            }
            else {
                return (this.headerHeight - this.latestYOffset) / this.initHeaderHeight;
            }
        }
        getLastRefreshTime(): Date {
            return this.lastRefreshTime;
        }
        setBackgroundColor(color: Color | string | number) {
            this.backgroundColor = color;
        }
    }
}
export default StackSmartRefresh;
