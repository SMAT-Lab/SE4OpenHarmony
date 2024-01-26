let __generate__Id: number = 0;
function generateId(): string {
    return "SongItem_" + ++__generate__Id;
}
/**
 * Music information entity class.
 */
export class SongItem {
    /**
     * Primary key ID.
     */
    id: number;
    /**
     * Music name.
     */
    title: string;
    /**
     * Music author name.
     */
    singer: string;
    /**
     * Music logo information.
     */
    mark: Resource;
    /**
     * Music avatar information.
     */
    label: Resource;
    /**
     * Music file path information.
     */
    src: string;
    /**
     * Index of the current music list.
     */
    index: number;
}
