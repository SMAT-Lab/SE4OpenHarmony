interface FinalGrade_Params {
    lv?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "FinalGrade_" + ++__generate__Id;
}
import CommonConstants from '../common/constants/CommonConstants';
import router from '@ohos.router';
class FinalGrade extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__lv = new ObservedPropertySimple(router.getParams()['lv'], this, "lv");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: FinalGrade_Params) {
        if (params.lv !== undefined) {
            this.lv = params.lv;
        }
    }
    aboutToBeDeleted() {
        this.__lv.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __lv: ObservedPropertySimple<string>;
    get lv() {
        return this.__lv.get();
    }
    set lv(newValue: string) {
        this.__lv.set(newValue);
    }
    render() {
        Column.create({ space: 10 });
        Column.width('100%');
        Column.width('100%');
        If.create();
        if (this.lv == '甲') {
            If.branchId(0);
            Image.create($rawfile(CommonConstants.images[0]));
            __Image__imgStyle();
            Text.create('春风得意马蹄疾');
            __Text__textStyle('red');
            Text.pop();
            Text.create('一日看尽殷墟花');
            __Text__textStyle('red');
            Text.pop();
        }
        If.pop();
        If.create();
        if (this.lv == '乙') {
            If.branchId(0);
            Image.create($rawfile(CommonConstants.images[1]));
            __Image__imgStyle();
            Text.create('我是第二名');
            __Text__textStyle('#fed400');
            Text.pop();
            Text.create('也还不错哦');
            __Text__textStyle('#fed400');
            Text.pop();
        }
        If.pop();
        If.create();
        if (this.lv == '丙') {
            If.branchId(0);
            Image.create($rawfile(CommonConstants.images[2]));
            __Image__imgStyle();
            Text.create('探花时节日偏长');
            __Text__textStyle('#3d98fb');
            Text.pop();
            Text.create('洽淡春风称意忙');
            __Text__textStyle('#3d98fb');
            Text.pop();
        }
        If.pop();
        If.create();
        if (this.lv == '丁') {
            If.branchId(0);
            Image.create($rawfile(CommonConstants.images[3]));
            __Image__imgStyle();
            Text.create('进士及第不丢人');
            __Text__textStyle('#9a00ff');
            Text.pop();
            Text.create('圆梦安工也还行');
            __Text__textStyle('#9a00ff');
            Text.pop();
        }
        If.pop();
        Column.pop();
    }
}
function __Image__imgStyle(): void {
    Image.width('100%');
    Image.height('60%');
}
function __Text__textStyle(tcolor): void {
    Text.fontSize(30);
    Text.fontWeight(700);
    Text.fontColor(tcolor);
}
loadDocument(new FinalGrade("1", undefined, {}));
