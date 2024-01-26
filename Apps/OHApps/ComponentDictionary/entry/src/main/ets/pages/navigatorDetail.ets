import router from '@ohos.router';

@Entry
@Component
export struct NavigatorDetail {
  @State text: any = router.getParams()['text']
  build() {
    Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Start, justifyContent: FlexAlign.SpaceBetween }) {
      Navigator({ target: 'pages/navigatorBack', type: NavigationType.Push }) {
        Text('Go to 第三页').width('100%').height(60).fontSize(40)
      }
      Text('This is ' + this.text['name'])
        .width('100%').textAlign(TextAlign.Center).fontSize(40).fontColor('#fd9b3d')
    }
    .width('100%').height(200).padding({ left: 35, right: 35, top: 35 })
  }
}