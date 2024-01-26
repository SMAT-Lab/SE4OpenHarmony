@Component
export struct MyBadge {
  @State counts: number = 1
  @State message: string = 'new'

  build() {
    Column() {
      Text('numberBadge').width('80%')
      Row({ space: 10 }) {
        // 数字上标，maxCount默认99,超过99展示99+
        Badge({
          count: this.counts,
          maxCount: 99,
          position: BadgePosition.RightTop,
          style: { color: 0xFFFFFF, fontSize: 16, badgeSize: 20, badgeColor: Color.Red }
        }) {
          Button('message')
            .onClick(() => {
              this.counts++
            })
            .width(100).height(50).backgroundColor(0x317aff)
        }.width(100).height(50)

        // 数字上标
        Badge({
          count: this.counts,
          maxCount: 99,
          position: BadgePosition.Left,
          style: { color: 0xFFFFFF, fontSize: 16, badgeSize: 20, badgeColor: Color.Red }
        }) {
          Button('message')
            .onClick(() => {
              this.counts++
            })
            .width(100).height(50).backgroundColor(0x317aff)
        }.width(100).height(50)



        // 数字上标
        Badge({
          count: this.counts,
          maxCount: 99,
          position: BadgePosition.Right,
          style: { color: 0xFFFFFF, fontSize: 16, badgeSize: 20, badgeColor: Color.Red }
        }) {
          Button('message')
            .onClick(() => {
              this.counts++
            })
            .width(100).height(50).backgroundColor(0x317aff)
        }.width(100).height(50)
      }.margin(10)

      Text('stringBadge').width('80%')
      Row({ space: 30 }) {
        Badge({
          value: this.message,
          style: { color: 0xFFFFFF, fontSize: 9, badgeSize: 20, badgeColor: Color.Blue }
        }) {
          Text('message')
            .width(80)
            .height(50)
            .fontSize(16)
            .lineHeight(37)
            .borderRadius(10)
            .textAlign(TextAlign.Center)
            .backgroundColor(0xF3F4ED)
        }.width(80).height(50)

        // value为空，设置圆点标记
        Badge({
          value: '',
          position: BadgePosition.Right,
          style: { badgeSize: 6, badgeColor: Color.Red }
        }) {
          Text('message')
            .width(90)
            .height(50)
            .fontSize(16)
            .lineHeight(37)
            .borderRadius(10)
            .textAlign(TextAlign.Center)
            .backgroundColor(0xF3F4ED)
        }.width(90).height(50)
      }.margin(10)
    }
  }
}