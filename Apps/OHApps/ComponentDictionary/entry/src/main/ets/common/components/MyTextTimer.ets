@Component
export struct MyTextTimer {
  textTimerController: TextTimerController = new TextTimerController()
  @State format: string = 'hh:mm:ss.ms'

  build() {
    Column() {
      TextTimer({controller: this.textTimerController})
        .format(this.format)
        .fontColor(Color.Black)
        .fontSize(50)
        .onTimer((utc: number, elapsedTime: number) => {
          console.info('textTimer notCountDown utc is：' + utc + ', elapsedTime: ' + elapsedTime)
        })
      Row() {
        Button("start").onClick(() => {
          this.textTimerController.start();
        });
        Button("pause").onClick(() => {
          this.textTimerController.pause();
        });
        Button("reset").onClick(() => {
          this.textTimerController.reset();
        });
      }
    }
  }
}