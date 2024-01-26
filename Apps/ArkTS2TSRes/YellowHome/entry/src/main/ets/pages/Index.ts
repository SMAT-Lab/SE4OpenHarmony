interface Index_Params {
    userName?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
// 导入常量封装文件。
import router from '@ohos.router';
import CommonConstants from '../common/constants/CommonConstants';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__userName = new ObservedPropertySimple('', this, "userName");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.userName !== undefined) {
            this.userName = params.userName;
        }
    }
    aboutToBeDeleted() {
        this.__userName.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __userName: ObservedPropertySimple<string>;
    get userName() {
        return this.__userName.get();
    }
    set userName(newValue: string) {
        this.__userName.set(newValue);
    }
    render() {
        Column.create({ space: 10 });
        Column.width('100%');
        Column.height('100%');
        Text.create(CommonConstants.INDEX_MESSAGE);
        Text.fontSize(40);
        Text.fontWeight(700);
        Text.pop();
        Row.create({ space: 10 });
        //button的形状
        Button.createWithLabel('状', { type: ButtonType.Normal });
        __Button__fancy(Color.Red);
        //button的形状
        Button.pop();
        Button.createWithLabel('元', { type: ButtonType.Normal });
        __Button__fancy('#fed700');
        Button.pop();
        Row.pop();
        Row.create({ space: 10 });
        Button.createWithLabel('及', { type: ButtonType.Normal });
        __Button__fancy('#4293ff');
        Button.pop();
        Button.createWithLabel('弟', { type: ButtonType.Normal });
        __Button__fancy('#00cd66');
        Button.pop();
        Row.pop();
        Row.create({ space: 10 });
        TextInput.create({ placeholder: '请输入考生姓名' });
        __TextInput__tIptStyle();
        TextInput.onChange((value) => {
            this.userName = value;
        });
        Image.create({ "id": 0, "type": 30000, params: ['images/about.png'] });
        __Image__imgStyle();
        Image.onClick(() => {
            //调用一个函数，这个函数会给我一个弹窗
            this.aboutGame();
        });
        Row.pop();
        Button.createWithLabel('进入游戏', { type: ButtonType.Normal });
        __Button__goGameBtnStyle();
        Button.onClick(() => {
            router.push({
                url: CommonConstants.SECOND_URL,
                params: {
                    'userName': this.userName
                }
            });
        });
        Button.pop();
        Column.pop();
    }
    //封装一个函数：弹出游戏规则弹窗界面
    aboutGame() {
        //弹出规则窗口
        AlertDialog.show({
            title: '游戏规则',
            message: CommonConstants.RULES_OF_THE_GAME,
            //点击弹窗之外区域，自动关闭弹窗
            autoCancel: true,
            //第一个按钮
            primaryButton: {
                value: '取消',
                action: () => {
                    //点击会触发这个action
                    console.info('点击了游戏规则弹窗的取消按钮！！！');
                }
            },
            //第二个按钮
            secondaryButton: {
                value: 'OK',
                action: () => {
                    console.info('点击了游戏规则弹窗的OK按钮！！！');
                }
            },
            //让弹窗从默认的中间，设置到底部显示
            alignment: DialogAlignment.Bottom,
            // 灵活利用偏移量设置弹窗位置
            // offset:{dx:0,dy:-300}
            // 占了 多少网格，控制弹窗宽度
            gridCount: 5
        });
    }
}
//封装共性属性值。提高复用性
function __Button__fancy(bgcolor): void {
    Button.backgroundColor(bgcolor);
    Button.width('43%');
    Button.height('20%');
    Button.fontSize(24);
    Button.borderRadius(10);
    Button.shadow({
        radius: 10,
        color: 0xD3D3D3,
        offsetX: 20,
        offsetY: 20
    });
}
//输入框样式
function __TextInput__tIptStyle(): void {
    TextInput.width('75%');
    TextInput.height(50);
    TextInput.margin(20);
    TextInput.borderRadius(0);
    TextInput.style(TextInputStyle.Inline);
}
// 关于游戏规则的那个问好图片的样式。
function __Image__imgStyle(): void {
    Image.width(30);
    Image.height(30);
    Image.objectFit(ImageFit.Contain);
}
// 进入游戏按钮的样式封装
function __Button__goGameBtnStyle(): void {
    Button.width('50%');
    Button.height('8%');
    Button.borderRadius(8);
    Button.fontSize(24);
    Button.fontWeight(700);
    Button.shadow({
        radius: 10,
        color: 0xd3d3d3,
        offsetX: 20,
        offsetY: 20
    });
}
loadDocument(new Index("1", undefined, {}));
