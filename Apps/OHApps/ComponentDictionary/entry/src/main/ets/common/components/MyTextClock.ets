@Component
export struct MyTextClock {
  @State accumulateTime: number = 0
  controller: TextClockController = new TextClockController()

  build() {
    Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center}) {
      Text('current milliseconds is' + this.accumulateTime)
        .fontSize(20)
      TextClock({timeZoneOffset: -8, controller: this.controller})
        .format('hhmmss')
        .onDateChange((value: number) => {
          this.accumulateTime = value
        })
        .margin(20)
        .fontSize(30)
      Button("start TextClock")
        .margin({ bottom: 10 })
        .onClick(()=>{
          this.controller.start()
        })
      Button("stop TextClock")
        .onClick(()=>{
          this.controller.stop()
        })
    }
    .width('100%')
    .height('100%')
  }
}