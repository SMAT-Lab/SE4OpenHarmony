@Component
export struct MyTimePickerDialog {
  @State isUseMilitaryTime: boolean = false

  build() {
    Flex({direction: FlexDirection.Column, alignItems: ItemAlign.Center,
      justifyContent: FlexAlign.Center }) {
      Button("TimePickerDialog").onClick(() => {
        TimePickerDialog.show({
          useMilitaryTime: this.isUseMilitaryTime,
          onAccept: (value: TimePickerResult) => {
            console.info("TimePickerDialog:onAccept()" + JSON.stringify(value))
          },
          onCancel: () => {
            console.info("TimePickerDialog:onCancel()")
          },
          onChange: (value: TimePickerResult) => {
            console.info("TimePickerDialog:onChange()" + JSON.stringify(value))
          }
        })
      })
    }
  }
}