let __generate__Id: number = 0;
function generateId(): string {
    return "healthyModel_" + ++__generate__Id;
}
export class HealthyModel {
    reason: string;
    result: {
        content: string; //内容
    };
    error_code: number;
}
