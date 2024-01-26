import CommonConstant from '../common/constant/CommonConstant'
import toDoItem from '../view/ToDoItem'
import DateModel from '../viewmodel/DateModel'
@Entry
@Component
struct ToDoListPage {
<<<<<<< HEAD
  private  contentList:Array<string>
  aboutToAppear(){
    this.contentList=DateModel.getData()
  }
  build(){
    Column({space:20}){
=======
  @State contentList: Array<string> = ['早起晨练', '准备早餐', "阅读名著", "学习ArkTS", "看剧放松"]

  build() {
    Column({ space: 20 }) {
>>>>>>> 95c51f3183c1d0966452b47226019aba2c492862
      Text('待办').fontSize(28).fontWeight(FontWeight.Bold).margin(20)
      ForEach(this.contentList, (item) => {
        toDoItem({ content: item })
      })
<<<<<<< HEAD
    }.height(CommonConstant.FULL_LENGTH)
=======
    }
    .height('100%')
>>>>>>> 95c51f3183c1d0966452b47226019aba2c492862
    .width('100%')
    .backgroundColor(0xefefef)
    .justifyContent(FlexAlign.Start)
    .alignItems(HorizontalAlign.Start)
  }
}
<<<<<<< HEAD
=======
//封装自定义组件
@Component
export default struct toDoItem {
  private content: string
  @State isComplete: boolean = true

  build() {
    Column() {
      Row({ space: 20 }) {
        if (this.isComplete) {
          Image($r('app.media.ic_ok')).height(30).margin({ left: 20 })
        } else {
          Image($r('app.media.ic_default')).height(30).margin({ left: 20 })
        }
        Text(this.content).fontSize(20)
      }
      .width('100%')
      .height('8%')
      .backgroundColor(0xffffff)
      .borderRadius(24)
      .onClick(() => {
        this.isComplete = !this.isComplete
        // console.log('1234567');
      })
    }
  }
}
>>>>>>> 95c51f3183c1d0966452b47226019aba2c492862
