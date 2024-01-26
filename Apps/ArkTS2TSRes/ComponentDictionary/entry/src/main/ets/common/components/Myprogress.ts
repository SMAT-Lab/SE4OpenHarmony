interface MyProgress_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Myprogress_" + ++__generate__Id;
}
export class MyProgress extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyProgress_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Column.create({ space: 15 });
        Column.width('100%');
        Column.margin({ top: 30 });
        Text.create('Linear Progress');
        Text.fontSize(9);
        Text.fontColor(0xCCCCCC);
        Text.width('90%');
        Text.pop();
        Progress.create({ value: 10, type: ProgressType.Linear });
        Progress.width(200);
        Progress.create({ value: 20, total: 150, type: ProgressType.Linear });
        Progress.color(Color.Grey);
        Progress.value(50);
        Progress.width(200);
        Text.create('Eclipse Progress');
        Text.fontSize(9);
        Text.fontColor(0xCCCCCC);
        Text.width('90%');
        Text.pop();
        Row.create({ space: 40 });
        Progress.create({ value: 10, type: ProgressType.Eclipse });
        Progress.width(100);
        Progress.create({ value: 20, total: 150, type: ProgressType.Eclipse });
        Progress.color(Color.Grey);
        Progress.value(50);
        Progress.width(100);
        Row.pop();
        Text.create('ScaleRing Progress');
        Text.fontSize(9);
        Text.fontColor(0xCCCCCC);
        Text.width('90%');
        Text.pop();
        Row.create({ space: 40 });
        Progress.create({ value: 10, type: ProgressType.ScaleRing });
        Progress.width(100);
        Progress.create({ value: 20, total: 150, type: ProgressType.ScaleRing });
        Progress.color(Color.Grey);
        Progress.value(50);
        Progress.width(100);
        Progress.style({ strokeWidth: 15, scaleCount: 15, scaleWidth: 5 });
        Row.pop();
        // scaleCount和scaleWidth效果对比
        Row.create({ space: 40 });
        Progress.create({ value: 20, total: 150, type: ProgressType.ScaleRing });
        Progress.color(Color.Grey);
        Progress.value(50);
        Progress.width(100);
        Progress.style({ strokeWidth: 20, scaleCount: 20, scaleWidth: 5 });
        Progress.create({ value: 20, total: 150, type: ProgressType.ScaleRing });
        Progress.color(Color.Grey);
        Progress.value(50);
        Progress.width(100);
        Progress.style({ strokeWidth: 20, scaleCount: 30, scaleWidth: 3 });
        // scaleCount和scaleWidth效果对比
        Row.pop();
        Text.create('Ring Progress');
        Text.fontSize(9);
        Text.fontColor(0xCCCCCC);
        Text.width('90%');
        Text.pop();
        Row.create({ space: 40 });
        Progress.create({ value: 10, type: ProgressType.Ring });
        Progress.width(100);
        Progress.create({ value: 20, total: 150, type: ProgressType.Ring });
        Progress.color(Color.Grey);
        Progress.value(50);
        Progress.width(100);
        Progress.style({ strokeWidth: 20, scaleCount: 30, scaleWidth: 20 });
        Row.pop();
        Text.create('Capsule Progress');
        Text.fontSize(9);
        Text.fontColor(0xCCCCCC);
        Text.width('90%');
        Text.pop();
        Row.create({ space: 40 });
        Progress.create({ value: 10, type: ProgressType.Capsule });
        Progress.width(100);
        Progress.height(50);
        Progress.create({ value: 20, total: 150, type: ProgressType.Capsule });
        Progress.color(Color.Grey);
        Progress.value(50);
        Progress.width(100);
        Progress.height(50);
        Row.pop();
        Column.pop();
    }
}
