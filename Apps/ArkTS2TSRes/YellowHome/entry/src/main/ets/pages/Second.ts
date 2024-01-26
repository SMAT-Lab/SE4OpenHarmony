interface Second_Params {
    showText?: string;
    proValue?: number;
    timer?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Second_" + ++__generate__Id;
}
import router from '@ohos.router';
// @ts-ignore
import AppContext from '@ohos.application.context';
class Second extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__showText = new ObservedPropertySimple(router.getParams()['userName'] ? router.getParams()['userName'] : '马哥'
        //定义进度条的进度初识值
        , this, "showText");
        this.__proValue = new ObservedPropertySimple(20
        // 更新进度条的定时器标记  这个变量的变化，对布局没有影响，不必重新渲染页面
        , this, "proValue");
        this.timer = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Second_Params) {
        if (params.showText !== undefined) {
            this.showText = params.showText;
        }
        if (params.proValue !== undefined) {
            this.proValue = params.proValue;
        }
        if (params.timer !== undefined) {
            this.timer = params.timer;
        }
    }
    aboutToBeDeleted() {
        this.__showText.aboutToBeDeleted();
        this.__proValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    // 接收从第一个页面传递过来的考生姓名  userName  使用三元运算符避免玩家没有录入姓名
    private __showText: ObservedPropertySimple<string>;
    get showText() {
        return this.__showText.get();
    }
    set showText(newValue: string) {
        this.__showText.set(newValue);
    }
    //定义进度条的进度初识值
    private __proValue: ObservedPropertySimple<number>;
    get proValue() {
        return this.__proValue.get();
    }
    set proValue(newValue: number) {
        this.__proValue.set(newValue);
    }
    // 更新进度条的定时器标记  这个变量的变化，对布局没有影响，不必重新渲染页面
    private timer: number;
    render() {
        Column.create({ space: 20 });
        Column.width('100%');
        Column.height('100%');
        Text.create(`【${this.showText}】` + '正在进入游戏...');
        __Text__textStyle();
        Text.pop();
        Progress.create({ value: this.proValue, total: 100, type: ProgressType.ScaleRing });
        Progress.color(0x1E90FF);
        Progress.width(150);
        Progress.style({ strokeWidth: 20, scaleCount: 30, scaleWidth: 3 });
        Progress.margin({ top: '30%' });
        Column.pop();
    }
    //让这个页面加载的时候执行某些功能。
    aboutToAppear() {
        //定时器函数
        this.timer = setInterval(() => {
            this.proValue += 20;
            //如果进图条的值》100了.
            if (this.proValue >= 100) {
                clearInterval(this.timer);
                //如果进度条的值>100 跳转到GameAbility  拉起这个模块，传递参数给这个模块
                this.turnToGameAbility();
            }
        }, 1000);
    }
    turnToGameAbility() {
        //   1.首先获取AbilityContext接口
        let handle = getContext() as AppContext.AbilityContext;
        //   2:调用startxxx方法并且传递相关的数据。
        let want = {
            //bundleName的值取决于你项目创建时生成的内容，在AppScope/app.json5中查看
            bundleName: 'com.example.yellowhome',
            abilityName: 'GameAbility',
            parameters: {
                'userName': this.showText
            }
        };
        //拉起want变量中存放的指定的项目中指定的GameAbility
        handle.startAbility(want);
    }
}
//组件样式
function __Text__textStyle(): void {
    Text.fontColor(0x1E90FF);
    Text.fontWeight(700);
    Text.fontSize(24);
}
loadDocument(new Second("1", undefined, {}));
