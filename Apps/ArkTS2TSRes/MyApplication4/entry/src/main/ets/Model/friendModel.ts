let __generate__Id: number = 0;
function generateId(): string {
    return "friendModel_" + ++__generate__Id;
}
export class FriendModel {
    reason: string;
    result: {
        content: string; //内容
        source: string; //来源
    };
    error_code: number;
}
