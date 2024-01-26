@Component
export struct MyTextPickerDialog {
  @State select: number = 1
  private fruits: string[] = ['apple1', 'orange2', 'peach3', 'grape4']

  build() {
    Flex({direction: FlexDirection.Column, alignItems: ItemAlign.Center,
      justifyContent: FlexAlign.Center }) {
      Button("TextPickerDialog").onClick(() => {
        TextPickerDialog.show({
          range: this.fruits,
          selected: this.select,
          onAccept: (value: TextPickerResult) => {
            console.info("TextPickerDialog:onAccept()" + JSON.stringify(value))
            this.select = value.index
          },
          onCancel: () => {
            console.info("TextPickerDialog:onCancel()")
          },
          onChange: (value: TextPickerResult) => {
            console.info("TextPickerDialog:onChange()" + JSON.stringify(value))
          }
        })
      })
    }
  }
}