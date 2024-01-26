interface MyGauge_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyGauge_" + ++__generate__Id;
}
export class MyGauge extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyGauge_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.margin({ top: 5 });
        Gauge.create({ value: 50, min: 0, max: 100 });
        Gauge.startAngle(210);
        Gauge.endAngle(150);
        Gauge.colors([[0x317AF7, 1], [0x5BA854, 1], [0xE08C3A, 1], [0x9C554B, 1], [0xD94838, 1]]);
        Gauge.strokeWidth(20);
        Gauge.width(200);
        Gauge.height(200);
        Gauge.pop();
        Column.pop();
    }
}
