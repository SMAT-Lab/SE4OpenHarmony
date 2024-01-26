//封装自定义组件
@Component
export default struct toDoItem{
  private  content:string
  @State isComplete:boolean=false
  build(){
    Column(){
      Row({space:20}){
        if (this.isComplete){
          Image($r('app.media.ic_ok')).height(30).margin({left:20})
        }else{
          Image($r('app.media.ic_default')).height(30).margin({left:20})
        }
        Text(this.content).fontSize(20)
          .opacity(this.isComplete?0.6:1)
          .decoration({type:this.isComplete?TextDecorationType.LineThrough:TextDecorationType.None})
      }.width('100%')
      .height('8%')
      .backgroundColor(0xffffff)
      .borderRadius(24)
      .onClick(()=>{
        this.isComplete=!this.isComplete
        // console.log('1234567');
      })
    }
  }
}