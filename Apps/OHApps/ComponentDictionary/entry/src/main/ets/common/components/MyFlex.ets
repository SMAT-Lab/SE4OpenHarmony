@Entry
@Component
export struct MyFlex {
  build() {
    //------FlexDirection
    Column() {
      Column() {
        Column({ space: 5 }) {
          Text('direction:Row').fontSize(9).fontColor(0xCCCCCC).width('90%')
          Flex({ direction: FlexDirection.Row }) {
            Text('1').width('20%').height(50).backgroundColor(0xF5DEB3)
            Text('2').width('20%').height(50).backgroundColor(0xD2B48C)
            Text('3').width('20%').height(50).backgroundColor(0xF5DEB3)
            Text('4').width('20%').height(50).backgroundColor(0xD2B48C)
          }
          .height(70)
          .width('90%')
          .padding(10)
          .backgroundColor(0xAFEEEE)

          Text('direction:RowReverse').fontSize(9).fontColor(0xCCCCCC).width('90%')
          Flex({ direction: FlexDirection.RowReverse }) {
            Text('1').width('20%').height(50).backgroundColor(0xF5DEB3)
            Text('2').width('20%').height(50).backgroundColor(0xD2B48C)
            Text('3').width('20%').height(50).backgroundColor(0xF5DEB3)
            Text('4').width('20%').height(50).backgroundColor(0xD2B48C)
          }
          .height(70)
          .width('90%')
          .padding(10)
          .backgroundColor(0xAFEEEE)

          Text('direction:Column').fontSize(9).fontColor(0xCCCCCC).width('90%')
          Flex({ direction: FlexDirection.Column }) {
            Text('1').width('100%').height(40).backgroundColor(0xF5DEB3)
            Text('2').width('100%').height(40).backgroundColor(0xD2B48C)
            Text('3').width('100%').height(40).backgroundColor(0xF5DEB3)
            Text('4').width('100%').height(40).backgroundColor(0xD2B48C)
          }
          .height(160)
          .width('90%')
          .padding(10)
          .backgroundColor(0xAFEEEE)

          Text('direction:ColumnReverse').fontSize(9).fontColor(0xCCCCCC).width('90%')
          Flex({ direction: FlexDirection.ColumnReverse }) {
            Text('1').width('100%').height(40).backgroundColor(0xF5DEB3)
            Text('2').width('100%').height(40).backgroundColor(0xD2B48C)
            Text('3').width('100%').height(40).backgroundColor(0xF5DEB3)
            Text('4').width('100%').height(40).backgroundColor(0xD2B48C)
          }
          .height(160)
          .width('90%')
          .padding(10)
          .backgroundColor(0xAFEEEE)
        }.width('100%').margin({ top: 5 })
      }.width('100%')
    }

    /*
    //-------justifyContent
    Column() {
      Column({ space: 5 }) {
        Text('Wrap').fontSize(9).fontColor(0xCCCCCC).width('90%')
        Flex({ wrap: FlexWrap.Wrap }) {
          Text('1').width('50%').height(50).backgroundColor(0xF5DEB3)
          Text('2').width('50%').height(50).backgroundColor(0xD2B48C)
          Text('3').width('50%').height(50).backgroundColor(0xD2B48C)
        }
        .width('90%')
        .padding(10)
        .backgroundColor(0xAFEEEE)

        Text('NoWrap').fontSize(9).fontColor(0xCCCCCC).width('90%')
        Flex({ wrap: FlexWrap.NoWrap }) {
          Text('1').width('50%').height(50).backgroundColor(0xF5DEB3)
          Text('2').width('50%').height(50).backgroundColor(0xD2B48C)
          Text('3').width('50%').height(50).backgroundColor(0xF5DEB3)
        }
        .width('90%')
        .padding(10)
        .backgroundColor(0xAFEEEE)

        Text('WrapReverse').fontSize(9).fontColor(0xCCCCCC).width('90%')
        Flex({ wrap: FlexWrap.WrapReverse , direction:FlexDirection.Row }) {
          Text('1').width('50%').height(50).backgroundColor(0xF5DEB3)
          Text('2').width('50%').height(50).backgroundColor(0xD2B48C)
          Text('3').width('50%').height(50).backgroundColor(0xD2B48C)
        }
        .width('90%')
        .height(120)
        .padding(10)
        .backgroundColor(0xAFEEEE)
      }.width('100%').margin({ top: 5 })
    }.width('100%')
    */


    /*
    //-------alignItems
    Column() {
      Column({ space: 5 }) {
        Text('justifyContent:Start').fontSize(9).fontColor(0xCCCCCC).width('90%')
        JustifyContentFlex({ justifyContent: FlexAlign.Start })

        Text('justifyContent:Center').fontSize(9).fontColor(0xCCCCCC).width('90%')
        JustifyContentFlex({ justifyContent: FlexAlign.Center })

        Text('justifyContent:End').fontSize(9).fontColor(0xCCCCCC).width('90%')
        JustifyContentFlex({ justifyContent: FlexAlign.End })

        Text('justifyContent:SpaceBetween').fontSize(9).fontColor(0xCCCCCC).width('90%')
        JustifyContentFlex({ justifyContent: FlexAlign.SpaceBetween })

        Text('justifyContent:SpaceAround').fontSize(9).fontColor(0xCCCCCC).width('90%')
        JustifyContentFlex({ justifyContent: FlexAlign.SpaceAround })

        Text('justifyContent:SpaceEvenly').fontSize(9).fontColor(0xCCCCCC).width('90%')
        JustifyContentFlex({ justifyContent: FlexAlign.SpaceEvenly })
      }.width('100%').margin({ top: 5 })
    }.width('100%')
     */
  }
}

@Component
struct JustifyContentFlex {
  @Prop justifyContent : number

  build() {
    Flex({ justifyContent: this.justifyContent }) {
      Text('1').width('20%').height(50).backgroundColor(0xF5DEB3)
      Text('2').width('20%').height(50).backgroundColor(0xD2B48C)
      Text('3').width('20%').height(50).backgroundColor(0xF5DEB3)
    }
    .width('90%')
    .padding(10)
    .backgroundColor(0xAFEEEE)
  }
}