import promptAction from '@ohos.promptAction'
import hilog from '@ohos.hilog'
import reminderAgentManager from '@ohos.reminderAgentManager';
import router from '@ohos.router';
import { Tabss3 } from './Tabss3';

@Entry
@Component

struct AddPage {
  @State message: string = '添加提醒日'
  @State remind: string = ""
  @State isLunar: boolean = true
  @State select: number = 1
  private labels: string[] = ['倒计时', '生日', '纪念日']
  private chongfu: string[] = ['无','1周','1月','1年']
  private templates: string[] = ['常规','倒计时','生日','纪念日']
  selectedDate: Date = new Date("2023-6-25")
  @State date:string = ""

  build() {
    Column() {
      Text("添加提醒日")
        .fontSize(30)
        .fontWeight(FontWeight.Bold)
        .margin({

          top: 30
        })
      Row() {
        TextInput({
          placeholder: "请输入提醒日名称",
          text: this.remind,
        }).width("80%").onChange((val: string) => {
          this.remind = val
        })
      }
      .borderWidth(1)
      .borderRadius(15)
      .backgroundColor(Color.White)
      .borderColor(Color.Gray)
      .margin({
        bottom: 16,
        top: 16
      })

      Column() {
        Tabss3({
          text: "使用模板",
          img: $r("app.media.template")
        }).margin(15).onClick(() => {
          TextPickerDialog.show({
            range: this.templates,
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
        Divider().width("70%")
        Tabss3({
          text: "目标日",
          img: $r("app.media.calendar")
        }).margin(15).onClick(() => {
          DatePickerDialog.show({
            start: new Date("2023-6-12"),
            end: new Date("2025-6-11"),
            selected: this.selectedDate,
            lunar: this.isLunar,
            onAccept: (value: DatePickerResult) => {
              this.selectedDate.setUTCFullYear(value.year, value.month, value.day)
              this.date = this.selectedDate.toString()
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
        Divider().width("70%")
        Tabss3({
          text: "标签",
          img: $r("app.media.label")
        })
          .margin(15)
          .onClick(() => {
            TextPickerDialog.show({
              range: this.labels,
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
      .borderWidth(1)
      .borderRadius(15)
      .backgroundColor(Color.White)
      .borderColor(Color.Gray)
      .margin({ bottom: 10 })

      Column() {
        Tabss3({
          text: "重复状态",
          img: $r("app.media.repeat")
        }).margin(15).onClick(() => {
          TextPickerDialog.show({
            range: this.chongfu,
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
        Divider().width("70%")
        Row() {
          Image($r("app.media.remind")).width(20)
          Text("设置提醒")
            .fontSize(16)
            .textAlign(TextAlign.Start)
            .margin(15)
          Blank(195)
          Toggle({ type: ToggleType.Switch }).selectedColor(Color.Pink)
            .margin({ right:15 })
            .onChange((isOn: boolean) => {
              if (isOn) {
                promptAction.showToast({ message: 'reminder is on.' })
              } else {
                promptAction.showToast({ message: 'reminder is off.' })
              }
            })
        }.margin({ bottom: 15, top: 15 })

        Divider().width("70%")
        Row() {
          Image($r("app.media.top")).width(20)
          Text("置顶")
            .fontSize(16)
            .textAlign(TextAlign.Start)
            .margin(15)
          Blank(225)
          Toggle({ type: ToggleType.Switch }).selectedColor(Color.Pink)
            .margin({ right:15 })
            .onChange((isOn: boolean) => {
              if (isOn) {
                promptAction.showToast({ message: 'top is on.' })
              } else {
                promptAction.showToast({ message: 'top is off.' })
              }
            })
        }.margin({ bottom: 15, top: 15 })

        Divider().width("70%")
        Row() {
          Image($r("app.media.plusone")).width(20)
          Text("正数包含起始日(+1天)")
            .fontSize(16)
            .textAlign(TextAlign.Start)
            .margin(15)
          Blank(103)
          Toggle({ type: ToggleType.Switch }).selectedColor(Color.Pink)
            .margin({ right:15 })
            .onChange((isOn: boolean) => {
              if (isOn) {
                promptAction.showToast({ message: 'plusone is on.' })
              } else {
                promptAction.showToast({ message: 'plusone is off.' })
              }
            })
        }.margin({ bottom: 15, top: 15 })
      }.borderWidth(1).borderRadius(15).backgroundColor(Color.White).borderColor(Color.Gray)

      Button("确定")
        .width(200)
        .backgroundColor(Color.White)
        .fontColor(Color.Black)
        .margin({
          bottom: 20,
          top: 20
        })
        .onClick(() => {
          router.pushUrl({
            url: "pages/TabPage",
            params:{
              name:this.remind,
              text1:this.date,
              text2:this.labels
            }
          })
        })
    }
    .width('100%')
    .height('100%')
    .backgroundColor(Color.Pink)

  }
}
