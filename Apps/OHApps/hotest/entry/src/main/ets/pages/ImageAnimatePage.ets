@Entry
@Component
struct ImageAnimatePage {

  @State state: AnimationStatus = AnimationStatus.Initial
  @State reverse: boolean = false
  @State iterations: number = 1

  build() {
    Column({ space: 10 }) {
      ImageAnimator()
        .images([
          {
            src: $r("app.media.bg1"),
            duration: 500,
            width: 325,
            height: 600,
            top: 0,
            left: 0
          },
          {
            src: $r("app.media.bg2"),
            duration: 200,
            width: 325,
            height: 600,
            top: 0,
            left: 0
          },
          {
            src: $r("app.media.bg2"),
            duration: 200,
            width: 325,
            height: 600,
            top: 0,
            left: 0
          },
          {
            src: $r("app.media.bg4"),
            duration: 200,
            width: 325,
            height: 600,
            top: 0,
            left: 0
          },
      {
            src: $r("app.media.bg5"),
            duration: 200,
        width: 325,
        height: 600,
            top: 0,
            left: 0
          }
        ])
        .state(this.state)
        .reverse(this.reverse)
        .fixedSize(false)
        .fillMode(FillMode.None)
        .iterations(this.iterations)
        .width("86%")
        .height("50%")
        .onStart(() => {
          console.info('Start')
        })
        .onPause(() => {
          console.info('Pause')
        })
        .onRepeat(() => {
          console.info('Repeat')
        })
        .onCancel(() => {
          console.info('Cancel')
        })
        .onFinish(() => {
          console.info('Finish')
        })
      Row({space: 5}) {
        Button('start')
          .width(100)
          .padding(5)
          .onClick(() => {
            this.state = AnimationStatus.Running
          })
        Button('pause')
          .width(100)
          .padding(5)
          .onClick(() => {
            this.state = AnimationStatus.Paused
          })
        Button('stop')
          .width(100)
          .padding(5)
          .onClick(() => {
            this.state = AnimationStatus.Stopped
          })
      }

      Row({space: 5}) {
        Button('reverse')
          .width(100)
          .padding(5)
          .onClick(() => {
            this.reverse = !this.reverse
          })
        Button('once')
          .width(100)
          .padding(5)
          .onClick(() => {
            this.iterations = 1
          })
        Button('infinite')
          .width(100)
          .padding(5)
          .onClick(() => {
            this.iterations = -1
          })
      }
    }
    .width('100%')
    .height('100%')
    .padding(10)
  }
}