interface GamePage_Params {
    message?: string;
    score?: number;
    time?: number;
    imageArray?: string[];
    rangNumber?: number;
    level?: number;
    gradeLv?: string;
    //2、实现抽卡功能
    //   自定义弹窗组件
    dialogController?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "GamePage_" + ++__generate__Id;
}
// @ts-ignore
import router from '@ohos.router';
import CommonConstants from '../common/constants/CommonConstants';
// @ts-ignore
import CustomCardDialog, { CustomDialogExample } from '../common/customComponent/CustomCardDialog';
// 解析存在GameAbility.ts的AppStorage中由EntryAbility传递过来的数据
const KEY: string = 'UserName';
const UserName: string = AppStorage.Get<string>(KEY);
class GamePage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple(UserName, this, "message");
        this.__score = new ObservedPropertySimple(10 //得分
        , this, "score");
        this.__time = new ObservedPropertySimple(3 //抽卡次数
        , this, "time");
        this.__imageArray = new ObservedPropertyObject(['images/red.jpg', 'images/yellow.jpg', 'images/blue.jpg', 'images/purple.jpg'], this, "imageArray");
        this.__rangNumber = new ObservedPropertySimple(0, this, "rangNumber");
        this.__level = new ObservedPropertySimple(0 //卡等级
        , this, "level");
        this.__gradeLv = new ObservedPropertySimple('' //最后得分等级
        , this, "gradeLv");
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new CustomDialogExample("2", this, {
                    cancel: () => this.onCancel(),
                    confirm: () => this.onAccept(),
                    score: this.__score,
                    level: this.__level
                });
                jsDialog.setController(this.
                //2、实现抽卡功能
                //   自定义弹窗组件
                dialogController);
                View.create(jsDialog);
            },
            cancel: () => this.existApp(),
            autoCancel: true
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: GamePage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.score !== undefined) {
            this.score = params.score;
        }
        if (params.time !== undefined) {
            this.time = params.time;
        }
        if (params.imageArray !== undefined) {
            this.imageArray = params.imageArray;
        }
        if (params.rangNumber !== undefined) {
            this.rangNumber = params.rangNumber;
        }
        if (params.level !== undefined) {
            this.level = params.level;
        }
        if (params.gradeLv !== undefined) {
            this.gradeLv = params.gradeLv;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__score.aboutToBeDeleted();
        this.__time.aboutToBeDeleted();
        this.__imageArray.aboutToBeDeleted();
        this.__rangNumber.aboutToBeDeleted();
        this.__level.aboutToBeDeleted();
        this.__gradeLv.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __score: ObservedPropertySimple<number>; //得分
    get score() {
        return this.__score.get();
    }
    set score(newValue: number) {
        this.__score.set(newValue);
    }
    private __time: ObservedPropertySimple<number>; //抽卡次数
    get time() {
        return this.__time.get();
    }
    set time(newValue: number) {
        this.__time.set(newValue);
    }
    private __imageArray: ObservedPropertyObject<string[]>;
    get imageArray() {
        return this.__imageArray.get();
    }
    set imageArray(newValue: string[]) {
        this.__imageArray.set(newValue);
    }
    private __rangNumber: ObservedPropertySimple<number>; //随机生成数
    get rangNumber() {
        return this.__rangNumber.get();
    }
    set rangNumber(newValue: number) {
        this.__rangNumber.set(newValue);
    }
    private __level: ObservedPropertySimple<number>; //卡等级
    get level() {
        return this.__level.get();
    }
    set level(newValue: number) {
        this.__level.set(newValue);
    }
    private __gradeLv: ObservedPropertySimple<string>; //最后得分等级
    get gradeLv() {
        return this.__gradeLv.get();
    }
    set gradeLv(newValue: string) {
        this.__gradeLv.set(newValue);
    }
    render() {
        Column.create({ space: 4 });
        Column.width('100%');
        Column.height('100%');
        //   统计栏
        Row.create({ space: 5 });
        __Row__rowStyle();
        Text.create(this.message + '得分:' + this.score);
        __Text__textStyle();
        Text.pop();
        Text.create('抽卡次数:' + this.time);
        __Text__textStyle();
        Text.pop();
        //   统计栏
        Row.pop();
        //   显示区
        Row.create({ space: 4 });
        Column.create({ space: 4 });
        Image.create($rawfile(`${this.imageArray[0]}`));
        Image.borderColor(0xf21225);
        __Image__imageStyle();
        Text.create('状元');
        __Text__textStyle();
        Text.pop();
        Column.pop();
        Column.create({ space: 4 });
        Image.create($rawfile(`${this.imageArray[1]}`));
        Image.borderColor(0xfbd501);
        __Image__imageStyle();
        Text.create('榜眼');
        __Text__textStyle();
        Text.pop();
        Column.pop();
        //   显示区
        Row.pop();
        Row.create({ space: 4 });
        Column.create({ space: 4 });
        Image.create($rawfile(`${this.imageArray[2]}`));
        Image.borderColor(0x3f97fd);
        __Image__imageStyle();
        Text.create('探花');
        __Text__textStyle();
        Text.pop();
        Column.pop();
        Column.create({ space: 4 });
        Image.create($rawfile(`${this.imageArray[3]}`));
        Image.borderColor(0x9800fc);
        __Image__imageStyle();
        Text.create('进士');
        __Text__textStyle();
        Text.pop();
        Column.pop();
        Row.pop();
        //   触发区
        Button.createWithLabel('去抽卡', { type: ButtonType.Normal, stateEffect: true });
        __Button__butStyle();
        //   触发区
        Button.onClick(() => { this.judgeFunction(); });
        //   触发区
        Button.pop();
        Button.createWithLabel('看结果', { type: ButtonType.Normal, stateEffect: true });
        __Button__butStyle();
        Button.onClick(() => {
            // 先对等级进行判断
            this.judgeGradeLv();
            // 给个提示查看分数和等级
            console.log('------------');
            // console.info('.........this.score='+this.score)
            // console.info('.........this.gradeLv='+this.gradeLv)
            this.lookGrade();
        });
        Button.pop();
        Column.pop();
    }
    //2、实现抽卡功能
    //   自定义弹窗组件
    private dialogController: CustomDialogController;
    //   弹窗回调
    onCancel() {
        console.log('cancel....');
    }
    onAccept() {
        console.log('accept....');
    }
    existApp() {
        console.log('exist.....');
    }
    //   2.1定义一个随机函数
    randomGrade(Min, Max) {
        // 随机抽取1-4中任意数字
        var Range = Max - Min;
        var rand = Math.random();
        this.rangNumber = Min + Math.round(rand * Range); //四舍五入
        //   抽到红卡+50分，弹窗回显红卡
        if (this.rangNumber == 1) {
            this.score += 50;
            this.level = 1;
        }
        //   抽到黄卡+10分，弹窗回显黄卡
        if (this.rangNumber == 2) {
            this.score += 10;
            this.level = 2;
        }
        //   抽到蓝卡-5分，弹窗回显蓝卡
        if (this.rangNumber == 3) {
            this.score -= 5;
            this.level = 3;
        }
        //   抽到绿卡0分，得分归0 弹窗回显绿卡
        if (this.rangNumber == 4) {
            this.score = 0;
            this.level = 4;
        }
    }
    //   积分、抽卡次数判断函数
    judgeFunction() {
        this.time--; //抽一次，抽卡次数减一
        // 判断，次数大于0时，并且没有抽到50和0的积分卡
        if (this.time >= 0 && this.score < 50 && this.score > 0) {
            this.randomGrade(1, 4); //调用的是前面定义的定义随机数字
            this.dialogController.open(); //根据随机抽取的数字，score加减完之后，进行弹窗显示，调用上面的弹窗组件
        }
        else {
            // 当抽卡次数用尽
            if (this.time < 0) {
                this.time = 0;
                AlertDialog.show({
                    title: '提示',
                    message: '您的抽卡次数已用完',
                    confirm: {
                        value: '关闭',
                        action: () => { console.info('close.....'); }
                    },
                    cancel: () => {
                        console.info('cancel........');
                    }
                });
            }
            // 当抽中状元
            if (this.score >= 50) {
                this.time = 0;
                AlertDialog.show({
                    title: '提示',
                    message: '您已高中状元，无需再抽',
                    confirm: {
                        value: '关闭',
                        action: () => {
                            console.info('close,,,,,');
                        }
                    },
                    cancel: () => {
                        console.info('cancel....');
                    }
                });
            }
            //   当得分小于0分
            if (this.score <= 0) {
                this.time = 0;
                AlertDialog.show({
                    title: '提示',
                    message: '很遗憾，下次努力',
                    confirm: {
                        value: '关闭',
                        action: () => {
                            console.info('close....');
                        }
                    },
                    cancel: () => {
                        console.info('cancel........');
                    }
                });
            }
        }
    }
    //   根据结果判断等级
    judgeGradeLv() {
        if (this.score >= 50) {
            this.gradeLv = '甲'; //状元
        }
        else if (this.score >= 40 && this.score < 50) {
            this.gradeLv = '乙'; //榜眼，连抽3次10分卡
        }
        else if (this.score >= 25 && this.score < 40) {
            this.gradeLv = '丙'; //探花
        }
        else if (this.score < 25 && this.score > 0) {
            this.gradeLv = '丁'; //进士
        }
        else if (this.score <= 0) {
            this.gradeLv = '末'; //落榜
        }
    }
    //   查看游戏结果
    lookGrade() {
        // 抽卡还未完成，继续完成抽卡
        if (this.time > 0) {
            AlertDialog.show({
                title: "提示",
                message: "您的抽卡还未完成，无法查看功名",
                confirm: {
                    value: "关闭",
                    action: () => {
                        console.info('close');
                    },
                },
                cancel: () => {
                    console.info('cancel...');
                },
                autoCancel: true
            });
        }
        //  抽卡抽完了
        else {
            //  1、当 抽到’末‘的时候，弹窗
            if (this.gradeLv == '末') {
                AlertDialog.show({
                    title: '提示',
                    message: '很遗憾，您的成绩欠佳，未能中第',
                    confirm: {
                        value: '关闭',
                        action: () => {
                            console.info('close..');
                        }
                    },
                    cancel: () => {
                        console.info('cancel..');
                    }, autoCancel: true
                });
            }
            //   2、当为其他4个等级是，传递等级给结果展示页面
            else {
                router.push({
                    url: CommonConstants.SECOND_URL2,
                    params: {
                        gradeLv: this.gradeLv
                    }
                });
            }
        }
    }
}
//文本样式
function __Text__textStyle(): void {
    Text.fontSize(24);
    Text.fontWeight(600);
    Text.fontColor(0xb0c4de);
}
//row组件样式
function __Row__rowStyle(): void {
    Row.width('80%');
    Row.height('10%');
    Row.borderRadius(10);
    Row.margin({ top: '1%', bottom: '4%v' });
    Row.shadow({ radius: 10, color: 0xD3D3D3, offsetX: 20, offsetY: 20 });
    Row.backgroundColor(0xff8247);
    Row.justifyContent(FlexAlign.Center);
}
//图片样式
function __Image__imageStyle(): void {
    Image.width('45%');
    Image.height('25%');
    Image.borderWidth(4);
    Image.borderRadius(30);
    Image.margin({ top: '2%' });
}
//按钮样式
function __Button__butStyle(): void {
    Button.width('50%');
    Button.height('8%');
    Button.borderRadius(8);
    Button.fontSize(24);
    Button.fontWeight(600);
    Button.shadow({ radius: 10, color: 0xd3d3d3, offsetY: 20, offsetX: 20 });
    Button.margin({ top: '2%' });
}
loadDocument(new GamePage("1", undefined, {}));
