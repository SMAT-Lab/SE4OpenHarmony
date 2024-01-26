import router from '@ohos.router';
@Entry
@Component
struct FinalGrade {
  // 从路由中获取等级
  @State gradeLv:string =router.getParams()['gradeLv']
  // @State gradeLv:string ='甲'

  build() {
    Column({space:10}){
      if (this.gradeLv=='甲'){
        Image($rawfile('images/red.jpg')).imageStyle()
        Text('春风得意马蹄疾').textStyle().fontColor(0xf21225)
        Text('一日看尽长安花').textStyle().fontColor(0xf21225)
      }
      if(this.gradeLv=='乙'){
        Image($rawfile('images/yellow.jpg')).imageStyle()
        Text('丹阙万人窥榜眼').textStyle().fontColor(0xfbd501)
        Text('碧幢千骑拥遨头').textStyle().fontColor(0xfbd501)
      }
      if (this.gradeLv=='丙'){
        Image($rawfile('images/blue.jpg')).imageStyle()
        Text('探花时节日偏长').textStyle().fontColor(0x3f97fd)
        Text('恬淡春风称意忙').textStyle().fontColor(0x3f97fd)
      }
      if (this.gradeLv=='丁'){
        Image($rawfile('images/purple.jpg')).imageStyle()
        Text('圣上喜迎新进士').textStyle().fontColor(0x9800fb)
        Text('民间应得好官人').textStyle().fontColor(0x9800fb)
      }
    }.width('100%')
    .height('100%')
  }
}
@Extend(Image)function imageStyle(){
  .width('100%')
  .height('60%')
}
@Extend(Text)function textStyle(){
  .fontSize(30)
  .fontWeight(700)
}