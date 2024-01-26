interface Index_Params {
    StudentName?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
//引入commonConstants.ets定义的静态变量
import router from '@ohos.router';
import CommonConstants from '../common/constants/CommonConstants';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__StudentName = new ObservedPropertySimple(''
        /**
         * 实现页面跳转，并进行参数传递
         * 用到router模块
         * router.push方法，url写上我们要跳转的路径
         * 使用params自定义参数，进行数据传递
         * 目标页面中用router.getParams()获取传递过来的数据
         *
         */
        , this, "StudentName");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.StudentName !== undefined) {
            this.StudentName = params.StudentName;
        }
    }
    aboutToBeDeleted() {
        this.__StudentName.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    // 声明一个变量用于存储输入的考生信息
    private __StudentName: ObservedPropertySimple<string>;
    get StudentName() {
        return this.__StudentName.get();
    }
    set StudentName(newValue: string) {
        this.__StudentName.set(newValue);
    }
    /**
     * 实现页面跳转，并进行参数传递
     * 用到router模块
     * router.push方法，url写上我们要跳转的路径
     * 使用params自定义参数，进行数据传递
     * 目标页面中用router.getParams()获取传递过来的数据
     *
     */
    render() {
        Column.create({ space: 10 });
        Column.create({ space: 10 });
        Column.margin({ top: '5%' });
        Text.create(CommonConstants.INDEX_MESSAGE);
        Text.fontSize(40);
        Text.fontWeight(700);
        Text.margin({ bottom: 10 });
        Text.pop();
        Row.create({ space: 10 });
        // 设置按钮的内容、样式、以及按压显示状态，背景颜色
        Button.createWithLabel('状', { type: ButtonType.Normal, stateEffect: true });
        // 设置按钮的内容、样式、以及按压显示状态，背景颜色
        Button.backgroundColor(0xc7000b);
        __Button__fancy();
        // 设置按钮的内容、样式、以及按压显示状态，背景颜色
        Button.pop();
        Button.createWithLabel('元', { type: ButtonType.Normal, stateEffect: true });
        Button.backgroundColor(0xFFD700);
        __Button__fancy();
        Button.pop();
        Row.pop();
        Row.create({ space: 10 });
        Button.createWithLabel('及', { type: ButtonType.Normal, stateEffect: true });
        Button.backgroundColor(0x4194ff);
        __Button__fancy();
        Button.pop();
        Button.createWithLabel('第', { type: ButtonType.Normal, stateEffect: true });
        Button.backgroundColor(0x00cd66);
        __Button__fancy();
        Button.pop();
        Row.pop();
        Column.pop();
        // placeholder：提示
        Row.create({ space: 10 });
        TextInput.create({ placeholder: '输入考生姓名' });
        __TextInput__inputStyle();
        TextInput.onChange((value: string) => {
            // 把输入的值赋值给StudentName变量
            this.StudentName = value;
            console.log(value);
            console.error(this.StudentName);
        });
        //   图片组件，必备的src
        //   TO DO(点击图片，出现详情界面）
        Image.create({ "id": 0, "type": 30000, params: ['images/about.png'] });
        __Image__imageStyle();
        //   图片组件，必备的src
        //   TO DO(点击图片，出现详情界面）
        Image.onClick(() => { this.aboutGame(); });
        // placeholder：提示
        Row.pop();
        Button.createWithLabel('进入游戏', { type: ButtonType.Normal, stateEffect: true });
        __Button__fancy1();
        Button.onClick(() => {
            router.push({
                url: CommonConstants.SECOND_URL,
                // 这里的参数是文本框中，我们把输入的文本存入到了studentname变量中
                params: {
                    showText: this.StudentName
                }
            });
        });
        Button.pop();
        Column.pop();
    }
    // 规则弹窗
    aboutGame() {
        AlertDialog.show({
            title: '游戏规则',
            message: CommonConstants.RULES_OF_THE_GAME,
            autoCancel: true,
            alignment: DialogAlignment.Bottom,
            gridCount: 3,
            offset: { dx: 0, dy: -300 },
            //   定义两个按钮，用来关掉弹窗
            //   第一个按钮，点击cancel的时候被调用
            primaryButton: {
                value: 'cancel',
                action: () => {
                    console.log("callback when the first button is clicked");
                }
            },
            // 第二个按钮，点击ok的时候被调用
            secondaryButton: {
                value: 'ok',
                action: () => {
                    console.log("callback when the second button is clicked");
                }
            },
            cancel: () => {
                console.log("closed callback");
            }
        });
    }
}
// 定义的装饰器在函数外面，所以要写function
// offset：偏移量
// 按钮的样式
function __Button__fancy(): void {
    Button.width('35%');
    Button.height('20%');
    Button.borderRadius(8);
    Button.fontSize(24);
    Button.fontWeight(600);
    Button.shadow({ radius: 10, color: 0xD3D3D3, offsetX: 20 });
}
// 输入文本框的样式
function __TextInput__inputStyle(): void {
    TextInput.width('75%');
    TextInput.height(50);
    TextInput.margin(20);
    TextInput.style(TextInputStyle.Inline);
}
// 图片样式
function __Image__imageStyle(): void {
    Image.objectFit(ImageFit.Contain);
    Image.height(30);
    Image.width(30);
}
// 设置“进入游戏”按钮样式
function __Button__fancy1(): void {
    Button.width('50%');
    Button.height('8%');
    Button.borderRadius(8);
    Button.fontSize(24);
    Button.fontWeight(600);
    Button.shadow({ radius: 10, color: 0xd3d3d3, offsetX: 20, offsetY: 20 });
}
loadDocument(new Index("1", undefined, {}));
