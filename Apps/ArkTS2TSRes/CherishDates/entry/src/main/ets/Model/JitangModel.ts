let __generate__Id: number = 0;
function generateId(): string {
    return "JitangModel_" + ++__generate__Id;
}
export class JitangModel {
    reason: string;
    result: {
        text: string; //内容
    };
    error_code: number;
}
