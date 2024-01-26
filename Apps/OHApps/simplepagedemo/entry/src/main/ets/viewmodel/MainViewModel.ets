
//主界面视图model
import ItemData from '../common/bean/ItemData'
export class MainViewModel{
  getFirstGridData():Array<ItemData>{
    let firstGridData:ItemData[]=[
      new ItemData($r('app.string.my_love'),$r('app.media.love')),
      new ItemData($r('app.string.historical_record'),$r('app.media.record')),
      new ItemData($r('app.string.message'),$r('app.media.message')),
      new ItemData($r('app.string.buyCar'),$r('app.media.shopping')),
      new ItemData($r('app.string.my_love'),$r('app.media.love')),
      new ItemData($r('app.string.historical_record'),$r('app.media.record')),
      new ItemData($r('app.string.message'),$r('app.media.message')),
      new ItemData($r('app.string.buyCar'),$r('app.media.shopping')),
    ];
    return firstGridData;
  }
}
export default  new MainViewModel();