let __generate__Id: number = 0;
function generateId(): string {
    return "XiaohuaModel_" + ++__generate__Id;
}
export class XiaohuaModel {
    reason: string;
    result: {
        data: {
            content: string;
            hashId: string;
            unixtime: number;
            updatetime: string;
        };
    };
}
