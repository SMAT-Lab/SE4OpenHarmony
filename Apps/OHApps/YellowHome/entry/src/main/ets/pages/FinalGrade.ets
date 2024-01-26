import CommonConstants from '../common/constants/CommonConstants'
import router from '@ohos.router'

@Entry
@Component
struct FinalGrade {
  @State lv: string = router.getParams()['lv']

  build() {
    Column({ space: 10 }) {
      if (this.lv == '甲') {
        Image($rawfile(CommonConstants.images[0]))
          .imgStyle()
        Text('春风得意马蹄疾').textStyle('red')
        Text('一日看尽殷墟花').textStyle('red')
      }
      if (this.lv == '乙') {
        Image($rawfile(CommonConstants.images[1])).imgStyle()
        Text('我是第二名').textStyle('#fed400')
        Text('也还不错哦').textStyle('#fed400')
      }
      if (this.lv == '丙') {
        Image($rawfile(CommonConstants.images[2])).imgStyle()
        Text('探花时节日偏长').textStyle('#3d98fb')
        Text('洽淡春风称意忙').textStyle('#3d98fb')
      }
      if (this.lv == '丁') {
        Image($rawfile(CommonConstants.images[3])).imgStyle()
        Text('进士及第不丢人').textStyle('#9a00ff')
        Text('圆梦安工也还行').textStyle('#9a00ff')
      }
    }.width('100%').width('100%')
  }
}


@Extend(Image) function imgStyle() {
  .width('100%')
  .height('60%')
}
@Extend(Text)function textStyle(tcolor){
  .fontSize(30)
  .fontWeight(700)
  .fontColor(tcolor)
}