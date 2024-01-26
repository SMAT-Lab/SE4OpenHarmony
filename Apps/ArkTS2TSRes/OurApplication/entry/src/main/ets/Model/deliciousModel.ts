let __generate__Id: number = 0;
function generateId(): string {
    return "deliciousModel_" + ++__generate__Id;
}
export class DeliciousModel {
    reason: string;
    result: {
        curpage: number;
        allnum: number;
        list: Array<{
            id: number;
            type_id: number;
            type_name: string;
            cp_name: string;
            zuofa: string;
            texing: string;
            tishi: string;
            tiaoliao: string;
            yuanliao: string;
        }>;
    };
    error_code: number;
}
