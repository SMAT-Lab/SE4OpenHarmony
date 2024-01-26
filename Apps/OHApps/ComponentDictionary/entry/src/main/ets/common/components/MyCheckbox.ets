@Component
export struct MyCheckbox {
  //多选框组件，通常用于某选项的打开或关闭。
  build() {
    Row() {
      //name:多选框名称,  group:多选框的群组名称
      Checkbox({ name: 'checkbox1', group: 'checkboxGroup' })
        .select(true)//设置多选框是否被选中
        .selectedColor(0xed6f21)//多选框选中时的状态
        .onChange((value: boolean) => {
          //当选中状态发生变化时，触发该回调;value为true时，表示已选中,反之
          console.info('Checkbox1 change is' + value)
        })
      Checkbox({ name: 'checkbox2', group: 'checkboxGroup' })
        .select(false)
        .selectedColor(0x39a2db)
        .onChange((value: boolean) => {
          console.info('Checkbox2 change is' + value)
        })
    }
  }
}