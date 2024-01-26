let __generate__Id: number = 0;
function generateId(): string {
    return "RankData_" + ++__generate__Id;
}
/**
 * @Author 大连海事大学 袁佳林 572598394@qq.com
 * @Description
* @Date 2023/8/7 14:17
 */
export class RankData {
    public fruitName: Resource;
    private vote: String;
    private id: String;
}
