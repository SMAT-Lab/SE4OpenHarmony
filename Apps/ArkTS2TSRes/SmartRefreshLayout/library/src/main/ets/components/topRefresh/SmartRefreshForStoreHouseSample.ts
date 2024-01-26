interface SmartRefreshForStoreHouseSample_Params {
    modelStoreHouse?: SmartRefreshForStoreHouseSample.Model;
    header?: () => void;
    main?: () => void;
    footer?: () => void;
    needScroller?: boolean;
    headerIsVisibleLoadMore?: boolean;
    footerIsVisibleLoadMore?: boolean;
    headerHeight?: number;
    footerHeight?: number;
    scrollerIsEnableRollWhenRefreshing?: boolean;
    scrollHeight?: number;
    footerHeightPercentage?: string;
    scrollHeightPercentage?: string;
    scrollAreaChangeHeight?: number;
    columnAreaChangeHeight?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SmartRefreshForStoreHouseSample_" + ++__generate__Id;
}
class SmartRefreshForStoreHouseSample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__modelStoreHouse = new SynchedPropertyObjectTwoWay(params.modelStoreHouse, this, "modelStoreHouse");
        this.header = undefined;
        this.main = undefined;
        this.footer = undefined;
        this.needScroller = false;
        this.__headerIsVisibleLoadMore = new ObservedPropertySimple(true, this, "headerIsVisibleLoadMore");
        this.__footerIsVisibleLoadMore = new ObservedPropertySimple(false, this, "footerIsVisibleLoadMore");
        this.__headerHeight = new ObservedPropertySimple(0, this, "headerHeight");
        this.__footerHeight = new ObservedPropertySimple(0, this, "footerHeight");
        this.__scrollerIsEnableRollWhenRefreshing = new ObservedPropertySimple(true, this, "scrollerIsEnableRollWhenRefreshing");
        this.__scrollHeight = new ObservedPropertySimple(0, this, "scrollHeight");
        this.__footerHeightPercentage = new ObservedPropertySimple("0%", this, "footerHeightPercentage");
        this.__scrollHeightPercentage = new ObservedPropertySimple("100%", this, "scrollHeightPercentage");
        this.scrollAreaChangeHeight = 0;
        this.columnAreaChangeHeight = 0;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SmartRefreshForStoreHouseSample_Params) {
        if (params.header !== undefined) {
            this.header = params.header;
        }
        if (params.main !== undefined) {
            this.main = params.main;
        }
        if (params.footer !== undefined) {
            this.footer = params.footer;
        }
        if (params.needScroller !== undefined) {
            this.needScroller = params.needScroller;
        }
        if (params.headerIsVisibleLoadMore !== undefined) {
            this.headerIsVisibleLoadMore = params.headerIsVisibleLoadMore;
        }
        if (params.footerIsVisibleLoadMore !== undefined) {
            this.footerIsVisibleLoadMore = params.footerIsVisibleLoadMore;
        }
        if (params.headerHeight !== undefined) {
            this.headerHeight = params.headerHeight;
        }
        if (params.footerHeight !== undefined) {
            this.footerHeight = params.footerHeight;
        }
        if (params.scrollerIsEnableRollWhenRefreshing !== undefined) {
            this.scrollerIsEnableRollWhenRefreshing = params.scrollerIsEnableRollWhenRefreshing;
        }
        if (params.scrollHeight !== undefined) {
            this.scrollHeight = params.scrollHeight;
        }
        if (params.footerHeightPercentage !== undefined) {
            this.footerHeightPercentage = params.footerHeightPercentage;
        }
        if (params.scrollHeightPercentage !== undefined) {
            this.scrollHeightPercentage = params.scrollHeightPercentage;
        }
        if (params.scrollAreaChangeHeight !== undefined) {
            this.scrollAreaChangeHeight = params.scrollAreaChangeHeight;
        }
        if (params.columnAreaChangeHeight !== undefined) {
            this.columnAreaChangeHeight = params.columnAreaChangeHeight;
        }
    }
    aboutToBeDeleted() {
        this.__modelStoreHouse.aboutToBeDeleted();
        this.__headerIsVisibleLoadMore.aboutToBeDeleted();
        this.__footerIsVisibleLoadMore.aboutToBeDeleted();
        this.__headerHeight.aboutToBeDeleted();
        this.__footerHeight.aboutToBeDeleted();
        this.__scrollerIsEnableRollWhenRefreshing.aboutToBeDeleted();
        this.__scrollHeight.aboutToBeDeleted();
        this.__footerHeightPercentage.aboutToBeDeleted();
        this.__scrollHeightPercentage.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __modelStoreHouse: SynchedPropertySimpleOneWay<SmartRefreshForStoreHouseSample.Model>;
    get modelStoreHouse() {
        return this.__modelStoreHouse.get();
    }
    set modelStoreHouse(newValue: SmartRefreshForStoreHouseSample.Model) {
        this.__modelStoreHouse.set(newValue);
    }
    private __header?;
    private __main?;
    private __footer?;
    private needScroller: boolean;
    private __headerIsVisibleLoadMore: ObservedPropertySimple<boolean>;
    get headerIsVisibleLoadMore() {
        return this.__headerIsVisibleLoadMore.get();
    }
    set headerIsVisibleLoadMore(newValue: boolean) {
        this.__headerIsVisibleLoadMore.set(newValue);
    }
    private __footerIsVisibleLoadMore: ObservedPropertySimple<boolean>;
    get footerIsVisibleLoadMore() {
        return this.__footerIsVisibleLoadMore.get();
    }
    set footerIsVisibleLoadMore(newValue: boolean) {
        this.__footerIsVisibleLoadMore.set(newValue);
    }
    private __headerHeight: ObservedPropertySimple<number>;
    get headerHeight() {
        return this.__headerHeight.get();
    }
    set headerHeight(newValue: number) {
        this.__headerHeight.set(newValue);
    }
    private __footerHeight: ObservedPropertySimple<number>;
    get footerHeight() {
        return this.__footerHeight.get();
    }
    set footerHeight(newValue: number) {
        this.__footerHeight.set(newValue);
    }
    private __scrollerIsEnableRollWhenRefreshing: ObservedPropertySimple<boolean>;
    get scrollerIsEnableRollWhenRefreshing() {
        return this.__scrollerIsEnableRollWhenRefreshing.get();
    }
    set scrollerIsEnableRollWhenRefreshing(newValue: boolean) {
        this.__scrollerIsEnableRollWhenRefreshing.set(newValue);
    }
    private __scrollHeight: ObservedPropertySimple<number>;
    get scrollHeight() {
        return this.__scrollHeight.get();
    }
    set scrollHeight(newValue: number) {
        this.__scrollHeight.set(newValue);
    }
    private __footerHeightPercentage: ObservedPropertySimple<string>;
    get footerHeightPercentage() {
        return this.__footerHeightPercentage.get();
    }
    set footerHeightPercentage(newValue: string) {
        this.__footerHeightPercentage.set(newValue);
    }
    private __scrollHeightPercentage: ObservedPropertySimple<string>;
    get scrollHeightPercentage() {
        return this.__scrollHeightPercentage.get();
    }
    set scrollHeightPercentage(newValue: string) {
        this.__scrollHeightPercentage.set(newValue);
    }
    private scrollAreaChangeHeight: number;
    private columnAreaChangeHeight: number;
    refreshClose(location: any) {
        this.needScroller = true;
        this.modelStoreHouse.refreshState = SmartRefreshForStoreHouseSample.REFRESHSTATE.NONE;
    }
    aboutToAppear() {
        if (this.modelStoreHouse.initRefreshing) { //初始化刷新  头部允许刷新
            this.scrollerInit();
        }
    }
    scrollerInit() {
        this.headerIsVisibleLoadMore = true;
        this.headerHeight = this.modelStoreHouse.initHeaderHeight;
        this.modelStoreHouse.headerHeight = this.headerHeight;
        this.modelStoreHouse.refreshState = SmartRefreshForStoreHouseSample.REFRESHSTATE.REFRESHING;
        if (this.modelStoreHouse.refreshHeaderCallback) { //初始化刷新的回调
            this.modelStoreHouse.refreshHeaderCallback();
        }
        if (this.modelStoreHouse.getRefreshFinishStopDuration() > 0) { //刷新结束过后停留的时间
            setTimeout(() => {
                this.modelStoreHouse.refreshState = SmartRefreshForStoreHouseSample.REFRESHSTATE.REFRESHFINISH;
            }, this.modelStoreHouse.refreshDuration);
        }
        this.modelStoreHouse.refreshTimeOut = setTimeout(() => {
            this.headerHeight = 0;
            this.modelStoreHouse.headerHeight = 0;
            this.headerIsVisibleLoadMore = false;
            this.refreshClose(SmartRefreshForStoreHouseSample.LOCATION.HEAD);
            this.modelStoreHouse.refreshTimeOut = 0;
            this.closeHeaderRefresh(); //关闭头部刷新效果
        }, this.modelStoreHouse.refreshDuration + this.modelStoreHouse.getRefreshFinishStopDuration());
    }
    render() {
        Column.create();
        Column.height("100%");
        Column.onAreaChange((oldValue: Area, newValue: Area) => {
            this.columnAreaChangeHeight = Number(newValue.height);
        });
        If.create();
        if (this.header && this.modelStoreHouse.headerIsRefresh) {
            If.branchId(0);
            If.create();
            if (this.modelStoreHouse.fixedContent && !this.modelStoreHouse.flyRefreshHeaderIsShow) {
                If.branchId(0);
                Flex.create();
                Flex.height(this.headerHeight);
                Flex.zIndex(this.modelStoreHouse.zHeaderIndex);
                Flex.backgroundColor(this.modelStoreHouse.getBackgroundShadowColor());
                Flex.visibility((this.headerIsVisibleLoadMore && this.modelStoreHouse.enableRefresh) ? Visibility.Visible : Visibility.None);
                this.header(this);
                Flex.pop();
            }
            If.pop();
        }
        If.pop();
        Scroll.create(this.modelStoreHouse.scroller);
        Scroll.enabled(this.scrollerIsEnableRollWhenRefreshing);
        Scroll.height(this.scrollHeightPercentage);
        Scroll.align(Alignment.Top);
        Scroll.enabled(this.scrollerIsEnableRollWhenRefreshing);
        Scroll.onScrollEdge((side: Edge) => {
            if (side.valueOf() == 0) { //滑动到顶部
                this.modelStoreHouse.refreshHeaderCallbackState = true;
                this.modelStoreHouse.refreshBottomCallbackState = false;
                this.modelStoreHouse.scrollLocation = SmartRefreshForStoreHouseSample.LOCATION.HEAD;
            }
            if (side.valueOf() == 2) { //滑动到底部
                this.modelStoreHouse.refreshBottomCallbackState = true;
                this.modelStoreHouse.refreshHeaderCallbackState = false;
                this.modelStoreHouse.firstArriveBottomEdgeOffsetY = this.modelStoreHouse.scroller.currentOffset().yOffset;
                this.modelStoreHouse.scrollLocation = SmartRefreshForStoreHouseSample.LOCATION.FOOT;
            }
        });
        Scroll.onScroll((xOffset: number, yOffset: number) => {
            if (!this.modelStoreHouse.disableContentWhenRefresh && (this.modelStoreHouse.refreshState == SmartRefreshForStoreHouseSample.REFRESHSTATE.REFRESHING || this.modelStoreHouse.refreshState == SmartRefreshForStoreHouseSample.REFRESHSTATE.REFRESHFINISH)) {
                //do nothing->设置下拉刷新过程中不可以拖动
            }
            else {
                if (this.modelStoreHouse.fixedContent != this.modelStoreHouse.oldFixedContent) { //内容固定
                    this.needScroller = true;
                    this.modelStoreHouse.oldFixedContent = this.modelStoreHouse.fixedContent;
                }
                this.modelStoreHouse.latestYOffset = this.modelStoreHouse.scroller.currentOffset().yOffset;
                this.scrollerEventFunction();
            }
        });
        Scroll.onTouch((event: TouchEvent) => this.contentEnableScroll(event));
        Column.create();
        Column.onAreaChange((oldValue: Area, newValue: Area) => {
            this.scrollAreaChangeHeight = Number(newValue.height);
        });
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
        if (this.main) {
            If.branchId(0);
            this.main(this);
        }
        If.pop();
        Column.pop();
        Scroll.pop();
        If.create();
        if (this.footer && this.modelStoreHouse.footerIsRefresh) {
            If.branchId(0);
            Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
            Flex.opacity(1);
            Flex.height(this.footerHeightPercentage);
            Flex.backgroundColor(this.modelStoreHouse.getBackgroundShadowColor());
            Flex.visibility((this.footerIsVisibleLoadMore && this.modelStoreHouse.enableLoadMore) ? Visibility.Visible : Visibility.None);
            this.footer(this);
            Flex.pop();
        }
        If.pop();
        Column.pop();
    }
    //刷新过程中是否可以滚动列表
    scrollerIsEnableRollWhenRefreshingFunction() {
        if (this.modelStoreHouse.refreshState == SmartRefreshForStoreHouseSample.REFRESHSTATE.REFRESHING || this.modelStoreHouse.refreshState == SmartRefreshForStoreHouseSample.REFRESHSTATE.REFRESHFINISH) {
            if (this.modelStoreHouse.scrollLocation == SmartRefreshForStoreHouseSample.LOCATION.HEAD) {
                if (!this.modelStoreHouse.disableContentWhenRefresh) {
                    this.scrollerIsEnableRollWhenRefreshing = false;
                }
                else {
                    this.scrollerIsEnableRollWhenRefreshing = true;
                }
            }
            if (this.modelStoreHouse.scrollLocation == SmartRefreshForStoreHouseSample.LOCATION.FOOT) {
                if (!this.modelStoreHouse.disableContentWhenLoading) {
                    this.scrollerIsEnableRollWhenRefreshing = false;
                }
                else {
                    this.scrollerIsEnableRollWhenRefreshing = true;
                }
            }
        }
        else {
            this.scrollerIsEnableRollWhenRefreshing = true;
        }
    }
    scrollerEventFunction() {
        if (this.modelStoreHouse.scrollLocation == SmartRefreshForStoreHouseSample.LOCATION.HEAD && this.needScroller) {
            this.needScroller = false;
            this.modelStoreHouse.scrollerEndYOffset = 0;
            this.modelStoreHouse.scrollerEndState = true;
            this.headerHeight = this.modelStoreHouse.initHeaderHeight;
            this.modelStoreHouse.headerHeight = this.modelStoreHouse.initHeaderHeight;
        }
        else if (this.modelStoreHouse.scrollLocation == SmartRefreshForStoreHouseSample.LOCATION.FOOT && this.needScroller) {
            this.needScroller = false;
            this.modelStoreHouse.scrollerEndYOffset = this.modelStoreHouse.firstArriveBottomEdgeOffsetY;
            this.modelStoreHouse.scrollerEndState = true;
            if (this.modelStoreHouse.enableScrollContentWhenLoaded) { //是否在加载完成之后滚动内容显示新数据
                this.modelStoreHouse.scroller.scrollEdge(Edge.Bottom);
            }
            else {
                if (this.modelStoreHouse.refreshState == SmartRefreshForStoreHouseSample.REFRESHSTATE.TOREFRESH
                    || this.modelStoreHouse.refreshState == SmartRefreshForStoreHouseSample.REFRESHSTATE.REFRESHING
                    || this.modelStoreHouse.refreshState == SmartRefreshForStoreHouseSample.REFRESHSTATE.REFRESHFINISH) {
                    this.modelStoreHouse.scroller.scrollEdge(Edge.Bottom);
                }
                else {
                    this.modelStoreHouse.scroller.scrollTo({ xOffset: 0, yOffset: this.modelStoreHouse.firstArriveBottomEdgeOffsetY });
                }
            }
        }
    }
    contentEnableScroll(event: TouchEvent) {
        //判断头部刷新时是否可以滚动
        //只能头部控制刷新时，不可以操作。底部加载时，设置列表不可以操作需要刷新页面设置scrollable，则内容会回到顶部。
        if (this.modelStoreHouse.refreshState == SmartRefreshForStoreHouseSample.REFRESHSTATE.REFRESHING || this.modelStoreHouse.refreshState == SmartRefreshForStoreHouseSample.REFRESHSTATE.REFRESHFINISH) {
            if (this.modelStoreHouse.scrollLocation == SmartRefreshForStoreHouseSample.LOCATION.HEAD && this.modelStoreHouse.disableContentWhenRefresh) {
                this.touchEventFunction(event);
            }
            else {
                this.scrollerIsEnableRollWhenRefreshingFunction();
            }
            if (this.modelStoreHouse.scrollLocation == SmartRefreshForStoreHouseSample.LOCATION.FOOT && this.modelStoreHouse.disableContentWhenLoading) {
                this.touchEventFunction(event);
            }
            else {
                this.scrollerIsEnableRollWhenRefreshingFunction();
            }
        }
        else {
            this.touchEventFunction(event);
        }
    }
    // touch事件
    touchEventFunction(event: TouchEvent) {
        switch (event.type) {
            case TouchType.Down: // 手指按下
                this.headerHeight = 0;
                this.modelStoreHouse.headerHeight = 0;
                this.modelStoreHouse.initScrollerYOffset = this.modelStoreHouse.scroller.currentOffset().yOffset;
                // 记录按下的y坐标
                this.modelStoreHouse.downY = event.touches[0].y;
                break;
            case TouchType.Move: // 手指移动
                this.modelStoreHouse.currentMouseX = event.touches[0].screenX;
                this.modelStoreHouse.downYOffset = event.touches[0].y - this.modelStoreHouse.downY;
                //记录拖拽方向
                this.modelStoreHouse.dragDirection = this.modelStoreHouse.downYOffset > 0 ? true : false;
                //到达底部，而向下拖动，则清楚到达底部的标识
                if (this.modelStoreHouse.scrollLocation == SmartRefreshForStoreHouseSample.LOCATION.FOOT && this.modelStoreHouse.dragDirection) {
                    this.modelStoreHouse.scrollLocation = SmartRefreshForStoreHouseSample.LOCATION.MIDDER;
                }
                // 下拉方向判断头部刷新
                if (this.modelStoreHouse.dragDirection) {
                    if (this.modelStoreHouse.downYOffset > this.modelStoreHouse.initScrollerYOffset) {
                        this.headerIsVisibleLoadMore = true;
                        this.footerIsVisibleLoadMore = false;
                    }
                    //下拉头部刷新样式回调
                    if (this.modelStoreHouse.refreshHeaderCallbackState && this.modelStoreHouse.headerRefreshId == -1 && this.modelStoreHouse.headerHeight > (this.modelStoreHouse.initHeaderHeight / 2)) {
                        this.modelStoreHouse.refreshHeaderCallbackState = false;
                        this.modelStoreHouse.refreshHeaderCallback();
                    }
                    this.dragDownDirection_Move(event);
                    return;
                }
                else { // 尾部刷新
                    //scroll的高度小于整个屏幕的高度
                    if (this.columnAreaChangeHeight > this.scrollAreaChangeHeight) {
                        this.headerIsVisibleLoadMore = false;
                        this.footerIsVisibleLoadMore = true;
                        if (this.modelStoreHouse.refreshBottomCallbackState && this.modelStoreHouse.bottomRefreshId == 0) {
                            this.modelStoreHouse.refreshBottomCallbackState = false;
                            this.modelStoreHouse.refreshBottomCallback();
                        }
                        this.dragUpDirection_Move(event);
                    }
                    else { //scroll的高度大于、等于整个屏幕的高度
                        if (this.modelStoreHouse.firstArriveBottomEdgeOffsetY == 0 || this.modelStoreHouse.scrollLocation != SmartRefreshForStoreHouseSample.LOCATION.FOOT) { //第一次进入，高度为默认高度0
                            this.headerIsVisibleLoadMore = false;
                            this.footerIsVisibleLoadMore = false;
                        }
                        else {
                            if (Math.abs(this.modelStoreHouse.downYOffset) > (this.modelStoreHouse.firstArriveBottomEdgeOffsetY - this.modelStoreHouse.initScrollerYOffset)) {
                                this.headerIsVisibleLoadMore = false;
                                this.footerIsVisibleLoadMore = true;
                            }
                        }
                        if (this.modelStoreHouse.scrollLocation == SmartRefreshForStoreHouseSample.LOCATION.FOOT) {
                            this.footerIsVisibleLoadMore = true;
                            if (this.modelStoreHouse.refreshBottomCallbackState && this.modelStoreHouse.bottomRefreshId == 0) {
                                this.modelStoreHouse.refreshBottomCallbackState = false;
                                this.modelStoreHouse.refreshBottomCallback();
                            }
                            this.dragUpDirection_Move(event);
                        }
                    }
                }
                break;
            case TouchType.Up: // 手指抬起
                if (this.modelStoreHouse.dragDirection && this.headerIsVisibleLoadMore) {
                    this.dragDownDirection_UP(this.modelStoreHouse.downYOffset);
                }
                else if (!this.modelStoreHouse.dragDirection && this.footerIsVisibleLoadMore) {
                    this.dragUpDirection_UP(Math.abs(this.modelStoreHouse.downYOffset));
                }
                break;
            case TouchType.Cancel:
        }
    }
    dragDownDirection_Move(event: TouchEvent) {
        switch (this.modelStoreHouse.refreshState) {
            case SmartRefreshForStoreHouseSample.REFRESHSTATE.NONE:
                this.modelStoreHouse.refreshState = SmartRefreshForStoreHouseSample.REFRESHSTATE.TOREFRESH;
                break;
            case SmartRefreshForStoreHouseSample.REFRESHSTATE.TOREFRESH:
                let dragOffsetY = Math.abs(event.touches[0].y - this.modelStoreHouse.downY) + this.modelStoreHouse.srlHeaderInsetStart;
                if (this.headerHeight <= this.modelStoreHouse.initHeaderHeight) {
                    this.headerHeight = dragOffsetY;
                    this.modelStoreHouse.headerHeight = dragOffsetY;
                }
                if (dragOffsetY > this.modelStoreHouse.initHeaderHeight) { //下拉超过默认值
                    //下拉超出初始范围
                    this.headerHeight = this.modelStoreHouse.initHeaderHeight + (Math.pow(dragOffsetY - this.modelStoreHouse.initHeaderHeight, this.modelStoreHouse.dragRate));
                    this.modelStoreHouse.headerHeight = this.headerHeight;
                }
                this.modelStoreHouse.refreshState = SmartRefreshForStoreHouseSample.REFRESHSTATE.TOREFRESH;
                break;
            case SmartRefreshForStoreHouseSample.REFRESHSTATE.REFRESHING:
                if ((event.touches[0].y - this.modelStoreHouse.downY) > 0) { //刷新状态下拉
                    this.headerHeight = this.modelStoreHouse.initHeaderHeight + (Math.pow(event.touches[0].y - this.modelStoreHouse.downY, this.modelStoreHouse.dragRate));
                    this.modelStoreHouse.headerHeight = this.headerHeight;
                }
                break;
            default:
        }
    }
    dragDownDirection_UP(downYOffsetParam: number) {
        if (this.modelStoreHouse.refreshState != SmartRefreshForStoreHouseSample.REFRESHSTATE.NONE) {
            if (this.modelStoreHouse.refreshState == SmartRefreshForStoreHouseSample.REFRESHSTATE.TOREFRESH) {
                if (this.headerHeight < (this.modelStoreHouse.initHeaderHeight * this.modelStoreHouse.headerTriggerRate)) { //未下滑到指定位置则不刷新(头部高度小于默认高度)
                    this.headerIsVisibleLoadMore = false; //小于头部固定高度时，则隐藏头部
                    this.closeHeaderRefresh(); //关闭头部刷新效果
                    this.refreshClose(SmartRefreshForStoreHouseSample.LOCATION.HEAD);
                }
                else {
                    this.headerHeight = this.modelStoreHouse.initHeaderHeight; //重置头部高度
                    this.modelStoreHouse.headerHeight = this.modelStoreHouse.initHeaderHeight;
                    this.needScroller = true;
                    this.modelStoreHouse.refreshState = SmartRefreshForStoreHouseSample.REFRESHSTATE.REFRESHING; //更改为刷新态
                    if (this.modelStoreHouse.refreshTimeOut == 0) {
                        if (this.modelStoreHouse.getRefreshFinishStopDuration() > 0) { //刷新结束过后停留的时间
                            setTimeout(() => {
                                this.modelStoreHouse.refreshState = SmartRefreshForStoreHouseSample.REFRESHSTATE.REFRESHFINISH;
                            }, this.modelStoreHouse.refreshDuration);
                        }
                        this.modelStoreHouse.refreshTimeOut = setTimeout(() => {
                            this.modelStoreHouse.refreshTimeOut = 0;
                            this.headerIsVisibleLoadMore = false;
                            this.refreshClose(SmartRefreshForStoreHouseSample.LOCATION.HEAD);
                            this.modelStoreHouse.lastRefreshTime = new Date();
                            this.closeHeaderRefresh(); //关闭头部刷新效果
                            this.modelStoreHouse.refreshHeaderDataCallback();
                        }, this.modelStoreHouse.refreshDuration + this.modelStoreHouse.getRefreshFinishStopDuration());
                    }
                }
            }
            else if (this.modelStoreHouse.refreshState == SmartRefreshForStoreHouseSample.REFRESHSTATE.REFRESHING) {
                this.headerHeight = this.modelStoreHouse.initHeaderHeight; //重置头部高度
                this.modelStoreHouse.headerHeight = this.modelStoreHouse.initHeaderHeight;
            }
        }
    }
    dragUpDirection_Move(event: TouchEvent) {
        let dragOffsetY = Math.abs(event.touches[0].y - this.modelStoreHouse.downY) + this.modelStoreHouse.srlFooterInsetStart;
        if (this.footerHeight < this.modelStoreHouse.initFooterHeight && this.modelStoreHouse.refreshState != SmartRefreshForStoreHouseSample.REFRESHSTATE.REFRESHING) {
            this.footerHeight = dragOffsetY;
            this.scrollHeight = this.columnAreaChangeHeight - this.footerHeight;
            this.footerHeightPercentage = (this.footerHeight / this.columnAreaChangeHeight * 100) + "%";
            this.scrollHeightPercentage = (this.scrollHeight / this.columnAreaChangeHeight * 100) + "%";
            this.modelStoreHouse.footerHeight = this.footerHeight;
        }
        else {
            if (this.modelStoreHouse.refreshState != SmartRefreshForStoreHouseSample.REFRESHSTATE.REFRESHING
                && (this.modelStoreHouse.downY - event.touches[0].y) > 0 && dragOffsetY > this.modelStoreHouse.initFooterHeight) { //非刷新状态上拉
                this.footerHeight = this.modelStoreHouse.initFooterHeight + (Math.pow(dragOffsetY - this.modelStoreHouse.initFooterHeight, this.modelStoreHouse.dragRate));
                this.modelStoreHouse.footerHeight = this.footerHeight;
                this.scrollHeight = this.columnAreaChangeHeight - this.footerHeight;
                this.footerHeightPercentage = (this.footerHeight / this.columnAreaChangeHeight * 100) + "%";
                this.scrollHeightPercentage = (this.scrollHeight / this.columnAreaChangeHeight * 100) + "%";
                this.modelStoreHouse.refreshState = SmartRefreshForStoreHouseSample.REFRESHSTATE.TOREFRESH;
            }
            if (this.modelStoreHouse.refreshState == SmartRefreshForStoreHouseSample.REFRESHSTATE.REFRESHING && dragOffsetY > 0) { //刷新状态下拉
                this.footerHeight = this.modelStoreHouse.initFooterHeight + (Math.pow(dragOffsetY, this.modelStoreHouse.dragRate));
                this.modelStoreHouse.footerHeight = this.footerHeight;
            }
        }
    }
    dragUpDirection_UP(downYOffsetParam: number) {
        if (this.modelStoreHouse.refreshState != SmartRefreshForStoreHouseSample.REFRESHSTATE.NONE) {
            if (this.modelStoreHouse.refreshState == SmartRefreshForStoreHouseSample.REFRESHSTATE.TOREFRESH) {
                if (downYOffsetParam <= (this.modelStoreHouse.initFooterHeight * this.modelStoreHouse.footerTriggerRate)) { //未下滑到指定位置则不刷新
                    this.footerIsVisibleLoadMore = false; //小于尾部固定高度时，则隐藏尾部
                    this.refreshClose(SmartRefreshForStoreHouseSample.LOCATION.HEAD);
                    this.footerHeight = 0;
                    this.modelStoreHouse.footerHeight = this.footerHeight;
                    this.footerHeightPercentage = "0%";
                    this.scrollHeightPercentage = "100%";
                }
                else {
                    this.footerHeight = this.modelStoreHouse.initFooterHeight; //重置尾部高度
                    this.modelStoreHouse.footerHeight = this.footerHeight;
                    this.footerHeightPercentage = (this.footerHeight / this.columnAreaChangeHeight * 100) + "%";
                    this.scrollHeightPercentage = ((this.columnAreaChangeHeight - this.footerHeight) / this.columnAreaChangeHeight * 100) + "%";
                    this.needScroller = true;
                    this.modelStoreHouse.refreshState = SmartRefreshForStoreHouseSample.REFRESHSTATE.REFRESHING; //更改为刷新态
                    if (this.modelStoreHouse.refreshTimeOut == 0) {
                        if (this.modelStoreHouse.getRefreshFinishStopDuration() > 0) { //刷新结束过后停留的时间
                            setTimeout(() => {
                                this.modelStoreHouse.refreshState = SmartRefreshForStoreHouseSample.REFRESHSTATE.REFRESHFINISH;
                            }, this.modelStoreHouse.refreshDuration);
                        }
                        this.modelStoreHouse.refreshTimeOut = setTimeout(() => {
                            this.footerIsVisibleLoadMore = false;
                            this.refreshClose(SmartRefreshForStoreHouseSample.LOCATION.HEAD);
                            this.modelStoreHouse.refreshTimeOut = 0;
                            this.modelStoreHouse.lastRefreshTime = new Date();
                            this.closeFooterRefresh();
                            this.modelStoreHouse.refreshBottomDataCallback();
                        }, this.modelStoreHouse.refreshDuration + this.modelStoreHouse.getRefreshFinishStopDuration());
                    }
                }
            }
            else if (this.modelStoreHouse.refreshState == SmartRefreshForStoreHouseSample.REFRESHSTATE.REFRESHING) {
                this.footerHeight = this.modelStoreHouse.initFooterHeight; //重置尾部高度
                this.modelStoreHouse.footerHeight = this.footerHeight;
            }
        }
    }
    //滚动结束，关闭刷新
    closeHeaderRefresh() {
        this.headerHeight = 0;
        this.modelStoreHouse.headerHeight = 0;
        this.modelStoreHouse.refreshHeaderCallbackState = true;
        this.modelStoreHouse.refreshBottomCallbackState = false;
        this.scrollerIsEnableRollWhenRefreshing = true; //结束刷新，设置scroll可以滚动
        clearInterval(this.modelStoreHouse.headerRefreshId);
        this.modelStoreHouse.headerRefreshId = -1;
    }
    closeFooterRefresh() {
        this.footerHeight = 0;
        this.modelStoreHouse.footerHeight = this.footerHeight;
        this.footerHeightPercentage = "0%";
        this.scrollHeightPercentage = "100%";
        this.modelStoreHouse.refreshHeaderCallbackState = false;
        this.modelStoreHouse.refreshBottomCallbackState = true;
        this.scrollerIsEnableRollWhenRefreshing = true;
        clearInterval(this.modelStoreHouse.bottomRefreshId);
        this.modelStoreHouse.bottomRefreshId = 0;
    }
}
namespace SmartRefreshForStoreHouseSample {
    export enum LOCATION {
        HEAD = 0,
        MIDDER = 1,
        FOOT = 2
    }
    export enum REFRESHSTATE {
        NONE = 0,
        TOREFRESH = 1,
        REFRESHING = 2,
        REFRESHFINISH = 3
    }
    export enum RefreshPositionEnum {
        TOP = 0,
        BOTTOM = 1,
        TOPANDBOTTOM = 2
    }
    export enum ClassicsSpinnerStyleEnum {
        //变换样式：Translate(平行移动 底部)、Scale（拉伸形变）、FixedBehind（固定在背后固定于顶部）
        TRANSLATE = 0,
        SCALE = 1,
        FIXEDBEHIND = 2
    }
    export class Model {
        scroller: Scroller = new Scroller();
        headerHeight: number = 10; //实际头部高度
        initHeaderHeight: number = 200; //标准头部高度
        downY: number = 0;
        currentMouseX: number = 0; //获取下拉中鼠标的X轴坐标
        scrollLocation: LOCATION = LOCATION.HEAD;
        refreshDuration: number = 5000; //刷新态持续时间
        toRefreshDuration: number = 250;
        refreshTimeOut: number = 0;
        refreshInterval: number = 0;
        initRefreshing: boolean = true;
        latestYOffset: number = 0;
        refreshState: REFRESHSTATE = REFRESHSTATE.NONE; //刷新状态
        zHeaderIndex: number = 2; //首部zIndex
        zMainIndex: number = 2;
        zFooterIndex: number = 2;
        backgroundColor: Color | string | number = Color.Gray; //主题色
        accentColor: Color = Color.White; //内容颜色
        lastRefreshTime: Date = new Date(); //上次刷新时间
        refreshHeaderDataCallback: () => void = () => { }; //刷新头部数据回调
        refreshBottomDataCallback: () => void = () => { }; //刷新头部数据回调
        refreshHeaderCallback: () => void = () => { }; //刷新时的回调
        refreshHeaderCallbackState: boolean = true;
        refreshBottomCallback: () => void = () => { }; //刷新时的回调
        refreshBottomCallbackState: boolean = false;
        disableContentWhenRefresh: boolean = false; //下拉过程是否支持列表滚动
        disableContentWhenLoading: boolean = false; //上拉过程是否支持列表滚动
        enableLoadMoreWhenContentNotFull: boolean = false; //在内容不满一页的时候，是否可以上拉加载更多
        headerTriggerRate: number = 1;
        refreshFinishStopDuration: number = 1000;
        enableScrollContentWhenLoaded: boolean = true; //是否在加载完成之后滚动内容显示新数据
        //waveSwipe
        downYOffset = 0;
        fixedContent: boolean = true;
        oldFixedContent: boolean = true;
        //classics
        classicsSpinnerStyle: ClassicsSpinnerStyleEnum = ClassicsSpinnerStyleEnum.FIXEDBEHIND;
        drawableSize: number = 100;
        drawableArrow: boolean = true;
        drawableArrowSize: number = 100;
        drawableProgress: boolean = true;
        drawableProgressSize: number = 50;
        drawableMarginRight: number = 130;
        timeShowState: boolean = true;
        headerRefreshId: number = 0;
        bottomRefreshId: number = 0;
        backgroundShadowColor: Color = Color.Gray;
        refreshHeaderPullDown: string = "下拉刷新";
        refreshHeaderRelease: string = "释放刷新";
        refreshHeaderRefreshing: string = "正在刷新";
        refreshHeaderRefreshFinish: string = "完成刷新";
        refreshHeaderFailed: string = "刷新失败";
        textSizeTitle: number = 30; //标题文字大小
        textSizeTime: number = 22; //设置时间文字大小
        textTimeMarginTop: number = 10; //设置上边距
        //storeHouse
        textColor: Color = Color.Red;
        //materialRefresh
        progressBackgroundColorSchemeResource: Color[] = [Color.Blue, Color.Red, Color.Green];
        //bottom
        footerHeight: number = 210; //实际头部高度
        initFooterHeight: number = 210;
        firstArriveBottomEdgeOffsetY: number = 0;
        dragArriveBottomEdgeState: boolean = true;
        dragDirection: boolean = true; //true：下拉  false上拉
        initScrollerYOffset: number = 0;
        tempTitleHeight: number = this.initHeaderHeight;
        tempDownY: number = -1;
        titleName: string = '';
        expand: boolean = false;
        flyRefreshHeaderIsShow: boolean = false;
        scrollerEndYOffset: number = 0; //和scrollerEndState结合使用
        scrollerEndState: boolean = false; //和scrollerEndYOffset结合使用
        srlHeaderInsetStart: number = 0; //Header的起始偏移量
        srlFooterInsetStart: number = 0; //Footer的起始偏移量
        enableRefresh: boolean = true; //是否开启下拉刷新功能（默认true）
        enableLoadMore: boolean = true; //是否开启上拉加载功能（默认true）
        dragRate: number = 0.8; //显示拖动高度/真实拖动高度（默认0.5，阻尼效果）
        headerMaxDragRate: number = 0.8; //阻尼效果（默认0.8，要求<=1）
        footerMaxDragRate: number = 0.8; //Footer阻尼效果（默认0.8，要求<=1）
        //bottomClassics
        classicsBottomSpinnerStyle: ClassicsSpinnerStyleEnum = ClassicsSpinnerStyleEnum.FIXEDBEHIND;
        classicsBottomDrawableArrow: boolean = true;
        classicsBottomDrawableSize: number = 100;
        classicsBottomDrawableArrowSize: number = 100;
        classicsBottomDrawableMarginRight: number = 130;
        classicsBottomRefreshPullDown: string = "上拉刷新";
        classicsBottomRefreshRelease: string = "释放刷新";
        classicsBottomRefreshRefreshing: string = "正在刷新";
        classicsBottomRefreshFailed: string = "刷新失败";
        classicsBottomTextSizeTitle: number = 30; //标题文字大小
        classicsBottomTextSizeTime: number = 22; //设置时间文字大小
        classicsBottomAccentColor: Color = Color.White;
        footerTriggerRate: number = 1;
        refreshPosition: RefreshPositionEnum = RefreshPositionEnum.TOPANDBOTTOM;
        headerIsRefresh: boolean = true;
        footerIsRefresh: boolean = true;
        demand: string = "E";
        color: string = "#000000";
        setColor(color: string): Model {
            this.color = color;
            return this;
        }
        getColor(): string {
            return this.color;
        }
        setDemand(demand: string): Model {
            this.demand = demand;
            return this;
        }
        getDemand(): string {
            return this.demand;
        }
        setEnableScrollContentWhenLoaded(enableScrollContentWhenLoaded: boolean): Model {
            this.enableScrollContentWhenLoaded = enableScrollContentWhenLoaded;
            return this;
        }
        setRefreshFinishStopDuration(refreshFinishStopDuration: number): Model {
            this.refreshFinishStopDuration = refreshFinishStopDuration;
            return this;
        }
        getRefreshFinishStopDuration(): number {
            return this.refreshFinishStopDuration;
        }
        setHeaderTriggerRate(headerTriggerRate: number): Model {
            this.headerTriggerRate = headerTriggerRate;
            return this;
        }
        setFooterTriggerRate(footerTriggerRate: number): Model {
            this.footerTriggerRate = footerTriggerRate;
            return this;
        }
        setClassicsBottomAccentColor(classicsBottomAccentColor: Color): Model {
            this.classicsBottomAccentColor = classicsBottomAccentColor;
            return this;
        }
        getClassicsBottomAccentColor(): Color {
            return this.classicsBottomAccentColor;
        }
        setClassicsBottomSpinnerStyle(classicsBottomSpinnerStyle: ClassicsSpinnerStyleEnum): Model {
            this.classicsBottomSpinnerStyle = classicsBottomSpinnerStyle;
            return this;
        }
        setClassicsBottomDrawableArrow(classicsBottomDrawableArrow: boolean): Model {
            this.classicsBottomDrawableArrow = classicsBottomDrawableArrow;
            return this;
        }
        getClassicsBottomDrawableArrow(): boolean {
            return this.classicsBottomDrawableArrow;
        }
        setClassicsBottomDrawableSize(classicsBottomDrawableSize: number): Model {
            this.classicsBottomDrawableSize = classicsBottomDrawableSize;
            return this;
        }
        setClassicsBottomDrawableArrowSize(classicsBottomDrawableArrowSize: number): Model {
            this.classicsBottomDrawableArrowSize = classicsBottomDrawableArrowSize;
            return this;
        }
        setClassicsBottomDrawableMarginRight(classicsBottomDrawableMarginRight: number): Model {
            this.classicsBottomDrawableMarginRight = classicsBottomDrawableMarginRight;
            return this;
        }
        setRefreshFooterPullDown(classicsBottomRefreshPullDown: string): Model {
            this.classicsBottomRefreshPullDown = classicsBottomRefreshPullDown;
            return this;
        }
        setRefreshFooterRelease(classicsBottomRefreshRelease: string): Model {
            this.classicsBottomRefreshRelease = classicsBottomRefreshRelease;
            return this;
        }
        setRefreshFooterRefreshing(classicsBottomRefreshRefreshing: string): Model {
            this.classicsBottomRefreshRefreshing = classicsBottomRefreshRefreshing;
            return this;
        }
        setFefreshFooterFailed(classicsBottomRefreshFailed: string): Model {
            this.classicsBottomRefreshFailed = classicsBottomRefreshFailed;
            return this;
        }
        setFooterTextSizeTitle(classicsBottomTextSizeTitle: number): Model {
            this.classicsBottomTextSizeTitle = classicsBottomTextSizeTitle;
            return this;
        }
        setFooterTextSizeTime(classicsBottomTextSizeTime: number): Model {
            this.classicsBottomTextSizeTime = classicsBottomTextSizeTime;
            return this;
        }
        setEnableLoadMoreWhenContentNotFull(enableLoadMoreWhenContentNotFull: boolean): Model {
            this.enableLoadMoreWhenContentNotFull = enableLoadMoreWhenContentNotFull;
            return this;
        }
        getEnableLoadMoreWhenContentNotFull(): boolean {
            return this.enableLoadMoreWhenContentNotFull;
        }
        setDisableContentWhenRefresh(disableContentWhenRefresh: boolean): Model {
            this.disableContentWhenRefresh = disableContentWhenRefresh;
            return this;
        }
        getDisableContentWhenRefresh(): boolean {
            return this.disableContentWhenRefresh;
        }
        setDisableContentWhenLoading(disableContentWhenLoading: boolean): Model {
            this.disableContentWhenLoading = disableContentWhenLoading;
            return this;
        }
        getDisableContentWhenLoading(): boolean {
            return this.disableContentWhenLoading;
        }
        setDrawableArrowSize(drawableArrowSize: number): Model {
            if (this.drawableSize < this.drawableArrowSize) {
                this.drawableArrowSize = this.drawableSize;
            }
            else {
                this.drawableArrowSize = drawableArrowSize;
            }
            return this;
        }
        setDrawableSize(drawableSize: number): Model {
            this.drawableSize = drawableSize;
            return this;
        }
        setDrawableArrow(drawableArrow: boolean): Model {
            this.drawableArrow = drawableArrow;
            return this;
        }
        getDrawableArrow(): boolean {
            return this.drawableArrow;
        }
        setDrawableProgress(drawableProgress: boolean): Model {
            this.drawableProgress = drawableProgress;
            return this;
        }
        getDrawableProgress(): boolean {
            return this.drawableProgress;
        }
        setDrawableProgressSize(drawableProgressSize: number): Model {
            this.drawableProgressSize = drawableProgressSize;
            return this;
        }
        setClassicsSpinnerStyle(classicsSpinnerStyle: ClassicsSpinnerStyleEnum): Model {
            this.classicsSpinnerStyle = classicsSpinnerStyle;
            return this;
        }
        setDrawableMarginRight(drawableMarginRight: number): Model {
            this.drawableMarginRight = drawableMarginRight;
            return this;
        }
        getDrawableMarginRight(): number {
            return this.drawableMarginRight;
        }
        setAccentColor(accentColor: Color): Model {
            this.accentColor = accentColor;
            return this;
        }
        getAccentColor(): Color {
            return this.accentColor;
        }
        setProgressBackgroundColorSchemeResource(resource: Color[]): Model {
            this.progressBackgroundColorSchemeResource = resource;
            return this;
        }
        setTextColor(textColor: Color): Model {
            this.textColor = textColor;
            return this;
        }
        setTextTimeMarginTop(textTimeMarginTop: number): Model {
            this.textTimeMarginTop = textTimeMarginTop;
            return this;
        }
        setTextSizeTitle(textSizeTitle: number): Model {
            this.textSizeTitle = textSizeTitle;
            return this;
        }
        setTextSizeTime(textSizeTime: number): Model {
            this.textSizeTime = textSizeTime;
            return this;
        }
        setRefreshHeaderRelease(refreshHeaderRelease: string): Model {
            this.refreshHeaderRelease = refreshHeaderRelease;
            return this;
        }
        setRefreshHeaderPullDown(refreshHeaderPullDown: string): Model {
            this.refreshHeaderPullDown = refreshHeaderPullDown;
            return this;
        }
        setRefreshHeaderRefreshing(refreshHeaderRefreshing: string): Model {
            this.refreshHeaderRefreshing = refreshHeaderRefreshing;
            return this;
        }
        setRefreshHeaderRefreshFinish(refreshHeaderRefreshFinish: string): Model {
            this.refreshHeaderRefreshFinish = refreshHeaderRefreshFinish;
            return this;
        }
        setRefreshHeaderFailed(refreshHeaderFailed: string): Model {
            this.refreshHeaderFailed = refreshHeaderFailed;
            return this;
        }
        setDragRate(dragRate: number): Model {
            if (this.headerMaxDragRate <= dragRate) {
                dragRate = this.headerMaxDragRate;
            }
            this.dragRate = dragRate;
            return this;
        }
        setHeaderMaxDragRate(headerDragRate: number): Model {
            if (1 <= headerDragRate) {
                headerDragRate = 1;
            }
            this.headerMaxDragRate = headerDragRate;
            return this;
        }
        setFooterMaxDragRate(footerDragRate: number): Model {
            if (1 <= footerDragRate) {
                footerDragRate = 1;
            }
            this.footerMaxDragRate = footerDragRate;
            return this;
        }
        setReboundDuration(duration: number): Model {
            this.refreshDuration = duration;
            return this;
        }
        setEnableRefresh(enableRefresh: boolean): Model {
            this.enableRefresh = enableRefresh;
            return this;
        }
        getEnableRefresh(): boolean {
            return this.enableRefresh;
        }
        setEnableLoadMore(enableLoadMore: boolean): Model {
            this.enableLoadMore = enableLoadMore;
            return this;
        }
        getEnableLoadMore(): boolean {
            return this.enableLoadMore;
        }
        setSrlHeaderInsetStart(srlHeaderInsetStart: number): Model {
            this.srlHeaderInsetStart = srlHeaderInsetStart;
            return this;
        }
        getSrlHeaderInsetStart(): number {
            return this.srlHeaderInsetStart;
        }
        setSrlFooterInsetStart(srlFooterInsetStart: number): Model {
            this.srlFooterInsetStart = srlFooterInsetStart;
            return this;
        }
        getSrlFooterInsetStart(): number {
            return this.srlFooterInsetStart;
        }
        isFinishRefresh(): boolean {
            return this.refreshState == REFRESHSTATE.REFRESHING ? true : false;
        }
        getState(): REFRESHSTATE {
            return this.refreshState;
        }
        isFinishLoadMore(): REFRESHSTATE {
            return this.refreshState;
        }
        getDownYOffset(): number {
            return this.downYOffset;
        }
        setExpand(expand: boolean): Model {
            this.expand = expand;
            return this;
        }
        setTitleName(titleName: string): Model {
            this.titleName = titleName;
            return this;
        }
        setZHeaderIndex(zHeaderIndex: number): Model {
            this.zHeaderIndex = zHeaderIndex;
            return this;
        }
        setZFooterHeight(zFooterIndex: number): Model {
            this.zFooterIndex = zFooterIndex;
            return this;
        }
        setZMainIndex(zMainIndex: number): Model {
            this.zMainIndex = zMainIndex;
            return this;
        }
        setFooterHeight(footerHeight: number): Model {
            this.footerHeight = footerHeight;
            return this;
        }
        setCurrentMouseX(currentMouseX: number): Model {
            this.currentMouseX = currentMouseX;
            return this;
        }
        getCurrentMouseX(): number {
            return this.currentMouseX;
        }
        getBackgroundShadowColor(): Color {
            return this.backgroundShadowColor;
        }
        setBackgroundShadowColor(backgroundShadowColor: Color): Model {
            this.backgroundShadowColor = backgroundShadowColor;
            return this;
        }
        getHeaderRefreshId(): number {
            return this.headerRefreshId;
        }
        setHeaderRefreshId(headerRefreshId: number): Model {
            this.headerRefreshId = headerRefreshId;
            return this;
        }
        getBottomRefreshId(): number {
            return this.bottomRefreshId;
        }
        setBottomRefreshId(bottomRefreshId: number): Model {
            this.bottomRefreshId = bottomRefreshId;
            return this;
        }
        getTimeShowState(): boolean {
            return this.timeShowState;
        }
        setTimeShowState(timeShowState: boolean): Model {
            this.timeShowState = timeShowState;
            return this;
        }
        getRefreshPosition(): RefreshPositionEnum {
            return this.refreshPosition;
        }
        setRefreshPosition(refreshPosition: RefreshPositionEnum): Model {
            this.refreshPosition = refreshPosition;
            if (this.refreshPosition.valueOf() == 0) {
                this.headerIsRefresh = true;
                this.footerIsRefresh = false;
            }
            if (this.refreshPosition.valueOf() == 1) {
                this.headerIsRefresh = false;
                this.footerIsRefresh = true;
            }
            if (this.refreshPosition.valueOf() == 2) {
                this.headerIsRefresh = true;
                this.footerIsRefresh = true;
            }
            return this;
        }
        getFixedContent(): boolean {
            return this.fixedContent;
        }
        setFixedContent(fixedContent: boolean): Model {
            this.fixedContent = fixedContent;
            return this;
        }
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
        setBackgroundColor(color: Color | string | number): Model {
            this.backgroundColor = color;
            return this;
        }
        setRefreshHeaderDataCallback(callback: () => void): Model {
            this.refreshHeaderDataCallback = callback;
            return this;
        }
        setRefreshBottomDataCallback(callback: () => void): Model {
            this.refreshBottomDataCallback = callback;
            return this;
        }
        setRefreshHeaderCallback(callback: () => void): Model {
            this.refreshHeaderCallback = callback;
            return this;
        }
        setRefreshBottomCallback(callback: () => void): Model {
            this.refreshBottomCallback = callback;
            return this;
        }
        getBackgroundColor(): Color | string | number {
            return this.backgroundColor;
        }
        setNoInit(initRefreshing: boolean): Model {
            this.initRefreshing = initRefreshing;
            return this;
        }
        setToRefreshDuration(toRefreshDuration: number): Model {
            this.toRefreshDuration = toRefreshDuration;
            return this;
        }
        getToRefreshDuration(): number {
            return this.toRefreshDuration;
        }
        setRefreshDuration(refreshDuration: number): Model {
            this.refreshDuration = refreshDuration;
            return this;
        }
        getRefreshDuration(): number {
            return this.refreshDuration;
        }
        setInitFooterHeight(initFooterHeight: number): Model {
            this.initFooterHeight = initFooterHeight;
            return this;
        }
        getInitFooterHeight(): number {
            return this.initFooterHeight;
        }
        setInitHeaderHeight(initHeaderHeight: number): Model {
            this.initHeaderHeight = initHeaderHeight;
            return this;
        }
        getInitHeaderHeight(): number {
            return this.initHeaderHeight;
        }
        setHeaderHeight(headerHeight: number): Model {
            this.headerHeight = headerHeight;
            return this;
        }
        getHeaderHeight(): number {
            return this.headerHeight;
        }
    }
}
export default SmartRefreshForStoreHouseSample;
