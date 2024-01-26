let __generate__Id: number = 0;
function generateId(): string {
    return "friendModel_" + ++__generate__Id;
}
export class FriendModel {
    reason: string;
    result: {
        text: string; // content
    };
    error_code: number;
}
