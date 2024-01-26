interface ImageCurtain_Params {
    ImgHeight?: number;
    ImgWidth?: number;
    ImgStartXBias?: number;
    ImgStartYBias?: number;
    ImgRealWidth?: number;
    mouseXBias?: number;
    mouseYBias?: number;
    opacity_ImageCurtain?: number;
    imgName?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ImageCurtain_" + ++__generate__Id;
}
export class ImageCurtain extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.ImgHeight = 600;
        this.ImgWidth = 340;
        this.ImgStartXBias = 10;
        this.ImgStartYBias = 10;
        this.__ImgRealWidth = new ObservedPropertySimple(0
        //鼠标的坐标
        , this, "ImgRealWidth");
        this.__mouseXBias = new ObservedPropertySimple(0, this, "mouseXBias");
        this.__mouseYBias = new ObservedPropertySimple(0, this, "mouseYBias");
        this.__opacity_ImageCurtain = new ObservedPropertySimple(0, this, "opacity_ImageCurtain");
        this.imgName = "ImageCurtain_test1.jpg";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ImageCurtain_Params) {
        if (params.ImgHeight !== undefined) {
            this.ImgHeight = params.ImgHeight;
        }
        if (params.ImgWidth !== undefined) {
            this.ImgWidth = params.ImgWidth;
        }
        if (params.ImgStartXBias !== undefined) {
            this.ImgStartXBias = params.ImgStartXBias;
        }
        if (params.ImgStartYBias !== undefined) {
            this.ImgStartYBias = params.ImgStartYBias;
        }
        if (params.ImgRealWidth !== undefined) {
            this.ImgRealWidth = params.ImgRealWidth;
        }
        if (params.mouseXBias !== undefined) {
            this.mouseXBias = params.mouseXBias;
        }
        if (params.mouseYBias !== undefined) {
            this.mouseYBias = params.mouseYBias;
        }
        if (params.opacity_ImageCurtain !== undefined) {
            this.opacity_ImageCurtain = params.opacity_ImageCurtain;
        }
        if (params.imgName !== undefined) {
            this.imgName = params.imgName;
        }
    }
    aboutToBeDeleted() {
        this.__ImgRealWidth.aboutToBeDeleted();
        this.__mouseXBias.aboutToBeDeleted();
        this.__mouseYBias.aboutToBeDeleted();
        this.__opacity_ImageCurtain.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    //  private settings: RenderingContextSettings = new RenderingContextSettings(true)
    //  private context: CanvasRenderingContext2D = new CanvasRenderingContext2D(this.settings)
    //  private image:ImageBitmap = new Image('../common/images/snipper.png')
    //设置图片的宽高
    private ImgHeight: number;
    private ImgWidth: number;
    //图片的起始坐标
    private ImgStartXBias: number;
    private ImgStartYBias: number;
    //图片的宽度随鼠标变化
    private __ImgRealWidth: ObservedPropertySimple<number>;
    get ImgRealWidth() {
        return this.__ImgRealWidth.get();
    }
    set ImgRealWidth(newValue: number) {
        this.__ImgRealWidth.set(newValue);
    }
    //鼠标的坐标
    private __mouseXBias: ObservedPropertySimple<number>;
    get mouseXBias() {
        return this.__mouseXBias.get();
    }
    set mouseXBias(newValue: number) {
        this.__mouseXBias.set(newValue);
    }
    private __mouseYBias: ObservedPropertySimple<number>;
    get mouseYBias() {
        return this.__mouseYBias.get();
    }
    set mouseYBias(newValue: number) {
        this.__mouseYBias.set(newValue);
    }
    private __opacity_ImageCurtain: ObservedPropertySimple<number>;
    get opacity_ImageCurtain() {
        return this.__opacity_ImageCurtain.get();
    }
    set opacity_ImageCurtain(newValue: number) {
        this.__opacity_ImageCurtain.set(newValue);
    }
    private imgName: string;
    aboutToAppear() {
        this.ImgRealWidth = this.ImgWidth;
        console.log("test");
    }
    render() {
        Stack.create();
        Column.create();
        Column.width(this.ImgWidth);
        Column.height(this.ImgHeight);
        Image.create($rawfile(this.imgName));
        Image.alt("https://img.bizhizu.com/up/dd/c9/46/ddc9462603f9ab7ecb44d88275aacb3c.jpg");
        Image.objectFit(ImageFit.Fill);
        Image.height(this.ImgHeight);
        Image.width(this.ImgRealWidth);
        Image.position({
            x: this.ImgStartXBias,
            y: this.ImgStartYBias
        });
        Image.clip(new Path({
            commands: "M0 0 L" + vp2px(this.ImgRealWidth / 10) + " 0 " + "C" + vp2px(this.ImgRealWidth / 10) + " 0 " + vp2px(this.ImgRealWidth / 10 * 2) + " " +
                vp2px((1 - this.ImgRealWidth / this.ImgWidth) * 40) + " " + vp2px(this.ImgRealWidth / 10 * 3) + " 0 " + "L" + vp2px(this.ImgRealWidth / 10 * 3) + " 0 L" +
                vp2px(this.ImgRealWidth / 10 * 4) + " 0 C" + vp2px(this.ImgRealWidth / 10 * 4) + " 0 " + vp2px(this.ImgRealWidth / 10 * 5) + " " + vp2px((1 - this.ImgRealWidth / this.ImgWidth) * 40) + " " +
                vp2px(this.ImgRealWidth / 10 * 6) + " 0 L" + vp2px(this.ImgRealWidth / 10 * 6) + " 0 L" + vp2px(this.ImgRealWidth / 10 * 7) + " 0 C" + vp2px(this.ImgRealWidth / 10 * 7) + " 0 " +
                vp2px(this.ImgRealWidth / 10 * 8) + " " + vp2px((1 - this.ImgRealWidth / this.ImgWidth) * 40) + " " + vp2px(this.ImgRealWidth / 10 * 9) + " 0 L" + vp2px(this.ImgRealWidth / 10 * 9) + " 0 L" +
                vp2px(this.ImgRealWidth) + " 0 L" + vp2px(this.ImgRealWidth) + " " + vp2px(this.ImgHeight) + " L" + vp2px(this.ImgRealWidth / 10 * 9) + " " + vp2px(this.ImgHeight) + " C" +
                vp2px(this.ImgRealWidth / 10 * 9) + " " + vp2px(this.ImgHeight) + " " + vp2px(this.ImgRealWidth / 10 * 8) + " " + vp2px(this.ImgHeight - (1 - this.ImgRealWidth / this.ImgWidth) * 40) + " " +
                vp2px(this.ImgRealWidth / 10 * 7) + " " + vp2px(this.ImgHeight) + " L" + vp2px(this.ImgRealWidth / 10 * 7) + " " + vp2px(this.ImgHeight) + " L" + vp2px(this.ImgRealWidth / 10 * 6) + " " +
                vp2px(this.ImgHeight) + " C" + vp2px(this.ImgRealWidth / 10 * 6) + " " + vp2px(this.ImgHeight) + " " + vp2px(this.ImgRealWidth / 10 * 5) + " " +
                vp2px(this.ImgHeight - (1 - this.ImgRealWidth / this.ImgWidth) * 40) + " " + vp2px(this.ImgRealWidth / 10 * 4) + " " + vp2px(this.ImgHeight) + " L" + vp2px(this.ImgRealWidth / 10 * 4) + " " +
                vp2px(this.ImgHeight) + " L" + vp2px(this.ImgRealWidth / 10 * 3) + " " + vp2px(this.ImgHeight) + " C" + vp2px(this.ImgRealWidth / 10 * 3) + " " + vp2px(this.ImgHeight) + " " +
                vp2px(this.ImgRealWidth / 10 * 2) + " " + vp2px(this.ImgHeight - (1 - this.ImgRealWidth / this.ImgWidth) * 40) + " " + vp2px(this.ImgRealWidth / 10 * 1) + " " + vp2px(this.ImgHeight) + " L" +
                vp2px(this.ImgRealWidth / 10 * 1) + " " + vp2px(this.ImgHeight) + " L0" + " " + vp2px(this.ImgHeight) + " Z"
        }));
        Column.pop();
        Column.create();
        Column.width(this.ImgWidth);
        Column.height(this.ImgHeight);
        Row.create();
        Row.height(this.ImgHeight);
        Row.width(this.ImgRealWidth);
        Row.position({
            x: this.ImgStartXBias,
            y: this.ImgStartYBias
        });
        Row.opacity(this.opacity_ImageCurtain);
        Row.linearGradient({
            angle: 90,
            direction: GradientDirection.Left,
            //            colors: [["#ff030303", 0.0], ["#ff7a7878", 0.1 * (this.time / 1)],["#ffffffff", 0.2], ["#ff030303", 0.3],
            //            ["#ff030303", 0.4],["#ff7a7878", (0.5 - 0.1 * (this.time / 1))],["#ffffffff", 0.6],["#ff7a7878", (0.7 - 0.1 * (this.time / 1))],
            //            ["#ffffffff", 0.0],["#ff7a7878", (0.8 - 0.1 * (this.time / 1))],["#ff000000", 1.0],]
            colors: [["#ff030303", 0.0], ["#ff7a7878", 0.11 * 0.5], ["#ffffffff", 0.22 * 0.5], ["#ff7a7878", 0.33 * 0.5],
                ["#ff030303", 0.44 * 0.5],
                ["#ff030303", 0.55 * 0.5], ["#ff7a7878", 0.66 * 0.5], ["#ffffffff", 0.77 * 0.5], ["#ff7a7878", 0.88 * 0.5],
                ["#ff000000", 1.0 * 0.5],
                ["#ff030303", 0.5], ["#ff7a7878", 0.11 * 0.5 + 0.5], ["#ffffffff", 0.22 * 0.5 + 0.5], ["#ff7a7878", 0.33 * 0.5 + 0.5],
                ["#ff030303", 0.44 * 0.5 + 0.5],
                ["#ff030303", 0.55 * 0.5 + 0.5], ["#ff7a7878", 0.66 * 0.5 + 0.5], ["#ffffffff", 0.77 * 0.5 + 0.5], ["#ff7a7878", 0.88 * 0.5 + 0.5],
                ["#ff000000", 1.0],
            ]
        });
        Row.clip(new Path({
            commands: "M0 0 L" + vp2px(this.ImgRealWidth / 10) + " 0 " + "C" + vp2px(this.ImgRealWidth / 10) + " 0 " + vp2px(this.ImgRealWidth / 10 * 2) + " " +
                vp2px((1 - this.ImgRealWidth / this.ImgWidth) * 40) + " " + vp2px(this.ImgRealWidth / 10 * 3) + " 0 " + "L" + vp2px(this.ImgRealWidth / 10 * 3) + " 0 L" +
                vp2px(this.ImgRealWidth / 10 * 4) + " 0 C" + vp2px(this.ImgRealWidth / 10 * 4) + " 0 " + vp2px(this.ImgRealWidth / 10 * 5) + " " + vp2px((1 - this.ImgRealWidth / this.ImgWidth) * 40) + " " +
                vp2px(this.ImgRealWidth / 10 * 6) + " 0 L" + vp2px(this.ImgRealWidth / 10 * 6) + " 0 L" + vp2px(this.ImgRealWidth / 10 * 7) + " 0 C" + vp2px(this.ImgRealWidth / 10 * 7) + " 0 " +
                vp2px(this.ImgRealWidth / 10 * 8) + " " + vp2px((1 - this.ImgRealWidth / this.ImgWidth) * 40) + " " + vp2px(this.ImgRealWidth / 10 * 9) + " 0 L" + vp2px(this.ImgRealWidth / 10 * 9) + " 0 L" +
                vp2px(this.ImgRealWidth) + " 0 L" + vp2px(this.ImgRealWidth) + " " + vp2px(this.ImgHeight) + " L" + vp2px(this.ImgRealWidth / 10 * 9) + " " + vp2px(this.ImgHeight) + " C" +
                vp2px(this.ImgRealWidth / 10 * 9) + " " + vp2px(this.ImgHeight) + " " + vp2px(this.ImgRealWidth / 10 * 8) + " " + vp2px(this.ImgHeight - (1 - this.ImgRealWidth / this.ImgWidth) * 40) + " " +
                vp2px(this.ImgRealWidth / 10 * 7) + " " + vp2px(this.ImgHeight) + " L" + vp2px(this.ImgRealWidth / 10 * 7) + " " + vp2px(this.ImgHeight) + " L" + vp2px(this.ImgRealWidth / 10 * 6) + " " +
                vp2px(this.ImgHeight) + " C" + vp2px(this.ImgRealWidth / 10 * 6) + " " + vp2px(this.ImgHeight) + " " + vp2px(this.ImgRealWidth / 10 * 5) + " " +
                vp2px(this.ImgHeight - (1 - this.ImgRealWidth / this.ImgWidth) * 40) + " " + vp2px(this.ImgRealWidth / 10 * 4) + " " + vp2px(this.ImgHeight) + " L" + vp2px(this.ImgRealWidth / 10 * 4) + " " +
                vp2px(this.ImgHeight) + " L" + vp2px(this.ImgRealWidth / 10 * 3) + " " + vp2px(this.ImgHeight) + " C" + vp2px(this.ImgRealWidth / 10 * 3) + " " + vp2px(this.ImgHeight) + " " +
                vp2px(this.ImgRealWidth / 10 * 2) + " " + vp2px(this.ImgHeight - (1 - this.ImgRealWidth / this.ImgWidth) * 40) + " " + vp2px(this.ImgRealWidth / 10 * 1) + " " + vp2px(this.ImgHeight) + " L" +
                vp2px(this.ImgRealWidth / 10 * 1) + " " + vp2px(this.ImgHeight) + " L0" + " " + vp2px(this.ImgHeight) + " Z"
        }));
        Row.pop();
        Column.pop();
        If.create();
        if (this.ImgRealWidth >= 50) {
            If.branchId(0);
            Button.createWithChild();
            Button.width(20 - (1 - this.ImgRealWidth / this.ImgWidth) * 5);
            Button.height(100);
            Button.backgroundColor("#ffbabec3");
            Button.borderWidth(1);
            Button.borderRadius(5);
            Button.borderColor("#ffc4bebe");
            Button.borderStyle(BorderStyle.Solid);
            Button.shadow({ radius: 5, color: "#ff9fd7bf" });
            Button.position({
                x: this.ImgRealWidth - 20 * (this.ImgRealWidth / this.ImgWidth) / 4,
                y: this.ImgHeight / 2 - 50
            });
            Button.onTouch((event: TouchEvent) => {
                console.log("透明度：", this.opacity_ImageCurtain);
                //遮罩的透明度属性opacity 用一个公式模拟计算
                this.opacity_ImageCurtain = (1 - this.ImgRealWidth / this.ImgWidth) * (0.5 + this.ImgRealWidth / this.ImgWidth);
                //触摸判断
                if (event.type === TouchType.Down) {
                }
                if (event.type === TouchType.Up) {
                }
                if (event.type === TouchType.Move) {
                    //将touch的坐标值赋给鼠标X变量
                    this.mouseXBias = event.touches[0].screenX;
                    //如果坐标没有超过图片的左边，并且鼠标X值不超过屏幕右侧，才改变图片的宽度
                    if (this.mouseXBias > this.ImgStartXBias + 10 && this.mouseXBias <= this.ImgWidth + this.ImgStartXBias) {
                        //鼠标X位置减去坐标起始X位置为图片的宽度
                        this.ImgRealWidth = this.mouseXBias - this.ImgStartXBias;
                    }
                }
            });
            Text.create("《");
            Text.fontSize(16 - (1 - this.ImgRealWidth / this.ImgWidth) * 8);
            Text.fontColor("#ff28664c");
            Text.pop();
            Button.pop();
        }
        else {
            If.branchId(1);
            Button.createWithChild();
            Button.width(20 - (1 - this.ImgRealWidth / this.ImgWidth) * 5);
            Button.height(100);
            Button.backgroundColor("#ffbabec3");
            Button.borderWidth(1);
            Button.borderRadius(5);
            Button.borderColor("#ffc4bebe");
            Button.borderStyle(BorderStyle.Solid);
            Button.shadow({ radius: 5, color: "#ff9fd7bf" });
            Button.position({
                x: this.ImgRealWidth - 20 * (this.ImgRealWidth / this.ImgWidth) / 4,
                y: this.ImgHeight / 2 - 50
            });
            Button.onTouch((event: TouchEvent) => {
                //遮罩的透明度属性opacity 用一个公式模拟计算
                this.opacity_ImageCurtain = (1 - this.ImgRealWidth / this.ImgWidth) * (0.5 + this.ImgRealWidth / this.ImgWidth);
                //触摸判断
                if (event.type === TouchType.Down) {
                }
                if (event.type === TouchType.Up) {
                }
                if (event.type === TouchType.Move) {
                    //将touch的坐标值赋给鼠标X变量
                    this.mouseXBias = event.touches[0].screenX;
                    //如果坐标没有超过图片的左边，并且鼠标X值不超过屏幕右侧，才改变图片的宽度
                    if (this.mouseXBias > this.ImgStartXBias + 10 && this.mouseXBias <= this.ImgWidth + this.ImgStartXBias) {
                        //鼠标X位置减去坐标起始X位置为图片的宽度
                        this.ImgRealWidth = this.mouseXBias - this.ImgStartXBias;
                    }
                }
            });
            Text.create("》");
            Text.fontSize(10 - (this.ImgRealWidth / this.ImgWidth) * 16);
            Text.fontColor("#ff7a5a2c");
            Text.padding({ left: 6 });
            Text.pop();
            Button.pop();
        }
        If.pop();
        Stack.pop();
    }
}
