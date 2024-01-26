@Component
export struct MyTimePicker {
  private selectedTime: Date = new Date('7/22/2022 8:00:00')

  build() {
    Column() {
      TimePicker({
        selected: this.selectedTime,
      })
        .useMilitaryTime(true)
        .onChange((date: TimePickerResult) => {
          console.info('select current date is: ' + JSON.stringify(date))
        })
    }.width('100%')
  }
}