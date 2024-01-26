import { Content } from '../features/content/Content'
import { Header } from '../features/header/Header'
import { Player } from '../features/player/Player'
import { BreakpointSystem } from '../utils/BreakpointSystem'
import { BreakpointConstant } from '../common/BreakpointConstant'

@Entry
@Component
struct Index {
  private breakpointSystem:BreakpointSystem=new BreakpointSystem()
  @StorageProp('currentBreakpoint') currentBreakpoint:string='sm'

  aboutToAppear(){
    this.breakpointSystem.register()
  }

  aboutToDisappear(){
    this.breakpointSystem.unRegister()
  }

  build() {
    Stack({alignContent:Alignment.Bottom}){
      Column(){
        Header()
        Content()
      }
      Player()
    }.width('100%')
    .backgroundColor(this.currentBreakpoint==BreakpointConstant.BREAKPOINT_SM?'#ffffff':'#fff7eaa3')
  }
}