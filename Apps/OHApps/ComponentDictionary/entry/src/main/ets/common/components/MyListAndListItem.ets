@Component
export struct MyListAndListItem {
  private arr: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  @State editFlag: boolean = false

  build() {
    Column() {
      List({ space: 20, initialIndex: 0 }) {
        ListItem() {
          Text('sticky:Normal , click me edit list')
            .width('100%').height(40).fontSize(12).fontColor(0xFFFFFF)
            .textAlign(TextAlign.Center).backgroundColor(0x696969)
            .onClick(() => {
              this.editFlag = !this.editFlag
            })
        }.sticky(Sticky.Normal)

        ForEach(this.arr, (item) => {
          ListItem() {
            Text('' + item)
              .width('100%').height(100).fontSize(16)
              .textAlign(TextAlign.Center).borderRadius(10).backgroundColor(0xFFFFFF)
          }.editable(this.editFlag)
        }, item => item)
      }
      .editMode(true)
      .onItemDelete((index: number) => {
        console.info(this.arr[index - 1] + 'Delete')
        this.arr.splice(index - 1,1)
        this.editFlag = false
        return true
      }).width('90%')
    }.width('100%').height('100%').backgroundColor(0xDCDCDC).padding({ top: 5 })
  }
}

//@Component
//export struct MyListAndListItem{
//  @State message: string = 'Hello World'
//
//  @Builder itemEnd() {
//    Row () {
//      Button("Del").margin("4vp")
//      Button("Set").margin("4vp")
//    }.padding("4vp").justifyContent(FlexAlign.SpaceEvenly)
//  }
//
//  build() {
//    Column() {
//      List({space:10}) {
//        ListItem() {
//          Text(this.message) {
//          }
//          .width('100%')
//          .height(100)
//          .fontSize(16)
//          .textAlign(TextAlign.Center)
//          .borderRadius(10)
//          .backgroundColor(0xFFFFFF)
//        }
//        .swipeAction({ end:this.itemEnd})
//
//        ListItem() {
//          Text(this.message) {
//          }
//          .width('100%')
//          .height(100)
//          .fontSize(16)
//          .textAlign(TextAlign.Center)
//          .borderRadius(10)
//          .backgroundColor(0xFFFFFF)
//        }
//        .swipeAction({ start:this.itemEnd})
//      }
//    }
//    .padding(10)
//    .backgroundColor(0xDCDCDC)
//    .width('100%')
//    .height('100%')
//  }
//}