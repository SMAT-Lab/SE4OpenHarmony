interface GamePage_Params {
    source?: number;
    times?: number;
    imgArray?: Array<string>;
    level?: number;
    rangNumber?: number;
    gradeLv?: string;
    //准备自定义弹窗组件 顶部记得导入。。。
    dialogController?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "GamePage_" + ++__generate__Id;
}
import { CustomDialogExample } from '../common/customComponent/CustomCardDialog';
import CommonConstants from '../common/constants/CommonConstants';
import router from '@ohos.router';
// 获取从EntryAbility中的sencond页面拉起GameAbility时传递并且存储在appStorage中的userName
let userName: string = AppStorage.Get('userName') ? AppStorage.Get('userName') : '马哥';
class GamePage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__source = new ObservedPropertySimple(10
        // 抽卡次数
        , this, "source");
        this.__times = new ObservedPropertySimple(3, this, "times");
        this.__imgArray = new ObservedPropertyObject(CommonConstants.images, this, "imgArray");
        this.__level = new ObservedPropertySimple(0 // 卡片等级
        , this, "level");
        this.__rangNumber = new ObservedPropertySimple(0 //存储起来随机数
        , this, "rangNumber");
        this.__gradeLv = new ObservedPropertySimple('' //用来存储根据成绩判定的等级
        , this, "gradeLv");
        this.dialogController = new CustomDialogController({
            //构建了一个弹窗组件
            builder: () => {
                let jsDialog = new CustomDialogExample("2", this, {
                    //弹窗里面需要数据
                    source: this.__source,
                    level: this.__level
                });
                jsDialog.setController(this.
                //准备自定义弹窗组件 顶部记得导入。。。
                dialogController);
                View.create(jsDialog);
            },
            autoCancel: true
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: GamePage_Params) {
        if (params.source !== undefined) {
            this.source = params.source;
        }
        if (params.times !== undefined) {
            this.times = params.times;
        }
        if (params.imgArray !== undefined) {
            this.imgArray = params.imgArray;
        }
        if (params.level !== undefined) {
            this.level = params.level;
        }
        if (params.rangNumber !== undefined) {
            this.rangNumber = params.rangNumber;
        }
        if (params.gradeLv !== undefined) {
            this.gradeLv = params.gradeLv;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    aboutToBeDeleted() {
        this.__source.aboutToBeDeleted();
        this.__times.aboutToBeDeleted();
        this.__imgArray.aboutToBeDeleted();
        this.__level.aboutToBeDeleted();
        this.__rangNumber.aboutToBeDeleted();
        this.__gradeLv.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    // 得分
    private __source: ObservedPropertySimple<number>;
    get source() {
        return this.__source.get();
    }
    set source(newValue: number) {
        this.__source.set(newValue);
    }
    // 抽卡次数
    private __times: ObservedPropertySimple<number>;
    get times() {
        return this.__times.get();
    }
    set times(newValue: number) {
        this.__times.set(newValue);
    }
    private __imgArray: ObservedPropertyObject<Array<string>>;
    get imgArray() {
        return this.__imgArray.get();
    }
    set imgArray(newValue: Array<string>) {
        this.__imgArray.set(newValue);
    }
    private __level: ObservedPropertySimple<number>; // 卡片等级
    get level() {
        return this.__level.get();
    }
    set level(newValue: number) {
        this.__level.set(newValue);
    }
    private __rangNumber: ObservedPropertySimple<number>; //存储起来随机数
    get rangNumber() {
        return this.__rangNumber.get();
    }
    set rangNumber(newValue: number) {
        this.__rangNumber.set(newValue);
    }
    private __gradeLv: ObservedPropertySimple<string>; //用来存储根据成绩判定的等级
    get gradeLv() {
        return this.__gradeLv.get();
    }
    set gradeLv(newValue: string) {
        this.__gradeLv.set(newValue);
    }
    render() {
        Column.create({ space: 10 });
        Column.width('100%');
        Column.height('100%');
        Text.create(userName + ` 得分:${this.source}抽卡次数:${this.times}`);
        __Text__topText();
        Text.pop();
        //展示区---------------------
        Row.create({ space: 4 });
        Column.create({ space: 4 });
        Image.create($rawfile(`${this.imgArray[0]}`));
        Image.borderColor(0xf21225);
        __Image__imgStyle();
        Text.create('状元');
        __Text__textStyle();
        Text.pop();
        Column.pop();
        Column.create({ space: 4 });
        Image.create($rawfile(`${this.imgArray[1]}`));
        Image.borderColor(0xfbd501);
        __Image__imgStyle();
        Text.create('榜眼');
        __Text__textStyle();
        Text.pop();
        Column.pop();
        //展示区---------------------
        Row.pop();
        Row.create({ space: 4 });
        Column.create({ space: 4 });
        Image.create($rawfile(`${this.imgArray[2]}`));
        Image.borderColor(0x3f97fd);
        __Image__imgStyle();
        Text.create('探花');
        __Text__textStyle();
        Text.pop();
        Column.pop();
        Column.create({ space: 4 });
        Image.create($rawfile(`${this.imgArray[3]}`));
        Image.borderColor(0x9800fc);
        __Image__imgStyle();
        Text.create('进士');
        __Text__textStyle();
        Text.pop();
        Column.pop();
        Row.pop();
        //触发区--------------------
        Button.createWithLabel('去抽卡', { type: ButtonType.Normal, stateEffect: true });
        __Button__cardStyle();
        //触发区--------------------
        Button.onClick(() => {
            //调用抽卡业务函数
            this.judgeFunction();
        });
        //触发区--------------------
        Button.pop();
        Button.createWithLabel('看结果', { type: ButtonType.Normal, stateEffect: true });
        __Button__cardStyle();
        Button.onClick(() => {
            //判定等级
            this.confirmGrade();
            // 专门用来查看结果的业务逻辑
            this.lookGrade();
        });
        Button.pop();
        Column.pop();
    }
    //抽卡的业务逻辑
    judgeFunction() {
        //能抽卡的情况
        if (this.times > 0 && this.source < 50 && this.source > 0) {
            //第一件事：抽卡次数-1
            this.times--;
            this.randomGrade(1, 4);
            this.dialogController.open();
        }
        else {
            //不能抽卡的情况。分门别类的提示。
            //判断其他情况。应该给出不让抽奖的提示
            if (this.times <= 0) {
                //避免UI界面上抽卡次数变成-1
                this.times = 0;
                //弹窗提示说：次数用完
                AlertDialog.show({
                    title: '提示',
                    message: '您的抽卡次数已经用完了',
                    autoCancel: true
                });
            }
            //对成绩判断。比如已经0分了。
            if (this.source >= 50) {
                this.times = 0;
                AlertDialog.show({
                    message: '您已高中状元，无需抽奖',
                });
            }
            // 成绩小于0
            if (this.source <= 0) {
                this.times = 0;
                AlertDialog.show({
                    message: '滚出考场',
                });
            }
        }
    }
    // 随机数函数，方便让level的值，随机出现
    randomGrade(Min, Max) {
        let Range = Max - Min; //3
        let Rand = Math.random(); // 0 - 0.9999 ? 0.99
        // 1-4的随机数获取
        this.rangNumber = Min + Math.round(Rand * Range);
        this.level = this.rangNumber;
        // 红+50
        if (this.level == 1) {
            this.source += 50;
        }
        // 黄+10
        if (this.level == 2) {
            this.source += 10;
        }
        // 蓝 -5
        if (this.level == 3) {
            this.source -= 5;
        }
        //绿 归零
        if (this.level == 4) {
            this.source = 0;
        }
    }
    //准备自定义弹窗组件 顶部记得导入。。。
    private dialogController: CustomDialogController;
    //积分等级判断
    confirmGrade() {
        //等级甲乙丙丁末
        if (this.source >= 50) {
            this.gradeLv = '甲';
        }
        if (this.source == 40) {
            this.gradeLv = '乙';
        }
        if (this.source == 25) {
            this.gradeLv = '丙';
        }
        if (this.source < 25 && this.source > 0) {
            this.gradeLv = '丁'; //进士
        }
        if (this.source <= 0) {
            this.gradeLv = '末'; //落榜
        }
    }
    //看结果之前，先判定一下用户能不能去第二个页面
    lookGrade() {
        //你还有抽奖次数呢。
        if (this.times > 0) {
            AlertDialog.show({
                title: '请继续抽卡',
                message: '你的抽卡未完成，无法查看你的功名！！！'
            });
        }
        else {
            //判定等级或者说成绩
            if (this.gradeLv == '末') {
                AlertDialog.show({
                    title: '落榜啦',
                    message: '您落榜了就不配查看结果页面'
                });
            }
            else {
                //没落榜
                router.push({
                    url: CommonConstants.SECOND_URL2,
                    params: {
                        'lv': this.gradeLv
                    }
                });
            }
        }
    }
}
//组件样式
function __Button__cardStyle(): void {
    Button.width('50%');
    Button.height('8%');
    Button.borderRadius(8);
    Button.fontSize(24);
    Button.fontWeight(600);
    Button.shadow({ radius: 10, color: 0xD3D3D3, offsetX: 20, offsetY: 20 });
    Button.margin({ top: '2%' });
}
function __Image__imgStyle(): void {
    Image.width('45%');
    Image.height('25%');
    Image.borderWidth(4);
    Image.borderRadius(30);
}
function __Text__textStyle(): void {
    Text.fontSize(24);
    Text.fontWeight(600);
    Text.fontColor(0xB0C4DE);
}
function __Text__topText(): void {
    Text.width('80%');
    Text.height('10%');
    Text.backgroundColor(0xff8247);
    Text.margin({
        left: '10%',
        top: '3%'
    });
    Text.textAlign(TextAlign.Center);
    Text.borderRadius(10);
    Text.fontColor('white');
    Text.shadow({
        radius: 10,
        color: 0xd3d3d3,
        offsetX: 20,
        offsetY: 30
    });
}
loadDocument(new GamePage("1", undefined, {}));
