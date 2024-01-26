let __generate__Id: number = 0;
function generateId(): string {
    return "MenuData_" + ++__generate__Id;
}
/**
 * Menu item info.
 */
export class MenuData {
    /**
     * Indicates menu title.
     */
    value: string;
    /**
     * Indicates menu action.
     */
    action: () => void;
}
