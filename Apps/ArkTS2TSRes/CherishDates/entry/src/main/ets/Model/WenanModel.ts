let __generate__Id: number = 0;
function generateId(): string {
    return "WenanModel_" + ++__generate__Id;
}
export class WenanModel {
    reason: string;
    result: {
        content: string; //内容
        source: string;
    };
    error_code: number;
}
