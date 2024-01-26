@Entry
@Component
export struct navigatorBack {
  build() {
    Column() {
      Navigator({ target: 'pages/navigatorDetail', type: NavigationType.Back }) {
        Text('Return to 第二页').width('100%').textAlign(TextAlign.Center).fontSize(40)
      }
    }.width('100%').height(200).padding({ left: 35, right: 35, top: 35 })
  }
}