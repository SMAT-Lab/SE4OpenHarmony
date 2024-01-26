interface CanvasPage_Params {
    //画布设置：允许抗锯齿
    setting?: RenderingContextSettings;
    //定义画笔，根据上下文绘制
    paint?: CanvasRenderingContext2D;
    //手指按下的起点
    startX?;
    startY?;
    //终点坐标
    endX?;
    endY?;
    //绘制平滑的贝塞尔曲线
    points?;
    colors?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CanvasPage_" + ++__generate__Id;
}
export class CanvasPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.setting = new RenderingContextSettings();
        this.paint = new CanvasRenderingContext2D();
        this.startX = 0;
        this.startY = 0;
        this.endX = 0;
        this.endY = 0;
        this.points = [];
        this.colors = [Color.Black, Color.Red, Color.Blue, Color.Green, Color.Yellow, Color.Orange];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CanvasPage_Params) {
        if (params.setting !== undefined) {
            this.setting = params.setting;
        }
        if (params.paint !== undefined) {
            this.paint = params.paint;
        }
        if (params.startX !== undefined) {
            this.startX = params.startX;
        }
        if (params.startY !== undefined) {
            this.startY = params.startY;
        }
        if (params.endX !== undefined) {
            this.endX = params.endX;
        }
        if (params.endY !== undefined) {
            this.endY = params.endY;
        }
        if (params.points !== undefined) {
            this.points = params.points;
        }
        if (params.colors !== undefined) {
            this.colors = params.colors;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    //画布设置：允许抗锯齿
    private setting: RenderingContextSettings;
    //定义画笔，根据上下文绘制
    private paint: CanvasRenderingContext2D;
    //手指按下的起点
    private startX;
    private startY;
    //终点坐标
    private endX;
    private endY;
    render() {
        Column.create();
        //画布容器
        Canvas.create(this.paint);
        //画布容器
        Canvas.width("100%");
        //画布容器
        Canvas.layoutWeight(1);
        //画布容器
        Canvas.onReady(() => {
            // //画笔样式
            // this.paint.strokeStyle = "#00FF00"
            // //线条宽度
            // this.paint.lineWidth = 10
            // //绘制矩形
            // this.paint.strokeRect(50, 50, 100, 100)
            // //绘制
            // this.paint.stroke()
            //
            // //设置填充样式
            // this.paint.fillStyle = "#0000FF"
            // //填充矩形
            // this.paint.fillRect(200, 200, 150, 150)
            //
            // //将画笔起点移动到(100,100)
            // this.paint.moveTo(100, 100)
            // //绘制线条，定义线条终点为(300,300)
            // this.paint.lineTo(300, 300)
            // //绘制
            // this.paint.stroke()
        });
        //画布容器
        Canvas.onTouch((event) => {
            switch (event.type) {
                case TouchType.Down: //按下
                    console.info(JSON.stringify(event));
                    //获取手指按下的坐标
                    this.startX = event.touches[0].screenX;
                    this.startY = event.touches[0].screenY;
                    break;
                case TouchType.Move: //滑动
                    this.endX = event.touches[0].x;
                    this.endY = event.touches[0].y;
                    // this.drawStraightLine()
                    // this.startX = this.endX
                    // this.startY = this.endY
                    this.drawBesselLine(this.endX, this.endY);
                    break;
                case TouchType.Up: //抬起
                    this.points = [];
            }
        });
        //画布容器
        Canvas.pop();
        this.Bottom(this);
        Column.pop();
    }
    //绘制线段
    drawStraightLine() {
        this.paint.lineWidth = 10;
        this.paint.moveTo(this.startX, this.startY);
        this.paint.lineTo(this.endX, this.endY);
        this.paint.stroke();
    }
    //绘制平滑的贝塞尔曲线
    private points;
    drawBesselLine(moveX, moveY) {
        this.points.push({ x: moveX, y: moveY });
        let pointsLen = this.points.length;
        this.paint.lineWidth = 10;
        //起点、终点、控制点，三点确定一条平滑的贝塞尔曲线
        if (pointsLen > 2) {
            let endX = (this.points[pointsLen - 1].x + this.points[pointsLen - 2].x) / 2;
            let endY = (this.points[pointsLen - 1].y + this.points[pointsLen - 2].y) / 2;
            let lastX = (this.points[pointsLen - 2].x + this.points[pointsLen - 3].x) / 2;
            let lastY = (this.points[pointsLen - 2].y + this.points[pointsLen - 3].y) / 2;
            this.paint.moveTo(lastX, lastY);
            this.paint.quadraticCurveTo(this.points[pointsLen - 2].x, this.points[pointsLen - 2].y, endX, endY);
            this.paint.stroke();
        }
    }
    private colors;
    Bottom(parent = null) {
        Flex.create({ justifyContent: FlexAlign.SpaceAround, alignItems: ItemAlign.Center, alignContent: FlexAlign.SpaceBetween });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.colors), (item, index) => {
            Circle.create();
            Circle.fill(item);
            Circle.height(40);
            Circle.width(40);
            Circle.onClick(() => {
                this.paint.strokeStyle = item;
                this.paint.beginPath();
            });
        });
        ForEach.pop();
        Button.createWithLabel("清空");
        Button.onClick(() => {
            AlertDialog.show({
                title: '提示',
                message: "确认清空吗，清空后不可恢复",
                autoCancel: false,
                alignment: DialogAlignment.Center,
                primaryButton: {
                    value: '取消',
                    action: () => {
                    }
                },
                secondaryButton: {
                    value: '确认',
                    action: () => {
                        this.paint.beginPath();
                        this.paint.clearRect(0, 0, 1000, 1000);
                    }
                },
            });
        });
        Button.pop();
        Flex.pop();
    }
}
