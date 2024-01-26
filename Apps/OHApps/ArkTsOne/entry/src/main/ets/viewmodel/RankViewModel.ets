/**
 * @Author 大连海事大学 袁佳林 572598394@qq.com
 * @Description
* @Date 2023/8/7 14:22
 */
import { rankData1, rankData2 } from '../model/DataModel';

export class RankViewModel {
 // Load data from the rankData1 of the Mock file.
 loadRankDataSource1(): any[] {
  return rankData1;
 }

 // Load data from the rankData2 of the Mock file,but rankData2 is different from rankData1.
 loadRankDataSource2(): any[] {
  return rankData2;
 }
}
