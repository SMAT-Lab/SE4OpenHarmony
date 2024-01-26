interface Index_Params {
    cpiData?: Array<CPIData>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
import { CPIData } from '../model/CPIData';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__cpiData = new ObservedPropertyObject([
            { id: 1, month: '2023年08月份', data: 100.1 },
            { id: 2, month: '2023年07月份', data: 99.7 },
            { id: 3, month: '2023年06月份', data: 100 },
            { id: 4, month: '2023年05月份', data: 100.2 },
            { id: 5, month: '2023年04月份', data: 100.1 },
            { id: 6, month: '2023年03月份', data: 100.7 },
            { id: 7, month: '2023年02月份', data: 101 },
            { id: 8, month: '2023年01月份', data: 102.1 }
        ], this, "cpiData");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.cpiData !== undefined) {
            this.cpiData = params.cpiData;
        }
    }
    aboutToBeDeleted() {
        this.__cpiData.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __cpiData: ObservedPropertyObject<Array<CPIData>>;
    get cpiData() {
        return this.__cpiData.get();
    }
    set cpiData(newValue: Array<CPIData>) {
        this.__cpiData.set(newValue);
    }
    render() {
    }
}
loadDocument(new Index("1", undefined, {}));
