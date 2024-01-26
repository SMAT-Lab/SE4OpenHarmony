interface SwipeCell_async_Params {
    dragStart_x?: number;
    drag_x?: number;
    distance?: number;
}
interface SwipeCell_default_Params {
    dragStart_x?: number;
    drag_x?: number;
    distance?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SwipeCell_" + ++__generate__Id;
}
export class SwipeCell_default extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__dragStart_x = new ObservedPropertySimple(0, this, "dragStart_x");
        this.__drag_x = new ObservedPropertySimple(0, this, "drag_x");
        this.__distance = new ObservedPropertySimple(0, this, "distance");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SwipeCell_default_Params) {
        if (params.dragStart_x !== undefined) {
            this.dragStart_x = params.dragStart_x;
        }
        if (params.drag_x !== undefined) {
            this.drag_x = params.drag_x;
        }
        if (params.distance !== undefined) {
            this.distance = params.distance;
        }
    }
    aboutToBeDeleted() {
        this.__dragStart_x.aboutToBeDeleted();
        this.__drag_x.aboutToBeDeleted();
        this.__distance.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __dragStart_x: ObservedPropertySimple<number>; //滑动起始x轴位置坐标
    get dragStart_x() {
        return this.__dragStart_x.get();
    }
    set dragStart_x(newValue: number) {
        this.__dragStart_x.set(newValue);
    }
    private __drag_x: ObservedPropertySimple<number>; //滑动过程中实时x轴位置坐标
    get drag_x() {
        return this.__drag_x.get();
    }
    set drag_x(newValue: number) {
        this.__drag_x.set(newValue);
    }
    private __distance: ObservedPropertySimple<number>; //滑动的距离
    get distance() {
        return this.__distance.get();
    }
    set distance(newValue: number) {
        this.__distance.set(newValue);
    }
    // 自定义拖拽过程中显示的内容
    Builder(parent = null) {
        Text.create("aaa");
        Text.visibility(Visibility.Hidden);
        Text.pop();
    }
    render() {
        Row.create();
        Row.onDragEnter(() => {
            console.log("进入滑动区域。。。");
        });
        Row.onDragMove((event: DragEvent) => {
            console.log("滑动中。。。");
            this.drag_x = event.getX();
            this.distance = this.drag_x - this.dragStart_x;
            if (this.distance > 100)
                this.distance = 100;
            if (this.distance < -100)
                this.distance = -100;
        });
        Row.onDragLeave((event: DragEvent) => {
            console.log("离开滑动区域。。。");
            this.drag_x = event.getX();
            this.distance = this.drag_x - this.dragStart_x;
            if (this.distance > 100)
                this.distance = 100;
            if (this.distance < -100)
                this.distance = -100;
        });
        Row.onDrop((event: DragEvent) => {
            console.log("结束滑动。。。");
            this.drag_x = event.getX();
            this.distance = this.drag_x - this.dragStart_x;
            if (this.distance >= 50)
                this.distance = 100;
            else if (this.distance > 0 && this.distance < 50) {
                this.distance = 0;
            }
            if (this.distance <= -50)
                this.distance = -100;
            else if (this.distance < 0 && this.distance > -50) {
                this.distance = 0;
            }
        });
        Row.width("100%");
        Row.height(75);
        //左边选择
        Text.create("选择");
        //左边选择
        Text.fontColor(Color.White);
        //左边选择
        Text.fontSize(30);
        //左边选择
        Text.textAlign(TextAlign.Center);
        //左边选择
        Text.width("100");
        //左边选择
        Text.height("100%");
        //左边选择
        Text.backgroundColor(Color.Red);
        //左边选择
        Text.position({ x: -100 + this.distance });
        //左边选择
        Text.onClick(() => {
            this.distance = 0;
        });
        //左边选择
        Text.pop();
        //单元格
        Stack.create();
        //单元格
        Stack.backgroundColor(Color.White);
        //单元格
        Stack.height("75");
        //单元格
        Stack.width(480);
        //单元格
        Stack.position({ x: 0 + this.distance });
        //单元格
        Stack.onDragStart((event: DragEvent) => {
            console.log("开始滑动。。。");
            this.dragStart_x = event.getX();
            return { builder: () => {
                    this.Builder.call(this);
                } };
        });
        Text.create("单元格");
        Text.fontSize(30);
        Text.position({ x: "3%", y: "25%" });
        Text.pop();
        Text.create("内容");
        Text.fontSize(30);
        Text.opacity(0.6);
        Text.position({ x: "85%", y: "25%" });
        Text.pop();
        //单元格
        Stack.pop();
        //右边删除
        Text.create("删除");
        //右边删除
        Text.fontColor(Color.White);
        //右边删除
        Text.fontSize(30);
        //右边删除
        Text.textAlign(TextAlign.Center);
        //右边删除
        Text.width("100");
        //右边删除
        Text.height("100%");
        //右边删除
        Text.backgroundColor(Color.Red);
        //右边删除
        Text.position({ x: 480 + this.distance });
        //右边删除
        Text.onClick(() => {
            this.distance = 0;
        });
        //右边删除
        Text.pop();
        Row.pop();
    }
}
export class SwipeCell_async extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__dragStart_x = new ObservedPropertySimple(0, this, "dragStart_x");
        this.__drag_x = new ObservedPropertySimple(0, this, "drag_x");
        this.__distance = new ObservedPropertySimple(0, this, "distance");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SwipeCell_async_Params) {
        if (params.dragStart_x !== undefined) {
            this.dragStart_x = params.dragStart_x;
        }
        if (params.drag_x !== undefined) {
            this.drag_x = params.drag_x;
        }
        if (params.distance !== undefined) {
            this.distance = params.distance;
        }
    }
    aboutToBeDeleted() {
        this.__dragStart_x.aboutToBeDeleted();
        this.__drag_x.aboutToBeDeleted();
        this.__distance.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __dragStart_x: ObservedPropertySimple<number>; //滑动起始x轴位置坐标
    get dragStart_x() {
        return this.__dragStart_x.get();
    }
    set dragStart_x(newValue: number) {
        this.__dragStart_x.set(newValue);
    }
    private __drag_x: ObservedPropertySimple<number>; //滑动过程中实时x轴位置坐标
    get drag_x() {
        return this.__drag_x.get();
    }
    set drag_x(newValue: number) {
        this.__drag_x.set(newValue);
    }
    private __distance: ObservedPropertySimple<number>; //滑动的距离
    get distance() {
        return this.__distance.get();
    }
    set distance(newValue: number) {
        this.__distance.set(newValue);
    }
    // 自定义拖拽过程中显示的内容
    Builder(parent = null) {
        Text.create("aaa");
        Text.visibility(Visibility.Hidden);
        Text.pop();
    }
    render() {
        Row.create();
        Row.onDragEnter(() => {
            console.log("进入滑动区域。。。");
        });
        Row.onDragMove((event: DragEvent) => {
            console.log("滑动中。。。");
            this.drag_x = event.getX();
            this.distance = this.drag_x - this.dragStart_x;
            if (this.distance > 100)
                this.distance = 100;
            if (this.distance < -100)
                this.distance = -100;
        });
        Row.onDragLeave((event: DragEvent) => {
            console.log("离开滑动区域。。。");
            this.drag_x = event.getX();
            this.distance = this.drag_x - this.dragStart_x;
            if (this.distance > 100)
                this.distance = 100;
            if (this.distance < -100)
                this.distance = -100;
        });
        Row.onDrop((event: DragEvent) => {
            console.log("结束滑动。。。");
            this.drag_x = event.getX();
            this.distance = this.drag_x - this.dragStart_x;
            if (this.distance >= 50)
                this.distance = 100;
            else if (this.distance > 0 && this.distance < 50) {
                this.distance = 0;
            }
            if (this.distance <= -50)
                this.distance = -100;
            else if (this.distance < 0 && this.distance > -50) {
                this.distance = 0;
            }
        });
        Row.width("100%");
        Row.height(75);
        //左边选择
        Text.create("选择");
        //左边选择
        Text.fontColor(Color.White);
        //左边选择
        Text.fontSize(30);
        //左边选择
        Text.textAlign(TextAlign.Center);
        //左边选择
        Text.width("100");
        //左边选择
        Text.height("100%");
        //左边选择
        Text.backgroundColor(Color.Red);
        //左边选择
        Text.position({ x: -100 + this.distance });
        //左边选择
        Text.onClick(() => {
            this.distance = 0;
        });
        //左边选择
        Text.pop();
        //单元格
        Stack.create();
        //单元格
        Stack.backgroundColor(Color.White);
        //单元格
        Stack.height("75");
        //单元格
        Stack.width(480);
        //单元格
        Stack.position({ x: 0 + this.distance });
        //单元格
        Stack.onDragStart((event: DragEvent) => {
            console.log("开始滑动。。。");
            this.dragStart_x = event.getX();
            return { builder: () => {
                    this.Builder.call(this);
                } };
        });
        Text.create("单元格");
        Text.fontSize(30);
        Text.position({ x: "3%", y: "25%" });
        Text.pop();
        Text.create("内容");
        Text.fontSize(30);
        Text.opacity(0.6);
        Text.position({ x: "85%", y: "25%" });
        Text.pop();
        //单元格
        Stack.pop();
        //右边删除
        Text.create("删除");
        //右边删除
        Text.fontColor(Color.White);
        //右边删除
        Text.fontSize(30);
        //右边删除
        Text.textAlign(TextAlign.Center);
        //右边删除
        Text.width("100");
        //右边删除
        Text.height("100%");
        //右边删除
        Text.backgroundColor(Color.Red);
        //右边删除
        Text.position({ x: 480 + this.distance });
        //右边删除
        Text.onClick(() => {
            AlertDialog.show({
                message: '\n确定要删除么\n',
                autoCancel: false,
                primaryButton: {
                    value: '取消',
                    action: () => {
                        this.distance = 0;
                    },
                    fontColor: Color.Black
                },
                secondaryButton: {
                    value: '确定',
                    action: () => {
                        this.distance = 0;
                    }
                },
            });
        });
        //右边删除
        Text.pop();
        Row.pop();
    }
}
