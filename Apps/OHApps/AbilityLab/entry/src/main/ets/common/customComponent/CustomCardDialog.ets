//自定义弹窗组件
@CustomDialog
export struct CustomDialogExample {
  @Link level: number
  @Link score: number
  controller: CustomDialogController
  cancel: () => void
  confirm: () => void

  build() {
    Column() {
      Text('再抽一次').fontSize(24).margin({ top: '5%',bottom:'5%' })
        .onClick(() => {
          this.controller.close()
          this.cancel()
        })
      if (this.level==1) {
        Image($rawfile('images/redCard.png')).height('40%').width('40%').margin({bottom:'10%'})
      }
      if (this.level==2) {
        Image($rawfile('images/yellowCard.png')).height('40%').width('40%').margin({bottom:'10%'})
      }
      if (this.level==3) {
        Image($rawfile('images/blueCard.png')).height('40%').width('40%').margin({bottom:'10%'})
      }
      if (this.level==4) {
        Image($rawfile('images/greenCard.png')).height('40%').width('40%').margin({bottom:'10%'})
      }
    }
  }
}