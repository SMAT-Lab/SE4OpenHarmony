interface SimpleSwipe_Params {
    simpleWidth?: number;
    simpleHeight?: number;
    simpleRoadWidth?: number;
    simpleBlockPosLeft?: number;
    simpleStartRealXBias?: number;
    simpleStartRealYBias?: number;
    simpleBlockWidth?: number;
    simpleBlockHeight?: number;
    simpleStartTime?: number;
    simpleEndTime?: number;
    simpleVerifyThreshold?: number;
    simpleSlideColor?: string;
    resultVisibility_true?: Visibility;
    resultVisibility_false?: Visibility;
    simpleTextVisibility?: Visibility;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "simpleSwipe_" + ++__generate__Id;
}
export class SimpleSwipe extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__simpleWidth = new ObservedPropertySimple(325, this, "simpleWidth");
        this.__simpleHeight = new ObservedPropertySimple(100, this, "simpleHeight");
        this.__simpleRoadWidth = new ObservedPropertySimple(280, this, "simpleRoadWidth");
        this.__simpleBlockPosLeft = new ObservedPropertySimple(0, this, "simpleBlockPosLeft");
        this.__simpleStartRealXBias = new ObservedPropertySimple(0, this, "simpleStartRealXBias");
        this.__simpleStartRealYBias = new ObservedPropertySimple(0, this, "simpleStartRealYBias");
        this.__simpleBlockWidth = new ObservedPropertySimple(50, this, "simpleBlockWidth");
        this.__simpleBlockHeight = new ObservedPropertySimple(50, this, "simpleBlockHeight");
        this.__simpleStartTime = new ObservedPropertySimple(0, this, "simpleStartTime");
        this.__simpleEndTime = new ObservedPropertySimple(0, this, "simpleEndTime");
        this.__simpleVerifyThreshold = new ObservedPropertySimple(0.8, this, "simpleVerifyThreshold");
        this.__simpleSlideColor = new ObservedPropertySimple('#7798DD', this, "simpleSlideColor");
        this.__resultVisibility_true = new ObservedPropertySimple(Visibility.Hidden, this, "resultVisibility_true");
        this.__resultVisibility_false = new ObservedPropertySimple(Visibility.Hidden, this, "resultVisibility_false");
        this.__simpleTextVisibility = new ObservedPropertySimple(Visibility.Visible, this, "simpleTextVisibility");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SimpleSwipe_Params) {
        if (params.simpleWidth !== undefined) {
            this.simpleWidth = params.simpleWidth;
        }
        if (params.simpleHeight !== undefined) {
            this.simpleHeight = params.simpleHeight;
        }
        if (params.simpleRoadWidth !== undefined) {
            this.simpleRoadWidth = params.simpleRoadWidth;
        }
        if (params.simpleBlockPosLeft !== undefined) {
            this.simpleBlockPosLeft = params.simpleBlockPosLeft;
        }
        if (params.simpleStartRealXBias !== undefined) {
            this.simpleStartRealXBias = params.simpleStartRealXBias;
        }
        if (params.simpleStartRealYBias !== undefined) {
            this.simpleStartRealYBias = params.simpleStartRealYBias;
        }
        if (params.simpleBlockWidth !== undefined) {
            this.simpleBlockWidth = params.simpleBlockWidth;
        }
        if (params.simpleBlockHeight !== undefined) {
            this.simpleBlockHeight = params.simpleBlockHeight;
        }
        if (params.simpleStartTime !== undefined) {
            this.simpleStartTime = params.simpleStartTime;
        }
        if (params.simpleEndTime !== undefined) {
            this.simpleEndTime = params.simpleEndTime;
        }
        if (params.simpleVerifyThreshold !== undefined) {
            this.simpleVerifyThreshold = params.simpleVerifyThreshold;
        }
        if (params.simpleSlideColor !== undefined) {
            this.simpleSlideColor = params.simpleSlideColor;
        }
        if (params.resultVisibility_true !== undefined) {
            this.resultVisibility_true = params.resultVisibility_true;
        }
        if (params.resultVisibility_false !== undefined) {
            this.resultVisibility_false = params.resultVisibility_false;
        }
        if (params.simpleTextVisibility !== undefined) {
            this.simpleTextVisibility = params.simpleTextVisibility;
        }
    }
    aboutToBeDeleted() {
        this.__simpleWidth.aboutToBeDeleted();
        this.__simpleHeight.aboutToBeDeleted();
        this.__simpleRoadWidth.aboutToBeDeleted();
        this.__simpleBlockPosLeft.aboutToBeDeleted();
        this.__simpleStartRealXBias.aboutToBeDeleted();
        this.__simpleStartRealYBias.aboutToBeDeleted();
        this.__simpleBlockWidth.aboutToBeDeleted();
        this.__simpleBlockHeight.aboutToBeDeleted();
        this.__simpleStartTime.aboutToBeDeleted();
        this.__simpleEndTime.aboutToBeDeleted();
        this.__simpleVerifyThreshold.aboutToBeDeleted();
        this.__simpleSlideColor.aboutToBeDeleted();
        this.__resultVisibility_true.aboutToBeDeleted();
        this.__resultVisibility_false.aboutToBeDeleted();
        this.__simpleTextVisibility.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    //组件宽高
    private __simpleWidth: ObservedPropertySimple<number>;
    get simpleWidth() {
        return this.__simpleWidth.get();
    }
    set simpleWidth(newValue: number) {
        this.__simpleWidth.set(newValue);
    }
    private __simpleHeight: ObservedPropertySimple<number>;
    get simpleHeight() {
        return this.__simpleHeight.get();
    }
    set simpleHeight(newValue: number) {
        this.__simpleHeight.set(newValue);
    }
    //滑轨宽度
    private __simpleRoadWidth: ObservedPropertySimple<number>;
    get simpleRoadWidth() {
        return this.__simpleRoadWidth.get();
    }
    set simpleRoadWidth(newValue: number) {
        this.__simpleRoadWidth.set(newValue);
    }
    //滑块的动态位置
    private __simpleBlockPosLeft: ObservedPropertySimple<number>;
    get simpleBlockPosLeft() {
        return this.__simpleBlockPosLeft.get();
    }
    set simpleBlockPosLeft(newValue: number) {
        this.__simpleBlockPosLeft.set(newValue);
    }
    //触摸开始的实际位置
    private __simpleStartRealXBias: ObservedPropertySimple<number>; //X轴
    get simpleStartRealXBias() {
        return this.__simpleStartRealXBias.get();
    }
    set simpleStartRealXBias(newValue: number) {
        this.__simpleStartRealXBias.set(newValue);
    }
    private __simpleStartRealYBias: ObservedPropertySimple<number>; //Y轴
    get simpleStartRealYBias() {
        return this.__simpleStartRealYBias.get();
    }
    set simpleStartRealYBias(newValue: number) {
        this.__simpleStartRealYBias.set(newValue);
    }
    //滑块宽高
    private __simpleBlockWidth: ObservedPropertySimple<number>;
    get simpleBlockWidth() {
        return this.__simpleBlockWidth.get();
    }
    set simpleBlockWidth(newValue: number) {
        this.__simpleBlockWidth.set(newValue);
    }
    private __simpleBlockHeight: ObservedPropertySimple<number>;
    get simpleBlockHeight() {
        return this.__simpleBlockHeight.get();
    }
    set simpleBlockHeight(newValue: number) {
        this.__simpleBlockHeight.set(newValue);
    }
    //时间戳信息
    private __simpleStartTime: ObservedPropertySimple<number>;
    get simpleStartTime() {
        return this.__simpleStartTime.get();
    }
    set simpleStartTime(newValue: number) {
        this.__simpleStartTime.set(newValue);
    }
    private __simpleEndTime: ObservedPropertySimple<number>;
    get simpleEndTime() {
        return this.__simpleEndTime.get();
    }
    set simpleEndTime(newValue: number) {
        this.__simpleEndTime.set(newValue);
    }
    //偏差阈值，进度超过80%通过
    private __simpleVerifyThreshold: ObservedPropertySimple<number>;
    get simpleVerifyThreshold() {
        return this.__simpleVerifyThreshold.get();
    }
    set simpleVerifyThreshold(newValue: number) {
        this.__simpleVerifyThreshold.set(newValue);
    }
    //已经滑过区域的颜色
    private __simpleSlideColor: ObservedPropertySimple<string>;
    get simpleSlideColor() {
        return this.__simpleSlideColor.get();
    }
    set simpleSlideColor(newValue: string) {
        this.__simpleSlideColor.set(newValue);
    }
    //验证结果的可见性
    private __resultVisibility_true: ObservedPropertySimple<Visibility>;
    get resultVisibility_true() {
        return this.__resultVisibility_true.get();
    }
    set resultVisibility_true(newValue: Visibility) {
        this.__resultVisibility_true.set(newValue);
    }
    private __resultVisibility_false: ObservedPropertySimple<Visibility>;
    get resultVisibility_false() {
        return this.__resultVisibility_false.get();
    }
    set resultVisibility_false(newValue: Visibility) {
        this.__resultVisibility_false.set(newValue);
    }
    //提示文字的可见性
    private __simpleTextVisibility: ObservedPropertySimple<Visibility>;
    get simpleTextVisibility() {
        return this.__simpleTextVisibility.get();
    }
    set simpleTextVisibility(newValue: Visibility) {
        this.__simpleTextVisibility.set(newValue);
    }
    // 自定义拖拽过程中显示的内容
    Builder(parent = null) {
        Button.createWithChild({ type: ButtonType.Normal });
        Button.visibility(Visibility.Hidden);
        __Button__swipeBtn();
        Button.touchable(true);
        Button.position({
            x: this.simpleBlockPosLeft, //当该参数被修改时，滑块位置也动态修改
        });
        Button.zIndex(10);
        Image.create({ "id": 0, "type": 30000, params: ["SwipeCaptcha_swipeicon.png"] });
        Image.width(20);
        Button.pop();
    }
    render() {
        /*滑轨*/
        Stack.create({ alignContent: Alignment.Center });
        __Stack__swipeStack();
        Row.create();
        __Row__swipeRoad();
        Row.onDragEnter((event: DragEvent, extraParams: string) => {
            console.log('【simpleSwipe】onDragEnter');
        });
        Row.onDragMove((event: DragEvent, extraParams: String) => {
            let curX = event.getX();
            console.log("【simpleSwipe】Moving...");
            // 改变滑块位置且确保不越界
            if (curX <= this.simpleStartRealXBias) {
                this.simpleBlockPosLeft = 0;
            }
            else if (curX >= this.simpleRoadWidth - this.simpleBlockWidth) {
                this.simpleBlockPosLeft = this.simpleRoadWidth - this.simpleBlockWidth;
            }
            else {
                (curX - this.simpleStartRealXBias) > this.simpleRoadWidth - this.simpleBlockWidth ? this.simpleBlockPosLeft = this.simpleRoadWidth - this.simpleBlockWidth : this.simpleBlockPosLeft = (curX - this.simpleStartRealXBias);
            }
            if (this.simpleBlockPosLeft > this.simpleRoadWidth - this.simpleBlockWidth)
                this.simpleBlockPosLeft = this.simpleRoadWidth - this.simpleBlockWidth;
            console.log("【simpleSwipe】curX = " + curX + "\t simpleStartRealXBias = " + this.simpleStartRealXBias + "\t simpleBlockPosLeft = " + this.simpleBlockPosLeft);
        });
        Row.onDragLeave((event: DragEvent, extraParams: string) => {
            console.log("【simpleSwipe】Leave!");
            this.simpleBlockPosLeft = 0;
        });
        Row.onDrop((event: DragEvent, extraParams: string) => {
            console.log("【simpleSwipe】Drop！");
            //获取滑动结束时间,以计算验证用时
            this.simpleEndTime = Date.now();
            //检查滑块位置进行验证并显示验证结果
            if (this.simpleBlockPosLeft >= (this.simpleRoadWidth - this.simpleBlockWidth) * this.simpleVerifyThreshold) {
                //验证成功
                this.simpleSlideColor = '#008000';
                this.simpleTextVisibility = Visibility.Hidden;
                this.resultVisibility_true = Visibility.Visible;
            }
            else {
                //验证失败
                this.simpleSlideColor = '#fe0000';
                this.simpleTextVisibility = Visibility.Hidden;
                this.resultVisibility_false = Visibility.Visible;
            }
            //重置页面
            setTimeout(() => {
                this.simpleSlideColor = '#7798DD';
                this.simpleTextVisibility = Visibility.Visible;
                this.resultVisibility_false = Visibility.Hidden;
                this.resultVisibility_true = Visibility.Hidden;
                this.simpleBlockPosLeft = 0;
            }, 1500);
        });
        Column.create();
        Column.width("100%");
        Stack.create({ alignContent: Alignment.Start });
        Stack.width(280);
        /*滑块*/
        Button.createWithChild({ type: ButtonType.Normal });
        __Button__swipeBtn();
        /*滑块*/
        Button.touchable(true);
        /*滑块*/
        Button.onDragStart((event: DragEvent, extraParams: String) => {
            this.simpleStartTime = Date.now(); //获取的当前时间会转换成距离某个时间有多少毫秒，即返回number类型
            //获取当前真实位置
            this.simpleStartRealXBias = event.getX();
            this.simpleStartRealYBias = event.getY();
            //控制台输出信息，方便调试
            console.log("【simpleSwipe】滑块初始真实位置：[" + this.simpleStartRealXBias + ", " + this.simpleStartRealYBias + "] \t【simpleSwipe】 开始滑动时的时间：" + this.simpleStartTime);
            return { builder: () => {
                    this.Builder.call(this);
                } };
        });
        /*滑块*/
        Button.position({
            x: this.simpleBlockPosLeft, //当该参数被修改时，滑块位置也动态修改
        });
        /*滑块*/
        Button.zIndex(10);
        Image.create({ "id": 0, "type": 30000, params: ["SwipeCaptcha_swipeicon.png"] });
        Image.width(20);
        /*滑块*/
        Button.pop();
        /*已经划过的区域*/
        Text.create();
        /*已经划过的区域*/
        Text.height('50');
        /*已经划过的区域*/
        Text.width(this.simpleBlockPosLeft + this.simpleBlockWidth / 2);
        /*已经划过的区域*/
        Text.borderRadius(5);
        /*已经划过的区域*/
        Text.backgroundColor(this.simpleSlideColor);
        /*已经划过的区域*/
        Text.zIndex(5);
        /*已经划过的区域*/
        Text.pop();
        /*滑轨提示文字*/
        Text.create("滑动完成验证");
        __Text__swipeText();
        /*滑轨提示文字*/
        Text.visibility(this.simpleTextVisibility);
        /*滑轨提示文字*/
        Text.pop();
        //验证结果
        Text.create('验证成功,用时' + (this.simpleEndTime - this.simpleStartTime) / 1000 + 's');
        __Text__swipeText();
        //验证结果
        Text.fontColor(Color.White);
        //验证结果
        Text.zIndex(6);
        //验证结果
        Text.visibility(this.resultVisibility_true);
        //验证结果
        Text.pop();
        Text.create('验证失败！');
        __Text__swipeText();
        Text.fontColor(Color.White);
        Text.visibility(this.resultVisibility_false);
        Text.zIndex(6);
        Text.pop();
        Stack.pop();
        Column.pop();
        Row.pop();
        /*滑轨*/
        Stack.pop();
    }
}
//使用@Extend装饰器，可简化代码，方便组件样式的复用
function __Row__swipeRoad(): void {
    Row.height('50');
    Row.width(280);
    Row.borderRadius(5);
    Row.border({ width: 1, color: Color.Blue });
}
function __Text__swipeText(): void {
    Text.width("100%");
    Text.height(50);
    Text.fontSize(20);
    Text.textAlign(TextAlign.Center);
}
function __Button__swipeBtn(): void {
    Button.width(50);
    Button.height(50);
    Button.borderRadius(5);
}
function __Stack__swipeStack(): void {
    Stack.height('100');
    Stack.width(320);
    Stack.border({ width: 1, color: Color.Grey });
    Stack.borderRadius(8);
    Stack.shadow({ radius: 30, color: '#888888', offsetX: 10, offsetY: 10 });
}
