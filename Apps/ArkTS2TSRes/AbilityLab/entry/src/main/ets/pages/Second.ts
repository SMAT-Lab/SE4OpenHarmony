interface Second_Params {
    showText?: string;
    proValue?: number;
    colorValue?: number;
    timer?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Second_" + ++__generate__Id;
}
import router from '@ohos.router';
// @ts-ignore
import AppContext from '@ohos.application.context';
import hilog from '@ohos.hilog';
import CommonConstants from '../common/constants/CommonConstants';
class Second extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__showText = new ObservedPropertySimple(router.getParams()['showText'] ? router.getParams()['showText'] : '12'
        // 进度条是变化的，先给它定义一个初始化值
        , this, "showText");
        this.__proValue = new ObservedPropertySimple(20, this, "proValue");
        this.__colorValue = new ObservedPropertySimple(20, this, "colorValue");
        this.timer = 0;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Second_Params) {
        if (params.showText !== undefined) {
            this.showText = params.showText;
        }
        if (params.proValue !== undefined) {
            this.proValue = params.proValue;
        }
        if (params.colorValue !== undefined) {
            this.colorValue = params.colorValue;
        }
        if (params.timer !== undefined) {
            this.timer = params.timer;
        }
    }
    aboutToBeDeleted() {
        this.__showText.aboutToBeDeleted();
        this.__proValue.aboutToBeDeleted();
        this.__colorValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    // 获取index传递过来的玩家姓名
    private __showText: ObservedPropertySimple<string>;
    get showText() {
        return this.__showText.get();
    }
    set showText(newValue: string) {
        this.__showText.set(newValue);
    }
    // 进度条是变化的，先给它定义一个初始化值
    private __proValue: ObservedPropertySimple<number>;
    get proValue() {
        return this.__proValue.get();
    }
    set proValue(newValue: number) {
        this.__proValue.set(newValue);
    }
    private __colorValue: ObservedPropertySimple<number>;
    get colorValue() {
        return this.__colorValue.get();
    }
    set colorValue(newValue: number) {
        this.__colorValue.set(newValue);
    }
    private timer: number;
    /**
     * 进度条的变幻可以用定时器
     * 它的转换过程在build之前
     * 可以在build组件出现之前，做一些其他设置，aboutToAppear就是在build之前的组件
     */
    aboutToAppear() {
        //   欢迎页面的倒计时，复杂页面的数据加载
        //进度条进度控制
        this.timer = setInterval(() => {
            this.proValue = this.proValue + 20;
            // this.proValue += 20
            if (this.proValue >= 100) {
                clearInterval(this.timer);
                // router.back()
                //拉起第二个ability
                //   进度条加载完之后，进行跳转
                this.turnToGameAbility();
            }
        }, 1000);
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Column.create({ space: 20 });
        Column.create({ space: 20 });
        Column.margin({ top: '10%' });
        Text.create(`【${this.showText}】` + '正在进入游戏....');
        __Text__textStyle();
        Text.pop();
        Progress.create({ value: this.proValue, total: 100, type: ProgressType.ScaleRing });
        Progress.color(0x1e90ff);
        Progress.width(150);
        Progress.style({ strokeWidth: 20, scaleCount: 30, scaleWidth: 3 });
        Progress.margin({ top: '30%' });
        Column.pop();
        Column.pop();
        Column.pop();
        Row.pop();
    }
    //跳转到gameablity
    turnToGameAbility() {
        //   1、获取AbilityContext的接口
        let handler = getContext(this) as AppContext.AbilityContext;
        //   2、获取到AbilityContext的接口后，调用该接口中的StartAbility()方法,启动GameAbility
        this.startGameAbility(handler);
    }
    //   具体的跳转方法
    startGameAbility(context) {
        const want = {
            // app.json5
            bundleName: "com.example.abilitylab",
            // module.json5
            abilityName: "GameAbility",
            parameters: {
                username: `${this.showText}`
            }
        };
        try {
            context.startAbility(want);
        }
        catch (error) {
            hilog.error(CommonConstants.LOG_COLOR, CommonConstants.TAG, '%{public}s', error);
        }
    }
}
function __Text__textStyle(): void {
    Text.fontColor(0x1e90ff);
    Text.fontSize(24);
    Text.fontWeight(700);
}
loadDocument(new Second("1", undefined, {}));
