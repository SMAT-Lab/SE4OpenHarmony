interface FinalGrade_Params {
    gradeLv?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "FinalGrade_" + ++__generate__Id;
}
import router from '@ohos.router';
class FinalGrade extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__gradeLv = new ObservedPropertySimple(router.getParams()['gradeLv']
        // @State gradeLv:string ='甲'
        , this, "gradeLv");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: FinalGrade_Params) {
        if (params.gradeLv !== undefined) {
            this.gradeLv = params.gradeLv;
        }
    }
    aboutToBeDeleted() {
        this.__gradeLv.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    // 从路由中获取等级
    private __gradeLv: ObservedPropertySimple<string>;
    get gradeLv() {
        return this.__gradeLv.get();
    }
    set gradeLv(newValue: string) {
        this.__gradeLv.set(newValue);
    }
    // @State gradeLv:string ='甲'
    render() {
        Column.create({ space: 10 });
        Column.width('100%');
        Column.height('100%');
        If.create();
        if (this.gradeLv == '甲') {
            If.branchId(0);
            Image.create({ "id": 0, "type": 30000, params: ['images/red.jpg'] });
            __Image__imageStyle();
            Text.create('春风得意马蹄疾');
            __Text__textStyle();
            Text.fontColor(0xf21225);
            Text.pop();
            Text.create('一日看尽长安花');
            __Text__textStyle();
            Text.fontColor(0xf21225);
            Text.pop();
        }
        If.pop();
        If.create();
        if (this.gradeLv == '乙') {
            If.branchId(0);
            Image.create({ "id": 0, "type": 30000, params: ['images/yellow.jpg'] });
            __Image__imageStyle();
            Text.create('丹阙万人窥榜眼');
            __Text__textStyle();
            Text.fontColor(0xfbd501);
            Text.pop();
            Text.create('碧幢千骑拥遨头');
            __Text__textStyle();
            Text.fontColor(0xfbd501);
            Text.pop();
        }
        If.pop();
        If.create();
        if (this.gradeLv == '丙') {
            If.branchId(0);
            Image.create({ "id": 0, "type": 30000, params: ['images/blue.jpg'] });
            __Image__imageStyle();
            Text.create('探花时节日偏长');
            __Text__textStyle();
            Text.fontColor(0x3f97fd);
            Text.pop();
            Text.create('恬淡春风称意忙');
            __Text__textStyle();
            Text.fontColor(0x3f97fd);
            Text.pop();
        }
        If.pop();
        If.create();
        if (this.gradeLv == '丁') {
            If.branchId(0);
            Image.create({ "id": 0, "type": 30000, params: ['images/purple.jpg'] });
            __Image__imageStyle();
            Text.create('圣上喜迎新进士');
            __Text__textStyle();
            Text.fontColor(0x9800fb);
            Text.pop();
            Text.create('民间应得好官人');
            __Text__textStyle();
            Text.fontColor(0x9800fb);
            Text.pop();
        }
        If.pop();
        Column.pop();
    }
}
function __Image__imageStyle(): void {
    Image.width('100%');
    Image.height('60%');
}
function __Text__textStyle(): void {
    Text.fontSize(30);
    Text.fontWeight(700);
}
loadDocument(new FinalGrade("1", undefined, {}));
