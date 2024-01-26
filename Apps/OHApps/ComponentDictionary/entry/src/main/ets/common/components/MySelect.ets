@Component
export struct MySelect {
  build() {
    Column() {
      Select([{ value: 'aaa', icon: "/common/1.png" },
        { value: 'bbb', icon: "/common/2.png" },
        { value: 'ccc', icon: "/common/3.png" },
        { value: 'ddd', icon: "/common/4.png" }])
        .selected(2)
        .value('TTT')
        .font({ size: 30, weight: 400, family: 'serif', style: FontStyle.Normal })
        .selectedOptionFont({ size: 40, weight: 500, family: 'serif', style: FontStyle.Normal })
        .optionFont({ size: 30, weight: 400, family: 'serif', style: FontStyle.Normal })
        .onSelect((index: number) => {
          console.info("Select:" + index)
        })
    }
  }
}