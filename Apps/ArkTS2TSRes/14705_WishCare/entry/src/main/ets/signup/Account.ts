let __generate__Id: number = 0;
function generateId(): string {
    return "Account_" + ++__generate__Id;
}
export class Account {
    id: number;
    username: string;
    password: string;
}
