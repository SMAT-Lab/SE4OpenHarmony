let __generate__Id: number = 0;
function generateId(): string {
    return "CPIData_" + ++__generate__Id;
}
export class CPIData {
    id: number;
    month: string;
    data: number;
    constructor(id: number, month: string, data: number) {
        this.id = id; // 唯一表示
        this.month = month; // 月份
        this.data = data; // CPI数值
    }
}
