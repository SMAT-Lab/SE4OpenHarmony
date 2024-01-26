@Component
export struct MyColumn {
  build() {
    Column() {
      Text('space').fontSize(9).fontColor(0xCCCCCC).width('90%')
      Column({ space: 5 }) {
        Column().width('100%').height(30).backgroundColor(0xAFEEEE)
        Column().width('100%').height(30).backgroundColor(0x00FFFF)
      }.width('90%').height(100).border({ width: 1 })

      Text('alignItems(Start)').fontSize(9).fontColor(0xCCCCCC).width('90%')
      Column() {
        Column().width('50%').height(30).backgroundColor(0xAFEEEE)
        Column().width('50%').height(30).backgroundColor(0x00FFFF)
      }.alignItems(HorizontalAlign.Start).width('90%').border({ width: 1 })

      Text('alignItems(End)').fontSize(9).fontColor(0xCCCCCC).width('90%')
      Column() {
        Column().width('50%').height(30).backgroundColor(0xAFEEEE)
        Column().width('50%').height(30).backgroundColor(0x00FFFF)
      }.alignItems(HorizontalAlign.End).width('90%').border({ width: 1 })

      Text('justifyContent(Center)').fontSize(9).fontColor(0xCCCCCC).width('90%')
      Column() {
        Column().width('30%').height(30).backgroundColor(0xAFEEEE)
        Column().width('30%').height(30).backgroundColor(0x00FFFF)
      }.height('15%').border({ width: 1 }).justifyContent(FlexAlign.Center)

      Text('justifyContent(End)').fontSize(9).fontColor(0xCCCCCC).width('90%')
      Column() {
        Column().width('30%').height(30).backgroundColor(0xAFEEEE)
        Column().width('30%').height(30).backgroundColor(0x00FFFF)
      }.height('15%').border({ width: 1 }).justifyContent(FlexAlign.End)
    }.width('100%').padding({ top: 5 })
  }
}