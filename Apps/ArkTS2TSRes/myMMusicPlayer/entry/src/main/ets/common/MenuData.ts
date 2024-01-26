let __generate__Id: number = 0;
function generateId(): string {
    return "MenuData_" + ++__generate__Id;
}
export class MenuData {
    value: string;
    action: () => void;
}
