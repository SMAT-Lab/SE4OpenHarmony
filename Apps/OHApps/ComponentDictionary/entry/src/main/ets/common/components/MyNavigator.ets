@Component
export struct MyNavigator {
  @State active: boolean = false
  @State Text: object = {name: '第二页'}

  build() {
    Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Start, justifyContent: FlexAlign.SpaceBetween }) {
      Navigator({ target: 'pages/navigatorDetail', type: NavigationType.Push }) {
        Text('Go to ' + this.Text['name'])
          .width('100%').textAlign(TextAlign.Center).fontSize(40)
      }.params({ text: this.Text })
    }.height(150).width(350).padding(35)
  }
}