@Preview@Component
export struct Player{
  private IMAGE_WIDTH:number=20

  build(){
    Row({space:10}){
      Image($r('app.media.ic_album'))
        .width(30)
        .height(30)
        .aspectRatio(1)
        .objectFit(ImageFit.Contain)

      Column(){
        Text('不知道')
          .fontSize(12)
          .fontWeight(FontWeight.Bold)
        Row(){
          Image($r('app.media.app_icon'))
            .width(10)
            .height(10)
            .objectFit(ImageFit.Contain)
          Text('小小树人')
            .fontSize(10)
        }
      }.alignItems(HorizontalAlign.Start)

      Blank()

      Row({space:10}){
        Image($r('app.media.ic_public_favor'))
          .width(this.IMAGE_WIDTH)
          .aspectRatio(1)
        Image($r('app.media.ic_play_last'))
          .width(this.IMAGE_WIDTH)
          .aspectRatio(1)
        Image($r('app.media.ic_public_play'))
          .width(this.IMAGE_WIDTH)
          .aspectRatio(1)
        Image($r('app.media.ic_play_next'))
          .width(this.IMAGE_WIDTH)
          .aspectRatio(1)
        Image($r('app.media.ic_play_view'))
          .width(this.IMAGE_WIDTH)
          .aspectRatio(1)
      }.justifyContent(FlexAlign.End)
    }.width('100%')
    .backgroundColor('#ffe4e4e6')
    .borderRadius(10)
    .padding(10)
  }
}