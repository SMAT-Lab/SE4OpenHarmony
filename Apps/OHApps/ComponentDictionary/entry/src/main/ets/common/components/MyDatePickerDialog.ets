@Component
/*
export struct MyDatePickerDialog {
  @State isLunar: boolean = true
  selectedDate: Date = new Date("2000-1-1")

  build() {
    Flex({direction: FlexDirection.Column, alignItems: ItemAlign.Center,
      justifyContent: FlexAlign.Center }) {
      Button("DatePickerDialog").onClick(() => {
        DatePickerDialog.show({
          start: new Date("2000-1-1"),
          end: new Date("2005-1-1"),
          selected: this.selectedDate,
          lunar: this.isLunar,
          onAccept: (value: DatePickerResult) => {
            this.selectedDate.setFullYear(value.year, value.month, value.day)
            console.info("DatePickerDialog:onAccept()" + JSON.stringify(value))
          },
          onCancel: () => {
            console.info("DatePickerDialog:onCancel()")
          },
          onChange: (value: DatePickerResult) => {
            console.info("DatePickerDialog:onChange()" + JSON.stringify(value))
          }
        })
      })
    }
  }
}*/
export struct MyDatePickerDialog{
  selectedDate:Date=new Date('2023-7-17')
  build(){
    Flex({direction:FlexDirection.Column,justifyContent:FlexAlign.Center,alignItems:ItemAlign.Center}){
      Button('DatePickerDialog').onClick(()=>{
        DatePickerDialog.show({
          start:new Date('1900-1-1'),
          end:new Date('2100-12-31'),
          selected:this.selectedDate,
          lunar:false,
        //   回调函数
        //   点击弹窗中的确认按钮被触发
          onAccept:(value:DatePickerResult)=>{
            console.info('点击弹窗中的确认按钮被触发')
          },
          onCancel:()=>{
            console.info('点击弹窗中的取消按钮被触发')
          },
          onChange:()=>{
            console.info('当前选项被修改时触发')

          }
        })
      })
    }
  }
}
