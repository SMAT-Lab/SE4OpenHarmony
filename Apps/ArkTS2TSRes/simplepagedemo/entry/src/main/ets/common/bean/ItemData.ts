let __generate__Id: number = 0;
function generateId(): string {
    return "ItemData_" + ++__generate__Id;
}
// 列表数据实体类
export default class PageResource {
    title: Resource;
    img?: Resource;
    other?: Resource;
    constructor(title: Resource, img?: Resource, other?: Resource) {
        this.title = title;
        this.img = img;
        this.other = other;
    }
}
