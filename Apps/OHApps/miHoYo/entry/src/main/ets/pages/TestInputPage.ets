@Entry
@Component
struct TextInputPage {
	@State message: string = 'Hello World'
	@State text: string = ''
	controller: TextInputController = new TextInputController()
	controller2: TextInputController = new TextInputController()

	build() {
		Row() {
			Column() {
				Text(this.message)
					.fontSize(50)
					.fontWeight(FontWeight.Bold)
				TextInput({
					placeholder: "请输入密码",
					text: this.text,
					controller: this.controller
				}).onChange((value: string) =>{

					this.message=value
				})
					.type(InputType.Password)
					.placeholderColor(Color.Blue)
					.placeholderFont({
						size: 40,
						weight: 100,

					})
					.width("80%")
					.height(100)
					.fontSize(40)
					.fontColor(Color.Green)

				TextInput({
					placeholder: "请输入电话号码",
					text: this.text,
					controller: this.controller2
				}).type(InputType.PhoneNumber)
			}
			.width('100%')
		}
		.height('100%')
	}
}