//自定义弹窗组件
@CustomDialog
export struct CustomDialogExample {
  @Link level: number
  @Link source: number
  controller: CustomDialogController
  cancel: () => void
  confirm: () => void

  build() {
    Column() {
      Text('点击空白处返回再抽一次').fontSize(24).margin({ top: '5%',bottom:'5%' })
      if (this.level==1) {
        Image($rawfile('images/redCard.png')).height('80%').width('90%').margin({bottom:'10%'})
      }
      if (this.level==2) {
        Image($rawfile('images/yellowCard.png')).height('80%').width('90%').margin({bottom:'10%'})
      }
      if (this.level==3) {
        Image($rawfile('images/blueCard.png')).height('80%').width('90%').margin({bottom:'10%'})
      }
      if (this.level==4) {
        Image($rawfile('images/greenCard.png')).height('80%').width('90%').margin({bottom:'10%'})
      }
    }
  }
}