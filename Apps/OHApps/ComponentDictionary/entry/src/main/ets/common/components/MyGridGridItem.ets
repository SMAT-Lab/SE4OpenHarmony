@Component
export struct MyGridGridItem {
  @State numbers: string[] = ['0', '1', '2', '3', '4','5','6','7','8','9','10','11','12','13','14','15']

  build() {
    Column() {
      Grid() {
        GridItem() {
          Text('4')
            .fontSize(16).backgroundColor(0xFAEEE0)
            .width('100%').height('100%').textAlign(TextAlign.Center)
        }.rowStart(1).rowEnd(4)

        ForEach(this.numbers, (item) => {
          GridItem() {
            Text(item)
              .fontSize(16).backgroundColor(0xF9CF93)
              .width('100%').height('100%').textAlign(TextAlign.Center)
          }.forceRebuild(false)
        }, item => item)

        GridItem() {
          Text('5')
            .fontSize(16).backgroundColor(0xDBD0C0)
            .width('100%').height('100%').textAlign(TextAlign.Center)
        }.columnStart(1).columnEnd(5)
      }
      .columnsTemplate('1fr 1fr 1fr 1fr 1fr')
      .rowsTemplate('1fr 1fr 1fr 1fr 1fr')
      .width('90%').height(300)
    }.width('100%').margin({ top: 5 })
  }
}